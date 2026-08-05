// frontend/src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesGrid from './components/ServicesGrid';
import WhySangwa from './components/WhySangwa';
import Testimonials from './components/Testimonials';
import BookingModal from './components/BookingModal';
import EmergencyBanner from './components/EmergencyBanner';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AppLoader from './components/AppLoader';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const heroRef = useRef(null);
  // Set to true once any top-level async boot (auth, config, etc.) finishes.
  // For now there's nothing to wait on, so this stays true and the
  // preloader in index.html hands off directly to the rendered app.
  const [ready, setReady] = useState(true);

  // Top-level async boot. When you wire the backend, kick off auth +
  // initial config here, setReady(false) before the requests, and
  // setReady(true) in the .finally of the Promise.all.
  // useEffect(() => {
  //   let cancelled = false;
  //   setReady(false);
  //   Promise.all([fetchSession(), fetchConfig()])
  //     .then(([session, config]) => { if (!cancelled) { /* hydrate */ } })
  //     .catch(() => { /* toast */ })
  //     .finally(() => { if (!cancelled) setReady(true); });
  //   return () => { cancelled = true; };
  // }, []);

  if (!ready) return <AppLoader label="Loading Sangwa…" />;

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

  // Track hero height so the navbar knows when to switch from
  // transparent → solid teal (matches where the hero ends).
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
          <Footer />
        </>
      )}

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

     {/** <EmergencyBanner /> */} 

      {/* Admin hint - visible only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 text-xs text-gray-400 opacity-30 bg-white/90 px-3 py-1 rounded-full shadow-soft">
          Ctrl+Shift+A for Admin
        </div>
      )}
    </div>
  );
}

export default App;
