// frontend/src/components/Footer.jsx
import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaHeart,
  FaArrowUp,
  FaAmbulance,
  FaShieldAlt
} from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';

function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#3B6B66]/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">S</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Sangwa</h3>
                <p className="text-sm opacity-70">Polyclinic · Huye</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.about')}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-[#E06D20] transition text-xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-[#E06D20] transition text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-[#E06D20] transition text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/250793929136"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-gray-400 hover:text-[#E06D20] transition text-xl"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.quick')}</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-[#E06D20] transition text-sm">{t('nav.about')}</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#E06D20] transition text-sm">{t('nav.services')}</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-[#E06D20] transition text-sm">{t('nav.testimonials')}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[#E06D20] transition text-sm">{t('nav.contact')}</a></li>
              <li>
                <a
                  href="/brochure.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#E06D20] transition text-sm"
                >
                  {t('map.brochure')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <FaMapMarkerAlt className="text-[#E06D20] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {t('footer.address.line1')}
                  <br />
                  {t('footer.address.line2')}
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FaPhone className="text-[#E06D20] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  <a href="tel:+250793929136" className="hover:text-white transition">0793929136</a>
                  <br />
                  <span className="text-xs opacity-60">{t('footer.available247')}</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FaEnvelope className="text-[#E06D20] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  <a href="mailto:info@sangwapolyclinic.com" className="hover:text-white transition">
                    info@sangwapolyclinic.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FaClock className="text-[#E06D20] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {t('footer.hours.weekday')}
                  <br />
                  <span className="text-xs opacity-60">{t('footer.hours.sunday')}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.stay')}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.subscribeText')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPh')}
                aria-label={t('footer.emailPh')}
                className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E06D20] transition"
                required
              />
              <button
                type="submit"
                className="bg-[#E06D20] hover:bg-[#c95f1a] transition px-4 py-3 rounded-lg font-semibold text-sm"
              >
                {subscribed ? t('footer.subscribed') : t('footer.subscribe')}
              </button>
            </form>
            <div className="mt-6 p-4 bg-[#3B6B66]/10 rounded-lg border border-[#3B6B66]/20">
              <div className="flex items-center gap-2">
                <FaAmbulance className="text-[#E06D20]" />
                <span className="text-sm font-medium">{t('footer.emergency24')}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {t('footer.emergencyHelp')}{' '}
                <strong className="text-white">0793929136</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{t('footer.copyright')}</span>
            <span className="hidden md:inline">·</span>
            <span className="flex items-center gap-1">
              {t('footer.madeWith')}{' '}
              <FaHeart className="text-red-500 text-xs" /> {t('footer.inRwanda')}
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition">{t('footer.terms')}</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaArrowUp />
              {t('footer.top')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
