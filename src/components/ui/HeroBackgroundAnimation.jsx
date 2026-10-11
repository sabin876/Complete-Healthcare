import React from 'react';
import { motion } from 'framer-motion';

export function HeroBackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Floating Gradient Orb 1 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#08709d]/15 via-[#38bdf8]/10 to-transparent blur-[120px]"
      />

      {/* Animated Floating Gradient Orb 2 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-24 -left-24 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#08709d]/10 via-[#0ea5e9]/10 to-transparent blur-[120px]"
      />
    </div>
  );
}

export default HeroBackgroundAnimation;
