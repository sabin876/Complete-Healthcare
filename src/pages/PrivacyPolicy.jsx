import React from 'react';
import SEO from '../components/SEO';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <SEO
        title="Privacy Policy | CORx Healthcare Dubai"
        description="Read the official privacy policy of CORx Healthcare Dubai regarding how we protect, process, and handle your confidential health and medical records."
        canonical="https://corx.ae/privacy-policy"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-200/80">
          <div className="inline-flex items-center gap-2 bg-[#08709d]/10 text-[#08709d] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            <span>Patient Privacy & Confidentiality</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#08709d] mb-8 pb-4 border-b border-slate-200 font-['Montserrat']">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            {/* Who we are */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat'] flex items-center gap-2">
                <FileText size={20} className="text-[#08709d]" />
                <span>Who We Are</span>
              </h2>
              <p>
                Our official website address is{' '}
                <a 
                  href="https://corx.ae" 
                  className="text-[#08709d] hover:underline font-bold"
                >
                  https://corx.ae
                </a>. CORx Healthcare is a DHA-licensed home healthcare provider operating across the Emirate of Dubai, United Arab Emirates, offering 24/7 doctor home visits, home nursing, physiotherapy, IV therapy, and diagnostic lab services.
              </p>
            </section>

            {/* Medical Data & Information Collection */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat'] flex items-center gap-2">
                <Lock size={20} className="text-[#08709d]" />
                <span>Medical Data & Confidentiality</span>
              </h2>
              <p>
                We handle all patient inquiries, booking details, clinical consultations, and medical test results with strict confidentiality in accordance with UAE federal health laws and Dubai Health Authority (DHA) data governance regulations. Your medical history and diagnostics are only accessible to authorized medical personnel directly involved in your care.
              </p>
            </section>

            {/* Inquiries & Appointment Forms */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Appointment & Consultation Forms
              </h2>
              <p>
                When you submit an appointment or contact form on our website or contact us via WhatsApp/Phone, we collect the details you provide (including your name, phone number, location, and requested medical service) strictly to coordinate your healthcare appointment and dispatch our medical personnel.
              </p>
            </section>

            {/* Cookies & Browsing Experience */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Cookies & Analytics
              </h2>
              <p>
                We use standard, secure cookies and privacy-friendly analytics to optimize website performance, measure loading speed, and deliver a smooth user experience across devices. You can control or disable cookies through your browser settings at any time.
              </p>
            </section>

            {/* Your Rights */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat'] flex items-center gap-2">
                <Eye size={20} className="text-[#08709d]" />
                <span>Your Data Rights & Contact</span>
              </h2>
              <p>
                You may request access to, correction of, or deletion of your non-clinical personal contact data at any time by contacting our clinical administration team at{' '}
                <a href="mailto:info@corx.ae" className="text-[#08709d] font-bold underline">
                  info@corx.ae
                </a>{' '}
                or calling{' '}
                <a href="tel:+97143320776" className="text-[#08709d] font-bold underline">
                  +971 4 332 0776
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
