import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Home, Users, Briefcase, ShieldCheck, 
  MapPin, Calendar, FileText, Server, 
  Droplets, HeartPulse, Stethoscope, Sparkles, TestTube,
  ExternalLink, Code, Globe, Activity, BookOpen,
  Search, ChevronRight, Zap
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';
import SEO from '../components/SEO';

const Sitemap = () => {
  const [dynamicServices, setDynamicServices] = useState([]);
  const [dynamicBlogs, setDynamicBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services/`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (Array.isArray(data) && data.length > 0) setDynamicServices(data); })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/blogs/`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (Array.isArray(data) && data.length > 0) setDynamicBlogs(data); })
      .catch(() => {});
  }, []);

  const mainPages = [
    { name: "Home", path: "/", icon: Home },
    { name: "About Us", path: "/about-us", icon: Users },
    { name: "Our Services", path: "/services", icon: HeartPulse },
    { name: "Our Medical Team", path: "/team", icon: Stethoscope },
    { name: "Careers", path: "/career", icon: Briefcase },
    { name: "Book Appointment", path: "/book-an-appointment", icon: Calendar },
    { name: "Contact Us", path: "/contact-us", icon: FileText },
    { name: "Social Media", path: "/social-media", icon: Globe },
    { name: "Privacy Policy", path: "/privacy-policy", icon: ShieldCheck },
  ];

  const defaultServices = [
    { name: "IV Therapy at Home", path: "/iv-therapy", icon: Droplets, subs: [
      { name: "Immunity Boost IV Drip", path: "/iv-therapy" },
      { name: "Myers Cocktail Drip", path: "/iv-therapy" }
    ]},
    { name: "Home Nursing Services", path: "/home-nursing", icon: HeartPulse, subs: [
      { name: "Palliative Care", path: "/palliative-care" },
      { name: "Night Care Nurse", path: "/night-care-nurse" },
      { name: "Wound Care & Dressing", path: "/wound-care" },
      { name: "Oxygen Therapy", path: "/oxygen-therapy" }
    ]},
    { name: "Doctor On Call 24/7", path: "/doctor-on-call", icon: Stethoscope, subs: [
      { name: "Doctor at Home", path: "/doctor-on-call" },
      { name: "Doctor at Hotel", path: "/doctor-on-call" },
      { name: "Doctor at Office", path: "/doctor-on-call" }
    ]},
    { name: "Lab Test At Home", path: "/lab-test-at-home", icon: TestTube, subs: [
      { name: "Blood Test at Home", path: "/lab-test-at-home" },
      { name: "Full Body Checkup", path: "/lab-test-at-home" }
    ]},
    { name: "Elderly Home Care", path: "/elderly-home-care", icon: Sparkles, subs: [
      { name: "Senior Companionship", path: "/elderly-home-care" },
      { name: "Dementia Support", path: "/elderly-home-care" }
    ]},
  ];

  const servicesList = dynamicServices.length > 0
    ? dynamicServices.filter(s => !s.parent).map(s => ({
        name: s.title || s.name, path: `/${s.slug}`, icon: Stethoscope,
        subs: (s.sub_services || []).map(sub => ({ name: sub.title || sub.name, path: `/${sub.slug}` }))
      }))
    : defaultServices;

  const defaultBlogArticles = [
    { title: "Alignment concept: Total Knee Replacement", path: "/blog/alignment-concept-total-knee-replacement" },
    { title: "The Evolution of TKR Implants", path: "/blog/evolution-of-tkr-implants" },
    { title: "Steps in Total Knee Replacement", path: "/blog/steps-in-total-knee-replacement" },
    { title: "Post-Surgical Kinematic Alignment", path: "/blog/post-surgical-kinematic-alignment-in-tkr" },
  ];

  const blogArticles = dynamicBlogs.length > 0
    ? dynamicBlogs.map(b => ({ title: b.title, path: b.slug ? `/blog/${b.slug}` : `/blog/${b.id}` }))
    : defaultBlogArticles;

  const backendLinks = [
    { name: "Django Admin Portal", url: `${API_BASE_URL}/admin/`, desc: "Manage services, blogs, team, and settings", badge: "ADMIN" },
    { name: "REST API Root", url: `${API_BASE_URL}/api/`, desc: "Live browsable API root endpoint", badge: "API" },
    { name: "Services Endpoint", url: `${API_BASE_URL}/api/services/`, desc: "JSON service catalogue data", badge: "API" },
    { name: "Blogs Endpoint", url: `${API_BASE_URL}/api/blogs/`, desc: "JSON medical blog articles", badge: "API" },
    { name: "Team Endpoint", url: `${API_BASE_URL}/api/team/`, desc: "JSON medical team listings", badge: "API" },
    { name: "Staff Management", url: `${API_BASE_URL}/api/staff/`, desc: "Staff profiles and tasks", badge: "API" },
    { name: "Duty Schedule API", url: `${API_BASE_URL}/api/duties/`, desc: "Duty shift schedules and on-call rosters", badge: "API" },
  ];

  // Filtered results for search
  const filterBySearch = (items) => {
    if (!searchTerm) return items;
    return items.filter(i => (i.name || i.title || '').toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const totalPages = mainPages.length + servicesList.length + blogArticles.length + backendLinks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-indigo-50/20 text-slate-800 font-sans">
      <SEO
        title="HTML Website Sitemap | CORx Healthcare Dubai"
        description="Browse the complete structure and pages of CORx Healthcare Dubai including all medical services, care guides, and official resources."
        canonical="https://corx.ae/sitemap"
      />

      {/* Hero Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-[#08709d] via-[#0369a1] to-[#1e40af] text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-400/5 blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sky-100 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
                <Globe className="w-3.5 h-3.5" />
                Complete Site Directory
              </div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3">
                CORx Site Map
              </h1>
              <p className="text-sky-100 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
                Complete overview of all pages, healthcare services, blog articles, and backend API endpoints for CORx Healthcare Dubai.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-center min-w-[90px]">
                <div className="text-3xl font-black">{totalPages}</div>
                <div className="text-xs text-sky-200 font-bold uppercase tracking-wide mt-1">Total Pages</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-center min-w-[90px]">
                <div className="text-3xl font-black">{servicesList.length}</div>
                <div className="text-xs text-sky-200 font-bold uppercase tracking-wide mt-1">Services</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-center min-w-[90px]">
                <div className="text-3xl font-black">{blogArticles.length}</div>
                <div className="text-xs text-sky-200 font-bold uppercase tracking-wide mt-1">Articles</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search pages, services, blog articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-800 placeholder-slate-400 rounded-2xl border-0 shadow-lg shadow-black/10 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Quick Jump Bar */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Jump to:</span>
            {[
              { label: 'Main Pages', icon: Home, href: '#main-pages' },
              { label: 'Services', icon: HeartPulse, href: '#services' },
              { label: 'Blog Articles', icon: BookOpen, href: '#blog' },
              { label: 'API & Backend', icon: Server, href: '#backend' },
            ].map((item, i) => (
              <a key={i} href={item.href} className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-slate-600 hover:text-[#08709d] bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 px-3 py-1.5 rounded-lg transition-all duration-150">
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </a>
            ))}
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 shrink-0 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all duration-150 ml-auto">
              <Zap className="w-3.5 h-3.5" />
              XML Sitemap
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Column 1: Main Pages */}
          <div id="main-pages" className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-transparent">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-[#08709d] text-white rounded-xl flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </span>
                Main Pages
              </h2>
              <span className="text-xs font-bold text-[#08709d] bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
                {filterBySearch(mainPages).length} pages
              </span>
            </div>
            <ul className="p-5 space-y-1.5">
              {filterBySearch(mainPages).map((page, idx) => (
                <li key={idx}>
                  <Link 
                    to={page.path}
                    className="group flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-[#08709d] transition-all py-2 px-3 rounded-xl hover:bg-sky-50 border border-transparent hover:border-sky-100"
                  >
                    <span className="flex items-center gap-2.5">
                      <page.icon className="w-4 h-4 text-slate-400 group-hover:text-[#08709d] transition-colors" />
                      {page.name}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-mono group-hover:text-[#08709d] transition-colors">
                      {page.path}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Backend & API Links */}
          <div id="backend" className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-transparent">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </span>
                Backend & API Links
              </h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                {backendLinks.length} endpoints
              </span>
            </div>
            <ul className="p-5 space-y-1.5">
              {backendLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2 px-3 rounded-xl hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all"
                  >
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                      </span>
                      <span className="text-xs text-slate-400 font-normal mt-0.5 truncate">{item.desc}</span>
                    </div>
                    <span className="shrink-0 ml-3 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Medical Services */}
          <div id="services" className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-transparent">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-rose-500 text-white rounded-xl flex items-center justify-center">
                  <HeartPulse className="w-4 h-4" />
                </span>
                Medical Services
              </h2>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full">
                {filterBySearch(servicesList).length} services
              </span>
            </div>
            <ul className="p-5 space-y-3">
              {filterBySearch(servicesList).map((service, idx) => (
                <li key={idx}>
                  <Link 
                    to={service.path}
                    className="group flex items-center justify-between text-sm font-bold text-slate-800 hover:text-rose-600 transition-colors py-1.5 px-3 rounded-xl hover:bg-rose-50/60 border border-transparent hover:border-rose-100"
                  >
                    <span>{service.name}</span>
                    <span className="text-xs text-slate-400 font-mono font-normal group-hover:text-rose-400">{service.path}</span>
                  </Link>
                  {service.subs && service.subs.length > 0 && (
                    <ul className="pl-4 border-l-2 border-rose-100 space-y-1 mt-1 ml-3">
                      {service.subs.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link 
                            to={sub.path}
                            className="text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1.5 py-0.5 px-2 rounded-lg hover:bg-rose-50/40"
                          >
                            <ChevronRight className="w-3 h-3 text-rose-300" />
                            {sub.name}
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
          <div id="blog" className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-transparent">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2.5">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-xl flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </span>
                Health Blog Articles
              </h2>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full">
                {filterBySearch(blogArticles.map(b => ({...b, name: b.title}))).length} articles
              </span>
            </div>
            <ul className="p-5 space-y-1.5 flex-1">
              {(searchTerm
                ? blogArticles.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
                : blogArticles
              ).map((article, idx) => (
                <li key={idx}>
                  <Link 
                    to={article.path}
                    className="group flex items-start gap-2.5 text-sm font-medium text-slate-700 hover:text-purple-700 transition-all py-2 px-3 rounded-xl hover:bg-purple-50/60 border border-transparent hover:border-purple-100"
                  >
                    <Activity className="w-4 h-4 text-purple-300 mt-0.5 shrink-0" />
                    <span className="leading-snug">{article.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* XML Sitemap Footer Card */}
            <div className="mx-5 mb-5 p-4 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-sm font-black mb-0.5 flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-300" />
                    XML Sitemap for Search Engines
                  </div>
                  <div className="text-xs text-indigo-200 font-medium">For Google, Bing & web crawlers</div>
                </div>
                <a 
                  href="/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-indigo-800 bg-white hover:bg-indigo-50 px-3.5 py-2 rounded-xl transition-colors"
                >
                  <span>/sitemap.xml</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom SEO Links row */}
        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">SEO & Technical Resources</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: '/robots.txt', href: '/robots.txt', desc: 'Crawler directives', icon: '🤖' },
              { label: '/sitemap.xml', href: '/sitemap.xml', desc: 'Search engine XML index', icon: '🗺️' },
              { label: '/sitemap', href: '/sitemap', desc: 'HTML sitemap (this page)', icon: '📋' },
              { label: '/privacy-policy', href: '/privacy-policy', desc: 'Privacy & data policy', icon: '🔒' },
            ].map((item, i) => (
              <a key={i} href={item.href} target={item.href.includes('.txt') || item.href.includes('.xml') ? '_blank' : '_self'} rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-50 border border-slate-200 hover:bg-sky-50 hover:border-sky-200 px-4 py-3 rounded-xl transition-all group">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="font-mono font-bold text-sm text-slate-800 group-hover:text-[#08709d] transition-colors">{item.label}</div>
                  <div className="text-xs text-slate-400 font-medium">{item.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sitemap;
