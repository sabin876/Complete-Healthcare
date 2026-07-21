import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Chatbot from './components/Chatbot';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import ServicePage from './pages/ServicePage';
import DoctorAtHomePage from './pages/DoctorAtHomePage';
import DoctorAtOfficePage from './pages/DoctorAtOfficePage';
import DoctorAtHotelPage from './pages/DoctorAtHotelPage';
import PortalLogin from './pages/PortalLogin';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Team from './pages/Team';


// Placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="section pt-40 min-h-[60vh] flex items-center justify-center bg-gray-50"
  >
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
  </motion.div>
);

/* ─── Protected Route ─────────────────────────────────────────────────────
   Requires the user to be logged in AND have the correct role.
   If not logged in → /portal
   If wrong role → redirect to appropriate dashboard
────────────────────────────────────────────────────────────────────────── */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/portal" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    // Redirect to the correct dashboard
    return <Navigate to={currentUser.role === 'admin' ? '/portal/admin' : '/portal/dashboard'} replace />;
  }

  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* Services Routes */}
        <Route path="/services" element={<PlaceholderPage title="Our Services" />} />
        <Route path="/services/physiotherapy" element={<ServicePage serviceId="physiotherapy" />} />
        <Route path="/physiotherapy-at-home-in-dubai" element={<ServicePage serviceId="physiotherapy" />} />
        <Route path="/physiotherapy-at-home-in-dubai/" element={<ServicePage serviceId="physiotherapy" />} />
        
        <Route path="/services/iv-therapy" element={<ServicePage serviceId="iv-therapy" />} />
        <Route path="/iv-therapy-iv-drip-at-home-in-dubai" element={<ServicePage serviceId="iv-therapy" />} />
        <Route path="/iv-therapy-iv-drip-at-home-in-dubai/" element={<ServicePage serviceId="iv-therapy" />} />
        
        <Route path="/services/nursing" element={<ServicePage serviceId="nursing" />} />
        <Route path="/home-nursing-service-in-dubai" element={<ServicePage serviceId="nursing" />} />
        <Route path="/home-nursing-service-in-dubai/" element={<ServicePage serviceId="nursing" />} />
        
        <Route path="/services/palliative-care" element={<ServicePage serviceId="palliative-care" />} />
        <Route path="/services/night-care-nurse" element={<ServicePage serviceId="night-care-nurse" />} />
        <Route path="/services/injection-at-home" element={<ServicePage serviceId="injection-at-home" />} />
        <Route path="/services/wound-care" element={<ServicePage serviceId="wound-care" />} />
        <Route path="/services/oxygen-therapy" element={<ServicePage serviceId="oxygen-therapy" />} />
        
        <Route path="/services/doctor-on-call" element={<ServicePage serviceId="doctor-on-call" />} />
        <Route path="/doctor-on-call-in-dubai" element={<ServicePage serviceId="doctor-on-call" />} />
        <Route path="/doctor-on-call-in-dubai/" element={<ServicePage serviceId="doctor-on-call" />} />
        
        <Route path="/services/doctor-at-home" element={<DoctorAtHomePage />} />
        <Route path="/services/doctor-at-office" element={<DoctorAtOfficePage />} />
        <Route path="/services/doctor-at-hotel" element={<DoctorAtHotelPage />} />
        
        <Route path="/services/elderly-care" element={<ServicePage serviceId="elderly-care" />} />
        <Route path="/elderly-care-service-at-home-in-dubai" element={<ServicePage serviceId="elderly-care" />} />
        <Route path="/elderly-care-service-at-home-in-dubai/" element={<ServicePage serviceId="elderly-care" />} />
        
        <Route path="/services/lab-services" element={<ServicePage serviceId="lab-services" />} />
        <Route path="/lab-test-at-home-dubai" element={<ServicePage serviceId="lab-services" />} />
        <Route path="/lab-test-at-home-dubai/" element={<ServicePage serviceId="lab-services" />} />
        
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />

        {/* Portal Routes */}
        <Route path="/portal" element={<PortalLogin />} />
        <Route
          path="/portal/dashboard"
          element={
            <ProtectedRoute requiredRole="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </AnimatePresence>
  );
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/portal');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!isPortal && <Header />}
      <div className="flex-grow">
        {children}
      </div>
      {!isPortal && <Footer />}
      {!isPortal && <FloatingCTA />}
      {!isPortal && <Chatbot />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
