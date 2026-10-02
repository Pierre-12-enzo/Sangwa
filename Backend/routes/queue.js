const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/queueController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.get('/', authorize('doctor', 'admin', 'manager'), ctrl.getMyQueue);
router.post('/advance', authorize('doctor', 'admin'), ctrl.advance);
router.post('/pause', authorize('doctor', 'admin'), ctrl.pause);

module.exports = router;