import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, ChevronDown, Facebook, Instagram, Twitter, 
  Printer, ArrowRight, Linkedin, User, ChevronRight, Activity, Droplets, 
  HeartPulse, Stethoscope, HeartHandshake, TestTube, Globe, Sparkles, CheckCircle2,
  Clock, Plus, MessageSquare, Home, Users, FileText, Calendar, Shield
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.webp';
import tollfree from '../assets/tollfree.png';
import { API_BASE_URL } from '../config/api';
import AddServiceModal from './AddServiceModal';

const ICON_MAP = {
  Activity,
  Droplets,
  HeartPulse,
  Stethoscope,
  HeartHandshake,
  TestTube,
  Globe,
  Sparkles,
  CheckCircle2,
  Clock,
  Shield
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  const renderIcon = (IconComp, size = 16, className = '') => {
    if (!IconComp) return <CheckCircle2 size={size} className={className} />;
    if (React.isValidElement(IconComp)) return IconComp;
    if (typeof IconComp === 'function' || (typeof IconComp === 'object' && IconComp.$$typeof)) {
      const Comp = IconComp;
      return <Comp size={size} className={className} />;
    }
    return <CheckCircle2 size={size} className={className} />;
  };

  const defaultServices = [
    { 
      name: 'Physiotherapy', 
      path: '/physiotherapy-at-home-in-dubai/',
      icon: Activity,
      subtitle: 'Rehabilitation & Pain Relief',
      badge: 'Popular',
      accent: '#63e8a0',
      subItems: [
        { name: 'Frozen Shoulder Therapy', path: '/frozen-shoulder-physiotherapy', desc: 'Adhesive capsulitis & shoulder joint rehab', icon: Activity },
        { name: 'Pediatric Physiotherapy', path: '/pediatric-physiotherapy', desc: 'Childhood motor milestone & movement therapy', icon: Users },
        { name: 'Joint Pain Treatment', path: '/joint-pain-treatment', desc: 'Non-invasive arthritis & joint pain relief', icon: HeartPulse },
        { name: 'Manual Therapy', path: '/manual-therapy', desc: 'Hands-on soft tissue & joint mobilization', icon: Sparkles },
      ]
    },
    { 
      name: 'IV Therapy | IV Drip', 
      path: '/iv-therapy', 
      icon: Droplets,
      subtitle: 'Vitamin Boost & Fast Hydration',
      badge: 'Fast Acting',
      accent: '#38bdf8'
    },
    { 
      name: 'Home Nursing', 
      path: '/home-nursing', 
      icon: HeartPulse,
      subtitle: 'Post-op & Specialized Care',
      accent: '#f43f5e',
      subItems: [
        { name: 'Palliative Care', path: '/palliative-care', desc: 'Compassionate long-term medical support', icon: HeartPulse },
        { name: 'Night Care Nurse', path: '/night-care-nurse', desc: '24/7 Dedicated overnight monitoring', icon: Clock },
        { name: 'Nurse for Injection', path: '/injection-at-home', desc: 'Safe at-home IV & medication care', icon: CheckCircle2 },
        { name: 'Wound Care Services', path: '/wound-care', desc: 'Clinical dressing & wound management', icon: Activity },
        { name: 'Oxygen Therapy', path: '/oxygen-therapy', desc: 'Respiratory care & equipment at home', icon: Droplets },
      ]
    },
    { 
      name: 'Doctor On Call', 
      path: '/doctor-on-call', 
      icon: Stethoscope,
      subtitle: '24/7 Medical Home & Hotel Visits',
      accent: '#fbbf24',
      subItems: [
        { name: 'Doctor at Home', path: '/doctor-at-home', desc: 'Urgent home visits within 30-45 mins', icon: Stethoscope },
        { name: 'Doctor at Office', path: '/doctor-at-office', desc: 'Workplace consultations & checkups', icon: Activity },
        { name: 'Doctor at Hotel', path: '/doctor-at-hotel', desc: 'Hotel room medical visits for guests', icon: Sparkles },
      ]
    },
    { 
      name: 'Elderly Home Care', 
      path: '/elderly-care', 
      icon: HeartHandshake,
      subtitle: 'Assisted Senior Living at Home',
      accent: '#a78bfa'
    },
    { 
      name: 'Lab Test at Home', 
      path: '/lab-test-at-home', 
      icon: TestTube,
      subtitle: 'Quick In-Home Sample Collection',
      accent: '#34d399'
    },
  ];

  const [servicesDropdown, setServicesDropdown] = useState(defaultServices);

  const fetchServices = () => {
    fetch(`${API_BASE_URL}/api/services/`)
      .then(res => {
        if (!res.ok) return null;
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const parents = data.filter(s => s.parent === null);
          const mapped = parents.map(s => {
            const rawSlug = (s.slug || '').toLowerCase();
            const isPhysio = rawSlug.includes('physio');
            const cPath = (s.custom_url_path && s.custom_url_path.trim()) ? s.custom_url_path.trim() : '';
            const formattedCPath = cPath ? (cPath.startsWith('/') ? cPath : `/${cPath}`) : '';
            const targetPath = formattedCPath || (isPhysio ? '/physiotherapy-at-home-in-dubai/' : (s.path || `/${s.slug}`));
            return {
              id: s.id,
              name: s.name || s.title,
              path: targetPath,
              icon: ICON_MAP[s.icon] || Activity,
              subtitle: s.subtitle || s.tagline || '',
              badge: s.floating_badge && s.floating_badge.title ? s.floating_badge.title : '',
              accent: s.accent || s.theme_color || '#08709d',
              subItems: (s.sub_services || []).map(sub => {
                const subCPath = (sub.custom_url_path && sub.custom_url_path.trim()) ? sub.custom_url_path.trim() : '';
                const formattedSubPath = subCPath ? (subCPath.startsWith('/') ? subCPath : `/${subCPath}`) : (sub.path || `/${sub.slug}`);
                return {
                  id: sub.id,
                  name: sub.name,
                  path: formattedSubPath.startsWith('/') ? formattedSubPath : `/${formattedSubPath}`,
                  icon: ICON_MAP[sub.icon] || CheckCircle2,
                  desc: sub.desc || ''
                };
              })
            };
          });

          const hasPhysio = mapped.some(m => (m.path && m.path.includes('physio')) || (m.name && m.name.toLowerCase().includes('physio')));
          if (!hasPhysio) {
            mapped.unshift(defaultServices[0]);
          }

          setServicesDropdown(mapped);
        }
      })
      .catch(err => console.log('Django API offline/error, using static default services navbar:', err));
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
    { name: 'Home', path: '/', icon: Home, accent: '#08709d' },
    { name: 'About us', path: '/about-us', icon: Users, accent: '#63b158' },
    { name: 'Our Team', path: '/team', icon: Stethoscope, accent: '#38bdf8' },
    { name: 'Blog', path: '/blog', icon: FileText, accent: '#a78bfa' },
    { 
      name: 'Services', 
      path: '/services',
      icon: Activity,
      accent: '#2ebd6e',
      dropdown: servicesDropdown
    },
    { name: 'Book Appointment', path: '/book-an-appointment', icon: Calendar, accent: '#f59e0b' },
    { name: 'Contact us', path: '/book-an-appointment', icon: Phone, accent: '#08709d' },

    { 
      name: 'Language', 
      path: '#',
      icon: Globe,
      accent: '#63b158',
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
              <img src={logo} alt="CORx Healthcare - 24/7 Home Healthcare Dubai" className="h-[80%] md:h-[90%] w-auto object-contain relative z-10" />
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
            <motion.div initial="hidden" animate="visible" className="flex justify-center flex-wrap gap-x-1.5 gap-y-0">
              {"24/7 PREMIUM HOME HEALTHCARE SERVICES IN DUBAI".split(" ").map((word, i) => (
                <div key={i} className="relative overflow-hidden py-0.5 px-0">
                  <motion.span
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: i * 0.1 } }
                    }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="inline-block font-['Montserrat'] font-black uppercase tracking-[0.05em] transition-colors duration-300 cursor-default"
                    style={{ color: '#2596be', fontSize: '11px' }}
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

          <div className="flex items-center gap-2 sm:gap-3 text-[#63b158] mr-2 sm:mr-4 md:mr-8">
            <a 
              href="tel:8002679" 
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#63b158] text-white text-[11px] font-extrabold uppercase shadow-sm tracking-wide shrink-0"
            >
              <Phone size={13} fill="currentColor" />
              <span>800 2679</span>
            </a>
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
                <img src={tollfree} alt="CORx Healthcare 24/7 Toll Free Helpline" className="h-12 md:h-16 w-auto object-contain" />
              </motion.a>
            </div>
            <button className="lg:hidden p-2 text-secondary-color" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav (Vibrant Blue with Premium Shadow and Gradient) */}
      <nav className="hidden lg:block bg-gradient-to-r from-[#065b80] via-[#08709d] to-[#0a86bd] text-white border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative z-10">
        <div className="container flex justify-between items-center py-0">
          <ul className="flex items-center gap-2.5 h-16">
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
                    className="group flex items-center h-full px-2.5 lg:px-3 xl:px-3.5 text-[15px] font-bold uppercase tracking-[0.05em] text-white hover:text-white/90 transition-all gap-1.5 whitespace-nowrap relative cursor-pointer"
                  >
                    <span className="relative py-1 flex items-center gap-1.5">
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-emerald-300' : 'text-white/70 group-hover:text-white'}`} />
                      <span className={`absolute bottom-0 left-[-4px] w-[calc(100%+8px)] h-[3px] bg-accent-color transform rounded-t-full transition-transform duration-300 origin-left ${activeDropdown === link.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </span>
                  </button>
                ) : (
                  <Link 
                    to={link.path} 
                    className="group flex items-center h-full px-2.5 lg:px-3 xl:px-3.5 text-[15px] font-bold uppercase tracking-[0.05em] text-white hover:text-white/90 transition-all gap-1.5 whitespace-nowrap relative"
                  >
                    <span className="relative py-1">
                      {link.name}
                      <span className="absolute bottom-0 left-[-4px] w-[calc(100%+8px)] h-[3px] bg-accent-color transform rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                  </Link>
                )}
                
                {/* Services Dropdown - Exact Dark Green Previous Design (#0c361d, rounded-[24px]) */}
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
                        <div className="flex flex-col gap-0.5 w-full">
                          <Link
                            to="/services"
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between w-full rounded-[18px] transition-all duration-200 text-[14px] font-black uppercase tracking-wider text-emerald-300 hover:text-white bg-white/12 hover:bg-white/20 py-3 px-6 mb-1 border border-emerald-400/20"
                          >
                            <span>All Services Overview</span>
                            <ArrowRight size={15} />
                          </Link>
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
                                  <Link 
                                    to={item.path}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      setOpenSubMenu(null);
                                    }}
                                    className={`flex items-center justify-between w-full rounded-[18px] transition-all duration-200 cursor-pointer text-[14px] font-semibold tracking-wide text-white/95 hover:text-white py-2 px-6 ${isSubOpen ? 'bg-white/12 shadow-sm' : 'hover:bg-white/10'}`}
                                  >
                                    <span>{item.name}</span>
                                    <ChevronRight size={15} className={`transition-all duration-200 ${isSubOpen ? 'translate-x-1 text-emerald-300 opacity-100' : 'text-white/60 group-hover/sub:text-white group-hover/sub:translate-x-0.5'}`} />
                                  </Link>
                                ) : (
                                  <Link
                                    to={item.path}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-center justify-between w-full rounded-[18px] transition-all duration-200 text-[14px] font-semibold tracking-wide text-white/95 hover:text-white hover:bg-white/10 py-2 px-6"
                                  >
                                    <span>{item.name}</span>
                                  </Link>
                                )}

                                {/* Matching Dark Green Sub-menu Flyout */}
                                {hasSubItems && isSubOpen && (
                                  <>
                                    {/* Transparent bridge to fill the gap between parent and flyout so mouse doesn't trigger onMouseLeave */}
                                    <div className="absolute top-0 h-full z-[109]" style={{ left: '100%', width: '14px' }} />
                                    <motion.div
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 10 }}
                                      transition={{ duration: 0.18 }}
                                      className="absolute top-0 left-full ml-3 bg-[#0c361d] rounded-[24px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] text-white z-[110]"
                                      style={{ padding: '24px', width: '310px' }}
                                    >
                                      <div className="flex flex-col gap-0.5 w-full">
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
                                            className="flex items-center w-full rounded-[16px] hover:bg-white/10 hover:translate-x-1 transition-all duration-200 text-[13px] font-semibold text-white/90 hover:text-white py-2 px-4"
                                          >
                                            <span>{sub.name}</span>
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Updated Language dropdown matching Services design */}
                {link.dropdown && link.name === 'Language' && (
                  <AnimatePresence>
                    {activeDropdown === 'Language' && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[calc(100%+8px)] right-0 z-[100] bg-[#0c361d] rounded-[24px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] text-white"
                        style={{ padding: '24px', width: '200px' }}
                      >
                        <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#63e8a0] border-b border-white/10 mb-1 flex items-center gap-1.5">
                          <Globe size={13} /> Select Language
                        </div>
                        {link.dropdown.map((lang) => (
                          <Link
                            key={lang.name}
                            to="#"
                            onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                            className="flex items-center justify-between w-full rounded-[18px] transition-all duration-200 text-[15.5px] font-semibold tracking-wide text-white/95 hover:text-white hover:bg-white/10 py-3.5 px-6"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{lang.flag}</span>
                              <span>{lang.name}</span>
                            </div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/70 uppercase">{lang.code}</span>
                          </Link>
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
          </div>
        </div>
      </nav>

      {/* Redesigned Premium Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#050b14]/75 backdrop-blur-md z-[120] lg:hidden"
            />

            {/* Sliding Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[88%] max-w-sm bg-white z-[130] lg:hidden shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-xs">
                <img src={logo} alt="CORx Healthcare Navigation Logo" className="h-12 w-auto object-contain" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
                  aria-label="Close Mobile Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Navigation Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
                {navLinks.map((link) => {
                  const LinkIcon = link.icon;
                  const isOpen = openDropdown === link.name;
                  return (
                    <div 
                      key={link.name} 
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isOpen ? 'border-[#08709d]/30 bg-slate-50/90 shadow-sm' : 'border-slate-100 bg-slate-50/40 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center p-3 sm:p-3.5">
                        <Link 
                          to={link.path} 
                          className="flex items-center gap-3 text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider hover:text-[#08709d] transition-colors flex-grow"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div 
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-xs"
                            style={{
                              backgroundColor: `${link.accent}15`,
                              borderColor: `${link.accent}30`,
                              color: link.accent
                            }}
                          >
                            <LinkIcon size={18} />
                          </div>
                          <span>{link.name}</span>
                        </Link>
                        {link.dropdown && (
                          <button 
                            onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors cursor-pointer"
                            aria-label={`Toggle ${link.name} Submenu`}
                          >
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#08709d]' : ''}`} />
                          </button>
                        )}
                      </div>

                      {/* Expanded Submenu Cards */}
                      {link.dropdown && isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-white border-t border-slate-100 p-3 space-y-2"
                        >
                          {link.dropdown.map((sub) => {
                            return (
                              <div key={sub.name} className="space-y-1">
                                <Link 
                                  to={sub.path}
                                  className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#08709d] hover:bg-slate-50 transition-all"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="flex items-center gap-2.5">
                                    {sub.flag ? (
                                      <span className="text-base">{sub.flag}</span>
                                    ) : (
                                      renderIcon(sub.icon, 16, "text-[#63b158]")
                                    )}
                                    <span>{sub.name}</span>
                                  </div>
                                  {sub.badge && (
                                    <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200 text-[10px] font-mono font-bold uppercase">
                                      {sub.badge}
                                    </span>
                                  )}
                                  {sub.code && (
                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                                      {sub.code}
                                    </span>
                                  )}
                                </Link>

                                {sub.subItems && (
                                  <div className="pl-8 pr-2 py-1 space-y-1 border-l-2 border-slate-100 ml-4">
                                    {sub.subItems.map((c) => (
                                      <Link
                                        key={c.name}
                                        to={c.path}
                                        className="text-[12px] font-semibold text-slate-500 hover:text-[#08709d] block py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors"
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
                  );
                })}
              </div>

              {/* Bottom Quick Action CTAs inside Drawer */}
              <div className="p-5 bg-white border-t border-slate-100 space-y-2.5 sticky bottom-0 z-20 shadow-[0_-10px_25px_rgba(0,0,0,0.05)]">
                <a 
                  href="tel:8002679" 
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#63b158] to-[#4fa044] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone size={15} fill="currentColor" />
                  <span>Call 24/7 Toll Free: 800 2679</span>
                </a>
                <a 
                  href="https://wa.me/971547033311" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#08709d] to-[#065679] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp: +971 54 703 3311</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
