// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Doctor = require('../models/Doctor');
const asyncHandler = require('../utils/asyncHandler');
const bookingService = require('../services/bookingService');
const queueService = require('../services/queueService');
const { log } = require('../middleware/auditLogger');

/**
 * @route   GET /api/bookings/availability
 * @desc    Get available sessions/slots for a doctor on a date
 * @access  Public
 */
exports.availability = asyncHandler(async (req, res) => {
  const { doctorId, date, serviceId } = req.query;
  if (!doctorId || !date) {
    return res.status(400).json({
      success: false,
      message: 'doctorId and date are required'
    });
  }

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }

  const dateObj = new Date(date);
  const availability = doctor.getAvailabilityForDate(dateObj);
  if (!availability.available) {
    return res.json({ success: true, available: false, reason: availability.reason });
  }

  const service = serviceId ? await Service.findById(serviceId) : null;
  const bookingMode = service?.bookingMode || 'session';

  if (bookingMode === 'session') {
    // Count bookings per session
    const sessions = await Promise.all(
      availability.sessions.map(async (s) => {
        const count = await Booking.countDocuments({
          doctor: doctorId,
          preferredDate: dateObj,
          session: s.name,
          status: { $in: ['pending_payment', 'confirmed', 'checked_in', 'in_consultation'] }
        });
        return {
          name: s.name,
          startTime: s.startTime,
          endTime: s.endTime,
          maxPatients: s.maxPatients,
          booked: count,
          remaining: Math.max(0, s.maxPatients - count),
          isFull: count >= s.maxPatients
        };
      })
    );
    return res.json({
      success: true,
      available: true,
      bookingMode: 'session',
      sessions
    });
  }

  // Fixed slot: build slot list
  const slots = [];
  const { startTime, endTime } = availability.sessions[0] || {};
  const slotDuration = service?.slotConfig?.slotDuration || 30;

  if (startTime && endTime) {
    const booked = await Booking.find({
      doctor: doctorId,
      preferredDate: dateObj,
      bookingType: 'fixed_slot',
      status: { $in: ['pending_payment', 'confirmed', 'checked_in', 'in_consultation'] }
    }).select('slotTime');

    const bookedSet = new Set(booked.map((b) => b.slotTime));
    let cursor = parseTime(startTime);
    const end = parseTime(endTime);

    while (cursor < end) {
      const timeStr = formatTime(cursor);
      slots.push({ time: timeStr, available: !bookedSet.has(timeStr) });
      cursor += slotDuration;
    }
  }

  res.json({
    success: true,
    available: true,
    bookingMode: 'fixed_slot',
    slots
  });
});

/**
 * @route   POST /api/bookings
 * @desc    Initiate booking (pending_payment)
 * @access  Public
 * @header  Idempotency-Key (optional but recommended)
 */
exports.initiate = asyncHandler(async (req, res) => {
  const {
    patientName, phoneNumber, email,
    serviceId, doctorId,
    preferredDate, session, slotTime,
    additionalNotes
  } = req.body;

  if (!phoneNumber || !serviceId || !doctorId || !preferredDate) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  // Split patient name (simple heuristic)
  const [firstName, ...rest] = (patientName || '').trim().split(' ');
  const lastName = rest.join(' ');

  const result = await bookingService.initiateBooking({
    patientData: {
      phoneNumber,
      firstName: firstName || 'Unknown',
      lastName,
      email,
      registeredVia: 'online'
    },
    serviceId,
    doctorId,
    preferredDate,
    session,
    slotTime,
    additionalNotes,
    idempotencyKey: req.headers['idempotency-key']
  });

  await log({
    user: null,
    action: 'booking.create',
    resourceType: 'Booking',
    resourceId: result.booking._id,
    req,
    metadata: { reference: result.booking.bookingReference }
  });

  // TODO: integrate Paypack — return paymentUrl
  res.status(201).json({
    success: true,
    message: 'Booking initiated. Complete payment to confirm.',
    data: {
      booking: {
        _id: result.booking._id,
        bookingReference: result.booking.bookingReference,
        status: result.booking.status,
        tokenNumber: result.booking.tokenNumber,
        session: result.booking.session,
        slotTime: result.booking.slotTime,
        amount: result.booking.amount,
        currency: result.booking.currency,
        preferredDate: result.booking.preferredDate,
        serviceName: result.booking.serviceName,
        doctorName: result.booking.doctorName
      },
      patient: {
        _id: result.patient._id,
        patientNumber: result.patient.patientNumber,
        fullName: result.patient.fullName,
        isNew: result.isNewPatient
      },
      // paymentUrl: '...' // filled after Paypack integration
    }
  });
});

/**
 * @route   POST /api/bookings/:id/confirm
 * @desc    Confirm a booking after payment (or by reception)
 * @access  Private (reception, admin) OR webhook
 */
exports.confirm = asyncHandler(async (req, res) => {
  const { method = 'cash', reference = '' } = req.body;

  const booking = await bookingService.confirmBooking(req.params.id, {
    method,
    reference
  });

  await log({
    user: req.user || null,
    action: 'payment.confirm',
    resourceType: 'Booking',
    resourceId: booking._id,
    req,
    metadata: { method, reference }
  });

  // TODO: send SMS + Email confirmation

  res.json({ success: true, data: booking });
});

/**
 * @route   POST /api/bookings/:id/cancel
 * @desc    Cancel a booking
 * @access  Private
 */
exports.cancel = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const booking = await bookingService.cancelBooking(
    req.params.id,
    reason || 'Cancelled by staff',
    req.user?._id
  );

  await log({
    user: req.user,
    action: 'booking.cancel',
    resourceType: 'Booking',
    resourceId: booking._id,
    req,
    metadata: { reason }
  });

  res.json({ success: true, data: booking });
});

/**
 * @route   GET /api/bookings
 * @desc    List bookings with filters
 * @access  Private
 */
exports.list = asyncHandler(async (req, res) => {
  const { status, doctorId, date, serviceId, patientId } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (doctorId) filter.doctor = doctorId;
  if (serviceId) filter.service = serviceId;
  if (patientId) filter.patient = patientId;
  if (date) {
    const d = new Date(date);
    const start = new Date(d); start.setHours(0, 0, 0, 0);
    const end = new Date(d); end.setHours(23, 59, 59, 999);
    filter.preferredDate = { $gte: start, $lte: end };
  }

  const bookings = await Booking.find(filter)
    .populate('patient', 'patientNumber fullName phoneNumber')
    .populate('doctor', 'fullName title')
    .populate('service', 'name icon')
    .sort({ preferredDate: 1, tokenNumber: 1 })
    .limit(200);

  res.json({ success: true, count: bookings.length, data: bookings });
});

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking details
 * @access  Private
 */
exports.getOne = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('patient')
    .populate('doctor', 'fullName title photo')
    .populate('service', 'name icon price');

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  res.json({ success: true, data: booking });
});

/**
 * @route   POST /api/bookings/:id/check-in
 * @desc    Mark patient as arrived (receptionist)
 * @access  Private (receptionist, admin)
 */
exports.checkIn = asyncHandler(async (req, res) => {
  const booking = await queueService.checkIn({
    bookingId: req.params.id,
    receptionistUserId: req.user._id
  });

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  await log({
    user: req.user,
    action: 'booking.update',
    resourceType: 'Booking',
    resourceId: booking._id,
    req,
    metadata: { action: 'check_in' }
  });

  res.json({ success: true, data: booking });
});

// === Helpers ===
function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}
function formatTime(minutes) {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}