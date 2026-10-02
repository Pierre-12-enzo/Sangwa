// backend/controllers/patientController.js
const Patient = require('../models/Patient');
const Booking = require('../models/Booking');
const asyncHandler = require('../utils/asyncHandler');
const { normalizePhone } = require('../services/patientService');
const { log } = require('../middleware/auditLogger');

/**
 * @route   GET /api/patients/search?q=
 * @desc    Search patients (by name, phone, patient number)
 * @access  Private (receptionist, doctor, admin)
 */
exports.search = asyncHandler(async (req, res) => {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Search query must be at least 2 characters'
        });
    }

    const regex = new RegExp(q.trim(), 'i');
    const patients = await Patient.find({
        $or: [
            { fullName: regex },
            { phoneNumber: regex },
            { patientNumber: regex },
            { nationalId: regex }
        ],
        isActive: true
    })
        .limit(20)
        .sort({ updatedAt: -1 });

    res.json({
        success: true,
        count: patients.length,
        data: patients.map((p) => p.toSummary())
    });
});

/**
 * @route   GET /api/patients/:id
 * @desc    Get full patient profile
 * @access  Private
 */
exports.getOne = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id)
        .populate('insurance.provider', 'name shortName logo coveragePercentage');

    if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    await log({
        user: req.user,
        action: 'patient.view',
        resourceType: 'Patient',
        resourceId: patient._id,
        req
    });

    res.json({ success: true, data: patient });
});

/**
 * @route   GET /api/patients/:id/bookings
 * @desc    Get booking history for a patient
 * @access  Private
 */
exports.getBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ patient: req.params.id })
        .populate('service', 'name icon')
        .populate('doctor', 'fullName title')
        .sort({ preferredDate: -1 })
        .limit(50);

    res.json({ success: true, count: bookings.length, data: bookings });
});

/**
 * @route   POST /api/patients
 * @desc    Create patient (reception walk-in registration)
 * @access  Private
 */
exports.create = asyncHandler(async (req, res) => {
    const {
        firstName, lastName, phoneNumber, email,
        dateOfBirth, gender, nationalId,
        address, bloodType, allergies,
        emergencyContact, insurance
    } = req.body;

    if (!firstName || !phoneNumber) {
        return res.status(400).json({
            success: false,
            message: 'firstName and phoneNumber are required'
        });
    }

    const normalized = normalizePhone(phoneNumber);

    const existing = await Patient.findOne({ phoneNumber: normalized });
    if (existing) {
        return res.status(409).json({
            success: false,
            message: 'Patient with this phone already exists',
            data: existing.toSummary()
        });
    }

    const patient = await Patient.create({
        firstName,
        lastName,
        phoneNumber: normalized,
        email: email || undefined,
        dateOfBirth,
        gender: gender || 'Unknown',
        nationalId: nationalId || undefined,
        address,
        bloodType: bloodType || 'Unknown',
        allergies: allergies || [],
        emergencyContact,
        insurance,
        registeredVia: 'reception',
        registeredBy: req.user._id
    });

    await log({
        user: req.user,
        action: 'patient.create',
        resourceType: 'Patient',
        resourceId: patient._id,
        req
    });

    res.status(201).json({ success: true, data: patient });
});

/**
 * @route   PUT /api/patients/:id
 * @desc    Update patient
 * @access  Private
 */
exports.update = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Fields a receptionist can edit
    const editable = [
        'firstName', 'lastName', 'dateOfBirth', 'gender', 'nationalId',
        'email', 'alternatePhone', 'address', 'bloodType',
        'allergies', 'chronicConditions', 'emergencyContact',
        'insurance', 'notes', 'tags'
    ];

    editable.forEach((key) => {
        if (req.body[key] !== undefined) patient[key] = req.body[key];
    });

    await patient.save();

    await log({
        user: req.user,
        action: 'patient.update',
        resourceType: 'Patient',
        resourceId: patient._id,
        req,
        metadata: { fields: Object.keys(req.body) }
    });

    res.json({ success: true, data: patient });
});

/**
 * @route   GET /api/patients
 * @desc    List all patients (admin, paginated)
 * @access  Private/Admin
 */
exports.list = asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [patients, total] = await Promise.all([
        Patient.find({ isActive: true }).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Patient.countDocuments({ isActive: true })
    ]);

    res.json({
        success: true,
        page,
        pages: Math.ceil(total / limit),
        total,
        data: patients.map((p) => p.toSummary())
    });
});

/**
 * @route   GET /api/patients/lookup?phone=
 * @desc    Find patient by phone (for booking pre-fill)
 * @access  Public
 */
exports.lookupByPhone = asyncHandler(async (req, res) => {
    const { phone } = req.query;
    if (!phone) {
        return res.status(400).json({ success: false, message: 'Phone required' });
    }

    const normalized = normalizePhone(phone);
    const patient = await Patient.findOne({ phoneNumber: normalized });

    if (!patient) {
        return res.json({ success: true, found: false });
    }

    // Return limited info for pre-fill
    res.json({
        success: true,
        found: true,
        data: {
            _id: patient._id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            fullName: patient.fullName,
            phoneNumber: patient.phoneNumber,
            email: patient.email,
            gender: patient.gender,
            profileStatus: patient.profileStatus
        }
    });
});