// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaSync,
  FaCheck,
  FaTimesCircle,
  FaTrash,
  FaClock,
  FaUsers,
  FaCalendarCheck,
  FaHourglassHalf,
  FaCheckCircle,
} from 'react-icons/fa';
import { adminAPI, authAPI } from '../api/client';
import toast from 'react-hot-toast';

function AdminDashboard({ onClose }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    today: 0,
  });
  const [admin, setAdmin] = useState(null);

  // 🔥 Load dashboard data
  const loadDashboard = async () => {
    setLoading(true);
    try {
      // Get stats and bookings in parallel
      const [statsRes, bookingsRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getBookings(),
      ]);

      setStats(statsRes.data.data);
      setBookings(bookingsRes.data.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Load admin profile
  const loadAdminProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setAdmin(response.data.data);
    } catch (error) {
      console.error('Error loading admin:', error);
    }
  };

  useEffect(() => {
    loadDashboard();
    loadAdminProfile();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Update booking status
  const updateStatus = async (id, status) => {
    try {
      await adminAPI.updateStatus(id, status);
      toast.success(`Booking ${status}`);
      loadDashboard();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // 🔥 Delete booking
  const deleteBooking = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try {
      await adminAPI.deleteBooking(id);
      toast.success('Booking deleted');
      loadDashboard();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  // 🔥 Logout
  const handleLogout = () => {
    authAPI.logout();
    toast.success('Logged out');
    onClose();
    window.location.reload();
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      'no-show': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#0F172A]">Admin Dashboard</h2>
            {admin && (
              <p className="text-gray-500">
                Welcome back, {admin.name} • {admin.role}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition"
            >
              Logout
            </button>
            <button
              onClick={loadDashboard}
              className="bg-[#3B6B66] text-white px-4 py-2 rounded-lg hover:bg-[#2d5450] transition flex items-center gap-2"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={onClose}
              className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3B6B66]/10 rounded-lg flex items-center justify-center text-[#3B6B66]">
                <FaUsers />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">{stats.total}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                <FaHourglassHalf />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">{stats.pending}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <FaCheckCircle />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">{stats.confirmed}</p>
                <p className="text-xs text-gray-500">Confirmed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <FaCalendarCheck />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">{stats.completed}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                <FaTimesCircle />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">{stats.cancelled}</p>
                <p className="text-xs text-gray-500">Cancelled</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E06D20]/10 rounded-lg flex items-center justify-center text-[#E06D20]">
                <FaClock />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A]">{stats.today}</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B6B66]"></div>
              <p className="mt-4 text-gray-500">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">No bookings yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#0F172A]">{booking.patientName}</div>
                        <div className="text-sm text-gray-500">{booking.phoneNumber}</div>
                        {booking.email && (
                          <div className="text-xs text-gray-400">{booking.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">{booking.service}</td>
                      <td className="px-6 py-4 text-sm">
                        <div>{new Date(booking.preferredDate).toLocaleDateString()}</div>
                        <div className="text-gray-500">{booking.preferredTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                        </span>
                        <div className="text-xs text-gray-400 mt-1">
                          Ref: {booking.bookingReference}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(booking._id, 'confirmed')}
                                className="text-green-600 hover:text-green-800 transition p-2 hover:bg-green-50 rounded-lg"
                                title="Confirm"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => updateStatus(booking._id, 'cancelled')}
                                className="text-red-600 hover:text-red-800 transition p-2 hover:bg-red-50 rounded-lg"
                                title="Cancel"
                              >
                                <FaTimesCircle />
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => updateStatus(booking._id, 'completed')}
                              className="text-blue-600 hover:text-blue-800 transition p-2 hover:bg-blue-50 rounded-lg"
                              title="Mark Complete"
                            >
                              <FaCheckCircle />
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(booking._id)}
                            className="text-gray-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-gray-400 text-center">
          <FaClock className="inline mr-1" /> Auto-refresh every 30 seconds
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;