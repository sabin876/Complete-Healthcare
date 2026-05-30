import { useState } from "react";
import { Link } from "react-router-dom";
import { servicesData } from "../data/servicesData";

const whyCards = [
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "DHA Licensed Doctors",
    desc: "All consultations handled by fully DHA-approved doctors trained to deliver safe, professional home healthcare in Dubai.",
    badge: "Certified",
    badgeColor: "#e1f5ee",
    badgeText: "#0F6E56",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "30–45 Min Response",
    desc: "Fast dispatch across Marina, Downtown Dubai, Business Bay, Jumeirah, Palm Jumeirah, JLT, Al Barsha and nearby areas.",
    badge: "Fast",
    badgeColor: "#E6F1FB",
    badgeText: "#185FA5",
  },
  {
    icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    title: "24/7 Doctor on Call",
    desc: "Available day and night, including weekends and public holidays, for urgent medical consultations.",
    badge: "Always Open",
    badgeColor: "#FAEEDA",
    badgeText: "#854F0B",
  },
  {
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    title: "Home, Hotel & Office",
    desc: "We visit Apartments, Villas, Hotels, Offices, Tourist accommodations and Elderly care residences across Dubai.",
    badge: "All Locations",
    badgeColor: "#EEEDFE",
    badgeText: "#534AB7",
  },
  {
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    title: "Comfortable & Private",
    desc: "Avoid long hospital wait times and receive treatment comfortably in your own environment.",
    badge: "Private",
    badgeColor: "#FBEAF0",
    badgeText: "#993556",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Family & Elderly Care",
    desc: "Supporting children with fever, elderly with mobility concerns, chronic disease patients and post-hospital recovery.",
    badge: "All Ages",
    badgeColor: "#e1f5ee",
    badgeText: "#0F6E56",
  },
];

const services = [
  "General medical consultation",
  "Fever and flu treatment",
  "Food poisoning treatment",
  "Stomach pain & vomiting management",
  "IV drip therapy at home",
  "Dehydration treatment",
  "Blood pressure & diabetes monitoring",
  "Respiratory infection assessment",
  "Migraine and headache treatment",
  "Elderly doctor visits",
  "Hotel doctor services in Dubai",
  "Prescription support",
  "Insurance sick leave certificates",
  "Laboratory sample collection at home",
  "Follow-up doctor visits",
  "Chronic disease management",
];

const serviceIcons = [
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
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

export default function DoctorAtHomePage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  const service = servicesData["doctor-at-home"];

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
        .dah-img-wrap img { width: 100%; height: 420px; object-fit: cover; display: block; }
        .dah-stat-pill {
          position: absolute; bottom: 24px; left: 24px;
          background: rgba(255,255,255,0.95); border-radius: 12px; padding: 14px 20px;
          display: flex; align-items: center; gap: 12px; border: 1px solid #EEEEEE;
        }
        .dah-stat-num { font-family: 'Montserrat', sans-serif; font-size: 22px; color: #1a294a; font-weight: 800; }
        .dah-stat-lbl { font-size: 11px; color: #666666; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; font-family: 'Poppins', sans-serif; }
        .dah-why-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); gap: 20px; margin-top: 48px;
        }
        .dah-why-card {
          background: #fff; border: 1px solid #EEEEEE; border-radius: 14px; padding: 28px 24px;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .dah-why-card:hover { border-color: #08709d; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(8,112,157,0.1); }
        .dah-icon-wrap {
          width: 48px; height: 48px; border-radius: 12px; background: #e8f4f8;
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .dah-badge {
          display: inline-block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px; margin-bottom: 10px;
          font-family: 'Poppins', sans-serif;
        }
        .dah-why-card h3 { font-size: 16px; font-weight: 700; color: #1a294a; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
        .dah-why-card p { font-size: 14px; line-height: 1.7; color: #666666; font-family: 'Poppins', sans-serif; }
        .dah-services-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); gap: 12px; margin-top: 48px;
        }
        .dah-service-item {
          display: flex; align-items: center; gap: 12px;
          background: #fff; border: 1px solid #EEEEEE; border-radius: 10px; padding: 14px 16px;
          transition: border-color 0.2s, background 0.2s;
        }
        .dah-service-item:hover { border-color: #08709d; background: #f0f8fc; }
        .dah-service-icon {
          width: 36px; height: 36px; border-radius: 8px; background: #e8f4f8;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .dah-service-item span { font-size: 13.5px; font-weight: 500; color: #333333; line-height: 1.4; font-family: 'Poppins', sans-serif; }
        .dah-cta-banner {
          background: linear-gradient(135deg, #08709d 0%, #1a294a 100%);
          border-radius: 20px; padding: 56px 48px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
        }
        .dah-cta-banner h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.4rem,2.5vw,1.9rem); color: #ffffff;
          font-weight: 800; max-width: 480px; text-transform: uppercase;
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
        @media (max-width: 720px) {
          .dah-section { padding: 56px 20px; }
          .dah-intro-grid { grid-template-columns: 1fr; gap: 32px; }
          .dah-cta-banner { padding: 36px 24px; }
          .dah-why-grid { grid-template-columns: 1fr; }
        }
        ${faqStyles}
      `}</style>

      {/* ── Intro ── */}
      <section className="dah-section dah-section-alt">
        <div className="dah-container">
          <div className="dah-intro-grid">
            <div>
              <div className="dah-label">
                <SvgIcon path="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" size={14} color="#5eb63b" />
                Corx Healthcare Dubai
              </div>
              <h2 className="dah-title">Reasons to Call Doctor at Home Dubai</h2>
              <p className="dah-desc">
                CORX Healthcare provides professional doctors at home services in Dubai for residents, families, elderly patients, business travelers, and tourists staying in hotels. Our DHA-licensed home visit doctors deliver medical consultations, treatment, prescriptions, sick leave certificates, and follow-up care directly at your location.
              </p>
              <p className="dah-desc">
                Whether you need a doctor for fever, flu, food poisoning, dehydration, chronic disease management, or urgent medical care, our team is available 24/7 across Dubai — combining rapid response with trusted healthcare standards.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
                <a href="tel:+971547033311" className="dah-btn-primary">
                  <SvgIcon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" size={16} color="#fff" />
                  Call Now
                </a>
                <a href="https://wa.me/971547033311" target="_blank" rel="noopener noreferrer" className="dah-btn-outline">
                  <SvgIcon path="M13 7l5 5m0 0l-5 5m5-5H6" size={16} color="#08709d" />
                  WhatsApp Now
                </a>
              </div>
              <div className="dah-trust-row">
                {["DHA Licensed", "24/7 Available", "30 Min Response", "500+ Doctors"].map(t => (
                  <div key={t} className="dah-trust-chip">
                    <SvgIcon path="M5 13l4 4L19 7" size={13} color="#5eb63b" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="dah-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop"
                alt="Doctor providing home care in Dubai"
              />
              <div className="dah-stat-pill">
                <div style={{ textAlign: "center" }}>
                  <div className="dah-stat-num">24/7</div>
                  <div className="dah-stat-lbl">Always On Call</div>
                </div>
                <div style={{ width: 1, height: 36, background: "#e2e8f0" }} />
                <div style={{ textAlign: "center" }}>
                  <div className="dah-stat-num">500+</div>
                  <div className="dah-stat-lbl">Expert Doctors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="dah-section">
        <div className="dah-container">
          <div style={{ textAlign: "center" }}>
            <div className="dah-label" style={{ display: "inline-flex" }}>
              <SvgIcon path="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" size={14} color="#5eb63b" />
              Why Choose Us
            </div>
            <h2 className="dah-title" style={{ margin: "0 auto 12px" }}>Why Patients Choose Our Doctor at Home Service</h2>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              We prioritise your well-being with services tailored to each patient's unique needs, delivered in the comfort of their home.
            </p>
          </div>
          <div className="dah-why-grid">
            {whyCards.map((c) => (
              <div key={c.title} className="dah-why-card">
                <div className="dah-icon-wrap">
                  <SvgIcon path={c.icon} size={22} color="#08709d" />
                </div>
                <span className="dah-badge" style={{ background: c.badgeColor, color: c.badgeText }}>{c.badge}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="dah-section dah-section-alt">
        <div className="dah-container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div className="dah-label">
                <SvgIcon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" size={14} color="#5eb63b" />
                What We Treat
              </div>
              <h2 className="dah-title">Features of Our Doctor at Home Services</h2>
              <p className="dah-desc">Our home doctor service in Dubai covers a comprehensive range of medical needs — from acute illness to ongoing chronic care.</p>
            </div>
            <a href="tel:+971547033311" className="dah-btn-primary" style={{ marginBottom: 36 }}>
              Book Now
              <SvgIcon path="M13 7l5 5m0 0l-5 5m5-5H6" size={16} color="#fff" />
            </a>
          </div>
          <div className="dah-services-grid">
            {services.map((s, i) => (
              <div key={s} className="dah-service-item">
                <div className="dah-service-icon">
                  <SvgIcon path={serviceIcons[i] || serviceIcons[0]} size={18} color="#08709d" />
                </div>
                <span>{s}</span>
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
              <h2>Need a Doctor at Your Doorstep in Dubai?</h2>
              <p>Available 24/7 · DHA Licensed · 30–45 min response across all Dubai areas</p>
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
            <h2 className="faq-title">Doctor at Home FAQs</h2>
            <p className="faq-sub">
              Find answers to the most common questions about our doctor at home service in Dubai.
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
