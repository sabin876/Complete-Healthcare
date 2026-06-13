import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowLeft, Shield, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import loginHero from '../assets/portal_login_hero.png';
import logo from '../assets/logo.webp';

const PortalLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  // Focus tracking for premium icon coloring
  const [isIdFocused, setIsIdFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      
      // Navigate to dashboard after success
      setTimeout(() => {
        navigate('/portal/dashboard');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-['Poppins']">
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#08709d] bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100 transition-all hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Left Column: Visual Side (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#08709d]/5 to-[#5eb63b]/5 items-center justify-center p-12 relative overflow-hidden border-r border-gray-100">
        {/* Decorative background blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#08709d]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#5eb63b]/10 rounded-full blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center flex flex-col items-center z-10"
        >
          <img 
            src={loginHero} 
            alt="Medical consultancy illustration" 
            className="w-full h-auto max-h-[380px] object-contain rounded-2xl drop-shadow-2xl mb-10" 
          />
          <h2 className="text-3xl font-black text-[#1a294a] tracking-tight mb-4 uppercase">
            Complete Healthcare Portal
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Manage your medical consultations, view lab reports, book sessions with your nurses or doctor, and access personalized health tips, all in one secure place.
          </p>
          
          <div className="mt-8 flex gap-6 text-left">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <span className="w-2.5 h-2.5 bg-[#5eb63b] rounded-full animate-pulse"></span>
              24/7 Access
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <span className="w-2.5 h-2.5 bg-[#08709d] rounded-full animate-pulse"></span>
              DHA Licensed Team
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative bg-gradient-to-tr from-white to-gray-50/50 overflow-y-auto min-h-screen">
        
        {/* Decorative background blobs for mobile */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-[#08709d]/5 rounded-full blur-2xl lg:hidden pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#5eb63b]/5 rounded-full blur-2xl lg:hidden pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[460px] z-10 bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-gray-200/50 flex flex-col justify-center my-8 relative"
        >
          {/* Top colored accent line */}
          <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-[#08709d] to-[#5eb63b] rounded-b-full" />

          {/* Logo */}
          <div className="flex justify-center mb-6 shrink-0" style={{ flexShrink: 0 }}>
            <Link to="/">
              <img src={logo} alt="Complete Healthcare Logo" className="h-20 w-auto object-contain" />
            </Link>
          </div>

          {loginSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 px-6 bg-green-50/30 border border-green-100 rounded-2xl flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 bg-[#5eb63b] text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#5eb63b]/20"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Login Successful!</h3>
              <p className="text-gray-500 text-sm">Redirecting you to the portal dashboard...</p>
            </motion.div>
          ) : (
            <>
              {/* Header Texts */}
              <div className="text-center mb-8 shrink-0" style={{ flexShrink: 0 }}>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1a294a] tracking-tight uppercase mb-1">
                  Staff / Admin Login
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm font-semibold leading-relaxed">
                  Enter your administrative credentials to access your dashboard
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                
                {/* Staff/Admin ID Field */}
                <div className="flex flex-col gap-1.5 shrink-0 text-left" style={{ flexShrink: 0 }}>
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#1a294a] mb-1 pl-1">
                    Staff / Admin ID
                  </label>
                  <div className="relative flex items-center">
                    <Shield 
                      size={18} 
                      className={`absolute left-4 transition-colors duration-200 pointer-events-none ${
                        isIdFocused ? 'text-[#08709d]' : 'text-gray-400'
                      }`} 
                    />
                    <input
                      type="text"
                      placeholder="ADM-109283"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsIdFocused(true)}
                      onBlur={() => setIsIdFocused(false)}
                      required
                      className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#08709d] focus:outline-none transition-all duration-200 text-sm text-gray-900 font-semibold"
                      style={{
                        height: '54px',
                        paddingLeft: '48px',
                        paddingRight: '16px',
                        borderRadius: '14px',
                        boxShadow: isIdFocused ? '0 0 0 4px rgba(8, 112, 157, 0.08)' : 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5 shrink-0 text-left" style={{ flexShrink: 0 }}>
                  <div className="flex justify-between items-center mb-1 pl-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-[#1a294a]">
                      Password
                    </label>
                    <a href="#" className="text-xs font-bold text-[#08709d] hover:text-[#5eb63b] transition-colors">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <Lock 
                      size={18} 
                      className={`absolute left-4 transition-colors duration-200 pointer-events-none ${
                        isPasswordFocused ? 'text-[#08709d]' : 'text-gray-400'
                      }`} 
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      required
                      className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#08709d] focus:outline-none transition-all duration-200 text-sm text-gray-900 font-semibold"
                      style={{
                        height: '54px',
                        paddingLeft: '48px',
                        paddingRight: '48px',
                        borderRadius: '14px',
                        boxShadow: isPasswordFocused ? '0 0 0 4px rgba(8, 112, 157, 0.08)' : 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 bg-transparent border-none cursor-pointer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <label 
                  className="flex items-center gap-2.5 cursor-pointer mt-1 select-none shrink-0"
                  style={{ flexShrink: 0 }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-gray-300 text-[#08709d] focus:ring-[#08709d] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-400">Remember my session</span>
                </label>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-[#08709d]/10 hover:shadow-[#08709d]/20 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none border-none text-white font-bold hover:scale-[1.02] duration-300"
                  style={{
                    height: '54px',
                    borderRadius: '14px',
                    background: 'linear-gradient(to right, #08709d, #0ea5e9)',
                    flexShrink: 0,
                    width: '100%',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="h-[1px] bg-gray-100 my-6" />

              {/* Security Badge Info */}
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0" style={{ flexShrink: 0 }}>
                <ShieldCheck size={14} className="text-[#5eb63b]" />
                <span>Secure End-to-End Encrypted Session</span>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PortalLogin;
