// frontend/src/components/EmergencyBanner.jsx
import React, { useState, useEffect } from 'react';
import { FaPhone, FaTimes, FaAmbulance, FaClock } from 'react-icons/fa';

function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Emergency Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <div className="flex flex-col items-end gap-3">
          {/* Quick access buttons */}
          <a 
            href="tel:+250793929136"
            className="bg-[#E06D20] text-white p-4 rounded-full shadow-2xl hover:bg-[#c95f1a] transition transform hover:scale-105 flex items-center gap-3 group"
          >
            <FaPhone className="text-xl animate-pulse" />
            <span className="hidden group-hover:inline text-sm font-semibold transition-all duration-300">
              Emergency: 0793929136
            </span>
          </a>
        </div>
      </div>

      {/* Top Emergency Bar (visible when at top) */}
      <div className={`fixed top-0 left-0 right-0 z-40 bg-[#E06D20] text-white text-sm transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaAmbulance className="text-lg" />
              <span className="font-semibold">Emergency Hotline:</span>
            </div>
            <a href="tel:+250793929136" className="hover:underline font-bold">
              0793929136
            </a>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <span className="flex items-center gap-1">
              <FaClock /> 24/7 Available
            </span>
            <button 
              onClick={() => setIsVisible(false)}
              className="opacity-70 hover:opacity-100 transition"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmergencyBanner;