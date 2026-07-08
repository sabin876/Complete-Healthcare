import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, ChevronDown, Facebook, Instagram, Twitter, Search, Printer, ArrowRight, Linkedin, User, Activity, Syringe, FlaskConical, Users, Heart } from 'lucide-react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.webp';
import tollfree from '../assets/tollfree.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('nav')) {
        setIsServicesOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const locations = Array(10).fill("Trusted Home healthcare services in Dubai");

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { 
      name: 'Services', 
      path: '#',
      dropdown: [
        { name: 'Physiotherapy', path: '/services/physiotherapy', hasArrow: true },
        { name: 'IV Therapy | IV Drip', path: '/services/iv-therapy', hasArrow: true },
        { name: 'Home Nursing', path: '/services/nursing', hasArrow: true, subItems: [
          { name: 'Palliative Care', path: '/services/palliative-care' },
          { name: 'Night Care Nurse', path: '/services/night-care-nurse' },
          { name: 'Nurse for Injection', path: '/services/injection-at-home' },
          { name: 'Wound Care Services', path: '/services/wound-care' },
          { name: 'Oxygen Therapy', path: '/services/oxygen-therapy' },
        ]},
        { name: 'Doctor On Call', path: '/services/doctor-on-call', hasArrow: true, subItems: [
          { name: 'Doctor at Home', path: '/services/doctor-at-home' },
          { name: 'Doctor at Office', path: '/services/doctor-at-office' },
          { name: 'Doctor at Hotel', path: '/services/doctor-at-hotel' },
        ]},
        { name: 'Elderly Home Care', path: '/services/elderly-care', hasArrow: false },
        { name: 'Lab Test at Home', path: '/services/lab-services', hasArrow: false },
      ]
    },
    { name: 'Book Appointment', path: '/contact' },
    { name: 'Contact us', path: '/contact' },
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
          <Link to="/" className="flex items-center h-full ml-2">
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
              <motion.div 
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "200%", opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 4, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] z-20 pointer-events-none"
              />
              <div className="absolute inset-0 bg-primary-color/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </Link>

          {/* Tagline */}
          <div className="hidden lg:block text-center flex-1 px-8">
            <motion.div initial="hidden" animate="visible" className="flex justify-center flex-wrap gap-x-[0.5em] gap-y-0">
              {"24/7 PREMIUM HOME HEALTHCARE SERVICES IN DUBAI".split(" ").map((word, i) => (
                <div key={i} className="relative overflow-hidden py-1 px-1">
                  <motion.span
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: i * 0.1 } }
                    }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="inline-block font-['Montserrat'] font-black uppercase tracking-[0.15em] transition-colors duration-300 cursor-default"
                    style={{ color: '#2596be', fontSize: '15px' }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </motion.div>
            <div className="relative h-[2px] w-32 mx-auto mt-1 overflow-hidden rounded-full bg-gray-100">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2596be]/50 to-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#63b158] mr-4 md:mr-8">
            <div className="hidden md:flex items-center gap-4">
              <a href="https://www.facebook.com/corxhealthcare" target="_blank" rel="noopener noreferrer" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Facebook size={20} style={{ color: '#63b158' }} /></a>
              <a href="https://www.instagram.com/corx_healthcare" target="_blank" rel="noopener noreferrer" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Instagram size={20} style={{ color: '#63b158' }} /></a>
              <a href="https://www.linkedin.com/company/corx-healthcare/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-color transition-all hover:-translate-y-0.5"><Linkedin size={20} style={{ color: '#63b158' }} /></a>
              <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
              <a href="mailto:info@corx.ae" className="flex items-center gap-2 hover:text-accent-color transition-colors font-bold text-sm tracking-wide" style={{ color: '#63b158' }}>
                <Mail size={18} style={{ color: '#63b158' }} /> info@corx.ae
              </a>
              <div className="h-8 w-[1px] bg-gray-200 ml-5 mr-2"></div>
              <a href="tel:8002679" className="hover:scale-105 transition-transform duration-200 ml-2">
                <img src={tollfree} alt="Toll Free" className="h-12 md:h-16 w-auto object-contain" />
              </a>
            </div>
            {/* Portal button always visible on mobile */}
            <Link
              to="/portal"
              className="lg:hidden flex items-center justify-center font-semibold text-[11px] uppercase tracking-wider green-shimmer-btn text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
              style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              PORTAL
            </Link>
            <button className="lg:hidden p-2 text-secondary-color" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav (Vibrant Blue) */}
      <nav className="hidden lg:block bg-[#08709d] text-white shadow-xl relative z-10">
        <div className="container flex justify-between items-center py-0">
          <ul className="flex items-center gap-8 h-16">
            {navLinks.map((link) => (
              <li key={link.name} className="relative h-full">
                {link.dropdown ? (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (link.name === 'Services') setIsServicesOpen(!isServicesOpen);
                    }}
                    className="relative flex items-center h-full px-6 text-[13px] font-bold uppercase tracking-[0.05em] text-white hover:text-white/90 transition-all gap-1.5 whitespace-nowrap"
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen && link.name === 'Services' ? 'rotate-180' : ''}`} />
                    <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-accent-color transform transition-transform duration-300 ${isServicesOpen && link.name === 'Services' ? 'scale-x-100' : 'scale-x-0'}`}></span>
                  </button>
                ) : (
                  <Link 
                    to={link.path} 
                    className="relative flex items-center h-full px-6 text-[13px] font-bold uppercase tracking-[0.05em] hover:text-white/90 transition-all gap-1.5 whitespace-nowrap"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-color transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                )}
                
                {link.dropdown && link.name === 'Services' && (
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-[35%] z-[100] w-[820px] bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-gray-150 p-6 mt-3 text-gray-800 flex gap-6"
                      >
                        {/* Column 1: Core Services */}
                        <div className="flex-1 flex flex-col gap-4">
                          <h4 className="text-[12px] font-extrabold uppercase tracking-widest text-[#08709d] border-b border-gray-100 pb-2">
                            Core Services
                          </h4>
                          <div className="flex flex-col gap-3">
                            <Link 
                              to="/services/physiotherapy"
                              onClick={() => setIsServicesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors shrink-0">
                                <Activity size={18} />
                              </div>
                              <div>
                                <div className="text-[14px] font-bold text-gray-900 group-hover:text-[#08709d] transition-colors">Physiotherapy</div>
                                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">At-home physical rehabilitation & therapy</p>
                              </div>
                            </Link>
                            
                            <Link 
                              to="/services/iv-therapy"
                              onClick={() => setIsServicesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors shrink-0">
                                <Syringe size={18} />
                              </div>
                              <div>
                                <div className="text-[14px] font-bold text-gray-900 group-hover:text-[#08709d] transition-colors">IV Therapy & Drip</div>
                                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Hydration & wellness drips at your place</p>
                              </div>
                            </Link>

                            <Link 
                              to="/services/lab-services"
                              onClick={() => setIsServicesOpen(false)}
                              className="group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors shrink-0">
                                <FlaskConical size={18} />
                              </div>
                              <div>
                                <div className="text-[14px] font-bold text-gray-900 group-hover:text-[#08709d] transition-colors">Lab Test at Home</div>
                                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Blood tests & samples collected at home</p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Column 2: Home Nursing */}
                        <div className="flex-1 flex flex-col gap-4">
                          <Link 
                            to="/services/nursing"
                            onClick={() => setIsServicesOpen(false)}
                            className="text-[12px] font-extrabold uppercase tracking-widest text-[#08709d] border-b border-gray-100 pb-2 hover:text-[#63b158] transition-colors flex items-center justify-between"
                          >
                            <span>Home Nursing</span>
                            <ArrowRight size={12} />
                          </Link>
                          <div className="flex flex-col gap-1">
                            <Link 
                              to="/services/palliative-care"
                              onClick={() => setIsServicesOpen(false)}
                              className="px-3 py-2.5 text-[13px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#08709d] hover:pl-4 transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              Palliative Care
                            </Link>
                            <Link 
                              to="/services/night-care-nurse"
                              onClick={() => setIsServicesOpen(false)}
                              className="px-3 py-2.5 text-[13px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#08709d] hover:pl-4 transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              Night Care Nurse
                            </Link>
                            <Link 
                              to="/services/injection-at-home"
                              onClick={() => setIsServicesOpen(false)}
                              className="px-3 py-2.5 text-[13px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#08709d] hover:pl-4 transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              Nurse for Injection
                            </Link>
                            <Link 
                              to="/services/wound-care"
                              onClick={() => setIsServicesOpen(false)}
                              className="px-3 py-2.5 text-[13px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#08709d] hover:pl-4 transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              Wound Care Services
                            </Link>
                            <Link 
                              to="/services/oxygen-therapy"
                              onClick={() => setIsServicesOpen(false)}
                              className="px-3 py-2.5 text-[13px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#08709d] hover:pl-4 transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              Oxygen Therapy
                            </Link>
                          </div>
                        </div>

                        {/* Column 3: Doctor On Call & Elderly Care */}
                        <div className="flex-1 flex flex-col gap-4">
                          <Link 
                            to="/services/doctor-on-call"
                            onClick={() => setIsServicesOpen(false)}
                            className="text-[12px] font-extrabold uppercase tracking-widest text-[#08709d] border-b border-gray-100 pb-2 hover:text-[#63b158] transition-colors flex items-center justify-between"
                          >
                            <span>Doctor On Call</span>
                            <ArrowRight size={12} />
                          </Link>
                          <div className="flex flex-col gap-1">
                            <Link 
                              to="/services/doctor-at-home"
                              onClick={() => setIsServicesOpen(false)}
                              className="px-3 py-2.5 text-[13px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#08709d] hover:pl-4 transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                              Doctor at Home
                            </Link>
                            <Link 
                              to="/services/doctor-at-office"
                              onClick={() => setIsServicesOpen(false)}
                              className="px-3 py-2.5 text-[13px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#08709d] hover:pl-4 transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                              Doctor at Office
                            </Link>
                            <Link 
                              to="/services/doctor-at-hotel"
                              onClick={() => setIsServicesOpen(false)}
                              className="px-3 py-2.5 text-[13px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#08709d] hover:pl-4 transition-all duration-200 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                              Doctor at Hotel
                            </Link>
                            
                            <div className="mt-4 pt-3 border-t border-gray-100">
                              <Link 
                                to="/services/elderly-care"
                                onClick={() => setIsServicesOpen(false)}
                                className="group flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200"
                              >
                                <div className="p-1.5 rounded bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors shrink-0">
                                  <Users size={16} />
                                </div>
                                <div>
                                  <div className="text-[13px] font-bold text-gray-900 group-hover:text-[#08709d] transition-colors">Elderly Home Care</div>
                                  <p className="text-[10px] text-gray-500 mt-0.5">Compassionate senior care</p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Column 4: 24/7 Dispatch Card */}
                        <div className="w-[200px] bg-gradient-to-br from-[#08709d] to-[#1681a5] text-white rounded-xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden shrink-0">
                          {/* Decorative pattern */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8 pointer-events-none"></div>
                          
                          <div className="relative z-10 flex flex-col gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                              <Heart size={20} className="text-white" />
                            </div>
                            <div>
                              <h5 className="font-extrabold text-[15px] leading-tight">Need Immediate Doctor?</h5>
                              <p className="text-[10px] text-white/80 mt-1.5 leading-normal">Our doctor will reach your home, office, or hotel in 30-45 minutes.</p>
                            </div>
                          </div>

                          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                            <div className="text-[9px] font-bold uppercase tracking-wider text-white/70">Call Toll Free</div>
                            <a 
                              href="tel:8002679"
                              className="flex items-center gap-1.5 font-black text-[18px] text-[#63e8a0] hover:text-white transition-colors"
                            >
                              <Phone size={14} fill="currentColor" />
                              800 2679
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-8 h-16">
            <button className="hover:text-accent-color transition-all hover:scale-110 h-full px-2">
              <Search size={18} strokeWidth={3} />
            </button>
            <div className="h-8 w-[1px] bg-white/20"></div>
            <motion.a 
              href="tel:+971547033311" 
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ scale: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
              className="flex items-center gap-2.5 font-bold text-[13px] uppercase tracking-widest text-white hover:text-accent-color transition-all group"
            >
              <motion.span
                animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, repeatDelay: 3 }}
                className="flex items-center"
              >
                <Phone size={16} fill="currentColor" />
              </motion.span>
              CALL NOW
            </motion.a>
            <div className="h-8 w-[1px] bg-white/20"></div>
            <Link 
              to="/portal"
              className="flex items-center justify-center font-semibold text-[12px] uppercase tracking-wider green-shimmer-btn text-white cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              PORTAL
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
            <img src={logo} alt="Logo" className="h-24 w-auto object-contain" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={32} className="text-secondary-color" />
            </button>
          </div>
          <div className="p-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.name} className="py-2 border-b border-gray-50 flex flex-col">
                <div className="flex justify-between items-center py-4 group">
                  <Link 
                    to={link.path} 
                    className="text-[15px] font-bold text-secondary-color uppercase tracking-wide group-hover:text-primary-color transition-colors flex-grow"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                      className="p-2 text-gray-400"
                    >
                      <ChevronDown size={20} className={`transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {link.dropdown && openDropdown === link.name && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden bg-gray-50/50 rounded-xl mb-4 py-2">
                    {link.dropdown.map((sub) => (
                      <div key={sub.name} className="flex flex-col">
                        {sub.subItems ? (
                          <>
                            <div className="flex justify-between items-center px-6 py-2">
                              <Link 
                                to={sub.path === '#' ? undefined : sub.path}
                                className="text-[13px] font-bold text-gray-700 uppercase tracking-wide hover:text-[#08709d] flex-grow"
                                onClick={() => { if (sub.path !== '#') { setIsMobileMenuOpen(false); setOpenSubMenu(null); } }}
                              >
                                {sub.name}
                              </Link>
                              <button 
                                onClick={() => setOpenSubMenu(openSubMenu === sub.name ? null : sub.name)}
                                className="p-2 text-gray-400 hover:text-[#08709d]"
                              >
                                <ChevronDown size={18} className={`transition-transform duration-300 ${openSubMenu === sub.name ? 'rotate-180 text-[#08709d]' : ''}`} />
                              </button>
                            </div>
                            {openSubMenu === sub.name && (
                              <div className="bg-gray-100/40 pl-4 py-1 flex flex-col">
                                {sub.subItems.map((child) => (
                                  <Link 
                                    key={child.name}
                                    to={child.path}
                                    className="block px-6 py-2.5 text-[12px] font-bold text-gray-500 uppercase tracking-wide hover:text-[#08709d]"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setOpenSubMenu(null);
                                    }}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link 
                            to={sub.path}
                            className="block px-6 py-3 text-[13px] font-bold text-gray-500 uppercase tracking-wide hover:text-[#08709d]"
                            onClick={() => { setIsMobileMenuOpen(false); setOpenSubMenu(null); }}
                          >
                            {sub.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
            <div className="mt-6">
              <Link
                to="/portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center font-semibold text-[13px] uppercase tracking-widest green-shimmer-btn text-white cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-md"
                style={{ padding: '12px 24px', borderRadius: '8px', border: 'none' }}
              >
                PORTAL
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
