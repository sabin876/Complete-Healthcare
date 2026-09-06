import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Home, Users, Briefcase, ShieldCheck, 
  MapPin, Calendar, FileText, Server, 
  Droplets, HeartPulse, Stethoscope, Sparkles, TestTube,
  ExternalLink, Code
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const Sitemap = () => {
  const [dynamicServices, setDynamicServices] = useState([]);
  const [dynamicBlogs, setDynamicBlogs] = useState([]);

  useEffect(() => {
    document.title = "Sitemap | CORx Healthcare Dubai";
    if (typeof window !== 'undefined') {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith('/') && window.location.pathname !== '/'
        ? window.location.pathname.slice(0, -1)
        : window.location.pathname;
      const origin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
        ? window.location.origin
        : 'https://corx.ae';
      canonicalLink.setAttribute('href', `${origin}${cleanPath}`);
    }

    // Fetch dynamic services
    fetch(`${API_BASE_URL}/api/services/`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDynamicServices(data);
        }
      })
      .catch(() => {});

    // Fetch dynamic blogs
    fetch(`${API_BASE_URL}/api/blogs/`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDynamicBlogs(data);
        }
      })
      .catch(() => {});
  }, []);

  // Main Pages
  const mainPages = [
    { name: "Home", path: "/", icon: Home },
    { name: "About Us", path: "/about-us", icon: Users },
    { name: "Our Medical Team", path: "/team", icon: Stethoscope },
    { name: "Careers", path: "/career", icon: Briefcase },
    { name: "Locations & Coverage", path: "/locations", icon: MapPin },
    { name: "Book An Appointment", path: "/book-an-appointment", icon: Calendar },
    { name: "Social Media & Connect", path: "/social-media", icon: ExternalLink },
    { name: "Privacy Policy", path: "/privacy-policy", icon: ShieldCheck },
    { name: "Staff Dashboard", path: "/dashboard", icon: Code }
  ];

  // Core Medical Services
  const defaultServices = [
    {
      name: "IV Therapy at Home",
      path: "/iv-therapy",
      icon: Droplets,
      subs: [
        { name: "Immunity Boost IV Drip", path: "/iv-therapy" },
        { name: "Myers Cocktail Drip", path: "/iv-therapy" }
      ]
    },
    {
      name: "Home Nursing Services",
      path: "/home-nursing",
      icon: HeartPulse,
      subs: [
        { name: "Palliative Care", path: "/palliative-care" },
        { name: "Night Care Nurse", path: "/night-care-nurse" },
        { name: "Nurse for Injection", path: "/injection-at-home" },
        { name: "Wound Care & Dressing", path: "/wound-care" },
        { name: "Oxygen Therapy", path: "/oxygen-therapy" }
      ]
    },
    {
      name: "Doctor On Call 24/7",
      path: "/doctor-on-call",
      icon: Stethoscope,
      subs: [
        { name: "Doctor at Home", path: "/doctor-on-call" },
        { name: "Doctor at Hotel", path: "/doctor-on-call" },
        { name: "Doctor at Office", path: "/doctor-on-call" }
      ]
    },
    {
      name: "Lab Test At Home",
      path: "/lab-test-at-home",
      icon: TestTube,
      subs: [
        { name: "Blood Test at Home", path: "/lab-test-at-home" },
        { name: "Full Body Checkup", path: "/lab-test-at-home" },
        { name: "Diabetes Screening", path: "/lab-test-at-home" }
      ]
    },
    {
      name: "Elderly Home Care",
      path: "/elderly-home-care",
      icon: Sparkles,
      subs: [
        { name: "Senior Companionship", path: "/elderly-home-care" },
        { name: "Dementia & Alzheimer Support", path: "/elderly-home-care" }
      ]
    }
  ];

  const servicesList = dynamicServices.length > 0
    ? dynamicServices.filter(s => !s.parent).map(s => ({
        name: s.title || s.name,
        path: `/${s.slug}`,
        icon: Stethoscope,
        subs: (s.sub_services || []).map(sub => ({
          name: sub.title || sub.name,
          path: `/${sub.slug}`
        }))
      }))
    : defaultServices;

  // Blog Articles
  const defaultBlogArticles = [
    { title: "Alignment concept: Total Knee Replacement", path: "/blog/alignment-concept-total-knee-replacement" },
    { title: "The Evolution of TKR Implants", path: "/blog/evolution-of-tkr-implants" },
    { title: "Steps in Total Knee Replacement", path: "/blog/steps-in-total-knee-replacement" },
    { title: "Post-Surgical Kinematic Alignment in TKR", path: "/blog/post-surgical-kinematic-alignment-in-tkr" }
  ];

  const blogArticles = dynamicBlogs.length > 0
    ? dynamicBlogs.map(b => ({
        title: b.title,
        path: b.slug ? `/blog/${b.slug}` : `/blog/${b.id}`
      }))
    : defaultBlogArticles;

  // Backend & Admin API Links
  const backendLinks = [
    { 
      name: "Django Admin Portal", 
      url: `${API_BASE_URL}/admin/`, 
      desc: "Manage services, blogs, team members, and settings" 
    },
    { 
      name: "REST API Root Index", 
      url: `${API_BASE_URL}/api/`, 
      desc: "Live browsable API root endpoint" 
    },
    { 
      name: "Services API Endpoint", 
      url: `${API_BASE_URL}/api/services/`, 
      desc: "JSON service catalogue data" 
    },
    { 
      name: "Blogs API Endpoint", 
      url: `${API_BASE_URL}/api/blogs/`, 
      desc: "JSON medical blog articles" 
    },
    { 
      name: "Team API Endpoint", 
      url: `${API_BASE_URL}/api/team/`, 
      desc: "JSON medical team and staff listings" 
    },
    { 
      name: "Staff Management API", 
      url: `${API_BASE_URL}/api/staff/`, 
      desc: "Staff profiles, duties, and task endpoints" 
    },
    { 
      name: "Duty Schedule API", 
      url: `${API_BASE_URL}/api/duties/`, 
      desc: "Duty shift schedules, replacements, and on-call rosters" 
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Simple Page Header */}
        <div className="mb-12 text-center sm:text-left border-b border-slate-200/80 pb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-[#08709d] font-['Montserrat'] mb-3">
            CORx Site Map
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            A complete overview of all public pages, medical services, blog posts, and backend API endpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Column 1: Main Pages */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat'] mb-6 pb-3 border-b border-slate-100 flex items-center gap-2.5">
              <Home className="w-5 h-5" />
              <span>Main Pages</span>
            </h2>
            <ul className="space-y-3.5">
              {mainPages.map((page, idx) => (
                <li key={idx}>
                  <Link 
                    to={page.path}
                    className="flex items-center justify-between text-base font-semibold text-slate-800 hover:text-[#08709d] transition-colors py-1.5 px-2.5 rounded-xl hover:bg-sky-50/60"
                  >
                    <span>{page.name}</span>
                    <span className="text-xs sm:text-sm text-slate-400 font-normal">{page.path}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Backend & Admin Portals */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat'] mb-6 pb-3 border-b border-slate-100 flex items-center gap-2.5">
              <Server className="w-5 h-5 text-[#2ebd6e]" />
              <span>Backend & Admin Links</span>
            </h2>
            <ul className="space-y-3.5">
              {backendLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-base font-semibold text-slate-800 hover:text-[#2ebd6e] transition-colors py-1.5 px-2.5 rounded-xl hover:bg-emerald-50/60 group"
                  >
                    <div className="flex flex-col">
                      <span className="flex items-center gap-2">
                        <span>{item.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2ebd6e]" />
                      </span>
                      <span className="text-xs text-slate-500 font-normal mt-0.5">{item.desc}</span>
                    </div>
                    <span className="text-xs text-[#2ebd6e] font-mono font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 shrink-0 ml-3">
                      API
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Medical Services */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat'] mb-6 pb-3 border-b border-slate-100 flex items-center gap-2.5">
              <HeartPulse className="w-5 h-5 text-[#08709d]" />
              <span>Medical Services</span>
            </h2>
            <ul className="space-y-5">
              {servicesList.map((service, idx) => (
                <li key={idx} className="space-y-2">
                  <Link 
                    to={service.path}
                    className="text-base font-bold text-slate-900 hover:text-[#08709d] flex items-center justify-between py-0.5"
                  >
                    <span>{service.name}</span>
                    <span className="text-xs sm:text-sm text-slate-400 font-normal">{service.path}</span>
                  </Link>
                  {service.subs && service.subs.length > 0 && (
                    <ul className="pl-4 border-l-2 border-slate-200 space-y-1.5 mt-1">
                      {service.subs.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link 
                            to={sub.path}
                            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-[#2ebd6e] transition-colors block py-0.5"
                          >
                            • {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Blog Articles & XML Sitemap */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat'] mb-6 pb-3 border-b border-slate-100 flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Health Blog Articles</span>
              </h2>
              <ul className="space-y-3">
                {blogArticles.map((article, idx) => (
                  <li key={idx}>
                    <Link 
                      to={article.path}
                      className="text-sm sm:text-base font-medium text-slate-700 hover:text-[#08709d] transition-colors block py-1 px-1.5 rounded-lg hover:bg-purple-50/40 leading-snug"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* XML Search Engine File Link */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-slate-800 block">Search Engine XML File:</span>
                <span className="text-xs text-slate-500">For Google & Bing web crawlers</span>
              </div>
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-[#08709d] hover:underline flex items-center gap-1.5 bg-sky-50 px-3.5 py-2 rounded-xl border border-sky-100"
              >
                <span>/sitemap.xml</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Sitemap;
