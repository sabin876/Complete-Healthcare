import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Section, Button, Card, HeroTitle, SectionTitle, CardTitle, Paragraph, SmallText } from '../components/ui';
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
  PhoneCall
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

function LabIllustration() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto flex items-center justify-center">
      <div className="absolute w-80 h-80 bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative w-full bg-gradient-to-tr from-[#08709d]/10 via-[#08709d]/3 to-transparent p-5 rounded-3xl border border-[#08709d]/10 shadow-lg">
        <div className="relative bg-white rounded-2xl border border-gray-150 p-8 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#08709d]/5 rounded-full blur-2xl pointer-events-none" />
          
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="relative z-10 w-[75%] h-auto drop-shadow-md">
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
          <div className="mt-4 inline-flex items-center gap-2 bg-[#08709d]/10 px-3.5 py-1 rounded-full border border-[#08709d]/20">
            <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
            <span className="text-xs font-bold text-[#08709d] uppercase">DHA-Licensed · Results in 4 Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhoMayNeedBloodTestSection() {
  return (
    <Section variant="slate" className="py-16 md:py-24">
      <Container className="max-w-[1480px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Card: ABOUT THE SPECIALITY */}
          <div className="rounded-3xl border-l-[6px] border-l-[#08709d] border-t border-r border-b border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]">
            <div>
              <span className="text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#08709d]/10 px-4 py-2 rounded-full border border-[#08709d]/20 inline-block mb-5">
                ABOUT THE SERVICE
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-6">
                About Blood Test at Home & Home Sample Collection
              </h2>

              <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-5 font-sans">
                Blood testing is essential for monitoring health, diagnosing medical conditions, and evaluating organ function. With CORx Healthcare, you no longer need to travel to a lab or wait in crowded waiting rooms.
              </p>

              <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed mb-5 font-sans">
                Our DHA-certified nurses visit your home, hotel, or office with sterile, single-use sampling kits to collect blood samples comfortably and safely, delivering accurate digital lab reports within 2 to 4 hours.
              </p>

              <p className="text-slate-700 text-base sm:text-lg font-normal leading-relaxed m-0 font-sans">
                Whether you require routine body checkups, diabetes monitoring, lipid profiles, or specialized diagnostic screenings, our senior medical team ensures complete confidentiality and medical accuracy throughout.
              </p>
            </div>
          </div>

          {/* Right Card: CLINICAL INDICATIONS */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[540px]">
            <div>
              <span className="text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200/60 inline-block mb-5">
                CLINICAL INDICATIONS
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-4">
                Who May Need a Blood Test at Home in Dubai?
              </h2>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-7 font-sans">
                You may benefit from a DHA-certified home sample collection if you have:
              </p>

              {/* 2-Column Circle Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {bloodTestIndications.map((item, idx) => (
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
  );
}

function LabServicesLanding() {
  const [visible, setVisible] = useState(false);
  const [condVisible, setCondVisible] = useState(false);

  const labColumns = [
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

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#08709d]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ── HERO SECTION ── */}
      <Section variant="white" className="pt-20 pb-16 md:pt-28 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div 
              className="lg:col-span-7 space-y-6 flex flex-col items-start text-left transition-all duration-700"
              style={{ 
                opacity: visible ? 1 : 0, 
                transform: visible ? "translateY(0)" : "translateY(24px)" 
              }}
            >
              <div className="inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#08709d] animate-pulse" />
                <span className="text-[#08709d] text-xs font-bold uppercase tracking-wider">
                  DHA-Licensed Home Sample Collection Across Dubai
                </span>
              </div>
              
              <HeroTitle className="text-4xl sm:text-5xl lg:text-6xl">
                Blood Test <span className="text-[#08709d]">in Dubai</span>
              </HeroTitle>
              
              <h2 className="text-lg sm:text-xl font-bold text-[#08709d] uppercase tracking-wide -mt-2">
                Get an Accurate Lab Result at Your Doorsteps
              </h2>
              
              <Paragraph className="max-w-2xl text-gray-600">
                Book a blood test at home in Dubai without visiting a clinic or Hospital. Our home care service provides convenient blood sample collection at your home, hotel, or office by DHA-certified healthcare professionals at an affordable price.
              </Paragraph>
              <Paragraph className="max-w-2xl mt-2 text-gray-600">
                Regardless of whether you need a regular health check or specific diagnostic tests, we ensure the process is maintained with hygiene, accuracy, and reporting within 4 Hours to understand your healthcare requirements with minimal disturbance to your day.
              </Paragraph>
              
              {/* Feature Checklist - Clean List Design */}
              <div className="w-full pt-4 pb-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                  {labFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#08709d] shrink-0" />
                      <span className="text-gray-900 text-sm md:text-base font-semibold leading-snug">
                        {f.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Action Buttons */}
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

            {/* Right Column */}
            <div 
              className="lg:col-span-5 relative w-full max-w-[460px] mx-auto lg:ml-auto flex items-center justify-center pt-8 lg:pt-0 transition-all duration-700"
              style={{ 
                opacity: visible ? 1 : 0, 
                transform: visible ? "translateX(0)" : "translateX(32px)",
                transitionDelay: "0.2s"
              }}
            >
              <LabIllustration />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── WHO MAY NEED SECTION ── */}
      <WhoMayNeedBloodTestSection />

      {/* ── CONDITIONS SECTION ── */}
      <Section variant="warm">
        <Container className="flex flex-col items-center">
          <div className="mb-10 text-center max-w-3xl">
            <span className="text-[#08709d] text-xs font-bold uppercase tracking-widest bg-[#08709d]/10 px-3.5 py-1.5 rounded-full border border-[#08709d]/20 inline-block mb-3">
              COMPREHENSIVE DIAGNOSTIC SERVICES
            </span>
            <SectionTitle className="mb-4">
              Accurate Diagnostic Tests & Body Checkups at Your Doorstep
            </SectionTitle>
            <Paragraph>
              CORx Healthcare offers a wide range of lab tests at home — blood tests, screenings, diagnostic or monitoring health checks, all as per your needs.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mt-4">
            {labColumns.map((col, idx) => (
              <motion.div
                key={idx}
                className="h-full"
                initial={{ opacity: 0, y: 10 }}
                animate={condVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: col.delay }}
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
                      {col.tests.map((test, testIdx) => (
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
              <strong className="font-extrabold uppercase tracking-wider mr-1">Note:</strong> All blood tests at home at CORx are coordinated based on your medical requirements and doctor's advice, where applicable.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── WHY CHOOSE SECTION ── */}
      <WhyChooseCorxBloodTest />

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
      <Section variant="slate" className="relative overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#08709d] text-xs font-bold uppercase tracking-widest bg-[#08709d]/10 px-3.5 py-1.5 rounded-full border border-[#08709d]/20 inline-block mb-3">
              COMMON QUESTIONS
            </span>
            <SectionTitle className="mb-4">
              Lab Services FAQs
            </SectionTitle>
            <Paragraph>
              Find answers to the most common questions about our lab test at home service in Dubai.
            </Paragraph>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "How soon will I get my blood test results?", a: "Most routine blood test results are delivered digitally within 4 hours." },
              { q: "Is home sample collection safe and hygienic?", a: "Yes, our DHA-licensed nurses follow strict sterile medical protocols using single-use sealed kits." }
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-base leading-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
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
    icon: <CalendarDays size={30} />,
    title: "1. Book An Appointment",
    desc: "Call +971 4 332 0776 or WhatsApp Us at +971 54 703 3311 for doctor-on-call service."
  },
  {
    icon: <Stethoscope size={30} />,
    title: "2. Doctors & Nurses Will Be At Your Doorstep",
    desc: "Our team of DHA-certified Nurses is dedicated to your prompt care. Expect them at your doorstep within just 30 minutes for blood test home service."
  },
  {
    icon: <CheckCircle2 size={30} />,
    title: "3. Accurate Results 24/7 at CORx Healthcare",
    desc: "For routine tests, receive your results in just 2 to 3 hours. Confirm the turnaround time (TAT) with our patient relationship executives for precise details."
  }
];

function ThreeStepsLabProcessSection() {
  return (
    <Section variant="slate" className="relative overflow-hidden py-20">
      <Container className="max-w-[1480px]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column - List Content */}
          <div className="w-full lg:w-1/2">
            <span className="text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#08709d]/10 px-4 py-2 rounded-full border border-[#08709d]/20 inline-block mb-4">
              HOW IT WORKS
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 text-[#1a294a] tracking-tight leading-tight font-montserrat">
              Get 10,000+ Lab Tests at Your Doorstep in 3 Easy Steps!
            </h2>

            <div className="space-y-8 mb-10">
              {stepsData.map((item, i) => (
                <div key={i} className="flex gap-5 sm:gap-6 group items-start">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#08709d] group-hover:bg-[#08709d] group-hover:text-white transition-all duration-300 border border-slate-200/80">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1.5 text-[#1a294a] font-montserrat leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4 flex-wrap">
              <Button variant="primary" href="tel:+971547033311">
                <CalendarDays size={18} />
                <span>Book An Appointment</span>
              </Button>
              <Button variant="whatsapp" href="https://wa.me/971547033311" target="_blank" rel="noopener noreferrer">
                <MessageSquare size={18} />
                <span>WhatsApp Us</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Floating Card Style */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[30px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-[8px] border-white w-full min-h-[480px] lg:h-[530px] bg-white p-6 flex flex-col justify-between">
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-gradient-to-br from-[#08709d]/10 via-slate-50 to-[#08709d]/5 border border-slate-100 p-8 flex flex-col items-center justify-center text-center">
                
                <div className="w-20 h-20 rounded-full bg-[#08709d] text-white flex items-center justify-center shadow-lg mb-6 animate-pulse">
                  <Stethoscope size={40} strokeWidth={2} />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#08709d] bg-[#08709d]/10 px-4 py-1.5 rounded-full border border-[#08709d]/20 mb-3">
                  CORX HOME HEALTHCARE DUBAI
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a294a] mb-3 leading-snug">
                  DHA-Certified Doorstep Healthcare
                </h3>

                <p className="text-slate-600 text-base max-w-md leading-relaxed mb-6">
                  Certified medical staff equipped with single-use sterile kits arriving at your home, hotel, or office within 30 minutes.
                </p>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md pt-4 border-t border-slate-200/80">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                    <p className="text-xs font-bold text-gray-400 uppercase">Arrival Time</p>
                    <p className="text-lg font-extrabold text-[#08709d]">~30 Mins</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                    <p className="text-xs font-bold text-gray-400 uppercase">Report Turnaround</p>
                    <p className="text-lg font-extrabold text-emerald-600">2 - 3 Hours</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}

function WhyChooseCorxBloodTest() {
  return (
    <Section variant="slate">
      <Container className="flex flex-col items-center">
        <div className="mb-10 text-center max-w-3xl">
          <p className="text-[#08709d] text-sm font-bold uppercase tracking-wider mb-2">
            BLOOD TEST AT HOME
          </p>
          <SectionTitle className="mb-4">
            Why Choose CORx Healthcare for Blood Test at Home in Dubai?
          </SectionTitle>
          <Paragraph>
            If a DHA certified nurse can perform quality lab tests at home, why leave the comfort of your own home? CORx Home Healthcare in Dubai offers at-home blood sample collection services, ensuring quick and accurate results from internationally accredited labs. Enjoy the convenience and reliability of top-notch healthcare without stepping outside your door.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {reasons.map((r, i) => (
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
                  {r.title}
                </CardTitle>
                <hr className="border-t border-gray-100 mb-4" />
                <Paragraph className="m-0">
                  {r.desc}
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
  return <LabServicesLanding />;
}
