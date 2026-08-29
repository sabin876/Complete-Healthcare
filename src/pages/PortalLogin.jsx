import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowLeft, Shield, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import loginHero from '../assets/portal_login_hero.png';
import logo from '../assets/logo.webp';

const PortalLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Focus tracking for premium icon coloring
  const [isIdFocused, setIsIdFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();
  const { login, loginError, setLoginError } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    const user = await login(staffId, password);
    setIsLoading(false);

    if (user) {
      setLoggedInUser(user);
      setLoginSuccess(true);
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/portal/admin');
        } else {
          navigate('/portal/dashboard');
        }
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-['Poppins'] relative">
      
      {/* Back Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#08709d] bg-white/90 backdrop-blur-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm border border-slate-200/80 transition-all hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Left Column: Visual Side (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#08709d]/5 via-white to-[#5eb63b]/5 items-center justify-center p-12 relative overflow-hidden border-r border-slate-200/70">
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
            className="w-full h-auto max-h-[360px] object-contain rounded-2xl drop-shadow-2xl mb-8" 
          />
          <h2 className="text-2xl xl:text-3xl font-black text-[#1a294a] tracking-tight mb-3 uppercase">
            Complete Healthcare Portal
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Clinical management, official staff announcements, leave approvals, and patient scheduling in one secure platform.
          </p>
          
          <div className="flex gap-4 text-left flex-wrap justify-center">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-2xs">
              <span className="w-2 h-2 bg-[#5eb63b] rounded-full animate-pulse" />
              24/7 Clinical System
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-2xs">
              <span className="w-2 h-2 bg-[#08709d] rounded-full animate-pulse" />
              DHA Licensed Portal
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative overflow-y-auto min-h-screen pt-20 sm:pt-16">
        
        {/* Decorative background blobs for mobile */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-[#08709d]/5 rounded-full blur-2xl lg:hidden pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#5eb63b]/5 rounded-full blur-2xl lg:hidden pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px] z-10 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-9 shadow-xl shadow-slate-200/60 flex flex-col justify-center my-4 sm:my-8 relative"
        >
          {/* Top colored accent line */}
          <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-[#08709d] via-[#38bdf8] to-[#5eb63b] rounded-b-full" />

          {/* Logo */}
          <div className="flex justify-center mb-5 shrink-0">
            <Link to="/">
              <img src={logo} alt="Complete Healthcare Logo" className="h-16 sm:h-20 w-auto object-contain" />
            </Link>
          </div>

          {loginSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-6 sm:py-8 px-4 sm:px-6 bg-gradient-to-b from-sky-50/60 via-white to-emerald-50/40 border border-sky-100 rounded-3xl flex flex-col items-center shadow-md relative overflow-hidden"
            >
              {/* Background ambient glow */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#08709d]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#10b981]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Animated Avatar Frame */}
              <div className="relative mb-4">
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 bg-gradient-to-tr from-[#08709d] via-[#38bdf8] to-[#10b981] shadow-lg flex items-center justify-center"
                >
                  {loggedInUser?.photo ? (
                    <motion.img 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      src={loggedInUser.photo} 
                      alt={loggedInUser.name} 
                      className="w-full h-full object-cover rounded-full bg-white border-2 border-white"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a294a] to-[#08709d] flex items-center justify-center text-white text-2xl font-black border-2 border-white">
                      {loggedInUser?.name ? loggedInUser.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : 'ST'}
                    </div>
                  )}

                  {/* Pulsing ring animation */}
                  <motion.div 
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border-2 border-[#38bdf8] pointer-events-none"
                  />
                </motion.div>

                {/* Animated Verified Checkmark Badge */}
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.35 }}
                  className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 bg-[#10b981] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  <CheckCircle2 size={18} />
                </motion.div>
              </div>

              {/* Staff Details with sequential animation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold uppercase tracking-wider mb-2 border border-sky-200">
                  <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-ping" />
                  Authenticated Staff
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#1a294a] mb-1">
                  Welcome, {loggedInUser?.name || 'Staff Member'}!
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-3">
                  {loggedInUser?.position || 'Healthcare Professional'} {loggedInUser?.department ? `• ${loggedInUser.department}` : ''}
                </p>

                {/* Redirecting indicator line */}
                <div className="w-44 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden mt-3">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="w-full h-full bg-gradient-to-r from-[#08709d] to-[#10b981]"
                  />
                </div>
                <p className="text-slate-400 text-[11px] font-medium mt-2">
                  Opening your clinical dashboard...
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <>
              {/* Header Texts */}
              <div className="text-center mb-6 shrink-0">
                <h1 className="text-xl sm:text-2xl font-black text-[#1a294a] tracking-tight uppercase mb-1">
                  Staff / Admin Login
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">
                  Enter your credentials to access clinical dashboard
                </p>
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-xs font-bold mb-4"
                  >
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{loginError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                
                {/* Staff/Admin ID Field */}
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 pl-0.5">
                    Staff / Admin ID
                  </label>
                  <div className="relative flex items-center">
                    <Shield 
                      size={17} 
                      className={`absolute left-3.5 transition-colors duration-200 pointer-events-none ${
                        isIdFocused ? 'text-[#08709d]' : 'text-slate-400'
                      }`} 
                    />
                    <input
                      type="text"
                      placeholder="e.g. ADMIN-001 or STF-CO1234"
                      value={staffId}
                      onChange={(e) => { setStaffId(e.target.value); setLoginError(''); }}
                      onFocus={() => setIsIdFocused(true)}
                      onBlur={() => setIsIdFocused(false)}
                      required
                      className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#08709d] focus:outline-none transition-all duration-200 text-xs sm:text-sm text-slate-800 font-semibold h-12 pl-11 pr-4 rounded-xl shadow-2xs"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex justify-between items-center pl-0.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Password
                    </label>
                    <a href="#" className="text-[11px] font-bold text-[#08709d] hover:text-[#5eb63b] transition-colors">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <Lock 
                      size={17} 
                      className={`absolute left-3.5 transition-colors duration-200 pointer-events-none ${
                        isPasswordFocused ? 'text-[#08709d]' : 'text-slate-400'
                      }`} 
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      required
                      className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#08709d] focus:outline-none transition-all duration-200 text-xs sm:text-sm text-slate-800 font-semibold h-12 pl-11 pr-11 rounded-xl shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <label 
                  className="flex items-center gap-2 cursor-pointer mt-0.5 select-none"
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#08709d] focus:ring-[#08709d] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-500">Remember my session</span>
                </label>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 flex items-center justify-center transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none border-none text-white font-bold h-12 rounded-xl bg-gradient-to-r from-[#08709d] to-[#0ea5e9] hover:from-[#065679] hover:to-[#0284c7] text-xs sm:text-sm uppercase tracking-wider"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="h-px bg-slate-100 my-5" />

              {/* Security Badge Info */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <ShieldCheck size={14} className="text-[#5eb63b]" />
                <span>End-to-End Clinical Encryption</span>
              </div>

              {/* Hint for admin */}
              <p className="text-center text-[10px] text-slate-400 font-medium mt-3">
                Admin: <span className="font-mono font-bold text-slate-600">ADMIN-001</span> / <span className="font-mono font-bold text-slate-600">Admin@2024</span>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PortalLogin;
