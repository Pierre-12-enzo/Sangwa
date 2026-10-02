// backend/controllers/queueController.js
const Booking = require('../models/Booking');
const asyncHandler = require('../utils/asyncHandler');
const queueService = require('../services/queueService');
const { log } = require('../middleware/auditLogger');

/**
 * @route   GET /api/queue
 * @desc    Get queue for the logged-in doctor (or by query for admin)
 * @access  Private/Doctor
 */
exports.getMyQueue = asyncHandler(async (req, res) => {
  const { date, session } = req.query;

  const doctorId = req.user.role === 'doctor'
    ? req.user.doctorProfile
    : req.query.doctorId;

  if (!doctorId) {
    return res.status(400).json({
      success: false,
      message: 'doctorId is required'
    });
  }

  const dateObj = date ? new Date(date) : new Date();
  dateObj.setHours(0, 0, 0, 0);

  if (session) {
    const queue = await queueService.getQueueForSession({
      doctor: doctorId,
      date: dateObj,
      session
    });
    return res.json({ success: true, doctor: doctorId, date: dateObj, session, data: queue });
  }

  // Return all sessions for the day
  const sessions = ['morning', 'afternoon', 'evening'];
  const all = {};
  for (const s of sessions) {
    all[s] = await queueService.getQueueForSession({
      doctor: doctorId,
      date: dateObj,
      session: s
    });
  }
  res.json({ success: true, doctor: doctorId, date: dateObj, sessions: all });
});

/**
 * @route   POST /api/queue/advance
 * @desc    Doctor: mark current patient complete + call next
 * @access  Private/Doctor
 */
exports.advance = asyncHandler(async (req, res) => {
  const { completedBookingId, date, session } = req.body;

  const doctorId = req.user.role === 'doctor'
    ? req.user.doctorProfile
    : req.body.doctorId;

  if (!doctorId || !date || !session) {
    return res.status(400).json({
      success: false,
      message: 'doctorId, date, and session are required'
    });
  }

  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0);

  const result = await queueService.advanceQueue({
    doctor: doctorId,
    date: dateObj,
    session,
    completedBookingId,
    doctorUserId: req.user._id
  });

  await log({
    user: req.user,
    action: 'booking.update',
    resourceType: 'Booking',
    resourceId: completedBookingId,
    req,
    metadata: { action: 'advance_queue', session }
  });

  res.json({ success: true, ...result });
});

/**
 * @route   POST /api/queue/pause
 * @desc    Doctor pauses queue (delay)
 * @access  Private/Doctor
 */
exports.pause = asyncHandler(async (req, res) => {
  // Placeholder: to be implemented with delay notifications
  res.json({ success: true, message: 'Queue paused (feature coming soon)' });
});