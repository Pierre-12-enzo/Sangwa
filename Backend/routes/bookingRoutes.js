// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bookingController = require('../controllers/bookingController');

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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array().map((e) => e.msg).join('. '),
      });
    }
    next();
  },
  bookingController.createBooking
);

// Admin routes (without auth for testing - add auth later)
router.get('/', bookingController.getAllBookings);
router.get('/stats', bookingController.getStats);
router.get('/:id', bookingController.getBookingById);
router.put('/:id/status', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;