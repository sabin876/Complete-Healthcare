import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

// ─── DATA ─────────────────────────────────────────────────────────────────────

const heroFeatures = [
  'DHA-licensed nurses for IV administration',
  'Results felt within 30-60 minutes',
  'Custom vitamin & wellness infusions',
  '24/7 home, hotel & office service',
  'Medically supervised IV protocols'
];

const clinicalIndications = [
  'Severe dehydration & fluid loss',
  'Chronic fatigue & low energy levels',
  'Vitamin D, B12 or iron deficiency',
  'Migraine or severe headache episodes',
  'Post-surgery or illness recovery',
  'Hangover relief & alcohol detox',
  'Jet lag & travel exhaustion',
  'Immunity boost before or after illness',
  'Athletic performance & muscle recovery',
  'Skin brightening & anti-aging wellness',
  'Nausea, vomiting & gastroenteritis',
  'Pre-event or pre-wedding energy boost'
];

const ivColumns = [
  {
    title: 'Hydration & Recovery',
    tagline: 'Fluids, electrolytes & rapid relief',
    delay: 0.05,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    items: [
      'Normal saline hydration',
      "Lactated Ringer's solution",
      'Electrolyte replenishment',
      'Hangover IV drip',
      'Anti-nausea medications',
      'Anti-inflammatory infusion',
      'Headache & migraine relief',
      'Post-surgery recovery drip'
    ]
  },
  {
    title: 'Vitamin & Wellness Infusions',
    tagline: 'Immunity, energy & skin health',
    delay: 0.12,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    items: [
      'High-dose Vitamin C drip',
      'Vitamin B12 injection/drip',
      'Glutathione skin brightening',
      'NAD+ anti-aging infusion',
      'Immune boost cocktail',
      'Myers Cocktail',
      'Iron infusion',
      'Zinc & antioxidant blend'
    ]
  },
  {
    title: 'Medical IV Therapy',
    tagline: 'Prescription & clinical-grade drips',
    delay: 0.19,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 0 1-2 2z"/>
        <path d="M19 3H5a2 2 0 0 0-2 2v12h14V5a2 2 0 0 0-2-2z"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    items: [
      'Antibiotic IV therapy',
      'Antifungal infusions',
      'Magnesium sulfate drip',
      'Potassium correction',
      'Blood glucose management',
      'Calcium infusion',
      'Doctor-prescribed IV meds',
      'Post-chemotherapy support'
    ]
  }
];

const whyReasons = [
  {
    num: '01',
    label: 'DHA-LICENSED NURSES',
    title: 'Certified nurses with IV administration expertise',
    desc: 'All IV drips at CORx are administered by DHA-licensed registered nurses with extensive clinical experience in IV therapy and infusion management.'
  },
  {
    num: '02',
    label: 'MEDICAL SUPERVISION',
    title: 'Every session is overseen by our senior medical team',
    desc: 'Our protocols are designed and monitored by qualified doctors. A health screen is performed before every IV session to ensure your complete safety.'
  },
  {
    num: '03',
    label: 'PREMIUM BRANDED PRODUCTS',
    title: 'Pharmaceutical-grade fluids & vitamins only',
    desc: 'We use only pharmacy-grade, certified IV fluids, vitamins, and medications from licensed suppliers — ensuring purity, safety, and clinical effectiveness.'
  },
  {
    num: '04',
    label: '30-MIN ARRIVAL',
    title: 'At your doorstep in 30–60 minutes anywhere in Dubai',
    desc: 'Our mobile IV therapy team is deployed 24/7 across Dubai. From Downtown to Palm Jumeirah, we arrive at your location within 30–60 minutes of booking.'
  }
];

const ivFaqs = [
  {
    q: 'How quickly does IV therapy work?',
    a: 'Most patients feel the effects of IV therapy within 30 to 45 minutes of infusion. Hydration, energy levels, and clarity improve almost immediately as the nutrients are delivered directly into your bloodstream.'
  },
  {
    q: 'Is IV therapy at home safe?',
    a: 'Yes. All CORx IV sessions are administered by DHA-licensed nurses following a health assessment. Our protocols are medically supervised, and we carry emergency supplies to every session.'
  },
  {
    q: 'How long does an IV drip session take?',
    a: 'A typical IV drip session takes 45 to 60 minutes depending on the type and volume of infusion. Our nurse will remain with you throughout the entire session.'
  },
  {
    q: 'What IV drip packages do you offer in Dubai?',
    a: 'We offer a wide range, including hydration drips, Myers Cocktail, Vitamin C high-dose, glutathione skin brightening, NAD+ anti-aging, iron infusion, hangover relief, and medical IV antibiotics. Custom packages are also available.'
  },
  {
    q: "Do I need a doctor's prescription for IV therapy at home?",
    a: 'For wellness and vitamin drips, no prescription is required. For medical IV infusions (antibiotics, electrolyte correction, etc.), our in-house doctors can issue a prescription after a brief consultation.'
  },
  {
    q: 'Do you offer IV therapy at hotels in Dubai?',
    a: 'Yes. We provide IV drip services at homes, hotels, apartments, villas, and offices across all areas of Dubai, 24 hours a day, 7 days a week.'
  }
];

// ─── FAQ INLINE STYLES ────────────────────────────────────────────────────────

const ivtFaqStyles = `
  @keyframes ivtFaqFadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ivtFaqHeaderIn {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ivt-faq-section {
    background: #f8fafc;
    padding: 60px 0;
    position: relative;
    overflow: hidden;
  }
  @media (max-width: 768px) { .ivt-faq-section { padding: 40px 0; } }
  .ivt-faq-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle at 0% 0%, rgba(8,112,157,0.03) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(34,197,94,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  .ivt-faq-wrap {
    padding: 0 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
    position: relative;
    z-index: 1;
  }
  .ivt-faq-eyebrow {
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
    animation: ivtFaqHeaderIn 0.4s ease forwards;
  }
  .ivt-faq-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a2340;
    text-align: center;
    margin: 0 0 0.5rem;
    animation: ivtFaqHeaderIn 0.4s 0.08s ease both;
    letter-spacing: -0.02em;
  }
  @media (max-width: 768px) { .ivt-faq-title { font-size: 28px; } }
  .ivt-faq-sub {
    font-size: 18px;
    color: #4b5563;
    text-align: center;
    max-width: 640px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    animation: ivtFaqHeaderIn 0.4s 0.15s ease both;
  }
  @media (max-width: 768px) { .ivt-faq-sub { font-size: 15px; margin-bottom: 1.5rem; } }
  .ivt-faq-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  .ivt-faq-item {
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
    opacity: 0;
    animation: ivtFaqFadeIn 0.45s cubic-bezier(.4,0,.2,1) forwards;
    transition: background 0.2s;
  }
  .ivt-faq-item:last-child { border-bottom: none; }
  .ivt-faq-item.open { background: #f9fafb; }
  .ivt-faq-btn {
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
  @media (max-width: 768px) { .ivt-faq-btn { padding: 1.25rem 1.5rem; } }
  .ivt-faq-btn:hover { background: #f9fafb; }
  .ivt-faq-q {
    font-size: 18px;
    font-weight: 700;
    color: #1a2340;
    transition: color 0.2s;
    line-height: 1.4;
  }
  @media (max-width: 768px) { .ivt-faq-q { font-size: 16px; } }
  .ivt-faq-item.open .ivt-faq-q { color: #08709d; }
  .ivt-faq-icon {
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
  @media (max-width: 640px) { .ivt-faq-icon { width: 30px; height: 30px; font-size: 20px; } }
  .ivt-faq-item.open .ivt-faq-icon {
    background: #08709d;
    border-color: #08709d;
    color: #fff;
    transform: rotate(45deg);
  }
  .ivt-faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(.4,0,.2,1);
  }
  .ivt-faq-item.open .ivt-faq-body { grid-template-rows: 1fr; }
  .ivt-faq-inner { overflow: hidden; }
  .ivt-faq-ans {
    margin: 0 2rem 1.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    color: #4b5563;
    line-height: 1.8;
    border-left: 4px solid #08709d;
    border-radius: 0 4px 4px 0;
    background: #f0f9ff;
  }
  @media (max-width: 768px) { .ivt-faq-ans { margin: 0 1.5rem 1.25rem; font-size: 14px; padding: 0.5rem 1rem; } }
  .ivt-faq-footer {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 16px;
    color: #4b5563;
    font-weight: 500;
  }
  @media (max-width: 640px) { .ivt-faq-footer { font-size: 14px; margin-top: 1.5rem; } }
  .ivt-faq-footer a {
    color: #08709d;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;
  }
  .ivt-faq-footer a:hover { border-bottom-color: #08709d; }
`;

// ─── LOCAL HELPER COMPONENTS ──────────────────────────────────────────────────

function HeroBackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, 60, 0], y: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#08709d]/15 via-[#38bdf8]/10 to-transparent blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 50, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-[#08709d]/10 to-transparent blur-[130px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-t from-[#065679]/15 to-transparent blur-[110px]"
      />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * 1000 - 300, y: Math.random() * 600, opacity: 0.2 }}
          animate={{ y: [0, -180, 0], x: [0, Math.random() * 40 - 20, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
          className={`absolute rounded-full blur-[2px] ${i % 2 === 0 ? 'w-4 h-4 bg-[#08709d]/30' : 'w-3 h-3 bg-emerald-400/40'}`}
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i * 12) % 60}%` }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(#08709d_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
    </div>
  );
}

function IVDripIllustration() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto flex items-center justify-center">
      <div className="absolute w-80 h-80 bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative w-full bg-gradient-to-tr from-[#08709d]/10 via-[#08709d]/3 to-transparent p-5 rounded-3xl border border-[#08709d]/10 shadow-lg">
        <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#08709d]/5 rounded-full blur-2xl pointer-events-none" />
          <svg
            width="220"
            height="260"
            viewBox="0 0 220 260"
            fill="none"
            className="relative z-10 w-[80%] h-auto drop-shadow-md"
            aria-label="IV Drip Bag Illustration"
          >
            <circle cx="110" cy="110" r="100" fill="#08709d" fillOpacity="0.04" />
            <rect x="55" y="20" width="100" height="130" rx="18" fill="#f0f9ff" stroke="#08709d" strokeWidth="2.5" />
            <rect x="57" y="80" width="96" height="68" rx="0" fill="#08709d" fillOpacity="0.12" />
            <rect x="57" y="80" width="96" height="2" rx="0" fill="#08709d" fillOpacity="0.35" />
            <rect x="55" y="20" width="100" height="60" rx="18" fill="#e0f2fe" stroke="#08709d" strokeWidth="2.5" />
            <circle cx="110" cy="14" r="7" fill="none" stroke="#1a294a" strokeWidth="2.5" />
            <line x1="110" y1="14" x2="110" y2="22" stroke="#1a294a" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="100" y="38" width="20" height="6" rx="3" fill="#08709d" />
            <rect x="107" y="31" width="6" height="20" rx="3" fill="#08709d" />
            <circle cx="90" cy="100" r="5" fill="#08709d" fillOpacity="0.25" />
            <circle cx="110" cy="110" r="4" fill="#08709d" fillOpacity="0.2" />
            <circle cx="130" cy="100" r="5" fill="#08709d" fillOpacity="0.25" />
            <text x="110" y="135" textAnchor="middle" fontSize="11" fontWeight="700" fill="#08709d" fontFamily="sans-serif">72%</text>
            <rect x="96" y="148" width="28" height="12" rx="5" fill="#1a294a" />
            <rect x="103" y="160" width="14" height="6" rx="2" fill="#1a294a" />
            <path d="M110 166 C110 190, 130 200, 130 220 C130 240, 110 245, 110 258" stroke="#08709d" strokeWidth="3" strokeLinecap="round" fill="none" />
            <rect x="120" y="195" width="20" height="30" rx="5" fill="#e0f2fe" stroke="#08709d" strokeWidth="2" />
            <circle cx="130" cy="208" r="4" fill="#08709d" fillOpacity="0.4" />
            <rect x="103" y="251" width="14" height="8" rx="2" fill="#1a294a" />
            <path d="M110 259 L107 266 L113 266 Z" fill="#08709d" />
            <rect x="58" y="88" width="6" height="40" rx="3" fill="#22c55e" fillOpacity="0.5" />
            <line x1="148" y1="90" x2="154" y2="90" stroke="#08709d" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="148" y1="100" x2="153" y2="100" stroke="#08709d" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="148" y1="110" x2="154" y2="110" stroke="#08709d" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="148" y1="120" x2="153" y2="120" stroke="#08709d" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="148" y1="130" x2="154" y2="130" stroke="#08709d" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="148" y1="140" x2="153" y2="140" stroke="#08709d" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
          <div className="mt-5 inline-flex items-center gap-2 bg-[#08709d]/10 px-3.5 py-1 rounded-full border border-[#08709d]/20">
            <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
            <span className="text-xs font-bold text-[#08709d] uppercase tracking-wide">
              DHA-Licensed · Results in 30–60 mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function IVTherapyFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  return (
    <section className="ivt-faq-section">
      <style>{ivtFaqStyles}</style>
      <div className="ivt-faq-wrap">
        <div className="ivt-faq-eyebrow">&#8857; Common Questions</div>
        <h2 className="ivt-faq-title">IV Therapy FAQs</h2>
        <p className="ivt-faq-sub">
          Find answers to the most common questions about our IV therapy and IV drip at home service in Dubai.
        </p>
        <div className="ivt-faq-list">
          {ivFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`ivt-faq-item${isOpen ? ' open' : ''}`}
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                <button className="ivt-faq-btn" onClick={() => toggle(i)} aria-expanded={isOpen}>
                  <span className="ivt-faq-q">{faq.q}</span>
                  <span className="ivt-faq-icon">+</span>
                </button>
                <div className="ivt-faq-body">
                  <div className="ivt-faq-inner">
                    <div className="ivt-faq-ans">{faq.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="ivt-faq-footer">
          Still have questions?{' '}
          <a href="/contact">Contact our support team</a>
        </p>
      </div>
    </section>
  );
}

// ─── MAIN PAGE EXPORT ─────────────────────────────────────────────────────────

export default function IVTherapyPage() {
  const [visible, setVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setCardsVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">

      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════ */}
      <Section variant="white" className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <HeroBackgroundAnimation />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column */}
            <div
              className="lg:col-span-7 space-y-6 flex flex-col items-start text-left transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
            >
              <div className="inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
                <span className="text-[#08709d] text-xs font-bold uppercase tracking-wider">
                  DHA-Licensed IV Therapy &amp; Drip Service Across Dubai
                </span>
              </div>

              <HeroTitle className="text-4xl sm:text-5xl lg:text-6xl">
                IV Therapy &amp; IV Drip at Home in{' '}
                <span className="text-[#08709d]">Dubai</span>
              </HeroTitle>

              <h2 className="text-lg sm:text-xl font-bold text-[#08709d] uppercase tracking-wide -mt-2">
                Fast Hydration, Vitamin Infusion &amp; Medical IV Drips at Your Doorstep
              </h2>

              <Paragraph className="max-w-2xl text-gray-600">
                CORx Healthcare provides professional IV therapy and IV drip services at home in Dubai,
                administered by DHA-licensed nurses. Whether you need rapid rehydration, vitamin and mineral
                infusion, immunity boost, or hangover relief, our team brings clinic-quality IV treatment
                directly to your home, hotel, or office within 30-60 minutes of booking.
              </Paragraph>
              <Paragraph className="max-w-2xl mt-2 text-gray-600">
                Our IV drip protocols are overseen by our senior medical team and customized to your specific
                needs — from basic hydration and electrolyte replenishment to advanced NAD+, glutathione, and
                high-dose vitamin C infusions.
              </Paragraph>

              <div className="w-full pt-4 pb-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                  {heroFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#08709d] shrink-0" />
                      <span className="text-gray-900 text-sm md:text-base font-semibold leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 w-full items-center mt-6">
                <Button variant="primary" href="tel:+971547033311">
                  <CalendarDays size={18} />
                  <span>Book An Appointment</span>
                </Button>
                <Button variant="whatsapp" href="https://wa.me/97143320776" target="_blank" rel="noopener noreferrer">
                  <MessageSquare size={18} />
                  <span>WhatsApp Us</span>
                </Button>
              </div>
            </div>

            {/* Right Column — Illustration */}
            <div
              className="lg:col-span-5 relative w-full max-w-[460px] mx-auto lg:ml-auto flex items-center justify-center pt-8 lg:pt-0 transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(32px)', transitionDelay: '0.2s' }}
            >
              <IVDripIllustration />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — ABOUT & CLINICAL INDICATIONS
      ═══════════════════════════════════════════════ */}
      <Section variant="slate" className="py-16 md:py-24">
        <Container className="max-w-[1480px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

            {/* Left Card: About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-3xl border-l-[6px] border-l-[#08709d] border-t border-r border-b border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]"
            >
              <div>
                <span className="text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#08709d]/10 px-4 py-2 rounded-full border border-[#08709d]/20 inline-block mb-5">
                  ABOUT THE SERVICE
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-6">
                  About IV Therapy &amp; IV Drip Service at Home in Dubai
                </h2>
                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-5 font-sans">
                  Intravenous (IV) therapy delivers fluids, vitamins, minerals, and medications directly into
                  your bloodstream for immediate absorption — bypassing the digestive system entirely. This
                  makes IV drips significantly more effective than oral supplements, with 100% bioavailability
                  and rapid onset.
                </p>
                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-5 font-sans">
                  At CORx Healthcare, our DHA-licensed nurses administer IV drips at your home, hotel room,
                  or office across Dubai. Each session is planned by our senior medical team based on your
                  health goals, symptoms, and medical history — ensuring complete safety and efficacy.
                </p>
                <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed m-0 font-sans">
                  Whether you're recovering from illness, preparing for an event, combating jet lag, or
                  managing a chronic vitamin deficiency, our IV therapy packages are designed to restore your
                  energy, immunity, and wellbeing within 45 to 60 minutes.
                </p>
              </div>
            </motion.div>

            {/* Right Card: Clinical Indications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]"
            >
              <div>
                <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200/60 inline-block mb-5">
                  CLINICAL INDICATIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-4">
                  Who May Benefit from IV Therapy at Home in Dubai?
                </h2>
                <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-7 font-sans">
                  You may benefit from an IV drip at home if you are experiencing:
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
            </motion.div>

          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — COMPREHENSIVE IV THERAPY PACKAGES
      ═══════════════════════════════════════════════ */}
      <Section variant="warm">
        <Container className="flex flex-col items-center">
          <div className="mb-10 text-center max-w-3xl">
            <span className="text-[#08709d] text-xs font-bold uppercase tracking-widest bg-[#08709d]/10 px-3.5 py-1.5 rounded-full border border-[#08709d]/20 inline-block mb-3">
              COMPREHENSIVE IV THERAPY PACKAGES
            </span>
            <SectionTitle className="mb-4">IV Therapy &amp; Drip Packages at Home</SectionTitle>
            <Paragraph>Targeted infusion protocols for hydration, wellness, and medical needs.</Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mt-4">
            {ivColumns.map((col, idx) => (
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
                        <CardTitle className="text-lg font-bold text-gray-900 leading-snug">{col.title}</CardTitle>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{col.tagline}</p>
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
                          <Check size={16} className="text-white/90 group-hover:text-white group-hover:scale-110 transition-all shrink-0" strokeWidth={2.5} />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#08709d]/20 bg-gradient-to-r from-[#08709d] to-[#065679] text-white p-6 sm:p-7 shadow-lg shadow-[#08709d]/15 mt-10 w-full">
            <span className="shrink-0 text-white bg-white/10 p-2.5 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </span>
            <p className="text-base leading-7 text-white m-0 font-medium">
              <strong className="font-extrabold uppercase tracking-wider mr-1">Note:</strong>
              All IV therapy sessions at CORx are administered by DHA-licensed nurses under medical supervision.
              A brief health assessment is conducted before every infusion.
            </p>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — WHY CHOOSE CORx
      ═══════════════════════════════════════════════ */}
      <Section variant="slate">
        <Container className="flex flex-col items-center">
          <div className="mb-10 text-center max-w-3xl">
            <p className="text-[#08709d] text-sm font-bold uppercase tracking-wider mb-2">
              IV THERAPY AT HOME IN DUBAI
            </p>
            <SectionTitle className="mb-4">
              Why Choose CORx Healthcare for IV Therapy at Home in Dubai?
            </SectionTitle>
            <Paragraph>
              CORx Healthcare brings clinical-grade IV therapy directly to your location — administered by
              certified nurses, supervised by doctors, and tailored to your health needs. Experience the
              comfort of premium IV drip care without leaving your home.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
            {whyReasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.08 }}
              >
                <Card className="flex flex-col justify-between p-6 h-full">
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
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — CTA BANNER
      ═══════════════════════════════════════════════ */}
      <Section variant="dark" className="relative overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="text-left max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                Book Your IV Drip at Home Today
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
                for our IV therapy at home service in Dubai.
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

      {/* ═══════════════════════════════════════════════
          SECTION 6 — FAQ
      ═══════════════════════════════════════════════ */}
      <IVTherapyFAQ />

    </div>
  );
}
