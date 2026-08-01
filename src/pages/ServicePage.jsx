import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config/api';
import { Container, Section, Button, Card, HeroTitle, SectionTitle, CardTitle, Paragraph, SmallText } from '../components/ui';
import ServiceHighlightsBar from '../components/ServiceHighlightsBar';
import ServiceBenefitsSection from '../components/ServiceBenefitsSection';
import { 
  Check, 
  Home, 
  Shield, 
  Star, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Award,
  Activity,
  Clock,
  Heart,
  ShieldCheck,
  MapPin,
  Sparkles,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Stethoscope,
  Syringe,
  Clock3,
  PhoneCall,
  Users,
  Edit3,
  RotateCcw
} from 'lucide-react';

const labFeatures = [
  { title: "24/7 blood test home service" },
  { title: "Blood test result within 4 Hours" },
  { title: "On-demand scheduling for convenience" },
  { title: "DHA licensed doctors and nurses" },
  { title: "High security and privacy" }
];

const bloodTestIndications = [
  "Routine annual health & body checkups",
  "Swelling, fatigue, or unexplained weakness",
  "Monitoring blood sugar & diabetes markers",
  "Difficulty visiting a clinic or hospital",
  "Checking cholesterol & lipid profile",
  "Vitamin deficiency screening (Vitamin D & B12)",
  "Testing for anemia, iron & hemoglobin levels",
  "Hormonal, thyroid & metabolism evaluation",
  "Food allergy & intolerance diagnostic screening",
  "Liver & kidney function routine monitoring",
  "Elderly care & patients requiring home sampling",
  "Doctor-prescribed follow-up blood tests"
];

function EditableText({ 
  fieldKey, 
  slug = 'default', 
  defaultText = '', 
  isEditMode = false, 
  className = '', 
  tagName = 'span',
  multiline = false
}) {
  const storageKey = `corx_editable_${slug}_${fieldKey}`;
  const [text, setText] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? saved : defaultText;
    } catch (e) {
      return defaultText;
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        setText(saved);
      } else {
        setText(defaultText);
      }
    } catch (e) {
      setText(defaultText);
    }
  }, [defaultText, storageKey]);

  const handleBlur = (e) => {
    const updated = e.currentTarget.innerText || e.currentTarget.textContent || '';
    setText(updated);
    try {
      localStorage.setItem(storageKey, updated);
    } catch (err) {}
  };

  const Component = tagName;
  const currentVal = text !== null && text !== undefined ? text : defaultText;

  if (!isEditMode) {
    if (multiline && typeof currentVal === 'string' && currentVal.includes('\n')) {
      const paragraphs = currentVal.split(/\n\n+/).filter(Boolean);
      return (
        <div className={className}>
          {paragraphs.map((p, idx) => (
            <p key={idx} className="mb-4 last:mb-0 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      );
    }
    return <Component className={className}>{currentVal}</Component>;
  }

  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} outline-none focus:ring-2 focus:ring-[#08709d] focus:ring-offset-2 rounded px-2 py-0.5 transition-all cursor-text group border-2 border-dashed border-[#08709d]/60 hover:border-[#08709d] bg-[#08709d]/10 text-slate-900 inline-block`}
      title="✏️ Click to edit text live"
    >
      {currentVal}
    </Component>
  );
}

function EditControlBar({ isEditMode, setIsEditMode, onResetDefaults }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1a294a]/95 text-white backdrop-blur-md px-4 py-3 rounded-full shadow-2xl border border-white/20">
      <div className="flex items-center gap-2 pr-2 border-r border-white/20">
        <span className={`w-2.5 h-2.5 rounded-full ${isEditMode ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
        <span className="text-xs font-bold uppercase tracking-wider">
          {isEditMode ? 'Live Edit Mode ON' : 'Live Editor'}
        </span>
      </div>

      <button
        onClick={() => setIsEditMode(!isEditMode)}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
          isEditMode 
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md' 
            : 'bg-white/10 hover:bg-white/20 text-white'
        }`}
        title={isEditMode ? "Click to lock edits" : "Click to edit titles & headings live"}
      >
        <Edit3 size={14} />
        <span>{isEditMode ? 'Done Editing' : 'Edit Headings'}</span>
      </button>

      {isEditMode && (
        <button
          onClick={onResetDefaults}
          className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-all flex items-center gap-1 border border-rose-500/30"
          title="Reset all edited text on this page to default"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}

function LabIllustration() {
  return (
    <div className="relative w-full max-w-[620px] mx-auto flex items-center justify-center">
      <div className="absolute w-96 h-96 bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative w-full bg-gradient-to-tr from-[#08709d]/10 via-[#08709d]/3 to-transparent p-6 rounded-[32px] border border-[#08709d]/10 shadow-xl">
        <div className="relative bg-white rounded-2xl border border-gray-150 p-10 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[440px]">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#08709d]/5 rounded-full blur-2xl pointer-events-none" />
          
          <svg width="240" height="240" viewBox="0 0 200 200" fill="none" className="relative z-10 w-[88%] h-auto drop-shadow-md">
            <circle cx="100" cy="100" r="90" fill="#08709d" fillOpacity="0.04" />
            <circle cx="100" cy="80" r="42" fill="#f4fafc" stroke="#08709d" strokeWidth="2.5" />
            <rect x="78" y="118" width="44" height="38" rx="8" fill="#1a294a" />
            <rect x="88" y="112" width="24" height="8" rx="2" fill="#22c55e" />
            <path d="M100 128v18M91 137h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <path d="M45 160c0-22 22-40 55-40s55 18 55 40v10H45v-10z" fill="#08709d" />
            <path d="M86 115v10h28v-10H86z" fill="#f3d0b2" />
            <circle cx="100" cy="94" r="21" fill="#f3d0b2" />
            <path d="M79 94c0-14 10-21 21-21s21 7 21 21H79z" fill="#1a294a" />
            <path d="M82 125l18 30 18-30" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M88 105c0 12 24 12 24 0" stroke="#1a294a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M100 117v12" stroke="#1a294a" strokeWidth="2.5" />
            <circle cx="100" cy="133" r="3.5" fill="#22c55e" />
          </svg>
          <div className="mt-5 inline-flex items-center gap-2 bg-[#08709d]/10 px-4 py-1.5 rounded-full border border-[#08709d]/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#08709d] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-[#08709d] uppercase tracking-wide">DHA-Licensed · Results in 2-4 Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhoMayNeedBloodTestSection({ indicationsList = [], serviceData, isEditMode, slug }) {
  const displayIndications = indicationsList || [];
  const defaultAboutDesc = serviceData?.about_description || serviceData?.description || 
    "Blood testing is essential for monitoring health, diagnosing medical conditions, and evaluating organ function. With CORx Healthcare, you no longer need to travel to a lab or wait in crowded waiting rooms.\n\nOur DHA-certified nurses visit your home, hotel, or office with sterile, single-use sampling kits to collect blood samples comfortably and safely, delivering accurate digital lab reports within 2 to 4 hours.\n\nWhether you require routine body checkups, diabetes monitoring, lipid profiles, or specialized diagnostic screenings, our senior medical team ensures complete confidentiality and medical accuracy throughout.";

  return (
    <Section variant="slate" className="py-16 md:py-24">
      <Container className="max-w-[1480px]">
        <div className={`grid grid-cols-1 ${displayIndications.length > 0 ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-12 items-stretch`}>
          
          {/* Left Card: ABOUT THE SERVICE */}
          <div className="rounded-3xl border-l-[6px] border-l-[#08709d] border-t border-r border-b border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]">
            <div>
              <div className="mb-5">
                <EditableText
                  slug={slug}
                  fieldKey="about_eyebrow"
                  defaultText="ABOUT THE SERVICE"
                  isEditMode={isEditMode}
                  tagName="span"
                  className="text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#08709d]/10 px-4 py-2 rounded-full border border-[#08709d]/20 inline-block"
                />
              </div>
              
              <EditableText
                slug={slug}
                fieldKey="about_title"
                defaultText={serviceData?.about_section_title || (serviceData?.title ? `About ${serviceData.title}` : "About Blood Test at Home & Home Sample Collection")}
                isEditMode={isEditMode}
                tagName="h2"
                className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-6"
              />

              <EditableText
                slug={slug}
                fieldKey="about_custom_description"
                defaultText={defaultAboutDesc}
                isEditMode={isEditMode}
                tagName="div"
                multiline={true}
                className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed font-sans"
              />
            </div>
          </div>

          {/* Right Card: CLINICAL INDICATIONS */}
          {displayIndications.length > 0 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]">
            <div>
              <div className="mb-5">
                <EditableText
                  slug={slug}
                  fieldKey="indications_eyebrow"
                  defaultText="CLINICAL INDICATIONS"
                  isEditMode={isEditMode}
                  tagName="span"
                  className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200/60 inline-block"
                />
              </div>

              <EditableText
                slug={slug}
                fieldKey="indications_title"
                defaultText={serviceData?.indications_section_title || (serviceData?.title ? `Who May Need ${serviceData.title}?` : "Who May Need a Blood Test at Home in Dubai?")}
                isEditMode={isEditMode}
                tagName="h2"
                className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-4"
              />

              <div className="mb-7">
                <EditableText
                  slug={slug}
                  fieldKey="indications_subheading"
                  defaultText={`You may benefit from our DHA-certified ${serviceData?.title || "home health service"} if you have:`}
                  isEditMode={isEditMode}
                  tagName="p"
                  className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed font-sans"
                />
              </div>

              {/* 2-Column Circle Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {displayIndications.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-[#08709d] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#08709d]" />
                    </div>
                    <EditableText
                      slug={slug}
                      fieldKey={`indication_item_${idx}`}
                      defaultText={typeof item === 'string' ? item : item.title || item.label}
                      isEditMode={isEditMode}
                      tagName="span"
                      className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed font-sans"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

        </div>
      </Container>
    </Section>
  );
}

function HeroBackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Floating Gradient Orb 1 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#08709d]/15 via-[#38bdf8]/10 to-transparent blur-[120px]"
      />

      {/* Animated Floating Gradient Orb 2 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-[#08709d]/10 to-transparent blur-[130px]"
      />

      {/* Animated Floating Gradient Orb 3 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-t from-[#065679]/15 to-transparent blur-[110px]"
      />

      {/* Floating Animated Ambient Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 1000 - 300,
            y: Math.random() * 600,
            opacity: 0.2
          }}
          animate={{
            y: [0, -180, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2
          }}
          className={`absolute rounded-full blur-[2px] ${
            i % 2 === 0 ? "w-4 h-4 bg-[#08709d]/30" : "w-3 h-3 bg-emerald-400/40"
          }`}
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i * 12) % 60}%`
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(#08709d_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
    </div>
  );
}

function LabServicesLanding({ slug = 'lab-services' }) {
  const [visible, setVisible] = useState(false);
  const [condVisible, setCondVisible] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all custom edited text on this page to default?")) {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`corx_editable_${slug}_`)) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    }
  };

  const defaultLabColumns = [
    {
      title: "Core Screenings",
      tagline: "Routine blood & vitals",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 1 7 7c0 4-3 7-7 13C9 16 5 13 5 9a7 7 0 0 1 7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      ),
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      tests: [
        "Allergy test",
        "Testing for anemia",
        "Blood sugar test",
        "Complete blood count",
        "CRP",
        "Covid-19 test",
        "Cholesterol test",
        "Diabetes test"
      ],
      delay: 0.05
    },
    {
      title: "Organ & Metabolic",
      tagline: "Hormonal & organ health",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
        </svg>
      ),
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      tests: [
        "Food sensitivity test",
        "HbA1C test",
        "Hepatitis A",
        "Hepatitis B",
        "Hormone test",
        "Influenza test",
        "Lipid profile",
        "Liver function test"
      ],
      delay: 0.12
    },
    {
      title: "Advanced Diagnostics",
      tagline: "Immunity, viruses & minerals",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
        </svg>
      ),
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
      tests: [
        "Microbial culture & sensitivity",
        "Mineral test",
        "Renal function test",
        "Stool test",
        "Urine test",
        "Vitamins test",
        "Food intolerance test",
        "Electrolytes"
      ],
      delay: 0.19
    }
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setCondVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_BASE_URL}/api/services/${slug}/`)
      .then(res => {
        if (!res.ok) return null;
        return res.json();
      })
      .then(data => {
        if (data && data.slug) {
          setServiceData(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch service data from API, using default layout:", err);
      });
  }, [slug]);

  const featuresList = serviceData ? (serviceData.features || []) : labFeatures;
  const indicationsList = serviceData ? (serviceData.indications || []) : bloodTestIndications;
  const labColumns = serviceData 
    ? (serviceData.lab_columns || []).map((col, idx) => ({
        ...col,
        icon: col.icon || defaultLabColumns[idx % defaultLabColumns.length]?.icon,
        iconBg: col.iconBg || defaultLabColumns[idx % defaultLabColumns.length]?.iconBg,
        delay: 0.05 + idx * 0.07
      })) 
    : defaultLabColumns;
  const reasonsList = serviceData ? (serviceData.reasons || []) : reasons;
  const stepsList = serviceData ? (serviceData.steps || []) : stepsData;
  const faqList = serviceData ? (serviceData.faqs || []) : labFaqs;
  const benefitsList = serviceData ? (serviceData.benefits || []) : [];
  const benefitsTitle = serviceData ? (serviceData.benefits_title || '') : '';

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* ── HIGHLIGHTS BANNER (Staff, 24/7 Service, Dubai 30 Mins) ── */}
      <ServiceHighlightsBar />

      {/* ── HERO SECTION ── */}
      <Section variant="white" className="pt-12 pb-16 md:pt-20 md:pb-20 relative overflow-hidden">
        <HeroBackgroundAnimation />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div 
              className="lg:col-span-6 space-y-6 flex flex-col items-start text-left transition-all duration-700"
              style={{ 
                opacity: visible ? 1 : 0, 
                transform: visible ? "translateY(0)" : "translateY(24px)" 
              }}
            >
              <div className="inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
                <EditableText
                  slug={slug}
                  fieldKey="hero_eyebrow"
                  defaultText={serviceData?.eyebrow || "DHA-Licensed Home Sample Collection Across Dubai"}
                  isEditMode={isEditMode}
                  tagName="span"
                  className="text-[#08709d] text-xs font-bold uppercase tracking-wider"
                />
              </div>
              
              <HeroTitle className="text-4xl sm:text-5xl lg:text-6xl">
                <EditableText
                  slug={slug}
                  fieldKey="hero_title"
                  defaultText={serviceData?.title ? serviceData.title : "Blood Test in Dubai"}
                  isEditMode={isEditMode}
                  tagName="span"
                />
              </HeroTitle>
              
              <h2 className="text-lg sm:text-xl font-bold text-[#08709d] uppercase tracking-wide -mt-2">
                <EditableText
                  slug={slug}
                  fieldKey="hero_tagline"
                  defaultText={serviceData?.tagline || "Get an Accurate Lab Result at Your Doorsteps"}
                  isEditMode={isEditMode}
                  tagName="span"
                />
              </h2>
              
              <Paragraph className="max-w-2xl text-gray-600">
                <EditableText
                  slug={slug}
                  fieldKey="hero_description"
                  defaultText={serviceData?.description || "Book a blood test at home in Dubai without visiting a clinic or Hospital. Our home care service provides convenient blood sample collection at your home, hotel, or office by DHA-certified healthcare professionals at an affordable price."}
                  isEditMode={isEditMode}
                  tagName="span"
                  multiline={true}
                />
              </Paragraph>
              
              {/* Feature Checklist - Clean List Design */}
              <div className="w-full pt-4 pb-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                  {featuresList.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#08709d] shrink-0" />
                      <EditableText
                        slug={slug}
                        fieldKey={`feature_item_${i}`}
                        defaultText={typeof f === 'string' ? f : f.title}
                        isEditMode={isEditMode}
                        tagName="span"
                        className="text-gray-900 text-sm md:text-base font-semibold leading-snug"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 w-full items-center mt-6">
                <Button variant="primary" href="/contact">
                  <CalendarDays size={18} />
                  <span>Book An Appointment</span>
                </Button>
                <Button variant="whatsapp" href="https://wa.me/97143320776" target="_blank" rel="noopener noreferrer">
                  <MessageSquare size={18} />
                  <span>WhatsApp Us</span>
                </Button>
              </div>
            </div>

            {/* Right Column - Prominent Hero Photo */}
            <div 
              className="lg:col-span-6 relative w-full max-w-[650px] mx-auto lg:ml-auto flex items-center justify-center pt-8 lg:pt-0 transition-all duration-700"
              style={{ 
                opacity: visible ? 1 : 0, 
                transform: visible ? "translateX(0)" : "translateX(32px)",
                transitionDelay: "0.2s"
              }}
            >
              {serviceData?.image_file ? (
                <img 
                  src={serviceData.image_file} 
                  alt={serviceData.title || "Service"} 
                  className="w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-[32px] shadow-2xl object-cover border-[6px] border-white/90 ring-1 ring-slate-900/10 hover:scale-[1.01] transition-transform duration-500" 
                />
              ) : (
                <LabIllustration />
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── BENEFITS SECTION ── */}
      <ServiceBenefitsSection 
        benefitsList={benefitsList} 
        benefitsTitle={benefitsTitle} 
        serviceTitle={serviceData?.title} 
        isEditMode={isEditMode} 
        slug={slug} 
        imageUrl={serviceData?.image || serviceData?.image_file} 
      />

      {/* ── WHO MAY NEED SECTION ── */}
      {(!serviceData || (serviceData?.indications && serviceData.indications.length > 0) || (serviceData?.description)) && (
        <WhoMayNeedBloodTestSection indicationsList={indicationsList} serviceData={serviceData} isEditMode={isEditMode} slug={slug} />
      )}

      {/* ── CONDITIONS SECTION ── */}
      {(!serviceData || (serviceData?.lab_columns && serviceData.lab_columns.length > 0)) && (
      <Section variant="warm">
        <Container className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {labColumns.map((col, idx) => (
              <motion.div
                key={idx}
                className="h-full"
                initial={{ opacity: 0, y: 10 }}
                animate={condVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: col.delay || 0.05 }}
              >
                <Card className="h-full flex flex-col justify-between p-6 sm:p-7 border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {col.tests && col.tests.map((test, testIdx) => (
                        <div 
                          key={testIdx} 
                          className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#08709d] text-white hover:bg-[#065679] hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                          <span className="text-sm font-bold text-white tracking-wide">{test}</span>
                          <Check size={16} className="text-white/90 group-hover:text-white group-hover:scale-110 transition-all shrink-0" strokeWidth={2.5} />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-[#08709d]/20 bg-gradient-to-r from-[#08709d] to-[#065679] text-white p-6 sm:p-7 shadow-lg shadow-[#08709d]/15 mt-10 w-full">
            <span className="shrink-0 text-white bg-white/10 p-2.5 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </span>
            <p className="text-base leading-7 text-white m-0 font-medium">
              <strong className="font-extrabold uppercase tracking-wider mr-1">Note:</strong> All {serviceData?.title ? serviceData.title.toLowerCase() : "health services"} at home at CORx are coordinated based on your medical requirements and doctor's advice, where applicable.
            </p>
          </div>
        </Container>
      </Section>
      )}

      {/* ── THREE STEPS PROCESS SECTION ── */}
      <ThreeStepsLabProcessSection stepsList={stepsList} serviceData={serviceData} isEditMode={isEditMode} slug={slug} />

      {/* ── WHY CHOOSE SECTION ── */}
      {(!serviceData || (serviceData?.reasons && serviceData.reasons.length > 0)) && (
        <WhyChooseCorxBloodTest reasonsList={reasonsList} serviceData={serviceData} isEditMode={isEditMode} slug={slug} />
      )}

      {/* ── CTA BANNER ── */}
      <Section variant="dark" className="relative overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="text-left max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                Have Any Questions?
              </h2>
              <p className="text-white/90 text-base leading-7">
                Call Us 24/7 at <a href="tel:+97143320776" className="text-white font-semibold underline underline-offset-4 hover:opacity-80">☎️ +971 4 332 0776</a>, <a href="tel:+971547033311" className="text-white font-semibold underline underline-offset-4 hover:opacity-80">📱 +971 54 703 3311</a>, or <a href="tel:+971502785990" className="text-white font-semibold underline underline-offset-4 hover:opacity-80">📱 +971 50 278 5990</a> for doctor on call service.
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

      {/* ── FAQ SECTION ── */}
      <LabServiceFAQ faqList={faqList} serviceData={serviceData} isEditMode={isEditMode} slug={slug} />

      {/* ── FLOATING LIVE EDIT CONTROL TOOLBAR ── */}
      <EditControlBar 
        isEditMode={isEditMode} 
        setIsEditMode={setIsEditMode} 
        onResetDefaults={handleResetDefaults} 
      />
    </div>
  );
}

const labFaqs = [
  {
    q: "How soon will I get my blood test results?",
    a: "Most routine blood test results are delivered digitally within 2 to 4 hours of sample collection. For specialized or advanced tests, our patient relationship executives will confirm the exact turnaround time (TAT) at the time of booking."
  },
  {
    q: "Is home sample collection safe and hygienic?",
    a: "Yes, absolutely. Our DHA-licensed nurses follow strict sterile medical protocols using single-use, sealed collection kits for every visit. All samples are transported in temperature-controlled, lab-grade carriers directly to our internationally accredited partner laboratories."
  },
  {
    q: "What types of blood tests can be done at home in Dubai?",
    a: "We offer 10,000+ tests at home including Complete Blood Count (CBC), Lipid Profile, HbA1C, Liver Function, Kidney Function, Hormones, Vitamins, Allergy panels, Hepatitis A & B, Thyroid profile, and many more. Contact us to confirm availability of any specific test."
  },
  {
    q: "How do I book a blood test at home service in Dubai?",
    a: "You can book easily by calling +971 4 332 0776, WhatsApp at +971 54 703 3311, or filling out our online appointment form. Our team is available 24/7 and typically confirms your appointment within 30 minutes."
  },
  {
    q: "Who collects the blood sample at home?",
    a: "All sample collections are performed by our DHA-certified registered nurses with extensive clinical experience. They arrive at your doorstep within 30–60 minutes of booking, equipped with all necessary sterile supplies."
  },
  {
    q: "Do you accept insurance for lab tests at home in Dubai?",
    a: "We work with a number of insurance providers for direct billing. Please contact our team with your insurance details and we will confirm coverage before your appointment. We also accept cash, credit/debit cards, and bank transfers."
  },
];

const faqStyles = `
  @keyframes faqFadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes faqHeaderIn {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lab-faq-section {
    background: #f8fafc;
    padding: 60px 0;
    position: relative;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    .lab-faq-section { padding: 40px 0; }
  }

  .lab-faq-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle at 0% 0%, rgba(8, 112, 157, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(94, 182, 59, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .lab-faq-wrap {
    padding: 0 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
    position: relative;
    z-index: 1;
  }

  .lab-faq-eyebrow {
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
    animation: faqHeaderIn 0.4s ease forwards;
  }

  .lab-faq-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a2340;
    text-align: center;
    margin: 0 0 0.5rem;
    animation: faqHeaderIn 0.4s 0.08s ease both;
    letter-spacing: -0.02em;
  }
  @media (max-width: 768px) {
    .lab-faq-title { font-size: 28px; }
  }

  .lab-faq-sub {
    font-size: 18px;
    color: #4b5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    animation: faqHeaderIn 0.4s 0.15s ease both;
  }
  @media (max-width: 768px) {
    .lab-faq-sub { font-size: 15px; margin-bottom: 1.5rem; }
  }

  .lab-faq-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .lab-faq-item {
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
    opacity: 0;
    animation: faqFadeIn 0.45s cubic-bezier(.4,0,.2,1) forwards;
    transition: background 0.2s;
  }
  .lab-faq-item:last-child { border-bottom: none; }
  .lab-faq-item.open { background: #f9fafb; }

  .lab-faq-btn {
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
    .lab-faq-btn { padding: 1.25rem 1.5rem; }
  }
  .lab-faq-btn:hover { background: #f9fafb; }

  .lab-faq-q {
    font-size: 18px;
    font-weight: 700;
    color: #1a2340;
    transition: color 0.2s;
    line-height: 1.4;
  }
  @media (max-width: 768px) {
    .lab-faq-q { font-size: 16px; }
  }
  .lab-faq-item.open .lab-faq-q { color: #08709d; }

  .lab-faq-icon {
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
    .lab-faq-icon { width: 30px; height: 30px; font-size: 20px; }
  }
  .lab-faq-item.open .lab-faq-icon {
    background: #08709d;
    border-color: #08709d;
    color: #fff;
    transform: rotate(45deg);
  }

  .lab-faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(.4,0,.2,1);
  }
  .lab-faq-item.open .lab-faq-body { grid-template-rows: 1fr; }
  .lab-faq-inner { overflow: hidden; }

  .lab-faq-ans {
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
    .lab-faq-ans { margin: 0 1.5rem 1.25rem; font-size: 14px; padding: 0.5rem 1rem; }
  }

  .lab-faq-footer {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 16px;
    color: #4b5563;
    font-weight: 500;
  }
  @media (max-width: 640px) {
    .lab-faq-footer { font-size: 14px; margin-top: 1.5rem; }
  }
  .lab-faq-footer a {
    color: #08709d;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;
  }
  .lab-faq-footer a:hover { border-bottom-color: #08709d; }
`;

function LabServiceFAQ({ faqList = [], serviceData, isEditMode, slug }) {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  const displayFaqs = faqList || [];
  
  if (displayFaqs.length === 0) return null;

  return (
    <section className="lab-faq-section">
      <style>{faqStyles}</style>
      <div className="lab-faq-wrap">
        <div className="lab-faq-eyebrow">
          <EditableText
            slug={slug}
            fieldKey="faq_eyebrow"
            defaultText="⊙ Common Questions"
            isEditMode={isEditMode}
            tagName="span"
          />
        </div>
        <h2 className="lab-faq-title">
          <EditableText
            slug={slug}
            fieldKey="faq_title"
            defaultText={serviceData?.faq_section_title || (serviceData?.title ? `${serviceData.title} FAQs` : 'Lab Services FAQs')}
            isEditMode={isEditMode}
            tagName="span"
          />
        </h2>
        <p className="lab-faq-sub">
          <EditableText
            slug={slug}
            fieldKey="faq_subheading"
            defaultText={serviceData?.faq_subheading || (serviceData?.title ? `Find answers to the most common questions about our ${serviceData.title.toLowerCase()} service in Dubai.` : 'Find answers to the most common questions about our blood test at home service in Dubai.')}
            isEditMode={isEditMode}
            tagName="span"
            multiline={true}
          />
        </p>

        <div className="lab-faq-list">
          {displayFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`lab-faq-item${isOpen ? " open" : ""}`}
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                <button
                  className="lab-faq-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="lab-faq-q">
                    <EditableText
                      slug={slug}
                      fieldKey={`faq_q_${i}`}
                      defaultText={faq.q}
                      isEditMode={isEditMode}
                      tagName="span"
                    />
                  </span>
                  <span className="lab-faq-icon">+</span>
                </button>
                <div className="lab-faq-body">
                  <div className="lab-faq-inner">
                    <div className="lab-faq-ans">
                      <EditableText
                        slug={slug}
                        fieldKey={`faq_a_${i}`}
                        defaultText={faq.a}
                        isEditMode={isEditMode}
                        tagName="span"
                        multiline={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="lab-faq-footer">
          Still have questions?{" "}
          <a href="/contact">Contact our support team</a>
        </p>
      </div>
    </section>
  );
}

const reasons = [
  {
    num: "01",
    label: "LAB SAMPLE COLLECTION",
    title: "Lab sample collection by DHA licensed nurses",
    desc: "CORx Healthcare provides blood test home service by DHA-licensed nurses, ensuring convenience and professional care. Ideal for regular monitoring or those unable to visit clinics.",
  },
  {
    num: "02",
    label: "FAST RESULTS",
    title: "Lab tests results in just 2-3 hours for all routine tests",
    desc: "Routine lab tests can be completed in just two to three hours. Fast and reliable, ensuring timely diagnosis and peace of mind. Ideal for urgent health assessments and regular checkups.",
  },
  {
    num: "03",
    label: "ACCREDITED LABS",
    title: "Certified & internationally accredited labs",
    desc: "CORx Healthcare guarantees the highest standards of accuracy and reliability by using lab samples from internationally accredited and certified facilities. Trust us for precise results and exceptional quality in every test.",
  },
  {
    num: "04",
    label: "SENIOR MEDICAL TEAM",
    title: "Direct contact with CORx Healthcare senior medical team",
    desc: "Enjoy direct contact with CORx Healthcare senior medical team, ensuring personalized and expert guidance. Benefit from immediate support and professional insights for your healthcare needs, enhancing your treatment and care experience.",
  },
];

const stepsData = [
  {
    icon: <PhoneCall size={36} className="text-[#08709d]" strokeWidth={1.75} />,
    title: "1. Book An Appointment",
    desc: "Call +971 43320776 or WhatsApp Us at +971547033311 for doctor-on-call service."
  },
  {
    icon: <Stethoscope size={36} className="text-[#08709d]" strokeWidth={1.75} />,
    title: "2. Doctors & Nurses Will Be At your Doorstep",
    desc: "Our team of DHA-certified Nurses is dedicated to your prompt care. Expect them at your doorstep within just 30 minutes for blood test home service."
  },
  {
    icon: <Users size={36} className="text-[#08709d]" strokeWidth={1.75} />,
    title: "3. Accurate Results 24/7 at Corx Healthcare",
    desc: "For routine tests, receive your results in just 2 to 3 hours. Confirm the turnaround time (TAT) with our patient relationship executives for precise details."
  }
];

function ThreeStepsLabProcessSection({ stepsList = [], serviceData, isEditMode, slug }) {
  const displaySteps = (stepsList && stepsList.length > 0) ? stepsList : stepsData;
  if (!displaySteps || displaySteps.length === 0) return null;

  const defaultStepIcons = [
    <PhoneCall key="0" size={36} className="text-[#08709d]" strokeWidth={1.75} />,
    <Stethoscope key="1" size={36} className="text-[#08709d]" strokeWidth={1.75} />,
    <Users key="2" size={36} className="text-[#08709d]" strokeWidth={1.75} />
  ];

  return (
    <Section variant="slate" className="py-16 sm:py-24 bg-slate-50/50">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Centered Title - matching exact design in screenshot */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#08709d] tracking-tight leading-snug font-montserrat">
            <EditableText
              slug={slug}
              fieldKey="steps_title"
              defaultText={serviceData?.title ? `Get ${serviceData.title} at your doorstep in 3 easy steps!` : 'Get 10,000+ Lab Tests at your doorstep in 3 easy steps!'}
              isEditMode={isEditMode}
              tagName="span"
            />
          </h2>
        </div>

        {/* 3 Horizontal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {displaySteps.map((item, i) => (
            <div 
              key={i} 
              className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-start text-left h-full group"
            >
              <div className="w-full">
                {/* Step Icon */}
                <div className="mb-5 text-[#08709d]">
                  {item.icon || defaultStepIcons[i % defaultStepIcons.length]}
                </div>

                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#08709d] font-montserrat leading-snug">
                  <EditableText
                    slug={slug}
                    fieldKey={`step_title_${i}`}
                    defaultText={item.title}
                    isEditMode={isEditMode}
                    tagName="span"
                  />
                </h3>

                {/* Step Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                  <EditableText
                    slug={slug}
                    fieldKey={`step_desc_${i}`}
                    defaultText={item.desc}
                    isEditMode={isEditMode}
                    tagName="span"
                    multiline={true}
                  />
                </p>
              </div>

              {/* Book Now Button */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#08709d] hover:bg-[#065679] text-white font-semibold text-sm rounded-md transition-colors shadow-sm shadow-[#08709d]/20"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WhyChooseCorxBloodTest({ reasonsList = [], serviceData, isEditMode, slug }) {
  const displayReasons = reasonsList || [];
  if (displayReasons.length === 0) return null;
  return (
    <Section variant="slate">
      <Container className="flex flex-col items-center">
        <div className="mb-10 text-center max-w-3xl">
          <div className="mb-2">
            <EditableText
              slug={slug}
              fieldKey="why_choose_eyebrow"
              defaultText={serviceData?.eyebrow || 'BLOOD TEST AT HOME'}
              isEditMode={isEditMode}
              tagName="p"
              className="text-[#08709d] text-sm font-bold uppercase tracking-wider inline-block"
            />
          </div>
          <SectionTitle className="mb-4">
            <EditableText
              slug={slug}
              fieldKey="why_choose_title"
              defaultText={serviceData?.why_choose_title || (serviceData?.title ? `Why Choose CORx Healthcare for ${serviceData.title}?` : 'Why Choose CORx Healthcare for Blood Test at Home in Dubai?')}
              isEditMode={isEditMode}
              tagName="span"
            />
          </SectionTitle>
          <Paragraph>
            <EditableText
              slug={slug}
              fieldKey="why_choose_desc"
              defaultText={serviceData?.why_choose_desc || serviceData?.description || 'If a DHA certified nurse can perform quality lab tests at home, why leave the comfort of your own home? CORx Home Healthcare in Dubai offers at-home blood sample collection services, ensuring quick and accurate results from internationally accredited labs. Enjoy the convenience and reliability of top-notch healthcare without stepping outside your door.'}
              isEditMode={isEditMode}
              tagName="span"
              multiline={true}
            />
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {displayReasons.map((r, i) => (
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
                <CardTitle className="mb-2">
                  <EditableText
                    slug={slug}
                    fieldKey={`reason_title_${i}`}
                    defaultText={r.title}
                    isEditMode={isEditMode}
                    tagName="span"
                  />
                </CardTitle>
                <hr className="border-t border-gray-100 mb-4" />
                <Paragraph className="m-0">
                  <EditableText
                    slug={slug}
                    fieldKey={`reason_desc_${i}`}
                    defaultText={r.desc}
                    isEditMode={isEditMode}
                    tagName="span"
                    multiline={true}
                  />
                </Paragraph>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function ServicePage({ serviceId }) {
  const params = useParams();
  const activeSlug = serviceId || params?.serviceSlug || 'lab-services';
  return <LabServicesLanding slug={activeSlug} />;
}
