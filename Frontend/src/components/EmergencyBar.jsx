// frontend/src/components/EmergencyBar.jsx
import React, { useState } from 'react';
import { FaPhone, FaAmbulance, FaTimes, FaCalendarCheck } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';

/**
 * EmergencyBar
 * Two complementary pieces of always-on emergency access:
 *
 *  1. Mobile-only sticky bottom bar (md:hidden). Three actions:
 *     - Emergency call (red CTA, links to tel:+250793929136)
 *     - Call desk (white ghost, links to tel:+250793929136)
 *     - Book appointment (opens the booking modal via the App-level
 *       callback, same pattern as the Navbar)
 *
 *  2. Desktop floating phone button (hidden md:flex). Same call link.
 *
 * The two together replace the older EmergencyBanner that was disabled
 * in App.jsx. The user can dismiss the mobile bar with the X button —
 * preference is remembered in this session only (not localStorage) so
 * the safety-critical emergency CTA comes back on next visit.
 */
function EmergencyBar({ onBookingClick }) {
  const { t } = useI18n();
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {/* ===== Mobile sticky bottom bar ===== */}
      {!dismissed && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)]">
          <div className="grid grid-cols-[1fr_auto] items-stretch">
            <div className="grid grid-cols-3">
              {/* Emergency call — full-bleed red, the loudest CTA */}
              <a
                href="tel:+250793929136"
                className="flex flex-col items-center justify-center gap-0.5 py-2.5 bg-[#E06D20] text-white active:bg-[#c95f1a] transition"
                aria-label={t('mobileBar.emergency')}
              >
                <FaAmbulance className="text-base" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t('mobileBar.emergency')}
                </span>
              </a>

              {/* Call desk — secondary white ghost */}
              <a
                href="tel:+250793929136"
                className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[#0F172A] active:bg-gray-100 transition"
                aria-label={t('mobileBar.call')}
              >
                <FaPhone className="text-base text-[#3B6B66]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t('mobileBar.call')}
                </span>
              </a>

              {/* Book — teal */}
              <button
                type="button"
                onClick={onBookingClick}
                className="flex flex-col items-center justify-center gap-0.5 py-2.5 bg-[#3B6B66] text-white active:bg-[#2d5450] transition"
                aria-label={t('mobileBar.book')}
              >
                <FaCalendarCheck className="text-base" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t('mobileBar.book')}
                </span>
              </button>
            </div>

            {/* Dismiss — only hides for this session */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label={t('chat.ariaClose')}
              className="px-3 text-gray-400 hover:text-gray-600 border-l border-gray-200"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* ===== Desktop floating phone button ===== */}
      <a
        href="tel:+250793929136"
        aria-label={t('mobileBar.emergency')}
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-[#E06D20] hover:bg-[#c95f1a] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-orange-900/30 transition transform hover:scale-105 group"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 animate-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>
        <FaAmbulance className="text-base" />
        <span className="text-sm font-bold whitespace-nowrap">
          079 392 9136
        </span>
      </a>
    </>
  );
}

export default EmergencyBar;
