// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesGrid from '../components/ServicesGrid';
import WhySangwa from '../components/WhySangwa';
import Testimonials from '../components/Testimonials';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer';
import LiveChatWidget from '../components/LiveChatWidget';
import EmergencyBar from '../components/EmergencyBar';
import VirtualTour from '../components/VirtualTour';
import MapContact from '../components/MapContact';
import ScrollToTop from '../components/ScrollToTop';
import AppLoader from '../components/AppLoader';

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setHeroHeight(entry.contentRect.height);
    });
    ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, []);

  if (loading) return <AppLoader label="Loading Sangwa…" />;

  return (
    <div className="min-h-screen">
      <Navbar
        onBookingClick={() => setIsBookingOpen(true)}
        heroStickyHeight={heroHeight}
      />

      <LiveChatWidget />

      <div ref={heroRef}>
        <Hero onBookingClick={() => setIsBookingOpen(true)} />
      </div>

      <AboutSection />
      <ServicesGrid />
      <WhySangwa />
      <VirtualTour />
      <MapContact onBookingClick={() => setIsBookingOpen(true)} />
      <Testimonials />
      <Footer />

      <EmergencyBar onBookingClick={() => setIsBookingOpen(true)} />
      <ScrollToTop />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}