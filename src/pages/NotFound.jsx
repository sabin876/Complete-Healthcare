import React from 'react';
import { Link } from 'react-router';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="pt-20 sm:pt-24 pb-20 bg-slate-50 min-h-[75vh] text-slate-800 font-sans flex flex-col justify-start items-center">
      <SEO
        title="404 - Page Not Found | CORx Healthcare Dubai"
        description="The requested page could not be found. Explore our 24/7 home healthcare services in Dubai at CORx Healthcare."
        canonical="https://corx.ae/404"
        robots="noindex, nofollow"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl mt-4 sm:mt-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 text-center space-y-6">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#08709d] font-['Montserrat']">
            Page Not Found
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-slate-800 font-['Montserrat']">
            This page doesn't seem to exist.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            The link you clicked may be broken, or the page may have been moved or removed. You can return to our homepage or explore our popular home medical services in Dubai.
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
