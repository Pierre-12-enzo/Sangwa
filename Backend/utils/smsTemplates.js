// backend/utils/smsTemplates.js

/**
 * Format phone number for Africa's Talking
 * Africa's Talking expects: +250XXXXXXXX (E.164 format with +)
 */
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  console.log(`🔍 Original: ${phone}, Cleaned: ${cleaned}`);
  
  // If it starts with 0, remove it (Rwandan format: 0788XXXXXX -> 788XXXXXX)
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // ✅ If it starts with 250, keep it and add +
  if (cleaned.startsWith('250')) {
    return '+' + cleaned;
  }
  
  // ✅ If it doesn't start with 250, add it and add +
  if (!cleaned.startsWith('250')) {
    cleaned = '250' + cleaned;
  }
  
  const formatted = '+' + cleaned;
  console.log(`📱 Formatted: ${formatted}`);
  return formatted;
};

const smsTemplates = {
  confirmation: (booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return `✅ SANGWA POLYCLINIC: Appointment confirmed for ${booking.patientName} on ${date} at ${booking.preferredTime}. Service: ${booking.service}. Ref: ${booking.bookingReference}. Call 0793929136 for changes.`;
  },
  
  cancellation: (booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return `❌ SANGWA POLYCLINIC: Appointment for ${booking.patientName} on ${date} at ${booking.preferredTime} has been CANCELLED. Ref: ${booking.bookingReference}. Call 0793929136 to reschedule.`;
  },
  
  reminder: (booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return `🔔 SANGWA POLYCLINIC: Reminder: ${booking.patientName}, your appointment is tomorrow at ${date} ${booking.preferredTime}. Service: ${booking.service}. Ref: ${booking.bookingReference}.`;
  }
};

module.exports = { smsTemplates, formatPhoneNumber };