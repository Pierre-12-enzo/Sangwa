// src/utils/emailTemplates.js

/**
 * Email Templates for Brevo
 */
const emailTemplates = {
  /**
   * Confirmation Email - Sent immediately after booking
   */
  confirmation: (booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      subject: `✅ Appointment Confirmed - Sangwa Polyclinic`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3B6B66; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background: #f8fafc; border-radius: 0 0 8px 8px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
            .detail-row:last-child { border-bottom: none; }
            .label { font-weight: 600; color: #0F172A; }
            .value { color: #475569; }
            .cta { display: inline-block; background: #E06D20; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Sangwa Polyclinic</h1>
              <p style="margin: 5px 0 0; opacity: 0.9;">Your Health, Our Priority</p>
            </div>
            
            <div class="content">
              <h2 style="color: #0F172A;">Appointment Confirmed ✅</h2>
              <p>Dear <strong>${booking.patientName}</strong>,</p>
              <p>Your appointment at <strong>Sangwa Polyclinic</strong> has been confirmed.</p>
              
              <div class="booking-details">
                <h3 style="color: #3B6B66; margin-top: 0;">Appointment Details</h3>
                <div class="detail-row">
                  <span class="label">📅 Date</span>
                  <span class="value">${date}</span>
                </div>
                <div class="detail-row">
                  <span class="label">⏰ Time</span>
                  <span class="value">${booking.preferredTime}</span>
                </div>
                <div class="detail-row">
                  <span class="label">🏥 Service</span>
                  <span class="value">${booking.service}</span>
                </div>
                <div class="detail-row">
                  <span class="label">📍 Location</span>
                  <span class="value">Ngoma, Huye (Near CHUB)</span>
                </div>
                <div class="detail-row">
                  <span class="label">🔖 Reference</span>
                  <span class="value"><strong>${booking.bookingReference}</strong></span>
                </div>
              </div>

              <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;"><strong>📋 What to bring:</strong></p>
                <ul style="margin: 5px 0; font-size: 14px; color: #475569;">
                  <li>Government-issued ID</li>
                  <li>Insurance card (if applicable)</li>
                  <li>Previous medical records (if any)</li>
                </ul>
              </div>

              <p style="font-size: 14px; color: #475569;">
                Need to reschedule? Call us at <strong style="color: #0F172A;">0793929136</strong>
              </p>

              <a href="${process.env.FRONTEND_URL}/booking/${booking.bookingReference}" class="cta">
                View Booking Status
              </a>

              <div class="footer">
                <p style="margin: 0;">Sangwa Polyclinic · Ngoma, Huye</p>
                <p style="margin: 5px 0 0;">📞 0793929136 · ✉️ info@sangwapolyclinic.com</p>
                <p style="margin: 5px 0 0; font-size: 12px;">Mon-Sat: 7AM - 8PM · 24/7 Emergency</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  },

  /**
   * Reminder Email - Sent 24 hours before appointment
   */
  reminder: (booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      subject: `⏰ Appointment Reminder - Tomorrow at ${booking.preferredTime}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E06D20; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background: #f8fafc; border-radius: 0 0 8px 8px; }
            .reminder-box { background: #fffbeb; border-left: 4px solid #E06D20; padding: 15px; border-radius: 4px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">⏰ Appointment Reminder</h2>
            </div>
            
            <div class="content">
              <h3 style="color: #0F172A;">Dear ${booking.patientName},</h3>
              
              <div class="reminder-box">
                <p style="margin: 0; font-weight: 600;">Your appointment is TOMORROW</p>
                <p style="margin: 5px 0 0;">📅 ${date} at ⏰ ${booking.preferredTime}</p>
                <p style="margin: 5px 0 0; font-size: 14px;">🏥 ${booking.service}</p>
              </div>

              <p><strong>📍 Location:</strong> Ngoma, Huye (Near CHUB)</p>
              <p><strong>📞 Emergency Contact:</strong> 0793929136</p>

              <p style="font-size: 14px; color: #475569;">
                Please arrive <strong>15 minutes early</strong> and bring:
              </p>
              <ul style="font-size: 14px; color: #475569;">
                <li>Government ID</li>
                <li>Insurance card</li>
              </ul>

              <p style="font-size: 14px; color: #475569;">
                Need to reschedule? Call us at <strong style="color: #0F172A;">0793929136</strong>
              </p>

              <div class="footer">
                <p style="margin: 0;">Sangwa Polyclinic · Ngoma, Huye</p>
                <p style="margin: 5px 0 0;">📞 0793929136 · ✉️ info@sangwapolyclinic.com</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  },
};

module.exports = emailTemplates;