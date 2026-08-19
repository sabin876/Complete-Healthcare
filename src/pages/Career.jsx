import React, { useEffect } from 'react';

const Career = () => {
  useEffect(() => {
    document.title = "Career | CORx Healthcare Dubai";
    if (typeof window !== 'undefined') {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith('/') && window.location.pathname !== '/'
        ? window.location.pathname.slice(0, -1)
        : window.location.pathname;
      const origin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
        ? window.location.origin
        : 'https://corx.ae';
      canonicalLink.setAttribute('href', `${origin}${cleanPath}`);
    }
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-200/80 space-y-10">
          
          {/* Why to join Us? */}
          <section className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#08709d] font-['Montserrat'] tracking-tight">
              Why to join Us?
            </h1>
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg lg:text-xl">
              At Corx Home Healthcare, we firmly believe in the integration of quality values throughout every level of our organization. Our commitment to excellence is exemplified by instilling these values through continuous encouragement, comprehensive education, and targeted training programs. By fostering a culture that prioritizes quality at its core, we ensure that our team is not only skilled but also deeply aligned with our commitment to delivering superior service in the maritime industry.
            </p>
          </section>

          {/* Submit Resume Here */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#08709d] font-['Montserrat'] tracking-tight">
              Submit Resume Here
            </h2>
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed">
              Send your updated CV/resume at{' '}
              <a 
                href="mailto:hr@corx.ae" 
                className="text-[#08709d] font-bold underline hover:text-[#065679] transition-colors"
              >
                hr@corx.ae
              </a>{' '}
              or you can submit your resume by filling this resume submission
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Career;
