import React from 'react';

export function Button({ 
  children, 
  variant = "primary", 
  href, 
  onClick, 
  className = "", 
  target,
  rel,
  type = "button"
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none text-center cursor-pointer";
  
  const variants = {
    primary: "bg-[#08709d] text-white hover:bg-[#065679] shadow-sm focus:ring-[#08709d]",
    secondary: "bg-[#1a294a] text-white hover:bg-[#121c33] shadow-sm focus:ring-[#1a294a]",
    whatsapp: "bg-[#22c55e] text-white hover:bg-[#1db053] shadow-sm focus:ring-[#22c55e]",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
  };

  const combinedClass = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClass} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
}

export default Button;
