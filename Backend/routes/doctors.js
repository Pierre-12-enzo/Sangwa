const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);

router.use(protect, authorize('admin', 'manager'));
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.post('/:id/leave', ctrl.addLeave);
router.delete('/:id/leave/:leaveId', ctrl.removeLeave);

module.exports = router;