// scripts/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');
const connectDB = require('../src/config/database');

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('✅ Admin already exists');
      process.exit(0);
    }

    // Create admin
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'Sangwa Admin',
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin created successfully');
    console.log(`📧 Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();