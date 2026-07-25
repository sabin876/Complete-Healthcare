import React from 'react';

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-6 ${className}`}>
      {children}
    </div>
  );
}

export default Card;
