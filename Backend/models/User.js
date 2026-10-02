// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // === Identity ===
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false // never returned by default
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },

    // === Role ===
    role: {
        type: String,
        enum: ['admin', 'manager', 'receptionist', 'doctor'],
        required: [true, 'Role is required']
    },

    // === Link to Doctor profile (only for role === 'doctor') ===
    doctorProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        default: null
    },

    // === Granular permissions ===
    permissions: {
        // Patient data
        canViewPatientFull: { type: Boolean, default: false },
        canEditPatient: { type: Boolean, default: false },
        canViewMedicalRecords: { type: Boolean, default: false },

        // Bookings & queue
        canManageBookings: { type: Boolean, default: false },
        canCheckInPatients: { type: Boolean, default: false },
        canAdvanceQueue: { type: Boolean, default: false },

        // Configuration
        canManageDoctors: { type: Boolean, default: false },
        canManageServices: { type: Boolean, default: false },
        canManageInsurances: { type: Boolean, default: false },

        // Financial
        canManagePayments: { type: Boolean, default: false },
        canViewReports: { type: Boolean, default: false },

        // System
        canManageUsers: { type: Boolean, default: false },
        canViewAuditLogs: { type: Boolean, default: false }
    },

    // === Account state ===
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    loginCount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

    // === Password reset ===
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },

    // === Security ===
    failedLoginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// === Hash password ===
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// === Apply default permissions per role (only on new users) ===
userSchema.pre('save', function (next) {
    if (this.isNew && (!this.permissions || Object.keys(this.permissions).length === 0)) {
        this.permissions = getDefaultPermissions(this.role);
    }
    this.updatedAt = new Date();
    next();
});

// === Compare password ===
userSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

// === Check permission ===
userSchema.methods.hasPermission = function (permission) {
    return this.permissions?.[permission] === true;
};

// === Safe public profile ===
userSchema.methods.toSafeObject = function () {
    return {
        id: this._id,
        email: this.email,
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        photo: this.photo,
        role: this.role,
        doctorProfile: this.doctorProfile,
        permissions: this.permissions,
        isActive: this.isActive,
        lastLogin: this.lastLogin
    };
};

// === Default permissions by role ===
function getDefaultPermissions(role) {
    const base = {
        canViewPatientFull: false,
        canEditPatient: false,
        canViewMedicalRecords: false,
        canManageBookings: false,
        canCheckInPatients: false,
        canAdvanceQueue: false,
        canManageDoctors: false,
        canManageServices: false,
        canManageInsurances: false,
        canManagePayments: false,
        canViewReports: false,
        canManageUsers: false,
        canViewAuditLogs: false
    };

    switch (role) {
        case 'admin':
            return {
                canViewPatientFull: true,
                canEditPatient: true,
                canViewMedicalRecords: true,
                canManageBookings: true,
                canCheckInPatients: true,
                canAdvanceQueue: true,
                canManageDoctors: true,
                canManageServices: true,
                canManageInsurances: true,
                canManagePayments: true,
                canViewReports: true,
                canManageUsers: true,
                canViewAuditLogs: true
            };
        case 'manager':
            return {
                canViewPatientFull: true,
                canEditPatient: true,
                canViewMedicalRecords: true,
                canManageBookings: true,
                canCheckInPatients: true,
                canAdvanceQueue: true,
                canManageDoctors: true,
                canManageServices: true,
                canManageInsurances: true,
                canManagePayments: true,
                canViewReports: true,
                canManageUsers: false,
                canViewAuditLogs: true
            };
        case 'receptionist':
            return {
                ...base,
                canViewPatientFull: true,
                canEditPatient: true,
                canManageBookings: true,
                canCheckInPatients: true,
                canManagePayments: true
            };
        case 'doctor':
            return {
                ...base,
                canViewPatientFull: true,
                canViewMedicalRecords: true,
                canAdvanceQueue: true,
                canManageBookings: false
            };
        default:
            return base;
    }
}

// === Indexes ===
userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ doctorProfile: 1 }, { sparse: true });

module.exports = mongoose.model('User', userSchema);



