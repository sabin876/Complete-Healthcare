import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config/api";
import ivTherapyImg from "../assets/iv_therapy_home.png";
import labServicesImg from "../assets/lab_services_home.jpg";
import labTestVideo from "../assets/lab test at home.mp4";
import homeNursingVideo from "../assets/Home Nursing.mp4";
import physioVideo from "../assets/Physio Video.mp4";
import physioImg from "../assets/services/physio.png";
import nursingImg from "../assets/services/nursing.png";
import elderlyVideo from "../assets/Elderly home age.mp4";
import elderlyImg from "../assets/services/elderly.png";
import ivTherapyVideo from "../assets/IV therapy and IV Drip.mp4";
import doctorOnCallVideo from "../assets/doctor_on_call.mp4";

const services = [
  {
    id: 1,
    title: "Home Physiotherapy",
    description: "Personalized physiotherapy sessions at home to restore mobility, ease pain, and accelerate recovery in Dubai.",
    accent: "#A8D8EA",
    path: "/physiotherapy-at-home-in-dubai",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    image: physioImg,
    video: physioVideo
  },
  {
    id: 2,
    title: "IV Therapy & IV Drip",
    description: "Discover Convenient 24/7 IV Therapy & IV Drip Services Right at Your Doorstep with Us.",
    accent: "#F5DEB3",
    path: "/iv-therapy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <path d="M12 7v4M10 9h4" />
      </svg>
    ),
    image: ivTherapyImg,
    video: ivTherapyVideo
  },
  {
    id: 3,
    title: "Home Nursing",
    description: "Offering expert nursing care within the UAE and right at your doorstep.",
    accent: "#D8B4D8",
    path: "/home-nursing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    image: nursingImg,
    video: homeNursingVideo
  },
  {
    id: 4,
    title: "Doctor On Call",
    description: "Access 24/7 Doctor On Call Services in Dubai. Experience the Premier At-Home Medical Care in the City.",
    accent: "#F4C2C2",
    path: "/doctor-on-call",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    video: doctorOnCallVideo
  },
  {
    id: 5,
    title: "Elderly Care Givers",
    description: "Experience Dedicated Caregivers at Your Home in Dubai. Personalized Medical Care Right at Your Doorstep!",
    accent: "#B4E1D0",
    path: "/elderly-care",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    image: elderlyImg,
    video: elderlyVideo
  },
  {
    id: 6,
    title: "Lab Services | Blood Test at Home",
    description: "Corx Healthcare Offers Convenient 24/7 Lab Testing Right at Your Doorstep in Dubai.",
    accent: "#E2D1F9",
    path: "/lab-test-at-home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    image: labServicesImg,
    video: labTestVideo
  },
];

function ServiceCard({ service, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Hard-enforce muted properties for browser autoplay policies
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay was blocked; will resume on first user interaction
        });
      }
    };

    // Immediate attempt
    playVideo();

    // IntersectionObserver: smoothly play when in view, pause when offscreen to preserve 60fps GPU performance
    let observer;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playVideo();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(video);
    }

    // Safety fallback for strict mobile browser policies (e.g. iOS low power mode)
    const handleFirstInteraction = () => {
      playVideo();
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("touchstart", handleFirstInteraction, { passive: true, once: true });
    window.addEventListener("click", handleFirstInteraction, { passive: true, once: true });
    window.addEventListener("scroll", handleFirstInteraction, { passive: true, once: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [service.video]);

  return (
    <motion.div
      onClick={() => navigate(service.path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.12,
        ease: [0.21, 1.02, 0.47, 0.98] 
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        overflow: "hidden",
        border: hovered ? "1px solid rgba(94, 182, 59, 0.25)" : "1px solid rgba(8, 112, 157, 0.05)",
        boxShadow: hovered
          ? "0 30px 60px -15px rgba(8, 112, 157, 0.15), 0 0 25px rgba(94, 182, 59, 0.06)"
          : "0 10px 30px -5px rgba(0, 0, 0, 0.03)",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        transform: "translateZ(0)"
      }}
    >
      {/* Image Area */}
      <div style={{ position: "relative", height: "190px", overflow: "hidden", transform: "translateZ(0)" }}>
        {service.video ? (
          <video
            ref={videoRef}
            key={service.video}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="auto"
            poster={service.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.06) translateZ(0)" : "scale(1) translateZ(0)",
              transition: "transform 0.7s cubic-bezier(0.21, 1.02, 0.47, 0.98)",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={service.image}
            alt={service.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.06) translateZ(0)" : "scale(1) translateZ(0)",
              transition: "transform 0.7s cubic-bezier(0.21, 1.02, 0.47, 0.98)",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        )}

        {/* Hover Dark Vignette overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        {/* Icon badge */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "24px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: hovered ? "#5eb63b" : "#ffffff",
            border: hovered ? "2px solid #ffffff" : `2px solid ${service.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hovered ? "#ffffff" : "#08709d",
            boxShadow: hovered ? "0 6px 16px rgba(94, 182, 59, 0.3)" : "0 4px 12px rgba(0,0,0,0.08)",
            zIndex: 2,
            transition: "all 0.35s ease"
          }}
        >
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px 24px 24px" }}>
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "18px",
            fontWeight: "750",
            color: hovered ? "#08709d" : "#1a2e3a",
            margin: "0 0 10px",
            lineHeight: 1.3,
            transition: "color 0.3s ease"
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "14px",
            color: "#6b7b85",
            margin: "0 0 24px",
            lineHeight: 1.6,
            fontWeight: "400"
          }}
        >
          {service.description}
        </p>

        {/* Read more */}
        <motion.div
          animate={{ color: hovered ? "#5eb63b" : "#08709d" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "700",
            fontSize: "14px",
            letterSpacing: "0.02em",
          }}
        >
          <span>Read more</span>
          <motion.span
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "inline-block" }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExploreServices() {
  const [serviceList, setServiceList] = useState(services);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services/`)
      .then(res => {
        if (!res.ok) return null;
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          const mainParents = data.filter(item => item.parent === null || !item.parent);
          const listToDisplay = mainParents.length > 0 ? mainParents : data;
          setServiceList(listToDisplay.map((item, index) => {
            const defaultItem = services.find(s => {
              const sSlug = s.path.split('/').filter(Boolean).pop();
              return (
                s.path.includes(item.slug) ||
                item.slug.includes(sSlug) ||
                (item.slug.includes('lab') && sSlug.includes('lab')) ||
                (item.slug.includes('iv') && sSlug.includes('iv')) ||
                (item.slug.includes('nurs') && sSlug.includes('nurs')) ||
                (item.slug.includes('doctor') && sSlug.includes('doctor')) ||
                (item.slug.includes('elder') && sSlug.includes('elder')) ||
                (item.slug.includes('physio') && sSlug.includes('physio'))
              );
            }) || services[index % services.length];

            return {
              id: item.id || index + 1,
              title: item.title || defaultItem.title,
              description: item.tagline || item.description || defaultItem.description,
              accent: item.theme_color || defaultItem.accent,
              path: `/${item.slug}`,
              icon: defaultItem.icon,
              image: item.image || defaultItem.image,
              video: defaultItem.video
            };
          }));
        }
      })
      .catch(() => {});
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

        .services-section {
          background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f3f7fa 100%);
          min-height: 100vh;
          padding: 80px 40px;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Floating medical bubbles */
        @keyframes floatUp {
          0% {
            transform: translateY(150px) scale(0.7);
            opacity: 0;
          }
          30% {
            opacity: 0.45;
          }
          70% {
            opacity: 0.45;
          }
          100% {
            transform: translateY(-250px) scale(1.15);
            opacity: 0;
          }
        }
        .services-section .bubble {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: floatUp 16s infinite ease-in-out;
        }
        .services-section .bubble-1 {
          width: 75px;
          height: 75px;
          background: rgba(8, 112, 157, 0.05);
          left: 4%;
          top: 15%;
          animation-duration: 20s;
        }
        .services-section .bubble-2 {
          width: 105px;
          height: 105px;
          background: rgba(94, 182, 59, 0.04);
          right: 6%;
          top: 35%;
          animation-duration: 24s;
          animation-delay: 2.5s;
        }
        .services-section .bubble-3 {
          width: 55px;
          height: 55px;
          background: rgba(8, 112, 157, 0.04);
          left: 42%;
          bottom: 12%;
          animation-duration: 16s;
          animation-delay: 4.5s;
        }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .services-section { padding: 60px 30px; }
        }

        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; gap: 20px; }
          .services-section { padding: 50px 20px; }
        }
      `}</style>

      <section className="services-section">
        {/* Animated Background Content */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          {/* Glowing ambient blobs */}
          <div style={{ position: "absolute", top: "15%", left: "10%", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(8, 112, 157, 0.05)", filter: "blur(90px)" }}></div>
          <div style={{ position: "absolute", bottom: "15%", right: "10%", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(94, 182, 59, 0.04)", filter: "blur(90px)" }}></div>
          
          {/* EKG Grid paper lines */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "linear-gradient(to right, #08709d 1px, transparent 1px), linear-gradient(to bottom, #08709d 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
          
          {/* ECG heartbeat tracer line */}
          <svg style={{ position: "absolute", left: 0, right: 0, top: "45%", transform: "translateY(-50%)", width: "100%", height: "260px", opacity: 0.22 }} viewBox="0 0 1400 300" fill="none" preserveAspectRatio="none">
            <path 
              id="heartbeat-path"
              d="M-100,150 L350,150 L365,130 L380,170 L395,30 L415,270 L435,130 L450,160 L465,150 L850,150 L865,130 L880,170 L895,30 L915,270 L935,130 L950,160 L965,150 L1600,150" 
              stroke="url(#ecg-gradient)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              opacity="0.65"
            />
            {/* The glowing tracer pulse node */}
            <circle r="4.5" fill="#5eb63b" filter="drop-shadow(0 0 6px #5eb63b)">
              <animateMotion 
                dur="6.5s" 
                repeatCount="indefinite" 
                path="M-100,150 L350,150 L365,130 L380,170 L395,30 L415,270 L435,130 L450,160 L465,150 L850,150 L865,130 L880,170 L895,30 L915,270 L935,130 L950,160 L965,150 L1600,150" 
              />
            </circle>
            <defs>
              <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#08709d" stopOpacity="0.2" />
                <stop offset="25%" stopColor="#08709d" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#5eb63b" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#08709d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#08709d" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
 
          {/* Floating cells bubbles */}
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
        </div>
 
        {/* Foreground Content */}
        <div style={{ position: "relative", zIndex: 10 }}>
          {/* Header */}
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto 56px",
              textAlign: "left"
            }}
          >
            {/* Capsule Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3.5 text-[11px] font-bold uppercase tracking-wider"
              style={{
                background: "rgba(94, 182, 59, 0.08)",
                border: "1px solid rgba(94, 182, 59, 0.2)",
                color: "#5eb63b"
              }}
            >
              ⊙ Clinical Care At Home
            </div>
            
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: "800",
                color: "#1a2e3a",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                lineHeight: 1.15
              }}
            >
              Explore Our <span style={{ color: "#08709d" }}>Home Services</span>
            </h2>
            
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "14.5px",
                color: "#6b7b85",
                maxWidth: "680px",
                margin: "12px 0 0",
                lineHeight: 1.6,
                fontWeight: "400"
              }}
            >
              Discover 24/7 DHA-licensed physician-guided medical services, nursing care, and physical therapy delivered directly to your doorstep in Dubai.
            </p>
          </div>

          {/* Cards grid */}
          <div className="services-grid">
            {serviceList.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
