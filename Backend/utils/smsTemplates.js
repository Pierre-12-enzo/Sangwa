// src/utils/smsTemplates.js

/**
 * Format phone number for Africa's Talking
 * Ensure it's in international format
 */
const formatPhoneNumber = (phone) => {
  // Remove any non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If number starts with 0, replace with 250 (Rwanda country code)
  if (cleaned.startsWith('0')) {
    cleaned = '250' + cleaned.slice(1);
  }
  
  // If number starts with 7, add 250
  if (cleaned.startsWith('7')) {
    cleaned = '250' + cleaned;
  }
  
  // Ensure it starts with 250
  if (!cleaned.startsWith('250')) {
    cleaned = '250' + cleaned;
  }
  
  return cleaned;
};

/**
 * SMS Templates
 */
const smsTemplates = {
  /**
   * Confirmation SMS - Sent immediately after booking
   */
  confirmation: (booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    return `Sangwa Polyclinic: Hi ${booking.patientName}, your appointment is confirmed for ${date} at ${booking.preferredTime} (${booking.service}). Location: Ngoma, Huye (near CHUB). Call 0793929136 for changes.`;
  },

  /**
   * Reminder SMS - Sent 24 hours before appointment
   */
  reminder: (booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    return `Sangwa Polyclinic Reminder: Your appointment is tomorrow ${date} at ${booking.preferredTime} (${booking.service}). Please arrive 15 mins early. Bring ID & insurance card. Call 0793929136 to reschedule.`;
  },

  /**
   * Reschedule Confirmation
   */
  reschedule: (booking, oldDate) => {
    const newDate = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    return `Sangwa Polyclinic: Your appointment has been rescheduled to ${newDate} at ${booking.preferredTime}. Previous: ${oldDate}. Call 0793929136 if any issues.`;
  },

  /**
   * Cancellation Confirmation
   */
  cancellation: (booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString('en-RW', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    return `Sangwa Polyclinic: Your appointment on ${date} at ${booking.preferredTime} has been cancelled. To rebook, call 0793929136 or visit our website.`;
  },
};

module.exports = {
  smsTemplates,
  formatPhoneNumber,
};