import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Activity, Heart, Users, Stethoscope, ShieldCheck } from 'lucide-react';
import aboutUsBg from '../assets/About us .jpg';
import aboutServicesCollage from '../assets/about_services_collage.png';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-24 bg-white min-h-screen"
    >
      {/* ── HERO SECTION ── */}
      <section 
        className="relative min-h-[50vh] flex items-center py-20 mb-16 text-white text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${aboutUsBg})`,
          backgroundPosition: 'center 35%'
        }}
      >
        {/* Light & Clean White Screen Overlay to support dark blue typography */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <h1 
              className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6 uppercase"
              style={{ 
                color: '#08709d',
                textShadow: '0 2px 8px rgba(8,112,157,0.12)',
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              About Us
            </h1>
            <p 
              className="text-sm md:text-lg leading-relaxed mb-8 max-w-3xl font-medium"
              style={{ 
                color: '#08709d',
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              We are committed to delivering premium DHA-licensed medical services, advanced physical therapy, and skilled nursing care directly to your doorstep in Dubai, ensuring clinical excellence, comfort, and safety.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm font-semibold">
              <div 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: '#08709d',
                  backgroundColor: 'rgba(8, 112, 157, 0.08)',
                  border: '1.5px solid rgba(8, 112, 157, 0.3)',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '700',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  fontFamily: "'Montserrat', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 112, 157, 0.16)';
                  e.currentTarget.style.borderColor = 'rgba(8, 112, 157, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 112, 157, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(8, 112, 157, 0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Award size={18} style={{ color: '#08709d' }} />
                <span>100% DHA Licensed</span>
              </div>
              <div 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: '#08709d',
                  backgroundColor: 'rgba(8, 112, 157, 0.08)',
                  border: '1.5px solid rgba(8, 112, 157, 0.3)',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '700',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  fontFamily: "'Montserrat', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 112, 157, 0.16)';
                  e.currentTarget.style.borderColor = 'rgba(8, 112, 157, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 112, 157, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(8, 112, 157, 0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Clock size={18} style={{ color: '#08709d' }} />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CUSTOM DESIGN ABOUT DETAILS SECTION ── */}
      <section className="py-24 bg-gradient-to-b from-white to-[#f7fbfd] overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Visual Stack & Collage Image */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] md:min-h-[440px]">
              {/* Decorative radial blur background */}
              <div className="absolute w-80 h-80 bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute w-64 h-64 bg-[#5eb63b]/3 rounded-full blur-[80px] pointer-events-none" />
              
              {/* EKG ambient lines */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #08709d 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

              {/* Main Image Graphic Container */}
              <div className="relative w-full max-w-[380px] transition-all duration-500 hover:scale-[1.02]">
                
                {/* Slanted collage image with styling */}
                <div className="overflow-hidden rounded-[32px] border-4 border-white shadow-[0_20px_50px_rgba(8,112,157,0.15)] bg-white">
                  <img 
                    src={aboutServicesCollage} 
                    alt="CORx Healthcare Services Collage" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                {/* Overlapping Floating Badge 1: DHA Licensed */}
                <motion.div 
                  initial={{ x: -20, y: -20 }}
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-2.5 w-44"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#5eb63b]/10 flex items-center justify-center text-[#5eb63b] shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-[#1a294a] leading-none uppercase">DHA Certified</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-1">Licensed Clinicians</p>
                  </div>
                </motion.div>

                {/* Overlapping Floating Badge 2: 24/7 Available */}
                <motion.div 
                  initial={{ x: 20, y: 20 }}
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                  className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-2.5 w-44"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#08709d]/10 flex items-center justify-center text-[#08709d] shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-[#1a294a] leading-none uppercase">24/7 Response</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-1">Doctor On Call</p>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Right Column: Custom Text & Columns Layout */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Section Tag */}
              <div className="inline-flex bg-[#08709d]/10 border border-[#08709d]/20 text-[#08709d] text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider select-none font-['Montserrat']">
                ⊙ Clinical Excellence
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-[36px] font-black text-[#1a294a] tracking-tight leading-tight uppercase font-['Montserrat']">
                Compassionate Care <span className="text-[#08709d]">Where You Need It Most</span>
              </h2>

              {/* Styled Paragraph Block */}
              <div className="space-y-4">
                <p className="text-base md:text-lg text-[#08709d] font-bold leading-relaxed font-['Montserrat']">
                  CORx Healthcare offers unparalleled home healthcare services, including top-tier physiotherapy, home nursing, compassionate caregivers, and round-the-clock doctor-on-call assistance.
                </p>
                <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
                  At CORx Healthcare, we recognize the significance of receiving premium medical care within the sanctuary of your own home. Our steadfast team of experts is devoted to delivering unparalleled homecare services, placing your well-being at the forefront, and fostering your autonomy.
                </p>
              </div>

              {/* Core Offerings Highlight Grid (2x2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                
                {/* 1. Physiotherapy */}
                <div className="p-4 bg-white border border-gray-100 rounded-2xl flex gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:border-[#08709d]/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1a294a] text-sm font-bold uppercase tracking-wide">Physiotherapy</h4>
                    <p className="text-[12px] text-gray-400 font-medium mt-1 leading-snug">Expert in-home rehabilitation for joint, post-surgical, & pain conditions.</p>
                  </div>
                </div>

                {/* 2. Home Nursing */}
                <div className="p-4 bg-white border border-gray-100 rounded-2xl flex gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:border-[#08709d]/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1a294a] text-sm font-bold uppercase tracking-wide">Home Nursing</h4>
                    <p className="text-[12px] text-gray-400 font-medium mt-1 leading-snug">DHA-licensed clinical care, injection administration, & vitals monitoring.</p>
                  </div>
                </div>

                {/* 3. Caregivers */}
                <div className="p-4 bg-white border border-gray-100 rounded-2xl flex gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:border-[#08709d]/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1a294a] text-sm font-bold uppercase tracking-wide">Caregivers</h4>
                    <p className="text-[12px] text-gray-400 font-medium mt-1 leading-snug">Compassionate daily assistance & companionships for seniors.</p>
                  </div>
                </div>

                {/* 4. Doctor on Call */}
                <div className="p-4 bg-white border border-gray-100 rounded-2xl flex gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:border-[#08709d]/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1a294a] text-sm font-bold uppercase tracking-wide">Doctor On Call</h4>
                    <p className="text-[12px] text-gray-400 font-medium mt-1 leading-snug">24/7 licensed medical diagnostics & physical consultations at home.</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
