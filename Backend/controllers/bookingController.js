// src/controllers/bookingController.js
const Booking = require('../models/Booking');
const { sms } = require('../config/africasTalking');
const { apiInstance, emailConfig } = require('../config/brevo');
const { smsTemplates, formatPhoneNumber } = require('../utils/smsTemplates');
const emailTemplates = require('../utils/emailTemplates');
const SibApiV3Sdk = require('sib-api-v3-sdk'); // ✅ ADD THIS IMPORT

/**
 * Create a new booking
 */
exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Validate phone number
    if (!bookingData.phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    // Create booking
    const booking = new Booking(bookingData);
    await booking.save();

    console.log(`✅ Booking created: ${booking.bookingReference} for ${booking.patientName}`);
    console.log(`📱 Phone: ${booking.phoneNumber}`);
    console.log(`📧 Email: ${booking.email || 'Not provided'}`);

    // Send SMS Confirmation
    let smsSent = false;
    let smsError = null;
    try {
      // ✅ Format phone number correctly (now with + prefix)
      const formattedPhone = formatPhoneNumber(booking.phoneNumber);
      console.log(`📱 Attempting SMS to: ${formattedPhone}`);

      const smsMessage = smsTemplates.confirmation(booking);
      console.log(`📝 SMS Message: ${smsMessage.substring(0, 60)}...`);

      // ✅ Log what we're sending
      console.log('📤 SMS Payload:', {
        to: [formattedPhone],
        message: smsMessage,
        from: process.env.AFRICASTALKING_SHORTCODE || 'SANGWA'
      });

      const result = await sms.send({
        to: [formattedPhone],
        message: smsMessage,
        from: process.env.AFRICASTALKING_SHORTCODE || 'SANGWA',
      });

      console.log('📱 SMS Response:', JSON.stringify(result, null, 2));

      // Check if SMS was sent successfully
      if (result && result.SMSMessageData && result.SMSMessageData.Recipients) {
        const recipient = result.SMSMessageData.Recipients[0];
        if (recipient && recipient.status === 'Success') {
          smsSent = true;
          console.log(`✅ SMS sent to ${formattedPhone}`);
        } else {
          console.log(`⚠️ SMS status: ${recipient?.status || 'Unknown'}`);
          smsError = recipient?.status || 'SMS sending failed';
        }
      } else {
        console.log('⚠️ Unexpected SMS response format');
        smsError = 'Unexpected SMS response';
      }
    } catch (error) {
      console.error('❌ SMS Error:', error.message);
      console.error('❌ SMS Error Details:', error.response?.data || error);
      smsError = error.message;
    }

    // Send Email Confirmation (if email provided)
    let emailSent = false;
    let emailError = null;
    if (booking.email) {
      try {
        console.log(`📧 Attempting email to: ${booking.email}`);

        const emailTemplate = emailTemplates.confirmation(booking);

        // ✅ Use correct Brevo SDK
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = emailTemplate.subject;
        sendSmtpEmail.htmlContent = emailTemplate.html;
        sendSmtpEmail.sender = emailConfig.sender;
        sendSmtpEmail.to = [{
          email: booking.email,
          name: booking.patientName
        }];
        sendSmtpEmail.replyTo = {
          email: emailConfig.sender.email,
          name: emailConfig.sender.name
        };

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        emailSent = true;
        console.log(`✅ Email sent to ${booking.email}`);
        console.log(`📧 Message ID: ${result.messageId}`);
      } catch (error) {
        console.error('❌ Email Error:', error.message);
        console.error('❌ Email Error Details:', error.response?.body || error);

        // ✅ Check if it's an IP whitelist issue
        if (error.response?.body?.message?.includes('unrecognised IP address')) {
          console.log('🔑 ACTION REQUIRED: Add your IP to Brevo whitelist');
          console.log('   Go to: https://app.brevo.com/security/authorised_ips');
          console.log('   Add IP: 197.157.155.92');
        }

        emailError = error.message;
      }
    } else {
      console.log('ℹ️ No email provided, skipping email notification');
    }

    // Save SMS/Email status to booking
    booking.smsSent = smsSent;
    booking.emailSent = emailSent;
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      data: {
        booking: {
          ...booking.toJSON(),
          smsSent,
          emailSent,
          smsError,
          emailError,
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
          // ✅ FIXED: Use SibApiV3Sdk correctly
          const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
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

    // Persist status + flag changes in one update
    await Booking.updateOne(
      { _id: booking._id },
      {
        $set: {
          status: booking.status,
          smsSent: booking.smsSent,
          emailSent: booking.emailSent,
        },
      }
    );

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

    res.json({
      success: true,
      message: `Booking ${status}`,
      data: booking,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
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