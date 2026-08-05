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

function ServicesGrid() {
  const services = [
    {
      icon: <FaBaby className="text-3xl" />,
      title: 'Obstetrics & Maternity',
      description: 'Specialized delivery suites, prenatal, and postnatal care designed for mother and child comfort.',
      features: ['Private delivery rooms', 'Family accommodation', '24/7 midwife support']
    },
    {
      icon: <FaStethoscope className="text-3xl" />,
      title: 'Internal Medicine',
      description: 'Expert diagnosis and ongoing management of adult conditions with comprehensive care plans.',
      features: ['Chronic disease management', 'Preventive care', 'Health screenings']
    },
    {
      icon: <FaChild className="text-3xl" />,
      title: 'Pediatrics',
      description: 'Dedicated, compassionate healthcare for infants, children, and adolescents in a child-friendly environment.',
      features: ['Developmental screenings', 'Vaccinations', 'Growth monitoring']
    },
    {
      icon: <FaUtensils className="text-3xl" />,
      title: 'Inpatient Amenities',
      description: 'On-site patient dining, private storage lockers, and structured care environments for comfortable recovery.',
      features: ['Nutritious meals', 'Private lockers', 'Comfortable rooms']
    },
    {
      icon: <FaFlask className="text-3xl" />,
      title: 'Laboratory Services',
      description: 'On-site diagnostics with rapid results for accurate and timely treatment decisions.',
      features: ['Blood tests', 'Urinalysis', 'Microbiology']
    },
    {
      icon: <FaPills className="text-3xl" />,
      title: 'Pharmacy',
      description: 'Fully-stocked dispensary with prescribed medications and professional pharmaceutical care.',
      features: ['Prescription filling', 'Medication counseling', 'Health products']
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#3B6B66]/10 text-[#3B6B66] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaCheckCircle />
            <span>Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Comprehensive Care
            <br />
            <span className="gradient-text">Under One Roof</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From maternity to internal medicine, we provide specialized healthcare services 
            tailored to your family's needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-soft border border-gray-100 p-8 card-hover relative overflow-hidden"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B6B66]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition duration-500"></div>
              
              {/* Icon */}
              <div className="relative z-10 w-16 h-16 bg-[#3B6B66]/10 rounded-2xl flex items-center justify-center text-[#3B6B66] mb-6 group-hover:bg-[#3B6B66] group-hover:text-white transition duration-300">
                {service.icon}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#3B6B66] transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheckCircle className="text-[#1E6B43] text-xs flex-shrink-0" />
                      <span>{feature}</span>
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
                  Book this service →
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
              <p className="text-sm opacity-80">Patients Served</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">98%</p>
              <p className="text-sm opacity-80">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">15min</p>
              <p className="text-sm opacity-80">Avg. Wait Time</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">24/7</p>
              <p className="text-sm opacity-80">Emergency Care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;