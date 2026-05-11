import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What services does Complete Healthcare provide?",
    answer: "We offer a wide range of premium home healthcare services including Physiotherapy, IV Therapy, Home Nursing, Doctor On Call, Lab Services, and Elderly Care, all delivered in the comfort of your home."
  },
  {
    question: "Are your healthcare professionals licensed?",
    answer: "Yes, all our doctors, nurses, and therapists are fully licensed by the Dubai Health Authority (DHA) and undergo rigorous background checks to ensure the highest standards of care and safety."
  },
  {
    question: "How quickly can a doctor visit my home?",
    answer: "Our 'Doctor On Call' service is available 24/7. Typically, our medical team can reach your location within 30-60 minutes across Dubai, depending on your specific area."
  },
  {
    question: "Do you provide services during weekends and public holidays?",
    answer: "Yes, we are operational 24 hours a day, 7 days a week, 365 days a year. This includes all weekends and public holidays to ensure you have access to care whenever you need it."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book an appointment instantly by calling us at +971 4 332 0776, messaging us on WhatsApp at +971 54 703 3311, or by using the contact form on our website."
  },
  {
    question: "Do you accept health insurance?",
    answer: "We work with major insurance providers on a pay-and-claim basis or direct billing depending on your specific policy. Please contact our support team with your insurance details for verification."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className="border-b border-gray-100 last:border-none"
      style={{ marginBottom: '10px' }}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-[#08709d]' : 'text-[#1a294a] group-hover:text-[#08709d]'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#08709d] text-white rotate-180' : 'bg-gray-50 text-[#1a294a]'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed text-[16px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-[#f8f9fa] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#08709d]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5eb63b]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08709d]/10 text-[#08709d] font-bold text-xs uppercase tracking-widest mb-4"
            >
              <HelpCircle size={14} />
              <span>Common Questions</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-[#1a294a] mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-2xl mx-auto"
            >
              Find answers to the most common questions about our home healthcare services in Dubai.
            </motion.p>
          </div>

          {/* Accordion Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50"
          >
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-[#1a294a] font-medium">
              Still have questions? <a href="/contact" className="text-[#08709d] font-bold underline underline-offset-4 hover:text-[#5eb63b] transition-colors">Contact our support team</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
