import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plus, CheckCircle2, Activity, Droplets, HeartPulse, 
  Stethoscope, HeartHandshake, TestTube, Sparkles, Clock, 
  ShieldCheck, ArrowRight, Layers
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

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
  '#ec4899', // Pink
];

export default function AddServiceModal({ isOpen, onClose, onServiceAdded }) {
  const [serviceType, setServiceType] = useState('sub'); // 'parent' or 'sub'
  const [parentServices, setParentServices] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState('');
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Activity');
  const [themeColor, setThemeColor] = useState('#08709d');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch current parent services from backend
  useEffect(() => {
    if (isOpen) {
      fetch(`${API_BASE_URL}/api/services/`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const parents = data.filter((s) => s.parent === null);
            setParentServices(parents);
            if (parents.length > 0) {
              setSelectedParentId(parents[0].id.toString());
            }
          }
        })
        .catch((err) => console.log('Error fetching parent services:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim()) {
      setErrorMsg('Service title is required.');
      return;
    }

    if (serviceType === 'sub' && !selectedParentId) {
      setErrorMsg('Please select a parent service for this sub-service.');
      return;
    }

    setLoading(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      tagline: tagline.trim(),
      description: description.trim() || tagline.trim() || title.trim(),
      icon: selectedIcon,
      theme_color: themeColor,
      parent: serviceType === 'sub' ? parseInt(selectedParentId, 10) : null,
      floating_badge: { title: 'New Service', desc: tagline.trim() || title.trim() },
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/services/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || JSON.stringify(data) || 'Failed to create service');
      }

      const created = await res.json();
      setSuccessMsg(`Service "${created.title || title}" added successfully!`);
      
      // Reset form
      setTitle('');
      setSlug('');
      setTagline('');
      setDescription('');

      if (onServiceAdded) {
        onServiceAdded(created);
      }

      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1200);

    } catch (err) {
      console.error('API Error:', err);
      setErrorMsg(err.message || 'Server error. Please check if Django backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const SelectedIconComponent = AVAILABLE_ICONS.find(i => i.name === selectedIcon)?.icon || Activity;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#065b80] via-[#08709d] to-[#0a86bd] text-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Layers size={22} className="text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">Add Service / Sub-Service</h3>
                <p className="text-xs text-white/80">Expand your healthcare offerings dynamically on navbar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2">
                <X size={18} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Service Category Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Service Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceType('sub')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                    serviceType === 'sub'
                      ? 'border-[#08709d] bg-[#08709d]/5 text-[#08709d] font-bold shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 font-medium'
                  }`}
                >
                  <span className="text-sm font-extrabold flex items-center gap-2">
                    <CheckCircle2 size={16} className={serviceType === 'sub' ? 'text-[#08709d]' : 'text-gray-300'} />
                    Sub-Service (Nested)
                  </span>
                  <span className="text-xs text-gray-500 font-normal">
                    Appears inside a parent service dropdown (e.g. Injection Care under Home Nursing)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('parent')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                    serviceType === 'parent'
                      ? 'border-[#08709d] bg-[#08709d]/5 text-[#08709d] font-bold shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 font-medium'
                  }`}
                >
                  <span className="text-sm font-extrabold flex items-center gap-2">
                    <CheckCircle2 size={16} className={serviceType === 'parent' ? 'text-[#08709d]' : 'text-gray-300'} />
                    Top-Level Parent Service
                  </span>
                  <span className="text-xs text-gray-500 font-normal">
                    Main service item shown directly on navbar (e.g. Dental Care, Specialized Rehab)
                  </span>
                </button>
              </div>
            </div>

            {/* Parent Selection (if Sub-Service) */}
            {serviceType === 'sub' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Select Parent Service <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedParentId}
                  onChange={(e) => setSelectedParentId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-800 font-semibold focus:outline-none focus:border-[#08709d] transition-colors"
                >
                  {parentServices.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name || p.title} ({p.slug})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Service Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wound Care Services"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-[#08709d] transition-colors placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Custom Slug <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. wound-care"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-800 font-mono text-sm focus:outline-none focus:border-[#08709d] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Tagline / Subtitle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Tagline / Short Description
              </label>
              <input
                type="text"
                placeholder="e.g. Clinical dressing & specialized wound management"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-800 font-medium focus:outline-none focus:border-[#08709d] transition-colors placeholder:text-gray-400"
              />
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Choose Icon
              </label>
              <div className="flex flex-wrap gap-2.5">
                {AVAILABLE_ICONS.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedIcon === item.name;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setSelectedIcon(item.name)}
                      className={`p-3 rounded-2xl border flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#08709d] bg-[#08709d] text-white font-bold shadow-md'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComp size={18} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Accent Color */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Accent Theme Color
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setThemeColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-9 h-9 rounded-full transition-transform border-2 cursor-pointer ${
                      themeColor === c ? 'scale-110 border-gray-900 shadow-md' : 'border-transparent hover:scale-105'
                    }`}
                  />
                ))}
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-9 h-9 rounded-full cursor-pointer border-0 bg-transparent"
                />
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Service Details / Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe what clinical care or treatments are provided..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-800 font-normal focus:outline-none focus:border-[#08709d] transition-colors placeholder:text-gray-400"
              />
            </div>

            {/* Preview Box */}
            <div className="bg-[#0c361d] p-5 rounded-2xl border border-white/10 text-white shadow-inner">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-3">
                Live Navbar Menu Item Preview
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: themeColor }}>
                    <SelectedIconComponent size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{title || 'Service Title'}</h5>
                    <p className="text-xs text-white/70">{tagline || 'Short tagline preview...'}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-emerald-300 shrink-0" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3 rounded-2xl bg-[#63b158] hover:bg-[#529d48] text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Adding Service...</span>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Create Service</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
