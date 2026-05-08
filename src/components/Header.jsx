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
      <div className="bg-[#5eb63b] text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
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
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity h-full">
            <img src={logo} alt="COMPLETE HEALTHCARE" className="h-[80%] md:h-[90%] w-auto object-contain" />
          </Link>

          {/* Tagline (Center - Hidden on Mobile) */}
          <div className="hidden lg:block text-center flex-1 px-8">
            <div className="overflow-hidden py-1">
              <motion.div
                initial="hidden"
                animate="visible"
                className="flex justify-center flex-wrap gap-[0.3em]"
              >
                {"24/7 PREMIUM HOME HEALTHCARE SERVICES IN DUBAI".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="inline-block font-['Montserrat'] font-normal uppercase tracking-[0.1em] hover:text-[#08709d] transition-colors duration-500 cursor-default"
                    style={{ 
                      color: 'rgb(68, 68, 68)', 
                      fontSize: '16px', 
                      lineHeight: '26px',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Social Icons & Email */}
          <div className="flex items-center gap-10 text-[#2596be]">
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Facebook size={20} /></a>
              <a href="#" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Twitter size={20} /></a>
              <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
              <a href="mailto:info@corx.ae" className="flex items-center gap-2 hover:text-accent-color transition-colors font-bold text-sm tracking-wide">
                <Mail size={18} className="text-[#2596be]" /> info@corx.ae
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
            <a href="tel:+97143320776" className="flex items-center gap-2.5 font-bold text-[13px] uppercase tracking-widest text-white hover:text-accent-color transition-all">
              <Phone size={16} fill="currentColor" className="text-white" /> CALL NOW
            </a>
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
