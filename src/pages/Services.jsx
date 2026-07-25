import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ExploreServices from '../components/ExploreServices';

const Services = () => {
  useEffect(() => {
    document.title = "Our Home Healthcare Services in Dubai | CORX Healthcare";
    
    // Update or create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Explore premium 24/7 DHA-licensed physician-guided medical services, nursing care, and physical therapy delivered directly to your doorstep in Dubai.";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white min-h-screen"
    >
      <div className="pt-8">
        <ExploreServices />
      </div>
    </motion.div>
  );
};

export default Services;
