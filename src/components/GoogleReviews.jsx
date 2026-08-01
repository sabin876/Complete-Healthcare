import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const GoogleReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Beata Hilger",
      initial: "B",
      color: "#e87c2e",
      time: "a month ago",
      text: "Outstanding and respectful care for my grandfather in Dubai. The nurses were well-trained, punctual, and extremely patient throughout his recovery.",
      rating: 5
    },
    {
      id: 2,
      name: "Tariq Al-Maktoum",
      initial: "T",
      color: "#3a7bd5",
      time: "2 months ago",
      text: "Called CORx Healthcare for Doctor on Call at our hotel in Dubai. The DHA licensed doctor arrived in under 30 minutes! Truly impressive 24/7 service.",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      initial: "S",
      color: "#6b3fa0",
      time: "3 months ago",
      text: "Extremely professional home nursing and IV drip therapy. The nurse was very gentle, knowledgeable, and caring. Highly recommended in Dubai!",
      rating: 5
    },
    {
      id: 4,
      name: "Dr. Ahmed Al-Rashid",
      initial: "A",
      color: "#2596be",
      time: "4 months ago",
      text: "Excellent home physiotherapy service for post-op knee recovery. The therapist was punctual and built a personalized rehab routine that worked wonders.",
      rating: 5
    },
    {
      id: 5,
      name: "Fatima Al-Zahra",
      initial: "F",
      color: "#63b158",
      time: "5 months ago",
      text: "Quick and painless home lab sample collection in Dubai. Results were sent digitally within 3 hours. Will definitely use CORx Healthcare again!",
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

  useEffect(() => {
    const autoSlide = setInterval(() => {
      next();
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(autoSlide);
  }, []);

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
            <motion.a
              href="https://www.google.com/maps/place/CORx+Healthcare/@24.9981035,55.1675379,622m/data=!3m2!1e3!4b1!4m6!3m5!1s0xa6b0036ffadede71:0xff91b5de95976932!8m2!3d24.9981035!4d55.1701128!16s%2Fg%2F11vxqqxt2z?action=write_review"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: '#065679' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block relative overflow-hidden bg-[#08709d] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 group shadow-2xl"
              style={{ padding: '18px 50px' }}
            >
              {/* Continuous Shine Effect */}
              <motion.div 
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0"
              />
              <span className="relative z-10">LEAVE A REVIEW</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
