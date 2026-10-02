// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Verify JWT + attach user to req.user
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please log in.'
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }

  const user = await User.findById(decoded.id).select('-password');

  if (!user || !user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account not found or inactive'
    });
  }

  // Check account lock
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return res.status(423).json({
      success: false,
      message: 'Account locked due to too many failed attempts'
    });
  }

  req.user = user;
  next();
});

/**
 * Restrict by role
 * Usage: authorize('admin', 'manager')
 */
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Role '${req.user.role}' is not authorized for this action`
    });
  }
  next();
};

/**
 * Restrict by granular permission
 * Usage: requirePermission('canManagePayments')
 */
exports.requirePermission = (permission) => (req, res, next) => {
  if (!req.user.hasPermission(permission)) {
    return res.status(403).json({
      success: false,
      message: `Missing permission: ${permission}`
    });
  }
  next();
};

/**
 * Restrict to the doctor who owns the resource
 * (used for doctor-only actions like advancing their own queue)
 */
exports.requireOwnDoctorProfile = (req, res, next) => {
  if (req.user.role !== 'doctor' || !req.user.doctorProfile) {
    return res.status(403).json({
      success: false,
      message: 'Only doctors can perform this action'
    });
  }
  next();
};