// backend/middleware/auditLogger.js
const AuditLog = require('../models/AuditLog');

/**
 * Factory: log an audit entry after a successful request
 * Usage: router.post('/', audit('patient.create', 'Patient'), handler)
 */
exports.audit = (action, resourceType) => {
    return async (req, res, next) => {
        // Capture original json() so we can log after success
        const originalJson = res.json.bind(res);

        res.json = async (body) => {
            // Log asynchronously (fire-and-forget)
            if (res.statusCode < 400) {
                AuditLog.create({
                    user: req.user?._id || null,
                    userEmail: req.user?.email || null,
                    action,
                    resourceType,
                    resourceId: body?.data?._id || body?.data?.booking?._id || null,
                    ipAddress: req.ip || req.connection?.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    metadata: {
                        method: req.method,
                        path: req.originalUrl,
                        params: req.params,
                        body: sanitize(req.body)
                    }
                }).catch((err) => console.error('Audit log failed:', err.message));
            }
            return originalJson(body);
        };

        next();
    };
};

/**
 * Log a generic audit entry programmatically
 */
exports.log = async ({ user, action, resourceType, resourceId, req, metadata = {} }) => {
    try {
        await AuditLog.create({
            user: user?._id || user,
            userEmail: user?.email,
            action,
            resourceType,
            resourceId,
            ipAddress: req?.ip,
            userAgent: req?.headers?.['user-agent'],
            metadata
        });
    } catch (err) {
        console.error('Audit log failed:', err.message);
    }
};

// Strip sensitive fields
function sanitize(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    const clone = { ...obj };
    delete clone.password;
    delete clone.passwordResetToken;
    delete clone.token;
    return clone;
}