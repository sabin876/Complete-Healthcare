import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Heart, Clock, ArrowRight, ShieldCheck, Activity, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import aboutUsBg from '../assets/About us .jpg';

const About = () => {
  const choosePillars = [
    { 
      icon: <ShieldCheck size={28} />, 
      title: "Integrity", 
      desc: "We maintain the highest standards of professional ethics, transparency, and clinical honesty, ensuring your family can fully trust every nurse, therapist, and caregiver in your home.",
      color: "#5eb63b" 
    },
    { 
      icon: <Clock size={28} />, 
      title: "Commitment", 
      desc: "We are devoted round-the-clock to delivering comprehensive home care services that prioritize patient safety, promote recovery, and preserve autonomy in Dubai.",
      color: "#e11d48"
    },
    { 
      icon: <Award size={28} />, 
      title: "Excellence and Awards", 
      desc: "We set new clinical benchmarks in home healthcare, supported by DHA-licensed medical specialists, physician-guided teams, and a proven history of patient satisfaction.",
      color: "#38bdf8"
    }
  ];

  const stats = [
    { val: "10,000+", label: "Happy Patients Served" },
    { val: "50+", label: "DHA Licensed Staff" },
    { val: "24/7", label: "Medical Support Available" },
    { val: "100%", label: "Patient Autonomy Focus" }
  ];

  const styles = {
    pageWrapper: {
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(135deg, #08709d 0%, #1a294a 100%)",
      minHeight: "100vh",
      paddingTop: "0px",
      paddingBottom: "80px",
      position: "relative",
      overflow: "hidden",
    },
    dotTexture: {
      position: "absolute",
      inset: 0,
      opacity: 0.06,
      backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      pointerEvents: "none",
      zIndex: 1
    },
    glowTeal: {
      position: "absolute",
      top: "-10%",
      right: "-10%",
      width: "550px",
      height: "550px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
      filter: "blur(60px)",
      pointerEvents: "none",
      zIndex: 1
    },
    glowGreen: {
      position: "absolute",
      bottom: "20%",
      left: "-10%",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
      filter: "blur(50px)",
      pointerEvents: "none",
      zIndex: 1
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontSize: "10.5px",
      fontWeight: "400",
      padding: "8px 18px",
      borderRadius: "50px",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      marginBottom: "20px",
      fontFamily: "'Montserrat', sans-serif"
    },
    title: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "clamp(24px, 3.5vw, 36px)",
      fontWeight: "400",
      color: "#ffffff",
      lineHeight: "1.15",
      letterSpacing: "-0.01em",
      textTransform: "uppercase",
      marginBottom: "24px"
    },
    subtitle: {
      fontSize: "15px",
      color: "rgba(255, 255, 255, 0.85)",
      lineHeight: "1.75",
      fontWeight: "400",
      marginBottom: "16px"
    },
    card: {
      background: "rgba(255, 255, 255, 0.06)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "24px",
      padding: "32px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(16px)",
      transition: "all 0.3s ease",
      textAlign: "left"
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.06)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "20px",
      padding: "24px 16px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      textAlign: "center",
      backdropFilter: "blur(12px)"
    },
    statVal: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "26px",
      fontWeight: "400",
      color: "#5eb63b",
      marginBottom: "4px"
    },
    statLabel: {
      fontSize: "11px",
      fontWeight: "400",
      color: "rgba(255, 255, 255, 0.7)",
      textTransform: "uppercase",
      letterSpacing: "0.02em"
    },
    sectionTitle: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "24px",
      fontWeight: "400",
      color: "#ffffff",
      textTransform: "uppercase",
      marginBottom: "20px"
    },
    pill: {
      padding: "8px 20px",
      borderRadius: "50px",
      fontSize: "10.5px",
      fontWeight: "400",
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    },
    ctaSection: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      padding: "56px 36px",
      borderRadius: "32px",
      textAlign: "center",
      boxShadow: "0 25px 60px rgba(0, 0, 0, 0.15)",
      position: "relative",
      overflow: "hidden",
      marginTop: "80px",
      backdropFilter: "blur(16px)"
    },
    ctaButton: {
      fontFamily: "'Montserrat', sans-serif",
      background: "#ffffff",
      color: "#08709d",
      border: "none",
      padding: "16px 42px",
      borderRadius: "50px",
      fontWeight: "400",
      fontSize: "12px",
      letterSpacing: "0.12em",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    },
    ctaPhoneBtn: {
      fontFamily: "'Montserrat', sans-serif",
      background: "transparent",
      color: "#ffffff",
      border: "2px solid rgba(255, 255, 255, 0.4)",
      padding: "14px 36px",
      borderRadius: "50px",
      fontWeight: "400",
      fontSize: "12px",
      letterSpacing: "0.12em",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      transition: "all 0.3s ease"
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* ── HERO HEADER SECTION ── */}
      <section 
        className="relative w-full min-h-[210px] md:min-h-0 md:aspect-[3322/1080] mb-16 bg-[#121212] bg-no-repeat overflow-hidden border-b border-gray-100 bg-cover md:bg-[length:80%_auto]"
        style={{
          backgroundImage: `url(${aboutUsBg})`,
          backgroundPosition: 'center'
        }}
      >
        {/* Clean raw background image banner */}
      </section>

      {/* Texture Overlays */}
      <div style={styles.dotTexture} />
      <div style={styles.glowTeal} />
      <div style={styles.glowGreen} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ── 1. INTRODUCTION & STATS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 text-left">
            <div style={{ ...styles.badge, color: "#5eb63b", borderColor: "rgba(94, 182, 59, 0.3)", marginBottom: "16px" }}>
              ⊙ Our Commitment
            </div>
            <h2 style={{ ...styles.sectionTitle, fontSize: "22px", marginBottom: "16px" }}>
              Personalized Care in the Comfort of Your Home
            </h2>
            <p style={{ ...styles.subtitle, fontSize: "14.5px", color: "rgba(255, 255, 255, 0.85)", lineHeight: "1.75", marginBottom: "16px" }}>
              At Corx Home Health Care, we recognize the significance of receiving premium medical care within the sanctuary of your own home. Our steadfast team of experts is devoted to delivering unparalleled home care services, placing your well-being at the forefront, and fostering your autonomy.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((st, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -5, background: "rgba(255, 255, 255, 0.12)" }}
                  style={styles.statCard}
                >
                  <div style={styles.statVal}>{st.val}</div>
                  <div style={styles.statLabel}>{st.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2. WHY CHOOSE CORX HOME HEALTHCARE? ── */}
        <div className="mb-24" style={{ paddingTop: "20px" }}>
          <div style={{ textAlign: "left", marginBottom: "40px" }}>
            <div style={{ ...styles.badge, color: "#5eb63b", borderColor: "rgba(94, 182, 59, 0.3)" }}>
              ⊙ Why Choose Us
            </div>
            <h2 style={{ ...styles.sectionTitle, fontSize: "22px", marginBottom: "12px" }}>Why Choose Corx Home Healthcare?</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "13.5px", fontWeight: "400", margin: 0 }}>
              There are many reasons to choose Corx Home Health Care as your healthcare provider of choice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {choosePillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, background: "rgba(255, 255, 255, 0.12)", boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)" }}
                style={styles.card}
              >
                <div style={{ 
                  color: pillar.color, 
                  background: "rgba(255, 255, 255, 0.08)", 
                  width: "56px", 
                  height: "56px", 
                  borderRadius: "16px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.15)"
                }}>
                  {pillar.icon}
                </div>
                <h3 style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#ffffff", 
                  fontSize: "14.5px", 
                  fontWeight: "400", 
                  marginBottom: "12px",
                  textTransform: "uppercase" 
                }}>
                  {pillar.title}
                </h3>
                <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "12.5px", lineHeight: "1.7", fontWeight: "400", margin: 0 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
             {/* ── 3. OUR MISSION & OUR SERVICES SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white text-slate-800 rounded-[32px] p-8 md:p-16 shadow-2xl border border-slate-100 mb-24 relative z-10 text-left"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Our Mission */}
            <div>
              {/* Banner shape header */}
              <div 
                className="bg-[#08709d] text-white font-extrabold text-base md:text-lg uppercase tracking-wider py-4 pl-8 pr-16 mb-8 inline-block"
                style={{ 
                  clipPath: 'polygon(0% 0%, 92% 0%, 82% 100%, 0% 100%)',
                  minWidth: '260px'
                }}
              >
                Our Mission
              </div>
              <p className="text-slate-700 text-[14.5px] leading-relaxed mb-8 font-medium">
                Our mission is to elevate health and well-being by delivering unparalleled comprehensive healthcare.
              </p>
              
              <div className="flex flex-col gap-6">
                {/* Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="relative w-8 h-8 shrink-0 mt-0.5">
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#08709d] rounded-[4px]" />
                    <div className="absolute top-0 right-0 w-6 h-6 bg-[#5eb63b] rounded-[4px]" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 text-[14.5px] font-bold uppercase tracking-wide mb-1 leading-snug">
                      Individualized Planning
                    </h4>
                    <p className="text-slate-600 text-[13.5px] leading-relaxed">
                      Creating customized care plans specifically designed for your personal health and well-being.
                    </p>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="relative w-8 h-8 shrink-0 mt-0.5">
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#08709d] rounded-[4px]" />
                    <div className="absolute top-0 right-0 w-6 h-6 bg-[#5eb63b] rounded-[4px]" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 text-[14.5px] font-bold uppercase tracking-wide mb-1 leading-snug">
                      Integrity
                    </h4>
                    <p className="text-slate-600 text-[13.5px] leading-relaxed">
                      A commitment to upholding trust and delivering excellence in home healthcare.
                    </p>
                  </div>
                </div>
                
                {/* Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="relative w-8 h-8 shrink-0 mt-0.5">
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#08709d] rounded-[4px]" />
                    <div className="absolute top-0 right-0 w-6 h-6 bg-[#5eb63b] rounded-[4px]" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 text-[14.5px] font-bold uppercase tracking-wide mb-1 leading-snug">
                      Compassion & Expertise
                    </h4>
                    <p className="text-slate-600 text-[13.5px] leading-relaxed">
                      Delivering exceptional home healthcare through compassionate expertise and dedicated care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column: Our Services */}
            <div>
              {/* Banner shape header (slanted on left) */}
              <div className="w-full flex justify-start lg:justify-end mb-8">
                <div 
                  className="bg-[#08709d] text-white font-extrabold text-base md:text-lg uppercase tracking-wider py-4 pl-12 pr-8 inline-block text-left"
                  style={{ 
                    clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    minWidth: '260px'
                  }}
                >
                  Our Services
                </div>
              </div>
              <p className="text-slate-700 text-[14.5px] leading-relaxed mb-8 font-medium">
                Discover personalized home healthcare in Dubai at CORx, our expert team delivers physiotherapy, nursing care, doctor consultations, and lab services directly to you, ensuring comfort and quality.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {[
                  "Physiotherapy",
                  "Mother and Infant Care On-Site",
                  "IV Therapy",
                  "Nursing Care",
                  "Doctor on Call",
                  "Elder Care",
                  "Lab Services",
                  "School & Nursery Healthcare",
                  "Skilled Nursing Care",
                  "Medical Tourism"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="relative w-6 h-6 shrink-0">
                      <div className="absolute bottom-0 left-0 w-4.5 h-4.5 bg-[#08709d] rounded-[3px]" />
                      <div className="absolute top-0 right-0 w-4.5 h-4.5 bg-[#5eb63b] rounded-[3px]" />
                    </div>
                    <span className="text-slate-800 text-[13.5px] font-semibold leading-tight">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
          </div>
        </div>

        {/* ── 5. DYNAMIC CTA BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.ctaSection}
        >
          {/* Animated Background Glow circles */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-20 -left-20 w-80 h-80 bg-[#5eb63b] rounded-full blur-[100px]"
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full blur-[100px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(20px, 3vw, 26px)", fontWeight: "400", color: "#ffffff", marginBottom: "16px", textTransform: "uppercase" }}>
              Ready to Experience Better Care?
            </h2>
            <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.85)", marginBottom: "36px", maxWidth: "620px", lineHeight: "1.65", fontWeight: "400" }}>
              Contact us today to book a consultation or find out more about our premium home care services.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center justify-center w-full">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ scale: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                  style={styles.ctaButton}
                >
                  BOOK NOW <ArrowRight size={16} />
                </motion.button>
              </Link>
              
              <a href="tel:+97143320776" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "#ffffff", background: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  style={styles.ctaPhoneBtn}
                >
                  <Phone size={16} /> CALL NOW
                </motion.button>
              </a>

              <a href="https://wa.me/97143320776" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "#22c55e", background: "rgba(34,197,94,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{ ...styles.ctaPhoneBtn, color: "#22c55e", borderColor: "rgba(34,197,94,0.4)" }}
                >
                  <MessageSquare size={16} /> WHATSAPP
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
