import React from 'react';
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.webp';

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
                { name: 'About Us', path: '/about' },
                { name: 'Our Team', path: '/team' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Frequently Asked Questions', path: '/#faq' }
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
                { name: 'Physiotherapy', path: '/services/physiotherapy' },
                { name: 'IV Therapy at Home', path: '/services/iv-therapy' },
                { name: 'Home Nursing', path: '/services/nursing' },
                { name: 'Doctor On Call', path: '/services/doctor-on-call' },
                { name: 'Elderly Home Care', path: '/services/elderly-care' },
                { name: 'Lab Test At Home', path: '/services/lab-services' }
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
