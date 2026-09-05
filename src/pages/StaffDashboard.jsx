import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Calendar, Clock, ChevronDown, CheckCircle2, X,
  Paperclip, ArrowUpRight, Sun, Moon, Zap, TrendingUp,
  ClipboardList, CalendarDays, User, Megaphone, Bell,
  Eye, Sparkles, Check, Send, AlertCircle, FileText,
  Briefcase, Building2, Hourglass, Receipt, Download, ExternalLink,
  Car, MapPin, Navigation, Route, Phone, ArrowRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import logo from '../assets/logo.webp';
import ShuttleDispatchCard from '../components/ShuttleDispatchCard';


/* ── Brand palette ──────────────────────────────────────────────────────── */
const B = {
  primary:    '#08709d',
  primaryDark:'#065679',
  secondary:  '#1a294a',
  accent:     '#5eb63b',
  accentDark: '#4a962e',
  indigo:     '#6366f1',
  amber:      '#f59e0b',
  bg:         '#F8FAFC',
  white:      '#FFFFFF',
  border:     '#E2E8F0',
  muted:      '#64748B',
  lightBlue:  '#F0F9FF',
  lightGreen: '#F0FDF4',
  lightAmber: '#FFFBEB',
  lightIndigo:'#EEF2FF',
  lightRed:   '#FEF2F2',
};

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const getInitials = (name = '') =>
  name.trim().split(' ').map(w => w[0]?.toUpperCase() || '').slice(0, 2).join('');

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good Morning',   Icon: Sun };
  if (h < 17) return { text: 'Good Afternoon', Icon: Zap };
  return             { text: 'Good Evening',   Icon: Moon };
};

const formatDate = () => new Date().toLocaleDateString('en-GB', {
  weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
});

const calculateDays = (start, end) => {
  if (!start || !end) return '—';
  const s = new Date(start), e = new Date(end);
  if (isNaN(s) || isNaN(e)) return '—';
  const d = Math.ceil((e - s) / 86400000) + 1;
  return d > 0 ? `${d} day${d !== 1 ? 's' : ''}` : '0 days';
};

const formatScheduleDate = (dateStr) => {
  if (!dateStr) return 'Sat, 5 Sep 2026';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

/* ── Form helpers ────────────────────────────────────────────────────────── */
const inputCls = "w-full border border-slate-200 focus:border-[#08709d] focus:outline-none focus:ring-2 focus:ring-[#08709d]/15 transition-all px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 font-medium";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5 text-left">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    {children}
  </div>
);

const FileUpload = ({ label, file, onFile, onClear, accentColor = B.primary }) => (
  <Field label={label}>
    <div className="flex items-center gap-3 flex-wrap">
      <button
        type="button"
        onClick={onFile}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer bg-white border border-dashed hover:border-[#08709d] text-slate-600 hover:text-[#08709d] active:scale-95"
        style={{ borderColor: file ? accentColor : '#CBD5E1' }}
      >
        <Paperclip size={14} className={file ? 'text-[#08709d]' : 'text-slate-400'} />
        {file ? 'Change File' : 'Attach Document'}
      </button>
      {file && (
        <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-700">
          <span className="max-w-[160px] truncate font-medium">{file.name}</span>
          <button
            type="button"
            onClick={onClear}
            className="text-slate-400 hover:text-red-500 cursor-pointer p-0.5"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  </Field>
);

/* ── Status and Priority Configs ─────────────────────────────────────────── */
const STATUS_CFG = {
  Pending:      { label: 'Pending Approval', color: '#d97706', bg: '#FEF3C7', border: '#FDE68A' },
  'In Progress':{ label: 'In Progress',      color: '#0284c7', bg: '#E0F2FE', border: '#BAE6FD' },
  Completed:    { label: 'Completed',        color: '#16a34a', bg: '#DCFCE7', border: '#BBF7D0' },
  Approved:     { label: 'Approved',         color: '#16a34a', bg: '#DCFCE7', border: '#BBF7D0' },
  Published:    { label: 'Published',        color: '#08709d', bg: '#E0F2FE', border: '#BAE6FD' },
  Rejected:     { label: 'Rejected',         color: '#dc2626', bg: '#FEE2E2', border: '#FECACA' },
};

const PRIORITY_CFG = {
  normal:    { label: 'Normal',    color: '#0284c7', bg: '#E0F2FE', border: '#BAE6FD' },
  Low:       { label: 'Low',       color: '#16a34a', bg: '#DCFCE7', border: '#BBF7D0' },
  Medium:    { label: 'Medium',    color: '#d97706', bg: '#FEF3C7', border: '#FDE68A' },
  important: { label: 'Important', color: '#d97706', bg: '#FEF3C7', border: '#FDE68A' },
  urgent:    { label: 'Urgent',    color: '#dc2626', bg: '#FEE2E2', border: '#FECACA' },
  High:      { label: 'High',      color: '#dc2626', bg: '#FEE2E2', border: '#FECACA' },
};

const Badge = ({ label, cfg }) => {
  const c = cfg || STATUS_CFG[label] || { label, color: '#64748B', bg: '#F1F5F9', border: '#E2E8F0' };
  return (
    <span
      className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border whitespace-nowrap"
      style={{ color: c.color, backgroundColor: c.bg, borderColor: c.border }}
    >
      {c.label || label}
    </span>
  );
};

const EmptyState = ({ icon: Icon, text }) => (
  <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center">
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-50 text-[#08709d] flex items-center justify-center mb-3">
      <Icon size={24} className="opacity-60" />
    </div>
    <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-sm leading-relaxed">{text}</p>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   Staff Dashboard Main Component
══════════════════════════════════════════════════════════════════════════ */
const StaffDashboard = () => {
  const navigate = useNavigate();
  const {
    currentUser, logout, getTasksForStaff, updateTaskStatus,
    leaveApplications, createLeaveApplication,
    otApplications, createOtApplication,
    salaryApplications, createSalaryApplication,
    noticeApplications, createNoticeApplication,
    dutyApplications, createDutyApplication
  } = useAuth();

  const [activeTab, setActiveTab] = useState('leave'); // 'leave' | 'ot' | 'duty' | 'schedule' | 'notice' | 'salary'
  const [activeModal, setActiveModal] = useState(null); // 'leave' | 'ot' | 'duty' | 'notice' | 'salary' | 'viewNotice' | 'viewLeave' | 'viewSalarySlip' | 'viewSchedule'
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedSalarySlip, setSelectedSalarySlip] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [driverSchedules, setDriverSchedules] = useState([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);

  const [noticeFilter, setNoticeFilter] = useState('all'); // 'all' | 'urgent' | 'broadcast'
  const [acknowledgedNotices, setAcknowledgedNotices] = useState(() => {
    try {
      const stored = localStorage.getItem('chc_acknowledged_notices');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  /* ── Fetch driver schedules ── */
  const fetchSchedules = async () => {
    try {
      setLoadingSchedules(true);
      const res = await fetch(`${API_BASE_URL}/api/driver-schedules/`);
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.results || []);
        setDriverSchedules(list);
      }
    } catch (err) {
      console.error('Failed to fetch driver schedules:', err);
    } finally {
      setLoadingSchedules(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [currentUser]);

  /* ── Leave form state ── */
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveFile, setLeaveFile] = useState(null);
  const leaveFileRef = useRef(null);

  /* ── OT form state ── */
  const [otType, setOtType] = useState('Day Shift');
  const [otDate, setOtDate] = useState('');
  const [otHours, setOtHours] = useState('');
  const [otDescription, setOtDescription] = useState('');
  const [otFile, setOtFile] = useState(null);
  const otFileRef = useRef(null);

  /* ── Duty Schedule form state ── */
  const [dutyDate, setDutyDate] = useState('');
  const [dutyReplacement, setDutyReplacement] = useState('');
  const [dutyReason, setDutyReason] = useState('');

  /* ── Notice form state (Apply/Post Notice) ── */
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Internal Staff Notice');
  const [noticePriority, setNoticePriority] = useState('normal');
  const [noticeTargetAudience, setNoticeTargetAudience] = useState('all');
  const [noticeMessage, setNoticeMessage] = useState('');
  const [noticeFile, setNoticeFile] = useState(null);
  const noticeFileRef = useRef(null);

  /* ── Salary form state ── */
  const [incType, setIncType] = useState('Merit-Based Performance Review');
  const [incJustification, setIncJustification] = useState('');
  const [incFile, setIncFile] = useState(null);
  const incFileRef = useRef(null);

  /* ── Shared staff fields ── */
  const [staffName, setStaffName] = useState(currentUser?.name || '');
  const [staffId, setStaffId] = useState(currentUser?.id || '');
  const [staffDep, setStaffDep] = useState(currentUser?.department || '');
  const [staffPosition, setStaffPosition] = useState(currentUser?.position || '');

  /* ── Route guard ── */
  useEffect(() => {
    if (!currentUser && typeof window !== 'undefined') {
      navigate('/portal', { replace: true });
    } else if (currentUser && currentUser.role === 'admin' && typeof window !== 'undefined') {
      navigate('/portal/admin', { replace: true });
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/portal');
  };

  const openModal = (type, data = null) => {
    if (type === 'viewNotice') {
      setSelectedNotice(data);
    } else if (type === 'viewLeave') {
      setSelectedLeave(data);
    } else if (type === 'viewSalarySlip') {
      setSelectedSalarySlip(data);
    } else if (type === 'viewSchedule') {
      setSelectedSchedule(data);
    }
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedNotice(null);
    setSelectedLeave(null);
    setSelectedSalarySlip(null);
    setSelectedSchedule(null);
    setLeaveStart(''); setLeaveEnd(''); setLeaveReason(''); setLeaveFile(null);
    setOtDate(''); setOtHours(''); setOtDescription(''); setOtFile(null);
    setDutyDate(''); setDutyReplacement(''); setDutyReason('');
    setNoticeTitle(''); setNoticeMessage(''); setNoticeFile(null);
    setIncJustification(''); setIncFile(null);
  };


  const toggleAcknowledgeNotice = (id) => {
    setAcknowledgedNotices(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('chc_acknowledged_notices', JSON.stringify(next));
      } catch (err) { console.error(err); }
      return next;
    });
  };

  const submitForm = async (e, type, record) => {
    e.preventDefault();
    if (type === 'leave') {
      await createLeaveApplication(record);
      setSuccessMsg('Leave application submitted to HR successfully.');
    } else if (type === 'ot') {
      await createOtApplication(record);
      setSuccessMsg('Overtime claim submitted successfully.');
    } else if (type === 'duty') {
      await createDutyApplication(record);
      setSuccessMsg('Duty replacement schedule request submitted successfully.');
    } else if (type === 'notice') {
      await createNoticeApplication(record);
      setSuccessMsg('Staff Notice submitted and published successfully.');
    } else if (type === 'salary') {
      await createSalaryApplication(record);
      setSuccessMsg('Salary review request submitted to HR.');
    }
    closeModal();
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  /* ── Filtered user data ── */
  const myLeaves    = (leaveApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const myOts       = (otApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const myDuties    = (dutyApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const mySalaries  = (salaryApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const allNotices  = (noticeApplications || []);
  const mySubmittedNotices = allNotices.filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());

  /* ── Driver / Trip Schedules Filter ── */
  const mySchedules = (driverSchedules || []).filter(sch => {
    if (!currentUser) return false;
    const uid = (currentUser.id || currentUser.staff_id || '').toString().trim().toLowerCase();
    const uname = (currentUser.name || currentUser.full_name || '').toString().trim().toLowerCase();

    // 1. Is driver
    const isDriver = (sch.driver_staff_id && sch.driver_staff_id.toString().trim().toLowerCase() === uid) ||
                     (sch.driver && sch.driver.toString().trim().toLowerCase() === uid) ||
                     (sch.driver_name && uname && sch.driver_name.toLowerCase().includes(uname));

    // 2. Is passenger / drop-off in any stop
    const isPassengerInStop = (sch.route_stops || []).some(stop => {
      const pList = stop.staff_passengers_details || [];
      const dList = stop.staff_dropoffs_details || [];
      const matchP = pList.some(p => 
        (p.staff_id && p.staff_id.toString().trim().toLowerCase() === uid) ||
        (p.id && p.id.toString().trim().toLowerCase() === uid) ||
        (p.full_name && uname && p.full_name.toLowerCase().includes(uname)) ||
        (p.name && uname && p.name.toLowerCase().includes(uname))
      );
      const matchD = dList.some(d => 
        (d.staff_id && d.staff_id.toString().trim().toLowerCase() === uid) ||
        (d.id && d.id.toString().trim().toLowerCase() === uid) ||
        (d.full_name && uname && d.full_name.toLowerCase().includes(uname)) ||
        (d.name && uname && d.name.toLowerCase().includes(uname))
      );
      const matchLegacy = (stop.staff_passenger_name && uname && stop.staff_passenger_name.toLowerCase().includes(uname));
      return matchP || matchD || matchLegacy;
    });

    const isDirectPassenger = (sch.staff_passenger && sch.staff_passenger.toString().trim().toLowerCase() === uid) ||
                              (sch.staff_passenger_name && uname && sch.staff_passenger_name.toLowerCase().includes(uname));

    return isDriver || isPassengerInStop || isDirectPassenger;
  });

  const displayedSchedules = mySchedules.length > 0 ? mySchedules : (currentUser?.role === 'admin' ? driverSchedules : (driverSchedules || []));

  const filteredNotices = allNotices.filter(n => {
    if (noticeFilter === 'urgent') return n.priority === 'urgent' || n.priority === 'important';
    if (noticeFilter === 'broadcast') return n.targetAudience === 'all';
    return true;
  });

  const greeting = getGreeting();
  const initials = getInitials(currentUser?.name);
  const myTasks  = getTasksForStaff ? getTasksForStaff(currentUser?.id) : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-['Poppins']">

      {/* Top Brand Gradient Stripe */}
      <div className="h-1 bg-gradient-to-r from-[#1a294a] via-[#08709d] to-[#5eb63b] w-full shrink-0" />

      {/* ── Top Header Navigation Bar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
            <Link to="/" className="shrink-0 flex items-center">
              <img src={logo} alt="Corx Logo" className="h-7 sm:h-9 w-auto object-contain" />
            </Link>
            <div className="h-4 sm:h-5 w-px bg-slate-200 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-xs sm:text-sm font-extrabold text-[#1a294a] truncate">
                  Staff Portal
                </h1>
                <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium hidden xs:block truncate">
                {formatDate()}
              </p>
            </div>
          </div>

          {/* User Profile Pill & Sign Out */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Staff Pill */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-sky-50/80 border border-sky-100/80 py-1 px-1.5 sm:px-3 rounded-full">
              <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#1a294a] to-[#08709d] flex items-center justify-center text-white text-[10px] sm:text-[11px] font-extrabold shrink-0 overflow-hidden shadow-xs">
                {currentUser?.photo ? (
                  <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
              </div>
              <div className="hidden sm:block text-left pr-1">
                <span className="block text-xs font-bold text-[#1a294a] truncate max-w-[120px]">
                  {currentUser?.name?.split(' ')[0] || 'Staff'}
                </span>
                <span className="block text-[10px] text-slate-500 font-medium truncate max-w-[120px]">
                  {currentUser?.position || 'Healthcare'}
                </span>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 p-2 sm:px-3 sm:py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/60 text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="Sign Out of Portal"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── Main Dashboard Content ────────────────────────────────────────── */}
      <main className="flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl w-full mx-auto flex flex-col gap-4 sm:gap-7 pb-20 sm:pb-8">

        {/* Success Toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold shadow-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm">{successMsg}</span>
              </div>
              <button onClick={() => setSuccessMsg(null)} className="text-emerald-500 hover:text-emerald-800 p-1 cursor-pointer">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Welcome Profile Hero Card (Mobile Compact & Clean) ────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xs relative overflow-hidden">
          {/* Subtle background ambient gradient */}
          <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-bl from-sky-100/60 via-emerald-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            {/* Avatar and Greeting Details */}
            <div className="flex items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-tr from-[#08709d] via-[#38bdf8] to-[#5eb63b] shadow-md shrink-0">
                {currentUser?.photo ? (
                  <img
                    src={currentUser.photo}
                    alt={currentUser.name}
                    className="w-full h-full object-cover rounded-[12px] sm:rounded-[14px] bg-white"
                  />
                ) : (
                  <div className="w-full h-full rounded-[12px] sm:rounded-[14px] bg-gradient-to-br from-[#1a294a] to-[#08709d] flex items-center justify-center text-white text-lg sm:text-2xl font-black">
                    {initials}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-sky-700 mb-0.5 sm:mb-1">
                  <greeting.Icon size={13} className="text-[#08709d] shrink-0" />
                  <span>{greeting.text}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-mono text-[10px] sm:text-[11px]">{currentUser?.id}</span>
                </div>
                <h2 className="text-base sm:text-2xl lg:text-3xl font-black text-[#1a294a] tracking-tight leading-snug truncate">
                  {currentUser?.name || 'Staff Member'} 👋
                </h2>
                <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5 font-medium truncate">
                  {currentUser?.position || 'Healthcare Professional'} {currentUser?.department ? `• ${currentUser.department}` : ''}
                </p>
              </div>
            </div>

            {/* Quick Metrics (2x2 on Mobile, 4x1 on Desktop) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full lg:w-auto shrink-0 pt-1 sm:pt-0">
              <div className="bg-sky-50/80 border border-sky-100/80 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
                <span className="text-[9px] sm:text-[10px] font-bold text-sky-700 uppercase tracking-wider block truncate">Tasks</span>
                <span className="text-base sm:text-xl font-black text-[#08709d] block mt-0.5">{myTasks.length}</span>
              </div>
              <div className="bg-amber-50/80 border border-amber-100/80 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
                <span className="text-[9px] sm:text-[10px] font-bold text-amber-700 uppercase tracking-wider block truncate">Notices</span>
                <span className="text-base sm:text-xl font-black text-amber-600 block mt-0.5">{allNotices.length}</span>
              </div>
              <div className="bg-emerald-50/80 border border-emerald-100/80 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 uppercase tracking-wider block truncate">Leaves</span>
                <span className="text-base sm:text-xl font-black text-emerald-600 block mt-0.5">{myLeaves.length}</span>
              </div>
              <div className="bg-indigo-50/80 border border-indigo-100/80 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
                <span className="text-[9px] sm:text-[10px] font-bold text-indigo-700 uppercase tracking-wider block truncate">Claims</span>
                <span className="text-base sm:text-xl font-black text-indigo-600 block mt-0.5">{myLeaves.length + myOts.length + mySalaries.length}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Applications & Request History (Mobile-First Touch Panes) ───────── */}
        <section className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 mb-3.5 sm:mb-5">
            <div>
              <h3 className="text-sm sm:text-lg font-black text-[#1a294a]">
                Applications & Request History
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Track status and approval lifecycle of your submitted forms
              </p>
            </div>
          </div>

          {/* All 6 Tabs on Mobile (3 columns on small screen, 6 on desktop) */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2 border-b border-slate-100 pb-3 mb-4 sm:mb-5">
            {[
              { id: 'leave', label: 'Leaves', count: myLeaves.length, icon: Calendar },
              { id: 'ot', label: 'OT Claims', count: myOts.length, icon: Clock },
              { id: 'duty', label: 'Duty Swap', count: myDuties.length, icon: CalendarDays },
              { id: 'schedule', label: 'Schedules', count: displayedSchedules.length, icon: Car },
              { id: 'notice', label: 'My Notices', count: mySubmittedNotices.length, icon: Megaphone },
              { id: 'salary', label: 'Salary Slips', count: mySalaries.length, icon: Receipt },
            ].map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                    active
                      ? 'bg-sky-50 text-[#08709d] shadow-2xs border border-sky-200'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Icon size={13} className="shrink-0 sm:w-4 sm:h-4" />
                  <span className="truncate">{tab.label}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                      active ? 'bg-[#08709d] text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panes */}
          <div>
            {/* ── LEAVES TAB ── */}
            {activeTab === 'leave' && (
              myLeaves.length === 0 ? (
                <EmptyState
                  icon={Calendar}
                  text="No leave applications submitted yet. Tap 'Apply for Leave' below to submit a request."
                />
              ) : (
                <div className="flex flex-col gap-2.5 sm:gap-3.5">
                  {myLeaves.map((r, i) => {
                    const statusInfo = STATUS_CFG[r.status] || STATUS_CFG.Pending;
                    const durationText = calculateDays(r.leaveStart, r.leaveEnd);

                    return (
                      <motion.div
                        key={r.id || i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 relative overflow-hidden group"
                      >
                        {/* Left status accent line */}
                        <div
                          className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full"
                          style={{ backgroundColor: statusInfo.color }}
                        />

                        {/* Leave details */}
                        <div className="flex-1 min-w-0 pl-1.5">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs sm:text-base font-bold text-[#1a294a]">
                              {r.leaveType}
                            </span>
                            <Badge label={r.status} cfg={statusInfo} />
                            <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-[#08709d] border border-sky-100">
                              ⏳ {durationText}
                            </span>
                          </div>

                          {r.reason ? (
                            <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-xl mb-1">
                              {r.reason}
                            </p>
                          ) : (
                            <p className="text-[11px] sm:text-xs text-slate-400 font-medium italic mb-1">
                              Standard Leave Application
                            </p>
                          )}

                          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-medium">
                            <span>
                              {new Date(r.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500 font-mono">
                              ID: {r.staffId || currentUser?.id}
                            </span>
                          </div>
                        </div>

                        {/* View Details Action Button (Full width on mobile) */}
                        <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0 sm:self-center border-t sm:border-t-0 border-slate-100">
                          <button
                            type="button"
                            onClick={() => openModal('viewLeave', r)}
                            className="w-full sm:w-auto justify-center px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-[#08709d] border border-sky-200/70 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-95"
                          >
                            <Eye size={14} className="text-[#08709d]" />
                            <span>View Full Details</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )
            )}

            {/* ── OT CLAIMS TAB ── */}
            {activeTab === 'ot' && (
              myOts.length === 0 ? (
                <EmptyState
                  icon={Clock}
                  text="No OT claims recorded. Tap 'Apply for OT' below to log your extra shift duty hours."
                />
              ) : (
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {myOts.map((r, i) => (
                    <div
                      key={r.id || i}
                      className="border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs sm:text-sm font-bold text-[#1a294a]">{r.otType}</span>
                          <Badge label={r.status} />
                        </div>
                        <div className="flex items-center gap-2.5 text-[11px] sm:text-xs text-slate-500 font-medium flex-wrap">
                          <span>📅 {r.otDate}</span>
                          <span className="text-emerald-700 font-bold font-mono">⏱️ {r.otHours}h Claimed</span>
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono shrink-0">
                        Submitted: {new Date(r.submittedAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* ── DUTY SCHEDULE TAB ── */}
            {activeTab === 'duty' && (
              myDuties.length === 0 ? (
                <EmptyState
                  icon={CalendarDays}
                  text="No duty replacement requests logged. Tap 'Duty Schedule' below to request a shift swap."
                />
              ) : (
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {myDuties.map((r, i) => (
                    <div
                      key={r.id || i}
                      className="border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs sm:text-sm font-bold text-[#1a294a]">Date: {r.dutyDate}</span>
                          <Badge label={r.status} />
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-600 font-medium mb-0.5">
                          👤 Covering Staff: <span className="font-bold text-[#08709d]">{r.dutyReplacement}</span>
                        </p>
                        {r.dutyReason && (
                          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                            Reason: {r.dutyReason}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono shrink-0">
                        Submitted: {new Date(r.submittedAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* ── DRIVER & TRIP SCHEDULES TAB (EXACT SCREENSHOT MAP FORM DESIGN) ── */}
            {activeTab === 'schedule' && (
              displayedSchedules.length === 0 ? (
                <EmptyState
                  icon={Car}
                  text="No driver or trip schedules assigned yet. When administration or dispatch schedules a trip, it will appear here."
                />
              ) : (
                <div className="flex flex-col gap-6 sm:gap-8 items-center w-full">
                  {displayedSchedules.map((sch, i) => {
                    const formattedDate = formatScheduleDate(sch.schedule_date);
                    const uid = (currentUser?.id || currentUser?.staff_id || '').toString().trim().toLowerCase();
                    const isDriver = (sch.driver_staff_id && sch.driver_staff_id.toString().trim().toLowerCase() === uid) ||
                                     (sch.driver && sch.driver.toString().trim().toLowerCase() === uid);

                    const stopsList = (sch.route_stops && sch.route_stops.length > 0) ? sch.route_stops : [
                      {
                        stop_order: 1,
                        source_location: sch.pickup_location || 'Baneshwor',
                        source_time: sch.pickup_time || '9:15 AM',
                        destination_location: sch.drop_location || 'Bouddha',
                        destination_time: sch.drop_time || '9:52 AM',
                        staff_passengers_details: sch.staff_passenger_name ? [{ id: 'p1', full_name: sch.staff_passenger_name }] : ["Sita Rai", "Anil Gurung", "Maya Tamang", "Kiran Thapa"],
                        staff_dropoffs_details: sch.staff_passenger_name ? [{ id: 'd1', full_name: sch.staff_passenger_name }] : ["Sita Rai", "Anil Gurung", "Maya Tamang", "Kiran Thapa"]
                      }
                    ];

                    return stopsList.map((stop, sIdx) => {
                      const rawPickups = (stop.staff_passengers_details && stop.staff_passengers_details.length > 0)
                        ? stop.staff_passengers_details
                        : (stop.staff_passenger_name ? [stop.staff_passenger_name] : (stop.staff_passenger ? [stop.staff_passenger] : ["Sita Rai", "Anil Gurung", "Maya Tamang", "Kiran Thapa"]));

                      const rawDropoffs = (stop.staff_dropoffs_details && stop.staff_dropoffs_details.length > 0)
                        ? stop.staff_dropoffs_details
                        : (stop.staff_passenger_name ? [stop.staff_passenger_name] : rawPickups);

                      return (
                        <ShuttleDispatchCard
                          key={`${sch.id || i}-${stop.id || sIdx}`}
                          driverName={sch.driver_name || "Rajesh Shrestha"}
                          vehicleNumber={sch.vehicle_info || "BA 2 KHA 3456"}
                          phoneNumber={sch.driver_phone || "+977 98XXXXXXXX"}
                          date={formattedDate}
                          pickup={{
                            place: stop.source_location || "Baneshwor",
                            time: stop.source_time || "9:15 AM"
                          }}
                          drop={{
                            place: stop.destination_location || "Bouddha",
                            time: stop.destination_time || "9:52 AM"
                          }}
                          pickupStaff={rawPickups}
                          dropStaff={rawDropoffs}
                          status={stop.status || sch.status || "Scheduled"}
                          isDriver={isDriver}
                          onViewDetails={() => openModal('viewSchedule', sch)}
                        />
                      );
                    });
                  })}
                </div>
              )
            )}

            {/* ── MY NOTICES TAB ── */}
            {activeTab === 'notice' && (
              mySubmittedNotices.length === 0 ? (
                <EmptyState
                  icon={Megaphone}
                  text="You haven't posted any staff notices yet. Tap 'Submit Staff Notice' below to post."
                />
              ) : (
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {mySubmittedNotices.map((r, i) => (
                    <div
                      key={r.id || i}
                      className="border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-2xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs sm:text-sm font-bold text-[#1a294a]">{r.title}</span>
                          <Badge label={r.status || 'Published'} />
                          <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {r.priority}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-normal line-clamp-1">
                          {r.content}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openModal('viewNotice', r)}
                        className="w-full sm:w-auto justify-center px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-50 text-[#08709d] hover:bg-sky-100 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                      >
                        <Eye size={13} />
                        <span>View Details</span>
                      </button>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* ── SALARY SLIPS TAB ── */}
            {activeTab === 'salary' && (
              mySalaries.length === 0 ? (
                <EmptyState
                  icon={Receipt}
                  text="No monthly salary slips issued yet. When administration sends your salary slip, it will appear here."
                />
              ) : (
                <div className="flex flex-col gap-2.5 sm:gap-3.5">
                  {mySalaries.map((r, i) => {
                    const imgUrl = r.image ? (r.image.startsWith('http') ? r.image : `${API_BASE_URL}${r.image.startsWith('/') ? '' : '/'}${r.image}`) : null;

                    return (
                      <div
                        key={r.id || i}
                        className="border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs"
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                            <Receipt size={18} />
                          </div>

                          <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-[#1a294a]">Monthly Salary Slip</span>
                              <span className="inline-flex items-center text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {r.status || 'Issued'}
                              </span>
                            </div>

                            <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed break-words">
                              {r.description || <span className="text-slate-400 italic">No description provided</span>}
                            </p>

                            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-mono pt-0.5">
                              <span className="flex items-center gap-1">
                                <Clock size={11} />
                                {new Date(r.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action / Attachment */}
                        {imgUrl && (
                          <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0 sm:self-center border-t sm:border-t-0 border-slate-100">
                            <button
                              type="button"
                              onClick={() => openModal('viewSalarySlip', r)}
                              className="w-full sm:w-auto justify-center flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all cursor-pointer shadow-2xs"
                            >
                              <img src={imgUrl} alt="Slip thumb" className="w-4 h-4 rounded object-cover" />
                              <span>View Slip</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            )}

          </div>
        </section>

        {/* ── Quick Action Cards (Mobile 2-column touch grid & Large on Desktop) ── */}
        <section>
          <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
            <h3 className="text-xs sm:text-sm font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
              <Sparkles size={14} className="text-[#08709d]" />
              Quick Actions & Applications
            </h3>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Instant HR & Administration Submissions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {[
              {
                id: 'leave',
                title: 'Apply Leave',
                sub: 'Annual, sick or casual',
                icon: Calendar,
                color: '#08709d',
                bg: 'bg-sky-50 text-[#08709d]',
                gradient: 'from-[#08709d] to-[#0ea5e9]',
                border: 'hover:border-[#08709d]/50',
                actionLabel: 'Apply Leave',
              },
              {
                id: 'ot',
                title: 'Apply for OT',
                sub: 'Log shift & overtime',
                icon: Clock,
                color: '#5eb63b',
                bg: 'bg-emerald-50 text-[#5eb63b]',
                gradient: 'from-[#5eb63b] to-[#10b981]',
                border: 'hover:border-[#5eb63b]/50',
                actionLabel: 'Log OT',
              },
              {
                id: 'duty',
                title: 'Duty Swap',
                sub: 'Shift replacement',
                icon: CalendarDays,
                color: '#0284c7',
                bg: 'bg-cyan-50 text-[#0284c7]',
                gradient: 'from-[#0284c7] to-[#38bdf8]',
                border: 'hover:border-[#0284c7]/50',
                actionLabel: 'Duty Request',
              },
              {
                id: 'notice',
                title: 'Post Notice',
                sub: 'Shift handover & notes',
                icon: Megaphone,
                color: '#6366f1',
                bg: 'bg-indigo-50 text-[#6366f1]',
                gradient: 'from-[#6366f1] to-[#818cf8]',
                border: 'hover:border-[#6366f1]/50',
                actionLabel: 'Post Notice',
              },
              {
                id: 'salary',
                title: 'Salary Review',
                sub: 'Merit or appraisal',
                icon: TrendingUp,
                color: '#1a294a',
                bg: 'bg-slate-100 text-[#1a294a]',
                gradient: 'from-[#1a294a] to-[#334155]',
                border: 'hover:border-[#1a294a]/50',
                actionLabel: 'Review Request',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openModal(card.id)}
                  className={`bg-white border border-slate-200/90 ${card.border} rounded-2xl p-3 sm:p-5 cursor-pointer relative overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group active:bg-slate-50/60`}
                >
                  {/* Top colored accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />

                  <div>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl ${card.bg} flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform`}>
                        <Icon size={16} className="sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 group-hover:text-slate-700 transition-colors flex items-center gap-0.5">
                        Open <ArrowUpRight size={12} />
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-base font-extrabold text-[#1a294a] mb-0.5 sm:mb-1 truncate">
                      {card.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mb-2 sm:mb-4 line-clamp-2">
                      {card.sub}
                    </p>
                  </div>

                  <div className="pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-bold" style={{ color: card.color }}>
                    <span>{card.actionLabel}</span>
                    <ArrowUpRight size={13} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Official Notice Board & Announcements Section ────────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 sm:pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#08709d] to-[#0ea5e9] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Megaphone size={14} className="sm:w-4 sm:h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-lg font-black text-[#1a294a]">
                    Notice Board & Announcements
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                    Official communications & updates
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Pills & Post Notice Button (Mobile responsive bar) */}
            <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
              <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'urgent', label: 'Urgent' },
                  { id: 'broadcast', label: 'Broadcasts' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setNoticeFilter(f.id)}
                    className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      noticeFilter === f.id
                        ? 'bg-white text-[#08709d] shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => openModal('notice')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#08709d] hover:bg-[#065679] text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95 ml-auto sm:ml-0"
              >
                <Send size={12} />
                <span>Post Notice</span>
              </button>
            </div>
          </div>

          {/* Notice Cards List */}
          <div className="mt-3.5 sm:mt-5">
            {filteredNotices.length === 0 ? (
              <EmptyState
                icon={Bell}
                text="No announcements matching your filter. You are all caught up on official hospital notices."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {filteredNotices.map((notice, idx) => {
                  const isUrgent = notice.priority === 'urgent';
                  const isImportant = notice.priority === 'important';
                  const isAck = acknowledgedNotices.includes(notice.id);

                  const borderClass = isUrgent
                    ? 'border-red-200 bg-red-50/20'
                    : isImportant
                    ? 'border-amber-200 bg-amber-50/20'
                    : 'border-slate-200 bg-white';

                  const badgeCfg = isUrgent
                    ? PRIORITY_CFG.urgent
                    : isImportant
                    ? PRIORITY_CFG.important
                    : PRIORITY_CFG.normal;

                  return (
                    <motion.div
                      key={notice.id || idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`border ${borderClass} rounded-2xl p-3.5 sm:p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between relative group`}
                    >
                      {/* Priority Left Indicator Stripe */}
                      <div
                        className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full"
                        style={{
                          backgroundColor: isUrgent ? '#dc2626' : isImportant ? '#d97706' : '#08709d',
                        }}
                      />

                      <div>
                        {/* Notice Header */}
                        <div className="flex items-start justify-between gap-2 mb-2 pl-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Badge label={badgeCfg.label} cfg={badgeCfg} />
                            {notice.targetAudience === 'all' ? (
                              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                                📢 All Staff
                              </span>
                            ) : (
                              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                🎯 Targeted
                              </span>
                            )}
                          </div>

                          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium flex items-center gap-1 shrink-0">
                            <Clock size={11} />
                            {notice.submittedAt
                              ? new Date(notice.submittedAt).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                })
                              : 'Recently'}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs sm:text-base font-bold text-[#1a294a] mb-1.5 pl-1.5 line-clamp-1 group-hover:text-[#08709d] transition-colors">
                          {notice.title}
                        </h4>

                        {/* Content Excerpt */}
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pl-1.5 line-clamp-2 sm:line-clamp-3 mb-3 font-normal">
                          {notice.content}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 pl-1.5">
                        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-slate-500 min-w-0">
                          <User size={11} className="text-[#08709d] shrink-0" />
                          <span className="truncate max-w-[90px] sm:max-w-[130px]">
                            {notice.staffName || 'Admin'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleAcknowledgeNotice(notice.id)}
                            className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              isAck
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                            title="Mark as Acknowledged"
                          >
                            <Check size={11} />
                            <span>{isAck ? 'Read' : 'Ack'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => openModal('viewNotice', notice)}
                            className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold bg-sky-50 text-[#08709d] hover:bg-sky-100 transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Eye size={11} />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Assigned Tasks Section ───────────────────────────────────────── */}
        <section className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-3.5 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#5eb63b] to-[#10b981] text-white flex items-center justify-center shadow-xs shrink-0">
                <ClipboardList size={14} className="sm:w-4 sm:h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-black text-[#1a294a]">
                  My Assigned Tasks
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                  Clinical duties & department assignments
                </p>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
              {myTasks.length} Task{myTasks.length !== 1 ? 's' : ''}
            </span>
          </div>

          {myTasks.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              text="No tasks currently assigned to you. Your supervisor will assign clinical items here."
            />
          ) : (
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {myTasks.map((task, i) => {
                const pc = PRIORITY_CFG[task.priority] || PRIORITY_CFG.Medium;
                const sc = STATUS_CFG[task.status] || STATUS_CFG.Pending;

                return (
                  <motion.div
                    key={task.id || i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs sm:text-base font-bold text-[#1a294a]">
                          {task.title}
                        </span>
                        <Badge label={pc.label} cfg={pc} />
                      </div>

                      {task.description && (
                        <p className="text-[11px] sm:text-xs text-slate-500 font-medium mb-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-slate-400 font-medium flex-wrap">
                        {task.dueDate && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <CalendarDays size={11} className="text-[#08709d]" />
                            Due: {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-slate-500">
                          <User size={11} className="text-[#08709d]" />
                          By: {task.assignedByName || 'Supervisor'}
                        </span>
                      </div>
                    </div>

                    {/* Status dropdown */}
                    <div className="relative shrink-0 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className="w-full sm:w-auto appearance-none font-bold text-xs px-3.5 py-2 sm:py-2.5 pr-8 rounded-xl border transition-all cursor-pointer outline-none shadow-2xs"
                        style={{
                          color: sc.color,
                          backgroundColor: sc.bg,
                          borderColor: sc.border,
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <ChevronDown
                        size={13}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: sc.color }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* ── Mobile Floating Quick Action Dock ──────────────────────────────── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2.5 z-40 flex items-center justify-between gap-2 shadow-lg">
        <button
          type="button"
          onClick={() => openModal('leave')}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 text-[#08709d] active:scale-95 transition-transform"
        >
          <Calendar size={18} />
          <span className="text-[10px] font-bold">Leave</span>
        </button>
        <button
          type="button"
          onClick={() => openModal('ot')}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 text-[#5eb63b] active:scale-95 transition-transform"
        >
          <Clock size={18} />
          <span className="text-[10px] font-bold">OT Claim</span>
        </button>
        <button
          type="button"
          onClick={() => openModal('duty')}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 text-[#0284c7] active:scale-95 transition-transform"
        >
          <CalendarDays size={18} />
          <span className="text-[10px] font-bold">Swap</span>
        </button>
        <button
          type="button"
          onClick={() => openModal('notice')}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 text-[#6366f1] active:scale-95 transition-transform"
        >
          <Megaphone size={18} />
          <span className="text-[10px] font-bold">Notice</span>
        </button>
      </div>

      {/* ════════════════════════ MODALS (Responsive Bottom-Sheet on Mobile) ════════════════════════ */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-[#1a294a]/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Card (Bottom Sheet style on mobile, rounded card on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[92vh] sm:max-h-[88vh] flex flex-col"
            >
              {/* Mobile Grab Handle Bar */}
              <div className="sm:hidden flex justify-center pt-2 pb-1 bg-white">
                <div className="w-10 h-1.5 bg-slate-300 rounded-full" />
              </div>

              {/* Top Accent Stripe */}
              <div className="h-1 sm:h-1.5 bg-gradient-to-r from-[#1a294a] via-[#08709d] to-[#5eb63b] shrink-0" />

              <div className="overflow-y-auto p-4 sm:p-7 flex flex-col gap-4 sm:gap-5">

                {/* ── 1. LEAVE MODAL (APPLY) ── */}
                {activeModal === 'leave' && (
                  <form
                    onSubmit={e => submitForm(e, 'leave', {
                      staffName, staffId, staffDep, staffPosition,
                      leaveType, leaveStart, leaveEnd, reason: leaveReason
                    })}
                    className="flex flex-col gap-3.5 sm:gap-4 text-left"
                  >
                    <ModalHeader title="Apply for Leave" icon={<Calendar size={18} />} color="#08709d" onClose={closeModal} />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Full Name">
                        <input className={inputCls} required value={staffName} onChange={e => setStaffName(e.target.value)} />
                      </Field>
                      <Field label="Staff ID">
                        <input className={inputCls} required value={staffId} onChange={e => setStaffId(e.target.value)} />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Department">
                        <input className={inputCls} required value={staffDep} onChange={e => setStaffDep(e.target.value)} />
                      </Field>
                      <Field label="Position">
                        <input className={inputCls} required value={staffPosition} onChange={e => setStaffPosition(e.target.value)} />
                      </Field>
                    </div>

                    <Field label="Leave Category">
                      <div className="relative">
                        <select className={`${inputCls} appearance-none pr-9 cursor-pointer`} value={leaveType} onChange={e => setLeaveType(e.target.value)}>
                          {['Annual Leave', 'Sick Leave', 'Casual Leave', 'Emergency Leave', 'Unpaid Leave', 'Maternity/Paternity Leave'].map(o => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                      </div>
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Start Date">
                        <input type="date" className={inputCls} required value={leaveStart} onChange={e => setLeaveStart(e.target.value)} />
                      </Field>
                      <Field label="End Date">
                        <input type="date" className={inputCls} required value={leaveEnd} onChange={e => setLeaveEnd(e.target.value)} />
                      </Field>
                    </div>

                    {leaveStart && leaveEnd && (
                      <div className="bg-sky-50 border border-sky-200 rounded-xl p-2.5 sm:p-3 text-center text-xs text-sky-800 font-semibold">
                        Total leave duration: <span className="font-extrabold text-[#08709d]">{calculateDays(leaveStart, leaveEnd)}</span>
                      </div>
                    )}

                    <Field label="Reason / Cover Plan">
                      <textarea
                        className={inputCls}
                        required
                        placeholder="State reason and handover arrangements…"
                        value={leaveReason}
                        onChange={e => setLeaveReason(e.target.value)}
                        rows={3}
                      />
                    </Field>

                    <FileUpload label="Supporting Medical/Travel Doc (Optional)" file={leaveFile} onFile={() => leaveFileRef.current.click()} onClear={() => setLeaveFile(null)} />
                    <input type="file" ref={leaveFileRef} className="hidden" onChange={e => setLeaveFile(e.target.files[0])} />

                    <ModalFooter color="#08709d" label="Submit Leave Application" onCancel={closeModal} />
                  </form>
                )}

                {/* ── 2. VIEW LEAVE FULL DETAILS MODAL ── */}
                {activeModal === 'viewLeave' && selectedLeave && (
                  <div className="flex flex-col gap-3.5 sm:gap-4 text-left">
                    <ModalHeader title="Leave Application Details" icon={<Calendar size={18} />} color="#08709d" onClose={closeModal} />

                    {/* Status & Duration Banner */}
                    <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50/50 border border-sky-100 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 flex-wrap shadow-2xs">
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Current Status
                        </span>
                        <Badge label={selectedLeave.status || 'Pending'} />
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Duration
                        </span>
                        <span className="text-xs sm:text-base font-extrabold text-[#08709d] bg-white px-2.5 sm:px-3 py-1 rounded-xl border border-sky-100 shadow-2xs">
                          {calculateDays(selectedLeave.leaveStart, selectedLeave.leaveEnd)}
                        </span>
                      </div>
                    </div>

                    {/* Leave Date Range highlight block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5">
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                          <CalendarDays size={13} className="text-[#08709d]" /> Start Date
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#1a294a] block">
                          {selectedLeave.leaveStart ? new Date(selectedLeave.leaveStart).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                        </span>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 sm:p-3.5">
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                          <CalendarDays size={13} className="text-[#08709d]" /> End Date
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#1a294a] block">
                          {selectedLeave.leaveEnd ? new Date(selectedLeave.leaveEnd).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                        </span>
                      </div>
                    </div>

                    {/* Staff & Department Metadata */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5">
                      <div>
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Staff Name</span>
                        <span className="font-bold text-slate-700 text-xs sm:text-sm">{selectedLeave.staffName || currentUser?.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Staff ID</span>
                        <span className="font-bold font-mono text-[#08709d] text-xs sm:text-sm">{selectedLeave.staffId || currentUser?.id}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Department</span>
                        <span className="font-bold text-slate-700 text-xs">{selectedLeave.staffDep || currentUser?.department || 'Clinical'}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Leave Category</span>
                        <span className="font-bold text-slate-700 text-xs">{selectedLeave.leaveType}</span>
                      </div>
                    </div>

                    {/* Reason / Handover Arrangements */}
                    <div>
                      <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Reason & Handover Cover Plan
                      </span>
                      <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                        {selectedLeave.reason || 'No additional notes provided with this application.'}
                      </div>
                    </div>

                    {/* Submitted Timestamp */}
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 border-t border-slate-100 pt-2.5">
                      <span>Submitted: {new Date(selectedLeave.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="text-slate-500 font-semibold">Corx HR</span>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-1">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#08709d] text-white text-xs font-bold cursor-pointer hover:bg-[#065679] transition-all shadow-xs"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                )}

                {/* ── 3. OT CLAIM MODAL ── */}
                {activeModal === 'ot' && (
                  <form
                    onSubmit={e => submitForm(e, 'ot', {
                      staffName, staffId, staffDep, staffPosition,
                      otType, otDate, otHours, description: otDescription
                    })}
                    className="flex flex-col gap-3.5 sm:gap-4 text-left"
                  >
                    <ModalHeader title="Apply for OT" icon={<Clock size={18} />} color="#5eb63b" onClose={closeModal} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Full Name"><input className={inputCls} required value={staffName} onChange={e => setStaffName(e.target.value)} /></Field>
                      <Field label="Staff ID"><input className={inputCls} required value={staffId} onChange={e => setStaffId(e.target.value)} /></Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Department"><input className={inputCls} required value={staffDep} onChange={e => setStaffDep(e.target.value)} /></Field>
                      <Field label="Position"><input className={inputCls} required value={staffPosition} onChange={e => setStaffPosition(e.target.value)} /></Field>
                    </div>

                    <Field label="Shift Type">
                      <div className="relative">
                        <select className={`${inputCls} appearance-none pr-9 cursor-pointer`} value={otType} onChange={e => setOtType(e.target.value)}>
                          {['Day Shift Extension', 'Night Shift', 'Weekend Clinical Duty', 'Emergency On-Call Duty', 'Home Visit Overtime'].map(o => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                      </div>
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Date of Duty">
                        <input type="date" className={inputCls} required value={otDate} onChange={e => setOtDate(e.target.value)} />
                      </Field>
                      <Field label="Hours Worked">
                        <input type="number" step="0.5" min="0.5" max="24" placeholder="e.g. 4.5" className={inputCls} required value={otHours} onChange={e => setOtHours(e.target.value)} />
                      </Field>
                    </div>

                    <Field label="Shift / Patient Activity Summary">
                      <textarea
                        className={inputCls}
                        required
                        placeholder="Details of the overtime duty and supervisor confirmation…"
                        value={otDescription}
                        onChange={e => setOtDescription(e.target.value)}
                        rows={3}
                      />
                    </Field>

                    <FileUpload label="Shift Logsheet / Proof (Optional)" file={otFile} onFile={() => otFileRef.current.click()} onClear={() => setOtFile(null)} accentColor="#5eb63b" />
                    <input type="file" ref={otFileRef} className="hidden" onChange={e => setOtFile(e.target.files[0])} />

                    <ModalFooter color="#5eb63b" label="Submit OT Claim" onCancel={closeModal} />
                  </form>
                )}

                {/* ── 4. DUTY SCHEDULE MODAL ── */}
                {activeModal === 'duty' && (
                  <form
                    onSubmit={e => submitForm(e, 'duty', {
                      staffId, staffName,
                      dutyDate, dutyReplacement, dutyReason
                    })}
                    className="flex flex-col gap-3.5 sm:gap-4 text-left"
                  >
                    <ModalHeader title="Duty Schedule Swap" icon={<CalendarDays size={18} />} color="#0284c7" onClose={closeModal} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Scheduled Duty Date">
                        <input type="date" className={inputCls} required value={dutyDate} onChange={e => setDutyDate(e.target.value)} />
                      </Field>
                      <Field label="Replacement Staff Name">
                        <input type="text" className={inputCls} required placeholder="Name of covering nurse / doctor" value={dutyReplacement} onChange={e => setDutyReplacement(e.target.value)} />
                      </Field>
                    </div>

                    <Field label="Reason / Handover Details">
                      <textarea
                        className={inputCls}
                        required
                        placeholder="Provide details for duty shift swap or replacement request…"
                        value={dutyReason}
                        onChange={e => setDutyReason(e.target.value)}
                        rows={3}
                      />
                    </Field>

                    <ModalFooter color="#0284c7" label="Submit Duty Request" onCancel={closeModal} />
                  </form>
                )}

                {/* ── 5. STAFF NOTICE MODAL ── */}
                {activeModal === 'notice' && (
                  <form
                    onSubmit={e => submitForm(e, 'notice', {
                      staffId, staffName,
                      title: noticeTitle,
                      content: noticeMessage,
                      priority: noticePriority,
                      targetAudience: noticeTargetAudience
                    })}
                    className="flex flex-col gap-3.5 sm:gap-4 text-left"
                  >
                    <ModalHeader title="Submit Staff Notice" icon={<Megaphone size={18} />} color="#6366f1" onClose={closeModal} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Notice Category">
                        <div className="relative">
                          <select className={`${inputCls} appearance-none pr-9 cursor-pointer`} value={noticeCategory} onChange={e => setNoticeCategory(e.target.value)}>
                            {['Internal Staff Notice', 'Clinical Shift Handover', 'Duty Replacement Note', 'Departmental Update', 'General Request'].map(o => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                        </div>
                      </Field>

                      <Field label="Priority / Urgency">
                        <div className="relative">
                          <select className={`${inputCls} appearance-none pr-9 cursor-pointer`} value={noticePriority} onChange={e => setNoticePriority(e.target.value)}>
                            <option value="normal">🟢 Normal Notice</option>
                            <option value="important">🟡 Important</option>
                            <option value="urgent">🔴 Urgent Announcement</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                        </div>
                      </Field>
                    </div>

                    <Field label="Notice Title / Headline">
                      <input
                        className={inputCls}
                        required
                        placeholder="e.g. Shift Handover for ICU, Duty Swap Request"
                        value={noticeTitle}
                        onChange={e => setNoticeTitle(e.target.value)}
                      />
                    </Field>

                    <Field label="Target Audience">
                      <div className="relative">
                        <select className={`${inputCls} appearance-none pr-9 cursor-pointer`} value={noticeTargetAudience} onChange={e => setNoticeTargetAudience(e.target.value)}>
                          <option value="all">📢 Broadcast to All Staff</option>
                          <option value="specific_dept">🏢 My Department Only</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                      </div>
                    </Field>

                    <Field label="Notice Content / Message">
                      <textarea
                        className={inputCls}
                        required
                        placeholder="Write your notice details clearly for colleagues and administration…"
                        value={noticeMessage}
                        onChange={e => setNoticeMessage(e.target.value)}
                        rows={3}
                      />
                    </Field>

                    <FileUpload label="Attachment (Optional)" file={noticeFile} onFile={() => noticeFileRef.current.click()} onClear={() => setNoticeFile(null)} accentColor="#6366f1" />
                    <input type="file" ref={noticeFileRef} className="hidden" onChange={e => setNoticeFile(e.target.files[0])} />

                    <ModalFooter color="#6366f1" label="Publish Staff Notice" onCancel={closeModal} />
                  </form>
                )}

                {/* ── 6. SALARY REVIEW MODAL ── */}
                {activeModal === 'salary' && (
                  <form
                    onSubmit={e => submitForm(e, 'salary', {
                      staffName, staffId, staffDep, staffPosition, incType, justification: incJustification
                    })}
                    className="flex flex-col gap-3.5 sm:gap-4 text-left"
                  >
                    <ModalHeader title="Salary Increment Review" icon={<TrendingUp size={18} />} color="#1a294a" onClose={closeModal} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      <Field label="Full Name"><input className={inputCls} required value={staffName} onChange={e => setStaffName(e.target.value)} /></Field>
                      <Field label="Staff ID"><input className={inputCls} required value={staffId} onChange={e => setStaffId(e.target.value)} /></Field>
                    </div>

                    <Field label="Appraisal Type">
                      <div className="relative">
                        <select className={`${inputCls} appearance-none pr-9 cursor-pointer`} value={incType} onChange={e => setIncType(e.target.value)}>
                          {['Merit-Based Performance Review', 'DHA License Upgrade Alignment', 'Senior Position Promotion', 'Market Adjustment Alignment'].map(o => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                      </div>
                    </Field>

                    <Field label="Key Accomplishments">
                      <textarea
                        className={inputCls}
                        required
                        placeholder="Detail your clinical milestones, patient feedback, and achievements…"
                        value={incJustification}
                        onChange={e => setIncJustification(e.target.value)}
                        rows={3}
                      />
                    </Field>

                    <FileUpload label="DHA Certs / Credentials (Optional)" file={incFile} onFile={() => incFileRef.current.click()} onClear={() => setIncFile(null)} accentColor="#1a294a" />
                    <input type="file" ref={incFileRef} className="hidden" onChange={e => setIncFile(e.target.files[0])} />

                    <ModalFooter color="#1a294a" label="Submit Appraisal Review" onCancel={closeModal} />
                  </form>
                )}

                {/* ── 7. VIEW NOTICE FULL DETAILS MODAL ── */}
                {activeModal === 'viewNotice' && selectedNotice && (
                  <div className="flex flex-col gap-3.5 sm:gap-4 text-left">
                    <ModalHeader title="Notice Details" icon={<Megaphone size={18} />} color="#08709d" onClose={closeModal} />

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge label={selectedNotice.priority || 'Normal'} />
                      <span className="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {selectedNotice.targetAudience === 'all' ? '📢 All Staff' : '🏢 Departmental'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-lg font-black text-[#1a294a] mb-1.5">
                        {selectedNotice.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-400 pb-2.5 border-b border-slate-100 font-medium">
                        <span className="flex items-center gap-1">
                          <User size={12} className="text-[#08709d]" />
                          By: <strong className="text-slate-700">{selectedNotice.staffName || 'Admin'}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-[#08709d]" />
                          {selectedNotice.submittedAt ? new Date(selectedNotice.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Recently'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3.5 sm:p-4 border border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                      {selectedNotice.content}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          toggleAcknowledgeNotice(selectedNotice.id);
                          closeModal();
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#08709d] text-white text-xs font-bold cursor-pointer hover:bg-[#065679] transition-all shadow-xs"
                      >
                        Acknowledge & Close
                      </button>
                    </div>
                  </div>
                )}

                {/* ── 8. VIEW SALARY SLIP FULL MODAL ── */}
                {activeModal === 'viewSalarySlip' && selectedSalarySlip && (
                  <div className="flex flex-col gap-3.5 sm:gap-4 text-left">
                    <ModalHeader title="Monthly Salary Slip" icon={<Receipt size={18} />} color="#059669" onClose={closeModal} />

                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Official Monthly Slip
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 font-mono">
                        Issued: {selectedSalarySlip.submittedAt ? new Date(selectedSalarySlip.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Recently'}
                      </span>
                    </div>

                    {selectedSalarySlip.description && (
                      <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                        {selectedSalarySlip.description}
                      </div>
                    )}

                    {selectedSalarySlip.image && (
                      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900/5 p-1.5 flex flex-col items-center justify-center">
                        <img
                          src={selectedSalarySlip.image.startsWith('http') ? selectedSalarySlip.image : `${API_BASE_URL}${selectedSalarySlip.image.startsWith('/') ? '' : '/'}${selectedSalarySlip.image}`}
                          alt="Monthly Salary Slip"
                          className="max-h-[55vh] sm:max-h-[65vh] w-auto rounded-xl object-contain shadow-sm"
                        />
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
                      {selectedSalarySlip.image && (
                        <a
                          href={selectedSalarySlip.image.startsWith('http') ? selectedSalarySlip.image : `${API_BASE_URL}${selectedSalarySlip.image.startsWith('/') ? '' : '/'}${selectedSalarySlip.image}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5"
                        >
                          <ExternalLink size={14} /> Open Full Size / Download
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={closeModal}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold cursor-pointer hover:bg-slate-700 transition-all shadow-xs"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {/* ── 9. VIEW DRIVER TRIP SCHEDULE FULL MODAL ── */}
                {activeModal === 'viewSchedule' && selectedSchedule && (
                  <div className="flex flex-col gap-3.5 sm:gap-4 text-left">
                    <ModalHeader title="Trip & Driver Schedule" icon={<Car size={18} />} color="#08709d" onClose={closeModal} />

                    <div className="flex items-center justify-between gap-2 flex-wrap bg-sky-50/80 p-3 rounded-2xl border border-sky-100">
                      <div>
                        <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Assigned Driver</div>
                        <div className="text-sm font-black text-[#1a294a]">{selectedSchedule.driver_name || 'Driver'}</div>
                        {selectedSchedule.driver_phone && <div className="text-xs text-slate-500 font-medium">📞 {selectedSchedule.driver_phone}</div>}
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Vehicle & Date</div>
                        <div className="text-xs font-bold text-slate-700">{selectedSchedule.vehicle_info || 'Standard Vehicle'}</div>
                        <div className="text-xs font-bold font-mono text-[#08709d]">📅 {selectedSchedule.schedule_date || 'Date TBD'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] sm:text-xs font-bold text-[#08709d] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Status: {selectedSchedule.status || 'Scheduled'}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                        Total {selectedSchedule.route_stops ? selectedSchedule.route_stops.length : 0} Trip Legs / Stops
                      </span>
                    </div>

                    {/* Full Route Itinerary */}
                    <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1">
                      {selectedSchedule.route_stops && selectedSchedule.route_stops.length > 0 ? (
                        selectedSchedule.route_stops.map((st, idx) => (
                          <div key={st.id || idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex flex-col gap-2.5">
                            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
                              <span className="text-xs font-black text-[#08709d]">Stop #{st.stop_order || (idx + 1)}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                                {st.status || 'Scheduled'}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {/* Pick up */}
                              <div className="bg-sky-50/80 border border-sky-100/90 p-2.5 rounded-xl">
                                <div className="font-bold text-sky-900">🛫 Pick-up: {st.source_location}</div>
                                {st.source_time && <div className="text-[11px] text-sky-700 font-semibold mt-0.5">⏰ Departure: {st.source_time}</div>}
                                {((st.staff_passengers_details && st.staff_passengers_details.length > 0) || st.staff_passenger_name) && (
                                  <div className="mt-2">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800 mb-1">👥 Staff to Pick Up:</div>
                                    <div className="flex flex-wrap gap-1">
                                      {(st.staff_passengers_details && st.staff_passengers_details.length > 0 ? st.staff_passengers_details : [{ id: 'p', name: st.staff_passenger_name }]).map((p, pIdx) => (
                                        <span key={p.id || p.staff_id || pIdx} className="bg-white border border-sky-200 text-sky-900 px-1.5 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                                          👤 {p.full_name || p.name || p.staff_name} {p.department ? `(${p.department})` : ''}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Drop off */}
                              <div className="bg-emerald-50/80 border border-emerald-100/90 p-2.5 rounded-xl">
                                <div className="font-bold text-emerald-900">🛬 Drop-off: {st.destination_location}</div>
                                {st.destination_time && <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">⏰ Arrival: {st.destination_time}</div>}
                                {((st.staff_dropoffs_details && st.staff_dropoffs_details.length > 0) || (st.staff_passengers_details && st.staff_passengers_details.length > 0) || st.staff_passenger_name) && (
                                  <div className="mt-2">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">👥 Staff to Drop Off:</div>
                                    <div className="flex flex-wrap gap-1">
                                      {(st.staff_dropoffs_details && st.staff_dropoffs_details.length > 0 ? st.staff_dropoffs_details : (st.staff_passengers_details && st.staff_passengers_details.length > 0 ? st.staff_passengers_details : [{ id: 'd', name: st.staff_passenger_name }])).map((d, dIdx) => (
                                        <span key={d.id || d.staff_id || dIdx} className="bg-white border border-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                                          👥 {d.full_name || d.name || d.staff_name} {d.department ? `(${d.department})` : ''}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {st.notes && (
                              <div className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                                📝 <strong>Instructions:</strong> {st.notes}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 italic p-3 text-center">No route stops configured.</div>
                      )}
                    </div>

                    <div className="flex items-center justify-end pt-1">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#08709d] text-white text-xs font-bold cursor-pointer hover:bg-[#065679] transition-all shadow-xs"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                )}


              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

/* ── Shared Modal Sub-components ─────────────────────────────────────────── */
const ModalHeader = ({ title, icon, color, onClose }) => (
  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#1a294a]">
        {title}
      </h3>
    </div>
    <button
      type="button"
      onClick={onClose}
      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-400 flex items-center justify-center transition-all cursor-pointer"
    >
      <X size={15} />
    </button>
  </div>
);

const ModalFooter = ({ color, label, onCancel }) => (
  <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-3 border-t border-slate-100">
    <motion.button
      type="submit"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:flex-1 h-11 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
      style={{ backgroundColor: color }}
    >
      <Send size={14} />
      <span>{label}</span>
    </motion.button>
    <button
      type="button"
      onClick={onCancel}
      className="w-full sm:w-auto px-5 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs sm:text-sm font-bold cursor-pointer transition-all"
    >
      Cancel
    </button>
  </div>
);

export default StaffDashboard;
