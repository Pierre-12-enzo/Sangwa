// frontend/src/components/MapContact.jsx
import React from 'react';
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaRoute,
  FaFileDownload,
  FaAmbulance,
  FaWhatsapp,
} from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';

/**
 * MapContact
 * Contact + map section that slots between WhySangwa and Testimonials.
 * Embeds a Google Maps iframe centred on Sangwa Polyclinic near CHUB,
 * surfaces the directions link, transport info, address and hours, and
 * gives a brochure download CTA.
 *
 * The embed uses Google's standard `maps/embed` endpoint with a query
 * — no API key required. The `pb` style param keeps the chrome minimal
 * so the map blends with the brand palette. Replace the q= value with
 * a real place_id later if/when a Google Maps API key is added.
 */

// CHUB (Centre Hospitalier Universitaire de Butare) is the well-known
// anchor in Huye — a sensible "from" for directions.
const CHUB_PLACE = 'Centre Hospitalier Universitaire de Butare, Huye, Rwanda';
const SANGWA_QUERY = 'Sangwa Polyclinic, Ngoma, Huye, Rwanda';

// Pre-built Google Maps directions link: CHUB → Sangwa.
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
  CHUB_PLACE
)}&destination=${encodeURIComponent(SANGWA_QUERY)}&travelmode=driving`;

// Same address used to look up on Google Maps.
const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SANGWA_QUERY
)}`;

const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  SANGWA_QUERY
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

function MapContact({ onBookingClick }) {
  const { t } = useI18n();
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#3B6B66]/10 text-[#3B6B66] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaMapMarkerAlt />
            <span>{t('map.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-3 md:mb-4">
            {t('map.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            {t('map.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ===== Map (3/5) ===== */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden shadow-soft border border-gray-100 bg-white">
              {/* Aspect-ratio box keeps the map from collapsing. */}
              <div className="relative w-full" style={{ paddingTop: '75%' }}>
                <iframe
                  title="Sangwa Polyclinic — Google Maps"
                  src={MAP_EMBED_URL}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              {/* Floating brand pill over the map */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#3B6B66]/15 rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 shadow-md">
                <span className="w-7 h-7 rounded-full bg-[#E06D20] flex items-center justify-center text-white">
                  <FaAmbulance className="text-xs" />
                </span>
                <span className="text-xs font-bold text-[#0F172A]">
                  Sangwa Polyclinic
                </span>
              </div>
            </div>

            {/* Directions + brochure CTAs */}
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#3B6B66] hover:bg-[#2d5450] text-white px-5 py-3 rounded-xl font-semibold transition shadow-sm"
              >
                <FaRoute />
                {t('map.directionsCta')}
              </a>
              <a
                href="/brochure.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[#3B6B66] text-[#3B6B66] hover:bg-[#3B6B66] hover:text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                <FaFileDownload />
                {t('map.brochure')}
              </a>
            </div>
          </div>

          {/* ===== Info card (2/5) ===== */}
          <aside className="lg:col-span-2 space-y-4">
            {/* Address */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#3B6B66]/10 text-[#3B6B66] flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                  {t('map.addressLabel')}
                </p>
                <p className="text-[#0F172A] font-semibold leading-snug">
                  {t('footer.address.line1')}
                  <br />
                  {t('footer.address.line2')}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#3B6B66]/10 text-[#3B6B66] flex items-center justify-center shrink-0">
                <FaClock className="text-lg" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                  {t('map.hoursLabel')}
                </p>
                <p className="text-[#0F172A] font-semibold text-sm">
                  {t('footer.hours.weekday')}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {t('footer.hours.sunday')}
                </p>
              </div>
            </div>

            {/* Call / WhatsApp */}
            <a
              href="tel:+250793929136"
              className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 flex items-start gap-4 hover:border-[#3B6B66]/40 transition group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E06D20]/10 text-[#E06D20] flex items-center justify-center shrink-0 group-hover:bg-[#E06D20] group-hover:text-white transition">
                <FaPhone className="text-lg" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                  {t('map.callLabel')}
                </p>
                <p className="text-[#0F172A] font-extrabold text-lg">
                  079 392 9136
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {t('footer.available247')}
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/250793929136"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 flex items-start gap-4 hover:border-[#1E6B43]/40 transition group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1E6B43]/10 text-[#1E6B43] flex items-center justify-center shrink-0 group-hover:bg-[#1E6B43] group-hover:text-white transition">
                <FaWhatsapp className="text-lg" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                  WhatsApp
                </p>
                <p className="text-[#0F172A] font-semibold">
                  +250 793 929 136
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {t('chat.headerStatus')}
                </p>
              </div>
            </a>

            {/* Transport note */}
            <div className="bg-gradient-to-br from-[#3B6B66] to-[#1E6B43] rounded-2xl p-5 text-white">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/80 font-bold mb-2">
                {t('map.transport.title')}
              </p>
              <p className="text-sm leading-relaxed text-white/95">
                {t('map.transport.text')}
              </p>
            </div>

            {/* Book CTA, in case the user landed here first */}
            <button
              type="button"
              onClick={onBookingClick}
              className="w-full bg-[#E06D20] hover:bg-[#c95f1a] text-white py-3.5 rounded-xl font-semibold transition shadow-sm"
            >
              {t('hero.cta.book')}
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default MapContact;
