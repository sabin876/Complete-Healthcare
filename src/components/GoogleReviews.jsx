import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const GoogleReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Ahmed Al-Maktoum",
      role: "Patient",
      text: "Excellent home care service. The nurse was very professional and compassionate. Highly recommend Corx for anyone in Dubai looking for quality healthcare at home.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=ahmed"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Patient",
      text: "I had a great experience with their physiotherapy. The therapist came on time and was very knowledgeable. My recovery has been much faster than expected.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: 3,
      name: "Rahul Sharma",
      role: "Client",
      text: "The IV therapy was a lifesaver. Fast and efficient service. The nurse explained everything clearly and made me feel very comfortable throughout the process.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?u=rahul"
    },
    {
      id: 4,
      name: "Maria Garcia",
      role: "Patient",
      text: "Best home nursing care in Dubai. Very reliable and caring staff. They helped my grandmother recover comfortably in her own home. Truly grateful for their service.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=maria"
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Patient",
      text: "Highly professional doctors. I used the 'Doctor On Call' service and was impressed by the quick response time and thorough checkup I received at home.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=james"
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Modern Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 pb-8 border-b border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-[#4285F4] text-3xl font-bold">G</span>
                <span className="text-[#EA4335] text-3xl font-bold">o</span>
                <span className="text-[#FBBC05] text-3xl font-bold">o</span>
                <span className="text-[#4285F4] text-3xl font-bold">g</span>
                <span className="text-[#34A853] text-3xl font-bold">l</span>
                <span className="text-[#EA4335] text-3xl font-bold">e</span>
              </div>
              <span className="text-secondary-color text-3xl font-bold">Reviews</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-secondary-color">4.8</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" stroke="none" />
                  ))}
                </div>
              </div>
              <div className="h-4 w-[1px] bg-gray-200" />
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">246 verified reviews</span>
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#065d83", boxShadow: "0 20px 40px rgba(8, 112, 157, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#08709d] text-white px-8 py-3.5 rounded-full font-black text-[13px] uppercase tracking-[0.2em] transition-all duration-300 shadow-xl"
          >
            Write a Review
          </motion.button>
        </div>

        {/* Reviews Slider */}
        <div className="relative px-4">
          {/* Navigation Buttons */}
          <button 
            onClick={prev}
            className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-primary-color transition-all active:scale-90 border border-gray-50"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="w-full overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / (reviews.length / 1.5))}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {reviews.map((review) => (
                <motion.div 
                  key={review.id}
                  whileHover={{ y: -5 }}
                  className="min-w-full md:min-w-[48%] lg:min-w-[32%] bg-gray-50/50 rounded-[2rem] p-8 md:p-10 border border-gray-100 flex flex-col h-[380px] transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} stroke={i < review.rating ? "none" : "currentColor"} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Google User</span>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium line-clamp-4">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100">
                    <div className="relative">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-12 h-12 rounded-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="h-2 w-auto" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-secondary-color text-base tracking-tight">{review.name}</h4>
                      <p className="text-primary-color/60 text-[11px] font-bold uppercase tracking-wider">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button 
            onClick={next}
            className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-primary-color transition-all active:scale-90 border border-gray-50"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12 lg:hidden">
          {reviews.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 transition-all rounded-full ${i === currentIndex ? 'w-10 bg-[#4285F4]' : 'w-2.5 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
