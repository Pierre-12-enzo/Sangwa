// src/pages/doctor/DoctorOverview.jsx
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
    FaUsers,
    FaCheckCircle,
    FaClock,
    FaHourglassHalf,
    FaArrowRight,
    FaCircle
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { queueAPI } from '../../api/client';
import { todayISO } from '../../lib/dates';

export default function DoctorOverview() {
    const { user } = useAuth();
    const doctorId = user?.doctorProfile;
    const today = todayISO();

    const { data, isLoading } = useQuery({
        queryKey: ['doctor-overview', doctorId, today],
        queryFn: async () => {
            const { data } = await queueAPI.getMyQueue({
                doctorId,
                date: today
            });
            return data;
        },
        enabled: !!doctorId,
        refetchInterval: 20000
    });

    const sessions = data?.sessions || {};
    const allBookings = Object.values(sessions).flat();
    const stats = useMemo(() => {
        return {
            total: allBookings.length,
            waiting: allBookings.filter((b) => b.status === 'confirmed').length,
            checkedIn: allBookings.filter((b) => b.status === 'checked_in').length,
            inConsultation: allBookings.filter((b) => b.status === 'in_consultation').length,
            completed: allBookings.filter((b) => b.status === 'completed').length
        };
    }, [allBookings]);

    const cards = [
        { label: 'Total today', value: stats.total, color: '#3B6B66', icon: <FaUsers /> },
        { label: 'Waiting', value: stats.waiting, color: '#E06D20', icon: <FaHourglassHalf /> },
        { label: 'Checked in', value: stats.checkedIn, color: '#1E6B43', icon: <FaCheckCircle /> },
        { label: 'In consultation', value: stats.inConsultation, color: '#3B6B66', icon: <FaClock /> }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-br from-[#3B6B66] to-[#1E6B43] rounded-2xl p-6 text-white">
                <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                    Welcome back
                </p>
                <h2 className="text-2xl md:text-3xl font-bold">{user?.fullName}</h2>
                <p className="text-white/80 mt-2">
                    {new Date().toLocaleDateString('en-RW', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cards.map((c) => (
                    <div
                        key={c.label}
                        className="bg-white rounded-2xl border border-gray-100 p-5 shadow-soft"
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3"
                            style={{ background: c.color }}
                        >
                            {c.icon}
                        </div>
                        <p className="text-3xl font-bold text-[#0F172A]">{c.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{c.label}</p>
                    </div>
                ))}
            </div>

            {/* Sessions summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#0F172A]">Today's Sessions</h3>
                    <Link
                        to="/doctor/queue"
                        className="text-sm font-semibold text-[#3B6B66] hover:text-[#E06D20] transition flex items-center gap-1"
                    >
                        Open queue <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                {isLoading ? (
                    <p className="text-gray-500 text-sm">Loading…</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['morning', 'afternoon', 'evening'].map((s) => {
                            const list = sessions[s] || [];
                            const isActive = list.some((b) => b.status === 'in_consultation');
                            return (
                                <div
                                    key={s}
                                    className={`rounded-xl border p-4 ${isActive
                                        ? 'border-[#1E6B43]/40 bg-[#1E6B43]/5'
                                        : 'border-gray-100 bg-gray-50/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-semibold capitalize text-[#0F172A]">
                                            {s}
                                        </p>
                                        {isActive && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#1E6B43]">
                                                <FaCircle className="text-[6px] animate-pulse" />
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-2xl font-bold text-[#0F172A]">
                                        {list.length}
                                    </p>
                                    <p className="text-xs text-gray-500">patients</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}