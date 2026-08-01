import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiceHighlightsBar from '../components/ServiceHighlightsBar';
import {
  Container,
  Section,
  Button,
  Card,
  HeroTitle,
  SectionTitle,
  CardTitle,
  Paragraph,
  SmallText
} from '../components/ui';
import {
  Check,
  CalendarDays,
  MessageSquare,
  ArrowRight,
  Activity,
  Heart,
  ShieldCheck,
  Clock,
  Stethoscope,
  Syringe,
  Star
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const heroFeatures = [
  'DHA-licensed registered nurses',
  'Post-operative & wound care',
  'Medication & injection administration',
  '24/7 night nurse & live-in options',
  'Palliative & elderly nursing support'
];

const clinicalIndications = [
  'Post-surgery wound dressing & care',
  'Catheter insertion & management',
  'IV line & infusion maintenance',
  'Injection & medication administration',
  'Nasogastric tube feeding support',
  'Tracheostomy care & management',
  'Vital signs monitoring & reporting',
  'Palliative & end-of-life care support',
  'Overnight night nurse for recovery',
  'Post-stroke or neurological care',
  'Cancer & chemotherapy home support',
  'Diabetic wound & foot care'
];

const nursingColumns = [
  {
    title: 'Post-Op & Wound Care',
    tagline: 'Surgery recovery & wound management',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    items: [
      'Post-surgery wound dressing',
      'Suture & staple removal',
      'Drain tube management',
      'Catheter care',
      'Colostomy care',
      'Diabetic wound care',
      'Pressure ulcer management',
      'Burn & skin wound care'
    ],
    delay: 0.05
  },
  {
    title: 'Specialized Nursing',
    tagline: 'Clinical procedures & specialized support',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
      </svg>
    ),
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    items: [
      'IV line maintenance',
      'Nasogastric tube feeding',
      'Tracheostomy care',
      'Ventilator monitoring',
      'Oxygen therapy support',
      'Blood glucose monitoring',
      'Vital signs monitoring',
      'Palliative & hospice care'
    ],
    delay: 0.12
  },
  {
    title: 'Medication & Support',
    tagline: 'Injections, infusions & overnight care',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    items: [
      'Injection administration',
      'IV antibiotic therapy',
      'Medication management',
      'Night nurse (8-12 hr)',
      'Live-in nurse',
      'Post-stroke nursing',
      'Elderly home nursing',
      'Cancer care support'
    ],
    delay: 0.19
  }
];

const whyReasons = [
  {
    num: '01',
    label: 'DHA-LICENSED NURSES',
    title: 'Registered nurses with full DHA licensing',
    desc: 'Every CORx nurse holds an active DHA license and carries extensive clinical experience across hospital and home care settings in the UAE.'
  },
  {
    num: '02',
    label: 'CLINICAL CARE PLANS',
    title: 'Personalized nursing care plans for every patient',
    desc: "We develop individualized nursing care plans in coordination with the patient's doctor, ensuring clinically appropriate, consistent, and trackable care delivery."
  },
  {
    num: '03',
    label: 'CONTINUOUS MONITORING',
    title: 'Real-time vitals monitoring & reporting to your doctor',
    desc: 'Our nurses monitor and document vital signs, wound healing, medication responses, and clinical observations — sharing regular updates with your physician.'
  },
  {
    num: '04',
    label: '24/7 AVAILABILITY',
    title: 'Nursing support available round the clock',
    desc: 'CORx Home Nursing is available 24 hours a day, 7 days a week including holidays. We offer shift-based, overnight, and live-in nursing packages to suit every need.'
  }
];

const nursingFaqs = [
  {
    q: 'What nursing services do you provide at home in Dubai?',
    a: 'We provide post-operative wound care, catheter management, IV therapy, medication & injection administration, nasogastric tube feeding, tracheostomy care, palliative nursing, night nurse, live-in nurse, vital signs monitoring, and more.'
  },
  {
    q: 'How quickly can a nurse arrive at my home?',
    a: 'In most cases, our DHA-licensed nurse can arrive within 30-60 minutes of booking. For scheduled appointments, we confirm the time in advance to suit your schedule.'
  },
  {
    q: 'Can I book an overnight or live-in nurse?',
    a: 'Yes. CORx offers 8-hour night nursing, 12-hour shift nursing, and full live-in nurse arrangements. Contact our team to discuss the package that best fits your situation.'
  },
  {
    q: 'Are your nurses qualified to handle complex medical procedures?',
    a: 'Yes. Our nurses are DHA-licensed registered nurses (RNs) with clinical experience in wound care, IV therapy, catheter management, tracheostomy care, palliative care, and more. Complex procedures are performed under medical supervision.'
  },
  {
    q: 'Do you provide nursing care for cancer patients at home?',
    a: 'Yes. We provide compassionate nursing support for oncology patients including chemotherapy monitoring, pain management assistance, wound care, IV therapy, and palliative care support - all delivered at home.'
  },
  {
    q: 'How much does a home nurse cost in Dubai?',
    a: 'Pricing depends on the type of service, duration, and frequency of visits. Contact us for a personalized quote. We also work with insurance providers for direct billing where applicable.'
  }
];

// ─── FAQ Styles (nursing-faq prefix) ─────────────────────────────────────────

const faqStyles = `
  @keyframes nursingFaqFadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes nursingFaqHeaderIn {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .nursing-faq-section {
    background: #f8fafc;
    padding: 60px 0;
    position: relative;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    .nursing-faq-section { padding: 40px 0; }
  }

  .nursing-faq-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle at 0% 0%, rgba(8, 112, 157, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(94, 182, 59, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .nursing-faq-wrap {
    padding: 0 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
    position: relative;
    z-index: 1;
  }

  .nursing-faq-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #08709d;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    animation: nursingFaqHeaderIn 0.4s ease forwards;
  }

  .nursing-faq-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a2340;
    text-align: center;
    margin: 0 0 0.5rem;
    animation: nursingFaqHeaderIn 0.4s 0.08s ease both;
    letter-spacing: -0.02em;
  }
  @media (max-width: 768px) {
    .nursing-faq-title { font-size: 28px; }
  }

  .nursing-faq-sub {
    font-size: 18px;
    color: #4b5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    animation: nursingFaqHeaderIn 0.4s 0.15s ease both;
  }
  @media (max-width: 768px) {
    .nursing-faq-sub { font-size: 15px; margin-bottom: 1.5rem; }
  }

  .nursing-faq-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .nursing-faq-item {
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
    opacity: 0;
    animation: nursingFaqFadeIn 0.45s cubic-bezier(.4,0,.2,1) forwards;
    transition: background 0.2s;
  }
  .nursing-faq-item:last-child { border-bottom: none; }
  .nursing-faq-item.open { background: #f9fafb; }

  .nursing-faq-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    cursor: pointer;
    border: none;
    background: transparent;
    gap: 16px;
    text-align: left;
  }
  @media (max-width: 768px) {
    .nursing-faq-btn { padding: 1.25rem 1.5rem; }
  }
  .nursing-faq-btn:hover { background: #f9fafb; }

  .nursing-faq-q {
    font-size: 18px;
    font-weight: 700;
    color: #1a2340;
    transition: color 0.2s;
    line-height: 1.4;
  }
  @media (max-width: 768px) {
    .nursing-faq-q { font-size: 16px; }
  }
  .nursing-faq-item.open .nursing-faq-q { color: #08709d; }

  .nursing-faq-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 24px;
    font-weight: 300;
    color: #6b7280;
    transition: all 0.35s cubic-bezier(.4,0,.2,1);
    background: #fff;
    line-height: 1;
    user-select: none;
  }
  @media (max-width: 640px) {
    .nursing-faq-icon { width: 30px; height: 30px; font-size: 20px; }
  }
  .nursing-faq-item.open .nursing-faq-icon {
    background: #08709d;
    border-color: #08709d;
    color: #fff;
    transform: rotate(45deg);
  }

  .nursing-faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(.4,0,.2,1);
  }
  .nursing-faq-item.open .nursing-faq-body { grid-template-rows: 1fr; }
  .nursing-faq-inner { overflow: hidden; }

  .nursing-faq-ans {
    margin: 0 2rem 1.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    color: #4b5563;
    line-height: 1.8;
    border-left: 4px solid #5eb63b;
    border-radius: 0 4px 4px 0;
    background: #f3fdf5;
  }
  @media (max-width: 768px) {
    .nursing-faq-ans { margin: 0 1.5rem 1.25rem; font-size: 14px; padding: 0.5rem 1rem; }
  }

  .nursing-faq-footer {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 16px;
    color: #4b5563;
    font-weight: 500;
  }
  @media (max-width: 640px) {
    .nursing-faq-footer { font-size: 14px; margin-top: 1.5rem; }
  }
  .nursing-faq-footer a {
    color: #08709d;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;
  }
  .nursing-faq-footer a:hover { border-bottom-color: #08709d; }
`;

// ─── Hero Background Animation ────────────────────────────────────────────────

function HeroBackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#08709d]/15 via-[#38bdf8]/10 to-transparent blur-[120px]"
      />
      {/* Orb 2 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-[#08709d]/10 to-transparent blur-[130px]"
      />
      {/* Orb 3 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-t from-[#065679]/15 to-transparent blur-[110px]"
      />
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: (i * 170) % 800 - 300, y: (i * 95) % 500, opacity: 0.2 }}
          animate={{
            y: [0, -180, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
          className={`absolute rounded-full blur-[2px] ${i % 2 === 0 ? 'w-4 h-4 bg-[#08709d]/30' : 'w-3 h-3 bg-emerald-400/40'}`}
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i * 12) % 60}%` }}
        />
      ))}
      {/* Dot Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#08709d_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
    </div>
  );
}

// ─── Nurse Hero Illustration ──────────────────────────────────────────────────

function NurseIllustration() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto flex items-center justify-center">
      <div className="absolute w-80 h-80 bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative w-full bg-gradient-to-tr from-[#08709d]/10 via-[#08709d]/3 to-transparent p-5 rounded-3xl border border-[#08709d]/10 shadow-lg">
        <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#08709d]/5 rounded-full blur-2xl pointer-events-none" />

          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-[80%] h-auto drop-shadow-md"
          >
            {/* Background glow circle */}
            <circle cx="110" cy="110" r="100" fill="#08709d" fillOpacity="0.04" />

            {/* === NURSE FIGURE === */}

            {/* Legs */}
            <rect x="90" y="182" width="14" height="28" rx="4" fill="#1a294a" />
            <rect x="116" y="182" width="14" height="28" rx="4" fill="#1a294a" />

            {/* Shoes */}
            <rect x="86" y="206" width="22" height="10" rx="4" fill="#0f1e38" />
            <rect x="112" y="206" width="22" height="10" rx="4" fill="#0f1e38" />

            {/* Body / scrub */}
            <rect x="80" y="128" width="60" height="56" rx="10" fill="#1a294a" />

            {/* Scrub collar highlight */}
            <rect x="88" y="126" width="44" height="12" rx="4" fill="#08709d" />

            {/* Cross on chest */}
            <rect x="107" y="136" width="6" height="18" rx="2" fill="#fff" />
            <rect x="101" y="142" width="18" height="6" rx="2" fill="#fff" />

            {/* Neck */}
            <rect x="101" y="112" width="18" height="18" rx="4" fill="#f3c99a" />

            {/* Head */}
            <circle cx="110" cy="92" r="26" fill="#f3c99a" />

            {/* Nurse cap — geometric */}
            <path d="M84 86 Q84 60 110 60 Q136 60 136 86 Z" fill="#08709d" />
            <rect x="84" y="82" width="52" height="8" rx="2" fill="#fff" />
            {/* Cap red cross */}
            <rect x="107" y="67" width="6" height="16" rx="1" fill="#e53e3e" />
            <rect x="101" y="73" width="18" height="6" rx="1" fill="#e53e3e" />

            {/* Face smile */}
            <path d="M102 98 Q110 106 118 98" stroke="#b07a5a" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Eyes */}
            <ellipse cx="104" cy="91" rx="2.5" ry="3" fill="#1a294a" />
            <ellipse cx="116" cy="91" rx="2.5" ry="3" fill="#1a294a" />

            {/* Left arm */}
            <path d="M80 140 Q60 152 50 172" stroke="#1a294a" strokeWidth="12" strokeLinecap="round" />
            {/* Left hand */}
            <circle cx="48" cy="176" r="7" fill="#f3c99a" />

            {/* Right arm */}
            <path d="M140 140 Q160 152 166 170" stroke="#1a294a" strokeWidth="12" strokeLinecap="round" />

            {/* === MEDICAL BAG (right hand) === */}
            {/* Bag body */}
            <rect x="152" y="168" width="30" height="24" rx="5" fill="#08709d" />
            {/* Bag handle arc */}
            <path d="M158 168 Q167 156 176 168" stroke="#08709d" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Bag white cross */}
            <rect x="164" y="173" width="4" height="14" rx="1" fill="#fff" />
            <rect x="157" y="178" width="18" height="4" rx="1" fill="#fff" />
            {/* Bag clasp line */}
            <line x1="152" y1="177" x2="182" y2="177" stroke="#fff" strokeWidth="1" strokeOpacity="0.4" />

            {/* === STETHOSCOPE === */}
            <path d="M100 128 Q91 144 89 160 Q87 170 95 174" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="95" cy="176" r="5" fill="#22c55e" />

            {/* === FLOATING MEDICAL ICONS === */}
            {/* Heartbeat line — left side */}
            <polyline points="16,116 27,116 33,100 41,132 47,116 56,116" stroke="#08709d" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

            {/* Pill capsule — top right */}
            <rect x="170" y="52" width="30" height="14" rx="7" fill="#08709d" fillOpacity="0.12" stroke="#08709d" strokeWidth="1.5" />
            <line x1="185" y1="52" x2="185" y2="66" stroke="#08709d" strokeWidth="1.5" />

            {/* Thermometer — bottom left */}
            <rect x="16" y="152" width="6" height="22" rx="3" fill="#08709d" fillOpacity="0.12" stroke="#08709d" strokeWidth="1.5" />
            <circle cx="19" cy="176" r="5" fill="#08709d" fillOpacity="0.25" stroke="#08709d" strokeWidth="1.5" />

            {/* Small sparkle dots */}
            <circle cx="170" cy="106" r="3" fill="#22c55e" fillOpacity="0.5" />
            <circle cx="180" cy="118" r="2" fill="#08709d" fillOpacity="0.4" />
            <circle cx="44" cy="58" r="3" fill="#08709d" fillOpacity="0.35" />
            <circle cx="30" cy="72" r="2" fill="#22c55e" fillOpacity="0.45" />
          </svg>

          {/* Badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-[#08709d]/10 px-3.5 py-1 rounded-full border border-[#08709d]/20">
            <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
            <span className="text-xs font-bold text-[#08709d] uppercase">
              DHA-Licensed · Available 24/7
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Component ────────────────────────────────────────────────────────────

function NursingFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="nursing-faq-section">
      <style>{faqStyles}</style>
      <div className="nursing-faq-wrap">
        <div className="nursing-faq-eyebrow">&#8857; Common Questions</div>
        <h2 className="nursing-faq-title">Home Nursing FAQs</h2>
        <p className="nursing-faq-sub">
          Find answers to the most common questions about our home nursing service in Dubai.
        </p>

        <div className="nursing-faq-list">
          {nursingFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`nursing-faq-item${isOpen ? ' open' : ''}`}
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                <button
                  className="nursing-faq-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="nursing-faq-q">{faq.q}</span>
                  <span className="nursing-faq-icon">+</span>
                </button>
                <div className="nursing-faq-body">
                  <div className="nursing-faq-inner">
                    <div className="nursing-faq-ans">{faq.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="nursing-faq-footer">
          Still have questions?{' '}
          <a href="/contact">Contact our support team</a>
        </p>
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function HomeNursingPage() {
  const [visible, setVisible] = useState(false);
  const [condVisible, setCondVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setCondVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════ */}
      <Section variant="white" className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <HeroBackgroundAnimation />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column */}
            <div
              className="lg:col-span-7 space-y-6 flex flex-col items-start text-left transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)'
              }}
            >
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
                <span className="text-[#08709d] text-xs font-bold uppercase tracking-wider">
                  DHA-Licensed Home Nursing Across Dubai
                </span>
              </div>

              {/* Hero title */}
              <HeroTitle className="text-4xl sm:text-5xl lg:text-6xl">
                Home Nursing Service in{' '}
                <span className="text-[#08709d]">Dubai</span>
              </HeroTitle>

              {/* Subtitle */}
              <h2 className="text-lg sm:text-xl font-bold text-[#08709d] uppercase tracking-wide -mt-2">
                Professional DHA-Licensed Nurses at Your Doorstep 24/7
              </h2>

              {/* Description */}
              <Paragraph className="max-w-2xl text-gray-600">
                CORx Healthcare provides professional home nursing services in Dubai delivered by
                DHA-licensed registered nurses. From post-operative care and wound management to
                medication administration, palliative care, and overnight nursing support, our
                nurses bring clinical-grade care to your home with compassion and professionalism.
              </Paragraph>
              <Paragraph className="max-w-2xl mt-2 text-gray-600">
                Our nursing team is experienced across a wide spectrum of medical needs — whether
                you require short-term post-surgery support or ongoing care for a chronic
                condition, we provide personalized nursing plans tailored to your exact situation.
              </Paragraph>

              {/* Feature checklist */}
              <div className="w-full pt-4 pb-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                  {heroFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#08709d] shrink-0" />
                      <span className="text-gray-900 text-sm md:text-base font-semibold leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 w-full items-center mt-6">
                <Button variant="primary" href="tel:+971547033311">
                  <CalendarDays size={18} />
                  <span>Book An Appointment</span>
                </Button>
                <Button
                  variant="whatsapp"
                  href="https://wa.me/97143320776"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp Us</span>
                </Button>
              </div>
            </div>

            {/* Right Column — Illustration */}
            <div
              className="lg:col-span-5 relative w-full max-w-[460px] mx-auto lg:ml-auto flex items-center justify-center pt-8 lg:pt-0 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(32px)',
                transitionDelay: '0.2s'
              }}
            >
              <NurseIllustration />
            </div>
          </div>
        </Container>
      </Section>

      <ServiceHighlightsBar />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — ABOUT & CLINICAL INDICATIONS
      ══════════════════════════════════════════════════════════════ */}
      <Section variant="slate" className="py-16 md:py-24">
        <Container className="max-w-[1480px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

            {/* Left Card: About */}
            <div className="rounded-3xl border-l-[6px] border-l-[#08709d] border-t border-r border-b border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]">
              <div>
                <span className="text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#08709d]/10 px-4 py-2 rounded-full border border-[#08709d]/20 inline-block mb-5">
                  ABOUT THE SERVICE
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-6">
                  About Home Nursing Service &amp; Specialized In-Home Care in Dubai
                </h2>

                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-5 font-sans">
                  Home nursing allows patients to receive professional clinical care in the comfort
                  of their own homes, reducing hospital readmissions and accelerating recovery. At
                  CORx Healthcare, our DHA-registered nurses provide the same standard of care you
                  would receive in a hospital — delivered with warmth, privacy, and respect at your
                  doorstep.
                </p>

                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-5 font-sans">
                  Our nurses are experienced in post-surgery wound care, catheter management,
                  nasogastric tube feeding, IV line maintenance, vital signs monitoring, and
                  medication administration. We also offer specialized services for palliative
                  patients, cancer patients, and those requiring continuous or overnight nursing
                  support.
                </p>

                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed m-0 font-sans">
                  Each patient receives a personalized nursing care plan developed in collaboration
                  with their doctor and our senior medical team, ensuring coordinated and clinically
                  appropriate care throughout their recovery or care journey.
                </p>
              </div>
            </div>

            {/* Right Card: Clinical Indications */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]">
              <div>
                <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200/60 inline-block mb-5">
                  CLINICAL INDICATIONS
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-4">
                  Who May Need Home Nursing Service in Dubai?
                </h2>

                <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-7 font-sans">
                  You may require home nursing if you or a loved one needs:
                </p>

                {/* 2-Column Circle Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {clinicalIndications.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full border-2 border-[#08709d] flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#08709d]" />
                      </div>
                      <span className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed font-sans">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — COMPREHENSIVE SERVICES
      ══════════════════════════════════════════════════════════════ */}
      <Section variant="warm">
        <Container className="flex flex-col items-center">
          {/* Section header */}
          <div className="mb-10 text-center max-w-3xl">
            <span className="text-[#08709d] text-xs font-bold uppercase tracking-widest bg-[#08709d]/10 px-3.5 py-1.5 rounded-full border border-[#08709d]/20 inline-block mb-3">
              COMPREHENSIVE NURSING SERVICES
            </span>
            <SectionTitle className="mb-4">
              Home Nursing Services Available in Dubai
            </SectionTitle>
            <Paragraph>
              Specialized nursing care across post-op, palliative, and complex medical needs.
            </Paragraph>
          </div>

          {/* 3-Column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mt-4">
            {nursingColumns.map((col, idx) => (
              <motion.div
                key={idx}
                className="h-full"
                initial={{ opacity: 0, y: 10 }}
                animate={condVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: col.delay }}
              >
                <Card className="h-full flex flex-col justify-between p-6 sm:p-7 border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div>
                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${col.iconBg}`}>
                        {col.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900 leading-snug">
                          {col.title}
                        </CardTitle>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          {col.tagline}
                        </p>
                      </div>
                    </div>

                    <hr className="border-t border-slate-100 mb-4" />

                    {/* Service item buttons */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {col.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#08709d] text-white hover:bg-[#065679] hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                          <span className="text-sm font-bold text-white tracking-wide">{item}</span>
                          <Check size={16} className="text-white/90 group-hover:text-white group-hover:scale-110 transition-all shrink-0" strokeWidth={2.5} />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Info note banner */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#08709d]/20 bg-gradient-to-r from-[#08709d] to-[#065679] text-white p-6 sm:p-7 shadow-lg shadow-[#08709d]/15 mt-10 w-full">
            <span className="shrink-0 text-white bg-white/10 p-2.5 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </span>
            <p className="text-base leading-7 text-white m-0 font-medium">
              <strong className="font-extrabold uppercase tracking-wider mr-1">Note:</strong>
              All home nursing services at CORx are provided by DHA-licensed registered nurses
              under the supervision of our senior medical team.
            </p>
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — WHY CHOOSE CORX
      ══════════════════════════════════════════════════════════════ */}
      <Section variant="slate">
        <Container className="flex flex-col items-center">
          <div className="mb-10 text-center max-w-3xl">
            <p className="text-[#08709d] text-sm font-bold uppercase tracking-wider mb-2">
              HOME NURSING SERVICE
            </p>
            <SectionTitle className="mb-4">
              Why Choose CORx Healthcare for Home Nursing in Dubai?
            </SectionTitle>
            <Paragraph>
              CORx Healthcare delivers professional, DHA-licensed nursing care at your doorstep —
              combining clinical expertise with compassionate, personalized service available
              24 hours a day, 7 days a week.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            {whyReasons.map((r, i) => (
              <Card key={i} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#08709d] bg-[#08709d]/10 px-3 py-1 rounded-full border border-[#08709d]/20">
                      {r.label}
                    </span>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {r.num}
                    </span>
                  </div>
                  <CardTitle className="mb-2">{r.title}</CardTitle>
                  <hr className="border-t border-gray-100 mb-4" />
                  <Paragraph className="m-0">{r.desc}</Paragraph>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — CTA BANNER
      ══════════════════════════════════════════════════════════════ */}
      <Section variant="dark" className="relative overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="text-left max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                Have Any Questions?
              </h2>
              <p className="text-white/90 text-base leading-7">
                Call Us 24/7 at{' '}
                <a href="tel:+97143320776" className="text-white font-semibold underline underline-offset-4 hover:opacity-80">
                  &#9990;&#65039; +971 4 332 0776
                </a>
                ,{' '}
                <a href="tel:+971547033311" className="text-white font-semibold underline underline-offset-4 hover:opacity-80">
                  &#128241; +971 54 703 3311
                </a>
                , or{' '}
                <a href="tel:+971502785990" className="text-white font-semibold underline underline-offset-4 hover:opacity-80">
                  &#128241; +971 50 278 5990
                </a>{' '}
                for home nursing service.
              </p>
            </div>

            <Button
              variant="outline"
              href="/Company-Profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1a294a] hover:bg-gray-100 border-none shadow-xl shrink-0"
            >
              <span>DOWNLOAD PROFILE</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6 — FAQ
      ══════════════════════════════════════════════════════════════ */}
      <NursingFAQ />

    </div>
  );
}
