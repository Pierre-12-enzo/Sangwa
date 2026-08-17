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
    enum: [
      'Maternity',
      'Internal Medicine',
      'Pediatrics',
      'Gynecology',
      'Laboratory',
      'Pharmacy',
      'Dental',
      'Ophthalmology',
      'Orthopedics',
      'Dermatology',
    ],
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ FIXED: Pre-save middleware - Generate booking reference
// NOTE: With Mongoose 9, async middleware must NOT take a `next` parameter.
// Return / throw to signal completion; do not call `next()`.
bookingSchema.pre('save', async function () {
  // Generate a unique booking reference
  if (this.bookingReference) return;

  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Try up to 5 times to generate a unique reference (avoid 11000 collisions)
  for (let attempt = 0; attempt < 5; attempt++) {
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const candidate = `SANG${year}${month}${day}${random}`;
    // eslint-disable-next-line no-await-in-loop
    const exists = await this.constructor.findOne({ bookingReference: candidate }).lean();
    if (!exists) {
      this.bookingReference = candidate;
      return;
    }
  }

  throw new Error('Could not generate a unique booking reference, please retry');
});

// ✅ FIXED: Post-save middleware (optional - for logging)
bookingSchema.post('save', function (doc) {
  console.log(`✅ Booking saved: ${doc.bookingReference} - ${doc.patientName}`);
});

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