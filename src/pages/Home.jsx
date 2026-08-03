import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Shield, Users, Heart, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Pill, Flower2, User, Brain, Stethoscope, Droplets, Activity, Clock, Award, Phone, HandHeart, UserCheck, ThumbsUp, ShieldPlus, Leaf, HeartHandshake, Building, Smile, Home as HomeIcon, CalendarDays, Play, X } from 'lucide-react';
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
import ThreeStepsProcessSection from '../components/ThreeStepsProcessSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

import hero2 from '../assets/hero/hero2.png';
import hero3 from '../assets/hero/hero3.png';
import dhaLogo from '../assets/Dubai_Health_Authority_log.png';
import logo from '../assets/logo.webp';
import kajalPhoto from '../assets/kajal.png';

import { Calendar, GraduationCap, IdCard, MapPin } from 'lucide-react';

// New static team image imports
import bharatPhoto from '../assets/Bharat.png';
import hastiPhoto from '../assets/Hasti.png';
import jasmeenPhoto from '../assets/Jasmeen.png';
import jotiAshokPhoto from '../assets/Joti Ashok.png';
import manjuPhoto from '../assets/Manju.png';
import nimeshkaPhoto from '../assets/Nimeshka .png';
import nirmalaPhoto from '../assets/Nirmala .png';
import noreliePhoto from '../assets/Norelie.png';
import santoshiPhoto from '../assets/Santoshi.png';
import vaishaliPhoto from '../assets/Vaishali.png';
import farooqPhoto from '../assets/farooq.png';
import mamataPhoto from '../assets/mamata.png';
import mariselviPhoto from '../assets/mariselvi .png';
import shwetaRakeshPhoto from '../assets/shweta Rakesh .png';
import shwetaPhoto from '../assets/shweta.png';
import suneelPhoto from '../assets/suneel.png';

// Newly added team images
import chandaPhoto from '../assets/Chanda Kumari.png';
import dipeshPhoto from '../assets/Dipesh.png';
import jayaKumariPhoto from '../assets/Jaya Kumari .png';
import lakshmiPhoto from '../assets/Lakshmi Sundar .png';
import mariecrisPhoto from '../assets/Mariecris Godinez.png';
import manasaPhoto from '../assets/manasa Vadde.png';
import sajiniPhoto from '../assets/sajini Babu.png';
import vinayataPhoto from '../assets/vinayata m .png';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import aboutUsBg from '../assets/About us .jpg';



/* ── Testimonials Data & Components ────────────────── */
const testimonialsData = [
  { name: "Beata Hilger", initial: "B", color: "#e87c2e", time: "a month ago", text: "Outstanding and respectful care for my grandfather in Dubai. The nurses were well-trained, punctual, and extremely patient throughout his recovery.", rating: 5 },
  { name: "Tariq Al-Maktoum", initial: "T", color: "#3a7bd5", time: "2 months ago", text: "Called CORx Healthcare for Doctor on Call at our hotel in Dubai. The DHA licensed doctor arrived in under 30 minutes! Truly impressive 24/7 service.", rating: 5 },
  { name: "Sarah Jenkins", initial: "S", color: "#6b3fa0", time: "3 months ago", text: "Extremely professional home nursing and IV drip therapy. The nurse was very gentle, knowledgeable, and caring. Highly recommended in Dubai!", rating: 5 },
  { name: "Dr. Ahmed Al-Rashid", initial: "A", color: "#2596be", time: "4 months ago", text: "Excellent home physiotherapy service for post-op knee recovery. The therapist was punctual and built a personalized rehab routine that worked wonders.", rating: 5 },
  { name: "Fatima Al-Zahra", initial: "F", color: "#63b158", time: "5 months ago", text: "Quick and painless home lab sample collection in Dubai. Results were sent digitally within 3 hours. Will definitely use CORx Healthcare again!", rating: 5 },
  { name: "Marcus Vance", initial: "M", color: "#c0392b", time: "6 months ago", text: "Top quality elderly home care. The caregiver cared for my mother like family with complete dedication and respect. Thank you CORx Healthcare!", rating: 5 },
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
        background: "#ffffff", 
        borderRadius: 16, 
        padding: "26px 24px 28px",
        minHeight: "220px",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.22)" : "0 6px 24px rgba(0,0,0,0.12)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex", 
        flexDirection: "column",
        justifyContent: "between",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: testimonial.color, color: "#fff", fontWeight: 700, fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {testimonial.initial}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15.5, color: "#08709d", lineHeight: 1.25 }}>{testimonial.name}</div>
              <div style={{ fontSize: 12.5, color: "#777", marginTop: 3 }}>{testimonial.time}</div>
            </div>
          </div>
          <GoogleIcon />
        </div>
        <StarRating count={testimonial.rating} />
        <p style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.65, margin: 0, fontWeight: 500 }}>{testimonial.text}</p>
      </div>
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
      style={{ width: "100%", maxWidth: 1280 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20, width: "100%" }}>
        {/* Prev */}
        <button
          onClick={prev}
          style={{ flexShrink: 0, width: 46, height: 46, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6" /></svg>
        </button>

        {/* Cards grid */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: `repeat(${visibleCount}, 1fr)`, gap: 20 }}>
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
        <a
          href="https://www.google.com/maps/place/CORx+Healthcare/@24.9981035,55.1675379,622m/data=!3m2!1e3!4b1!4m6!3m5!1s0xa6b0036ffadede71:0xff91b5de95976932!8m2!3d24.9981035!4d55.1701128!16s%2Fg%2F11vxqqxt2z?action=write_review"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "14px 48px", background: "#08709d", border: "none", borderRadius: 50, color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s", textDecoration: "none", boxShadow: "0 6px 20px rgba(8, 112, 157, 0.4)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#065679"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#08709d"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Leave a Review
        </a>
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
    name: "Jaya Kumari",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-001",
    degree: "DHA Certified Physiotherapist",
    image: jayaKumariPhoto
  },
  {
    name: "Vinayata M. Patel",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-002",
    degree: "DHA Certified Physiotherapist",
    image: vinayataPhoto
  },
  {
    name: "Sehar Bano",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-003",
    degree: "DHA Certified Physiotherapist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Manju Kumari",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-001",
    degree: "DHA Licensed Assistant Nurse",
    image: manjuPhoto
  },
  {
    name: "Chanda Kumari",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-001",
    degree: "Healthcare Assistant",
    image: chandaPhoto
  },
  {
    name: "Shweta Jagmohan",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-002",
    degree: "DHA Licensed Assistant Nurse",
    image: shwetaPhoto
  },
  {
    name: "Dipesh",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-002",
    degree: "Healthcare Assistant",
    image: dipeshPhoto
  },
  {
    name: "Mariecris Godinez",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-003",
    degree: "Healthcare Assistant",
    image: mariecrisPhoto
  },
  {
    name: "Sajini Babu",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-003",
    degree: "DHA Licensed Registered Nurse",
    image: sajiniPhoto
  },
  {
    name: "Lakshmi Sundar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-004",
    degree: "DHA Licensed Registered Nurse",
    image: lakshmiPhoto
  },
  {
    name: "Kajal Jaiswal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-004",
    degree: "Healthcare Assistant",
    image: kajalPhoto
  },
  {
    name: "Marisel Vi.R",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-005",
    degree: "DHA Licensed Assistant Nurse",
    image: mariselviPhoto
  },
  {
    name: "Shweta Rakesh Kumar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-006",
    degree: "DHA Licensed Registered Nurse",
    image: shwetaRakeshPhoto
  },
  {
    name: "Farooq Khalid",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-005",
    degree: "Healthcare Assistant",
    image: farooqPhoto
  },
  {
    name: "Suneel Bahadur",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-006",
    degree: "Health Assistant",
    image: suneelPhoto
  },
  {
    name: "Mamata Regmi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-007",
    degree: "Healthcare Assistant",
    image: mamataPhoto
  },
  {
    name: "Bharat Badwal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-008",
    degree: "Healthcare Assistant",
    image: bharatPhoto
  },
  {
    name: "Nimesh Ka Sewwandi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-009",
    degree: "Healthcare Assistant",
    image: nimeshkaPhoto
  },
  {
    name: "Santoshi Sah",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-010",
    degree: "Healthcare Assistant",
    image: santoshiPhoto
  },
  {
    name: "Nirmala Gharti Magar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-011",
    degree: "Healthcare Assistant",
    image: nirmalaPhoto
  },
  {
    name: "Jasmeen Jassi",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-007",
    degree: "DHA Licensed Assistant Nurse",
    image: jasmeenPhoto
  },
  {
    name: "Vaishali Parashar",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-008",
    degree: "DHA Licensed Assistant Nurse",
    image: vaishaliPhoto
  },
  {
    name: "Joti Ashok",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-009",
    degree: "DHA Licensed Registered Nurse",
    image: jotiAshokPhoto
  },
  {
    name: "Norelie Munar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-012",
    degree: "Healthcare Assistant",
    image: noreliePhoto
  },
  {
    name: "Hasti Rameshbhai",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-010",
    degree: "DHA Licensed Registered Nurse",
    image: hastiPhoto
  },
  {
    name: "Rhodalyn Gonzales",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-013",
    degree: "Health Assistant",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Manasa Vadde",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-014",
    degree: "Healthcare Assistant",
    image: manasaPhoto
  }
];

const departments = [
  "All",
  "Physiotherapy",
  "Nursing",
  "Homecare Support"
];

const HeartMonitor = () => {
  return (
    <div className="relative w-64 h-12 overflow-hidden bg-black/30 rounded-xl border border-white/10 flex items-center px-2 my-6">
      {/* ECG Grid Background */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: 'linear-gradient(to right, #2ebd6e 1px, transparent 1px), linear-gradient(to bottom, #2ebd6e 1px, transparent 1px)',
        backgroundSize: '8px 8px'
      }}></div>
      
      {/* SVG Drawing */}
      <svg className="w-full h-full" viewBox="0 0 200 40">
        {/* Static faint background path */}
        <path
          d="M 0,20 L 40,20 L 45,17 L 50,20 L 53,23 L 57,3 L 61,35 L 66,20 L 73,15 L 80,20 L 140,20 L 145,17 L 150,20 L 153,23 L 157,3 L 161,35 L 166,20 L 173,15 L 180,20 L 200,20"
          fill="none"
          stroke="#2ebd6e"
          strokeWidth="1.5"
          strokeOpacity="0.12"
        />
        {/* Animated active path */}
        <motion.path
          d="M 0,20 L 40,20 L 45,17 L 50,20 L 53,23 L 57,3 L 61,35 L 66,20 L 73,15 L 80,20 L 140,20 L 145,17 L 150,20 L 153,23 L 157,3 L 161,35 L 166,20 L 173,15 L 180,20 L 200,20"
          fill="none"
          stroke="#2ebd6e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0px 0px 4px rgba(46, 189, 110, 0.8))'
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
};

const Home = () => {
  const slides = [
    {
      badgeNode: (
        <span className="flex items-center gap-2">
          <Shield size={16} className="text-[#2ebd6e] fill-[#2ebd6e]/10" />
          <span className="text-white/95 font-semibold">Trusted Home healthcare services in Dubai</span>
        </span>
      ),
      titlePre: "Get Hospital-Quality Care ",
      titleHighlight: "Without Leaving Your Home",
      titlePost: "",
      subtitle: "Looking for trusted home health care services in Dubai, Corx Healthcare is available 24×7 to meet your medical needs anytime. Our team of highly skilled professionals delivers personalized, high-quality care tailored to your unique health requirements, all in the comfort of your home.",
      image: hero1,
      videoUrl: "https://www.facebook.com/plugins/video.php?height=373&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1667889694549028%2F&show_text=false&width=560&t=0",
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
  const [diffImageIndex, setDiffImageIndex] = useState(0);

  useEffect(() => {
    const titleText = "Corx Healthcare: Home Healthcare Services in Dubai, UAE - Corx Healthcare";
    const descText = "24/7 Home Healthcare Services in Dubai | DHA-Certified Doctors & Nurses at Your Doorstep. Your health, our priority — Professional, reliable, and on-demand medical care at your doorstep across Dubai. Corx Healthcare brings professional medical care to your doorstep with visiting doctors and nurses. Experience the highest standard of healthcare from skilled experts, all in the comfort of your own home.";

    document.title = titleText;

    const setMetaTag = (attrName, attrVal, contentVal) => {
      let metaElem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!metaElem) {
        metaElem = document.createElement('meta');
        metaElem.setAttribute(attrName, attrVal);
        document.head.appendChild(metaElem);
      }
      metaElem.setAttribute('content', contentVal);
    };

    setMetaTag('name', 'description', descText);
    setMetaTag('property', 'og:title', titleText);
    setMetaTag('property', 'og:description', descText);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDiffImageIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
  const getEmbedVideoUrl = (url) => {
    if (!url) return '';
    if (url.includes('facebook.com')) {
      let embedUrl = url;
      if (!url.includes('plugins/video.php')) {
        const encoded = encodeURIComponent(url);
        embedUrl = `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false`;
      }
      if (!embedUrl.includes('autoplay')) {
        embedUrl += '&autoplay=true';
      }
      if (!embedUrl.includes('muted')) {
        embedUrl += '&muted=true';
      }
      return embedUrl;
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1`;
      }
    }
    return url;
  };

  return (
    <main>
      {/* Hero Slider */}
      <section className="relative min-h-[95vh] flex items-center py-20 md:py-28 overflow-hidden bg-black">
        {/* Dynamic Background Slide Image & Video */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.55, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-[0]"
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                filter: 'brightness(0.5) contrast(1.05)'
              }}
            />
          </AnimatePresence>

          {/* Background Video Layer (Facebook Reel / iFrame / Video File) */}
          <AnimatePresence mode="wait">
            {slides[currentSlide].videoUrl && (
              <motion.div
                key={`video-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-[1] w-full h-full overflow-hidden pointer-events-none"
              >
                {slides[currentSlide].videoUrl.endsWith('.mp4') || slides[currentSlide].videoUrl.endsWith('.webm') ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
                  >
                    <source src={slides[currentSlide].videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <iframe
                    src={getEmbedVideoUrl(slides[currentSlide].videoUrl)}
                    title="Background Video"
                    className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] min-w-[150%] min-h-[150%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none scale-125 md:scale-110"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Deep Blue Overlay matching the reference design */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-br from-[#0c2e56]/90 via-[#0b2848]/80 to-[#071f3b]/90 mix-blend-multiply pointer-events-none"></div>
          {/* Soft dark vignettes */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
        </div>
        
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
              <h1 className="text-4xl md:text-6xl !font-normal leading-[1.15] mb-6 !text-white tracking-tight">
                {slides[currentSlide].titlePre}
                <span className="text-[#2ebd6e] !font-normal">
                  {slides[currentSlide].titleHighlight}
                </span>
                {slides[currentSlide].titlePost}
              </h1>

              {/* Heart Monitoring Animation */}
              <HeartMonitor />

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
              <h3 className="text-3xl md:text-5xl !font-normal !text-white leading-none">
                <Counter value={2546} duration={2} />+
              </h3>
              <p className="text-xs md:text-sm text-white font-medium mt-1">Successful Homecare</p>
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
              <h3 className="text-3xl md:text-5xl !font-normal !text-white leading-none">
                <Counter value={1.5} duration={2} decimals={1} />M+
              </h3>
              <p className="text-xs md:text-sm text-white font-medium mt-1">Happy Patients</p>
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
              <h3 className="text-3xl md:text-5xl !font-normal !text-white leading-none">
                <Counter value={15} duration={2} />+
              </h3>
              <p className="text-xs md:text-sm text-white font-medium mt-1">Years Experience</p>
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
              <h3 className="text-3xl md:text-5xl !font-normal !text-white leading-none">
                <Counter value={120} duration={2} />+
              </h3>
              <p className="text-xs md:text-sm text-white font-medium mt-1">Professional</p>
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

      {/* 3 Simple Steps Process Section */}
      <ThreeStepsProcessSection />

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
                Call Us 24/7 at <a href="tel:+97143320776" className="text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity">☎️ +971 4 332 0776</a>, <a href="tel:+971547033311" className="text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity">📱 +971 54 703 3311</a>, or <a href="tel:+971502785990" className="text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity">📱 +971 50 278 5990</a> (or WhatsApp Us at <a href="https://wa.me/97143320776" target="_blank" rel="noopener noreferrer" className="text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity">+971 4 332 0776</a>) for doctor on call service.
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
        {/* Subtle Watermarked Logo Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.1] pointer-events-none z-0 select-none flex items-center justify-center">
          <img src={logo} alt="CORx Healthcare Background Watermark Logo" className="w-full h-full object-contain" />
        </div>

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
 
                <div className="mt-12 flex justify-center">
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
                    className="relative group inline-block"
                  >
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-2 hover:scale-[1.02] text-white font-semibold text-base transition-all duration-200 cursor-pointer shadow-md"
                      style={{
                        backgroundColor: '#004e92',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: '1px solid transparent',
                        color: '#ffffff'
                      }}
                    >
                      <CalendarDays size={20} style={{ color: '#ffffff' }} />
                      <span>Schedule An Appointment</span>
                    </Link>
                  </motion.div>
                </div>


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
                <div className="relative rounded-[30px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-[8px] border-white w-full h-[530px] bg-white p-6">
                  <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-gray-50">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={diffImageIndex}
                        src={[img1, img2, img3, img4][diffImageIndex]} 
                        alt="CHC Healthcare Difference" 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          objectPosition: 'center' 
                        }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* <GoogleReviews /> */}



      {/* Testimonials Section */}
      <section 
        className="relative py-20 px-5 flex flex-col items-center overflow-hidden bg-black bg-cover bg-center"
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          backgroundImage: `url(${aboutUsBg})`,
          backgroundPosition: 'center 35%'
        }}
      >
        {/* Rich black background overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] z-0 pointer-events-none" />
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
                <img src={imgSrc} alt={`CORx Healthcare Partner Brand Logo ${(index % 7) + 1}`} className="w-full h-auto object-contain" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      <FAQ />

    </main>
  );
};

export default Home;
