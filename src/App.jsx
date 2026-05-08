import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import DevelopmentPopup from './components/DevelopmentPopup';

import Home from './pages/Home';
import About from './pages/About';
import Locations from './pages/Locations';
import Contact from './pages/Contact';

// Placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <div className="section pt-40 min-h-[60vh] flex items-center justify-center bg-gray-50">
    <div className="container text-center">
      <h1 className="text-5xl font-bold text-primary-color mb-6 uppercase tracking-tight">{title}</h1>
      <p className="text-xl text-gray-500 max-w-2xl mx-auto">
        This service page is currently being updated to provide you with the most accurate and detailed information about our premium home healthcare offerings in Dubai.
      </p>
      <div className="mt-10">
        <button className="bg-primary-color text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary-color/20">
          Enquire Now
        </button>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <DevelopmentPopup />
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* Services Routes */}
            <Route path="/services" element={<PlaceholderPage title="Our Services" />} />
            <Route path="/services/physiotherapy" element={<PlaceholderPage title="Home Physiotherapy" />} />
            <Route path="/services/iv-therapy" element={<PlaceholderPage title="IV Therapy" />} />
            <Route path="/services/nursing" element={<PlaceholderPage title="Home Nursing" />} />
            <Route path="/services/doctor-on-call" element={<PlaceholderPage title="Doctor On Call" />} />
            <Route path="/services/elderly-care" element={<PlaceholderPage title="Elderly Care Givers" />} />
            <Route path="/services/lab-services" element={<PlaceholderPage title="Lab Services" />} />
            
            <Route path="/locations" element={<Locations />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
        <FloatingCTA />
      </div>
    </Router>
  );
}

export default App;
