// backend/models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  userEmail: String,
  action: {
    type: String,
    enum: [
      'patient.create', 'patient.view', 'patient.update', 'patient.delete',
      'booking.create', 'booking.update', 'booking.cancel', 'booking.view',
      'payment.initiate', 'payment.confirm', 'payment.refund',
      'doctor.create', 'doctor.update', 'doctor.delete',
      'service.create', 'service.update', 'service.delete',
      'user.login', 'user.logout', 'user.create', 'user.update',
      'medical_record.view', 'medical_record.create'
    ],
    required: true,
    index: true
  },
  resourceType: String, // 'Patient', 'Booking', etc.
  resourceId: mongoose.Schema.Types.ObjectId,
  ipAddress: String,
  userAgent: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now, expires: 63072000 } // 2 years TTL
});

module.exports = mongoose.model('AuditLog', auditLogSchema);