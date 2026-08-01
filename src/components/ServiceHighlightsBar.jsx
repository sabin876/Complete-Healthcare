import React from 'react';

export default function ServiceHighlightsBar() {
  return (
    <div className="w-full bg-[#1b88c4] text-white py-4 md:py-5 border-y border-white/10 shadow-md font-sans">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center justify-between">
          
          {/* Column 1: Highly Skilled & Experienced Staff */}
          <div className="flex items-center justify-start md:justify-center gap-3.5 px-2">
            <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 48 48" fill="currentColor" className="w-9 h-9 md:w-10 md:h-10 text-white">
                {/* Doctor / Nurse Silhouette with Cross */}
                <path d="M24 4c-5.5 0-10 4.5-10 10v4c0 5.5 4.5 10 10 10s10-4.5 10-10v-4c0-5.5-4.5-10-10-10zm-1 5h2v3h3v2h-3v3h-2v-3h-3v-2h3V9zm-11 27c0-6.6 6.3-12 12-12s12 5.4 12 12v3H12v-3z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide">
                Highly Skilled &
              </span>
              <span className="text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide">
                Experienced Staff
              </span>
            </div>
          </div>

          {/* Column 2: 24x7/365 Days Service */}
          <div className="flex items-center justify-start md:justify-center gap-3.5 px-2 md:border-x md:border-white/20">
            <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" className="w-9 h-9 md:w-10 md:h-10 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M24 6a18 18 0 1 1-12.7 5.3L6 16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 8v8h8" />
                <text x="24" y="29.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="13" fontWeight="900" fontFamily="sans-serif">24</text>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide">
                24×7/365 Days
              </span>
              <span className="text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide">
                Service
              </span>
            </div>
          </div>

          {/* Column 3: Anywhere In Dubai, Just In 30 Mins */}
          <div className="flex items-center justify-start md:justify-center gap-3.5 px-2">
            <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 md:w-9 md:h-9 text-white">
                {/* Dubai Landmark Tower Outline */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 42h20M24 6v36M24 8C14 18 14 34 14 42M24 14h8M24 20h11M24 26h12M24 32h11M24 38h8" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide">
                Anywhere In Dubai,
              </span>
              <span className="text-sm md:text-[15px] font-bold text-white leading-tight tracking-wide">
                Just In 30 Mins
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
