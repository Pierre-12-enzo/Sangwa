// frontend/src/components/VirtualTour.jsx
import React from 'react';
import { FaClock, FaMapMarkerAlt, FaVideo, FaHospital, FaBaby, FaStethoscope, FaPills } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';

function VirtualTour() {
    const { t } = useI18n();

    const areas = [
        { key: 'reception', icon: <FaHospital className="text-2xl" /> },
        { key: 'maternity', icon: <FaBaby className="text-2xl" /> },
        { key: 'consultation', icon: <FaStethoscope className="text-2xl" /> },
        { key: 'pharmacy', icon: <FaPills className="text-2xl" /> },
    ];

    return (
        <section className="py-16 md:py-24 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-[#3B6B66]/10 text-[#3B6B66] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <FaVideo className="text-sm" />
                        <span>{t('virtualTour.badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
                        {t('virtualTour.title')}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        {t('virtualTour.subtitle')}
                    </p>
                </div>

                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#3B6B66]/10 to-[#1E6B43]/10 border border-[#3B6B66]/20">
                    <div className="aspect-video flex flex-col items-center justify-center p-8 md:p-12">
                        {/* 360° Circle */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#3B6B66]/20 flex items-center justify-center mb-6">
                            <span className="text-5xl md:text-6xl font-black text-[#3B6B66] tracking-tight">
                                360°
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-2">
                            {t('virtualTour.comingSoon')}
                        </h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                            {t('virtualTour.description')}
                        </p>

                        {/* Preview cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mt-4">
                            {areas.map((area) => (
                                <div
                                    key={area.key}
                                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 hover:border-[#3B6B66]/30 transition"
                                >
                                    <div className="text-[#3B6B66] mb-1 flex justify-center">
                                        {area.icon}
                                    </div>
                                    <p className="text-xs font-semibold text-[#0F172A]">
                                        {t(`virtualTour.areas.${area.key}`)}
                                    </p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <FaClock className="text-[10px] text-[#E06D20]" />
                                        <span className="text-[10px] text-gray-400">
                                            {t('virtualTour.areaLabel')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Location hint */}
                        <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                            <FaMapMarkerAlt className="text-[#3B6B66]" />
                            <span>{t('virtualTour.locationHint')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default VirtualTour;