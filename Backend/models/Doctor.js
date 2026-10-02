// backend/models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  // === Identity ===
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  fullName: { type: String, trim: true, index: true },
  title: {
    type: String,
    enum: ['Dr.', 'Prof.', 'Specialist', 'Consultant'],
    default: 'Dr.'
  },
  photo: { type: String, default: '' },
  bio: { type: String, maxlength: 1000, default: '' },
  email: { type: String, trim: true, lowercase: true },
  phoneNumber: { type: String, trim: true },
  
  // === Credentials ===
  licenseNumber: { type: String, trim: true },
  yearsOfExperience: { type: Number, default: 0 },
  qualifications: [String], // ['MBBS', 'MD', 'Specialist in Obstetrics']
  languages: { type: [String], default: ['Kinyarwanda', 'English'] },
  
  // === Services Offered ===
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  
  // === Weekly Schedule ===
  weeklySchedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    isWorking: { type: Boolean, default: true },
    sessions: [{
      name: {
        type: String,
        enum: ['morning', 'afternoon', 'evening'],
        required: true
      },
      startTime: { type: String, required: true }, // '08:00'
      endTime: { type: String, required: true },   // '12:00'
      maxPatients: { type: Number, default: 10 },
      avgConsultationMinutes: { type: Number, default: 15 }
    }]
  }],
  
  // === Leave / Unavailability ===
  unavailableDates: [{
    date: { type: Date, required: true },
    reason: { type: String, default: '' },
    allDay: { type: Boolean, default: true },
    // If not all day, specify which sessions
    affectedSessions: { type: [String], default: [] }
  }],
  
  // === Financials ===
  consultationFee: { type: Number, default: 0 },
  
  // === Account ===
  isActive: { type: Boolean, default: true },
  isAcceptingPatients: { type: Boolean, default: true },
  
  // === Link to User (login) ===
  userAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-generate full name
doctorSchema.pre('save', function(next) {
  this.fullName = `${this.title} ${this.firstName} ${this.lastName}`.trim();
  this.updatedAt = new Date();
  next();
});

// === Method: get availability for a specific date ===
doctorSchema.methods.getAvailabilityForDate = function(date) {
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  const daySchedule = this.weeklySchedule.find(d => d.day === dayOfWeek);
  
  if (!daySchedule || !daySchedule.isWorking) {
    return { available: false, sessions: [], reason: 'Not working this day' };
  }
  
  // Check for leave
  const leave = this.unavailableDates.find(u => 
    u.date.toDateString() === date.toDateString()
  );
  
  if (leave && leave.allDay) {
    return { available: false, sessions: [], reason: leave.reason || 'On leave' };
  }
  
  // Filter out sessions blocked by partial leave
  const availableSessions = daySchedule.sessions.filter(s => 
    !leave || !leave.affectedSessions.includes(s.name)
  );
  
  return { available: true, sessions: availableSessions };
};

module.exports = mongoose.model('Doctor', doctorSchema);