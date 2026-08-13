// src/controllers/bookingController.js
const Booking = require('../models/Booking');
const { sms } = require('../config/africasTalking');
const { apiInstance, emailConfig } = require('../config/brevo');
const { smsTemplates, formatPhoneNumber } = require('../utils/smsTemplates');
const emailTemplates = require('../utils/emailTemplates');
const sdk = require('sib-api-v3-sdk');

/**
 * Create a new booking
 * Handles: SMS confirmation + Email confirmation
 */
exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate phone number format
    if (!bookingData.phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    // Create booking
    const booking = new Booking(bookingData);
    await booking.save();

    // Send SMS Confirmation
    let smsSent = false;
    try {
      const formattedPhone = formatPhoneNumber(booking.phoneNumber);
      const smsMessage = smsTemplates.confirmation(booking);
      
      const result = await sms.send({
        to: [formattedPhone],
        message: smsMessage,
        from: process.env.AFRICASTALKING_SHORTCODE || 'SANGWA',
      });
      
      if (result.SMSMessageData.Recipients[0].status === 'Success') {
        booking.smsSent = true;
        await booking.save();
        smsSent = true;
      }
    } catch (error) {
      console.error('❌ SMS Error:', error.message);
      // Continue even if SMS fails - we'll retry later
    }

    // Send Email Confirmation (if email provided)
    let emailSent = false;
    if (booking.email) {
      try {
        const emailTemplate = emailTemplates.confirmation(booking);
        
        const sendSmtpEmail = new sdk.SendSmtpEmail();
        sendSmtpEmail.subject = emailTemplate.subject;
        sendSmtpEmail.htmlContent = emailTemplate.html;
        sendSmtpEmail.sender = emailConfig.sender;
        sendSmtpEmail.to = [{ email: booking.email, name: booking.patientName }];
        
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        booking.emailSent = true;
        await booking.save();
        emailSent = true;
      } catch (error) {
        console.error('❌ Email Error:', error.message);
        // Continue even if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      data: {
        booking: {
          ...booking.toJSON(),
          smsSent,
          emailSent,
        },
      },
    });
  } catch (error) {
    console.error('❌ Booking Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create booking',
    });
  }
};

/**
 * Get all bookings (Admin only)
 */
exports.getAllBookings = async (req, res) => {
  try {
    const { status, startDate, endDate, service } = req.query;
    
    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = service;
    if (startDate || endDate) {
      filter.preferredDate = {};
      if (startDate) filter.preferredDate.$gte = new Date(startDate);
      if (endDate) filter.preferredDate.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(filter)
      .sort({ preferredDate: 1, preferredTime: 1 })
      .lean();

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get single booking by ID
 */
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update booking status
 */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Store old status for comparison
    const oldStatus = booking.status;
    booking.status = status;
    
    // If confirming, send SMS and Email
    if (status === 'confirmed' && oldStatus !== 'confirmed') {
      // Send confirmation if not already sent
      if (!booking.smsSent) {
        try {
          const formattedPhone = formatPhoneNumber(booking.phoneNumber);
          const smsMessage = smsTemplates.confirmation(booking);
          await sms.send({
            to: [formattedPhone],
            message: smsMessage,
            from: process.env.AFRICASTALKING_SHORTCODE || 'SANGWA',
          });
          booking.smsSent = true;
        } catch (error) {
          console.error('❌ SMS Error:', error.message);
        }
      }

      // Send email if not already sent and email exists
      if (booking.email && !booking.emailSent) {
        try {
          const emailTemplate = emailTemplates.confirmation(booking);
          const sendSmtpEmail = new sdk.SendSmtpEmail();
          sendSmtpEmail.subject = emailTemplate.subject;
          sendSmtpEmail.htmlContent = emailTemplate.html;
          sendSmtpEmail.sender = emailConfig.sender;
          sendSmtpEmail.to = [{ email: booking.email, name: booking.patientName }];
          await apiInstance.sendTransacEmail(sendSmtpEmail);
          booking.emailSent = true;
        } catch (error) {
          console.error('❌ Email Error:', error.message);
        }
      }
    }

    // If cancelled, send cancellation notification
    if (status === 'cancelled' && oldStatus !== 'cancelled') {
      try {
        const formattedPhone = formatPhoneNumber(booking.phoneNumber);
        const smsMessage = smsTemplates.cancellation(booking);
        await sms.send({
          to: [formattedPhone],
          message: smsMessage,
          from: process.env.AFRICASTALKING_SHORTCODE || 'SANGWA',
        });
      } catch (error) {
        console.error('❌ SMS Error:', error.message);
      }
    }

    await booking.save();

    res.json({
      success: true,
      message: `Booking ${status}`,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete booking
 */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    await booking.deleteOne();
    res.json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get dashboard statistics
 */
exports.getStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalBookings,
      todayBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({
        preferredDate: { $gte: today, $lt: tomorrow },
      }),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ status: 'completed' }),
      Booking.countDocuments({ status: 'cancelled' }),
    ]);

    // Get bookings by service
    const serviceStats = await Booking.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        total: totalBookings,
        today: todayBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
        byService: serviceStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};