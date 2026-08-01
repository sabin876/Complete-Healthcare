import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, CheckCircle2, Activity, Droplets, HeartPulse, 
  Stethoscope, HeartHandshake, TestTube, Sparkles, Clock, 
  ShieldCheck, Layers, Trash2, ExternalLink, RefreshCw,
  LayoutDashboard, CornerDownRight, Edit3, Save, X, ArrowRight,
  Gift, ListChecks, Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { Container } from '../components/ui';

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
  const [activeTab, setActiveTab] = useState('subservices'); // 'subservices' | 'parents' | 'benefits' | 'hierarchy'
  const [servicesData, setServicesData] = useState([]);
  const [parentServices, setParentServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sub-Service Form State
  const [selectedParentId, setSelectedParentId] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [subSlug, setSubSlug] = useState('');
  const [subTagline, setSubTagline] = useState('');
  const [subDescription, setSubDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Activity');
  const [themeColor, setThemeColor] = useState('#08709d');

  // Parent Service Form State
  const [parentTitle, setParentTitle] = useState('');
  const [parentSlug, setParentSlug] = useState('');
  const [parentTagline, setParentTagline] = useState('');

  // Benefits Form State
  const [selectedBenefitsServiceSlug, setSelectedBenefitsServiceSlug] = useState('');
  const [benefitsTitleText, setBenefitsTitleText] = useState('');
  const [benefitsImageFile, setBenefitsImageFile] = useState(null);
  const [benefitsImagePreview, setBenefitsImagePreview] = useState('');
  const [benefitsItems, setBenefitsItems] = useState([
    { title: 'Customized Treatment Plans', desc: 'Every patient receives a tailored therapy plan to address their specific needs.' },
    { title: 'Pain Relief & Mobility Restoration', desc: 'Our expert clinical team uses proven techniques to reduce pain and restore full motion.' }
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch all services from Django API
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
        if (data.length > 0 && !selectedBenefitsServiceSlug) {
          setSelectedBenefitsServiceSlug(data[0].slug);
          loadBenefitsForService(data[0]);
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

  const loadBenefitsForService = (serviceObj) => {
    if (!serviceObj) return;
    setBenefitsTitleText(serviceObj.benefits_title || `Benefits of Our ${serviceObj.title || serviceObj.name} Service at Corx Healthcare`);
    setBenefitsImagePreview(serviceObj.benefits_image || serviceObj.benefits_image_file || '');
    setBenefitsImageFile(null);
    if (Array.isArray(serviceObj.benefits) && serviceObj.benefits.length > 0) {
      setBenefitsItems(serviceObj.benefits.map(b => typeof b === 'string' ? { title: b, desc: '' } : { title: b.title || '', desc: b.desc || b.description || '' }));
    } else {
      setBenefitsItems([
        { title: 'Customized Treatment Plans', desc: 'Every patient receives a tailored therapy plan to address their specific needs.' },
        { title: 'Pain Relief & Mobility Restoration', desc: 'Our expert clinical team uses proven techniques to reduce pain and restore motion.' }
      ]);
    }
  };

  const handleBenefitsServiceChange = (e) => {
    const slugVal = e.target.value;
    setSelectedBenefitsServiceSlug(slugVal);
    const found = servicesData.find(s => s.slug === slugVal);
    if (found) loadBenefitsForService(found);
  };

  const handleAddBenefitRow = () => {
    setBenefitsItems([...benefitsItems, { title: '', desc: '' }]);
  };

  const handleRemoveBenefitRow = (idx) => {
    setBenefitsItems(benefitsItems.filter((_, i) => i !== idx));
  };

  const handleBenefitItemChange = (idx, field, val) => {
    const updated = [...benefitsItems];
    updated[idx][field] = val;
    setBenefitsItems(updated);
  };

  const handleSaveBenefits = async (e) => {
    e.preventDefault();
    if (!selectedBenefitsServiceSlug) {
      setErrorMsg('Please select a service to update benefits.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let res;
      if (benefitsImageFile) {
        const formData = new FormData();
        formData.append('benefits_title', benefitsTitleText.trim());
        formData.append('benefits', JSON.stringify(benefitsItems.filter(b => b.title.trim() !== '')));
        formData.append('benefits_image_file', benefitsImageFile);

        res = await fetch(`${API_BASE_URL}/api/services/${selectedBenefitsServiceSlug}/`, {
          method: 'PATCH',
          body: formData,
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/services/${selectedBenefitsServiceSlug}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            benefits_title: benefitsTitleText.trim(),
            benefits: benefitsItems.filter(b => b.title.trim() !== '')
          })
        });
      }

      if (!res.ok) throw new Error('Failed to save benefits section.');
      
      setSuccessMsg('Successfully saved benefits section & custom image to backend!');
      setBenefitsImageFile(null);
      loadServices();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to save benefits.');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Sub-Service
  const handleAddSubService = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!subTitle.trim()) {
      setErrorMsg('Please enter a sub-service title.');
      return;
    }

    if (!selectedParentId) {
      setErrorMsg('Please choose a parent service for this sub-service.');
      return;
    }

    setSubmitting(true);

    const payload = {
      title: subTitle.trim(),
      slug: subSlug.trim() || undefined,
      tagline: subTagline.trim(),
      description: subDescription.trim() || subTagline.trim() || subTitle.trim(),
      icon: selectedIcon,
      theme_color: themeColor,
      parent: parseInt(selectedParentId, 10),
      floating_badge: { title: 'Sub-Service', desc: subTagline.trim() || subTitle.trim() },
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/services/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || JSON.stringify(errData) || 'Failed to add sub-service');
      }

      const created = await res.json();
      const parentObj = parentServices.find(p => p.id.toString() === selectedParentId);
      const parentName = parentObj ? (parentObj.name || parentObj.title) : 'Parent Service';

      setSuccessMsg(`Successfully added sub-service "${created.title || subTitle}" under "${parentName}"!`);

      // Reset fields
      setSubTitle('');
      setSubSlug('');
      setSubTagline('');
      setSubDescription('');

      // Reload dataset
      loadServices();

    } catch (err) {
      console.error('Error adding sub-service:', err);
      setErrorMsg(err.message || 'Error connecting to Django backend.');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Top-Level Parent Service
  const handleAddParentService = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!parentTitle.trim()) {
      setErrorMsg('Please enter a parent service title.');
      return;
    }

    setSubmitting(true);

    const payload = {
      title: parentTitle.trim(),
      slug: parentSlug.trim() || undefined,
      tagline: parentTagline.trim(),
      description: parentTagline.trim() || parentTitle.trim(),
      icon: selectedIcon,
      theme_color: themeColor,
      parent: null,
      floating_badge: { title: 'Parent Service', desc: parentTagline.trim() || parentTitle.trim() },
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/services/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || JSON.stringify(errData) || 'Failed to add parent service');
      }

      const created = await res.json();
      setSuccessMsg(`Successfully added parent service "${created.title || parentTitle}" to top-level navbar!`);

      setParentTitle('');
      setParentSlug('');
      setParentTagline('');

      loadServices();

    } catch (err) {
      console.error('Error adding parent service:', err);
      setErrorMsg(err.message || 'Error connecting to Django backend.');
    } finally {
      setSubmitting(false);
    }
  };

  // Re-assign Sub-Service Parent Service
  const handleChangeParent = async (subServiceSlug, newParentId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${subServiceSlug}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent: newParentId ? parseInt(newParentId, 10) : null
        })
      });
      if (res.ok) {
        loadServices();
      } else {
        alert('Failed to update parent service assignment.');
      }
    } catch (err) {
      console.error('Update parent error:', err);
    }
  };

  // Delete Service
  const handleDeleteService = async (serviceSlug, serviceTitle) => {
    if (!window.confirm(`Are you sure you want to remove "${serviceTitle}"?`)) return;

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

  const selectedParentObj = parentServices.find(p => p.id.toString() === selectedParentId);
  const totalSubServices = servicesData.filter((s) => s.parent !== null).length;
  const allSubServicesList = servicesData.filter((s) => s.parent !== null);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-8 font-sans">
      <Container className="max-w-[1350px]">
        
        {/* Dashboard Header Banner */}
        <div className="bg-gradient-to-r from-[#065b80] via-[#08709d] to-[#0a86bd] rounded-3xl p-8 md:p-10 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 bg-white/15 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-emerald-300 w-fit mb-3">
              <LayoutDashboard size={14} />
              <span>Services & Sub-Services Control Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-montserrat">
              Services & Benefits Control Center
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl font-sans">
              Manage parent services, sub-services, custom benefits section, and image uploads backed directly by Django REST API.
            </p>
          </div>

          <button
            onClick={loadServices}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-5 py-3 rounded-2xl border border-white/20 text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Backend Data</span>
          </button>
        </div>

        {/* Dashboard Section Tabs */}
        <div className="flex items-center gap-3 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('subservices')}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'subservices'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CornerDownRight size={18} />
            <span>🔷 Sub-Services Manager</span>
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/20">
              {totalSubServices}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListChecks size={18} />
            <span>🎁 Benefits & Image Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('parents')}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'parents'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers size={18} />
            <span>🟢 Parent Navbar Services</span>
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/20">
              {parentServices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hierarchy'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity size={18} />
            <span>📊 Complete Hierarchy Tree</span>
          </button>
        </div>

        {/* TAB: BENEFITS BUILDER */}
        {activeTab === 'benefits' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold">
                <ListChecks size={22} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                  Benefits Section & Custom Image Builder
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Edit the benefits section title, upload custom photo, and manage bulleted points for any service
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBenefits} className="space-y-6 max-w-4xl">
              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <X size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Select Service */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#08709d] mb-2">
                  Select Target Service
                </label>
                <select
                  value={selectedBenefitsServiceSlug}
                  onChange={handleBenefitsServiceChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-extrabold text-sm focus:outline-none focus:border-[#08709d]"
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.title || s.name} ({s.slug}) {s.parent ? '— Sub-Service' : '— Top Parent'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Benefits Section Main Title */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Benefits Section Title
                </label>
                <input
                  type="text"
                  value={benefitsTitleText}
                  onChange={(e) => setBenefitsTitleText(e.target.value)}
                  placeholder="e.g. Benefits of Our Frozen Shoulder Physiotherapy Service at Corx Healthcare"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#08709d]"
                />
              </div>

              {/* Benefits Section Image Upload */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
                  <ImageIcon size={16} className="text-[#08709d]" />
                  <span>Upload Benefits Section Image</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setBenefitsImageFile(e.target.files[0]);
                        setBenefitsImagePreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-[#08709d]/10 file:text-[#08709d] hover:file:bg-[#08709d]/20 cursor-pointer"
                  />
                  {benefitsImagePreview && (
                    <div className="w-16 h-16 rounded-xl border border-slate-300 overflow-hidden shrink-0 shadow-sm">
                      <img src={benefitsImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Bullet Points Builder */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Bulleted Benefits List ({benefitsItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddBenefitRow}
                    className="px-3 py-1.5 rounded-lg bg-[#08709d]/10 text-[#08709d] hover:bg-[#08709d]/20 text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>Add Benefit Point</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {benefitsItems.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-[#08709d] uppercase tracking-wide">
                          Benefit #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefitRow(idx)}
                          className="p-1 text-rose-500 hover:bg-rose-100 rounded-lg cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleBenefitItemChange(idx, 'title', e.target.value)}
                          placeholder="Benefit Title (e.g. Pain Relief & Mobility Restoration)"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs font-bold focus:outline-none focus:border-[#08709d]"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          value={item.desc}
                          onChange={(e) => handleBenefitItemChange(idx, 'desc', e.target.value)}
                          placeholder="Benefit Description (e.g. Our expert physiotherapists use proven techniques...)"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#08709d]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-[#63b158] hover:bg-[#529d48] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Saving Benefits & Image...' : 'Save Benefits Section & Image To Backend'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 1: SUB-SERVICES MANAGER */}
        {activeTab === 'subservices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SUB-SERVICES FORM */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-[#63b158] text-white flex items-center justify-center font-bold">
                  <Plus size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                    Create New Sub-Service
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Choose a parent service from the list below and add a nested sub-service
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddSubService} className="space-y-5">
                {errorMsg && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                    <X size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* STEP 1: CHOOSE PARENT SERVICE */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#08709d] mb-2 flex items-center gap-2">
                    <Layers size={15} />
                    <span>1. Choose Parent Navbar Service</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedParentId}
                    onChange={(e) => setSelectedParentId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-extrabold text-sm focus:outline-none focus:border-[#08709d] shadow-sm"
                  >
                    {parentServices.map((p) => {
                      const count = servicesData.filter((s) => s.parent === p.id).length;
                      return (
                        <option key={p.id} value={p.id}>
                          {p.name || p.title} — ({count} existing sub-services)
                        </option>
                      );
                    })}
                  </select>
                  {selectedParentObj && (
                    <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-1.5">
                      <CornerDownRight size={13} className="text-[#63b158]" />
                      <span>Sub-service will appear under: <strong>{selectedParentObj.name || selectedParentObj.title}</strong></span>
                    </p>
                  )}
                </div>

                {/* STEP 2: SUB-SERVICE DETAILS */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    2. Sub-Service Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Night Care Nurse, Post-Op Wound Dressing, Injection Care"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Custom Slug <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. night-care-nurse"
                    value={subSlug}
                    onChange={(e) => setSubSlug(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-xs font-mono focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Tagline / Subtitle Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24/7 dedicated overnight monitoring & nursing care"
                    value={subTagline}
                    onChange={(e) => setSubTagline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                {/* Icon Choice */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Choose Icon
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
                              ? 'border-[#08709d] bg-[#08709d] text-white font-bold shadow-md'
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

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-[#63b158] hover:bg-[#529d48] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span>Adding Sub-Service...</span>
                  ) : (
                    <>
                      <Plus size={18} />
                      <span>Create Sub-Service under {selectedParentObj ? (selectedParentObj.name || selectedParentObj.title) : 'Parent'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* SUB-SERVICES LIST WITH RE-ASSIGNMENT */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                      Sub-Services Directory ({allSubServicesList.length})
                    </h3>
                    <p className="text-xs text-slate-500 font-sans">
                      All created sub-services with quick parent re-assignment options
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                    {allSubServicesList.length} Active
                  </span>
                </div>

                {allSubServicesList.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 font-medium border border-dashed rounded-2xl">
                    No sub-services created yet. Use the form on the left!
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[680px] overflow-y-auto pr-1">
                    {allSubServicesList.map((sub) => {
                      const currentParent = parentServices.find(p => p.id === sub.parent);
                      return (
                        <div
                          key={sub.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all space-y-3 shadow-xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0 font-bold">
                                <CornerDownRight size={16} />
                              </div>
                              <div>
                                <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                                  {sub.title || sub.name}
                                </h4>
                                <p className="text-xs text-slate-500 line-clamp-1">{sub.tagline || `/services/${sub.slug}`}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <Link
                                to={`/services/${sub.slug}`}
                                target="_blank"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-[#08709d] transition-colors"
                                title="View Page"
                              >
                                <ExternalLink size={15} />
                              </Link>
                              <button
                                onClick={() => handleDeleteService(sub.slug, sub.title)}
                                className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
                                title="Delete Sub-Service"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>

                          {/* Quick Change Parent Selector */}
                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2 flex-wrap text-xs">
                            <span className="font-bold text-slate-500 flex items-center gap-1">
                              <Layers size={13} className="text-[#08709d]" />
                              <span>Parent Service:</span>
                            </span>

                            <select
                              value={sub.parent || ''}
                              onChange={(e) => handleChangeParent(sub.slug, e.target.value)}
                              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-extrabold text-xs text-slate-700 focus:outline-none focus:border-[#08709d]"
                            >
                              <option value="">-- No Parent (Make Standalone) --</option>
                              {parentServices.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.name || p.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PARENT SERVICES MANAGER */}
        {activeTab === 'parents' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* PARENT FORM */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold">
                  <Layers size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                    Create Top-Level Parent Service
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Add a new main category to your navbar dropdown list
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddParentService} className="space-y-5">
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

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Parent Service Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Telehealth & Online Consultation"
                    value={parentTitle}
                    onChange={(e) => setParentTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Custom Slug <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. telehealth"
                    value={parentSlug}
                    onChange={(e) => setParentSlug(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-xs font-mono focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24/7 Virtual doctor consultations & prescriptions"
                    value={parentTagline}
                    onChange={(e) => setParentTagline(e.target.value)}
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

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-[#08709d] hover:bg-[#065b80] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#08709d]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span>Adding Parent...</span>
                  ) : (
                    <>
                      <Plus size={18} />
                      <span>Add Top-Level Navbar Parent</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* PARENT LIST TABLE */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
                <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat mb-4">
                  Top Navbar Parent Services ({parentServices.length})
                </h3>
                <div className="space-y-3">
                  {parentServices.map((p) => {
                    const subCount = servicesData.filter(s => s.parent === p.id).length;
                    return (
                      <div key={p.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#08709d] text-white flex items-center justify-center font-bold">
                            <Layers size={18} />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-800">{p.name || p.title}</h4>
                            <p className="text-xs text-slate-500">{p.subtitle || p.tagline || `/services/${p.slug}`}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            {subCount} Sub-Services
                          </span>
                          <button
                            onClick={() => handleDeleteService(p.slug, p.title)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: COMPLETE HIERARCHY TREE */}
        {activeTab === 'hierarchy' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            <h3 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight font-montserrat mb-6">
              Complete Services & Sub-Services Navbar Hierarchy
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parentServices.map((parent) => {
                const subs = servicesData.filter((s) => s.parent === parent.id);
                return (
                  <div key={parent.id} className="border border-slate-200 rounded-2xl p-5 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-slate-200">
                        <div className="w-8 h-8 rounded-lg bg-[#08709d] text-white flex items-center justify-center shrink-0">
                          <Layers size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-800">{parent.name || parent.title}</h4>
                          <span className="text-[10px] text-slate-500 uppercase font-bold">Top Navbar Parent</span>
                        </div>
                      </div>

                      <div className="space-y-2 pl-2">
                        {subs.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No sub-services attached</p>
                        ) : (
                          subs.map((s) => (
                            <div key={s.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                                <CornerDownRight size={13} className="text-[#63b158]" />
                                {s.title || s.name}
                              </span>
                              <Link to={`/services/${s.slug}`} target="_blank" className="text-slate-400 hover:text-[#08709d]">
                                <ExternalLink size={13} />
                              </Link>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500">{subs.length} Sub-Services</span>
                      <Link to={`/services/${parent.slug}`} target="_blank" className="text-[#08709d] font-bold hover:underline flex items-center gap-1">
                        <span>View Page</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </Container>
    </div>
  );
}
