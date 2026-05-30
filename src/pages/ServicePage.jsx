import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  Home, 
  Shield, 
  Star, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Award,
  Activity,
  Clock,
  Heart,
  ShieldCheck,
  MapPin,
  Sparkles,
  ChevronRight,
  CalendarDays
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

const styles = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes headerIn {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .faq-section {
    background: #f8fafc;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
    min-h: 50vh;
    display: flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    .faq-section { padding: 60px 0; }
  }

  .faq-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 0% 0%, rgba(8, 112, 157, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(94, 182, 59, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .faq-wrap {
    padding: 0 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    font-family: 'Poppins', sans-serif;
    position: relative;
    z-index: 1;
  }

  .faq-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #08709d;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    animation: headerIn 0.4s ease forwards;
  }
  @media (max-width: 640px) {
    .faq-eyebrow { font-size: 12px; }
  }

  .faq-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a2340;
    text-align: center;
    margin: 0 0 0.5rem;
    animation: headerIn 0.4s 0.08s ease both;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }
  @media (max-width: 768px) {
    .faq-title { font-size: 28px; }
  }

  .faq-sub {
    font-size: 18px;
    color: #4b5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    animation: headerIn 0.4s 0.15s ease both;
  }
  @media (max-width: 768px) {
    .faq-sub { font-size: 15px; margin-bottom: 1.5rem; }
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  @media (max-width: 640px) {
    .faq-list { border-radius: 12px; }
  }

  .faq-item {
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
    opacity: 0;
    animation: fadeSlideIn 0.45s cubic-bezier(.4,0,.2,1) forwards;
    transition: background 0.2s;
  }
  .faq-item:last-child { border-bottom: none; }
  .faq-item.open { background: #f9fafb; }

  .faq-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    cursor: pointer;
    border: none;
    background: transparent;
    gap: 16px;
    text-align: left;
  }
  @media (max-width: 768px) {
    .faq-btn { padding: 1.25rem 1.5rem; }
  }
  .faq-btn:hover { background: #f9fafb; }

  .faq-q {
    font-size: 18px;
    font-weight: 700;
    color: #1a2340;
    transition: color 0.2s;
    line-height: 1.4;
  }
  @media (max-width: 768px) {
    .faq-q { font-size: 16px; }
  }
  .faq-item.open .faq-q { color: #08709d; }

  .faq-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 24px;
    font-weight: 300;
    color: #6b7280;
    transition: all 0.35s cubic-bezier(.4,0,.2,1);
    background: #fff;
    line-height: 1;
    user-select: none;
  }
  @media (max-width: 640px) {
    .faq-icon { width: 30px; height: 30px; font-size: 20px; }
  }
  .faq-item.open .faq-icon {
    background: #08709d;
    border-color: #08709d;
    color: #fff;
    transform: rotate(45deg);
  }

  .faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(.4,0,.2,1);
  }
  .faq-item.open .faq-body { grid-template-rows: 1fr; }
  .faq-inner { overflow: hidden; }

  .faq-ans {
    margin: 0 2rem 1.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    color: #4b5563;
    line-height: 1.8;
    border-left: 4px solid #5eb63b;
    border-radius: 0 4px 4px 0;
    background: #f3fdf5;
  }
  @media (max-width: 768px) {
    .faq-ans { margin: 0 1.5rem 1.25rem; font-size: 14px; padding: 0.5rem 1rem; }
  }

  .faq-footer {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 16px;
    color: #4b5563;
    font-weight: 500;
  }
  @media (max-width: 640px) {
    .faq-footer { font-size: 14px; margin-top: 1.5rem; }
  }
  .faq-footer a {
    color: #08709d;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;
  }
  .faq-footer a:hover { border-bottom-color: #08709d; }
`;

const benefitIcons = [Check, Home, Shield, Star];

const physioFeatures = [
  { icon: <ShieldCheck size={20} />, iconColor: "#5eb63b", title: "DHA-Licensed Specialists", desc: "licensed physiotherapists for home visits across Dubai" },
  { icon: <MapPin size={20} />, iconColor: "#38bdf8", title: "Flexible Locations", desc: "Physiotherapy at home, hotel, or office with flexible scheduling" },
  { icon: <Activity size={20} />, iconColor: "#fb923c", title: "Customized Treatment", desc: "Personalized treatment plans for faster and safe recovery" },
  { icon: <Award size={20} />, iconColor: "#e11d48", title: "Transparent Pricing", desc: "Premium clinical care with absolutely no hidden costs" },
];

const physioConditions = [
  { icon: <Activity size={22} />, iconColor: "#38bdf8", title: "Back and neck pain", desc: "Targeted rehabilitation for stiffness, postural pain, muscular spasm, and reduced function." },
  { icon: <Activity size={22} />, iconColor: "#38bdf8", title: "Knee pain and stiffness", desc: "Structured therapy to improve joint movement, strength, and confidence during walking and activity." },
  { icon: <Activity size={22} />, iconColor: "#38bdf8", title: "Shoulder pain", desc: "Focused treatment for pain, weakness, and limited shoulder movement during daily activities." },
  { icon: <Sparkles size={22} />, iconColor: "#fb923c", title: "Sports injuries", desc: "Recovery programs for muscle strains, soft tissue injury, overuse problems, and return to activity." },
  { icon: <Heart size={22} />, iconColor: "#e11d48", title: "Arthritis care", desc: "Gentle, progressive treatment to reduce pain, improve movement, and support long-term joint health." },
  { icon: <Award size={22} />, iconColor: "#5eb63b", title: "Post-surgical rehabilitation", desc: "Planned recovery support after orthopaedic procedures with mobility and strengthening progression." },
  { icon: <Award size={22} />, iconColor: "#5eb63b", title: "Deformity correction support", desc: "Rehabilitation care to improve alignment-related movement patterns and functional recovery." },
  { icon: <ShieldCheck size={22} />, iconColor: "#5eb63b", title: "Hip joint replacement recovery", desc: "Stepwise physiotherapy focused on strength, balance, walking confidence, and safe independence." },
];

const TherapistIllustration = () => (
  <div style={{ position:"relative", width:"100%", height:"100%" }}>
    <div style={{ position:"absolute", top:"30px", right:"30px", width:"260px", height:"260px", borderRadius:"50%", background:"rgba(219,234,254,0.5)", zIndex:0 }} />
    <div style={{ position:"absolute", bottom:"60px", right:"60px", width:"140px", height:"140px", borderRadius:"50%", background:"rgba(187,247,208,0.6)", zIndex:0 }} />
    <div style={{ position:"absolute", top:"20px", right:"20px", width:"280px", height:"340px", background:"white", borderRadius:"24px", boxShadow:"0 12px 48px rgba(37,99,235,0.12)", overflow:"hidden", zIndex:5, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"75%", background:"linear-gradient(180deg,#dbeafe 0%,#eff6ff 100%)", borderRadius:"24px 24px 0 0" }} />
      <svg viewBox="0 0 160 220" style={{ position:"relative", zIndex:2, width:"160px", marginBottom:"-4px" }} xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="48" r="28" fill="#f4c698" />
        <ellipse cx="80" cy="28" rx="28" ry="16" fill="#1e3a5f" />
        <rect x="52" y="28" width="56" height="10" rx="5" fill="#1e3a5f" />
        <rect x="46" y="74" width="68" height="80" rx="14" fill="#1e40af" />
        <path d="M80 74 L60 90 L60 130 L80 120 Z" fill="white" opacity="0.15" />
        <path d="M80 74 L100 90 L100 130 L80 120 Z" fill="white" opacity="0.15" />
        <path d="M70 90 Q65 110 72 118 Q80 124 88 118 Q95 110 90 90" stroke="#6ee7b7" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="80" cy="120" r="6" fill="#6ee7b7" />
        <path d="M46 82 Q28 100 32 116 Q34 122 40 120 L52 100 Z" fill="#1e40af" />
        <path d="M114 82 Q132 100 128 116 Q126 122 120 120 L108 100 Z" fill="#1e40af" />
        <ellipse cx="36" cy="122" rx="10" ry="8" fill="#f4c698" />
        <ellipse cx="124" cy="122" rx="10" ry="8" fill="#f4c698" />
        <rect x="70" y="68" width="20" height="14" rx="6" fill="#f4c698" />
        <rect x="56" y="150" width="22" height="70" rx="8" fill="#1e3a5f" />
        <rect x="82" y="150" width="22" height="70" rx="8" fill="#1e3a5f" />
        <ellipse cx="67" cy="218" rx="14" ry="7" fill="#0f172a" />
        <ellipse cx="93" cy="218" rx="14" ry="7" fill="#0f172a" />
        <rect x="108" y="130" width="34" height="26" rx="6" fill="#2563eb" />
        <rect x="118" y="124" width="14" height="10" rx="4" fill="#1d4ed8" />
        <line x1="108" y1="143" x2="142" y2="143" stroke="white" strokeWidth="1.5" opacity="0.5" />
        <line x1="125" y1="130" x2="125" y2="156" stroke="white" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </div>
    
    {/* Floating Card specifically for Physiotherapy */}
    <div style={{ position:"absolute", bottom:"24px", left:"16px", background:"white", borderRadius:"16px", padding:"16px 20px", boxShadow:"0 8px 32px rgba(0,0,0,0.12)", width:"220px", zIndex:10 }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
        <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"2px" }}>
          <span style={{ color:"#16a34a", fontSize:"16px", fontWeight:"bold" }}>+</span>
        </div>
        <div>
          <p style={{ margin:0, fontWeight:700, fontSize:"13px", color:"#1e293b", lineHeight:"1.3" }}>Home, hotel, or office visits</p>
          <p style={{ margin:"4px 0 0", fontSize:"11px", color:"#64748b", lineHeight:"1.4" }}>Professional physiotherapy tailored to your schedule and condition.</p>
        </div>
      </div>
    </div>
  </div>
);

function PhysiotherapyLanding() {
  const [visible, setVisible] = useState(false);
  const [condVisible, setCondVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setCondVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const landingStyles = {
    dotTexture: {
      position: "absolute",
      inset: 0,
      opacity: 0.03,
      backgroundImage: "radial-gradient(circle, #08709d 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      pointerEvents: "none",
      zIndex: 1
    },
    glowTeal: {
      position: "absolute",
      top: "-10%",
      right: "-10%",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(8, 112, 157, 0.08) 0%, transparent 70%)",
      filter: "blur(60px)",
      pointerEvents: "none",
      zIndex: 1
    },
    glowGreen: {
      position: "absolute",
      bottom: "-10%",
      left: "-10%",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(94, 182, 59, 0.06) 0%, transparent 70%)",
      filter: "blur(60px)",
      pointerEvents: "none",
      zIndex: 1
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden text-[#1a294a]" 
      style={{ 
        fontFamily: "'Poppins', sans-serif",
        background: "transparent",
        paddingTop: "40px"
      }}
    >
      {/* Dynamic Background Effects */}
      <div style={landingStyles.dotTexture} />
      <div style={landingStyles.glowTeal} />
      <div style={landingStyles.glowGreen} />

      {/* ── HERO SECTION ── */}
      <div 
        className="container mx-auto px-6 max-w-7xl relative z-10 pt-28 md:pt-36"
        style={{ paddingBottom: "100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column */}
          <div 
            className="lg:col-span-7 space-y-7 flex flex-col items-start text-left transition-all duration-700"
            style={{ 
              opacity: visible ? 1 : 0, 
              transform: visible ? "translateY(0)" : "translateY(24px)" 
            }}
          >
            {/* Heading */}
            <h1 className="text-[22px] md:text-[30px] lg:text-[32px] font-normal text-[#1a294a] tracking-tight leading-[1.2] uppercase font-montserrat" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Physiotherapy Services in <span style={{ color: "#08709d" }}>Dubai</span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-500 text-[14.5px] leading-relaxed max-w-[520px] font-normal font-poppins">
              Struggling with pain, stiffness, or difficulty moving? Our physiotherapy services in Dubai are designed to help you recover safely and regain confidence in your daily activities. Whether you need treatment at home, in your hotel, or at your workplace, we provide structured and professional care tailored to your condition.
            </p>
            
            {/* 2x2 Clean Feature Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
              style={{ marginTop: "48px" }}
            >
              {physioFeatures.map((f, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(8,112,157,0.06)] hover:border-[#08709d]/20 min-h-[90px]"
                  style={{ 
                    opacity: visible ? 1 : 0, 
                    transform: visible ? "translateY(0)" : "translateY(16px)", 
                    transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s` 
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(8, 112, 157, 0.06)", color: f.iconColor, border: "1px solid rgba(8, 112, 157, 0.1)" }}
                  >
                    {f.icon}
                  </div>
                  <div className="text-left flex flex-col justify-start">
                    <h4 className="text-[#1a294a] text-[13.5px] font-normal leading-snug font-poppins">
                      {f.title}
                    </h4>
                    <p className="text-gray-500 text-[11px] font-medium leading-relaxed mt-1 font-poppins">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div 
              className="flex flex-wrap gap-4 pt-14 w-full items-center"
              style={{ marginBottom: "60px" }}
            >
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(8,112,157,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#08709d] text-white rounded-full uppercase tracking-widest text-[12px] font-normal flex items-center justify-center gap-2"
                  style={{ padding: "16px 42px", fontFamily: "'Montserrat', sans-serif", border: "none" }}
                >
                  BOOK NOW <ArrowRight size={16} />
                </motion.button>
              </Link>
              
              <a href="tel:+97143320776" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "#08709d", background: "rgba(8,112,157,0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-[#08709d] border-2 border-[#08709d]/30 rounded-full uppercase tracking-widest text-[12px] font-normal flex items-center justify-center gap-2"
                  style={{ padding: "14px 42px", fontFamily: "'Montserrat', sans-serif" }}
                >
                  <Phone size={16} /> CALL NOW
                </motion.button>
              </a>

              <a href="https://wa.me/971547033311" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "#22c55e", background: "rgba(34,197,94,0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 rounded-full uppercase tracking-widest text-[12px] font-normal flex items-center justify-center gap-2"
                  style={{ padding: "14px 42px", fontFamily: "'Montserrat', sans-serif", color: "#22c55e", borderColor: "rgba(34,197,94,0.3)" }}
                >
                  <MessageSquare size={16} /> WHATSAPP
                </motion.button>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div 
            className="lg:col-span-5 relative w-full max-w-[460px] mx-auto lg:ml-auto flex items-center justify-center pt-8 lg:pt-0 transition-all duration-700"
            style={{ 
              opacity: visible ? 1 : 0, 
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transitionDelay: "0.2s"
            }}
          >
            <div className="w-full relative">
              {/* Ambient deep glows */}
              <div className="absolute inset-0 bg-[#08709d]/10 rounded-[40px] blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[#5eb63b]/5 rounded-[40px] blur-2xl pointer-events-none" />
              
              <div style={{ 
                borderRadius: "28px", 
                overflow: "hidden", 
                border: "4px solid rgba(255,255,255,0.8)",
                boxShadow: "0 20px 50px rgba(8,112,157,0.08)",
                position: "relative",
                zIndex: 5
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800" 
                  alt="DHA-licensed physical therapist performing home rehabilitation in Dubai" 
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONDITIONS SECTION ── */}
      <div 
        style={{ 
          background: "#f4f7f9", 
          borderTop: "1px solid #e2e8f0", 
          borderBottom: "1px solid #e2e8f0",
          position: "relative",
          zIndex: 10,
          paddingTop: "110px",
          paddingBottom: "96px"
        }}
      >
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Section header */}
          <div className="mb-28 space-y-4">
            <div className="inline-flex bg-white border border-gray-200 text-gray-500 text-[10.5px] font-normal px-4 py-2.5 rounded-full uppercase tracking-widest select-none font-poppins shadow-sm">
              ⊙ Managed Conditions
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <h2 className="text-2xl md:text-4xl font-normal text-[#1a294a] tracking-tight uppercase leading-snug font-montserrat" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Professional care for common pain, stiffness, and movement problems
              </h2>
              <p className="text-gray-500 text-[14.5px] leading-relaxed font-normal font-poppins max-w-xl">
                Physiotherapy plays an important role in managing a wide range of conditions. Early treatment often leads to faster recovery and helps prevent long-term complications.
              </p>
            </div>
          </div>

            {/* Conditions grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {physioConditions.map((c, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-gray-100 p-7 rounded-[22px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(8,112,157,0.05)] hover:border-[#08709d]/20 flex items-start gap-5 cursor-default transition-all duration-300 min-h-[145px] h-full"
                  style={{ 
                    opacity: condVisible ? 1 : 0, 
                    transform: condVisible ? "translateY(0)" : "translateY(20px)", 
                    transition: `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s` 
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(8, 112, 157, 0.06)", color: c.iconColor, border: "1px solid rgba(8, 112, 157, 0.1)" }}
                  >
                    {c.icon}
                  </div>
                  <div className="flex flex-col text-left justify-start">
                    <p className="font-normal text-[14.5px] text-[#1a294a] leading-tight mb-1.5 font-poppins">{c.title}</p>
                    <p className="text-[12px] text-[#64748b] font-normal leading-relaxed font-poppins">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>

    </div>
  );
}

const labFeatures = [
  { icon: "🕒", title: "24/7 blood test home service" },
  { icon: "⚡", title: "Blood test result within 4 Hours" },
  { icon: "📅", title: "On-demand scheduling for convenience" },
  { icon: "👩‍⚕️", title: "DHA licensed doctors and nurses" },
  { icon: "🔒", title: "High security and privacy" },
];

const labTests = [
  { icon: "🤧", iconBg: "#ffe4e6", title: "Allergy Test", desc: "Identify key environmental or food triggers causing allergic reactions and sensitivities.", category: "Allergy & Diet", badge: "bg-rose-50 text-rose-600 border border-rose-100" },
  { icon: "🩸", iconBg: "#fee2e2", title: "Testing for Anemia", desc: "Check iron, ferritin, hemoglobin, and red blood cells to diagnose anemia types.", category: "Blood Health", badge: "bg-red-50 text-red-600 border border-red-100" },
  { icon: "🍬", iconBg: "#fef3c7", title: "Blood Sugar Test", desc: "Assess immediate glucose levels to evaluate daily energy and metabolic control.", category: "Metabolic", badge: "bg-amber-50 text-amber-600 border border-amber-100" },
  { icon: "🔬", iconBg: "#e8f4ff", title: "Complete Blood Count", desc: "Comprehensive screening of red/white blood cells, hemoglobin, and platelets.", category: "Core Screen", badge: "bg-blue-50 text-blue-600 border border-blue-100" },
  { icon: "🧪", iconBg: "#faf5ff", title: "CRP", desc: "Measure C-Reactive Protein levels to detect active internal inflammation or infections.", category: "Inflammation", badge: "bg-purple-50 text-purple-600 border border-purple-100" },
  { icon: "🦠", iconBg: "#fee2e2", title: "Covid-19 Test", desc: "DHA-approved rapid home screening for active SARS-CoV-2 viral detection.", category: "Infectious", badge: "bg-red-50 text-red-600 border border-red-100" },
  { icon: "❤️", iconBg: "#fff5f5", title: "Cholesterol Test", desc: "Monitor total cholesterol and fat markers to assess heart and blood vessel health.", category: "Heart Health", badge: "bg-red-50 text-red-600 border border-red-100" },
  { icon: "📊", iconBg: "#ecfdf5", title: "Diabetes Test", desc: "Diagnose glucose tolerance and track overall blood sugar control and insulin health.", category: "Metabolic", badge: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
  { icon: "🍽️", iconBg: "#fef8c3", title: "Food Sensitivity Test", desc: "Check IgG antibody responses to identify trigger foods causing stomach discomfort.", category: "Allergy & Diet", badge: "bg-amber-50 text-amber-600 border border-amber-100" },
  { icon: "📈", iconBg: "#e0f2fe", title: "HbA1C Test", desc: "Measure the 3-month blood sugar average to evaluate long-term glycemic control.", category: "Metabolic", badge: "bg-blue-50 text-blue-600 border border-blue-100" },
  { icon: "🟡", iconBg: "#fffbeb", title: "Hepatitis A", desc: "Screen for HAV antibodies to diagnose or check immunity against liver infections.", category: "Liver Health", badge: "bg-amber-50 text-amber-600 border border-amber-100" },
  { icon: "🧬", iconBg: "#f0fdf4", title: "Hepatitis B", desc: "Assess active infection markers or vaccine protection levels for Hepatitis B.", category: "Liver Health", badge: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
  { icon: "⚖️", iconBg: "#faf5ff", title: "Hormone Test", desc: "Check estrogen, testosterone, cortisol, or thyroid levels for internal balance.", category: "Hormones", badge: "bg-purple-50 text-purple-600 border border-purple-100" },
  { icon: "🤒", iconBg: "#fff7ed", title: "Influenza Test", desc: "Rapid home swab screening for active Influenza A & B viral strains.", category: "Infectious", badge: "bg-orange-50 text-orange-600 border border-orange-100" },
  { icon: "💓", iconBg: "#ffe4e6", title: "Lipid Profile", desc: "Complete risk assessment evaluating good/bad cholesterol and triglycerides.", category: "Heart Health", badge: "bg-rose-50 text-rose-600 border border-rose-100" },
  { icon: "🏥", iconBg: "#f0fdf4", title: "Liver Function Test", desc: "Evaluate key liver enzymes, proteins, bilirubin, and overall detox health.", category: "Liver Health", badge: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
  { icon: "🧫", iconBg: "#ecfdf5", title: "Microbial Culture", desc: "Identify specific bacteria or pathogens and determine the best antibiotics.", category: "Immunity", badge: "bg-teal-50 text-teal-600 border border-teal-100" },
  { icon: "💎", iconBg: "#f0f9ff", title: "Mineral Test", desc: "Measure calcium, magnesium, and essential minerals vital for bones and cells.", category: "Nutrients", badge: "bg-blue-50 text-blue-600 border border-blue-100" },
  { icon: "🌀", iconBg: "#fdf2f8", title: "Renal Function Test", desc: "Check creatinine, urea, and filtration to assess overall kidney health.", category: "Kidney Health", badge: "bg-pink-50 text-pink-600 border border-pink-100" },
  { icon: "📦", iconBg: "#fffbeb", title: "Stool Test", desc: "Screen for digestive health, active pathogens, parasites, or occult blood.", category: "Digestion", badge: "bg-amber-50 text-amber-700 border border-amber-150" },
  { icon: "🥛", iconBg: "#f0fdfa", title: "Urine Test", desc: "Routine urinalysis screening for kidney function, UTIs, and metabolic signs.", category: "Metabolic", badge: "bg-teal-50 text-teal-600 border border-teal-100" },
  { icon: "☀️", iconBg: "#fef9c3", title: "Vitamins Test", desc: "Assess key vitamin levels like Vitamin D3 and B12 vital for energy and immunity.", category: "Nutrients", badge: "bg-amber-50 text-amber-600 border border-amber-100" },
  { icon: "🥗", iconBg: "#f0fdf4", title: "Food Intolerance Test", desc: "Detailed profile screen checking systemic reactions to common food groups.", category: "Allergy & Diet", badge: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
  { icon: "💧", iconBg: "#e0f2fe", title: "Electrolytes", desc: "Check sodium, potassium, and chloride levels to evaluate hydration and pH.", category: "Hydration", badge: "bg-blue-50 text-blue-600 border border-blue-100" }
];

const LabIllustration = () => (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    {/* Glow blobs behind image */}
    <div style={{ position: "absolute", top: "10px", right: "10px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(8,112,157,0.08)", filter: "blur(40px)", zIndex: 0 }} />
    <div style={{ position: "absolute", bottom: "20px", left: "20px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(94,182,59,0.07)", filter: "blur(30px)", zIndex: 0 }} />

    {/* Main Image */}
    <div style={{ position: "relative", zIndex: 5, borderRadius: "28px", overflow: "hidden", boxShadow: "0 20px 60px rgba(8,112,157,0.18), 0 4px 20px rgba(0,0,0,0.08)", border: "3px solid rgba(8,112,157,0.1)" }}>
      <img
        src="/lab_test_hero.png"
        alt="DHA-licensed nurse performing home blood test in Dubai"
        style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", borderRadius: "25px" }}
      />
      {/* Subtle overlay gradient at bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, rgba(8,112,157,0.15), transparent)", borderRadius: "0 0 25px 25px" }} />
    </div>

    {/* Badge pill overlay */}
    <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "white", borderRadius: "50px", padding: "8px 18px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: "8px", zIndex: 10, whiteSpace: "nowrap" }}>
      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }} />
      <span style={{ fontSize: "12px", fontWeight: 700, color: "#1a294a", fontFamily: "Poppins, sans-serif" }}>DHA-Licensed · Results in 4 Hours</span>
    </div>
  </div>
);



function LabServicesLanding() {
  const [visible, setVisible] = useState(false);
  const [condVisible, setCondVisible] = useState(false);

  const labColumns = [
    {
      title: "Core screenings",
      tagline: "Routine blood & vitals",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 1 7 7c0 4-3 7-7 13C9 16 5 13 5 9a7 7 0 0 1 7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      ),
      iconBg: "#E6F1FB",
      iconColor: "#185FA5",
      dotColor: "#378ADD",
      tests: [
        "Allergy test",
        "Testing for anemia",
        "Blood sugar test",
        "Complete blood count",
        "CRP",
        "Covid-19 test",
        "Cholesterol test",
        "Diabetes test"
      ],
      delay: 0.05
    },
    {
      title: "Organ & metabolic",
      tagline: "Hormonal & organ health",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
        </svg>
      ),
      iconBg: "#E1F5EE",
      iconColor: "#0F6E56",
      dotColor: "#1D9E75",
      tests: [
        "Food sensitivity test",
        "HbA1C test",
        "Hepatitis A",
        "Hepatitis B",
        "Hormone test",
        "Influenza test",
        "Lipid profile",
        "Liver function test"
      ],
      delay: 0.12
    },
    {
      title: "Advanced diagnostics",
      tagline: "Immunity, viruses & minerals",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
        </svg>
      ),
      iconBg: "#FAECE7",
      iconColor: "#993C1D",
      dotColor: "#D85A30",
      tests: [
        "Microbial culture & sensitivity",
        "Mineral test",
        "Renal function test",
        "Stool test",
        "Urine test",
        "Vitamins test",
        "Food intolerance test",
        "Electrolytes"
      ],
      delay: 0.19
    }
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setCondVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="bg-white min-h-screen font-poppins relative overflow-hidden">
      {/* Soft background glow circles to match other pages */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#08709d]/3 rounded-full blur-[120px] pointer-events-none" />

      {/* ── HERO SECTION ── */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column */}
          <div 
            className="lg:col-span-7 space-y-6 flex flex-col items-start text-left transition-all duration-700"
            style={{ 
              opacity: visible ? 1 : 0, 
              transform: visible ? "translateY(0)" : "translateY(24px)" 
            }}
          >
            {/* Eyebrow Text */}
            <p className="text-[#08709d] text-xs md:text-sm font-bold uppercase tracking-wider" style={{ marginTop: "18px" }}>
              DHA-licensed home sample collection across Dubai
            </p>
            
            {/* Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black text-[#1a294a] tracking-tight leading-[1.1] uppercase font-poppins">
              Blood Test in Dubai
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-lg md:text-xl lg:text-[22px] font-extrabold text-[#08709d] uppercase tracking-wide font-poppins -mt-2">
              Get an Accurate Lab Result at Your Doorsteps
            </h2>
            
            {/* Description Paragraphs */}
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[580px] font-medium font-sans">
              Book a blood test at home in Dubai without visiting a clinic or Hospital. Our home care service provides convenient blood sample collection at your home, hotel, or office by DHA-certified healthcare professionals at an affordable price.
            </p>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[580px] font-medium font-sans mt-3">
              Regardless of whether you need a regular health check or specific diagnostic tests, we ensure the process is maintained with hygiene, accuracy, and reporting within 4 Hours to understand your healthcare requirements with minimal disturbance to your day.
            </p>
            
            {/* 2x2 Clean Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full pt-4">
              {labFeatures.map((f, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 p-4 rounded-2xl shadow-[0_4px_20px_rgba(8,112,157,0.15)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(8,112,157,0.25)] hover:scale-[1.02] min-h-[70px]"
                  style={{ 
                    backgroundColor: "#08709d",
                    opacity: visible ? 1 : 0, 
                    transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)", 
                    transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s` 
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 text-xl">
                    {f.icon}
                  </div>
                  <div className="text-left flex flex-col justify-center">
                    <h4 className="text-[13.5px] font-bold leading-snug font-poppins" style={{ color: "#ffffff" }}>
                      {f.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 w-full items-center" style={{ paddingTop: "16px", marginTop: "4px" }}>
              <a 
                href="tel:+971547033311" 
                className="inline-flex items-center justify-center gap-3 bg-[#08709d] hover:bg-[#065679] rounded-full font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg min-h-[50px] select-none text-center font-poppins"
                style={{ color: "white", padding: "13px 28px" }}
              >
                Call Us Now
              </a>
              <a 
                href="https://wa.me/971547033311" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#1db053] rounded-full font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg min-h-[50px] select-none text-center font-poppins"
                style={{ color: "white", padding: "13px 28px" }}
              >
                WhatsApp Now
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div 
            className="lg:col-span-5 relative w-full max-w-[460px] mx-auto lg:ml-auto flex items-center justify-center pt-8 lg:pt-0 transition-all duration-700"
            style={{ 
              opacity: visible ? 1 : 0, 
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transitionDelay: "0.2s"
            }}
          >
            <LabIllustration />
          </div>
        </div>
      </div>

      {/* ── CONDITIONS SECTION ── */}
      <div className="bg-[#f7f6f2] py-14 border-t border-b border-[rgba(0,0,0,0.09)] w-full flex flex-col items-center justify-center">
        <div className="mx-auto px-6 w-full max-w-[1100px] flex flex-col items-center">

          {/* Section header */}
          <div className="mb-8 flex flex-col items-center text-center mx-auto">
            <h2 className="text-2xl md:text-[36px] font-black text-[#1a294a] tracking-tight uppercase leading-snug font-poppins max-w-[620px] mb-3.5">
              Accurate diagnostic tests &amp; body checkups at your doorstep
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[580px] font-medium font-sans">
              CORx Healthcare offers a wide range of lab tests at home — blood tests, screenings, diagnostic or monitoring health checks, all as per your needs.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full animate-fadeIn" style={{ gap: "14px", marginBottom: "14px" }}>
            {labColumns.map((col, idx) => (
              <motion.div
                key={idx}
                className="bg-white border-[0.5px] border-[rgba(0,0,0,0.09)] rounded-[14px] flex flex-col"
                style={{ padding: "24px" }}
                initial={{ opacity: 0, y: 10 }}
                animate={condVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: col.delay }}
              >
                <div className="w-[40px] h-[40px] rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: col.iconBg, color: col.iconColor, marginBottom: "1rem" }}>
                  {col.icon}
                </div>
                <p className="text-[16.5px] font-bold text-[#1a294a] mb-[2px] text-left font-poppins">
                  {col.title}
                </p>
                <p className="text-[11.5px] font-medium uppercase tracking-[0.07em] text-gray-400 text-left font-sans" style={{ marginBottom: "1rem" }}>
                  {col.tagline}
                </p>
                <hr style={{ border: "none", borderTop: "0.5px solid rgba(0,0,0,0.09)", marginBottom: "1rem" }} />
                <ul className="list-none flex flex-col text-left flex-grow font-sans" style={{ gap: "7px" }}>
                  {col.tests.map((test, testIdx) => (
                    <li key={testIdx} className="flex items-center gap-[8px] text-[14.5px] text-[#475569]">
                      <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: col.dotColor }} />
                      {test}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Note Banner */}
          <div className="flex items-start gap-[12px] bg-white border-[0.5px] border-[rgba(0,0,0,0.09)] rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] font-sans" style={{ width: "100%", padding: "16px 20px", marginTop: "52px", marginBottom: "28px" }}>
            <span className="shrink-0 text-[#08709d] flex items-center justify-center mt-[2px]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </span>
            <p className="text-[13.5px] text-gray-500 leading-[1.55] text-left m-0">
              <strong className="text-[#1a294a] font-bold">Note:</strong> All blood tests at home at CORx are coordinated based on your medical requirements and doctor's advice, where applicable.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default function ServicePage({ serviceId }) {
  const params = useParams();
  const activeId = serviceId || params.id;

  const service = servicesData[activeId];

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Refined Landing Hero Section */}
      {activeId === 'physiotherapy' ? (
        <PhysiotherapyLanding />
      ) : activeId === 'lab-services' ? (
        <LabServicesLanding />
      ) : (
        <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white border-b border-gray-100">
          {/* Soft background glow circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50/50 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#08709d]/3 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Refined Brand Messaging */}
              <div className="lg:col-span-7 space-y-6 flex flex-col items-start text-left">
                
                {/* Eyebrow badge container with proper bounds */}
                <div className="inline-flex bg-[#08709d]/10 border border-[#08709d]/20 text-[#08709d] text-xs md:text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider select-none">
                  {service.eyebrow}
                </div>
                
                {/* Heading */}
                <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black text-[#1a294a] tracking-tight leading-[1.1] uppercase">
                  {service.title} in Dubai
                </h1>
                
                {/* Main Description */}
                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-[580px] font-medium">
                  {service.description}
                </p>
                
                {/* 2x2 Clean Benefit Grid (Optimized heights & start alignments) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-2">
                  {service.benefits.map((benefit, idx) => {
                    const BenefitIcon = benefitIcons[idx % benefitIcons.length];
                    return (
                      <div 
                        key={idx}
                        className="flex items-start gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(8,112,157,0.05)] hover:border-[#08709d]/15 min-h-[110px] h-full"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0 mt-0.5">
                          <BenefitIcon size={18} className="stroke-[2.5]" />
                        </div>
                        <div className="text-left flex flex-col justify-start">
                          <h4 className="text-secondary-color text-[14px] font-bold leading-snug">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-500 text-[12.5px] font-medium leading-relaxed mt-1">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Refined CTA Action Buttons (Prevent collapse, absolute size consistency) */}
                <div className="flex flex-wrap gap-4 pt-6 w-full items-center">
                  <a 
                    href="tel:+971547033311"
                    className="inline-flex items-center justify-center gap-3 bg-[#08709d] hover:bg-[#065679] rounded-full font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg min-h-[50px] select-none text-center"
                    style={{ color: "white", padding: "13px 28px" }}
                  >
                    <Phone size={18} className="stroke-[2.5]" /> 
                    <span>Call Us Now</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/971547033311"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#25d366] hover:bg-[#20ba5a] rounded-full font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg min-h-[50px] select-none text-center"
                    style={{ color: "white", padding: "13px 28px" }}
                  >
                    <MessageSquare size={18} className="stroke-[2.5]" /> 
                    <span>WhatsApp Now</span>
                  </a>
                </div>

              </div>

              {/* Right Column: Premium Interactive Illustration Frame */}
              <div className="lg:col-span-5 relative w-full max-w-[460px] mx-auto lg:ml-auto flex items-center justify-center pt-8 lg:pt-0">
                
                {/* Radial deep glow */}
                <div className="absolute w-80 h-80 bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" />
                
                {/* Rounded vector background container */}
                <div className="relative w-full bg-gradient-to-tr from-[#08709d]/8 via-[#08709d]/2 to-transparent p-5 rounded-[40px] border border-[#08709d]/10 shadow-[0_20px_50px_rgba(8,112,157,0.03)]">
                  
                  {/* Clean medical frame box */}
                  <div className="relative bg-white rounded-[28px] border border-gray-150 p-8 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[380px] md:min-h-[420px]">
                    
                    {/* Subtle vector bubbles */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#5eb63b]/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#08709d]/5 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Highly refined vector SVG */}
                    <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="relative z-10 w-[78%] h-auto drop-shadow-md animate-pulse" style={{ animationDuration: '3.5s' }}>
                      <circle cx="100" cy="100" r="90" fill="#08709d" fillOpacity="0.04" />
                      <circle cx="100" cy="80" r="42" fill="#f4fafc" stroke="#08709d" strokeWidth="2.5" />
                      
                      {/* Clinical bag */}
                      <rect x="78" y="118" width="44" height="38" rx="8" fill="#1a294a" />
                      <rect x="88" y="112" width="24" height="8" rx="2" fill="#5eb63b" />
                      <path d="M100 128v18M91 137h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                      
                      {/* Body shape */}
                      <path d="M45 160c0-22 22-40 55-40s55 18 55 40v10H45v-10z" fill="#08709d" />
                      <path d="M86 115v10h28v-10H86z" fill="#f3d0b2" />
                      <circle cx="100" cy="94" r="21" fill="#f3d0b2" />
                      <path d="M79 94c0-14 10-21 21-21s21 7 21 21H79z" fill="#1a294a" />
                      
                      {/* Coat overlay */}
                      <path d="M82 125l18 30 18-30" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                      
                      {/* Stethoscope */}
                      <path d="M88 105c0 12 24 12 24 0" stroke="#1a294a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M100 117v12" stroke="#1a294a" strokeWidth="2.5" />
                      <circle cx="100" cy="133" r="3.5" fill="#5eb63b" />
                    </svg>
                  </div>

                  {/* Floating overlay pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-8 -left-6 bg-white p-4 rounded-2xl border border-gray-150 shadow-[0_15px_35px_rgba(0,0,0,0.07)] max-w-[280px] z-20 flex gap-3.5 items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#5eb63b]/15 text-[#5eb63b] flex items-center justify-center font-bold shrink-0 text-md">
                      +
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-secondary-color font-bold text-[13px] leading-tight mb-1">
                        {service.floatingBadge.title}
                      </h4>
                      <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                        {service.floatingBadge.desc}
                      </p>
                    </div>
                  </motion.div>
                  
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 2. Have Any Question? Section */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #08709d 0%, #1a294a 100%)', 
          padding: '80px 0',
          marginTop: '80px'
        }}
      >
        {/* Particle circles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-[#5eb63b] rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-[100px]"
          />
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white uppercase tracking-tight"
                style={{ color: 'white' }}
              >
                Have Any Question?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white text-lg md:text-xl font-medium max-w-3xl leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                Call Us at <a href="tel:+97143320776" className="text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity">+971 4 332 0776</a> or WhatsApp Us at <a href="https://wa.me/971547033311" target="_blank" rel="noopener noreferrer" className="text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity">+971 54 703 3311</a> for doctor on call service.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{ 
                y: [0, -8, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative group"
            >
              <a 
                href="/Company-Profile.pdf" 
                download="Company-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-white text-secondary-color rounded-full font-bold uppercase tracking-wider text-sm shadow-xl hover:shadow-white/20 transition-all duration-500 flex items-center gap-3 z-10 hover:-translate-y-1"
                style={{ padding: '18px 45px', color: '#1a294a', backgroundColor: 'white' }}
              >
                {/* Shine Animation */}
                <motion.div 
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-secondary-color/5 to-transparent -skew-x-12 z-0"
                />
                <span className="relative z-10">DOWNLOAD PROFILE</span>
                <ArrowRight size={18} className="relative z-10" />
              </a>
              {/* Button shadow */}
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Dynamic Accordion FAQ Section */}
      <section className="faq-section">
        <style>{styles}</style>
        <div className="faq-wrap">
          <div className="faq-eyebrow">
            ⊙ Common Questions
          </div>
          <h2 className="faq-title">{service.title} FAQs</h2>
          <p className="faq-sub">
            Find answers to the most common questions about our premium {service.title.toLowerCase()} in Dubai.
          </p>

          <div className="faq-list">
            {service.faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`faq-item${isOpen ? " open" : ""}`}
                  style={{ animationDelay: `${0.05 + i * 0.08}s` }}
                >
                  <button
                    className="faq-btn"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q">{faq.q}</span>
                    <span className="faq-icon">+</span>
                  </button>
                  <div className="faq-body">
                    <div className="faq-inner">
                      <div className="faq-ans">{faq.a}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="faq-footer">
            Still have questions?{" "}
            <Link to="/contact">Contact our support team</Link>
          </p>
        </div>
      </section>
      
    </div>
  );
}
