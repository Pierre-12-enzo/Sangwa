const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/insuranceController');
const { protect, authorize } = require('../middleware/auth');

router.get('/public', ctrl.listPublic);

router.use(protect, authorize('admin', 'manager'));
router.get('/', ctrl.listAll);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;