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
      className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-full cursor-pointer focus:outline-none chat-with-us-btn"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle size={22} className="text-white fill-white" />
        {/* Pulsing indicator dot */}
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white"></span>
        </span>
      </div>
      <span className="select-none">Chat with us</span>
    </motion.button>
  );
};

export default FloatingCTA;
