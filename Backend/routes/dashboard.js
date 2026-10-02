const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboardController');
const { protect, requirePermission } = require('../middleware/auth');

router.get('/stats', protect, requirePermission('canManageBookings'), ctrl.stats);

module.exports = router;