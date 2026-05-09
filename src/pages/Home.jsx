import React, { useState, useEffect } from 'react';
import { Shield, Users, Heart, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Pill, Flower2, User, Brain, Stethoscope, Droplets, Activity, Clock, Award, Phone, HandHeart, UserCheck, ThumbsUp, ShieldPlus, Leaf, HeartHandshake, Building, Smile, Home as HomeIcon, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import partner1 from '../assets/our partner2.png';
import partner3 from '../assets/our partner 3.png';
import partner4 from '../assets/our partner 4.webp';
import partner5 from '../assets/our partner 5.png';
import partner6 from '../assets/our partner 6.png';
import partner7 from '../assets/our partner 7.png';
import partner8 from '../assets/our partner 8.png';
import hero1 from '../assets/hero/hero1.png';
import GoogleReviews from '../components/GoogleReviews';

import hero2 from '../assets/hero/hero2.png';
import hero3 from '../assets/hero/hero3.png';
import dhaLogo from '../assets/Dubai_Health_Authority_log.png';

const Home = () => {
  const slides = [
    {
      title: "Trusted Home Healthcare Services In Dubai",
      subtitle: "Corx Healthcare is dedicated to providing high-quality medical services in the comfort of your home, delivering compassionate care with clinical excellence.",
      image: hero1,
      cta: "Book Appointment Now"
    },
    {
      title: "24/7 Availability & DHA Licensed",
      subtitle: "Fully accredited healthcare provider in Dubai. Round-the-clock medical assistance for all your needs.",
      image: hero2,
      cta: "Book Appointment Now"
    },
    {
      title: "Expert Care at Your Doorstep",
      subtitle: "Our team of expert doctors, nurses, and therapists are committed to your health and well-being.",
      image: hero3,
      cta: "Book Appointment Now"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);



  return (
    <main>
      {/* Hero Slider */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-black">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover brightness-[0.5] contrast-[1.1]"
            />
            {/* Vibrant Teal/Blue Gradient Overlay to match target design */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#08709d]/90 via-[#08709d]/70 to-[#5fb54a]/40 mix-blend-multiply"></div>
            {/* Soft Gradients for additional depth and text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="container relative z-10 text-white -mt-12 md:-mt-20">
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 !text-white flex flex-wrap gap-x-[0.3em]">
                {slides[currentSlide].title.split(" ").map((word, i) => (
                  <span key={i} className="relative overflow-hidden inline-block py-2">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.33, 1, 0.68, 1],
                        delay: i * 0.05 
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <p className="text-xl mb-10 text-gray-200 leading-relaxed max-w-2xl">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex mt-6">
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white text-[#2563eb] border-[2px] border-[#2563eb] px-10 py-3.5 rounded-xl font-semibold text-[15px] tracking-wide overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {/* Shine effect */}
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/20 to-transparent skew-x-[-25deg] z-10"
                  />
                  
                  <span className="relative z-20 flex items-center gap-3">
                    {slides[currentSlide].cta}
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
              
              {/* License Info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-20 flex items-center gap-6"
              >
                <div className="h-[1px] w-12 bg-white/30 hidden md:block"></div>
                <div className="flex items-center gap-5">
                  <p className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-white/90">
                    Licensed By
                  </p>
                  <img src={dhaLogo} alt="Dubai Health Authority" className="h-16 md:h-20 w-auto object-contain invert hue-rotate-180 mix-blend-screen opacity-90" />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 right-10 z-20 flex gap-4">
          <button onClick={prevSlide} className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all border border-white/20">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all border border-white/20">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`h-2 transition-all rounded-full ${i === currentSlide ? 'w-12 bg-primary-color' : 'w-4 bg-white/30'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Welcome/Intro Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* WOW Factor: Mesh Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-color/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-color/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-5xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-color/5 border border-primary-color/10 text-primary-color text-[10px] font-black uppercase tracking-[0.4em]"
            >
              Excellence In Care
            </motion.div>
            
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } }
              }}
              className="text-4xl md:text-6xl font-black mb-10 text-secondary-color tracking-tighter leading-none"
            >
              {["WELCOME", "TO", "COMPLETE", "HEALTHCARE"].map((word, i) => (
                <motion.span 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="inline-block mr-3"
                >
                  {word === "COMPLETE" || word === "HEALTHCARE" ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#63b158] to-[#08709d]">
                      {word}
                    </span>
                  ) : word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gray-400 text-lg leading-relaxed max-w-4xl mx-auto font-medium tracking-tight"
            >
              We have a compassionate group of doctors, nurses, and medical professionals dedicated to serving 
              the healthcare needs of individuals and families in Dubai, providing high-quality 
              medical services in the comfort of your home.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {[
              { icon: <Activity size={20} />, title: "Home", subtitle: "Physiotherapy", color: "from-[#1a294a] to-[#08709d]" },
              { icon: <Droplets size={20} />, title: "IV", subtitle: "Therapy", color: "from-[#1a294a] to-[#08709d]" },
              { icon: <Heart size={20} />, title: "Home", subtitle: "Nursing", color: "from-[#1a294a] to-[#08709d]" },
              { icon: <Stethoscope size={20} />, title: "Doctor", subtitle: "On Call", color: "from-[#1a294a] to-[#08709d]" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-color to-accent-color rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-500"></div>
                
                <div className={`relative bg-gradient-to-br ${feature.color} rounded-full flex items-center p-2 pr-10 shadow-2xl cursor-pointer overflow-hidden border border-white/10`}>
                  {/* Glassmorphic Shine */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                  
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner group-hover:bg-white/20 transition-all duration-500">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  
                  <div className="ml-5 text-white uppercase leading-tight">
                    <div className="text-[9px] font-black text-accent-color tracking-[0.2em] mb-1">{feature.title}</div>
                    <div className="text-xs font-black tracking-widest whitespace-nowrap">{feature.subtitle}</div>
                  </div>

                  {/* Arrow on hover */}
                  <div className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-500 text-white/50">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      












      {/* The CHC Difference Section */}
      <section className="bg-[#f8f9fa] py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                <motion.h2 
                  variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
                  className="text-3xl md:text-4xl font-black mb-10 text-secondary-color tracking-tight"
                >
                  The CHC Difference
                </motion.h2>
                
                <div className="space-y-10 mb-10">
                  {[
                    { icon: <HandHeart size={32} />, title: "Patient-Centric Care", desc: "We prioritize the needs and preferences of our patients, ensuring they receive personalized care that meets their unique requirements." },
                    { icon: <UserCheck size={32} />, title: "Expert Medical Team", desc: "Our team of highly skilled and experienced healthcare professionals is dedicated to providing the highest quality of care." },
                    { icon: <ThumbsUp size={32} />, title: "Compassionate Approach", desc: "We believe in treating our patients with empathy, ensuring they feel supported throughout their healthcare journey." },
                    { icon: <Clock size={32} />, title: "24/7 Support", desc: "Providing expert medical assistance 24 hours a day, 365 days a year, with same-day appointments available." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                      className="flex gap-6 group"
                    >
                      <div className="shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-color group-hover:bg-primary-color group-hover:text-white transition-all duration-300 border border-gray-100">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1.5 text-secondary-color">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-[15px] font-medium">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative bg-white text-[#2563eb] border-[2px] border-[#2563eb] px-10 py-3.5 rounded-xl font-semibold text-[15px] tracking-wide overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {/* Shine effect */}
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/20 to-transparent skew-x-[-25deg] z-10"
                    />
                    <span className="relative z-20 uppercase">SCHEDULE AN APPOINTMENT</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Image (Floating Card Style) */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-[30px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-[8px] border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="CHC Healthcare Professionals" 
                    className="w-full h-full object-cover min-h-[450px]"
                  />
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-white py-5 px-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-50"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#5fb54a]/10 flex items-center justify-center text-[#5fb54a]">
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-secondary-color">15+</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Years Experience</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* Spacing Gap */}
      <div className="h-24 bg-white"></div>

      {/* Stats / Counter Section */}
      <section className="bg-white py-24 relative border-y border-gray-100">
        <div className="container relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {[
              { label: "Happy Patients", value: "2,546", suffix: "+", icon: <Smile size={40} /> },
              { label: "Successful Homecare", value: "1.5", suffix: "M", icon: <HomeIcon size={40} /> },
              { label: "Years Of Experience", value: "15", suffix: "", icon: <Award size={40} /> },
              { label: "Professional Nurses", value: "120", suffix: "+", icon: <UserCheck size={40} /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-6 text-primary-color group-hover:text-[#63b158] transition-all duration-500">
                  {stat.icon}
                </div>

                <div className="flex items-baseline justify-center mb-2">
                  <h3 className="text-5xl md:text-6xl font-black text-secondary-color tracking-tighter">
                    {stat.value}
                  </h3>
                  {stat.suffix && (
                    <span className="text-2xl md:text-3xl font-black text-[#63b158] ml-1">{stat.suffix}</span>
                  )}
                </div>

                <p className="text-secondary-color/60 font-black uppercase tracking-[0.25em] text-[10px] md:text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GoogleReviews />

      {/* Partners Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-secondary-color uppercase tracking-widest">Our Partners</h2>
          </motion.div>

          <div className="flex flex-col gap-0 max-w-5xl mx-auto">
            {/* First Row: 4 Partners */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-wrap justify-center items-center gap-10 md:gap-12"
            >
              {[partner1, partner3, partner4, partner5].map((imgSrc, index) => (
                <motion.div
                  key={`row1-${index}`}
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                  whileHover={{ scale: 1.05 }}
                  className="w-32 md:w-40 lg:w-44 transition-all duration-300"
                >
                  <img src={imgSrc} alt={`Partner ${index + 1}`} className="w-full h-auto object-contain" />
                </motion.div>
              ))}
            </motion.div>

            {/* Second Row: 3 Partners */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
              }}
              className="flex flex-wrap justify-center items-center gap-10 md:gap-12"
            >
              {[partner6, partner7, partner8].map((imgSrc, index) => (
                <motion.div
                  key={`row2-${index}`}
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                  whileHover={{ scale: 1.05 }}
                  className="w-32 md:w-40 lg:w-44 transition-all duration-300"
                >
                  <img src={imgSrc} alt={`Partner ${index + 5}`} className="w-full h-auto object-contain" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


    </main>
  );
};

export default Home;
