// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: ['Maternity', 'Internal Medicine', 'Pediatrics', 'Gynecology', 'Laboratory', 'Pharmacy']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required']
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required']
  },
  additionalNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  bookingReference: {
    type: String,
    unique: true
  },
  // ✅ Add these fields for tracking
  smsSent: {
    type: Boolean,
    default: false
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Pre-save middleware - Generate booking reference
bookingSchema.pre('save', function () {
  // Generate a unique booking reference
  if (!this.bookingReference) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.bookingReference = `SANG${year}${month}${day}${random}`;
  }

});

// ✅ Post-save middleware for logging
bookingSchema.post('save', function (doc) {
  console.log(`✅ Booking saved: ${doc.bookingReference} - ${doc.patientName}`);
});

// ✅ Pre-validate middleware
// ✅ FIXED: Pre-validate middleware (optional)
// NOTE: Mongoose 9 hooks are async-friendly. Omit the `next` param and just throw.
bookingSchema.pre('validate', function () {
  // Ensure preferredDate is not in the past
  if (this.preferredDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (this.preferredDate < today) {
      throw new Error('Preferred date cannot be in the past');
    }
  }
});

// Instance method to update status
bookingSchema.methods.updateStatus = function (newStatus) {
  this.status = newStatus;
  return this.save();
};

// Static method to find by reference
bookingSchema.statics.findByReference = function (reference) {
  return this.findOne({ bookingReference: reference });
};

module.exports = mongoose.model('Booking', bookingSchema);