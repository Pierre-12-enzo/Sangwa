// frontend/src/api/client.js
import axios from 'axios';


// Environment detection - FIXED ORDER
const getApiBaseUrl = () => {
  // 1. Check if we're in development mode FIRST
  const isDevelopment = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  if (isDevelopment) {
    return 'http://localhost:5000/api';
  }

  // 2. For production, use environment variable if available
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 3. Fallback (should never hit in production if env vars are set)
  console.warn('⚠️ No VITE_API_URL found, using default fallback');
  return 'https://card-agent-256t.onrender.com/api';
};

const API_URL = getApiBaseUrl();

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sangwa_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('sangwa_admin_token');
      localStorage.removeItem('sangwa_admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ===== Public API Calls =====

// Bookings (Public - No Auth Required)
export const bookingAPI = {
  // Create a new booking
  create: (data) => apiClient.post('/bookings', data),
  
  // Get booking by reference (Public)
  getByReference: (reference) => apiClient.get(`/bookings/reference/${reference}`),
};

// ===== Admin API Calls (Auth Required) =====

export const adminAPI = {
  // Get all bookings
  getBookings: (params) => apiClient.get('/bookings', { params }),
  
  // Get single booking
  getBooking: (id) => apiClient.get(`/bookings/${id}`),
  
  // Update booking status
  updateStatus: (id, status) => apiClient.put(`/bookings/${id}/status`, { status }),
  
  // Delete booking
  deleteBooking: (id) => apiClient.delete(`/bookings/${id}`),
  
  // Get dashboard stats
  getStats: () => apiClient.get('/bookings/stats'),
};

// ===== Auth API Calls =====

export const authAPI = {
  // Admin login
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  
  // Get current admin profile
  getProfile: () => apiClient.get('/auth/profile'),
  
  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('sangwa_admin_token');
    localStorage.removeItem('sangwa_admin_user');
  },
};

// ===== Services API =====

export const servicesAPI = {
  // Get all available services
  getAll: () => apiClient.get('/services'),
};

export default apiClient;

