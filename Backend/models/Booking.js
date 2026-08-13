// src/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[0-9+\s()-]{10,15}$/,
        'Please enter a valid phone number (e.g., 0788XXXXXX)',
      ],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
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
      required: [true, 'Preferred date is required'],
      validate: {
        validator: function (value) {
          return value >= new Date().setHours(0, 0, 0, 0);
        },
        message: 'Preferred date cannot be in the past',
      },
    },
    preferredTime: {
      type: String,
      required: [true, 'Preferred time is required'],
      enum: [
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
      ],
    },
    additionalNotes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
      default: 'pending',
    },
    bookingReference: {
      type: String,
      unique: true,
    },
    smsSent: {
      type: Boolean,
      default: false,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate booking reference before saving
bookingSchema.pre('save', async function (next) {
  if (!this.bookingReference) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    this.bookingReference = `SANG-${year}${month}${day}-${random}`;
  }
  next();
});

// Virtual for formatted date
bookingSchema.virtual('formattedDate').get(function () {
  return this.preferredDate.toLocaleDateString('en-RW', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// Virtual for formatted time
bookingSchema.virtual('formattedTime').get(function () {
  return this.preferredTime;
});

// Index for faster queries
bookingSchema.index({ status: 1, preferredDate: 1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ phoneNumber: 1 });

module.exports = mongoose.model('Booking', bookingSchema);