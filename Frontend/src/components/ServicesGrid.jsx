// frontend/src/components/ServicesGrid.jsx
import React from 'react';
import {
  FaBaby,
  FaStethoscope,
  FaChild,
  FaUtensils,
  FaFlask,
  FaPills,
  FaCheckCircle
} from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';

function ServicesGrid() {
  const { t } = useI18n();

  // Service keys map 1:1 to i18n dict keys (services.item.<key>).
  // Adding a new service = add an entry here + 4 keys in dict.js.
  const services = [
    {
      key: 'maternity',
      icon: <FaBaby className="text-3xl" />,
    },
    {
      key: 'internal',
      icon: <FaStethoscope className="text-3xl" />,
    },
    {
      key: 'pediatrics',
      icon: <FaChild className="text-3xl" />,
    },
    {
      key: 'amenities',
      icon: <FaUtensils className="text-3xl" />,
    },
    {
      key: 'lab',
      icon: <FaFlask className="text-3xl" />,
    },
    {
      key: 'pharmacy',
      icon: <FaPills className="text-3xl" />,
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#3B6B66]/10 text-[#3B6B66] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaCheckCircle />
            <span>{t('services.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            {t('services.headline.line1')}
            <br />
            <span className="gradient-text">{t('services.headline.accent')}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('services.subtext')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ key, icon }, index) => (
            <div
              key={key}
              className="group bg-white rounded-2xl shadow-soft border border-gray-100 p-8 card-hover relative overflow-hidden"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B6B66]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition duration-500"></div>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 bg-[#3B6B66]/10 rounded-2xl flex items-center justify-center text-[#3B6B66] mb-6 group-hover:bg-[#3B6B66] group-hover:text-white transition duration-300">
                {icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#3B6B66] transition">
                  {t(`services.item.${key}.title`)}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {t(`services.item.${key}.text`)}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheckCircle className="text-[#1E6B43] text-xs flex-shrink-0" />
                      <span>{t(`services.item.${key}.f${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn more link */}
              <div className="relative z-10 mt-6 pt-4 border-t border-gray-100">
                <a
                  href="#booking"
                  className="text-[#3B6B66] font-semibold hover:text-[#E06D20] transition flex items-center gap-2 text-sm"
                >
                  {t('services.bookCta')}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 bg-[#3B6B66] rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold mb-1">500+</p>
              <p className="text-sm opacity-80">{t('services.trust.patients')}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">98%</p>
              <p className="text-sm opacity-80">{t('services.trust.satisfaction')}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">15min</p>
              <p className="text-sm opacity-80">{t('services.trust.wait')}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">24/7</p>
              <p className="text-sm opacity-80">{t('services.trust.emergency')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
