import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Shield, Users, Heart, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Pill, Flower2, User, Brain, Stethoscope, Droplets, Activity, Clock, Award, Phone, HandHeart, UserCheck, ThumbsUp, ShieldPlus, Leaf, HeartHandshake, Building, Smile, Home as HomeIcon, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import partner1 from '../assets/our partner2.png';
import partner3 from '../assets/our partner 3.png';
import partner4 from '../assets/our partner 4.webp';
import partner5 from '../assets/our partner 5.png';
import partner6 from '../assets/our partner 6.png';
import partner7 from '../assets/our partner 7.png';
import partner8 from '../assets/our partner 8.png';
import hero1 from '../assets/hero/hero1.png';
import GoogleReviews from '../components/GoogleReviews';

import ExploreServices from '../components/ExploreServices';
import FAQ from '../components/FAQ';

import hero2 from '../assets/hero/hero2.png';
import hero3 from '../assets/hero/hero3.png';
import dhaLogo from '../assets/Dubai_Health_Authority_log.png';
import HealthCareBlogSection from '../components/HealthCareBlogSection';
import kajalPhoto from '../assets/kajal.png';
import { Calendar, GraduationCap, IdCard, MapPin } from 'lucide-react';


/* ── Testimonials Data & Components ────────────────── */
const testimonialsData = [
  { name: "Amber Basbagill", initial: "A", color: "#e87c2e", time: "a year ago", text: "Staff reassured me they listen to everything I needed to say I would definitely recommend this place.", rating: 5 },
  { name: "Mia Edwards", initial: "M", color: "#6b3fa0", time: "a year ago", text: "Their individualized approach made me feel seen and heard. I wasn't just another patient – they truly cared about my journey.", rating: 5 },
  { name: "Lucas Kelly", initial: "L", color: "#7a8fa6", time: "a year ago", text: "The detox program here is compassionate and effective. They prioritize patient safety and comfort every step of the way.", rating: 5 },
  { name: "Grace Phillips", initial: "G", color: "#8a9bac", time: "a year ago", text: "I appreciated how they customized my treatment plan to fit my specific challenges and goals. It made a huge difference.", rating: 5 },
  { name: "James Harmon", initial: "J", color: "#3a7bd5", time: "a year ago", text: "From the first call to my last appointment, every interaction was warm and professional. I felt like family here.", rating: 5 },
  { name: "Sandra Torres", initial: "S", color: "#c0392b", time: "2 years ago", text: "I cannot say enough good things. The staff truly went above and beyond to support my recovery journey every single day.", rating: 5 },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const StarRating = ({ count }) => (
  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < count ? "#f5a623" : "#ddd"}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 12, padding: "20px 20px 24px",
        boxShadow: hovered ? "0 12px 36px rgba(0,0,0,0.22)" : "0 4px 18px rgba(0,0,0,0.14)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: testimonial.color, color: "#fff", fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {testimonial.initial}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#2a52be", lineHeight: 1.2 }}>{testimonial.name}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{testimonial.time}</div>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <StarRating count={testimonial.rating} />
      <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.65, margin: 0 }}>{testimonial.text}</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const [visibleCount, setVisibleCount] = React.useState(4);
  const [startIndex, setStartIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const TOTAL_STEPS = Math.max(1, testimonialsData.length - visibleCount + 1);

  // Auto-advance every 3.5s, loops back to 0
  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setStartIndex(i => (i + 1) >= TOTAL_STEPS ? 0 : i + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < testimonialsData.length;
  const visible = testimonialsData.slice(startIndex, startIndex + visibleCount);

  const prev = () => setStartIndex(i => i <= 0 ? TOTAL_STEPS - 1 : i - 1);
  const next = () => setStartIndex(i => (i + 1) >= TOTAL_STEPS ? 0 : i + 1);

  return (
    <div
      style={{ width: "100%", maxWidth: 1100 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%" }}>
        {/* Prev */}
        <button
          onClick={prev}
          style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6" /></svg>
        </button>

        {/* Cards grid */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: `repeat(${visibleCount}, 1fr)`, gap: 16 }}>
          {visible.map((t) => <TestimonialCard key={t.name + startIndex} testimonial={t} />)}
        </div>

        {/* Next */}
        <button
          onClick={next}
          style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6" /></svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: 8, marginTop: 24, justifyContent: "center" }}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <button key={i} onClick={() => setStartIndex(i)} style={{ width: i === startIndex ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === startIndex ? "#fff" : "rgba(255,255,255,0.3)", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
        ))}
      </div>

      {/* Leave a Review */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <button
          style={{ padding: "14px 48px", background: "transparent", border: "2px solid rgba(255,255,255,0.6)", borderRadius: 50, color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Leave a Review
        </button>
      </div>
    </div>
  );
};
const Counter = ({ value, duration = 2, decimals = 0 }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const formatted = latest.toFixed(decimals);
    if (decimals === 0) {
      return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return formatted;
  });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: "easeOut" });
    }
  }, [isInView, count, value, duration]);

  return <motion.span ref={nodeRef}>{rounded}</motion.span>;
};

const doctorsData = [
  {
    name: "Kajal Jaiswal",
    specialty: "Healthcare Assistant",
    department: "Gynaecology Department",
    nmcNo: "17070",
    degree: "Diploma in Healthcare Support",
    image: kajalPhoto
  },
  {
    name: "Marisel Vi.R",
    specialty: "Assistant Nurse",
    department: "ENT Department",
    nmcNo: "7768",
    degree: "Diploma in Nursing",
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Jaya Kumari",
    specialty: "Physiotherapist",
    department: "Orthopedic Department",
    nmcNo: "21749",
    degree: "DHA Certified Physiotherapist",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Pradeep Adhikari",
    specialty: "Consultant Pediatrician",
    department: "Paediatric & Neonatology",
    nmcNo: "12903",
    degree: "MBBS, MD (Pediatrics)",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Ramesh Koirala",
    specialty: "Consultant Neurologist",
    department: "Neurology Department",
    nmcNo: "6754",
    degree: "MBBS, MD, DM (Neurology)",
    image: "https://images.unsplash.com/photo-1605684954278-9f17d2673d34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Sabina Shrestha",
    specialty: "Consultant Psychiatrist",
    department: "Psychiatry Department",
    nmcNo: "14210",
    degree: "MBBS, MD (Psychiatry)",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Binod Singh",
    specialty: "Consultant Surgeon",
    department: "Surgery Department",
    nmcNo: "8945",
    degree: "MBBS, MS (Surgery)",
    image: "https://images.unsplash.com/photo-1582750433449-6493b2063346?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Smriti KC",
    specialty: "Medical Officer",
    department: "Medical Officer",
    nmcNo: "20956",
    degree: "MBBS",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];

const departments = [
  "All",
  "ENT Department",
  "Gynaecology Department",
  "Internal Medicine",
  "Neurology Department",
  "Orthopedic Department",
  "Pathology Department",
  "Paediatric & Neonatology",
  "Psychiatry Department",
  "Surgery Department",
  "Ophthalmology Department",
  "OT Department",
  "Gastroenterology Department",
  "Dental Department",
  "Radiology Department",
  "Medical Officer"
];

const Home = () => {
  const slides = [
    {
      badgeNode: (
        <span className="flex items-center gap-2">
          <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
          <span className="text-white/95">Trusted by</span>
          <span className="text-[#2ebd6e] font-black">5,00,000+</span>
          <span className="text-white/95">Happy Patients</span>
        </span>
      ),
      titlePre: "Your Health is Our ",
      titleHighlight: "Priority",
      titlePost: "",
      subtitle: "Providing quality healthcare services with compassion and excellence. Your trusted partner in health and wellness.",
      image: hero1,
      cta1: "Book Appointment",
      cta2: "Our Services"
    },
    {
      badgeNode: (
        <span className="flex items-center gap-2">
          <Shield size={16} className="text-[#2ebd6e] fill-[#2ebd6e]/10" />
          <span className="text-white/95">Licensed by</span>
          <span className="text-[#2ebd6e] font-black">DHA Dubai</span>
          <span className="text-white/95">Authority</span>
        </span>
      ),
      titlePre: "Clinical Excellence ",
      titleHighlight: "At Home",
      titlePost: "",
      subtitle: "DHA licensed healthcare provider in Dubai. Full-service home nursing, doctor-on-call, and expert therapy at your convenience.",
      image: hero2,
      cta1: "Book Appointment",
      cta2: "Our Services"
    },
    {
      badgeNode: (
        <span className="flex items-center gap-2">
          <Users size={16} className="text-[#2ebd6e] fill-[#2ebd6e]/10" />
          <span className="text-white/95">Expert Medical</span>
          <span className="text-[#2ebd6e] font-black">Specialists</span>
          <span className="text-white/95">On Call</span>
        </span>
      ),
      titlePre: "Professional Care ",
      titleHighlight: "At Your Doorstep",
      titlePost: "",
      subtitle: "Our team of dedicated doctors, nursing professionals, and physiotherapists are committed to your health 24/7.",
      image: hero3,
      cta1: "Book Appointment",
      cta2: "Our Services"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredDoctors = selectedDept === "All"
    ? doctorsData
    : doctorsData.filter(doc => doc.department === selectedDept);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);



  return (
    <main>
      {/* Hero Slider */}
      <section className="relative min-h-[95vh] flex items-center py-20 md:py-28 overflow-hidden bg-black">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].titlePre + slides[currentSlide].titleHighlight + slides[currentSlide].titlePost}
              className="w-full h-full object-cover brightness-[0.4] contrast-[1.05]"
            />
            {/* Deep Blue Overlay matching the reference design */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c2e56]/95 via-[#0b2848]/85 to-[#071f3b]/95 mix-blend-multiply"></div>
            {/* Soft dark vignettes */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="container relative z-10 text-white">
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-4xl text-left relative top-[-35px] md:top-[-80px]"
            >
              {/* Badge matching Reference Design */}
              <div 
                className="inline-flex items-center text-xs md:text-sm font-semibold tracking-wider mb-3 shadow-md text-white"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '6px 16px',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {slides[currentSlide].badgeNode}
              </div>

              {/* Title matching Reference Design */}
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.15] mb-6 !text-white tracking-tight">
                {slides[currentSlide].titlePre}
                <span className="text-[#2ebd6e] font-black">
                  {slides[currentSlide].titleHighlight}
                </span>
                {slides[currentSlide].titlePost}
              </h1>

              {/* Subtitle matching Reference Design */}
              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl font-normal drop-shadow-sm">
                {slides[currentSlide].subtitle}
              </p>

              {/* Action Buttons matching Reference Design */}
              <div className="flex flex-wrap gap-4 mt-6">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 hover:scale-[1.02] text-white font-semibold text-base transition-all duration-200 cursor-pointer shadow-md"
                  style={{
                    backgroundColor: '#004e92',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                  }}
                >
                  <CalendarDays size={20} />
                  {slides[currentSlide].cta1}
                </Link>

                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 hover:scale-[1.02] text-white font-semibold text-base transition-all duration-200 cursor-pointer hover:bg-white/10"
                  style={{
                    backgroundColor: 'transparent',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: '1px solid #ffffff',
                  }}
                >
                  <Stethoscope size={20} />
                  {slides[currentSlide].cta2}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Separator Divider Line matching Reference Design */}
          <div className="w-full h-[1px] bg-white/15 my-8"></div>

          {/* Stats Bar matching Reference Design (Animated & Spaced) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 text-left"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 120, damping: 14 } 
                }
              }}
            >
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-none">
                <Counter value={2546} duration={2} />+
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-medium mt-1">Successful Homecare</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 120, damping: 14 } 
                }
              }}
            >
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-none">
                <Counter value={1.5} duration={2} decimals={1} />M+
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-medium mt-1">Happy Patients</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 120, damping: 14 } 
                }
              }}
            >
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-none">
                <Counter value={15} duration={2} />+
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-medium mt-1">Years Experience</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 120, damping: 14 } 
                }
              }}
            >
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-none">
                <Counter value={120} duration={2} />+
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-medium mt-1">Professional</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Side Absolute Carousel Controls matching Reference Design */}
        <button 
          onClick={prevSlide} 
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/10 hover:scale-110 active:scale-95 shadow-2xl hidden md:flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/10 hover:scale-110 active:scale-95 shadow-2xl hidden md:flex items-center justify-center cursor-pointer"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>

        {/* Slide Indicators matching Reference Design */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`h-2 transition-all duration-300 rounded-full ${i === currentSlide ? 'w-8 bg-[#2ebd6e] shadow-[0_0_8px_rgba(46,189,110,0.5)]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Explore Services Section */}
      <ExploreServices />

      {/* Community Voice / Featured Section */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #08709d 0%, #1a294a 100%)', 
          padding: '40px 0' 
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-accent-color rounded-full blur-[100px]"
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

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white"
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
                Call Us at <a href="tel:+97143320776" className="text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity">+971 4 332 0776</a> or WhatsApp Us at <a href="https://wa.me/97143320776" target="_blank" rel="noopener noreferrer" className="text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity">+971 4 332 0776</a> for doctor on call service.
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
                {/* Shine Animation Effect */}
                <motion.div 
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-secondary-color/5 to-transparent -skew-x-12 z-0"
                />
                <span className="relative z-10">DOWNLOAD PROFILE</span>
                <ArrowRight size={18} className="relative z-10" />
              </a>
              {/* Button Glow Shadow */}
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The CHC Difference Section */}
      <section 
        className="relative overflow-hidden"
        style={{ backgroundColor: '#f8f9fa', padding: '100px 0' }}
      >
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                <motion.h2 
                  variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
                  className="text-3xl md:text-4xl font-black mb-10 text-secondary-color tracking-tight"
                >
                  The CHC Difference
                </motion.h2>
                
                <div className="space-y-10 mb-10">
                  {[
                    { icon: <HandHeart size={32} />, title: "Patient-Centric Care", desc: "We prioritize the needs and preferences of our patients, ensuring they receive personalized care that meets their unique requirements." },
                    { icon: <UserCheck size={32} />, title: "Expert Medical Team", desc: "Our team of highly skilled and experienced healthcare professionals is dedicated to providing the highest quality of care." },
                    { icon: <ThumbsUp size={32} />, title: "Compassionate Approach", desc: "We believe in treating our patients with empathy, ensuring they feel supported throughout their healthcare journey." },
                    { icon: <Clock size={32} />, title: "24/7 Support", desc: "Providing expert medical assistance 24 hours a day, 365 days a year, with same-day appointments available." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                      className="flex gap-6 group"
                    >
                      <div className="shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-color group-hover:bg-primary-color group-hover:text-white transition-all duration-300 border border-gray-100">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1.5 text-secondary-color">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-[15px] font-medium">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
 
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ 
                    y: [0, -6, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="mt-10 relative group inline-block"
                >
                  <Link 
                    to="/contact" 
                    className="relative overflow-hidden border-2 border-primary-color text-primary-color rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 flex items-center gap-3 z-10 hover:bg-primary-color hover:text-white shadow-lg hover:shadow-primary-color/20"
                    style={{ padding: '18px 45px' }}
                  >
                    {/* Shine Animation Effect */}
                    <motion.div 
                      animate={{ left: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-primary-color/10 to-transparent -skew-x-12 z-0"
                    />
                    <span className="relative z-10">Schedule An Appointment</span>
                    <ArrowRight size={18} className="relative z-10" />
                  </Link>
                  {/* Button Glow Shadow */}
                  <div className="absolute inset-0 bg-primary-color/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </motion.div>


              </motion.div>
            </div>

            {/* Right Image (Floating Card Style) */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-[30px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-[8px] border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="CHC Healthcare Professionals" 
                    className="w-full h-full object-cover min-h-[450px]"
                  />
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-white py-5 px-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-50"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#5fb54a]/10 flex items-center justify-center text-[#5fb54a]">
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-secondary-color">15+</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Years Experience</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* <GoogleReviews /> */}



      {/* Testimonials Section */}
      <section style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: "linear-gradient(135deg, #2c3e8c 0%, #1a2a6c 50%, #23379b 100%)",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>
            Testimonials
          </h2>
          <p style={{ color: "rgba(255,255,255,0.68)", fontSize: 15, marginBottom: 24, textAlign: "center", letterSpacing: "0.02em" }}>
            See what people are saying about Complete Healthcare
          </p>
          <TestimonialsSection />
        </div>
      </section>

      {/* Partners Section – Infinite Marquee */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />

        <div className="container relative z-10 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-black text-secondary-color uppercase tracking-widest text-center"
          >
            Our Partners
          </motion.h2>
        </div>

        {/* Marquee track */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16 w-max"
            whileHover={{ animationPlayState: "paused" }}
          >
            {/* Doubled list for seamless loop */}
            {[partner1, partner3, partner4, partner5, partner6, partner7, partner8,
              partner1, partner3, partner4, partner5, partner6, partner7, partner8].map((imgSrc, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.12, filter: "grayscale(0%) drop-shadow(0 8px 20px rgba(8,112,157,0.25))" }}
                className="w-32 md:w-40 lg:w-44 flex-shrink-0 transition-all duration-300"
                style={{ filter: "grayscale(60%)", opacity: 0.8 }}
              >
                <img src={imgSrc} alt={`Partner ${(index % 7) + 1}`} className="w-full h-auto object-contain" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <HealthCareBlogSection />

      <FAQ />

    </main>
  );
};

export default Home;
