// backend/controllers/dashboardController.js
const Booking = require('../models/Booking');
const Patient = require('../models/Patient');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @route   GET /api/dashboard/stats
 * @desc    Today's stats for reception/admin
 * @access  Private
 */
exports.stats = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    todayTotal,
    todayConfirmed,
    todayCheckedIn,
    todayCompleted,
    todayPending,
    totalPatients,
    totalRevenueToday
  ] = await Promise.all([
    Booking.countDocuments({ preferredDate: { $gte: today, $lt: tomorrow } }),
    Booking.countDocuments({ preferredDate: { $gte: today, $lt: tomorrow }, status: 'confirmed' }),
    Booking.countDocuments({ preferredDate: { $gte: today, $lt: tomorrow }, status: 'checked_in' }),
    Booking.countDocuments({ preferredDate: { $gte: today, $lt: tomorrow }, status: 'completed' }),
    Booking.countDocuments({ preferredDate: { $gte: today, $lt: tomorrow }, status: 'pending_payment' }),
    Patient.countDocuments({ isActive: true }),
    Booking.aggregate([
      {
        $match: {
          preferredDate: { $gte: today, $lt: tomorrow },
          paymentStatus: 'paid'
        }
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
  ]);

  res.json({
    success: true,
    data: {
      today: {
        total: todayTotal,
        confirmed: todayConfirmed,
        checkedIn: todayCheckedIn,
        completed: todayCompleted,
        pendingPayment: todayPending
      },
      patients: { total: totalPatients },
      revenue: { today: totalRevenueToday[0]?.total || 0 }
    }
  });
});