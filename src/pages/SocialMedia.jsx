import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Share2, Phone, Globe, Check, Mail, Calendar
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import logo from '../assets/logo.webp';
import heroVideo from '../assets/Hero.mp4';

/* ── Custom Social Icons ── */
const FacebookIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
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
      name: 'Facebook',
      icon: <FacebookIcon size={26} />,
      link: 'https://www.facebook.com/corxhealthcare',
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon size={26} />,
      link: 'https://www.instagram.com/corx_healthcare',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon size={26} />,
      link: 'https://www.linkedin.com/company/corx-healthcare/',
    }
  ];

  return (
    <div className="min-h-screen relative text-white flex flex-col items-center justify-start px-4 sm:px-6 pt-4 sm:pt-6 pb-12 overflow-x-hidden font-['Poppins',sans-serif] select-none">
      
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
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[440px] h-[440px] bg-gradient-to-b from-[#08709d]/35 via-[#1a294a]/20 to-transparent rounded-full blur-[100px] pointer-events-none z-[3]"></div>

      {/* ── Top Bar with Back & Share Buttons ── */}
      <div className="w-full max-w-xl flex items-center justify-between relative z-20 mb-3 sm:mb-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a294a]/80 hover:bg-[#1a294a] backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={17} />
        </button>

        <button
          onClick={handleShare}
          aria-label="Share Page"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a294a]/80 hover:bg-[#1a294a] backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer relative"
        >
          {copied ? <Check size={17} className="text-[#5eb63b]" /> : <Share2 size={17} />}
        </button>
      </div>

      {/* Copy notification toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 z-50 bg-[#5eb63b] text-white px-4 py-2 rounded-full text-xs font-bold font-['Montserrat',sans-serif] shadow-xl flex items-center gap-1.5"
          >
            <Check size={14} /> Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Column Container ── */}
      <div className="w-full max-w-xl flex flex-col items-center text-center relative z-10">
        
        {/* Profile Avatar / Logo with Bright Glowing Halo */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative mb-3.5 sm:mb-4"
        >
          {/* Glowing Aura Ring in Brand Colors (#08709d & #5eb63b) */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#08709d] via-[#38bdf8] to-[#5eb63b] rounded-full blur-md opacity-80 animate-pulse"></div>
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-3 shadow-2xl flex items-center justify-center border-2 border-white/90">
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
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-5 sm:mb-6 font-['Montserrat',sans-serif]"
        >
          CORx Healthcare Dubai
        </motion.h1>

        {/* ── Primary Action Buttons Stack (Call on top, WhatsApp & Website in single row) ── */}
        <div className="w-full flex flex-col gap-2.5 sm:gap-3 mb-6 sm:mb-7">
          
          {/* Row 1: Two Call Clinic Buttons Side-by-Side */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
            
            {/* 1. Call Landline Clinic Button */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+97143320776"
              className="group bg-[#08709d] hover:bg-[#075f85] border border-[#38bdf8]/30 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl flex items-center justify-between shadow-lg shadow-[#08709d]/25 transition-all text-left min-w-0"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Phone size={17} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-white text-[11px] sm:text-xs md:text-sm leading-tight font-['Montserrat',sans-serif] truncate">
                    Clinic Reception
                  </h2>
                  <p className="text-sky-100 text-[9px] sm:text-[10px] md:text-[11px] font-mono mt-0.5 truncate">
                    +971 4 332 0776
                  </p>
                </div>
              </div>
              <div className="shrink-0 hidden xs:block">
                <DiagonalArrow />
              </div>
            </motion.a>

            {/* 2. Call 24/7 Helpline Button */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+971547033311"
              className="group bg-[#08709d] hover:bg-[#075f85] border border-[#38bdf8]/30 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl flex items-center justify-between shadow-lg shadow-[#08709d]/25 transition-all text-left min-w-0"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Phone size={17} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-white text-[11px] sm:text-xs md:text-sm leading-tight font-['Montserrat',sans-serif] truncate">
                    24/7 Helpline
                  </h2>
                  <p className="text-sky-100 text-[9px] sm:text-[10px] md:text-[11px] font-mono mt-0.5 truncate">
                    +971 54 703 3311
                  </p>
                </div>
              </div>
              <div className="shrink-0 hidden xs:block">
                <DiagonalArrow />
              </div>
            </motion.a>

          </div>

          {/* Single Row with WhatsApp & Visit Website Side-by-Side */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
            
            {/* 2. WhatsApp Consultation Button */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/971547033311?text=Hi%20CORx%20Healthcare,%20I%20would%20like%20to%20inquire%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#5eb63b] hover:bg-[#4ea12f] border border-white/20 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl flex items-center justify-between shadow-lg shadow-[#5eb63b]/30 transition-all text-left min-w-0"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <WhatsAppIcon size={18} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-white text-[11px] sm:text-xs md:text-sm leading-tight font-['Montserrat',sans-serif] truncate">
                    WhatsApp Chat
                  </h2>
                  <p className="text-emerald-100 text-[9px] sm:text-[10px] md:text-[11px] font-mono mt-0.5 truncate">
                    +971 54 703 3311
                  </p>
                </div>
              </div>
              <div className="shrink-0 hidden xs:block">
                <DiagonalArrow />
              </div>
            </motion.a>

            {/* 3. Visit Official Website Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="min-w-0"
            >
              <Link
                to="/"
                className="group w-full h-full bg-[#1a294a]/85 hover:bg-[#223963] backdrop-blur-md border border-white/15 hover:border-white/25 p-3 sm:p-3.5 rounded-2xl flex items-center justify-between shadow-md transition-all text-left block min-w-0"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Globe size={18} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-extrabold text-white text-[11px] sm:text-xs md:text-sm leading-tight font-['Montserrat',sans-serif] truncate">
                      Official Website
                    </h2>
                    <p className="text-slate-300 text-[9px] sm:text-[10px] md:text-[11px] font-['Poppins',sans-serif] mt-0.5 truncate">
                      Explore services
                    </p>
                  </div>
                </div>
                <div className="shrink-0 hidden xs:block">
                  <DiagonalArrow />
                </div>
              </Link>
            </motion.div>

          </div>

          {/* Row 3: Email Inquiries & Book an Appointment Side-by-Side */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
            
            {/* 4. Email Inquiries Button */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:info@corx.ae"
              className="group bg-[#1a294a]/85 hover:bg-[#223963] backdrop-blur-md border border-white/15 hover:border-white/25 p-3 sm:p-3.5 rounded-2xl flex items-center justify-between shadow-md transition-all text-left min-w-0"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-extrabold text-white text-[11px] sm:text-xs md:text-sm leading-tight font-['Montserrat',sans-serif] truncate">
                    Email Inquiries
                  </h2>
                  <p className="text-slate-300 text-[9px] sm:text-[10px] md:text-[11px] font-mono mt-0.5 truncate">
                    info@corx.ae
                  </p>
                </div>
              </div>
              <div className="shrink-0 hidden xs:block">
                <DiagonalArrow />
              </div>
            </motion.a>

            {/* 5. Book an Appointment Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="min-w-0"
            >
              <Link
                to="/book-an-appointment"
                className="group w-full h-full bg-[#1a294a]/85 hover:bg-[#223963] backdrop-blur-md border border-white/15 hover:border-white/25 p-3 sm:p-3.5 rounded-2xl flex items-center justify-between shadow-md transition-all text-left block min-w-0"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                    <Calendar size={18} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-extrabold text-white text-[11px] sm:text-xs md:text-sm leading-tight font-['Montserrat',sans-serif] truncate">
                      Book Appointment
                    </h2>
                    <p className="text-slate-300 text-[9px] sm:text-[10px] md:text-[11px] font-['Poppins',sans-serif] mt-0.5 truncate">
                      Online Booking
                    </p>
                  </div>
                </div>
                <div className="shrink-0 hidden xs:block">
                  <DiagonalArrow />
                </div>
              </Link>
            </motion.div>

          </div>

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

          {/* 3 Square/Rounded Cards: Facebook, Instagram, LinkedIn */}
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
                className="bg-[#08709d]/85 hover:bg-[#08709d] backdrop-blur-md border border-[#38bdf8]/35 hover:border-[#38bdf8]/70 p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center gap-2.5 text-white transition-all shadow-md shadow-[#08709d]/25 group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-inner">
                  {item.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-bold tracking-wide text-white font-['Montserrat',sans-serif]">
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
