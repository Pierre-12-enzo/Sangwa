// backend/scripts/seedDemoData.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Insurance = require('../models/Insurance');
const Service = require('../models/Service');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Booking = require('../models/Booking');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🌱 Seeding demo data...\n');


  // === 0. Wipe existing demo data ===
  console.log('🧹 Clearing existing collections...');
  await Promise.all([
    Insurance.deleteMany({}),
    Service.deleteMany({}),
    Doctor.deleteMany({}),
    User.deleteMany({}),
    Patient.deleteMany({}),
    Booking.deleteMany({})
  ]);

  // === 1. Insurance ===
  console.log('📋 Seeding insurance providers...');
  const insurances = await Insurance.create(
    { name: 'Rwanda Social Security Board', shortName: 'RSSB', coveragePercentage: 85, displayOnWebsite: true },
    { name: 'Mutuelle de Santé', shortName: 'Mutuelles', coveragePercentage: 90, displayOnWebsite: true },
    { name: 'Radiant Insurance', shortName: 'Radiant', coveragePercentage: 80, displayOnWebsite: true },
    { name: 'Britam Rwanda', shortName: 'Britam', coveragePercentage: 80, displayOnWebsite: true },
    { name: 'Prime Insurance', shortName: 'Prime', coveragePercentage: 80, displayOnWebsite: true }
  );

  // === 2. Services ===
  console.log('🏥 Seeding services...');
  const services = await Service.insertMany([
    {
      name: 'Maternity Care',
      slug: 'maternity-care',
      shortDescription: 'Complete prenatal, delivery, and postnatal care',
      fullDescription: 'Our maternity ward offers private delivery suites, prenatal checkups, and postnatal care designed for mother and child comfort.',
      icon: 'fa-baby',
      category: 'Maternity',
      bookingMode: 'session',
      price: 25000,
      avgConsultationMinutes: 20,
      features: ['Private delivery suites', 'Prenatal checkups', 'Postnatal follow-up']
    },
    {
      name: 'Pediatrics',
      slug: 'pediatrics',
      shortDescription: 'Compassionate care for infants, children, and adolescents',
      fullDescription: 'Dedicated pediatric care in a child-friendly environment, with developmental screenings and vaccinations.',
      icon: 'fa-child',
      category: 'Pediatrics',
      bookingMode: 'session',
      price: 15000,
      avgConsultationMinutes: 15,
      features: ['Child-friendly environment', 'Vaccinations', 'Growth monitoring']
    },
    {
      name: 'Internal Medicine',
      slug: 'internal-medicine',
      shortDescription: 'Expert diagnosis and management of adult conditions',
      fullDescription: 'Comprehensive adult care including chronic disease management, preventive care, and health screenings.',
      icon: 'fa-stethoscope',
      category: 'Internal Medicine',
      bookingMode: 'session',
      price: 20000,
      avgConsultationMinutes: 20,
      features: ['Chronic disease management', 'Preventive care', 'Health screenings']
    },
    {
      name: 'Gynecology',
      slug: 'gynecology',
      shortDescription: 'Specialized women\'s health services',
      fullDescription: 'Comprehensive gynecological care including screenings, consultations, and treatments.',
      icon: 'fa-female',
      category: 'Gynecology',
      bookingMode: 'session',
      price: 20000,
      avgConsultationMinutes: 20
    },
    {
      name: 'Laboratory Tests',
      slug: 'laboratory-tests',
      shortDescription: 'Fast, accurate diagnostic testing',
      fullDescription: 'On-site lab for blood tests, urinalysis, and microbiology with rapid results.',
      icon: 'fa-flask',
      category: 'Laboratory',
      bookingMode: 'fixed_slot',
      price: 5000,
      duration: 15,
      slotConfig: { slotDuration: 15, maxParallel: 2 }
    },
    {
      name: 'Pharmacy Pickup',
      slug: 'pharmacy-pickup',
      shortDescription: 'Collect your prescriptions without waiting',
      fullDescription: 'Pre-order and pick up prescribed medications at your scheduled time.',
      icon: 'fa-pills',
      category: 'Pharmacy',
      bookingMode: 'fixed_slot',
      price: 0,
      duration: 10,
      slotConfig: { slotDuration: 10, maxParallel: 3 }
    }
  ]);

  // === 3. Doctors ===
  console.log('👨‍⚕️ Seeding doctors...');
  const doctors = await Doctor.insertMany([
    {
      firstName: 'Alice',
      lastName: 'Uwase',
      title: 'Dr.',
      bio: 'Senior obstetrician with 12 years of experience in maternal-fetal medicine.',
      qualifications: ['MD', 'Specialist in Obstetrics & Gynecology'],
      yearsOfExperience: 12,
      languages: ['Kinyarwanda', 'English', 'French'],
      services: [services[0]._id, services[3]._id], // Maternity + Gynecology
      weeklySchedule: [
        {
          day: 'Monday', isWorking: true, sessions: [
            { name: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 10 },
            { name: 'afternoon', startTime: '14:00', endTime: '17:00', maxPatients: 8 }
          ]
        },
        {
          day: 'Wednesday', isWorking: true, sessions: [
            { name: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 10 },
            { name: 'afternoon', startTime: '14:00', endTime: '17:00', maxPatients: 8 }
          ]
        },
        {
          day: 'Friday', isWorking: true, sessions: [
            { name: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 10 }
          ]
        }
      ]
    },
    {
      firstName: 'Jean',
      lastName: 'Mugisha',
      title: 'Dr.',
      bio: 'Pediatrician dedicated to child health and development.',
      qualifications: ['MD', 'Pediatrics'],
      yearsOfExperience: 8,
      languages: ['Kinyarwanda', 'English'],
      services: [services[1]._id],
      weeklySchedule: [
        {
          day: 'Tuesday', isWorking: true, sessions: [
            { name: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 12 },
            { name: 'afternoon', startTime: '14:00', endTime: '17:00', maxPatients: 10 }
          ]
        },
        {
          day: 'Thursday', isWorking: true, sessions: [
            { name: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 12 }
          ]
        },
        {
          day: 'Saturday', isWorking: true, sessions: [
            { name: 'morning', startTime: '09:00', endTime: '12:00', maxPatients: 8 }
          ]
        }
      ]
    },
    {
      firstName: 'Grace',
      lastName: 'Mukamana',
      title: 'Dr.',
      bio: 'Internal medicine specialist with focus on chronic disease management.',
      qualifications: ['MD', 'Internal Medicine'],
      yearsOfExperience: 15,
      languages: ['Kinyarwanda', 'English', 'French'],
      services: [services[2]._id],
      weeklySchedule: [
        {
          day: 'Monday', isWorking: true, sessions: [
            { name: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 8 },
            { name: 'afternoon', startTime: '14:00', endTime: '17:00', maxPatients: 8 }
          ]
        },
        {
          day: 'Tuesday', isWorking: true, sessions: [
            { name: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 8 }
          ]
        },
        {
          day: 'Thursday', isWorking: true, sessions: [
            { name: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 8 },
            { name: 'afternoon', startTime: '14:00', endTime: '17:00', maxPatients: 8 }
          ]
        }
      ]
    }
  ]);

  // === 4. Staff Users ===
  console.log('👤 Seeding staff users...');
  const password = await bcrypt.hash('sangwa123', 12);

  const users = await User.insertMany([
    {
      email: 'admin@sangwa.rw',
      password,
      fullName: 'System Administrator',
      role: 'admin',
      phoneNumber: '+250788000001'
    },
    {
      email: 'reception@sangwa.rw',
      password,
      fullName: 'Chantal Mukamana',
      role: 'receptionist',
      phoneNumber: '+250788000002'
    },
    {
      email: 'dr.alice@sangwa.rw',
      password,
      fullName: 'Dr. Alice Uwase',
      role: 'doctor',
      phoneNumber: '+250788000003',
      doctorProfile: doctors[0]._id
    },
    {
      email: 'dr.jean@sangwa.rw',
      password,
      fullName: 'Dr. Jean Mugisha',
      role: 'doctor',
      phoneNumber: '+250788000004',
      doctorProfile: doctors[1]._id
    },
    {
      email: 'dr.grace@sangwa.rw',
      password,
      fullName: 'Dr. Grace Mukamana',
      role: 'doctor',
      phoneNumber: '+250788000005',
      doctorProfile: doctors[2]._id
    }
  ]);

  // Link doctors to user accounts
  await Doctor.findByIdAndUpdate(doctors[0]._id, { userAccount: users[2]._id });
  await Doctor.findByIdAndUpdate(doctors[1]._id, { userAccount: users[3]._id });
  await Doctor.findByIdAndUpdate(doctors[2]._id, { userAccount: users[4]._id });

  // === 5. Patients ===
  console.log('🧑‍🤝‍🧑 Seeding patients...');
  const patientData = [
    { firstName: 'Marie', lastName: 'Claire', gender: 'Female', phoneNumber: '+250788111001', dateOfBirth: '1990-05-12' },
    { firstName: 'Jean', lastName: 'Pierre', gender: 'Male', phoneNumber: '+250788111002', dateOfBirth: '1985-08-20' },
    { firstName: 'Alice', lastName: 'Mukamana', gender: 'Female', phoneNumber: '+250788111003', dateOfBirth: '1992-03-15' },
    { firstName: 'Nathan', lastName: 'Dusenge', gender: 'Male', phoneNumber: '+250788111004', dateOfBirth: '1995-11-30' },
    { firstName: 'Grace', lastName: 'Uwimana', gender: 'Female', phoneNumber: '+250788111005', dateOfBirth: '1988-07-22' },
    { firstName: 'Emmanuel', lastName: 'Habimana', gender: 'Male', phoneNumber: '+250788111006', dateOfBirth: '1978-02-10' },
    { firstName: 'Josiane', lastName: 'Uwase', gender: 'Female', phoneNumber: '+250788111007', dateOfBirth: '1998-09-05' },
    { firstName: 'Patrick', lastName: 'Niyonzima', gender: 'Male', phoneNumber: '+250788111008', dateOfBirth: '1982-12-18' },
    { firstName: 'Diane', lastName: 'Ingabire', gender: 'Female', phoneNumber: '+250788111009', dateOfBirth: '1993-04-25' },
    { firstName: 'Olivier', lastName: 'Mugabo', gender: 'Male', phoneNumber: '+250788111010', dateOfBirth: '1991-06-14' }
  ];

  const patients = [];
  let counter = 1;

  for (const p of patientData) {
    const patient = new Patient({
      ...p,
      insurance: {
        provider: insurances[Math.floor(Math.random() * insurances.length)]._id,
        memberNumber: `MEM${Math.floor(Math.random() * 1000000)}`
      },
      registeredVia: 'reception'
    });
    await patient.save();
    patients.push(patient);
  }

  // === 6. Sample Bookings ===
  console.log('📅 Seeding sample bookings...');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const sampleBookings = [
    // Confirmed booking for tomorrow
    {
      patient: patients[0]._id,
      patientName: patients[0].fullName,
      patientNumber: patients[0].patientNumber,
      phoneNumber: patients[0].phoneNumber,
      service: services[0]._id,
      serviceName: services[0].name,
      doctor: doctors[0]._id,
      doctorName: doctors[0].fullName,
      preferredDate: tomorrow,
      bookingType: 'session',
      session: 'morning',
      tokenNumber: 1,
      amount: 25000,
      paymentStatus: 'paid',
      paymentMethod: 'mtn_momo',
      status: 'confirmed',
      smsSent: true,
      confirmedAt: new Date()
    },
    {
      patient: patients[2]._id,
      patientName: patients[2].fullName,
      patientNumber: patients[2].patientNumber,
      phoneNumber: patients[2].phoneNumber,
      service: services[0]._id,
      serviceName: services[0].name,
      doctor: doctors[0]._id,
      doctorName: doctors[0].fullName,
      preferredDate: tomorrow,
      bookingType: 'session',
      session: 'morning',
      tokenNumber: 2,
      amount: 25000,
      paymentStatus: 'paid',
      paymentMethod: 'airtel_money',
      status: 'confirmed',
      smsSent: true
    }
  ];

  for (const b of sampleBookings) {
    const booking = new Booking(b);
    await booking.save();
  }

  console.log('\n✅ Demo data seeded successfully!\n');
  console.log('📊 Summary:');
  console.log(`   Insurance: ${insurances.length}`);
  console.log(`   Services:  ${services.length}`);
  console.log(`   Doctors:   ${doctors.length}`);
  console.log(`   Staff:     ${users.length}`);
  console.log(`   Patients:  ${patients.length}`);
  console.log(`   Bookings:  ${sampleBookings.length}`);
  console.log('\n🔑 Login credentials (all use password "sangwa123"):');
  console.log('   Admin:      admin@sangwa.rw');
  console.log('   Reception:  reception@sangwa.rw');
  console.log('   Doctor:     dr.alice@sangwa.rw');
  console.log('   Doctor:     dr.jean@sangwa.rw');
  console.log('   Doctor:     dr.grace@sangwa.rw');
  console.log('');

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});