import React from 'react';
import { Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import logo from '../assets/logo.webp';

const Facebook = ({ size = 20, className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 20, className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = ({ size = 20, className = '', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);


const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
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

  return (
    <footer className="relative bg-[#0d1527] text-white font-sans pt-20 pb-10 border-t border-white/5">
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.05]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#08709d] blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#2ebd6e] blur-[120px] translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          
          {/* Column 1: Brand & Social Info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <Link to="/" className="inline-block relative group w-fit">
              <img 
                src={logo} 
                alt="CORX Healthcare Logo" 
                className="h-14 w-auto object-contain rounded-xl bg-white px-3.5 py-2 shadow-md hover:scale-[1.02] transition-transform duration-300" 
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              Corx Healthcare provides premium home care services in Dubai, available 24×7 to meet your medical needs. Experience hassle-free, high-quality clinical care at your doorstep.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: <Facebook size={18} />, href: '#facebook', label: 'Facebook' },
                { icon: <Twitter size={18} />, href: '#twitter', label: 'Twitter' },
                { icon: <Instagram size={18} />, href: '#instagram', label: 'Instagram' }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#2ebd6e] hover:border-[#2ebd6e] transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-sm mb-6 pb-2.5 border-b border-white/10 flex items-center justify-between">
              <span>Quick Links</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ebd6e]"></span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="flex flex-col gap-3.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about-us' },
                { name: 'Our Team', path: '/team' },
                { name: 'Contact Us', path: '/book-an-appointment' },
                { name: 'Services Dashboard', path: '/dashboard' }
              ].map((link, index) => (
                <li key={index} style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  <Link 
                    to={link.path} 
                    className="text-slate-300 hover:text-[#2ebd6e] text-sm font-medium flex items-center gap-2 group transition-colors duration-300 w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#2ebd6e] group-hover:scale-125 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300 block">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Medical Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-sm mb-6 pb-2.5 border-b border-white/10 flex items-center justify-between">
              <span>Our Services</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ebd6e]"></span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="flex flex-col gap-3.5">
              {[
                { name: 'IV Therapy at Home', path: '/iv-therapy' },
                { name: 'Home Nursing', path: '/home-nursing' },
                { name: 'Doctor On Call', path: '/doctor-on-call' },
                { name: 'Elderly Home Care', path: '/elderly-care' },
                { name: 'Lab Test At Home', path: '/lab-test-at-home' }
              ].map((link, index) => (
                <li key={index} style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  <Link 
                    to={link.path} 
                    className="text-slate-300 hover:text-[#2ebd6e] text-sm font-medium flex items-center gap-2 group transition-colors duration-300 w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#2ebd6e] group-hover:scale-125 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300 block">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Us & Newsletter */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-sm mb-1 pb-2.5 border-b border-white/10 flex items-center justify-between">
              <span>Contact Us</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#08709d]"></span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="flex flex-col gap-4">
              <li style={{ listStyleType: 'none' }} className="flex items-start gap-3 text-slate-300 text-sm font-medium leading-relaxed">
                <MapPin size={18} className="text-[#2ebd6e] shrink-0 mt-0.5" />
                <span>
                  Office 303, Royal Class Building,<br />
                  Dubai Investment Park 1st,<br />
                  Dubai - UAE
                </span>
              </li>
              <li style={{ listStyleType: 'none' }} className="flex items-start gap-3 text-slate-300 text-sm font-medium">
                <Phone size={18} className="text-[#2ebd6e] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5">
                  <a href="tel:+97143320776" className="hover:text-[#2ebd6e] transition-colors duration-200">
                    Landline: +971 4 332 0776
                  </a>
                  <a href="tel:+971547033311" className="hover:text-[#2ebd6e] transition-colors duration-200">
                    24/7 Mobile: +971 54 703 3311
                  </a>
                </div>
              </li>
              <li style={{ listStyleType: 'none' }} className="flex items-start gap-3 text-slate-300 text-sm font-medium">
                <Mail size={18} className="text-[#2ebd6e] shrink-0 mt-0.5" />
                <a href="mailto:info@corx.ae" className="hover:text-[#2ebd6e] transition-colors duration-200">
                  info@corx.ae
                </a>
              </li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="border-t border-white/5 pt-8 text-center text-xs font-semibold text-slate-400"
        >
          <p>© {currentYear} CORX Healthcare. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
