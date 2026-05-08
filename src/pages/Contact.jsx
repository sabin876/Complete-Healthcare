import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <main className="pt-0">
      {/* Page Header */}
      <section className="bg-secondary-color text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-color rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-color rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="container relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mb-8 text-white uppercase tracking-tighter"
          >
            Get In <span className="text-primary-color">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-blue-50 max-w-3xl opacity-90 leading-relaxed font-medium"
          >
            We're available 24/7 to assist you. Reach out to us for appointments, inquiries, or any home healthcare needs in Dubai.
          </motion.p>
        </div>
      </section>

      <section className="py-32 bg-white relative">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-24">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/3"
            >
              <h2 className="text-4xl font-black mb-12 text-secondary-color uppercase tracking-tight">Contact Information</h2>
              <div className="space-y-12">
                {[
                  { icon: <Phone size={32} />, title: "Call Us", details: "+971 4 332 0776", sub: "Toll Free: 800-CORX" },
                  { icon: <Mail size={32} />, title: "Email Us", details: "info@corx.ae", sub: "24/7 Support Response" },
                  { icon: <Clock size={32} />, title: "Availability", details: "Open 24/7 / 365 Days", sub: "Always ready to serve you" },
                  { icon: <MapPin size={32} />, title: "Headquarters", details: "Office 303, Royal Class Building", sub: "DIP, Dubai, UAE" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="bg-primary-color/10 p-5 rounded-[1.5rem] text-primary-color group-hover:bg-primary-color group-hover:text-white transition-all duration-500 shadow-lg shadow-primary-color/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-2xl mb-1 text-secondary-color group-hover:text-primary-color transition-colors">{item.title}</h4>
                      <p className="text-gray-600 text-lg font-medium">{item.details}</p>
                      <p className="text-accent-color font-bold text-sm uppercase tracking-wider mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/3"
            >
              <div className="bg-gray-50/50 p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-color/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-12">
                    <div className="bg-secondary-color text-white p-4 rounded-2xl">
                      <MessageSquare size={32} />
                    </div>
                    <h3 className="text-4xl font-black text-secondary-color uppercase tracking-tight">Send Us a Message</h3>
                  </div>
                  
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                      { label: "Full Name", placeholder: "Your Name", type: "text" },
                      { label: "Email Address", placeholder: "email@example.com", type: "email" },
                      { label: "Phone Number", placeholder: "+971 -- --- ----", type: "tel" }
                    ].map((field, idx) => (
                      <div key={idx} className="flex flex-col gap-4">
                        <label className="text-sm font-black text-secondary-color uppercase tracking-widest opacity-60">{field.label}</label>
                        <input 
                          type={field.type} 
                          placeholder={field.placeholder} 
                          className="p-5 border border-gray-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary-color/10 focus:border-primary-color transition-all bg-white text-lg font-medium"
                        />
                      </div>
                    ))}
                    
                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-black text-secondary-color uppercase tracking-widest opacity-60">Service Needed</label>
                      <div className="relative">
                        <select className="w-full p-5 border border-gray-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary-color/10 focus:border-primary-color transition-all bg-white text-lg font-medium appearance-none cursor-pointer">
                          <option>Home Physiotherapy</option>
                          <option>IV Therapy</option>
                          <option>Home Nursing</option>
                          <option>Doctor On Call</option>
                          <option>Elderly Care Givers</option>
                          <option>Lab Services</option>
                          <option>Other</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <ArrowRight size={24} className="rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 md:col-span-2">
                      <label className="text-sm font-black text-secondary-color uppercase tracking-widest opacity-60">How can we help?</label>
                      <textarea 
                        rows="5" 
                        placeholder="Describe your requirements in detail..." 
                        className="p-5 border border-gray-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary-color/10 focus:border-primary-color transition-all bg-white text-lg font-medium"
                      ></textarea>
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <button className="w-full bg-primary-color text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-4 hover:bg-secondary-color transition-all shadow-2xl shadow-primary-color/20 text-xl uppercase tracking-widest">
                        Send Message <Send size={24} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
