// frontend/src/components/BookingModal.jsx
import React, { useState } from 'react';
import { FaTimes,FaClock, FaCalendarDay, FaUser, FaPhone, FaEnvelope, FaStethoscope, FaComment, FaCheckCircle } from 'react-icons/fa';
import { bookingAPI } from '../api/client';
import toast from 'react-hot-toast';

function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: '',
  });

  const services = [
    'Maternity',
    'Internal Medicine',
    'Pediatrics',
    'Gynecology',
    'Laboratory',
    'Pharmacy',
    'Dental',
    'Ophthalmology',
    'Orthopedics',
    'Dermatology',
  ];

  const timeSlots = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 UPDATED: Submit booking to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await bookingAPI.create(formData);

      if (response.data.success) {
        setBookingReference(response.data.data.booking.bookingReference);
        setStep(3);
        toast.success('✅ Appointment booked successfully!');

        // Reset form after delay
        setTimeout(() => {
          setFormData({
            patientName: '',
            phoneNumber: '',
            email: '',
            service: '',
            preferredDate: '',
            preferredTime: '',
            additionalNotes: '',
          });
          setStep(1);
          setIsSubmitting(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Booking Error:', error);
      toast.error(error.response?.data?.message || '❌ Failed to book appointment. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Reset when modal closes
  const handleClose = () => {
    setStep(1);
    setFormData({
      patientName: '',
      phoneNumber: '',
      email: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      additionalNotes: '',
    });
    setBookingReference('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Book Appointment</h2>
            <p className="text-sm text-gray-500">Step {step} of 3</p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition text-2xl">
            <FaTimes />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition ${s <= step ? 'bg-[#3B6B66]' : 'bg-gray-200'
                  }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {step === 1 && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaUser className="inline mr-2 text-[#3B6B66]" />
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                    placeholder="e.g. Marie Claire"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaPhone className="inline mr-2 text-[#3B6B66]" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                    placeholder="e.g. 0788XXXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaEnvelope className="inline mr-2 text-[#3B6B66]" />
                  Email (optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                  placeholder="e.g. patient@email.com"
                />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-[#3B6B66] text-white py-3 rounded-lg font-semibold hover:bg-[#2d5450] transition"
              >
                Next Step →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaStethoscope className="inline mr-2 text-[#3B6B66]" />
                  Select Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                >
                  <option value="">Choose a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarDay className="inline mr-2 text-[#3B6B66]" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaClock className="inline mr-2 text-[#3B6B66]" />
                    Preferred Time *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaComment className="inline mr-2 text-[#3B6B66]" />
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6B66] focus:border-transparent outline-none"
                  placeholder="Any special requests or symptoms to note..."
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#E06D20] text-white py-3 rounded-lg font-semibold hover:bg-[#c95f1a] transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Appointment'}
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#1E6B43]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-5xl text-[#1E6B43]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Appointment Confirmed!</h3>
              <p className="text-gray-600">
                We'll send a confirmation SMS to <strong>{formData.phoneNumber}</strong> shortly.
              </p>
              {bookingReference && (
                <p className="text-sm text-gray-500 mt-2">
                  Reference: <strong className="text-[#3B6B66]">{bookingReference}</strong>
                </p>
              )}
              <button
                onClick={handleClose}
                className="mt-6 bg-[#3B6B66] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2d5450] transition"
              >
                Done
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default BookingModal;