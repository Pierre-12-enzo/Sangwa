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
    lowercase: true
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
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);