// frontend/src/components/Hero.jsx - PRUNED VERSION
import React, { useEffect, useRef, useState } from 'react';
import { FaCalendarPlus, FaPhone, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import heroReal from '../assets/hero-real.jpg';
import { useI18n } from '../i18n/I18nProvider';

function Hero({ onBookingClick }) {
    const { t } = useI18n();
    const photoRef = useRef(null);

    // Simple parallax
    useEffect(() => {
        const onScroll = () => {
            if (!photoRef.current) return;
            const y = Math.min(window.scrollY * 0.15, 80);
            photoRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section id="top" className="relative isolate bg-dark-slate overflow-hidden">
            <div className="grid lg:grid-cols-12 min-h-[100svh] lg:min-h-[620px] relative">

                {/* ===== LEFT PANEL ===== */}
                <div className="relative lg:col-span-7 overflow-hidden">
                    {/* Photo */}
                    <div
                        ref={photoRef}
                        className="absolute inset-0 -z-10 will-change-transform"
                    >
                        <img
                            src={heroReal}
                            alt="Sangwa Polyclinic"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-dark-slate/85" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/90 via-dark-slate/30 to-dark-slate/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-slate/90 via-dark-slate/40 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 text-white">
                        {/* ONE badge only */}
                        <div className="reveal-up-on-load">
                            <span className="inline-flex items-center gap-2 glass border-white/25 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
                                <FaShieldAlt className="text-med-orange" />
                                {t('hero.badge')}
                            </span>
                        </div>

                        {/* Headline + CTAs */}
                        <div className="mt-auto max-w-2xl">
                            {/* SHORTER HEADLINE */}
                            <h1 className="reveal-up-on-load delay-100 text-3xl my-5 sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.02] tracking-[-0.02em]">
                                {t('hero.headline.line1')}
                                <br />
                                {t('hero.headline.line2')}
                                <br />
                                <span className="text-[#3B6B66]">{t('hero.headline.accent')}</span>
                            </h1>

                            {/* ONE SENTENCE subtext */}
                            <p className="reveal-up-on-load delay-200 mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
                                {t('hero.subtext')}
                            </p>

                            {/* CTAs - Clear hierarchy */}
                            <div className="reveal-up-on-load delay-300 mt-8 flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={onBookingClick}
                                    className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-med-orange to-[#c95f1a] hover:shadow-2xl hover:shadow-orange-900/40 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 text-base shadow-lg shadow-orange-900/30"
                                >
                                    <FaCalendarPlus />
                                    {t('hero.cta.book')}
                                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                </button>

                                <a
                                    href="tel:+250793929136"
                                    className="inline-flex items-center justify-center gap-3 glass-light text-white/90 hover:bg-white/20 px-7 py-4 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 border border-white/20"
                                >
                                    <FaPhone className="text-med-orange" />
                                    {t('hero.cta.emergency')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== VISUAL BRIDGE ===== */}
                <div className="absolute inset-0 pointer-events-none z-20">
                    <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2">
                        <div className="h-full w-full bg-gradient-to-b from-transparent via-med-orange/30 to-transparent" />
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#E06D20]/5 rounded-full blur-3xl" />
                </div>

                {/* ===== RIGHT PANEL ===== */}
                <aside className="relative lg:col-span-5 bg-teal-sage text-white overflow-hidden">
                    {/* Subtle texture */}
                    <div
                        className="absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
                            backgroundSize: '28px 28px',
                        }}
                    />

                    <div className="relative h-full flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-14">
                        {/* Label */}
                        <div className="reveal-up-on-load delay-200">
                            <p className="text-med-orange font-bold uppercase tracking-[0.25em] text-xs md:text-sm">
                                {t('hero.right.label')}
                            </p>
                            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold leading-tight">
                                {t('hero.right.headline.line1')}
                                <br />
                                {t('hero.right.headline.line2')}
                            </h2>
                        </div>

                        {/* Stats - Smaller, cleaner */}
                        <div className="reveal-up-on-load delay-300 mt-8 grid grid-cols-3 gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 text-center">
                                <p className="text-2xl md:text-3xl font-extrabold">500+</p>
                                <p className="text-[10px] uppercase tracking-widest text-white/75 mt-1">
                                    {t('hero.stat.patients')}
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 text-center">
                                <p className="text-2xl md:text-3xl font-extrabold">98%</p>
                                <p className="text-[10px] uppercase tracking-widest text-white/75 mt-1">
                                    {t('hero.stat.satisfaction')}
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15 text-center">
                                <p className="text-2xl md:text-3xl font-extrabold">24/7</p>
                                <p className="text-[10px] uppercase tracking-widest text-white/75 mt-1">
                                    {t('hero.stat.emergency')}
                                </p>
                            </div>
                        </div>

                        {/* Phone CTA - Clean and integrated */}
                        <a
                            href="tel:+250793929136"
                            className="reveal-up-on-load delay-500 mt-8 inline-flex items-center justify-between gap-4 bg-med-orange hover:bg-[#c95f1a] transition rounded-2xl px-5 py-4 group shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40"
                        >
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.25em] text-white/80">
                                    {t('hero.callCta.eyebrow')}
                                </p>
                                <p className="text-lg font-extrabold">{t('hero.callCta.number')}</p>
                            </div>
                            <FaPhone className="text-xl group-hover:rotate-12 transition-transform" />
                        </a>
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default Hero;