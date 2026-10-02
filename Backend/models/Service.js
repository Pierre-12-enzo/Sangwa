// backend/models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  shortDescription: { type: String, required: true, maxlength: 200 },
  fullDescription: { type: String, required: true },
  icon: { type: String, default: 'fa-stethoscope' },
  image: { type: String, default: '' },
  
  category: {
    type: String,
    enum: ['Maternity', 'Pediatrics', 'Internal Medicine', 'Gynecology', 'Laboratory', 'Pharmacy', 'Other'],
    default: 'Other'
  },
  
  // === Booking Mode ===
  bookingMode: {
    type: String,
    enum: ['session', 'fixed_slot'],
    default: 'session'
  },
  // session → morning/afternoon/evening with queue
  // fixed_slot → precise times (e.g., lab tests, scans)
  
  // === Pricing ===
  price: { type: Number, required: true },
  currency: { type: String, default: 'RWF' },
  isPriceFixed: { type: Boolean, default: true },
  depositRequired: { type: Boolean, default: false },
  depositAmount: { type: Number, default: 0 },
  
  // === Timing ===
  duration: { type: Number, default: 30 }, // minutes (for fixed_slot)
  avgConsultationMinutes: { type: Number, default: 15 }, // for queue estimation
  
  // === Session config (only for session-based) ===
  sessionConfig: {
    morning: {
      enabled: { type: Boolean, default: true },
      startTime: { type: String, default: '08:00' },
      endTime: { type: String, default: '12:00' },
      maxPatients: { type: Number, default: 10 }
    },
    afternoon: {
      enabled: { type: Boolean, default: true },
      startTime: { type: String, default: '14:00' },
      endTime: { type: String, default: '17:00' },
      maxPatients: { type: Number, default: 10 }
    },
    evening: {
      enabled: { type: Boolean, default: false },
      startTime: { type: String, default: '18:00' },
      endTime: { type: String, default: '20:00' },
      maxPatients: { type: Number, default: 5 }
    }
  },
  
  // === Slot config (only for fixed_slot) ===
  slotConfig: {
    slotDuration: { type: Number, default: 30 }, // minutes per slot
    maxParallel: { type: Number, default: 1 } // patients per slot (usually 1)
  },
  
  // === Providers ===
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  
  // === Content ===
  features: [String],
  preparationInstructions: String,
  faqs: [{
    question: String,
    answer: String
  }],
  
  // === Coverage ===
  acceptedInsurances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insurance'
  }],
  
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-slug
serviceSchema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);