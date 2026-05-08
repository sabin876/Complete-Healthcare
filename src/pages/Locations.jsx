import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink, Globe, ArrowRight } from 'lucide-react';

const Locations = () => {
  const regions = [
    {
      name: "Dubai Headquarters",
      offices: [
        { 
          name: "Main Office - Royal Class", 
          phone: "+971 4 332 0776", 
          address: "Office 303, Royal Class Building, Dubai Investment Park (DIP), Dubai, UAE",
          hours: "24/7 Home Services Available"
        }
      ]
    },
    {
      name: "Service Areas",
      offices: [
        { name: "Dubai Marina & JBR", phone: "800-CORX", address: "Full Home Care Coverage" },
        { name: "Downtown & Business Bay", phone: "800-CORX", address: "Full Home Care Coverage" },
        { name: "Palm Jumeirah", phone: "800-CORX", address: "Full Home Care Coverage" },
        { name: "Jumeirah & Umm Suqeim", phone: "800-CORX", address: "Full Home Care Coverage" },
        { name: "Mirdif & Al Khawaneej", phone: "800-CORX", address: "Full Home Care Coverage" },
        { name: "DIP & Jebel Ali", phone: "800-CORX", address: "Full Home Care Coverage" }
      ]
    }
  ];

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
            Our <span className="text-primary-color">Locations</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-blue-50 max-w-3xl opacity-90 leading-relaxed font-medium"
          >
            Headquartered in Dubai, we provide premium home healthcare services across the entire Emirate, 24 hours a day.
          </motion.p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white relative">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gray-50/50 p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-12 border border-gray-100 group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-primary-color"></div>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-primary-color text-white p-8 rounded-[2rem] shadow-xl group-hover:bg-secondary-color transition-colors"
            >
              <Clock size={50} />
            </motion.div>
            <div>
              <h4 className="font-black text-3xl text-secondary-color mb-4 uppercase tracking-tight">24/7 Home Care Availability</h4>
              <p className="text-gray-500 text-xl leading-relaxed">
                Our medical teams are stationed across Dubai to ensure rapid response and timely care, no matter where you are located. We bring the clinic to your doorstep.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="space-y-32">
            {regions.map((region, rIdx) => (
              <div key={region.name}>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-black mb-16 flex items-center gap-6 text-secondary-color uppercase tracking-tight"
                >
                  <div className="bg-primary-color/10 p-4 rounded-2xl text-primary-color">
                    {region.name === "Dubai Headquarters" ? <MapPin size={32} /> : <Globe size={32} />}
                  </div>
                  {region.name}
                </motion.h2>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {region.offices.map((office, oIdx) => (
                    <motion.div 
                      key={office.name}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ y: -15 }}
                      className="bg-white border border-gray-100 rounded-[2.5rem] p-12 shadow-2xl shadow-gray-200/50 hover:shadow-primary-color/10 transition-all duration-500 flex flex-col group h-full relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-color/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                      
                      <h3 className="text-2xl font-black mb-8 text-secondary-color group-hover:text-primary-color transition-colors">{office.name}</h3>
                      <div className="space-y-6 mb-10 flex-grow">
                        <div className="flex gap-4 text-gray-500">
                          <MapPin size={24} className="shrink-0 mt-1 text-primary-color" />
                          <p className="text-lg font-medium leading-relaxed">{office.address}</p>
                        </div>
                        <div className="flex gap-4 text-gray-500">
                          <Phone size={24} className="shrink-0 text-primary-color" />
                          <p className="text-xl font-black text-secondary-color group-hover:text-primary-color transition-colors">{office.phone}</p>
                        </div>
                        {office.hours && (
                          <div className="flex gap-4 text-gray-500">
                            <Clock size={24} className="shrink-0 text-accent-color" />
                            <p className="text-lg font-black text-accent-color uppercase tracking-widest">{office.hours}</p>
                          </div>
                        )}
                      </div>
                      
                      <button className="w-full bg-gray-50 text-secondary-color py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-color hover:text-white transition-all duration-500 flex items-center justify-center gap-3">
                        GET DIRECTIONS <ExternalLink size={20} />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[600px] bg-gray-100 relative overflow-hidden group py-0">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center group-hover:scale-105 transition-transform duration-1000">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MapPin size={80} className="mx-auto text-primary-color/20 mb-8" />
            </motion.div>
            <p className="text-gray-400 font-black text-2xl uppercase tracking-[0.3em] max-w-lg mx-auto">Interactive Dubai Map Integration</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none"></div>
      </section>
    </main>
  );
};

export default Locations;
