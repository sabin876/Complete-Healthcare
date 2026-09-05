import React from 'react';
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Team from './pages/Team';
import ServicePage from './pages/ServicePage';
import Dashboard from './pages/Dashboard';
import PortalLogin from './pages/PortalLogin';
import StaffDashboard from './pages/StaffDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Career from './pages/Career';
import NotFound from './pages/NotFound';
import Sitemap from './pages/Sitemap';
import SocialMedia from './pages/SocialMedia';

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        
        {/* Staff / Admin Portal Routes */}
        <Route path="/portal" element={<PortalLogin />} />
        <Route path="/portal/" element={<PortalLogin />} />
        <Route path="/portal/login" element={<PortalLogin />} />
        <Route path="/portal/login/" element={<PortalLogin />} />
        <Route path="/portal/dashboard" element={<StaffDashboard />} />
        <Route path="/portal/dashboard/" element={<StaffDashboard />} />
        <Route path="/portal/staff" element={<StaffDashboard />} />
        <Route path="/portal/staff/" element={<StaffDashboard />} />
        <Route path="/portal/admin" element={<Dashboard />} />
        <Route path="/portal/admin/" element={<Dashboard />} />
        
        {/* Service Routes supporting both /services/... and flat URLs */}
        <Route path="/services" element={<ServicePage />} />
        <Route path="/services/" element={<ServicePage />} />
        <Route path="/services/:parentSlug/:serviceSlug" element={<ServicePage />} />
        <Route path="/services/:parentSlug/:serviceSlug/" element={<ServicePage />} />
        <Route path="/services/:serviceSlug" element={<ServicePage />} />
        <Route path="/services/:serviceSlug/" element={<ServicePage />} />
        
        {/* Core Flat Pages */}
        <Route path="/about-us" element={<About />} />
        <Route path="/about-us/" element={<About />} />
        <Route path="/lab-test-at-home" element={<ServicePage serviceId="lab-test-at-home" />} />
        <Route path="/lab-test-at-home/" element={<ServicePage serviceId="lab-test-at-home" />} />
        <Route path="/home-nursing" element={<ServicePage serviceId="home-nursing" />} />
        <Route path="/home-nursing/" element={<ServicePage serviceId="home-nursing" />} />
        <Route path="/elderly-home-care" element={<ServicePage serviceId="elderly-home-care" />} />
        <Route path="/elderly-home-care/" element={<ServicePage serviceId="elderly-home-care" />} />
        <Route path="/elderly-care" element={<Navigate to="/elderly-home-care" replace />} />
        <Route path="/elderly-care/" element={<Navigate to="/elderly-home-care" replace />} />
        <Route path="/iv-therapy" element={<ServicePage serviceId="iv-therapy" />} />
        <Route path="/iv-therapy/" element={<ServicePage serviceId="iv-therapy" />} />
        <Route path="/doctor-on-call" element={<ServicePage serviceId="doctor-on-call" />} />
        <Route path="/doctor-on-call/" element={<ServicePage serviceId="doctor-on-call" />} />
        <Route path="/physiotherapy-at-home-in-dubai" element={<ServicePage serviceId="physiotherapy-at-home-in-dubai" />} />
        <Route path="/physiotherapy-at-home-in-dubai/" element={<ServicePage serviceId="physiotherapy-at-home-in-dubai" />} />
        <Route path="/physiotherapy" element={<Navigate to="/physiotherapy-at-home-in-dubai" replace />} />
        <Route path="/physiotherapy/" element={<Navigate to="/physiotherapy-at-home-in-dubai" replace />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/contact-us/" element={<Contact />} />
        <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
        <Route path="/contact/" element={<Navigate to="/contact-us" replace />} />
        <Route path="/book-an-appointment" element={<Contact />} />
        <Route path="/book-an-appointment/" element={<Contact />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/" element={<Locations />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/" element={<Team />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/" element={<Career />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/sitemap/" element={<Sitemap />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/social-media/" element={<SocialMedia />} />
        <Route path="/socials" element={<Navigate to="/social-media" replace />} />
        <Route path="/socials/" element={<Navigate to="/social-media" replace />} />
        <Route path="/connect" element={<Navigate to="/social-media" replace />} />
        <Route path="/connect/" element={<Navigate to="/social-media" replace />} />

        {/* Legacy redirect handler */}
        <Route path="/service/:serviceSlug" element={<ServiceRedirect />} />
        <Route path="/service/:serviceSlug/" element={<ServiceRedirect />} />

        {/* Dynamic Fallback Route for database-created services */}
        <Route path="/:slug" element={<ServicePage />} />
        <Route path="/:slug/" element={<ServicePage />} />

        {/* 404 Error Page */}
        <Route path="/404" element={<NotFound />} />
        <Route path="/404/" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/portal') || location.pathname.startsWith('/dashboard');
  const isSocialMedia = location.pathname.startsWith('/social-media') || location.pathname.startsWith('/socials') || location.pathname.startsWith('/connect');

  if (isPortal) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  if (isSocialMedia) {
    return <div className="min-h-screen bg-[#050e1d]">{children}</div>;
  }

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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <AuthProvider>
        <ScrollToTop />
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
