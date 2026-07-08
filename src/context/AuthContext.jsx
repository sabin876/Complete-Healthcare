import { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000/api';
const SESSION_KEY = 'chc_current_user';

const AuthContext = createContext(null);

// Translation helpers: snake_case to camelCase
const mapStaff = (s) => s ? {
  id: s.id,
  staffId: s.staff_id,
  fullName: s.full_name,
  position: s.position,
  department: s.department,
  password: s.password,
  role: s.role,
  createdAt: s.created_at
} : null;

const mapTask = (t) => t ? {
  id: t.id,
  title: t.title,
  description: t.description,
  priority: t.priority,
  dueDate: t.due_date,
  assignedToId: t.assigned_to,
  assignedToName: t.assigned_to_name,
  assignedByName: t.assigned_by_name,
  status: t.status,
  createdAt: t.created_at,
  updatedAt: t.updated_at
} : null;

const mapLeave = (l) => l ? {
  id: l.id,
  staffId: l.staff,
  staffName: l.staff_name,
  staffDep: l.staff_dep,
  staffPosition: l.staff_position,
  leaveType: l.leave_type,
  leaveStart: l.leave_start,
  leaveEnd: l.leave_end,
  reason: l.reason,
  status: l.status,
  submittedAt: l.submitted_at
} : null;

const mapOt = (o) => o ? {
  id: o.id,
  staffId: o.staff,
  staffName: o.staff_name,
  staffDep: o.staff_dep,
  staffPosition: o.staff_position,
  otType: o.ot_type,
  otDate: o.ot_date,
  otHours: o.ot_hours,
  status: o.status,
  submittedAt: o.submitted_at
} : null;

const mapSalary = (s) => s ? {
  id: s.id,
  staffId: s.staff,
  staffName: s.staff_name,
  staffDep: s.staff_dep,
  staffPosition: s.staff_position,
  incType: s.inc_type,
  status: s.status,
  submittedAt: s.submitted_at
} : null;

const mapNotice = (n) => n ? {
  id: n.id,
  staffId: n.staff,
  staffName: n.staff_name,
  noticeTitle: n.notice_title,
  noticeMessage: n.notice_message,
  status: n.status,
  submittedAt: n.submitted_at
} : null;

const mapDuty = (d) => d ? {
  id: d.id,
  staffId: d.staff,
  staffName: d.staff_name,
  dutyDate: d.duty_date,
  dutyReplacement: d.duty_replacement,
  dutyReason: d.duty_reason,
  status: d.status,
  submittedAt: d.submitted_at
} : null;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [staffUsers, setStaffUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [otApplications, setOtApplications] = useState([]);
  const [salaryApplications, setSalaryApplications] = useState([]);
  const [noticeApplications, setNoticeApplications] = useState([]);
  const [dutyApplications, setDutyApplications] = useState([]);
  const [loginError, setLoginError] = useState('');

  // Fetch all backend data
  const fetchData = async (user) => {
    if (!user) return;
    const isAd = user.role === 'admin';
    const query = isAd ? '' : `?staff_id=${user.id}`;
    const taskQuery = isAd ? '' : `?assigned_to=${user.id}`;

    try {
      if (isAd) {
        const staffRes = await fetch(`${API_BASE}/staff/`);
        if (staffRes.ok) {
          const list = await staffRes.json();
          setStaffUsers(list.map(mapStaff));
        }
      }

      const tasksRes = await fetch(`${API_BASE}/tasks/${taskQuery}`);
      if (tasksRes.ok) {
        const list = await tasksRes.json();
        setTasks(list.map(mapTask));
      }

      const leavesRes = await fetch(`${API_BASE}/leaves/${query}`);
      if (leavesRes.ok) {
        const list = await leavesRes.json();
        setLeaveApplications(list.map(mapLeave));
      }

      const otsRes = await fetch(`${API_BASE}/ots/${query}`);
      if (otsRes.ok) {
        const list = await otsRes.json();
        setOtApplications(list.map(mapOt));
      }

      const salariesRes = await fetch(`${API_BASE}/salaries/${query}`);
      if (salariesRes.ok) {
        const list = await salariesRes.json();
        setSalaryApplications(list.map(mapSalary));
      }

      const noticesRes = await fetch(`${API_BASE}/notices/${query}`);
      if (noticesRes.ok) {
        const list = await noticesRes.json();
        setNoticeApplications(list.map(mapNotice));
      }

      const dutiesRes = await fetch(`${API_BASE}/duties/${query}`);
      if (dutiesRes.ok) {
        const list = await dutiesRes.json();
        setDutyApplications(list.map(mapDuty));
      }
    } catch (err) {
      console.error('Error fetching data from API:', err);
    }
  };

  // Persist session to localStorage and fetch content
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData(currentUser);
    } else {
      localStorage.removeItem(SESSION_KEY);
      // Clear data states
      setStaffUsers([]);
      setTasks([]);
      setLeaveApplications([]);
      setOtApplications([]);
      setSalaryApplications([]);
      setNoticeApplications([]);
      setDutyApplications([]);
    }
  }, [currentUser]);

  const login = async (id, password) => {
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId: id, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentUser(data.user);
        return data.user;
      } else {
        setLoginError(data.message || 'Invalid ID or password. Please try again.');
        return null;
      }
    } catch {
      setLoginError('Could not connect to the authentication server.');
      return null;
    }
  };

  const logout = () => setCurrentUser(null);

  const createStaffUser = async (staffData) => {
    try {
      const res = await fetch(`${API_BASE}/staff/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: staffData.fullName,
          staffId: staffData.staffId,
          position: staffData.position,
          department: staffData.department,
          password: staffData.password,
          role: 'staff'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchData(currentUser);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Failed to create staff account.' };
      }
    } catch {
      return { success: false, message: 'Could not connect to server.' };
    }
  };

  const deleteStaffUser = async (staffId) => {
    try {
      const res = await fetch(`${API_BASE}/staff/${staffId}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchData(currentUser);
      }
    } catch (err) {
      console.error('Error deleting staff:', err);
    }
  };

  const createTask = async (taskData) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          dueDate: taskData.dueDate,
          assignedToId: taskData.assignedToId,
          assignedByName: taskData.assignedByName
        })
      });
      if (res.ok) {
        await fetchData(currentUser);
        return mapTask(await res.json());
      }
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${taskId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchData(currentUser);
      }
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${taskId}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchData(currentUser);
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const getTasksForStaff = (staffId) => {
    return tasks.filter((t) => t.assignedToId === staffId);
  };

  const createLeaveApplication = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/leaves/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: data.staffId,
          leaveType: data.leaveType,
          leaveStart: data.leaveStart,
          leaveEnd: data.leaveEnd,
          reason: data.reason
        })
      });
      if (res.ok) {
        await fetchData(currentUser);
        return mapLeave(await res.json());
      }
    } catch (err) {
      console.error('Error applying for leave:', err);
    }
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/leaves/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchData(currentUser);
      }
    } catch (err) {
      console.error('Error updating leave status:', err);
    }
  };

  const createOtApplication = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/ots/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: data.staffId,
          otType: data.otType,
          otDate: data.otDate,
          otHours: data.otHours
        })
      });
      if (res.ok) {
        await fetchData(currentUser);
        return mapOt(await res.json());
      }
    } catch (err) {
      console.error('Error logging OT:', err);
    }
  };

  const updateOtStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/ots/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchData(currentUser);
      }
    } catch (err) {
      console.error('Error updating OT status:', err);
    }
  };

  const createSalaryApplication = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/salaries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: data.staffId,
          incType: data.incType
        })
      });
      if (res.ok) {
        await fetchData(currentUser);
        return mapSalary(await res.json());
      }
    } catch (err) {
      console.error('Error applying for salary increment:', err);
    }
  };

  const updateSalaryStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/salaries/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchData(currentUser);
      }
    } catch (err) {
      console.error('Error updating salary status:', err);
    }
  };

  const createNoticeApplication = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/notices/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: data.staffId,
          noticeTitle: data.noticeTitle,
          noticeMessage: data.noticeMessage
        })
      });
      if (res.ok) {
        await fetchData(currentUser);
        return mapNotice(await res.json());
      }
    } catch (err) {
      console.error('Error creating notice:', err);
    }
  };

  const updateNoticeStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/notices/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchData(currentUser);
      }
    } catch (err) {
      console.error('Error updating notice status:', err);
    }
  };

  const createDutyApplication = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/duties/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: data.staffId,
          dutyDate: data.dutyDate,
          dutyReplacement: data.dutyReplacement,
          dutyReason: data.dutyReason
        })
      });
      if (res.ok) {
        await fetchData(currentUser);
        return mapDuty(await res.json());
      }
    } catch (err) {
      console.error('Error creating duty replacement:', err);
    }
  };

  const updateDutyStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/duties/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchData(currentUser);
      }
    } catch (err) {
      console.error('Error updating duty status:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser, staffUsers, loginError, setLoginError,
        login, logout, createStaffUser, deleteStaffUser,
        tasks, createTask, updateTaskStatus, deleteTask, getTasksForStaff,
        leaveApplications, createLeaveApplication, updateLeaveStatus,
        otApplications, createOtApplication, updateOtStatus,
        salaryApplications, createSalaryApplication, updateSalaryStatus,
        noticeApplications, createNoticeApplication, updateNoticeStatus,
        dutyApplications, createDutyApplication, updateDutyStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export default AuthContext;
