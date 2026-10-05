// src/pages/doctor/DoctorDashboard.jsx
import { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  FaClipboardList,
  FaCalendarDay,
  FaUserMd,
  FaChartLine
} from 'react-icons/fa';

import StaffLayout from '../../components/layout/StaffLayout';
import DoctorQueue from './DoctorQueue';
import DoctorOverview from './DoctorOverview';

const NAV = [
  { to: '/doctor', label: 'Overview', icon: <FaChartLine />, end: true },
  { to: '/doctor/queue', label: 'Live Queue', icon: <FaClipboardList /> },
  { to: '/doctor/schedule', label: 'My Schedule', icon: <FaCalendarDay /> }
];

export default function DoctorDashboard() {
  return (
    <StaffLayout navItems={NAV} title="Doctor Dashboard">
      <Routes>
        <Route index element={<DoctorOverview />} />
        <Route path="queue" element={<DoctorQueue />} />
        <Route path="schedule" element={<PlaceholderSchedule />} />
        <Route path="*" element={<Navigate to="/doctor" replace />} />
      </Routes>
    </StaffLayout>
  );
}

function PlaceholderSchedule() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
      <FaCalendarDay className="text-4xl text-[#3B6B66] mx-auto mb-4" />
      <h2 className="text-xl font-bold text-[#0F172A] mb-2">My Schedule</h2>
      <p className="text-gray-500">Coming in the next phase.</p>
    </div>
  );
}