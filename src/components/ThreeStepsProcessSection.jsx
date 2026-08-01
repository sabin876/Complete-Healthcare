import React from 'react';
import { PhoneCall, Stethoscope, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: (
      <svg className="w-10 h-10 text-[#2596be]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        <path d="M14 2a6 6 0 0 1 6 6" />
        <path d="M14 6a2 2 0 0 1 2 2" />
      </svg>
    ),
    title: "1. Contact Us For Pre Booking",
    desc: "Call +97143320776 or WhatsApp Us at +971547033311 for doctor on call service."
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#2596be]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 0 0 4.5 2h-1a.3.3 0 0 0-.3.3V5c0 .6.4 1 1 1h.6" />
        <path d="M8 22v-3" />
        <path d="M16 22v-3" />
        <path d="M12 2a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
        <path d="M16 11a4 4 0 0 1-8 0" />
        <path d="M12 15v3" />
      </svg>
    ),
    title: "2. Doctors & Nurses Will Be At your Door Step",
    desc: "Doctors and nurses certified by DHA are dedicated to providing you with prompt home care in Dubai. Expect them at your doorstep within just 30 minutes."
  },
  {
    icon: (
      <svg className="w-10 h-10 text-[#2596be]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "3. You Will Get Comprehensive Care",
    desc: "Experience holistic care encompassing thorough diagnosis, personalized treatment, and expert medication management, all conveniently delivered in the comfort of your home."
  }
];

export default function ThreeStepsProcessSection() {
  return (
    <section className="py-16 md:py-20 bg-white font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Main Heading */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#2596be] tracking-tight mb-3 font-['Montserrat']">
          Book DHA Certified Doctors and Nurses Visit in Just 3 Simple Steps!
        </h2>

        {/* Sub Heading */}
        <h3 className="text-xl md:text-2xl font-semibold text-[#2596be] mb-6 font-['Montserrat']">
          Home healthcare services in Dubai
        </h3>

        {/* Paragraph */}
        <p className="text-slate-600 text-sm md:text-base max-w-4xl mx-auto leading-relaxed mb-12">
          We’re passionately devoted to your well-being. Our{' '}
          <a href="#" className="text-[#2596be] font-semibold underline hover:opacity-80">
            DHA Certified
          </a>{' '}
          medical team in UAE goes above and beyond, delivering tailored, all-encompassing medical care directly to you, wherever you are. Your health and recovery are our utmost concerns, and we bring both the expertise and equipment right to your doorstep for your utmost comfort and convenience.
        </p>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 md:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-start text-left group"
            >
              <div className="w-full">
                {/* Icon */}
                <div className="mb-6 text-[#2596be]">
                  {step.icon}
                </div>

                {/* Title */}
                <h4 className="text-lg md:text-xl font-bold text-[#2596be] mb-4 font-['Montserrat'] leading-snug">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  {step.desc}
                </p>
              </div>

              {/* Book Now Button */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2596be] hover:bg-[#1d7aa0] text-white font-bold text-sm rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
