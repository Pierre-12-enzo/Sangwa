// frontend/src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesGrid from './components/ServicesGrid';
import WhySangwa from './components/WhySangwa';
import Testimonials from './components/Testimonials';
import BookingModal from './components/BookingModal';
//import EmergencyBanner from './components/EmergencyBanner';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import LiveChatWidget from './components/LiveChatWidget';
import AppLoader from './components/AppLoader';


function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  // Check if admin is already logged in
  useEffect(() => {
    const token = localStorage.getItem('sangwa_admin_token');
    const user = localStorage.getItem('sangwa_admin_user');

    if (token && user) {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  // Secret admin access: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (isAuthenticated) {
          setShowAdmin(!showAdmin);
        } else {
          setShowAdminLogin(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAuthenticated, showAdmin]);

  // Track hero height
  useEffect(() => {
    if (!heroRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setHeroHeight(entry.contentRect.height);
    });
    ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, []);

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAdminLogin(false);
    setShowAdmin(true);
  };

  // Handle admin close
  const handleAdminClose = () => {
    setShowAdmin(false);
  };

  if (loading) return <AppLoader label="Loading Sangwa…" />;

  return (
    <div className="min-h-screen">
      <Navbar
        onBookingClick={() => setIsBookingOpen(true)}
        heroStickyHeight={heroHeight}
      />

      {showAdmin ? (
        <AdminDashboard onClose={handleAdminClose} />
      ) : (
        <>
        <LiveChatWidget/>
          <div ref={heroRef}>
            <Hero onBookingClick={() => setIsBookingOpen(true)} />

          </div>
          <AboutSection />
          <ServicesGrid />
          <WhySangwa />
          <Testimonials />
          <Footer />
        </>
      )}

      {showAdminLogin && (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* <EmergencyBanner /> */}

      {/* Admin hint */}
      {process.env.NODE_ENV === 'development' && !showAdmin && !showAdminLogin && (
        <div className="fixed bottom-4 right-4 text-xs text-gray-400 opacity-30 bg-white/90 px-3 py-1 rounded-full shadow-soft">
          Ctrl+Shift+A for Admin
        </div>
      )}
    </div>
  );
}

export default App;