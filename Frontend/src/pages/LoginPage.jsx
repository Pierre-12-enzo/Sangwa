// src/pages/LoginPage.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUser, FaLock, FaHospital, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';

const HOME_BY_ROLE = {
    admin: '/admin',
    manager: '/admin',
    receptionist: '/reception',
    doctor: '/doctor'
};

export default function LoginPage() {
    const { login, isAuthenticated, user, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const hasRedirected = useRef(false);

    // ✅ Redirect already-logged-in users — guarded to prevent loops
    useEffect(() => {
        if (hasRedirected.current) return;
        if (isLoading) return;              // wait for auth bootstrap
        if (!isAuthenticated || !user) return;

        hasRedirected.current = true;
        const from = location.state?.from?.pathname;
        navigate(from || HOME_BY_ROLE[user.role] || '/', { replace: true });
    }, [isAuthenticated, user, isLoading, navigate, location]);

    // Session-expired toast
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('expired')) {
            toast.error('Your session expired. Please sign in again.');
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const loggedIn = await login(email.trim().toLowerCase(), password);
            navigate(HOME_BY_ROLE[loggedIn.role] || '/', { replace: true });
        } catch (err) {
            toast.error(err.displayMessage || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = (role) => {
        const creds = {
            admin: ['admin@sangwa.rw', 'sangwa123'],
            reception: ['reception@sangwa.rw', 'sangwa123'],
            doctor: ['dr.alice@sangwa.rw', 'sangwa123']
        }[role];
        if (creds) {
            setEmail(creds[0]);
            setPassword(creds[1]);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#F8FAFC]">
            {/* LEFT: form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <Link to="/" className="inline-flex items-center gap-3 mb-10 group">
                        <div className="w-12 h-12 rounded-2xl bg-[#3B6B66] flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition">
                            <FaHospital className="text-2xl" />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-[#0F172A] leading-none">Sangwa</p>
                            <p className="text-xs text-gray-500">Polyclinic · Staff Portal</p>
                        </div>
                    </Link>

                    <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Welcome back</h1>
                    <p className="text-gray-500 mb-8">Sign in to access the staff dashboard.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <FaUser className="inline mr-2 text-[#3B6B66]" />
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="you@sangwa.rw"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
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
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#3B6B66] hover:bg-[#2d5450] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? 'Signing in…' : (<>Sign in <FaArrowRight /></>)}
                        </button>
                    </form>

                    {import.meta.env.DEV && (
                        <div className="mt-10 p-4 rounded-xl bg-white border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Demo accounts
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['admin', 'reception', 'doctor'].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => fillDemo(r)}
                                        className="px-3 py-1.5 text-sm font-semibold text-[#3B6B66] hover:bg-[#3B6B66]/10 rounded-lg transition capitalize"
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: brand visual */}
            <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#3B6B66] via-[#3B6B66] to-[#1E6B43] overflow-hidden">
                <div className="absolute inset-0 ecg-paper opacity-30" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E06D20]/30 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    <div>
                        <p className="text-sm font-medium opacity-80 mb-2">Sangwa Polyclinic</p>
                        <p className="text-xs opacity-60">Ngoma Sector, Huye · Rwanda</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold leading-tight mb-6">
                            A modern<br />healthcare<br />
                            <span className="text-[#f08841]">workflow.</span>
                        </h2>
                        <p className="text-white/80 max-w-sm leading-relaxed">
                            Real-time queue management, patient records, and digital
                            appointments — built for Rwanda's clinics.
                        </p>
                    </div>
                    <div className="text-xs opacity-60">
                        © {new Date().getFullYear()} Sangwa Polyclinic
                    </div>
                </div>
            </div>
        </div>
    );
}