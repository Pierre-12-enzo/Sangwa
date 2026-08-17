// src/middleware/sanitize.js
/**
 * Custom request sanitization middleware
 * Prevents NoSQL injection and XSS attacks
 */
const sanitize = (req, res, next) => {
    // Sanitize query parameters
    if (req.query) {
        Object.keys(req.query).forEach(key => {
            if (typeof req.query[key] === 'string') {
                // Remove MongoDB operators ($gt, $lt, etc.)
                req.query[key] = req.query[key].replace(/\$/g, '');
                // Basic XSS protection
                req.query[key] = req.query[key]
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;');
            }
        });
    }

    // Sanitize body parameters
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                // Remove MongoDB operators
                req.body[key] = req.body[key].replace(/\$/g, '');
                // Basic XSS protection
                req.body[key] = req.body[key]
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;');
            }
        });
    }

    next();
};

module.exports = sanitize;