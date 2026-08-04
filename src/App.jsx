import React from 'react';
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Chatbot from './components/Chatbot';

import Home from './pages/Home';
import About from './pages/About';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Team from './pages/Team';
import ServicePage from './pages/ServicePage';
import Dashboard from './pages/Dashboard';

const ServiceRedirect = () => {
  const { serviceSlug } = useParams();
  return <Navigate to={`/${serviceSlug || 'lab-test-at-home'}`} replace />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Navigate to="/about-us" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Redirects to enforce Flat URL Structure */}
        <Route path="/services" element={<Navigate to="/lab-test-at-home" replace />} />
        <Route path="/services/lab-services" element={<Navigate to="/lab-test-at-home" replace />} />
        <Route path="/services/physiotherapy" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/services/physiotherapy/" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/services/physiotherapy-services" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/services/physiotherapy-services/" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/services/Physiotherapy-Services" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/services/Physiotherapy-Services/" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/services/:serviceSlug" element={<ServiceRedirect />} />
        <Route path="/lab-services" element={<Navigate to="/lab-test-at-home" replace />} />
        <Route path="/lab-test-at-home-dubai" element={<Navigate to="/lab-test-at-home" replace />} />
        <Route path="/lab-test-at-home-dubai/" element={<Navigate to="/lab-test-at-home" replace />} />
        <Route path="/Physiotherapy-Services" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/Physiotherapy-Services/" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/physiotherapy-services" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/physiotherapy-services/" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/physiotherapy" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        <Route path="/physiotherapy/" element={<Navigate to="/physiotherapy-at-home-in-dubai/" replace />} />
        
        <Route path="/nursing" element={<Navigate to="/home-nursing" replace />} />
        <Route path="/nursing/" element={<Navigate to="/home-nursing" replace />} />
        <Route path="/services/nursing" element={<Navigate to="/home-nursing" replace />} />
        <Route path="/services/nursing/" element={<Navigate to="/home-nursing" replace />} />
        <Route path="/services/home-nursing" element={<Navigate to="/home-nursing" replace />} />
        <Route path="/services/home-nursing/" element={<Navigate to="/home-nursing" replace />} />
        
        {/* Core Flat Pages */}
        <Route path="/about-us" element={<About />} />
        <Route path="/about-us/" element={<About />} />
        <Route path="/lab-test-at-home" element={<ServicePage serviceId="lab-services" />} />
        <Route path="/lab-test-at-home/" element={<ServicePage serviceId="lab-services" />} />
        <Route path="/physiotherapy-at-home-in-dubai" element={<ServicePage serviceId="physiotherapy" />} />
        <Route path="/physiotherapy-at-home-in-dubai/" element={<ServicePage serviceId="physiotherapy" />} />
        <Route path="/home-nursing" element={<ServicePage serviceId="home-nursing" />} />
        <Route path="/home-nursing/" element={<ServicePage serviceId="home-nursing" />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blog/details" element={<BlogDetails />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Navigate to="/book-an-appointment" replace />} />
        <Route path="/book-an-appointment" element={<Contact />} />
        <Route path="/book-an-appointment/" element={<Contact />} />
        <Route path="/team" element={<Team />} />

        {/* Dynamic Service & Sub-Service Routes */}
        <Route path="/services/:parentSlug/:serviceSlug" element={<ServicePage />} />
        <Route path="/services/:parentSlug/:serviceSlug/" element={<ServicePage />} />
        <Route path="/physiotherapy-at-home-in-dubai/:serviceSlug" element={<ServicePage />} />
        <Route path="/physiotherapy-at-home-in-dubai/:serviceSlug/" element={<ServicePage />} />
        <Route path="/physiotherapy/:serviceSlug" element={<ServicePage />} />
        <Route path="/physiotherapy/:serviceSlug/" element={<ServicePage />} />
        <Route path="/:parentSlug/:serviceSlug" element={<ServicePage />} />
        <Route path="/:parentSlug/:serviceSlug/" element={<ServicePage />} />
        <Route path="/:serviceSlug" element={<ServicePage />} />
      </Routes>
    </AnimatePresence>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <FloatingCTA />
      <Chatbot />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-[#ffffff] p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#08709d] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 mb-2">CORx Healthcare</h1>
            <p className="text-slate-600 text-sm mb-6">
              We experienced a temporary glitch while loading this view. Please refresh or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => typeof window !== 'undefined' && window.location.reload()}
                className="px-6 py-3 rounded-xl bg-[#08709d] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#065679] transition-all cursor-pointer"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <GlobalErrorBoundary>
      <ScrollToTop />
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </GlobalErrorBoundary>
  );
}

export default App;
