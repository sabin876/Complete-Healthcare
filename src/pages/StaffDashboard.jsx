import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Calendar, Clock, CreditCard, ChevronDown, CheckCircle2, X,
  Paperclip, ArrowUpRight, Bell, Sun, Moon, Zap, TrendingUp,
  LayoutDashboard, FileText, ClipboardList, Bell as BellIcon,
  RefreshCw, ChevronRight, Menu, AlertCircle, CalendarDays, User, Flag,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.webp';

/* ── Brand palette ──────────────────────────────────────────────────────── */
const B = {
  primary:    '#08709d',
  secondary:  '#1a294a',
  accent:     '#5eb63b',
  bg:         '#F8F9FA',
  white:      '#FFFFFF',
  border:     '#E8EDF2',
  muted:      '#6B7A90',
  lightBlue:  '#EBF5FA',
  lightGreen: '#EDF8E7',
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
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});

const calculateDays = (start, end) => {
  if (!start || !end) return '—';
  const s = new Date(start), e = new Date(end);
  if (isNaN(s) || isNaN(e)) return '—';
  const d = Math.ceil((e - s) / 86400000) + 1;
  return d > 0 ? `${d} day${d !== 1 ? 's' : ''}` : '0 days';
};

/* ── Nav items ───────────────────────────────────────────────────────────── */
const NAV = [
  { id: 'dashboard',   label: 'Dashboard',              icon: LayoutDashboard },
  { id: 'leave',       label: 'Leave Report',            icon: Calendar        },
  { id: 'ot',          label: 'OT Report',               icon: Clock           },
  { id: 'salary',      label: 'Salary Increment Report', icon: TrendingUp      },
  { id: 'notice',      label: 'Notice Report',           icon: BellIcon        },
  { id: 'duty',        label: 'Duty Replacement Report', icon: RefreshCw       },
  { id: 'tasks',       label: 'My Tasks',                icon: ClipboardList   },
];

/* ── Form helpers ────────────────────────────────────────────────────────── */
const inputCls = "w-full border border-[#E8EDF2] focus:border-[#08709d] focus:outline-none focus:ring-2 focus:ring-[#08709d]/10 transition-all px-4 py-3 rounded-xl bg-white text-[#1a294a] text-sm placeholder:text-[#6B7A90]/50";
const inputStyle = { height: '48px' };

const Field = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '11px', fontWeight: 600, color: B.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      {label}
    </label>
    {children}
  </div>
);

const FileUpload = ({ label, file, onFile, onClear, accentColor = B.primary }) => (
  <Field label={label}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <button type="button" onClick={onFile}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: `1.5px dashed ${file ? accentColor : B.border}`, borderRadius: '10px', color: file ? accentColor : B.muted, fontSize: '13px', fontWeight: 500, background: 'white', cursor: 'pointer', transition: 'all 0.2s' }}>
        <Paperclip size={14} />{file ? 'Change File' : 'Attach File'}
      </button>
      {file && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: B.bg, border: `1px solid ${B.border}`, padding: '4px 12px', borderRadius: '8px', fontSize: '12px', color: B.muted }}>
          <span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
          <button type="button" onClick={onClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: B.muted, padding: '2px', display: 'flex' }}><X size={12} /></button>
        </div>
      )}
    </div>
  </Field>
);

/* ── Status badge ────────────────────────────────────────────────────────── */
const STATUS_CFG = {
  Pending:      { color: '#e67e22', bg: '#FEF3E2' },
  'In Progress':{ color: B.primary, bg: B.lightBlue },
  Completed:    { color: B.accent,  bg: B.lightGreen },
};

const PRIORITY_CFG = {
  Low:    { color: B.accent,   bg: B.lightGreen },
  Medium: { color: '#e67e22',  bg: '#FEF3E2' },
  High:   { color: '#dc3545',  bg: '#FFF5F5' },
};

/* ── Report empty state ──────────────────────────────────────────────────── */
const EmptyState = ({ icon: Icon, text }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '56px 24px', textAlign: 'center' }}>
    <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: B.lightBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
      <Icon size={28} style={{ color: B.primary, opacity: 0.5 }} />
    </div>
    <p style={{ color: B.muted, fontSize: '14px', fontWeight: 400, lineHeight: 1.6 }}>{text}</p>
  </div>
);

/* ── Report table wrapper ─────────────────────────────────────────────────── */
const ReportTable = ({ headers, rows, emptyIcon, emptyText, onApply, applyLabel }) => (
  <div style={{ background: B.white, border: `1.5px solid ${B.border}`, borderRadius: '18px', overflow: 'hidden' }}>
    {/* Table header bar */}
    <div style={{ padding: '16px 24px', borderBottom: `1.5px solid ${B.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: B.bg }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: B.secondary }}>{rows.length} record{rows.length !== 1 ? 's' : ''}</span>
      {onApply && (
        <button onClick={onApply}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 16px', borderRadius: '10px', background: B.primary, color: 'white', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s', boxShadow: `0 3px 10px ${B.primary}30` }}
          onMouseEnter={e => e.currentTarget.style.background = '#065f85'}
          onMouseLeave={e => e.currentTarget.style.background = B.primary}>
          <ArrowUpRight size={14} /> {applyLabel || 'Apply'}
        </button>
      )}
    </div>

    {rows.length === 0 ? (
      <EmptyState icon={emptyIcon} text={emptyText} />
    ) : (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1.5px solid ${B.border}`, background: B.bg }}>
              {headers.map(h => (
                <th key={h} style={{ textAlign: 'left', fontSize: '10px', fontWeight: 600, color: B.muted, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 20px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((row, i) => (
                <motion.tr key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  style={{ borderBottom: `1px solid ${B.border}`, transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = B.lightBlue + '55'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {row}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const Td = ({ children, mono }) => (
  <td style={{ padding: '13px 20px', fontSize: '13px', color: mono ? B.primary : B.secondary, fontWeight: mono ? 500 : 400, fontFamily: mono ? 'monospace' : undefined }}>{children}</td>
);

const Badge = ({ label, color, bg }) => (
  <span style={{ background: bg, color, border: `1px solid ${color}30`, fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</span>
);

/* ══════════════════════════════════════════════════════════════════════════
   Staff Dashboard
══════════════════════════════════════════════════════════════════════════ */
const StaffDashboard = () => {
  const navigate  = useNavigate();
  const {
    currentUser, logout, getTasksForStaff, updateTaskStatus,
    leaveApplications, createLeaveApplication,
    otApplications, createOtApplication,
    salaryApplications, createSalaryApplication,
    noticeApplications, createNoticeApplication,
    dutyApplications, createDutyApplication,
  } = useAuth();

  /* ── Route guard ── */
  if (!currentUser)                    { navigate('/portal', { replace: true }); return null; }
  if (currentUser.role === 'admin')    { navigate('/portal/admin', { replace: true }); return null; }

  const [activeNav,    setActiveNav]    = useState('dashboard');
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [activeModal,  setActiveModal]  = useState(null);
  const [successMsg,   setSuccessMsg]   = useState(null);

  /* ── Leave form ── */
  const [leaveType,  setLeaveType]  = useState('Annual Leave');
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd,   setLeaveEnd]   = useState('');
  const [leaveFile,  setLeaveFile]  = useState(null);
  const leaveFileRef = useRef(null);

  /* ── OT form ── */
  const [otType,  setOtType]  = useState('Day Shift');
  const [otDate,  setOtDate]  = useState('');
  const [otHours, setOtHours] = useState('');
  const [otFile,  setOtFile]  = useState(null);
  const otFileRef = useRef(null);

  /* ── Salary form ── */
  const [incType,  setIncType]  = useState('Merit-Based Performance Review');
  const [incFile,  setIncFile]  = useState(null);
  const incFileRef = useRef(null);

  /* ── Notice form ── */
  const [noticeTitle,   setNoticeTitle]   = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');

  /* ── Duty Replacement form ── */
  const [dutyDate,        setDutyDate]        = useState('');
  const [dutyReplacement, setDutyReplacement] = useState('');
  const [dutyReason,      setDutyReason]      = useState('');

  /* ── Shared staff fields ── */
  const [staffName,     setStaffName]     = useState(currentUser?.name || '');
  const [staffId,       setStaffId]       = useState(currentUser?.id   || '');
  const [staffDep,      setStaffDep]      = useState(currentUser?.department || '');
  const [staffPosition, setStaffPosition] = useState(currentUser?.position   || '');

  const handleLogout = () => { logout(); navigate('/portal'); };

  const openModal  = (type) => setActiveModal(type);
  const closeModal = () => {
    setActiveModal(null);
    setLeaveStart(''); setLeaveEnd(''); setLeaveFile(null);
    setOtDate(''); setOtHours(''); setOtFile(null);
    setIncFile(null);
    setNoticeTitle(''); setNoticeMessage('');
    setDutyDate(''); setDutyReplacement(''); setDutyReason('');
  };

  const submitForm = (e, type, record) => {
    e.preventDefault();
    if (type === 'leave')  createLeaveApplication(record);
    if (type === 'ot')     createOtApplication(record);
    if (type === 'salary') createSalaryApplication(record);
    if (type === 'notice') createNoticeApplication(record);
    if (type === 'duty')   createDutyApplication(record);
    closeModal();
    setSuccessMsg('Your request has been submitted to HR successfully.');
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  /* ── Filter report records for current logged-in user ── */
  const myLeaves    = (leaveApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const myOts       = (otApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const mySalaries  = (salaryApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const myNotices   = (noticeApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const myDuties    = (dutyApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());

  const greeting = getGreeting();
  const initials  = getInitials(currentUser?.name);
  const myTasks   = getTasksForStaff ? getTasksForStaff(currentUser?.id) : [];

  /* ── Nav click ── */
  const goTo = (id) => { setActiveNav(id); setSidebarOpen(false); };

  /* ── Sidebar nav item ── */
  const NavItem = ({ item }) => {
    const active = activeNav === item.id;
    return (
      <button onClick={() => goTo(item.id)}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.18s', textAlign: 'left', background: active ? B.primary : 'transparent', color: active ? 'white' : B.muted, fontFamily: "'Poppins',sans-serif" }}>
        <item.icon size={17} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '13px', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
        {active && <ChevronRight size={14} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
      </button>
    );
  };

  /* ── Sidebar ── */
  const Sidebar = ({ mobile }) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 12px', gap: '4px', overflowY: 'auto' }}>
      {/* Logo area */}
      <div style={{ padding: '0 8px 20px', borderBottom: `1px solid ${B.border}`, marginBottom: '8px' }}>
        <img src={logo} alt="Complete Healthcare" style={{ height: '38px', objectFit: 'contain' }} />
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `linear-gradient(135deg, ${B.secondary}, ${B.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 600 }}>
              {initials}
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: B.secondary, margin: 0 }}>{currentUser?.name || 'Staff'}</p>
              <p style={{ fontSize: '10px', color: B.muted, margin: 0 }}>{currentUser?.position || currentUser?.department || 'Staff Member'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      {NAV.map(item => <NavItem key={item.id} item={item} />)}

      {/* Logout at bottom */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: `1px solid ${B.border}` }}>
        <button onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: '#FFF5F5', color: '#dc3545', fontSize: '13px', fontWeight: 500, fontFamily: "'Poppins',sans-serif", transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#FFECEC'}
          onMouseLeave={e => e.currentTarget.style.background = '#FFF5F5'}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );

  /* ── Page title map ── */
  const PAGE_TITLES = {
    dashboard: 'Dashboard',
    leave:     'Leave Report',
    ot:        'OT Report',
    salary:    'Salary Increment Report',
    notice:    'Notice Report',
    duty:      'Duty Replacement Report',
    tasks:     'My Tasks',
  };

  return (
    <div style={{ fontFamily: "'Poppins',sans-serif", minHeight: '100vh', background: B.bg, display: 'flex', flexDirection: 'column' }}>

      {/* Brand stripe */}
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${B.secondary}, ${B.primary}, ${B.accent})`, flexShrink: 0 }} />

      {/* Top header (mobile only shows hamburger) */}
      <header style={{ height: '64px', background: B.white, borderBottom: `1.5px solid ${B.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxShadow: '0 2px 12px rgba(8,112,157,0.06)', flexShrink: 0, position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 600, color: B.secondary, margin: 0 }}>{PAGE_TITLES[activeNav]}</h1>
            <p style={{ fontSize: '11px', color: B.muted, margin: 0 }}>{formatDate()}</p>
          </div>
        </div>
        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Right: greeting pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: B.lightBlue, border: `1px solid ${B.primary}20`, padding: '6px 14px 6px 6px', borderRadius: '999px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `linear-gradient(135deg, ${B.secondary}, ${B.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 600 }}>
              {initials}
            </div>
            <span style={{ fontSize: '12px', fontWeight: 500, color: B.secondary }} className="hidden sm:inline">
              <greeting.Icon size={12} style={{ display: 'inline', marginRight: '4px', color: B.primary }} />
              {greeting.text}
            </span>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setSidebarOpen(p => !p)} className="lg:hidden"
            style={{ width: '36px', height: '36px', borderRadius: '10px', background: B.lightBlue, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: B.primary }}>
            <Menu size={18} />
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Mobile Sidebar Drawer ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(26,41,74,0.4)', zIndex: 40, backdropFilter: 'blur(4px)' }} />
              <motion.aside initial={{ x: 260 }} animate={{ x: 0 }} exit={{ x: 260 }} transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '260px', background: B.white, zIndex: 50, boxShadow: '-4px 0 30px rgba(26,41,74,0.15)', overflowY: 'auto' }}>
                <Sidebar mobile />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 48px' }}>

          {/* Success toast */}
          <AnimatePresence>
            {successMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ background: B.lightGreen, border: `1px solid ${B.accent}40`, color: B.accent, padding: '13px 18px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 500, marginBottom: '20px' }}>
                <CheckCircle2 size={16} style={{ flexShrink: 0 }} />{successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══════════ DASHBOARD HOME ═══════════ */}
          {activeNav === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              {/* Greeting */}
              <div style={{ marginBottom: '28px' }}>
                <p style={{ fontSize: '13px', color: B.muted, marginBottom: '4px' }}>
                  <greeting.Icon size={13} style={{ display: 'inline', marginRight: '6px', color: B.primary }} />
                  {greeting.text}
                </p>
                <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, color: B.secondary, margin: 0 }}>
                  Hey, {currentUser?.name?.split(' ')[0] || 'there'}! 👋
                </h2>
              </div>

              {/* Quick-action cards */}
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: B.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Quick Actions</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" style={{ marginBottom: '32px' }}>
                {[
                  { modal: 'leave',  color: B.primary,   bg: B.lightBlue,  icon: <Calendar size={22} />,  label: 'Apply for Leave',     sub: 'Submit annual, sick or emergency leave' },
                  { modal: 'ot',     color: B.accent,    bg: B.lightGreen, icon: <Clock size={22} />,     label: 'Apply for OT',         sub: 'Log overtime and claim shift hours' },
                  { modal: 'salary', color: B.secondary, bg: '#EAECF3',    icon: <TrendingUp size={22} />,label: 'Salary Increment',     sub: 'Submit your appraisal or review' },
                ].map(card => (
                  <motion.div key={card.modal} whileHover={{ y: -4, boxShadow: `0 16px 36px ${card.color}18` }} whileTap={{ scale: 0.98 }}
                    onClick={() => openModal(card.modal)}
                    style={{ background: B.white, border: `1.5px solid ${B.border}`, borderRadius: '18px', padding: '22px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 10px rgba(26,41,74,0.06)', transition: 'all 0.2s' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${card.color}, ${card.color}80)` }} />
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, marginBottom: '14px' }}>{card.icon}</div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: B.secondary, margin: '0 0 4px' }}>{card.label}</p>
                    <p style={{ fontSize: '12px', color: B.muted, margin: '0 0 16px', lineHeight: 1.5 }}>{card.sub}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: card.color }}>
                      Apply now <ArrowUpRight size={13} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Also shortcut to notice & duty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { modal: 'notice', color: '#7c3aed', bg: '#F3EEFF', icon: <BellIcon size={20} />, label: 'Submit a Notice',          sub: 'Send a notice to HR or management' },
                  { modal: 'duty',   color: '#0891b2', bg: '#E0F7FA', icon: <RefreshCw size={20} />,label: 'Duty Replacement Request', sub: 'Request a replacement for your shift' },
                ].map(card => (
                  <motion.div key={card.modal} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
                    onClick={() => openModal(card.modal)}
                    style={{ background: B.white, border: `1.5px solid ${B.border}`, borderRadius: '18px', padding: '20px', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 10px rgba(26,41,74,0.06)', transition: 'all 0.2s' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px', background: card.color }} />
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, flexShrink: 0 }}>{card.icon}</div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: B.secondary, margin: '0 0 2px' }}>{card.label}</p>
                      <p style={{ fontSize: '12px', color: B.muted, margin: 0 }}>{card.sub}</p>
                    </div>
                    <ArrowUpRight size={16} style={{ marginLeft: 'auto', color: B.muted, flexShrink: 0 }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══════════ LEAVE REPORT ═══════════ */}
          {activeNav === 'leave' && (
            <motion.div key="leave" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <SectionHeader title="Leave Report" sub="Track all your leave applications and their status" />
              <ReportTable
                emptyIcon={Calendar} emptyText="No leave applications yet. Click 'Apply' to submit one."
                applyLabel="Apply for Leave" onApply={() => openModal('leave')}
                headers={['Leave Type', 'Start Date', 'End Date', 'Duration', 'Status', 'Submitted']}
                rows={myLeaves.map(r => (
                  <>
                    <Td>{r.leaveType}</Td>
                    <Td>{r.leaveStart}</Td>
                    <Td>{r.leaveEnd}</Td>
                    <Td>{calculateDays(r.leaveStart, r.leaveEnd)}</Td>
                    <td style={{ padding: '13px 20px' }}><Badge label={r.status} color={STATUS_CFG[r.status]?.color || B.muted} bg={STATUS_CFG[r.status]?.bg || B.bg} /></td>
                    <Td>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</Td>
                  </>
                ))}
              />
            </motion.div>
          )}

          {/* ═══════════ OT REPORT ═══════════ */}
          {activeNav === 'ot' && (
            <motion.div key="ot" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <SectionHeader title="OT Report" sub="All your overtime submissions and claim status" />
              <ReportTable
                emptyIcon={Clock} emptyText="No OT claims yet. Click 'Apply' to log your hours."
                applyLabel="Log OT Hours" onApply={() => openModal('ot')}
                headers={['Shift Type', 'Date of Duty', 'OT Hours', 'Status', 'Submitted']}
                rows={myOts.map(r => (
                  <>
                    <Td>{r.otType}</Td>
                    <Td>{r.otDate}</Td>
                    <Td mono>{r.otHours} hrs</Td>
                    <td style={{ padding: '13px 20px' }}><Badge label={r.status} color={STATUS_CFG[r.status]?.color || B.muted} bg={STATUS_CFG[r.status]?.bg || B.bg} /></td>
                    <Td>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</Td>
                  </>
                ))}
              />
            </motion.div>
          )}

          {/* ═══════════ SALARY REPORT ═══════════ */}
          {activeNav === 'salary' && (
            <motion.div key="salary" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <SectionHeader title="Salary Increment Report" sub="Your salary review and appraisal request history" />
              <ReportTable
                emptyIcon={TrendingUp} emptyText="No increment requests yet. Submit your first appraisal."
                applyLabel="Submit Review" onApply={() => openModal('salary')}
                headers={['Appraisal Type', 'Status', 'Submitted']}
                rows={mySalaries.map(r => (
                  <>
                    <Td>{r.incType}</Td>
                    <td style={{ padding: '13px 20px' }}><Badge label={r.status} color={STATUS_CFG[r.status]?.color || B.muted} bg={STATUS_CFG[r.status]?.bg || B.bg} /></td>
                    <Td>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</Td>
                  </>
                ))}
              />
            </motion.div>
          )}

          {/* ═══════════ NOTICE REPORT ═══════════ */}
          {activeNav === 'notice' && (
            <motion.div key="notice" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <SectionHeader title="Notice Report" sub="All notices you have submitted to HR or management" />
              <ReportTable
                emptyIcon={BellIcon} emptyText="No notices submitted yet."
                applyLabel="Submit Notice" onApply={() => openModal('notice')}
                headers={['Notice Title', 'Message Preview', 'Status', 'Submitted']}
                rows={myNotices.map(r => (
                  <>
                    <Td>{r.noticeTitle}</Td>
                    <td style={{ padding: '13px 20px', fontSize: '12px', color: B.muted, maxWidth: '240px' }}>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.noticeMessage}</span>
                    </td>
                    <td style={{ padding: '13px 20px' }}><Badge label={r.status} color={STATUS_CFG[r.status]?.color || B.muted} bg={STATUS_CFG[r.status]?.bg || B.bg} /></td>
                    <Td>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</Td>
                  </>
                ))}
              />
            </motion.div>
          )}

          {/* ═══════════ DUTY REPLACEMENT REPORT ═══════════ */}
          {activeNav === 'duty' && (
            <motion.div key="duty" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <SectionHeader title="Duty Replacement Report" sub="Shift replacement requests and their approval status" />
              <ReportTable
                emptyIcon={RefreshCw} emptyText="No duty replacement requests yet."
                applyLabel="Request Replacement" onApply={() => openModal('duty')}
                headers={['Duty Date', 'Replacement Staff', 'Reason', 'Status', 'Submitted']}
                rows={myDuties.map(r => (
                  <>
                    <Td>{r.dutyDate}</Td>
                    <Td>{r.dutyReplacement}</Td>
                    <td style={{ padding: '13px 20px', fontSize: '12px', color: B.muted, maxWidth: '200px' }}>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.dutyReason}</span>
                    </td>
                    <td style={{ padding: '13px 20px' }}><Badge label={r.status} color={STATUS_CFG[r.status]?.color || B.muted} bg={STATUS_CFG[r.status]?.bg || B.bg} /></td>
                    <Td>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</Td>
                  </>
                ))}
              />
            </motion.div>
          )}

          {/* ═══════════ MY TASKS ═══════════ */}
          {activeNav === 'tasks' && (
            <motion.div key="tasks" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <SectionHeader title="My Tasks" sub="Tasks assigned to you by the admin" />
              {myTasks.length === 0 ? (
                <div style={{ background: B.white, border: `1.5px solid ${B.border}`, borderRadius: '18px' }}>
                  <EmptyState icon={ClipboardList} text="No tasks assigned to you yet. Check back later." />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {myTasks.map((task, i) => {
                    const pc = PRIORITY_CFG[task.priority] || PRIORITY_CFG.Medium;
                    const sc = STATUS_CFG[task.status]    || STATUS_CFG.Pending;
                    return (
                      <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        style={{ background: B.white, border: `1.5px solid ${B.border}`, borderRadius: '16px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(26,41,74,0.05)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                              <span style={{ fontSize: '14px', fontWeight: 600, color: B.secondary }}>{task.title}</span>
                              <Badge label={pc.label} color={pc.color} bg={pc.bg} />
                            </div>
                            {task.description && <p style={{ fontSize: '13px', color: B.muted, margin: '0 0 10px', lineHeight: 1.6 }}>{task.description}</p>}
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                              {task.dueDate && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: B.muted }}>
                                  <CalendarDays size={12} style={{ color: B.primary }} />
                                  Due: {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              )}
                              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: B.muted }}>
                                <User size={12} style={{ color: B.primary }} /> From: {task.assignedByName}
                              </span>
                            </div>
                          </div>
                          {/* Status selector */}
                          <div style={{ position: 'relative', flexShrink: 0 }}>
                            <select value={task.status} onChange={e => updateTaskStatus(task.id, e.target.value)}
                              style={{ height: '36px', paddingLeft: '12px', paddingRight: '28px', borderRadius: '10px', border: `1.5px solid ${sc.color}40`, background: sc.bg, color: sc.color, fontSize: '12px', fontWeight: 600, appearance: 'none', cursor: 'pointer', outline: 'none', fontFamily: "'Poppins',sans-serif" }}>
                              <option>Pending</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                            </select>
                            <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: sc.color }} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </main>

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:block" style={{ width: '240px', background: B.white, borderLeft: `1.5px solid ${B.border}`, flexShrink: 0, overflowY: 'auto' }}>
          <Sidebar />
        </aside>
      </div>

      {/* ════════════════════════ MODALS ════════════════════════ */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}
              style={{ position: 'fixed', inset: 0, background: 'rgba(26,41,74,0.45)', backdropFilter: 'blur(8px)', zIndex: 50 }} />
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }} onClick={e => e.stopPropagation()}
              style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '95%', maxWidth: '540px', background: B.white, borderRadius: '22px', boxShadow: '0 24px 70px rgba(26,41,74,0.18)', zIndex: 51, overflow: 'hidden', maxHeight: '92vh' }}>
              <div style={{ height: '4px', background: `linear-gradient(90deg, ${B.secondary}, ${B.primary}, ${B.accent})` }} />
              <div style={{ overflowY: 'auto', maxHeight: 'calc(92vh - 4px)', padding: '26px 28px 28px' }}>

                {/* ── LEAVE MODAL ── */}
                {activeModal === 'leave' && (
                  <form onSubmit={e => submitForm(e, 'leave', { staffName, staffId, staffDep, staffPosition, leaveType, leaveStart, leaveEnd })} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <ModalHeader title="Apply for Leave" icon={<Calendar size={18} />} color={B.primary} onClose={closeModal} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Name"><input className={inputCls} style={inputStyle} required value={staffName} onChange={e => setStaffName(e.target.value)} placeholder="Full name" /></Field>
                      <Field label="Staff ID"><input className={inputCls} style={inputStyle} required value={staffId} onChange={e => setStaffId(e.target.value)} placeholder="STF-XXXXX" /></Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Department"><input className={inputCls} style={inputStyle} required value={staffDep} onChange={e => setStaffDep(e.target.value)} placeholder="Department" /></Field>
                      <Field label="Position"><input className={inputCls} style={inputStyle} required value={staffPosition} onChange={e => setStaffPosition(e.target.value)} placeholder="Position" /></Field>
                    </div>
                    <Field label="Leave Type">
                      <div style={{ position: 'relative' }}>
                        <select className={inputCls} style={{ ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }} value={leaveType} onChange={e => setLeaveType(e.target.value)}>
                          {['Annual Leave','Sick Leave','Casual Leave','Emergency Leave','Unpaid Leave'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={15} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: B.muted }} />
                      </div>
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Start Date"><input type="date" className={inputCls} style={inputStyle} required value={leaveStart} onChange={e => setLeaveStart(e.target.value)} /></Field>
                      <Field label="End Date"><input type="date" className={inputCls} style={inputStyle} required value={leaveEnd} onChange={e => setLeaveEnd(e.target.value)} /></Field>
                    </div>
                    {leaveStart && leaveEnd && (
                      <div style={{ background: B.lightBlue, border: `1px solid ${B.primary}30`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                        <span style={{ fontSize: '11px', color: B.muted }}>Total duration: </span>
                        <strong style={{ color: B.secondary }}>{calculateDays(leaveStart, leaveEnd)}</strong>
                      </div>
                    )}
                    <Field label="Reason"><textarea className={inputCls} required placeholder="Brief reason for leave…" style={{ minHeight: '90px', height: 'auto', resize: 'none' }} /></Field>
                    <FileUpload label="Supporting Document (optional)" file={leaveFile} onFile={() => leaveFileRef.current.click()} onClear={() => setLeaveFile(null)} />
                    <input type="file" ref={leaveFileRef} className="hidden" onChange={e => setLeaveFile(e.target.files[0])} />
                    <ModalFooter color={B.primary} grad={`linear-gradient(135deg,${B.secondary},${B.primary})`} label="Submit Application" onCancel={closeModal} />
                  </form>
                )}

                {/* ── OT MODAL ── */}
                {activeModal === 'ot' && (
                  <form onSubmit={e => submitForm(e, 'ot', { staffName, staffId, staffDep, staffPosition, otType, otDate, otHours })} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <ModalHeader title="Apply for OT" icon={<Clock size={18} />} color={B.accent} onClose={closeModal} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Name"><input className={inputCls} style={inputStyle} required value={staffName} onChange={e => setStaffName(e.target.value)} /></Field>
                      <Field label="Staff ID"><input className={inputCls} style={inputStyle} required value={staffId} onChange={e => setStaffId(e.target.value)} /></Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Department"><input className={inputCls} style={inputStyle} required value={staffDep} onChange={e => setStaffDep(e.target.value)} /></Field>
                      <Field label="Position"><input className={inputCls} style={inputStyle} required value={staffPosition} onChange={e => setStaffPosition(e.target.value)} /></Field>
                    </div>
                    <Field label="Shift Type">
                      <div style={{ position: 'relative' }}>
                        <select className={inputCls} style={{ ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }} value={otType} onChange={e => setOtType(e.target.value)}>
                          {['Day Shift','Night Shift','Weekend Shift','On-Call Duty','Other'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={15} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: B.muted }} />
                      </div>
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Date of Duty"><input type="date" className={inputCls} style={inputStyle} required value={otDate} onChange={e => setOtDate(e.target.value)} /></Field>
                      <Field label="OT Hours"><input type="number" step="0.5" placeholder="e.g. 4.5" className={inputCls} style={inputStyle} required value={otHours} onChange={e => setOtHours(e.target.value)} /></Field>
                    </div>
                    <Field label="Shift Description"><textarea className={inputCls} required placeholder="Shift extension details…" style={{ minHeight: '90px', height: 'auto', resize: 'none' }} /></Field>
                    <FileUpload label="Shift Proof (optional)" file={otFile} onFile={() => otFileRef.current.click()} onClear={() => setOtFile(null)} accentColor={B.accent} />
                    <input type="file" ref={otFileRef} className="hidden" onChange={e => setOtFile(e.target.files[0])} />
                    <ModalFooter color={B.accent} grad={`linear-gradient(135deg,#3a8a25,${B.accent})`} label="Submit Claim" onCancel={closeModal} />
                  </form>
                )}

                {/* ── SALARY MODAL ── */}
                {activeModal === 'salary' && (
                  <form onSubmit={e => submitForm(e, 'salary', { staffName, staffId, staffDep, staffPosition, incType })} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <ModalHeader title="Salary Increment" icon={<TrendingUp size={18} />} color={B.primary} onClose={closeModal} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Name"><input className={inputCls} style={inputStyle} required value={staffName} onChange={e => setStaffName(e.target.value)} /></Field>
                      <Field label="Staff ID"><input className={inputCls} style={inputStyle} required value={staffId} onChange={e => setStaffId(e.target.value)} /></Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Department"><input className={inputCls} style={inputStyle} required value={staffDep} onChange={e => setStaffDep(e.target.value)} /></Field>
                      <Field label="Position"><input className={inputCls} style={inputStyle} required value={staffPosition} onChange={e => setStaffPosition(e.target.value)} /></Field>
                    </div>
                    <Field label="Appraisal Type">
                      <div style={{ position: 'relative' }}>
                        <select className={inputCls} style={{ ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }} value={incType} onChange={e => setIncType(e.target.value)}>
                          {['Merit-Based Performance Review','Senior Promotion Review','Market Adjustment Alignment','Other'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown size={15} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: B.muted }} />
                      </div>
                    </Field>
                    <Field label="Justification"><textarea className={inputCls} required placeholder="Achievements, DHA certifications, performance highlights…" style={{ minHeight: '90px', height: 'auto', resize: 'none' }} /></Field>
                    <FileUpload label="Supporting Docs / DHA Certs (optional)" file={incFile} onFile={() => incFileRef.current.click()} onClear={() => setIncFile(null)} />
                    <input type="file" ref={incFileRef} className="hidden" onChange={e => setIncFile(e.target.files[0])} />
                    <ModalFooter color={B.primary} grad={`linear-gradient(135deg,${B.secondary},${B.primary})`} label="Submit Review" onCancel={closeModal} />
                  </form>
                )}

                {/* ── NOTICE MODAL ── */}
                {activeModal === 'notice' && (
                  <form onSubmit={e => submitForm(e, 'notice', { staffName, staffId, noticeTitle, noticeMessage })} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <ModalHeader title="Submit Notice" icon={<BellIcon size={18} />} color="#7c3aed" onClose={closeModal} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Your Name"><input className={inputCls} style={inputStyle} required value={staffName} onChange={e => setStaffName(e.target.value)} /></Field>
                      <Field label="Staff ID"><input className={inputCls} style={inputStyle} required value={staffId} onChange={e => setStaffId(e.target.value)} /></Field>
                    </div>
                    <Field label="Notice Title"><input className={inputCls} style={inputStyle} required value={noticeTitle} onChange={e => setNoticeTitle(e.target.value)} placeholder="e.g. Request for Schedule Change" /></Field>
                    <Field label="Notice Message"><textarea className={inputCls} required value={noticeMessage} onChange={e => setNoticeMessage(e.target.value)} placeholder="Write your notice details here…" style={{ minHeight: '110px', height: 'auto', resize: 'none' }} /></Field>
                    <ModalFooter color="#7c3aed" grad="linear-gradient(135deg,#5b21b6,#7c3aed)" label="Submit Notice" onCancel={closeModal} />
                  </form>
                )}

                {/* ── DUTY REPLACEMENT MODAL ── */}
                {activeModal === 'duty' && (
                  <form onSubmit={e => submitForm(e, 'duty', { staffName, staffId, dutyDate, dutyReplacement, dutyReason })} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <ModalHeader title="Duty Replacement Request" icon={<RefreshCw size={18} />} color="#0891b2" onClose={closeModal} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Your Name"><input className={inputCls} style={inputStyle} required value={staffName} onChange={e => setStaffName(e.target.value)} /></Field>
                      <Field label="Staff ID"><input className={inputCls} style={inputStyle} required value={staffId} onChange={e => setStaffId(e.target.value)} /></Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Duty Date"><input type="date" className={inputCls} style={inputStyle} required value={dutyDate} onChange={e => setDutyDate(e.target.value)} /></Field>
                      <Field label="Replacement Staff Name"><input className={inputCls} style={inputStyle} required value={dutyReplacement} onChange={e => setDutyReplacement(e.target.value)} placeholder="Name of replacement" /></Field>
                    </div>
                    <Field label="Reason"><textarea className={inputCls} required value={dutyReason} onChange={e => setDutyReason(e.target.value)} placeholder="Explain why you need a replacement…" style={{ minHeight: '90px', height: 'auto', resize: 'none' }} /></Field>
                    <ModalFooter color="#0891b2" grad="linear-gradient(135deg,#0e7490,#0891b2)" label="Submit Request" onCancel={closeModal} />
                  </form>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Shared modal sub-components ─────────────────────────────────────────── */
const SectionHeader = ({ title, sub }) => (
  <div style={{ marginBottom: '20px' }}>
    <h2 style={{ fontSize: '20px', fontWeight: 700, color: B.secondary, margin: '0 0 4px' }}>{title}</h2>
    <p style={{ fontSize: '13px', color: B.muted, margin: 0 }}>{sub}</p>
  </div>
);

const ModalHeader = ({ title, icon, color, onClose }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${color}12`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <h2 style={{ fontSize: '17px', fontWeight: 600, color: B.secondary, margin: 0 }}>{title}</h2>
    </div>
    <button type="button" onClick={onClose}
      style={{ width: '32px', height: '32px', borderRadius: '8px', background: B.bg, border: `1px solid ${B.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: B.muted, transition: 'all 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#FFF5F5'; e.currentTarget.style.color = '#dc3545'; }}
      onMouseLeave={e => { e.currentTarget.style.background = B.bg; e.currentTarget.style.color = B.muted; }}>
      <X size={14} />
    </button>
  </div>
);

const ModalFooter = ({ color, grad, label, onCancel }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', paddingTop: '4px' }}>
    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      style={{ width: '100%', maxWidth: '280px', height: '50px', background: grad, border: 'none', borderRadius: '14px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: `0 6px 18px ${color}30`, fontFamily: "'Poppins',sans-serif" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
      {label}
    </motion.button>
    <button type="button" onClick={onCancel}
      style={{ width: '100%', maxWidth: '280px', height: '42px', background: 'transparent', border: `1px solid ${B.border}`, borderRadius: '12px', color: B.muted, fontSize: '12px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Poppins',sans-serif" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = B.primary; e.currentTarget.style.color = B.primary; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.color = B.muted; }}>
      Cancel
    </button>
  </div>
);

export default StaffDashboard;
