import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Users, UserPlus, Trash2, ShieldCheck, Eye, EyeOff,
  X, CheckCircle2, AlertCircle, Building2, Briefcase, KeyRound,
  Search, UserCog, Copy, Check, Sun, Moon, Zap,
  ClipboardList, Plus, Clock, AlertTriangle, ChevronDown,
  CalendarDays, Flag, User, LayoutDashboard, Calendar, RefreshCw, Bell,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.webp';

/* ─── Brand Colors (match website) ──────────────────────────────────────── */
const C = {
  primary:   '#08709d',
  secondary: '#1a294a',
  accent:    '#5eb63b',
  bg:        '#F8F9FA',
  white:     '#FFFFFF',
  border:    '#E8EDF2',
  muted:     '#6B7A90',
  lightBlue: '#EBF5FA',
  lightGreen:'#EDF8E7',
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const getPasswordStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (pw.length >= 12) s++;
  if (s <= 1) return { label: 'Weak',   color: '#dc3545', pct: '20%' };
  if (s === 2) return { label: 'Fair',   color: '#e67e22', pct: '42%' };
  if (s === 3) return { label: 'Good',   color: '#f0ad00', pct: '65%' };
  return           { label: 'Strong', color: '#5eb63b', pct: '100%' };
};

const suggestStaffId = (name) => {
  if (!name) return '';
  const initials = name.trim().split(' ').map(w => w[0]?.toUpperCase() || '').join('').slice(0, 2);
  return `STF-${initials}${Math.floor(1000 + Math.random() * 9000)}`;
};

const getInitials = (name) =>
  (name || '').trim().split(' ').map(w => w[0]?.toUpperCase() || '').slice(0, 2).join('');

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good Morning',   Icon: Sun };
  if (h < 17) return { text: 'Good Afternoon', Icon: Zap };
  return             { text: 'Good Evening',   Icon: Moon };
};

const formatDate = () => new Date().toLocaleDateString('en-GB', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
});

const calculateDays = (start, end) => {
  if (!start || !end) return '—';
  const s = new Date(start), e = new Date(end);
  if (isNaN(s) || isNaN(e)) return '—';
  const d = Math.ceil((e - s) / 86400000) + 1;
  return d > 0 ? `${d} day${d !== 1 ? 's' : ''}` : '0 days';
};

/* ─── Animated Counter ───────────────────────────────────────────────────── */
const AnimatedCount = ({ to }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.ceil(to / 24));
    const t = setInterval(() => {
      cur = Math.min(cur + step, to);
      setVal(cur);
      if (cur >= to) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [to]);
  return <>{val}</>;
};

/* ─── Global style injection ─────────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes fadeSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    .admin-shimmer-btn {
      background: linear-gradient(120deg, #08709d 0%, #0d9ed6 35%, #38bdf8 50%, #0d9ed6 65%, #08709d 100%);
      background-size: 220% auto;
      animation: shimmer 2.6s linear infinite;
      transition: box-shadow 0.2s;
    }
    .admin-shimmer-btn:hover { box-shadow: 0 6px 24px rgba(8,112,157,0.35); }
    .admin-tr { transition: background 0.18s, box-shadow 0.18s; }
    .admin-tr:hover { background: #EBF5FA !important; box-shadow: inset 4px 0 0 #08709d; }
    .admin-input:focus { border-color: #08709d !important; box-shadow: 0 0 0 3px rgba(8,112,157,0.12) !important; outline: none; }
    .admin-select:focus { border-color: #08709d !important; box-shadow: 0 0 0 3px rgba(8,112,157,0.12) !important; outline: none; }
    .pw-bar { transition: width 0.5s cubic-bezier(.4,0,.2,1), background-color 0.4s; }
    .stat-card { animation: fadeSlideUp 0.5s ease both; }
    .submit-glow:hover { box-shadow: 0 0 0 4px rgba(8,112,157,0.2), 0 8px 28px rgba(8,112,157,0.35) !important; transform: translateY(-1px); }
  `}</style>
);

const DEPARTMENTS = ['Home Nursing','Physiotherapy','IV Therapy','Palliative Care','Administration','Doctor on Call','Lab Services','Wound Care','Other'];
const POSITIONS   = ['Nurse','Senior Nurse','Head Nurse','Physiotherapist','Doctor','Lab Technician','Admin Officer','Receptionist','Care Coordinator','Other'];

/* ═══════════════════════════════════════════════════════════════════════════
   Admin Dashboard
═══════════════════════════════════════════════════════════════════════════ */
const PRIORITY_CFG = {
  Low:    { color: '#5eb63b', bg: '#EDF8E7', label: 'Low' },
  Medium: { color: '#e67e22', bg: '#FEF3E2', label: 'Medium' },
  High:   { color: '#dc3545', bg: '#FFF5F5', label: 'High' },
};

const STATUS_CFG = {
  Pending:     { color: '#6B7A90', bg: '#F1F3F6', label: 'Pending' },
  'In Progress':{ color: '#08709d', bg: '#EBF5FA', label: 'In Progress' },
  Completed:   { color: '#5eb63b', bg: '#EDF8E7', label: 'Completed' },
};

const APP_STATUS_CFG = {
  Pending:  { color: '#e67e22', bg: '#FEF3E2', label: 'Pending' },
  Approved: { color: '#5eb63b', bg: '#EDF8E7', label: 'Approved' },
  Rejected: { color: '#dc3545', bg: '#FFF5F5', label: 'Rejected' },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    currentUser, staffUsers, logout, createStaffUser, deleteStaffUser,
    tasks, createTask, deleteTask,
    leaveApplications, updateLeaveStatus,
    otApplications, updateOtStatus,
    salaryApplications, updateSalaryStatus,
    noticeApplications, updateNoticeStatus,
    dutyApplications, updateDutyStatus,
  } = useAuth();

  const [activeNav, setActiveNav] = useState('dashboard'); // 'dashboard' | 'leave' | 'ot' | 'duty' | 'appraisals' | 'cms'

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirm,   setDeleteConfirm]   = useState(null);
  const [form, setForm] = useState({ fullName:'', staffId:'', position:'', department:'', password:'', confirmPassword:'' });
  const [showPw,        setShowPw]        = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [formError,   setFormError]   = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search,    setSearch]    = useState('');
  const [copiedId,  setCopiedId]  = useState(null);

  // ── Task Assignment state ────────────────────────────────────────────
  const [showTaskModal,  setShowTaskModal]  = useState(false);
  const [taskForm, setTaskForm] = useState({ title:'', description:'', priority:'Medium', dueDate:'', assignedToId:'' });
  const [taskError,   setTaskError]   = useState('');
  const [taskSuccess, setTaskSuccess] = useState('');
  const [taskTab, setTaskTab] = useState('all'); // 'all' | staffId
  const [deleteTaskConfirm, setDeleteTaskConfirm] = useState(null);

  // ── CMS State & Handlers ──────────────────────────────────────────
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [cmsTab, setCmsTab] = useState('blogs');
  const [editingBlog, setEditingBlog] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: '', category: 'Home Healthcare', date: '', author: 'Corx',
    image: 'https://www.corx.ae/wp-content/uploads/placeholder.jpg',
    excerpt: '', readTime: '5 min read', content: ''
  });
  const [editingService, setEditingService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    title: '', eyebrow: '', tagline: '', description: '', icon: 'Activity', themeColor: '#08709d',
    faqsJson: '[]', benefitsJson: '[]'
  });

  const fetchCmsData = async () => {
    try {
      const res1 = await fetch('http://localhost:8000/api/blogs/');
      const blogsData = await res1.json();
      setBlogs(blogsData);

      const res2 = await fetch('http://localhost:8000/api/services/');
      const servicesData = await res2.json();
      setServices(servicesData);
    } catch (err) {
      console.error("Error fetching CMS data:", err);
    }
  };

  useEffect(() => {
    if (activeNav === 'cms') {
      fetchCmsData();
    }
  }, [activeNav]);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const url = editingBlog
      ? `http://localhost:8000/api/blogs/${editingBlog.id}/`
      : 'http://localhost:8000/api/blogs/';
    const method = editingBlog ? 'PUT' : 'POST';

    try {
      const payload = {
        title: blogForm.title,
        category: blogForm.category,
        date: blogForm.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: blogForm.author,
        image: blogForm.image,
        excerpt: blogForm.excerpt,
        read_time: blogForm.readTime || blogForm.read_time || '5 min read',
        content: blogForm.content
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowBlogModal(false);
        setEditingBlog(null);
        fetchCmsData();
      } else {
        const errors = await res.json();
        alert("Failed to save blog post: " + JSON.stringify(errors));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlogDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/blogs/${id}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchCmsData();
      } else {
        alert("Failed to delete blog post.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      let parsedFaqs = [];
      let parsedBenefits = [];
      try {
        parsedFaqs = JSON.parse(serviceForm.faqsJson);
      } catch (err) {
        alert("Invalid JSON format in FAQs");
        return;
      }
      try {
        parsedBenefits = JSON.parse(serviceForm.benefitsJson);
      } catch (err) {
        alert("Invalid JSON format in Benefits");
        return;
      }

      const payload = {
        slug: editingService.slug,
        title: serviceForm.title,
        eyebrow: serviceForm.eyebrow,
        tagline: serviceForm.tagline,
        description: serviceForm.description,
        icon: serviceForm.icon,
        theme_color: serviceForm.themeColor,
        floating_badge: editingService.floating_badge || {},
        locations: editingService.locations || [],
        faqs: parsedFaqs,
        benefits: parsedBenefits
      };

      const res = await fetch(`http://localhost:8000/api/services/${editingService.slug}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowServiceModal(false);
        setEditingService(null);
        fetchCmsData();
      } else {
        const errors = await res.json();
        alert("Failed to save service: " + JSON.stringify(errors));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => { logout(); navigate('/portal'); };

  const handleFieldChange = (field, value) => {
    setForm(prev => {
      const upd = { ...prev, [field]: value };
      if (field === 'fullName' && !prev.staffId) upd.staffId = suggestStaffId(value);
      return upd;
    });
    setFormError('');
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setFormError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setFormError('Password must be at least 6 characters.'); return; }
    setIsSubmitting(true);
    const result = await createStaffUser(form);
    setIsSubmitting(false);
    if (result.success) {
      setFormSuccess(result.message);
      setForm({ fullName:'', staffId:'', position:'', department:'', password:'', confirmPassword:'' });
      setTimeout(() => { setShowCreateModal(false); setFormSuccess(''); }, 1800);
    } else { setFormError(result.message); }
  };

  const handleCopyId = (staffId) => {
    navigator.clipboard.writeText(staffId).catch(() => {});
    setCopiedId(staffId);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filtered = staffUsers.filter(u =>
    [u.fullName, u.staffId, u.department, u.position].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  const pwStrength    = form.password ? getPasswordStrength(form.password) : null;
  const adminInitials = getInitials(currentUser?.name);
  const greeting      = getGreeting();
  const deptCount     = [...new Set(staffUsers.map(u => u.department).filter(Boolean))].length;
  const pendingTasks  = tasks.filter(t => t.status === 'Pending').length;

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskForm.assignedToId) { setTaskError('Please select a staff member.'); return; }
    if (!taskForm.title.trim())  { setTaskError('Task title is required.'); return; }
    const staff = staffUsers.find(u => u.id === taskForm.assignedToId);
    createTask({
      ...taskForm,
      assignedToId: staff.staffId,   // use staffId as the lookup key on staff side
      assignedToName: staff.fullName,
      assignedByName: currentUser?.name || 'Admin',
    });
    setTaskSuccess(`Task assigned to ${staff.fullName}!`);
    setTaskForm({ title:'', description:'', priority:'Medium', dueDate:'', assignedToId:'' });
    setTimeout(() => { setShowTaskModal(false); setTaskSuccess(''); setTaskError(''); }, 1600);
  };

  const filteredTasks = taskTab === 'all'
    ? tasks
    : tasks.filter(t => t.assignedToId === taskTab);

  const stats = [
    { label: 'Total Staff',   value: staffUsers.length, icon: <Users size={22} />,        accent: C.primary,   bg: C.lightBlue  },
    { label: 'Departments',   value: deptCount,          icon: <Building2 size={22} />,     accent: C.accent,    bg: C.lightGreen },
    { label: 'Tasks Pending', value: pendingTasks,       icon: <ClipboardList size={22} />, accent: '#e67e22',   bg: '#FEF3E2'    },
    { label: 'Admin Account', value: 1,                  icon: <UserCog size={22} />,       accent: C.secondary, bg: '#EAECF3'    },
  ];

  const recentActivities = [];
  if (leaveApplications) {
    leaveApplications.slice(-3).forEach(l => {
      recentActivities.push({
        title: 'Leave Request',
        desc: `${l.staffName} requested ${l.leaveType}`,
        status: l.status,
        time: l.submittedAt ? new Date(l.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Today',
        color: C.primary,
        bg: C.lightBlue
      });
    });
  }
  if (otApplications) {
    otApplications.slice(-3).forEach(o => {
      recentActivities.push({
        title: 'OT Claim',
        desc: `${o.staffName} claimed ${o.otHours} hours OT`,
        status: o.status,
        time: o.submittedAt ? new Date(o.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Today',
        color: C.accent,
        bg: C.lightGreen
      });
    });
  }
  if (tasks) {
    tasks.slice(-3).forEach(t => {
      recentActivities.push({
        title: 'Task Assigned',
        desc: `"${t.title}" assigned to ${t.assignedToName}`,
        status: t.status,
        time: t.dueDate ? new Date(t.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'No due date',
        color: '#e67e22',
        bg: '#FEF3E2'
      });
    });
  }
  const displayActivities = recentActivities.reverse().slice(0, 4);

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif", minHeight:'100vh', background: C.bg, display: 'flex' }}>
      <GlobalStyle />

      {/* ── Left Sidebar Navigation ── */}
      <aside style={{
        width: '260px', background: C.secondary, borderRight: 'none',
        display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100vh', position: 'sticky', top: 0, zIndex: 50
      }}>
        {/* Sidebar Header / Brand */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '4px'
          }}>
            <img src={logo} alt="Corx Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "'Poppins',sans-serif" }}>Corx</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#a0aec0' }}>Portal Admin</span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'leave', label: 'Leave Applications', icon: Calendar, count: leaveApplications?.length || 0 },
            { id: 'ot', label: 'OT Claims', icon: Clock, count: otApplications?.length || 0 },
            { id: 'duty', label: 'Duty Replacements', icon: RefreshCw, count: dutyApplications?.length || 0 },
            { id: 'appraisals', label: 'Appraisals & Notices', icon: Bell, count: (salaryApplications?.length || 0) + (noticeApplications?.length || 0) },
            { id: 'cms', label: 'Website CMS', icon: ClipboardList },
          ].map(item => {
            const isActive = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)}
                className={isActive ? 'admin-shimmer-btn' : ''}
                style={{
                  width: '100%', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif",
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 18px', borderRadius: '12px', transition: 'all 0.2s',
                  background: isActive ? undefined : 'transparent',
                  color: isActive ? 'white' : '#a0aec0',
                  fontWeight: isActive ? 700 : 600,
                  boxShadow: isActive ? '0 4px 14px rgba(8,112,157,0.25)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#a0aec0';
                  }
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <item.icon size={18} style={{ color: isActive ? 'white' : '#a0aec0' }} />
                  <span style={{ fontSize: '13px' }}>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span style={{
                    fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '6px',
                    background: isActive ? C.white : 'rgba(255,255,255,0.08)',
                    color: isActive ? C.primary : '#a0aec0'
                  }}>{item.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'rgba(220,53,69,0.15)', color: '#ff4d4f', fontSize: '13px', fontWeight: 600, fontFamily: "'Poppins',sans-serif", transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,53,69,0.25)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(220,53,69,0.15)'; e.currentTarget.style.color = '#ff4d4f'; }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Right Content Area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Header / Topbar */}
        <header style={{
          background: C.white, borderBottom: `2px solid ${C.border}`,
          height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
          boxShadow: '0 2px 12px rgba(8,112,157,0.04)', position: 'sticky', top: 0, zIndex: 40
        }}>
          {/* Path/Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: C.muted }}>Admin</span>
            <span style={{ fontSize: '12px', fontWeight: 500, color: C.muted }}>/</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: C.primary, textTransform: 'capitalize' }}>
              {activeNav === 'appraisals' ? 'Appraisals & Notices' : activeNav}
            </span>
          </div>

          {/* Right Section: Quick Actions + User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Quick Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Create Account Button */}
              <button onClick={() => { setShowCreateModal(true); setFormError(''); setFormSuccess(''); }}
                className="admin-shimmer-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '40px', padding: '0 16px', borderRadius: '10px', color: 'white', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
                <UserPlus size={14} />
                <span className="hidden md:inline">New Account</span>
              </button>

              {/* Assign Task Button */}
              <button onClick={() => { setShowTaskModal(true); setTaskError(''); setTaskSuccess(''); }}
                className="admin-shimmer-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '40px', padding: '0 16px', borderRadius: '10px', color: 'white', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
                <ClipboardList size={14} />
                <span className="hidden md:inline">Assign Task</span>
              </button>
            </div>

            {/* User profile info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: C.lightBlue, border: `1px solid ${C.primary}20`, padding: '6px 16px 6px 6px', borderRadius: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `linear-gradient(135deg, ${C.secondary}, ${C.primary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: 600 }}>
                {adminInitials}
              </div>
              <div className="hidden sm:flex flex-col" style={{ gap: '1px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: C.secondary }}>{currentUser?.name || 'Admin'}</span>
                <span style={{ fontSize: '10px', fontWeight: 500, color: C.primary, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main style={{ flex: 1, padding: '40px 40px 72px', overflowY: 'auto', position: 'relative' }}>
          {/* Subtle Brand Watermark Logo Background */}
          <div style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '480px',
            height: '480px',
            opacity: 0.04,
            pointerEvents: 'none',
            zIndex: 0,
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
          
          {/* Greeting */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 600, color: C.secondary, letterSpacing: '-0.01em', marginBottom: '6px' }}>
              <span style={{ display: 'inline-block', marginRight: '10px', color: C.primary }}><greeting.Icon size={22} style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
              {greeting.text}, {currentUser?.name?.split(' ')[0] || 'Admin'}!
            </h1>
            <p style={{ color: C.muted, fontSize: '13px', fontWeight: 500 }}>{formatDate()}</p>
          </motion.div>

          {/* VIEWPORT CONTROLS */}

          {/* 1. DASHBOARD VIEW */}
          {activeNav === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: '36px' }}>
                {stats.map((s, i) => (
                  <motion.div key={i} className="stat-card"
                    whileHover={{ y: -6, scale: 1.01, boxShadow: '0 12px 30px rgba(26,41,74,0.06)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ animationDelay: `${i * 0.08}s`, background: `linear-gradient(135deg, ${C.white}, #FCFDFE)`, border: `1.5px solid ${C.border}`, borderRadius: '20px', padding: '26px 24px', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,41,74,0.03)', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: s.accent, borderRadius: '20px 0 0 20px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: s.bg, color: s.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {s.icon}
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active</span>
                    </div>
                    <div style={{ fontSize: '38px', fontWeight: 700, color: C.secondary, lineHeight: 1, marginBottom: '6px', fontFamily: "'Poppins',sans-serif" }}>
                      <AnimatedCount to={s.value} />
                    </div>
                    <div style={{ fontSize: '11.5px', fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Spline Chart + Activity Feed Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ marginBottom: '36px' }}>
                {/* Visual Chart Card */}
                <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '20px', padding: '24px', boxShadow: '0 2px 14px rgba(26,41,74,0.03)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: C.secondary, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>System Activity Trend</h3>
                      <span style={{ fontSize: '11px', color: C.muted }}>Daily metrics overview</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: C.lightGreen, color: C.accent }}>+18.4% growth</span>
                  </div>
                  
                  {/* SVG Chart */}
                  <div style={{ flex: 1, minHeight: '160px', display: 'flex', alignItems: 'flex-end', paddingTop: '10px' }}>
                    <svg viewBox="0 0 500 150" width="100%" height="150" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#08709d" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#08709d" stopOpacity="0.00" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="25" x2="500" y2="25" stroke="#E8EDF2" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#E8EDF2" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="125" x2="500" y2="125" stroke="#E8EDF2" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Chart Area Fill */}
                      <path d="M 0 150 L 0 110 C 60 90, 80 130, 150 90 C 220 50, 280 110, 350 70 C 420 30, 440 50, 500 30 L 500 150 Z" fill="url(#chartGrad)" />
                      {/* Chart Stroke Line */}
                      <path d="M 0 110 C 60 90, 80 130, 150 90 C 220 50, 280 110, 350 70 C 420 30, 440 50, 500 30" fill="none" stroke="#08709d" strokeWidth="3.5" strokeLinecap="round" />
                      
                      {/* Highlight Dots */}
                      <circle cx="150" cy="90" r="5" fill="#08709d" stroke="white" strokeWidth="2" />
                      <circle cx="350" cy="70" r="5" fill="#08709d" stroke="white" strokeWidth="2" />
                      <circle cx="500" cy="30" r="5" fill="#5eb63b" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  
                  {/* Chart X Labels */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 4px' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Today'].map(day => (
                      <span key={day} style={{ fontSize: '10px', fontWeight: 600, color: C.muted }}>{day}</span>
                    ))}
                  </div>
                </div>

                {/* Activity Feed Card */}
                <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '20px', padding: '24px', boxShadow: '0 2px 14px rgba(26,41,74,0.03)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: C.secondary, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>System Notifications & Activity</h3>
                      <span style={{ fontSize: '11px', color: C.muted }}>Real-time audit log</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
                    {displayActivities.length === 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', color: C.muted, fontSize: '12px' }}>
                        No recent activity recorded
                      </div>
                    ) : (
                      displayActivities.map((act, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: act.bg, color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ fontSize: '14px', fontWeight: 700 }}>✦</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                              <span style={{ fontSize: '12.5px', fontWeight: 600, color: C.secondary }}>{act.title}</span>
                              <span style={{ fontSize: '11.5px', color: C.muted }}>{act.desc}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                            <span style={{ fontSize: '10px', color: C.muted, fontWeight: 500 }}>{act.time}</span>
                            <span style={{
                              fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', padding: '2px 6px', borderRadius: '4px',
                              background: act.status === 'Approved' || act.status === 'Completed' ? C.lightGreen : act.status === 'Pending' || act.status === 'In Progress' ? '#FEF3E2' : '#FFF5F5',
                              color: act.status === 'Approved' || act.status === 'Completed' ? C.accent : act.status === 'Pending' || act.status === 'In Progress' ? '#e67e22' : '#dc3545'
                            }}>
                              {act.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Staff Accounts Table */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(26,41,74,0.04)', marginBottom: '32px' }}>
                {/* Toolbar */}
                <div style={{ padding:'20px 24px', borderBottom:`1.5px solid ${C.border}`, display:'flex', flexWrap:'wrap', gap:'14px', alignItems:'center', justifyContent:'space-between', background: C.bg }}>
                  <div>
                    <h2 style={{ fontSize:'15px', fontWeight:600, color: C.secondary, textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:"'Poppins',sans-serif" }}>Staff Accounts</h2>
                    <p style={{ fontSize:'12px', color: C.muted, fontWeight:500, marginTop:'2px' }}>{staffUsers.length} account{staffUsers.length !== 1 ? 's' : ''} registered</p>
                  </div>
                  <div style={{ display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap' }}>
                    {/* Search */}
                    <div style={{ position:'relative' }}>
                      <Search size={13} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color: C.muted, pointerEvents:'none' }} />
                      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff…"
                        className="admin-input"
                        style={{ border:`1.5px solid ${C.border}`, borderRadius:'10px', background: C.white, color: C.secondary, fontSize:'13px', fontWeight:500, paddingLeft:'34px', paddingRight:'14px', height:'40px', width:'210px', transition:'all 0.2s', fontFamily:"'Poppins',sans-serif" }} />
                    </div>
                    {/* New Account */}
                    <button onClick={() => { setShowCreateModal(true); setFormError(''); setFormSuccess(''); }}
                      className="admin-shimmer-btn"
                      style={{ display:'flex', alignItems:'center', gap:'7px', height:'40px', padding:'0 18px', borderRadius:'10px', color:'white', fontSize:'12px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', border:'none', cursor:'pointer', whiteSpace:'nowrap', fontFamily:"'Poppins',sans-serif" }}>
                      <UserPlus size={14} /> New Account
                    </button>
                  </div>
                </div>

                {/* Table */}
                {filtered.length === 0 ? (
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'64px 24px', textAlign:'center' }}>
                    <div style={{ width:'72px', height:'72px', borderRadius:'20px', background: C.lightBlue, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>
                      <Users size={32} style={{ color: C.primary, opacity:0.5 }} />
                    </div>
                    <p style={{ color: C.muted, fontSize:'14px', fontWeight:600, marginBottom:'16px' }}>
                      {search ? 'No staff found matching your search.' : 'No staff accounts yet. Create the first one!'}
                    </p>
                    {!search && (
                      <button onClick={() => setShowCreateModal(true)} className="admin-shimmer-btn"
                        style={{ height:'40px', padding:'0 20px', borderRadius:'10px', color:'white', fontSize:'12px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', border:'none', cursor:'pointer', fontFamily:"'Poppins',sans-serif" }}>
                        + Create First Account
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ overflowX:'auto' }}>
                    <table style={{ width:'100%', borderCollapse:'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom:`1.5px solid ${C.border}`, background: C.bg }}>
                          {['Staff Member','Staff ID','Position','Department','Created','Actions'].map(h => (
                            <th key={h} style={{ textAlign:'left', fontSize:'10px', fontWeight:600, color: C.muted, textTransform:'uppercase', letterSpacing:'0.12em', padding:'12px 20px', fontFamily:"'Poppins',sans-serif" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence initial={false}>
                          {filtered.map((user, idx) => (
                            <motion.tr key={user.id} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:8 }} transition={{ delay: idx*0.04 }}
                              className="admin-tr"
                              style={{ borderBottom:`1px solid ${C.border}`, cursor:'default' }}>
                              <td style={{ padding:'14px 20px' }}>
                                <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                                  <div style={{ width:'38px', height:'38px', borderRadius:'10px', background:`linear-gradient(135deg, ${C.lightBlue}, #D4EDF7)`, border:`1.5px solid ${C.primary}20`, display:'flex', alignItems:'center', justifyContent:'center', color: C.primary, fontSize:'13px', fontWeight:600, flexShrink:0 }}>
                                    {getInitials(user.fullName)}
                                  </div>
                                  <span style={{ fontSize:'13px', fontWeight:500, color: C.secondary }}>{user.fullName}</span>
                                </div>
                              </td>
                              <td style={{ padding:'14px 20px' }}>
                                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                                  <span style={{ fontSize:'12px', fontFamily:'monospace', fontWeight:500, color: C.primary, background: C.lightBlue, padding:'3px 10px', borderRadius:'6px' }}>{user.staffId}</span>
                                  <button onClick={() => handleCopyId(user.staffId)} style={{ background:'none', border:'none', cursor:'pointer', color: C.muted, padding:'2px', display:'flex', alignItems:'center', transition:'color 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = C.primary}
                                    onMouseLeave={e => e.currentTarget.style.color = C.muted}>
                                    {copiedId === user.staffId ? <Check size={13} style={{ color: C.accent }} /> : <Copy size={13} />}
                                  </button>
                                </div>
                              </td>
                              <td style={{ padding:'14px 20px' }}><span style={{ fontSize:'12px', fontWeight:600, color: C.muted }}>{user.position || '—'}</span></td>
                              <td style={{ padding:'14px 20px' }}>
                                <span style={{ background: C.lightGreen, border:`1px solid ${C.accent}30`, color: C.accent, fontSize:'10px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', padding:'4px 10px', borderRadius:'999px', fontFamily:"'Poppins',sans-serif" }}>
                                  {user.department || '—'}
                                </span>
                              </td>
                              <td style={{ padding:'14px 20px' }}><span style={{ fontSize:'11px', color: C.muted, fontWeight:500 }}>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : '—'}</span></td>
                              <td style={{ padding:'14px 20px' }}>
                                <button onClick={() => setDeleteConfirm(user.id)}
                                  style={{ display:'flex', alignItems:'center', gap:'6px', background:'#FFF5F5', border:'1px solid #FCC', color:'#dc3545', fontSize:'11px', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.06em', padding:'6px 12px', borderRadius:'8px', cursor:'pointer', transition:'all 0.2s', fontFamily:"'Poppins',sans-serif" }}
                                  onMouseEnter={e => { e.currentTarget.style.background='#FFECEC'; }}
                                  onMouseLeave={e => { e.currentTarget.style.background='#FFF5F5'; }}>
                                  <Trash2 size={12} /> Remove
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>

              {/* Task Assignments Panel */}
              <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
                style={{ background: C.white, border:`1.5px solid ${C.border}`, borderRadius:'20px', overflow:'hidden', boxShadow:'0 2px 16px rgba(26,41,74,0.04)' }}>
                
                {/* Panel toolbar */}
                <div style={{ padding:'20px 24px', borderBottom:`1.5px solid ${C.border}`, display:'flex', flexWrap:'wrap', gap:'14px', alignItems:'center', justifyContent:'space-between', background: C.bg }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'34px', height:'34px', borderRadius:'10px', background: C.lightBlue, display:'flex', alignItems:'center', justifyContent:'center', color: C.primary }}>
                        <ClipboardList size={17} />
                      </div>
                      <div>
                        <h2 style={{ fontSize:'15px', fontWeight:600, color: C.secondary, margin:0 }}>Task Assignments</h2>
                        <p style={{ fontSize:'11px', color: C.muted, fontWeight:400, marginTop:'2px' }}>{tasks.length} task{tasks.length !== 1 ? 's' : ''} total · {tasks.filter(t=>t.status==='Completed').length} completed</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { setShowTaskModal(true); setTaskError(''); setTaskSuccess(''); }}
                    style={{ display:'flex', alignItems:'center', gap:'7px', height:'38px', padding:'0 18px', borderRadius:'10px', background: C.primary, color:'white', fontSize:'12px', fontWeight:500, border:'none', cursor:'pointer', transition:'all 0.2s', boxShadow:`0 4px 14px ${C.primary}30` }}
                    onMouseEnter={e => e.currentTarget.style.background='#065f85'}
                    onMouseLeave={e => e.currentTarget.style.background=C.primary}>
                    <Plus size={15} /> Assign Task
                  </button>
                </div>

                {/* Filter tabs */}
                {staffUsers.length > 0 && (
                  <div style={{ padding:'12px 24px', borderBottom:`1px solid ${C.border}`, display:'flex', gap:'8px', flexWrap:'wrap', background: C.white }}>
                    <button onClick={() => setTaskTab('all')}
                      style={{ padding:'5px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:500, border:`1.5px solid ${taskTab==='all' ? C.primary : C.border}`, background: taskTab==='all' ? C.lightBlue : 'transparent', color: taskTab==='all' ? C.primary : C.muted, cursor:'pointer', transition:'all 0.2s' }}>
                      All Staff
                    </button>
                    {staffUsers.map(u => (
                      <button key={u.staffId} onClick={() => setTaskTab(u.staffId)}
                        style={{ padding:'5px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:500, border:`1.5px solid ${taskTab===u.staffId ? C.primary : C.border}`, background: taskTab===u.staffId ? C.lightBlue : 'transparent', color: taskTab===u.staffId ? C.primary : C.muted, cursor:'pointer', transition:'all 0.2s' }}>
                        {u.fullName.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                )}

                {/* Task list */}
                <div style={{ padding:'16px 24px', display:'flex', flexDirection:'column', gap:'12px', minHeight:'80px' }}>
                  <AnimatePresence initial={false}>
                    {filteredTasks.length === 0 ? (
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'36px 0', textAlign:'center' }}>
                        <div style={{ width:'52px', height:'52px', borderRadius:'14px', background: C.lightBlue, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'12px' }}>
                          <ClipboardList size={24} style={{ color: C.primary, opacity:0.5 }} />
                        </div>
                        <p style={{ color: C.muted, fontSize:'13px', fontWeight:400 }}>No tasks yet. Click "Assign Task" to get started.</p>
                      </div>
                    ) : (
                      filteredTasks.map((task, idx) => {
                        const pc = PRIORITY_CFG[task.priority] || PRIORITY_CFG.Medium;
                        const sc = STATUS_CFG[task.status]   || STATUS_CFG.Pending;
                        return (
                          <motion.div key={task.id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ delay: idx*0.04 }}
                            style={{ background: C.bg, border:`1.5px solid ${C.border}`, borderRadius:'14px', padding:'16px 18px', display:'flex', flexWrap:'wrap', gap:'12px', alignItems:'flex-start', justifyContent:'space-between' }}>
                            <div style={{ flex:1, minWidth:'200px' }}>
                              {/* Title row */}
                              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px', flexWrap:'wrap' }}>
                                <span style={{ fontSize:'14px', fontWeight:600, color: C.secondary }}>{task.title}</span>
                                <span style={{ background: pc.bg, color: pc.color, border:`1px solid ${pc.color}30`, fontSize:'10px', fontWeight:600, padding:'2px 10px', borderRadius:'999px', textTransform:'uppercase', letterSpacing:'0.07em' }}>
                                  {pc.label}
                                </span>
                                <span style={{ background: sc.bg, color: sc.color, border:`1px solid ${sc.color}30`, fontSize:'10px', fontWeight:600, padding:'2px 10px', borderRadius:'999px' }}>
                                  {sc.label}
                                </span>
                              </div>
                              {task.description && (
                                <p style={{ fontSize:'12px', color: C.muted, fontWeight:400, marginBottom:'8px', lineHeight:1.6 }}>{task.description}</p>
                              )}
                              {/* Meta row */}
                              <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
                                <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color: C.muted }}>
                                  <User size={12} style={{ color: C.primary }} /> {task.assignedToName}
                                </span>
                                {task.dueDate && (
                                  <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color: C.muted }}>
                                    <CalendarDays size={12} style={{ color: C.primary }} />
                                    Due: {new Date(task.dueDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                                  </span>
                                )}
                                <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color: C.muted }}>
                                  <Clock size={12} />
                                  {new Date(task.createdAt).toLocaleDateString('en-GB')}
                                </span>
                              </div>
                            </div>
                            {/* Delete */}
                            <button onClick={() => setDeleteTaskConfirm(task.id)}
                              style={{ background:'#FFF5F5', border:'1px solid #FCC', color:'#dc3545', padding:'6px 10px', borderRadius:'8px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', fontWeight:500, transition:'all 0.2s', flexShrink:0 }}
                              onMouseEnter={e => e.currentTarget.style.background='#FFECEC'}
                              onMouseLeave={e => e.currentTarget.style.background='#FFF5F5'}>
                              <Trash2 size={12} /> Delete
                            </button>
                          </motion.div>
                        );
                      })
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* 2. LEAVE APPLICATIONS */}
          {activeNav === 'leave' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <ReportPanelWrapper title="Leave Applications Report" count={leaveApplications?.length || 0}>
                {(!leaveApplications || leaveApplications.length === 0) ? (
                  <EmptyReportState label="No leave applications submitted yet." />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `1.5px solid ${C.border}`, background: C.bg }}>
                          {['Staff Member', 'Leave Type', 'Dates', 'Duration', 'Status', 'Submitted', 'Actions'].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {leaveApplications.map((r) => (
                          <tr key={r.id} className="admin-tr" style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={tdStyle}><StaffMemberCell name={r.staffName} id={r.staffId} dep={r.staffDep} pos={r.staffPosition} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '13px', fontWeight: 500, color: C.secondary }}>{r.leaveType}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: '12px', color: C.secondary }}>{r.leaveStart} to {r.leaveEnd}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: '13px', fontWeight: 600, color: C.muted }}>{calculateDays(r.leaveStart, r.leaveEnd)}</span></td>
                            <td style={tdStyle}><AppBadge status={r.status} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '11px', color: C.muted }}>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</span></td>
                            <td style={tdStyle}>
                              {r.status === 'Pending' ? (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button onClick={() => updateLeaveStatus(r.id, 'Approved')} style={approveBtnStyle}>Approve</button>
                                  <button onClick={() => updateLeaveStatus(r.id, 'Rejected')} style={rejectBtnStyle}>Reject</button>
                                </div>
                              ) : (
                                <span style={{ fontSize: '12px', fontWeight: 600, color: C.muted }}>Reviewed</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </ReportPanelWrapper>
            </motion.div>
          )}

          {/* 3. OT CLAIMS */}
          {activeNav === 'ot' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <ReportPanelWrapper title="Overtime (OT) Claims Report" count={otApplications?.length || 0}>
                {(!otApplications || otApplications.length === 0) ? (
                  <EmptyReportState label="No OT claims submitted yet." />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `1.5px solid ${C.border}`, background: C.bg }}>
                          {['Staff Member', 'Shift Type', 'Duty Date', 'OT Hours', 'Status', 'Submitted', 'Actions'].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {otApplications.map((r) => (
                          <tr key={r.id} className="admin-tr" style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={tdStyle}><StaffMemberCell name={r.staffName} id={r.staffId} dep={r.staffDep} pos={r.staffPosition} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '13px', fontWeight: 500, color: C.secondary }}>{r.otType}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: '12px', color: C.secondary }}>{r.otDate}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: '13px', fontFamily: 'monospace', fontWeight: 600, color: C.primary }}>{r.otHours} hrs</span></td>
                            <td style={tdStyle}><AppBadge status={r.status} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '11px', color: C.muted }}>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</span></td>
                            <td style={tdStyle}>
                              {r.status === 'Pending' ? (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button onClick={() => updateOtStatus(r.id, 'Approved')} style={approveBtnStyle}>Approve</button>
                                  <button onClick={() => updateOtStatus(r.id, 'Rejected')} style={rejectBtnStyle}>Reject</button>
                                </div>
                              ) : (
                                <span style={{ fontSize: '12px', fontWeight: 600, color: C.muted }}>Reviewed</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </ReportPanelWrapper>
            </motion.div>
          )}

          {/* 4. DUTY REPLACEMENTS */}
          {activeNav === 'duty' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <ReportPanelWrapper title="Duty Replacement Requests" count={dutyApplications?.length || 0}>
                {(!dutyApplications || dutyApplications.length === 0) ? (
                  <EmptyReportState label="No duty replacement requests submitted yet." />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `1.5px solid ${C.border}`, background: C.bg }}>
                          {['Staff Member', 'Duty Date', 'Replacement Staff', 'Reason', 'Status', 'Submitted', 'Actions'].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dutyApplications.map((r) => (
                          <tr key={r.id} className="admin-tr" style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={tdStyle}><StaffMemberCell name={r.staffName} id={r.staffId} dep={r.staffDep} pos={r.staffPosition} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '12px', color: C.secondary }}>{r.dutyDate}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: '13px', fontWeight: 600, color: C.primary }}>{r.dutyReplacement}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: '12px', color: C.muted, display: 'block', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.dutyReason}>{r.dutyReason}</span></td>
                            <td style={tdStyle}><AppBadge status={r.status} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '11px', color: C.muted }}>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</span></td>
                            <td style={tdStyle}>
                              {r.status === 'Pending' ? (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button onClick={() => updateDutyStatus(r.id, 'Approved')} style={approveBtnStyle}>Approve</button>
                                  <button onClick={() => updateDutyStatus(r.id, 'Rejected')} style={rejectBtnStyle}>Reject</button>
                                </div>
                              ) : (
                                <span style={{ fontSize: '12px', fontWeight: 600, color: C.muted }}>Reviewed</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </ReportPanelWrapper>
            </motion.div>
          )}

          {/* 5. APPRAISALS & NOTICES */}
          {activeNav === 'appraisals' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Appraisal requests */}
              <ReportPanelWrapper title="Salary Increment & Appraisals" count={salaryApplications?.length || 0}>
                {(!salaryApplications || salaryApplications.length === 0) ? (
                  <EmptyReportState label="No salary increment requests submitted yet." />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `1.5px solid ${C.border}`, background: C.bg }}>
                          {['Staff Member', 'Appraisal Type', 'Status', 'Submitted', 'Actions'].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {salaryApplications.map((r) => (
                          <tr key={r.id} className="admin-tr" style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={tdStyle}><StaffMemberCell name={r.staffName} id={r.staffId} dep={r.staffDep} pos={r.staffPosition} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '13px', fontWeight: 500, color: C.secondary }}>{r.incType}</span></td>
                            <td style={tdStyle}><AppBadge status={r.status} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '11px', color: C.muted }}>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</span></td>
                            <td style={tdStyle}>
                              {r.status === 'Pending' ? (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button onClick={() => updateSalaryStatus(r.id, 'Approved')} style={approveBtnStyle}>Approve</button>
                                  <button onClick={() => updateSalaryStatus(r.id, 'Rejected')} style={rejectBtnStyle}>Reject</button>
                                </div>
                              ) : (
                                <span style={{ fontSize: '12px', fontWeight: 600, color: C.muted }}>Reviewed</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </ReportPanelWrapper>

              {/* Notices requests */}
              <ReportPanelWrapper title="Submitted Notices & Feedback" count={noticeApplications?.length || 0}>
                {(!noticeApplications || noticeApplications.length === 0) ? (
                  <EmptyReportState label="No staff notices submitted yet." />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `1.5px solid ${C.border}`, background: C.bg }}>
                          {['Staff Member', 'Notice Title', 'Message', 'Status', 'Submitted', 'Actions'].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {noticeApplications.map((r) => (
                          <tr key={r.id} className="admin-tr" style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={tdStyle}><StaffMemberCell name={r.staffName} id={r.staffId} dep={r.staffDep} pos={r.staffPosition} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '13px', fontWeight: 600, color: C.secondary }}>{r.noticeTitle}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: '12px', color: C.muted, display: 'block', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.noticeMessage}>{r.noticeMessage}</span></td>
                            <td style={tdStyle}><AppBadge status={r.status} /></td>
                            <td style={tdStyle}><span style={{ fontSize: '11px', color: C.muted }}>{new Date(r.submittedAt).toLocaleDateString('en-GB')}</span></td>
                            <td style={tdStyle}>
                              {r.status === 'Pending' ? (
                                <button onClick={() => updateNoticeStatus(r.id, 'Approved')}
                                  style={{
                                    background: C.lightBlue, border: `1.5px solid ${C.primary}30`, color: C.primary,
                                    padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
                                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Poppins',sans-serif"
                                  }}
                                  onMouseEnter={e => e.currentTarget.style.background = C.primary + '18'}
                                  onMouseLeave={e => e.currentTarget.style.background = C.lightBlue}>
                                  Acknowledge
                                </button>
                              ) : (
                                <span style={{ fontSize: '12px', fontWeight: 600, color: C.muted }}>Acknowledged</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </ReportPanelWrapper>
            </motion.div>
          )}

          {/* 6. WEBSITE CMS */}
          {activeNav === 'cms' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Tab Selector & Header */}
              <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '20px', padding: '20px 24px', boxShadow: '0 2px 16px rgba(26,41,74,0.04)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setCmsTab('blogs')}
                    style={{
                      padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                      background: cmsTab === 'blogs' ? C.lightBlue : 'transparent', color: cmsTab === 'blogs' ? C.primary : C.muted, transition: 'all 0.15s'
                    }}>
                    Blog Articles ({blogs.length})
                  </button>
                  <button onClick={() => setCmsTab('services')}
                    style={{
                      padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                      background: cmsTab === 'services' ? C.lightBlue : 'transparent', color: cmsTab === 'services' ? C.primary : C.muted, transition: 'all 0.15s'
                    }}>
                    Service Pages ({services.length})
                  </button>
                </div>
                
                {cmsTab === 'blogs' && (
                  <button onClick={() => {
                    setEditingBlog(null);
                    setBlogForm({
                      title: '', category: 'Home Healthcare', date: '', author: 'Corx',
                      image: 'https://www.corx.ae/wp-content/uploads/placeholder.jpg',
                      excerpt: '', readTime: '5 min read', content: ''
                    });
                    setShowBlogModal(true);
                  }} className="admin-shimmer-btn"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '38px', padding: '0 16px', borderRadius: '10px', color: 'white', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}>
                    <Plus size={14} /> Add Blog Post
                  </button>
                )}
              </div>

              {/* Tab Panels */}
              {cmsTab === 'blogs' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map(blog => (
                    <div key={blog.id} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(26,41,74,0.03)' }}>
                      <div style={{ height: '160px', background: `url(${blog.image}) center/cover no-repeat`, position: 'relative' }}>
                        <span style={{ position: 'absolute', top: '12px', left: '12px', background: C.primary, color: 'white', fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                          {blog.category}
                        </span>
                      </div>
                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 600, color: C.secondary, margin: 0 }}>{blog.title}</h4>
                        <p style={{ fontSize: '12px', color: C.muted, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>
                          {blog.excerpt}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '14px', borderTop: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: '11px', color: C.muted }}>By {blog.author} · {blog.read_time || blog.readTime || '5 min read'}</span>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="button" onClick={() => {
                              setEditingBlog(blog);
                              setBlogForm({
                                title: blog.title, category: blog.category, date: blog.date, author: blog.author,
                                image: blog.image, excerpt: blog.excerpt, readTime: blog.read_time || blog.readTime || '5 min read', content: blog.content
                              });
                              setShowBlogModal(true);
                            }}
                              style={{ background: C.lightBlue, border: 'none', color: C.primary, padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                              Edit
                            </button>
                            <button type="button" onClick={() => handleBlogDelete(blog.id)}
                              style={{ background: '#FFF5F5', border: 'none', color: '#dc3545', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(26,41,74,0.04)' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `1.5px solid ${C.border}`, background: C.bg }}>
                          {['Service Name', 'Eyebrow Text', 'Tagline', 'Theme Color', 'Actions'].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {services.map(service => (
                          <tr key={service.id} className="admin-tr" style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={tdStyle}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '18px', color: service.theme_color || C.primary }}>✦</span>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: C.secondary }}>{service.title}</span>
                              </div>
                            </td>
                            <td style={tdStyle}><span style={{ fontSize: '12px', color: C.muted }}>{service.eyebrow || '—'}</span></td>
                            <td style={tdStyle}><span style={{ fontSize: '12px', color: C.secondary, display: 'block', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={service.tagline}>{service.tagline}</span></td>
                            <td style={tdStyle}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: service.theme_color || service.themeColor }} />
                                <span style={{ fontSize: '11px', fontFamily: 'monospace' }}>{service.theme_color || service.themeColor}</span>
                              </div>
                            </td>
                            <td style={tdStyle}>
                              <button type="button" onClick={() => {
                                setEditingService(service);
                                setServiceForm({
                                  title: service.title, eyebrow: service.eyebrow || '', tagline: service.tagline,
                                  description: service.description, icon: service.icon, themeColor: service.theme_color || service.themeColor,
                                  faqsJson: JSON.stringify(service.faqs || [], null, 2),
                                  benefitsJson: JSON.stringify(service.benefits || [], null, 2)
                                });
                                setShowServiceModal(true);
                              }}
                                style={{ background: C.lightBlue, border: 'none', color: C.primary, padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                                Customize Design & Content
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* ════════════════════════════════════════════════
          ASSIGN TASK MODAL
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showTaskModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', background:'rgba(26,41,74,0.45)', backdropFilter:'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) setShowTaskModal(false); }}>
            <motion.div initial={{ scale:0.93, y:20, opacity:0 }} animate={{ scale:1, y:0, opacity:1 }} exit={{ scale:0.93, y:20, opacity:0 }} transition={{ type:'spring', stiffness:320, damping:26 }}
              style={{ width:'100%', maxWidth:'500px', background: C.white, borderRadius:'24px', overflow:'hidden', boxShadow:'0 24px 80px rgba(26,41,74,0.2)' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ height:'4px', background:`linear-gradient(90deg, ${C.secondary}, ${C.primary}, ${C.accent})` }} />
              <div style={{ padding:'28px 30px 30px', overflowY:'auto', maxHeight:'calc(90vh - 4px)' }}>
                {/* Header */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'22px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                    <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:`linear-gradient(135deg, ${C.secondary}, ${C.primary})`, display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}>
                      <ClipboardList size={18} />
                    </div>
                    <div>
                      <h2 style={{ fontSize:'16px', fontWeight:600, color: C.secondary, margin:0 }}>Assign Task</h2>
                      <p style={{ fontSize:'12px', color: C.muted, marginTop:'2px' }}>Fill in task details and pick a staff member</p>
                    </div>
                  </div>
                  <button onClick={() => setShowTaskModal(false)}
                    style={{ width:'34px', height:'34px', borderRadius:'10px', background: C.bg, border:`1px solid ${C.border}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: C.muted, transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#FFF5F5'; e.currentTarget.style.color='#dc3545'; }}
                    onMouseLeave={e => { e.currentTarget.style.background=C.bg; e.currentTarget.style.color=C.muted; }}>
                    <X size={15} />
                  </button>
                </div>

                <form onSubmit={handleTaskSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                  <AnimatePresence>
                    {taskSuccess && (
                      <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        style={{ display:'flex', alignItems:'center', gap:'10px', background: C.lightGreen, border:`1px solid ${C.accent}40`, color: C.accent, padding:'12px 16px', borderRadius:'12px', fontSize:'13px', fontWeight:500 }}>
                        <CheckCircle2 size={15} style={{ flexShrink:0 }} /> {taskSuccess}
                      </motion.div>
                    )}
                    {taskError && (
                      <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        style={{ display:'flex', alignItems:'center', gap:'10px', background:'#FFF5F5', border:'1px solid #FCC', color:'#dc3545', padding:'12px 16px', borderRadius:'12px', fontSize:'13px', fontWeight:500 }}>
                        <AlertCircle size={15} style={{ flexShrink:0 }} /> {taskError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Assign To */}
                  <TField label="Assign To" icon={<User size={14} />}>
                    <div style={{ position:'relative' }}>
                      <select value={taskForm.assignedToId} onChange={e => { setTaskForm(p=>({...p, assignedToId:e.target.value})); setTaskError(''); }}
                        className="admin-select"
                        style={{ width:'100%', height:'46px', background: C.white, border:`1.5px solid ${C.border}`, borderRadius:'12px', color: taskForm.assignedToId ? C.secondary : C.muted, fontSize:'13px', fontWeight:400, paddingLeft:'14px', paddingRight:'34px', appearance:'none', cursor:'pointer', boxSizing:'border-box' }}>
                        <option value="">Select staff member…</option>
                        {staffUsers.map(u => <option key={u.id} value={u.id}>{u.fullName} — {u.department || u.position}</option>)}
                      </select>
                      <ChevronDown size={14} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color: C.muted }} />
                    </div>
                  </TField>

                  {/* Task Title */}
                  <TField label="Task Title" icon={<ClipboardList size={14} />}>
                    <input value={taskForm.title} onChange={e => { setTaskForm(p=>({...p, title:e.target.value})); setTaskError(''); }} required placeholder="e.g. Update patient records for Ward B"
                      className="admin-input"
                      style={{ width:'100%', height:'46px', background: C.white, border:`1.5px solid ${C.border}`, borderRadius:'12px', color: C.secondary, fontSize:'13px', fontWeight:400, paddingLeft:'14px', paddingRight:'14px', boxSizing:'border-box' }} />
                  </TField>

                  {/* Description */}
                  <TField label="Description (optional)" icon={<Flag size={14} />}>
                    <textarea value={taskForm.description} onChange={e => setTaskForm(p=>({...p, description:e.target.value}))} placeholder="Provide any additional details or instructions…"
                      style={{ width:'100%', background: C.white, border:`1.5px solid ${C.border}`, borderRadius:'12px', color: C.secondary, fontSize:'13px', fontWeight:400, padding:'12px 14px', boxSizing:'border-box', resize:'none', minHeight:'90px', outline:'none', fontFamily:"'Poppins',sans-serif", transition:'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor=C.primary}
                      onBlur={e => e.target.style.borderColor=C.border} />
                  </TField>

                  {/* Priority + Due Date */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                    <TField label="Priority" icon={<AlertTriangle size={14} />}>
                      <div style={{ position:'relative' }}>
                        <select value={taskForm.priority} onChange={e => setTaskForm(p=>({...p, priority:e.target.value}))}
                          className="admin-select"
                          style={{ width:'100%', height:'46px', background: C.white, border:`1.5px solid ${C.border}`, borderRadius:'12px', color: C.secondary, fontSize:'13px', fontWeight:400, paddingLeft:'14px', paddingRight:'34px', appearance:'none', cursor:'pointer', boxSizing:'border-box' }}>
                          <option>Low</option><option>Medium</option><option>High</option>
                        </select>
                        <ChevronDown size={14} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color: C.muted }} />
                      </div>
                    </TField>
                    <TField label="Due Date" icon={<CalendarDays size={14} />}>
                      <input type="date" value={taskForm.dueDate} onChange={e => setTaskForm(p=>({...p, dueDate:e.target.value}))}
                        className="admin-input"
                        style={{ width:'100%', height:'46px', background: C.white, border:`1.5px solid ${C.border}`, borderRadius:'12px', color: C.secondary, fontSize:'13px', fontWeight:400, paddingLeft:'14px', paddingRight:'14px', boxSizing:'border-box', cursor:'pointer' }} />
                    </TField>
                  </div>

                  {/* Submit */}
                  <button type="submit"
                    style={{ height:'48px', width:'100%', borderRadius:'14px', background:`linear-gradient(135deg, ${C.secondary}, ${C.primary})`, color:'white', fontSize:'13px', fontWeight:500, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', boxShadow:`0 6px 20px ${C.primary}25`, transition:'all 0.2s', marginTop:'4px' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow=`0 8px 28px ${C.primary}40`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow=`0 6px 20px ${C.primary}25`}>
                    <ClipboardList size={15} /> Assign Task
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Task Confirm */}
      <AnimatePresence>
        {deleteTaskConfirm && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', background:'rgba(26,41,74,0.5)', backdropFilter:'blur(8px)' }}>
            <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
              style={{ width:'100%', maxWidth:'340px', background: C.white, border:`1.5px solid #FCC`, borderRadius:'22px', padding:'30px', textAlign:'center', boxShadow:'0 24px 60px rgba(26,41,74,0.18)' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'#FFF5F5', border:'1.5px solid #FCC', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color:'#dc3545' }}>
                <Trash2 size={22} />
              </div>
              <h3 style={{ fontSize:'15px', fontWeight:600, color: C.secondary, marginBottom:'8px' }}>Delete this task?</h3>
              <p style={{ fontSize:'13px', color: C.muted, fontWeight:400, marginBottom:'22px', lineHeight:1.6 }}>This task will be permanently removed and the staff member will no longer see it.</p>
              <div style={{ display:'flex', gap:'10px' }}>
                <button onClick={() => setDeleteTaskConfirm(null)}
                  style={{ flex:1, height:'42px', borderRadius:'12px', background: C.bg, border:`1.5px solid ${C.border}`, color: C.muted, fontSize:'13px', fontWeight:500, cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor=C.primary}
                  onMouseLeave={e => e.currentTarget.style.borderColor=C.border}>
                  Cancel
                </button>
                <button onClick={() => { deleteTask(deleteTaskConfirm); setDeleteTaskConfirm(null); }}
                  style={{ flex:1, height:'42px', borderRadius:'12px', background:'#dc3545', border:'none', color:'white', fontSize:'13px', fontWeight:500, cursor:'pointer', boxShadow:'0 4px 14px rgba(220,53,69,0.3)', transition:'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#c82333'}
                  onMouseLeave={e => e.currentTarget.style.background='#dc3545'}>
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════
          CREATE MODAL
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', background:'rgba(26,41,74,0.45)', backdropFilter:'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) setShowCreateModal(false); }}>
            <motion.div initial={{ scale:0.93, y:20, opacity:0 }} animate={{ scale:1, y:0, opacity:1 }} exit={{ scale:0.93, y:20, opacity:0 }} transition={{ type:'spring', stiffness:320, damping:26 }}
              style={{ width:'100%', maxWidth:'520px', background: C.white, borderRadius:'24px', overflow:'hidden', boxShadow:'0 24px 80px rgba(26,41,74,0.2)' }}
              onClick={e => e.stopPropagation()}>

              {/* Accent top bar */}
              <div style={{ height:'4px', background:`linear-gradient(90deg, ${C.secondary}, ${C.primary}, ${C.accent})` }} />

              <div style={{ overflowY:'auto', maxHeight:'calc(90vh - 4px)', padding:'28px 32px 32px' }}>
                {/* Header */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                    <div style={{ width:'44px', height:'44px', borderRadius:'14px', background:`linear-gradient(135deg, ${C.secondary}, ${C.primary})`, display:'flex', alignItems:'center', justifyContent:'center', color:'white', boxShadow:`0 6px 18px ${C.primary}30` }}>
                      <UserPlus size={20} />
                    </div>
                    <div>
                      <h2 style={{ fontSize:'17px', fontWeight:600, color: C.secondary, textTransform:'uppercase', letterSpacing:'0.04em', fontFamily:"'Poppins',sans-serif", margin:0 }}>Create Staff Account</h2>
                      <p style={{ fontSize:'12px', color: C.muted, fontWeight:500, marginTop:'3px' }}>Fill in details to create login credentials</p>
                    </div>
                  </div>
                  <button onClick={() => setShowCreateModal(false)}
                    style={{ width:'34px', height:'34px', borderRadius:'10px', background: C.bg, border:`1px solid ${C.border}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: C.muted, transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#FFF5F5'; e.currentTarget.style.borderColor='#FCC'; e.currentTarget.style.color='#dc3545'; }}
                    onMouseLeave={e => { e.currentTarget.style.background=C.bg; e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}>
                    <X size={15} />
                  </button>
                </div>

                <form onSubmit={handleCreateSubmit} style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
                  <AnimatePresence>
                    {formSuccess && (
                      <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        style={{ display:'flex', alignItems:'center', gap:'10px', background: C.lightGreen, border:`1px solid ${C.accent}40`, color: C.accent, padding:'12px 16px', borderRadius:'12px', fontSize:'13px', fontWeight:500 }}>
                        <CheckCircle2 size={16} style={{ flexShrink:0 }} /> {formSuccess}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {formError && (
                      <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        style={{ display:'flex', alignItems:'center', gap:'10px', background:'#FFF5F5', border:'1px solid #FCC', color:'#dc3545', padding:'12px 16px', borderRadius:'12px', fontSize:'13px', fontWeight:500 }}>
                        <AlertCircle size={16} style={{ flexShrink:0 }} /> {formError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <LField label="Full Name" icon={<Users size={14} />}>
                    <LInput placeholder="e.g. Clara Oswald" value={form.fullName} onChange={v => handleFieldChange('fullName', v)} required />
                  </LField>
                  <LField label="Staff ID — used as login username" icon={<KeyRound size={14} />}>
                    <LInput placeholder="e.g. STF-CO1234" value={form.staffId} onChange={v => handleFieldChange('staffId', v)} required />
                  </LField>

                  <div className="grid grid-cols-2 gap-4">
                    <LField label="Position" icon={<Briefcase size={14} />}>
                      <LSelect value={form.position} onChange={v => handleFieldChange('position', v)} options={POSITIONS} />
                    </LField>
                    <LField label="Department" icon={<Building2 size={14} />}>
                      <LSelect value={form.department} onChange={v => handleFieldChange('department', v)} options={DEPARTMENTS} />
                    </LField>
                  </div>

                  <LField label="Password" icon={<KeyRound size={14} />}>
                    <div style={{ position:'relative' }}>
                      <LInput type={showPw ? 'text' : 'password'} placeholder="Create a password" value={form.password} onChange={v => handleFieldChange('password', v)} required pr="40px" />
                      <button type="button" onClick={() => setShowPw(!showPw)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color: C.muted, padding:'4px', display:'flex' }}>
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {form.password && pwStrength && (
                      <div style={{ marginTop:'8px' }}>
                        <div style={{ height:'5px', background: C.border, borderRadius:'99px', overflow:'hidden' }}>
                          <div className="pw-bar" style={{ height:'100%', width: pwStrength.pct, background: pwStrength.color, borderRadius:'99px' }} />
                        </div>
                        <span style={{ fontSize:'11px', fontWeight:500, color: pwStrength.color, marginTop:'4px', display:'inline-block' }}>{pwStrength.label} password</span>
                      </div>
                    )}
                  </LField>

                  <LField label="Confirm Password" icon={<KeyRound size={14} />}>
                    <div style={{ position:'relative' }}>
                      <LInput type={showConfirmPw ? 'text' : 'password'} placeholder="Repeat the password" value={form.confirmPassword} onChange={v => handleFieldChange('confirmPassword', v)} required pr="40px" />
                      <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color: C.muted, padding:'4px', display:'flex' }}>
                        {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {form.confirmPassword && (
                      <span style={{ fontSize:'11px', fontWeight:500, color: form.password === form.confirmPassword ? C.accent : '#dc3545', marginTop:'4px', display:'inline-block' }}>
                        {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </span>
                    )}
                  </LField>

                  <motion.button type="submit" disabled={isSubmitting}
                    className={`submit-glow ${!isSubmitting ? 'admin-shimmer-btn' : ''}`}
                    whileTap={{ scale:0.98 }}
                    style={{ height:'50px', width:'100%', borderRadius:'14px', color:'white', fontSize:'13px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', border:'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', opacity: isSubmitting ? 0.7 : 1, background: isSubmitting ? C.primary : undefined, transition:'all 0.2s', marginTop:'4px', fontFamily:"'Poppins',sans-serif" }}>
                    {isSubmitting
                      ? <div style={{ width:'18px', height:'18px', border:'2px solid rgba(255,255,255,0.4)', borderTop:'2px solid white', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
                      : <><UserPlus size={15} /> Create Account</>}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRM */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', background:'rgba(26,41,74,0.5)', backdropFilter:'blur(8px)' }}>
            <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
              style={{ width:'100%', maxWidth:'360px', background: C.white, border:`1.5px solid #FCC`, borderRadius:'22px', padding:'32px', textAlign:'center', boxShadow:'0 24px 60px rgba(26,41,74,0.18)' }}>
              <div style={{ width:'56px', height:'56px', borderRadius:'16px', background:'#FFF5F5', border:'1.5px solid #FCC', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', color:'#dc3545' }}>
                <Trash2 size={24} />
              </div>
              <h3 style={{ fontSize:'16px', fontWeight:600, color: C.secondary, fontFamily:"'Poppins',sans-serif", marginBottom:'10px' }}>Remove Staff Account?</h3>
              <p style={{ fontSize:'13px', color: C.muted, fontWeight:500, marginBottom:'24px', lineHeight:1.7 }}>
                This account will be permanently deleted. The staff member will no longer be able to log in.
              </p>
              <div style={{ display:'flex', gap:'10px' }}>
                <button onClick={() => setDeleteConfirm(null)}
                  style={{ flex:1, height:'44px', borderRadius:'12px', background: C.bg, border:`1.5px solid ${C.border}`, color: C.muted, fontSize:'12px', fontWeight:500, cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.07em', transition:'all 0.2s', fontFamily:"'Poppins',sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  Cancel
                </button>
                <button onClick={() => { deleteStaffUser(deleteConfirm); setDeleteConfirm(null); }}
                  style={{ flex:1, height:'44px', borderRadius:'12px', background:'#dc3545', border:'none', color:'white', fontSize:'12px', fontWeight:600, cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.07em', transition:'all 0.2s', boxShadow:'0 4px 16px rgba(220,53,69,0.3)', fontFamily:"'Poppins',sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.background='#c82333'}
                  onMouseLeave={e => e.currentTarget.style.background='#dc3545'}>
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BLOG EDITOR MODAL */}
      <AnimatePresence>
        {showBlogModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(26,41,74,0.45)', backdropFilter: 'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) setShowBlogModal(false); }}>
            <motion.div initial={{ scale: 0.93, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.93, y: 20, opacity: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              style={{ width: '100%', maxWidth: '650px', background: C.white, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(26,41,74,0.2)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
              onClick={e => e.stopPropagation()}>
              
              <div style={{ padding: '24px 32px', borderBottom: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.bg }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: C.secondary, margin: 0, fontFamily: "'Poppins',sans-serif" }}>
                  {editingBlog ? `Edit Blog Post: ${editingBlog.title}` : 'Create Blog Post'}
                </h3>
                <button onClick={() => setShowBlogModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: '4px' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleBlogSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', flex: 1 }}>
                <TField label="Blog Title" icon={<ClipboardList size={14} />}>
                  <LInput placeholder="Title" value={blogForm.title} onChange={v => setBlogForm(prev => ({ ...prev, title: v }))} required />
                </TField>

                <div className="grid grid-cols-2 gap-4">
                  <TField label="Category" icon={<ClipboardList size={14} />}>
                    <LInput placeholder="e.g. Home Healthcare" value={blogForm.category} onChange={v => setBlogForm(prev => ({ ...prev, category: v }))} required />
                  </TField>
                  <TField label="Read Time" icon={<Clock size={14} />}>
                    <LInput placeholder="e.g. 5 min read" value={blogForm.readTime} onChange={v => setBlogForm(prev => ({ ...prev, readTime: v }))} required />
                  </TField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <TField label="Author" icon={<User size={14} />}>
                    <LInput placeholder="e.g. Corx" value={blogForm.author} onChange={v => setBlogForm(prev => ({ ...prev, author: v }))} required />
                  </TField>
                  <TField label="Publish Date" icon={<CalendarDays size={14} />}>
                    <LInput placeholder="e.g. July 11, 2026 (Leave empty for today)" value={blogForm.date} onChange={v => setBlogForm(prev => ({ ...prev, date: v }))} />
                  </TField>
                </div>

                <TField label="Image URL" icon={<ClipboardList size={14} />}>
                  <LInput placeholder="Image link" value={blogForm.image} onChange={v => setBlogForm(prev => ({ ...prev, image: v }))} required />
                </TField>

                <TField label="Short Excerpt" icon={<ClipboardList size={14} />}>
                  <textarea value={blogForm.excerpt} onChange={e => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))} placeholder="Brief summary of the article..." required
                    style={{ width: '100%', minHeight: '60px', background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '12px', color: C.secondary, fontSize: '13px', fontWeight: 500, padding: '12px 14px', resize: 'vertical', fontFamily: "'Poppins',sans-serif" }} />
                </TField>

                <TField label="Content (HTML)" icon={<ClipboardList size={14} />}>
                  <textarea value={blogForm.content} onChange={e => setBlogForm(prev => ({ ...prev, content: e.target.value }))} placeholder="<p>Full content goes here...</p>" required
                    style={{ width: '100%', minHeight: '150px', background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '12px', color: C.secondary, fontSize: '13px', fontWeight: 500, padding: '12px 14px', resize: 'vertical', fontFamily: "'Poppins',sans-serif" }} />
                </TField>

                <motion.button type="submit" className="admin-shimmer-btn" whileTap={{ scale: 0.98 }}
                  style={{ height: '48px', width: '100%', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins',sans-serif", marginTop: '8px' }}>
                  Save Post
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SERVICE EDITOR MODAL */}
      <AnimatePresence>
        {showServiceModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(26,41,74,0.45)', backdropFilter: 'blur(8px)' }}
            onClick={e => { if (e.target === e.currentTarget) setShowServiceModal(false); }}>
            <motion.div initial={{ scale: 0.93, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.93, y: 20, opacity: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              style={{ width: '100%', maxWidth: '650px', background: C.white, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(26,41,74,0.2)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
              onClick={e => e.stopPropagation()}>
              
              <div style={{ padding: '24px 32px', borderBottom: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.bg }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: C.secondary, margin: 0, fontFamily: "'Poppins',sans-serif" }}>
                  Edit Service: {editingService?.title}
                </h3>
                <button onClick={() => setShowServiceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: '4px' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleServiceSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', flex: 1 }}>
                <TField label="Service Title" icon={<ClipboardList size={14} />}>
                  <LInput placeholder="Title" value={serviceForm.title} onChange={v => setServiceForm(prev => ({ ...prev, title: v }))} required />
                </TField>

                <div className="grid grid-cols-2 gap-4">
                  <TField label="Eyebrow text" icon={<ClipboardList size={14} />}>
                    <LInput placeholder="e.g. DHA-licensed nursing" value={serviceForm.eyebrow} onChange={v => setServiceForm(prev => ({ ...prev, eyebrow: v }))} />
                  </TField>
                  <TField label="Lucide Icon Name" icon={<ClipboardList size={14} />}>
                    <LInput placeholder="e.g. Heart" value={serviceForm.icon} onChange={v => setServiceForm(prev => ({ ...prev, icon: v }))} required />
                  </TField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <TField label="Theme Color" icon={<ClipboardList size={14} />}>
                    <LInput placeholder="e.g. #08709d" value={serviceForm.themeColor} onChange={v => setServiceForm(prev => ({ ...prev, themeColor: v }))} required />
                  </TField>
                  <TField label="Tagline" icon={<ClipboardList size={14} />}>
                    <LInput placeholder="Catchphrase" value={serviceForm.tagline} onChange={v => setServiceForm(prev => ({ ...prev, tagline: v }))} required />
                  </TField>
                </div>

                <TField label="Description" icon={<ClipboardList size={14} />}>
                  <textarea value={serviceForm.description} onChange={e => setServiceForm(prev => ({ ...prev, description: e.target.value }))} placeholder="Detailed service description..." required
                    style={{ width: '100%', minHeight: '80px', background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '12px', color: C.secondary, fontSize: '13px', fontWeight: 500, padding: '12px 14px', resize: 'vertical', fontFamily: "'Poppins',sans-serif" }} />
                </TField>

                <TField label="Benefits List (JSON Array)" icon={<ClipboardList size={14} />}>
                  <textarea value={serviceForm.benefitsJson} onChange={e => setServiceForm(prev => ({ ...prev, benefitsJson: e.target.value }))} required
                    style={{ width: '100%', minHeight: '80px', background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '12px', color: C.secondary, fontSize: '12px', fontWeight: 500, padding: '12px 14px', resize: 'vertical', fontFamily: 'monospace' }} />
                </TField>

                <TField label="FAQs List (JSON Array)" icon={<ClipboardList size={14} />}>
                  <textarea value={serviceForm.faqsJson} onChange={e => setServiceForm(prev => ({ ...prev, faqsJson: e.target.value }))} required
                    style={{ width: '100%', minHeight: '100px', background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '12px', color: C.secondary, fontSize: '12px', fontWeight: 500, padding: '12px 14px', resize: 'vertical', fontFamily: 'monospace' }} />
                </TField>

                <motion.button type="submit" className="admin-shimmer-btn" whileTap={{ scale: 0.98 }}
                  style={{ height: '48px', width: '100%', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins',sans-serif", marginTop: '8px' }}>
                  Save Service Content
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Light-theme modal helpers ───────────────────────────────────────────── */
const TField = ({ label, icon, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
    <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
      <span style={{ color: C.primary }}>{icon}</span>
      <label style={{ fontSize:'11px', fontWeight:500, color: C.secondary, textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:"'Poppins',sans-serif" }}>{label}</label>
    </div>
    {children}
  </div>
);

const LField = ({ label, icon, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
    <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
      <span style={{ color: C.primary }}>{icon}</span>
      <label style={{ fontSize:'11px', fontWeight:500, color: C.secondary, textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:"'Poppins',sans-serif" }}>{label}</label>
    </div>
    {children}
  </div>
);

const LInput = ({ type='text', placeholder, value, onChange, required, pr }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} required={required}
    className="admin-input"
    style={{ width:'100%', height:'46px', background: C.white, border:`1.5px solid ${C.border}`, borderRadius:'12px', color: C.secondary, fontSize:'13px', fontWeight:500, paddingLeft:'14px', paddingRight: pr || '14px', transition:'all 0.2s', boxSizing:'border-box', fontFamily:"'Poppins',sans-serif" }} />
);

const LSelect = ({ value, onChange, options }) => (
  <div style={{ position:'relative' }}>
    <select value={value} onChange={e => onChange(e.target.value)}
      className="admin-select"
      style={{ width:'100%', height:'46px', background: C.white, border:`1.5px solid ${C.border}`, borderRadius:'12px', color: value ? C.secondary : C.muted, fontSize:'13px', fontWeight:500, paddingLeft:'14px', paddingRight:'34px', appearance:'none', cursor:'pointer', transition:'all 0.2s', boxSizing:'border-box', fontFamily:"'Poppins',sans-serif" }}>
      <option value="">Select…</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <svg style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color: C.muted }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
  </div>
);

/* ─── Styles and Helpers for Reports ─── */
const thStyle = {
  textAlign: 'left', fontSize: '10px', fontWeight: 600, color: C.muted,
  textTransform: 'uppercase', letterSpacing: '0.12em', padding: '12px 20px',
  fontFamily: "'Poppins',sans-serif"
};

const tdStyle = {
  padding: '14px 20px', verticalAlign: 'middle'
};

const approveBtnStyle = {
  background: C.lightGreen, border: `1px solid ${C.accent}40`, color: C.accent,
  padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
  cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Poppins',sans-serif"
};

const rejectBtnStyle = {
  background: '#FFF5F5', border: '1px solid #FCC', color: '#dc3545',
  padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
  cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Poppins',sans-serif"
};

const StaffMemberCell = ({ name, id, dep, pos }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <div style={{
      width: '32px', height: '32px', borderRadius: '8px',
      background: `linear-gradient(135deg, ${C.lightBlue}, #D4EDF7)`,
      border: `1.5px solid ${C.primary}20`, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: C.primary, fontSize: '12px', fontWeight: 600, flexShrink: 0
    }}>
      {getInitials(name)}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <span style={{ fontSize: '13px', fontWeight: 500, color: C.secondary }}>{name}</span>
      <span style={{ fontSize: '10px', color: C.muted }}>{id} · {pos || dep || 'Staff'}</span>
    </div>
  </div>
);

const AppBadge = ({ status }) => {
  const cfg = APP_STATUS_CFG[status] || APP_STATUS_CFG.Pending;
  return (
    <span style={{
      background: cfg.bg, border: `1px solid ${cfg.color}30`, color: cfg.color,
      fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
      padding: '4px 10px', borderRadius: '999px', fontFamily: "'Poppins',sans-serif"
    }}>
      {cfg.label}
    </span>
  );
};

const ReportPanelWrapper = ({ title, count, children }) => (
  <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(26,41,74,0.06)' }}>
    <div style={{ padding: '16px 24px', borderBottom: `1.5px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.bg }}>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: C.secondary, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
      </div>
      <span style={{ fontSize: '11px', fontWeight: 600, color: C.muted, background: C.border, padding: '2px 8px', borderRadius: '6px' }}>
        {count} submission{count !== 1 ? 's' : ''}
      </span>
    </div>
    {children}
  </div>
);

const EmptyReportState = ({ label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: C.lightBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
      <ClipboardList size={24} style={{ color: C.primary, opacity: 0.5 }} />
    </div>
    <p style={{ color: C.muted, fontSize: '13px', fontWeight: 500 }}>{label}</p>
  </div>
);

export default AdminDashboard;
