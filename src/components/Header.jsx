import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, ChevronDown, Facebook, Instagram, Twitter, Search, Printer, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.webp';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const locations = Array(10).fill("Trusted Home healthcare services in Dubai");

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Physiotherapy', path: '/services/physiotherapy' },
        { name: 'IV Therapy', path: '/services/iv-therapy' },
        { name: 'Home Nursing', path: '/services/nursing' },
        { name: 'Doctor On Call', path: '/services/doctor-on-call' },
        { name: 'Elderly Care', path: '/services/elderly-care' },
        { name: 'Lab Services', path: '/services/lab-services' },
      ]
    },
    { name: 'Book Contact', path: '/contact' },
    { name: 'Blog', path: '#' },
    { 
      name: 'Language', 
      path: '#',
      dropdown: [
        { name: 'English', path: '#' },
        { name: 'Arabic', path: '#' },
      ]
    },
  ];

  return (
    <header className="relative w-full z-50">
      {/* Top Location Bar */}
      <div className="bg-[#63b158] text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
        <div className="flex">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 60 
            }}
            className="flex items-center gap-12 text-[10px] md:text-[11px] font-bold tracking-wider shrink-0"
          >
            {[...locations, ...locations].map((loc, index) => (
              <a key={index} href="#" className="flex items-center gap-2 hover:text-accent-color transition-colors shrink-0 uppercase px-4">
                {loc} <ArrowRight size={12} className="text-white/70" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Top Bar (White) */}
      <div className="bg-white transition-all duration-300 border-b border-gray-100 py-0 shadow-sm">
        <div className="container flex justify-between items-center h-20 md:h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center h-full -ml-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -1, 1, -1, 0],
                transition: { duration: 0.3 } 
              }}
              className="relative group h-full flex items-center"
            >
              <img src={logo} alt="COMPLETE HEALTHCARE" className="h-[80%] md:h-[90%] w-auto object-contain relative z-10" />
              
              {/* Shimmering Shine Effect */}
              <motion.div 
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "200%", opacity: [0, 0.5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5, 
                  repeatDelay: 4,
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] z-20 pointer-events-none"
              />
              
              {/* Subtitle Glow on hover */}
              <div className="absolute inset-0 bg-primary-color/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </Link>

          {/* Tagline (Center - Hidden on Mobile) */}
          <div className="hidden lg:block text-center flex-1 px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex justify-center flex-wrap gap-x-[0.5em] gap-y-0"
            >
              {"24/7 PREMIUM HOME HEALTHCARE SERVICES IN DUBAI".split(" ").map((word, i) => (
                <div key={i} className="relative overflow-hidden py-1 px-1">
                  <motion.span
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: { 
                        y: 0, 
                        opacity: 1,
                        transition: { 
                          duration: 0.8, 
                          ease: [0.33, 1, 0.68, 1],
                          delay: i * 0.1 
                        } 
                      }
                    }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="inline-block font-['Montserrat'] font-black uppercase tracking-[0.15em] transition-colors duration-300 cursor-default"
                    style={{ 
                      color: '#2596be', 
                      fontSize: '15px',
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </motion.div>
            
            {/* Shimmering line beneath tagline */}
            <div className="relative h-[2px] w-32 mx-auto mt-1 overflow-hidden rounded-full bg-gray-100">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2596be]/50 to-transparent"
              />
            </div>
          </div>

          {/* Social Icons & Email */}
          <div className="flex items-center gap-6 text-[#63b158] mr-12">
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Facebook size={20} style={{ color: '#63b158' }} /></a>
              <a href="#" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Instagram size={20} style={{ color: '#63b158' }} /></a>
              <a href="#" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Twitter size={20} style={{ color: '#63b158' }} /></a>
              <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
              <a href="mailto:info@corx.ae" className="flex items-center gap-2 hover:text-accent-color transition-colors font-bold text-sm tracking-wide" style={{ color: '#63b158' }}>
                <Mail size={18} style={{ color: '#63b158' }} /> info@corx.ae
              </a>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-secondary-color"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav (Vibrant Blue) */}
      <nav className="bg-[#08709d] text-white shadow-xl overflow-x-auto whitespace-nowrap hide-scrollbar border-t border-white/10 relative z-10">
        <div className="container flex justify-between items-center py-0">
          {/* Nav Links */}
          <ul className="flex items-center gap-8 h-16">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group h-full">
                <Link 
                  to={link.path} 
                  className="relative flex items-center h-full px-6 text-[13px] font-bold uppercase tracking-[0.05em] hover:text-white/90 transition-all gap-1.5 whitespace-nowrap"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-color transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
                
                {link.dropdown && (
                  <ul className="absolute top-full left-0 bg-white text-secondary-color shadow-[0_20px_50px_rgba(0,0,0,0.15)] py-3 min-w-[240px] opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50 border-t-[3px] border-accent-color rounded-b-xl">
                    {link.dropdown.map((sub) => (
                      <li key={sub.name}>
                        <Link 
                          to={sub.path} 
                          className="block px-6 py-3.5 text-[13px] font-bold uppercase tracking-wide hover:bg-gray-50 hover:text-primary-color transition-colors border-l-4 border-transparent hover:border-accent-color"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Right Section: Search, Call, Fax */}
          <div className="flex items-center gap-8 h-16">
            <button className="hover:text-accent-color transition-all hover:scale-110 h-full px-2">
              <Search size={18} strokeWidth={3} />
            </button>
            <div className="h-8 w-[1px] bg-white/20"></div>
            <motion.a 
              href="tel:+97143320776" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 font-bold text-[13px] uppercase tracking-widest text-white hover:text-accent-color transition-all group"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  repeatDelay: 3 
                }}
              >
                <Phone size={16} fill="currentColor" className="text-white group-hover:text-accent-color transition-colors" />
              </motion.div>
              CALL NOW
            </motion.a>
            <div className="h-8 w-[1px] bg-white/20"></div>
            <div className="flex items-center gap-2 font-bold text-[12px] uppercase tracking-widest opacity-80 bg-black/10 px-4 py-2 rounded-lg">
              <Printer size={16} className="text-accent-color" /> FAX: 614-882-4664
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide-out */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
            <img src={logo} alt="Logo" className="h-24 w-auto object-contain" />
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={32} className="text-secondary-color" />
            </button>
          </div>
          <div className="p-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.name} className="py-4 border-b border-gray-50 group">
                <Link 
                  to={link.path} 
                  className="text-[15px] font-bold text-secondary-color flex justify-between items-center uppercase tracking-wide group-hover:text-primary-color transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={18} className="opacity-50" />}
                </Link>
              </div>
            ))}
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex gap-6 justify-center text-secondary-color/70">
                <a href="#" className="hover:text-accent-color transition-colors"><Facebook size={24} /></a>
                <a href="#" className="hover:text-accent-color transition-colors"><Instagram size={24} /></a>
                <a href="#" className="hover:text-accent-color transition-colors"><Twitter size={24} /></a>
                <a href="mailto:info@corx.ae" className="hover:text-accent-color transition-colors"><Mail size={24} /></a>
              </div>
              <a href="tel:+97143320776" className="bg-primary-color text-white text-center py-4 rounded-2xl font-bold uppercase tracking-[0.1em] flex items-center justify-center gap-3 shadow-lg shadow-primary-color/20 hover:bg-secondary-color transition-all">
                <Phone size={20} fill="currentColor" /> Call Now
              </a>
              <div className="text-center font-bold text-gray-400 text-[11px] uppercase tracking-[0.2em]">
                FAX: 614-882-4664
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
