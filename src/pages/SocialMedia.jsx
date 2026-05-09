import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';

const SocialMedia = () => {
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <Facebook size={40} />,
      handle: '@CorxHealthcare',
      color: '#1877F2',
      link: '#',
      description: 'Follow us for the latest health tips and community updates.'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={40} />,
      handle: '@corx_healthcare_dubai',
      color: '#E4405F',
      link: '#',
      description: 'Behind-the-scenes look at our home care services and wellness inspiration.'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={40} />,
      handle: '@CorxDubai',
      color: '#1DA1F2',
      link: '#',
      description: 'Stay updated with healthcare news and real-time announcements.'
    },
    {
      name: 'YouTube',
      icon: <Youtube size={40} />,
      handle: 'Corx Healthcare Dubai',
      color: '#FF0000',
      link: '#',
      description: 'Educational videos on home nursing, physiotherapy, and elderly care.'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={40} />,
      handle: 'Corx Healthcare',
      color: '#0077B5',
      link: '#',
      description: 'Professional updates and career opportunities in Dubai home healthcare.'
    }
  ];

  return (
    <div className="pt-40 pb-20 bg-white min-h-screen relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#08709d]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5fb54a]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#2596be]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-secondary-color mb-6 uppercase tracking-tight">
            Connect With Us
          </h1>
          <div className="w-24 h-1 bg-accent-color mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Stay updated with our latest services, health tips, and community events through our social media channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {socialPlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center group transition-all duration-500"
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transition-transform duration-500 group-hover:rotate-12"
                style={{ backgroundColor: platform.color }}
              >
                {platform.icon}
              </div>
              <h3 className="text-2xl font-bold text-secondary-color mb-2">{platform.name}</h3>
              <p className="text-accent-color font-bold mb-4">{platform.handle}</p>
              <p className="text-gray-500 mb-8 flex-grow leading-relaxed">
                {platform.description}
              </p>
              <div 
                className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-colors hover:text-accent-color"
                style={{ color: '#63b158' }}
              >
                Follow Now <ExternalLink size={16} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contact Strip */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-primary-color rounded-[3rem] p-12 text-white text-center shadow-2xl shadow-primary-color/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-color/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h2 className="text-3xl font-black mb-4 relative z-10">Need Immediate Assistance?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto relative z-10">
            Our medical team is available 24/7 to provide premium healthcare at your doorstep.
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <a href="tel:+97143320776" className="bg-white text-primary-color px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent-color hover:text-white transition-all shadow-xl">
              <Phone size={20} /> +971 4 332 0776
            </a>
            <a href="mailto:info@corx.ae" className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/20 transition-all shadow-xl">
              <Mail size={20} /> info@corx.ae
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMedia;
