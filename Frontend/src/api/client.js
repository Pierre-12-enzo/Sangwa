// src/api/client.js
import axios from 'axios';

// Environment detection
const getApiBaseUrl = () => {
  const isDev =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  if (isDev) {
    return 'http://localhost:5000/api';
  }

  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}/api`;
  }

  console.warn('⚠️ No VITE_API_URL found, using localhost fallback');
  return 'http://localhost:5000/api';
};

const API_URL = getApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
  withCredentials: true
});

// ============================================================
// REQUEST interceptor — attach JWT
// ============================================================
apiClient.interceptors.request.use(
  (config) => {
    // ✅ New key: sangwa_token (was sangwa_admin_token)
    const token = localStorage.getItem('sangwa_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Auto-attach idempotency key on mutating requests (opt-in)
    if (
      ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase()) &&
      config.headers['X-Idempotent'] === 'true'
    ) {
      config.headers['Idempotency-Key'] = crypto.randomUUID();
      delete config.headers['X-Idempotent'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE interceptor — normalize + handle 401
// ============================================================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 401 → clear auth and bounce to login (except on login attempt itself)
    if (status === 401) {
      const url = error.config?.url || '';
      if (!url.includes('/auth/login')) {
        localStorage.removeItem('sangwa_token');
        localStorage.removeItem('sangwa_user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login?expired=1';
        }
      }
    }

    // Attach a friendly message for toast display
    error.displayMessage =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      'Something went wrong';

    return Promise.reject(error);
  }
);

// ============================================================
// PUBLIC APIs
// ============================================================
export const bookingAPI = {
  create: (data) =>
    apiClient.post('/bookings', data, { headers: { 'X-Idempotent': 'true' } }),
  getByReference: (reference) => apiClient.get(`/bookings/reference/${reference}`),
  availability: (params) => apiClient.get('/bookings/availability', { params })
};

export const servicesAPI = {
  getAll: () => apiClient.get('/services'),
  getBySlug: (slug) => apiClient.get(`/services/${slug}`)
};

export const doctorsAPI = {
  getAll: (params) => apiClient.get('/doctors', { params }),
  getOne: (id) => apiClient.get(`/doctors/${id}`)
};

export const insurancesAPI = {
  getPublic: () => apiClient.get('/insurances/public')
};

// ============================================================
// AUTH APIs
// ============================================================
export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  getMe: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
  changePassword: (currentPassword, newPassword) =>
    apiClient.put('/auth/change-password', { currentPassword, newPassword })
};

// ============================================================
// ADMIN / STAFF APIs
// ============================================================
export const adminAPI = {
  // Bookings
  getBookings: (params) => apiClient.get('/bookings', { params }),
  getBooking: (id) => apiClient.get(`/bookings/${id}`),
  updateStatus: (id, status) => apiClient.put(`/bookings/${id}/status`, { status }),
  confirmBooking: (id, payload) => apiClient.post(`/bookings/${id}/confirm`, payload),
  cancelBooking: (id, reason) =>
    apiClient.post(`/bookings/${id}/cancel`, { reason }),
  checkIn: (id) => apiClient.post(`/bookings/${id}/check-in`),
  deleteBooking: (id) => apiClient.delete(`/bookings/${id}`),
  getStats: () => apiClient.get('/dashboard/stats')
};

export const patientsAPI = {
  search: (q) => apiClient.get('/patients/search', { params: { q } }),
  lookup: (phone) => apiClient.get('/patients/lookup', { params: { phone } }),
  getOne: (id) => apiClient.get(`/patients/${id}`),
  getBookings: (id) => apiClient.get(`/patients/${id}/bookings`),
  create: (data) => apiClient.post('/patients', data),
  update: (id, data) => apiClient.put(`/patients/${id}`, data)
};

export const queueAPI = {
  getMyQueue: (params) => apiClient.get('/queue', { params }),
  advance: (data) => apiClient.post('/queue/advance', data),
  pause: () => apiClient.post('/queue/pause')
};

// ============================================================
// SSE HELPER (real-time)
// ============================================================
export function connectEventStream(path, handlers = {}) {
  const base = API_URL.replace('/api', '');
  const url = `${base}/api${path}`;
  const token = localStorage.getItem('sangwa_token');

  // EventSource doesn't support custom headers — append token as query
  const urlWithToken = token
    ? `${url}${url.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`
    : url;

  const source = new EventSource(urlWithToken, { withCredentials: true });

  source.onopen = () => handlers.onOpen?.();
  source.onerror = (err) => handlers.onError?.(err);
  source.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handlers.onMessage?.(data);
    } catch {
      handlers.onMessage?.(event.data);
    }
  };

  return {
    close: () => source.close(),
    source
  };
}

export default apiClient;