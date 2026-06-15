import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Hardcoded Admin Credentials ───────────────────────────────────────────
const ADMIN_CREDENTIALS = {
  id: 'ADMIN-001',
  password: 'Admin@2024',
  name: 'System Administrator',
  role: 'admin',
};

// ─── Seeded Default Staff Credentials ──────────────────────────────────────
const DEFAULT_STAFF = [
  {
    id: 'STF-DEMO-001',
    fullName: 'Clara Oswald',
    staffId: 'STF-CO1234',
    position: 'Senior Nurse',
    department: 'Home Nursing',
    password: 'Staff@2024',
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'STF-DEMO-002',
    fullName: 'John Smith',
    staffId: 'STF-JS5678',
    position: 'Physiotherapist',
    department: 'Physiotherapy',
    password: 'Staff@2024',
    createdAt: new Date('2026-01-01').toISOString(),
  }
];

const STORAGE_KEY  = 'chc_staff_users';
const SESSION_KEY  = 'chc_current_user';
const TASKS_KEY    = 'chc_tasks';
const LEAVE_KEY    = 'chc_leave_applications';
const OT_KEY       = 'chc_ot_applications';
const SALARY_KEY   = 'chc_salary_applications';
const NOTICE_KEY   = 'chc_notice_applications';
const DUTY_KEY     = 'chc_duty_applications';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ── Staff list ────────────────────────────────────────────────────────────
  const [staffUsers, setStaffUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) return parsed;
      }
      return DEFAULT_STAFF;
    } catch {
      return DEFAULT_STAFF;
    }
  });

  // ── Current session ───────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  // ── Tasks ─────────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(TASKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // ── Report Applications ───────────────────────────────────────────────────
  const [leaveApplications, setLeaveApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(LEAVE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [otApplications, setOtApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(OT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [salaryApplications, setSalaryApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(SALARY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [noticeApplications, setNoticeApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(NOTICE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [dutyApplications, setDutyApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(DUTY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [loginError, setLoginError] = useState('');

  // ── Persistence ───────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staffUsers));
  }, [staffUsers]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    else localStorage.removeItem(SESSION_KEY);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(LEAVE_KEY, JSON.stringify(leaveApplications));
  }, [leaveApplications]);

  useEffect(() => {
    localStorage.setItem(OT_KEY, JSON.stringify(otApplications));
  }, [otApplications]);

  useEffect(() => {
    localStorage.setItem(SALARY_KEY, JSON.stringify(salaryApplications));
  }, [salaryApplications]);

  useEffect(() => {
    localStorage.setItem(NOTICE_KEY, JSON.stringify(noticeApplications));
  }, [noticeApplications]);

  useEffect(() => {
    localStorage.setItem(DUTY_KEY, JSON.stringify(dutyApplications));
  }, [dutyApplications]);

  // ── Auth actions ──────────────────────────────────────────────────────────
  const login = (id, password) => {
    setLoginError('');
    if (id.trim() === ADMIN_CREDENTIALS.id && password === ADMIN_CREDENTIALS.password) {
      const user = { id: ADMIN_CREDENTIALS.id, name: ADMIN_CREDENTIALS.name, role: 'admin' };
      setCurrentUser(user);
      return user;
    }
    const staffMatch = staffUsers.find(
      (u) => u.staffId.trim() === id.trim() && u.password === password
    );
    if (staffMatch) {
      const user = {
        id: staffMatch.staffId,
        name: staffMatch.fullName,
        role: 'staff',
        department: staffMatch.department,
        position: staffMatch.position,
      };
      setCurrentUser(user);
      return user;
    }
    setLoginError('Invalid ID or password. Please try again.');
    return null;
  };

  const logout = () => setCurrentUser(null);

  const createStaffUser = ({ fullName, staffId, position, department, password }) => {
    const duplicate = staffUsers.find(
      (u) => u.staffId.trim().toLowerCase() === staffId.trim().toLowerCase()
    );
    if (duplicate) return { success: false, message: `Staff ID "${staffId}" already exists.` };
    if (staffId.trim() === ADMIN_CREDENTIALS.id)
      return { success: false, message: 'That ID is reserved for the admin account.' };

    const newUser = {
      id: Date.now().toString(),
      fullName, staffId: staffId.trim(), position, department, password,
      createdAt: new Date().toISOString(),
    };
    setStaffUsers((prev) => [...prev, newUser]);
    return { success: true, message: `Account for "${fullName}" created successfully.` };
  };

  const deleteStaffUser = (internalId) => {
    setStaffUsers((prev) => prev.filter((u) => u.id !== internalId));
    // Remove tasks assigned to this staff member
    setTasks((prev) => prev.filter((t) => t.assignedToId !== internalId));
  };

  // ── Task actions ──────────────────────────────────────────────────────────

  /**
   * Assign a new task to a staff member (admin only).
   * @param {{ title, description, priority, dueDate, assignedToId, assignedToName }} taskData
   */
  const createTask = (taskData) => {
    const newTask = {
      id: `TASK-${Date.now()}`,
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'Medium',
      dueDate: taskData.dueDate || '',
      assignedToId: taskData.assignedToId,
      assignedToName: taskData.assignedToName,
      assignedByName: taskData.assignedByName || 'Admin',
      status: 'Pending',         // Pending | In Progress | Completed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  /**
   * Update the status of a task (staff updates their own task).
   */
  const updateTaskStatus = (taskId, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  /**
   * Delete a task (admin only).
   */
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  /**
   * Get tasks for a specific staff member (by staffId string).
   */
  const getTasksForStaff = (staffId) =>
    tasks.filter((t) => t.assignedToId === staffId);

  // ── Report Actions ────────────────────────────────────────────────────────
  const createLeaveApplication = (data) => {
    const newRecord = {
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    };
    setLeaveApplications((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateLeaveStatus = (id, status) => {
    setLeaveApplications((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const createOtApplication = (data) => {
    const newRecord = {
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    };
    setOtApplications((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateOtStatus = (id, status) => {
    setOtApplications((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const createSalaryApplication = (data) => {
    const newRecord = {
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    };
    setSalaryApplications((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateSalaryStatus = (id, status) => {
    setSalaryApplications((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const createNoticeApplication = (data) => {
    const newRecord = {
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    };
    setNoticeApplications((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateNoticeStatus = (id, status) => {
    setNoticeApplications((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const createDutyApplication = (data) => {
    const newRecord = {
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    };
    setDutyApplications((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateDutyStatus = (id, status) => {
    setDutyApplications((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
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
