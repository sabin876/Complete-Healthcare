import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Clock, Activity, Heart, Users, Stethoscope, ShieldCheck, Phone, MessageSquare, 
  Eye, Target, Sparkles, CheckCircle2, ArrowRight, Compass, HeartPulse, Globe,
  Shield, Check, Star, Building2, HeartHandshake
} from 'lucide-react';
import aboutUsBg from '../assets/About us .jpg';
import aboutServicesCollage from '../assets/about_services_collage.png';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-20 bg-white min-h-screen text-slate-800 font-sans"
    >
      {/* ── HERO SECTION ── */}
      <section 
        className="relative min-h-[44vh] flex items-center py-16 mb-8 text-white text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${aboutUsBg})`,
          backgroundPosition: 'center 35%'
        }}
      >
        {/* Clean Glassmorphic White Screen Overlay */}
        <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px] z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 text-[#08709d] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 font-['Montserrat']">
              ✦ Dubai & UAE Home Healthcare
            </span>

            <h1 
              className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4 uppercase font-['Montserrat']"
              style={{ color: '#08709d' }}
            >
              About Us
            </h1>

            <p 
              className="text-base md:text-xl leading-relaxed mb-6 max-w-2xl font-bold font-['Montserrat']"
              style={{ color: '#08709d' }}
            >
              Delivering DHA-licensed medical services, advanced physical therapy, and skilled nursing care directly to your doorstep in Dubai.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm font-semibold">
              <div 
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-extrabold shadow-sm transition-all duration-300 hover:scale-105"
                style={{ 
                  color: '#08709d',
                  backgroundColor: 'rgba(8, 112, 157, 0.09)',
                  border: '1.5px solid rgba(8, 112, 157, 0.3)',
                  backdropFilter: 'blur(12px)',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                <Award size={18} style={{ color: '#08709d' }} />
                <span>100% DHA Licensed</span>
              </div>
              
              <div 
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-extrabold shadow-sm transition-all duration-300 hover:scale-105"
                style={{ 
                  color: '#08709d',
                  backgroundColor: 'rgba(8, 112, 157, 0.09)',
                  border: '1.5px solid rgba(8, 112, 157, 0.3)',
                  backdropFilter: 'blur(12px)',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                <Clock size={18} style={{ color: '#08709d' }} />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT DETAILS & 4 CORE SERVICES ── */}
      <section className="py-16 bg-white overflow-hidden border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Visual Stack & Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] md:min-h-[420px]">
              <div className="absolute w-72 h-72 bg-[#08709d]/8 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute w-60 h-60 bg-[#5eb63b]/6 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative w-full max-w-[360px] transition-all duration-500 hover:scale-[1.01]">
                <div className="overflow-hidden rounded-[28px] border-4 border-white shadow-[0_15px_45px_rgba(8,112,157,0.14)] bg-white">
                  <img 
                    src={aboutServicesCollage} 
                    alt="CORx Healthcare Services" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                {/* Overlapping Badge 1 */}
                <motion.div 
                  initial={{ x: -15, y: -15 }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-5 -left-5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-lg flex items-center gap-2.5 w-44"
                >
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#5eb63b]/15 flex items-center justify-center text-[#5eb63b] shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#1a294a] leading-none uppercase font-['Montserrat'] mb-0">DHA Certified</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-1 mb-0">Licensed Clinicians</p>
                  </div>
                </motion.div>

                {/* Overlapping Badge 2 */}
                <motion.div 
                  initial={{ x: 15, y: 15 }}
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-lg flex items-center gap-2.5 w-44"
                >
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#08709d]/15 flex items-center justify-center text-[#08709d] shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#1a294a] leading-none uppercase font-['Montserrat'] mb-0">24/7 Response</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-1 mb-0">Doctor On Call</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Narrative & Services Grid */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex bg-[#08709d]/10 border border-[#08709d]/20 text-[#08709d] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider font-['Montserrat']">
                ⊙ Clinical Excellence
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-[#1a294a] tracking-tight leading-tight uppercase font-['Montserrat'] mb-0">
                Compassionate Care <span className="text-[#08709d]">Where You Need It Most</span>
              </h2>

              <div className="space-y-3">
                <p className="text-base md:text-lg text-[#08709d] font-bold leading-relaxed font-['Montserrat'] mb-0">
                  CORx Healthcare offers unparalleled home healthcare services, including top-tier physiotherapy, home nursing, compassionate caregivers, and round-the-clock doctor-on-call assistance.
                </p>
                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-0">
                  At CORx Healthcare, we recognize the significance of receiving premium medical care within the sanctuary of your own home. Our steadfast team of experts is devoted to delivering unparalleled homecare services, placing your well-being at the forefront, and fostering your autonomy.
                </p>
              </div>

              {/* 4 Core Offerings Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5 hover:border-[#08709d]/40 hover:bg-white transition-all duration-300 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1a294a] text-xs font-extrabold uppercase tracking-wide font-['Montserrat'] mb-0">Physiotherapy</h4>
                    <p className="text-[11px] text-gray-500 font-medium mt-1 leading-snug mb-0">Expert in-home rehabilitation for joint, post-surgical, & pain conditions.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5 hover:border-[#08709d]/40 hover:bg-white transition-all duration-300 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1a294a] text-xs font-extrabold uppercase tracking-wide font-['Montserrat'] mb-0">Home Nursing</h4>
                    <p className="text-[11px] text-gray-500 font-medium mt-1 leading-snug mb-0">DHA-licensed clinical care, injection administration, & vitals monitoring.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5 hover:border-[#08709d]/40 hover:bg-white transition-all duration-300 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1a294a] text-xs font-extrabold uppercase tracking-wide font-['Montserrat'] mb-0">Caregivers</h4>
                    <p className="text-[11px] text-gray-500 font-medium mt-1 leading-snug mb-0">Compassionate daily assistance & companionships for seniors.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5 hover:border-[#08709d]/40 hover:bg-white transition-all duration-300 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h4 className="text-[#1a294a] text-xs font-extrabold uppercase tracking-wide font-['Montserrat'] mb-0">Doctor On Call</h4>
                    <p className="text-[11px] text-gray-500 font-medium mt-1 leading-snug mb-0">24/7 licensed medical diagnostics & physical consultations at home.</p>
                  </div>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-3">
                <a 
                  href="tel:+971547033311"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg text-white font-['Montserrat']"
                  style={{ padding: "13px 30px", backgroundColor: "#08709d" }}
                >
                  <Phone size={16} /> 
                  <span>Call Us Now</span>
                </a>
                
                <a 
                  href="https://wa.me/97143320776"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg text-white font-['Montserrat']"
                  style={{ padding: "13px 30px", backgroundColor: "#5eb63b" }}
                >
                  <MessageSquare size={16} /> 
                  <span>WhatsApp Now</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: OUR VISION ── */}
      <section className="py-16 bg-slate-50/70 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* Vision Section Title Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <Eye size={24} />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#08709d] font-['Montserrat']">Our Guiding Principle</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">OUR VISION</h2>
            </div>
          </div>

          {/* Lead Quote Box */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border-l-4 border-[#08709d] shadow-sm mb-8">
            <p className="text-base md:text-xl font-bold text-[#08709d] font-['Montserrat'] leading-relaxed mb-0">
              "We are committed to consistently creating and delivering exceptional value for you."
            </p>
          </div>

          {/* 4 Clean Vision Feature Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Vision Card 1 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#08709d] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#08709d]">
                  <ShieldCheck size={22} className="shrink-0" />
                  <h3 className="text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">
                    Standard for In-Home Healthcare
                  </h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0">
                  At Corx Home Healthcare, first and foremost, we are committed to consistently creating and delivering exceptional value for you. With this guiding principle, our vision is to set the standard as the foremost provider of compassionate and tailored healthcare services, delivered within the comfort and convenience of our patients’ homes.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#08709d]">
                <CheckCircle2 size={16} />
                <span>Tailored & Compassionate Care</span>
              </div>
            </div>

            {/* Vision Card 2 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#08709d] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#08709d]">
                  <HeartHandshake size={22} className="shrink-0" />
                  <h3 className="text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">
                    Elevating Quality of Life & Dignity
                  </h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0">
                  Through this commitment, we are dedicated to elevating the quality of life for our patients by delivering comprehensive, dependable, and expert care. In doing so, we actively foster independence, promote overall wellness, and preserve personal dignity at every stage of care.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#08709d]">
                <CheckCircle2 size={16} />
                <span>Independence & Dignity</span>
              </div>
            </div>

            {/* Vision Card 3 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#08709d] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#08709d]">
                  <Sparkles size={22} className="shrink-0" />
                  <h3 className="text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">
                    Surpassing Patient Expectations
                  </h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0">
                  Furthermore, supported by our skilled and devoted team, we continuously aspire to surpass the expectations of our patients and their families. As a result, we aim to positively influence not only health outcomes but also overall happiness and peace of mind.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#08709d]">
                <CheckCircle2 size={16} />
                <span>Happiness & Peace of Mind</span>
              </div>
            </div>

            {/* Vision Card 4 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#08709d] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#08709d]">
                  <Compass size={22} className="shrink-0" />
                  <h3 className="text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">
                    Nature & Innovative Experiences
                  </h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0">
                  Additionally, and beyond traditional healthcare, we seek to become the top choice for outdoor enthusiasts looking for extraordinary nightlife experiences that transcend conventional boundaries. By combining innovation with nature, we remain committed to offering unparalleled adventures and creating unforgettable moments, all while embracing the beauty of the natural environment.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#08709d]">
                <CheckCircle2 size={16} />
                <span>Innovation & Unparalleled Adventures</span>
              </div>
            </div>

          </div>

          {/* Vision Call To Action Bar */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#08709d] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <h4 className="text-lg font-black uppercase font-['Montserrat'] text-white mb-0">Experience Our Vision In Action</h4>
              <p className="text-sm text-sky-100 font-medium mb-0 mt-1">Book a personalized DHA-licensed home consultation in Dubai.</p>
            </div>
            <a
              href="https://wa.me/97143320776"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#08709d] hover:bg-sky-50 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow transition-all shrink-0 font-['Montserrat']"
            >
              <span>Book Now</span>
              <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* ── SECTION 3: OUR MISSION ── */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* Mission Section Title Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#5eb63b] text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <Target size={24} />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#5eb63b] font-['Montserrat']">Our Core Objective</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">OUR MISSION</h2>
            </div>
          </div>

          {/* Lead Quote Box */}
          <div className="p-6 md:p-8 rounded-2xl bg-emerald-50/80 border-l-4 border-[#5eb63b] shadow-sm mb-8">
            <p className="text-base md:text-xl font-bold text-[#3d8322] font-['Montserrat'] leading-relaxed mb-0">
              "Our mission is to elevate health and well-being by delivering unparalleled comprehensive healthcare."
            </p>
          </div>

          {/* 4 Clean Mission Feature Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Mission Card 1 */}
            <div className="bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#5eb63b] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#5eb63b]">
                  <Building2 size={22} className="shrink-0" />
                  <h3 className="text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">
                    National Leader Based in Dubai & UAE
                  </h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0">
                  At Corx Home Healthcare, first and foremost, our mission is to elevate health and overall well-being by delivering unparalleled, comprehensive healthcare solutions. With this clear commitment at our core, we not only strive for excellence but also stand as a national leader dedicated to enriching lives and providing optimal care for your loved ones. Based in Dubai, United Arab Emirates, we therefore proudly serve individuals across Dubai and the wider UAE as a trusted and dependable home healthcare provider.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#5eb63b]">
                <CheckCircle2 size={16} />
                <span>Dubai & UAE Coverage</span>
              </div>
            </div>

            {/* Mission Card 2 */}
            <div className="bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#5eb63b] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#5eb63b]">
                  <Stethoscope size={22} className="shrink-0" />
                  <h3 className="text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">
                    Physician-Guided Clinical Team
                  </h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0">
                  Through a carefully integrated and patient-centric approach, we consistently deliver comprehensive home healthcare services led by a highly skilled, physician-guided clinical team. In particular, we focus on supporting patients who prefer the comfort of their own homes for treatment, recovery, and rehabilitation. In doing so, we ensure continuity of care, promote familiarity, and preserve dignity throughout their daily lives.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#5eb63b]">
                <CheckCircle2 size={16} />
                <span>Patient-Centric Continuity</span>
              </div>
            </div>

            {/* Mission Card 3 */}
            <div className="bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#5eb63b] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#5eb63b]">
                  <Shield size={22} className="shrink-0" />
                  <h3 className="text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">
                    Continuous Quality & Patient Safety
                  </h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0">
                  Recognizing, above all, that there truly is no place like home, we continuously prioritize quality improvement initiatives. Consequently, we enhance patient safety, increase satisfaction, and support long-term health outcomes, while simultaneously maintaining the highest standards of care within a familiar and reassuring environment.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#5eb63b]">
                <CheckCircle2 size={16} />
                <span>Safety & Reassuring Care</span>
              </div>
            </div>

            {/* Mission Card 4 */}
            <div className="bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#5eb63b] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#5eb63b]">
                  <Globe size={22} className="shrink-0" />
                  <h3 className="text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0">
                    24/7 Access & GCC Regional Benchmarks
                  </h3>
                </div>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0">
                  Moreover, our overarching goal is to provide round-the-clock access to premier healthcare services. By doing so, we consistently deliver exceptional clinical outcomes and, at the same time, set new benchmarks in patient experience across home care, corporate healthcare, and on-demand medical services not only in the UAE but across the entire GCC region.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#5eb63b]">
                <CheckCircle2 size={16} />
                <span>GCC Regional Benchmarks</span>
              </div>
            </div>

          </div>

          {/* Mission Call To Action Bar */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#5eb63b] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <h4 className="text-lg font-black uppercase font-['Montserrat'] text-white mb-0">Join Our Mission Of Excellence</h4>
              <p className="text-sm text-emerald-100 font-medium mb-0 mt-1">Contact our clinical team for 24/7 medical services.</p>
            </div>
            <a
              href="https://wa.me/97143320776"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#3d8322] hover:bg-emerald-50 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow transition-all shrink-0 font-['Montserrat']"
            >
              <span>Book Now</span>
              <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>
    </motion.div>
  );
};

export default About;




