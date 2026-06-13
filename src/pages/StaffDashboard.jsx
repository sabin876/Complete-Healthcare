import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, LogOut, Mail, Calendar, Clock, CreditCard, 
  ChevronRight, ChevronDown, CheckCircle2, X, Info, Paperclip
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'leave', 'ot', 'increment' or null
  const [successMessage, setSuccessMessage] = useState(null);

  // Leave Modal State
  const [selectedLeaveType, setSelectedLeaveType] = useState('Annual');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveFile, setLeaveFile] = useState(null);
  const leaveFileInputRef = useRef(null);

  // OT Modal State
  const [selectedOtType, setSelectedOtType] = useState('Day Shift');
  const [otDate, setOtDate] = useState('');
  const [otHours, setOtHours] = useState('');
  const [otFile, setOtFile] = useState(null);
  const otFileInputRef = useRef(null);

  // Salary Increment Modal State
  const [selectedIncrementType, setSelectedIncrementType] = useState('Merit-Based');
  const [incrementFile, setIncrementFile] = useState(null);
  const incrementFileInputRef = useRef(null);

  // Staff Details State
  const [staffName, setStaffName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [staffDep, setStaffDep] = useState('');
  const [staffPosition, setStaffPosition] = useState('');

  const calculateDaysSelected = (start, end) => {
    if (!start || !end) return '—';
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '—';
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? `${diffDays} days` : '0 days';
  };

  const handleLogout = () => {
    navigate('/portal');
  };

  const handleActionClick = (type) => {
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    // Reset leave form
    setSelectedLeaveType('Annual');
    setLeaveStartDate('');
    setLeaveEndDate('');
    setLeaveFile(null);
    // Reset OT form
    setSelectedOtType('Day Shift');
    setOtDate('');
    setOtHours('');
    setOtFile(null);
    // Reset Increment form
    setSelectedIncrementType('Merit-Based');
    setIncrementFile(null);
    // Reset Staff details
    setStaffName('');
    setStaffId('');
    setStaffDep('');
    setStaffPosition('');
  };

  const handleFormSubmit = (e, type) => {
    e.preventDefault();
    handleCloseModal();
    setSuccessMessage(`Your request for ${type} has been successfully submitted to HR.`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col font-['Poppins'] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#08709d]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#5eb63b]/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-20 px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Corx Healthcare Logo" className="h-14 w-auto object-contain" />
          <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-black text-[#1a294a] uppercase tracking-wide">Employee Portal</span>
            <span className="text-xs font-semibold text-[#5eb63b]">Staff Self-Service</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center font-bold text-sm shrink-0">
            CO
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-bold text-gray-800">Nurse Clara Oswald</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">DHA Home Nursing Team</span>
          </div>
          <div className="h-6 w-[1px] bg-gray-200"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer"
            title="Log Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 max-w-[1100px] w-full mx-auto gap-8 z-10 relative">
        
        {/* Title Section */}
        <div className="text-center shrink-0 flex flex-col items-center justify-center w-full">
          <span className="px-3 py-1 bg-[#08709d]/10 text-[#08709d] text-[10px] font-black uppercase tracking-widest rounded-full mb-3.5 inline-block text-center mx-auto">
            Portal Self-Service
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-[#1a294a] tracking-tight uppercase mb-2 text-center w-full">
            Staff Services Dashboard
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-semibold max-w-lg mx-auto leading-relaxed text-center w-full">
            Quickly submit leave applications, claim completed overtime hours, or submit salary reviews to HR.
          </p>
        </div>

        {/* Success Alert Banner */}
        <AnimatePresence>
          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-green-50 border border-green-200/50 text-green-700 px-5 py-4 rounded-2xl text-xs font-bold flex items-center gap-3 text-left shadow-sm shrink-0"
            >
              <CheckCircle2 size={18} className="text-[#5eb63b] shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>


        {/* 3-Button Grid (Action Cards) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center justify-center shrink-0">
          
          {/* Card Button 1: Apply for Leave */}
          <motion.div
            role="button"
            tabIndex={0}
            onClick={() => handleActionClick('leave')}
            onKeyDown={(e) => e.key === 'Enter' && handleActionClick('leave')}
            whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(8,112,157,0.12)", borderColor: "#08709d" }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-[360px] md:max-w-none mx-auto min-h-[320px] md:min-h-[360px] h-full bg-white border border-gray-200 hover:border-[#08709d]/50 rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer transition-all shadow-sm outline-none shrink-0 relative overflow-hidden"
          >
            {/* Themed Accent Badge */}
            <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#08709d]/10 text-[#08709d] uppercase tracking-wider">
              Leave
            </span>
            <div className="w-12 h-12 bg-[#08709d]/10 text-[#08709d] rounded-2xl flex items-center justify-center mb-4 mt-2 shrink-0 shadow-inner">
              <Calendar size={22} />
            </div>
            <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide mb-1.5">
              Apply for Leave
            </h3>
            <p className="text-gray-400 text-[11px] font-semibold leading-relaxed mb-1">
              Submit your annual, sick, or casual vacation days.
            </p>
            <div className="mt-auto pt-5 w-full shrink-0 flex justify-center">
              <div className="w-[240px] h-[54px] bg-gradient-to-r from-[#08709d] to-[#0ea5e9] rounded-[14px] text-sm font-bold uppercase tracking-[0.1em] text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#08709d]/15 hover:shadow-[#08709d]/25 hover:scale-[1.02] active:scale-[0.99] cursor-pointer">
                Start Application <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>

          {/* Card Button 2: Apply for OT */}
          <motion.div
            role="button"
            tabIndex={0}
            onClick={() => handleActionClick('ot')}
            onKeyDown={(e) => e.key === 'Enter' && handleActionClick('ot')}
            whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(94,182,59,0.12)", borderColor: "#5eb63b" }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-[360px] md:max-w-none mx-auto min-h-[320px] md:min-h-[360px] h-full bg-white border border-gray-200 hover:border-[#5eb63b]/50 rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer transition-all shadow-sm outline-none shrink-0 relative overflow-hidden"
          >
            {/* Themed Accent Badge */}
            <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#5eb63b]/10 text-[#5eb63b] uppercase tracking-wider">
              Claims
            </span>
            <div className="w-12 h-12 bg-[#5eb63b]/10 text-[#5eb63b] rounded-2xl flex items-center justify-center mb-4 mt-2 shrink-0 shadow-inner">
              <Clock size={22} />
            </div>
            <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide mb-1.5">
              Apply for OT
            </h3>
            <p className="text-gray-400 text-[11px] font-semibold leading-relaxed mb-1">
              Request approval for completed overtime shift hours.
            </p>
            <div className="mt-auto pt-5 w-full shrink-0 flex justify-center">
              <div className="w-[240px] h-[54px] bg-gradient-to-r from-[#5eb63b] to-[#7ed321] rounded-[14px] text-sm font-bold uppercase tracking-[0.1em] text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#5eb63b]/15 hover:shadow-[#5eb63b]/25 hover:scale-[1.02] active:scale-[0.99] cursor-pointer">
                Log Hours <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>

          {/* Card Button 3: Salary Increment */}
          <motion.div
            role="button"
            tabIndex={0}
            onClick={() => handleActionClick('increment')}
            onKeyDown={(e) => e.key === 'Enter' && handleActionClick('increment')}
            whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(230,126,34,0.12)", borderColor: "#e67e22" }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-[360px] md:max-w-none mx-auto min-h-[320px] md:min-h-[360px] h-full bg-white border border-gray-200 hover:border-[#e67e22]/50 rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer transition-all shadow-sm outline-none shrink-0 relative overflow-hidden"
          >
            {/* Themed Accent Badge */}
            <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#e67e22]/10 text-[#e67e22] uppercase tracking-wider">
              Review
            </span>
            <div className="w-12 h-12 bg-[#e67e22]/10 text-[#e67e22] rounded-2xl flex items-center justify-center mb-4 mt-2 shrink-0 shadow-inner">
              <CreditCard size={22} />
            </div>
            <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide mb-1.5">
              Salary Increment
            </h3>
            <p className="text-gray-400 text-[11px] font-semibold leading-relaxed mb-1">
              Request review for merit or role-promotion increments.
            </p>
            <div className="mt-auto pt-5 w-full shrink-0 flex justify-center">
              <div className="w-[240px] h-[54px] bg-gradient-to-r from-[#e67e22] to-[#f39c12] rounded-[14px] text-sm font-bold uppercase tracking-[0.1em] text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#e67e22]/15 hover:shadow-[#e67e22]/25 hover:scale-[1.02] active:scale-[0.99] cursor-pointer">
                Submit Review <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>

        </div>

        {/* IT Support Info Banner */}
        <div className="w-full max-w-sm bg-white/50 backdrop-blur-sm border border-gray-200/40 rounded-2xl py-3 px-5 flex items-center justify-center gap-3 text-xs font-semibold text-gray-400 shrink-0 shadow-sm mt-4">
          <Mail size={14} className="text-gray-400 shrink-0" />
          <span>Need IT assistance? Contact </span>
          <a href="mailto:it@corx.ae" className="text-[#08709d] hover:text-[#5eb63b] transition-colors font-bold">
            it@corx.ae
          </a>
        </div>

      </div>

      {/* MODALS / OVERLAYS FOR THE THREE BUTTONS */}
      <AnimatePresence>
        {activeModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-[#1a294a]/30 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[550px] bg-white rounded-[20px] shadow-2xl z-50 overflow-hidden text-left border border-gray-100"
            >
              {/* MODAL: LEAVE */}
              {activeModal === 'leave' && (
                <form onSubmit={(e) => handleFormSubmit(e, 'Leave Application')} className="w-full flex flex-col max-h-[85vh] overflow-y-auto p-8 md:p-9 gap-5 bg-white">
                  {/* Modal Header */}
                  <div className="flex flex-col items-center text-center justify-center shrink-0 relative mb-2">
                    <h2 className="text-2xl font-bold text-[#1a294a] tracking-tight leading-none font-['Montserrat']">Apply for Leave</h2>
                    <p className="text-gray-400 text-xs mt-2 font-medium">Please fill out your leave details below.</p>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="absolute top-0 right-0 w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all flex items-center justify-center cursor-pointer border-none bg-transparent"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Staff Info Grid */}
                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Name of Staff</label>
                      <input 
                        type="text" 
                        required 
                        value={staffName}
                        onChange={(e) => setStaffName(e.target.value)}
                        placeholder="Name of Staff"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">ID Number</label>
                      <input 
                        type="text" 
                        required 
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        placeholder="CH-XXXXX"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Department</label>
                      <input 
                        type="text" 
                        required 
                        value={staffDep}
                        onChange={(e) => setStaffDep(e.target.value)}
                        placeholder="Department"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Position</label>
                      <input 
                        type="text" 
                        required 
                        value={staffPosition}
                        onChange={(e) => setStaffPosition(e.target.value)}
                        placeholder="Position"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>

                  {/* Leave Type select */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Leave Type</label>
                    <div className="relative">
                      <select 
                        required 
                        value={selectedLeaveType}
                        onChange={(e) => setSelectedLeaveType(e.target.value)}
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all appearance-none cursor-pointer bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border px-4 py-3 rounded-[8px]"
                        style={{ height: '48px', paddingRight: '40px' }}
                      >
                        <option value="Annual">Annual Leave</option>
                        <option value="Sick">Sick Leave</option>
                        <option value="Casual">Casual Leave</option>
                        <option value="Emergency">Emergency Leave</option>
                        <option value="Unpaid">Unpaid Leave</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Start Date</label>
                      <input 
                        type="date" 
                        required 
                        value={leaveStartDate}
                        onChange={(e) => setLeaveStartDate(e.target.value)}
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border cursor-pointer"
                        style={{ height: '48px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">End Date</label>
                      <input 
                        type="date" 
                        required 
                        value={leaveEndDate}
                        onChange={(e) => setLeaveEndDate(e.target.value)}
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border cursor-pointer"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>

                  {/* Leave Duration Calculation */}
                  {leaveStartDate && leaveEndDate && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center p-5 bg-gradient-to-r from-[#08709d]/5 to-[#0ea5e9]/5 border border-[#08709d]/15 rounded-[16px] text-center shrink-0 shadow-sm"
                    >
                      <span className="text-[#08709d] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Info size={15} />
                        Total leave days calculated
                      </span>
                      <span className="font-extrabold text-[#1a294a] text-2xl tracking-tight bg-white px-4 py-1.5 rounded-xl border border-gray-150 shadow-sm">
                        {calculateDaysSelected(leaveStartDate, leaveEndDate)}
                      </span>
                    </motion.div>
                  )}



                  {/* Reason */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Reason for Leave</label>
                    <textarea 
                      required 
                      placeholder="Briefly describe the reason for your leave..." 
                      className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none text-[#1a294a] text-base font-['Poppins'] transition-all p-4 resize-none placeholder:text-gray-400 bg-white rounded-[8px]"
                      style={{ minHeight: '110px' }}
                    />
                  </div>

                  {/* Attachment */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Supporting Document (Optional)</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => leaveFileInputRef.current.click()}
                        className="flex items-center gap-2 px-4 py-2 border-[1.5px] border-dashed border-gray-300 hover:border-[#08709d] text-gray-500 hover:text-[#08709d] rounded-lg text-sm font-semibold transition-all bg-white cursor-pointer"
                      >
                        <Paperclip size={16} />
                        {leaveFile ? 'Change File' : 'Upload File'}
                      </button>
                      <input 
                        type="file"
                        ref={leaveFileInputRef}
                        onChange={(e) => setLeaveFile(e.target.files[0])}
                        className="hidden"
                      />
                      {leaveFile && (
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600">
                          <span className="truncate max-w-[200px]">{leaveFile.name}</span>
                          <button
                            type="button"
                            onClick={() => setLeaveFile(null)}
                            className="text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer flex items-center justify-center p-0.5"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>



                  {/* Submit and Cancel */}
                  <div className="mt-4 flex flex-col items-center w-full shrink-0">
                    <motion.button
                      type="submit"
                      className="w-[280px] h-[54px] bg-gradient-to-r from-[#08709d] to-[#0ea5e9] text-white border-none rounded-[14px] text-sm font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#08709d]/15 hover:shadow-[#08709d]/25"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(8, 112, 157, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Submit Application
                    </motion.button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-[280px] h-[48px] border-[1.5px] border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 bg-transparent rounded-[12px] text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer mt-3"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* MODAL: OT */}
              {activeModal === 'ot' && (
                <form onSubmit={(e) => handleFormSubmit(e, 'Overtime (OT) Request')} className="w-full flex flex-col max-h-[85vh] overflow-y-auto p-8 md:p-9 gap-5 bg-white">
                  {/* Modal Header */}
                  <div className="flex flex-col items-center text-center justify-center shrink-0 relative mb-2">
                    <h2 className="text-2xl font-bold text-[#1a294a] tracking-tight leading-none font-['Montserrat']">Apply for OT</h2>
                    <p className="text-gray-400 text-xs mt-2 font-medium">Please fill out your overtime details below.</p>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="absolute top-0 right-0 w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all flex items-center justify-center cursor-pointer border-none bg-transparent"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Staff Info Grid */}
                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Name of Staff</label>
                      <input 
                        type="text" 
                        required 
                        value={staffName}
                        onChange={(e) => setStaffName(e.target.value)}
                        placeholder="Name of Staff"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">ID Number</label>
                      <input 
                        type="text" 
                        required 
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        placeholder="CH-XXXXX"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Department</label>
                      <input 
                        type="text" 
                        required 
                        value={staffDep}
                        onChange={(e) => setStaffDep(e.target.value)}
                        placeholder="Department"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Position</label>
                      <input 
                        type="text" 
                        required 
                        value={staffPosition}
                        onChange={(e) => setStaffPosition(e.target.value)}
                        placeholder="Position"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>

                  {/* Shift Type select */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Shift Type</label>
                    <div className="relative">
                      <select 
                        required 
                        value={selectedOtType}
                        onChange={(e) => setSelectedOtType(e.target.value)}
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all appearance-none cursor-pointer bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border px-4 py-3 rounded-[8px]"
                        style={{ height: '48px', paddingRight: '40px' }}
                      >
                        <option value="Day Shift">Day Shift</option>
                        <option value="Night Shift">Night Shift</option>
                        <option value="Weekend">Weekend Shift</option>
                        <option value="On-Call">On-Call Duty</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Date and Hours */}
                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Date of Duty</label>
                      <input 
                        type="date" 
                        required 
                        value={otDate}
                        onChange={(e) => setOtDate(e.target.value)}
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border cursor-pointer"
                        style={{ height: '48px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">OT Hours</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        placeholder="e.g. 4.5" 
                        required 
                        value={otHours}
                        onChange={(e) => setOtHours(e.target.value)}
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>



                  {/* Description */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Shift Description</label>
                    <textarea 
                      required 
                      placeholder="Log active shift extension details, patient coverages, or clinic callouts..." 
                      className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none text-[#1a294a] text-base font-['Poppins'] transition-all p-4 resize-none placeholder:text-gray-400 bg-white rounded-[8px]"
                      style={{ minHeight: '110px' }}
                    />
                  </div>

                  {/* Attachment */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Shift Proof (Optional)</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => otFileInputRef.current.click()}
                        className="flex items-center gap-2 px-4 py-2 border-[1.5px] border-dashed border-gray-300 hover:border-[#5eb63b] text-gray-500 hover:text-[#5eb63b] rounded-lg text-sm font-semibold transition-all bg-white cursor-pointer"
                      >
                        <Paperclip size={16} />
                        {otFile ? 'Change File' : 'Upload File'}
                      </button>
                      <input 
                        type="file"
                        ref={otFileInputRef}
                        onChange={(e) => setOtFile(e.target.files[0])}
                        className="hidden"
                      />
                      {otFile && (
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600">
                          <span className="truncate max-w-[200px]">{otFile.name}</span>
                          <button
                            type="button"
                            onClick={() => setOtFile(null)}
                            className="text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer flex items-center justify-center p-0.5"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>



                  {/* Submit and Cancel */}
                  <div className="mt-4 flex flex-col items-center w-full shrink-0">
                    <motion.button
                      type="submit"
                      className="w-[280px] h-[54px] bg-gradient-to-r from-[#5eb63b] to-[#7ed321] text-white border-none rounded-[14px] text-sm font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#5eb63b]/15 hover:shadow-[#5eb63b]/25"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(94, 182, 59, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Submit Claim
                    </motion.button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-[280px] h-[48px] border-[1.5px] border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 bg-transparent rounded-[12px] text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer mt-3"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* MODAL: SALARY INCREMENT */}
              {activeModal === 'increment' && (
                <form onSubmit={(e) => handleFormSubmit(e, 'Salary Increment Review')} className="w-full flex flex-col max-h-[85vh] overflow-y-auto p-8 md:p-9 gap-5 bg-white">
                  {/* Modal Header */}
                  <div className="flex flex-col items-center text-center justify-center shrink-0 relative mb-2">
                    <h2 className="text-2xl font-bold text-[#1a294a] tracking-tight leading-none font-['Montserrat']">Salary Increment</h2>
                    <p className="text-gray-400 text-xs mt-2 font-medium">Please fill out your request details below.</p>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="absolute top-0 right-0 w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all flex items-center justify-center cursor-pointer border-none bg-transparent"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Staff Info Grid */}
                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Name of Staff</label>
                      <input 
                        type="text" 
                        required 
                        value={staffName}
                        onChange={(e) => setStaffName(e.target.value)}
                        placeholder="Name of Staff"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">ID Number</label>
                      <input 
                        type="text" 
                        required 
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        placeholder="CH-XXXXX"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Department</label>
                      <input 
                        type="text" 
                        required 
                        value={staffDep}
                        onChange={(e) => setStaffDep(e.target.value)}
                        placeholder="Department"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Position</label>
                      <input 
                        type="text" 
                        required 
                        value={staffPosition}
                        onChange={(e) => setStaffPosition(e.target.value)}
                        placeholder="Position"
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all px-4 py-3 rounded-[8px] bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>

                  {/* Appraisal Type select */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Appraisal Type</label>
                    <div className="relative">
                      <select 
                        required 
                        value={selectedIncrementType}
                        onChange={(e) => setSelectedIncrementType(e.target.value)}
                        className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none transition-all appearance-none cursor-pointer bg-white text-[#1a294a] text-base font-['Poppins'] outline-none box-border px-4 py-3 rounded-[8px]"
                        style={{ height: '48px', paddingRight: '40px' }}
                      >
                        <option value="Merit-Based">Merit-Based Performance Review</option>
                        <option value="Promotion">Senior Promotion Review</option>
                        <option value="Market Adjustment">Market Adjustment Alignment</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Current Salary input */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Current Salary</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <CreditCard size={16} />
                      </div>
                      <input 
                        type="text" 
                        disabled 
                        value="12,500 AED / Month" 
                        className="w-full bg-gray-50 border-[1.5px] border-gray-200 text-base font-bold text-gray-400 select-none cursor-not-allowed px-10 py-3 rounded-[8px]"
                        style={{ height: '48px' }}
                      />
                    </div>
                  </div>



                  {/* Justification Details */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Justification Details</label>
                    <textarea 
                      required 
                      placeholder="Detail your achievements, DHA certifications, or performance highlights..." 
                      className="w-full border-[1.5px] border-gray-200 hover:border-gray-300 focus:border-[#08709d] focus:outline-none text-[#1a294a] text-base font-['Poppins'] transition-all p-4 resize-none placeholder:text-gray-400 bg-white rounded-[8px]"
                      style={{ minHeight: '110px' }}
                    />
                  </div>

                  {/* Attachment */}
                  <div className="flex flex-col gap-1.5 text-left shrink-0">
                    <label className="text-[15px] font-semibold text-[#1a294a] font-['Montserrat']">Supporting Appraisal / DHA Certs (Optional)</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => incrementFileInputRef.current.click()}
                        className="flex items-center gap-2 px-4 py-2 border-[1.5px] border-dashed border-gray-300 hover:border-[#e67e22] text-gray-500 hover:text-[#e67e22] rounded-lg text-sm font-semibold transition-all bg-white cursor-pointer"
                      >
                        <Paperclip size={16} />
                        {incrementFile ? 'Change File' : 'Upload File'}
                      </button>
                      <input 
                        type="file"
                        ref={incrementFileInputRef}
                        onChange={(e) => setIncrementFile(e.target.files[0])}
                        className="hidden"
                      />
                      {incrementFile && (
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600">
                          <span className="truncate max-w-[200px]">{incrementFile.name}</span>
                          <button
                            type="button"
                            onClick={() => setIncrementFile(null)}
                            className="text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer flex items-center justify-center p-0.5"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>



                  {/* Submit and Cancel */}
                  <div className="mt-4 flex flex-col items-center w-full shrink-0">
                    <motion.button
                      type="submit"
                      className="w-[280px] h-[54px] bg-gradient-to-r from-[#e67e22] to-[#f39c12] text-white border-none rounded-[14px] text-sm font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#e67e22]/15 hover:shadow-[#e67e22]/25"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(230, 126, 34, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Submit Review
                    </motion.button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-[280px] h-[48px] border-[1.5px] border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 bg-transparent rounded-[12px] text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer mt-3"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default StaffDashboard;
