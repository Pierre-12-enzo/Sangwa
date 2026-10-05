// src/pages/doctor/DoctorQueue.jsx
import { useState } from 'react';
import {
    FaPlay,
    FaCheckCircle,
    FaUserCheck,
    FaClock,
    FaCircle,
    FaChevronRight,
    FaSync
} from 'react-icons/fa';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../hooks/useQueue';
import { queueAPI } from '../../api/client';
import { todayISO } from '../../lib/dates';
import { formatTime } from '../../lib/dates';

const SESSIONS = ['morning', 'afternoon', 'evening'];

export default function DoctorQueue() {
    const { user } = useAuth();
    const doctorId = user?.doctorProfile;
    const [date, setDate] = useState(todayISO());
    const [session, setSession] = useState('morning');
    const [busy, setBusy] = useState(false);

    const { data, isLoading, refetch, sseStatus } = useQueue({
        doctorId,
        date,
        session
    });

    const queue = data?.data || [];
    const current = queue.find((b) => b.status === 'in_consultation');
    const waiting = queue.filter((b) =>
        ['confirmed', 'checked_in'].includes(b.status)
    );

    const handleCallNext = async () => {
        setBusy(true);
        try {
            await queueAPI.advance({
                doctorId,
                date,
                session,
                completedBookingId: current?._id
            });
            toast.success('Called next patient');
            refetch();
        } catch (err) {
            toast.error(err.displayMessage || 'Failed to advance queue');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-600">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-600">Session</label>
                    <select
                        value={session}
                        onChange={(e) => setSession(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none capitalize"
                    >
                        {SESSIONS.map((s) => (
                            <option key={s} value={s} className="capitalize">
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-2">
                    <span
                        className={`flex items-center gap-1.5 text-xs font-semibold ${sseStatus === 'open'
                            ? 'text-[#1E6B43]'
                            : sseStatus === 'connecting'
                                ? 'text-[#E06D20]'
                                : 'text-gray-400'
                            }`}
                    >
                        <FaCircle className={`text-[6px] ${sseStatus === 'open' ? 'animate-pulse' : ''
                            }`} />
                        {sseStatus === 'open' ? 'Live' : sseStatus}
                    </span>
                    <button
                        onClick={refetch}
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                    >
                        <FaSync className={isLoading ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Now consulting */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#3B6B66] to-[#1E6B43] px-5 py-3 text-white flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-2">
                        <FaPlay className="text-xs" />
                        Now Consulting
                    </h3>
                    {current && (
                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                            Token #{current.tokenNumber}
                        </span>
                    )}
                </div>

                <div className="p-5">
                    {current ? (
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex-1">
                                <p className="text-2xl font-bold text-[#0F172A]">
                                    {current.patientName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {current.patientNumber} · {current.patient?.phoneNumber}
                                </p>
                                {current.calledAt && (
                                    <p className="text-xs text-[#E06D20] mt-1 flex items-center gap-1">
                                        <FaClock className="text-[10px]" />
                                        Started at {new Date(current.calledAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleCallNext}
                                disabled={busy}
                                className="bg-[#E06D20] hover:bg-[#c95f1a] text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 disabled:opacity-50"
                            >
                                {busy ? 'Processing…' : 'Mark Complete & Call Next'}
                                <FaChevronRight className="text-xs" />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <FaUserCheck className="text-4xl text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No patient in consultation</p>
                            {waiting.length > 0 && (
                                <button
                                    onClick={handleCallNext}
                                    disabled={busy}
                                    className="mt-4 bg-[#E06D20] hover:bg-[#c95f1a] text-white px-6 py-3 rounded-xl font-semibold transition inline-flex items-center gap-2 disabled:opacity-50"
                                >
                                    {busy ? 'Processing…' : 'Call First Patient'}
                                    <FaChevronRight className="text-xs" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Waiting list */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-[#0F172A]">
                        Waiting ({waiting.length})
                    </h3>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading…</div>
                ) : waiting.length === 0 ? (
                    <div className="p-8 text-center">
                        <FaCheckCircle className="text-4xl text-[#1E6B43]/40 mx-auto mb-3" />
                        <p className="text-gray-500">Queue is empty</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {waiting.map((b) => (
                            <li
                                key={b._id}
                                className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50 transition"
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${b.status === 'checked_in'
                                        ? 'bg-[#1E6B43] text-white'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {b.tokenNumber}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-[#0F172A] truncate">
                                        {b.patientName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {b.status === 'checked_in'
                                            ? '✅ Checked in'
                                            : '⏳ Not arrived yet'}
                                    </p>
                                </div>
                                {b.status === 'checked_in' && (
                                    <span className="text-xs font-semibold text-[#1E6B43] bg-[#1E6B43]/10 px-2 py-1 rounded-full">
                                        Ready
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}