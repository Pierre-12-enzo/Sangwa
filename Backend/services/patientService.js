// backend/services/patientService.js
const Patient = require('../models/Patient');

/**
 * Find existing patient by phone, or create a partial profile
 * Used during online booking & reception registration
 */
async function findOrCreatePatient({ 
  phoneNumber, 
  firstName, 
  lastName, 
  email,
  registeredVia = 'online',
  registeredBy = null
}) {
  // Normalize phone
  const normalizedPhone = normalizePhone(phoneNumber);
  
  // Try to find existing
  let patient = await Patient.findOne({ phoneNumber: normalizedPhone });
  
  if (patient) {
    // Optionally enrich missing fields
    let updated = false;
    
    if (!patient.email && email) {
      patient.email = email;
      updated = true;
    }
    if (!patient.lastName && lastName) {
      patient.lastName = lastName;
      updated = true;
    }
    
    if (updated) await patient.save();
    return { patient, isNew: false };
  }
  
  // Create partial patient
  patient = await Patient.create({
    firstName: firstName || 'Unknown',
    lastName: lastName || '',
    phoneNumber: normalizedPhone,
    email: email || undefined,
    registeredVia,
    registeredBy,
    profileStatus: 'partial'
  });
  
  return { patient, isNew: true };
}

/**
 * Normalize Rwandan phone numbers to +250XXXXXXXXX
 */
function normalizePhone(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
  if (!cleaned.startsWith('250')) cleaned = '250' + cleaned;
  return '+' + cleaned;
}

module.exports = { findOrCreatePatient, normalizePhone };