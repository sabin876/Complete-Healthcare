import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, ExternalLink, ShieldCheck, Heart, Users, 
  Sparkles, CheckCircle2, MessageSquare, Star, ArrowRight, 
  ChevronDown, Video, Award, Clock, Share2, Compass
} from 'lucide-react';
import { Link } from 'react-router';

/* ── Custom Brand SVGs ── */
const FacebookIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const YoutubeIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3v6" />
  </svg>
);

const LinkedinIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const TikTokIcon = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SocialMedia = () => {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Social Media Channels & Connect | CORx Healthcare Dubai";
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const socialPlatforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@corx_healthcare_dubai',
      badge: 'Most Popular',
      badgeColor: 'bg-rose-500 text-white',
      gradient: 'from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]',
      hoverBg: 'hover:border-rose-300',
      iconBg: 'bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]',
      icon: <InstagramIcon size={30} />,
      link: 'https://www.instagram.com/corx_healthcare_dubai',
      stats: '12.5k+ Followers',
      description: 'Daily healthcare reels, IV drip benefits, real nurse visits in Dubai, wellness advice, and patient testimonials.',
      tags: ['#IVTherapyDubai', '#HomeNursing', '#DoctorOnCall', '#DubaiHealthcare']
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'Corx Healthcare Dubai',
      badge: 'Community Hub',
      badgeColor: 'bg-blue-600 text-white',
      gradient: 'from-[#1877F2] to-[#0d5cb6]',
      hoverBg: 'hover:border-blue-300',
      iconBg: 'bg-[#1877F2]',
      icon: <FacebookIcon size={30} />,
      link: 'https://www.facebook.com/CorxHealthcare',
      stats: '8.4k+ Page Likes',
      description: 'Comprehensive medical blogs, community updates, health camps, Dubai home care guides, and patient Q&A sessions.',
      tags: ['#DubaiHealth', '#ElderlyCare', '#HomeCareServices', '#MedicalCommunity']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: 'CORx Healthcare Dubai',
      badge: 'Video Guides',
      badgeColor: 'bg-red-600 text-white',
      gradient: 'from-[#FF0000] to-[#cc0000]',
      hoverBg: 'hover:border-red-300',
      iconBg: 'bg-[#FF0000]',
      icon: <YoutubeIcon size={30} />,
      link: 'https://www.youtube.com/@corxhealthcare',
      stats: '150+ Videos',
      description: 'In-depth medical explainers by licensed doctors, physiotherapy exercise demonstrations, and patient home care walkthroughs.',
      tags: ['#HealthVlogs', '#PhysiotherapyTutorials', '#DoctorExplains', '#MedicalTips']
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Official',
      handle: '+971 54 703 3311',
      badge: 'Instant 24/7 Chat',
      badgeColor: 'bg-emerald-600 text-white',
      gradient: 'from-[#25D366] to-[#128C7E]',
      hoverBg: 'hover:border-emerald-300',
      iconBg: 'bg-[#25D366]',
      icon: <WhatsAppIcon size={30} />,
      link: 'https://wa.me/971547033311?text=Hi%20CORx%20Healthcare,%20I%20would%20like%20to%20inquire%20about%20your%20services',
      stats: '< 5 Mins Response',
      description: 'Direct 24/7 hotline with licensed medical coordinators. Book doctor visits, IV drips, or lab tests at home in under 2 minutes.',
      tags: ['#InstantBooking', '#24x7Support', '#EmergencyDoctor', '#HomeVisit']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'CORx Healthcare',
      badge: 'Professional',
      badgeColor: 'bg-sky-700 text-white',
      gradient: 'from-[#0A66C2] to-[#004182]',
      hoverBg: 'hover:border-sky-300',
      iconBg: 'bg-[#0A66C2]',
      icon: <LinkedinIcon size={30} />,
      link: 'https://www.linkedin.com/company/corx-healthcare',
      stats: 'Corporate & Careers',
      description: 'Corporate wellness solutions, DHA compliance news, medical hiring, career openings, and healthcare industry leadership.',
      tags: ['#CorporateWellness', '#HealthcareCareers', '#DHADubai', '#HealthInnovation']
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      handle: '@CorxDubai',
      badge: 'Live News',
      badgeColor: 'bg-slate-900 text-white',
      gradient: 'from-[#14171A] to-[#000000]',
      hoverBg: 'hover:border-slate-400',
      iconBg: 'bg-black',
      icon: <TwitterIcon size={30} />,
      link: 'https://twitter.com/CorxDubai',
      stats: 'Daily Bulletins',
      description: 'Real-time healthcare bulletins, viral health discussions, emergency clinic updates, and instant Dubai health alerts.',
      tags: ['#HealthcareNews', '#DubaiDoctors', '#WellnessAlerts', '#CorxUpdates']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@corxhealthcare',
      badge: 'Trending',
      badgeColor: 'bg-black text-white',
      gradient: 'from-[#000000] to-[#25F4EE]',
      hoverBg: 'hover:border-cyan-300',
      iconBg: 'bg-black',
      icon: <TikTokIcon size={30} />,
      link: 'https://www.tiktok.com/@corxhealthcare',
      stats: 'Quick Tips',
      description: 'Bite-sized wellness hacks, hydration routines, posture corrections, and day-in-the-life of home nurses in Dubai.',
      tags: ['#HealthHacks', '#WellnessTips', '#DubaiLife', '#QuickCare']
    }
  ];

  const contentHighlights = [
    {
      icon: <Video className="text-[#08709d]" size={26} />,
      title: "Doctor Explainer Videos",
      desc: "Watch our DHA-licensed physicians answer top patient queries about chronic diseases, IV drip cocktails, lab tests, and recovery."
    },
    {
      icon: <Heart className="text-[#e4405f]" size={26} />,
      title: "Patient Success Stories",
      desc: "Real transformation and recovery journeys from families across Dubai who experienced our 24/7 home nursing & elderly care."
    },
    {
      icon: <Sparkles className="text-[#2ebd6e]" size={26} />,
      title: "Live Demonstrations & Drips",
      desc: "Behind-the-scenes looks at our sterile mobile lab testing, IV vitamin therapy preparations, and physiotherapy equipment."
    },
    {
      icon: <Award className="text-amber-500" size={26} />,
      title: "Exclusive Offers & Discounts",
      desc: "Be the first to know about seasonal health checkup packages, corporate wellness drives, and family discount bundles."
    }
  ];

  const faqs = [
    {
      q: "Are all social media channels listed here official and verified?",
      a: "Yes! All accounts linked on this page are the official, verified social media channels of CORx Healthcare Dubai. Please be cautious of unofficial pages."
    },
    {
      q: "Can I book a doctor visit or IV therapy through Instagram or WhatsApp?",
      a: "Absolutely! You can message us directly on WhatsApp (+971 54 703 3311) or send a DM on Instagram. Our clinical coordinators respond within minutes to confirm your home appointment."
    },
    {
      q: "Do you share educational health content regularly?",
      a: "Yes, our licensed medical team creates daily content covering nutrition, preventive medicine, elderly care techniques, immunity boosting, and Dubai health regulations."
    },
    {
      q: "How can I collaborate or share my patient testimonial?",
      a: "We love sharing real recovery journeys! You can tag @corx_healthcare_dubai in your posts/stories, message our social team on Instagram, or email info@corx.ae with your experience."
    }
  ];

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] min-h-screen relative overflow-hidden font-sans">
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-0 left-0 w-full h-[650px] overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-[#08709d]/15 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-[#2ebd6e]/15 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[#e4405f]/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── 1. HERO HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-slate-700 text-xs font-bold uppercase tracking-wider mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-[#2ebd6e] animate-ping"></span>
            <span className="text-[#08709d] font-extrabold">OFFICIAL CHANNELS</span>
            <span className="text-slate-300">•</span>
            <span>CONNECT WITH US</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.15] mb-6"
          >
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#08709d] via-[#1594cc] to-[#2ebd6e]">CORx Healthcare</span> Community
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal"
          >
            Stay connected with Dubai's premier home healthcare provider. Follow our official pages for daily wellness tips, doctor insights, behind-the-scenes reels, and instant 24/7 clinical support.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: 'Official Channels', value: '7+ Platforms', icon: Share2, color: 'text-[#08709d]' },
              { label: 'Community Members', value: '25,000+', icon: Users, color: 'text-[#e4405f]' },
              { label: 'Instant Booking', value: '24/7 Available', icon: Clock, color: 'text-[#2ebd6e]' },
              { label: 'DHA Licensed', value: '100% Verified', icon: ShieldCheck, color: 'text-amber-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-md border border-slate-100 p-3.5 sm:p-4 rounded-2xl shadow-2xs text-center flex flex-col items-center">
                <stat.icon className={`${stat.color} mb-1.5`} size={20} />
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">{stat.value}</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── 2. SOCIAL MEDIA CARDS GRID ── */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Explore Our Official Social Media Hub
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Choose your favorite platform below to follow, engage, or chat directly with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {socialPlatforms.map((platform, idx) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -8 }}
                className={`group relative bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${platform.hoverBg}`}
              >
                {/* Top Accent Gradient Line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${platform.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}></div>

                <div>
                  {/* Card Header: Icon + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${platform.iconBg} text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {platform.icon}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${platform.badgeColor} shadow-2xs uppercase tracking-wider mb-1`}>
                        {platform.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        {platform.stats}
                      </span>
                    </div>
                  </div>

                  {/* Channel Title & Handle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#08709d] transition-colors mb-1">
                    {platform.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-[#08709d] font-mono mb-3.5 flex items-center gap-1.5">
                    <span>{platform.handle}</span>
                    <CheckCircle2 size={14} className="text-[#2ebd6e] fill-[#2ebd6e]/20" />
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    {platform.description}
                  </p>

                  {/* Topic Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {platform.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-medium bg-slate-50 border border-slate-200/60 text-slate-600 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Follow Button */}
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 text-white bg-gradient-to-r ${platform.gradient} shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition-all duration-200`}
                >
                  <span>Follow on {platform.name}</span>
                  <ExternalLink size={15} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 3. CONTENT HIGHLIGHTS / WHAT YOU'LL FIND ── */}
        <div className="mb-24 bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 md:p-16 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="max-w-3xl mx-auto text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              <span>CONTENT PREVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              What You'll Experience On Our Channels
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We create informative, patient-first health content to keep Dubai families informed, healthy, and empowered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {contentHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50/80 hover:bg-white border border-slate-200/70 hover:border-[#08709d]/40 rounded-2xl p-6 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-2xs flex items-center justify-center mb-4 border border-slate-100">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 4. 24/7 IMMEDIATE EMERGENCY & APPOINTMENT BANNER ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-24 bg-gradient-to-br from-[#08709d] via-[#095b7f] to-[#0d1527] rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-white text-center shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ebd6e]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#2ebd6e]"></span>
              24/7 Medical Care At Your Doorstep
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
              Need Medical Care Right Now?
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
              Our DHA-licensed doctors and registered nurses are available 24×7 anywhere in Dubai with a typical arrival time of under 45 minutes.
            </p>

            <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
              <a
                href="https://wa.me/971547033311?text=Hi%20CORx%20Healthcare,%20I%20need%20immediate%20medical%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2ebd6e] hover:bg-[#27a862] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm flex items-center gap-2.5 shadow-xl shadow-emerald-900/30 hover:scale-102 active:scale-98 transition-all"
              >
                <WhatsAppIcon size={20} />
                <span>WhatsApp 24/7 Chat</span>
              </a>

              <a
                href="tel:+97143320776"
                className="bg-white hover:bg-slate-100 text-[#08709d] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm flex items-center gap-2.5 shadow-xl hover:scale-102 active:scale-98 transition-all"
              >
                <Phone size={18} />
                <span>Call +971 4 332 0776</span>
              </a>

              <Link
                to="/book-an-appointment"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm flex items-center gap-2.5 hover:scale-102 active:scale-98 transition-all"
              >
                <span>Book Appointment Online</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── 5. FAQS SECTION ── */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#08709d] text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquare size={14} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Social Media & Online Support FAQs
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden bg-white ${
                    isOpen ? 'border-[#08709d] shadow-sm' : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#08709d] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 sm:p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SocialMedia;
