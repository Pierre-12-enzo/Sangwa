// frontend/src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesGrid from './components/ServicesGrid';
import WhySangwa from './components/WhySangwa';
import Testimonials from './components/Testimonials';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AppLoader from './components/AppLoader';
import VirtualTour from './components/VirtualTour';
import ScrollToTop from './components/ScrollToTop';
import LiveChatWidget from './components/LiveChatWidget';
import EmergencyBar from './components/EmergencyBar';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const heroRef = useRef(null);
  const [ready, setReady] = useState(true);

  // Secret admin access: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(!showAdmin);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAdmin]);

  // Track hero height
  useEffect(() => {
    if (!heroRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setHeroHeight(entry.contentRect.height);
    });
    ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar
        onBookingClick={() => setIsBookingOpen(true)}
        heroStickyHeight={heroHeight}
      />

      {showAdmin ? (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      ) : (
        <>
          <div ref={heroRef}>
            <Hero onBookingClick={() => setIsBookingOpen(true)} />
          </div>
          <AboutSection />
          <ServicesGrid />
          <WhySangwa />
          <Testimonials />
          <VirtualTour />
          <Footer />
        </>
      )}

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Always-on components */}
      <LiveChatWidget />
      <EmergencyBar onBookingClick={() => setIsBookingOpen(true)} />
      <ScrollToTop />

      {/* Admin hint */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 text-xs text-gray-400 opacity-30 bg-white/90 px-3 py-1 rounded-full shadow-soft">
          Ctrl+Shift+A for Admin
        </div>
      )}
    </div>
  );
}

export default App;