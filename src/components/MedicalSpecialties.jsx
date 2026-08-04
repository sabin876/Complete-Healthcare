import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

const specialties = [
  {
    title: "ENT Department",
    desc: "Our ENT department provides comprehensive care for ear, nose, and throat conditions. We treat hearing los...",
    image: img1,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a2 2 0 1 1-4 0c0-4-3-4-3-10z" />
        <path d="M12 8.5a2.5 2.5 0 1 1 5 0" />
        <path d="M16 6a6 6 0 0 1 0 5" />
      </svg>
    ),
    link: "/book-an-appointment"
  },
  {
    title: "Gynaecology Department",
    desc: "Our gynaecology department offers complete women's health services including prenatal care, family plannin...",
    image: img2,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M12 13v8M9 17h6" />
      </svg>
    ),
    link: "/book-an-appointment"
  },
  {
    title: "Internal Medicine",
    desc: "Our internal medicine specialists provide primary care and manage chronic diseases such as diabetes,...",
    image: img3,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    link: "/book-an-appointment"
  },
  {
    title: "Neurology Department",
    desc: "Our neurology department diagnoses and treats disorders of the nervous system including headaches, epilepsy,...",
    image: img4,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    ),
    link: "/book-an-appointment"
  }
];

export default function MedicalSpecialties() {
  return (
    <section className="py-20 bg-gray-50/50 relative overflow-hidden" id="specialties">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#08709d]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5eb63b]/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a294a] tracking-tight uppercase font-poppins mb-3">
            Medical Specialties
          </h2>
          <p className="text-gray-500 text-[15px] md:text-[16px] font-medium font-sans mb-5">
            Expert care across multiple medical disciplines
          </p>
          {/* Custom Dual-Color Line Divider */}
          <div className="flex w-24 h-1.5 rounded-full overflow-hidden">
            <div className="w-1/2 bg-[#08709d]" />
            <div className="w-1/2 bg-[#5eb63b]" />
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(8,112,157,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Image Area */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-108"
                />
              </div>

              {/* Card Body Content */}
              <div className="p-6 flex flex-col flex-grow text-left">
                {/* Title and Icon Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#08709d]/8 text-[#08709d] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-[17px] font-bold text-[#1a294a] leading-tight font-poppins">
                    {item.title}
                  </h3>
                </div>

                {/* Description snippet */}
                <p className="text-gray-500 text-[14px] leading-relaxed font-sans mb-6 flex-grow">
                  {item.desc}
                </p>

                {/* Link footer */}
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-[#08709d] hover:text-[#065679] font-bold text-[14px] transition-colors font-poppins uppercase tracking-wide group"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>View Details</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
