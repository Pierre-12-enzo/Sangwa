// frontend/src/components/WhySangwa.jsx
import React from 'react';
import { 
  FaHeart, 
  FaUserMd, 
  FaClock, 
  FaShieldAlt, 
  FaLanguage, 
  FaMobileAlt,
  FaAmbulance,
  FaStar
} from 'react-icons/fa';

function WhySangwa() {
  const reasons = [
    {
      icon: <FaHeart className="text-2xl" />,
      title: 'Compassionate Care',
      description: 'Every patient receives personalized attention in a warm, supportive environment.'
    },
    {
      icon: <FaUserMd className="text-2xl" />,
      title: 'Expert Specialists',
      description: 'Our team brings years of experience in maternity, pediatrics, and internal medicine.'
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: 'Minimal Wait Times',
      description: 'Efficient scheduling ensures you spend less time waiting and more time healing.'
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: 'Trusted Quality',
      description: 'We maintain the highest standards of medical care and patient safety.'
    },
    {
      icon: <FaLanguage className="text-2xl" />,
      title: 'Multilingual Staff',
      description: 'We communicate in Kinyarwanda, French, and English for your comfort.'
    },
    {
      icon: <FaMobileAlt className="text-2xl" />,
      title: 'Modern Technology',
      description: 'Digital health records and online booking for seamless patient experience.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid p-5 md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E06D20]/10 text-[#E06D20] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FaStar />
              <span>Why Sangwa</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Why Choose
              <br />
              <span className="gradient-text">Sangwa Polyclinic</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We combine modern medicine with Rwandan hospitality to deliver healthcare 
              that truly cares for you and your family.
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl hover:bg-[#F8FAFC] transition group">
                  <div className="w-12 h-12 bg-[#3B6B66]/10 rounded-lg flex items-center justify-center text-[#3B6B66] group-hover:bg-[#3B6B66] group-hover:text-white transition flex-shrink-0">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-1">{reason.title}</h4>
                    <p className="text-sm text-gray-500">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#3B6B66] to-[#1E6B43] rounded-3xl p-8 text-white">
              <div className="grid grid-cols-2 gap-4">
                {/* Stats Cards */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-sm opacity-80">Emergency Care</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-sm opacity-80">Beds Available</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm opacity-80">Specialists</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold">4.9★</p>
                  <p className="text-sm opacity-80">Patient Rating</p>
                </div>
              </div>
              
              {/* Quote */}
              <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <FaAmbulance className="text-3xl mb-3 opacity-60" />
                <p className="text-lg italic">
                  "Quality healthcare shouldn't require a trip to Kigali. 
                  We bring world-class care to Huye."
                </p>
                <p className="text-sm opacity-70 mt-2">— Sangwa Polyclinic Team</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E06D20]/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#3B6B66]/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySangwa;