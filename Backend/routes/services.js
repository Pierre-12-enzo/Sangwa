const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', ctrl.listPublic);
router.get('/:slug', ctrl.getBySlug);

router.use(protect, authorize('admin', 'manager'));
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;