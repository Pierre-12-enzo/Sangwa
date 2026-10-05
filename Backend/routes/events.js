// backend/routes/events.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { registerClient } = require('../services/eventService');

/**
 * GET /api/events
 * Server-Sent Events stream.
 *
 * Auth via:
 *   - Authorization: Bearer <token>  (preferred, used by axios-style clients)
 *   - ?token=<token>                  (fallback for EventSource which can't send headers)
 *
 * Query:
 *   channels  Comma-separated list of channels to subscribe to.
 *             e.g. channels=queue:doctor:abc:2026-10-05,bookings:all
 *             "*" = subscribe to everything (admin only)
 */
router.get('/', (req, res) => {
  // Auth via header OR query param
  let token =
    req.headers.authorization?.split(' ')[1] ||
    req.query.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing token' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  // Determine channels
  let channels = String(req.query.channels || '')
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);

  if (channels.length === 0) {
    // Default: subscribe to your own user channel
    channels = [`user:${decoded.id}`];
  }

  const cleanup = registerClient({
    res,
    userId: decoded.id,
    role: decoded.role,
    doctorId: decoded.doctorId || null,
    channels
  });

  req.on('close', () => {
    cleanup();
  });
});

module.exports = router;