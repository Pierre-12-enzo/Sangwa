// backend/services/bookingService.js
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Doctor = require('../models/Doctor');
const SlotLock = require('../models/SlotLock');
const { acquireSlotLock, releaseSlotLock } = require('./slotService');
const { assignToken } = require('./queueService');
const { findOrCreatePatient } = require('./patientService');

/**
 * Initiate a booking (creates pending_payment record)
 */
async function initiateBooking({ 
  patientData, 
  serviceId, 
  doctorId, 
  preferredDate, 
  session, 
  slotTime,
  additionalNotes,
  idempotencyKey 
}) {
  // === 1. Validate service and doctor ===
  const service = await Service.findById(serviceId);
  if (!service || !service.isActive) {
    throw new Error('Service not available');
  }
  
  const doctor = await Doctor.findById(doctorId);
  if (!doctor || !doctor.isActive) {
    throw new Error('Doctor not available');
  }
  
  // Check doctor offers this service
  if (!doctor.services.map(s => s.toString()).includes(serviceId.toString())) {
    throw new Error('This doctor does not offer this service');
  }
  
  // === 2. Find or create patient ===
  const { patient, isNew } = await findOrCreatePatient(patientData);
  
  // === 3. Validate date/time ===
  const date = new Date(preferredDate);
  validateDateRange(date);
  
  const availability = doctor.getAvailabilityForDate(date);
  if (!availability.available) {
    throw new Error(availability.reason || 'Doctor not available on this date');
  }
  
  // === 4. Build booking mode specific data ===
  let tokenNumber = null;
  let sessionName = null;
  let slot = null;
  
  if (service.bookingMode === 'session') {
    if (!session) throw new Error('Session is required for this service');
    
    const sessionConfig = availability.sessions.find(s => s.name === session);
    if (!sessionConfig) {
      throw new Error('This session is not available');
    }
    
    // Check capacity
    const count = await Booking.countDocuments({
      doctor: doctorId,
      preferredDate: date,
      session,
      status: { $in: ['pending_payment', 'confirmed', 'checked_in', 'in_consultation'] }
    });
    
    if (count >= sessionConfig.maxPatients) {
      throw new Error(`This session is full (${sessionConfig.maxPatients} patients max)`);
    }
    
    tokenNumber = await assignToken({ doctor: doctorId, date, session });
    sessionName = session;
  } else {
    // Fixed slot
    if (!slotTime) throw new Error('Time slot is required for this service');
    slot = slotTime;
  }
  
  // === 5. Acquire slot lock (race prevention) ===
  const tempBookingId = new mongoose.Types.ObjectId();
  const lock = await acquireSlotLock({
    doctorId,
    date,
    session: sessionName,
    slotTime: slot,
    bookingId: tempBookingId,
    idempotencyKey
  });
  
  if (!lock) {
    throw new Error('This slot was just taken. Please choose another.');
  }
  
  // === 6. Create booking ===
  const booking = new Booking({
    patient: patient._id,
    patientName: patient.fullName,
    patientNumber: patient.patientNumber,
    phoneNumber: patient.phoneNumber,
    
    service: service._id,
    serviceName: service.name,
    doctor: doctor._id,
    doctorName: doctor.fullName,
    
    preferredDate: date,
    bookingType: service.bookingMode,
    session: sessionName,
    slotTime: slot,
    tokenNumber,
    
    amount: service.price,
    currency: service.currency,
    paymentStatus: 'pending',
    status: 'pending_payment',
    
    additionalNotes: additionalNotes || '',
    idempotencyKey
  });
  
  await booking.save();
  
  // Update lock with real booking ID
  lock.bookingId = booking._id;
  await lock.save();
  
  return {
    booking,
    patient,
    isNewPatient: isNew,
    service,
    doctor
  };
}

/**
 * Confirm booking after successful payment
 */
async function confirmBooking(bookingId, paymentData) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error('Booking not found');
  
  if (booking.status === 'confirmed') {
    return booking; // Idempotent
  }
  
  booking.paymentStatus = 'paid';
  booking.paymentMethod = paymentData.method;
  booking.paymentReference = paymentData.reference;
  booking.paidAt = new Date();
  booking.status = 'confirmed';
  booking.confirmedAt = new Date();
  
  await booking.save();
  
  // Release slot lock
  await releaseSlotLock({
    doctorId: booking.doctor,
    date: booking.preferredDate,
    session: booking.session,
    slotTime: booking.slotTime,
    bookingId: booking._id
  });
  
  return booking;
}

/**
 * Cancel a booking
 */
async function cancelBooking(bookingId, reason, cancelledBy) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error('Booking not found');
  
  if (['cancelled', 'completed'].includes(booking.status)) {
    throw new Error('Booking cannot be cancelled');
  }
  
  booking.status = 'cancelled';
  booking.cancelledAt = new Date();
  booking.cancellationReason = reason;
  booking.cancelledBy = cancelledBy;
  await booking.save();
  
  // Release slot lock if still pending
  await releaseSlotLock({
    doctorId: booking.doctor,
    date: booking.preferredDate,
    session: booking.session,
    slotTime: booking.slotTime,
    bookingId: booking._id
  });
  
  return booking;
}

/**
 * Validate date is within allowed range (tomorrow to 30 days)
 */
function validateDateRange(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);
  
  if (date < tomorrow) {
    throw new Error('Bookings must be made at least 1 day in advance');
  }
  if (date > maxDate) {
    throw new Error('Bookings can only be made up to 30 days in advance');
  }
}

module.exports = {
  initiateBooking,
  confirmBooking,
  cancelBooking
};