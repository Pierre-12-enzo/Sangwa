// frontend/src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { FaUser, FaLock, FaHospital, FaArrowRight } from 'react-icons/fa';
import { authAPI } from '../api/client';
import toast from 'react-hot-toast';

function AdminLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authAPI.login(email, password);

            if (response.data.success) {
                // Store token and user data
                localStorage.setItem('sangwa_admin_token', response.data.data.token);
                localStorage.setItem('sangwa_admin_user', JSON.stringify(response.data.data.admin));

                toast.success('✅ Login successful!');
                onLoginSuccess();
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error(error.response?.data?.message || '❌ Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-[#F8FAFC] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#3B6B66] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaHospital className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0F172A]">Admin Login</h2>
                    <p className="text-gray-500 text-sm mt-1">Sangwa Polyclinic Dashboard</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaUser className="inline mr-2 text-[#3B6B66]" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                            placeholder="admin@sangwapolyclinic.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaLock className="inline mr-2 text-[#3B6B66]" />
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#3B6B66] hover:bg-[#2d5450] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            'Logging in...'
                        ) : (
                            <>
                                Login
                                <FaArrowRight />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>Demo Credentials:</p>
                    <p>Email: admin@sangwapolyclinic.com</p>
                    <p>Password: SecurePassword123!</p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;