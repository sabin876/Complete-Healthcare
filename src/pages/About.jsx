import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Heart, Users, Shield, Clock, MapPin, ArrowRight, ShieldCheck, Stethoscope, Activity, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: "Skilled Nurses",
      title: "Registered Nurses (RN)",
      bio: "Highly trained professionals dedicated to providing 24/7 care, monitoring vitals, and ensuring patient comfort at home.",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
      color: "#e87c2e"
    },
    {
      name: "Expert Physiotherapists",
      title: "Physical Therapy Specialists",
      bio: "Helping patients regain mobility and strength through customized home-based rehabilitation programs.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      color: "#6b3fa0"
    },
    {
      name: "Dedicated Caregivers",
      title: "Home Health Aides",
      bio: "Compassionate support for daily living activities, ensuring a safe and supportive environment for seniors.",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
      color: "#3a7bd5"
    }
  ];

  const values = [
    { icon: <ShieldCheck size={28} />, title: "DHA Licensed", desc: "Fully accredited by the Dubai Health Authority for home care." },
    { icon: <Clock size={28} />, title: "24/7 Support", desc: "Round-the-clock medical assistance whenever you need it." },
    { icon: <Activity size={28} />, title: "Clinical Excellence", desc: "Hospital-grade care delivered in the comfort of your home." },
    { icon: <Heart size={28} />, title: "Patient-First", desc: "Every treatment plan is tailored to your unique journey." },
  ];

  return (
    <div style={{
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      background: "linear-gradient(135deg, #2c3e8c 0%, #1a2a6c 50%, #23379b 100%)",
      minHeight: "100vh",
      paddingTop: "120px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background Dot Texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      {/* Ambient Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 pb-20">
        {/* Hero Section */}
        <div style={{ maxWidth: 800, marginBottom: 80 }}>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 24
            }}
          >
            Bringing Expert Care <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>To Your Home.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Complete Healthcare is Dubai's leading provider of premium home-based medical services. 
            We combine clinical excellence with compassionate care to ensure your family's health is always in safe hands.
          </motion.p>
        </div>

        {/* Values Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          marginBottom: 100
        }}>
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "32px",
                borderRadius: "24px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ color: "#fff", marginBottom: 20 }}>{val.icon}</div>
              <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{val.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>{val.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision Row */}
        <div style={{
          display: "flex",
          flexDirection: window.innerWidth < 1024 ? "column" : "row",
          gap: 60,
          alignItems: "center",
          marginBottom: 120
        }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ flex: 1 }}
          >
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 28, textTransform: "uppercase" }}>Our Commitment</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.8, marginBottom: 32 }}>
              We understand that the best place to heal is where you feel most comfortable. Our team of DHA-licensed 
              professionals brings years of hospital experience directly to your doorstep, providing a seamless 
              continuum of care for all ages.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <div style={{ background: "#fff", color: "#1a2a6c", padding: "10px 24px", borderRadius: 50, fontWeight: 800, fontSize: 12, letterSpacing: "0.1em" }}>EXCELLENCE</div>
              <div style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "10px 24px", borderRadius: 50, fontWeight: 800, fontSize: 12, border: "1px solid rgba(255,255,255,0.3)" }}>TRUST</div>
              <div style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "10px 24px", borderRadius: 50, fontWeight: 800, fontSize: 12, border: "1px solid rgba(255,255,255,0.3)" }}>COMPASSION</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ flex: 1, position: "relative" }}
          >
            <div style={{ 
              borderRadius: "40px", 
              overflow: "hidden", 
              border: "8px solid rgba(255,255,255,0.1)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
            }}>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
                alt="Clinic" 
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, textTransform: "uppercase", marginBottom: 16 }}>Our Expert Team</h2>
            <div style={{ width: 60, h: 4, background: "#fff", margin: "0 auto", borderRadius: 2 }}></div>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32
          }}>
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                style={{
                  background: "#fff",
                  borderRadius: "32px",
                  padding: "40px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <div style={{ 
                  width: 120, height: 120, 
                  borderRadius: "30%", 
                  overflow: "hidden", 
                  marginBottom: 24,
                  border: `4px solid ${member.color}22`
                }}>
                  <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectCover: "cover" }} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1a2a6c", marginBottom: 4 }}>{member.name}</h3>
                <p style={{ fontSize: 11, fontWeight: 800, color: member.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>{member.title}</p>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: "#fff",
            padding: "60px",
            borderRadius: "40px",
            textAlign: "center",
            boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1a2a6c", marginBottom: 20, textTransform: "uppercase" }}>Ready to Experience Better Care?</h2>
          <p style={{ fontSize: 18, color: "#555", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
            Contact us today to book a consultation or find out more about our home care services.
          </p>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "#1a2a6c",
                color: "#fff",
                border: "none",
                padding: "18px 48px",
                borderRadius: "50px",
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: "0.15em",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 12
              }}
            >
              BOOK NOW <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
