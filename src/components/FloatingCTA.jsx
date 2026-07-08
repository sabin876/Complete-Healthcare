import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const FloatingCTA = () => {
  const ctaButtons = [
    {
      id: 'chatbot',
      icon: <MessageSquare size={22} />,
      label: 'Chat Assistant',
      color: 'bg-[#1b1464]',
      onClick: () => {
        window.dispatchEvent(new CustomEvent('toggle-chatbot'));
      }
    }
  ];


  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {ctaButtons.map((btn, i) => {
        const isLink = !!btn.link;
        const Component = isLink ? motion.a : motion.button;
        const extraProps = isLink 
          ? {
              href: btn.link,
              target: btn.id === 'whatsapp' ? '_blank' : '_self',
              rel: btn.id === 'whatsapp' ? 'noopener noreferrer' : ''
            }
          : {
              onClick: btn.onClick,
              type: 'button'
            };

        return (
          <Component
            key={btn.id}
            {...extraProps}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.1, x: -5 }}
            className="flex items-center gap-3 group bg-transparent border-0 p-0 text-right cursor-pointer focus:outline-none"
          >
            <span className="bg-white text-[#08709d] px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl border border-gray-100 transition-opacity duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100">
              {btn.label}
            </span>
            <div className={`w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl relative overflow-hidden border border-gray-100 ${btn.id === 'whatsapp' ? 'text-[#25D366]' : 'text-[#08709d]'}`}>
               <div className="absolute top-0 -left-[100%] w-full h-full bg-[#08709d]/5 skew-x-[-25deg] group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
               {btn.icon}
               {btn.id === 'whatsapp' && (
                 <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#25D366]"></div>
               )}
            </div>
          </Component>
        );
      })}
    </div>
  );
};

export default FloatingCTA;
