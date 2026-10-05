// src/components/layout/StaffLayout.jsx
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaHospital,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaHome
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

/**
 * StaffLayout — sidebar + topbar for doctor/reception/admin dashboards.
 *
 * @param {Array} navItems - [{ to, label, icon, end? }]
 * @param {string} title - Page title shown in topbar
 */
export default function StaffLayout({ children, navItems = [], title = 'Dashboard' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
    toast.success('Signed out');
  };

  const roleLabel = {
    admin: 'Administrator',
    manager: 'Manager',
    receptionist: 'Reception',
    doctor: 'Doctor'
  }[user?.role] || user?.role;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* ===== Sidebar (desktop) ===== */}
      <aside className="hidden md:flex md:flex-col w-64 bg-[#0F172A] text-white">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3B6B66] flex items-center justify-center">
            <FaHospital />
          </div>
          <div>
            <p className="font-bold leading-none">Sangwa</p>
            <p className="text-[10px] uppercase tracking-wider opacity-60 mt-1">
              {roleLabel}
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#3B6B66] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <FaUserCircle className="text-3xl opacity-70" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {user?.fullName || 'User'}
              </p>
              <p className="text-xs opacity-60 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 transition"
          >
            <FaSignOutAlt className="text-xs" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ===== Main area ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-3">
          <button
            className="md:hidden text-xl text-[#0F172A]"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </button>

          <h1 className="text-lg md:text-xl font-bold text-[#0F172A] flex-1">
            {title}
          </h1>

          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#3B6B66] transition"
          >
            <FaHome className="text-xs" />
            Back to site
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
      </div>

      {/* ===== Mobile drawer ===== */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 bg-[#0F172A] text-white flex flex-col">
            <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3B6B66] flex items-center justify-center">
                  <FaHospital />
                </div>
                <div>
                  <p className="font-bold leading-none">Sangwa</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-60 mt-1">
                    {roleLabel}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-[#3B6B66] text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="px-3 py-3 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 transition"
              >
                <FaSignOutAlt className="text-xs" />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}