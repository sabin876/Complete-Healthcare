import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

/* ─── FAQ Data ───────────────────────────────────── */
const faqData = [
  {
    question: "How do I book an appointment?",
    answer: "Simply fill out the form above with your name, email, phone number, and optional message. Our dedicated patient care team will contact you within 15 to 30 minutes to confirm your preferred doctor, consultation time slot, and specific medical needs."
  },
  {
    question: "Can I schedule a home health visit or lab test?",
    answer: "Yes, absolutely! We offer comprehensive home healthcare services, including home doctor consultancies, skilled nursing care, physiotherapy, and sample collections for laboratory tests in the comfort of your home. Please mention your preference in the message field."
  },
  {
    question: "What happens after I submit the appointment form?",
    answer: "Once submitted, you will see a confirmation message on your screen. An automated notification is sent to our medical coordinators immediately. A dedicated agent will contact you shortly via phone or WhatsApp to finalize your booking."
  },
  {
    question: "Is 24/7 medical assistance available?",
    answer: "Yes, Complete Healthcare operates 24 hours a day, 7 days a week. For urgent consultations or late-night medical guidance, you can call our hotlines directly at +971 54 703 3311 or +971 50 278 5990 for immediate assistance."
  },
  {
    question: "Which locations do you serve in the UAE?",
    answer: "We primarily serve across Dubai, including Dubai Investment Park (DIP), Green Community, Jumeirah, Marina, and surrounding areas. Our home healthcare teams are equipped to reach you anywhere in Dubai rapidly."
  }
];

export default function Contact() {
  const [activeIndex, setActiveIndex] = useState(null);
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

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
          {/* Emergency */}
          <div style={styles.contactCard}>
            <div style={styles.iconWrap}>
              <PhoneIcon />
            </div>
            <div>
              <p style={styles.cardLabel}>Emergency</p>
              <a href="tel:+971547033311" style={styles.cardLink}>+971-547-033311</a>
              <a href="tel:+97143320776" style={{ ...styles.cardLink, display: "block" }}>+971-433-20776</a>
              <p style={styles.cardSub}>Call us 24/7 for immediate medical aid</p>
            </div>
          </div>

          {/* Address */}
          <div style={styles.contactCard}>
            <div style={{ ...styles.iconWrap, color: "#5eb63b", background: "rgba(94, 182, 59, 0.1)" }}>
              <LocationIcon />
            </div>
            <div>
              <p style={styles.cardLabel}>Address</p>
              <p style={styles.cardText}>Office 303, Royal Class Building</p>
              <p style={styles.cardSub}>DIP, Dubai, United Arab Emirates</p>
            </div>
          </div>

          {/* Email & Website */}
          <div style={styles.contactCard}>
            <div style={styles.iconWrap}>
              <EmailIcon />
            </div>
            <div>
              <p style={styles.cardLabel}>Email & Website</p>
              <a href="mailto:info@corx.ae" style={styles.cardLink}>info@corx.ae</a>
              <a href="https://www.corx.ae" target="_blank" rel="noopener noreferrer" style={{ ...styles.cardLink, display: "block" }}>www.corx.ae</a>
              <p style={styles.cardSub}>Online support & information</p>
            </div>
          </div>

          {/* Working Hours */}
          <div style={styles.contactCard}>
            <div style={{ ...styles.iconWrap, color: "#08709d", background: "rgba(8, 112, 157, 0.1)" }}>
              <ClockIcon />
            </div>
            <div>
              <p style={styles.cardLabel}>Working Hours</p>
              <p style={styles.cardText}>Mon-Sat: 8:00 - 17:00</p>
              <p style={{ ...styles.cardSub, color: "#dc2626", fontWeight: "700" }}>Sunday: Emergency Only</p>
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

          <motion.button
            style={styles.submitBtn}
            onClick={handleSubmit}
            whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(8, 112, 157, 0.35)", background: "#5eb63b" }}
            whileTap={{ scale: 0.97 }}
          >
            <SendIcon />
            Send Message
          </motion.button>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={styles.faqSection}>
        <div style={styles.faqEyebrow}>
          ⊙ Common Questions
        </div>
        <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
        <p style={styles.faqSub}>
          Find answers to the most common questions about booking your appointments and home healthcare visits in Dubai.
        </p>

        <div style={styles.faqList}>
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                layout="position"
                style={{
                  background: "transparent",
                  border: isOpen ? "1.5px solid #2563eb" : "1.5px solid #e2e8f0",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "12px",
                  transition: "border-color 0.3s ease",
                }}
                whileHover={{
                  borderColor: isOpen ? "#2563eb" : "#cbd5e1",
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#0f172a",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    fontWeight: 700,
                    gap: "16px",
                  }}
                >
                  <span>{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? "#2563eb" : "#64748b",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div style={{
                        padding: "0 20px 20px 20px",
                        color: "#475569",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        fontWeight: 500,
                      }}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px 24px 60px",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
  },
  tagline: {
    color: "#08709d",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "6px",
    fontFamily: "'Montserrat', sans-serif",
  },
  title: {
    fontSize: "clamp(32px, 6vw, 50px)",
    fontWeight: "800",
    color: "#1a294a",
    margin: "0 0 10px",
    fontFamily: "'Montserrat', sans-serif",
  },
  subtitle: {
    color: "#4b5563",
    fontSize: "17px",
    lineHeight: "1.7",
    maxWidth: "540px",
    margin: "0 auto",
    fontFamily: "'Poppins', sans-serif",
  },
  content: {
    display: "flex",
    gap: "32px",
    maxWidth: "1150px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  leftPanel: {
    flex: "1 1 320px",
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
    background: "rgba(8, 112, 157, 0.1)",
    color: "#08709d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "2px",
  },
  cardLabel: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#1a294a",
    margin: "0 0 4px",
    fontFamily: "'Montserrat', sans-serif",
  },
  cardLink: {
    color: "#08709d",
    fontSize: "15px",
    margin: "0 0 2px",
    fontWeight: "500",
    fontFamily: "'Poppins', sans-serif",
  },
  cardText: {
    color: "#1a294a",
    fontSize: "15px",
    margin: "0 0 2px",
    fontFamily: "'Poppins', sans-serif",
  },
  cardSub: {
    color: "#4b5563",
    fontSize: "13.5px",
    margin: "0",
    fontFamily: "'Poppins', sans-serif",
  },
  socialSection: {
    marginTop: "8px",
    paddingLeft: "4px",
  },
  socialLabel: {
    fontWeight: "600",
    fontSize: "16px",
    color: "#1a294a",
    marginBottom: "12px",
    fontFamily: "'Montserrat', sans-serif",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  socialBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1.5px solid #e5e7eb",
    background: "#fff",
    color: "#1a294a",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  formCard: {
    flex: "1 1 480px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "36px 32px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  formTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a294a",
    margin: "0 0 24px",
    fontFamily: "'Montserrat', sans-serif",
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
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a294a",
    fontFamily: "'Montserrat', sans-serif",
  },
  input: {
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "16px",
    color: "#1a294a",
    background: "#fff",
    outline: "none",
    fontFamily: "'Poppins', sans-serif",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  submitBtn: {
    width: "100%",
    padding: "16px",
    background: "#08709d",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "8px",
    fontFamily: "'Montserrat', sans-serif",
    transition: "all 0.3s ease",
  },
  faqSection: {
    width: "100%",
    maxWidth: "800px",
    margin: "80px auto 0",
    fontFamily: "inherit",
  },
  faqEyebrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#08709d",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "10px",
    fontFamily: "'Montserrat', sans-serif",
  },
  faqTitle: {
    fontSize: "clamp(22px, 3.5vw, 30px)",
    fontWeight: "800",
    color: "#1a294a",
    textAlign: "center",
    margin: "0 0 10px 0",
    fontFamily: "'Montserrat', sans-serif",
  },
  faqSub: {
    fontSize: "14px",
    color: "#4b5563",
    textAlign: "center",
    maxWidth: "560px",
    margin: "0 auto 36px",
    lineHeight: "1.6",
    fontFamily: "'Poppins', sans-serif",
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
};
