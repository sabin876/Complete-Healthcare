import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Heart, Users, Shield, Clock, MapPin, ArrowRight } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Our Skilled Nurses",
      title: "Registered Nurses (RN)",
      bio: "Highly trained professionals dedicated to providing 24/7 care, monitoring vitals, and ensuring patient comfort at home.",
      image: "/assets/rebrand/corx_nursing_1777566567240.png"
    },
    {
      name: "Expert Physiotherapists",
      title: "Physical Therapy Specialists",
      bio: "Helping patients regain mobility and strength through customized home-based rehabilitation programs.",
      image: "/assets/rebrand/corx_physiotherapy_1777566524611.png"
    },
    {
      name: "Dedicated Caregivers",
      title: "Home Health Aides",
      bio: "Compassionate support for daily living activities, ensuring a safe and supportive environment for seniors.",
      image: "/assets/rebrand/corx_elderly_care_1777566610156.png"
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
            About <span className="text-primary-color">Corx</span> Healthcare
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-blue-50 max-w-3xl opacity-90 leading-relaxed font-medium"
          >
            Leading the way in premium home healthcare services in Dubai. We bring the hospital to you with compassion and excellence.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white relative">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-10 text-secondary-color uppercase tracking-tight">Our Mission & Vision</h2>
              <p className="text-gray-500 mb-8 text-xl leading-relaxed">
                At Corx Healthcare, our mission is to redefine the home healthcare experience by providing high-quality, clinical-grade medical services in the sanctuary of our patients' homes.
              </p>
              <p className="text-gray-500 mb-12 text-xl leading-relaxed">
                We envision a world where every individual can access professional medical care without the stress of travel or hospital environments.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: <Shield size={24} />, text: "DHA Licensed" },
                  { icon: <Clock size={24} />, text: "24/7 Availability" },
                  { icon: <Award size={24} />, text: "Expert Team" },
                  { icon: <Heart size={24} />, text: "Patient-First Care" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary-color hover:text-white transition-all duration-300 group">
                    <div className="bg-primary-color/10 p-3 rounded-xl text-primary-color group-hover:bg-white/20 group-hover:text-white">
                      {item.icon}
                    </div>
                    <span className="font-black text-lg uppercase tracking-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/assets/rebrand/corx_team_about_1777566746723.png" 
                  alt="Corx Healthcare Team" 
                  className="w-full h-auto hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary-color text-white p-10 rounded-[2.5rem] hidden md:block shadow-2xl z-20">
                <div className="text-6xl font-black mb-2 tracking-tighter">10+</div>
                <div className="text-sm uppercase tracking-[0.2em] font-black opacity-80">Premium Services</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gray-50/50">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl mb-6 font-black text-secondary-color uppercase tracking-tighter">Our Dedicated Team</h2>
            <div className="w-32 h-2 bg-accent-color mx-auto rounded-full mb-8"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl font-medium">The experts behind our compassionate care.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -15 }}
                className="bg-white rounded-[3rem] overflow-hidden shadow-2xl group border border-gray-100 flex flex-col h-full"
              >
                <div className="h-96 overflow-hidden relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-color/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-12">
                  <h3 className="text-3xl font-black mb-2 text-secondary-color group-hover:text-primary-color transition-colors">{member.name}</h3>
                  <p className="text-accent-color font-black mb-8 text-sm uppercase tracking-[0.2em]">{member.title}</p>
                  <p className="text-gray-500 leading-relaxed italic text-lg opacity-80">
                    "{member.bio}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white text-center">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-black text-secondary-color mb-12 uppercase tracking-tight">Ready to start your journey to health?</h2>
          <button className="bg-[#08709d] text-white px-12 py-5 rounded-full font-black text-[15px] tracking-[0.2em] uppercase hover:bg-[#1a294a] transition-all shadow-2xl shadow-[#08709d]/20 flex items-center gap-4 mx-auto group">
            CONTACT US TODAY <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default About;
