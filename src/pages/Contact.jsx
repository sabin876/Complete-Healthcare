import { useState } from "react";

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.59-.59a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    city: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Message sent! We'll be in touch soon.");
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <p style={styles.tagline}>GET IN TOUCH</p>
        <h1 style={styles.title}>We're Here for You</h1>
        <p style={styles.subtitle}>
          Whether you need a consultation or have a question about our orthopedic services,<br />
          reach out to us.
        </p>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Left: Contact Info */}
        <div style={styles.leftPanel}>
          {/* Phone */}
          <div style={styles.contactCard}>
            <div style={styles.iconWrap}>
              <PhoneIcon />
            </div>
            <div>
              <p style={styles.cardLabel}>Phone</p>
              <p style={styles.cardLink}>9049200041 (India)</p>
              <p style={styles.cardLink}>9049200061 (India)</p>
              <p style={styles.cardSub}>Available for appointments</p>
            </div>
          </div>

          {/* Email */}
          <div style={styles.contactCard}>
            <div style={styles.iconWrap}>
              <EmailIcon />
            </div>
            <div>
              <p style={styles.cardLabel}>Email</p>
              <p style={styles.cardSub}>Online support available</p>
            </div>
          </div>

          {/* Dubai Clinic */}
          <div style={styles.contactCard}>
            <div style={{ ...styles.iconWrap, color: "#22c55e" }}>
              <LocationIcon />
            </div>
            <div>
              <p style={styles.cardLabel}>Dubai Clinic</p>
              <p style={styles.cardText}>Canadian Specialist Hospital</p>
              <p style={styles.cardSub}>Dubai, United Arab Emirates</p>
            </div>
          </div>

          {/* Pune Clinic */}
          <div style={styles.contactCard}>
            <div style={{ ...styles.iconWrap, color: "#22c55e" }}>
              <LocationIcon />
            </div>
            <div>
              <p style={styles.cardLabel}>Pune Clinic (India)</p>
              <p style={styles.cardText}>Sunshine Childrens Clinic, Majestique BIZNOW Bldg</p>
              <p style={styles.cardSub}>Kondhwa, Pune, Maharashtra</p>
            </div>
          </div>

          {/* Social */}
          <div style={styles.socialSection}>
            <p style={styles.socialLabel}>Connect with Us</p>
            <div style={styles.socialIcons}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon, ChatIcon].map((Icon, i) => (
                <button key={i} style={styles.socialBtn}>
                  <Icon />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Send Us a Message</h2>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <input
                style={styles.input}
                name="city"
                placeholder="Dubai"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                style={styles.input}
                name="phone"
                placeholder="+971 55 000 0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={styles.formGroupFull}>
            <label style={styles.label}>Service Type</label>
            <select
              style={styles.input}
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option value="">Select a service</option>
              <option value="consultation">Consultation</option>
              <option value="surgery">Surgery</option>
              <option value="physiotherapy">Physiotherapy</option>
              <option value="second-opinion">Second Opinion</option>
            </select>
          </div>

          <div style={styles.formGroupFull}>
            <label style={styles.label}>Message</label>
            <textarea
              style={{ ...styles.input, height: "110px", resize: "vertical" }}
              name="message"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button style={styles.submitBtn} onClick={handleSubmit}>
            <SendIcon />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f8",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "40px 24px 60px", // Reduced top padding to pull title and cards higher up since header is relative
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px", // Reduced margin to lift the form cards
  },
  tagline: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  title: {
    fontSize: "clamp(28px, 5vw, 44px)",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 16px",
  },
  subtitle: {
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.7",
    maxWidth: "480px",
    margin: "0 auto",
  },
  content: {
    display: "flex",
    gap: "32px",
    maxWidth: "1000px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  leftPanel: {
    flex: "1 1 280px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  contactCard: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  iconWrap: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#eff6ff",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "2px",
  },
  cardLabel: {
    fontWeight: "700",
    fontSize: "14px",
    color: "#0f172a",
    margin: "0 0 4px",
  },
  cardLink: {
    color: "#2563eb",
    fontSize: "13px",
    margin: "0 0 2px",
    fontWeight: "500",
  },
  cardText: {
    color: "#334155",
    fontSize: "13px",
    margin: "0 0 2px",
  },
  cardSub: {
    color: "#94a3b8",
    fontSize: "12px",
    margin: "0",
  },
  socialSection: {
    marginTop: "8px",
    paddingLeft: "4px",
  },
  socialLabel: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#0f172a",
    marginBottom: "12px",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  socialBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1.5px solid #e2e8f0",
    background: "#fff",
    color: "#475569",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  formCard: {
    flex: "1 1 380px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px 28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 24px",
  },
  formRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  formGroup: {
    flex: "1 1 140px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  formGroupFull: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "16px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#0f172a",
    background: "#fff",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "#1e3a5f",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "8px",
    transition: "background 0.2s",
  },
};
