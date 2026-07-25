import React from 'react';

export function HeroTitle({ children, className = "" }) {
  return (
    <h1 className={`text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight ${className}`}>
      {children}
    </h1>
  );
}

export function SectionTitle({ children, className = "" }) {
  return (
    <h2 className={`text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight ${className}`}>
      {children}
    </h2>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

export function Paragraph({ children, className = "" }) {
  return (
    <p className={`text-base leading-7 text-gray-600 ${className}`}>
      {children}
    </p>
  );
}

export function SmallText({ children, className = "" }) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}
