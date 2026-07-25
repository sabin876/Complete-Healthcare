import React from 'react';

export function Section({ children, className = "", variant = "white", id }) {
  const variants = {
    white: "bg-white",
    slate: "bg-slate-50 border-t border-b border-gray-200",
    warm: "bg-[#f7f6f2] border-t border-b border-gray-200",
    dark: "bg-[#1a294a] text-white",
  };

  return (
    <section 
      id={id} 
      className={`py-16 md:py-20 lg:py-24 ${variants[variant] || variants.white} ${className}`}
    >
      {children}
    </section>
  );
}

export default Section;
