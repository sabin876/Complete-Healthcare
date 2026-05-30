import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Heart, Clock, ArrowRight, ShieldCheck, Activity, Phone, MessageSquare, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const choosePillars = [
    { 
      icon: <ShieldCheck size={28} />, 
      title: "Integrity", 
      desc: "We maintain the highest standards of professional ethics, transparency, and clinical honesty, ensuring your family can fully trust every nurse, therapist, and caregiver in your home.",
      color: "#08709d" 
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
      color: "#5eb63b"
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
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)",
      minHeight: "100vh",
      paddingTop: "140px",
      paddingBottom: "80px",
      position: "relative",
      overflow: "hidden",
    },
    dotTexture: {
      position: "absolute",
      inset: 0,
      opacity: 0.15,
      backgroundImage: "radial-gradient(circle, #08709d 1px, transparent 1px)",
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
      background: "radial-gradient(circle, rgba(8,112,157,0.08) 0%, transparent 70%)",
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
      background: "radial-gradient(circle, rgba(94,182,59,0.06) 0%, transparent 70%)",
      filter: "blur(50px)",
      pointerEvents: "none",
      zIndex: 1
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      background: "#ffffff",
      border: "1px solid rgba(8, 112, 157, 0.15)",
      color: "#08709d",
      fontSize: "12px",
      fontWeight: "700",
      padding: "8px 18px",
      borderRadius: "50px",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      boxShadow: "0 4px 12px rgba(8, 112, 157, 0.05)",
      marginBottom: "20px",
      fontFamily: "'Montserrat', sans-serif"
    },
    title: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "clamp(30px, 4.5vw, 48px)",
      fontWeight: "900",
      color: "#1a294a",
      lineHeight: "1.15",
      letterSpacing: "-0.01em",
      textTransform: "uppercase",
      marginBottom: "24px"
    },
    subtitle: {
      fontSize: "16px",
      color: "#475569",
      lineHeight: "1.75",
      fontWeight: "400",
      marginBottom: "16px"
    },
    card: {
      background: "rgba(255, 255, 255, 0.75)",
      border: "1px solid rgba(8, 112, 157, 0.08)",
      borderRadius: "24px",
      padding: "32px",
      boxShadow: "0 10px 30px rgba(8, 112, 157, 0.03)",
      backdropFilter: "blur(12px)",
      transition: "all 0.3s ease",
      textAlign: "left"
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.8)",
      border: "1px solid rgba(8, 112, 157, 0.08)",
      borderRadius: "20px",
      padding: "24px 16px",
      boxShadow: "0 8px 24px rgba(8, 112, 157, 0.02)",
      textAlign: "center",
      backdropFilter: "blur(10px)"
    },
    statVal: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "36px",
      fontWeight: "900",
      color: "#08709d",
      marginBottom: "4px"
    },
    statLabel: {
      fontSize: "12.5px",
      fontWeight: "600",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.02em"
    },
    sectionTitle: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "32px",
      fontWeight: "800",
      color: "#1a294a",
      textTransform: "uppercase",
      marginBottom: "20px"
    },
    pill: {
      padding: "8px 20px",
      borderRadius: "50px",
      fontSize: "12px",
      fontWeight: "800",
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    },
    ctaSection: {
      background: "linear-gradient(135deg, #08709d 0%, #1a294a 100%)",
      padding: "56px 36px",
      borderRadius: "32px",
      textAlign: "center",
      boxShadow: "0 25px 60px rgba(8, 112, 157, 0.15)",
      position: "relative",
      overflow: "hidden",
      marginTop: "80px"
    },
    ctaButton: {
      fontFamily: "'Montserrat', sans-serif",
      background: "#ffffff",
      color: "#08709d",
      border: "none",
      padding: "16px 42px",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: "13px",
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
      border: "2px solid rgba(255,255,255,0.4)",
      padding: "14px 36px",
      borderRadius: "50px",
      fontWeight: "800",
      fontSize: "13px",
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
      {/* Texture Overlays */}
      <div style={styles.dotTexture} />
      <div style={styles.glowTeal} />
      <div style={styles.glowGreen} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ── 1. HERO HEADER (WHO WE ARE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={styles.badge}
            >
              ⊙ Who We Are / About Us
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={styles.title}
            >
              Home Health Care <br />
              Service Provider <br />
              <span style={{ color: "#08709d" }}>Across The Dubai.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ ...styles.subtitle, fontSize: "16.5px", color: "#334155", fontWeight: "500" }}
            >
              Corx Home Healthcare offers unparalleled home healthcare services, including top-tier physiotherapy, home nursing, compassionate caregivers, and round-the-clock doctor-on-call assistance throughout the Emirates of UAE.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={styles.subtitle}
            >
              At Corx Home Health Care, we recognize the significance of receiving premium medical care within the sanctuary of your own home. Our steadfast team of experts is devoted to delivering unparalleled home care services, placing your well-being at the forefront, and fostering your autonomy.
            </motion.p>
          </div>

          {/* ── INTERACTIVE STATS GRID ── */}
          <div className="lg:col-span-5 w-full">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((st, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(8, 112, 157, 0.06)" }}
                  style={styles.statCard}
                >
                  <div style={styles.statVal}>{st.val}</div>
                  <div style={styles.statLabel}>{st.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Overlapping Quick Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 bg-white border border-gray-150 p-4 rounded-2xl shadow-sm flex items-center gap-3.5"
            >
              <div className="w-9 h-9 rounded-full bg-[#5eb63b]/10 text-[#5eb63b] flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <p className="text-left text-xs font-semibold text-gray-500 leading-normal m-0 font-sans">
                <strong className="text-[#1a294a]">Accredited Home Care Partner:</strong> DHA Licensed clinics, clinical protocols, and highly trained specialists.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── 2. WHY CHOOSE CORX HOME HEALTHCARE? ── */}
        <div className="mb-24" style={{ paddingTop: "20px" }}>
          <div style={{ textAlign: "left", marginBottom: "40px" }}>
            <div style={{ ...styles.badge, color: "#5eb63b", borderColor: "rgba(94, 182, 59, 0.15)" }}>
              ⊙ Why Choose Us
            </div>
            <h2 style={{ ...styles.sectionTitle, fontSize: "32px", marginBottom: "12px" }}>Why Choose Corx Home Healthcare?</h2>
            <p style={{ color: "#64748b", fontSize: "15px", fontWeight: "500", margin: 0 }}>
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
                whileHover={{ y: -6, borderColor: `${pillar.color}33`, boxShadow: "0 12px 35px rgba(8, 112, 157, 0.06)" }}
                style={styles.card}
              >
                <div style={{ 
                  color: pillar.color, 
                  background: `${pillar.color}12`, 
                  width: "56px", 
                  height: "56px", 
                  borderRadius: "16px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "24px" 
                }}>
                  {pillar.icon}
                </div>
                <h3 style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#1a294a", 
                  fontSize: "18px", 
                  fontWeight: "800", 
                  marginBottom: "12px",
                  textTransform: "uppercase" 
                }}>
                  {pillar.title}
                </h3>
                <p style={{ color: "#4b5563", fontSize: "13.5px", lineHeight: "1.7", fontWeight: "500", margin: 0 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 3. OUR MISSION SECTION ── */}
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16 mb-24" style={{ paddingTop: "20px" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ flex: 1 }}
            className="text-left"
          >
            <div style={styles.badge}>
              ⊙ Our Mission
            </div>
            <h2 style={{ ...styles.sectionTitle, fontSize: "28px", lineHeight: "1.3", marginBottom: "20px" }}>
              Our mission is to elevate health and well-being by delivering unparalleled comprehensive healthcare.
            </h2>
            <p style={{ color: "#475569", fontSize: "14.5px", lineHeight: "1.75", marginBottom: "16px" }}>
              At Corx Home Healthcare, first and foremost, our mission is to elevate health and overall well-being by delivering unparalleled, comprehensive healthcare solutions. With this clear commitment at our core, we not only strive for excellence but also stand as a national leader dedicated to enriching lives and providing optimal care for your loved ones. Based in Dubai, United Arab Emirates, we therefore proudly serve individuals across Dubai and the wider UAE as a trusted and dependable home healthcare provider.
            </p>
            <p style={{ color: "#475569", fontSize: "14.5px", lineHeight: "1.75", marginBottom: "16px" }}>
              Through a carefully integrated and patient-centric approach, we consistently deliver comprehensive home healthcare services led by a highly skilled, physician-guided clinical team. In particular, we focus on supporting patients who prefer the comfort of their own homes for treatment, recovery, and rehabilitation. In doing so, we ensure continuity of care, promote familiarity, and preserve dignity throughout their daily lives.
            </p>
            <p style={{ color: "#475569", fontSize: "14.5px", lineHeight: "1.75", marginBottom: "16px" }}>
              Recognizing, above all, that there truly is no place like home, we continuously prioritize quality improvement initiatives. Consequently, we enhance patient safety, increase satisfaction, and support long-term health outcomes, while simultaneously maintaining the highest standards of care within a familiar and reassuring environment.
            </p>
            <p style={{ color: "#475569", fontSize: "14.5px", lineHeight: "1.75", marginBottom: "0" }}>
              Moreover, our overarching goal is to provide round-the-clock access to premier healthcare services. By doing so, we consistently deliver exceptional clinical outcomes and, at the same time, set new benchmarks in patient experience across home care, corporate healthcare, and on-demand medical services not only in the UAE but across the entire GCC region.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ flex: 1, position: "relative" }}
            className="w-full max-w-[480px]"
          >
            {/* Ambient deep glow behind image */}
            <div className="absolute inset-0 bg-[#08709d]/5 rounded-[40px] blur-2xl pointer-events-none" />
            
            <div style={{ 
              borderRadius: "28px", 
              overflow: "hidden", 
              border: "4px solid rgba(255,255,255,0.8)",
              boxShadow: "0 20px 50px rgba(8, 112, 157, 0.08)",
              position: "relative",
              zIndex: 5
            }}>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
                alt="Corx Professional Home Healthcare in Dubai" 
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Overlapping Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 -right-4 bg-white p-4 rounded-2xl border border-gray-150 shadow-[0_15px_30px_rgba(0,0,0,0.06)] z-10 flex gap-3 items-center max-w-[200px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#5eb63b] text-white flex items-center justify-center font-bold text-sm shrink-0">
                ★
              </div>
              <div className="text-left">
                <p className="m-0 font-bold text-xs text-gray-900 leading-tight">5-Star Rated</p>
                <p className="m-0 text-[10px] text-gray-400 font-semibold mt-0.5">Patient Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── 4. OUR VISION SECTION ── */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-14 lg:gap-16 mb-24" style={{ paddingTop: "20px" }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ flex: 1 }}
            className="text-left"
          >
            <div style={{ ...styles.badge, color: "#5eb63b", borderColor: "rgba(94, 182, 59, 0.15)", marginBottom: "16px" }}>
              ⊙ Our Vision
            </div>
            <h2 style={{ ...styles.sectionTitle, fontSize: "28px", lineHeight: "1.3", marginBottom: "20px" }}>
              We are committed to consistently creating and delivering exceptional value for you.
            </h2>
            <p style={{ color: "#475569", fontSize: "14.5px", lineHeight: "1.75", marginBottom: "16px" }}>
              At Corx Home Healthcare, first and foremost, we are committed to consistently creating and delivering exceptional value for you. With this guiding principle, our vision is to set the standard as the foremost provider of compassionate and tailored healthcare services, delivered within the comfort and convenience of our patients’ homes.
            </p>
            <p style={{ color: "#475569", fontSize: "14.5px", lineHeight: "1.75", marginBottom: "16px" }}>
              Through this commitment, we are dedicated to elevating the quality of life for our patients by delivering comprehensive, dependable, and expert care. In doing so, we actively foster independence, promote overall wellness, and preserve personal dignity at every stage of care.
            </p>
            <p style={{ color: "#475569", fontSize: "14.5px", lineHeight: "1.75", marginBottom: "16px" }}>
              Furthermore, supported by our skilled and devoted team, we continuously aspire to surpass the expectations of our patients and their families. As a result, we aim to positively influence not only health outcomes but also overall happiness and peace of mind.
            </p>
            <p style={{ color: "#475569", fontSize: "14.5px", lineHeight: "1.75", marginBottom: "0" }}>
              Additionally, and beyond traditional healthcare, we seek to become the top choice for outdoor enthusiasts looking for extraordinary nightlife experiences that transcend conventional boundaries. By combining innovation with nature, we remain committed to offering unparalleled adventures and creating unforgettable moments, all while embracing the beauty of the natural environment.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ flex: 1, position: "relative" }}
            className="w-full max-w-[480px]"
          >
            {/* Ambient green glow behind illustration */}
            <div className="absolute inset-0 bg-[#5eb63b]/5 rounded-[40px] blur-2xl pointer-events-none" />
            
            <div style={{ 
              borderRadius: "28px", 
              overflow: "hidden", 
              border: "4px solid rgba(255,255,255,0.8)",
              boxShadow: "0 20px 50px rgba(94, 182, 59, 0.06)",
              position: "relative",
              zIndex: 5
            }}>
              <img 
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200" 
                alt="Corx Vision for Care and Innovation" 
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Overlapping Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 -left-4 bg-white p-4 rounded-2xl border border-gray-150 shadow-[0_15px_30px_rgba(0,0,0,0.06)] z-10 flex gap-3 items-center max-w-[210px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#08709d] text-white flex items-center justify-center font-bold text-sm shrink-0">
                ✓
              </div>
              <div className="text-left">
                <p className="m-0 font-bold text-xs text-gray-900 leading-tight">Exceptional Value</p>
                <p className="m-0 text-[10px] text-gray-400 font-semibold mt-0.5">Consistent &amp; Trusted</p>
              </div>
            </motion.div>
          </motion.div>
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
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: "900", color: "#ffffff", marginBottom: "16px", textTransform: "uppercase" }}>
              Ready to Experience Better Care?
            </h2>
            <p style={{ fontSize: "16.5px", color: "rgba(255,255,255,0.85)", marginBottom: "36px", maxWidth: "620px", lineHeight: "1.65", fontWeight: "500" }}>
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

              <a href="https://wa.me/971547033311" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
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
