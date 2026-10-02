const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookingController');
const { protect, requirePermission } = require('../middleware/auth');
const { idempotent } = require('../middleware/idempotency');
const { audit } = require('../middleware/auditLogger');

// Public
router.get('/availability', ctrl.availability);
router.post('/', idempotent, ctrl.initiate);

// Protected
router.use(protect);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.post('/:id/confirm', requirePermission('canManagePayments'), audit('payment.confirm', 'Booking'), ctrl.confirm);
router.post('/:id/cancel', requirePermission('canManageBookings'), audit('booking.cancel', 'Booking'), ctrl.cancel);
router.post('/:id/check-in', requirePermission('canCheckInPatients'), audit('booking.update', 'Booking'), ctrl.checkIn);

module.exports = router;