import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Share2, Phone, Globe, Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import logo from '../assets/logo.webp';
import heroVideo from '../assets/Hero.mp4';

/* ── Custom Social Icons ── */
const InstagramIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3v6" />
  </svg>
);

const TikTokIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const DiagonalArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const SocialMedia = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "CORx Healthcare Dubai | Connect & Official Social Media";
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'CORx Healthcare Dubai - Connect & Social Media',
          text: 'Connect with CORx Healthcare Dubai across official platforms.',
          url: window.location.href,
        });
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <InstagramIcon size={26} />,
      link: 'https://www.instagram.com/corx_healthcare_dubai',
    },
    {
      name: 'YouTube',
      icon: <YoutubeIcon size={26} />,
      link: 'https://www.youtube.com/@corxhealthcare',
    },
    {
      name: 'TikTok',
      icon: <TikTokIcon size={26} />,
      link: 'https://www.tiktok.com/@corxhealthcare',
    }
  ];

  return (
    <div className="min-h-screen relative text-white flex flex-col items-center justify-between px-4 sm:px-6 py-8 sm:py-12 overflow-x-hidden font-['Poppins',sans-serif] select-none">
      
      {/* ── Background Video as used in Hero Section (Hero.mp4) ── */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-black pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-75"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Deep Blue & Midnight Overlay matching main site theme */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0c2e56]/92 via-[#0b2848]/88 to-[#071f3b]/94 pointer-events-none"></div>
        {/* Soft Vignettes */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#050e1d]/90 via-transparent to-[#050e1d]/70 pointer-events-none"></div>
      </div>

      {/* ── Soft Radial Aura Glow behind Avatar in Brand Primary Colors ── */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-gradient-to-b from-[#08709d]/35 via-[#1a294a]/20 to-transparent rounded-full blur-[120px] pointer-events-none z-[3]"></div>

      {/* ── Top Bar with Back & Share Buttons ── */}
      <div className="w-full max-w-xl flex items-center justify-between relative z-20 mb-6 sm:mb-8">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1a294a]/80 hover:bg-[#1a294a] backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={handleShare}
          aria-label="Share Page"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1a294a]/80 hover:bg-[#1a294a] backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer relative"
        >
          {copied ? <Check size={18} className="text-[#5eb63b]" /> : <Share2 size={18} />}
        </button>
      </div>

      {/* Copy notification toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 z-50 bg-[#5eb63b] text-white px-4 py-2 rounded-full text-xs font-bold font-['Montserrat',sans-serif] shadow-xl flex items-center gap-1.5"
          >
            <Check size={14} /> Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Column Container ── */}
      <div className="w-full max-w-xl flex flex-col items-center text-center relative z-10 flex-grow justify-center">
        
        {/* Profile Avatar / Logo with Bright Glowing Halo */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative mb-5"
        >
          {/* Glowing Aura Ring in Brand Colors (#08709d & #5eb63b) */}
          <div className="absolute -inset-2.5 bg-gradient-to-tr from-[#08709d] via-[#38bdf8] to-[#5eb63b] rounded-full blur-md opacity-80 animate-pulse"></div>
          
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-3.5 shadow-2xl flex items-center justify-center border-2 border-white/90">
            <img
              src={logo}
              alt="CORx Healthcare Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Doctor / Clinic Title (Montserrat Font) */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8 font-['Montserrat',sans-serif]"
        >
          CORx Healthcare Dubai
        </motion.h1>

        {/* ── 3 Primary Action Buttons Stack (Exact Screenshot Layout & Site Color Palette) ── */}
        <div className="w-full flex flex-col gap-3.5 mb-10">
          
          {/* 1. Call Clinic Button (Primary Theme Blue #08709d) */}
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            href="tel:+97143320776"
            className="group w-full bg-[#08709d] hover:bg-[#075f85] border border-[#38bdf8]/30 backdrop-blur-md p-4 sm:p-4.5 rounded-2xl flex items-center justify-between shadow-lg shadow-[#08709d]/30 transition-all text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Phone size={20} />
              </div>
              <div>
                <h2 className="font-extrabold text-white text-sm sm:text-base leading-snug font-['Montserrat',sans-serif]">
                  Call Dubai 24/7 Clinic
                </h2>
                <p className="text-sky-100 text-[11px] sm:text-xs font-mono">
                  +971 4 332 0776 / +971 54 703 3311
                </p>
              </div>
            </div>
            <DiagonalArrow />
          </motion.a>

          {/* 2. WhatsApp Consultation Button (Accent Green Theme #5eb63b) */}
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            href="https://wa.me/971547033311?text=Hi%20CORx%20Healthcare,%20I%20would%20like%20to%20inquire%20about%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full bg-[#5eb63b] hover:bg-[#4ea12f] border border-white/20 backdrop-blur-md p-4 sm:p-4.5 rounded-2xl flex items-center justify-between shadow-lg shadow-[#5eb63b]/30 transition-all text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                <WhatsAppIcon size={20} />
              </div>
              <div>
                <h2 className="font-extrabold text-white text-sm sm:text-base leading-snug font-['Montserrat',sans-serif]">
                  WhatsApp Consultation
                </h2>
                <p className="text-emerald-100 text-[11px] sm:text-xs font-mono">
                  +971 54 703 3311
                </p>
              </div>
            </div>
            <DiagonalArrow />
          </motion.a>

          {/* 3. Visit Official Website Button (Secondary Navy Glass Theme #1a294a) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
          >
            <Link
              to="/"
              className="group w-full bg-[#1a294a]/85 hover:bg-[#223963] backdrop-blur-md border border-white/15 hover:border-white/25 p-4 sm:p-4.5 rounded-2xl flex items-center justify-between shadow-md transition-all text-left block"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="font-extrabold text-white text-sm sm:text-base leading-snug font-['Montserrat',sans-serif]">
                    Visit Official Website
                  </h2>
                  <p className="text-slate-300 text-[11px] sm:text-xs font-['Poppins',sans-serif]">
                    Explore services & treatments
                  </p>
                </div>
              </div>
              <DiagonalArrow />
            </Link>
          </motion.div>

        </div>

        {/* ── Section Divider: CONNECT SOCIALLY ── */}
        <div className="w-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/15"></div>
            <span className="text-[10px] sm:text-[11px] font-bold font-['Montserrat',sans-serif] uppercase tracking-[0.25em] text-slate-300">
              CONNECT SOCIALLY
            </span>
            <div className="flex-1 h-px bg-white/15"></div>
          </div>

          {/* 3 Square/Rounded Cards: Instagram, YouTube, TikTok */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {socialLinks.map((item, i) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a294a]/80 hover:bg-[#223963] backdrop-blur-md border border-white/15 hover:border-[#38bdf8]/50 p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center gap-2 text-white transition-all shadow-sm group"
              >
                <div className="text-white/85 group-hover:text-[#38bdf8] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-200 group-hover:text-white font-['Montserrat',sans-serif]">
                  {item.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default SocialMedia;
