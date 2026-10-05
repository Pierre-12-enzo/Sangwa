// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Placeholder from './pages/Placeholder';
import ProtectedRoute from './routes/ProtectedRoute';
import DoctorDashboard from './pages/doctor/DoctorDashboard';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Doctor */}
      <Route
        path="/doctor/*"
        element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Reception (Phase 3) */}
      <Route
        path="/reception/*"
        element={
          <ProtectedRoute roles={['receptionist', 'admin', 'manager']}>
            <Placeholder role="Reception Dashboard" />
          </ProtectedRoute>
        }
      />

      {/* Admin (Phase 4) */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute roles={['admin', 'manager']}>
            <Placeholder role="Admin Dashboard" />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<Placeholder role="403 · Unauthorized" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}