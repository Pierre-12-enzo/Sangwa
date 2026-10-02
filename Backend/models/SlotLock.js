// backend/models/SlotLock.js
const mongoose = require('mongoose');

const slotLockSchema = new mongoose.Schema({
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  date: { type: Date, required: true },
  session: { type: String, default: null }, // for session-based
  slotTime: { type: String, default: null }, // for fixed-slot
  
  // Lock owner
  bookingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking', 
    required: true 
  },
  idempotencyKey: String,
  
  // TTL
  expiresAt: { 
    type: Date, 
    required: true,
    index: { expires: 0 } // MongoDB auto-deletes when expiresAt is reached
  },
  
  createdAt: { type: Date, default: Date.now }
});

// === Unique compound index: one active lock per slot ===
slotLockSchema.index(
  { doctor: 1, date: 1, session: 1, slotTime: 1 },
  { unique: true }
);

module.exports = mongoose.model('SlotLock', slotLockSchema);