import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock } from 'lucide-react';
import aboutUsBg from '../assets/About us .jpg';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-24 bg-white min-h-screen"
    >
      <section 
        className="relative min-h-[50vh] flex items-center py-20 mb-16 text-white text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${aboutUsBg})`,
          backgroundPosition: 'center 35%'
        }}
      >
        {/* Dark Blue-Navy Gradient Overlay to ensure maximum contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a294a]/90 via-[#0b2848]/85 to-[#1a294a]/95 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-black/45 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center">

            <h1 
              className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6 uppercase"
              style={{ 
                color: '#ffffff',
                textShadow: '0 4px 20px rgba(0,0,0,0.7)',
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              About Us
            </h1>
            <p 
              className="text-sm md:text-lg leading-relaxed mb-8 max-w-3xl font-medium"
              style={{ 
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              We are committed to delivering premium DHA-licensed medical services, advanced physical therapy, and skilled nursing care directly to your doorstep in Dubai, ensuring clinical excellence, comfort, and safety.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm font-semibold">
              <div 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: '#ffffff',
                  backgroundColor: 'rgba(46, 189, 110, 0.12)',
                  border: '1.5px solid rgba(46, 189, 110, 0.35)',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '700',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  fontFamily: "'Montserrat', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 189, 110, 0.22)';
                  e.currentTarget.style.borderColor = 'rgba(46, 189, 110, 0.55)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 189, 110, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(46, 189, 110, 0.35)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Award size={18} style={{ color: '#2ebd6e' }} />
                <span>100% DHA Licensed</span>
              </div>
              <div 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: '#ffffff',
                  backgroundColor: 'rgba(46, 189, 110, 0.12)',
                  border: '1.5px solid rgba(46, 189, 110, 0.35)',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '700',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  fontFamily: "'Montserrat', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 189, 110, 0.22)';
                  e.currentTarget.style.borderColor = 'rgba(46, 189, 110, 0.55)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 189, 110, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(46, 189, 110, 0.35)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Clock size={18} style={{ color: '#2ebd6e' }} />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
