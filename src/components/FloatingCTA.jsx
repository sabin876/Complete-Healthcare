import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, CalendarDays, User } from 'lucide-react';

const FloatingCTA = () => {
  const ctaButtons = [
    {
      id: 'profile',
      icon: <User size={22} />,
      label: 'Profile',
      color: 'bg-[#08709d]',
      link: '/profile',
    },
    {
      id: 'whatsapp',
      icon: <MessageCircle size={22} />,
      label: 'WhatsApp',
      color: 'bg-[#25D366]',
      link: 'https://wa.me/97143320776',
    },
    {
      id: 'call',
      icon: <Phone size={22} />,
      label: 'Call Us',
      color: 'bg-[#08709c]',
      link: 'tel:+97143320776',
    },
    {
      id: 'book',
      icon: <CalendarDays size={22} />,
      label: 'Book Now',
      color: 'bg-[#1b1464]',
      link: '/contact',
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {ctaButtons.map((btn, i) => (
        <motion.a
          key={btn.id}
          href={btn.link}
          target={btn.id === 'whatsapp' ? '_blank' : '_self'}
          rel={btn.id === 'whatsapp' ? 'noopener noreferrer' : ''}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.1, x: -5 }}
          className="flex items-center gap-3 group"
        >
          <span className={`bg-white text-[#08709d] px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl border border-gray-100 transition-opacity duration-300 whitespace-nowrap ${btn.id === 'profile' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            {btn.label}
          </span>
          <div className={`w-14 h-14 rounded-full bg-white text-[#08709d] flex flex-col items-center justify-center shadow-2xl relative overflow-hidden border border-gray-100`}>
             <div className="absolute top-0 -left-[100%] w-full h-full bg-[#08709d]/5 skew-x-[-25deg] group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
             {btn.icon}
             {btn.id === 'profile' && <span className="text-[8px] font-black mt-0.5 uppercase tracking-tighter text-[#08709d]">Profile</span>}
             {btn.id === 'whatsapp' && (
               <div className="absolute inset-0 rounded-full animate-ping opacity-10 bg-[#25D366]"></div>
             )}
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default FloatingCTA;
