// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Public route - Create booking
router.post(
  '/',
  [
    body('patientName').notEmpty().withMessage('Patient name is required'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required'),
    body('service').notEmpty().withMessage('Service is required'),
    body('preferredDate').notEmpty().withMessage('Preferred date is required'),
    body('preferredTime').notEmpty().withMessage('Preferred time is required'),
  ],
  bookingController.createBooking
);

// Admin routes
router.get('/', auth, bookingController.getAllBookings);
router.get('/stats', auth, bookingController.getStats);
router.get('/:id', auth, bookingController.getBookingById);
router.put('/:id/status', auth, bookingController.updateBookingStatus);
router.delete('/:id', auth, bookingController.deleteBooking);

module.exports = router;