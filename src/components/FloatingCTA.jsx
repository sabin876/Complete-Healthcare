import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingCTA = () => {
  return (
    <motion.button
      onClick={() => {
        window.dispatchEvent(new CustomEvent('toggle-chatbot'));
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-[#08709d] hover:bg-[#1a294a] text-white px-6 py-3.5 rounded-full shadow-[0_15px_35px_rgba(8,112,157,0.3)] hover:shadow-[0_20px_45px_rgba(8,112,157,0.45)] border border-white/20 cursor-pointer focus:outline-none transition-all duration-300"

    >
      <MessageCircle size={22} className="text-white fill-white" />
      <span className="text-[15px] font-bold tracking-wide select-none">
        Chat with us
      </span>
    </motion.button>
  );
};

export default FloatingCTA;
