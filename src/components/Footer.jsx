import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer className="relative bg-[#1a294a] text-white overflow-hidden font-sans pt-20 pb-8">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#08709d] blur-[120px]"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#5fb54a] blur-[120px]"
        ></motion.div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
        >
          
          {/* Brand & Description (Col Span 4) */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link to="/" className="inline-block mb-8 relative group">
              <div className="absolute -inset-4 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              {/* Removed brightness-0 invert so logo shows true colors, added white background to make it pop on dark theme if it's a dark logo */}
              <img src={logo} alt="CORX Healthcare Logo" className="h-28 md:h-32 w-auto object-contain relative z-10 rounded-xl bg-white p-3 shadow-xl group-hover:scale-105 transition-transform duration-500" />
            </Link>
            <p className="text-blue-100/90 mb-10 text-base md:text-lg leading-relaxed pr-4 font-medium">
              Corx Healthcare provides premium home care services in Dubai, available 24×7 to meet your medical needs at home. Book expert doctors or nurses today and experience hassle-free, high-quality healthcare at your doorstep.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'instagram'].map((social, index) => (
                <motion.a 
                  key={index} 
                  href={`#${social}`} 
                  whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                  className="bg-white/10 p-3.5 rounded-full hover:bg-[#5fb54a] transition-colors duration-300 border border-white/10 shadow-lg"
                  style={{ color: '#63b158' }}
                >
                  {social === 'twitter' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#63b158' }}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>}
                  {social === 'facebook' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#63b158' }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>}
                  {social === 'instagram' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#63b158' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links (Col Span 2) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ color: '#ffffff' }}>
              <span className="w-4 h-1.5 bg-[#5fb54a] rounded-full"></span>
              Links
            </h4>
            <ul className="flex flex-col gap-5">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Career', path: '#' },
                { name: 'Sitemap', path: '#' },
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms Of Service', path: '#' }
              ].map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-blue-100/80 hover:text-[#5fb54a] text-base font-medium flex items-center gap-2 group transition-colors w-fit">
                    <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 absolute" />
                    <span className="group-hover:translate-x-7 transition-transform duration-300 block">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services (Col Span 3) */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ color: '#ffffff' }}>
              <span className="w-4 h-1.5 bg-[#5fb54a] rounded-full"></span>
              Our Services
            </h4>
            <ul className="flex flex-col gap-5">
              {[
                { name: 'Physiotherapy', path: '/services/physiotherapy' },
                { name: 'Frozen Shoulder', path: '/services/physiotherapy' },
                { name: 'IV Therapy', path: '/services/iv-therapy' },
                { name: 'Home Nursing', path: '/services/nursing' },
                { name: 'Doctor On Call', path: '/services/doctor-on-call' },
                { name: 'Elderly Home Care', path: '/services/elderly-care' },
                { name: 'Lab Test At Home', path: '/services/lab-services' }
              ].map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-blue-100/80 hover:text-[#5fb54a] text-base font-medium flex items-center gap-2 group transition-colors w-fit">
                    <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 absolute" />
                    <span className="group-hover:translate-x-7 transition-transform duration-300 block">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details (Col Span 2) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ color: '#ffffff' }}>
              <span className="w-4 h-1.5 bg-[#08709d] rounded-full"></span>
              Contact Us
            </h4>
            <ul className="flex flex-col gap-6">
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-4 group cursor-pointer">
                <div className="bg-white/10 p-3 rounded-xl text-[#5fb54a] group-hover:bg-[#5fb54a] group-hover:text-white transition-colors mt-0.5 shadow-md">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-base font-medium text-blue-100/90 leading-relaxed group-hover:text-white transition-colors">
                    Royal Class Building - Office 303,<br/>
                    Dubai Investment Park First,<br/>
                    Green Community Village,<br/>
                    Dubai - UAE
                  </p>
                </div>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-4 group cursor-pointer">
                <div className="bg-white/10 p-3 rounded-xl text-[#5fb54a] group-hover:bg-[#5fb54a] group-hover:text-white transition-colors mt-0.5 shadow-md">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+971547033311" className="text-base font-medium text-blue-100/90 hover:text-white transition-colors block">+971 54 703 3311</a>
                  <a href="tel:+971502785990" className="text-base font-medium text-blue-100/90 hover:text-white transition-colors block">+971 50 278 5990</a>
                </div>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-4 group cursor-pointer">
                <div className="bg-white/10 p-3 rounded-xl text-[#5fb54a] group-hover:bg-[#5fb54a] group-hover:text-white transition-colors mt-0.5 shadow-md">
                  <Mail size={20} style={{ color: '#63b158' }} />
                </div>
                <div>
                  <a href="mailto:info@corx.ae" className="text-base font-medium text-blue-100/90 hover:text-white transition-colors block">info@corx.ae</a>
                </div>
              </motion.li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-blue-100/50"
        >
          <p>
            © {currentYear} CORX Healthcare. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
