import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── SVG Icons ───────────────────────────────────── */
const socialIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.95 3.4 2 2 0 0 1 3.96 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

/* ─── Contact info blocks ─────────────────────────── */
const contactBlocks = [
  {
    label: "Call Us 24x7",
    lines: ["+971 54 703 3311", "+971 50 278 5990"],
  },
  {
    label: "Write Us",
    lines: ["info@corx.ae"],
  },
  {
    label: "Main Office",
    lines: [
      "Royal Class Building - Office 303",
      "Dubai Investment Park First",
      "Green Community Village",
      "Dubai - United Arab Emirates",
    ],
  },
];

/* ─── Input Field Component ───────────────────────── */
function InputField({ icon, placeholder, name, type, value, onChange, focused, setFocused, delay }) {
  const isFocused = focused === name;
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#ffffff",
        border: isFocused ? "2px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.6)",
        borderRadius: 50,
        padding: "14px 22px",
        transition: "all 0.25s",
        boxShadow: isFocused ? "0 8px 30px rgba(0,0,0,0.25)" : "0 4px 18px rgba(0,0,0,0.15)",
      }}
    >
      <span style={{ color: isFocused ? "#1a2a6c" : "#9ca3af", display: "flex", flexShrink: 0, transition: "color 0.25s" }}>
        {icon}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused("")}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#1a2a6c",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.08em",
          caretColor: "#1a2a6c",
        }}
      />
    </motion.div>
  );
}

/* ─── Main Component ───────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [captcha, setCaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !captcha) return;
    setSubmitted(true);
  };

  return (
    <div style={{
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #2c3e8c 0%, #1a2a6c 50%, #23379b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 20px 60px",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Dot texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      {/* Ambient glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-15%", right: "-8%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          position: "absolute", bottom: "-15%", left: "-8%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{
        maxWidth: 1100, width: "100%",
        display: "flex", gap: 60,
        alignItems: "flex-start", flexWrap: "wrap",
        position: "relative", zIndex: 1,
      }}>

        {/* ── LEFT: Brand info ── */}
        <div style={{ flex: "1 1 320px", color: "#fff", paddingTop: 8 }}>
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              fontWeight: 900,
              fontSize: "clamp(26px, 4vw, 40px)",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              marginBottom: 36,
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            Complete Healthcare
          </motion.h1>

          {contactBlocks.map(({ label, lines }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.14, ease: "easeOut" }}
              style={{ marginBottom: 28 }}
            >
              <p style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 6px 0",
              }}>
                {label}
              </p>
              {lines.map((line, j) => (
                <p key={j} style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.92)",
                  fontWeight: 500,
                  margin: 0,
                }}>
                  {line}
                </p>
              ))}
            </motion.div>
          ))}

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}
          >
            {Object.entries(socialIcons).map(([key, icon]) => (
              <motion.a
                key={key}
                href="#"
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.75)",
                  cursor: "pointer",
                  padding: 6,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: 14 }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  borderRadius: 18, padding: "48px 36px",
                  textAlign: "center", color: "#fff",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  style={{ fontSize: 64, marginBottom: 16 }}
                >
                  ✓
                </motion.div>
                <h2 style={{ fontSize: 22, marginBottom: 10, fontWeight: 800 }}>Thank you!</h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>
                  We've received your message and will be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <InputField icon={<UserIcon />} placeholder="YOUR NAME" name="name" type="text" value={form.name} onChange={handleChange} focused={focused} setFocused={setFocused} delay={0.05} />
                <InputField icon={<EmailIcon />} placeholder="YOUR EMAIL" name="email" type="email" value={form.email} onChange={handleChange} focused={focused} setFocused={setFocused} delay={0.15} />
                <InputField icon={<PhoneIcon />} placeholder="YOUR PHONE NUMBER" name="phone" type="tel" value={form.phone} onChange={handleChange} focused={focused} setFocused={setFocused} delay={0.25} />

                {/* Message textarea */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    background: "#ffffff",
                    border: focused === "message" ? "2px solid rgba(255,255,255,0.9)" : "2px solid rgba(255,255,255,0.6)",
                    borderRadius: 18,
                    padding: "14px 22px",
                    transition: "all 0.25s",
                    boxShadow: focused === "message" ? "0 8px 30px rgba(0,0,0,0.25)" : "0 4px 18px rgba(0,0,0,0.15)",
                  }}
                >
                  <span style={{ color: focused === "message" ? "#1a2a6c" : "#9ca3af", marginTop: 2, flexShrink: 0, transition: "color 0.25s" }}>
                    <MessageIcon />
                  </span>
                  <textarea
                    name="message"
                    placeholder="YOUR MESSAGE (OPTIONAL)"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    rows={3}
                    style={{
                      flex: 1, background: "transparent", border: "none", outline: "none",
                      color: "#1a2a6c", fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      fontSize: 13, fontWeight: 600, letterSpacing: "0.08em",
                      resize: "none", caretColor: "#1a2a6c", lineHeight: 1.6,
                    }}
                  />
                </motion.div>

                {/* reCAPTCHA */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                  style={{
                    background: "#f9f9f9", border: "1px solid #d3d3d3",
                    borderRadius: 4, padding: "12px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    maxWidth: 300, boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      onClick={() => setCaptcha(!captcha)}
                      style={{
                        width: 22, height: 22,
                        border: captcha ? "2px solid #4a90d9" : "2px solid #c1c1c1",
                        borderRadius: 3,
                        background: captcha ? "#4a90d9" : "#fff",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s", flexShrink: 0,
                      }}
                    >
                      <AnimatePresence>
                        {captcha && (
                          <motion.svg
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            viewBox="0 0 12 12" width="13" height="13" fill="none"
                          >
                            <polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: "#333" }}>I'm not a robot</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 24 }}>🔄</div>
                    <div style={{ fontSize: 9, color: "#999", fontFamily: "Arial, sans-serif", lineHeight: 1.2 }}>
                      reCAPTCHA<br />
                      <span style={{ fontSize: 8 }}>Privacy · Terms</span>
                    </div>
                  </div>
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                >
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(0,0,0,0.3)", background: "#e8edff" }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      background: "#fff", color: "#1a2a6c",
                      border: "none", borderRadius: 50,
                      padding: "15px 40px",
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      fontWeight: 800, fontSize: 14, letterSpacing: "0.12em",
                      cursor: "pointer",
                      boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
                    }}
                  >
                    SUBMIT
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
