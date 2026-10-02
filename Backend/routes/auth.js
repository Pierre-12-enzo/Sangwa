const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/login', ctrl.login);
router.get('/me', protect, ctrl.getMe);
router.post('/logout', protect, ctrl.logout);
router.put('/change-password', protect, ctrl.changePassword);
router.post('/register', protect, authorize('admin'), ctrl.register);
router.get('/users', protect, authorize('admin', 'manager'), ctrl.listUsers);
router.put('/users/:id', protect, authorize('admin'), ctrl.updateUser);

module.exports = router;