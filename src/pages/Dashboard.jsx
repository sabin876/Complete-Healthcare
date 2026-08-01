import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, CheckCircle2, Activity, Droplets, HeartPulse, 
  Stethoscope, HeartHandshake, TestTube, Sparkles, Clock, 
  ShieldCheck, Layers, Trash2, ExternalLink, RefreshCw, LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { Container, Section, SectionTitle, Paragraph, Card } from '../components/ui';

const AVAILABLE_ICONS = [
  { name: 'Activity', icon: Activity, label: 'Activity' },
  { name: 'Droplets', icon: Droplets, label: 'Droplets' },
  { name: 'HeartPulse', icon: HeartPulse, label: 'Heart Pulse' },
  { name: 'Stethoscope', icon: Stethoscope, label: 'Stethoscope' },
  { name: 'HeartHandshake', icon: HeartHandshake, label: 'Elderly Care' },
  { name: 'TestTube', icon: TestTube, label: 'Lab Test' },
  { name: 'Sparkles', icon: Sparkles, label: 'Sparkles' },
  { name: 'Clock', icon: Clock, label: 'Clock / 24-7' },
  { name: 'ShieldCheck', icon: ShieldCheck, label: 'Shield' },
];

const PRESET_COLORS = [
  '#08709d', // Teal Primary
  '#63b158', // Green Accent
  '#38bdf8', // Sky Blue
  '#f43f5e', // Rose Red
  '#fbbf24', // Amber Yellow
  '#a78bfa', // Purple
  '#34d399', // Emerald
];

export default function Dashboard() {
  const [servicesData, setServicesData] = useState([]);
  const [parentServices, setParentServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [serviceType, setServiceType] = useState('sub'); // 'sub' or 'parent'
  const [selectedParentId, setSelectedParentId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Activity');
  const [themeColor, setThemeColor] = useState('#08709d');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch Services from Django API
  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setServicesData(data);
        const parents = data.filter((s) => s.parent === null);
        setParentServices(parents);
        if (parents.length > 0 && !selectedParentId) {
          setSelectedParentId(parents[0].id.toString());
        }
      }
    } catch (err) {
      console.error('Error fetching services for Dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a service title.');
      return;
    }

    if (serviceType === 'sub' && !selectedParentId) {
      setErrorMsg('Please select a parent service from the navbar list.');
      return;
    }

    setSubmitting(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      tagline: tagline.trim(),
      description: description.trim() || tagline.trim() || title.trim(),
      icon: selectedIcon,
      theme_color: themeColor,
      parent: serviceType === 'sub' ? parseInt(selectedParentId, 10) : null,
      floating_badge: { title: 'Navbar Service', desc: tagline.trim() || title.trim() },
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/services/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || JSON.stringify(errData) || 'Failed to add service');
      }

      const created = await res.json();
      setSuccessMsg(`Successfully added "${created.title || title}" to the navbar service list!`);

      // Reset form
      setTitle('');
      setSlug('');
      setTagline('');
      setDescription('');

      // Reload dataset
      loadServices();

    } catch (err) {
      console.error('Error adding service:', err);
      setErrorMsg(err.message || 'Error connecting to Django backend.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (serviceSlug, serviceTitle) => {
    if (!window.confirm(`Are you sure you want to remove "${serviceTitle}" from the navbar list?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${serviceSlug}/`, {
        method: 'DELETE',
      });
      if (res.ok || res.status === 204) {
        loadServices();
      } else {
        alert('Failed to delete service.');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const parentList = servicesData.filter((s) => s.parent === null);
  const totalSubServices = servicesData.filter((s) => s.parent !== null).length;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-8">
      <Container className="max-w-[1350px]">
        
        {/* Dashboard Header Banner */}
        <div className="bg-gradient-to-r from-[#065b80] via-[#08709d] to-[#0a86bd] rounded-3xl p-8 md:p-10 text-white shadow-xl mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 bg-white/15 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-emerald-300 w-fit mb-3">
              <LayoutDashboard size={14} />
              <span>Admin Services Control Panel</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-montserrat">
              Navbar Services Dashboard
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl font-sans">
              Manage parent services and add sub-services directly onto your main navbar dropdown list with real-time backend updates.
            </p>
          </div>

          <button
            onClick={loadServices}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-5 py-3 rounded-2xl border border-white/20 text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Sync Data</span>
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0">
              <Layers size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Parent Navbar Services</p>
              <h3 className="text-2xl font-extrabold text-slate-800">{parentList.length}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Sub-Services</p>
              <h3 className="text-2xl font-extrabold text-slate-800">{totalSubServices}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Backend API Status</p>
              <h3 className="text-sm font-extrabold text-emerald-600 flex items-center gap-1.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                Active (Django REST)
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SEPARATE SECTION: ADD SUB-SERVICE TO PARENT NAVBAR LIST */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#63b158] text-white flex items-center justify-center font-bold">
                <Plus size={22} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                  Add Sub-Service To Navbar
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Attach new sub-services directly to your parent navbar list
                </p>
              </div>
            </div>

            <form onSubmit={handleAddService} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                  ⚠️ {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  ✅ {successMsg}
                </div>
              )}

              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Category Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceType('sub')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      serviceType === 'sub'
                        ? 'border-[#08709d] bg-[#08709d]/10 text-[#08709d]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🔷 Sub-Service (Nested)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('parent')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      serviceType === 'parent'
                        ? 'border-[#08709d] bg-[#08709d]/10 text-[#08709d]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🟢 Top Navbar Parent
                  </button>
                </div>
              </div>

              {/* Parent Selection */}
              {serviceType === 'sub' && (
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Select Parent Navbar List Item <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedParentId}
                    onChange={(e) => setSelectedParentId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold text-sm focus:outline-none focus:border-[#08709d]"
                  >
                    {parentServices.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name || p.title} ({p.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Service Title */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Sub-Service Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wound Care & Dressing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#08709d]"
                />
              </div>

              {/* Custom Slug */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Custom Slug <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. wound-care"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-xs font-mono focus:outline-none focus:border-[#08709d]"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clinical dressing & specialized wound management"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#08709d]"
                />
              </div>

              {/* Icon Choice */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_ICONS.map((item) => {
                    const IconComp = item.icon;
                    const isSelected = selectedIcon === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedIcon(item.name)}
                        className={`p-2.5 rounded-xl border flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
                          isSelected
                            ? 'border-[#08709d] bg-[#08709d] text-white font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <IconComp size={15} />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Theme Accent Color
                </label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setThemeColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer ${
                        themeColor === c ? 'scale-110 border-slate-900 shadow-sm' : 'border-transparent'
                      }`}
                    />
                  ))}
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-7 h-7 rounded-full border-0 bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-[#63b158] hover:bg-[#529d48] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span>Adding Service...</span>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Add To Parent Navbar List</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: CURRENT NAVBAR SERVICES & SUB-SERVICES HIERARCHY */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                    Live Navbar Services Hierarchy
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Current list of parent services and their nested sub-services
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#08709d]/10 text-[#08709d] rounded-full text-xs font-bold">
                  {parentList.length} Parent Categories
                </span>
              </div>

              {loading ? (
                <div className="py-12 text-center text-slate-400 font-medium">
                  Loading services list from backend...
                </div>
              ) : parentList.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-medium border border-dashed rounded-2xl">
                  No parent services found. Add one on the left!
                </div>
              ) : (
                <div className="space-y-6">
                  {parentList.map((parent) => {
                    const subs = servicesData.filter((s) => s.parent === parent.id);
                    return (
                      <div key={parent.id} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:bg-white transition-all">
                        
                        {/* Parent Service Card Header */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: parent.accent || parent.theme_color || '#08709d' }}>
                              <Layers size={18} />
                            </div>
                            <div>
                              <h4 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                                <span>{parent.name || parent.title}</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                  Top Navbar
                                </span>
                              </h4>
                              <p className="text-xs text-slate-500">{parent.subtitle || parent.tagline || `/services/${parent.slug}`}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/services/${parent.slug}`}
                              target="_blank"
                              className="p-2 rounded-xl text-slate-400 hover:text-[#08709d] hover:bg-slate-100 transition-colors"
                              title="View Page"
                            >
                              <ExternalLink size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeleteService(parent.slug, parent.title)}
                              className="p-2 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Parent Service"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Sub-Services List */}
                        <div className="pl-6 border-l-2 border-slate-200 ml-4 space-y-2 mt-3">
                          {subs.length === 0 ? (
                            <p className="text-xs text-slate-400 font-italic py-1">
                              No sub-services attached. Add one using the form on the left!
                            </p>
                          ) : (
                            subs.map((sub) => (
                              <div
                                key={sub.id}
                                className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs hover:border-[#08709d]/30 transition-all"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-2 h-2 rounded-full bg-[#63b158]" />
                                  <div>
                                    <span className="text-xs font-bold text-slate-800">{sub.title || sub.name}</span>
                                    {sub.tagline && <span className="text-[11px] text-slate-500 block">{sub.tagline}</span>}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <Link
                                    to={`/services/${sub.slug}`}
                                    target="_blank"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#08709d] transition-colors"
                                  >
                                    <ExternalLink size={14} />
                                  </Link>
                                  <button
                                    onClick={() => handleDeleteService(sub.slug, sub.title)}
                                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>

      </Container>
    </div>
  );
}
