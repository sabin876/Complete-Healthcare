import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, ChevronDown, Facebook, Instagram, Twitter, 
  Printer, ArrowRight, Linkedin, User, ChevronRight, Activity, Droplets, 
  HeartPulse, Stethoscope, HeartHandshake, TestTube, Globe, Sparkles, CheckCircle2 
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.webp';
import tollfree from '../assets/tollfree.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('nav')) {
        setActiveDropdown(null);
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
        { 
          name: 'Physiotherapy', 
          path: '/physiotherapy-at-home-in-dubai', 
          icon: Activity,
          subtitle: 'Rehabilitation & Pain Relief',
          badge: 'Popular',
          accent: '#63e8a0'
        },
        { 
          name: 'IV Therapy | IV Drip', 
          path: '/iv-therapy-iv-drip-at-home-in-dubai', 
          icon: Droplets,
          subtitle: 'Vitamin Boost & Fast Hydration',
          badge: 'Fast Acting',
          accent: '#38bdf8'
        },
        { 
          name: 'Home Nursing', 
          path: '/home-nursing-service-in-dubai', 
          icon: HeartPulse,
          subtitle: 'Post-op & Specialized Care',
          accent: '#f43f5e',
          subItems: [
            { name: 'Palliative Care', path: '/services/palliative-care', desc: 'Compassionate long-term medical support' },
            { name: 'Night Care Nurse', path: '/services/night-care-nurse', desc: '24/7 Dedicated overnight monitoring' },
            { name: 'Nurse for Injection', path: '/services/injection-at-home', desc: 'Safe at-home IV & medication care' },
            { name: 'Wound Care Services', path: '/services/wound-care', desc: 'Clinical dressing & wound management' },
            { name: 'Oxygen Therapy', path: '/services/oxygen-therapy', desc: 'Respiratory care & equipment at home' },
          ]
        },
        { 
          name: 'Doctor On Call', 
          path: '/doctor-on-call-in-dubai', 
          icon: Stethoscope,
          subtitle: '24/7 Medical Home & Hotel Visits',
          accent: '#fbbf24',
          subItems: [
            { name: 'Doctor at Home', path: '/services/doctor-at-home', desc: 'Urgent home visits within 30-45 mins' },
            { name: 'Doctor at Office', path: '/services/doctor-at-office', desc: 'Workplace consultations & checkups' },
            { name: 'Doctor at Hotel', path: '/services/doctor-at-hotel', desc: 'Hotel room medical visits for guests' },
          ]
        },
        { 
          name: 'Elderly Home Care', 
          path: '/elderly-care-service-at-home-in-dubai', 
          icon: HeartHandshake,
          subtitle: 'Assisted Senior Living at Home',
          accent: '#a78bfa'
        },
        { 
          name: 'Lab Test at Home', 
          path: '/lab-test-at-home-dubai', 
          icon: TestTube,
          subtitle: 'Quick In-Home Sample Collection',
          accent: '#34d399'
        },
      ]
    },
    { name: 'Book Appointment', path: '/contact' },
    { name: 'Contact us', path: '/contact' },
    { name: 'Blog', path: '#' },
    { 
      name: 'Language', 
      path: '#',
      dropdown: [
        { name: 'English', path: '#', code: 'EN', flag: '🇬🇧' },
        { name: 'Arabic', path: '#', code: 'AR', flag: '🇦🇪' },
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
              <motion.a 
                href="tel:8002679"
                animate={{
                  scale: [1, 1.04, 1],
                  rotate: [0, -2, 2, -2, 2, 0],
                  filter: [
                    "drop-shadow(0 2px 4px rgba(99, 177, 88, 0.15))",
                    "drop-shadow(0 4px 12px rgba(99, 177, 88, 0.45))",
                    "drop-shadow(0 2px 4px rgba(99, 177, 88, 0.15))"
                  ]
                }}
                transition={{
                  scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 1.5, repeatDelay: 3.5, ease: "easeInOut" },
                  filter: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
                className="block ml-2 cursor-pointer"
              >
                <img src={tollfree} alt="Toll Free" className="h-12 md:h-16 w-auto object-contain" />
              </motion.a>
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

      {/* Main Nav (Vibrant Blue with Premium Shadow and Gradient) */}
      <nav className="hidden lg:block bg-gradient-to-r from-[#065b80] via-[#08709d] to-[#0a86bd] text-white border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative z-10">
        <div className="container flex justify-between items-center py-0">
          <ul className="flex items-center gap-6 h-16">
            {navLinks.map((link) => (
              <li 
                key={link.name} 
                className="relative h-full"
                onMouseEnter={() => {
                  if (link.dropdown) setActiveDropdown(link.name);
                }}
                onMouseLeave={() => {
                  if (link.dropdown) {
                    setActiveDropdown(null);
                    setOpenSubMenu(null);
                  }
                }}
              >
                {link.dropdown ? (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === link.name ? null : link.name);
                    }}
                    className="group flex items-center h-full px-5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white hover:text-white/90 transition-all gap-1.5 whitespace-nowrap relative cursor-pointer"
                  >
                    <span className="relative py-1 flex items-center gap-1.5">
                      {link.name}
                      <ChevronDown size={13} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-emerald-300' : 'text-white/70 group-hover:text-white'}`} />
                      <span className={`absolute bottom-0 left-[-4px] w-[calc(100%+8px)] h-[3px] bg-accent-color transform rounded-t-full transition-transform duration-300 origin-left ${activeDropdown === link.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </span>
                  </button>
                ) : (
                  <Link 
                    to={link.path} 
                    className="group flex items-center h-full px-5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white hover:text-white/90 transition-all gap-1.5 whitespace-nowrap relative"
                  >
                    <span className="relative py-1">
                      {link.name}
                      <span className="absolute bottom-0 left-[-4px] w-[calc(100%+8px)] h-[3px] bg-accent-color transform rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                  </Link>
                )}
                
                {/* Services Dropdown - Exact Dark Green Screenshot Design (#0c361d, rounded-[24px]) */}
                {link.dropdown && link.name === 'Services' && (
                  <AnimatePresence>
                    {activeDropdown === 'Services' && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="absolute top-[calc(100%+8px)] left-0 z-[100] bg-[#0c361d] rounded-[24px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] text-white"
                        style={{ padding: '24px', width: '360px' }}
                      >
                        <div className="flex flex-col gap-2 w-full">
                          {link.dropdown.map((item) => {
                            const hasSubItems = item.subItems && item.subItems.length > 0;
                            const isSubOpen = openSubMenu === item.name;
                            return (
                              <div
                                key={item.name}
                                className="relative group/sub w-full"
                                onMouseEnter={() => {
                                  if (hasSubItems) setOpenSubMenu(item.name);
                                }}
                                onMouseLeave={() => {
                                  if (hasSubItems) setOpenSubMenu(null);
                                }}
                              >
                                {hasSubItems ? (
                                  <div 
                                    className={`flex items-center justify-between w-full rounded-[18px] transition-all duration-200 cursor-pointer text-[15.5px] font-semibold tracking-wide text-white/95 hover:text-white py-3.5 px-6 ${isSubOpen ? 'bg-white/12 shadow-sm' : 'hover:bg-white/10'}`}
                                  >
                                    <span>{item.name}</span>
                                    <ChevronRight size={15} className={`transition-all duration-200 ${isSubOpen ? 'translate-x-1 text-emerald-300 opacity-100' : 'text-white/60 group-hover/sub:text-white group-hover/sub:translate-x-0.5'}`} />
                                  </div>
                                ) : (
                                  <Link
                                    to={item.path}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-center justify-between w-full rounded-[18px] transition-all duration-200 text-[15.5px] font-semibold tracking-wide text-white/95 hover:text-white hover:bg-white/10 py-3.5 px-6"
                                  >
                                    <span>{item.name}</span>
                                  </Link>
                                )}

                                {/* Matching Dark Green Sub-menu Flyout */}
                                {hasSubItems && isSubOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute top-0 left-full ml-3 bg-[#0c361d] rounded-[24px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] text-white z-[110]"
                                    style={{ padding: '24px', width: '310px' }}
                                  >
                                    <div className="flex flex-col gap-2 w-full">
                                      <Link
                                        to={item.path}
                                        onClick={() => {
                                          setActiveDropdown(null);
                                          setOpenSubMenu(null);
                                        }}
                                        className="flex items-center w-full rounded-[16px] hover:bg-white/10 transition-all duration-200 text-[13px] font-bold text-emerald-300 uppercase tracking-wider py-2.5 px-4 mb-1 border-b border-white/10"
                                      >
                                        <span>View All {item.name}</span>
                                      </Link>
                                      {item.subItems.map((sub) => (
                                        <Link
                                          key={sub.name}
                                          to={sub.path}
                                          onClick={() => {
                                            setActiveDropdown(null);
                                            setOpenSubMenu(null);
                                          }}
                                          className="flex items-center w-full rounded-[16px] hover:bg-white/10 hover:translate-x-1 transition-all duration-200 text-[14.5px] font-semibold text-white/90 hover:text-white py-3 px-4"
                                        >
                                          <span>{sub.name}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Compact Dropdown for Language or general lists */}
                {link.dropdown && link.name === 'Language' && (
                  <AnimatePresence>
                    {activeDropdown === 'Language' && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[calc(100%-2px)] right-0 z-[100] min-w-[180px] p-2 bg-[#052d47] backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] mt-1.5"
                      >
                        <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#63e8a0] border-b border-white/10 mb-1 flex items-center gap-1.5">
                          <Globe size={13} /> Select Language
                        </div>
                        {link.dropdown.map((lang) => (
                          <a
                            key={lang.name}
                            href="#"
                            onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{lang.flag}</span>
                              <span>{lang.name}</span>
                            </div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/70 uppercase">
                              {lang.code}
                            </span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-8 h-16">
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
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden bg-gray-50/70 rounded-2xl p-2 mb-4 flex flex-col gap-1">
                    {link.dropdown.map((sub) => {
                      const SubIcon = sub.icon || CheckCircle2;
                      return (
                        <div key={sub.name} className="flex flex-col">
                          <Link 
                            to={sub.path}
                            className="flex items-center gap-3 px-4 py-3 text-[13.5px] font-bold text-gray-700 hover:text-primary-color rounded-xl hover:bg-white transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <SubIcon size={16} className="text-[#63b158]" />
                            <span>{sub.name}</span>
                          </Link>
                          {sub.subItems && (
                            <div className="pl-9 pr-2 py-1 flex flex-col gap-1">
                              {sub.subItems.map((c) => (
                                <Link
                                  key={c.name}
                                  to={c.path}
                                  className="text-[12.5px] font-medium text-gray-500 hover:text-primary-color py-1 px-2 rounded hover:bg-gray-100/60"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  • {c.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
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
