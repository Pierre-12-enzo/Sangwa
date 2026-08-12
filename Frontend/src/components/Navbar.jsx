// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FaPhone, FaCalendarCheck, FaBars, FaTimes } from 'react-icons/fa';
import heroReal from '../assets/hero-real.jpg';
import LanguageToggle from './LanguageToggle';
import { useI18n } from '../i18n/I18nProvider';

function Navbar({ onBookingClick, heroStickyHeight = 0 }) {
    const { t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [solid, setSolid] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const threshold =
                heroStickyHeight > 0 ? heroStickyHeight * 0.7 : window.innerHeight * 0.7;
            setSolid(window.scrollY > threshold);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [heroStickyHeight]);

    const handleLinkClick = () => setIsOpen(false);

    // 🔥 FIXED: Navbar blends with hero background
    const rootClass = `sticky top-0 z-50 transition-all duration-500 ${solid
        ? 'bg-teal-sage shadow-[0_8px_32px_rgba(15,23,42,0.18)] border-b border-white/10'
        : 'navbar-hero-blend'
        }`;

    const linkBase =
        'nav-link text-white/90 hover:text-white transition-colors';

    const callBtn =
        'flex items-center gap-2 bg-med-orange hover:bg-[#c95f1a] px-4 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 hover:-translate-y-0.5';

    const bookBtn =
        'border border-white/70 hover:bg-white hover:text-teal-sage px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5';

    return (
        <nav
            className={rootClass}

        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
                {/* Logo */}
                <a
                    href="#top"
                    className="flex items-center space-x-3 group"
                    onClick={handleLinkClick}
                >
                    <div
                        className={`relative w-11 h-11 rounded-full overflow-hidden ring-2 transition-all duration-500 ${solid
                            ? 'ring-white/40 group-hover:ring-white/80'
                            : 'ring-white/60 group-hover:ring-white'
                            } group-hover:scale-105`}
                    >
                        <img
                            src={heroReal}
                            alt="Sangwa Polyclinic"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="leading-tight">
                        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
                            Sangwa
                        </h1>
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/75">
                            Polyclinic · Huye
                        </p>
                    </div>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium">
                    <a href="#about" className={linkBase}>
                        {t('nav.about')}
                    </a>
                    <a href="#services" className={linkBase}>
                        {t('nav.services')}
                    </a>
                    <a href="#testimonials" className={linkBase}>
                        {t('nav.testimonials')}
                    </a>
                    <a href="#contact" className={linkBase}>
                        {t('nav.contact')}
                    </a>

                    <LanguageToggle />

                    <a href="tel:+250793929136" className={callBtn}>
                        <FaPhone className="text-xs" />
                        <span>{t('nav.call')}</span>
                    </a>

                    <button
                        onClick={onBookingClick}
                        className={`${bookBtn} text-white`}
                    >
                        <FaCalendarCheck />
                        <span>{t('nav.book')}</span>
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    aria-label="Toggle menu"
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl p-2 rounded-lg text-white hover:bg-white/15 transition"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile panel */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pb-5 pt-3 mx-3 mb-3 rounded-2xl bg-dark-slate/90 backdrop-blur-xl border border-white/15 space-y-1 text-sm font-medium text-white">
                    <a
                        href="#about"
                        onClick={handleLinkClick}
                        className="block px-4 py-2.5 rounded-xl hover:bg-white/15 transition"
                    >
                        {t('nav.about')}
                    </a>
                    <a
                        href="#services"
                        onClick={handleLinkClick}
                        className="block px-4 py-2.5 rounded-xl hover:bg-white/15 transition"
                    >
                        {t('nav.services')}
                    </a>
                    <a
                        href="#testimonials"
                        onClick={handleLinkClick}
                        className="block px-4 py-2.5 rounded-xl hover:bg-white/15 transition"
                    >
                        {t('nav.testimonials')}
                    </a>
                    <a
                        href="#contact"
                        onClick={handleLinkClick}
                        className="block px-4 py-2.5 rounded-xl hover:bg-white/15 transition"
                    >
                        {t('nav.contact')}
                    </a>

                    {/* Language toggle, mobile */}
                    <div className="pt-2 pb-1">
                        <LanguageToggle />
                    </div>

                    <a
                        href="tel:+250793929136"
                        className="mt-2 flex items-center justify-center gap-2 bg-med-orange hover:bg-[#c95f1a] px-4 py-3 rounded-full font-semibold transition"
                    >
                        <FaPhone />
                        <span>{t('nav.emergencyMobile')}</span>
                    </a>

                    <button
                        onClick={() => {
                            onBookingClick();
                            handleLinkClick();
                        }}
                        className="w-full border border-white/80 hover:bg-white hover:text-teal-sage px-4 py-3 rounded-full font-semibold transition flex items-center justify-center gap-2"
                    >
                        <FaCalendarCheck />
                        {t('hero.cta.book')}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;