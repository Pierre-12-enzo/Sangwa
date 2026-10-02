// backend/services/slotService.js
const SlotLock = require('../models/SlotLock');

const LOCK_TTL_SECONDS = 600; // 10 minutes

async function acquireSlotLock({ 
  doctorId, date, session, slotTime, bookingId, idempotencyKey 
}) {
  const expiresAt = new Date(Date.now() + LOCK_TTL_SECONDS * 1000);
  
  try {
    const lock = await SlotLock.findOneAndUpdate(
      {
        doctor: doctorId,
        date,
        session: session || null,
        slotTime: slotTime || null,
        $or: [
          { expiresAt: { $lt: new Date() } },
          { bookingId }
        ]
      },
      {
        $set: {
          doctor: doctorId,
          date,
          session: session || null,
          slotTime: slotTime || null,
          bookingId,
          idempotencyKey,
          expiresAt
        }
      },
      { upsert: true, new: true }
    );
    return lock;
  } catch (error) {
    if (error.code === 11000) {
      return null; // Slot is locked by someone else
    }
    throw error;
  }
}

async function releaseSlotLock({ doctorId, date, session, slotTime, bookingId }) {
  await SlotLock.deleteOne({
    doctor: doctorId,
    date,
    session: session || null,
    slotTime: slotTime || null,
    bookingId
  });
}

module.exports = { acquireSlotLock, releaseSlotLock };