// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api/client';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const TOKEN_KEY = 'sangwa_token';
const USER_KEY = 'sangwa_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem(USER_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        if (!cancelled) {
          setUser(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const { data } = await authAPI.getMe();
        if (!cancelled) {
          setUser(data.user);
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await authAPI.login(email, password);
    // Backend returns: { success, token, user }
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setUser(data.user);
    toast.success(`Welcome, ${data.user.fullName.split(' ')[0]}`);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore network errors on logout
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      toast.success('Signed out');
    }
  }, []);

  const hasPermission = useCallback(
    (permission) => {
      if (!user) return false;
      if (user.role === 'admin') return true;
      return user.permissions?.[permission] === true;
    },
    [user]
  );

  const hasRole = useCallback(
    (...roles) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}