// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLoader from '../components/AppLoader';

export default function ProtectedRoute({ children, roles, permissions }) {
  const { isAuthenticated, isLoading, hasPermission, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) return <AppLoader label="Checking session…" />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && roles.length > 0 && !hasRole(...roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (permissions && permissions.length > 0) {
    const allowed = permissions.every((p) => hasPermission(p));
    if (!allowed) return <Navigate to="/unauthorized" replace />;
  }

  return children;
}