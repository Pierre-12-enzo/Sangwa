// frontend/src/components/LanguageToggle.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaGlobeAfrica, FaChevronDown } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';
import { LOCALES } from '../i18n/dict';

/**
 * LanguageToggle
 * Compact pill in the navbar that opens a dropdown of supported
 * locales. Flag glyphs are rendered as text (RW/FR/EN) so we don't
 * pull in flag icon assets or hit any third-party CDN. Locale is
 * stored in localStorage by the provider.
 */
function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open]);

  const current = LOCALES.find((l) => l.code === lang) || LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white border border-white/30 hover:border-white/70 rounded-full px-3 py-1.5 transition"
      >
        <FaGlobeAfrica className="text-xs" />
        <span>{current.label}</span>
        <FaChevronDown
          className={`text-[9px] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
        >
          {LOCALES.map((l) => {
            const isActive = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-sm flex items-center gap-2.5 transition ${
                    isActive
                      ? 'bg-[#3B6B66]/10 text-[#3B6B66] font-semibold'
                      : 'text-[#0F172A] hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`w-7 h-5 rounded text-[10px] font-extrabold flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-[#3B6B66] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {l.label}
                  </span>
                  <span className="truncate">{l.full}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LanguageToggle;
