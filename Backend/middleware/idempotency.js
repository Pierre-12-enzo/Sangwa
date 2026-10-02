// backend/middleware/idempotency.js
const IdempotencyKey = require('../models/IdempotencyKey');
const crypto = require('crypto');

/**
 * Prevent duplicate requests. Client must send `Idempotency-Key` header.
 * If the same key + endpoint is seen again within 24h, return cached response.
 */
exports.idempotent = async (req, res, next) => {
    const key = req.headers['idempotency-key'];

    // If no key provided, just continue (idempotency is optional)
    if (!key) return next();

    const endpoint = `${req.method} ${req.baseUrl}${req.path}`;
    const requestHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(req.body || {}))
        .digest('hex');

    // Look for existing entry
    const existing = await IdempotencyKey.findOne({ key, endpoint });

    if (existing) {
        // If body is different, this is a client bug — reject
        if (existing.requestHash !== requestHash) {
            return res.status(422).json({
                success: false,
                message: 'Idempotency key reused with different payload'
            });
        }
        // Return cached response
        return res.status(existing.statusCode || 200).json(existing.response);
    }

    // Capture outgoing response so we can cache it
    const originalJson = res.json.bind(res);

    res.json = async (body) => {
        // Only cache successful responses
        if (res.statusCode < 400) {
            try {
                await IdempotencyKey.create({
                    key,
                    endpoint,
                    requestHash,
                    response: body,
                    statusCode: res.statusCode,
                    userId: req.user?._id || null
                });
            } catch (err) {
                // Duplicate key race — ignore
                if (err.code !== 11000) {
                    console.error('Idempotency save failed:', err.message);
                }
            }
        }
        return originalJson(body);
    };

    next();
};