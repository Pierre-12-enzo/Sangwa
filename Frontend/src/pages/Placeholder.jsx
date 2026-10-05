// src/pages/Placeholder.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Placeholder({ role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    // ✅ Let ProtectedRoute redirect — don't call navigate() here
    navigate('/login', { replace: true });
  };

  // If user was cleared, ProtectedRoute will bounce us. Just render nothing for a beat.
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[#3B6B66]/10 flex items-center justify-center mb-6">
        <span className="text-3xl">🚧</span>
      </div>
      <h1 className="text-3xl font-bold text-[#0F172A] mb-2">{role}</h1>
      <p className="text-gray-500 mb-1">
        Signed in as <strong>{user.fullName}</strong> ({user.role})
      </p>
      <p className="text-gray-500 max-w-md mb-8">
        This dashboard will be built in the next message.
      </p>
      <button
        onClick={handleLogout}
        className="bg-[#E06D20] hover:bg-[#c95f1a] text-white px-6 py-2.5 rounded-lg font-semibold transition"
      >
        Sign out
      </button>
    </div>
  );
}