// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaSync, FaCheck, FaTimesCircle, FaTrash, FaClock } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminDashboard({ onClose }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0 });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data.data);
      const total = response.data.data.length;
      const pending = response.data.data.filter(b => b.status === 'pending').length;
      const confirmed = response.data.data.filter(b => b.status === 'confirmed').length;
      setStats({ total, pending, confirmed });
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      toast.success('Booking deleted');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
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
            <p className="text-gray-500">Manage patient appointments</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={fetchBookings}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-3xl font-bold text-[#0F172A]">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
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
                      </td>
                      <td className="px-6 py-4 text-sm">{booking.service}</td>
                      <td className="px-6 py-4 text-sm">
                        <div>{new Date(booking.preferredDate).toLocaleDateString()}</div>
                        <div className="text-gray-500">{booking.preferredTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => updateStatus(booking._id, 'confirmed')}
                                className="text-green-600 hover:text-green-800 transition"
                                title="Confirm"
                              >
                                <FaCheck />
                              </button>
                              <button 
                                onClick={() => updateStatus(booking._id, 'cancelled')}
                                className="text-red-600 hover:text-red-800 transition"
                                title="Cancel"
                              >
                                <FaTimesCircle />
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => deleteBooking(booking._id)}
                            className="text-gray-400 hover:text-red-600 transition"
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