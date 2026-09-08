import React from 'react';
import SEO from '../components/SEO';
import { Briefcase, Mail, CheckCircle2, HeartHandshake } from 'lucide-react';

const Career = () => {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <SEO
        title="Careers | Join CORx Healthcare Medical Team in Dubai"
        description="Explore healthcare careers at CORx Healthcare Dubai. We are hiring DHA-licensed doctors, registered nurses, physiotherapists, and clinical coordinators."
        canonical="https://corx.ae/career"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-200/80 space-y-10">
          
          {/* Main Careers Header & Why Join Us */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#08709d]/10 text-[#08709d] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Briefcase size={14} />
              <span>Career Opportunities in Dubai</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#08709d] font-['Montserrat'] tracking-tight">
              Why Join CORx Healthcare?
            </h1>
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              At CORx Healthcare, we firmly believe in delivering compassionate, patient-first care throughout Dubai. Our commitment to clinical excellence is demonstrated through continuous professional development, comprehensive clinical training, and a supportive, collaborative work culture.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={18} className="text-[#08709d] shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium">Competitive compensation & DHA licensing assistance</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={18} className="text-[#08709d] shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium">Flexible shifts across home care & mobile clinical visits</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={18} className="text-[#08709d] shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium">Modern clinical equipment and mobile diagnostics</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <HeartHandshake size={18} className="text-[#08709d] shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium">Supportive team culture dedicated to patient recovery</span>
              </div>
            </div>
          </section>

          {/* Submit Resume Section */}
          <section className="space-y-4 pt-8 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#08709d] font-['Montserrat'] tracking-tight flex items-center gap-2">
              <Mail size={22} className="text-[#08709d]" />
              <span>Submit Your Application</span>
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              We welcome applications from DHA-licensed General Practitioners, Specialists, Registered Nurses, and Certified Physiotherapists. Send your updated CV/resume directly to:
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#08709d]/5 border border-[#08709d]/20 inline-block">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Direct HR Email</span>
              <a 
                href="mailto:hr@corx.ae" 
                className="text-lg sm:text-xl text-[#08709d] font-extrabold hover:text-[#065679] transition-colors underline"
              >
                hr@corx.ae
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Career;
