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
  ArrowRight
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const heroFeatures = [
  'DHA-licensed nurses & care assistants',
  'Daily living & personal care support',
  "Dementia & Alzheimer's management",
  '24/7 & live-in elderly care options',
  'Medication & medical monitoring',
];

const clinicalIndications = [
  'Needs assistance with daily activities',
  "Has Alzheimer's or dementia",
  'Is recovering from stroke',
  "Has Parkinson's disease",
  'Lives alone and needs companionship',
  'Requires medication management',
  'Has fall risk or mobility limitations',
  'Needs post-hospitalization support',
  'Requires wound or catheter care',
  'Has chronic conditions needing monitoring',
  'Family is unable to provide daily care',
  'Needs overnight or 24-hour supervision',
];

const serviceColumns = [
  {
    title: 'Personal Care & Daily Living',
    tagline: 'ADL support, hygiene & independence',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    items: [
      'Bathing & personal hygiene',
      'Dressing & grooming',
      'Meal preparation',
      'Mobility assistance',
      'Incontinence care',
      'Toileting support',
      'Laundry & housekeeping',
      'Escort to appointments',
    ],
    delay: 0.05,
  },
  {
    title: 'Medical Support',
    tagline: 'Nursing care & health monitoring',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    items: [
      'Medication management',
      'Blood pressure monitoring',
      'Blood glucose monitoring',
      'Wound & catheter care',
      'IV & injection support',
      'Physiotherapy coordination',
      'Vital signs monitoring',
      'Doctor visit coordination',
    ],
    delay: 0.12,
  },
  {
    title: 'Specialized Care',
    tagline: "Dementia, Parkinson's & palliative support",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    items: [
      "Alzheimer's & dementia care",
      "Parkinson's management",
      'Post-stroke rehabilitation',
      'Palliative & hospice care',
      'Cognitive stimulation therapy',
      'Fall prevention & safety',
      'Companion & social care',
      'Night & live-in care',
    ],
    delay: 0.19,
  },
];

const whyReasons = [
  {
    num: '01',
    label: 'TRAINED CARE TEAM',
    title: 'DHA-licensed nurses and professional care assistants',
    desc: 'Our elderly care team combines the clinical expertise of registered nurses with the warm, compassionate support of trained care assistants — providing the full spectrum of senior care.',
  },
  {
    num: '02',
    label: 'PERSONALIZED CARE PLANS',
    title: 'Custom care plans designed for each individual senior',
    desc: "We assess every senior's physical, cognitive, and social needs and build a personalized care plan reviewed regularly by our medical team and family caregivers.",
  },
  {
    num: '03',
    label: 'DIGNITY & RESPECT',
    title: 'Care delivered with warmth, dignity, and cultural sensitivity',
    desc: 'We train our entire team in cultural sensitivity and person-centered care, ensuring every senior is treated with the respect, patience, and dignity they deserve.',
  },
  {
    num: '04',
    label: 'FLEXIBLE PACKAGES',
    title: 'Hourly, daily, overnight, and 24/7 live-in options',
    desc: 'We offer flexible packages from a few hours per day to full-time live-in care. Families can adjust the care plan as needs change, with no long-term lock-in required.',
  },
];

const elderlyFaqs = [
  {
    q: 'What elderly care services does CORx provide at home in Dubai?',
    a: "We offer a full range of services including personal hygiene and grooming, meal preparation, mobility support, medication management, vital signs monitoring, wound care, dementia care, Parkinson's support, palliative care, companion care, and live-in nurse arrangements.",
  },
  {
    q: 'How do I know if my elderly parent needs home care?',
    a: 'Signs include difficulty with daily tasks (bathing, cooking, dressing), increasing forgetfulness, fall risk, recent hospitalization, or living alone without support. Our team can conduct an initial assessment to recommend the right level of care.',
  },
  {
    q: 'Can you provide 24-hour care for an elderly person at home?',
    a: "Yes. CORx offers round-the-clock care options including 8-hour shifts, 12-hour day/night nursing, and full-time live-in care. Our care managers will help you choose the right arrangement based on your family's needs.",
  },
  {
    q: "Do you provide dementia and Alzheimer's care at home?",
    a: "Yes. Our nurses and care assistants are trained in dementia and Alzheimer's care, including safe environment management, cognitive stimulation activities, wandering prevention, and compassionate communication with memory-impaired seniors.",
  },
  {
    q: 'What is the difference between a home nurse and an elderly care assistant?',
    a: 'A home nurse is a DHA-licensed registered nurse who performs clinical tasks (wound care, IV therapy, medication administration). A care assistant provides personal and daily living support (bathing, grooming, companionship). CORx offers both, often in coordinated teams.',
  },
  {
    q: 'How much does elderly home care cost in Dubai?',
    a: 'Costs vary depending on the type of care, hours per day, and whether clinical nursing is required. Contact us for a personalized quote. We also assist families in exploring insurance coverage where applicable.',
  },
];

// ─── BACKGROUND ANIMATION ────────────────────────────────────────────────────

function HeroBackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#08709d]/15 via-[#38bdf8]/10 to-transparent blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-[#08709d]/10 to-transparent blur-[130px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-t from-[#065679]/15 to-transparent blur-[110px]"
      />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: (i * 170) % 800 - 300,
            y: (i * 95) % 500,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -180, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.2,
          }}
          className={`absolute rounded-full blur-[2px] ${
            i % 2 === 0 ? 'w-4 h-4 bg-[#08709d]/30' : 'w-3 h-3 bg-emerald-400/40'
          }`}
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i * 12) % 60}%`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(#08709d_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
    </div>
  );
}

// ─── HERO ILLUSTRATION ───────────────────────────────────────────────────────

function ElderlyIllustration() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto flex items-center justify-center">
      <div className="absolute w-80 h-80 bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative w-full bg-gradient-to-tr from-[#08709d]/10 via-[#08709d]/3 to-transparent p-5 rounded-3xl border border-[#08709d]/10 shadow-lg">
        <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#08709d]/5 rounded-full blur-2xl pointer-events-none" />

          <svg
            width="240"
            height="220"
            viewBox="0 0 240 220"
            fill="none"
            className="relative z-10 w-[85%] h-auto drop-shadow-md"
          >
            <circle cx="120" cy="110" r="100" fill="#08709d" fillOpacity="0.04" />

            {/* ELDERLY PERSON (left) */}
            <rect x="42" y="118" width="46" height="50" rx="10" fill="#1a294a" />
            <rect x="52" y="118" width="10" height="50" rx="4" fill="#08709d" fillOpacity="0.35" />
            <rect x="57" y="110" width="16" height="10" rx="4" fill="#f3c9a0" />
            <circle cx="65" cy="94" r="20" fill="#f3c9a0" />
            <path d="M45 90c0-22 11-28 20-28s20 6 20 28H45z" fill="#e2e8f0" />
            <path d="M59 98c0 6 12 6 12 0" stroke="#1a294a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="61" cy="93" r="1.5" fill="#1a294a" />
            <circle cx="70" cy="93" r="1.5" fill="#1a294a" />
            <rect x="57" y="89" width="9" height="6" rx="3" stroke="#08709d" strokeWidth="1.5" fill="none" />
            <rect x="68" y="89" width="9" height="6" rx="3" stroke="#08709d" strokeWidth="1.5" fill="none" />
            <line x1="66" y1="92" x2="68" y2="92" stroke="#08709d" strokeWidth="1.5" />
            <path d="M42 130 Q30 142 34 158" stroke="#f3c9a0" strokeWidth="9" strokeLinecap="round" fill="none" />
            <line x1="34" y1="158" x2="28" y2="188" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="28" cy="190" rx="6" ry="3" fill="#64748b" />
            <path d="M88 132 Q100 128 108 136" stroke="#f3c9a0" strokeWidth="9" strokeLinecap="round" fill="none" />
            <rect x="47" y="166" width="16" height="36" rx="7" fill="#334155" />
            <rect x="66" y="166" width="16" height="36" rx="7" fill="#334155" />
            <ellipse cx="55" cy="202" rx="10" ry="5" fill="#1e293b" />
            <ellipse cx="74" cy="202" rx="10" ry="5" fill="#1e293b" />

            {/* CAREGIVER / NURSE (right) */}
            <rect x="138" y="115" width="50" height="56" rx="11" fill="#08709d" />
            <rect x="156" y="122" width="14" height="5" rx="2" fill="white" fillOpacity="0.9" />
            <rect x="161" y="117" width="5" height="14" rx="2" fill="white" fillOpacity="0.9" />
            <rect x="156" y="107" width="16" height="10" rx="4" fill="#f5c9a5" />
            <circle cx="164" cy="91" r="21" fill="#f5c9a5" />
            <path d="M143 87c0-24 11-30 21-30s21 6 21 30h-42z" fill="#1a294a" />
            <circle cx="164" cy="57" r="7" fill="#1a294a" />
            <path d="M148 82 h32 l-4-8 h-24z" fill="white" fillOpacity="0.85" />
            <line x1="148" y1="78" x2="180" y2="78" stroke="#08709d" strokeWidth="2" />
            <path d="M157 97c0 7 14 7 14 0" stroke="#1a294a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="160" cy="91" r="1.5" fill="#1a294a" />
            <circle cx="169" cy="91" r="1.5" fill="#1a294a" />
            <path d="M138 130 Q120 130 108 136" stroke="#f5c9a5" strokeWidth="9" strokeLinecap="round" fill="none" />
            <ellipse cx="108" cy="136" rx="9" ry="7" fill="#22c55e" fillOpacity="0.25" stroke="#22c55e" strokeWidth="1.5" />
            <path d="M188 128 Q200 138 196 155" stroke="#f5c9a5" strokeWidth="9" strokeLinecap="round" fill="none" />
            <rect x="190" y="150" width="22" height="28" rx="4" fill="white" stroke="#08709d" strokeWidth="2" />
            <line x1="194" y1="158" x2="208" y2="158" stroke="#08709d" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="194" y1="164" x2="208" y2="164" stroke="#08709d" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="194" y1="170" x2="202" y2="170" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="143" y="169" width="17" height="33" rx="7" fill="#065679" />
            <rect x="163" y="169" width="17" height="33" rx="7" fill="#065679" />
            <ellipse cx="151" cy="202" rx="11" ry="5" fill="#1e293b" />
            <ellipse cx="171" cy="202" rx="11" ry="5" fill="#1e293b" />

            {/* Joined hands / care symbol */}
            <path d="M108 105 c0-5 7-9 7-3 c0-6 7-2 7 3 l-7 9z" fill="#22c55e" fillOpacity="0.7" />

            {/* Ground shadow */}
            <ellipse cx="116" cy="208" rx="80" ry="7" fill="#e2e8f0" fillOpacity="0.5" />
          </svg>

          <div className="mt-4 inline-flex items-center gap-2 bg-[#08709d]/10 px-3.5 py-1 rounded-full border border-[#08709d]/20">
            <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
            <span className="text-xs font-bold text-[#08709d] uppercase">
              DHA-Licensed · Compassionate Senior Care
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ STYLES ───────────────────────────────────────────────────────────────

const elderlyFaqStyles = `
  @keyframes elderlyFaqFadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes elderlyFaqHeaderIn {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .elderly-faq-section {
    background: #f8fafc;
    padding: 60px 0;
    position: relative;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    .elderly-faq-section { padding: 40px 0; }
  }

  .elderly-faq-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle at 0% 0%, rgba(8, 112, 157, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(34, 197, 94, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .elderly-faq-wrap {
    padding: 0 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
    position: relative;
    z-index: 1;
  }

  .elderly-faq-eyebrow {
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
    animation: elderlyFaqHeaderIn 0.4s ease forwards;
  }

  .elderly-faq-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a2340;
    text-align: center;
    margin: 0 0 0.5rem;
    animation: elderlyFaqHeaderIn 0.4s 0.08s ease both;
    letter-spacing: -0.02em;
  }
  @media (max-width: 768px) {
    .elderly-faq-title { font-size: 26px; }
  }

  .elderly-faq-sub {
    font-size: 18px;
    color: #4b5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    animation: elderlyFaqHeaderIn 0.4s 0.15s ease both;
  }
  @media (max-width: 768px) {
    .elderly-faq-sub { font-size: 15px; margin-bottom: 1.5rem; }
  }

  .elderly-faq-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .elderly-faq-item {
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
    opacity: 0;
    animation: elderlyFaqFadeIn 0.45s cubic-bezier(.4,0,.2,1) forwards;
    transition: background 0.2s;
  }
  .elderly-faq-item:last-child { border-bottom: none; }
  .elderly-faq-item.open { background: #f9fafb; }

  .elderly-faq-btn {
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
    .elderly-faq-btn { padding: 1.25rem 1.5rem; }
  }
  .elderly-faq-btn:hover { background: #f9fafb; }

  .elderly-faq-q {
    font-size: 18px;
    font-weight: 700;
    color: #1a2340;
    transition: color 0.2s;
    line-height: 1.4;
  }
  @media (max-width: 768px) {
    .elderly-faq-q { font-size: 15px; }
  }
  .elderly-faq-item.open .elderly-faq-q { color: #08709d; }

  .elderly-faq-icon {
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
    .elderly-faq-icon { width: 30px; height: 30px; font-size: 20px; }
  }
  .elderly-faq-item.open .elderly-faq-icon {
    background: #08709d;
    border-color: #08709d;
    color: #fff;
    transform: rotate(45deg);
  }

  .elderly-faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(.4,0,.2,1);
  }
  .elderly-faq-item.open .elderly-faq-body { grid-template-rows: 1fr; }
  .elderly-faq-inner { overflow: hidden; }

  .elderly-faq-ans {
    margin: 0 2rem 1.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    color: #4b5563;
    line-height: 1.8;
    border-left: 4px solid #22c55e;
    border-radius: 0 4px 4px 0;
    background: #f0fdf4;
  }
  @media (max-width: 768px) {
    .elderly-faq-ans { margin: 0 1.5rem 1.25rem; font-size: 14px; padding: 0.5rem 1rem; }
  }

  .elderly-faq-footer {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 16px;
    color: #4b5563;
    font-weight: 500;
  }
  @media (max-width: 640px) {
    .elderly-faq-footer { font-size: 14px; margin-top: 1.5rem; }
  }
  .elderly-faq-footer a {
    color: #08709d;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;
  }
  .elderly-faq-footer a:hover { border-bottom-color: #08709d; }
`;

// ─── FAQ COMPONENT ────────────────────────────────────────────────────────────

function ElderlyFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="elderly-faq-section">
      <style>{elderlyFaqStyles}</style>
      <div className="elderly-faq-wrap">
        <div className="elderly-faq-eyebrow">&#8857; Common Questions</div>
        <h2 className="elderly-faq-title">Elderly Home Care FAQs</h2>
        <p className="elderly-faq-sub">
          Answers to frequently asked questions about our elderly care at home service in Dubai.
        </p>

        <div className="elderly-faq-list">
          {elderlyFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`elderly-faq-item${isOpen ? ' open' : ''}`}
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                <button
                  className="elderly-faq-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="elderly-faq-q">{faq.q}</span>
                  <span className="elderly-faq-icon">+</span>
                </button>
                <div className="elderly-faq-body">
                  <div className="elderly-faq-inner">
                    <div className="elderly-faq-ans">{faq.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="elderly-faq-footer">
          Still have questions?{' '}
          <a href="/book-an-appointment">Contact our support team</a>
        </p>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ElderlyCareHomePage() {
  const [visible, setVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setCardsVisible(true), 400);
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
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
              }}
            >
              <div className="inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
                <span className="text-[#08709d] text-xs font-bold uppercase tracking-wider">
                  DHA-Licensed Senior Care Across Dubai
                </span>
              </div>

              <HeroTitle className="text-4xl sm:text-5xl lg:text-6xl">
                Elderly Care at Home in{' '}
                <span className="text-[#08709d]">Dubai</span>
              </HeroTitle>

              <h2 className="text-lg sm:text-xl font-bold text-[#08709d] uppercase tracking-wide -mt-2">
                Compassionate Senior Care &amp; Assisted Living Support at Your Doorstep
              </h2>

              <Paragraph className="max-w-2xl text-gray-600">
                CORx Healthcare provides professional elderly care at home in Dubai, offering
                compassionate, personalized support for seniors who wish to live independently with
                assistance. Our DHA-licensed nurses and trained care assistants deliver daily living
                support, medical monitoring, companionship, and specialized care for conditions like
                dementia, Parkinson&apos;s, and post-stroke recovery &mdash; all in the comfort of the
                senior&apos;s own home.
              </Paragraph>
              <Paragraph className="max-w-2xl mt-2 text-gray-600">
                We understand that every elder&apos;s needs are unique. Whether you require a few hours
                of help each day or 24-hour live-in care, CORx Healthcare designs a custom care plan
                that balances medical needs, personal dignity, and quality of life.
              </Paragraph>

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
                transitionDelay: '0.2s',
              }}
            >
              <ElderlyIllustration />
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

            {/* Left Card — ABOUT */}
            <div className="rounded-3xl border-l-[6px] border-l-[#08709d] border-t border-r border-b border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]">
              <div>
                <span className="text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#08709d]/10 px-4 py-2 rounded-full border border-[#08709d]/20 inline-block mb-5">
                  ABOUT THE SERVICE
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-6">
                  About Elderly Care at Home &amp; Senior Home Care Services in Dubai
                </h2>

                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-5 font-sans">
                  As people age, maintaining independence while receiving appropriate care becomes a
                  priority. CORx Healthcare&apos;s elderly care at home service allows seniors in Dubai to
                  receive the physical, medical, and emotional support they need without leaving the
                  familiarity and comfort of their own homes.
                </p>

                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-5 font-sans">
                  Our DHA-licensed nurses and professional care assistants support elderly individuals
                  with activities of daily living (ADL) such as bathing, grooming, dressing, mobility
                  assistance, meal preparation, and companionship &mdash; alongside clinical services like
                  medication management, blood pressure monitoring, wound care, and physiotherapy
                  coordination.
                </p>

                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed m-0 font-sans">
                  For those with Alzheimer&apos;s, dementia, Parkinson&apos;s disease, or post-stroke
                  conditions, our specialized team provides structured cognitive support, safe
                  environment management, and compassionate care &mdash; always keeping the senior&apos;s
                  dignity and wellbeing at the center.
                </p>
              </div>
            </div>

            {/* Right Card — CLINICAL INDICATIONS */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]">
              <div>
                <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200/60 inline-block mb-5">
                  CLINICAL INDICATIONS
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-4">
                  Who May Need Elderly Home Care in Dubai?
                </h2>

                <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-7 font-sans">
                  Elderly home care services may be needed if your loved one:
                </p>

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
          <div className="mb-10 text-center max-w-3xl">
            <span className="text-[#08709d] text-xs font-bold uppercase tracking-widest bg-[#08709d]/10 px-3.5 py-1.5 rounded-full border border-[#08709d]/20 inline-block mb-3">
              COMPREHENSIVE ELDERLY CARE SERVICES
            </span>
            <SectionTitle className="mb-4">
              Elderly Home Care Services Available in Dubai
            </SectionTitle>
            <Paragraph>
              Holistic care across personal support, medical monitoring, and specialized conditions.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mt-4">
            {serviceColumns.map((col, idx) => (
              <motion.div
                key={idx}
                className="h-full"
                initial={{ opacity: 0, y: 10 }}
                animate={cardsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: col.delay }}
              >
                <Card className="h-full flex flex-col justify-between p-6 sm:p-7 border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div>
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

                    <div className="grid grid-cols-1 gap-2.5">
                      {col.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#08709d] text-white hover:bg-[#065679] hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                          <span className="text-sm font-bold text-white tracking-wide">{item}</span>
                          <Check
                            size={16}
                            className="text-white/90 group-hover:text-white group-hover:scale-110 transition-all shrink-0"
                            strokeWidth={2.5}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Info Note Banner */}
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
              All CORx elderly care services are delivered by DHA-licensed nurses and trained care
              assistants, with personalized care plans reviewed regularly by our senior medical team.
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
              ELDERLY CARE AT HOME
            </p>
            <SectionTitle className="mb-4">
              Why Choose CORx Healthcare for Elderly Care at Home in Dubai?
            </SectionTitle>
            <Paragraph>
              We deliver personalized, dignified senior care at home &mdash; combining clinical expertise
              with warmth, flexibility, and respect for every individual&apos;s needs.
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
                for elderly home care service.
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
      <ElderlyFAQ />

    </div>
  );
}
