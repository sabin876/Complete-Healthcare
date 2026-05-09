import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const GoogleReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Amber Basbagill",
      initial: "A",
      color: "#f4511e",
      time: "a year ago",
      text: "Staff reassured me they listen to everything I needed to say I would definitely recommend this place.",
      rating: 5
    },
    {
      id: 2,
      name: "Mia Edwards",
      initial: "M",
      color: "#673ab7",
      time: "a year ago",
      text: "Their individualized approach made me feel seen and heard. I wasn't just another patient — they truly cared about my journey.",
      rating: 5
    },
    {
      id: 3,
      name: "Lucas Kelly",
      initial: "L",
      color: "#455a64",
      time: "a year ago",
      text: "The detox program here is compassionate and effective. They prioritize patient safety and comfort every step of the way.",
      rating: 5
    },
    {
      id: 4,
      name: "Grace Phillips",
      initial: "G",
      color: "#546e7a",
      time: "a year ago",
      text: "I appreciated how they customized my treatment plan to fit my specific challenges and goals. It made a huge difference.",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="relative overflow-hidden min-h-[800px] flex items-center py-24 group">
      {/* Parallax Background Image with Multi-layer Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Healthcare background"
          className="w-full h-full object-cover grayscale opacity-20"
        />
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            background: 'radial-gradient(circle at center, rgba(8, 112, 157, 0.4) 0%, rgba(26, 41, 74, 0.98) 100%)' 
          }}
        />
      </div>

      <div className="container relative z-30 px-6">
        {/* Centered Header with Staggered Reveal */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-[0.2em] mb-6">
              TESTIMONIALS
            </h2>
            <p className="text-white/70 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto">
              See what people are saying about <span className="text-white font-bold">Complete Healthcare</span>
            </p>
          </motion.div>
        </div>

        {/* Reviews Carousel with Hover Effects */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-40 text-white/30 hover:text-white transition-all active:scale-90"
          >
            <ChevronLeft size={56} strokeWidth={1} />
          </button>

          <div className="w-full overflow-hidden py-12">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / reviews.length)}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            >
              {reviews.map((review, index) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="min-w-[100%] md:min-w-[45%] lg:min-w-[24%] flex-shrink-0 bg-white rounded-2xl p-8 shadow-2xl flex flex-col min-h-[380px] transition-all duration-500 group/card"
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl font-black shadow-lg"
                      style={{ backgroundColor: review.color }}
                    >
                      {review.initial}
                    </div>
                    <div className="text-left overflow-hidden">
                      <h4 className="font-black text-secondary-color text-base leading-tight truncate">{review.name}</h4>
                      <p className="text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-widest">{review.time}</p>
                    </div>
                  </div>

                  {/* Stars - Vivid Orange */}
                  <div className="flex text-orange-500 gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" stroke="none" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <div className="flex-grow">
                    <p className="text-gray-500 text-[15px] leading-relaxed font-semibold italic">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Google Branding Bottom Right */}
                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
                    <img 
                      src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
                      alt="Google" 
                      className="h-3 w-auto grayscale opacity-40 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button 
            onClick={next}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-40 text-white/30 hover:text-white transition-all active:scale-90"
          >
            <ChevronRight size={56} strokeWidth={1} />
          </button>
        </div>

        {/* Leave a Review Button with Shine Animation */}
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block relative"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden border-2 border-white/60 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 group shadow-2xl"
              style={{ padding: '18px 50px' }}
            >
              {/* Continuous Shine Effect */}
              <motion.div 
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0"
              />
              <span className="relative z-10">LEAVE A REVIEW</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
