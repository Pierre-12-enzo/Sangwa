// backend/models/Insurance.js
const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  shortName: String, // e.g., "RSSB", "RAMA"
  logo: { type: String, default: '' },
  description: String,
  
  // Coverage
  coverageType: {
    type: String,
    enum: ['full', 'partial', 'specific'],
    default: 'partial'
  },
  coveragePercentage: { type: Number, default: 80 }, // 80% = patient pays 20%
  
  // Contact
  contactPerson: String,
  contactPhone: String,
  contactEmail: String,
  website: String,
  
  // Services covered
  coveredServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  excludedServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  
  // Verification requirements
  requiresPreAuthorization: { type: Boolean, default: false },
  requiredDocuments: [String], // ['National ID', 'Membership Card']
  
  isActive: { type: Boolean, default: true },
  displayOnWebsite: { type: Boolean, default: true }, // for insurance partners section
  
  createdAt: { type: Date, default: Date.now }
});

// Auto-slug
insuranceSchema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
});

module.exports = mongoose.model('Insurance', insuranceSchema);