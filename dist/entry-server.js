import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Link, useNavigate, useParams, useLocation, Routes, Route, Navigate, StaticRouter } from "react-router";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Activity, Users, HeartPulse, Sparkles, Droplets, Clock, CheckCircle2, Stethoscope, HeartHandshake, TestTube, ArrowRight, Phone, Mail, X, Menu, Home as Home$1, FileText, Calendar, Globe, ChevronDown, ChevronRight, MessageSquare, Shield, MapPin, MessageCircle, Bot, Settings, UserCheck, User, Send, CalendarDays, ChevronLeft, HandHeart, ThumbsUp, Award, ShieldCheck, Heart, Eye, Compass, Target, Building2, Navigation, BookOpen, Tag, Check, PhoneCall, AlertCircle, LayoutDashboard, CornerDownRight, ListChecks, Layers, PenLine, Server, RefreshCw, TrendingUp, ArrowUpRight, Edit3, Plus, Filter, Search, Trash2, Sliders, EyeOff, Image, ArrowUp, ArrowDown, Hash, Link2, AlignLeft, Save } from "lucide-react";
const logo = "/assets/logo-u28QMOuL.webp";
const tollfree = "/assets/tollfree-3acubKEx.png";
const rawBaseUrl = "https://api.corx.ae";
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");
const Facebook$1 = ({ size = 20, className = "", style = {} }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, style, children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }) });
const Instagram$1 = ({ size = 20, className = "", style = {} }) => /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, style, children: [
  /* @__PURE__ */ jsx("rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }),
  /* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
  /* @__PURE__ */ jsx("line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" })
] });
const Linkedin = ({ size = 20, className = "", style = {} }) => /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, style, children: [
  /* @__PURE__ */ jsx("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
  /* @__PURE__ */ jsx("rect", { width: "4", height: "12", x: "2", y: "9" }),
  /* @__PURE__ */ jsx("circle", { cx: "4", cy: "4", r: "2" })
] });
const ICON_MAP = {
  Activity,
  Droplets,
  HeartPulse,
  Stethoscope,
  HeartHandshake,
  TestTube,
  Globe,
  Sparkles,
  CheckCircle2,
  Clock,
  Shield
};
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const renderIcon = (IconComp, size = 16, className = "") => {
    if (!IconComp) return /* @__PURE__ */ jsx(CheckCircle2, { size, className });
    if (React.isValidElement(IconComp)) return IconComp;
    if (typeof IconComp === "function" || typeof IconComp === "object" && IconComp.$$typeof) {
      const Comp = IconComp;
      return /* @__PURE__ */ jsx(Comp, { size, className });
    }
    return /* @__PURE__ */ jsx(CheckCircle2, { size, className });
  };
  const defaultServices = [
    {
      name: "Physiotherapy",
      path: "/physiotherapy-at-home-in-dubai/",
      icon: Activity,
      subtitle: "Rehabilitation & Pain Relief",
      badge: "Popular",
      accent: "#63e8a0",
      subItems: [
        { name: "Frozen Shoulder Therapy", path: "/frozen-shoulder-physiotherapy", desc: "Adhesive capsulitis & shoulder joint rehab", icon: Activity },
        { name: "Pediatric Physiotherapy", path: "/pediatric-physiotherapy-services-dubai", desc: "Childhood motor milestone & movement therapy", icon: Users },
        { name: "Joint Pain Treatment", path: "/joint-pain-treatment", desc: "Non-invasive arthritis & joint pain relief", icon: HeartPulse },
        { name: "Manual Therapy", path: "/manual-therapy", desc: "Hands-on soft tissue & joint mobilization", icon: Sparkles }
      ]
    },
    {
      name: "IV Therapy | IV Drip",
      path: "/iv-therapy",
      icon: Droplets,
      subtitle: "Vitamin Boost & Fast Hydration",
      badge: "Fast Acting",
      accent: "#38bdf8"
    },
    {
      name: "Home Nursing",
      path: "/home-nursing",
      icon: HeartPulse,
      subtitle: "Post-op & Specialized Care",
      accent: "#f43f5e",
      subItems: [
        { name: "Palliative Care", path: "/palliative-care", desc: "Compassionate long-term medical support", icon: HeartPulse },
        { name: "Night Care Nurse", path: "/night-care-nurse", desc: "24/7 Dedicated overnight monitoring", icon: Clock },
        { name: "Nurse for Injection", path: "/injection-at-home", desc: "Safe at-home IV & medication care", icon: CheckCircle2 },
        { name: "Wound Care Services", path: "/wound-care", desc: "Clinical dressing & wound management", icon: Activity },
        { name: "Oxygen Therapy", path: "/oxygen-therapy", desc: "Respiratory care & equipment at home", icon: Droplets }
      ]
    },
    {
      name: "Doctor On Call",
      path: "/doctor-on-call",
      icon: Stethoscope,
      subtitle: "24/7 Medical Home & Hotel Visits",
      accent: "#fbbf24",
      subItems: [
        { name: "Doctor at Home", path: "/doctor-at-home", desc: "Urgent home visits within 30-45 mins", icon: Stethoscope },
        { name: "Doctor at Office", path: "/doctor-at-office", desc: "Workplace consultations & checkups", icon: Activity },
        { name: "Doctor at Hotel", path: "/doctor-at-hotel", desc: "Hotel room medical visits for guests", icon: Sparkles }
      ]
    },
    {
      name: "Elderly Home Care",
      path: "/elderly-care",
      icon: HeartHandshake,
      subtitle: "Assisted Senior Living at Home",
      accent: "#a78bfa"
    },
    {
      name: "Lab Test at Home",
      path: "/lab-test-at-home",
      icon: TestTube,
      subtitle: "Quick In-Home Sample Collection",
      accent: "#34d399"
    }
  ];
  const [servicesDropdown, setServicesDropdown] = useState(defaultServices);
  const fetchServices = () => {
    fetch(`${API_BASE_URL}/api/services/`).then((res) => {
      if (!res.ok) return null;
      return res.json();
    }).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const parents = data.filter((s) => s.parent === null);
        const mapped = parents.map((s) => {
          const rawSlug = (s.slug || "").toLowerCase();
          rawSlug.includes("physio");
          const targetPath = `/${s.slug}`;
          return {
            id: s.id,
            name: s.name || s.title,
            path: targetPath,
            icon: ICON_MAP[s.icon] || Activity,
            subtitle: s.subtitle || s.tagline || "",
            badge: s.floating_badge && s.floating_badge.title ? s.floating_badge.title : "",
            accent: s.accent || s.theme_color || "#08709d",
            subItems: (s.sub_services || []).map((sub) => {
              return {
                id: sub.id,
                name: sub.name,
                path: `/${sub.slug}`,
                icon: ICON_MAP[sub.icon] || CheckCircle2,
                desc: sub.desc || ""
              };
            })
          };
        });
        const hasPhysio = mapped.some((m) => m.path && m.path.includes("physio") || m.name && m.name.toLowerCase().includes("physio"));
        if (!hasPhysio) {
          mapped.unshift(defaultServices[0]);
        }
        setServicesDropdown(mapped);
      }
    }).catch((err) => console.log("Django API offline/error, using static default services navbar:", err));
  };
  useEffect(() => {
    fetchServices();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleClickOutside = (e) => {
      if (!e.target.closest("nav")) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const locations = Array(10).fill("Trusted Home healthcare services in Dubai");
  const navLinks = [
    { name: "Home", path: "/", icon: Home$1, accent: "#08709d" },
    { name: "About us", path: "/about-us", icon: Users, accent: "#63b158" },
    { name: "Our Team", path: "/team", icon: Stethoscope, accent: "#38bdf8" },
    { name: "Blog", path: "/blog", icon: FileText, accent: "#a78bfa" },
    {
      name: "Services",
      path: "/services",
      icon: Activity,
      accent: "#2ebd6e",
      dropdown: servicesDropdown
    },
    { name: "Book Appointment", path: "/book-an-appointment", icon: Calendar, accent: "#f59e0b" },
    { name: "Contact us", path: "/book-an-appointment", icon: Phone, accent: "#08709d" },
    {
      name: "Language",
      path: "#",
      icon: Globe,
      accent: "#63b158",
      dropdown: [
        { name: "English", path: "#", code: "EN", flag: "🇬🇧" },
        { name: "Arabic", path: "#", code: "AR", flag: "🇦🇪" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "relative w-full z-50", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-[#63b158] text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/10", children: /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: { x: ["0%", "-50%"] },
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: 60
        },
        className: "flex items-center gap-12 text-[10px] md:text-[11px] font-bold tracking-wider shrink-0",
        children: [...locations, ...locations].map((loc, index) => /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-2 hover:text-accent-color transition-colors shrink-0 uppercase px-4", children: [
          loc,
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 12, className: "text-white/70" })
        ] }, index))
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white transition-all duration-300 border-b border-gray-100 py-0 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "container flex justify-between items-center h-20 md:h-28", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center h-full ml-2", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
          animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
          transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
          whileHover: {
            scale: 1.05,
            rotate: [0, -1, 1, -1, 0],
            transition: { duration: 0.3 }
          },
          className: "relative group h-full flex items-center",
          children: [
            /* @__PURE__ */ jsx("img", { src: logo, alt: "CORx Healthcare - 24/7 Home Healthcare Dubai", className: "h-[80%] md:h-[90%] w-auto object-contain relative z-10" }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { x: "-100%", opacity: 0 },
                animate: { x: "200%", opacity: [0, 0.5, 0] },
                transition: { repeat: Infinity, duration: 2.5, repeatDelay: 4, ease: "easeInOut" },
                className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] z-20 pointer-events-none"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary-color/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:block text-center flex-1 px-8", children: [
        /* @__PURE__ */ jsx(motion.div, { initial: "hidden", animate: "visible", className: "flex justify-center flex-wrap gap-x-1.5 gap-y-0", children: "24/7 PREMIUM HOME HEALTHCARE SERVICES IN DUBAI".split(" ").map((word, i) => /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden py-0.5 px-0", children: /* @__PURE__ */ jsx(
          motion.span,
          {
            variants: {
              hidden: { y: "110%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: i * 0.1 } }
            },
            whileHover: { y: -3, transition: { duration: 0.2 } },
            className: "inline-block font-['Montserrat'] font-black uppercase tracking-[0.05em] transition-colors duration-300 cursor-default",
            style: { color: "#2596be", fontSize: "11px" },
            children: word
          }
        ) }, i)) }),
        /* @__PURE__ */ jsx("div", { className: "relative h-[2px] w-32 mx-auto mt-1 overflow-hidden rounded-full bg-gray-100", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { x: "-100%" },
            animate: { x: "100%" },
            transition: { repeat: Infinity, duration: 2, ease: "linear" },
            className: "absolute inset-0 bg-gradient-to-r from-transparent via-[#2596be]/50 to-transparent"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 text-[#63b158] mr-2 sm:mr-4 md:mr-8", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:8002679",
            className: "md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#63b158] text-white text-[11px] font-extrabold uppercase shadow-sm tracking-wide shrink-0",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 13, fill: "currentColor" }),
              /* @__PURE__ */ jsx("span", { children: "800 2679" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/corxhealthcare", target: "_blank", rel: "noopener noreferrer", className: "hover:text-accent-color transition-all hover:-translate-y-0.5", children: /* @__PURE__ */ jsx(Facebook$1, { size: 20, style: { color: "#63b158" } }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/corx_healthcare", target: "_blank", rel: "noopener noreferrer", className: "hover:text-accent-color transition-all hover:-translate-y-0.5", children: /* @__PURE__ */ jsx(Instagram$1, { size: 20, style: { color: "#63b158" } }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/company/corx-healthcare/", target: "_blank", rel: "noopener noreferrer", className: "hover:text-accent-color transition-all hover:-translate-y-0.5", children: /* @__PURE__ */ jsx(Linkedin, { size: 20, style: { color: "#63b158" } }) }),
          /* @__PURE__ */ jsx("div", { className: "h-8 w-[1px] bg-gray-200 mx-1" }),
          /* @__PURE__ */ jsxs("a", { href: "mailto:info@corx.ae", className: "flex items-center gap-2 hover:text-accent-color transition-colors font-bold text-sm tracking-wide", style: { color: "#63b158" }, children: [
            /* @__PURE__ */ jsx(Mail, { size: 18, style: { color: "#63b158" } }),
            " info@corx.ae"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-8 w-[1px] bg-gray-200 ml-5 mr-2" }),
          /* @__PURE__ */ jsx(
            motion.a,
            {
              href: "tel:8002679",
              animate: {
                scale: [1, 1.04, 1],
                rotate: [0, -2, 2, -2, 2, 0],
                filter: [
                  "drop-shadow(0 2px 4px rgba(99, 177, 88, 0.15))",
                  "drop-shadow(0 4px 12px rgba(99, 177, 88, 0.45))",
                  "drop-shadow(0 2px 4px rgba(99, 177, 88, 0.15))"
                ]
              },
              transition: {
                scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 1.5, repeatDelay: 3.5, ease: "easeInOut" },
                filter: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              },
              className: "block ml-2 cursor-pointer",
              children: /* @__PURE__ */ jsx("img", { src: tollfree, alt: "CORx Healthcare 24/7 Toll Free Helpline", className: "h-12 md:h-16 w-auto object-contain" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { className: "lg:hidden p-2 text-secondary-color", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 32 }) : /* @__PURE__ */ jsx(Menu, { size: 32 }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("nav", { className: "hidden lg:block bg-gradient-to-r from-[#065b80] via-[#08709d] to-[#0a86bd] text-white border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "container flex justify-between items-center py-0", children: [
      /* @__PURE__ */ jsx("ul", { className: "flex items-center gap-2.5 h-16", children: navLinks.map((link) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "relative h-full",
          onMouseEnter: () => {
            if (link.dropdown) setActiveDropdown(link.name);
          },
          onMouseLeave: () => {
            if (link.dropdown) {
              setActiveDropdown(null);
              setOpenSubMenu(null);
            }
          },
          children: [
            link.dropdown ? /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === link.name ? null : link.name);
                },
                className: "group flex items-center h-full px-2.5 lg:px-3 xl:px-3.5 text-[15px] font-bold uppercase tracking-[0.05em] text-white hover:text-white/90 transition-all gap-1.5 whitespace-nowrap relative cursor-pointer",
                children: /* @__PURE__ */ jsxs("span", { className: "relative py-1 flex items-center gap-1.5", children: [
                  link.name,
                  /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: `transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180 text-emerald-300" : "text-white/70 group-hover:text-white"}` }),
                  /* @__PURE__ */ jsx("span", { className: `absolute bottom-0 left-[-4px] w-[calc(100%+8px)] h-[3px] bg-accent-color transform rounded-t-full transition-transform duration-300 origin-left ${activeDropdown === link.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}` })
                ] })
              }
            ) : /* @__PURE__ */ jsx(
              Link,
              {
                to: link.path,
                className: "group flex items-center h-full px-2.5 lg:px-3 xl:px-3.5 text-[15px] font-bold uppercase tracking-[0.05em] text-white hover:text-white/90 transition-all gap-1.5 whitespace-nowrap relative",
                children: /* @__PURE__ */ jsxs("span", { className: "relative py-1", children: [
                  link.name,
                  /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-[-4px] w-[calc(100%+8px)] h-[3px] bg-accent-color transform rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" })
                ] })
              }
            ),
            link.dropdown && link.name === "Services" && /* @__PURE__ */ jsx(AnimatePresence, { children: activeDropdown === "Services" && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12, scale: 0.98 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } },
                transition: { duration: 0.22, ease: "easeOut" },
                className: "absolute top-[calc(100%+8px)] left-0 z-[100] bg-[#0c361d] rounded-[24px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] text-white",
                style: { padding: "24px", width: "360px" },
                children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 w-full", children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: "/services",
                      onClick: () => setActiveDropdown(null),
                      className: "flex items-center justify-between w-full rounded-[18px] transition-all duration-200 text-[14px] font-black uppercase tracking-wider text-emerald-300 hover:text-white bg-white/12 hover:bg-white/20 py-3 px-6 mb-1 border border-emerald-400/20",
                      children: [
                        /* @__PURE__ */ jsx("span", { children: "All Services Overview" }),
                        /* @__PURE__ */ jsx(ArrowRight, { size: 15 })
                      ]
                    }
                  ),
                  link.dropdown.map((item) => {
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isSubOpen = openSubMenu === item.name;
                    return /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "relative group/sub w-full",
                        onMouseEnter: () => {
                          if (hasSubItems) setOpenSubMenu(item.name);
                        },
                        onMouseLeave: () => {
                          if (hasSubItems) setOpenSubMenu(null);
                        },
                        children: [
                          hasSubItems ? /* @__PURE__ */ jsxs(
                            Link,
                            {
                              to: item.path,
                              onClick: () => {
                                setActiveDropdown(null);
                                setOpenSubMenu(null);
                              },
                              className: `flex items-center justify-between w-full rounded-[18px] transition-all duration-200 cursor-pointer text-[14px] font-semibold tracking-wide text-white/95 hover:text-white py-2 px-6 ${isSubOpen ? "bg-white/12 shadow-sm" : "hover:bg-white/10"}`,
                              children: [
                                /* @__PURE__ */ jsx("span", { children: item.name }),
                                /* @__PURE__ */ jsx(ChevronRight, { size: 15, className: `transition-all duration-200 ${isSubOpen ? "translate-x-1 text-emerald-300 opacity-100" : "text-white/60 group-hover/sub:text-white group-hover/sub:translate-x-0.5"}` })
                              ]
                            }
                          ) : /* @__PURE__ */ jsx(
                            Link,
                            {
                              to: item.path,
                              onClick: () => setActiveDropdown(null),
                              className: "flex items-center justify-between w-full rounded-[18px] transition-all duration-200 text-[14px] font-semibold tracking-wide text-white/95 hover:text-white hover:bg-white/10 py-2 px-6",
                              children: /* @__PURE__ */ jsx("span", { children: item.name })
                            }
                          ),
                          hasSubItems && isSubOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
                            /* @__PURE__ */ jsx("div", { className: "absolute top-0 h-full z-[109]", style: { left: "100%", width: "14px" } }),
                            /* @__PURE__ */ jsx(
                              motion.div,
                              {
                                initial: { opacity: 0, x: 10 },
                                animate: { opacity: 1, x: 0 },
                                exit: { opacity: 0, x: 10 },
                                transition: { duration: 0.18 },
                                className: "absolute top-0 left-full ml-3 bg-[#0c361d] rounded-[24px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] text-white z-[110]",
                                style: { padding: "24px", width: "310px" },
                                children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 w-full", children: [
                                  /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                      to: item.path,
                                      onClick: () => {
                                        setActiveDropdown(null);
                                        setOpenSubMenu(null);
                                      },
                                      className: "flex items-center w-full rounded-[16px] hover:bg-white/10 transition-all duration-200 text-[13px] font-bold text-emerald-300 uppercase tracking-wider py-2.5 px-4 mb-1 border-b border-white/10",
                                      children: /* @__PURE__ */ jsxs("span", { children: [
                                        "View All ",
                                        item.name
                                      ] })
                                    }
                                  ),
                                  item.subItems.map((sub) => /* @__PURE__ */ jsx(
                                    Link,
                                    {
                                      to: sub.path,
                                      onClick: () => {
                                        setActiveDropdown(null);
                                        setOpenSubMenu(null);
                                      },
                                      className: "flex items-center w-full rounded-[16px] hover:bg-white/10 hover:translate-x-1 transition-all duration-200 text-[13px] font-semibold text-white/90 hover:text-white py-2 px-4",
                                      children: /* @__PURE__ */ jsx("span", { children: sub.name })
                                    },
                                    sub.name
                                  ))
                                ] })
                              }
                            )
                          ] })
                        ]
                      },
                      item.name
                    );
                  })
                ] })
              }
            ) }),
            link.dropdown && link.name === "Language" && /* @__PURE__ */ jsx(AnimatePresence, { children: activeDropdown === "Language" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.15 } },
                transition: { duration: 0.2, ease: "easeOut" },
                className: "absolute top-[calc(100%+8px)] right-0 z-[100] bg-[#0c361d] rounded-[24px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] text-white",
                style: { padding: "24px", width: "200px" },
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#63e8a0] border-b border-white/10 mb-1 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(Globe, { size: 13 }),
                    " Select Language"
                  ] }),
                  link.dropdown.map((lang) => /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: "#",
                      onClick: (e) => {
                        e.preventDefault();
                        setActiveDropdown(null);
                      },
                      className: "flex items-center justify-between w-full rounded-[18px] transition-all duration-200 text-[15.5px] font-semibold tracking-wide text-white/95 hover:text-white hover:bg-white/10 py-3.5 px-6",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-base", children: lang.flag }),
                          /* @__PURE__ */ jsx("span", { children: lang.name })
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/70 uppercase", children: lang.code })
                      ]
                    },
                    lang.name
                  ))
                ]
              }
            ) })
          ]
        },
        link.name
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-8 h-16", children: /* @__PURE__ */ jsxs(
        motion.a,
        {
          href: "tel:+971547033311",
          whileHover: { scale: 1.08 },
          whileTap: { scale: 0.95 },
          animate: { scale: [1, 1.03, 1] },
          transition: { scale: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
          className: "flex items-center gap-2.5 font-bold text-[13px] uppercase tracking-widest text-white hover:text-accent-color transition-all group",
          children: [
            /* @__PURE__ */ jsx(
              motion.span,
              {
                animate: { rotate: [0, -15, 15, -15, 15, 0] },
                transition: { repeat: Infinity, duration: 1.2, repeatDelay: 3 },
                className: "flex items-center",
                children: /* @__PURE__ */ jsx(Phone, { size: 16, fill: "currentColor" })
              }
            ),
            "CALL NOW"
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setIsMobileMenuOpen(false),
          className: "fixed inset-0 bg-[#050b14]/75 backdrop-blur-md z-[120] lg:hidden"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
          transition: { type: "spring", damping: 25, stiffness: 220 },
          className: "fixed top-0 right-0 bottom-0 w-[88%] max-w-sm bg-white z-[130] lg:hidden shadow-2xl flex flex-col justify-between overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-xs", children: [
              /* @__PURE__ */ jsx("img", { src: logo, alt: "CORx Healthcare Navigation Logo", className: "h-12 w-auto object-contain" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsMobileMenuOpen(false),
                  className: "p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer",
                  "aria-label": "Close Mobile Menu",
                  children: /* @__PURE__ */ jsx(X, { size: 20 })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-5 space-y-2.5", children: navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isOpen = openDropdown === link.name;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-[#08709d]/30 bg-slate-50/90 shadow-sm" : "border-slate-100 bg-slate-50/40 hover:bg-slate-50"}`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 sm:p-3.5", children: [
                      /* @__PURE__ */ jsxs(
                        Link,
                        {
                          to: link.path,
                          className: "flex items-center gap-3 text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wider hover:text-[#08709d] transition-colors flex-grow",
                          onClick: () => setIsMobileMenuOpen(false),
                          children: [
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-xs",
                                style: {
                                  backgroundColor: `${link.accent}15`,
                                  borderColor: `${link.accent}30`,
                                  color: link.accent
                                },
                                children: /* @__PURE__ */ jsx(LinkIcon, { size: 18 })
                              }
                            ),
                            /* @__PURE__ */ jsx("span", { children: link.name })
                          ]
                        }
                      ),
                      link.dropdown && /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setOpenDropdown(isOpen ? null : link.name),
                          className: "p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors cursor-pointer",
                          "aria-label": `Toggle ${link.name} Submenu`,
                          children: /* @__PURE__ */ jsx(ChevronDown, { size: 18, className: `transition-transform duration-300 ${isOpen ? "rotate-180 text-[#08709d]" : ""}` })
                        }
                      )
                    ] }),
                    link.dropdown && isOpen && /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { height: 0, opacity: 0 },
                        animate: { height: "auto", opacity: 1 },
                        exit: { height: 0, opacity: 0 },
                        className: "bg-white border-t border-slate-100 p-3 space-y-2",
                        children: link.dropdown.map((sub) => {
                          return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxs(
                              Link,
                              {
                                to: sub.path,
                                className: "flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#08709d] hover:bg-slate-50 transition-all",
                                onClick: () => setIsMobileMenuOpen(false),
                                children: [
                                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                                    sub.flag ? /* @__PURE__ */ jsx("span", { className: "text-base", children: sub.flag }) : renderIcon(sub.icon, 16, "text-[#63b158]"),
                                    /* @__PURE__ */ jsx("span", { children: sub.name })
                                  ] }),
                                  sub.badge && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200 text-[10px] font-mono font-bold uppercase", children: sub.badge }),
                                  sub.code && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase", children: sub.code })
                                ]
                              }
                            ),
                            sub.subItems && /* @__PURE__ */ jsx("div", { className: "pl-8 pr-2 py-1 space-y-1 border-l-2 border-slate-100 ml-4", children: sub.subItems.map((c) => /* @__PURE__ */ jsxs(
                              Link,
                              {
                                to: c.path,
                                className: "text-[12px] font-semibold text-slate-500 hover:text-[#08709d] block py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors",
                                onClick: () => setIsMobileMenuOpen(false),
                                children: [
                                  "• ",
                                  c.name
                                ]
                              },
                              c.name
                            )) })
                          ] }, sub.name);
                        })
                      }
                    )
                  ]
                },
                link.name
              );
            }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 bg-white border-t border-slate-100 space-y-2.5 sticky bottom-0 z-20 shadow-[0_-10px_25px_rgba(0,0,0,0.05)]", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:8002679",
                  className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#63b158] to-[#4fa044] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all",
                  onClick: () => setIsMobileMenuOpen(false),
                  children: [
                    /* @__PURE__ */ jsx(Phone, { size: 15, fill: "currentColor" }),
                    /* @__PURE__ */ jsx("span", { children: "Call 24/7 Toll Free: 800 2679" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://wa.me/971547033311",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#08709d] to-[#065679] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all",
                  onClick: () => setIsMobileMenuOpen(false),
                  children: [
                    /* @__PURE__ */ jsx(MessageSquare, { size: 15 }),
                    /* @__PURE__ */ jsx("span", { children: "WhatsApp: +971 54 703 3311" })
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) })
  ] });
};
const Facebook = ({ size = 20, className = "", style = {} }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, style, children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }) });
const Instagram = ({ size = 20, className = "", style = {} }) => /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, style, children: [
  /* @__PURE__ */ jsx("rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }),
  /* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
  /* @__PURE__ */ jsx("line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" })
] });
const Twitter = ({ size = 20, className = "", style = {} }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, style, children: /* @__PURE__ */ jsx("path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" }) });
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };
  return /* @__PURE__ */ jsxs("footer", { className: "relative bg-[#0d1527] text-white font-sans pt-20 pb-10 border-t border-white/5", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.05]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#08709d] blur-[120px] -translate-y-1/2 translate-x-1/3" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#2ebd6e] blur-[120px] translate-y-1/3 -translate-x-1/4" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container relative z-10 mx-auto px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          variants: containerVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-50px" },
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16",
          children: [
            /* @__PURE__ */ jsxs(motion.div, { variants: itemVariants, className: "flex flex-col gap-6", children: [
              /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block relative group w-fit", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: logo,
                  alt: "CORX Healthcare Logo",
                  className: "h-14 w-auto object-contain rounded-xl bg-white px-3.5 py-2 shadow-md hover:scale-[1.02] transition-transform duration-300"
                }
              ) }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm leading-relaxed font-medium", children: "Corx Healthcare provides premium home care services in Dubai, available 24×7 to meet your medical needs. Experience hassle-free, high-quality clinical care at your doorstep." }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mt-2", children: [
                { icon: /* @__PURE__ */ jsx(Facebook, { size: 18 }), href: "#facebook", label: "Facebook" },
                { icon: /* @__PURE__ */ jsx(Twitter, { size: 18 }), href: "#twitter", label: "Twitter" },
                { icon: /* @__PURE__ */ jsx(Instagram, { size: 18 }), href: "#instagram", label: "Instagram" }
              ].map((social, index) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: social.href,
                  className: "w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#2ebd6e] hover:border-[#2ebd6e] transition-all duration-300",
                  "aria-label": social.label,
                  children: social.icon
                },
                index
              )) })
            ] }),
            /* @__PURE__ */ jsxs(motion.div, { variants: itemVariants, children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-slate-100 font-bold uppercase tracking-wider text-sm mb-6 pb-2.5 border-b border-white/10 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "Quick Links" }),
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#2ebd6e]" })
              ] }),
              /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0 }, className: "flex flex-col gap-3.5", children: [
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "Our Team", path: "/team" },
                { name: "Contact Us", path: "/book-an-appointment" },
                { name: "Services Dashboard", path: "/dashboard" }
              ].map((link, index) => /* @__PURE__ */ jsx("li", { style: { listStyleType: "none", padding: 0, margin: 0 }, children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: link.path,
                  className: "text-slate-300 hover:text-[#2ebd6e] text-sm font-medium flex items-center gap-2 group transition-colors duration-300 w-fit",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#2ebd6e] group-hover:scale-125 transition-all duration-300" }),
                    /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1.5 transition-transform duration-300 block", children: link.name })
                  ]
                }
              ) }, index)) })
            ] }),
            /* @__PURE__ */ jsxs(motion.div, { variants: itemVariants, children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-slate-100 font-bold uppercase tracking-wider text-sm mb-6 pb-2.5 border-b border-white/10 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "Our Services" }),
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#2ebd6e]" })
              ] }),
              /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0 }, className: "flex flex-col gap-3.5", children: [
                { name: "Physiotherapy", path: "/physiotherapy-at-home-in-dubai/" },
                { name: "IV Therapy at Home", path: "/iv-therapy" },
                { name: "Home Nursing", path: "/home-nursing" },
                { name: "Doctor On Call", path: "/doctor-on-call" },
                { name: "Elderly Home Care", path: "/elderly-care" },
                { name: "Lab Test At Home", path: "/lab-test-at-home" }
              ].map((link, index) => /* @__PURE__ */ jsx("li", { style: { listStyleType: "none", padding: 0, margin: 0 }, children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: link.path,
                  className: "text-slate-300 hover:text-[#2ebd6e] text-sm font-medium flex items-center gap-2 group transition-colors duration-300 w-fit",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#2ebd6e] group-hover:scale-125 transition-all duration-300" }),
                    /* @__PURE__ */ jsx("span", { className: "group-hover:translate-x-1.5 transition-transform duration-300 block", children: link.name })
                  ]
                }
              ) }, index)) })
            ] }),
            /* @__PURE__ */ jsxs(motion.div, { variants: itemVariants, className: "flex flex-col gap-6", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-slate-100 font-bold uppercase tracking-wider text-sm mb-1 pb-2.5 border-b border-white/10 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "Contact Us" }),
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#08709d]" })
              ] }),
              /* @__PURE__ */ jsxs("ul", { style: { listStyle: "none", padding: 0, margin: 0 }, className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxs("li", { style: { listStyleType: "none" }, className: "flex items-start gap-3 text-slate-300 text-sm font-medium leading-relaxed", children: [
                  /* @__PURE__ */ jsx(MapPin, { size: 18, className: "text-[#2ebd6e] shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Office 303, Royal Class Building,",
                    /* @__PURE__ */ jsx("br", {}),
                    "Dubai Investment Park 1st,",
                    /* @__PURE__ */ jsx("br", {}),
                    "Dubai - UAE"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { style: { listStyleType: "none" }, className: "flex items-start gap-3 text-slate-300 text-sm font-medium", children: [
                  /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-[#2ebd6e] shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsx("a", { href: "tel:+97143320776", className: "hover:text-[#2ebd6e] transition-colors duration-200", children: "Landline: +971 4 332 0776" }),
                    /* @__PURE__ */ jsx("a", { href: "tel:+971547033311", className: "hover:text-[#2ebd6e] transition-colors duration-200", children: "24/7 Mobile: +971 54 703 3311" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { style: { listStyleType: "none" }, className: "flex items-start gap-3 text-slate-300 text-sm font-medium", children: [
                  /* @__PURE__ */ jsx(Mail, { size: 18, className: "text-[#2ebd6e] shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsx("a", { href: "mailto:info@corx.ae", className: "hover:text-[#2ebd6e] transition-colors duration-200", children: "info@corx.ae" })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { delay: 0.5, duration: 0.6 },
          className: "border-t border-white/5 pt-8 text-center text-xs font-semibold text-slate-400",
          children: /* @__PURE__ */ jsxs("p", { children: [
            "© ",
            currentYear,
            " CORX Healthcare. All Rights Reserved."
          ] })
        }
      )
    ] })
  ] });
};
const FloatingCTA = () => {
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      onClick: () => {
        window.dispatchEvent(new CustomEvent("toggle-chatbot"));
      },
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      whileHover: { scale: 1.05, y: -2 },
      whileTap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 300, damping: 25 },
      className: "fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-full cursor-pointer focus:outline-none chat-with-us-btn",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(MessageCircle, { size: 22, className: "text-white fill-white" }),
          /* @__PURE__ */ jsxs("span", { className: "absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5", children: [
            /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "select-none", children: "Chat with us" })
      ]
    }
  );
};
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromoBubble, setShowPromoBubble] = useState(false);
  const [agentType, setAgentType] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [bookingState, setBookingState] = useState({
    active: false,
    step: 0,
    // 0: service, 1: name, 2: phone, 3: date, 4: confirm
    data: {
      service: "",
      name: "",
      phone: "",
      date: ""
    }
  });
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, bookingState.step]);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPromoBubble(true);
      }
    }, 3e3);
    return () => clearTimeout(timer);
  }, [isOpen]);
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => {
        const next = !prev;
        if (next) {
          setShowPromoBubble(false);
        }
        return next;
      });
    };
    window.addEventListener("toggle-chatbot", handleToggle);
    return () => window.removeEventListener("toggle-chatbot", handleToggle);
  }, []);
  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowPromoBubble(false);
    }
  };
  const AGENT_CFG = {
    doctor: {
      name: "Dr. Aisha (DHA GP)",
      role: "General Physician",
      avatar: "🩺",
      color: "#08709d",
      greeting: "Hello! I am Dr. Aisha, your virtual general physician. How can I help you with your symptoms, medication guidance, or clinical consultation queries today?",
      placeholder: "Describe your symptoms (e.g. fever, flu, pain)..."
    },
    nurse: {
      name: "Nurse Clara (DHA)",
      role: "Home Care Nurse",
      avatar: "💧",
      color: "#0ea5e9",
      greeting: "Hi! I am Nurse Clara. How can I assist you with scheduling an IV drip, a blood/lab test, post-surgical care, wound dressing, or home nursing services?",
      placeholder: "Ask about IV drips, blood tests, or nursing..."
    },
    coordinator: {
      name: "Sarah (Coordinator)",
      role: "Booking Coordinator",
      avatar: "📅",
      color: "#10b981",
      greeting: "Hello! I am Sarah, your medical booking coordinator. I can check service pricing, find appointment slots, or help you book a service directly. What can I book for you today?",
      placeholder: "Ask about prices, bookings, hours, address..."
    }
  };
  const selectAgent = (type) => {
    setAgentType(type);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: Date.now(),
          sender: "bot",
          text: AGENT_CFG[type].greeting,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    }, 800);
  };
  const handleSwitchAgent = () => {
    setAgentType(null);
    setMessages([]);
    setBookingState({
      active: false,
      step: 0,
      data: { service: "", name: "", phone: "", date: "" }
    });
  };
  const addBotMessage = (text, delay = 1e3) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    }, delay);
  };
  const getAgentResponse = (text, type) => {
    const lower = text.toLowerCase();
    if (lower.includes("switch") || lower.includes("change") || lower.includes("another agent")) {
      return "You can switch assistant types at any time by clicking the 'Change Agent' button at the top right of the header.";
    }
    if (lower.includes("phone") || lower.includes("whatsapp") || lower.includes("contact") || lower.includes("call") || lower.includes("number")) {
      return "You can reach our emergency coordinator 24/7 at:\n☎️ +971 4 332 0776 (Landline)\n📱 +971 54 703 3311 (Mobile)\n📱 +971 50 278 5990 (Mobile)\n\nOr WhatsApp us directly at https://wa.me/97143320776 for instant bookings and immediate dispatch.";
    }
    if (type === "doctor") {
      if (lower.includes("fever") || lower.includes("flu") || lower.includes("cough") || lower.includes("pain") || lower.includes("vomit") || lower.includes("sick")) {
        return "As a general physician, I recommend scheduling a GP Home Visit so we can evaluate your vitals, perform a diagnosis, and prepare a treatment plan. Our DHA-licensed home visit doctors can be at your location in Dubai within 30-45 minutes. Would you like me to connect you to our booking coordinator?";
      }
      if (lower.includes("prescription") || lower.includes("medicine") || lower.includes("certificate") || lower.includes("sick leave")) {
        return "Yes, our visiting doctors are fully licensed by the DHA and are authorized to prescribe necessary medicines and issue official sick leave certificates directly on site during your home consultation.";
      }
      if (lower.includes("iv") || lower.includes("drip") || lower.includes("vitamin") || lower.includes("lab") || lower.includes("blood")) {
        return "For home IV therapies, blood collections, or wound care procedures, my colleague Nurse Clara can assist you best. Would you like to switch to our nursing chat?";
      }
      return "I can help you evaluate symptoms, explain GP home consultation services, and guide you on clinical concerns. For direct bookings or prices, feel free to switch to our Booking Coordinator Sarah.";
    }
    if (type === "nurse") {
      if (lower.includes("iv") || lower.includes("drip") || lower.includes("vitamin") || lower.includes("hydration") || lower.includes("nad")) {
        return "Our DHA-licensed nurses provide premium IV Drip Therapy at your home, office, or hotel. We offer Hydration, Vitamin C, NAD+, Detox, and Immunity Boost starting from 250 AED. Would you like to schedule an IV drip session?";
      }
      if (lower.includes("blood") || lower.includes("lab") || lower.includes("test") || lower.includes("pcr")) {
        return "We provide full home diagnostic services. A nurse will visit your location to collect blood or urine samples. Certified lab reports are delivered digitally via email/WhatsApp within 12-24 hours. Would you like to book a blood test?";
      }
      if (lower.includes("wound") || lower.includes("injection") || lower.includes("dressing") || lower.includes("suture")) {
        return "Our nurses are highly skilled in wound care, post-surgical dressing, injection administration, and regular home nursing. We can arrange visits as per your requirements.";
      }
      if (lower.includes("doctor") || lower.includes("symptom") || lower.includes("diagnose")) {
        return "For clinical diagnoses, medical evaluations, and prescriptions, Dr. Aisha can consult you directly. Would you like to switch to the doctor chat?";
      }
      return "I can assist you with IV drips, home nursing, and blood test bookings. For general pricing and administrative details, you can chat with our Coordinator Sarah.";
    }
    if (type === "coordinator") {
      if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule") || lower.includes("reserve")) {
        startBooking();
        return "Let us get you booked! Please select the service you require:";
      }
      if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("rates")) {
        return "Our service charges are highly transparent: IV Drips start from 250 AED, Lab tests from 150 AED, and Doctor Home visits start from 299 AED. All services include DHA-certified clinical staff. We accept cash, cards, and provide invoice receipts for insurance claims.";
      }
      if (lower.includes("address") || lower.includes("location") || lower.includes("office") || lower.includes("where")) {
        return "Our head office is located at Office 303, Royal Class Building, DIP, Dubai, United Arab Emirates. However, our medical teams (doctors and nurses) are distributed throughout Dubai and travel directly to your location.";
      }
      if (lower.includes("time") || lower.includes("hours") || lower.includes("open") || lower.includes("sunday")) {
        return "Our home visit services (Doctors, Nurses, IV, Labs) are available 24/7, 365 days a year. Our admin office operates Monday to Saturday from 8:00 AM to 5:00 PM.";
      }
      return "I can assist you with scheduling bookings, prices, and locations. For symptom queries, you can switch to Dr. Aisha.";
    }
    return "Thank you. How can I assist you today? You can switch assistant types at any time using the button in the header.";
  };
  const startBooking = () => {
    setBookingState({
      active: true,
      step: 0,
      data: { service: "", name: "", phone: "", date: "" }
    });
  };
  const handleBookingServiceSelect = (serviceName) => {
    setBookingState((prev) => ({
      ...prev,
      step: 1,
      data: { ...prev.data, service: serviceName }
    }));
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: `Selected: ${serviceName}`,
        timestamp: /* @__PURE__ */ new Date()
      },
      {
        id: Date.now() + 1,
        sender: "bot",
        text: "Great choice. What is your Full Name?",
        timestamp: /* @__PURE__ */ new Date()
      }
    ]);
  };
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const userText = inputText;
    setInputText("");
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userText,
        timestamp: /* @__PURE__ */ new Date()
      }
    ]);
    if (bookingState.active) {
      if (bookingState.step === 1) {
        setBookingState((prev) => ({
          ...prev,
          step: 2,
          data: { ...prev.data, name: userText }
        }));
        addBotMessage(`Thank you, ${userText}. What is your contact phone number?`);
      } else if (bookingState.step === 2) {
        setBookingState((prev) => ({
          ...prev,
          step: 3,
          data: { ...prev.data, phone: userText }
        }));
        addBotMessage(`Perfect. What is your preferred date and time for the appointment? (e.g., Tomorrow at 10 AM)`);
      } else if (bookingState.step === 3) {
        const updatedData = { ...bookingState.data, date: userText };
        setBookingState((prev) => ({
          ...prev,
          step: 4,
          data: updatedData
        }));
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: "bot",
              text: "Please review and confirm your appointment details:",
              timestamp: /* @__PURE__ */ new Date(),
              isConfirmation: true,
              confirmData: updatedData
            }
          ]);
        }, 800);
      }
    } else {
      const reply = getAgentResponse(userText, agentType);
      addBotMessage(reply);
    }
  };
  const confirmBooking = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setBookingState((prev) => ({
        ...prev,
        step: 5
        // Completed step
      }));
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          text: `Booking Request Confirmed! 🎉

We have received your request for ${bookingState.data.service}. Our medical coordinator will call you back on ${bookingState.data.phone} within 15 minutes to finalize the schedule and dispatch the team. Thank you!`,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    }, 1500);
  };
  const cancelBooking = () => {
    setBookingState({
      active: false,
      step: 0,
      data: { service: "", name: "", phone: "", date: "" }
    });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "bot",
        text: "No problem! The booking request has been cancelled. What else can I help you with?",
        timestamp: /* @__PURE__ */ new Date()
      }
    ]);
  };
  const isMobile = windowWidth < 640;
  const styles2 = {
    promoBubble: {
      position: "fixed",
      bottom: "24px",
      right: "90px",
      zIndex: 100,
      backgroundColor: "#08709d",
      color: "white",
      padding: "10px 16px",
      borderRadius: "16px 16px 2px 16px",
      boxShadow: "0 10px 25px rgba(8, 112, 157, 0.25)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "12px",
      fontWeight: "600",
      maxWidth: "220px",
      cursor: "pointer",
      fontFamily: "'Poppins', sans-serif",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    chatWindow: {
      position: "fixed",
      bottom: isMobile ? "88px" : "96px",
      right: isMobile ? "20px" : "32px",
      zIndex: 1e3,
      width: isMobile ? "calc(100vw - 40px)" : "380px",
      height: isMobile ? "70vh" : "520px",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(12px)",
      borderRadius: "24px",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      boxShadow: "0 20px 45px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.06)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Poppins', 'Montserrat', sans-serif"
    },
    header: {
      background: agentType ? `linear-gradient(135deg, ${AGENT_CFG[agentType].color} 0%, #0d92cc 100%)` : "linear-gradient(135deg, #08709d 0%, #0d92cc 100%)",
      padding: "16px",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 10px rgba(8, 112, 157, 0.12)",
      transition: "background 0.3s ease"
    },
    avatarContainer: {
      position: "relative",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid rgba(255, 255, 255, 0.25)",
      fontSize: "20px"
    },
    onlineDot: {
      position: "absolute",
      bottom: "0",
      right: "0",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "#4ade80",
      border: "2px solid #08709d"
    },
    headerTitle: {
      fontSize: "14px",
      fontWeight: "700",
      margin: "0 0 2px 0",
      color: "white",
      lineHeight: "1.2"
    },
    headerSub: {
      fontSize: "10px",
      color: "rgba(255, 255, 255, 0.85)",
      fontWeight: "500",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "4px"
    },
    switchBtn: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      border: "none",
      color: "white",
      padding: "5px 10px",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "10px",
      fontWeight: "700",
      fontFamily: "'Poppins', sans-serif",
      outline: "none",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      transition: "background-color 0.2s"
    },
    closeBtn: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      border: "none",
      color: "white",
      padding: "6px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s",
      outline: "none"
    },
    messageArea: {
      flexGrow: 1,
      overflowY: "auto",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      backgroundColor: "#f8f9fa"
    },
    messageRow: (isBot) => ({
      display: "flex",
      justifyContent: isBot ? "flex-start" : "flex-end",
      width: "100%"
    }),
    messageContentWrap: (isBot) => ({
      display: "flex",
      alignItems: "start",
      gap: "10px",
      maxWidth: "85%",
      flexDirection: isBot ? "row" : "row-reverse"
    }),
    avatarSmall: (isBot) => ({
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      backgroundColor: isBot ? "white" : "#e2e8f0",
      border: isBot ? "1px solid rgba(8, 112, 157, 0.15)" : "1px solid #cbd5e1",
      color: isBot ? "#08709d" : "#4a5568",
      flexShrink: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }),
    messageBubble: (isBot) => ({
      backgroundColor: isBot ? "white" : agentType ? AGENT_CFG[agentType].color : "#08709d",
      color: isBot ? "#2d3748" : "white",
      borderRadius: isBot ? "18px 18px 18px 2px" : "18px 18px 2px 18px",
      padding: "12px 16px",
      fontSize: "12.5px",
      lineHeight: "1.5",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
      border: isBot ? "1px solid rgba(0, 0, 0, 0.05)" : "none",
      whiteSpace: "pre-line",
      fontFamily: "'Poppins', sans-serif",
      transition: "background-color 0.3s ease"
    }),
    messageTime: {
      fontSize: "9px",
      color: "#a0aec0",
      marginTop: "4px",
      alignSelf: "flex-start"
    },
    quickRepliesContainer: {
      padding: "12px",
      backgroundColor: "white",
      borderTop: "1px solid rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      maxHeight: "110px",
      overflowY: "auto"
    },
    quickReplyBtn: (btnId) => {
      const isHovered = hoveredBtn === btnId;
      const brandColor = agentType ? AGENT_CFG[agentType].color : "#08709d";
      return {
        fontSize: "11px",
        fontWeight: "600",
        color: isHovered ? "white" : brandColor,
        backgroundColor: isHovered ? brandColor : "rgba(8, 112, 157, 0.05)",
        border: `1px solid ${isHovered ? brandColor : "rgba(8, 112, 157, 0.15)"}`,
        padding: "7px 12px",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        outline: "none",
        fontFamily: "'Poppins', sans-serif",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px"
      };
    },
    serviceBtn: (serviceName) => {
      const isHovered = hoveredBtn === serviceName;
      const brandColor = agentType ? AGENT_CFG[agentType].color : "#08709d";
      return {
        width: "100%",
        textAlign: "left",
        padding: "10px 14px",
        backgroundColor: isHovered ? brandColor : "white",
        color: isHovered ? "white" : brandColor,
        border: "1px solid rgba(8, 112, 157, 0.15)",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s",
        marginBottom: "6px",
        outline: "none",
        fontFamily: "'Poppins', sans-serif",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)"
      };
    },
    cancelBtnSmall: {
      width: "100%",
      padding: "8px",
      backgroundColor: "#f1f3f5",
      color: "#666",
      border: "none",
      borderRadius: "8px",
      fontSize: "10px",
      fontWeight: "600",
      cursor: "pointer",
      textAlign: "center",
      transition: "all 0.2s",
      fontFamily: "'Poppins', sans-serif"
    },
    inputForm: {
      padding: "12px",
      backgroundColor: "white",
      borderTop: "1px solid rgba(0, 0, 0, 0.05)",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    inputField: {
      flexGrow: 1,
      padding: "10px 16px",
      backgroundColor: "#f1f3f5",
      border: "1px solid transparent",
      borderRadius: "16px",
      fontSize: "12px",
      outline: "none",
      transition: "all 0.2s",
      color: "#2d3748",
      fontFamily: "'Poppins', sans-serif"
    },
    sendBtn: {
      backgroundColor: agentType ? AGENT_CFG[agentType].color : "#08709d",
      border: "none",
      color: "white",
      padding: "10px",
      borderRadius: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
      boxShadow: "0 4px 10px rgba(8, 112, 157, 0.2)",
      outline: "none",
      width: "36px",
      height: "36px",
      flexShrink: 0
    },
    typingIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      padding: "10px 14px",
      backgroundColor: "white",
      border: "1px solid rgba(0, 0, 0, 0.04)",
      borderRadius: "18px 18px 18px 2px",
      width: "fit-content"
    },
    typingDot: {
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      backgroundColor: "#a0aec0"
    },
    // Selector Welcome Screen Styles
    welcomeContainer: {
      flexGrow: 1,
      padding: "24px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
      overflowY: "auto"
    },
    agentCard: (type) => {
      const isHovered = hoveredBtn === type;
      return {
        width: "100%",
        backgroundColor: "white",
        border: `1.5px solid ${isHovered ? "#08709d" : "rgba(0,0,0,0.06)"}`,
        borderRadius: "16px",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isHovered ? "0 8px 20px rgba(8,112,157,0.1)" : "0 2px 4px rgba(0,0,0,0.02)",
        marginBottom: "12px",
        textAlign: "left",
        outline: "none",
        fontFamily: "'Poppins', sans-serif"
      };
    },
    agentCardIcon: (bg) => ({
      width: "42px",
      height: "42px",
      borderRadius: "12px",
      backgroundColor: `${bg}10`,
      // 10% opacity
      color: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      flexShrink: 0
    })
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 100, scale: 0.85 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 100, scale: 0.85 },
      transition: { type: "spring", damping: 25, stiffness: 220 },
      style: styles2.chatWindow,
      children: [
        /* @__PURE__ */ jsxs("div", { style: styles2.header, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
            /* @__PURE__ */ jsxs("div", { style: styles2.avatarContainer, children: [
              agentType ? AGENT_CFG[agentType].avatar : /* @__PURE__ */ jsx(Bot, { size: 20, className: "text-white" }),
              agentType && /* @__PURE__ */ jsx("span", { style: styles2.onlineDot })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { style: styles2.headerTitle, className: "flex items-center gap-1", children: [
                agentType ? AGENT_CFG[agentType].name : "CORX Care Hub",
                agentType && /* @__PURE__ */ jsx(Sparkles, { size: 13, style: { color: "#fef08a" }, className: "animate-pulse" })
              ] }),
              /* @__PURE__ */ jsxs("p", { style: styles2.headerSub, children: [
                /* @__PURE__ */ jsx(Activity, { size: 10, style: { color: "#86efac" } }),
                agentType ? AGENT_CFG[agentType].role : "Virtual Health Assistant"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            agentType && /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleSwitchAgent,
                style: styles2.switchBtn,
                onMouseEnter: (e) => e.target.style.backgroundColor = "rgba(255,255,255,0.25)",
                onMouseLeave: (e) => e.target.style.backgroundColor = "rgba(255,255,255,0.15)",
                children: [
                  /* @__PURE__ */ jsx(Settings, { size: 11 }),
                  " Change Agent"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleOpenToggle,
                style: styles2.closeBtn,
                children: /* @__PURE__ */ jsx(X, { size: 16 })
              }
            )
          ] })
        ] }),
        agentType === null ? (
          /* Agent Selector screen */
          /* @__PURE__ */ jsxs("div", { style: styles2.welcomeContainer, children: [
            /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", marginBottom: "24px" }, children: [
              /* @__PURE__ */ jsx("div", { style: {
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "rgba(8, 112, 157, 0.08)",
                color: "#08709d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                boxShadow: "0 4px 10px rgba(8, 112, 157, 0.05)"
              }, children: /* @__PURE__ */ jsx(Bot, { size: 28 }) }),
              /* @__PURE__ */ jsx("h2", { style: { fontSize: "18px", fontWeight: "800", color: "#1a294a", margin: "0 0 6px" }, children: "CORX Health Chat" }),
              /* @__PURE__ */ jsx("p", { style: { fontSize: "11.5px", color: "#718096", margin: 0, padding: "0 10px" }, children: "Select an assistant type to start your consulting session:" })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => selectAgent("doctor"),
                style: styles2.agentCard("doctor"),
                onMouseEnter: () => setHoveredBtn("doctor"),
                onMouseLeave: () => setHoveredBtn(null),
                children: [
                  /* @__PURE__ */ jsx("div", { style: styles2.agentCardIcon("#08709d"), children: /* @__PURE__ */ jsx(Stethoscope, { size: 22 }) }),
                  /* @__PURE__ */ jsxs("div", { style: { flexGrow: 1 }, children: [
                    /* @__PURE__ */ jsx("h4", { style: { margin: "0 0 2px", fontSize: "13px", fontWeight: "700", color: "#1a294a" }, children: "DHA Doctor (Virtual)" }),
                    /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: "10px", color: "#718096", lineHeight: "1.4" }, children: "Clinical consultation, evaluate symptoms, prescriptions & sick leave." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => selectAgent("nurse"),
                style: styles2.agentCard("nurse"),
                onMouseEnter: () => setHoveredBtn("nurse"),
                onMouseLeave: () => setHoveredBtn(null),
                children: [
                  /* @__PURE__ */ jsx("div", { style: styles2.agentCardIcon("#0ea5e9"), children: /* @__PURE__ */ jsx(Activity, { size: 20 }) }),
                  /* @__PURE__ */ jsxs("div", { style: { flexGrow: 1 }, children: [
                    /* @__PURE__ */ jsx("h4", { style: { margin: "0 0 2px", fontSize: "13px", fontWeight: "700", color: "#1a294a" }, children: "DHA Nurse (Virtual)" }),
                    /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: "10px", color: "#718096", lineHeight: "1.4" }, children: "IV therapies, blood test collections, dressing, injections, home nursing." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => selectAgent("coordinator"),
                style: styles2.agentCard("coordinator"),
                onMouseEnter: () => setHoveredBtn("coordinator"),
                onMouseLeave: () => setHoveredBtn(null),
                children: [
                  /* @__PURE__ */ jsx("div", { style: styles2.agentCardIcon("#10b981"), children: /* @__PURE__ */ jsx(UserCheck, { size: 20 }) }),
                  /* @__PURE__ */ jsxs("div", { style: { flexGrow: 1 }, children: [
                    /* @__PURE__ */ jsx("h4", { style: { margin: "0 0 2px", fontSize: "13px", fontWeight: "700", color: "#1a294a" }, children: "Booking Coordinator" }),
                    /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: "10px", color: "#718096", lineHeight: "1.4" }, children: "Direct bookings, check pricing, schedule slots, emergency hotlines." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { style: { marginTop: "16px", fontSize: "9.5px", color: "#a0aec0", display: "flex", alignItems: "center", gap: "4px" }, children: [
              /* @__PURE__ */ jsx(Phone, { size: 10 }),
              " Emergency Coordinator 24/7: +971 4 332 0776"
            ] })
          ] })
        ) : (
          /* Active Chat Area with chosen agent */
          /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { style: styles2.messageArea, children: [
              messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return /* @__PURE__ */ jsx("div", { style: styles2.messageRow(isBot), children: /* @__PURE__ */ jsxs("div", { style: styles2.messageContentWrap(isBot), children: [
                  /* @__PURE__ */ jsx("div", { style: styles2.avatarSmall(isBot), children: isBot ? AGENT_CFG[agentType].avatar : /* @__PURE__ */ jsx(User, { size: 13 }) }),
                  /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
                    /* @__PURE__ */ jsxs("div", { style: styles2.messageBubble(isBot), children: [
                      /* @__PURE__ */ jsx("span", { children: msg.text }),
                      msg.isConfirmation && /* @__PURE__ */ jsxs("div", { style: {
                        marginTop: "12px",
                        padding: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.25)",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                      }, children: [
                        /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "11px" }, children: [
                          /* @__PURE__ */ jsx("strong", { children: "Service:" }),
                          " ",
                          msg.confirmData.service
                        ] }),
                        /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "11px" }, children: [
                          /* @__PURE__ */ jsx("strong", { children: "Patient:" }),
                          " ",
                          msg.confirmData.name
                        ] }),
                        /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "11px" }, children: [
                          /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
                          " ",
                          msg.confirmData.phone
                        ] }),
                        /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "11px" }, children: [
                          /* @__PURE__ */ jsx("strong", { children: "Time:" }),
                          " ",
                          msg.confirmData.date
                        ] }),
                        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "8px", marginTop: "8px" }, children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: confirmBooking,
                              style: {
                                flexGrow: 1,
                                padding: "8px 12px",
                                backgroundColor: "#22c55e",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "700",
                                fontSize: "11px",
                                cursor: "pointer",
                                boxShadow: "0 2px 4px rgba(34, 197, 94, 0.2)"
                              },
                              children: "Confirm Request"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: cancelBooking,
                              style: {
                                padding: "8px 12px",
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "600",
                                fontSize: "11px",
                                cursor: "pointer"
                              },
                              children: "Cancel"
                            }
                          )
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("span", { style: styles2.messageTime, children: msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                  ] })
                ] }) }, msg.id);
              }),
              bookingState.active && bookingState.step === 0 && /* @__PURE__ */ jsxs("div", { style: { marginLeft: "38px", maxWidth: "85%", display: "flex", flexDirection: "column" }, children: [
                ["Doctor Visit at Home", "IV Therapy Session", "Blood / Lab Test", "Nursing Care"].map((service) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleBookingServiceSelect(service),
                    style: styles2.serviceBtn(service),
                    onMouseEnter: () => setHoveredBtn(service),
                    onMouseLeave: () => setHoveredBtn(null),
                    children: service
                  },
                  service
                )),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: cancelBooking,
                    style: styles2.cancelBtnSmall,
                    children: "Cancel Booking"
                  }
                )
              ] }),
              isTyping && /* @__PURE__ */ jsx("div", { style: styles2.messageRow(true), children: /* @__PURE__ */ jsxs("div", { style: styles2.messageContentWrap(true), children: [
                /* @__PURE__ */ jsx("div", { style: styles2.avatarSmall(true), children: AGENT_CFG[agentType].avatar }),
                /* @__PURE__ */ jsxs("div", { style: styles2.typingIndicator, children: [
                  /* @__PURE__ */ jsx("span", { style: styles2.typingDot, className: "animate-bounce" }),
                  /* @__PURE__ */ jsx("span", { style: { ...styles2.typingDot, animationDelay: "150ms" }, className: "animate-bounce" }),
                  /* @__PURE__ */ jsx("span", { style: { ...styles2.typingDot, animationDelay: "300ms" }, className: "animate-bounce" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { ref: chatEndRef })
            ] }),
            !bookingState.active && messages.length < 12 && /* @__PURE__ */ jsxs("div", { style: styles2.quickRepliesContainer, children: [
              agentType === "coordinator" && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: startBooking,
                  style: styles2.quickReplyBtn("book"),
                  onMouseEnter: () => setHoveredBtn("book"),
                  onMouseLeave: () => setHoveredBtn(null),
                  children: "📅 Book Appointment"
                }
              ),
              agentType === "doctor" && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: "Doctor visit pricing?", timestamp: /* @__PURE__ */ new Date() }]);
                      addBotMessage("Our DHA Doctor Home visits start from 299 AED, which includes full clinical consultation and prescription/sick leave certification. Shall I connect you to bookings?");
                    },
                    style: styles2.quickReplyBtn("doc_price"),
                    onMouseEnter: () => setHoveredBtn("doc_price"),
                    onMouseLeave: () => setHoveredBtn(null),
                    children: "💰 Check GP Prices"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: "Can you issue sick leave?", timestamp: /* @__PURE__ */ new Date() }]);
                      addBotMessage(getAgentResponse("sick leave", "doctor"));
                    },
                    style: styles2.quickReplyBtn("sick_leave"),
                    onMouseEnter: () => setHoveredBtn("sick_leave"),
                    onMouseLeave: () => setHoveredBtn(null),
                    children: "📜 Sick Leave Info"
                  }
                )
              ] }),
              agentType === "nurse" && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: "IV drip options?", timestamp: /* @__PURE__ */ new Date() }]);
                      addBotMessage(getAgentResponse("iv", "nurse"));
                    },
                    style: styles2.quickReplyBtn("iv_opts"),
                    onMouseEnter: () => setHoveredBtn("iv_opts"),
                    onMouseLeave: () => setHoveredBtn(null),
                    children: "💧 Home IV Options"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: "Blood tests at home?", timestamp: /* @__PURE__ */ new Date() }]);
                      addBotMessage(getAgentResponse("blood", "nurse"));
                    },
                    style: styles2.quickReplyBtn("blood_test"),
                    onMouseEnter: () => setHoveredBtn("blood_test"),
                    onMouseLeave: () => setHoveredBtn(null),
                    children: "🩸 Lab Tests info"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: "Phone/WhatsApp support details", timestamp: /* @__PURE__ */ new Date() }]);
                    addBotMessage(getAgentResponse("whatsapp", agentType));
                  },
                  style: styles2.quickReplyBtn("whatsapp"),
                  onMouseEnter: () => setHoveredBtn("whatsapp"),
                  onMouseLeave: () => setHoveredBtn(null),
                  children: "📞 Phone & WhatsApp"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "form",
              {
                onSubmit: handleTextSubmit,
                style: styles2.inputForm,
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: inputText,
                      onChange: (e) => setInputText(e.target.value),
                      placeholder: bookingState.active ? bookingState.step === 1 ? "Enter your full name..." : bookingState.step === 2 ? "Enter your phone number..." : bookingState.step === 3 ? "Enter preferred date..." : "Please confirm details above..." : AGENT_CFG[agentType].placeholder,
                      disabled: bookingState.active && bookingState.step >= 4,
                      style: styles2.inputField,
                      onFocus: (e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.borderColor = "rgba(8, 112, 157, 0.25)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(8, 112, 157, 0.08)";
                      },
                      onBlur: (e) => {
                        e.target.style.backgroundColor = "#f1f3f5";
                        e.target.style.borderColor = "transparent";
                        e.target.style.boxShadow = "none";
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: !inputText.trim() || bookingState.active && bookingState.step >= 4,
                      style: {
                        ...styles2.sendBtn,
                        ...!inputText.trim() || bookingState.active && bookingState.step >= 4 ? { backgroundColor: "#e2e8f0", color: "#a0aec0", boxShadow: "none", cursor: "default" } : {}
                      },
                      children: /* @__PURE__ */ jsx(Send, { size: 15 })
                    }
                  )
                ]
              }
            )
          ] })
        )
      ]
    }
  ) }) });
};
const partner1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEX///93dnsAgWUAe12CsqNWoY1kZGnZ2Nnt7e50c3j29vZ5eH35+fnS0tP8/Pxsa3Hg4OGYmJvy9/WJiIx+fYGvr7EAd1cAg2cjh20AclDw8PDp6eofgWXR0dJhoIzf3+DGxsfe7eqnp6m9vb+Qj5Ozs7ZcW2Hk8e6WlZiYwLTB29R1q5u50sqgoKKlxrvr8/FSUlfP4dxJl4GryMBXmYKOu616r581jXPH2tVGjnZQoItypJKZxbmOtKdenImCrJxdu03nAAAKSklEQVR4nO2bC3ubuBKGBc5ykUGAAddGIShcXCcxzaVNk2738v//1RlJYGPH7iZe59nT3XmflmIhAZ80mpGESgiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAjyf4oX+n7I/um3eEd45XOeN/Sffo93g6W8FVVI0zcX7Nmb+BK46r0sMCha2IUdHqXhxwiHxA4fk0K8rZzvjjVGO0itjfEBYjCSUpUxqr03pGPXDaKjdRymISQufDi+sRHzwOhw/U1q7Br7caVCqi67QbHvhjRxDfcdFDKpUNQZIftr9iD+RuF4Y3c/Vkj4WElMsj039BLjXRTKposzkSqpb2Gj0Ag2zX9YYaJcmW75XojXpAPGcKEu7FPjFMKrbRrRih+t0HDtHYUH+iHQqAyBrs42cAfoW52aoCKVL3uIEG8TuK0w3lLo1jx8SWfKtbuuEzG4xbvhVoTlFeAfEPIqhUbQd2Kt8Ee9KUtUFtchxSGLPrVC6A6Uem8V2CkE368Y89cqJLYqGCy1VCOwelRR69Qs3uhfdhUmous+y1crJJX2NmMt0M8cDVe+lDqn5ujBWteGPNXWauWvVsiijXkGmxp+t2hxLJ3CUEdxiAbKTtcKKd/B2RSl65gyVET3K2STyeTtfegU9Ap7lxOowdtaYRXseO1kILH3MVuhf6/C+8fvDw8PF4/3w8Qz4GrS/Xj+etZz9Vknfj4bss55tELSGZ1lbynccZTb45iu9xr2IG2PwvsHcwTIw/fbderVHH7P+t8X09GG2bVMmg1SRtObIwUOFHLtT9W47KBCY0th0/kn8UOFn6S46dSEP+b0S98U9+cmMLrUv7xvpsyjgOQpCJ/MN0nT6fzT31fYR243/aGVDhSuR+3BYLb0QuEVvPLoy+p2Mvk8g3e/0qnsYWR+gJ+rTi9cevg4uQWe4XQEuVZzc3Tj3fYcPbcfKOzHagHfKBRJvE296Yd8Y7vxRveuwucR6HjU59dgbU+3ve7ppw/m6Ku+8hma+awrsZqq5JuROV8dK+uAwrAzunqjkHm7bKR03lcd2nUV7yj0vgzendzcnD0qMwUbHZ2xB9N80hfOINfnLtOVKuF92djwyRSSprNTUb8iHrY6sx6grsd7uwrvoTed3+6WZd9G5tOEfB+Z5zoBtI4+6tNr2ejX5FLa7f1lz/ELUFsKmR6BGUmyG+VeonstzLiWuhX7EfGOwsfR2hIHQDOZz+CDwB5VAJFexby+Xq0+nUGbQ7cFW4V/zfOei2NjxY7CwYz/rxTaWlfNiJNsTYd3FIJDmT7vFoa+qTzOyuxscyUd6HwOPlPqm99MlN2am2Dx59ECdxSS0n2dQtrJ4muxwXKvwm97etPkyTQv5Al40JFyQuBVzNlsJuPH+cOjyg95zF96fr0+mUL6OoXdmDTQpqnH4N3YdI/CdTfs3NQjGOfZJ+AR/M131kXD64+Xz2CiMz3ukXb74XhZhxUOp7PyPSe3u7CNJrdzL6wd6FUK6/X9wYVM+7Ha/TkM3Bi5VqFeASffbrtoKHvaZNb7JRkNX/bfUygczBikwt/MD9s8SRPq5obrltI2q2eXcm5hjPN+rirDQDfgmkCfnN+AjULSXDPSNrxaRxR59l2efN3Xf0+ikPBthbKahzyBT+99y2bKFnZ+R6boSJO4el1LRgvzE7SP9xEEjqDFQPP0sYsBcD5/1g5XR0Mmo+A1UdFwdsleRuETKOyD4mGFbLBG07OOHeCPLVU6KPWVGzkaffj99ws5Oj2/lH509KWPbvfzD9LVgFcZdaZ8DTXyjahoOLtY88ffCP25GngOFdK6H4MeUJgG3eLXkFInCmiG7rRTyG5G2u/D3z8+ahtdT6LAn4welFeZ9Uny+kqHj02wmB8vkPhuIhl+aCjGKikZtzI0b3dDc/YxVyXG5fZ9vFqWGquumEcxjBnWq6+rC9XtZjdylHlmzj48rkuxJ4gRMIqZnV/0SZ8hbFxMrmTw2PDL31DIqGJrUEQ7wPq9yS5ywetFCUL6ZG99003fYZPb+8tbPSqRtxgUVXdk6rjOLH+8eCpymOeHX34Kfv3tWIWr+einYHr0yFQ5rZ+A48fe/wGF/3orvf969lPw9RRLNgiC/CPIAaQHh4MXmUd3vrsymnUX++HlZjD6miU/b/d2/bMGWbLMO9XeLtomLad1uvfVsjYpMwcOzlaR2vBUSaNLZnlcy5R2XO3bfbJL5W59ia8W6nNekaznKqyKqqp+896uQ9gW3Ko9MIVu5dNbY2cLl5y8C4dF67WYYhxQOQdOXlXvlbv1tLClxBOkcPMugS7lAp5484aEg1g1kRtUHB8OWciJ4xBasEK9hdybkSVKiW1DM4eFw0kY5LRJvMwSxNZNL1orI0Wpli24nYUkKxxmy6mXT+FGzLap3AQX+vJgL9XqDoVqyxh3KIc7RiWpAsZ1TUbq814GtWVz7kCqV/TPP47EtaH2qrRwM9IsQuZWpKyFK59mBymlvtXAe7e2a5O8tccNqYysspbctnik7Y3mYGmsqeT8Po9soyWVZbdBDq1hR2OaxU1oRJS2xViQJvUXsrGypUGyiC7hvpVXBw1d1sVYrfKEVr/lpUpFkHtxWSYUnm/kBwT8JalUIALOoU1Si/hBIRWqTZyNmwoRW5xkQegbGV84RWCTaEnshUPaJK9ctbHN8f2FXTmyX3LXzu58khpCQI0sW5K0pAmy8K5gceVY3A+gxlRnFYGzjD1R2UFI0jHxrDKMI9lMjdVtCcgDklscFIqKBr5tHe16aiiawYvki5CMWxbFlMb6QxKt5UJ9MmbgQ/yIkygmVUIzaKo2YQxqvNS17fPQinwq10jTBMyNkjimacLCBXdcQYTBSoMKFyyAxRFZKq8ECoVMdVKXsCCFpwtH73VMu70SsnKimoVyTTZN/GjvLsFXIY0ihPZbxoRbtnBL+Ec/g8tP+qFcUHLbjFAWVLomMg96nA290dC1nUKJlPgLQWhSsqSFtxIeuMY0oKnLCW+ggUkEnYBli5x3q8jCCkVQ2WRckvAuhDrzwI7UhYXMwCm986U6YTnEi5ecHNuETEhfCtIKcGACmsIqHXGnO3W1aAhLQTxJEi5sFsSN2zqt64dWFVYGDe9S+U68JA540eWiAIVJ5UZQTVm2SLPUSiM3p8tYOHIprrDz7G6ZuqWy0goqyfKJc1fxxs15kkKOXD6XxW5IbUGyxTINSohmkFQnYW4fFvFDuKjk8/1KQB3xNKSpTXyhL1WQGMoDKdISjAT6Q5MTP828VJAcWqyS7ogKkXmc+VXleyRvaAMuVhCvKYiThnaT0bK2oJacpswh0oks1a9aUOLAGYVbFWkh9xvaQkcRKspUGpHOK2R2npbHCnx/WGwTGpd/nfHnpUxtu3zjjtCfC+Zk2b/3/w8gCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIg/wH+ByeLAdwgtfGSAAAAAElFTkSuQmCC";
const partner3 = "/assets/our%20partner%203-XFOfXyxL.png";
const partner4 = "/assets/our%20partner%204-BfwsW6bI.webp";
const partner5 = "/assets/our%20partner%205-DUD9q4vq.png";
const partner6 = "/assets/our%20partner%206-DAg8BoHw.png";
const partner7 = "/assets/our%20partner%207-DMGp4mo0.png";
const partner8 = "/assets/our%20partner%208-BalvwOeb.png";
const hero1 = "/assets/hero1-C050G3Ss.png";
const ivTherapyImg = "/assets/iv_therapy_home-B0XR6HtH.png";
const labServicesImg = "/assets/lab_services_home-BeEN7IdP.png";
const services = [
  {
    id: 1,
    title: "Home Physiotherapy",
    description: "Experience Exceptional Home Physiotherapy in Dubai with Just One Phone Call Away",
    accent: "#B8D8E8",
    path: "/physiotherapy-at-home-in-dubai/",
    icon: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
      /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4" }),
      /* @__PURE__ */ jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
      /* @__PURE__ */ jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
    ] }),
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80",
    video: "https://cdn.pixabay.com/video/2024/08/31/229069_large.mp4"
  },
  {
    id: 2,
    title: "IV Therapy",
    description: "Discover Convenient 24/7 IV Therapy Services Right at Your Doorstep with Us.",
    accent: "#F5DEB3",
    path: "/iv-therapy",
    icon: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
      /* @__PURE__ */ jsx("polyline", { points: "9 22 9 12 15 12 15 22" }),
      /* @__PURE__ */ jsx("path", { d: "M12 7v4M10 9h4" })
    ] }),
    image: ivTherapyImg,
    video: "https://cdn.pixabay.com/video/2022/12/18/143434-782373973_large.mp4"
  },
  {
    id: 3,
    title: "Home Nursing",
    description: "Offering expert nursing care within the UAE and right at your doorstep.",
    accent: "#D8B4D8",
    path: "/home-nursing",
    icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", width: "22", height: "22", children: /* @__PURE__ */ jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) }),
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=80",
    video: "https://cdn.pixabay.com/video/2020/09/13/49815-458438877_large.mp4"
  },
  {
    id: 4,
    title: "Doctor On Call",
    description: "Access 24/7 Doctor On Call Services in Dubai. Experience the Premier At-Home Medical Care in the City.",
    accent: "#F4C2C2",
    path: "/doctor-on-call",
    icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", width: "22", height: "22", children: /* @__PURE__ */ jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }) }),
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    video: "https://cdn.pixabay.com/video/2020/09/13/49808-458438856_large.mp4"
  },
  {
    id: 5,
    title: "Elderly Care Givers",
    description: "Experience Dedicated Caregivers at Your Home in Dubai. Personalized Medical Care Right at Your Doorstep!",
    accent: "#B4E1D0",
    path: "/elderly-care",
    icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", width: "22", height: "22", children: /* @__PURE__ */ jsx("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" }) }),
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80",
    video: "https://cdn.pixabay.com/video/2016/10/24/6096-188704568_large.mp4"
  },
  {
    id: 6,
    title: "Lab Services",
    description: "Corx Healthcare Offers Convenient 24/7 Lab Testing Right at Your Doorstep in Dubai.",
    accent: "#E2D1F9",
    path: "/lab-test-at-home",
    icon: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx("rect", { width: "20", height: "14", x: "2", y: "7", rx: "2", ry: "2" }),
      /* @__PURE__ */ jsx("path", { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" })
    ] }),
    image: labServicesImg,
    video: "https://cdn.pixabay.com/video/2017/01/01/6973-197914400_large.mp4"
  }
];
function ServiceCard({ service, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      onClick: () => navigate(service.path),
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: {
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.21, 1.02, 0.47, 0.98]
      },
      whileHover: {
        y: -10,
        transition: { duration: 0.3 }
      },
      style: {
        background: "#ffffff",
        borderRadius: "24px",
        overflow: "hidden",
        border: hovered ? "1px solid rgba(94, 182, 59, 0.25)" : "1px solid rgba(8, 112, 157, 0.05)",
        boxShadow: hovered ? "0 30px 60px -15px rgba(8, 112, 157, 0.15), 0 0 25px rgba(94, 182, 59, 0.06)" : "0 10px 30px -5px rgba(0, 0, 0, 0.03)",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", height: "190px", overflow: "hidden" }, children: [
          /* @__PURE__ */ jsxs(
            "video",
            {
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              poster: service.image,
              style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.8s cubic-bezier(0.21, 1.02, 0.47, 0.98)"
              },
              children: [
                /* @__PURE__ */ jsx("source", { src: service.video, type: "video/mp4" }),
                "Your browser does not support the video tag."
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300",
              style: { opacity: hovered ? 1 : 0 }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                position: "absolute",
                bottom: "-20px",
                left: "24px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: hovered ? "#5eb63b" : "#ffffff",
                border: hovered ? "2px solid #ffffff" : `2px solid ${service.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: hovered ? "#ffffff" : "#08709d",
                boxShadow: hovered ? "0 6px 16px rgba(94, 182, 59, 0.3)" : "0 4px 12px rgba(0,0,0,0.08)",
                zIndex: 2,
                transition: "all 0.35s ease"
              },
              children: service.icon
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "32px 24px 24px" }, children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              style: {
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "18px",
                fontWeight: "750",
                color: hovered ? "#08709d" : "#1a2e3a",
                margin: "0 0 10px",
                lineHeight: 1.3,
                transition: "color 0.3s ease"
              },
              children: service.title
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              style: {
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "14px",
                color: "#6b7b85",
                margin: "0 0 24px",
                lineHeight: 1.6,
                fontWeight: "400"
              },
              children: service.description
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              animate: { color: hovered ? "#5eb63b" : "#08709d" },
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "700",
                fontSize: "14px",
                letterSpacing: "0.02em"
              },
              children: [
                /* @__PURE__ */ jsx("span", { children: "Read more" }),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    animate: { x: hovered ? 6 : 0 },
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                    style: { display: "inline-block" },
                    children: "→"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ExploreServices() {
  const [serviceList, setServiceList] = useState(services);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services/`).then((res) => {
      if (!res.ok) return null;
      return res.json();
    }).then((data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        const mainParents = data.filter((item) => item.parent === null || !item.parent);
        const listToDisplay = mainParents.length > 0 ? mainParents : data;
        setServiceList(listToDisplay.map((item, index) => {
          const defaultItem = services.find((s) => s.path.includes(item.slug) || item.slug.includes(s.path.split("/").pop())) || services[index % services.length];
          return {
            id: item.id || index + 1,
            title: item.title || defaultItem.title,
            description: item.tagline || item.description || defaultItem.description,
            accent: item.theme_color || defaultItem.accent,
            path: `/${item.slug}`,
            icon: defaultItem.icon,
            image: item.image || defaultItem.image,
            video: defaultItem.video
          };
        }));
      }
    }).catch(() => {
    });
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

        .services-section {
          background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f3f7fa 100%);
          min-height: 100vh;
          padding: 80px 40px;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Floating medical bubbles */
        @keyframes floatUp {
          0% {
            transform: translateY(150px) scale(0.7);
            opacity: 0;
          }
          30% {
            opacity: 0.45;
          }
          70% {
            opacity: 0.45;
          }
          100% {
            transform: translateY(-250px) scale(1.15);
            opacity: 0;
          }
        }
        .services-section .bubble {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: floatUp 16s infinite ease-in-out;
        }
        .services-section .bubble-1 {
          width: 75px;
          height: 75px;
          background: rgba(8, 112, 157, 0.05);
          left: 4%;
          top: 15%;
          animation-duration: 20s;
        }
        .services-section .bubble-2 {
          width: 105px;
          height: 105px;
          background: rgba(94, 182, 59, 0.04);
          right: 6%;
          top: 35%;
          animation-duration: 24s;
          animation-delay: 2.5s;
        }
        .services-section .bubble-3 {
          width: 55px;
          height: 55px;
          background: rgba(8, 112, 157, 0.04);
          left: 42%;
          bottom: 12%;
          animation-duration: 16s;
          animation-delay: 4.5s;
        }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .services-section { padding: 60px 30px; }
        }

        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; gap: 20px; }
          .services-section { padding: 50px 20px; }
        }
      ` }),
    /* @__PURE__ */ jsxs("section", { className: "services-section", children: [
      /* @__PURE__ */ jsxs("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: "15%", left: "10%", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(8, 112, 157, 0.05)", filter: "blur(90px)" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "15%", right: "10%", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(94, 182, 59, 0.04)", filter: "blur(90px)" } }),
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "linear-gradient(to right, #08709d 1px, transparent 1px), linear-gradient(to bottom, #08709d 1px, transparent 1px)", backgroundSize: "32px 32px" } }),
        /* @__PURE__ */ jsxs("svg", { style: { position: "absolute", left: 0, right: 0, top: "45%", transform: "translateY(-50%)", width: "100%", height: "260px", opacity: 0.22 }, viewBox: "0 0 1400 300", fill: "none", preserveAspectRatio: "none", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              id: "heartbeat-path",
              d: "M-100,150 L350,150 L365,130 L380,170 L395,30 L415,270 L435,130 L450,160 L465,150 L850,150 L865,130 L880,170 L895,30 L915,270 L935,130 L950,160 L965,150 L1600,150",
              stroke: "url(#ecg-gradient)",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              opacity: "0.65"
            }
          ),
          /* @__PURE__ */ jsx("circle", { r: "4.5", fill: "#5eb63b", filter: "drop-shadow(0 0 6px #5eb63b)", children: /* @__PURE__ */ jsx(
            "animateMotion",
            {
              dur: "6.5s",
              repeatCount: "indefinite",
              path: "M-100,150 L350,150 L365,130 L380,170 L395,30 L415,270 L435,130 L450,160 L465,150 L850,150 L865,130 L880,170 L895,30 L915,270 L935,130 L950,160 L965,150 L1600,150"
            }
          ) }),
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "ecg-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#08709d", stopOpacity: "0.2" }),
            /* @__PURE__ */ jsx("stop", { offset: "25%", stopColor: "#08709d", stopOpacity: "0.8" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#5eb63b", stopOpacity: "0.95" }),
            /* @__PURE__ */ jsx("stop", { offset: "75%", stopColor: "#08709d", stopOpacity: "0.8" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#08709d", stopOpacity: "0.2" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bubble bubble-1" }),
        /* @__PURE__ */ jsx("div", { className: "bubble bubble-2" }),
        /* @__PURE__ */ jsx("div", { className: "bubble bubble-3" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 10 }, children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              maxWidth: "1200px",
              margin: "0 auto 56px",
              textAlign: "left"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3.5 text-[11px] font-bold uppercase tracking-wider",
                  style: {
                    background: "rgba(94, 182, 59, 0.08)",
                    border: "1px solid rgba(94, 182, 59, 0.2)",
                    color: "#5eb63b"
                  },
                  children: "⊙ Clinical Care At Home"
                }
              ),
              /* @__PURE__ */ jsxs(
                "h2",
                {
                  style: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(28px, 3.5vw, 42px)",
                    fontWeight: "800",
                    color: "#1a2e3a",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    lineHeight: 1.15
                  },
                  children: [
                    "Explore Our ",
                    /* @__PURE__ */ jsx("span", { style: { color: "#08709d" }, children: "Home Services" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "14.5px",
                    color: "#6b7b85",
                    maxWidth: "680px",
                    margin: "12px 0 0",
                    lineHeight: 1.6,
                    fontWeight: "400"
                  },
                  children: "Discover 24/7 DHA-licensed physician-guided medical services, nursing care, and physical therapy delivered directly to your doorstep in Dubai."
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "services-grid", children: serviceList.map((service, i) => /* @__PURE__ */ jsx(ServiceCard, { service, index: i }, service.id)) })
      ] })
    ] })
  ] });
}
const steps = [
  {
    icon: /* @__PURE__ */ jsxs("svg", { className: "w-10 h-10 text-[#63b158]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }),
      /* @__PURE__ */ jsx("path", { d: "M14 2a6 6 0 0 1 6 6" }),
      /* @__PURE__ */ jsx("path", { d: "M14 6a2 2 0 0 1 2 2" })
    ] }),
    title: "1. Contact Us For Pre Booking",
    desc: "Call +97143320776 or WhatsApp Us at +971547033311 for doctor on call service."
  },
  {
    icon: /* @__PURE__ */ jsxs("svg", { className: "w-10 h-10 text-[#63b158]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M4.8 2.3A.3.3 0 0 0 4.5 2h-1a.3.3 0 0 0-.3.3V5c0 .6.4 1 1 1h.6" }),
      /* @__PURE__ */ jsx("path", { d: "M8 22v-3" }),
      /* @__PURE__ */ jsx("path", { d: "M16 22v-3" }),
      /* @__PURE__ */ jsx("path", { d: "M12 2a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" }),
      /* @__PURE__ */ jsx("path", { d: "M16 11a4 4 0 0 1-8 0" }),
      /* @__PURE__ */ jsx("path", { d: "M12 15v3" })
    ] }),
    title: "2. Doctors & Nurses Will Be At your Door Step",
    desc: "Doctors and nurses certified by DHA are dedicated to providing you with prompt home care in Dubai. Expect them at your doorstep within just 30 minutes."
  },
  {
    icon: /* @__PURE__ */ jsxs("svg", { className: "w-10 h-10 text-[#63b158]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
      /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4" }),
      /* @__PURE__ */ jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
      /* @__PURE__ */ jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
    ] }),
    title: "3. You Will Get Comprehensive Care",
    desc: "Experience holistic care encompassing thorough diagnosis, personalized treatment, and expert medication management, all conveniently delivered in the comfort of your home."
  }
];
function ThreeStepsProcessSection() {
  return /* @__PURE__ */ jsxs("section", { className: "relative py-20 md:py-28 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 font-sans overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none z-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: {
            scale: [1, 1.25, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.25, 0.45, 0.25]
          },
          transition: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          },
          className: "absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#63b158]/15 via-[#08709d]/10 to-transparent blur-[110px]"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: {
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
            opacity: [0.2, 0.4, 0.2]
          },
          transition: {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          },
          className: "absolute -bottom-28 -right-28 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#63b158]/20 via-[#08709d]/10 to-transparent blur-[120px]"
        }
      ),
      [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: {
            x: Math.random() * 1e3 - 300,
            y: Math.random() * 500,
            opacity: 0.2
          },
          animate: {
            y: [0, -140, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1]
          },
          transition: {
            duration: 8 + i * 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5
          },
          className: `absolute rounded-full blur-[2px] ${i % 2 === 0 ? "w-4 h-4 bg-[#63b158]/30" : "w-3 h-3 bg-[#08709d]/30"}`,
          style: {
            left: `${20 + i * 16}%`,
            top: `${15 + i * 18 % 60}%`
          }
        },
        i
      )),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#63b158_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center", children: [
      /* @__PURE__ */ jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-2xl md:text-4xl font-extrabold text-[#63b158] tracking-tight mb-3 font-['Montserrat'] leading-snug",
          children: "Book DHA Certified Doctors and Nurses Visit in Just 3 Simple Steps!"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.h3,
        {
          initial: { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.1 },
          className: "text-xl md:text-2xl font-semibold text-[#08709d] mb-6 font-['Montserrat']",
          children: "Home healthcare services in Dubai"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.p,
        {
          initial: { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.2 },
          className: "text-slate-600 text-sm md:text-base max-w-4xl mx-auto leading-relaxed mb-12",
          children: [
            "We’re passionately devoted to your well-being. Our",
            " ",
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-[#63b158] font-semibold underline hover:opacity-80", children: "DHA Certified" }),
            " ",
            "medical team in UAE goes above and beyond, delivering tailored, all-encompassing medical care directly to you, wherever you are. Your health and recovery are our utmost concerns, and we bring both the expertise and equipment right to your doorstep for your utmost comfort and convenience."
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch", children: steps.map((step, idx) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: 0.2 + idx * 0.15 },
          whileHover: { y: -8, transition: { duration: 0.25 } },
          className: "bg-white rounded-2xl p-7 md:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-start text-left group",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-6 text-[#63b158] group-hover:scale-110 transition-transform duration-300", children: step.icon }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg md:text-xl font-bold text-[#63b158] mb-4 font-['Montserrat'] leading-snug", children: step.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm leading-relaxed mb-8", children: step.desc })
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/book-an-appointment",
                className: "inline-flex items-center justify-center px-6 py-2.5 bg-[#08709d] hover:bg-[#065679] text-white font-bold text-sm rounded-lg transition-colors shadow-md hover:shadow-lg",
                children: "Book Now"
              }
            )
          ]
        },
        idx
      )) })
    ] })
  ] });
}
const faqs = [
  {
    q: "What services does Corx Home Healthcare offer?",
    a: "Corx Home Healthcare provides a wide range of services including physiotherapy, nursing care, medical equipment rental, wound care, and medication management, among others."
  },
  {
    q: "Who can benefit from Corx Home Healthcare Services?",
    a: "Our services cater to individuals of all ages who require healthcare assistance in the comfort of their own homes. This includes seniors, individuals recovering from surgery, those with chronic illnesses, and anyone in need of rehabilitation."
  },
  {
    q: "How can I request services from Corx Home Healthcare?",
    a: "You can request our services by contacting us via phone at +971547033311 or by filling out the contact form on our website. Our team will promptly assess your needs and schedule a visit."
  },
  {
    q: "Are your caregivers trained and certified?",
    a: "Yes, all our caregivers are highly trained, certified professionals with experience in their respective fields. We ensure that they undergo rigorous training and background checks to provide the highest quality care."
  },
  {
    q: "What are your service hours?",
    a: "Corx Home Healthcare operates 24 hours a day, 7 days a week, including holidays. We understand that healthcare needs can arise at any time, and our team is dedicated to being there for you whenever you need us."
  },
  {
    q: "How do I pay for Corx Home Healthcare services?",
    a: "We accept various payment methods including cash, credit/debit cards, and bank transfers. We also work with insurance providers for direct billing whenever possible. Our team will provide you with detailed payment options and assist you with any billing inquiries."
  }
];
const styles$1 = `
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
    padding: 60px 0;
    position: relative;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    .faq-section { padding: 40px 0; }
  }

  .faq-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 0% 0%, rgba(8, 112, 157, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(94, 182, 59, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .faq-wrap {
    padding: 0 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
    position: relative;
    z-index: 1;
  }

  .faq-eyebrow {
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
    animation: headerIn 0.4s ease forwards;
  }
  @media (max-width: 640px) {
    .faq-eyebrow { font-size: 12px; }
  }

  .faq-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a2340;
    text-align: center;
    margin: 0 0 0.5rem;
    animation: headerIn 0.4s 0.08s ease both;
    letter-spacing: -0.02em;
  }
  @media (max-width: 768px) {
    .faq-title { font-size: 28px; }
  }

  .faq-sub {
    font-size: 18px;
    color: #4b5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    animation: headerIn 0.4s 0.15s ease both;
  }
  @media (max-width: 768px) {
    .faq-sub { font-size: 15px; margin-bottom: 1.5rem; }
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  @media (max-width: 640px) {
    .faq-list { border-radius: 12px; }
  }

  .faq-item {
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
    opacity: 0;
    animation: fadeSlideIn 0.45s cubic-bezier(.4,0,.2,1) forwards;
    transition: background 0.2s;
  }
  .faq-item:last-child { border-bottom: none; }
  .faq-item.open { background: #f9fafb; }

  .faq-btn {
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
    .faq-btn { padding: 1.25rem 1.5rem; }
  }
  .faq-btn:hover { background: #f9fafb; }

  .faq-q {
    font-size: 18px;
    font-weight: 700;
    color: #1a2340;
    transition: color 0.2s;
    line-height: 1.4;
  }
  @media (max-width: 768px) {
    .faq-q { font-size: 16px; }
  }
  .faq-item.open .faq-q { color: #08709d; }

  .faq-icon {
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
    .faq-icon { width: 30px; height: 30px; font-size: 20px; }
  }
  .faq-item.open .faq-icon {
    background: #08709d;
    border-color: #08709d;
    color: #fff;
    transform: rotate(45deg);
  }

  .faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(.4,0,.2,1);
  }
  .faq-item.open .faq-body { grid-template-rows: 1fr; }
  .faq-inner { overflow: hidden; }

  .faq-ans {
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
    .faq-ans { margin: 0 1.5rem 1.25rem; font-size: 14px; padding: 0.5rem 1rem; }
  }

  .faq-footer {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 16px;
    color: #4b5563;
    font-weight: 500;
  }
  @media (max-width: 640px) {
    .faq-footer { font-size: 14px; margin-top: 1.5rem; }
  }
  .faq-footer a {
    color: #08709d;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;
  }
  .faq-footer a:hover { border-bottom-color: #08709d; }
`;
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", { className: "faq-section", children: [
    /* @__PURE__ */ jsx("style", { children: styles$1 }),
    /* @__PURE__ */ jsxs("div", { className: "faq-wrap", children: [
      /* @__PURE__ */ jsx("div", { className: "faq-eyebrow", children: "⊙ Common Questions" }),
      /* @__PURE__ */ jsx("h2", { className: "faq-title", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("p", { className: "faq-sub", children: "Find answers to the most common questions about our home healthcare services in Dubai." }),
      /* @__PURE__ */ jsx("div", { className: "faq-list", children: faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `faq-item${isOpen ? " open" : ""}`,
            style: { animationDelay: `${0.05 + i * 0.08}s` },
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "faq-btn",
                  onClick: () => toggle(i),
                  "aria-expanded": isOpen,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "faq-q", children: faq.q }),
                    /* @__PURE__ */ jsx("span", { className: "faq-icon", children: "+" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "faq-body", children: /* @__PURE__ */ jsx("div", { className: "faq-inner", children: /* @__PURE__ */ jsx("div", { className: "faq-ans", children: faq.a }) }) })
            ]
          },
          i
        );
      }) }),
      /* @__PURE__ */ jsxs("p", { className: "faq-footer", children: [
        "Still have questions?",
        " ",
        /* @__PURE__ */ jsx("a", { href: "/book-an-appointment", children: "Contact our support team" })
      ] })
    ] })
  ] }) });
}
const hero2 = "/assets/hero2-CGcT0Wu-.png";
const hero3 = "/assets/hero3-D8_XdO9a.png";
const heroVideo = "/assets/Hero-39ffhsNz.mp4";
const kajalPhoto = "/assets/kajal-BJfwrcdX.png";
const bharatPhoto = "/assets/Bharat-Dg22mokP.png";
const hastiPhoto = "/assets/Hasti-CgTM-Q61.png";
const jasmeenPhoto = "/assets/Jasmeen-BuhWvjRe.png";
const jotiAshokPhoto = "/assets/Joti%20Ashok-Di1vPIZu.png";
const manjuPhoto = "/assets/Manju-D8rnpIRx.png";
const nimeshkaPhoto = "/assets/Nimeshka%20-DUtyw4kf.png";
const nirmalaPhoto = "/assets/Nirmala%20-Bgjy7eMY.png";
const noreliePhoto = "/assets/Norelie-BTX64DN5.png";
const santoshiPhoto = "/assets/Santoshi-DIbLhffY.png";
const vaishaliPhoto = "/assets/Vaishali-BqTOhffn.png";
const farooqPhoto = "/assets/farooq-CZPkacUv.png";
const mamataPhoto = "/assets/mamata-Cr1k0sia.png";
const mariselviPhoto = "/assets/mariselvi%20-BVi84aQ4.png";
const shwetaRakeshPhoto = "/assets/shweta%20Rakesh%20-ss7a-LLp.png";
const shwetaPhoto = "/assets/shweta-D7MY0Ano.png";
const suneelPhoto = "/assets/suneel-DCDV2WUR.png";
const chandaPhoto = "/assets/Chanda%20Kumari-B7Gcckb3.png";
const dipeshPhoto = "/assets/Dipesh-B_fS-igR.png";
const jayaKumariPhoto = "/assets/Jaya%20Kumari%20-Bqr1-kEl.png";
const lakshmiPhoto = "/assets/Lakshmi%20Sundar%20-AFxSf-1t.png";
const mariecrisPhoto = "/assets/Mariecris%20Godinez-Cgbu2EIw.png";
const manasaPhoto = "/assets/manasa%20Vadde-dd4tThKY.png";
const sajiniPhoto = "/assets/sajini%20Babu-C0jsyPQl.png";
const vinayataPhoto = "/assets/vinayata%20m%20-Brpg_4wt.png";
const img1 = "/assets/img1-6YaIQWOv.jpg";
const img2 = "/assets/img2-CoiNiImC.jpg";
const img3 = "/assets/img3-DcNoRYE4.jpg";
const img4 = "/assets/img4-Bg-IJu0b.jpg";
const aboutUsBg = "/assets/About%20us%20-BPTEHA9S.jpg";
const testimonialsData = [
  { name: "Beata Hilger", initial: "B", color: "#e87c2e", time: "a month ago", text: "Outstanding and respectful care for my grandfather in Dubai. The nurses were well-trained, punctual, and extremely patient throughout his recovery.", rating: 5 },
  { name: "Tariq Al-Maktoum", initial: "T", color: "#3a7bd5", time: "2 months ago", text: "Called CORx Healthcare for Doctor on Call at our hotel in Dubai. The DHA licensed doctor arrived in under 30 minutes! Truly impressive 24/7 service.", rating: 5 },
  { name: "Sarah Jenkins", initial: "S", color: "#6b3fa0", time: "3 months ago", text: "Extremely professional home nursing and IV drip therapy. The nurse was very gentle, knowledgeable, and caring. Highly recommended in Dubai!", rating: 5 },
  { name: "Dr. Ahmed Al-Rashid", initial: "A", color: "#2596be", time: "4 months ago", text: "Excellent home physiotherapy service for post-op knee recovery. The therapist was punctual and built a personalized rehab routine that worked wonders.", rating: 5 },
  { name: "Fatima Al-Zahra", initial: "F", color: "#63b158", time: "5 months ago", text: "Quick and painless home lab sample collection in Dubai. Results were sent digitally within 3 hours. Will definitely use CORx Healthcare again!", rating: 5 },
  { name: "Marcus Vance", initial: "M", color: "#c0392b", time: "6 months ago", text: "Top quality elderly home care. The caregiver cared for my mother like family with complete dedication and respect. Thank you CORx Healthcare!", rating: 5 }
];
const GoogleIcon = () => /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 48 48", children: [
  /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" }),
  /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" }),
  /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" }),
  /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" })
] });
const StarRating = ({ count }) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 2, marginBottom: 12 }, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: i < count ? "#f5a623" : "#ddd", children: /* @__PURE__ */ jsx("polygon", { points: "12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" }) }, i)) });
const TestimonialCard = ({ testimonial }) => {
  const [hovered, setHovered] = React.useState(false);
  return /* @__PURE__ */ jsx(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        background: "#ffffff",
        borderRadius: 16,
        padding: "26px 24px 28px",
        minHeight: "220px",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.22)" : "0 6px 24px rgba(0,0,0,0.12)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "between"
      },
      children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
            /* @__PURE__ */ jsx("div", { style: { width: 46, height: 46, borderRadius: "50%", background: testimonial.color, color: "#fff", fontWeight: 700, fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }, children: testimonial.initial }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { style: { fontWeight: 800, fontSize: 15.5, color: "#08709d", lineHeight: 1.25 }, children: testimonial.name }),
              /* @__PURE__ */ jsx("div", { style: { fontSize: 12.5, color: "#777", marginTop: 3 }, children: testimonial.time })
            ] })
          ] }),
          /* @__PURE__ */ jsx(GoogleIcon, {})
        ] }),
        /* @__PURE__ */ jsx(StarRating, { count: testimonial.rating }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: 14.5, color: "#334155", lineHeight: 1.65, margin: 0, fontWeight: 500 }, children: testimonial.text })
      ] })
    }
  );
};
const TestimonialsSection = () => {
  const [visibleCount, setVisibleCount] = React.useState(4);
  const [startIndex, setStartIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const TOTAL_STEPS = Math.max(1, testimonialsData.length - visibleCount + 1);
  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setStartIndex((i) => i + 1 >= TOTAL_STEPS ? 0 : i + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);
  const visible = testimonialsData.slice(startIndex, startIndex + visibleCount);
  const prev = () => setStartIndex((i) => i <= 0 ? TOTAL_STEPS - 1 : i - 1);
  const next = () => setStartIndex((i) => i + 1 >= TOTAL_STEPS ? 0 : i + 1);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: { width: "100%", maxWidth: 1280 },
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 20, width: "100%" }, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: prev,
              style: { flexShrink: 0, width: 46, height: 46, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" },
              onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)",
              onMouseLeave: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)",
              children: /* @__PURE__ */ jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "15,18 9,12 15,6" }) })
            }
          ),
          /* @__PURE__ */ jsx("div", { style: { flex: 1, display: "grid", gridTemplateColumns: `repeat(${visibleCount}, 1fr)`, gap: 20 }, children: visible.map((t) => /* @__PURE__ */ jsx(TestimonialCard, { testimonial: t }, t.name + startIndex)) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: next,
              style: { flexShrink: 0, width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" },
              onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)",
              onMouseLeave: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)",
              children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "9,18 15,12 9,6" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, marginTop: 24, justifyContent: "center" }, children: Array.from({ length: TOTAL_STEPS }).map((_, i) => /* @__PURE__ */ jsx("button", { onClick: () => setStartIndex(i), style: { width: i === startIndex ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === startIndex ? "#fff" : "rgba(255,255,255,0.3)", cursor: "pointer", padding: 0, transition: "all 0.3s" } }, i)) }),
        /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginTop: 32 }, children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://www.google.com/maps/place/CORx+Healthcare/@24.9981035,55.1675379,622m/data=!3m2!1e3!4b1!4m6!3m5!1s0xa6b0036ffadede71:0xff91b5de95976932!8m2!3d24.9981035!4d55.1701128!16s%2Fg%2F11vxqqxt2z?action=write_review",
            target: "_blank",
            rel: "noopener noreferrer",
            style: { display: "inline-block", padding: "14px 48px", background: "#08709d", border: "none", borderRadius: 50, color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s", textDecoration: "none", boxShadow: "0 6px 20px rgba(8, 112, 157, 0.4)" },
            onMouseEnter: (e) => {
              e.currentTarget.style.background = "#065679";
              e.currentTarget.style.transform = "translateY(-2px)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "#08709d";
              e.currentTarget.style.transform = "translateY(0)";
            },
            children: "Leave a Review"
          }
        ) })
      ]
    }
  );
};
const Counter = ({ value, duration = 2, decimals = 0 }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const formatted = latest.toFixed(decimals);
    if (decimals === 0) {
      return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return formatted;
  });
  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: "easeOut" });
    }
  }, [isInView, count, value, duration]);
  return /* @__PURE__ */ jsx(motion.span, { ref: nodeRef, children: rounded });
};
const doctorsData$1 = [
  {
    name: "Jaya Kumari",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-001",
    degree: "DHA Certified Physiotherapist",
    image: jayaKumariPhoto
  },
  {
    name: "Vinayata M. Patel",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-002",
    degree: "DHA Certified Physiotherapist",
    image: vinayataPhoto
  },
  {
    name: "Sehar Bano",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-003",
    degree: "DHA Certified Physiotherapist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Manju Kumari",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-001",
    degree: "DHA Licensed Assistant Nurse",
    image: manjuPhoto
  },
  {
    name: "Chanda Kumari",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-001",
    degree: "Healthcare Assistant",
    image: chandaPhoto
  },
  {
    name: "Shweta Jagmohan",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-002",
    degree: "DHA Licensed Assistant Nurse",
    image: shwetaPhoto
  },
  {
    name: "Dipesh",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-002",
    degree: "Healthcare Assistant",
    image: dipeshPhoto
  },
  {
    name: "Mariecris Godinez",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-003",
    degree: "Healthcare Assistant",
    image: mariecrisPhoto
  },
  {
    name: "Sajini Babu",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-003",
    degree: "DHA Licensed Registered Nurse",
    image: sajiniPhoto
  },
  {
    name: "Lakshmi Sundar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-004",
    degree: "DHA Licensed Registered Nurse",
    image: lakshmiPhoto
  },
  {
    name: "Kajal Jaiswal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-004",
    degree: "Healthcare Assistant",
    image: kajalPhoto
  },
  {
    name: "Marisel Vi.R",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-005",
    degree: "DHA Licensed Assistant Nurse",
    image: mariselviPhoto
  },
  {
    name: "Shweta Rakesh Kumar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-006",
    degree: "DHA Licensed Registered Nurse",
    image: shwetaRakeshPhoto
  },
  {
    name: "Farooq Khalid",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-005",
    degree: "Healthcare Assistant",
    image: farooqPhoto
  },
  {
    name: "Suneel Bahadur",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-006",
    degree: "Health Assistant",
    image: suneelPhoto
  },
  {
    name: "Mamata Regmi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-007",
    degree: "Healthcare Assistant",
    image: mamataPhoto
  },
  {
    name: "Bharat Badwal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-008",
    degree: "Healthcare Assistant",
    image: bharatPhoto
  },
  {
    name: "Nimesh Ka Sewwandi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-009",
    degree: "Healthcare Assistant",
    image: nimeshkaPhoto
  },
  {
    name: "Santoshi Sah",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-010",
    degree: "Healthcare Assistant",
    image: santoshiPhoto
  },
  {
    name: "Nirmala Gharti Magar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-011",
    degree: "Healthcare Assistant",
    image: nirmalaPhoto
  },
  {
    name: "Jasmeen Jassi",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-007",
    degree: "DHA Licensed Assistant Nurse",
    image: jasmeenPhoto
  },
  {
    name: "Vaishali Parashar",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-008",
    degree: "DHA Licensed Assistant Nurse",
    image: vaishaliPhoto
  },
  {
    name: "Joti Ashok",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-009",
    degree: "DHA Licensed Registered Nurse",
    image: jotiAshokPhoto
  },
  {
    name: "Norelie Munar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-012",
    degree: "Healthcare Assistant",
    image: noreliePhoto
  },
  {
    name: "Hasti Rameshbhai",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-010",
    degree: "DHA Licensed Registered Nurse",
    image: hastiPhoto
  },
  {
    name: "Rhodalyn Gonzales",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-013",
    degree: "Health Assistant",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Manasa Vadde",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-014",
    degree: "Healthcare Assistant",
    image: manasaPhoto
  }
];
const HeartMonitor = () => {
  return /* @__PURE__ */ jsxs("div", { className: "relative w-64 h-12 overflow-hidden bg-black/30 rounded-xl border border-white/10 flex items-center px-2 my-6", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08]", style: {
      backgroundImage: "linear-gradient(to right, #2ebd6e 1px, transparent 1px), linear-gradient(to bottom, #2ebd6e 1px, transparent 1px)",
      backgroundSize: "8px 8px"
    } }),
    /* @__PURE__ */ jsxs("svg", { className: "w-full h-full", viewBox: "0 0 200 40", children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M 0,20 L 40,20 L 45,17 L 50,20 L 53,23 L 57,3 L 61,35 L 66,20 L 73,15 L 80,20 L 140,20 L 145,17 L 150,20 L 153,23 L 157,3 L 161,35 L 166,20 L 173,15 L 180,20 L 200,20",
          fill: "none",
          stroke: "#2ebd6e",
          strokeWidth: "1.5",
          strokeOpacity: "0.12"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.path,
        {
          d: "M 0,20 L 40,20 L 45,17 L 50,20 L 53,23 L 57,3 L 61,35 L 66,20 L 73,15 L 80,20 L 140,20 L 145,17 L 150,20 L 153,23 L 157,3 L 161,35 L 166,20 L 173,15 L 180,20 L 200,20",
          fill: "none",
          stroke: "#2ebd6e",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          style: {
            filter: "drop-shadow(0px 0px 4px rgba(46, 189, 110, 0.8))"
          },
          initial: { pathLength: 0 },
          animate: { pathLength: [0, 1] },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }
        }
      )
    ] })
  ] });
};
const Home = () => {
  const slides = [
    {
      badgeNode: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Shield, { size: 16, className: "text-[#2ebd6e] fill-[#2ebd6e]/10" }),
        /* @__PURE__ */ jsx("span", { className: "text-white/95 font-semibold", children: "Trusted Home healthcare services in Dubai" })
      ] }),
      titlePre: "Get Hospital-Quality Care ",
      titleHighlight: "Without Leaving Your Home",
      titlePost: "",
      subtitle: "Looking for trusted home health care services in Dubai, Corx Healthcare is available 24×7 to meet your medical needs anytime. Our team of highly skilled professionals delivers personalized, high-quality care tailored to your unique health requirements, all in the comfort of your home.",
      image: hero1,
      videoUrl: heroVideo,
      cta1: "Book Appointment",
      cta2: "Our Services"
    },
    {
      badgeNode: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Shield, { size: 16, className: "text-[#2ebd6e] fill-[#2ebd6e]/10" }),
        /* @__PURE__ */ jsx("span", { className: "text-white/95", children: "Licensed by" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#2ebd6e] font-black", children: "DHA Dubai" }),
        /* @__PURE__ */ jsx("span", { className: "text-white/95", children: "Authority" })
      ] }),
      titlePre: "Clinical Excellence ",
      titleHighlight: "At Home",
      titlePost: "",
      subtitle: "DHA licensed healthcare provider in Dubai. Full-service home nursing, doctor-on-call, and expert therapy at your convenience.",
      image: hero2,
      videoUrl: heroVideo,
      cta1: "Book Appointment",
      cta2: "Our Services"
    },
    {
      badgeNode: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Users, { size: 16, className: "text-[#2ebd6e] fill-[#2ebd6e]/10" }),
        /* @__PURE__ */ jsx("span", { className: "text-white/95", children: "Expert Medical" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#2ebd6e] font-black", children: "Specialists" }),
        /* @__PURE__ */ jsx("span", { className: "text-white/95", children: "On Call" })
      ] }),
      titlePre: "Professional Care ",
      titleHighlight: "At Your Doorstep",
      titlePost: "",
      subtitle: "Our team of dedicated doctors, nursing professionals, and physiotherapists are committed to your health 24/7.",
      image: hero3,
      videoUrl: heroVideo,
      cta1: "Book Appointment",
      cta2: "Our Services"
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDept, setSelectedDept] = useState("All");
  const [diffImageIndex, setDiffImageIndex] = useState(0);
  useEffect(() => {
    const titleText = "CORX Healthcare: Home Health Care Services in Dubai *24/7";
    const descText = "Get premium home health care services in Dubai with Corx Healthcare. Book expert doctors and nurses for physiotherapy, IV therapy, lab tests & elder care, available 24/7.";
    document.title = titleText;
    const setMetaTag = (attrName, attrVal, contentVal) => {
      let metaElem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!metaElem) {
        metaElem = document.createElement("meta");
        metaElem.setAttribute(attrName, attrVal);
        document.head.appendChild(metaElem);
      }
      metaElem.setAttribute("content", contentVal);
    };
    setMetaTag("name", "description", descText);
    setMetaTag("property", "og:title", titleText);
    setMetaTag("property", "og:description", descText);
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith("/") && window.location.pathname !== "/" ? window.location.pathname.slice(0, -1) : window.location.pathname;
      const origin = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") ? window.location.origin : "https://corx.ae";
      canonicalLink.setAttribute("href", `${origin}${cleanPath}`);
    }
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setDiffImageIndex((prev) => (prev + 1) % 4);
    }, 4e3);
    return () => clearInterval(timer);
  }, []);
  selectedDept === "All" ? doctorsData$1 : doctorsData$1.filter((doc) => doc.department === selectedDept);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8e3);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[95vh] flex items-center py-20 md:py-28 overflow-hidden bg-black", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 w-full h-full overflow-hidden bg-black pointer-events-none", children: [
        /* @__PURE__ */ jsx(
          "video",
          {
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            className: "absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-80",
            children: /* @__PURE__ */ jsx("source", { src: heroVideo, type: "video/mp4" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2] bg-gradient-to-br from-[#0c2e56]/90 via-[#0b2848]/80 to-[#071f3b]/90 mix-blend-multiply pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2] bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2] bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "container relative z-10 text-white", children: [
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 25 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -25 },
            transition: { duration: 0.6, ease: "easeOut" },
            className: "max-w-4xl text-left relative top-0 sm:top-[-35px] md:top-[-80px] py-4 sm:py-0",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "inline-flex items-center text-xs md:text-sm font-semibold tracking-wider mb-3 shadow-md text-white",
                  style: {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    padding: "6px 16px",
                    borderRadius: "30px",
                    border: "1px solid rgba(255, 255, 255, 0.15)"
                  },
                  children: slides[currentSlide].badgeNode
                }
              ),
              /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl md:text-6xl !font-normal leading-[1.15] mb-6 !text-white tracking-tight", children: [
                slides[currentSlide].titlePre,
                /* @__PURE__ */ jsx("span", { className: "text-[#2ebd6e] !font-normal", children: slides[currentSlide].titleHighlight }),
                slides[currentSlide].titlePost
              ] }),
              /* @__PURE__ */ jsx(HeartMonitor, {}),
              /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl font-normal drop-shadow-sm", children: slides[currentSlide].subtitle }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mt-6", children: [
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: "/book-an-appointment",
                    className: "inline-flex items-center gap-2 hover:scale-[1.02] text-white font-semibold text-base transition-all duration-200 cursor-pointer shadow-md",
                    style: {
                      backgroundColor: "#004e92",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      border: "1px solid transparent"
                    },
                    children: [
                      /* @__PURE__ */ jsx(CalendarDays, { size: 20 }),
                      slides[currentSlide].cta1
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "#services",
                    onClick: (e) => {
                      var _a;
                      e.preventDefault();
                      (_a = document.getElementById("services")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "inline-flex items-center gap-2 hover:scale-[1.02] text-white font-semibold text-base transition-all duration-200 cursor-pointer hover:bg-white/10",
                    style: {
                      backgroundColor: "transparent",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      border: "1px solid #ffffff"
                    },
                    children: [
                      /* @__PURE__ */ jsx(Stethoscope, { size: 20 }),
                      slides[currentSlide].cta2
                    ]
                  }
                )
              ] })
            ]
          },
          currentSlide
        ) }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-[1px] bg-white/15 my-8" }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            variants: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.2
                }
              }
            },
            className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 text-left",
            children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: {
                    hidden: { opacity: 0, y: 15, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 120, damping: 14 }
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-3xl md:text-5xl !font-normal !text-white leading-none", children: [
                      /* @__PURE__ */ jsx(Counter, { value: 2546, duration: 2 }),
                      "+"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-white font-medium mt-1", children: "Successful Homecare" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: {
                    hidden: { opacity: 0, y: 15, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 120, damping: 14 }
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-3xl md:text-5xl !font-normal !text-white leading-none", children: [
                      /* @__PURE__ */ jsx(Counter, { value: 1.5, duration: 2, decimals: 1 }),
                      "M+"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-white font-medium mt-1", children: "Happy Patients" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: {
                    hidden: { opacity: 0, y: 15, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 120, damping: 14 }
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-3xl md:text-5xl !font-normal !text-white leading-none", children: [
                      /* @__PURE__ */ jsx(Counter, { value: 15, duration: 2 }),
                      "+"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-white font-medium mt-1", children: "Years Experience" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: {
                    hidden: { opacity: 0, y: 15, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 120, damping: 14 }
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-3xl md:text-5xl !font-normal !text-white leading-none", children: [
                      /* @__PURE__ */ jsx(Counter, { value: 120, duration: 2 }),
                      "+"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-white font-medium mt-1", children: "Professional" })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: prevSlide,
          className: "absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/10 hover:scale-110 active:scale-95 shadow-2xl hidden md:flex items-center justify-center cursor-pointer",
          children: /* @__PURE__ */ jsx(ChevronLeft, { size: 22, strokeWidth: 2.5 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: nextSlide,
          className: "absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/10 hover:scale-110 active:scale-95 shadow-2xl hidden md:flex items-center justify-center cursor-pointer",
          children: /* @__PURE__ */ jsx(ChevronRight, { size: 22, strokeWidth: 2.5 })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5", children: slides.map((_, i) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentSlide(i),
          className: `h-2 transition-all duration-300 rounded-full ${i === currentSlide ? "w-8 bg-[#2ebd6e] shadow-[0_0_8px_rgba(46,189,110,0.5)]" : "w-2 bg-white/30 hover:bg-white/50"}`
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx(ExploreServices, {}),
    /* @__PURE__ */ jsx(ThreeStepsProcessSection, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #08709d 0%, #1a294a 100%)",
          padding: "40px 0"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-20", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: {
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                },
                transition: { duration: 8, repeat: Infinity },
                className: "absolute -top-24 -left-24 w-96 h-96 bg-accent-color rounded-full blur-[100px]"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: {
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1]
                },
                transition: { duration: 10, repeat: Infinity, delay: 2 },
                className: "absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-[100px]"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "container relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-12", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  className: "text-4xl md:text-5xl font-black mb-6 leading-tight text-white",
                  style: { color: "white" },
                  children: "Have Any Question?"
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.p,
                {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: 0.2 },
                  className: "text-white text-lg md:text-xl font-medium max-w-3xl leading-relaxed",
                  style: { color: "rgba(255, 255, 255, 0.9)" },
                  children: [
                    "Call Us 24/7 at ",
                    /* @__PURE__ */ jsx("a", { href: "tel:+97143320776", className: "text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity", children: "☎️ +971 4 332 0776" }),
                    ", ",
                    /* @__PURE__ */ jsx("a", { href: "tel:+971547033311", className: "text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity", children: "📱 +971 54 703 3311" }),
                    ", or ",
                    /* @__PURE__ */ jsx("a", { href: "tel:+971502785990", className: "text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity", children: "📱 +971 50 278 5990" }),
                    " (or WhatsApp Us at ",
                    /* @__PURE__ */ jsx("a", { href: "https://wa.me/97143320776", target: "_blank", rel: "noopener noreferrer", className: "text-white font-normal underline decoration-white underline-offset-4 hover:opacity-80 transition-opacity", children: "+971 4 332 0776" }),
                    ") for doctor on call service."
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                animate: {
                  y: [0, -8, 0],
                  scale: [1, 1.02, 1]
                },
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                className: "relative group",
                children: [
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "/Company-Profile.pdf",
                      download: "Company-Profile.pdf",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "relative overflow-hidden bg-white text-secondary-color rounded-full font-bold uppercase tracking-wider text-sm shadow-xl hover:shadow-white/20 transition-all duration-500 flex items-center gap-3 z-10 hover:-translate-y-1",
                      style: { padding: "18px 45px", color: "#1a294a", backgroundColor: "white" },
                      children: [
                        /* @__PURE__ */ jsx(
                          motion.div,
                          {
                            animate: { left: ["-100%", "200%"] },
                            transition: { duration: 3, repeat: Infinity, ease: "linear" },
                            className: "absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-secondary-color/5 to-transparent -skew-x-12 z-0"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "DOWNLOAD PROFILE" }),
                        /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "relative z-10" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" })
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        style: { backgroundColor: "#f8f9fa", padding: "100px 0" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.1] pointer-events-none z-0 select-none flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "CORx Healthcare Background Watermark Logo", className: "w-full h-full object-contain" }) }),
          /* @__PURE__ */ jsx("div", { className: "container relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-16", children: [
            /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2", children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true },
                variants: {
                  visible: { transition: { staggerChildren: 0.1 } }
                },
                children: [
                  /* @__PURE__ */ jsx(
                    motion.h2,
                    {
                      variants: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
                      className: "text-3xl md:text-4xl font-black mb-10 text-secondary-color tracking-tight",
                      children: "The CHC Difference"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "space-y-10 mb-10", children: [
                    { icon: /* @__PURE__ */ jsx(HandHeart, { size: 32 }), title: "Patient-Centric Care", desc: "We prioritize the needs and preferences of our patients, ensuring they receive personalized care that meets their unique requirements." },
                    { icon: /* @__PURE__ */ jsx(UserCheck, { size: 32 }), title: "Expert Medical Team", desc: "Our team of highly skilled and experienced healthcare professionals is dedicated to providing the highest quality of care." },
                    { icon: /* @__PURE__ */ jsx(ThumbsUp, { size: 32 }), title: "Compassionate Approach", desc: "We believe in treating our patients with empathy, ensuring they feel supported throughout their healthcare journey." },
                    { icon: /* @__PURE__ */ jsx(Clock, { size: 32 }), title: "24/7 Support", desc: "Providing expert medical assistance 24 hours a day, 365 days a year, with same-day appointments available." }
                  ].map((item, i) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      variants: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
                      className: "flex gap-6 group",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-color group-hover:bg-primary-color group-hover:text-white transition-all duration-300 border border-gray-100", children: item.icon }) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-1.5 text-secondary-color", children: item.title }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-relaxed text-[15px] font-medium", children: item.desc })
                        ] })
                      ]
                    },
                    i
                  )) }),
                  /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 20 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      animate: {
                        y: [0, -6, 0],
                        scale: [1, 1.02, 1]
                      },
                      transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      className: "relative group inline-block",
                      children: /* @__PURE__ */ jsxs(
                        Link,
                        {
                          to: "/book-an-appointment",
                          className: "inline-flex items-center gap-2 hover:scale-[1.02] text-white font-semibold text-base transition-all duration-200 cursor-pointer shadow-md",
                          style: {
                            backgroundColor: "#004e92",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            border: "1px solid transparent",
                            color: "#ffffff"
                          },
                          children: [
                            /* @__PURE__ */ jsx(CalendarDays, { size: 20, style: { color: "#ffffff" } }),
                            /* @__PURE__ */ jsx("span", { children: "Schedule An Appointment" })
                          ]
                        }
                      )
                    }
                  ) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2", children: /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                animate: { y: [0, -15, 0] },
                transition: {
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                },
                viewport: { once: true },
                className: "relative",
                children: /* @__PURE__ */ jsx("div", { className: "relative rounded-[30px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-[8px] border-white w-full h-[530px] bg-white p-6", children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-full rounded-[20px] overflow-hidden bg-gray-50", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    src: [img1, img2, img3, img4][diffImageIndex],
                    alt: "CHC Healthcare Difference",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.8 },
                    style: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center"
                    }
                  },
                  diffImageIndex
                ) }) }) })
              }
            ) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-20 px-5 flex flex-col items-center overflow-hidden bg-black bg-cover bg-center",
        style: {
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          backgroundImage: `url(${aboutUsBg})`,
          backgroundPosition: "center 35%"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/65 backdrop-blur-[2px] z-0 pointer-events-none" }),
          /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }, children: [
            /* @__PURE__ */ jsx("h2", { style: { color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }, children: "Testimonials" }),
            /* @__PURE__ */ jsx("p", { style: { color: "rgba(255,255,255,0.68)", fontSize: 15, marginBottom: 24, textAlign: "center", letterSpacing: "0.02em" }, children: "See what people are saying about Complete Healthcare" }),
            /* @__PURE__ */ jsx(TestimonialsSection, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "py-24 bg-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 h-full w-32 z-10 pointer-events-none", style: { background: "linear-gradient(to right, white, transparent)" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 h-full w-32 z-10 pointer-events-none", style: { background: "linear-gradient(to left, white, transparent)" } }),
      /* @__PURE__ */ jsx("div", { className: "container relative z-10 mb-16", children: /* @__PURE__ */ jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8 },
          className: "text-3xl md:text-4xl font-black text-secondary-color uppercase tracking-widest text-center",
          children: "Our Partners"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: { x: ["0%", "-50%"] },
          transition: { duration: 28, repeat: Infinity, ease: "linear" },
          className: "flex items-center gap-16 w-max",
          whileHover: { animationPlayState: "paused" },
          children: [
            partner1,
            partner3,
            partner4,
            partner5,
            partner6,
            partner7,
            partner8,
            partner1,
            partner3,
            partner4,
            partner5,
            partner6,
            partner7,
            partner8
          ].map((imgSrc, index) => /* @__PURE__ */ jsx(
            motion.div,
            {
              whileHover: { scale: 1.12, filter: "grayscale(0%) drop-shadow(0 8px 20px rgba(8,112,157,0.25))" },
              className: "w-32 md:w-40 lg:w-44 flex-shrink-0 transition-all duration-300",
              style: { filter: "grayscale(60%)", opacity: 0.8 },
              children: /* @__PURE__ */ jsx("img", { src: imgSrc, alt: `CORx Healthcare Partner Brand Logo ${index % 7 + 1}`, className: "w-full h-auto object-contain" })
            },
            index
          ))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(FAQ, {})
  ] });
};
const aboutServicesCollage = "/assets/about_services_collage-C2zuua3T.png";
const About = () => {
  React.useEffect(() => {
    document.title = "About Us | CORx Healthcare Dubai";
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith("/") && window.location.pathname !== "/" ? window.location.pathname.slice(0, -1) : window.location.pathname;
      const origin = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") ? window.location.origin : "https://corx.ae";
      canonicalLink.setAttribute("href", `${origin}${cleanPath}`);
    }
  }, []);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "pt-28 pb-20 bg-white min-h-screen text-slate-800 font-sans",
      children: [
        /* @__PURE__ */ jsxs(
          "section",
          {
            className: "relative min-h-[44vh] flex items-center py-16 mb-8 text-white text-center bg-cover bg-center overflow-hidden",
            style: {
              backgroundImage: `url(${aboutUsBg})`,
              backgroundPosition: "center 35%"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/65 backdrop-blur-[2px] z-0" }),
              /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto flex flex-col items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 text-[#08709d] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 font-['Montserrat']", children: "✦ Dubai & UAE Home Healthcare" }),
                /* @__PURE__ */ jsx(
                  "h1",
                  {
                    className: "text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4 uppercase font-['Montserrat']",
                    style: { color: "#08709d" },
                    children: "About Us"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "text-base md:text-xl leading-relaxed mb-6 max-w-2xl font-bold font-['Montserrat']",
                    style: { color: "#08709d" },
                    children: "Delivering DHA-licensed medical services, advanced physical therapy, and skilled nursing care directly to your doorstep in Dubai."
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 text-xs md:text-sm font-semibold", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-extrabold shadow-sm transition-all duration-300 hover:scale-105",
                      style: {
                        color: "#08709d",
                        backgroundColor: "rgba(8, 112, 157, 0.09)",
                        border: "1.5px solid rgba(8, 112, 157, 0.3)",
                        backdropFilter: "blur(12px)",
                        fontFamily: "'Montserrat', sans-serif"
                      },
                      children: [
                        /* @__PURE__ */ jsx(Award, { size: 18, style: { color: "#08709d" } }),
                        /* @__PURE__ */ jsx("span", { children: "100% DHA Licensed" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-extrabold shadow-sm transition-all duration-300 hover:scale-105",
                      style: {
                        color: "#08709d",
                        backgroundColor: "rgba(8, 112, 157, 0.09)",
                        border: "1.5px solid rgba(8, 112, 157, 0.3)",
                        backdropFilter: "blur(12px)",
                        fontFamily: "'Montserrat', sans-serif"
                      },
                      children: [
                        /* @__PURE__ */ jsx(Clock, { size: 18, style: { color: "#08709d" } }),
                        /* @__PURE__ */ jsx("span", { children: "24/7 Availability" })
                      ]
                    }
                  )
                ] })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-white overflow-hidden border-b border-slate-200", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 relative flex items-center justify-center min-h-[360px] md:min-h-[420px]", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute w-72 h-72 bg-[#08709d]/8 rounded-full blur-[90px] pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute w-60 h-60 bg-[#5eb63b]/6 rounded-full blur-[80px] pointer-events-none" }),
            /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-[360px] transition-all duration-500 hover:scale-[1.01]", children: [
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-[28px] border-4 border-white shadow-[0_15px_45px_rgba(8,112,157,0.14)] bg-white", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: aboutServicesCollage,
                  alt: "CORx Healthcare Services",
                  className: "w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                }
              ) }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { x: -15, y: -15 },
                  animate: { y: [-5, 5, -5] },
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  className: "absolute -top-5 -left-5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-lg flex items-center gap-2.5 w-44",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8.5 h-8.5 rounded-xl bg-[#5eb63b]/15 flex items-center justify-center text-[#5eb63b] shrink-0", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 20 }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black text-[#1a294a] leading-none uppercase font-['Montserrat'] mb-0", children: "DHA Certified" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[9px] text-gray-400 font-bold mt-1 mb-0", children: "Licensed Clinicians" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { x: 15, y: 15 },
                  animate: { y: [5, -5, 5] },
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
                  className: "absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-lg flex items-center gap-2.5 w-44",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8.5 h-8.5 rounded-xl bg-[#08709d]/15 flex items-center justify-center text-[#08709d] shrink-0", children: /* @__PURE__ */ jsx(Clock, { size: 20 }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-black text-[#1a294a] leading-none uppercase font-['Montserrat'] mb-0", children: "24/7 Response" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[9px] text-gray-400 font-bold mt-1 mb-0", children: "Doctor On Call" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 text-left space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex bg-[#08709d]/10 border border-[#08709d]/20 text-[#08709d] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider font-['Montserrat']", children: "⊙ Clinical Excellence" }),
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl md:text-4xl font-black text-[#1a294a] tracking-tight leading-tight uppercase font-['Montserrat'] mb-0", children: [
              "Compassionate Care ",
              /* @__PURE__ */ jsx("span", { className: "text-[#08709d]", children: "Where You Need It Most" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-[#08709d] font-bold leading-relaxed font-['Montserrat'] mb-0", children: "CORx Healthcare offers unparalleled home healthcare services, including top-tier physiotherapy, home nursing, compassionate caregivers, and round-the-clock doctor-on-call assistance." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-0", children: "At CORx Healthcare, we recognize the significance of receiving premium medical care within the sanctuary of your own home. Our steadfast team of experts is devoted to delivering unparalleled homecare services, placing your well-being at the forefront, and fostering your autonomy." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5 hover:border-[#08709d]/40 hover:bg-white transition-all duration-300 shadow-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Activity, { size: 20 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-[#1a294a] text-xs font-extrabold uppercase tracking-wide font-['Montserrat'] mb-0", children: "Physiotherapy" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 font-medium mt-1 leading-snug mb-0", children: "Expert in-home rehabilitation for joint, post-surgical, & pain conditions." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5 hover:border-[#08709d]/40 hover:bg-white transition-all duration-300 shadow-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Heart, { size: 20 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-[#1a294a] text-xs font-extrabold uppercase tracking-wide font-['Montserrat'] mb-0", children: "Home Nursing" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 font-medium mt-1 leading-snug mb-0", children: "DHA-licensed clinical care, injection administration, & vitals monitoring." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5 hover:border-[#08709d]/40 hover:bg-white transition-all duration-300 shadow-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Users, { size: 20 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-[#1a294a] text-xs font-extrabold uppercase tracking-wide font-['Montserrat'] mb-0", children: "Caregivers" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 font-medium mt-1 leading-snug mb-0", children: "Compassionate daily assistance & companionships for seniors." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3.5 hover:border-[#08709d]/40 hover:bg-white transition-all duration-300 shadow-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Stethoscope, { size: 20 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-[#1a294a] text-xs font-extrabold uppercase tracking-wide font-['Montserrat'] mb-0", children: "Doctor On Call" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 font-medium mt-1 leading-snug mb-0", children: "24/7 licensed medical diagnostics & physical consultations at home." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 pt-3", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:+971547033311",
                  className: "inline-flex items-center justify-center gap-2.5 rounded-full font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg text-white font-['Montserrat']",
                  style: { padding: "13px 30px", backgroundColor: "#08709d" },
                  children: [
                    /* @__PURE__ */ jsx(Phone, { size: 16 }),
                    /* @__PURE__ */ jsx("span", { children: "Call Us Now" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://wa.me/97143320776",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center gap-2.5 rounded-full font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg text-white font-['Montserrat']",
                  style: { padding: "13px 30px", backgroundColor: "#5eb63b" },
                  children: [
                    /* @__PURE__ */ jsx(MessageSquare, { size: 16 }),
                    /* @__PURE__ */ jsx("span", { children: "WhatsApp Now" })
                  ]
                }
              )
            ] })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-slate-50/70 border-b border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-8 max-w-7xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold shadow-md shrink-0", children: /* @__PURE__ */ jsx(Eye, { size: 24 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-widest text-[#08709d] font-['Montserrat']", children: "Our Guiding Principle" }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "OUR VISION" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 md:p-8 rounded-2xl bg-white border-l-4 border-[#08709d] shadow-sm mb-8", children: /* @__PURE__ */ jsx("p", { className: "text-base md:text-xl font-bold text-[#08709d] font-['Montserrat'] leading-relaxed mb-0", children: '"We are committed to consistently creating and delivering exceptional value for you."' }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#08709d] transition-all flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#08709d]", children: [
                  /* @__PURE__ */ jsx(ShieldCheck, { size: 22, className: "shrink-0" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "Standard for In-Home Healthcare" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0", children: "At Corx Home Healthcare, first and foremost, we are committed to consistently creating and delivering exceptional value for you. With this guiding principle, our vision is to set the standard as the foremost provider of compassionate and tailored healthcare services, delivered within the comfort and convenience of our patients’ homes." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#08709d]", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Tailored & Compassionate Care" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#08709d] transition-all flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#08709d]", children: [
                  /* @__PURE__ */ jsx(HeartHandshake, { size: 22, className: "shrink-0" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "Elevating Quality of Life & Dignity" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0", children: "Through this commitment, we are dedicated to elevating the quality of life for our patients by delivering comprehensive, dependable, and expert care. In doing so, we actively foster independence, promote overall wellness, and preserve personal dignity at every stage of care." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#08709d]", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Independence & Dignity" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#08709d] transition-all flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#08709d]", children: [
                  /* @__PURE__ */ jsx(Sparkles, { size: 22, className: "shrink-0" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "Surpassing Patient Expectations" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0", children: "Furthermore, supported by our skilled and devoted team, we continuously aspire to surpass the expectations of our patients and their families. As a result, we aim to positively influence not only health outcomes but also overall happiness and peace of mind." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#08709d]", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Happiness & Peace of Mind" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#08709d] transition-all flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#08709d]", children: [
                  /* @__PURE__ */ jsx(Compass, { size: 22, className: "shrink-0" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "Nature & Innovative Experiences" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0", children: "Additionally, and beyond traditional healthcare, we seek to become the top choice for outdoor enthusiasts looking for extraordinary nightlife experiences that transcend conventional boundaries. By combining innovation with nature, we remain committed to offering unparalleled adventures and creating unforgettable moments, all while embracing the beauty of the natural environment." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#08709d]", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Innovation & Unparalleled Adventures" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 rounded-2xl bg-[#08709d] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-black uppercase font-['Montserrat'] text-white mb-0", children: "Experience Our Vision In Action" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-sky-100 font-medium mb-0 mt-1", children: "Book a personalized DHA-licensed home consultation in Dubai." })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://wa.me/97143320776",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-2 bg-white text-[#08709d] hover:bg-sky-50 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow transition-all shrink-0 font-['Montserrat']",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Book Now" }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "py-16 bg-white border-b border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-8 max-w-7xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#5eb63b] text-white flex items-center justify-center font-bold shadow-md shrink-0", children: /* @__PURE__ */ jsx(Target, { size: 24 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-widest text-[#5eb63b] font-['Montserrat']", children: "Our Core Objective" }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "OUR MISSION" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 md:p-8 rounded-2xl bg-emerald-50/80 border-l-4 border-[#5eb63b] shadow-sm mb-8", children: /* @__PURE__ */ jsx("p", { className: "text-base md:text-xl font-bold text-[#3d8322] font-['Montserrat'] leading-relaxed mb-0", children: '"Our mission is to elevate health and well-being by delivering unparalleled comprehensive healthcare."' }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#5eb63b] transition-all flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#5eb63b]", children: [
                  /* @__PURE__ */ jsx(Building2, { size: 22, className: "shrink-0" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "National Leader Based in Dubai & UAE" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0", children: "At Corx Home Healthcare, first and foremost, our mission is to elevate health and overall well-being by delivering unparalleled, comprehensive healthcare solutions. With this clear commitment at our core, we not only strive for excellence but also stand as a national leader dedicated to enriching lives and providing optimal care for your loved ones. Based in Dubai, United Arab Emirates, we therefore proudly serve individuals across Dubai and the wider UAE as a trusted and dependable home healthcare provider." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#5eb63b]", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Dubai & UAE Coverage" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#5eb63b] transition-all flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#5eb63b]", children: [
                  /* @__PURE__ */ jsx(Stethoscope, { size: 22, className: "shrink-0" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "Physician-Guided Clinical Team" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0", children: "Through a carefully integrated and patient-centric approach, we consistently deliver comprehensive home healthcare services led by a highly skilled, physician-guided clinical team. In particular, we focus on supporting patients who prefer the comfort of their own homes for treatment, recovery, and rehabilitation. In doing so, we ensure continuity of care, promote familiarity, and preserve dignity throughout their daily lives." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#5eb63b]", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Patient-Centric Continuity" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#5eb63b] transition-all flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#5eb63b]", children: [
                  /* @__PURE__ */ jsx(Shield, { size: 22, className: "shrink-0" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "Continuous Quality & Patient Safety" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0", children: "Recognizing, above all, that there truly is no place like home, we continuously prioritize quality improvement initiatives. Consequently, we enhance patient safety, increase satisfaction, and support long-term health outcomes, while simultaneously maintaining the highest standards of care within a familiar and reassuring environment." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#5eb63b]", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "Safety & Reassuring Care" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#5eb63b] transition-all flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#5eb63b]", children: [
                  /* @__PURE__ */ jsx(Globe, { size: 22, className: "shrink-0" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-black text-[#1a294a] uppercase font-['Montserrat'] mb-0", children: "24/7 Access & GCC Regional Benchmarks" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-xs md:text-sm leading-relaxed font-normal mb-0", children: "Moreover, our overarching goal is to provide round-the-clock access to premier healthcare services. By doing so, we consistently deliver exceptional clinical outcomes and, at the same time, set new benchmarks in patient experience across home care, corporate healthcare, and on-demand medical services not only in the UAE but across the entire GCC region." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-[#5eb63b]", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                /* @__PURE__ */ jsx("span", { children: "GCC Regional Benchmarks" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 rounded-2xl bg-[#5eb63b] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-black uppercase font-['Montserrat'] text-white mb-0", children: "Join Our Mission Of Excellence" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-emerald-100 font-medium mb-0 mt-1", children: "Contact our clinical team for 24/7 medical services." })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://wa.me/97143320776",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-2 bg-white text-[#3d8322] hover:bg-emerald-50 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow transition-all shrink-0 font-['Montserrat']",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Book Now" }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
                ]
              }
            )
          ] })
        ] }) })
      ]
    }
  );
};
const Locations = () => {
  React.useEffect(() => {
    document.title = "Our Locations & Service Areas in Dubai | CORx Healthcare";
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith("/") && window.location.pathname !== "/" ? window.location.pathname.slice(0, -1) : window.location.pathname;
      const origin = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") ? window.location.origin : "https://corx.ae";
      canonicalLink.setAttribute("href", `${origin}${cleanPath}`);
    }
  }, []);
  const regions = [
    {
      name: "Dubai Headquarters",
      offices: [
        {
          name: "Main Office - Royal Class",
          phones: ["+971 4 332 0776", "+971 54 703 3311", "+971 50 278 5990"],
          address: "Office 303, Royal Class Building, Dubai Investment Park (DIP), Dubai, UAE",
          hours: "24/7 Home Services Available"
        }
      ]
    },
    {
      name: "Coverage Areas",
      offices: [
        { name: "Dubai Marina & JBR", desc: "Rapid 30-45min Response Time", address: "Full Home Care Coverage" },
        { name: "Downtown & Business Bay", desc: "Priority Clinical Support", address: "Full Home Care Coverage" },
        { name: "Palm Jumeirah", desc: "Concierge Medical Services", address: "Full Home Care Coverage" },
        { name: "Jumeirah & Umm Suqeim", desc: "Expert Nursing & Physio", address: "Full Home Care Coverage" },
        { name: "Mirdif & Al Khawaneej", desc: "Family Health Support", address: "Full Home Care Coverage" },
        { name: "DIP & Jebel Ali", desc: "Local Service Hub", address: "Full Home Care Coverage" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("div", { style: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    background: "linear-gradient(135deg, #2c3e8c 0%, #1a2a6c 50%, #23379b 100%)",
    minHeight: "100vh",
    paddingTop: "120px",
    position: "relative",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsx("div", { style: {
      position: "absolute",
      inset: 0,
      opacity: 0.06,
      backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      pointerEvents: "none"
    } }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: { scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] },
        transition: { duration: 10, repeat: Infinity },
        style: {
          position: "absolute",
          bottom: "-5%",
          left: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10 pb-20", children: [
      /* @__PURE__ */ jsxs("div", { style: { maxWidth: 800, marginBottom: 80 }, children: [
        /* @__PURE__ */ jsxs(
          motion.h1,
          {
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.8 },
            style: {
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 24
            },
            children: [
              "Care Delivered ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { style: { color: "rgba(255,255,255,0.4)" }, children: "Across Dubai." })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.2 },
            style: {
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
              fontWeight: 400
            },
            children: "With our central hub in DIP and rapid response teams stationed throughout the city, premium medical care is never more than a phone call away."
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          style: {
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "40px",
            borderRadius: "32px",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: typeof window !== "undefined" && window.innerWidth < 768 ? "column" : "row",
            alignItems: "center",
            gap: 32,
            marginBottom: 100
          },
          children: [
            /* @__PURE__ */ jsx("div", { style: {
              background: "#fff",
              color: "#1a2a6c",
              padding: "24px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }, children: /* @__PURE__ */ jsx(Clock, { size: 40 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { style: { color: "#fff", fontSize: 24, fontWeight: 900, marginBottom: 12, textTransform: "uppercase" }, children: "24/7 Home Care Availability" }),
              /* @__PURE__ */ jsx("p", { style: { color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.6 }, children: "Our medical teams are strategically located across Dubai to ensure rapid response times, bringing clinical excellence directly to your sanctuary, day or night." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "space-y-24", children: regions.map((region, rIdx) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            style: { display: "flex", alignItems: "center", gap: 20, marginBottom: 40 },
            children: [
              /* @__PURE__ */ jsx("div", { style: { color: "#fff", background: "rgba(255,255,255,0.1)", p: 12, borderRadius: 16 }, children: region.name === "Dubai Headquarters" ? /* @__PURE__ */ jsx(MapPin, { size: 28 }) : /* @__PURE__ */ jsx(Globe, { size: 28 }) }),
              /* @__PURE__ */ jsx("h2", { style: { color: "#fff", fontSize: 28, fontWeight: 900, textTransform: "uppercase" }, children: region.name })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24
        }, children: region.offices.map((office, oIdx) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: oIdx * 0.1 },
            whileHover: { y: -8 },
            style: {
              background: "#fff",
              borderRadius: "32px",
              padding: "40px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            },
            children: [
              /* @__PURE__ */ jsx("h3", { style: { fontSize: 20, fontWeight: 900, color: "#1a2a6c", marginBottom: 24 }, children: office.name }),
              /* @__PURE__ */ jsxs("div", { style: { flexGrow: 1, marginBottom: 32 }, children: [
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, marginBottom: 20 }, children: [
                  /* @__PURE__ */ jsx(MapPin, { size: 20, style: { color: "#63b158", flexShrink: 0, marginTop: 4 } }),
                  /* @__PURE__ */ jsx("p", { style: { fontSize: 14, color: "#555", lineHeight: 1.6 }, children: office.address })
                ] }),
                office.phones ? /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, marginBottom: 20 }, children: [
                  /* @__PURE__ */ jsx(Phone, { size: 20, style: { color: "#63b158", flexShrink: 0, marginTop: 4 } }),
                  /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: office.phones.map((p) => /* @__PURE__ */ jsx("a", { href: `tel:${p.replace(/\s/g, "")}`, style: { fontSize: 16, fontWeight: 800, color: "#1a2a6c", textDecoration: "none" }, children: p }, p)) })
                ] }) : office.desc && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, marginBottom: 20 }, children: [
                  /* @__PURE__ */ jsx(ShieldCheck, { size: 20, style: { color: "#2596be", flexShrink: 0, marginTop: 4 } }),
                  /* @__PURE__ */ jsx("p", { style: { fontSize: 14, fontWeight: 700, color: "#2596be" }, children: office.desc })
                ] }),
                office.hours && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16 }, children: [
                  /* @__PURE__ */ jsx(Clock, { size: 20, style: { color: "#e87c2e", flexShrink: 0, marginTop: 4 } }),
                  /* @__PURE__ */ jsx("p", { style: { fontSize: 12, fontWeight: 800, color: "#e87c2e", textTransform: "uppercase", letterSpacing: "0.1em" }, children: office.hours })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.02, background: "#1a2a6c", color: "#fff" },
                  whileTap: { scale: 0.98 },
                  style: {
                    background: "#f8f9fa",
                    color: "#1a2a6c",
                    border: "none",
                    padding: "16px",
                    borderRadius: "16px",
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "all 0.3s"
                  },
                  children: [
                    "GET DIRECTIONS ",
                    /* @__PURE__ */ jsx(Navigation, { size: 16 })
                  ]
                }
              )
            ]
          },
          office.name
        )) })
      ] }, region.name)) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          style: {
            marginTop: 100,
            height: 400,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "40px",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 40
          },
          children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(MapPin, { size: 60, style: { color: "rgba(255,255,255,0.2)", marginBottom: 24 } }),
            /* @__PURE__ */ jsx("h3", { style: { color: "#fff", fontSize: 24, fontWeight: 900, textTransform: "uppercase", marginBottom: 12 }, children: "Interactive Coverage Map" }),
            /* @__PURE__ */ jsx("p", { style: { color: "rgba(255,255,255,0.4)", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase" }, children: "Integration in Progress" })
          ] })
        }
      )
    ] })
  ] });
};
const PhoneIcon = () => /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.59-.59a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" }) });
const EmailIcon = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
  /* @__PURE__ */ jsx("polyline", { points: "22,6 12,13 2,6" })
] });
const LocationIcon = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" }),
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
] });
const SendIcon = () => /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
  /* @__PURE__ */ jsx("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
] });
const FacebookIcon = () => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" }) });
const InstagramIcon = () => /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }),
  /* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" }),
  /* @__PURE__ */ jsx("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
] });
const LinkedInIcon = () => /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: [
  /* @__PURE__ */ jsx("path", { d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" }),
  /* @__PURE__ */ jsx("circle", { cx: "4", cy: "4", r: "2" })
] });
const ClockIcon = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx("polyline", { points: "12 6 12 12 16 14" })
] });
const faqData = [
  {
    question: "What services does Corx Home Healthcare offer?",
    answer: "Corx Home Healthcare provides a wide range of services including physiotherapy, nursing care, medical equipment rental, wound care, and medication management, among others."
  },
  {
    question: "Who can benefit from Corx Home Healthcare Services?",
    answer: "Our services cater to individuals of all ages who require healthcare assistance in the comfort of their own homes. This includes seniors, individuals recovering from surgery, those with chronic illnesses, and anyone in need of rehabilitation."
  },
  {
    question: "How can I request services from Corx Home Healthcare?",
    answer: "You can request our services by contacting us via phone at +971547033311 or by filling out the contact form on our website. Our team will promptly assess your needs and schedule a visit."
  },
  {
    question: "Are your caregivers trained and certified?",
    answer: "Yes, all our caregivers are highly trained, certified professionals with experience in their respective fields. We ensure that they undergo rigorous training and background checks to provide the highest quality care."
  },
  {
    question: "What are your service hours?",
    answer: "Corx Home Healthcare operates 24 hours a day, 7 days a week, including holidays. We understand that healthcare needs can arise at any time, and our team is dedicated to being there for you whenever you need us."
  },
  {
    question: "How do I pay for Corx Home Healthcare services?",
    answer: "We accept various payment methods including cash, credit/debit cards, and bank transfers. We also work with insurance providers for direct billing whenever possible. Our team will provide you with detailed payment options and assist you with any billing inquiries."
  }
];
function Contact() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [servicesList, setServicesList] = useState([
    "Home Physiotherapy",
    "IV Therapy / IV Drip at Home",
    "Home Nursing Care",
    "Doctor On Call (24/7 Home Doctor)",
    "Elderly Care Givers",
    "Lab Test At Home",
    "Post-Surgery Home Care",
    "Wound Care & Dressing",
    "Medication Management"
  ]);
  useEffect(() => {
    const titleText = "Book an Appointment | Home Nursing | Home Physiotherapy Dubai";
    const descText = "Book an appointment with Corx Home Healthcare in Dubai for personalized home care services — schedule doctor visits, nursing, lab tests";
    document.title = titleText;
    const setMetaTag = (attrName, attrVal, contentVal) => {
      let metaElem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!metaElem) {
        metaElem = document.createElement("meta");
        metaElem.setAttribute(attrName, attrVal);
        document.head.appendChild(metaElem);
      }
      metaElem.setAttribute("content", contentVal);
    };
    setMetaTag("name", "description", descText);
    setMetaTag("property", "og:title", titleText);
    setMetaTag("property", "og:description", descText);
    setMetaTag("property", "twitter:title", titleText);
    setMetaTag("property", "twitter:description", descText);
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith("/") && window.location.pathname !== "/" ? window.location.pathname.slice(0, -1) : window.location.pathname;
      const origin = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") ? window.location.origin : "https://corx.ae";
      canonicalLink.setAttribute("href", `${origin}${cleanPath}`);
    }
  }, []);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services/`).then((res) => res.ok ? res.json() : null).then((data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        const titles = data.map((s) => s.title).filter(Boolean);
        if (titles.length > 0) {
          setServicesList(Array.from(new Set(titles)));
        }
      }
    }).catch(() => {
    });
  }, []);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    city: "",
    phone: "",
    serviceType: "",
    message: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    alert("Message sent! We'll be in touch soon.");
  };
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return /* @__PURE__ */ jsxs("div", { style: styles.page, children: [
    /* @__PURE__ */ jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsx("p", { style: styles.tagline, children: "GET IN TOUCH" }),
      /* @__PURE__ */ jsx("h1", { style: styles.title, children: "We're Here for You" }),
      /* @__PURE__ */ jsxs("p", { style: styles.subtitle, children: [
        "Whether you need a consultation or have a question about our orthopedic services,",
        /* @__PURE__ */ jsx("br", {}),
        "reach out to us."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxs("div", { style: styles.leftPanel, children: [
        /* @__PURE__ */ jsxs("div", { style: styles.contactCard, children: [
          /* @__PURE__ */ jsx("div", { style: styles.iconWrap, children: /* @__PURE__ */ jsx(PhoneIcon, {}) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { style: styles.cardLabel, children: "Emergency" }),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }, children: [
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
                /* @__PURE__ */ jsx("a", { href: "tel:+97143320776", style: styles.cardLink, children: "☎️ +971 4 332 0776" }),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "https://wa.me/97143320776",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      color: "#22c55e",
                      fontWeight: "700",
                      textDecoration: "none",
                      background: "#f0fdf4",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      transition: "all 0.2s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "#dcfce7";
                      e.currentTarget.style.transform = "scale(1.05)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "#f0fdf4";
                      e.currentTarget.style.transform = "scale(1)";
                    },
                    children: [
                      /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
                      "WhatsApp"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("a", { href: "tel:+971547033311", style: styles.cardLink, children: "📱 +971 54 703 3311" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+971502785990", style: styles.cardLink, children: "📱 +971 50 278 5990" })
            ] }),
            /* @__PURE__ */ jsx("p", { style: styles.cardSub, children: "Call us 24/7 for immediate medical aid" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.contactCard, children: [
          /* @__PURE__ */ jsx("div", { style: { ...styles.iconWrap, color: "#5eb63b" }, children: /* @__PURE__ */ jsx(LocationIcon, {}) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { style: styles.cardLabel, children: "Address" }),
            /* @__PURE__ */ jsx("p", { style: styles.cardText, children: "Office 303, Royal Class Building" }),
            /* @__PURE__ */ jsx("p", { style: styles.cardSub, children: "DIP, Dubai, United Arab Emirates" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.contactCard, children: [
          /* @__PURE__ */ jsx("div", { style: styles.iconWrap, children: /* @__PURE__ */ jsx(EmailIcon, {}) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { style: styles.cardLabel, children: "Email & Website" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:info@corx.ae", style: styles.cardLink, children: "info@corx.ae" }),
            /* @__PURE__ */ jsx("a", { href: "https://www.corx.ae", target: "_blank", rel: "noopener noreferrer", style: { ...styles.cardLink, display: "block" }, children: "www.corx.ae" }),
            /* @__PURE__ */ jsx("p", { style: styles.cardSub, children: "Online support & information" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.contactCard, children: [
          /* @__PURE__ */ jsx("div", { style: styles.iconWrap, children: /* @__PURE__ */ jsx(ClockIcon, {}) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { style: styles.cardLabel, children: "Working Hours" }),
            /* @__PURE__ */ jsx("p", { style: styles.cardText, children: "Mon-Sat: 8:00 - 17:00" }),
            /* @__PURE__ */ jsx("p", { style: { ...styles.cardSub, color: "#dc2626", fontWeight: "700" }, children: "Sunday: Emergency Only" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.socialSection, children: [
          /* @__PURE__ */ jsx("p", { style: styles.socialLabel, children: "Connect with Us" }),
          /* @__PURE__ */ jsx("div", { style: styles.socialIcons, children: [
            { Icon: FacebookIcon, url: "https://www.facebook.com/corxhealthcare", label: "Facebook" },
            { Icon: LinkedInIcon, url: "https://www.linkedin.com/company/corx-healthcare/", label: "LinkedIn" },
            { Icon: InstagramIcon, url: "https://www.instagram.com/corx_healthcare", label: "Instagram" }
          ].map(({ Icon, url, label }, i) => /* @__PURE__ */ jsx(
            motion.a,
            {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
              style: styles.socialBtn,
              whileHover: { y: -4, scale: 1.12, borderColor: "#08709d", color: "#08709d" },
              whileTap: { scale: 0.95 },
              "aria-label": label,
              children: /* @__PURE__ */ jsx(Icon, {})
            },
            i
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.formCard, children: [
        /* @__PURE__ */ jsx("h2", { style: styles.formTitle, children: "Send Us a Message" }),
        /* @__PURE__ */ jsxs("div", { style: styles.formRow, children: [
          /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
            /* @__PURE__ */ jsx("label", { style: styles.label, children: "Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                style: styles.input,
                name: "fullName",
                placeholder: "John Doe",
                value: formData.fullName,
                onChange: handleChange
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
            /* @__PURE__ */ jsx("label", { style: styles.label, children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                style: styles.input,
                name: "email",
                placeholder: "john@example.com",
                value: formData.email,
                onChange: handleChange
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.formRow, children: [
          /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
            /* @__PURE__ */ jsx("label", { style: styles.label, children: "City" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                style: styles.input,
                name: "city",
                placeholder: "Dubai",
                value: formData.city,
                onChange: handleChange
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
            /* @__PURE__ */ jsx("label", { style: styles.label, children: "Phone Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                style: styles.input,
                name: "phone",
                placeholder: "+971 55 000 0000",
                value: formData.phone,
                onChange: handleChange
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.formGroupFull, children: [
          /* @__PURE__ */ jsx("label", { style: styles.label, children: "Service Type" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              style: styles.input,
              name: "serviceType",
              value: formData.serviceType,
              onChange: handleChange,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a service" }),
                servicesList.map((serviceName, idx) => /* @__PURE__ */ jsx("option", { value: serviceName, children: serviceName }, idx))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.formGroupFull, children: [
          /* @__PURE__ */ jsx("label", { style: styles.label, children: "Message" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              style: { ...styles.input, height: "110px", resize: "vertical" },
              name: "message",
              placeholder: "How can we help you?",
              value: formData.message,
              onChange: handleChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            style: styles.submitBtn,
            onClick: handleSubmit,
            whileHover: { y: -3, boxShadow: "0 10px 30px rgba(8, 112, 157, 0.35)", background: "#5eb63b" },
            whileTap: { scale: 0.97 },
            children: [
              /* @__PURE__ */ jsx(SendIcon, {}),
              "Send Message"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.faqSection, children: [
      /* @__PURE__ */ jsx("div", { style: styles.faqEyebrow, children: "⊙ Common Questions" }),
      /* @__PURE__ */ jsx("h2", { style: styles.faqTitle, children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("p", { style: styles.faqSub, children: "Find answers to the most common questions about booking your appointments and home healthcare visits in Dubai." }),
      /* @__PURE__ */ jsx("div", { style: styles.faqList, children: faqData.map((item, index) => {
        const isOpen = activeIndex === index;
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            layout: "position",
            style: {
              background: "transparent",
              border: isOpen ? "1.5px solid #2563eb" : "1.5px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "12px",
              transition: "border-color 0.3s ease"
            },
            whileHover: {
              borderColor: isOpen ? "#2563eb" : "#cbd5e1"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => toggleFaq(index),
                  "aria-expanded": isOpen,
                  style: {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#0f172a",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    fontWeight: 700,
                    gap: "16px"
                  },
                  children: [
                    /* @__PURE__ */ jsx("span", { children: item.question }),
                    /* @__PURE__ */ jsx(
                      motion.span,
                      {
                        animate: { rotate: isOpen ? 180 : 0 },
                        transition: { duration: 0.3, ease: "easeInOut" },
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isOpen ? "#2563eb" : "#64748b",
                          flexShrink: 0
                        },
                        children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  transition: { duration: 0.3, ease: "easeInOut" },
                  children: /* @__PURE__ */ jsx("div", { style: {
                    padding: "0 20px 20px 20px",
                    color: "#475569",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    fontWeight: 500
                  }, children: item.answer })
                }
              ) })
            ]
          },
          index
        );
      }) })
    ] })
  ] });
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px 24px 60px",
    boxSizing: "border-box"
  },
  header: {
    textAlign: "center",
    marginBottom: "16px"
  },
  tagline: {
    color: "#08709d",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "6px",
    fontFamily: "'Montserrat', sans-serif"
  },
  title: {
    fontSize: "clamp(32px, 6vw, 50px)",
    fontWeight: "800",
    color: "#1a294a",
    margin: "0 0 10px",
    fontFamily: "'Montserrat', sans-serif"
  },
  subtitle: {
    color: "#4b5563",
    fontSize: "17px",
    lineHeight: "1.7",
    maxWidth: "540px",
    margin: "0 auto",
    fontFamily: "'Poppins', sans-serif"
  },
  content: {
    display: "flex",
    gap: "32px",
    maxWidth: "1150px",
    margin: "0 auto",
    flexWrap: "wrap"
  },
  leftPanel: {
    flex: "1 1 320px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  contactCard: {
    background: "linear-gradient(135deg, #f0f7fd 0%, #e4f1f9 100%)",
    borderRadius: "12px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    border: "1px solid #cbe3f5",
    boxShadow: "0 4px 15px rgba(8, 112, 157, 0.06)"
  },
  iconWrap: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#ffffff",
    color: "#08709d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "2px",
    boxShadow: "0 2px 8px rgba(8, 112, 157, 0.12)"
  },
  cardLabel: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#08709d",
    margin: "0 0 4px",
    fontFamily: "'Montserrat', sans-serif"
  },
  cardLink: {
    color: "#08709d",
    fontSize: "15px",
    margin: "0 0 2px",
    fontWeight: "500",
    fontFamily: "'Poppins', sans-serif"
  },
  cardText: {
    color: "#1a294a",
    fontSize: "15px",
    margin: "0 0 2px",
    fontFamily: "'Poppins', sans-serif"
  },
  cardSub: {
    color: "#4b5563",
    fontSize: "13.5px",
    margin: "0",
    fontFamily: "'Poppins', sans-serif"
  },
  socialSection: {
    marginTop: "8px",
    paddingLeft: "4px"
  },
  socialLabel: {
    fontWeight: "600",
    fontSize: "16px",
    color: "#1a294a",
    marginBottom: "12px",
    fontFamily: "'Montserrat', sans-serif"
  },
  socialIcons: {
    display: "flex",
    gap: "10px"
  },
  socialBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1.5px solid #e5e7eb",
    background: "#fff",
    color: "#1a294a",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  },
  formCard: {
    flex: "1 1 480px",
    background: "linear-gradient(135deg, #f0f7fd 0%, #e4f1f9 100%)",
    borderRadius: "16px",
    padding: "36px 32px",
    border: "1px solid #cbe3f5",
    boxShadow: "0 10px 30px rgba(8, 112, 157, 0.08)"
  },
  formTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#08709d",
    margin: "0 0 24px",
    fontFamily: "'Montserrat', sans-serif"
  },
  formRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    flexWrap: "wrap"
  },
  formGroup: {
    flex: "1 1 140px",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  formGroupFull: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "16px"
  },
  label: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#0f3c5c",
    fontFamily: "'Montserrat', sans-serif"
  },
  input: {
    border: "1.5px solid #cbe3f5",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "16px",
    color: "#1a294a",
    background: "#ffffff",
    outline: "none",
    fontFamily: "'Poppins', sans-serif",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.2s ease"
  },
  submitBtn: {
    width: "100%",
    padding: "16px",
    background: "#08709d",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "8px",
    fontFamily: "'Montserrat', sans-serif",
    transition: "all 0.3s ease"
  },
  faqSection: {
    width: "100%",
    maxWidth: "800px",
    margin: "80px auto 0",
    fontFamily: "inherit"
  },
  faqEyebrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#08709d",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "10px",
    fontFamily: "'Montserrat', sans-serif"
  },
  faqTitle: {
    fontSize: "clamp(22px, 3.5vw, 30px)",
    fontWeight: "800",
    color: "#1a294a",
    textAlign: "center",
    margin: "0 0 10px 0",
    fontFamily: "'Montserrat', sans-serif"
  },
  faqSub: {
    fontSize: "14px",
    color: "#4b5563",
    textAlign: "center",
    maxWidth: "560px",
    margin: "0 auto 36px",
    lineHeight: "1.6",
    fontFamily: "'Poppins', sans-serif"
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  }
};
const DUMMY_IMAGE = "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?q=80&w=800&auto=format&fit=crop";
const slugifyTitle = (title) => {
  if (!title) return "";
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
};
const articles = [
  {
    id: 1,
    slug: "alignment-concept-total-knee-replacement",
    tag: "KNEE-REPLACEMENT",
    title: "Alignment concept: Total Knee Replacement",
    excerpt: "alignment-concept-total-knee-replacement",
    author: "Dr. Ulhas Sonar",
    date: "2026-05-30",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    slug: "evolution-of-tkr-implants",
    tag: "TKR IMPLANTS",
    title: "The Evolution of TKR Implants",
    excerpt: "The Evolution of TKR Implants Advancing Toward Precision and Performance Total Knee Replacement (TKR) implants have come a lon…",
    author: "Dr. Ulhas Sonar",
    date: "2026-05-30",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    slug: "steps-in-total-knee-replacement",
    tag: "TOTAL KNEE REPLACEMENT (TKR)",
    title: "Steps in Total Knee Replacement",
    excerpt: "Steps in Total Knee Replacement A Surgical Overview by Dr. Ulhas Sonar Total Knee Replacement (TKR) is a complex yet…",
    author: "Dr. Ulhas Sonar",
    date: "2026-05-30",
    image: DUMMY_IMAGE
  },
  {
    id: 4,
    slug: "post-surgical-kinematic-alignment-in-tkr",
    tag: "KNEE-REPLACEMENT",
    title: "Post-Surgical Kinematic Alignment in TKR",
    excerpt: "Understanding kinematic alignment techniques to preserve ligament balance and natural joint motion for knee replacement patients.",
    author: "Dr. Ulhas Sonar",
    date: "2026-06-14",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    slug: "patient-specific-implants-3d-precision",
    tag: "TKR IMPLANTS",
    title: "Patient-Specific Implants & 3D Precision",
    excerpt: "Discover how 3D anatomical modeling and patient-specific TKR implant designs improve longevity and patient comfort.",
    author: "Dr. Ulhas Sonar",
    date: "2026-06-25",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    slug: "recovery-timeline-rehabilitation-milestones",
    tag: "TOTAL KNEE REPLACEMENT (TKR)",
    title: "Recovery Timeline & Rehabilitation Milestones",
    excerpt: "A complete guide to post-operative knee recovery, milestone achievements, home nursing support, and physical therapy exercises.",
    author: "Dr. Ulhas Sonar",
    date: "2026-07-02",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=800&auto=format&fit=crop"
  }
];
function ArticleCard({ article }) {
  const [isHovered, setIsHovered] = useState(false);
  const targetSlug = article.slug || slugifyTitle(article.title) || article.id;
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: `/blog/${targetSlug}`,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      style: {
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow: isHovered ? "0 16px 32px rgba(37, 99, 235, 0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: isHovered ? "translateY(-6px)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        color: "inherit"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", height: "200px", width: "100%", backgroundColor: "#f1f5f9", overflow: "hidden" }, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: article.image,
              alt: article.title,
              style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: isHovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.5s ease"
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            "span",
            {
              style: {
                position: "absolute",
                top: "12px",
                left: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "#2563eb",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.05em",
                padding: "5px 12px",
                borderRadius: "9999px",
                textTransform: "uppercase",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [
                /* @__PURE__ */ jsx(Tag, { size: 10, style: { color: "#2563eb" } }),
                article.tag
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "24px", display: "flex", flexDirection: "column", flex: 1 }, children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              style: {
                fontSize: "18px",
                fontWeight: "700",
                color: isHovered ? "#2563eb" : "#0f172a",
                lineHeight: "1.4",
                marginBottom: "10px",
                transition: "color 0.2s ease"
              },
              children: article.title
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              style: {
                fontSize: "14px",
                color: "#64748b",
                lineHeight: "1.6",
                marginBottom: "24px",
                flex: 1
              },
              children: article.excerpt
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "16px",
                borderTop: "1px solid #f1f5f9",
                marginTop: "auto"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      style: {
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#eff6ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: /* @__PURE__ */ jsx(User, { size: 14, style: { color: "#2563eb" } })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { style: { fontSize: "13px", fontWeight: "600", color: "#334155" }, children: article.author })
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#94a3b8" }, children: [
                  /* @__PURE__ */ jsx(Calendar, { size: 13, style: { color: "#94a3b8" } }),
                  /* @__PURE__ */ jsx("span", { children: article.date })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function OrthopedicArticlesPage() {
  const [blogPostsList, setBlogPostsList] = useState(articles);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogPostsList.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPostsList.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };
  React.useEffect(() => {
    const titleText = "Corx Home Healthcare Blog — Health Tips, Care Guides & Advice";
    const descText = "Explore the Corx Home Healthcare Blog for expert health tips, home care advice, physiotherapy insights, and wellness guides";
    document.title = titleText;
    const setMetaTag = (attrName, attrVal, contentVal) => {
      let metaElem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!metaElem) {
        metaElem = document.createElement("meta");
        metaElem.setAttribute(attrName, attrVal);
        document.head.appendChild(metaElem);
      }
      metaElem.setAttribute("content", contentVal);
    };
    setMetaTag("name", "description", descText);
    setMetaTag("property", "og:title", titleText);
    setMetaTag("property", "og:description", descText);
    setMetaTag("property", "twitter:title", titleText);
    setMetaTag("property", "twitter:description", descText);
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith("/") && window.location.pathname !== "/" ? window.location.pathname.slice(0, -1) : window.location.pathname;
      const origin = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") ? window.location.origin : "https://corx.ae";
      canonicalLink.setAttribute("href", `${origin}${cleanPath}`);
    }
  }, []);
  React.useEffect(() => {
    fetch(`${API_BASE_URL}/api/blogs/`).then((res) => {
      if (!res.ok) return null;
      return res.json();
    }).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((item) => ({
          id: item.id,
          slug: item.slug || slugifyTitle(item.title),
          tag: item.tag || item.category || "HEALTHCARE",
          title: item.title,
          excerpt: item.excerpt || item.title,
          author: item.author || "Dr. Ulhas Sonar",
          date: item.date || "2026-05-30",
          image: item.image && !item.image.includes("placeholder") ? item.image : DUMMY_IMAGE
        }));
        setBlogPostsList(formatted);
      }
    }).catch((err) => console.log("Django API offline, using default articles:", err));
  }, []);
  return /* @__PURE__ */ jsx("div", { style: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Poppins', 'Inter', sans-serif", paddingTop: "120px", paddingBottom: "50px" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }, children: [
    currentPosts.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
          },
          children: currentPosts.map((article) => /* @__PURE__ */ jsx(ArticleCard, { article }, article.id))
        }
      ),
      totalPages > 1 && /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "50px",
            flexWrap: "wrap"
          },
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handlePageChange(Math.max(currentPage - 1, 1)),
                disabled: currentPage === 1,
                style: {
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: currentPage === 1 ? "#f1f5f9" : "#ffffff",
                  color: currentPage === 1 ? "#94a3b8" : "#1e293b",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                },
                children: "Previous"
              }
            ),
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handlePageChange(page),
                style: {
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  border: page === currentPage ? "none" : "1px solid #cbd5e1",
                  backgroundColor: page === currentPage ? "#2563eb" : "#ffffff",
                  color: page === currentPage ? "#ffffff" : "#1e293b",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: page === currentPage ? "0 4px 10px rgba(37, 99, 235, 0.2)" : "0 1px 2px rgba(0,0,0,0.05)"
                },
                children: page
              },
              page
            )),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handlePageChange(Math.min(currentPage + 1, totalPages)),
                disabled: currentPage === totalPages,
                style: {
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: currentPage === totalPages ? "#f1f5f9" : "#ffffff",
                  color: currentPage === totalPages ? "#94a3b8" : "#1e293b",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                },
                children: "Next"
              }
            )
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          textAlign: "center",
          padding: "60px 24px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          marginBottom: "56px"
        },
        children: [
          /* @__PURE__ */ jsx(BookOpen, { size: 44, style: { margin: "0 auto 16px auto", color: "#94a3b8" } }),
          /* @__PURE__ */ jsx("h3", { style: { fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }, children: "No articles found" }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "14px", color: "#64748b" }, children: "Try searching with another keyword or selecting a different category tab." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #0f172a 100%)",
          borderRadius: "24px",
          padding: "56px 32px",
          textAlign: "center",
          color: "#ffffff",
          boxShadow: "0 20px 40px rgba(30, 64, 175, 0.25)",
          position: "relative",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsx("h2", { style: { fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: "800", marginBottom: "16px", letterSpacing: "-0.01em" }, children: "Have Questions About Your Condition?" }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "16px", color: "#dbeafe", maxWidth: "560px", margin: "0 auto 32px auto", lineHeight: "1.6" }, children: "Book a consultation with Dr. Ulhas Sonar for personalized assessment and expert orthopedic care." }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/book-an-appointment",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#ffffff",
                color: "#1d4ed8",
                fontWeight: "700",
                fontSize: "14px",
                padding: "14px 32px",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease, background-color 0.2s ease"
              },
              children: [
                "Schedule Consultation",
                /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
const blogDatabase = [
  {
    id: 1,
    slug: "advantages-of-stem-cells-regenerative-medicine",
    category: "Home Healthcare",
    title: "Advantages of Stem Cells: Regenerative Medicine Supports Healing and Recovery",
    author: "Corx",
    authorBio: "Corx writes on regenerative medicine, home healthcare, and recovery-focused treatment options, translating clinical research into practical guidance for patients and caregivers.",
    date: "May 22, 2026",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    tags: ["Regenerative Medicine", "Stem Cells", "Recovery", "Healthcare"],
    content: `
      <p>Stem cells are probably one of the most significant breakthroughs in modern regenerative medicine because they have this incredible ability to help repair tissue, renew cells, and aid the healing process within the body. Unlike regular cells, stem cells can actually regenerate themselves, and they can even turn into different kinds of specialized cells, such as muscle cells, cartilage cells, nerve cells, blood cells, and heart cells, to name a few.</p>

      <p>This is one of the big reasons why the benefits of stem cells are being talked about all over the healthcare world, in regenerative medicine, orthopedics, neurology, sports medicine, and chronic disease research. Rather than just treating the symptoms of a condition, stem cell therapy is increasingly being looked at as a possible way to actually help the body fix itself, by supporting recovery, tissue repair, and regulation of inflammation.</p>

      <p>Scientists all around the world are right now exploring the benefits of stem cells for pretty much all conditions involving tissue damage, chronic inflammation, degenerative diseases, joint injuries, neurological disorders, autoimmune conditions, and recovery-focused medicine.</p>

      <div class="pull-note">"Stem cell research isn't about replacing the body's healing process — it's about giving it better tools to do the job."</div>

      <h2>What Makes Stem Cells Unique?</h2>
      <p>The benefits of stem cells come from some pretty unique biological properties that let them behave in a way that's very different from most mature cells in the body.</p>

      <h3>Self-Renewal</h3>
      <p>Stem cells can just keep dividing and creating new stem cells over time, which is really helpful for supporting ongoing tissue repair and cellular renewal processes.</p>

      <h3>Differentiation Ability</h3>
      <p>Stem cells can turn into really specific types of cells, like:</p>
      <ul>
        <li>Cartilage cells</li>
        <li>Bone cells</li>
        <li>Blood cells</li>
        <li>Nerve cells</li>
        <li>Muscle and connective tissue cells</li>
      </ul>

      <h3>Paracrine Signaling</h3>
      <p>Beyond becoming new cells themselves, stem cells also release signaling molecules that recruit the body's own repair mechanisms, reduce inflammation, and encourage nearby tissue to heal faster.</p>

      <h2>Where Stem Cell Therapy Is Being Used Today</h2>
      <p>Clinics and research hospitals are applying regenerative approaches across a growing list of specialties, including orthopedic injury recovery, post-surgical rehabilitation, chronic pain management, and support for age-related joint degeneration. As research continues, the list of conditions being studied only keeps growing.</p>
    `
  },
  {
    id: 2,
    slug: "what-is-physiotherapy-comprehensive-guide",
    category: "Home Physiotherapy",
    title: "WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE",
    author: "Corx",
    authorBio: "Corx writes on physical therapy, mobility restoration, and post-surgical rehabilitation.",
    date: "April 16, 2026",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    tags: ["Home Physiotherapy", "Rehabilitation", "Recovery"],
    content: `
      <p>Physiotherapy is a primary healthcare profession that promotes wellness, mobility, and independence. It assists patients of all ages who are affected by injury, illness, or disability through movement, exercise, manual therapy, and education.</p>
      <h2>Key Benefits of Physiotherapy</h2>
      <p>Physiotherapy helps patients regain full function, manage chronic pain, avoid surgery, and recover quickly after major orthopedic procedures.</p>
    `
  },
  {
    id: 3,
    slug: "burnout-in-working-professionals-signs-solutions",
    category: "Home Healthcare",
    title: "Burnout in Working Professionals: Signs & Solutions",
    author: "Corx",
    authorBio: "Corx writes on wellness, executive health assessment, and preventative medicine.",
    date: "March 18, 2026",
    heroImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
    tags: ["Healthcare", "Wellness", "Workplace Health"],
    content: `
      <p>Professional burnout affects mental and physical health. Learn key indicators and effective at-home health solutions to restore your energy and focus.</p>
    `
  },
  {
    id: 4,
    slug: "doctor-at-home-vs-hospital-visit",
    category: "Doctor on Call",
    title: "Doctor at Home vs Hospital Visit: What's Better in 2026?",
    author: "Corx",
    authorBio: "Corx writes on 24/7 home physician care and emergency primary response.",
    date: "February 12, 2026",
    heroImage: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=1200&q=80",
    tags: ["Doctor on Call", "Home Care", "Dubai Healthcare"],
    content: `
      <p>Comparing home physician visits against hospital ER waiting rooms. Discover why calling a doctor directly to your doorstep in Dubai is fast, comfortable, and safe.</p>
    `
  },
  {
    id: 5,
    slug: "managing-chronic-conditions-with-home-healthcare",
    category: "Home Nursing",
    title: "Managing Chronic Conditions With Home Healthcare Support",
    author: "Corx",
    authorBio: "Corx writes on home nursing, chronic disease management, and elderly care.",
    date: "January 20, 2026",
    heroImage: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80",
    tags: ["Home Nursing", "Chronic Care", "Elderly Care"],
    content: `
      <p>Managing long-term illness requires structured clinical monitoring, medication oversight, and compassionate nursing assistance right in the comfort of your home.</p>
    `
  }
];
function BlogDetails() {
  const { id, slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const targetParam = (slug || id || "").toString().toLowerCase();
  const initialPost = blogDatabase.find(
    (p) => p.slug === targetParam || p.id.toString() === targetParam || slugifyTitle(p.title) === targetParam
  ) || blogDatabase[0];
  const [post, setPost] = useState(initialPost);
  const articleId = post ? post.id : 1;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (targetParam) {
      fetch(`${API_BASE_URL}/api/blogs/${targetParam}/`).then((res) => {
        if (!res.ok) return null;
        return res.json();
      }).then((data) => {
        if (data && data.title) {
          setPost({
            id: data.id,
            slug: data.slug || slugifyTitle(data.title),
            category: data.tag || data.category || "Home Healthcare",
            title: data.title,
            author: data.author || "Corx",
            authorBio: "Corx writes on regenerative medicine, home healthcare, and recovery-focused treatment options.",
            date: data.date || "May 22, 2026",
            heroImage: data.image && !data.image.includes("placeholder") ? data.image : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
            tags: [data.tag || data.category || "Healthcare"],
            content: data.content || `<p>${data.excerpt}</p>`,
            excerpt: data.excerpt || void 0
          });
        }
      }).catch((err) => console.log("Django API offline, using static details:", err));
    }
  }, [targetParam]);
  useEffect(() => {
    if (!post) return;
    const pageTitle = post.meta_title || (post.title ? `${post.title} | Corx Healthcare Blog Dubai` : "Corx Home Healthcare Blog");
    const pageDesc = post.meta_description || post.excerpt || (post.title ? `Read ${post.title} on Corx Home Healthcare Blog.` : "Explore the Corx Home Healthcare Blog for expert health tips, home care advice, and wellness guides.");
    document.title = pageTitle;
    const setMetaTag = (attrName, attrVal, contentVal) => {
      let metaElem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!metaElem) {
        metaElem = document.createElement("meta");
        metaElem.setAttribute(attrName, attrVal);
        document.head.appendChild(metaElem);
      }
      metaElem.setAttribute("content", contentVal);
    };
    setMetaTag("name", "description", pageDesc);
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", pageDesc);
    setMetaTag("property", "og:type", "article");
    if (post.heroImage) {
      setMetaTag("property", "og:image", post.heroImage);
    }
    setMetaTag("property", "twitter:title", pageTitle);
    setMetaTag("property", "twitter:description", pageDesc);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    const origin = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") ? window.location.origin : "https://corx.ae";
    canonicalLink.setAttribute("href", `${origin}/blog/${post.slug || articleId}`);
  }, [post]);
  const prevPost = blogDatabase.find((p) => p.id === articleId - 1) || blogDatabase[blogDatabase.length - 1];
  const nextPost = blogDatabase.find((p) => p.id === articleId + 1) || blogDatabase[0];
  return /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "#eef2f6", color: "#3a3f47", fontFamily: "Georgia, 'Times New Roman', serif", minHeight: "100vh", paddingTop: "95px", paddingBottom: "50px" }, children: [
    /* @__PURE__ */ jsx("style", { children: `
        .blog-page {
          max-width: 1220px;
          margin: 0 auto;
          padding: 24px 24px 48px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 24px;
          align-items: start;
        }

        .breadcrumb {
          grid-column: 1 / -1;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          color: #5a616b;
          margin-bottom: 4px;
        }
        .breadcrumb a { color: #1f6fb2; text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }

        .article-card {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(20, 30, 45, 0.06), 0 1px 2px rgba(20, 30, 45, 0.04);
          padding: 40px 44px 48px;
        }

        .article-title {
          color: #1f5f9e;
          font-size: 26px;
          line-height: 1.35;
          margin: 0 0 10px;
          font-weight: 700;
          font-family: Georgia, serif;
        }

        .article-meta {
          color: #2f8f4e;
          font-size: 14px;
          font-family: Arial, Helvetica, sans-serif;
          font-style: italic;
          margin-bottom: 22px;
        }
        .article-meta a { color: inherit; text-decoration: none; }
        .article-meta a:hover { text-decoration: underline; }

        .article-hero {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 26px;
          display: block;
        }

        .article-body p {
          margin: 0 0 20px;
          font-size: 16px;
          color: #3a3f47;
          line-height: 1.65;
        }

        .article-body h2 {
          color: #1f5f9e;
          font-size: 22px;
          margin: 34px 0 14px;
          font-weight: 700;
          font-family: Georgia, serif;
        }

        .article-body h3 {
          color: #1f5f9e;
          font-size: 19px;
          margin: 28px 0 12px;
          font-weight: 700;
          font-family: Georgia, serif;
        }

        .article-body ul {
          margin: 0 0 20px;
          padding-left: 22px;
        }
        .article-body li {
          margin-bottom: 8px;
          font-size: 16px;
        }

        .article-body a { color: #1f6fb2; }

        .pull-note {
          background: #f4f8fb;
          border-left: 3px solid #1f6fb2;
          padding: 16px 20px;
          font-size: 15px;
          color: #5a616b;
          margin: 26px 0;
          font-style: italic;
        }

        .tags {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #e7eaee;
          font-family: Arial, Helvetica, sans-serif;
        }
        .tags .label {
          font-weight: 700;
          color: #3a3f47;
          font-size: 13px;
          margin-right: 8px;
        }
        .tag {
          display: inline-block;
          background: #eef2f6;
          color: #5a616b;
          font-size: 12px;
          padding: 5px 12px;
          border-radius: 14px;
          margin: 0 6px 6px 0;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .tag:hover { background: #1f6fb2; color: #ffffff; }

        .share {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .share .label { font-size: 13px; font-weight: 700; color: #3a3f47; }
        .share a {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #1f6fb2;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition: background 0.2s ease;
        }
        .share a:hover { background: #164d80; }

        .author-box {
          margin-top: 40px;
          background: #f7f9fb;
          border-radius: 6px;
          padding: 24px;
          display: flex;
          gap: 18px;
          align-items: flex-start;
          font-family: Arial, Helvetica, sans-serif;
        }
        .author-avatar {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #1f6fb2;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          flex: none;
        }
        .author-box h4 {
          margin: 0 0 4px;
          color: #1f5f9e;
          font-size: 15px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .author-box p {
          margin: 0;
          font-size: 13.5px;
          color: #5a616b;
          line-height: 1.5;
        }

        .post-nav {
          margin-top: 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .post-nav a {
          display: block;
          background: #f7f9fb;
          border-radius: 6px;
          padding: 16px 18px;
          text-decoration: none;
          color: #5a616b;
          transition: background 0.2s ease;
        }
        .post-nav a:hover { background: #eef4f9; }
        .post-nav .dir {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .06em;
          color: #1f6fb2;
          display: block;
          margin-bottom: 4px;
        }
        .post-nav .title {
          font-size: 14px;
          color: #3a3f47;
          font-weight: 700;
        }
        .post-nav.next { text-align: right; }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
          font-family: Arial, Helvetica, sans-serif;
          position: sticky;
          top: 130px;
        }

        .widget {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(20, 30, 45, 0.06), 0 1px 2px rgba(20, 30, 45, 0.04);
          padding: 22px 24px 26px;
        }

        .widget h3 {
          margin: 0 0 16px;
          font-size: 18px;
          color: #1a2733;
          font-family: Georgia, serif;
          font-weight: 700;
        }

        .search-form {
          display: flex;
          gap: 8px;
        }
        .search-form input {
          flex: 1;
          min-width: 0;
          padding: 10px 12px;
          border: 1px solid #d6dce2;
          border-radius: 3px;
          font-size: 14px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .search-form input:focus {
          outline: 2px solid #1f6fb2;
          outline-offset: 1px;
        }
        .search-form button {
          background: #1f6fb2;
          color: #ffffff;
          border: none;
          padding: 0 18px;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease;
        }
        .search-form button:hover { background: #164d80; }

        .recent-posts {
          list-style: none;
          margin: 0; padding: 0;
        }
        .recent-posts li {
          padding: 12px 0;
          border-bottom: 1px solid #e7eaee;
        }
        .recent-posts li:first-child { padding-top: 0; }
        .recent-posts li:last-child { border-bottom: none; padding-bottom: 0; }
        .recent-posts a {
          color: #1f6fb2;
          text-decoration: none;
          font-size: 14.5px;
          line-height: 1.45;
          font-weight: 600;
        }
        .recent-posts a:hover { color: #164d80; text-decoration: underline; }
        .recent-posts a.current { color: #1f5f9e; }

        .categories {
          list-style: none;
          margin: 0; padding: 0;
        }
        .categories li {
          padding: 9px 0;
          border-bottom: 1px solid #e7eaee;
        }
        .categories li:last-child { border-bottom: none; }
        .categories a {
          color: #1f6fb2;
          text-decoration: none;
          font-size: 14.5px;
          display: flex;
          justify-content: space-between;
        }
        .categories a:hover { color: #164d80; text-decoration: underline; }
        .categories .count { color: #5a616b; font-size: 13px; }

        @media (max-width: 860px) {
          .blog-page { grid-template-columns: 1fr; }
          .article-card { padding: 28px 22px 34px; }
          .article-title { font-size: 22px; }
          .post-nav { grid-template-columns: 1fr; }
          .post-nav.next { text-align: left; }
          .sidebar { position: static; }
        }
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "blog-page", children: [
      /* @__PURE__ */ jsxs("div", { className: "breadcrumb", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }),
        " / ",
        /* @__PURE__ */ jsx(Link, { to: "/blog", children: "Blog" }),
        " / ",
        /* @__PURE__ */ jsx(Link, { to: "/blog", children: post.category }),
        " / ",
        post.title
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "article-card", children: [
        /* @__PURE__ */ jsx("h1", { className: "article-title", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "article-meta", children: [
          "By ",
          /* @__PURE__ */ jsx("strong", { children: post.author }),
          " • ",
          post.date,
          " • ",
          post.category
        ] }),
        /* @__PURE__ */ jsx("img", { src: post.heroImage, alt: post.title, className: "article-hero" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "article-body",
            dangerouslySetInnerHTML: { __html: post.content }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "tags", children: [
          /* @__PURE__ */ jsx("span", { className: "label", children: "TAGS:" }),
          post.tags && post.tags.map((tag, i) => /* @__PURE__ */ jsxs("span", { className: "tag", children: [
            "#",
            tag
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "share", children: [
          /* @__PURE__ */ jsx("span", { className: "label", children: "SHARE:" }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Share on Facebook", children: "f" }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Share on X", children: "x" }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Share via email", children: "@" }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Copy link", children: "🔗" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "author-box", children: [
          /* @__PURE__ */ jsx("div", { className: "author-avatar", children: post.author && post.author.charAt(0) || "C" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h4", { children: [
              "Written by ",
              post.author
            ] }),
            /* @__PURE__ */ jsx("p", { children: post.authorBio })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "post-nav", children: [
          /* @__PURE__ */ jsxs(Link, { to: `/blog/${prevPost.slug || slugifyTitle(prevPost.title) || prevPost.id}`, className: "prev", children: [
            /* @__PURE__ */ jsx("span", { className: "dir", children: "← Previous" }),
            /* @__PURE__ */ jsx("span", { className: "title", children: prevPost.title })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: `/blog/${nextPost.slug || slugifyTitle(nextPost.title) || nextPost.id}`, className: "next", children: [
            /* @__PURE__ */ jsx("span", { className: "dir", children: "Next →" }),
            /* @__PURE__ */ jsx("span", { className: "title", children: nextPost.title })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "sidebar", children: [
        /* @__PURE__ */ jsxs("div", { className: "widget", children: [
          /* @__PURE__ */ jsx("h3", { children: "Search" }),
          /* @__PURE__ */ jsxs("form", { className: "search-form", role: "search", onSubmit: (e) => e.preventDefault(), children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx("button", { type: "submit", children: "Go" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "widget", children: [
          /* @__PURE__ */ jsx("h3", { children: "Recent Posts" }),
          /* @__PURE__ */ jsx("ul", { className: "recent-posts", children: blogDatabase.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: `/blog/${item.slug || slugifyTitle(item.title) || item.id}`,
              className: item.id === post.id ? "current" : "",
              children: item.title
            }
          ) }, item.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "widget", children: [
          /* @__PURE__ */ jsx("h3", { children: "Categories" }),
          /* @__PURE__ */ jsxs("ul", { className: "categories", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/blog", children: [
              "Home Healthcare ",
              /* @__PURE__ */ jsx("span", { className: "count", children: "(4)" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/blog", children: [
              "Home Nursing ",
              /* @__PURE__ */ jsx("span", { className: "count", children: "(2)" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/blog", children: [
              "Home Physiotherapy ",
              /* @__PURE__ */ jsx("span", { className: "count", children: "(3)" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/blog", children: [
              "Doctor on Call ",
              /* @__PURE__ */ jsx("span", { className: "count", children: "(2)" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/blog", children: [
              "Uncategorized ",
              /* @__PURE__ */ jsx("span", { className: "count", children: "(1)" })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const teamHero = "/assets/team_hero-UnZmv6zq.png";
const doctorsData = [
  {
    name: "Jaya Kumari",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-001",
    degree: "DHA Certified Physiotherapist",
    image: jayaKumariPhoto
  },
  {
    name: "Vinayata M. Patel",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-002",
    degree: "DHA Certified Physiotherapist",
    image: vinayataPhoto
  },
  {
    name: "Sehar Bano",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-003",
    degree: "DHA Certified Physiotherapist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Manju Kumari",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-001",
    degree: "DHA Licensed Assistant Nurse",
    image: manjuPhoto
  },
  {
    name: "Chanda Kumari",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-001",
    degree: "Healthcare Assistant",
    image: chandaPhoto
  },
  {
    name: "Shweta Jagmohan",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-002",
    degree: "DHA Licensed Assistant Nurse",
    image: shwetaPhoto
  },
  {
    name: "Dipesh",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-002",
    degree: "Healthcare Assistant",
    image: dipeshPhoto
  },
  {
    name: "Mariecris Godinez",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-003",
    degree: "Healthcare Assistant",
    image: mariecrisPhoto
  },
  {
    name: "Sajini Babu",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-003",
    degree: "DHA Licensed Registered Nurse",
    image: sajiniPhoto
  },
  {
    name: "Lakshmi Sundar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-004",
    degree: "DHA Licensed Registered Nurse",
    image: lakshmiPhoto
  },
  {
    name: "Kajal Jaiswal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-004",
    degree: "Healthcare Assistant",
    image: kajalPhoto
  },
  {
    name: "Marisel Vi.R",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-005",
    degree: "DHA Licensed Assistant Nurse",
    image: mariselviPhoto
  },
  {
    name: "Shweta Rakesh Kumar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-006",
    degree: "DHA Licensed Registered Nurse",
    image: shwetaRakeshPhoto
  },
  {
    name: "Farooq Khalid",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-005",
    degree: "Healthcare Assistant",
    image: farooqPhoto
  },
  {
    name: "Suneel Bahadur",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-006",
    degree: "Health Assistant",
    image: suneelPhoto
  },
  {
    name: "Mamata Regmi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-007",
    degree: "Healthcare Assistant",
    image: mamataPhoto
  },
  {
    name: "Bharat Badwal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-008",
    degree: "Healthcare Assistant",
    image: bharatPhoto
  },
  {
    name: "Nimesh Ka Sewwandi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-009",
    degree: "Healthcare Assistant",
    image: nimeshkaPhoto
  },
  {
    name: "Santoshi Sah",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-010",
    degree: "Healthcare Assistant",
    image: santoshiPhoto
  },
  {
    name: "Nirmala Gharti Magar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-011",
    degree: "Healthcare Assistant",
    image: nirmalaPhoto
  },
  {
    name: "Jasmeen Jassi",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-007",
    degree: "DHA Licensed Assistant Nurse",
    image: jasmeenPhoto
  },
  {
    name: "Vaishali Parashar",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-008",
    degree: "DHA Licensed Assistant Nurse",
    image: vaishaliPhoto
  },
  {
    name: "Joti Ashok",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-009",
    degree: "DHA Licensed Registered Nurse",
    image: jotiAshokPhoto
  },
  {
    name: "Norelie Munar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-012",
    degree: "Healthcare Assistant",
    image: noreliePhoto
  },
  {
    name: "Hasti Rameshbhai",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-010",
    degree: "DHA Licensed Registered Nurse",
    image: hastiPhoto
  },
  {
    name: "Rhodalyn Gonzales",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-013",
    degree: "Health Assistant",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Manasa Vadde",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-014",
    degree: "Healthcare Assistant",
    image: manasaPhoto
  }
];
const departments = [
  "All",
  "Physiotherapy",
  "Nursing",
  "Homecare Support"
];
const Team = () => {
  const [selectedDept, setSelectedDept] = useState("All");
  const [dbTeam, setDbTeam] = useState([]);
  useEffect(() => {
    document.title = "Our Medical Team | CORx Healthcare Dubai";
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith("/") && window.location.pathname !== "/" ? window.location.pathname.slice(0, -1) : window.location.pathname;
      const origin = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") ? window.location.origin : "https://corx.ae";
      canonicalLink.setAttribute("href", `${origin}${cleanPath}`);
    }
  }, []);
  const mappedDbTeam = dbTeam.map((member) => {
    let dept = "Nursing";
    const postLower = member.post ? member.post.toLowerCase() : "";
    if (postLower.includes("physio")) {
      dept = "Physiotherapy";
    } else if (postLower.includes("home") || postLower.includes("assistant") || postLower.includes("support")) {
      dept = "Homecare Support";
    }
    let img = member.photo || member.image || "";
    if (img && !img.startsWith("http") && !img.startsWith("/")) {
      img = `/${img}`;
    }
    return {
      name: member.name,
      specialty: member.post,
      department: dept,
      nmcNo: `DB-${member.id}`,
      degree: member.post,
      image: img,
      isFromDb: true
    };
  });
  const combinedDoctors = [...mappedDbTeam, ...doctorsData];
  const filteredDoctors = selectedDept === "All" ? combinedDoctors : combinedDoctors.filter((doc) => doc.department === selectedDept);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "pt-28 pb-24 bg-gray-50 min-h-screen",
      children: [
        /* @__PURE__ */ jsxs(
          "section",
          {
            className: "relative min-h-[50vh] flex items-center py-20 mb-16 text-white text-center bg-cover bg-center overflow-hidden",
            style: {
              backgroundImage: `url(${teamHero})`,
              backgroundPosition: "center 35%"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#1a294a]/90 via-[#0b2848]/85 to-[#1a294a]/95 mix-blend-multiply z-0" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/45 z-0" }),
              /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto flex flex-col items-center", children: [
                /* @__PURE__ */ jsx(
                  "h1",
                  {
                    className: "text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6",
                    style: {
                      color: "#ffffff",
                      textShadow: "0 4px 20px rgba(0,0,0,0.7)"
                    },
                    children: "Our Medical Specialists"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "text-sm md:text-lg leading-relaxed mb-8 max-w-3xl font-medium",
                    style: {
                      color: "#ffffff",
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                    },
                    children: "A dedicated team of DHA licensed doctors, registered nurses, and certified physiotherapists bringing clinical excellence, safety, and recovery directly to your home."
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-6 text-xs md:text-sm font-semibold", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        color: "#ffffff",
                        backgroundColor: "rgba(46, 189, 110, 0.12)",
                        border: "1.5px solid rgba(46, 189, 110, 0.35)",
                        padding: "12px 28px",
                        borderRadius: "9999px",
                        fontSize: "14px",
                        fontWeight: "700",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",
                        cursor: "default"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.backgroundColor = "rgba(46, 189, 110, 0.22)";
                        e.currentTarget.style.borderColor = "rgba(46, 189, 110, 0.55)";
                        e.currentTarget.style.transform = "scale(1.03)";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.backgroundColor = "rgba(46, 189, 110, 0.12)";
                        e.currentTarget.style.borderColor = "rgba(46, 189, 110, 0.35)";
                        e.currentTarget.style.transform = "scale(1)";
                      },
                      children: [
                        /* @__PURE__ */ jsx(Award, { size: 18, style: { color: "#2ebd6e" } }),
                        /* @__PURE__ */ jsx("span", { children: "100% DHA Licensed" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        color: "#ffffff",
                        backgroundColor: "rgba(46, 189, 110, 0.12)",
                        border: "1.5px solid rgba(46, 189, 110, 0.35)",
                        padding: "12px 28px",
                        borderRadius: "9999px",
                        fontSize: "14px",
                        fontWeight: "700",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",
                        cursor: "default"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.backgroundColor = "rgba(46, 189, 110, 0.22)";
                        e.currentTarget.style.borderColor = "rgba(46, 189, 110, 0.55)";
                        e.currentTarget.style.transform = "scale(1.03)";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.backgroundColor = "rgba(46, 189, 110, 0.12)";
                        e.currentTarget.style.borderColor = "rgba(46, 189, 110, 0.35)";
                        e.currentTarget.style.transform = "scale(1)";
                      },
                      children: [
                        /* @__PURE__ */ jsx(Clock, { size: 18, style: { color: "#2ebd6e" } }),
                        /* @__PURE__ */ jsx("span", { children: "24/7 Availability" })
                      ]
                    }
                  )
                ] })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mt-6 mb-12", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-black text-[#1a294a] tracking-tight mb-4", children: "Our Medical Directory" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base text-gray-500 font-medium max-w-2xl", children: "Search and filter through our certified clinical practitioners by department." }),
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: "64px",
                  height: "4px",
                  backgroundColor: "#004e92",
                  borderRadius: "9999px",
                  marginTop: "16px"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mt-8 mb-16 max-w-6xl mx-auto", children: departments.map((dept, idx) => {
            const isActive = selectedDept === dept;
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedDept(dept),
                className: "text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer hover:scale-105",
                style: {
                  background: isActive ? "linear-gradient(135deg, #08709d 0%, #004e92 100%)" : "#ffffff",
                  color: isActive ? "#ffffff" : "#374151",
                  border: isActive ? "1px solid transparent" : "1px solid #e5e7eb",
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  boxShadow: isActive ? "0 8px 20px -4px rgba(8, 112, 157, 0.35)" : "0 2px 6px rgba(0,0,0,0.03)"
                },
                children: dept
              },
              idx
            );
          }) }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              layout: true,
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-10",
              children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredDoctors.length > 0 ? filteredDoctors.map((doc) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  layout: true,
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.9 },
                  transition: { duration: 0.3 },
                  className: "shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row gap-5 items-center sm:items-stretch",
                  style: {
                    backgroundColor: "#f4fbfb",
                    border: "1px solid #cbebe7",
                    borderRadius: "16px",
                    padding: "20px"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "shrink-0 flex items-center justify-center overflow-hidden",
                        style: {
                          backgroundColor: "#ffffff",
                          padding: "6px",
                          borderRadius: "12px",
                          border: "1px solid #e5e7eb",
                          width: "128px",
                          height: "144px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                        },
                        children: /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: doc.image,
                            alt: doc.name,
                            className: "w-full h-full object-cover rounded-lg"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center flex-grow w-full", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a294a] mb-1", children: doc.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-[#004e92]", children: doc.specialty })
                    ] })
                  ]
                },
                doc.nmcNo
              )) : /* @__PURE__ */ jsx("div", { className: "col-span-full text-center py-12 text-gray-500 font-medium", children: "No doctors currently listed for this department." }) })
            }
          )
        ] })
      ]
    }
  );
};
function Container({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`, children });
}
function Section({ children, className = "", variant = "white", id }) {
  const variants = {
    white: "bg-white",
    slate: "bg-slate-50 border-t border-b border-gray-200",
    warm: "bg-[#f7f6f2] border-t border-b border-gray-200",
    dark: "bg-[#1a294a] text-white"
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      id,
      className: `py-16 md:py-20 lg:py-24 ${variants[variant] || variants.white} ${className}`,
      children
    }
  );
}
function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  target,
  rel,
  type = "button"
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none text-center cursor-pointer";
  const variants = {
    primary: "bg-[#08709d] text-white hover:bg-[#065679] shadow-sm focus:ring-[#08709d]",
    secondary: "bg-[#1a294a] text-white hover:bg-[#121c33] shadow-sm focus:ring-[#1a294a]",
    whatsapp: "bg-[#22c55e] text-white hover:bg-[#1db053] shadow-sm focus:ring-[#22c55e]",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300"
  };
  const combinedClass = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, className: combinedClass, target, rel, children });
  }
  return /* @__PURE__ */ jsx("button", { type, onClick, className: combinedClass, children });
}
function Card({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-6 ${className}`, children });
}
function HeroTitle({ children, className = "" }) {
  return /* @__PURE__ */ jsx("h1", { className: `text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight ${className}`, children });
}
function SectionTitle({ children, className = "" }) {
  return /* @__PURE__ */ jsx("h2", { className: `text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight ${className}`, children });
}
function CardTitle({ children, className = "" }) {
  return /* @__PURE__ */ jsx("h3", { className: `text-xl font-semibold text-gray-900 ${className}`, children });
}
function Paragraph({ children, className = "" }) {
  return /* @__PURE__ */ jsx("p", { className: `text-base leading-7 text-gray-600 ${className}`, children });
}
function ServiceHighlightsBar() {
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-[#1b88c4] text-white py-4 md:py-5 border-y border-white/10 shadow-md font-sans", children: /* @__PURE__ */ jsx("div", { className: "container max-w-[1400px] mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start md:justify-center gap-3.5 px-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 48 48", fill: "currentColor", className: "w-9 h-9 md:w-10 md:h-10 text-white", children: /* @__PURE__ */ jsx("path", { d: "M24 4c-5.5 0-10 4.5-10 10v4c0 5.5 4.5 10 10 10s10-4.5 10-10v-4c0-5.5-4.5-10-10-10zm-1 5h2v3h3v2h-3v3h-2v-3h-3v-2h3V9zm-11 27c0-6.6 6.3-12 12-12s12 5.4 12 12v3H12v-3z" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide", children: "Highly Skilled &" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide", children: "Experienced Staff" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start md:justify-center gap-3.5 px-2 md:border-x md:border-white/20", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: "3", className: "w-9 h-9 md:w-10 md:h-10 text-white", children: [
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M24 6a18 18 0 1 1-12.7 5.3L6 16" }),
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 8v8h8" }),
        /* @__PURE__ */ jsx("text", { x: "24", y: "29.5", textAnchor: "middle", fill: "currentColor", stroke: "none", fontSize: "13", fontWeight: "900", fontFamily: "sans-serif", children: "24" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide", children: "24×7/365 Days" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide", children: "Service" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start md:justify-center gap-3.5 px-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: "2.5", className: "w-8 h-8 md:w-9 md:h-9 text-white", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 42h20M24 6v36M24 8C14 18 14 34 14 42M24 14h8M24 20h11M24 26h12M24 32h11M24 38h8" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide", children: "Anywhere In Dubai," }),
        /* @__PURE__ */ jsx("span", { className: "text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide", children: "Just In 30 Mins" })
      ] })
    ] })
  ] }) }) });
}
function EditableText$1({
  fieldKey,
  slug = "default",
  defaultText = "",
  isEditMode = false,
  className = "",
  tagName = "span",
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
    const updated = e.currentTarget.innerText || e.currentTarget.textContent || "";
    setText(updated);
    try {
      localStorage.setItem(storageKey, updated);
    } catch (err) {
    }
  };
  const Component = tagName;
  const currentVal = text !== null && text !== void 0 ? text : defaultText;
  if (!isEditMode) {
    if (multiline && typeof currentVal === "string" && currentVal.includes("\n")) {
      const paragraphs = currentVal.split(/\n\n+/).filter(Boolean);
      return /* @__PURE__ */ jsx("div", { className, children: paragraphs.map((p, idx) => /* @__PURE__ */ jsx("p", { className: "mb-4 last:mb-0 leading-relaxed", children: p }, idx)) });
    }
    return /* @__PURE__ */ jsx(Component, { className, children: currentVal });
  }
  return /* @__PURE__ */ jsx(
    Component,
    {
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: handleBlur,
      className: `${className} outline-none focus:ring-2 focus:ring-[#08709d] focus:ring-offset-2 rounded px-2 py-0.5 transition-all cursor-text group border-2 border-dashed border-[#08709d]/60 hover:border-[#08709d] bg-[#08709d]/10 text-slate-900 inline-block`,
      title: "✏️ Click to edit text live",
      children: currentVal
    }
  );
}
const defaultBenefitsData = [
  {
    title: "Customized Treatment Plans",
    desc: "Every patient receives a tailored therapy plan to address their specific health requirements, ensuring optimal recovery."
  },
  {
    title: "Pain Relief & Mobility Restoration",
    desc: "Our expert clinical team uses proven medical techniques to reduce pain, improve mobility, and restore full range of motion."
  },
  {
    title: "Non-Invasive & Drug-Free Approach",
    desc: "Benefit from natural, hands-on therapy and compassionate care without the need for unnecessary medications or surgeries."
  },
  {
    title: "Experienced Healthcare Professionals",
    desc: "Our skilled team of DHA-licensed doctors and nurses specializes in delivering personalized home care with high success rates."
  },
  {
    title: "Holistic Long-Term Recovery",
    desc: "We focus on long-term healing and wellness, helping you regain full functionality while preventing future complications through home care guidance."
  }
];
function ServiceBenefitsSection({
  benefitsList = [],
  benefitsTitle = "",
  serviceTitle = "",
  isEditMode = false,
  slug = "default",
  imageUrl = null
}) {
  const hasCustomBenefits = Array.isArray(benefitsList) && benefitsList.length > 0;
  const displayBenefits = hasCustomBenefits ? benefitsList : defaultBenefitsData;
  if (!hasCustomBenefits && !isEditMode) {
    return null;
  }
  const cleanServiceTitle = (serviceTitle || "").replace(/\s*services?\s*$/i, "");
  const defaultTitleText = benefitsTitle || (cleanServiceTitle ? `Benefits of Our ${cleanServiceTitle} Service at CORx Healthcare` : "Benefits of Our Home Healthcare Service at CORx Healthcare");
  const defaultImg = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80";
  const displayImg = imageUrl || defaultImg;
  return /* @__PURE__ */ jsx(Section, { variant: "slate", className: "py-12 sm:py-16 md:py-20 bg-slate-50/50", children: /* @__PURE__ */ jsx(Container, { className: "max-w-[1380px]", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 bg-[#edf6fc] border-[1.5px] border-[#90caed] rounded-3xl p-6 sm:p-9 lg:p-10 shadow-sm flex flex-col justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#08709d] tracking-tight font-montserrat leading-snug mb-6", children: /* @__PURE__ */ jsx(
        EditableText$1,
        {
          slug,
          fieldKey: "benefits_section_main_title",
          defaultText: defaultTitleText,
          isEditMode,
          tagName: "span"
        }
      ) }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-slate-700 font-sans text-sm sm:text-[15px] leading-relaxed pl-5 list-disc marker:text-slate-800", children: displayBenefits.map((item, idx) => /* @__PURE__ */ jsxs("li", { className: "pl-1", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-extrabold text-slate-900 mr-1.5 font-montserrat", children: [
          /* @__PURE__ */ jsx(
            EditableText$1,
            {
              slug,
              fieldKey: `benefit_item_title_${idx}`,
              defaultText: typeof item === "string" ? item : item.title || item.name || "",
              isEditMode,
              tagName: "span"
            }
          ),
          ":"
        ] }),
        /* @__PURE__ */ jsx(
          EditableText$1,
          {
            slug,
            fieldKey: `benefit_item_desc_${idx}`,
            defaultText: typeof item === "string" ? "" : item.desc || item.description || "",
            isEditMode,
            tagName: "span",
            multiline: true,
            className: "text-slate-700 font-normal"
          }
        )
      ] }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden shadow-md border border-slate-200/80", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: displayImg,
          alt: serviceTitle || "Service Benefits",
          className: "w-full h-full object-cover rounded-3xl hover:scale-[1.02] transition-transform duration-500"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" })
    ] }) })
  ] }) }) });
}
const defaultUnderstandingData = [
  {
    num: "1",
    title: "Freezing Stage:",
    desc: "This is the first stage in the progression of symptoms. Movement starts causing pain, and range of motion begins to become limited."
  },
  {
    num: "2",
    title: "Frozen Stage:",
    desc: "In this stage, pain may decrease, but stiffness increases significantly, making movement more restricted."
  },
  {
    num: "3",
    title: "Thawing Stage:",
    desc: "Symptoms improve during this stage, and range of motion steadily restores with proper medical care and clinical therapy."
  }
];
function ServiceUnderstandingSection({
  understandingTitle = "",
  understandingIntro = "",
  understandingItems = [],
  serviceTitle = "",
  isEditMode = false,
  slug = "default",
  imageUrl = null
}) {
  const hasCustomUnderstanding = Array.isArray(understandingItems) && understandingItems.length > 0;
  if (!hasCustomUnderstanding && !isEditMode) {
    return null;
  }
  const displayItems = hasCustomUnderstanding ? understandingItems : defaultUnderstandingData;
  const defaultMainTitle = understandingTitle || (serviceTitle ? `Understanding ${serviceTitle}` : "Understanding Your Condition");
  const defaultIntroText = understandingIntro || `Comprehensive clinical insights into ${serviceTitle || "your health condition"}, its stages, and effective treatment options.`;
  const defaultImg = "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80";
  const displayImg = imageUrl || defaultImg;
  return /* @__PURE__ */ jsx(Section, { variant: "white", className: "py-12 sm:py-16 md:py-20 bg-white", children: /* @__PURE__ */ jsx(Container, { className: "max-w-[1380px]", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 flex flex-col justify-start", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-extrabold text-[#08709d] tracking-tight font-montserrat leading-snug mb-4", children: /* @__PURE__ */ jsx(
        EditableText$1,
        {
          slug,
          fieldKey: "understanding_main_title",
          defaultText: defaultMainTitle,
          isEditMode,
          tagName: "span"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-sans", children: /* @__PURE__ */ jsx(
        EditableText$1,
        {
          slug,
          fieldKey: "understanding_intro_paragraph",
          defaultText: defaultIntroText,
          isEditMode,
          tagName: "p",
          multiline: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: displayItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-lg sm:text-xl font-extrabold text-[#08709d] font-montserrat leading-snug mb-2 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { children: item.num ? `${item.num}.` : `${idx + 1}.` }),
          /* @__PURE__ */ jsx(
            EditableText$1,
            {
              slug,
              fieldKey: `understanding_item_title_${idx}`,
              defaultText: typeof item === "string" ? item : item.title || "",
              isEditMode,
              tagName: "span"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-slate-700 text-sm sm:text-[15px] leading-relaxed font-sans", children: /* @__PURE__ */ jsx(
          EditableText$1,
          {
            slug,
            fieldKey: `understanding_item_desc_${idx}`,
            defaultText: typeof item === "string" ? "" : item.desc || item.description || "",
            isEditMode,
            tagName: "p",
            multiline: true
          }
        ) })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 flex items-center justify-center sticky top-28", children: /* @__PURE__ */ jsx("div", { className: "relative w-full rounded-2xl border-2 border-[#1e293b]/80 shadow-2xl overflow-hidden bg-slate-900", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: displayImg,
        alt: serviceTitle || "Understanding Condition Illustration",
        className: "w-full h-auto max-h-[560px] object-cover rounded-xl"
      }
    ) }) })
  ] }) }) });
}
const servicesData = {
  "physiotherapy": {
    title: "Physiotherapy Services",
    eyebrow: "DHA-licensed home physiotherapy across Dubai",
    tagline: "Regain your strength, mobility, and confidence with expert physiotherapy at home.",
    description: "Struggling with pain, stiffness, or difficulty moving? Our physiotherapy services in Dubai are designed to help you recover safely and regain confidence in your daily activities. Whether you need treatment at home, in your hotel, or at your workplace, we provide structured and professional care tailored to your condition.",
    icon: "Activity",
    themeColor: "#08709d",
    floatingBadge: {
      title: "Home, hotel, or office visits",
      desc: "Professional physiotherapy tailored to your schedule and condition."
    },
    sub_services: [
      {
        slug: "frozen-shoulder-physiotherapy",
        path: "/frozen-shoulder-physiotherapy",
        title: "Frozen Shoulder Therapy",
        eyebrow: "Adhesive Capsulitis Rehab",
        desc: "Specialized joint mobilization, passive stretching, and shoulder range of motion rehabilitation.",
        icon: "Activity",
        badge: "Popular"
      },
      {
        slug: "pediatric-physiotherapy-services-dubai",
        path: "/pediatric-physiotherapy-services-dubai",
        title: "Pediatric Physiotherapy",
        eyebrow: "Child Movement & Milestones",
        desc: "Child-friendly physical therapy for motor delays, cerebral palsy, torticollis, and posture balance.",
        icon: "Users",
        badge: "Pediatric"
      },
      {
        slug: "joint-pain-treatment",
        path: "/joint-pain-treatment",
        title: "Joint Pain Treatment",
        eyebrow: "Arthritis & Joint Relief",
        desc: "Non-invasive knee, hip, shoulder, and wrist mobilization, pain relief, and joint strengthening.",
        icon: "Heart",
        badge: "Joint Care"
      },
      {
        slug: "manual-therapy",
        path: "/manual-therapy",
        title: "Manual Therapy",
        eyebrow: "Hands-On Soft Tissue Therapy",
        desc: "Skilled hands-on myofascial release, joint manipulation, and muscle knot release.",
        icon: "Sparkles",
        badge: "Hands-On"
      },
      {
        slug: "geriatric-physiotherapy",
        path: "/geriatric-physiotherapy",
        title: "Geriatric Physiotherapy at Home",
        eyebrow: "Senior Mobility & Fall Prevention",
        desc: "Gentle low-impact exercises, balance retraining, and fall-prevention routines for senior citizens.",
        icon: "Users",
        badge: "Senior Care"
      },
      {
        slug: "chest-physiotherapy",
        path: "/chest-physiotherapy",
        title: "Chest & Respiratory Physiotherapy",
        eyebrow: "Cardiorespiratory Rehab",
        desc: "Chest percussion, postural drainage, and lung capacity restoration for COPD, asthma & post-op recovery.",
        icon: "Activity",
        badge: "Respiratory"
      },
      {
        slug: "neurological-rehab",
        path: "/neurological-rehab",
        title: "Neurological Rehabilitation",
        eyebrow: "Stroke & Neuro Recovery",
        desc: "Task-oriented physical therapy for stroke recovery, Parkinson’s, MS, and spinal cord injuries.",
        icon: "Activity",
        badge: "Neuro Rehab"
      },
      {
        slug: "sports-injury-rehab",
        path: "/sports-injury-rehab",
        title: "Sports Injury Rehabilitation",
        eyebrow: "Athletic Recovery",
        desc: "Fast-track athletic recovery for ligament tears (ACL/MCL), sprains, tendonitis, and muscle strains.",
        icon: "Activity",
        badge: "Sports"
      },
      {
        slug: "back-pain-treatment",
        path: "/back-pain-treatment",
        title: "Back & Neck Pain Physiotherapy",
        eyebrow: "Spine & Sciatica Relief",
        desc: "Spine realignment, core stabilization, and ergonomic therapy for herniated discs, neck pain & sciatica.",
        icon: "Activity",
        badge: "Spine Care"
      }
    ],
    faqs: [
      {
        q: "How long does a home physiotherapy session last?",
        a: "A standard home physiotherapy session typically lasts between 45 to 60 minutes, depending on the patient's condition, goals, and customized treatment plan."
      },
      {
        q: "What conditions can be treated with home physiotherapy?",
        a: "We treat a wide range of conditions including post-surgical rehabilitation (like joint replacements, ACL repairs), stroke and neurological disorders, sports injuries, chronic back, neck, or shoulder pain, arthritis, and geriatric mobility issues."
      },
      {
        q: "Do I need to prepare anything before the physiotherapist arrives?",
        a: "We suggest preparing a clean, well-lit, and comfortable space with enough room for a portable treatment table or basic exercises. We recommend wearing loose, comfortable sports clothing, and having any relevant medical reports or doctor referrals on hand."
      },
      {
        q: "Are your physiotherapists licensed in Dubai?",
        a: "Yes, all our physical therapists are fully licensed by the Dubai Health Authority (DHA), carry extensive clinical experience, and are fully vetted through rigorous background checks."
      },
      {
        q: "How many sessions will I need to see results?",
        a: "This varies significantly depending on the severity of your condition. After the initial assessment during the first visit, our therapist will outline a clear treatment plan and estimate the number of sessions required."
      }
    ]
  },
  "iv-therapy": {
    title: "IV Drip Therapy",
    eyebrow: "DHA-approved premium IV drips at home",
    tagline: "Instant hydration, immunity boosts, and cellular wellness delivered directly to your doorstep.",
    description: "Feeling fatigued, dehydrated, or recovering from jet lag? Our premium IV drip therapy services bring instant cellular hydration, immune support, and essential vitamins directly to your doorstep. Relax in your home, hotel, or office while our DHA-registered nurses administer customized wellness infusions.",
    icon: "Droplets",
    themeColor: "#5eb63b",
    floatingBadge: {
      title: "Rapid Cellular Rehydration",
      desc: "Formulated drips tailored to restore energy and wellness."
    },
    benefits: [
      { title: "Premium Blends", desc: "DHA-approved vitamin formulations for energy, immunity & beauty" },
      { title: "Expert Care", desc: "Administered by licensed DHA-registered nurses in 30-45 minutes" },
      { title: "Direct Absorption", desc: "100% absorption for immediate hydration, detox & cell revitality" },
      { title: "Sterile Setup", desc: "Safe, clean clinical setup at your convenient time and location" }
    ],
    faqs: [
      {
        q: "What is IV Drip Therapy and how does it work?",
        a: "IV (Intravenous) Therapy delivers a sterile liquid mixture of vitamins, minerals, antioxidants, and hydration directly into your bloodstream. This bypassing of the digestive system ensures maximum absorption and immediate cellular effect."
      },
      {
        q: "How long does a home IV drip session take?",
        a: "A typical IV therapy session takes between 30 to 45 minutes to complete. Our DHA-licensed nurse will set up the drip, monitor your vital signs throughout, and remain with you until completion."
      },
      {
        q: "Is IV Drip Therapy safe?",
        a: "Yes, IV therapy is highly safe when administered by qualified medical professionals. Before starting, our nurse performs a brief health assessment, checks your vitals, and reviews your medical history to ensure the treatment is suitable for you."
      },
      {
        q: "What types of IV drips do you offer?",
        a: "We offer an extensive menu of drips, including hydration-focused drips, the classic Myer's Cocktail, Immune Boosters, Detox & Cleanse (Glutathione & Vitamin C), NAD+ Anti-Aging infusions, and customized athletic recovery formulas."
      },
      {
        q: "Can I receive IV drips regularly?",
        a: "Yes, many clients benefit from weekly, bi-weekly, or monthly sessions depending on their active lifestyle and wellness goals. Our team can advise on a frequency that aligns with your health needs."
      }
    ]
  },
  "nursing": {
    title: "Home Nursing Services",
    eyebrow: "24/7 DHA-licensed home nursing services",
    tagline: "Compassionate, high-quality clinical nursing care in the safety of your home.",
    description: "Need professional clinical care at home? Our highly skilled, DHA-licensed nurses provide comprehensive clinical support including post-operative care, wound dressing, injection administration, and chronic disease management. We ensure hospital-grade care in the privacy and security of your own residence.",
    icon: "Heart",
    themeColor: "#08709d",
    floatingBadge: {
      title: "Hospital-grade Care at Home",
      desc: "Compassionate clinical nursing support available 24/7."
    },
    benefits: [
      { title: "Licensed Nurses", desc: "Experienced DHA-registered nurses for pediatric & geriatric care" },
      { title: "Flexible Shifts", desc: "Flexible visits: hourly sessions, 12h shifts, or 24/7 care" },
      { title: "Clinical Standards", desc: "Hospital-grade clinical standards, hygiene, and monitoring" },
      { title: "Doctor-Guided", desc: "Close coordination with your family doctor or surgeon" }
    ],
    locations: [
      { label: "Palliative Care" },
      { label: "Night Care Nurse" },
      { label: "Nurse at Home for Injection" },
      { label: "Wound Care Services" },
      { label: "Oxygen Therapy" }
    ],
    faqs: [
      {
        q: "What clinical duties can a home nurse perform?",
        a: "Our DHA nurses are qualified to perform a wide range of tasks, including vital signs monitoring, complex wound care, dressing changes, administration of injections and IV medications, catheter management, post-surgery recovery assistance, and comprehensive health assessments."
      },
      {
        q: "Are your nurses licensed in Dubai?",
        a: "Absolutely. All our home care nurses are fully licensed by the Dubai Health Authority (DHA), hold active clinical degrees, and have substantial experience working in hospital environments."
      },
      {
        q: "Can I book a nurse for full-time 24/7 care?",
        a: "Yes. We offer highly flexible shifts to meet your specific homecare needs, ranging from a quick 1-hour service call, 12-hour day/night shifts, to complete 24/7 live-in nursing care."
      },
      {
        q: "How do you select the right nurse for my family?",
        a: "We match nurses to patients based on the specific clinical requirements of the patient (e.g., pediatric care, geriatric expertise, diabetic management) and cultural compatibility to ensure the most comfortable care experience."
      },
      {
        q: "Can a home nurse help with emergency medical cases?",
        a: "Our nurses are trained in BLS (Basic Life Support) and can respond to critical status changes. However, for any life-threatening medical emergency, you must dial 999 for ambulance services immediately."
      }
    ]
  },
  "doctor-on-call": {
    title: "Doctor On Call Services",
    eyebrow: "Urgent 24/7 doctor home visits in Dubai",
    tagline: "Professional medical consultation at your home or hotel in 30 to 45 minutes.",
    description: "Facing an acute illness, fever, or stomach pain? Skip the long hospital wait times. Our licensed doctors are available 24 hours a day to provide immediate medical consultation, on-the-spot diagnostics, and treatment plans in your home, hotel room, or workplace in under 45 minutes.",
    icon: "Stethoscope",
    themeColor: "#08709d",
    locations: [
      { label: "Doctor at Home" },
      { label: "Doctor at Office" },
      { label: "Doctor at Hotel" }
    ],
    floatingBadge: {
      title: "Urgent Medical Consultation",
      desc: "Qualified medical doctors at your doorstep day or night."
    },
    benefits: [
      { title: "Rapid Response", desc: "DHA-licensed family physicians arriving in 30-45 minutes" },
      { title: "24/7 Medical Care", desc: "Round-the-clock support on weekends and public holidays" },
      { title: "Diagnostics On-site", desc: "On-site diagnostic checks & electronic prescriptions" },
      { title: "Official Certification", desc: "Official medical certificates & insurance claim documentation" }
    ],
    faqs: [
      {
        q: "How quickly can a doctor reach my home or hotel in Dubai?",
        a: "Our typical response time is between 30 to 45 minutes from the moment your request is confirmed, depending on your precise location and traffic conditions in Dubai."
      },
      {
        q: "What illnesses and conditions can the Doctor On Call treat?",
        a: "We treat a wide range of acute, non-life-threatening conditions, including high fever, seasonal flu, respiratory infections, severe throat pain, food poisoning, vomiting/nausea, urinary tract infections (UTIs), ear/eye infections, back pain, and mild asthma."
      },
      {
        q: "Can your doctor issue official prescriptions and sick leaves?",
        a: "Yes. Our DHA-licensed doctors can write official DHA-compliant electronic prescriptions that are accepted at all pharmacies, order necessary laboratory tests, and issue official medical certificates or sick leaves."
      },
      {
        q: "Can the doctor perform diagnostic tests during the home visit?",
        a: "Yes, our doctors come equipped with diagnostic kits to check blood glucose, perform rapid strep tests, urine tests, check ECG, and check general vitals. We can also coordinate mobile home X-rays and blood collection if required."
      },
      {
        q: "Is this service covered by medical insurance?",
        a: "We provide detailed medical reports, invoices, and insurance reimbursement forms with DHA stamps, which you can submit to your insurance company for reimbursement according to your policy terms."
      },
      {
        q: "How long does the doctor take to arrive in Dubai?",
        a: "Our doctor at home visits in Dubai are completed within 30–45 minutes, depending on the patient's location, traffic conditions, and doctor availability."
      },
      {
        q: "What are the charges for a doctor's home visit in Dubai?",
        a: "At CORX, the consultation cost depends on the location, timing, medical condition, and treatment required. Pricing may vary for late-night visits, IV therapy, laboratory services, or additional procedures."
      },
      {
        q: "Are your doctors DHA-approved?",
        a: "Yes. All doctors providing home visit consultations are DHA-licensed and authorized to practice in Dubai according to Dubai healthcare regulations."
      }
    ]
  },
  "doctor-at-home": {
    title: "Doctor at Home",
    eyebrow: "24/7 doctor home visits in Dubai",
    tagline: "A licensed doctor at your doorstep in 30–45 minutes, day or night.",
    description: "Don't let illness force you out of the comfort of your home. Our DHA-licensed doctors visit your residence in Dubai within 30–45 minutes, providing on-the-spot diagnosis, treatment, prescriptions, and medical certificates — all from the comfort of your home.",
    icon: "Stethoscope",
    themeColor: "#08709d",
    benefits: [
      { title: "Fast Home Arrival", desc: "Doctor at your door within 30–45 minutes of booking" },
      { title: "Full Diagnosis", desc: "On-site vitals, ECG, blood glucose & rapid diagnostic checks" },
      { title: "Official Prescriptions", desc: "DHA-compliant e-prescriptions accepted at all pharmacies" },
      { title: "24/7 Availability", desc: "Round-the-clock service including weekends & public holidays" }
    ],
    faqs: [
      {
        q: "How long does the doctor take to arrive in Dubai?",
        a: "Our doctor at home visits in Dubai are completed within 30–45 minutes, depending on the patient's location, traffic conditions, and doctor availability."
      },
      {
        q: "What are the charges for a doctor's home visit in Dubai?",
        a: "At CORX, the consultation cost depends on the location, timing, medical condition, and treatment required. Pricing may vary for late-night visits, IV therapy, laboratory services, or additional procedures."
      },
      {
        q: "Are your doctors DHA-approved?",
        a: "Yes. All doctors providing home visit consultations are DHA-licensed and authorized to practice in Dubai according to Dubai healthcare regulations."
      },
      {
        q: "What conditions can a home visit doctor treat?",
        a: "We treat acute, non-life-threatening conditions including fever, flu, respiratory infections, food poisoning, UTIs, ear/eye infections, back pain, and mild asthma."
      },
      {
        q: "Can the doctor issue a sick leave certificate?",
        a: "Yes. Our DHA-licensed doctors can issue official sick leave certificates and medical reports accepted by employers and insurance companies."
      }
    ]
  },
  "doctor-at-office": {
    title: "Doctor at Office",
    eyebrow: "Corporate medical visits across Dubai",
    tagline: "Professional medical care delivered directly to your workplace in Dubai.",
    description: "Keep your team healthy and productive. Our DHA-licensed doctors visit your office, corporate campus, or workplace across Dubai to provide on-site consultations, health screenings, medical certificates, and treatment — without disrupting your workday.",
    icon: "Briefcase",
    themeColor: "#08709d",
    benefits: [
      { title: "Zero Downtime", desc: "Doctor comes to your office — no hospital queues or travel" },
      { title: "Corporate Packages", desc: "Tailored health plans for teams, SMEs, and large enterprises" },
      { title: "On-Site Diagnostics", desc: "Vitals, ECG, blood glucose & rapid tests done at your desk" },
      { title: "Medical Certificates", desc: "Official DHA-certified documents for insurance & HR records" }
    ],
    faqs: [
      {
        q: "Which Doctor has more demand in Dubai?",
        a: "Doctors of any specialisation remain one of the highest paying jobs in Dubai. The most in-demand doctors in Dubai are dermatologists, neurologists, general physicians and specialist doctors."
      },
      {
        q: "How old are most doctors?",
        a: "We analyzed more than 810,000 healthcare providers tracked in the Definitive Healthcare PhysicianView product with a reported birth year. The average age of these providers is 53.9 years old as of 2023."
      },
      {
        q: "Can I carry Viagra to Dubai?",
        a: "Viagra is a brand name of sildenafil citrate. This drug is not featured on the MoH's list of controlled drugs, so you should be able to take it into Dubai. However, if you are ever unsure then check with your doctor."
      },
      {
        q: "Can doctors get Dubai citizenship?",
        a: "Following are the eligibility criteria to apply for UAE citizenship: Exceptional talent or skill: Professionals, artists, doctors, scientists, and investors who contribute significantly to the UAE's development may be eligible."
      },
      {
        q: "Which hospital is free in Dubai?",
        a: "There are two main governmental hospitals in Bur Dubai and Deira which are Al Mankhool Health Center and HMC. All government hospitals including Al Kuwait Hospital and Rashid Hospital offer free emergency treatment in Dubai."
      },
      {
        q: "Which is the biggest degree in doctor?",
        a: "The ambitious Doctor of Medicine degree — doctors who intend to have the highest professional achievements generally wish to pursue a DM course."
      }
    ]
  },
  "doctor-at-hotel": {
    title: "Doctor at Hotel",
    eyebrow: "Hotel room medical visits in Dubai",
    tagline: "Feeling unwell while travelling? A doctor at your hotel room in 30–45 minutes.",
    description: "Travelling to Dubai and feeling unwell? Skip the unfamiliar hospital and let our DHA-licensed doctors come directly to your hotel room. We provide prompt, professional medical consultations, on-site diagnostics, prescriptions, and medical documentation — so you can recover in comfort and get back to enjoying Dubai.",
    icon: "Building",
    themeColor: "#08709d",
    benefits: [
      { title: "Hotel Room Visits", desc: "Doctor arrives at any hotel in Dubai within 30–45 minutes" },
      { title: "Tourist-Friendly", desc: "English-speaking doctors familiar with international patient care" },
      { title: "Travel Insurance Docs", desc: "Detailed medical reports compatible with travel insurance claims" },
      { title: "24/7 Availability", desc: "Available any time — day or night, weekends & public holidays" }
    ],
    faqs: [
      {
        q: "How do I call a doctor in Dubai?",
        a: "You can arrange a doctor at hotel by contacting our team and sharing your hotel location, symptoms, and preferred time. Simply call us at ☎️ +971 4 332 0776, 📱 +971 54 703 3311, or 📱 +971 50 278 5990, or WhatsApp us at +971 4 332 0776, and our team of doctors will arrive at your doorstep within 30 minutes."
      },
      {
        q: "What conditions can be treated during a hotel doctor visit?",
        a: "A Doctor at hotel service is commonly arranged for non-emergency conditions such as fever, flu symptoms, stomach discomfort, minor infections, and general health concerns. The doctor will assess your condition and advise on appropriate treatment or further care if required."
      },
      {
        q: "Is Doctor at hotel service suitable for tourists and business travelers?",
        a: "Yes, the doctor at hotel service is targeted at tourists, business travelers and locals who want to have medical check-ups without having to leave their hotels. It provides a convenient choice to get professional help and feel comfortable and private."
      },
      {
        q: "How quickly can a doctor visit my hotel in Dubai?",
        a: "Visit timing depends on factors such as location, availability, and time of request. Our team coordinates scheduling to arrange a doctor at hotel as promptly as possible while ensuring appropriate care and service quality."
      },
      {
        q: "Is the doctor at hotel service available across Dubai?",
        a: "Yes, a doctor at hotel service can be arranged across major areas such as Downtown Dubai, Business Bay, Dubai Marina, JBR, Al Barsha & Sheikh Zayed Road, Deira & Bur Dubai, and Palm Jumeirah. Availability may vary based on location and time, and our team will confirm scheduling accordingly."
      },
      {
        q: "What if I need a Doctor follow-up visit in my hotel room?",
        a: "Follow-up visits can be arranged based on your condition and the doctor’s advice. Our team can coordinate additional doctors at your hotel if required, ensuring continuity of care during your stay. Scheduling is flexible and organized according to availability and your medical needs."
      }
    ]
  },
  "elderly-care": {
    title: "Elderly Home Care Services",
    eyebrow: "Compassionate senior care & companionship",
    tagline: "Dedicated care, support, and companionship for your senior loved ones.",
    description: "Want the best comfort and support for your aging loved ones? Our empathetic caregivers provide professional assistance with daily activities, personal hygiene, nutritional support, mobility, and medication reminders. We help seniors live safely, happily, and independently in their familiar home surroundings.",
    icon: "Users",
    themeColor: "#5eb63b",
    floatingBadge: {
      title: "Empathetic Senior Care",
      desc: "Committed to senior safety, dignity, and companionship."
    },
    benefits: [
      { title: "Specialized Staff", desc: "Trained caregivers for cognitive, dementia & Alzheimer's support" },
      { title: "Daily Assistance", desc: "Companionship, daily mobility support, and fall prevention" },
      { title: "Family Peace of Mind", desc: "Continuous updates and clear communication with family members" },
      { title: "Flexible Live-In", desc: "Tailored care schedules from basic check-ins to 24/7 live-in care" }
    ],
    faqs: [
      {
        q: "What is the difference between elderly care and home nursing?",
        a: "Elderly care focuses primarily on non-clinical assistance with daily living (ADLs), such as personal hygiene, mobility support, light meal preparation, medication reminders, and warm companionship. Home nursing, by contrast, involves medical clinical tasks like administering injections, IV therapy, and wound care handled by DHA-licensed nurses."
      },
      {
        q: "Are your caregivers trained to support dementia or Alzheimer's patients?",
        a: "Yes, our team of caregivers is specially trained in senior dementia care, cognitive stimulation, and managing Alzheimer's behaviors with patience, compassion, and safety."
      },
      {
        q: "Can we hire an elderly caregiver for overnight shifts?",
        a: "Absolutely. We offer overnight care options where our caregiver remains awake or on standby to assist with midnight bathroom visits, fluid intake, and overall overnight safety."
      },
      {
        q: "How do you guarantee my loved one's safety at home?",
        a: "All our care providers undergo extensive background checks, standard reference validation, and continuous training in transfer techniques, fall prevention, emergency response, and elderly safety protocols."
      },
      {
        q: "Can I adjust the care plan if our needs change?",
        a: "Yes. Our care plans are fully flexible. We schedule regular assessments and work with you to scale care up or down, or transition from basic caregiving to clinical nursing if medical needs evolve."
      }
    ]
  },
  "lab-services": {
    title: "Lab Test at Home Services",
    eyebrow: "Standardized home blood collection & diagnostics",
    tagline: "Professional blood tests and sample collection in the comfort of your home.",
    description: "Need diagnostic screening or a routine blood check? Arrange your medical laboratory tests at home without clinical lines or stressful travel. Our DHA-licensed nurses will visit you to collect samples, transport them safely, and deliver 100% accurate results directly from accredited labs.",
    icon: "Activity",
    themeColor: "#08709d",
    floatingBadge: {
      title: "Accredited Lab Diagnostics",
      desc: "Clean, certified medical blood tests right at your home."
    },
    benefits: [
      { title: "Stress-Free", desc: "Simple blood & sample collection right at your home or office" },
      { title: "Licensed Nurses", desc: "DHA-licensed nurses using strict sterile clinical protocols" },
      { title: "Accurate Reports", desc: "100% accurate results from fully accredited laboratory partners" },
      { title: "Fast Reporting", desc: "Fast digital report delivery via email/WhatsApp in 24 hours" }
    ],
    faqs: [
      {
        q: "How can I book a blood test at home in Dubai?",
        a: "You can arrange a blood test at home by contacting our team and sharing your requirements. A suitable appointment is scheduled for sample collection at your location. In case of emergency, directly call us at: ☎️ +971 4 332 0776, 📱 +971 54 703 3311, or 📱 +971 50 278 5990."
      },
      {
        q: "What are the benefits of lab tests at home from Corx Home Healthcare?",
        a: "Corx Home Healthcare is dedicated to providing unparalleled comfort and convenience to our patients. Our at-home lab test service is designed to be excellent, confidential, and hassle-free. Here are some key benefits of choosing Corx Healthcare for your at-home lab tests:\n\n- **24/7 Availability**: No more waiting; our services are available round-the-clock.\n- **No Queues**: Skip the long lines and get tested in the comfort of your home.\n- **Hassle-Free Process**: Our blood test procedures at home are simple and straightforward.\n- **Certified Professionals**: Our team of DHA-licensed nurses and doctors ensure convenient and professional blood sample collection.\n- **Accurate Results**: We provide 100% accurate results, giving you peace of mind.\n- **High Standards**: Our processes adhere to DHA’s top-level hygiene and quality standards.\n\nExperience the convenience and reliability of home healthcare with Corx Home Healthcare."
      },
      {
        q: "Is a blood test at home safe?",
        a: "Our blood test home service is carried out by trained professionals following hygiene and safety protocols to ensure a reliable and safe process."
      },
      {
        q: "Can I do a full body checkup at home?",
        a: "Yes, health screening packages and multiple medical lab tests can be arranged at home based on your requirements."
      },
      {
        q: "How long does it take to receive results?",
        a: "Once our team collects your sample from your doorstep, it is immediately taken to our standardized labs for testing. You will receive a specific time frame for when to expect your results, which are typically delivered within 24 hours."
      },
      {
        q: "What is the price of lab tests at home in Dubai?",
        a: "The cost of lab tests at home in Dubai varies depending on the type of blood test. Pricing is usually based on the specific investigations required. You can request details to receive accurate information based on your needs."
      },
      {
        q: "How are my lab results delivered to me?",
        a: "Lab results are typically shared digitally through secure channels such as email or messaging, depending on the service provider. The timeline for receiving results may vary based on the type of test performed."
      }
    ]
  },
  "palliative-care": {
    title: "Palliative Care at Home",
    eyebrow: "Compassionate supportive care in Dubai",
    tagline: "Specialized medical support to enhance comfort, dignity, and quality of life at home.",
    description: "Facing a serious, chronic, or advanced illness? Our specialized home palliative care team is dedicated to providing comfort, pain relief, and emotional support. Led by DHA-licensed doctors and compassionate nurses, we work closely with your family to ensure the highest quality of life in a familiar and comforting environment.",
    icon: "Heart",
    themeColor: "#08709d",
    floatingBadge: {
      title: "Compassionate Care",
      desc: "Specialized pain relief and supportive care at home."
    },
    benefits: [
      { title: "Pain & Symptom Control", desc: "Advanced medical management for pain, nausea, and persistent physical discomfort" },
      { title: "24/7 Comfort Support", desc: "Compassionate clinical nursing support available day and night" },
      { title: "Emotional & Family Care", desc: "Counseling, psychological guidance, and relief for family caregivers" },
      { title: "Doctor-Coordinated", desc: "DHA-licensed physician reviews and tailored clinical management plans" }
    ],
    faqs: [
      {
        q: "What is home palliative care and how does it help?",
        a: "Home palliative care is specialized medical care focused on providing relief from the symptoms, pain, and physical/emotional stress of a serious illness. It aims to improve quality of life for both the patient and their family."
      },
      {
        q: "Who is eligible for home palliative care?",
        a: "Palliative care is appropriate for patients of any age and at any stage in a serious, chronic, or advanced illness, such as cancer, advanced heart or lung disease, kidney failure, or progressive neurological disorders."
      },
      {
        q: "Is palliative care only for end-of-life care?",
        a: "No. Palliative care can be provided alongside curative treatments. It focuses on comforting and managing symptoms, and it is beneficial at any phase of a chronic condition."
      },
      {
        q: "How does your team manage severe pain at home?",
        a: "Our DHA-licensed nurses and doctors utilize doctor-prescribed medication plans, regular vitals monitoring, pain-relief therapies, and clinical comfort protocols to effectively manage severe pain in your residence."
      },
      {
        q: "Can I receive palliative care together with other doctor treatments?",
        a: "Yes. Our team coordinates closely with your primary oncologist, cardiologist, surgeon, or family physician to ensure our palliative support aligns perfectly with your overall medical treatment plan."
      }
    ]
  },
  "night-care-nurse": {
    title: "Night Care Nursing Services",
    eyebrow: "Restful sleep and overnight clinical safety",
    tagline: "Professional overnight nursing care for continuous monitoring, safety, and peace of mind.",
    description: "Ensure your loved ones are safe, monitored, and comfortable through the night. Our experienced DHA-licensed night nurses offer professional medical monitoring, midnight medication administration, posture positioning, and urgent emergency response, allowing family members to rest easy knowing their relative is in skilled hands.",
    icon: "Clock",
    themeColor: "#08709d",
    floatingBadge: {
      title: "Overnight Safety",
      desc: "DHA-licensed night nurses available for 12h overnight shifts."
    },
    benefits: [
      { title: "Continuous Night Vitals", desc: "Overnight health monitoring, oxygen checks, and clinical safety sweeps" },
      { title: "Nocturnal Medication", desc: "Timely administration of midnight, late-night, or early-morning clinical doses" },
      { title: "Fall & Mobility Prevention", desc: "Safe assistance with overnight transfers, transfers to bed, and bathroom trips" },
      { title: "Rest for Family Caregivers", desc: "Complete peace of mind and quality sleep for family members during the night" }
    ],
    faqs: [
      {
        q: "What are the typical hours for a night care nurse shift?",
        a: "A typical night shift runs for 12 hours, commonly from 8:00 PM to 8:00 AM or 9:00 PM to 9:00 AM, but we can customize timing based on your household's specific needs."
      },
      {
        q: "What specific medical tasks can the night nurse perform?",
        a: "Our night nurses are DHA-registered and fully qualified to monitor vital signs, administer oral or IV medications, manage catheters, assist with feeding tubes, perform wound dressings, and provide emergency BLS (Basic Life Support) if necessary."
      },
      {
        q: "Is overnight nursing care suitable for post-operative recovery?",
        a: "Absolutely. Post-surgery patients often require frequent pain medication, drainage monitoring, and assistance with repositioning or using the restroom during the first few nights, making a night nurse highly recommended."
      },
      {
        q: "Can we book a night nurse on a regular, long-term basis?",
        a: "Yes, we support both short-term needs (such as post-discharge recovery) and long-term recurring packages to ensure consistent overnight clinical supervision for elderly or chronic patients."
      },
      {
        q: "How quickly can you arrange a night nurse to visit our home in Dubai?",
        a: "Depending on nurse availability, we can typically confirm and dispatch a qualified DHA-registered night nurse to your home, hotel, or office within a few hours of booking."
      }
    ]
  },
  "injection-at-home": {
    title: "Injection at Home Services",
    eyebrow: "Accurate, painless injection administration",
    tagline: "DHA-licensed nursing visits for quick, professional, and sterile injection administration.",
    description: "Skip the clinic lines and daily travel stress. Our DHA-licensed nurses visit your home, hotel, or office to administer scheduled injections safely and professionally. From intravenous (IV), intramuscular (IM), and subcutaneous (SC) medications to hormone injections and regular therapeutics, we ensure full compliance and clinical precision.",
    icon: "Activity",
    themeColor: "#5eb63b",
    floatingBadge: {
      title: "At-Home Injections",
      desc: "Professional injection visits without clinic waiting queues."
    },
    benefits: [
      { title: "Sterile Protocol", desc: "Strict hospital-grade hygiene, disposable clinical kits, and safety compliance" },
      { title: "All Injection Routes", desc: "Expert administration of intramuscular (IM), subcutaneous (SC), and IV injections" },
      { title: "Zero Commute Stress", desc: "Avoid daily clinic trips for regular treatments, hormone cycles, or antibiotics" },
      { title: "Authorized Execution", desc: "Rigorous verification of doctor prescriptions and precise medication dosage" }
    ],
    faqs: [
      {
        q: "Do I need a doctor's prescription for home injection services?",
        a: "Yes. For patient safety and legal compliance under DHA regulations, we require a valid doctor's prescription specifying the medication, exact dosage, and administration route."
      },
      {
        q: "What types of injections can your home care nurses administer?",
        a: "Our nurses can administer all standard clinical injections including insulin, hormone therapies, subcutaneous blood thinners, intramuscular vitamin shots, regular antibiotics, and intravenous medications."
      },
      {
        q: "Does CORX supply the injection medication or do I need to buy it?",
        a: "Patients typically purchase their prescribed medications from local pharmacies. However, our nurse will arrive with all necessary clinical single-use supplies, including sterile syringes, alcohol swabs, tape, and disposal containers."
      },
      {
        q: "Is it safe and clean to get an injection at home?",
        a: "Yes, our DHA-licensed nurses follow strict, hospital-grade sterile techniques and hygiene protocols to perform injections, minimizing any risk of clinical contamination or infection."
      },
      {
        q: "Can I schedule daily or weekly visits for recurring injection treatments?",
        a: "Yes. We offer flexible scheduling packages. A nurse can visit your location daily, weekly, or on specific scheduled days to match your therapeutic course."
      }
    ]
  },
  "wound-care": {
    title: "Wound Care at Home",
    eyebrow: "Advanced clinical dressing & wound healing",
    tagline: "Specialized nursing care for rapid, infection-free, and professional wound healing.",
    description: "Struggling with post-surgical incisions, diabetic ulcers, or minor burns? Our DHA-licensed home wound care team provides highly specialized dressing, disinfection, and tissue regeneration support. We utilize state-of-the-art sterile materials and wound-healing techniques to promote rapid recovery while preventing critical hospital infections.",
    icon: "Shield",
    themeColor: "#08709d",
    floatingBadge: {
      title: "Advanced Wound Dressing",
      desc: "Specialized wound care from DHA-licensed nurses."
    },
    benefits: [
      { title: "Post-Surgical Healing", desc: "Sterile dressing changes for surgical sutures, surgical clips, and post-op incisions" },
      { title: "Chronic Ulcer Support", desc: "Advanced management for diabetic foot ulcers, pressure sores, and venous ulcers" },
      { title: "Sterile Single-Use Kits", desc: "Hospital-grade clinical dressing materials, antiseptic washes, and barriers" },
      { title: "Progress Reporting", desc: "Continuous documentation of wound healing progress shared with your surgeon" }
    ],
    faqs: [
      {
        q: "What kinds of wounds do your home care nurses treat?",
        a: "We treat post-surgical wounds, orthopedic incision lines, diabetic foot ulcers, bedsores (pressure ulcers), minor burns, skin grafts, and wounds requiring specialized compression dressings."
      },
      {
        q: "How often does a wound dressing need to be changed?",
        a: "This depends entirely on the type, size, and drainage level of the wound. Some surgical wounds require daily dressings, while others may only need changes every 2 to 3 days. Our nurse will establish a clinical schedule after the first assessment."
      },
      {
        q: "Can home wound care prevent infection?",
        a: "Yes. Getting dressings done at home by a DHA-licensed nurse prevents exposure to drug-resistant hospital-acquired infections. Our team works with complete aseptic techniques to keep wounds clean and sterile."
      },
      {
        q: "What dressing materials and solutions does the nurse bring?",
        a: "Our nurses come equipped with advanced sterile dressings, non-adherent pads, hydrogels, calcium alginates, antimicrobial silver dressings, and medical-grade saline/cleansers tailored to support cellular repair."
      },
      {
        q: "Can your nurses remove surgical sutures or staples at home?",
        a: "Yes. With a doctor's written approval or surgeon's instruction, our DHA-licensed nurses can safely perform suture or staple removal in your home once the incision has fully closed."
      }
    ]
  },
  "oxygen-therapy": {
    title: "Oxygen Therapy at Home",
    eyebrow: "Professional respiratory support & oxygenation",
    tagline: "Safe, regulated oxygen administration and respiratory therapy at your doorstep.",
    description: "Struggling with shortness of breath, COPD, or recovering from respiratory illness? Our professional home healthcare team provides safe, reliable oxygen therapy setup and nursing monitoring. Led by DHA-licensed clinical practitioners, we ensure accurate flow-rate calibration, pulse oximetry tracking, and equipment management to optimize your lung health and overall vitality.",
    icon: "Activity",
    themeColor: "#5eb63b",
    floatingBadge: {
      title: "Respiratory Care",
      desc: "Safe home oxygen support and vital signs tracking."
    },
    benefits: [
      { title: "Flow Calibration", desc: "Precise oxygen flow adjustments in complete alignment with your doctor's script" },
      { title: "Saturation Tracking", desc: "Continuous monitoring of blood oxygen (SpO2), heart rate, and respiratory rate" },
      { title: "Equipment Safety", desc: "Nursing supervision of oxygen concentrators, oxygen tanks, nasal cannulas, and masks" },
      { title: "Nebulizer Integration", desc: "Combination of nebulizer therapy, breathing exercises, and clinical chest physio if needed" }
    ],
    faqs: [
      {
        q: "Do I need a doctor's prescription for home oxygen therapy?",
        a: "Yes. Oxygen is a medical gas and must be administered under a doctor's prescription detailing the oxygen flow rate (liters per minute) and duration of use."
      },
      {
        q: "What equipment is used to deliver oxygen at home?",
        a: "Home oxygen therapy is typically delivered using a stationary oxygen concentrator (which filters oxygen from room air) or portable oxygen cylinders, connected to a nasal cannula or face mask."
      },
      {
        q: "How does a home care nurse assist with my oxygen therapy?",
        a: "Our nurse will monitor your blood oxygen saturation (SpO2) levels using pulse oximetry, verify that the equipment is functioning properly, track your respiratory rate, check your chest sounds, and ensure you receive the correct therapeutic flow."
      },
      {
        q: "Is it safe to use oxygen therapy equipment at home?",
        a: "Yes, it is highly safe when handled correctly. Our nurses will educate you and your family on critical safety guidelines, such as keeping oxygen sources away from open flames, heat, or smoking."
      },
      {
        q: "Can you also perform nebulizer treatments during the nursing visit?",
        a: "Yes. If your doctor has prescribed bronchodilator or steroid medications via a nebulizer for asthma, COPD, or bronchitis, our nurse can set up and administer the treatment during their visit."
      }
    ]
  }
};
servicesData["geriatric-physiotherapy"] = {
  ...servicesData["physiotherapy"],
  title: "Geriatric Physiotherapy at Home",
  eyebrow: "Specialized Senior Mobility & Fall Prevention in Dubai",
  tagline: "Helping seniors maintain independence, balance, and pain-free movement at home.",
  description: "Aging can impact joint flexibility, muscle strength, and balance. Our DHA-licensed geriatric physiotherapists visit senior patients at home to deliver safe, low-impact exercises, gait training, and fall-prevention routines tailored for senior comfort.",
  about_section_title: "About Senior & Geriatric Physiotherapy at Home",
  indications_title: "Who Needs Geriatric Physiotherapy?",
  indications: [
    "Senior citizens experiencing balance issues or frequent falls",
    "Post-stroke or neurological mobility impairment in elderly",
    "Arthritis, joint stiffness, and chronic hip/knee pain",
    "Post-hip replacement or orthopedic surgery recovery",
    "General muscle weakness and difficulty standing or walking",
    "Parkinson's disease mobility and gait maintenance"
  ]
};
servicesData["chest-physiotherapy"] = {
  ...servicesData["physiotherapy"],
  title: "Chest & Respiratory Physiotherapy",
  eyebrow: "At-Home Cardiorespiratory Rehabilitation in Dubai",
  tagline: "Improve breathing, clear lung secretions, and boost lung capacity at home.",
  description: "Recovering from pneumonia, COPD, bronchitis, or chest surgery? Our specialized respiratory physical therapists provide chest percussion, postural drainage, breathing exercises, and lung expansion therapy in the comfort of your residence.",
  about_section_title: "About Chest & Respiratory Physiotherapy",
  indications_title: "Who Benefits from Chest Physiotherapy?",
  indications: [
    "Patients recovering from pneumonia or chest infections",
    "Chronic Obstructive Pulmonary Disease (COPD) management",
    "Post-cardiac or abdominal surgery respiratory recovery",
    "Bronchiectasis, asthma, and chronic mucus buildup",
    "Bedridden patients needing lung secretion clearance",
    "Shortness of breath and reduced lung capacity support"
  ]
};
servicesData["neurological-rehab"] = {
  ...servicesData["physiotherapy"],
  title: "Neurological Rehabilitation at Home",
  eyebrow: "Stroke, Parkinson's & Neurological Care in Dubai",
  tagline: "Restoring neuromuscular function, motor skills, and physical independence.",
  description: "Our DHA-certified neuro-physiotherapists specialize in rehabilitation for stroke recovery, Parkinson's disease, multiple sclerosis, and spinal cord injuries. We provide structured, task-oriented physical therapy to retrain brain and body pathways.",
  about_section_title: "About Neurological Rehabilitation at Home",
  indications_title: "Who Needs Neurological Rehabilitation?",
  indications: [
    "Post-stroke hemiplegia and arm/leg weakness recovery",
    "Parkinson's disease balance, tremor, and gait training",
    "Multiple Sclerosis (MS) mobility and fatigue management",
    "Spinal cord injury and peripheral neuropathy rehabilitation",
    "Traumatic brain injury (TBI) motor skill retraining",
    "Balance disorders, vertigo, and ataxia movement therapy"
  ]
};
servicesData["sports-injury-rehab"] = {
  ...servicesData["physiotherapy"],
  title: "Sports Injury Rehabilitation at Home",
  eyebrow: "Advanced Athletic Recovery & Joint Mobilization in Dubai",
  tagline: "Fast-track your athletic recovery and return to peak performance safely.",
  description: "Sustained a ligament tear, ankle sprain, tendonitis, or muscle strain? Our experienced sports physiotherapists bring targeted manual therapy, joint mobilization, and sport-specific conditioning directly to your home or hotel room.",
  about_section_title: "About Sports Injury Rehabilitation at Home",
  indications_title: "Who Needs Sports Injury Rehabilitation?",
  indications: [
    "ACL/MCL knee ligament tears and post-op rehabilitation",
    "Ankle sprains, hamstring strains, and calf tears",
    "Rotator cuff tendonitis and shoulder impingement",
    "Tennis elbow, golfer's elbow, and wrist injuries",
    "Runner's knee, shin splints, and Achilles tendonitis",
    "Post-fracture joint stiffness and mobility restoration"
  ]
};
servicesData["back-pain-treatment"] = {
  ...servicesData["physiotherapy"],
  title: "Back & Neck Pain Physiotherapy",
  eyebrow: "Spine Realignment & Chronic Pain Relief in Dubai",
  tagline: "Targeted spinal therapy, posture correction, and lasting pain relief.",
  description: "Suffering from sciatica, herniated discs, lower back stiffness, or neck tension? Our spine rehabilitation specialists provide targeted manual therapy, core stabilization, and ergonomic guidance to eliminate back pain safely at your home.",
  about_section_title: "About Back & Neck Pain Physiotherapy",
  indications_title: "Who Needs Back & Neck Pain Therapy?",
  indications: [
    "Lower back pain, lumbago, and muscle spasms",
    "Sciatica and radiating nerve pain down the leg",
    "Herniated or bulging disc pain management",
    "Cervical neck stiffness, headaches, and tension",
    "Postural dysfunction from long desk hours",
    "Spinal stenosis and degenerative disc disease"
  ]
};
servicesData["frozen-shoulder-physiotherapy"] = {
  ...servicesData["physiotherapy"],
  title: "Frozen Shoulder Physiotherapy",
  eyebrow: "Adhesive Capsulitis Therapy & Shoulder Mobility in Dubai",
  tagline: "Relieve shoulder stiffness, restore range of motion, and reduce pain.",
  description: "Struggling with adhesive capsulitis or frozen shoulder stiffness? Our DHA-licensed physiotherapists use joint mobilization, passive stretching, and targeted exercises at home to safely restore shoulder range of motion.",
  about_section_title: "About Frozen Shoulder Physiotherapy Treatment",
  indications_title: "Who Needs Frozen Shoulder Physiotherapy?",
  indications: [
    "Severe shoulder pain and restriction when lifting the arm",
    "Adhesive capsulitis stage 1 (freezing), stage 2 (frozen), or stage 3 (thawing)",
    "Post-shoulder surgery or post-immobilization stiffness",
    "Rotator cuff tenderness and sleeping difficulty due to shoulder pain",
    "Diabetic patients with increased risk of shoulder joint stiffness"
  ]
};
servicesData["pediatric-physiotherapy-services-dubai"] = {
  ...servicesData["physiotherapy"],
  title: "Pediatric Physiotherapy",
  eyebrow: "Specialized Physical Therapy for Children in Dubai",
  tagline: "Empowering children to reach key motor milestones and movement confidence.",
  description: "Our pediatric physiotherapists work with infants, toddlers, and children to treat developmental delays, muscular conditions, cerebral palsy, and posture imbalances through engaging, child-friendly therapy at home.",
  about_section_title: "About Pediatric Physiotherapy Services",
  indications_title: "Who Needs Pediatric Physiotherapy?",
  indications: [
    "Developmental motor delays (crawling, standing, walking)",
    "Pediatric cerebral palsy, spasticity, and muscle tone support",
    "Torticollis, plagiocephaly, and infant neck muscle stiffness",
    "Childhood gait abnormalities (toe-walking, flat feet)",
    "Post-fracture or sports injury recovery in young athletes"
  ]
};
servicesData["joint-pain-treatment"] = {
  ...servicesData["physiotherapy"],
  title: "Joint Pain Treatment & Rehabilitation",
  eyebrow: "Targeted Joint Relief & Arthritis Management in Dubai",
  tagline: "Comprehensive joint therapy for knee, hip, shoulder, and wrist pain.",
  description: "Suffer from osteoarthritis, rheumatoid joint pain, or persistent joint swelling? Our physiotherapists provide non-invasive joint mobilization, hydro-collator therapy, and muscle strengthening to improve joint health.",
  about_section_title: "About Joint Pain Treatment at Home",
  indications_title: "Who Needs Joint Pain Treatment?",
  indications: [
    "Knee joint osteoarthritis and cartilage wear pain",
    "Hip pain, stiffness, and difficulty walking",
    "Shoulder, elbow, and wrist joint inflammation",
    "Post-joint replacement (TKR/THR) rehabilitation",
    "Chronic swelling and morning joint stiffness"
  ]
};
servicesData["manual-therapy"] = {
  ...servicesData["physiotherapy"],
  title: "Manual Therapy Services",
  eyebrow: "Hands-On Clinical Soft Tissue & Joint Mobilization in Dubai",
  tagline: "Skilled hands-on techniques to release muscle knots and restore alignment.",
  description: "Manual therapy uses specialized hands-on techniques, myofascial release, joint manipulation, and soft tissue mobilization to reduce pain, release muscle tightness, and improve movement mechanics.",
  about_section_title: "About Manual Therapy at Home",
  indications_title: "Who Needs Manual Therapy?",
  indications: [
    "Chronic muscle knots, trigger points, and myofascial pain",
    "Spinal joint restriction and neck/back alignment issues",
    "Post-injury soft tissue tightness and scar tissue management",
    "Tension headaches caused by upper back and neck tightness"
  ]
};
servicesData["docotor-on-call"] = servicesData["doctor-on-call"];
servicesData["home-nursing"] = servicesData["nursing"];
servicesData["elderly-home-care"] = servicesData["elderly-care"];
servicesData["lab-test-at-home-dubai"] = servicesData["lab-services"];
servicesData["lab-test-at-home"] = servicesData["lab-services"];
servicesData["iv-therapy-iv-drip"] = servicesData["iv-therapy"];
servicesData["physiotherapy-services"] = servicesData["physiotherapy"];
servicesData["Physiotherapy-Services"] = servicesData["physiotherapy"];
servicesData["physiotherapy-at-home-in-dubai"] = servicesData["physiotherapy"];
servicesData["nurse-at-home-for-injection"] = servicesData["injection-at-home"];
servicesData["wound-care-service"] = servicesData["wound-care"];
servicesData["oxygen-theraphy"] = servicesData["oxygen-therapy"];
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
  slug = "default",
  defaultText = "",
  isEditMode = false,
  className = "",
  tagName = "span",
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
    const updated = e.currentTarget.innerText || e.currentTarget.textContent || "";
    setText(updated);
    try {
      localStorage.setItem(storageKey, updated);
    } catch (err) {
    }
  };
  const Component = tagName;
  const currentVal = text !== null && text !== void 0 ? text : defaultText;
  if (!isEditMode) {
    if (multiline && typeof currentVal === "string" && currentVal.includes("\n")) {
      const paragraphs = currentVal.split(/\n\n+/).filter(Boolean);
      return /* @__PURE__ */ jsx("div", { className, children: paragraphs.map((p, idx) => /* @__PURE__ */ jsx("p", { className: "mb-4 last:mb-0 leading-relaxed", children: p }, idx)) });
    }
    return /* @__PURE__ */ jsx(Component, { className, children: currentVal });
  }
  return /* @__PURE__ */ jsx(
    Component,
    {
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: handleBlur,
      className: `${className} outline-none focus:ring-2 focus:ring-[#08709d] focus:ring-offset-2 rounded px-2 py-0.5 transition-all cursor-text group border-2 border-dashed border-[#08709d]/60 hover:border-[#08709d] bg-[#08709d]/10 text-slate-900 inline-block`,
      title: "✏️ Click to edit text live",
      children: currentVal
    }
  );
}
function LabIllustration() {
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-[620px] mx-auto flex items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute w-96 h-96 bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "relative w-full bg-gradient-to-tr from-[#08709d]/10 via-[#08709d]/3 to-transparent p-6 rounded-[32px] border border-[#08709d]/10 shadow-xl", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-2xl border border-gray-150 p-10 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[440px]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 w-48 h-48 bg-[#08709d]/5 rounded-full blur-2xl pointer-events-none" }),
      /* @__PURE__ */ jsxs("svg", { width: "240", height: "240", viewBox: "0 0 200 200", fill: "none", className: "relative z-10 w-[88%] h-auto drop-shadow-md", children: [
        /* @__PURE__ */ jsx("circle", { cx: "100", cy: "100", r: "90", fill: "#08709d", fillOpacity: "0.04" }),
        /* @__PURE__ */ jsx("circle", { cx: "100", cy: "80", r: "42", fill: "#f4fafc", stroke: "#08709d", strokeWidth: "2.5" }),
        /* @__PURE__ */ jsx("rect", { x: "78", y: "118", width: "44", height: "38", rx: "8", fill: "#1a294a" }),
        /* @__PURE__ */ jsx("rect", { x: "88", y: "112", width: "24", height: "8", rx: "2", fill: "#22c55e" }),
        /* @__PURE__ */ jsx("path", { d: "M100 128v18M91 137h18", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("path", { d: "M45 160c0-22 22-40 55-40s55 18 55 40v10H45v-10z", fill: "#08709d" }),
        /* @__PURE__ */ jsx("path", { d: "M86 115v10h28v-10H86z", fill: "#f3d0b2" }),
        /* @__PURE__ */ jsx("circle", { cx: "100", cy: "94", r: "21", fill: "#f3d0b2" }),
        /* @__PURE__ */ jsx("path", { d: "M79 94c0-14 10-21 21-21s21 7 21 21H79z", fill: "#1a294a" }),
        /* @__PURE__ */ jsx("path", { d: "M82 125l18 30 18-30", stroke: "#fff", strokeWidth: "3.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("path", { d: "M88 105c0 12 24 12 24 0", stroke: "#1a294a", strokeWidth: "2.5", fill: "none", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("path", { d: "M100 117v12", stroke: "#1a294a", strokeWidth: "2.5" }),
        /* @__PURE__ */ jsx("circle", { cx: "100", cy: "133", r: "3.5", fill: "#22c55e" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 inline-flex items-center gap-2 bg-[#08709d]/10 px-4 py-1.5 rounded-full border border-[#08709d]/20", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#08709d] animate-pulse" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-bold text-[#08709d] uppercase tracking-wide", children: "DHA-Licensed · Results in 2-4 Hours" })
      ] })
    ] }) })
  ] });
}
function WhoMayNeedBloodTestSection({ indicationsList = [], serviceData, isEditMode, slug }) {
  const displayIndications = indicationsList || [];
  const defaultAboutDesc = (serviceData == null ? void 0 : serviceData.about_description) || (serviceData == null ? void 0 : serviceData.description) || "Blood testing is essential for monitoring health, diagnosing medical conditions, and evaluating organ function. With CORx Healthcare, you no longer need to travel to a lab or wait in crowded waiting rooms.\n\nOur DHA-certified nurses visit your home, hotel, or office with sterile, single-use sampling kits to collect blood samples comfortably and safely, delivering accurate digital lab reports within 2 to 4 hours.\n\nWhether you require routine body checkups, diabetes monitoring, lipid profiles, or specialized diagnostic screenings, our senior medical team ensures complete confidentiality and medical accuracy throughout.";
  return /* @__PURE__ */ jsx(Section, { variant: "slate", className: "py-16 md:py-24", children: /* @__PURE__ */ jsx(Container, { className: "max-w-[1480px]", children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 ${displayIndications.length > 0 ? "lg:grid-cols-2" : ""} gap-8 lg:gap-12 items-stretch`, children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-3xl border-l-[6px] border-l-[#08709d] border-t border-r border-b border-slate-200/90 bg-white p-6 sm:p-10 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-0 md:min-h-[540px]", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "about_eyebrow",
          defaultText: "ABOUT THE SERVICE",
          isEditMode,
          tagName: "span",
          className: "text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#08709d]/10 px-4 py-2 rounded-full border border-[#08709d]/20 inline-block"
        }
      ) }),
      /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "about_title",
          defaultText: (serviceData == null ? void 0 : serviceData.about_section_title) || ((serviceData == null ? void 0 : serviceData.title) ? `About ${serviceData.title}` : "About Blood Test at Home & Home Sample Collection"),
          isEditMode,
          tagName: "h2",
          className: "text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-6"
        }
      ),
      /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "about_custom_description",
          defaultText: defaultAboutDesc,
          isEditMode,
          tagName: "div",
          multiline: true,
          className: "text-slate-700 text-base sm:text-lg font-normal leading-relaxed font-sans"
        }
      )
    ] }) }),
    displayIndications.length > 0 && /* @__PURE__ */ jsx("div", { className: "rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 lg:p-14 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-0 md:min-h-[540px]", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "indications_eyebrow",
          defaultText: "CLINICAL INDICATIONS",
          isEditMode,
          tagName: "span",
          className: "text-emerald-700 text-xs sm:text-sm font-bold uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200/60 inline-block"
        }
      ) }),
      /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "indications_title",
          defaultText: (serviceData == null ? void 0 : serviceData.indications_title) || (serviceData == null ? void 0 : serviceData.indications_section_title) && serviceData.indications_section_title.trim() || ((serviceData == null ? void 0 : serviceData.title) ? `Who May Need ${serviceData.title}?` : "Who May Need a Blood Test at Home in Dubai?"),
          isEditMode,
          tagName: "h2",
          className: "text-3xl sm:text-4xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-snug mb-4"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mb-7", children: /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "indications_description",
          defaultText: (serviceData == null ? void 0 : serviceData.indications_description) || `You may benefit from our DHA-certified ${(serviceData == null ? void 0 : serviceData.title) || "home health service"} if you have:`,
          isEditMode,
          tagName: "p",
          multiline: true,
          className: "text-slate-600 text-base sm:text-lg font-medium leading-relaxed font-sans"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6", children: displayIndications.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full border-2 border-[#08709d] flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-[#08709d]" }) }),
        /* @__PURE__ */ jsx(
          EditableText,
          {
            slug,
            fieldKey: `indication_item_${idx}`,
            defaultText: typeof item === "string" ? item : item.title || item.label,
            isEditMode,
            tagName: "span",
            className: "text-slate-800 text-sm sm:text-base font-semibold leading-relaxed font-sans"
          }
        )
      ] }, idx)) })
    ] }) })
  ] }) }) });
}
function HeroBackgroundAnimation() {
  return /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none z-0", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: {
          scale: [1, 1.25, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
          opacity: [0.3, 0.5, 0.3]
        },
        transition: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        },
        className: "absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#08709d]/15 via-[#38bdf8]/10 to-transparent blur-[120px]"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: {
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
          opacity: [0.25, 0.45, 0.25]
        },
        transition: {
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        },
        className: "absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-[#08709d]/10 to-transparent blur-[130px]"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: {
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2]
        },
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        },
        className: "absolute -bottom-20 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-t from-[#065679]/15 to-transparent blur-[110px]"
      }
    ),
    [...Array(6)].map((_, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: {
          x: Math.random() * 1e3 - 300,
          y: Math.random() * 600,
          opacity: 0.2
        },
        animate: {
          y: [0, -180, 0],
          x: [0, Math.random() * 40 - 20, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.4, 1]
        },
        transition: {
          duration: 8 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 1.2
        },
        className: `absolute rounded-full blur-[2px] ${i % 2 === 0 ? "w-4 h-4 bg-[#08709d]/30" : "w-3 h-3 bg-emerald-400/40"}`,
        style: {
          left: `${15 + i * 15}%`,
          top: `${20 + i * 12 % 60}%`
        }
      },
      i
    )),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#08709d_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" })
  ] });
}
function LabServicesLanding({ slug = "lab-services" }) {
  const [visible, setVisible] = useState(false);
  const [condVisible, setCondVisible] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const defaultLabColumns = [
    {
      title: "Core Screenings",
      tagline: "Routine blood & vitals",
      icon: /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx("path", { d: "M12 2a7 7 0 0 1 7 7c0 4-3 7-7 13C9 16 5 13 5 9a7 7 0 0 1 7-7z" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "9", r: "2.5" })
      ] }),
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
      icon: /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx("ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }),
        /* @__PURE__ */ jsx("path", { d: "M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" }),
        /* @__PURE__ */ jsx("path", { d: "M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" })
      ] }),
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
      icon: /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ jsx("path", { d: "M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" })
      ] }),
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
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const rawParts = (slug || "").toLowerCase().split("/").filter(Boolean);
  const validParts = rawParts.filter((p) => p !== "services");
  const targetSlug = validParts.length > 0 ? validParts[validParts.length - 1] : "lab-test-at-home";
  const cleanSlug = targetSlug;
  const altSlug = cleanSlug.replace(/docotor/g, "doctor");
  const altSlug2 = cleanSlug.replace(/doctor/g, "docotor");
  const staticFallback = servicesData[cleanSlug] || servicesData[altSlug] || servicesData[altSlug2] || servicesData[cleanSlug.replace(/-/g, "")] || (cleanSlug.includes("physio") ? servicesData["physiotherapy"] : null) || (cleanSlug.includes("nurs") ? servicesData["nursing"] : null) || (cleanSlug.includes("iv") ? servicesData["iv-therapy"] : null) || (cleanSlug.includes("doctor") ? servicesData["doctor-on-call"] : null) || (cleanSlug.includes("elder") ? servicesData["elderly-care"] : null) || (cleanSlug.includes("lab") ? servicesData["lab-services"] : null) || {};
  const isMainPhysioSlug = cleanSlug === "physiotherapy" || cleanSlug === "physiotherapy-at-home-in-dubai" || cleanSlug === "physiotherapy-services" || cleanSlug === "physiotherapy-at-home";
  const validServiceData = serviceData && typeof serviceData === "object" && !Array.isArray(serviceData) ? serviceData : null;
  const isFetchedParentForSubservice = validServiceData && (validServiceData.slug === "physiotherapy" || validServiceData.slug === "physiotherapy-at-home-in-dubai") && !isMainPhysioSlug;
  const mergedData = validServiceData ? {
    ...staticFallback,
    ...isFetchedParentForSubservice ? {} : validServiceData,
    title: isFetchedParentForSubservice || !validServiceData.title ? staticFallback.title || validServiceData.title : validServiceData.title,
    eyebrow: isFetchedParentForSubservice || !validServiceData.eyebrow ? staticFallback.eyebrow || validServiceData.eyebrow : validServiceData.eyebrow,
    tagline: isFetchedParentForSubservice || !validServiceData.tagline ? staticFallback.tagline || validServiceData.tagline : validServiceData.tagline,
    description: isFetchedParentForSubservice || !validServiceData.description ? staticFallback.description || validServiceData.description : validServiceData.description,
    about_section_title: isFetchedParentForSubservice || !validServiceData.about_section_title ? staticFallback.about_section_title || validServiceData.about_section_title : validServiceData.about_section_title,
    indications_title: isFetchedParentForSubservice || !validServiceData.indications_title ? staticFallback.indications_title || validServiceData.indications_title : validServiceData.indications_title,
    features: Array.isArray(validServiceData.features) && validServiceData.features.length > 0 && !isFetchedParentForSubservice ? validServiceData.features : staticFallback.features || [],
    indications: Array.isArray(validServiceData.indications) && validServiceData.indications.length > 0 && !isFetchedParentForSubservice ? validServiceData.indications : staticFallback.indications || [],
    reasons: Array.isArray(validServiceData.reasons) && validServiceData.reasons.length > 0 && !isFetchedParentForSubservice ? validServiceData.reasons : staticFallback.reasons || [],
    steps: Array.isArray(validServiceData.steps) && validServiceData.steps.length > 0 && !isFetchedParentForSubservice ? validServiceData.steps : staticFallback.steps || [],
    faqs: Array.isArray(validServiceData.faqs) && validServiceData.faqs.length > 0 && !isFetchedParentForSubservice ? validServiceData.faqs : staticFallback.faqs || [],
    benefits: Array.isArray(validServiceData.benefits) && validServiceData.benefits.length > 0 && !isFetchedParentForSubservice ? validServiceData.benefits : staticFallback.benefits || [],
    lab_columns: Array.isArray(validServiceData.lab_columns) && validServiceData.lab_columns.length > 0 && !isFetchedParentForSubservice ? validServiceData.lab_columns : staticFallback.lab_columns || []
  } : staticFallback;
  useEffect(() => {
    if (!cleanSlug) return;
    const candidateSlugs = [
      cleanSlug,
      cleanSlug.replace("doctor", "docotor"),
      cleanSlug === "doctor-on-call" ? "docotor-on-call" : null,
      cleanSlug === "lab-services" ? "lab-test-at-home" : cleanSlug === "lab-test-at-home" ? "lab-services" : null,
      cleanSlug === "elderly-care" ? "elderly-home-care" : cleanSlug === "elderly-home-care" ? "elderly-care" : null,
      cleanSlug === "iv-therapy" ? "iv-therapy-iv-drip" : cleanSlug === "iv-therapy-iv-drip" ? "iv-therapy" : null,
      isMainPhysioSlug ? "Physiotherapy-Services" : null,
      isMainPhysioSlug ? "physiotherapy" : null
    ].filter((val, idx, arr) => Boolean(val) && arr.indexOf(val) === idx);
    let isMounted = true;
    const tryFetchService = async () => {
      for (const s of candidateSlugs) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/services/${s}/`);
          if (res.ok) {
            const data = await res.json();
            if (data && typeof data === "object" && !Array.isArray(data) && isMounted) {
              setServiceData(data);
              return;
            }
          }
        } catch (e) {
        }
      }
    };
    tryFetchService();
    return () => {
      isMounted = false;
    };
  }, [cleanSlug]);
  useEffect(() => {
    const pageTitle = (mergedData == null ? void 0 : mergedData.meta_title) || ((mergedData == null ? void 0 : mergedData.title) ? `${mergedData.title} in Dubai | Corx Healthcare` : "Corx Healthcare: Home Healthcare Services in Dubai, UAE");
    const pageDesc = (mergedData == null ? void 0 : mergedData.meta_description) || (mergedData == null ? void 0 : mergedData.description) || (mergedData == null ? void 0 : mergedData.tagline) || "Professional, reliable, and on-demand DHA-certified medical care at your doorstep across Dubai.";
    document.title = pageTitle;
    const setMetaTag = (attrName, attrVal, contentVal) => {
      let metaElem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!metaElem) {
        metaElem = document.createElement("meta");
        metaElem.setAttribute(attrName, attrVal);
        document.head.appendChild(metaElem);
      }
      metaElem.setAttribute("content", contentVal);
    };
    setMetaTag("name", "description", pageDesc);
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", pageDesc);
    if (typeof window !== "undefined") {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      const origin = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1") ? window.location.origin : "https://corx.ae";
      canonicalLink.setAttribute("href", `${origin}/${slug}`);
    }
  }, [mergedData, slug]);
  const formatSlugToTitle = (slug2, dataObj) => {
    if (dataObj == null ? void 0 : dataObj.title) return dataObj.title;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return validServiceData.title || "";
    }
    if (!slug2) return "Blood Test in Dubai";
    const clean = slug2.toLowerCase().replace(/^(services\/)/, "");
    if (clean === "doctor-on-call" || clean === "doctor-at-home") return "Doctor On Call in Dubai";
    if (clean === "doctor-at-office") return "Doctor at Office in Dubai";
    if (clean === "doctor-at-hotel") return "Doctor at Hotel in Dubai";
    if (clean === "iv-therapy" || clean === "iv-drip-at-home") return "IV Therapy at Home in Dubai";
    if (clean === "nursing" || clean === "home-nursing") return "Home Nursing Services in Dubai";
    if (clean === "elderly-care") return "Elderly Care at Home in Dubai";
    return clean.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " in Dubai";
  };
  const getFallbackEyebrow = (slug2, dataObj) => {
    if (dataObj == null ? void 0 : dataObj.eyebrow) return dataObj.eyebrow;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return "";
    }
    const clean = (slug2 ? slug2.replace(/^(services\/)/, "") : "").toLowerCase();
    if (clean.includes("doctor")) return "24/7 DHA-Licensed Doctor Home & Hotel Visits Across Dubai";
    if (clean.includes("iv") || clean.includes("drip")) return "DHA-Certified Vitamin Drips & Hydration at Home";
    if (clean.includes("nursing")) return "DHA-Certified Registered Nurses at Your Doorstep";
    if (clean.includes("elderly")) return "Dedicated Senior Care & Assisted Living at Home";
    return "DHA-Licensed Home Sample Collection Across Dubai";
  };
  const getFallbackTagline = (slug2, dataObj) => {
    if (dataObj == null ? void 0 : dataObj.tagline) return dataObj.tagline;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return "";
    }
    const clean = (slug2 ? slug2.replace(/^(services\/)/, "") : "").toLowerCase();
    if (clean.includes("doctor")) return "Qualified Medical Doctors at Your Doorstep Day or Night";
    if (clean.includes("iv") || clean.includes("drip")) return "Instant Energy, Immunity Boost & Fast Hydration";
    if (clean.includes("nursing")) return "Compassionate Post-Operative & Specialized Medical Care";
    if (clean.includes("elderly")) return "Comprehensive Elderly Care & Medical Support 24/7";
    return "Get an Accurate Lab Result at Your Doorsteps";
  };
  const getFallbackDescription = (slug2, dataObj) => {
    if (dataObj == null ? void 0 : dataObj.description) return dataObj.description;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return "";
    }
    const clean = (slug2 ? slug2.replace(/^(services\/)/, "") : "").toLowerCase();
    if (clean.includes("doctor")) return "Experience prompt, professional medical care without visiting a clinic or hospital. Our DHA-certified doctors arrive at your home, hotel, or office within 30–45 minutes for diagnosis, treatment, and prescription issuance.";
    if (clean.includes("iv") || clean.includes("drip")) return "Revitalize your body with personalized IV drip therapy delivered at your home, hotel, or office by DHA-certified healthcare professionals at an affordable price.";
    if (clean.includes("nursing")) return "Receive professional nursing care in the comfort of your home. Our DHA-licensed nurses provide post-surgical care, wound dressing, medication administration, and 24/7 medical assistance.";
    if (clean.includes("elderly")) return "Empowering seniors to live comfortably and independently with compassionate at-home nursing, mobility assistance, vital monitoring, and personalized care plans.";
    return "Book a blood test at home in Dubai without visiting a clinic or Hospital. Our home care service provides convenient blood sample collection at your home, hotel, or office by DHA-certified healthcare professionals at an affordable price.";
  };
  const getFallbackFeatures = (slug2, dataObj) => {
    if ((dataObj == null ? void 0 : dataObj.features) && dataObj.features.length > 0) return dataObj.features;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return [];
    }
    const clean = (slug2 ? slug2.replace(/^(services\/)/, "") : "").toLowerCase();
    if (clean.includes("doctor")) return [
      { title: "24/7 Doctor home & hotel visits" },
      { title: "Arrives at your doorstep within 30-45 mins" },
      { title: "DHA-licensed general practitioners & specialists" },
      { title: "On-site diagnosis & instant prescriptions" },
      { title: "High security, privacy & patient confidentiality" }
    ];
    if (clean.includes("iv") || clean.includes("drip")) return [
      { title: "Customized IV drip formulas for immunity & energy" },
      { title: "Administered by DHA-certified clinical nurses" },
      { title: "Fast absorption & instant body rehydration" },
      { title: "100% sterile, single-use medical kits" },
      { title: "24/7 flexible scheduling across Dubai" }
    ];
    if (clean.includes("nursing")) return [
      { title: "Post-operative clinical wound care & dressing" },
      { title: "Continuous vital signs & patient monitoring" },
      { title: "DHA-certified registered nurses 24/7" },
      { title: "IV fluid, injection & medication administration" },
      { title: "Tailored long-term nursing care plans" }
    ];
    if (clean.includes("elderly")) return [
      { title: "24/7 Dedicated senior care assistance" },
      { title: "Mobility, hygiene & daily activity support" },
      { title: "Medication management & health tracking" },
      { title: "DHA-certified compassionate nurses" },
      { title: "Personalized home care routines" }
    ];
    return labFeatures;
  };
  const getFallbackIndications = (slug2, dataObj) => {
    if ((dataObj == null ? void 0 : dataObj.indications) && dataObj.indications.length > 0) return dataObj.indications;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return [];
    }
    const clean = (slug2 ? slug2.replace(/^(services\/)/, "") : "").toLowerCase();
    if (clean.includes("doctor")) return [
      "High fever, severe flu & respiratory symptoms",
      "Severe migraines, headache & muscular pain",
      "Gastrointestinal distress, nausea & vomiting",
      "Blood pressure spikes & dizziness management",
      "Minor injuries, wound inspections & burns",
      "Prescription refills & urgent doctor advice",
      "Hotel guest emergency medical consultation",
      "Corporate staff wellness checkups & sick leaves"
    ];
    if (clean.includes("iv") || clean.includes("drip")) return [
      "Severe dehydration, jet lag & chronic fatigue",
      "Immunity boost before or after travel",
      "Hangover recovery & rapid electrolyte balance",
      "Skin glow, anti-aging & collagen support",
      "Post-illness physical weakness & recovery",
      "Athletic recovery & muscle soreness relief"
    ];
    if (clean.includes("nursing")) return [
      "Post-surgical recovery & wound management",
      "Intravenous (IV) medication & injection needs",
      "Chronic illness monitoring & palliative care",
      "Tracheostomy, catheter & feeding tube care",
      "Elderly bedridden care & pressure sore prevention"
    ];
    if (clean.includes("elderly")) return [
      "Senior citizens needing daily activity assistance",
      "Post-stroke or mobility-impaired elderly care",
      "Dementia or Alzheimer's compassionate support",
      "Medication adherence & vital checks for seniors",
      "Companion care & emergency assistance at home"
    ];
    return bloodTestIndications;
  };
  const getFallbackSteps = (clean, dataObj) => {
    if ((dataObj == null ? void 0 : dataObj.steps) && dataObj.steps.length > 0) return dataObj.steps;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return [];
    }
    if (clean.includes("doctor")) return [
      {
        icon: /* @__PURE__ */ jsx(PhoneCall, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }),
        title: "1. Request Doctor Visit 24/7",
        desc: "Call +971 43320776 or WhatsApp Us at +971 547033311 to request a physician at your location."
      },
      {
        icon: /* @__PURE__ */ jsx(Stethoscope, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }),
        title: "2. Doctor Arrives in 30-45 Mins",
        desc: "Our DHA-licensed doctor arrives at your home, hotel, or office fully equipped for consultation."
      },
      {
        icon: /* @__PURE__ */ jsx(Users, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }),
        title: "3. On-Site Treatment & Prescription",
        desc: "Receive professional diagnosis, prescription, medical certificates, and personalized treatment plans."
      }
    ];
    return stepsData;
  };
  const getFallbackFaqs = (clean, dataObj) => {
    if ((dataObj == null ? void 0 : dataObj.faqs) && dataObj.faqs.length > 0) return dataObj.faqs;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return [];
    }
    if (clean.includes("doctor")) return [
      {
        q: "How quickly can a doctor reach my home or hotel in Dubai?",
        a: "Our typical response time is between 30 to 45 minutes from the moment your request is confirmed, depending on your precise location and traffic conditions in Dubai."
      },
      {
        q: "What illnesses and conditions can the Doctor On Call treat?",
        a: "We treat a wide range of acute, non-life-threatening conditions, including high fever, seasonal flu, respiratory infections, severe throat pain, food poisoning, vomiting/nausea, urinary tract infections (UTIs), ear/eye infections, back pain, and mild asthma."
      },
      {
        q: "Can your doctor issue official prescriptions and sick leaves?",
        a: "Yes. Our DHA-licensed doctors can write official DHA-compliant electronic prescriptions that are accepted at all pharmacies, order necessary laboratory tests, and issue official medical certificates or sick leaves."
      },
      {
        q: "Are Doctor On Call services available on weekends and holidays?",
        a: "Yes! Our home doctor service is operational 24 hours a day, 7 days a week, 365 days a year across all areas of Dubai."
      }
    ];
    return labFaqs;
  };
  const getFallbackReasons = (clean, dataObj) => {
    if ((dataObj == null ? void 0 : dataObj.reasons) && dataObj.reasons.length > 0) return dataObj.reasons;
    if (validServiceData && Object.keys(staticFallback).length === 0) {
      return [];
    }
    if (clean.includes("doctor")) return [
      {
        title: "Rapid 30–45 Mins Arrival",
        desc: "Skip long emergency room wait times. Our licensed doctors reach your home, hotel, or office in under 45 minutes anywhere in Dubai."
      },
      {
        title: "DHA-Licensed Medical Team",
        desc: "Experienced general practitioners and medical specialists providing top-quality, compassionate clinical care at your doorstep."
      },
      {
        title: "Official Prescriptions & Sick Leaves",
        desc: "Receive DHA-compliant electronic prescriptions, lab test requisitions, and official medical certificates on the spot."
      },
      {
        title: "Complete Confidentiality & Privacy",
        desc: "Enjoy private, personalized medical care in the comfort and security of your own living room or hotel room."
      }
    ];
    return reasons;
  };
  const featuresList = getFallbackFeatures(slug, mergedData);
  const indicationsList = getFallbackIndications(slug, mergedData);
  cleanSlug.includes("lab");
  const labColumns = (mergedData == null ? void 0 : mergedData.lab_columns) && Array.isArray(mergedData.lab_columns) && mergedData.lab_columns.length > 0 ? mergedData.lab_columns.map((col, idx) => {
    var _a, _b;
    return {
      ...col,
      icon: col.icon || ((_a = defaultLabColumns[idx % defaultLabColumns.length]) == null ? void 0 : _a.icon),
      iconBg: col.iconBg || ((_b = defaultLabColumns[idx % defaultLabColumns.length]) == null ? void 0 : _b.iconBg),
      delay: 0.05 + idx * 0.07
    };
  }) : [];
  const reasonsList = getFallbackReasons(cleanSlug, mergedData);
  const stepsList = getFallbackSteps(cleanSlug, mergedData);
  const faqList = getFallbackFaqs(cleanSlug, mergedData);
  const benefitsList = mergedData ? mergedData.benefits || [] : [];
  const benefitsTitle = mergedData ? mergedData.benefits_title || "" : "";
  const understandingTitle = mergedData ? mergedData.understanding_title || "" : "";
  const understandingIntro = mergedData ? mergedData.understanding_intro || "" : "";
  const understandingItems = mergedData ? mergedData.understanding_items || [] : [];
  const subServicesList = (mergedData == null ? void 0 : mergedData.sub_services) && Array.isArray(mergedData.sub_services) && mergedData.sub_services.length > 0 ? mergedData.sub_services : (serviceData == null ? void 0 : serviceData.sub_services) || [];
  return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs(Section, { variant: "white", className: "pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden min-h-[480px]", children: [
      /* @__PURE__ */ jsx(HeroBackgroundAnimation, {}),
      /* @__PURE__ */ jsx(Container, { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "lg:col-span-6 flex flex-col items-start text-left space-y-5 transition-all duration-700",
            style: {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 px-3.5 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-[#08709d] animate-pulse" }),
                /* @__PURE__ */ jsx(
                  EditableText,
                  {
                    slug,
                    fieldKey: "hero_eyebrow",
                    defaultText: getFallbackEyebrow(slug, serviceData),
                    isEditMode,
                    tagName: "span",
                    className: "text-[#08709d] text-xs font-bold uppercase tracking-wider"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(HeroTitle, { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl", children: /* @__PURE__ */ jsx(
                EditableText,
                {
                  slug,
                  fieldKey: "hero_title",
                  defaultText: formatSlugToTitle(slug, serviceData),
                  isEditMode,
                  tagName: "span"
                }
              ) }),
              /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg md:text-xl font-bold text-[#08709d] uppercase tracking-wide -mt-2", children: /* @__PURE__ */ jsx(
                EditableText,
                {
                  slug,
                  fieldKey: "hero_tagline",
                  defaultText: getFallbackTagline(slug, serviceData),
                  isEditMode,
                  tagName: "span"
                }
              ) }),
              /* @__PURE__ */ jsx(Paragraph, { className: "max-w-2xl text-gray-600", children: /* @__PURE__ */ jsx(
                EditableText,
                {
                  slug,
                  fieldKey: "hero_description",
                  defaultText: getFallbackDescription(slug, serviceData),
                  isEditMode,
                  tagName: "span",
                  multiline: true
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "w-full pt-4 pb-2", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6", children: featuresList.map((f, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-[#08709d] shrink-0" }),
                /* @__PURE__ */ jsx(
                  EditableText,
                  {
                    slug,
                    fieldKey: `feature_item_${i}`,
                    defaultText: typeof f === "string" ? f : f.title,
                    isEditMode,
                    tagName: "span",
                    className: "text-gray-900 text-sm md:text-base font-semibold leading-snug"
                  }
                )
              ] }, i)) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4 w-full items-stretch sm:items-center mt-6", children: [
                /* @__PURE__ */ jsxs(Button, { variant: "primary", href: "/book-an-appointment", className: "w-full sm:w-auto justify-center", children: [
                  /* @__PURE__ */ jsx(CalendarDays, { size: 18 }),
                  /* @__PURE__ */ jsx("span", { children: "Book An Appointment" })
                ] }),
                /* @__PURE__ */ jsxs(Button, { variant: "whatsapp", href: "https://wa.me/97143320776", target: "_blank", rel: "noopener noreferrer", className: "w-full sm:w-auto justify-center", children: [
                  /* @__PURE__ */ jsx(MessageSquare, { size: 18 }),
                  /* @__PURE__ */ jsx("span", { children: "WhatsApp Us" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "lg:col-span-6 relative w-full max-w-[650px] mx-auto lg:ml-auto flex items-center justify-center pt-8 lg:pt-0 transition-all duration-700",
            style: {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transitionDelay: "0.2s"
            },
            children: (mergedData == null ? void 0 : mergedData.image_file) || (mergedData == null ? void 0 : mergedData.image) || cleanSlug.includes("doctor") ? /* @__PURE__ */ jsx(
              "img",
              {
                src: (mergedData == null ? void 0 : mergedData.image_file) || (mergedData == null ? void 0 : mergedData.image) || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
                alt: (mergedData == null ? void 0 : mergedData.title) || "Doctor On Call Services",
                className: "w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-[32px] shadow-2xl object-cover border-[6px] border-white/90 ring-1 ring-slate-900/10 hover:scale-[1.01] transition-transform duration-500"
              }
            ) : /* @__PURE__ */ jsx(LabIllustration, {})
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(ServiceHighlightsBar, {}),
    subServicesList && subServicesList.length > 0 && /* @__PURE__ */ jsx(SubServicesGridSection, { subServices: subServicesList, serviceTitle: mergedData == null ? void 0 : mergedData.title, isEditMode, slug }),
    Array.isArray(benefitsList) && benefitsList.length > 0 && /* @__PURE__ */ jsx(
      ServiceBenefitsSection,
      {
        benefitsList,
        benefitsTitle,
        serviceTitle: mergedData == null ? void 0 : mergedData.title,
        isEditMode,
        slug,
        imageUrl: (mergedData == null ? void 0 : mergedData.benefits_image) || (mergedData == null ? void 0 : mergedData.benefits_image_file) || (mergedData == null ? void 0 : mergedData.image) || (mergedData == null ? void 0 : mergedData.image_file)
      }
    ),
    Array.isArray(understandingItems) && understandingItems.length > 0 && /* @__PURE__ */ jsx(
      ServiceUnderstandingSection,
      {
        understandingTitle,
        understandingIntro,
        understandingItems,
        serviceTitle: mergedData == null ? void 0 : mergedData.title,
        isEditMode,
        slug,
        imageUrl: (mergedData == null ? void 0 : mergedData.understanding_image) || (mergedData == null ? void 0 : mergedData.understanding_image_file) || (mergedData == null ? void 0 : mergedData.image) || (mergedData == null ? void 0 : mergedData.image_file)
      }
    ),
    /* @__PURE__ */ jsx(WhoMayNeedBloodTestSection, { indicationsList, serviceData: mergedData, isEditMode, slug }),
    labColumns && labColumns.length > 0 && /* @__PURE__ */ jsx(Section, { variant: "warm", children: /* @__PURE__ */ jsxs(Container, { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-10 md:mb-14", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08709d]/10 text-[#08709d] text-xs font-bold uppercase tracking-wider mb-3", children: "⊙ Covered Packages & Categories" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-[34px] font-bold text-[#1a294a] tracking-tight leading-snug font-montserrat mb-3", children: /* @__PURE__ */ jsx(
          EditableText,
          {
            slug,
            fieldKey: "lab_columns_title",
            defaultText: (mergedData == null ? void 0 : mergedData.lab_columns_title) || (mergedData == null ? void 0 : mergedData.comprehensive_section_title) || ((mergedData == null ? void 0 : mergedData.title) ? `${mergedData.title} Packages & Coverage` : "Comprehensive Service Packages Covered"),
            isEditMode,
            tagName: "span"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium", children: /* @__PURE__ */ jsx(
          EditableText,
          {
            slug,
            fieldKey: "lab_columns_description",
            defaultText: (mergedData == null ? void 0 : mergedData.lab_columns_description) || ((mergedData == null ? void 0 : mergedData.title) ? `Structured ${mergedData.title.toLowerCase()} packages performed by DHA-certified clinical specialists right at your home.` : "High-precision healthcare service packages performed by certified clinical specialists right at your home."),
            isEditMode,
            tagName: "span",
            multiline: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full", children: labColumns.map((col, idx) => /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "h-full",
          initial: { opacity: 0, y: 10 },
          animate: condVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
          transition: { duration: 0.4, ease: "easeOut", delay: col.delay || 0.05 },
          children: /* @__PURE__ */ jsx(Card, { className: "h-full flex flex-col justify-between p-6 sm:p-7 border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2.5", children: col.tests && col.tests.map((test, testIdx) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#08709d] text-white hover:bg-[#065679] hover:shadow-md transition-all duration-200 cursor-pointer group",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white tracking-wide", children: test }),
                /* @__PURE__ */ jsx(Check, { size: 16, className: "text-white/90 group-hover:text-white group-hover:scale-110 transition-all shrink-0", strokeWidth: 2.5 })
              ]
            },
            testIdx
          )) }) }) })
        },
        idx
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-2xl border border-[#08709d]/20 bg-gradient-to-r from-[#08709d] to-[#065679] text-white p-6 sm:p-7 shadow-lg shadow-[#08709d]/15 mt-10 w-full", children: [
        /* @__PURE__ */ jsx("span", { className: "shrink-0 text-white bg-white/10 p-2.5 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
          /* @__PURE__ */ jsx("path", { d: "M12 16v-4" }),
          /* @__PURE__ */ jsx("path", { d: "M12 8h.01" })
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-base leading-7 text-white m-0 font-medium", children: [
          /* @__PURE__ */ jsx("strong", { className: "font-extrabold uppercase tracking-wider mr-1", children: "Note:" }),
          " All ",
          (mergedData == null ? void 0 : mergedData.title) ? mergedData.title.toLowerCase() : "health services",
          " at home at CORx are coordinated based on your medical requirements and doctor's advice, where applicable."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(ThreeStepsLabProcessSection, { stepsList, serviceData: mergedData, isEditMode, slug }),
    /* @__PURE__ */ jsx(WhyChooseCorxBloodTest, { reasonsList, serviceData: mergedData, isEditMode, slug }),
    /* @__PURE__ */ jsx(Section, { variant: "dark", className: "relative overflow-hidden", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-left max-w-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4", children: "Have Any Questions?" }),
        /* @__PURE__ */ jsxs("p", { className: "text-white/90 text-base leading-7", children: [
          "Call Us 24/7 at ",
          /* @__PURE__ */ jsx("a", { href: "tel:+97143320776", className: "text-white font-semibold underline underline-offset-4 hover:opacity-80", children: "☎️ +971 4 332 0776" }),
          ", ",
          /* @__PURE__ */ jsx("a", { href: "tel:+971547033311", className: "text-white font-semibold underline underline-offset-4 hover:opacity-80", children: "📱 +971 54 703 3311" }),
          ", or ",
          /* @__PURE__ */ jsx("a", { href: "tel:+971502785990", className: "text-white font-semibold underline underline-offset-4 hover:opacity-80", children: "📱 +971 50 278 5990" }),
          " for doctor on call service."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          href: "/Company-Profile.pdf",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "bg-white text-[#1a294a] hover:bg-gray-100 border-none shadow-xl shrink-0",
          children: [
            /* @__PURE__ */ jsx("span", { children: "DOWNLOAD PROFILE" }),
            /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(LabServiceFAQ, { faqList, serviceData: mergedData, isEditMode, slug })
  ] });
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
  }
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
  return /* @__PURE__ */ jsxs("section", { className: "lab-faq-section", children: [
    /* @__PURE__ */ jsx("style", { children: faqStyles }),
    /* @__PURE__ */ jsxs("div", { className: "lab-faq-wrap", children: [
      /* @__PURE__ */ jsx("div", { className: "lab-faq-eyebrow", children: /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "faq_eyebrow",
          defaultText: "⊙ Common Questions",
          isEditMode,
          tagName: "span"
        }
      ) }),
      /* @__PURE__ */ jsx("h2", { className: "lab-faq-title", children: /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "faq_title",
          defaultText: (serviceData == null ? void 0 : serviceData.faq_section_title) || ((serviceData == null ? void 0 : serviceData.title) ? `${serviceData.title} FAQs` : "Lab Services FAQs"),
          isEditMode,
          tagName: "span"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "lab-faq-sub", children: /* @__PURE__ */ jsx(
        EditableText,
        {
          slug,
          fieldKey: "faq_subheading",
          defaultText: (serviceData == null ? void 0 : serviceData.faq_subheading) || ((serviceData == null ? void 0 : serviceData.title) ? `Find answers to the most common questions about our ${serviceData.title.toLowerCase()} service in Dubai.` : "Find answers to the most common questions about our blood test at home service in Dubai."),
          isEditMode,
          tagName: "span",
          multiline: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "lab-faq-list", children: displayFaqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `lab-faq-item${isOpen ? " open" : ""}`,
            style: { animationDelay: `${0.05 + i * 0.08}s` },
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "lab-faq-btn",
                  onClick: () => toggle(i),
                  "aria-expanded": isOpen,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "lab-faq-q", children: /* @__PURE__ */ jsx(
                      EditableText,
                      {
                        slug,
                        fieldKey: `faq_q_${i}`,
                        defaultText: faq.q,
                        isEditMode,
                        tagName: "span"
                      }
                    ) }),
                    /* @__PURE__ */ jsx("span", { className: "lab-faq-icon", children: "+" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "lab-faq-body", children: /* @__PURE__ */ jsx("div", { className: "lab-faq-inner", children: /* @__PURE__ */ jsx("div", { className: "lab-faq-ans", children: /* @__PURE__ */ jsx(
                EditableText,
                {
                  slug,
                  fieldKey: `faq_a_${i}`,
                  defaultText: faq.a,
                  isEditMode,
                  tagName: "span",
                  multiline: true
                }
              ) }) }) })
            ]
          },
          i
        );
      }) }),
      /* @__PURE__ */ jsxs("p", { className: "lab-faq-footer", children: [
        "Still have questions?",
        " ",
        /* @__PURE__ */ jsx("a", { href: "/book-an-appointment", children: "Contact our support team" })
      ] })
    ] })
  ] });
}
const reasons = [
  {
    num: "01",
    label: "LAB SAMPLE COLLECTION",
    title: "Lab sample collection by DHA licensed nurses",
    desc: "CORx Healthcare provides blood test home service by DHA-licensed nurses, ensuring convenience and professional care. Ideal for regular monitoring or those unable to visit clinics."
  },
  {
    num: "02",
    label: "FAST RESULTS",
    title: "Lab tests results in just 2-3 hours for all routine tests",
    desc: "Routine lab tests can be completed in just two to three hours. Fast and reliable, ensuring timely diagnosis and peace of mind. Ideal for urgent health assessments and regular checkups."
  },
  {
    num: "03",
    label: "ACCREDITED LABS",
    title: "Certified & internationally accredited labs",
    desc: "CORx Healthcare guarantees the highest standards of accuracy and reliability by using lab samples from internationally accredited and certified facilities. Trust us for precise results and exceptional quality in every test."
  },
  {
    num: "04",
    label: "SENIOR MEDICAL TEAM",
    title: "Direct contact with CORx Healthcare senior medical team",
    desc: "Enjoy direct contact with CORx Healthcare senior medical team, ensuring personalized and expert guidance. Benefit from immediate support and professional insights for your healthcare needs, enhancing your treatment and care experience."
  }
];
const stepsData = [
  {
    icon: /* @__PURE__ */ jsx(PhoneCall, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }),
    title: "1. Book An Appointment",
    desc: "Call +971 43320776 or WhatsApp Us at +971547033311 for doctor-on-call service."
  },
  {
    icon: /* @__PURE__ */ jsx(Stethoscope, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }),
    title: "2. Doctors & Nurses Will Be At your Doorstep",
    desc: "Our team of DHA-certified Nurses is dedicated to your prompt care. Expect them at your doorstep within just 30 minutes for blood test home service."
  },
  {
    icon: /* @__PURE__ */ jsx(Users, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }),
    title: "3. Accurate Results 24/7 at Corx Healthcare",
    desc: "For routine tests, receive your results in just 2 to 3 hours. Confirm the turnaround time (TAT) with our patient relationship executives for precise details."
  }
];
function ThreeStepsLabProcessSection({ stepsList = [], serviceData, isEditMode, slug }) {
  const displaySteps = stepsList && stepsList.length > 0 ? stepsList : stepsData;
  if (!displaySteps || displaySteps.length === 0) return null;
  const defaultStepIcons = [
    /* @__PURE__ */ jsx(PhoneCall, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }, "0"),
    /* @__PURE__ */ jsx(Stethoscope, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }, "1"),
    /* @__PURE__ */ jsx(Users, { size: 36, className: "text-[#08709d]", strokeWidth: 1.75 }, "2")
  ];
  return /* @__PURE__ */ jsx(Section, { variant: "slate", className: "py-16 sm:py-24 bg-slate-50/50", children: /* @__PURE__ */ jsxs(Container, { className: "max-w-6xl mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-12 sm:mb-16", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-[34px] font-bold text-[#08709d] tracking-tight leading-snug font-montserrat", children: /* @__PURE__ */ jsx(
      EditableText,
      {
        slug,
        fieldKey: "steps_title",
        defaultText: (serviceData == null ? void 0 : serviceData.title) ? `Get ${serviceData.title} at your doorstep in 3 easy steps!` : "Get 10,000+ Lab Tests at your doorstep in 3 easy steps!",
        isEditMode,
        tagName: "span"
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch", children: displaySteps.map((item, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-start text-left h-full group",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-5 text-[#08709d]", children: item.icon || defaultStepIcons[i % defaultStepIcons.length] }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold mb-3 text-[#08709d] font-montserrat leading-snug", children: /* @__PURE__ */ jsx(
              EditableText,
              {
                slug,
                fieldKey: `step_title_${i}`,
                defaultText: item.title,
                isEditMode,
                tagName: "span"
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm leading-relaxed mb-6 font-sans", children: /* @__PURE__ */ jsx(
              EditableText,
              {
                slug,
                fieldKey: `step_desc_${i}`,
                defaultText: item.desc,
                isEditMode,
                tagName: "span",
                multiline: true
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/book-an-appointment",
              className: "inline-flex items-center justify-center px-6 py-2.5 bg-[#08709d] hover:bg-[#065679] text-white font-semibold text-sm rounded-md transition-colors shadow-sm shadow-[#08709d]/20",
              children: "Book Now"
            }
          ) })
        ]
      },
      i
    )) })
  ] }) });
}
function WhyChooseCorxBloodTest({ reasonsList = [], serviceData, isEditMode, slug }) {
  const displayReasons = reasonsList || [];
  if (displayReasons.length === 0) return null;
  return /* @__PURE__ */ jsx(Section, { variant: "slate", className: "overflow-hidden py-16 sm:py-24", children: /* @__PURE__ */ jsxs(Container, { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "mb-12 text-center max-w-3xl",
        children: [
          /* @__PURE__ */ jsx(SectionTitle, { className: "mb-4", children: /* @__PURE__ */ jsx(
            EditableText,
            {
              slug,
              fieldKey: "why_choose_title",
              defaultText: (serviceData == null ? void 0 : serviceData.why_choose_title) || ((serviceData == null ? void 0 : serviceData.title) ? `Why Choose CORx Healthcare for ${serviceData.title}?` : "Why Choose CORx Healthcare for Blood Test at Home in Dubai?"),
              isEditMode,
              tagName: "span"
            }
          ) }),
          /* @__PURE__ */ jsx(Paragraph, { children: /* @__PURE__ */ jsx(
            EditableText,
            {
              slug,
              fieldKey: "why_choose_desc",
              defaultText: (serviceData == null ? void 0 : serviceData.why_choose_desc) || (serviceData == null ? void 0 : serviceData.description) || "If a DHA certified nurse can perform quality lab tests at home, why leave the comfort of your own home? CORx Home Healthcare in Dubai offers at-home blood sample collection services, ensuring quick and accurate results from internationally accredited labs. Enjoy the convenience and reliability of top-notch healthcare without stepping outside your door.",
              isEditMode,
              tagName: "span",
              multiline: true
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full", children: displayReasons.map((r, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-30px" },
        transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
        whileHover: { y: -6, transition: { duration: 0.25 } },
        className: "h-full",
        children: /* @__PURE__ */ jsx(Card, { className: "h-full flex flex-col justify-between p-7 sm:p-8 border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#08709d]/30 transition-all duration-300 group", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end w-full mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-[#08709d] bg-[#08709d]/10 px-3 py-1 rounded-full border border-[#08709d]/20 tracking-wider", children: r.num || `0${i + 1}` }) }),
          /* @__PURE__ */ jsx(CardTitle, { className: "mb-3 text-[#1a294a] group-hover:text-[#08709d] transition-colors duration-300", children: /* @__PURE__ */ jsx(
            EditableText,
            {
              slug,
              fieldKey: `reason_title_${i}`,
              defaultText: r.title,
              isEditMode,
              tagName: "span"
            }
          ) }),
          /* @__PURE__ */ jsx("hr", { className: "border-t border-slate-100 mb-4 group-hover:border-[#08709d]/20 transition-colors" }),
          /* @__PURE__ */ jsx(Paragraph, { className: "m-0 text-slate-600 leading-relaxed font-normal", children: /* @__PURE__ */ jsx(
            EditableText,
            {
              slug,
              fieldKey: `reason_desc_${i}`,
              defaultText: r.desc,
              isEditMode,
              tagName: "span",
              multiline: true
            }
          ) })
        ] }) })
      },
      i
    )) })
  ] }) });
}
function SubServicesGridSection({ subServices = [], serviceTitle = "", isEditMode, slug }) {
  if (!subServices || subServices.length === 0) return null;
  return /* @__PURE__ */ jsx(Section, { variant: "slate", className: "py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80", children: /* @__PURE__ */ jsxs(Container, { className: "max-w-[1440px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-12 sm:mb-16", children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 bg-[#08709d]/10 text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#08709d]/20 mb-4", children: [
        /* @__PURE__ */ jsx(Sparkles, { size: 16 }),
        /* @__PURE__ */ jsx("span", { children: "Specialized Sub-Services & Treatments" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a294a] tracking-tight font-montserrat leading-tight mb-4", children: [
        "Specialized ",
        serviceTitle || "Physiotherapy",
        " Sub-Services"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto", children: "Choose from our comprehensive range of specialized treatment programs tailored to your precise medical condition, delivered at home by DHA-licensed experts across Dubai." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch", children: subServices.map((sub, idx) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: idx * 0.08 },
        className: "h-full",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#08709d]/40 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-[#08709d]/5 rounded-bl-full pointer-events-none group-hover:bg-[#08709d]/10 transition-colors" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center font-bold text-xl group-hover:bg-[#08709d] group-hover:text-white transition-colors duration-300", children: /* @__PURE__ */ jsx(Activity, { size: 24 }) }),
              sub.badge && /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-[#08709d] bg-sky-50 px-3 py-1 rounded-full border border-sky-200/60", children: sub.badge })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-[#08709d] block mb-2", children: sub.eyebrow || "Specialized Rehab" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-[#1a294a] group-hover:text-[#08709d] transition-colors mb-3 font-montserrat leading-snug", children: sub.title || sub.name }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-sans", children: sub.desc || sub.description || "Professional home physical therapy treatment customized to your health goals." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-slate-100 flex items-center justify-between", children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: sub.slug ? `/${sub.slug}` : "#",
              className: "inline-flex items-center gap-2 text-[#08709d] font-bold text-sm uppercase tracking-wide group-hover:translate-x-1.5 transition-transform",
              children: [
                /* @__PURE__ */ jsx("span", { children: "View Treatment" }),
                /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
              ]
            }
          ) })
        ] })
      },
      idx
    )) })
  ] }) });
}
function ServicesOverviewPage() {
  useEffect(() => {
    document.title = "Home Healthcare Services in Dubai | CORx Healthcare";
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen", children: [
    /* @__PURE__ */ jsx(Section, { variant: "white", className: "pt-20 pb-12 md:pt-24 md:pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-100", children: /* @__PURE__ */ jsxs(Container, { className: "text-center max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-[#08709d]/10 border border-[#08709d]/20 px-4 py-2 rounded-full mb-6", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#08709d] animate-pulse" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#08709d] text-xs sm:text-sm font-bold uppercase tracking-wider", children: "24/7 DHA-Licensed Medical Care Across Dubai" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1a294a] tracking-tight font-montserrat mb-6", children: "Our Home Healthcare Services in Dubai" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto", children: "From 24/7 doctor home visits and IV drip therapy to home nursing, physiotherapy, and lab tests — receive hospital-grade medical care directly in the comfort of your home, hotel, or office." })
    ] }) }),
    /* @__PURE__ */ jsx(ExploreServices, {})
  ] });
}
function ServicePage({ serviceId }) {
  const params = useParams();
  const location = useLocation();
  const pathname = ((location == null ? void 0 : location.pathname) || "").toLowerCase();
  const isOverview = !serviceId && (pathname === "/services" || pathname === "/services/");
  if (isOverview) {
    return /* @__PURE__ */ jsx(ServicesOverviewPage, {});
  }
  const pathParts = pathname.split("/").filter(Boolean).filter((p) => p !== "services");
  const lastPathPart = pathParts.length > 0 ? pathParts[pathParts.length - 1] : null;
  const rawSlug = serviceId || (params == null ? void 0 : params.serviceSlug) || (params == null ? void 0 : params.subSlug) || ((params == null ? void 0 : params.parentSlug) && (params == null ? void 0 : params.parentSlug) !== "services" ? params.parentSlug : null) || (params == null ? void 0 : params["*"]) || lastPathPart || "lab-test-at-home";
  const activeSlug = rawSlug.toLowerCase();
  return /* @__PURE__ */ jsx(LabServicesLanding, { slug: activeSlug });
}
function Dashboard() {
  var _a;
  const [activeTab, setActiveTab] = useState("overview");
  const [servicesData2, setServicesData] = useState([]);
  const [parentServices, setParentServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [lastSyncedTime, setLastSyncedTime] = useState(null);
  const [selectedParentFilter, setSelectedParentFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };
  const [selectedParentId, setSelectedParentId] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [subTagline, setSubTagline] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [parentTitle, setParentTitle] = useState("");
  const [parentTagline, setParentTagline] = useState("");
  const [selectedBenefitsServiceSlug, setSelectedBenefitsServiceSlug] = useState("");
  const [benefitsTitleText, setBenefitsTitleText] = useState("");
  const [benefitsImageFile, setBenefitsImageFile] = useState(null);
  const [benefitsImagePreview, setBenefitsImagePreview] = useState("");
  const [benefitsItems, setBenefitsItems] = useState([
    { title: "Customized Treatment Plans", desc: "Every patient receives a tailored therapy plan to address their specific needs." },
    { title: "Pain Relief & Mobility Restoration", desc: "Our expert clinical team uses proven techniques to reduce pain and restore full motion." }
  ]);
  const [selectedUnderstandingServiceSlug, setSelectedUnderstandingServiceSlug] = useState("");
  const [understandingTitleText, setUnderstandingTitleText] = useState("");
  const [understandingIntroText, setUnderstandingIntroText] = useState("");
  const [understandingImageFile, setUnderstandingImageFile] = useState(null);
  const [understandingImagePreview, setUnderstandingImagePreview] = useState("");
  const [understandingItems, setUnderstandingItems] = useState([
    { num: "1", title: "Freezing Stage:", desc: "This is the first stage in the progression of symptoms. Your shoulder starts paining whenever you move it." },
    { num: "2", title: "Frozen Stage:", desc: "In this stage, the pain in your shoulder may decrease, but movement becomes limited." },
    { num: "3", title: "Thawing Stage:", desc: "Symptoms last for 12 to 15 months during this stage, and pain is significantly reduced." }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogSearchTerm, setBlogSearchTerm] = useState("");
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogDeleteConfirm, setBlogDeleteConfirm] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogDate, setBlogDate] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [blogTag, setBlogTag] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogImageUrl, setBlogImageUrl] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const resetBlogForm = () => {
    setEditingBlog(null);
    setBlogTitle("");
    setBlogSlug("");
    setBlogAuthor("");
    setBlogDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setBlogTag("");
    setBlogExcerpt("");
    setBlogImageUrl("");
    setBlogContent("");
  };
  const populateBlogForm = (blog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title || "");
    setBlogSlug(blog.slug || "");
    setBlogAuthor(blog.author || "");
    setBlogDate(blog.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setBlogTag(blog.tag || "");
    setBlogExcerpt(blog.excerpt || "");
    setBlogImageUrl(blog.image || "");
    setBlogContent(blog.content || "");
  };
  const handleBlogTitleChange = (val) => {
    setBlogTitle(val);
    if (!editingBlog) {
      setBlogSlug(
        val.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")
      );
    }
  };
  const loadBlogs = async () => {
    setBlogsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogsData(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      showToast("error", "Fetch Failed", "Could not load blogs from backend.");
    } finally {
      setBlogsLoading(false);
    }
  };
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      showToast("error", "Validation Error", "Blog title is required.");
      return;
    }
    setBlogSubmitting(true);
    const payload = {
      title: blogTitle.trim(),
      slug: blogSlug.trim() || blogTitle.toLowerCase().replace(/\s+/g, "-"),
      author: blogAuthor.trim(),
      date: blogDate,
      tag: blogTag.trim(),
      excerpt: blogExcerpt.trim(),
      image: blogImageUrl.trim(),
      content: blogContent.trim()
    };
    try {
      let res;
      if (editingBlog) {
        res = await fetch(`${API_BASE_URL}/api/blogs/${editingBlog.id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/blogs/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || JSON.stringify(errData) || "Failed to save blog");
      }
      showToast("success", editingBlog ? "Blog Updated" : "Blog Published", `"${blogTitle}" saved successfully!`);
      resetBlogForm();
      loadBlogs();
    } catch (err) {
      console.error(err);
      showToast("error", "Save Failed", err.message || "Could not save blog.");
    } finally {
      setBlogSubmitting(false);
    }
  };
  const handleDeleteBlog = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/${id}/`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
      showToast("success", "Blog Deleted", "Blog post removed from backend.");
      setBlogDeleteConfirm(null);
      loadBlogs();
    } catch (err) {
      showToast("error", "Delete Failed", err.message);
    }
  };
  useEffect(() => {
    if (activeTab === "blogs") loadBlogs();
  }, [activeTab]);
  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setServicesData(data);
        const parents = data.filter((s) => s.parent === null);
        setParentServices(parents);
        if (parents.length > 0 && !selectedParentId) {
          setSelectedParentId(parents[0].id.toString());
        }
        if (data.length > 0 && !selectedBenefitsServiceSlug) {
          setSelectedBenefitsServiceSlug(data[0].slug);
          loadBenefitsForService(data[0]);
        }
        if (data.length > 0 && !selectedUnderstandingServiceSlug) {
          setSelectedUnderstandingServiceSlug(data[0].slug);
          loadUnderstandingForService(data[0]);
        }
        const now = /* @__PURE__ */ new Date();
        setLastSyncedTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      }
    } catch (err) {
      console.error("Error fetching services for Dashboard:", err);
      showToast("error", "Sync Failed", "Could not fetch services from Django REST backend.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadServices();
  }, []);
  const loadBenefitsForService = (serviceObj) => {
    if (!serviceObj) return;
    setBenefitsTitleText(serviceObj.benefits_title || `Benefits of Our ${serviceObj.title || serviceObj.name} Service at CORx Healthcare`);
    setBenefitsImagePreview(serviceObj.benefits_image || serviceObj.benefits_image_file || "");
    setBenefitsImageFile(null);
    if (Array.isArray(serviceObj.benefits) && serviceObj.benefits.length > 0) {
      setBenefitsItems(serviceObj.benefits.map((b) => typeof b === "string" ? { title: b, desc: "" } : { title: b.title || "", desc: b.desc || b.description || "" }));
    } else {
      setBenefitsItems([
        { title: "Customized Treatment Plans", desc: "Every patient receives a tailored therapy plan to address their specific needs." },
        { title: "Pain Relief & Mobility Restoration", desc: "Our expert clinical team uses proven techniques to reduce pain and restore motion." }
      ]);
    }
  };
  const loadUnderstandingForService = (serviceObj) => {
    if (!serviceObj) return;
    setUnderstandingTitleText(serviceObj.understanding_title || `What is ${serviceObj.title || serviceObj.name} / Understanding ${serviceObj.title || serviceObj.name}`);
    setUnderstandingIntroText(serviceObj.understanding_intro || `Inflammation and tightness of the connective tissue cause symptoms. Distinct stages are typically associated with this condition:`);
    setUnderstandingImagePreview(serviceObj.understanding_image || serviceObj.understanding_image_file || "");
    setUnderstandingImageFile(null);
    if (Array.isArray(serviceObj.understanding_items) && serviceObj.understanding_items.length > 0) {
      setUnderstandingItems(serviceObj.understanding_items.map((it, idx) => ({
        num: it.num || (idx + 1).toString(),
        title: typeof it === "string" ? it : it.title || "",
        desc: typeof it === "string" ? "" : it.desc || it.description || ""
      })));
    } else {
      setUnderstandingItems([
        { num: "1", title: "Freezing Stage:", desc: "This is the first stage in the progression of symptoms. Your shoulder starts paining whenever you move it." },
        { num: "2", title: "Frozen Stage:", desc: "In this stage, the pain in your shoulder may decrease, but movement becomes more and more limited." },
        { num: "3", title: "Thawing Stage:", desc: "Symptoms last for 12 to 15 months during this stage, and pain is significantly reduced." }
      ]);
    }
  };
  const handleBenefitsServiceChange = (e) => {
    const slugVal = e.target.value;
    setSelectedBenefitsServiceSlug(slugVal);
    const found = servicesData2.find((s) => s.slug === slugVal);
    if (found) loadBenefitsForService(found);
  };
  const handleUnderstandingServiceChange = (e) => {
    const slugVal = e.target.value;
    setSelectedUnderstandingServiceSlug(slugVal);
    const found = servicesData2.find((s) => s.slug === slugVal);
    if (found) loadUnderstandingForService(found);
  };
  const handleAddBenefitRow = () => {
    setBenefitsItems([...benefitsItems, { title: "", desc: "" }]);
  };
  const handleRemoveBenefitRow = (idx) => {
    setBenefitsItems(benefitsItems.filter((_, i) => i !== idx));
  };
  const handleBenefitItemChange = (idx, field, val) => {
    const updated = [...benefitsItems];
    updated[idx][field] = val;
    setBenefitsItems(updated);
  };
  const handleAddUnderstandingRow = () => {
    setUnderstandingItems([...understandingItems, { num: (understandingItems.length + 1).toString(), title: "", desc: "" }]);
  };
  const handleRemoveUnderstandingRow = (idx) => {
    setUnderstandingItems(understandingItems.filter((_, i) => i !== idx));
  };
  const handleMoveUnderstandingItem = (idx, direction) => {
    const updated = [...understandingItems];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setUnderstandingItems(updated);
  };
  const handleLoadPresetUnderstanding = (presetType) => {
    if (presetType === "frozen_shoulder") {
      setUnderstandingTitleText("What is Frozen Shoulder / Understanding Frozen Shoulder");
      setUnderstandingIntroText("Inflammation and tightness of the connective tissue around the shoulder joint cause frozen shoulder or adhesive capsulitis. Three stages are typically associated with the condition:");
      setUnderstandingItems([
        { num: "1", title: "Freezing Stage:", desc: "This is the first stage in the progression of frozen shoulder symptoms. Your shoulder starts paining whenever you move it." },
        { num: "2", title: "Frozen Stage:", desc: "In this stage, the pain in your shoulder may decrease, but movement becomes more and more limited." },
        { num: "3", title: "Thawing Stage:", desc: "Symptoms last for 12 to 15 months during this stage, and pain is significantly reduced." }
      ]);
      showToast("success", "Preset Applied", "Loaded Frozen Shoulder clinical template.");
    } else if (presetType === "knee_pain") {
      setUnderstandingTitleText("Understanding Knee Osteoarthritis & Joint Stiffness");
      setUnderstandingIntroText("Knee osteoarthritis involves progressive wear of the joint cartilage, leading to pain and movement restriction across three distinct phases:");
      setUnderstandingItems([
        { num: "1", title: "Early Mild Stage:", desc: "Occasional stiffness after prolonged sitting or physical exertion with minor discomfort." },
        { num: "2", title: "Moderate Stiffness Stage:", desc: "Noticeable pain while walking, climbing stairs, or bending the joint, requiring specialized care." },
        { num: "3", title: "Recovery & Mobility Stage:", desc: "Targeted physical therapy restores functional range of motion and prevents long-term joint degradation." }
      ]);
      showToast("success", "Preset Applied", "Loaded Knee Osteoarthritis clinical template.");
    } else if (presetType === "elderly_care") {
      setUnderstandingTitleText("Understanding Comprehensive Elderly Home Care");
      setUnderstandingIntroText("Our specialized geriatric home care plans provide compassionate support structured around three care tiers:");
      setUnderstandingItems([
        { num: "1", title: "Daily Vitality Monitoring:", desc: "Continuous tracking of blood pressure, sugar levels, medication schedules, and daily wellness." },
        { num: "2", title: "Personalized Assisted Living:", desc: "Dedicated nurse assistance with mobility, bathing, grooming, and specialized dietary management." },
        { num: "3", title: "Physiotherapy & Rehabilitation:", desc: "Customized mobility exercises to improve balance, prevent falls, and maintain independent living." }
      ]);
      showToast("success", "Preset Applied", "Loaded Elderly Care clinical template.");
    }
  };
  const handleUnderstandingItemChange = (idx, field, val) => {
    const updated = [...understandingItems];
    updated[idx][field] = val;
    setUnderstandingItems(updated);
  };
  const handleSaveBenefits = async (e) => {
    e.preventDefault();
    if (!selectedBenefitsServiceSlug) {
      showToast("error", "Select Service", "Please select a service to update benefits.");
      return;
    }
    setSubmitting(true);
    try {
      let res;
      if (benefitsImageFile) {
        const formData = new FormData();
        formData.append("benefits_title", benefitsTitleText.trim());
        formData.append("benefits", JSON.stringify(benefitsItems.filter((b) => b.title.trim() !== "")));
        formData.append("benefits_image_file", benefitsImageFile);
        res = await fetch(`${API_BASE_URL}/api/services/${selectedBenefitsServiceSlug}/`, {
          method: "PATCH",
          body: formData
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/services/${selectedBenefitsServiceSlug}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            benefits_title: benefitsTitleText.trim(),
            benefits: benefitsItems.filter((b) => b.title.trim() !== "")
          })
        });
      }
      if (!res.ok) throw new Error("Failed to save benefits section.");
      showToast("success", "Saved Benefits", `Updated benefits section successfully!`);
      setBenefitsImageFile(null);
      loadServices();
    } catch (err) {
      console.error(err);
      showToast("error", "Save Failed", err.message || "Failed to save benefits.");
    } finally {
      setSubmitting(false);
    }
  };
  const handleSaveUnderstanding = async (e) => {
    e.preventDefault();
    if (!selectedUnderstandingServiceSlug) {
      showToast("error", "Select Service", "Please select a service to update understanding section.");
      return;
    }
    setSubmitting(true);
    try {
      let res;
      if (understandingImageFile) {
        const formData = new FormData();
        formData.append("understanding_title", understandingTitleText.trim());
        formData.append("understanding_intro", understandingIntroText.trim());
        formData.append("understanding_items", JSON.stringify(understandingItems.filter((it) => it.title.trim() !== "")));
        formData.append("understanding_image_file", understandingImageFile);
        res = await fetch(`${API_BASE_URL}/api/services/${selectedUnderstandingServiceSlug}/`, {
          method: "PATCH",
          body: formData
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/services/${selectedUnderstandingServiceSlug}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            understanding_title: understandingTitleText.trim(),
            understanding_intro: understandingIntroText.trim(),
            understanding_items: understandingItems.filter((it) => it.title.trim() !== "")
          })
        });
      }
      if (!res.ok) throw new Error("Failed to save understanding section.");
      showToast("success", "Saved Section", `Updated understanding section successfully!`);
      setUnderstandingImageFile(null);
      loadServices();
    } catch (err) {
      console.error(err);
      showToast("error", "Save Failed", err.message || "Failed to save understanding section.");
    } finally {
      setSubmitting(false);
    }
  };
  const handleAddSubService = async (e) => {
    e.preventDefault();
    if (!subTitle.trim()) {
      showToast("error", "Validation Error", "Please enter a sub-service title.");
      return;
    }
    if (!selectedParentId) {
      showToast("error", "Validation Error", "Please choose a parent service for this sub-service.");
      return;
    }
    setSubmitting(true);
    const payload = {
      title: subTitle.trim(),
      tagline: subTagline.trim(),
      description: subDescription.trim() || subTagline.trim() || subTitle.trim(),
      parent: parseInt(selectedParentId, 10),
      floating_badge: { title: "Sub-Service", desc: subTagline.trim() || subTitle.trim() }
    };
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || JSON.stringify(errData) || "Failed to add sub-service");
      }
      const created = await res.json();
      const parentObj = parentServices.find((p) => p.id.toString() === selectedParentId);
      const parentName = parentObj ? parentObj.name || parentObj.title : "Parent Service";
      showToast("success", "Sub-Service Created", `Added "${created.title || subTitle}" under "${parentName}"!`);
      setSubTitle("");
      setSubTagline("");
      setSubDescription("");
      loadServices();
    } catch (err) {
      console.error("Error adding sub-service:", err);
      showToast("error", "Creation Error", err.message || "Error connecting to Django backend.");
    } finally {
      setSubmitting(false);
    }
  };
  const handleAddParentService = async (e) => {
    e.preventDefault();
    if (!parentTitle.trim()) {
      showToast("error", "Validation Error", "Please enter a parent service title.");
      return;
    }
    setSubmitting(true);
    const payload = {
      title: parentTitle.trim(),
      tagline: parentTagline.trim(),
      description: parentTagline.trim() || parentTitle.trim(),
      parent: null,
      floating_badge: { title: "Parent Service", desc: parentTagline.trim() || parentTitle.trim() }
    };
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || JSON.stringify(errData) || "Failed to add parent service");
      }
      const created = await res.json();
      showToast("success", "Parent Category Added", `Added parent service "${created.title || parentTitle}"!`);
      setParentTitle("");
      setParentTagline("");
      loadServices();
    } catch (err) {
      console.error("Error adding parent service:", err);
      showToast("error", "Creation Error", err.message || "Error connecting to Django backend.");
    } finally {
      setSubmitting(false);
    }
  };
  const safeServicesData = Array.isArray(servicesData2) ? servicesData2 : [];
  const safeParentServices = Array.isArray(parentServices) ? parentServices : [];
  safeParentServices.find((p) => p && p.id && p.id.toString() === selectedParentId);
  const totalSubServices = safeServicesData.filter((s) => s && s.parent !== null).length;
  const allSubServicesList = safeServicesData.filter((s) => s && s.parent !== null);
  const filteredSubServices = allSubServicesList.filter((s) => {
    var _a2;
    const matchesSearch = !searchTerm || (s.title && s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.tagline && s.tagline.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesParent = selectedParentFilter === "all" || ((_a2 = s.parent) == null ? void 0 : _a2.toString()) === selectedParentFilter;
    return matchesSearch && matchesParent;
  });
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#050b14] min-h-screen font-sans text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" }),
    /* @__PURE__ */ jsx("div", { className: "fixed top-1/3 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: toast && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -30, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.9 },
        className: `fixed top-6 right-6 z-[200] max-w-md w-full p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border backdrop-blur-2xl flex items-start gap-4 ${toast.type === "success" ? "bg-slate-900/95 border-emerald-500/50 text-white shadow-emerald-500/10" : "bg-slate-900/95 border-rose-500/50 text-white shadow-rose-500/10"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `p-2.5 rounded-xl shrink-0 ${toast.type === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"}`, children: toast.type === "success" ? /* @__PURE__ */ jsx(CheckCircle2, { size: 22 }) : /* @__PURE__ */ jsx(AlertCircle, { size: 22 }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xs font-black uppercase tracking-widest font-mono text-slate-200", children: toast.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-300 font-medium mt-1 leading-snug", children: toast.message })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setToast(null),
              className: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors",
              children: /* @__PURE__ */ jsx(X, { size: 16 })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen", children: [
      /* @__PURE__ */ jsxs("aside", { className: "w-72 bg-[#090f1e]/90 border-r border-slate-800/80 p-6 flex flex-col justify-between hidden xl:flex shrink-0 backdrop-blur-2xl", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-10 pb-6 border-b border-slate-800/80", children: [
            /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-2xl bg-white/10 border border-white/20 shadow-lg shadow-cyan-500/10 backdrop-blur-md shrink-0", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "CORx Healthcare Logo", className: "h-9 w-auto object-contain" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-lg font-black tracking-wider uppercase font-montserrat bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent", children: "CORx Admin" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 font-mono font-bold tracking-widest uppercase", children: "Healthcare Hub" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab("overview"),
                className: `w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeTab === "overview" ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`,
                children: [
                  /* @__PURE__ */ jsx(LayoutDashboard, { size: 18, className: activeTab === "overview" ? "text-cyan-400" : "" }),
                  /* @__PURE__ */ jsx("span", { children: "Command Overview" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab("subservices"),
                className: `w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeTab === "subservices" ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(CornerDownRight, { size: 18, className: activeTab === "subservices" ? "text-cyan-400" : "" }),
                    /* @__PURE__ */ jsx("span", { children: "Sub-Services" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold", children: totalSubServices })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab("understanding"),
                className: `w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeTab === "understanding" ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`,
                children: [
                  /* @__PURE__ */ jsx(BookOpen, { size: 18, className: activeTab === "understanding" ? "text-cyan-400" : "" }),
                  /* @__PURE__ */ jsx("span", { children: "Understanding Builder" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab("benefits"),
                className: `w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeTab === "benefits" ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`,
                children: [
                  /* @__PURE__ */ jsx(ListChecks, { size: 18, className: activeTab === "benefits" ? "text-cyan-400" : "" }),
                  /* @__PURE__ */ jsx("span", { children: "Benefits & Images" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab("parents"),
                className: `w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeTab === "parents" ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(Layers, { size: 18, className: activeTab === "parents" ? "text-cyan-400" : "" }),
                    /* @__PURE__ */ jsx("span", { children: "Navbar Parents" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold", children: parentServices.length })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab("hierarchy"),
                className: `w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeTab === "hierarchy" ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`,
                children: [
                  /* @__PURE__ */ jsx(Activity, { size: 18, className: activeTab === "hierarchy" ? "text-cyan-400" : "" }),
                  /* @__PURE__ */ jsx("span", { children: "Hierarchy Tree" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "pt-3 mt-1 border-t border-slate-800/80", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-mono font-bold uppercase tracking-widest text-slate-600 px-2 mb-2", children: "Content" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab("blogs"),
                  className: `w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${activeTab === "blogs" ? "bg-gradient-to-r from-purple-500/20 to-pink-500/10 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx(PenLine, { size: 18, className: activeTab === "blogs" ? "text-purple-400" : "" }),
                      /* @__PURE__ */ jsx("span", { children: "Blog Manager" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold", children: blogsData.length })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-[#0c1527] border border-slate-800 text-xs space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono font-bold uppercase text-slate-400", children: "Django API Status" }),
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-emerald-400 font-mono font-extrabold text-[11px] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Server, { size: 14 }),
            /* @__PURE__ */ jsx("span", { children: "Connected & Operational" })
          ] }),
          lastSyncedTime && /* @__PURE__ */ jsxs("div", { className: "text-slate-500 text-[10px] font-mono", children: [
            "Synced at: ",
            lastSyncedTime
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 pb-6 border-b border-slate-800/80 flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("img", { src: logo, alt: "CORx Healthcare", className: "h-10 w-auto bg-white/10 p-1.5 rounded-2xl border border-white/20 shadow-md xl:hidden" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-cyan-400 font-mono font-bold uppercase tracking-wider mb-1", children: [
                /* @__PURE__ */ jsx("span", { children: "CORx Healthcare Admin" }),
                /* @__PURE__ */ jsx(ChevronRight, { size: 14 }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-300", children: activeTab })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-black tracking-tight font-montserrat text-white", children: "Content & Services Control Center" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: loadServices,
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all shadow-md cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { size: 15, className: loading ? "animate-spin" : "" }),
                /* @__PURE__ */ jsx("span", { children: "Sync API" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "xl:hidden flex items-center gap-2 mb-8 overflow-x-auto pb-2", children: [
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "subservices", label: "Sub-Services", icon: CornerDownRight },
          { id: "understanding", label: "Understanding", icon: BookOpen },
          { id: "benefits", label: "Benefits", icon: ListChecks },
          { id: "parents", label: "Parents", icon: Layers },
          { id: "hierarchy", label: "Hierarchy", icon: Activity },
          { id: "blogs", label: "Blogs", icon: PenLine }
        ].map((tab) => {
          const Icon = tab.icon;
          const isBlog = tab.id === "blogs";
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveTab(tab.id),
              className: `flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${activeTab === tab.id ? isBlog ? "bg-purple-500 text-white shadow-md shadow-purple-500/20" : "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20" : "bg-slate-900 text-slate-400 border border-slate-800"}`,
              children: [
                /* @__PURE__ */ jsx(Icon, { size: 15 }),
                /* @__PURE__ */ jsx("span", { children: tab.label })
              ]
            },
            tab.id
          );
        }) }),
        activeTab === "overview" && /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#0a1224]/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold uppercase tracking-wider text-slate-400", children: "Total Services" }),
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Activity, { size: 20 }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-4xl font-black text-white font-montserrat tracking-tight", children: servicesData2.length }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-3 text-xs text-emerald-400 font-bold", children: [
                /* @__PURE__ */ jsx(TrendingUp, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: "Live in Django Database" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#0a1224]/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold uppercase tracking-wider text-slate-400", children: "Navbar Parents" }),
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Layers, { size: 20 }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-4xl font-black text-white font-montserrat tracking-tight", children: parentServices.length }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-3 text-xs text-emerald-400 font-bold", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: "Main Categories" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#0a1224]/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold uppercase tracking-wider text-slate-400", children: "Sub-Services" }),
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(CornerDownRight, { size: 20 }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-4xl font-black text-white font-montserrat tracking-tight", children: totalSubServices }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-3 text-xs text-purple-400 font-bold", children: [
                /* @__PURE__ */ jsx(ArrowUpRight, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: "Nested Offerings" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-[#0a1224]/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold uppercase tracking-wider text-slate-400", children: "API Health" }),
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 20 }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-lg font-black text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-emerald-400 animate-ping" }),
                /* @__PURE__ */ jsx("span", { children: "Operational" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400 mt-3 font-medium", children: "Django REST Engine" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 pb-4 border-b border-slate-800", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white uppercase tracking-tight font-montserrat flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { children: "Registered Services Overview" }) }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setActiveTab("subservices"),
                    className: "text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx("span", { children: "Manage All" }),
                      /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: allSubServicesList.slice(0, 5).map((sub) => {
                const parentObj = parentServices.find((p) => p.id === sub.parent);
                return /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-[#0e172e] border border-slate-800/80 flex items-center justify-between gap-4 hover:border-cyan-500/40 transition-all", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "font-extrabold text-white text-sm block", children: sub.title || sub.name }),
                    sub.tagline && /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 font-medium block mt-0.5 line-clamp-1", children: sub.tagline })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                    /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold", children: parentObj ? parentObj.name || parentObj.title : "Parent Category" }),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `${API_BASE_URL}/admin/api/service/${sub.id}/change/`,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "p-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer",
                        children: /* @__PURE__ */ jsx(Edit3, { size: 15, className: "text-[#00a2ff]" })
                      }
                    )
                  ] })
                ] }, sub.id);
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white uppercase tracking-tight font-montserrat", children: "Quick Clinical Presets" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-medium", children: "Instant pre-populated templates for quick testing and backend synchronization." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      setActiveTab("understanding");
                      handleLoadPresetUnderstanding("frozen_shoulder");
                    },
                    className: "w-full text-left p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/20 transition-all cursor-pointer flex items-center justify-between",
                    children: [
                      /* @__PURE__ */ jsx("span", { children: "Frozen Shoulder Stages" }),
                      /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      setActiveTab("understanding");
                      handleLoadPresetUnderstanding("knee_pain");
                    },
                    className: "w-full text-left p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs hover:bg-emerald-500/20 transition-all cursor-pointer flex items-center justify-between",
                    children: [
                      /* @__PURE__ */ jsx("span", { children: "Knee Osteoarthritis Stages" }),
                      /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      setActiveTab("understanding");
                      handleLoadPresetUnderstanding("elderly_care");
                    },
                    className: "w-full text-left p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-xs hover:bg-purple-500/20 transition-all cursor-pointer flex items-center justify-between",
                    children: [
                      /* @__PURE__ */ jsx("span", { children: "Elderly Care 3-Tier Plan" }),
                      /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        activeTab === "subservices" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-800", children: [
              /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(Plus, { size: 22 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white uppercase tracking-tight font-montserrat", children: "Create Sub-Service" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-medium", children: "Add a nested service under a parent category" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleAddSubService, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-[#0f1933] p-4.5 rounded-2xl border border-slate-800 space-y-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Layers, { size: 15 }),
                  /* @__PURE__ */ jsx("span", { children: "Select Parent Service" }),
                  /* @__PURE__ */ jsx("span", { className: "text-rose-400", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: selectedParentId,
                    onChange: (e) => setSelectedParentId(e.target.value),
                    className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white font-bold text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all cursor-pointer",
                    children: parentServices.map((p) => {
                      const count = servicesData2.filter((s) => s.parent === p.id).length;
                      return /* @__PURE__ */ jsxs("option", { value: p.id, children: [
                        p.name || p.title,
                        " (",
                        count,
                        " existing sub-services)"
                      ] }, p.id);
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(FileText, { size: 15, className: "text-cyan-400" }),
                  /* @__PURE__ */ jsx("span", { children: "Sub-Service Title" }),
                  /* @__PURE__ */ jsx("span", { className: "text-rose-400", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. Night Care Nurse, Doctor on Call",
                    value: subTitle,
                    onChange: (e) => setSubTitle(e.target.value),
                    className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(BookOpen, { size: 15, className: "text-cyan-400" }),
                  /* @__PURE__ */ jsx("span", { children: "Tagline / Description" })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 3,
                    placeholder: "e.g. 24/7 dedicated overnight clinical care at your doorstep in Dubai.",
                    value: subTagline,
                    onChange: (e) => setSubTagline(e.target.value),
                    className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: submitting,
                  className: "w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50",
                  children: submitting ? "Adding Sub-Service..." : "Create Sub-Service"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden text-white", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 pb-4 border-b border-[#1b2742] flex-wrap gap-4", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h3", { className: "text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { children: "Sub-Services Directory" }),
                /* @__PURE__ */ jsxs("span", { className: "px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold", children: [
                  filteredSubServices.length,
                  " Total"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Filter, { size: 15, className: "text-slate-400" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: selectedParentFilter,
                    onChange: (e) => setSelectedParentFilter(e.target.value),
                    className: "px-3.5 py-2 rounded-xl border border-slate-700/80 bg-[#060c19] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "all", children: "All Parent Categories" }),
                      parentServices.map((p) => /* @__PURE__ */ jsx("option", { value: p.id.toString(), children: p.name || p.title }, p.id))
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
              /* @__PURE__ */ jsx(Search, { size: 16, className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: searchTerm,
                  onChange: (e) => setSearchTerm(e.target.value),
                  placeholder: "Search services by title or description...",
                  className: "w-full pl-11 pr-10 py-3.5 rounded-2xl border border-[#1b2742] bg-[#060c19] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto rounded-2xl border border-[#1b2742] bg-[#090e1a]", children: [
              /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-[#0a1122] text-white text-sm font-extrabold border-b border-[#1b2742]", children: [
                  /* @__PURE__ */ jsx("th", { className: "py-4 px-4 font-montserrat", children: "Service Title" }),
                  /* @__PURE__ */ jsx("th", { className: "py-4 px-4 font-montserrat", children: "Parent Category" }),
                  /* @__PURE__ */ jsx("th", { className: "py-4 px-4 text-center font-montserrat font-bold text-white text-sm w-24", children: "Edit" }),
                  /* @__PURE__ */ jsx("th", { className: "py-4 px-4 text-center font-montserrat font-bold text-white text-sm w-24", children: "Delete" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-[#1b2742] text-xs font-medium", children: filteredSubServices.map((sub) => {
                  const parentObj = parentServices.find((p) => p.id === sub.parent);
                  return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#0f172a] transition-colors group", children: [
                    /* @__PURE__ */ jsxs("td", { className: "py-4 px-4", children: [
                      /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: `${API_BASE_URL}/admin/api/service/${sub.id}/change/`,
                          target: "_blank",
                          rel: "noreferrer",
                          className: "font-extrabold text-white text-sm hover:text-cyan-300 transition-colors block",
                          children: sub.title || sub.name
                        }
                      ),
                      sub.tagline && /* @__PURE__ */ jsx("div", { className: "text-slate-400 text-xs mt-0.5 line-clamp-1 font-sans", children: sub.tagline })
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "py-4 px-4", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-bold", children: parentObj ? parentObj.name || parentObj.title : "Standalone" }) }),
                    /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `${API_BASE_URL}/admin/api/service/${sub.id}/change/`,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#00a2ff]/10 transition-colors",
                        title: `Edit Service #${sub.id} in Django Admin`,
                        children: /* @__PURE__ */ jsx(Edit3, { size: 18, className: "text-[#00a2ff] stroke-[2.2] hover:scale-110 transition-transform" })
                      }
                    ) }),
                    /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `${API_BASE_URL}/admin/api/service/${sub.id}/delete/`,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#ff3b3b]/10 transition-colors",
                        title: `Delete Service #${sub.id} in Django Admin`,
                        children: /* @__PURE__ */ jsx(Trash2, { size: 18, className: "text-[#ff3b3b] stroke-[2.2] hover:scale-110 transition-transform" })
                      }
                    ) })
                  ] }, sub.id);
                }) })
              ] }),
              filteredSubServices.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-12 text-center text-slate-500 font-medium text-xs", children: "No services found matching your search." })
            ] })
          ] }) })
        ] }),
        activeTab === "understanding" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-[#0a1224]/90 px-6 py-4 rounded-2xl border border-slate-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 text-xs font-mono font-bold uppercase text-cyan-400", children: [
              /* @__PURE__ */ jsx(Sliders, { size: 18 }),
              /* @__PURE__ */ jsx("span", { children: "Real-Time Visual Sandbox" })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowLivePreview(!showLivePreview),
                className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all cursor-pointer",
                children: [
                  showLivePreview ? /* @__PURE__ */ jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsx(Eye, { size: 15 }),
                  /* @__PURE__ */ jsx("span", { children: showLivePreview ? "Hide Live Preview" : "Show Live Preview Sandbox" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 ${showLivePreview ? "lg:grid-cols-12" : "lg:grid-cols-1"} gap-8 items-start`, children: [
            /* @__PURE__ */ jsxs("div", { className: `${showLivePreview ? "lg:col-span-7" : "lg:col-span-1"} bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl`, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 pb-4 border-b border-slate-800 flex-wrap gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(BookOpen, { size: 22 }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white uppercase tracking-tight font-montserrat", children: "Understanding Section Builder" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-medium", children: "Configure medical overview & condition stages" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleLoadPresetUnderstanding("frozen_shoulder"),
                      className: "px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20 cursor-pointer",
                      children: "Frozen Shoulder"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleLoadPresetUnderstanding("knee_pain"),
                      className: "px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 cursor-pointer",
                      children: "Knee Pain"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveUnderstanding, className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2", children: "Target Service" }),
                  /* @__PURE__ */ jsx(
                    "select",
                    {
                      value: selectedUnderstandingServiceSlug,
                      onChange: handleUnderstandingServiceChange,
                      className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white font-bold text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner",
                      children: servicesData2.map((s) => /* @__PURE__ */ jsx("option", { value: s.slug, children: s.title || s.name }, s.id))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2", children: "Section Heading Title" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: understandingTitleText,
                      onChange: (e) => setUnderstandingTitleText(e.target.value),
                      className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2", children: "Introductory Paragraph" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 3,
                      value: understandingIntroText,
                      onChange: (e) => setUnderstandingIntroText(e.target.value),
                      className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-[#091124] border-2 border-dashed border-slate-700 hover:border-cyan-500/50 transition-all", children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Image, { size: 16, className: "text-cyan-400" }),
                    /* @__PURE__ */ jsx("span", { children: "Upload Illustration Graphic" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "file",
                        accept: "image/*",
                        onChange: (e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUnderstandingImageFile(e.target.files[0]);
                            setUnderstandingImagePreview(URL.createObjectURL(e.target.files[0]));
                          }
                        },
                        className: "block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                      }
                    ),
                    understandingImagePreview && /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl border border-slate-700 overflow-hidden shrink-0 shadow-md", children: /* @__PURE__ */ jsx("img", { src: understandingImagePreview, alt: "Preview", className: "w-full h-full object-cover" }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxs("label", { className: "text-xs font-mono font-bold uppercase tracking-wider text-slate-400", children: [
                      "Stages List (",
                      understandingItems.length,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleAddUnderstandingRow,
                        className: "px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 cursor-pointer flex items-center gap-1",
                        children: [
                          /* @__PURE__ */ jsx(Plus, { size: 14 }),
                          /* @__PURE__ */ jsx("span", { children: "Add Stage" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-4", children: understandingItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl border border-slate-800 bg-[#060c19] space-y-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-cyan-400 uppercase", children: [
                        "Stage #",
                        idx + 1
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx("button", { type: "button", disabled: idx === 0, onClick: () => handleMoveUnderstandingItem(idx, "up"), className: "p-1 text-slate-400 hover:text-white disabled:opacity-30", children: /* @__PURE__ */ jsx(ArrowUp, { size: 14 }) }),
                        /* @__PURE__ */ jsx("button", { type: "button", disabled: idx === understandingItems.length - 1, onClick: () => handleMoveUnderstandingItem(idx, "down"), className: "p-1 text-slate-400 hover:text-white disabled:opacity-30", children: /* @__PURE__ */ jsx(ArrowDown, { size: 14 }) }),
                        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleRemoveUnderstandingRow(idx), className: "p-1 text-rose-400 hover:text-rose-300 ml-1", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: item.title,
                        onChange: (e) => handleUnderstandingItemChange(idx, "title", e.target.value),
                        placeholder: "Title (e.g. 1. Freezing Stage)",
                        className: "w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-[#0a1224] text-white text-xs font-bold focus:outline-none focus:border-cyan-400"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        rows: 2,
                        value: item.desc,
                        onChange: (e) => handleUnderstandingItemChange(idx, "desc", e.target.value),
                        placeholder: "Description...",
                        className: "w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-[#0a1224] text-white text-xs focus:outline-none focus:border-cyan-400"
                      }
                    )
                  ] }, idx)) })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: submitting,
                    className: "w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50",
                    children: submitting ? "Saving Section..." : "Save Section to Backend API"
                  }
                )
              ] })
            ] }),
            showLivePreview && /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 border border-slate-800 p-6 rounded-3xl shadow-2xl text-slate-800 bg-white sticky top-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-extrabold text-slate-900 tracking-tight font-montserrat mb-2", children: understandingTitleText || "Understanding Section Heading" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-xs leading-relaxed mb-4", children: understandingIntroText || "Introductory description..." }),
              understandingImagePreview && /* @__PURE__ */ jsx("div", { className: "rounded-xl overflow-hidden border border-slate-200 mb-4 max-h-48", children: /* @__PURE__ */ jsx("img", { src: understandingImagePreview, alt: "Illustration Preview", className: "w-full h-full object-cover" }) }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: understandingItems.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100", children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-[#08709d] text-white text-xs font-extrabold flex items-center justify-center shrink-0", children: item.num || i + 1 }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-extrabold text-slate-900 block", children: item.title }),
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] text-slate-600 block leading-snug", children: item.desc })
                ] })
              ] }, i)) })
            ] })
          ] })
        ] }),
        activeTab === "benefits" && /* @__PURE__ */ jsxs("div", { className: "bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-4xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-800", children: [
            /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(ListChecks, { size: 22 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white uppercase tracking-tight font-montserrat", children: "Benefits & Custom Image Builder" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-medium", children: "Manage custom clinical bullet points & visual photo graphics" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveBenefits, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2", children: "Target Service" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: selectedBenefitsServiceSlug,
                  onChange: handleBenefitsServiceChange,
                  className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white font-bold text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner",
                  children: servicesData2.map((s) => /* @__PURE__ */ jsx("option", { value: s.slug, children: s.title || s.name }, s.id))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2", children: "Benefits Section Title" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: benefitsTitleText,
                  onChange: (e) => setBenefitsTitleText(e.target.value),
                  className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-[#091124] border-2 border-dashed border-slate-700 hover:border-emerald-500/50 transition-all", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Image, { size: 16, className: "text-emerald-400" }),
                /* @__PURE__ */ jsx("span", { children: "Upload Custom Benefits Image" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: (e) => {
                      if (e.target.files && e.target.files[0]) {
                        setBenefitsImageFile(e.target.files[0]);
                        setBenefitsImagePreview(URL.createObjectURL(e.target.files[0]));
                      }
                    },
                    className: "block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                  }
                ),
                benefitsImagePreview && /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl border border-slate-700 overflow-hidden shrink-0 shadow-md", children: /* @__PURE__ */ jsx("img", { src: benefitsImagePreview, alt: "Preview", className: "w-full h-full object-cover" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxs("label", { className: "text-xs font-mono font-bold uppercase tracking-wider text-slate-400", children: [
                  "Bulleted Points (",
                  benefitsItems.length,
                  ")"
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleAddBenefitRow,
                    className: "px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 text-xs font-bold hover:bg-emerald-500/20 cursor-pointer flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx(Plus, { size: 14 }),
                      /* @__PURE__ */ jsx("span", { children: "Add Benefit" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: benefitsItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl border border-slate-800 bg-[#060c19] space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono font-bold text-emerald-400 uppercase", children: [
                    "Benefit #",
                    idx + 1
                  ] }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleRemoveBenefitRow(idx), className: "p-1 text-rose-400 hover:text-rose-300", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: item.title,
                    onChange: (e) => handleBenefitItemChange(idx, "title", e.target.value),
                    placeholder: "Benefit Title...",
                    className: "w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-[#0a1224] text-white text-xs font-bold focus:outline-none focus:border-emerald-500"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 2,
                    value: item.desc,
                    onChange: (e) => handleBenefitItemChange(idx, "desc", e.target.value),
                    placeholder: "Description...",
                    className: "w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-[#0a1224] text-white text-xs focus:outline-none focus:border-emerald-500"
                  }
                )
              ] }, idx)) })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: submitting,
                className: "w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50",
                children: submitting ? "Saving Benefits..." : "Save Benefits & Image To Backend"
              }
            )
          ] })
        ] }),
        activeTab === "parents" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-800", children: [
              /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(Layers, { size: 22 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white uppercase tracking-tight font-montserrat", children: "Create Parent Category" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-medium", children: "Add a top-level navbar service category" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleAddParentService, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2", children: [
                  "Category Title ",
                  /* @__PURE__ */ jsx("span", { className: "text-rose-400", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. Telehealth & Online Care",
                    value: parentTitle,
                    onChange: (e) => setParentTitle(e.target.value),
                    className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-bold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2", children: "Tagline / Description" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 3,
                    placeholder: "e.g. 24/7 Virtual doctor consultations in Dubai",
                    value: parentTagline,
                    onChange: (e) => setParentTagline(e.target.value),
                    className: "w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: submitting,
                  className: "w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50",
                  children: submitting ? "Adding Parent..." : "Add Parent Category"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden text-white", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-extrabold text-white uppercase tracking-tight font-montserrat mb-6 pb-4 border-b border-[#1b2742] flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { children: "Top Navbar Parent Categories" }),
              /* @__PURE__ */ jsxs("span", { className: "px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold", children: [
                parentServices.length,
                " Total"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-2xl border border-[#1b2742] bg-[#090e1a]", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-[#0a1122] text-white text-sm font-extrabold border-b border-[#1b2742]", children: [
                /* @__PURE__ */ jsx("th", { className: "py-4 px-4 font-montserrat", children: "Category Title" }),
                /* @__PURE__ */ jsx("th", { className: "py-4 px-4 text-center font-montserrat", children: "Sub-Services" }),
                /* @__PURE__ */ jsx("th", { className: "py-4 px-4 text-center font-montserrat font-bold text-white text-sm w-24", children: "Edit" }),
                /* @__PURE__ */ jsx("th", { className: "py-4 px-4 text-center font-montserrat font-bold text-white text-sm w-24", children: "Delete" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-[#1b2742] text-xs font-medium", children: parentServices.map((p) => {
                const subCount = servicesData2.filter((s) => s.parent === p.id).length;
                return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#0f172a] transition-colors group", children: [
                  /* @__PURE__ */ jsxs("td", { className: "py-4 px-4", children: [
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `${API_BASE_URL}/admin/api/service/${p.id}/change/`,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "font-extrabold text-white text-sm group-hover:text-emerald-300 transition-colors block",
                        children: p.title || p.name
                      }
                    ),
                    (p.tagline || p.subtitle) && /* @__PURE__ */ jsx("div", { className: "text-slate-400 text-xs mt-0.5 line-clamp-1 font-sans", children: p.tagline || p.subtitle })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold", children: [
                    subCount,
                    " Items"
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `${API_BASE_URL}/admin/api/service/${p.id}/change/`,
                      target: "_blank",
                      rel: "noreferrer",
                      className: "inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#00a2ff]/10 transition-colors",
                      title: `Edit Category #${p.id} in Django Admin`,
                      children: /* @__PURE__ */ jsx(Edit3, { size: 18, className: "text-[#00a2ff] stroke-[2.2] hover:scale-110 transition-transform" })
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `${API_BASE_URL}/admin/api/service/${p.id}/delete/`,
                      target: "_blank",
                      rel: "noreferrer",
                      className: "inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#ff3b3b]/10 transition-colors",
                      title: `Delete Category #${p.id} in Django Admin`,
                      children: /* @__PURE__ */ jsx(Trash2, { size: 18, className: "text-[#ff3b3b] stroke-[2.2] hover:scale-110 transition-transform" })
                    }
                  ) })
                ] }, p.id);
              }) })
            ] }) })
          ] }) })
        ] }),
        activeTab === "hierarchy" && /* @__PURE__ */ jsxs("div", { className: "bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-white uppercase tracking-tight font-montserrat mb-6 pb-4 border-b border-slate-800", children: "Complete Architecture Map" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: parentServices.map((parent) => {
            const subs = servicesData2.filter((s) => s.parent === parent.id);
            return /* @__PURE__ */ jsxs("div", { className: "border border-slate-800 rounded-3xl p-6 bg-[#060b17] hover:border-cyan-500/40 transition-all", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 pb-3 border-b border-slate-800", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(Layers, { size: 18 }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-sm font-black text-white font-montserrat", children: parent.name || parent.title }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 uppercase font-mono", children: "Navbar Parent" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `${API_BASE_URL}/admin/api/service/${parent.id}/change/`,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "p-2 text-[#00a2ff] hover:bg-[#00a2ff]/10 rounded-lg transition-all",
                    title: "Edit in Django Admin",
                    children: /* @__PURE__ */ jsx(Edit3, { size: 15 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2.5", children: subs.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 italic", children: "No sub-services attached" }) : subs.map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-[#0a1224] p-3 rounded-2xl border border-slate-800 text-xs", children: [
                /* @__PURE__ */ jsxs("span", { className: "font-bold text-slate-200 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(CornerDownRight, { size: 14, className: "text-emerald-400" }),
                  s.title || s.name
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `${API_BASE_URL}/admin/api/service/${s.id}/change/`,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "text-[#00a2ff] hover:text-cyan-300",
                    title: "Edit in Django Admin",
                    children: /* @__PURE__ */ jsx(Edit3, { size: 14 })
                  }
                ) })
              ] }, s.id)) })
            ] }, parent.id);
          }) })
        ] }),
        activeTab === "blogs" && /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { children: blogDeleteConfirm && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
              children: /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { scale: 0.85, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  exit: { scale: 0.85, opacity: 0 },
                  className: "bg-[#0c1527] border border-rose-500/40 rounded-3xl p-8 max-w-sm w-full shadow-2xl shadow-rose-500/10",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Trash2, { size: 22 }) }),
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white uppercase tracking-tight font-montserrat mb-2", children: "Delete Blog Post?" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mb-6 leading-relaxed", children: "This action is permanent and cannot be undone. The blog post will be removed from the backend database." }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => handleDeleteBlog(blogDeleteConfirm),
                          className: "flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer hover:opacity-90 transition-all",
                          children: "Yes, Delete"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setBlogDeleteConfirm(null),
                          className: "flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-all",
                          children: "Cancel"
                        }
                      )
                    ] })
                  ]
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl sticky top-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 pb-4 border-b border-slate-800", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: `w-11 h-11 rounded-2xl flex items-center justify-center font-bold border ${editingBlog ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-purple-500/20 text-purple-400 border-purple-500/30"}`, children: editingBlog ? /* @__PURE__ */ jsx(Edit3, { size: 22 }) : /* @__PURE__ */ jsx(PenLine, { size: 22 }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-white uppercase tracking-tight font-montserrat", children: editingBlog ? "Edit Blog Post" : "New Blog Post" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-medium", children: editingBlog ? `Editing: "${(_a = editingBlog.title) == null ? void 0 : _a.slice(0, 28)}..."` : "Publish a new article to the site" })
                  ] })
                ] }),
                editingBlog && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: resetBlogForm,
                    className: "p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer",
                    title: "Cancel editing",
                    children: /* @__PURE__ */ jsx(X, { size: 16 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveBlog, className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(FileText, { size: 13 }),
                    /* @__PURE__ */ jsx("span", { children: "Title" }),
                    /* @__PURE__ */ jsx("span", { className: "text-rose-400", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: blogTitle,
                      onChange: (e) => handleBlogTitleChange(e.target.value),
                      placeholder: "e.g. Understanding Total Knee Replacement",
                      className: "w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 shadow-inner transition-all placeholder-slate-500"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Hash, { size: 13 }),
                    /* @__PURE__ */ jsx("span", { children: "URL Slug" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: blogSlug,
                      onChange: (e) => setBlogSlug(e.target.value),
                      placeholder: "auto-generated-from-title",
                      className: "w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-slate-300 text-xs font-mono focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-600"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(User, { size: 12 }),
                      /* @__PURE__ */ jsx("span", { children: "Author" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: blogAuthor,
                        onChange: (e) => setBlogAuthor(e.target.value),
                        placeholder: "Dr. Ulhas Sonar",
                        className: "w-full px-3 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-500"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(Clock, { size: 12 }),
                      /* @__PURE__ */ jsx("span", { children: "Date" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: blogDate,
                        onChange: (e) => setBlogDate(e.target.value),
                        className: "w-full px-3 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-purple-400 shadow-inner transition-all"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Tag, { size: 13 }),
                    /* @__PURE__ */ jsx("span", { children: "Category Tag" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: blogTag,
                      onChange: (e) => setBlogTag(e.target.value),
                      placeholder: "e.g. KNEE-REPLACEMENT",
                      className: "w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-500"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Link2, { size: 13 }),
                    /* @__PURE__ */ jsx("span", { children: "Cover Image URL" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "url",
                      value: blogImageUrl,
                      onChange: (e) => setBlogImageUrl(e.target.value),
                      placeholder: "https://images.unsplash.com/...",
                      className: "w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-mono focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-600"
                    }
                  ),
                  blogImageUrl && /* @__PURE__ */ jsx("div", { className: "mt-2 w-full h-24 rounded-xl overflow-hidden border border-slate-700", children: /* @__PURE__ */ jsx("img", { src: blogImageUrl, alt: "Cover preview", className: "w-full h-full object-cover", onError: (e) => e.target.style.display = "none" }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(AlignLeft, { size: 13 }),
                    /* @__PURE__ */ jsx("span", { children: "Excerpt / Summary" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 3,
                      value: blogExcerpt,
                      onChange: (e) => setBlogExcerpt(e.target.value),
                      placeholder: "A brief 1–2 sentence summary shown on the blog listing page...",
                      className: "w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-500"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(BookOpen, { size: 13 }),
                    /* @__PURE__ */ jsx("span", { children: "Full Content (HTML / Markdown)" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 8,
                      value: blogContent,
                      onChange: (e) => setBlogContent(e.target.value),
                      placeholder: "Write the full blog post content here. You can use HTML or Markdown...",
                      className: "w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed font-mono focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-500 resize-y"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: blogSubmitting,
                    className: `w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 transition-all ${editingBlog ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-purple-500/20"}`,
                    children: [
                      /* @__PURE__ */ jsx(Save, { size: 16 }),
                      blogSubmitting ? "Saving..." : editingBlog ? "Update Blog Post" : "Publish Blog Post"
                    ]
                  }
                ),
                editingBlog && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: resetBlogForm,
                    className: "w-full py-3 rounded-2xl bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-all",
                    children: "Cancel — Create New Instead"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 pb-4 border-b border-[#1b2742] flex-wrap gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(PenLine, { size: 20 }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2", children: [
                      "Blog Posts",
                      /* @__PURE__ */ jsxs("span", { className: "px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-bold", children: [
                        blogsData.length,
                        " Total"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: "All published articles from backend" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: loadBlogs,
                    className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-purple-400 border border-purple-500/30 text-xs font-bold transition-all cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx(RefreshCw, { size: 14, className: blogsLoading ? "animate-spin" : "" }),
                      "Refresh"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative mb-5", children: [
                /* @__PURE__ */ jsx(Search, { size: 15, className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: blogSearchTerm,
                    onChange: (e) => setBlogSearchTerm(e.target.value),
                    placeholder: "Search by title, author, or tag...",
                    className: "w-full pl-11 pr-4 py-3 rounded-2xl border border-[#1b2742] bg-[#060c19] text-xs font-bold text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 shadow-inner"
                  }
                )
              ] }),
              blogsLoading ? /* @__PURE__ */ jsxs("div", { className: "py-16 text-center", children: [
                /* @__PURE__ */ jsx(RefreshCw, { size: 28, className: "animate-spin text-purple-400 mx-auto mb-3" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs font-bold", children: "Loading blog posts..." })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto rounded-2xl border border-[#1b2742]", children: [
                /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                  /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-[#0a1122] text-white text-xs font-extrabold border-b border-[#1b2742]", children: [
                    /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 font-montserrat", children: "Title" }),
                    /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 font-montserrat hidden sm:table-cell", children: "Author" }),
                    /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 font-montserrat hidden md:table-cell", children: "Tag" }),
                    /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 font-montserrat hidden lg:table-cell", children: "Date" }),
                    /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 text-center font-montserrat w-20", children: "Edit" }),
                    /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 text-center font-montserrat w-20", children: "Delete" })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-[#1b2742] text-xs font-medium", children: blogsData.filter((b) => {
                    const q = blogSearchTerm.toLowerCase();
                    return !q || (b.title || "").toLowerCase().includes(q) || (b.author || "").toLowerCase().includes(q) || (b.tag || "").toLowerCase().includes(q);
                  }).map((blog) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#0f172a] transition-colors group", children: [
                    /* @__PURE__ */ jsxs("td", { className: "py-4 px-4", children: [
                      /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: `/blog/${blog.slug || blog.id}`,
                          target: "_blank",
                          rel: "noreferrer",
                          className: "font-extrabold text-white text-sm hover:text-purple-300 transition-colors block line-clamp-1",
                          children: blog.title
                        }
                      ),
                      blog.excerpt && /* @__PURE__ */ jsx("div", { className: "text-slate-500 text-[11px] mt-0.5 line-clamp-1", children: blog.excerpt })
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "py-4 px-4 hidden sm:table-cell", children: /* @__PURE__ */ jsx("span", { className: "text-slate-300 font-medium", children: blog.author || "—" }) }),
                    /* @__PURE__ */ jsx("td", { className: "py-4 px-4 hidden md:table-cell", children: blog.tag && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-bold whitespace-nowrap", children: blog.tag }) }),
                    /* @__PURE__ */ jsx("td", { className: "py-4 px-4 hidden lg:table-cell", children: /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-mono text-[11px]", children: blog.date || "—" }) }),
                    /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => {
                          populateBlogForm(blog);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        },
                        className: "inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#00a2ff]/10 transition-colors cursor-pointer",
                        title: "Edit this blog post",
                        children: /* @__PURE__ */ jsx(Edit3, { size: 17, className: "text-[#00a2ff] stroke-[2.2] hover:scale-110 transition-transform" })
                      }
                    ) }),
                    /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setBlogDeleteConfirm(blog.id),
                        className: "inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#ff3b3b]/10 transition-colors cursor-pointer",
                        title: "Delete this blog post",
                        children: /* @__PURE__ */ jsx(Trash2, { size: 17, className: "text-[#ff3b3b] stroke-[2.2] hover:scale-110 transition-transform" })
                      }
                    ) })
                  ] }, blog.id)) })
                ] }),
                blogsData.filter((b) => {
                  const q = blogSearchTerm.toLowerCase();
                  return !q || (b.title || "").toLowerCase().includes(q) || (b.author || "").toLowerCase().includes(q) || (b.tag || "").toLowerCase().includes(q);
                }).length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-14 text-center", children: [
                  /* @__PURE__ */ jsx(PenLine, { size: 32, className: "text-slate-700 mx-auto mb-3" }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-bold text-xs", children: blogsData.length === 0 ? "No blog posts found. Create your first post using the form on the left." : "No results match your search." })
                ] })
              ] })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const AnimatedRoutes = () => {
  const location = useLocation();
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(Routes, { location, children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(Navigate, { to: "/about-us", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsx(Dashboard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/:parentSlug/:serviceSlug", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/:parentSlug/:serviceSlug/", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/:serviceSlug", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/:serviceSlug/", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about-us", element: /* @__PURE__ */ jsx(About, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about-us/", element: /* @__PURE__ */ jsx(About, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/lab-test-at-home", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "lab-test-at-home" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/lab-test-at-home/", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "lab-test-at-home" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/physiotherapy-at-home-in-dubai", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "physiotherapy-at-home-in-dubai" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/physiotherapy-at-home-in-dubai/", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "physiotherapy-at-home-in-dubai" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/home-nursing", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "home-nursing" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/home-nursing/", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "home-nursing" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/elderly-home-care", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "elderly-home-care" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/elderly-home-care/", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "elderly-home-care" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/elderly-care", element: /* @__PURE__ */ jsx(Navigate, { to: "/elderly-home-care", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/elderly-care/", element: /* @__PURE__ */ jsx(Navigate, { to: "/elderly-home-care", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/iv-therapy", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "iv-therapy" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/iv-therapy/", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "iv-therapy" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/doctor-on-call", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "doctor-on-call" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/doctor-on-call/", element: /* @__PURE__ */ jsx(ServicePage, { serviceId: "doctor-on-call" }) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(OrthopedicArticlesPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog/:slug", element: /* @__PURE__ */ jsx(BlogDetails, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog/details", element: /* @__PURE__ */ jsx(BlogDetails, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/locations", element: /* @__PURE__ */ jsx(Locations, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Navigate, { to: "/book-an-appointment", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/book-an-appointment", element: /* @__PURE__ */ jsx(Contact, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/book-an-appointment/", element: /* @__PURE__ */ jsx(Contact, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/team", element: /* @__PURE__ */ jsx(Team, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/:parentSlug/:serviceSlug", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/:parentSlug/:serviceSlug/", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/physiotherapy-at-home-in-dubai/:serviceSlug", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/physiotherapy-at-home-in-dubai/:serviceSlug/", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/physiotherapy/:serviceSlug", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/physiotherapy/:serviceSlug/", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/:parentSlug/:serviceSlug", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/:parentSlug/:serviceSlug/", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/:serviceSlug", element: /* @__PURE__ */ jsx(ServicePage, {}) })
  ] }, location.pathname) });
};
const MainLayout = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "flex-grow", children }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsx(Chatbot, {})
  ] });
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#ffffff] p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-sky-50 text-[#08709d] flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-extrabold text-slate-900 mb-2", children: "CORx Healthcare" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm mb-6", children: "We experienced a temporary glitch while loading this view. Please refresh or return to the homepage." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => typeof window !== "undefined" && window.location.reload(),
              className: "px-6 py-3 rounded-xl bg-[#08709d] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#065679] transition-all cursor-pointer",
              children: "Reload Page"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/",
              className: "px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all",
              children: "Go Home"
            }
          )
        ] })
      ] }) });
    }
    return this.props.children;
  }
}
function App() {
  return /* @__PURE__ */ jsxs(GlobalErrorBoundary, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(MainLayout, { children: /* @__PURE__ */ jsx(AnimatedRoutes, {}) })
  ] });
}
function render(url) {
  const html = renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) })
  );
  return { html };
}
export {
  render
};
