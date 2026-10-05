// backend/models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  // === Identity ===
  patientNumber: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  
  // === Personal Info (mostly optional to allow partial profiles) ===
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: false, trim: true, default: '' },
  fullName: { type: String, trim: true, index: true },
  dateOfBirth: { type: Date, required: false },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say', 'Unknown'],
    default: 'Unknown'
  },
  nationalId: { 
    type: String, 
    unique: true, 
    sparse: true, // ✅ allows multiple nulls
    trim: true 
  },
  
  // === Contact (phone is the only mandatory field beyond name) ===
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  alternatePhone: { type: String, trim: true, default: '' },
  email: { 
    type: String, 
    trim: true, 
    lowercase: true,
    sparse: true // ✅ allows multiple nulls
  },
  
  // === Location (optional) ===
  address: {
    sector: { type: String, default: '' },
    district: { type: String, default: '' },
    province: { type: String, default: '' },
    country: { type: String, default: 'Rwanda' }
  },
  
  // === Medical Basics ===
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
    default: 'Unknown'
  },
  allergies: { type: [String], default: [] },
  chronicConditions: { type: [String], default: [] },
  
  // === Insurance (link to Insurance collection) ===
  insurance: {
    provider: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Insurance',
      default: null
    },
    memberNumber: { type: String, default: '' },
    validUntil: { type: Date, default: null }
  },
  
  // === Emergency Contact ===
  emergencyContact: {
    name: { type: String, default: '' },
    relationship: { type: String, default: '' },
    phoneNumber: { type: String, default: '' }
  },
  
  // === Profile Status ===
  profileStatus: {
    type: String,
    enum: ['partial', 'complete'],
    default: 'partial'
  },
  profileCompleteness: {
    type: Number, // 0-100
    default: 0
  },
  
  // === Account ===
  isActive: { type: Boolean, default: true },
  registeredAt: { type: Date, default: Date.now },
  registeredBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null // null = self-registered online
  },
  registeredVia: {
    type: String,
    enum: ['online', 'reception'],
    default: 'online'
  },
  
  // === Metadata ===
  notes: { type: String, default: '' },
  tags: { type: [String], default: [] },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// === Auto-generate patient number + full name + completeness ===
patientSchema.pre('validate', async function() {
  // Auto-generate patient number
  if (!this.patientNumber) {
    const count = await mongoose.model('Patient').countDocuments();
    this.patientNumber = `SANG-P-${String(count + 1).padStart(5, '0')}`;
  }
  
  // Denormalize full name
  this.fullName = [this.firstName, this.lastName].filter(Boolean).join(' ');
  
  // Calculate profile completeness
  const fields = [
    this.firstName, this.lastName, this.dateOfBirth, this.gender !== 'Unknown',
    this.nationalId, this.phoneNumber, this.email,
    this.address?.district, this.bloodType !== 'Unknown',
    this.emergencyContact?.name, this.insurance?.memberNumber
  ];
  const filled = fields.filter(Boolean).length;
  this.profileCompleteness = Math.round((filled / fields.length) * 100);
  
  this.profileStatus = this.profileCompleteness >= 80 ? 'complete' : 'partial';
  this.updatedAt = new Date();

});

// === Text search index ===
patientSchema.index({ 
  fullName: 'text', 
  phoneNumber: 'text', 
  patientNumber: 'text',
  nationalId: 'text'
});

// === Method: get safe summary (for lists) ===
patientSchema.methods.toSummary = function() {
  return {
    id: this._id,
    patientNumber: this.patientNumber,
    fullName: this.fullName,
    phoneNumber: this.phoneNumber,
    gender: this.gender,
    profileStatus: this.profileStatus,
    profileCompleteness: this.profileCompleteness,
    isActive: this.isActive
  };
};

module.exports = mongoose.model('Patient', patientSchema);