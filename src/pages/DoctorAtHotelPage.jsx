import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const trustCards = [
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Qualified & Experienced Doctors",
    desc: "Doctors for hotel service at CORX Healthcare are licensed by local authorities (DHA) and have experience in treating most non-emergency medical conditions in a structured clinical manner.",
    badge: "DHA Licensed",
    badgeColor: "#e1f5ee",
    badgeText: "#5eb63b",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "24/7 Availability Across Dubai",
    desc: "Our service is organized to facilitate prompt doctor visits to your hotel across Dubai, minimizing delays. Our coordination team ensures smooth scheduling for efficient arrival.",
    badge: "Prompt Response",
    badgeColor: "#E6F1FB",
    badgeText: "#08709d",
  },
  {
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    title: "Safety & Personalization",
    desc: "Receiving care in your hotel room allows you to remain in a comfortable environment and avoid crowded hospital waiting rooms. We focus on providing safe, evidence-based, one-on-one consultations.",
    badge: "Private & Safe",
    badgeColor: "#FAEEDA",
    badgeText: "#854F0B",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Patient-Focused Approach",
    desc: "Our doctors are multilingual, ensuring clear and effective communication. All consultations are tailored to the patient’s symptoms, medical history, and individual concerns.",
    badge: "Multilingual",
    badgeColor: "#EEEDFE",
    badgeText: "#534AB7",
  },
];

const reasons = [
  "Fever, flu, and viral symptoms need to be assessed and managed.",
  "Stomach discomfort, food-related illness, or dehydration during travel.",
  "Symptoms of respiratory illness include cough, cold, or throat irritation.",
  "Pain, tiredness, or overall lack of strength in day-to-day activities.",
  "Minor illnesses or skin issues that require medical attention.",
  "Prescription review or medication support when out of the home.",
  "General check-up on any sudden or non-emergency health issues.",
];

const reasonIcons = [
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
];

const steps = [
  {
    num: "01",
    title: "Share Your Details",
    desc: "Contact our team and provide your hotel location, symptoms, and preferred time for the visit.",
  },
  {
    num: "02",
    title: "Doctor Assignment & Confirmation",
    desc: "A suitable doctor is assigned to your hotel based on your needs. The visit is confirmed with clear communication regarding timing.",
  },
  {
    num: "03",
    title: "Receive Care in Your Room",
    desc: "Our doctor visits your hotel for a professional consultation, including assessment and guidance as required.",
  },
];

function SvgIcon({ path, size = 22, color = "#08709d" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const faqStyles = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes headerIn {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .faq-section {
    background: #f8fafc;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
  }
  .faq-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: radial-gradient(circle at 0% 0%, rgba(8,112,157,0.03) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(94,182,59,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  .faq-wrap {
    padding: 0 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    font-family: 'Poppins', sans-serif;
    position: relative;
    z-index: 1;
  }
  .faq-eyebrow {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; font-size: 14px; font-weight: 700;
    color: #08709d; letter-spacing: 0.12em;
    text-transform: uppercase; margin-bottom: 0.5rem;
    animation: headerIn 0.4s ease forwards;
  }
  .faq-title {
    font-size: 36px; font-weight: 800; color: #1a2340;
    text-align: center; margin: 0 0 0.5rem;
    animation: headerIn 0.4s 0.08s ease both;
    letter-spacing: -0.02em; text-transform: uppercase;
  }
  @media (max-width: 768px) { .faq-title { font-size: 26px; } }
  .faq-sub {
    font-size: 17px; color: #4b5563; text-align: center;
    max-width: 600px; margin: 0 auto 2rem; line-height: 1.6;
    animation: headerIn 0.4s 0.15s ease both;
  }
  .faq-list {
    display: flex; flex-direction: column;
    border: 1px solid #e5e7eb; border-radius: 20px;
    overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  .faq-item {
    border-bottom: 1px solid #e5e7eb; background: #fff;
    opacity: 0; animation: fadeSlideIn 0.45s cubic-bezier(.4,0,.2,1) forwards;
    transition: background 0.2s;
  }
  .faq-item:last-child { border-bottom: none; }
  .faq-item.open { background: #f9fafb; }
  .faq-btn {
    width: 100%; display: flex; align-items: center;
    justify-content: space-between; padding: 1.5rem 2rem;
    cursor: pointer; border: none; background: transparent;
    gap: 16px; text-align: left;
  }
  .faq-btn:hover { background: #f9fafb; }
  .faq-q {
    font-size: 17px; font-weight: 700; color: #1a2340;
    transition: color 0.2s; line-height: 1.4;
  }
  @media (max-width: 768px) { .faq-q { font-size: 15px; } }
  .faq-item.open .faq-q { color: #08709d; }
  .faq-icon {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid #d1d5db; display: flex;
    align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 24px; font-weight: 300;
    color: #6b7280; transition: all 0.35s cubic-bezier(.4,0,.2,1);
    background: #fff; line-height: 1; user-select: none;
  }
  .faq-item.open .faq-icon {
    background: #08709d; border-color: #08709d;
    color: #fff; transform: rotate(45deg);
  }
  .faq-body {
    display: grid; grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(.4,0,.2,1);
  }
  .faq-item.open .faq-body { grid-template-rows: 1fr; }
  .faq-inner { overflow: hidden; }
  .faq-ans {
    margin: 0 2rem 1.5rem; padding: 0.75rem 1.25rem;
    font-size: 15px; color: #4b5563; line-height: 1.8;
    border-left: 4px solid #5eb63b; border-radius: 0 4px 4px 0;
    background: #f3fdf5;
  }
  @media (max-width: 768px) { .faq-ans { margin: 0 1.5rem 1.25rem; font-size: 14px; } }
  .faq-footer {
    text-align: center; margin-top: 2.5rem;
    font-size: 16px; color: #4b5563; font-weight: 500;
  }
  .faq-footer a {
    color: #08709d; font-weight: 700; text-decoration: none;
    border-bottom: 2px solid transparent; transition: border-color 0.2s;
  }
  .faq-footer a:hover { border-bottom-color: #08709d; }
`;

export default function DoctorAtHotelPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/services/doctor-at-hotel/')
      .then(res => res.json())
      .then(data => {
        setService({
          ...data,
          themeColor: data.theme_color,
          floatingBadge: data.floating_badge,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching service:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '10rem' }}>
        <div style={{ fontSize: '1.2rem', fontFamily: "'Poppins', sans-serif", color: '#08709d' }}>Loading details...</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#F8F9FA", color: "#333333", paddingTop: "100px" }}>
      <style>{`
        * { box-sizing: border-box; }
        a { text-decoration: none; }
        .dah-section { padding: 80px 40px; }
        .dah-section-alt { background: #fff; }
        .dah-container { max-width: 1100px; margin: 0 auto; }
        .dah-label {
          display: inline-flex; align-items: center; gap: 8px;
          background: #e8f4ec; color: #5eb63b;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 5px 14px; border-radius: 100px;
          margin-bottom: 16px; font-family: 'Poppins', sans-serif;
        }
        .dah-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800; line-height: 1.15; color: #1a294a; margin-bottom: 16px;
          text-transform: uppercase; letter-spacing: -0.01em;
        }
        .dah-desc { font-size: 15px; line-height: 1.8; color: #666666; max-width: 640px; margin-bottom: 20px; font-family: 'Poppins', sans-serif; }
        
        .dah-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #08709d; color: #fff; font-size: 14px; font-weight: 600;
          padding: 13px 28px; border-radius: 8px; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s; text-decoration: none;
          font-family: 'Poppins', sans-serif;
        }
        .dah-btn-primary:hover { background: #065f84; transform: translateY(-1px); }
        
        .dah-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #08709d; font-size: 14px; font-weight: 600;
          padding: 13px 28px; border-radius: 8px; border: 1.5px solid #08709d;
          cursor: pointer; transition: background 0.2s; text-decoration: none;
          font-family: 'Poppins', sans-serif;
        }
        .dah-btn-outline:hover { background: #e8f4f8; }
        
        .dah-trust-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .dah-trust-chip {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #5eb63b;
          background: #e8f4ec; padding: 6px 14px; border-radius: 100px;
          font-family: 'Poppins', sans-serif;
        }
        
        .dah-intro-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
        }
        .dah-img-wrap { position: relative; border-radius: 16px; overflow: hidden; }
        .dah-img-wrap img { width: 100%; height: 440px; object-fit: cover; display: block; }
        
        .dah-stat-pill {
          position: absolute; bottom: 24px; left: 24px;
          background: rgba(255,255,255,0.95); border-radius: 12px; padding: 14px 20px;
          display: flex; align-items: center; gap: 12px; border: 1px solid #EEEEEE;
        }
        .dah-stat-num { font-family: 'Montserrat', sans-serif; font-size: 22px; color: #1a294a; font-weight: 800; }
        .dah-stat-lbl { font-size: 11px; color: #666666; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; font-family: 'Poppins', sans-serif; }
        
        .dah-why-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 48px;
        }
        @media (max-width: 768px) {
          .dah-why-grid { grid-template-columns: 1fr; }
        }
        
        .dah-why-card {
          background: #08709d; border: 1px solid #08709d; border-radius: 14px; padding: 28px 24px;
          transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .dah-why-card:hover { border-color: #5eb63b; background: #065f84; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(8,112,157,0.15); }
        .dah-icon-wrap {
          width: 48px; height: 48px; border-radius: 12px; background: rgba(255, 255, 255, 0.15);
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .dah-badge {
          display: inline-block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px; margin-bottom: 10px;
          font-family: 'Poppins', sans-serif;
        }
        .dah-why-card h3 { font-size: 17px; font-weight: 700; color: #ffffff; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
        .dah-why-card p { font-size: 14px; line-height: 1.7; color: rgba(255, 255, 255, 0.9); font-family: 'Poppins', sans-serif; }
        
        .dah-services-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; margin-top: 40px;
        }
        .dah-service-item {
          display: flex; align-items: flex-start; gap: 12px;
          background: #08709d; border: 1px solid #08709d; border-radius: 10px; padding: 16px 20px;
          transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .dah-service-item:hover { border-color: #5eb63b; background: #065f84; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(8,112,157,0.15); }
        .dah-service-icon {
          width: 32px; height: 32px; border-radius: 8px; background: rgba(255, 255, 255, 0.15);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
        }
        .dah-service-item span { font-size: 14px; font-weight: 500; color: #ffffff; line-height: 1.5; font-family: 'Poppins', sans-serif; }
        
        .dah-cta-banner {
          background: linear-gradient(135deg, #08709d 0%, #1a294a 100%);
          border-radius: 20px; padding: 56px 48px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
        }
        .dah-cta-banner h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.4rem,2.5vw,1.9rem); color: #ffffff;
          font-weight: 800; max-width: 580px; text-transform: uppercase;
        }
        .dah-cta-banner p { font-size: 14px; color: rgba(255,255,255,0.75); margin-top: 8px; font-family: 'Poppins', sans-serif; }
        
        .dah-btn-white {
          display: inline-flex; align-items: center; gap: 8px;
          background: #5eb63b; color: #fff; font-size: 14px; font-weight: 700;
          padding: 14px 32px; border-radius: 8px; border: none; cursor: pointer;
          transition: background 0.2s; white-space: nowrap; text-decoration: none;
          font-family: 'Poppins', sans-serif;
        }
        .dah-btn-white:hover { background: #4ca030; }

        .dah-steps-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 48px;
        }
        @media (max-width: 768px) {
          .dah-steps-grid { grid-template-columns: 1fr; gap: 24px; }
        }
        .dah-step-card {
          background: #fff; border: 1px solid #EEEEEE; border-radius: 16px; padding: 32px 24px;
          position: relative; overflow: hidden;
        }
        .dah-step-num {
          font-family: 'Montserrat', sans-serif; font-size: 40px; font-weight: 900;
          color: rgba(8, 112, 157, 0.1); position: absolute; top: 16px; right: 24px;
        }
        .dah-step-card h3 {
          font-size: 17px; font-weight: 700; color: #1a294a; margin-bottom: 12px;
          font-family: 'Montserrat', sans-serif; margin-top: 8px;
        }
        .dah-step-card p {
          font-size: 14px; line-height: 1.6; color: #666666; font-family: 'Poppins', sans-serif;
        }
        
        @media (max-width: 720px) {
          .dah-section { padding: 56px 20px; }
          .dah-intro-grid { grid-template-columns: 1fr; gap: 32px; }
          .dah-cta-banner { padding: 36px 24px; }
        }
        ${faqStyles}
      `}</style>

      {/* ── Intro Section ── */}
      <section className="dah-section dah-section-alt">
        <div className="dah-container">
          <div className="dah-intro-grid">
            <div>
              <div className="dah-label">
                <SvgIcon path="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" size={14} color="#5eb63b" />
                CORX Healthcare Dubai
              </div>
              <h2 className="dah-title">Contact a Doctor at Hotel in Dubai</h2>
              <p className="dah-desc">
                Get a professional doctor at hotel in Dubai and anywhere across the UAE. Whether you require an immediate in-room consultation for a sudden illness, a routine check-up, or immediate medical attention, our doctor at the hotel service provides structured, patient-focused care in your room.
              </p>
              <p className="dah-desc">
                As a DHA licensed team, CORX Healthcare services are designed to support comfort, privacy, and timely care, especially for tourists & travellers, business professionals, and families & children in Dubai looking for medical assistance during their stay. Book your doctor at hotel dubai now at an affordable price!
              </p>
              
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
                <a href="tel:+971547033311" className="dah-btn-primary">
                  <SvgIcon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" size={16} color="#fff" />
                  Book An Appointment
                </a>
                <a href="https://wa.me/97143320776" target="_blank" rel="noopener noreferrer" className="dah-btn-outline">
                  <SvgIcon path="M13 7l5 5m0 0l-5 5m5-5H6" size={16} color="#08709d" />
                  WhatsApp Now
                </a>
              </div>
              
              <div className="dah-trust-row">
                {["DHA Licensed", "30-45 Min Response", "Tourist-Friendly", "Insurance Documentation"].map(t => (
                  <div key={t} className="dah-trust-chip">
                    <SvgIcon path="M5 13l4 4L19 7" size={13} color="#5eb63b" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="dah-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1590615365120-e4fa50d4b714?w=800&q=80&auto=format&fit=crop"
                alt="Professional doctor examining patient in hotel room in Dubai"
              />
              <div className="dah-stat-pill">
                <div style={{ textAlign: "center" }}>
                  <div className="dah-stat-num">24/7</div>
                  <div className="dah-stat-lbl">In-Room Doctor</div>
                </div>
                <div style={{ width: 1, height: 36, background: "#e2e8f0" }} />
                <div style={{ textAlign: "center" }}>
                  <div className="dah-stat-num">UAE</div>
                  <div className="dah-stat-lbl">Wide Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Common Reasons Section ── */}
      <section className="dah-section">
        <div className="dah-container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="dah-label" style={{ display: "inline-flex" }}>
              <SvgIcon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" size={14} color="#5eb63b" />
              Symptom Guide
            </div>
            <h2 className="dah-title" style={{ margin: "0 auto 12px" }}>Common Reasons to Call a Doctor at Your Hotel in Dubai</h2>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 660, margin: "0 auto" }}>
              Our doctor at hotel service in Dubai is often called upon to address various medical issues in which in-room care is required at the earliest. Patients usually need assistance with:
            </p>
          </div>
          
          <div className="dah-services-grid">
            {reasons.map((r, i) => (
              <div key={i} className="dah-service-item">
                <div className="dah-service-icon">
                  <SvgIcon path={reasonIcons[i] || reasonIcons[0]} size={18} color="#ffffff" />
                </div>
                <span>{r}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <p style={{ fontSize: "15px", color: "#666", marginBottom: "20px" }}>
              CORX Healthcare offers convenient and professional doctor at hotel services, allowing you to comfortably manage your condition without interrupting your stay.
            </p>
            <a href="tel:+971547033311" className="dah-btn-primary">
              Book Now
              <SvgIcon path="M13 7l5 5m0 0l-5 5m5-5H6" size={16} color="#fff" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Business or Leisure Banner Section ── */}
      <section className="dah-section dah-section-alt" style={{ borderTop: "1px solid #EEEEEE", borderBottom: "1px solid #EEEEEE" }}>
        <div className="dah-container">
          <div className="dah-intro-grid" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
            <div className="dah-img-wrap" style={{ order: window.innerWidth > 720 ? 1 : 2 }}>
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format&fit=crop"
                alt="Tourist staying healthy during travel in Dubai"
              />
            </div>
            <div style={{ order: 1 }}>
              <div className="dah-label">
                <SvgIcon path="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" size={14} color="#5eb63b" />
                Travel Wellness
              </div>
              <h2 className="dah-title">Stay Healthy and Focused – Expert Medical Doctor at Hotel for Business or Leisure</h2>
              <p className="dah-desc">
                Dubai is a hub for business travelers and tourists alike. While the city offers world-class amenities, the demands of travel can take a toll on your health. Our Dubai doctors at hotel services ensure that you remain in optimal health throughout your stay, allowing you to focus on your meetings, sightseeing, or relaxation.
              </p>
              <p className="dah-desc">
                From managing stress-related symptoms to addressing travel-related conditions, we provide comprehensive home health care support to keep you feeling your best. Corx is 24/7 ready to send doctors to the hotel doorstep.
              </p>
              <a href="tel:+971547033311" className="dah-btn-primary" style={{ marginTop: "8px" }}>
                Book An Appointment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Trust Us Section ── */}
      <section className="dah-section">
        <div className="dah-container">
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div className="dah-label" style={{ display: "inline-flex" }}>
              <SvgIcon path="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" size={14} color="#5eb63b" />
              Clinical Quality
            </div>
            <h2 className="dah-title" style={{ margin: "0 auto 12px" }}>Why Trust Our Doctor at Hotel Services in Dubai?</h2>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
              Choosing a doctor at hotel Dubai requires confidence in clinical standards, responsiveness, and professionalism. Here’s what we offer:
            </p>
          </div>
          
          <div className="dah-why-grid">
            {trustCards.map((c) => (
              <div key={c.title} className="dah-why-card">
                <div className="dah-icon-wrap">
                  <SvgIcon path={c.icon} size={22} color="#ffffff" />
                </div>
                <span className="dah-badge" style={{ background: c.badgeColor, color: c.badgeText }}>{c.badge}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Book Section ── */}
      <section className="dah-section dah-section-alt" style={{ borderTop: "1px solid #EEEEEE" }}>
        <div className="dah-container">
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div className="dah-label" style={{ display: "inline-flex" }}>
              <SvgIcon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" size={14} color="#5eb63b" />
              Easy Booking
            </div>
            <h2 className="dah-title" style={{ margin: "0 auto 12px" }}>How to Book a Doctor at Your Hotel in Dubai?</h2>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
              Booking a doctor at hotel Dubai is simple and tension-free at CORX. Contact us via our website or phone, and we will arrange for a doctor to visit hotel at your selected time. Whether you need quick help or want to schedule a preventative health check-up, we’re here to adjust your needs.
            </p>
          </div>
          
          <div className="dah-steps-grid">
            {steps.map((s, idx) => (
              <div key={idx} className="dah-step-card">
                <div className="dah-step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="dah-section">
        <div className="dah-container">
          <div className="dah-cta-banner">
            <div>
              <h2>Need a Doctor in Your Hotel Room in Dubai?</h2>
              <p>Available 24/7 · DHA Licensed · 30–45 min response across all major hotel districts</p>
            </div>
            <a href="tel:+971547033311" className="dah-btn-white">
              Call Now
              <SvgIcon path="M13 7l5 5m0 0l-5 5m5-5H6" size={16} color="#fff" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      {service && (
        <section className="faq-section">
          <div className="faq-wrap">
            <div className="faq-eyebrow">⊙ Common Questions</div>
            <h2 className="faq-title">Doctor at Hotel FAQs</h2>
            <p className="faq-sub">
              Find answers to the most common questions about our hotel room doctor visits in Dubai.
            </p>
            <div className="faq-list">
              {service.faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`faq-item${isOpen ? " open" : ""}`}
                    style={{ animationDelay: `${0.05 + i * 0.08}s` }}
                  >
                    <button className="faq-btn" onClick={() => toggle(i)} aria-expanded={isOpen}>
                      <span className="faq-q">{faq.q}</span>
                      <span className="faq-icon">+</span>
                    </button>
                    <div className="faq-body">
                      <div className="faq-inner">
                        <div className="faq-ans">{faq.a}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="faq-footer">
              Still have questions?{" "}
              <Link to="/contact">Contact our support team</Link>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
