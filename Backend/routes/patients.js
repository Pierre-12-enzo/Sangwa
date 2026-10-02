const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/patientController');
const { protect, authorize, requirePermission } = require('../middleware/auth');
const { audit } = require('../middleware/auditLogger');

router.get('/lookup', ctrl.lookupByPhone); // public for booking pre-fill

router.use(protect);
router.get('/search', authorize('receptionist', 'doctor', 'admin', 'manager'), ctrl.search);
router.get('/', authorize('admin', 'manager'), ctrl.list);
router.get('/:id', requirePermission('canViewPatientFull'), ctrl.getOne);
router.get('/:id/bookings', requirePermission('canViewPatientFull'), ctrl.getBookings);
router.post('/', requirePermission('canEditPatient'), audit('patient.create', 'Patient'), ctrl.create);
router.put('/:id', requirePermission('canEditPatient'), audit('patient.update', 'Patient'), ctrl.update);

module.exports = router;