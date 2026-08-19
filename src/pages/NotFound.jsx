import React, { useEffect } from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found | CORx Healthcare Dubai";
    if (typeof window !== 'undefined') {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const origin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
        ? window.location.origin
        : 'https://corx.ae';
      canonicalLink.setAttribute('href', `${origin}/404`);
    }
  }, []);

  return (
    <div className="pt-20 sm:pt-24 pb-20 bg-slate-50 min-h-[75vh] text-slate-800 font-sans flex flex-col justify-start items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl mt-4 sm:mt-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 text-center space-y-6">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#08709d] font-['Montserrat']">
            Page Not Found
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-slate-800 font-['Montserrat']">
            This page doesn't seem to exist.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            The link you clicked may be broken, or the page may have been moved or removed. You can return to our homepage or explore our popular medical services below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#08709d] hover:bg-[#065679] text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Back to Home
            </Link>

            <Link
              to="/book-an-appointment"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2ebd6e] hover:bg-[#259b5a] text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Book An Appointment
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotFound;
