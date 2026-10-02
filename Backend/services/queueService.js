// backend/services/queueService.js
const Booking = require('../models/Booking');

/**
 * Assign the next token number for a session
 */
async function assignToken({ doctor, date, session }) {
    const last = await Booking.findOne(
        { doctor, preferredDate: date, session },
        { tokenNumber: 1 }
    ).sort({ tokenNumber: -1 });

    return (last?.tokenNumber || 0) + 1;
}

/**
 * Get full queue for a session
 */
async function getQueueForSession({ doctor, date, session }) {
    return Booking.find({
        doctor,
        preferredDate: date,
        session,
        status: { $in: ['confirmed', 'checked_in', 'in_consultation'] }
    })
        .sort({ tokenNumber: 1 })
        .populate('patient', 'patientNumber fullName phoneNumber')
        .select('tokenNumber patientName patientNumber status arrivedAt seenAt calledAt estimatedTime queuePosition additionalNotes');
}

/**
 * Advance the queue — called by doctor when finishing a patient
 */
async function advanceQueue({ doctor, date, session, completedBookingId, doctorUserId }) {
    const now = new Date();

    // 1. Mark current booking as completed
    if (completedBookingId) {
        await Booking.findByIdAndUpdate(completedBookingId, {
            status: 'completed',
            seenAt: now
        });
    }

    // 2. Find next patient (checked-in first, then earliest confirmed)
    const next = await Booking.findOne({
        doctor,
        preferredDate: date,
        session,
        status: { $in: ['confirmed', 'checked_in'] }
    }).sort({
        status: -1, // checked_in before confirmed
        tokenNumber: 1
    });

    if (!next) {
        return { advanced: false, message: 'Queue is empty' };
    }

    // 3. Mark as in consultation
    next.status = 'in_consultation';
    next.calledAt = now;
    await next.save();

    // 4. Recalculate remaining positions
    await recalculateQueue({ doctor, date, session });

    return { advanced: true, next, message: 'Next patient called' };
}

/**
 * Mark patient as checked in (by receptionist)
 */
async function checkIn({ bookingId, receptionistUserId }) {
    const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
            status: 'checked_in',
            arrivedAt: new Date()
        },
        { new: true }
    );
    return booking;
}

/**
 * Recalculate queue positions and estimated times
 */
async function recalculateQueue({ doctor, date, session }) {
    const waiting = await Booking.find({
        doctor,
        preferredDate: date,
        session,
        status: { $in: ['confirmed', 'checked_in'] },
        seenAt: null
    }).sort({
        status: -1, // checked_in first
        tokenNumber: 1
    });

    const now = new Date();

    for (let i = 0; i < waiting.length; i++) {
        waiting[i].queuePosition = i + 1;
        waiting[i].estimatedTime = new Date(now.getTime() + (i + 1) * 15 * 60000);

        // Send "you're 2 away" SMS
        if (i === 1 && !waiting[i].calledSmsSent) {
            // Trigger SMS: "You're 2 patients away"
            waiting[i].calledSmsSent = true;
            waiting[i].calledAt = now;
            // TODO: sendSMS(waiting[i])
        }

        await waiting[i].save();
    }
}

module.exports = {
    assignToken,
    getQueueForSession,
    advanceQueue,
    checkIn,
    recalculateQueue
};

