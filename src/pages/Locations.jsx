import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink, Globe, ArrowRight, ShieldCheck, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const Locations = () => {
  const regions = [
    {
      name: "Dubai Headquarters",
      offices: [
        { 
          name: "Main Office - Royal Class", 
          phones: ["+971 54 703 3311", "+971 50 278 5990"], 
          address: "Office 303, Royal Class Building, Dubai Investment Park (DIP), Dubai, UAE",
          hours: "24/7 Home Services Available"
        }
      ]
    },
    {
      name: "Coverage Areas",
      offices: [
        { name: "Dubai Marina & JBR", desc: "Rapid 30-45min Response Time", address: "Full Home Care Coverage" },
        { name: "Downtown & Business Bay", desc: "Priority Clinical Support", address: "Full Home Care Coverage" },
        { name: "Palm Jumeirah", desc: "Concierge Medical Services", address: "Full Home Care Coverage" },
        { name: "Jumeirah & Umm Suqeim", desc: "Expert Nursing & Physio", address: "Full Home Care Coverage" },
        { name: "Mirdif & Al Khawaneej", desc: "Family Health Support", address: "Full Home Care Coverage" },
        { name: "DIP & Jebel Ali", desc: "Local Service Hub", address: "Full Home Care Coverage" }
      ]
    }
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
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          position: "absolute", bottom: "-5%", left: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 pb-20">
        {/* Header Section */}
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
            Care Delivered <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Across Dubai.</span>
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
            With our central hub in DIP and rapid response teams stationed throughout the city, 
            premium medical care is never more than a phone call away.
          </motion.p>
        </div>

        {/* Rapid Response Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "40px",
            borderRadius: "32px",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            alignItems: "center",
            gap: 32,
            marginBottom: 100
          }}
        >
          <div style={{ 
            background: "#fff", 
            color: "#1a2a6c", 
            padding: "24px", 
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            <Clock size={40} />
          </div>
          <div>
            <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, marginBottom: 12, textTransform: "uppercase" }}>24/7 Home Care Availability</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.6 }}>
              Our medical teams are strategically located across Dubai to ensure rapid response times, 
              bringing clinical excellence directly to your sanctuary, day or night.
            </p>
          </div>
        </motion.div>

        {/* Locations Grid */}
        <div className="space-y-24">
          {regions.map((region, rIdx) => (
            <div key={region.name}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}
              >
                <div style={{ color: "#fff", background: "rgba(255,255,255,0.1)", p: 12, borderRadius: 16 }}>
                  {region.name === "Dubai Headquarters" ? <MapPin size={28} /> : <Globe size={28} />}
                </div>
                <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 900, textTransform: "uppercase" }}>{region.name}</h2>
              </motion.div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 24
              }}>
                {region.offices.map((office, oIdx) => (
                  <motion.div
                    key={office.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: oIdx * 0.1 }}
                    whileHover={{ y: -8 }}
                    style={{
                      background: "#fff",
                      borderRadius: "32px",
                      padding: "40px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%"
                    }}
                  >
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: "#1a2a6c", marginBottom: 24 }}>{office.name}</h3>
                    <div style={{ flexGrow: 1, marginBottom: 32 }}>
                      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                        <MapPin size={20} style={{ color: "#63b158", flexShrink: 0, marginTop: 4 }} />
                        <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{office.address}</p>
                      </div>
                      
                      {office.phones ? (
                        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                          <Phone size={20} style={{ color: "#63b158", flexShrink: 0, marginTop: 4 }} />
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {office.phones.map(p => (
                              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} style={{ fontSize: 16, fontWeight: 800, color: "#1a2a6c", textDecoration: "none" }}>{p}</a>
                            ))}
                          </div>
                        </div>
                      ) : office.desc && (
                        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                          <ShieldCheck size={20} style={{ color: "#2596be", flexShrink: 0, marginTop: 4 }} />
                          <p style={{ fontSize: 14, fontWeight: 700, color: "#2596be" }}>{office.desc}</p>
                        </div>
                      )}

                      {office.hours && (
                        <div style={{ display: "flex", gap: 16 }}>
                          <Clock size={20} style={{ color: "#e87c2e", flexShrink: 0, marginTop: 4 }} />
                          <p style={{ fontSize: 12, fontWeight: 800, color: "#e87c2e", textTransform: "uppercase", letterSpacing: "0.1em" }}>{office.hours}</p>
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, background: "#1a2a6c", color: "#fff" }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: "#f8f9fa",
                        color: "#1a2a6c",
                        border: "none",
                        padding: "16px",
                        borderRadius: "16px",
                        fontWeight: 800,
                        fontSize: 12,
                        letterSpacing: "0.1em",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        transition: "all 0.3s"
                      }}
                    >
                      GET DIRECTIONS <Navigation size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: 100,
            height: 400,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "40px",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 40
          }}
        >
          <div>
            <MapPin size={60} style={{ color: "rgba(255,255,255,0.2)", marginBottom: 24 }} />
            <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 900, textTransform: "uppercase", marginBottom: 12 }}>Interactive Coverage Map</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase" }}>Integration in Progress</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Locations;
