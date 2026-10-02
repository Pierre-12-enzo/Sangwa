// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // === Who ===
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    index: true
  },
  patientName: String,
  patientNumber: String,
  phoneNumber: String,

  // === What ===
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  serviceName: String,
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  doctorName: String,

  // === When ===
  preferredDate: { type: Date, required: true, index: true },
  bookingType: {
    type: String,
    enum: ['session', 'fixed_slot'],
    required: true
  },
  session: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', null],
    default: null
  },
  slotTime: { type: String, default: null }, // '14:00' for fixed_slot

  // === Queue (session-based) ===
  tokenNumber: Number,
  queuePosition: Number,
  estimatedTime: Date,
  calledAt: Date,
  arrivedAt: Date,
  seenAt: Date,

  // === Payment ===
  amount: Number,
  currency: { type: String, default: 'RWF' },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'covered_by_insurance'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['mtn_momo', 'airtel_money', 'card', 'cash', 'insurance'],
    default: null
  },
  paymentReference: String,
  paidAt: Date,
  insuranceCoverage: {
    insurance: { type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' },
    coveredAmount: Number,
    patientPays: Number
  },

  // === Status ===
  status: {
    type: String,
    enum: [
      'pending_payment',
      'confirmed',
      'checked_in',
      'in_consultation',
      'completed',
      'cancelled',
      'no_show',
      'expired'
    ],
    default: 'pending_payment'
  },

  bookingReference: { type: String, unique: true, index: true },

  // === Notifications ===
  smsSent: { type: Boolean, default: false },
  emailSent: { type: Boolean, default: false },
  reminderSent: { type: Boolean, default: false },
  calledSmsSent: { type: Boolean, default: false },

  // === Clinical (Phase 3) ===
  medicalRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalRecord'
  },

  additionalNotes: String,
  cancellationReason: String,
  cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // === Idempotency ===
  idempotencyKey: { type: String, index: true, sparse: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  confirmedAt: Date,
  cancelledAt: Date
});

// === Prevent double-booking (only for fixed_slot) ===
bookingSchema.index(
  { doctor: 1, preferredDate: 1, slotTime: 1 },
  {
    unique: true,
    partialFilterExpression: {
      bookingType: 'fixed_slot',
      status: { $in: ['pending_payment', 'confirmed', 'checked_in', 'in_consultation'] }
    }
  }
);

// === Queue ordering (session-based) ===
bookingSchema.index({ doctor: 1, preferredDate: 1, session: 1, tokenNumber: 1 });

// === Patient history ===
bookingSchema.index({ patient: 1, preferredDate: -1 });

// === Auto-generate booking reference ===
bookingSchema.pre('save', function (next) {
  if (!this.bookingReference) {
    const date = new Date();
    const y = date.getFullYear().toString().slice(-2);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.bookingReference = `SANG${y}${m}${d}${rand}`;
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);