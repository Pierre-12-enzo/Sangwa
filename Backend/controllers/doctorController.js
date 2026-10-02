// backend/controllers/doctorController.js
const Doctor = require('../models/Doctor');
const asyncHandler = require('../utils/asyncHandler');
const { log } = require('../middleware/auditLogger');

/**
 * @route   GET /api/doctors
 * @desc    List active doctors (public)
 * @access  Public
 */
exports.list = asyncHandler(async (req, res) => {
  const { serviceId } = req.query;
  const filter = { isActive: true };
  if (serviceId) filter.services = serviceId;

  const doctors = await Doctor.find(filter)
    .populate('services', 'name icon slug')
    .sort({ yearsOfExperience: -1 });

  res.json({ success: true, count: doctors.length, data: doctors });
});

/**
 * @route   GET /api/doctors/:id
 * @desc    Get doctor by ID
 * @access  Public
 */
exports.getOne = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id)
    .populate('services', 'name icon slug price bookingMode');
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }
  res.json({ success: true, data: doctor });
});

/**
 * @route   POST /api/doctors
 * @desc    Create doctor (admin/manager)
 * @access  Private/Admin
 */
exports.create = asyncHandler(async (req, res) => {
  const doctor = await Doctor.create(req.body);

  await log({
    user: req.user,
    action: 'doctor.create',
    resourceType: 'Doctor',
    resourceId: doctor._id,
    req
  });

  res.status(201).json({ success: true, data: doctor });
});

/**
 * @route   PUT /api/doctors/:id
 * @desc    Update doctor
 * @access  Private/Admin
 */
exports.update = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }

  await log({
    user: req.user,
    action: 'doctor.update',
    resourceType: 'Doctor',
    resourceId: doctor._id,
    req
  });

  res.json({ success: true, data: doctor });
});

/**
 * @route   POST /api/doctors/:id/leave
 * @desc    Add leave day
 * @access  Private/Admin
 */
exports.addLeave = asyncHandler(async (req, res) => {
  const { date, reason, allDay = true, affectedSessions = [] } = req.body;

  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }

  doctor.unavailableDates.push({
    date: new Date(date),
    reason,
    allDay,
    affectedSessions
  });
  await doctor.save();

  await log({
    user: req.user,
    action: 'doctor.update',
    resourceType: 'Doctor',
    resourceId: doctor._id,
    req,
    metadata: { action: 'add_leave', date, reason }
  });

  res.json({ success: true, data: doctor });
});

/**
 * @route   DELETE /api/doctors/:id/leave/:leaveId
 * @desc    Remove leave
 * @access  Private/Admin
 */
exports.removeLeave = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return res.status(404).json({ success: false, message: 'Doctor not found' });
  }

  doctor.unavailableDates = doctor.unavailableDates.filter(
    (u) => u._id.toString() !== req.params.leaveId
  );
  await doctor.save();

  res.json({ success: true, data: doctor });
});