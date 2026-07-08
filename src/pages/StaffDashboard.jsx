import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Calendar, Clock, ChevronDown, CheckCircle2, X,
  Paperclip, ArrowUpRight, Sun, Moon, Zap, TrendingUp,
  ClipboardList, CalendarDays, User,
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
  } = useAuth();

  const [activeTab,    setActiveTab]    = useState('leave'); // 'leave' | 'ot' | 'salary'
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

  /* ── Shared staff fields ── */
  const [staffName,     setStaffName]     = useState(currentUser?.name || '');
  const [staffId,       setStaffId]       = useState(currentUser?.id   || '');
  const [staffDep,      setStaffDep]      = useState(currentUser?.department || '');
  const [staffPosition, setStaffPosition] = useState(currentUser?.position   || '');

  /* ── Route guard ── */
  if (!currentUser)                    { navigate('/portal', { replace: true }); return null; }
  if (currentUser.role === 'admin')    { navigate('/portal/admin', { replace: true }); return null; }

  const handleLogout = () => { logout(); navigate('/portal'); };

  const openModal  = (type) => setActiveModal(type);
  const closeModal = () => {
    setActiveModal(null);
    setLeaveStart(''); setLeaveEnd(''); setLeaveFile(null);
    setOtDate(''); setOtHours(''); setOtFile(null);
    setIncFile(null);
  };

  const submitForm = (e, type, record) => {
    e.preventDefault();
    if (type === 'leave')  createLeaveApplication(record);
    if (type === 'ot')     createOtApplication(record);
    if (type === 'salary') createSalaryApplication(record);
    closeModal();
    setSuccessMsg('Your request has been submitted to HR successfully.');
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  /* ── Filter report records for current logged-in user ── */
  const myLeaves    = (leaveApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const myOts       = (otApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());
  const mySalaries  = (salaryApplications || []).filter(r => r.staffId?.trim().toLowerCase() === currentUser?.id?.trim().toLowerCase());

  const greeting = getGreeting();
  const initials  = getInitials(currentUser?.name);
  const myTasks   = getTasksForStaff ? getTasksForStaff(currentUser?.id) : [];

  return (
    <div style={{ fontFamily: "'Poppins',sans-serif", minHeight: '100vh', background: B.bg, display: 'flex', flexDirection: 'column' }}>

      {/* Brand stripe */}
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${B.secondary}, ${B.primary}, ${B.accent})`, flexShrink: 0 }} />

      {/* Top Header */}
      <header style={{ height: '64px', background: B.white, borderBottom: `1.5px solid ${B.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxShadow: '0 2px 12px rgba(8,112,157,0.06)', flexShrink: 0, position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={logo} alt="Complete Healthcare" style={{ height: '36px', objectFit: 'contain' }} />
          <div style={{ width: '1px', height: '24px', background: B.border }} />
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 600, color: B.secondary, margin: 0 }}>Staff Portal</h1>
            <p style={{ fontSize: '11px', color: B.muted, margin: 0 }}>{formatDate()}</p>
          </div>
        </div>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Greeting pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: B.lightBlue, border: `1px solid ${B.primary}20`, padding: '6px 14px 6px 6px', borderRadius: '999px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `linear-gradient(135deg, ${B.secondary}, ${B.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 600 }}>
              {initials}
            </div>
            <span style={{ fontSize: '12px', fontWeight: 500, color: B.secondary }} className="hidden sm:inline">
              <greeting.Icon size={12} style={{ display: 'inline', marginRight: '4px', color: B.primary }} />
              {greeting.text}
            </span>
          </div>

          {/* Sign Out Button */}
          <button onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '38px', padding: '0 16px', borderRadius: '10px', background: '#FFF5F5', color: '#dc3545', border: '1px solid #dc354520', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Poppins',sans-serif" }}
            onMouseEnter={e => e.currentTarget.style.background = '#FFECEC'}
            onMouseLeave={e => e.currentTarget.style.background = '#FFF5F5'}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '28px 24px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Success toast */}
          <AnimatePresence>
            {successMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ background: B.lightGreen, border: `1px solid ${B.accent}40`, color: B.accent, padding: '13px 18px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 500 }}>
                <CheckCircle2 size={16} style={{ flexShrink: 0 }} />{successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Banner */}
          <div style={{ background: B.white, border: `1.5px solid ${B.border}`, borderRadius: '24px', padding: '28px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 10px rgba(26,41,74,0.04)' }}>
            <div>
              <p style={{ fontSize: '13px', color: B.muted, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <greeting.Icon size={14} style={{ color: B.primary }} />
                {greeting.text}
              </p>
              <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, color: B.secondary, margin: 0 }}>
                Hey, {currentUser?.name?.split(' ')[0] || 'there'}! 👋
              </h2>
              <p style={{ fontSize: '13px', color: B.muted, marginTop: '4px', marginBottom: 0 }}>
                Logged in as <strong style={{ color: B.secondary }}>{currentUser?.position || 'Staff'}</strong> ({currentUser?.department || 'Medical Consultancy'})
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ background: B.lightBlue, padding: '12px 20px', borderRadius: '16px', border: `1px solid ${B.primary}15` }}>
                <span style={{ fontSize: '11px', color: B.muted, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>My Tasks</span>
                <strong style={{ fontSize: '20px', color: B.primary }}>{myTasks.length}</strong>
              </div>
              <div style={{ background: B.lightGreen, padding: '12px 20px', borderRadius: '16px', border: `1px solid ${B.accent}15` }}>
                <span style={{ fontSize: '11px', color: B.muted, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Requests Submitted</span>
                <strong style={{ fontSize: '20px', color: B.accent }}>{myLeaves.length + myOts.length + mySalaries.length}</strong>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: B.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Quick Actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
          </div>

          {/* Assigned Tasks Section */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: B.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Assigned Tasks</p>
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
                            <Badge label={task.priority} color={pc.color} bg={pc.bg} />
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
          </div>

          {/* Request & Application History (Tabbed Layout) */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: B.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>My Applications & Request History</p>
            <div style={{ background: B.white, border: `1.5px solid ${B.border}`, borderRadius: '24px', padding: '24px', boxShadow: '0 2px 10px rgba(26,41,74,0.04)' }}>

              {/* Tab headers */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: `1.5px solid ${B.border}`, paddingBottom: '12px', marginBottom: '20px', overflowX: 'auto' }}>
                {[
                  { id: 'leave', label: 'Leaves', count: myLeaves.length, icon: Calendar },
                  { id: 'ot', label: 'OT Claims', count: myOts.length, icon: Clock },
                  { id: 'salary', label: 'Salary Reviews', count: mySalaries.length, icon: TrendingUp }
                ].map(tab => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: active ? 600 : 500,
                        background: active ? B.lightBlue : 'transparent',
                        color: active ? B.primary : B.muted,
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap'
                      }}>
                      <Icon size={14} />
                      {tab.label}
                      <span style={{
                        fontSize: '11px',
                        background: active ? B.primary : B.border,
                        color: active ? 'white' : B.muted,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: 600
                      }}>{tab.count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Panels */}
              <div style={{ minHeight: '160px' }}>
                {activeTab === 'leave' && (
                  <ReportTable
                    emptyIcon={Calendar} emptyText="No leave applications yet. Click 'Apply for Leave' above to submit one."
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
                )}

                {activeTab === 'ot' && (
                  <ReportTable
                    emptyIcon={Clock} emptyText="No OT claims yet. Click 'Apply for OT' above to log your hours."
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
                )}

                {activeTab === 'salary' && (
                  <ReportTable
                    emptyIcon={TrendingUp} emptyText="No increment requests yet. Submit your first appraisal review above."
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
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

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



              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Shared modal sub-components ─────────────────────────────────────────── */

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
