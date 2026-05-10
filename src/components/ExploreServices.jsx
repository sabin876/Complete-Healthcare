import { useState } from "react";
import { motion } from "framer-motion";
import ivTherapyImg from "../assets/iv_therapy_home.png";
import labServicesImg from "../assets/lab_services_home.png";

const services = [
  {
    id: 1,
    title: "Home Physiotherapy",
    description: "Experience Exceptional Home Physiotherapy in Dubai with Just One Phone Call Away",
    accent: "#B8D8E8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80",
    video: "https://cdn.pixabay.com/video/2024/08/31/229069_large.mp4"
  },
  {
    id: 2,
    title: "IV Therapy",
    description: "Discover Convenient 24/7 IV Therapy Services Right at Your Doorstep with Us.",
    accent: "#F5DEB3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <path d="M12 7v4M10 9h4" />
      </svg>
    ),
    image: ivTherapyImg,
    video: "https://cdn.pixabay.com/video/2022/12/18/143434-782373973_large.mp4"
  },
  {
    id: 3,
    title: "Home Nursing",
    description: "Offering expert nursing care within the UAE and right at your doorstep.",
    accent: "#D8B4D8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=80",
    video: "https://cdn.pixabay.com/video/2020/09/13/49815-458438877_large.mp4"
  },
  {
    id: 4,
    title: "Doctor On Call",
    description: "Access 24/7 Doctor On Call Services in Dubai. Experience the Premier At-Home Medical Care in the City.",
    accent: "#F4C2C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    video: "https://cdn.pixabay.com/video/2020/09/13/49808-458438856_large.mp4"
  },
  {
    id: 5,
    title: "Elderly Care Givers",
    description: "Experience Dedicated Caregivers at Your Home in Dubai. Personalized Medical Care Right at Your Doorstep!",
    accent: "#B4E1D0",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80",
    video: "https://cdn.pixabay.com/video/2016/10/24/6096-188704568_large.mp4"
  },
  {
    id: 6,
    title: "Lab Services",
    description: "Corx Healthcare Offers Convenient 24/7 Lab Testing Right at Your Doorstep in Dubai.",
    accent: "#E2D1F9",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    image: labServicesImg,
    video: "https://cdn.pixabay.com/video/2017/01/01/6973-197914400_large.mp4"
  },
];

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.21, 1.02, 0.47, 0.98] 
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
          : "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Image Area */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={service.image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.8s ease",
          }}
        >
          <source src={service.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Icon badge */}
        <div
          style={{
            position: "absolute",
            bottom: "-18px",
            left: "20px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#ffffff",
            border: `2px solid ${service.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3a5a6a",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 2,
          }}
        >
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "30px 22px 24px" }}>
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "18px",
            fontWeight: "700",
            color: "#1a2e3a",
            margin: "0 0 10px",
            lineHeight: 1.3,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "14px",
            color: "#6b7b85",
            margin: "0 0 20px",
            lineHeight: 1.6,
          }}
        >
          {service.description}
        </p>

        {/* Read more */}
        <motion.div
          animate={{ color: hovered ? "#08709d" : "#2c6e6a" }}
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
          Read more
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
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

        .services-section {
          background: #f4f7f9;
          min-height: 100vh;
          padding: 60px 40px;
          font-family: 'Montserrat', sans-serif;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .services-section { padding: 40px 20px; }
        }
      `}</style>

      <section className="services-section">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            maxWidth: "1200px",
            margin: "0 auto 40px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "#e8f5e9",
              border: "2px solid #4caf8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#2c6e5a" strokeWidth="1.8" width="22" height="22">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="2" />
              <path d="M9 12h6M9 16h4" />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: "700",
              color: "#1a2e3a",
              letterSpacing: "-0.02em",
            }}
          >
            Explore services
          </h2>
        </div>

        {/* Cards grid */}
        <div className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
