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

function Footer() {
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
    <footer id="contact" className="bg-[#0F172A] text-white">
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
              Delivering high-quality, compassionate healthcare to the Huye community 
              and surrounding regions since 2023.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#E06D20] transition text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E06D20] transition text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E06D20] transition text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E06D20] transition text-xl">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-[#E06D20] transition text-sm">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#E06D20] transition text-sm">Our Services</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-[#E06D20] transition text-sm">Testimonials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#E06D20] transition text-sm">Patient Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#E06D20] transition text-sm">Careers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact & Hours</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <FaMapMarkerAlt className="text-[#E06D20] mt-1 flex-shrink-0" />
                <span className="text-gray-400">Ngoma Sector, Huye District<br />Near CHUB, Rwanda</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FaPhone className="text-[#E06D20] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  <a href="tel:+250793929136" className="hover:text-white transition">0793929136</a>
                  <br />
                  <span className="text-xs opacity-60">24/7 Emergency Hotline</span>
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
                  Mon-Sat: 7:00 AM – 8:00 PM
                  <br />
                  <span className="text-xs opacity-60">Sundays: Emergencies Only</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive health tips and clinic updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E06D20] transition"
                required
              />
              <button 
                type="submit"
                className="bg-[#E06D20] hover:bg-[#c95f1a] transition px-4 py-3 rounded-lg font-semibold text-sm"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
            <div className="mt-6 p-4 bg-[#3B6B66]/10 rounded-lg border border-[#3B6B66]/20">
              <div className="flex items-center gap-2">
                <FaAmbulance className="text-[#E06D20]" />
                <span className="text-sm font-medium">24/7 Emergency</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Call our emergency desk anytime: <strong className="text-white">0793929136</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>© 2026 Sangwa Polyclinic</span>
            <span className="hidden md:inline">·</span>
            <span className="flex items-center gap-1">
              Made with <FaHeart className="text-red-500 text-xs" /> in Rwanda
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaArrowUp />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;