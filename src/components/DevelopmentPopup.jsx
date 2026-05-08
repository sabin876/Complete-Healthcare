import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const DevelopmentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Minimal Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-[9998]"
          />

          {/* Simple Modern Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] bg-[#313a55] rounded-[20px] shadow-2xl z-[9999] overflow-hidden"
          >
            <div className="p-10 text-center relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Title */}
              <h2 className="text-white text-3xl font-semibold mb-4 tracking-tight">
                Under Development
              </h2>
              
              {/* Subtitle */}
              <p className="text-gray-300 text-base leading-relaxed mb-10 px-2">
                We are currently refining our healthcare portal to provide you with a better experience.
              </p>

              {/* Simple Button (Matching User's Image) */}
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#065d83", boxShadow: "0 20px 40px rgba(8, 112, 157, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-[#08709d] text-white text-[15px] font-black uppercase tracking-[0.2em] rounded-full transition-all shadow-xl"
              >
                Continue
              </motion.button>
              
              {/* Optional footer text */}
              <p className="mt-6 text-white/30 text-xs font-medium uppercase tracking-[0.2em]">
                Complete Healthcare
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DevelopmentPopup;
