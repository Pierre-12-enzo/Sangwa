// backend/controllers/authController.js
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { sendTokenResponse } = require('../utils/jwt');
const { log } = require('../middleware/auditLogger');

/**
 * @route   POST /api/auth/login
 * @desc    Login staff user
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Lock check
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return res.status(423).json({
      success: false,
      message: 'Account locked. Try again later.'
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
    if (user.failedLoginAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min
      user.failedLoginAttempts = 0;
    }
    await user.save({ validateBeforeSave: false });

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Success
  user.failedLoginAttempts = 0;
  user.lockedUntil = null;
  user.lastLogin = new Date();
  user.loginCount = (user.loginCount || 0) + 1;
  await user.save({ validateBeforeSave: false });

  await log({
    user,
    action: 'user.login',
    resourceType: 'User',
    resourceId: user._id,
    req
  });

  sendTokenResponse(user, 200, res);
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user.toSafeObject()
  });
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout (clear cookie)
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res) => {
  await log({
    user: req.user,
    action: 'user.logout',
    resourceType: 'User',
    resourceId: req.user._id,
    req
  });

  res
    .cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    })
    .status(200)
    .json({ success: true, message: 'Logged out' });
});

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change own password
 * @access  Private
 */
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Please provide current and new password (min 8 chars)'
    });
  }

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  user.password = newPassword;
  await user.save();

  await log({
    user,
    action: 'user.update',
    resourceType: 'User',
    resourceId: user._id,
    req,
    metadata: { field: 'password' }
  });

  sendTokenResponse(user, 200, res);
});

/**
 * @route   POST /api/auth/register
 * @desc    Register new staff (admin only)
 * @access  Private/Admin
 */
exports.register = asyncHandler(async (req, res) => {
  const { email, password, fullName, role, phoneNumber, doctorProfile } = req.body;

  if (!email || !password || !fullName || !role) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email, password, fullName, role'
    });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'Email already registered'
    });
  }

  const user = await User.create({
    email,
    password,
    fullName,
    role,
    phoneNumber,
    doctorProfile: role === 'doctor' ? doctorProfile : null,
    createdBy: req.user._id
  });

  await log({
    user: req.user,
    action: 'user.create',
    resourceType: 'User',
    resourceId: user._id,
    req
  });

  res.status(201).json({
    success: true,
    user: user.toSafeObject()
  });
});

/**
 * @route   GET /api/auth/users
 * @desc    List all staff (admin)
 * @access  Private/Admin
 */
exports.listUsers = asyncHandler(async (req, res) => {
  const { role, isActive } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const users = await User.find(filter).sort({ createdAt: -1 });
  res.json({
    success: true,
    count: users.length,
    data: users.map((u) => u.toSafeObject())
  });
});

/**
 * @route   PUT /api/auth/users/:id
 * @desc    Update staff (admin)
 * @access  Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const allowed = ['fullName', 'phoneNumber', 'role', 'isActive', 'permissions', 'doctorProfile'];
  const updates = {};
  allowed.forEach((k) => {
    if (req.body[k] !== undefined) updates[k] = req.body[k];
  });

  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  await log({
    user: req.user,
    action: 'user.update',
    resourceType: 'User',
    resourceId: user._id,
    req,
    metadata: { updates }
  });

  res.json({ success: true, user: user.toSafeObject() });
});