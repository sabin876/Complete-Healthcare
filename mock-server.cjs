const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const DB_FILE = path.join(__dirname, 'db.json');

// Helper to generate IDs
const generateId = () => Math.floor(Math.random() * 1000000);

// Default initial database content
const defaultDb = {
  staff: [
    {
      id: 1,
      staff_id: 'ADMIN-001',
      full_name: 'System Administrator',
      position: 'Admin Officer',
      department: 'Administration',
      password: 'Admin@2024',
      role: 'admin',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      staff_id: 'STF-CO1234',
      full_name: 'Clara Oswald',
      position: 'Senior Nurse',
      department: 'Home Nursing',
      password: 'Staff@2024',
      role: 'staff',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      staff_id: 'STF-JS5678',
      full_name: 'John Smith',
      position: 'Physiotherapist',
      department: 'Physiotherapy',
      password: 'Staff@2024',
      role: 'staff',
      created_at: new Date().toISOString()
    }
  ],
  tasks: [
    {
      id: 1,
      title: 'DHA Nursing Compliance Review',
      description: 'Ensure all patient files for this week have updated vitals logs and signed DHA consent forms.',
      priority: 'High',
      due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assigned_to: 'STF-CO1234',
      assigned_to_name: 'Clara Oswald',
      assigned_by_name: 'System Administrator',
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Home Patient Assessment',
      description: 'Perform a routine checkup and vital assessment for Patient ID: PAT-992 (Mr. Henderson).',
      priority: 'Medium',
      due_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assigned_to: 'STF-CO1234',
      assigned_to_name: 'Clara Oswald',
      assigned_by_name: 'System Administrator',
      status: 'In Progress',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  leaves: [
    {
      id: 1,
      staff: 'STF-CO1234',
      staff_name: 'Clara Oswald',
      staff_dep: 'Home Nursing',
      staff_position: 'Senior Nurse',
      leave_type: 'Annual Leave',
      leave_start: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      leave_end: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reason: 'Family vacation trip',
      status: 'Approved',
      submitted_at: new Date().toISOString()
    }
  ],
  ots: [
    {
      id: 1,
      staff: 'STF-CO1234',
      staff_name: 'Clara Oswald',
      staff_dep: 'Home Nursing',
      staff_position: 'Senior Nurse',
      ot_type: 'Weekend Shift',
      ot_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      ot_hours: '6.5',
      status: 'Pending',
      submitted_at: new Date().toISOString()
    }
  ],
  salaries: [],
  notices: [],
  duties: [],
  blogs: [
    {"id": 1, "title": "WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE", "author": "Corx", "date": "April 16, 2026", "category": "Home Physiotherapy", "image": "https://www.corx.ae/wp-content/uploads/placeholder.jpg", "excerpt": "Read more about WHAT IS PHYSIOTHERAPY? and how it can help you achieve better health.", "read_time": "5 min read", "content": "<p>Full content for WHAT IS PHYSIOTHERAPY? coming soon.</p>"},
    {"id": 2, "title": "Burnout in Working Professionals: Signs & Solutions", "author": "Corx", "date": "March 18, 2026", "category": "Home Healthcare", "image": "https://www.corx.ae/wp-content/uploads/placeholder.jpg", "excerpt": "Read more about burnout and how it can help you achieve better health.", "read_time": "5 min read", "content": "<p>Full content for burnout coming soon.</p>"},
    {"id": 3, "title": "Doctor at Home vs Hospital Visit: What’s Better in 2026?", "author": "Corx", "date": "February 12, 2026", "category": "Home Healthcare", "image": "https://www.corx.ae/wp-content/uploads/placeholder.jpg", "excerpt": "Read more about Doctor at Home vs Hospital and how it can help you.", "read_time": "5 min read", "content": "<p>Full content coming soon.</p>"}
  ],
  services: [
    {
      id: 1,
      slug: "physiotherapy",
      title: "Home Physiotherapy",
      eyebrow: "⊙ CLINICAL CARE AT HOME",
      tagline: "DHA-Licensed Physiotherapy at Your Comfort",
      description: "Experience premium home physiotherapy in Dubai tailored to your recovery needs.",
      icon: "Activity",
      theme_color: "#08709d",
      floating_badge: { title: "24/7 Recovery", desc: "Get therapeutic support anytime" },
      benefits: [
        { title: "Personalized Plans", desc: "Tailored to orthopaedic, neurological, or post-surgical recovery." },
        { title: "DHA Licensed", desc: "Certified physiotherapists delivering premium safe care." }
      ],
      faqs: [
        { q: "What should I expect during the first session?", a: "Our therapist will conduct a physical assessment and design a customized treatment plan." }
      ],
      locations: [{ label: "Home" }, { label: "Office" }, { label: "Hotel" }]
    },
    {
      id: 2,
      slug: "iv-therapy",
      title: "IV Therapy",
      eyebrow: "⊙ 24/7 WELLNESS DRIPS",
      tagline: "Customized Hydration & Vitamin IV Drips",
      description: "Boost immunity, energy, or recover quickly with premium IV drips administered at home.",
      icon: "Droplets",
      theme_color: "#08709d",
      floating_badge: { title: "Rapid Hydration", desc: "100% absorption of essential nutrients" },
      benefits: [
        { title: "Energy & Detox", desc: "Replenish essential vitamins directly into your system." },
        { title: "Safe & Professional", desc: "Administered by experienced licensed nurses." }
      ],
      faqs: [
        { q: "How long does a session take?", a: "A typical IV therapy session takes around 30 to 45 minutes." }
      ],
      locations: [{ label: "Home" }, { label: "Hotel" }, { label: "Office" }]
    },
    {
      id: 3,
      slug: "nursing",
      title: "Home Nursing",
      eyebrow: "⊙ PROFESSIONAL CARE",
      tagline: "Licensed Nursing Care at Your Doorstep",
      description: "Compassionate nursing support for post-operative, pediatric, or general wellness care.",
      icon: "Heart",
      theme_color: "#08709d",
      floating_badge: { title: "DHA Licensed", desc: "Highest standards of clinical nursing care" },
      benefits: [
        { title: "Continuous Monitoring", desc: "Expert nurses tracking patient vitals and care needs." },
        { title: "Custom Care Plans", desc: "Designed around specific recovery or support needs." }
      ],
      faqs: [
        { q: "Can nurses stay overnight?", a: "Yes, we offer flexible night nurse and 24/7 care options." }
      ],
      locations: [{ label: "Home Visit" }]
    },
    {
      id: 4,
      slug: "palliative-care",
      title: "Palliative Care",
      eyebrow: "⊙ COMPASSIONATE SUPPORT",
      tagline: "Advanced Care & Comfort Management",
      description: "Dedicated medical support focused on providing relief from symptoms and stress of serious illness.",
      icon: "HeartHandshake",
      theme_color: "#08709d",
      floating_badge: { title: "Quality of Life", desc: "Relief and pain management support" },
      benefits: [
        { title: "Symptom Control", desc: "Effective management of pain, fatigue, and other symptoms." },
        { title: "Holistic Care", desc: "Support for patients and their families." }
      ],
      faqs: [
        { q: "Who is palliative care for?", a: "It is for patients with serious illnesses seeking relief and comfort alongside treatment." }
      ],
      locations: [{ label: "Home Visit" }]
    },
    {
      id: 5,
      slug: "night-care-nurse",
      title: "Night Care Nurse",
      eyebrow: "⊙ OVERNIGHT CLINICAL CARE",
      tagline: "Professional Night Support",
      description: "DHA-licensed night nurses to monitor and assist patients through the night.",
      icon: "Clock",
      theme_color: "#08709d",
      floating_badge: { title: "Overnight Support", desc: "Peace of mind through the night" },
      benefits: [
        { title: "Sleep with Confidence", desc: "Vitals tracking, medication management, and night assistance." },
        { title: "Qualified Nurses", desc: "Fully certified DHA professionals." }
      ],
      faqs: [
        { q: "What are the hours for a night nurse?", a: "Typically, night shifts range from 8 to 12 hours starting in the evening." }
      ],
      locations: [{ label: "Home Visit" }]
    },
    {
      id: 6,
      slug: "injection-at-home",
      title: "Nurse for Injection",
      eyebrow: "⊙ QUICK MEDICAL SERVICE",
      tagline: "Safe Injection Administration at Home",
      description: "DHA-licensed nurse visits you at home to administer prescribed injections.",
      icon: "Pill",
      theme_color: "#08709d",
      floating_badge: { title: "Fast Visit", desc: "Nurses deployed on-demand" },
      benefits: [
        { title: "Safe Delivery", desc: "Intramuscular, subcutaneous, or intravenous administration." },
        { title: "No Travel Needed", desc: "Avoid queues and hospital visits." }
      ],
      faqs: [
        { q: "Do I need a prescription?", a: "Yes, a valid doctor's prescription is required for any injection." }
      ],
      locations: [{ label: "Home" }, { label: "Office" }]
    },
    {
      id: 7,
      slug: "wound-care",
      title: "Wound Care Services",
      eyebrow: "⊙ SPECIALIZED CLINICAL CARE",
      tagline: "Expert Wound & Dressing Care",
      description: "Advanced care for surgical, diabetic, chronic wounds by qualified wound care nurses.",
      icon: "ShieldPlus",
      theme_color: "#08709d",
      floating_badge: { title: "Infection Control", desc: "Sterile clinical dressing application" },
      benefits: [
        { title: "Faster Healing", desc: "Standardized clinical cleaning and protection protocols." },
        { title: "Specialist Care", desc: "Handled by wound dressing specialists." }
      ],
      faqs: [
        { q: "How often do dressings need replacement?", a: "This depends on the wound type and our clinician's recommendation." }
      ],
      locations: [{ label: "Home Visit" }]
    },
    {
      id: 8,
      slug: "oxygen-therapy",
      title: "Oxygen Therapy",
      eyebrow: "⊙ RESPIRATORY SUPPORT",
      tagline: "In-home Oxygen Administration",
      description: "Support for patients requiring oxygen therapy under professional guidance.",
      icon: "Activity",
      theme_color: "#08709d",
      floating_badge: { title: "Resp Support", desc: "Equipment monitoring and vitals tracking" },
      benefits: [
        { title: "Oxygen Management", desc: "Safe setup and regulation of flow rates." },
        { title: "Vital Monitoring", desc: "Checking oxygen saturation levels regularly." }
      ],
      faqs: [
        { q: "Do you supply oxygen concentrators?", a: "Yes, we coordinate clinical equipment setups." }
      ],
      locations: [{ label: "Home Visit" }]
    },
    {
      id: 9,
      slug: "doctor-on-call",
      title: "Doctor On Call",
      eyebrow: "⊙ 24/7 MEDICAL VISIT",
      tagline: "Licensed Physicians to Your Doorstep",
      description: "Get treated at home by a qualified doctor in Dubai, available 24/7.",
      icon: "Stethoscope",
      theme_color: "#08709d",
      floating_badge: { title: "24/7 Doctors", desc: "Arrives in 30-45 minutes" },
      benefits: [
        { title: "Immediate Diagnosis", desc: "Physical checkups, prescriptions, and basic care on the spot." },
        { title: "DHA Licensed Doctors", desc: "Experienced general practitioners." }
      ],
      faqs: [
        { q: "How fast does the doctor arrive?", a: "Typically within 30 to 45 minutes depending on your location in Dubai." }
      ],
      locations: [{ label: "Home" }, { label: "Hotel" }, { label: "Office" }]
    },
    {
      id: 10,
      slug: "elderly-care",
      title: "Elderly Home Care",
      eyebrow: "⊙ DEDICATED SENIOR CARE",
      tagline: "Comfort & Companionship for Elders",
      description: "Personalized assistance, medical monitoring, and home care for elderly family members.",
      icon: "UserCheck",
      theme_color: "#08709d",
      floating_badge: { title: "Senior Support", desc: "Companion care and medical help" },
      benefits: [
        { title: "Daily Living Help", desc: "Support with mobility, medication, nutrition, and safety." },
        { title: "Companionship", desc: "Trained carers keeping seniors engaged and happy." }
      ],
      faqs: [
        { q: "What tasks can a caregiver perform?", a: "Assisting with transfers, medication reminders, hygiene, and light exercises." }
      ],
      locations: [{ label: "Home Visit" }]
    },
    {
      id: 11,
      slug: "lab-services",
      title: "Lab Test at Home",
      eyebrow: "⊙ 24/7 LAB COLLECTION",
      tagline: "Blood & Diagnostic Tests at Home",
      description: "Convenient home sample collection for diagnostic checks and blood screenings.",
      icon: "Activity",
      theme_color: "#08709d",
      floating_badge: { title: "Quick Reports", desc: "Results delivered digitally in 24 hours" },
      benefits: [
        { title: "Easy Collection", desc: "Qualified nurses collect blood/urine samples at home." },
        { title: "Certified Labs", desc: "Samples processed by accredited diagnostic facilities." }
      ],
      faqs: [
        { q: "How do I receive my test results?", a: "Your reports will be emailed to you or sent via WhatsApp as soon as they are ready." }
      ],
      locations: [{ label: "Home" }, { label: "Office" }]
    }
  ]
};

// Initialize DB file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2));
}

// Read DB from file
const readDb = () => {
  try {
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return defaultDb;
  }
};

// Write DB to file
const writeDb = (db) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error writing to DB file:', err);
  }
};

// Request parser helper
const parseRequestBody = (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
  });
};

// Server creation
const server = http.createServer(async (req, res) => {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const db = readDb();

  console.log(`[${req.method}] ${pathname}`);

  // Endpoint: POST /api/login/
  if (pathname === '/api/login/' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const staffId = (body.staffId || '').trim();
    const password = body.password || '';

    if (!staffId || !password) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Staff ID and password are required.' }));
      return;
    }

    let lookupId = staffId;
    if (lookupId.toUpperCase() === 'ADMIN') {
      lookupId = 'ADMIN-001';
    }

    const profile = db.staff.find(s => s.staff_id.toLowerCase() === lookupId.toLowerCase());
    if (profile && profile.password === password) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        user: {
          id: profile.staff_id,
          name: profile.full_name,
          role: profile.role,
          department: profile.department,
          position: profile.position
        }
      }));
    } else if (profile) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Incorrect password.' }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Account not found.' }));
    }
    return;
  }

  // Endpoint: GET /api/services/
  if (pathname === '/api/services/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.services));
    return;
  }

  // Endpoint: GET /api/blogs/
  if (pathname === '/api/blogs/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.blogs));
    return;
  }

  // Endpoint: GET /api/staff/
  if (pathname === '/api/staff/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.staff));
    return;
  }

  // Endpoint: POST /api/staff/
  if (pathname === '/api/staff/' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const staffId = (body.staffId || '').trim();
    if (staffId.toUpperCase() === 'ADMIN-001') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'That ID is reserved for the admin account.' }));
      return;
    }

    const exists = db.staff.some(s => s.staff_id.toLowerCase() === staffId.toLowerCase());
    if (exists) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Staff ID already exists.' }));
      return;
    }

    const newStaff = {
      id: generateId(),
      staff_id: staffId,
      full_name: body.fullName,
      position: body.position,
      department: body.department,
      password: body.password,
      role: body.role || 'staff',
      created_at: new Date().toISOString()
    };
    db.staff.unshift(newStaff);
    writeDb(db);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Staff account created successfully.' }));
    return;
  }

  // Endpoint: DELETE /api/staff/:id/
  const staffDeleteMatch = pathname.match(/^\/api\/staff\/([^\/]+)\/$/);
  if (staffDeleteMatch && req.method === 'DELETE') {
    const staffId = staffDeleteMatch[1];
    db.staff = db.staff.filter(s => s.staff_id.toLowerCase() !== staffId.toLowerCase());
    writeDb(db);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // Endpoint: GET /api/tasks/
  if (pathname === '/api/tasks/' && req.method === 'GET') {
    const assignedTo = url.searchParams.get('assigned_to');
    let list = db.tasks;
    if (assignedTo) {
      list = list.filter(t => t.assigned_to.toLowerCase() === assignedTo.trim().toLowerCase());
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(list));
    return;
  }

  // Endpoint: POST /api/tasks/
  if (pathname === '/api/tasks/' && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const assignedToId = (body.assignedToId || '').trim();
    const profile = db.staff.find(s => s.staff_id.toLowerCase() === assignedToId.toLowerCase());

    if (!profile) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Assigned staff member does not exist.' }));
      return;
    }

    const newTask = {
      id: generateId(),
      title: body.title,
      description: body.description || '',
      priority: body.priority || 'Medium',
      due_date: body.dueDate || null,
      assigned_to: profile.staff_id,
      assigned_to_name: profile.full_name,
      assigned_by_name: body.assignedByName || 'Admin',
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db.tasks.unshift(newTask);
    writeDb(db);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newTask));
    return;
  }

  // Endpoint: PATCH /api/tasks/:id/
  const taskPatchMatch = pathname.match(/^\/api\/tasks\/(\d+)\/$/);
  if (taskPatchMatch && req.method === 'PATCH') {
    const taskId = parseInt(taskPatchMatch[1], 10);
    const body = await parseRequestBody(req);
    const task = db.tasks.find(t => t.id === taskId);

    if (task) {
      if (body.status) task.status = body.status;
      task.updated_at = new Date().toISOString();
      writeDb(db);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(task));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Task not found' }));
    }
    return;
  }

  // Endpoint: DELETE /api/tasks/:id/
  const taskDeleteMatch = pathname.match(/^\/api\/tasks\/(\d+)\/$/);
  if (taskDeleteMatch && req.method === 'DELETE') {
    const taskId = parseInt(taskDeleteMatch[1], 10);
    db.tasks = db.tasks.filter(t => t.id !== taskId);
    writeDb(db);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // Generic Viewset Handlers for leaves, ots, salaries, notices, duties
  const endpoints = ['leaves', 'ots', 'salaries', 'notices', 'duties'];
  for (const endpoint of endpoints) {
    if (pathname === `/api/${endpoint}/` && req.method === 'GET') {
      const staffId = url.searchParams.get('staff_id');
      let list = db[endpoint];
      if (staffId) {
        list = list.filter(item => item.staff.toLowerCase() === staffId.trim().toLowerCase());
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(list));
      return;
    }

    if (pathname === `/api/${endpoint}/` && req.method === 'POST') {
      const body = await parseRequestBody(req);
      const staffId = (body.staffId || '').trim();
      const profile = db.staff.find(s => s.staff_id.toLowerCase() === staffId.toLowerCase());

      if (!profile) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Staff profile not found.' }));
        return;
      }

      let newItem = {
        id: generateId(),
        staff: profile.staff_id,
        staff_name: profile.full_name,
        submitted_at: new Date().toISOString(),
        status: 'Pending'
      };

      if (endpoint === 'leaves') {
        newItem = {
          ...newItem,
          staff_dep: profile.department,
          staff_position: profile.position,
          leave_type: body.leaveType || 'Annual Leave',
          leave_start: body.leaveStart,
          leave_end: body.leaveEnd,
          reason: body.reason || ''
        };
      } else if (endpoint === 'ots') {
        newItem = {
          ...newItem,
          staff_dep: profile.department,
          staff_position: profile.position,
          ot_type: body.otType || 'Day Shift',
          ot_date: body.otDate,
          ot_hours: String(body.otHours)
        };
      } else if (endpoint === 'salaries') {
        newItem = {
          ...newItem,
          staff_dep: profile.department,
          staff_position: profile.position,
          inc_type: body.incType || 'Merit-Based Performance Review'
        };
      } else if (endpoint === 'notices') {
        newItem = {
          ...newItem,
          notice_title: body.noticeTitle,
          notice_message: body.noticeMessage
        };
      } else if (endpoint === 'duties') {
        newItem = {
          ...newItem,
          duty_date: body.dutyDate,
          duty_replacement: body.dutyReplacement,
          duty_reason: body.dutyReason
        };
      }

      db[endpoint].unshift(newItem);
      writeDb(db);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newItem));
      return;
    }

    const matchDetail = pathname.match(new RegExp(`^/api/${endpoint}/(\\d+)/$`));
    if (matchDetail && req.method === 'PATCH') {
      const itemId = parseInt(matchDetail[1], 10);
      const body = await parseRequestBody(req);
      const item = db[endpoint].find(x => x.id === itemId);

      if (item) {
        if (body.status) item.status = body.status;
        writeDb(db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(item));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Item not found' }));
      }
      return;
    }
  }

  // Not found fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: `Not found: [${req.method}] ${pathname}` }));
});

server.listen(PORT, () => {
  console.log(`Mock API Server is running on http://localhost:${PORT}`);
});
