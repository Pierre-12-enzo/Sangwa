// frontend/src/components/Testimonials.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Keyboard, Pagination, Autoplay, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/parallax';
import 'swiper/css/pagination';
import {
  FaStar,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHeartbeat,
  FaCalendarAlt,
  FaCheck,
} from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';

const TESTIMONIALS = [
  {
    name: 'Mama Grace',
    location: 'Huye',
    service: 'Maternity',
    serviceColor: '#3B6B66',
    text: 'I delivered my baby at Sangwa and the care was exceptional. The staff made me feel safe and comfortable throughout. I am so grateful to have this facility in our community.',
    rating: 5,
    visit: 'Dec 2023',
    initial: 'G',
    bpm: 72,
    mood: 'Grateful',
  },
  {
    name: 'Jean-Pierre',
    location: 'Ngoma',
    service: 'Internal Medicine',
    serviceColor: '#1E6B43',
    text: 'After years of traveling to Kigali for check-ups, I finally found a clinic that understands my needs. The doctors are thorough and the environment is welcoming.',
    rating: 5,
    visit: 'Jan 2024',
    initial: 'J',
    bpm: 68,
    mood: 'Relieved',
  },
  {
    name: 'Alice Mukamana',
    location: 'Butare',
    service: 'Pediatrics',
    serviceColor: '#E06D20',
    text: 'My children love coming here! The pediatric team is wonderful and always takes time to explain everything. I feel confident bringing my kids here.',
    rating: 5,
    visit: 'Feb 2024',
    initial: 'A',
    bpm: 80,
    mood: 'Happy',
  },
  {
    name: 'Dr. Kamanzi',
    location: 'CHUB',
    service: 'Partner Clinician',
    serviceColor: '#3B6B66',
    text: 'As a healthcare professional, I appreciate the quality and dedication at Sangwa. They are setting a new standard for private healthcare in the Southern Province.',
    rating: 5,
    visit: 'Mar 2024',
    initial: 'K',
    bpm: 70,
    mood: 'Impressed',
  },
];

const ECG_PATH =
  'M0 28 L150 28 Q162 12 174 28 L210 28 L222 34 L236 6 L252 50 L266 28 L302 28 Q320 8 338 28 L520 28 Q532 12 544 28 L580 28 L592 34 L606 6 L622 50 L636 28 L672 28 Q690 8 708 28 L1000 28';

function Testimonials() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const barRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    requestAnimationFrame(() => {
      barRef.current =
        swiper.el?.querySelector('.swiper-slide-active .autoplay-bar') || null;
      if (barRef.current) barRef.current.style.transform = 'scaleX(0)';
    });
  };

  const onAutoplayTimeLeft = (_swiper, _timeLeft, percentage) => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${1 - percentage})`;
    }
  };

  const goTo = (idx) => swiperRef.current?.slideTo(idx);
  const next = () => swiperRef.current?.slideNext();
  const prev = () => swiperRef.current?.slidePrev();

  // Helper function to safely get translation strings
  const getTranslation = (key, fallback = '') => {
    if (!t) return fallback;
    // Handle nested keys like 'test.badge'
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback;
      }
    }
    return value || fallback;
  };

  if (!isClient) return null;

  // Default translations if not available
  const translations = {
    badge: getTranslation('test.badge', 'Patient Stories'),
    headlineLine1: getTranslation('test.headline.line1', 'What Our'),
    headlineAccent: getTranslation('test.headline.accent', 'Patients'),
    headlineLine2: getTranslation('test.headline.line2', 'Say'),
    subtext: getTranslation('test.subtext', 'Real experiences from our community'),
    verified: getTranslation('test.verified', 'Verified'),
    rosterTitle: getTranslation('test.rosterTitle', 'Patient Roster'),
    patientIndex: getTranslation('generic.patientIndex', 'Patient'),
    reviewLabel: getTranslation('generic.reviewLabel', 'from reviews'),
  };

  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-[#F8FAFC]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 ecg-paper pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 rounded-full bg-[#3B6B66]/10 blur-3xl float-blob pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -bottom-32 -right-20 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 rounded-full bg-[#E06D20]/10 blur-3xl float-blob pointer-events-none"
        style={{ animationDelay: '-4s' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ===== Section Header ===== */}
        <div className="text-center mb-10 md:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#1E6B43]/10 text-[#1E6B43] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            <FaStar className="text-xs md:text-sm" />
            <span>{translations.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-3 md:mb-4">
            {translations.headlineLine1}{' '}
            <span className="gradient-text">{translations.headlineAccent}</span>{' '}
            {translations.headlineLine2}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            {translations.subtext}
          </p>
          <svg
            className="mx-auto mt-4 md:mt-5 lg:mt-6 w-32 md:w-40 lg:w-44 h-4 md:h-5 lg:h-6"
            viewBox="0 0 176 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 12 H52 Q58 4 64 12 H78 L82 16 L88 2 L94 20 L98 12 H112 Q118 4 124 12 H176"
              pathLength="100"
              className="ecg-divider"
              stroke="#E06D20"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ===== Main Grid - Fixed overflow issues ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-6 md:gap-8 lg:gap-10 items-start">
          {/* ===== Card Deck - Added overflow-hidden to contain cards ===== */}
          <div className="order-2 lg:order-1 min-w-0 overflow-hidden">
            <div className="relative testimonials-deck">
              <Swiper
                modules={[EffectCreative, Keyboard, Pagination, Autoplay, Parallax]}
                effect="creative"
                creativeEffect={{
                  limitProgress: 1,
                  prev: {
                    shadow: false,
                    translate: ['-15%', '0%', -80],
                    rotate: [0, 0, -4],
                    opacity: 0.3,
                  },
                  next: {
                    shadow: false,
                    translate: ['15%', '0%', -80],
                    rotate: [0, 0, 4],
                    opacity: 0.3,
                  },
                }}
                parallax={true}
                watchSlidesProgress
                speed={700}
                grabCursor
                keyboard={{ enabled: true }}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  el: '.testimonials-pagination',
                  bulletClass: 'testimonials-bullet',
                  bulletActiveClass: 'testimonials-bullet--active',
                }}
                onSwiper={(s) => {
                  swiperRef.current = s;
                  requestAnimationFrame(() => {
                    barRef.current =
                      s.el?.querySelector('.swiper-slide-active .autoplay-bar') || null;
                  });
                }}
                onSlideChange={handleSlideChange}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="testimonials-swiper px-6 sm:px-8 md:px-10"
              >
                {TESTIMONIALS.map((testimonial, i) => (
                  <SwiperSlide key={i} className="!h-auto">
                    <article className="testimonial-card w-full max-w-full mx-auto">
                      {/* ECG Strip */}
                      <div className="ecg-strip" aria-hidden="true">
                        <svg
                          viewBox="0 0 1000 56"
                          preserveAspectRatio="none"
                          className="absolute inset-0 w-full h-full"
                        >
                          <defs>
                            <linearGradient id={`ecg-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#3B6B66" />
                              <stop offset="55%" stopColor="#E06D20" />
                              <stop offset="100%" stopColor="#1E6B43" />
                            </linearGradient>
                          </defs>
                          <path
                            d={ECG_PATH}
                            className="ecg-base"
                            fill="none"
                            stroke="#3B6B66"
                            strokeWidth="2"
                          />
                          {i === activeIndex && (
                            <path
                              key={activeIndex}
                              d={ECG_PATH}
                              pathLength="100"
                              className="ecg-trace"
                              fill="none"
                              stroke={`url(#ecg-grad-${i})`}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
                        </svg>
                      </div>

                      {/* Ghost Quote */}
                      <span className="ghost-quote hidden sm:block" aria-hidden="true">“</span>

                      {/* Card Body */}
                      <div className="relative z-10 flex flex-col grow p-5 sm:p-6 md:p-7 lg:p-8">

                        {/* Header */}
                        <div
                          className="flex items-center justify-between gap-3 mb-4 md:mb-5"
                          data-swiper-parallax="-30"
                        >
                          <span className="text-[10px] md:text-[11px] font-extrabold tracking-[0.25em] text-[#0F172A]/35 uppercase">
                            {translations.patientIndex} · {String(i + 1).padStart(2, '0')}/
                            {String(TESTIMONIALS.length).padStart(2, '0')}
                          </span>
                          <span
                            className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-white shrink-0"
                            style={{ backgroundColor: testimonial.serviceColor }}
                          >
                            {testimonial.service}
                          </span>
                        </div>

                        {/* Quote */}
                        <blockquote
                          className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-[#0F172A] font-medium mb-3 md:mb-4"
                          data-swiper-parallax="-50"
                        >
                          “{testimonial.text}”
                        </blockquote>

                        {/* Vitals */}
                        <div
                          className="flex items-center flex-wrap gap-2 md:gap-3 mb-4 md:mb-5"
                          data-swiper-parallax="-40"
                        >
                          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/70 rounded-full px-2.5 md:px-3 py-1 md:py-1.5">
                            {[...Array(testimonial.rating)].map((_, j) => (
                              <FaStar key={j} className="text-amber-400 text-[10px] md:text-xs" />
                            ))}
                            <span className="text-[10px] md:text-xs font-extrabold text-amber-600 ml-0.5 md:ml-1">
                              {testimonial.rating}.0
                            </span>
                          </span>
                          <span className="vitals-chip">
                            <FaHeartbeat className="bpm-heart text-[#E06D20] text-[10px] md:text-xs" />
                            <span className="text-[10px] md:text-xs">{testimonial.bpm} BPM · {testimonial.mood}</span>
                          </span>
                          <span className="vitals-chip">
                            <FaCalendarAlt className="text-[#3B6B66] text-[10px] md:text-xs" />
                            <span className="text-[10px] md:text-xs">{testimonial.visit}</span>
                          </span>
                        </div>

                        {/* Author */}
                        <footer
                          className="mt-auto flex items-center justify-between gap-3 pt-4 md:pt-5 border-t border-dashed border-[#3B6B66]/20"
                          data-swiper-parallax="-20"
                        >
                          <div className="flex items-center gap-3 md:gap-4 min-w-0">
                            <div className="relative flex-shrink-0">
                              <div
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-base md:text-lg lg:text-xl font-extrabold"
                                style={{
                                  background: `linear-gradient(135deg, ${testimonial.serviceColor} 0%, #0F172A 100%)`,
                                }}
                                aria-hidden="true"
                              >
                                {testimonial.initial}
                              </div>
                              <span className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#1E6B43] ring-2 ring-white flex items-center justify-center">
                                <FaCheck className="text-white text-[7px] md:text-[9px]" />
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-[#0F172A] text-sm sm:text-base md:text-lg leading-tight truncate">
                                {testimonial.name}
                              </p>
                              <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 md:gap-1.5">
                                <FaMapMarkerAlt className="text-[#E06D20] text-[10px] md:text-xs flex-shrink-0" />
                                <span className="truncate">{testimonial.location}</span>
                              </p>
                            </div>
                          </div>
                          <span className="hidden sm:inline-flex text-[10px] font-bold tracking-[0.2em] uppercase text-[#0F172A]/30 flex-shrink-0">
                            {translations.verified}
                          </span>
                        </footer>
                      </div>

                      {/* Autoplay Progress */}
                      <div className="autoplay-track" aria-hidden="true">
                        <div
                          className="autoplay-bar"
                          style={{
                            background: `linear-gradient(90deg, ${testimonial.serviceColor} 0%, #E06D20 100%)`,
                          }}
                        />
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="testimonials-arrow testimonials-arrow--left"
              >
                <FaChevronLeft className="text-sm md:text-base" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="testimonials-arrow testimonials-arrow--right"
              >
                <FaChevronRight className="text-sm md:text-base" />
              </button>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-5 mt-4 md:mt-5 lg:mt-6">
              <div className="testimonials-pagination flex gap-1.5 md:gap-2" />
              <span className="text-[10px] md:text-xs font-bold text-[#0F172A]/40 tracking-[0.25em]">
                <span key={activeIndex} className="index-pop text-[#3B6B66]">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                {' / '}
                {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* ===== Patient Rail ===== */}
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/50 mb-3 md:mb-4">
                <FaHeartbeat className="bpm-heart text-[#E06D20] text-xs md:text-sm" />
                {translations.rosterTitle}
              </p>
              <ul className="space-y-1.5 md:space-y-2 testimonials-rail">
                {TESTIMONIALS.map((t, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => goTo(i)}
                        aria-current={isActive ? 'true' : 'false'}
                        className={`testimonials-rail__item w-full text-left ${isActive ? 'is-active' : ''}`}
                      >
                        <span
                          className="testimonials-rail__avatar flex-shrink-0"
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${t.serviceColor} 0%, #0F172A 100%)`
                              : '#e2e8f0',
                            color: isActive ? 'white' : '#475569',
                          }}
                        >
                          {t.initial}
                        </span>
                        <span className="grow text-left min-w-0">
                          <span className="block font-semibold text-[#0F172A] text-xs sm:text-sm leading-tight truncate">
                            {t.name}
                          </span>
                          <span className="block text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                            {t.service}
                          </span>
                        </span>
                        <span
                          className="testimonials-rail__bar flex-shrink-0"
                          style={isActive ? { backgroundColor: t.serviceColor } : undefined}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Trust Line */}
              <div className="mt-4 md:mt-5 lg:mt-6 pt-4 md:pt-5 lg:pt-6 border-t border-gray-200 flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                <div className="flex -space-x-2">
                  {TESTIMONIALS.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full ring-2 ring-white flex items-center justify-center text-white text-[8px] sm:text-[10px] md:text-xs font-bold"
                      style={{ background: t.serviceColor }}
                    >
                      {t.initial}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-[10px] sm:text-xs">
                  <strong className="text-[#0F172A]">4.9★</strong> {translations.reviewLabel}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;