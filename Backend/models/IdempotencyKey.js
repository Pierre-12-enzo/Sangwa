// backend/models/IdempotencyKey.js
const mongoose = require('mongoose');

const idempotencySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  endpoint: { type: String, required: true },
  requestHash: String,
  response: { type: mongoose.Schema.Types.Mixed, required: true },
  statusCode: { type: Number, default: 200 },
  createdAt: { 
    type: Date, 
    default: Date.now,
    expires: 86400 // 24 hours TTL
  }
});

module.exports = mongoose.model('IdempotencyKey', idempotencySchema);