// frontend/src/components/AboutSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  FaHospital,
  FaHands,
  FaGraduationCap,
  FaGlobeAfrica,
  FaCalendarAlt,
  FaUserMd,
  FaHeartbeat,
  FaShieldAlt,
  FaUsers,
  FaQuoteLeft,
  FaSeedling,
  FaFlagCheckered,
} from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';

/**
 * Reveal
 * Lightweight scroll-triggered reveal wrapper. Adds the `visible` class
 * (already wired to a transition in index.css via `.reveal-up.visible`)
 * once the element crosses into the viewport, then stops observing.
 */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-up ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

function AboutSection() {
  const { t } = useI18n();

  // Built inside the component so translations follow the active locale.
  const coreValues = [
    { icon: FaHeartbeat, key: 'compassion' },
    { icon: FaShieldAlt, key: 'excellence' },
    { icon: FaUsers, key: 'community' },
    { icon: FaGraduationCap, key: 'growth' },
  ];
  const journey = [
    { icon: FaSeedling, key: 's1' },
    { icon: FaHospital, key: 's2' },
    { icon: FaFlagCheckered, key: 's3' },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <Reveal>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-[#3B6B66] to-[#1E6B43] rounded-3xl p-8 md:p-12 text-white overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <FaHospital className="text-4xl shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm opacity-80">{t('about.fact.established')}</p>
                      <p className="text-2xl font-bold">{t('about.fact.establishedValue')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUserMd className="text-4xl shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm opacity-80">{t('about.fact.founder')}</p>
                      <p className="text-2xl font-bold">{t('about.fact.founderValue')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaGlobeAfrica className="text-4xl shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm opacity-80">{t('about.fact.location')}</p>
                      <p className="text-xl font-bold">{t('about.fact.locationValue')}</p>
                    </div>
                  </div>
                </div>

                {/* Founder quote */}
                <div className="relative z-10 mt-8 pt-6 border-t border-white/15">
                  <FaQuoteLeft className="text-2xl text-white/40 mb-3" aria-hidden="true" />
                  <p className="text-white/90 leading-relaxed italic">
                    {t('about.quote')}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white/70">
                    {t('about.quoteCite')}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full float-blob" aria-hidden="true"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full" aria-hidden="true"></div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1E6B43]/10 rounded-xl flex items-center justify-center text-[#1E6B43] shrink-0">
                    <FaGraduationCap className="text-2xl" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('about.fact.vision')}</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{t('about.fact.visionValue')}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right - Content */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#3B6B66]/10 text-[#3B6B66] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <FaHands aria-hidden="true" />
                <span>{t('about.badge')}</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
                {t('about.headline.line1')}
                <br />
                <span className="gradient-text">{t('about.headline.accent')}</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t('about.p1')}</p>
                <p>
                  {t('about.p2').split(/Sylvie Mpongera/).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <strong className="text-[#0F172A]">Sylvie Mpongera</strong>
                      )}
                    </React.Fragment>
                  ))}
                </p>
                <p>{t('about.p3')}</p>
              </div>
            </Reveal>

            {/* Core Values */}
            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {coreValues.map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#3B6B66]/10 flex items-center justify-center text-[#3B6B66] shrink-0">
                      <Icon className="text-sm" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm leading-none mb-1">
                        {t(`about.values.${key}`)}
                      </p>
                      <p className="text-xs text-gray-500 leading-snug">
                        {t(`about.values.${key}.text`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Vision & Mission */}
            <Reveal delay={260}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-[#F8FAFC] p-6 rounded-xl border border-gray-100 card-hover">
                  <div className="w-10 h-10 bg-[#3B6B66]/10 rounded-lg flex items-center justify-center text-[#3B6B66] mb-3">
                    <FaCalendarAlt aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-1">{t('about.vision')}</h3>
                  <p className="text-sm text-gray-500">{t('about.vision.text')}</p>
                </div>
                <div className="bg-[#F8FAFC] p-6 rounded-xl border border-gray-100 card-hover">
                  <div className="w-10 h-10 bg-[#E06D20]/10 rounded-lg flex items-center justify-center text-[#E06D20] mb-3">
                    <FaHands aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-1">{t('about.mission')}</h3>
                  <p className="text-sm text-gray-500">{t('about.mission.text')}</p>
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#3B6B66] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2d5450] transition"
                >
                  {t('about.cta.explore')}
                </button>
                <a
                  href="#contact"
                  className="border-2 border-[#3B6B66] text-[#3B6B66] px-6 py-3 rounded-xl font-semibold hover:bg-[#3B6B66] hover:text-white transition"
                >
                  {t('about.cta.learn')}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3">
                {t('about.journey.title')}
              </h3>
              <p className="text-gray-500">{t('about.journey.subtitle')}</p>
            </div>
          </Reveal>

          <div className="relative grid p-5 md:grid-cols-3 gap-8">
            {/* Connecting line, desktop only */}
            <div
              className="hidden md:block absolute top-7 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-[#3B6B66] via-[#1E6B43] to-[#E06D20]"
              aria-hidden="true"
            ></div>

            {journey.map(({ icon: Icon, key }, i) => (
              <Reveal key={key} delay={i * 140}>
                <div className="relative bg-white text-center md:text-left">
                  <div className="relative z-10 w-14 h-14 mx-auto md:mx-0 rounded-2xl bg-[#3B6B66] text-white flex items-center justify-center shadow-soft mb-5">
                    <Icon className="text-xl" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold tracking-wide uppercase text-[#E06D20] mb-1">
                    {t(`about.journey.${key}.label`)}
                  </p>
                  <h4 className="font-bold text-[#0F172A] mb-2">
                    {t(`about.journey.${key}.title`)}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t(`about.journey.${key}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
