import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, CheckCircle2, Activity, Droplets, HeartPulse, 
  Stethoscope, HeartHandshake, TestTube, Sparkles, Clock, 
  ShieldCheck, Layers, Trash2, ExternalLink, RefreshCw,
  LayoutDashboard, CornerDownRight, Edit3, Save, X, ArrowRight,
  Gift, ListChecks, Image as ImageIcon, HelpCircle, BookOpen,
  ArrowUp, ArrowDown, Sparkle, Search
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
  const [activeTab, setActiveTab] = useState('subservices'); // 'subservices' | 'parents' | 'benefits' | 'understanding' | 'hierarchy'
  const [servicesData, setServicesData] = useState([]);
  const [parentServices, setParentServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Understanding Form State (Matching Screenshot Layout)
  const [selectedUnderstandingServiceSlug, setSelectedUnderstandingServiceSlug] = useState('');
  const [understandingTitleText, setUnderstandingTitleText] = useState('');
  const [understandingIntroText, setUnderstandingIntroText] = useState('');
  const [understandingImageFile, setUnderstandingImageFile] = useState(null);
  const [understandingImagePreview, setUnderstandingImagePreview] = useState('');
  const [understandingItems, setUnderstandingItems] = useState([
    { num: '1', title: 'Freezing Stage:', desc: 'This is the first stage in the progression of symptoms. Your shoulder starts paining whenever you move it.' },
    { num: '2', title: 'Frozen Stage:', desc: 'In this stage, the pain in your shoulder may decrease, but movement becomes limited.' },
    { num: '3', title: 'Thawing Stage:', desc: 'Symptoms last for 12 to 15 months during this stage, and pain is significantly reduced.' }
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
        if (data.length > 0 && !selectedUnderstandingServiceSlug) {
          setSelectedUnderstandingServiceSlug(data[0].slug);
          loadUnderstandingForService(data[0]);
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

  const loadUnderstandingForService = (serviceObj) => {
    if (!serviceObj) return;
    setUnderstandingTitleText(serviceObj.understanding_title || `What is ${serviceObj.title || serviceObj.name} / Understanding ${serviceObj.title || serviceObj.name}`);
    setUnderstandingIntroText(serviceObj.understanding_intro || `Inflammation and tightness of the connective tissue cause symptoms. Distinct stages are typically associated with this condition:`);
    setUnderstandingImagePreview(serviceObj.understanding_image || serviceObj.understanding_image_file || '');
    setUnderstandingImageFile(null);
    if (Array.isArray(serviceObj.understanding_items) && serviceObj.understanding_items.length > 0) {
      setUnderstandingItems(serviceObj.understanding_items.map((it, idx) => ({
        num: it.num || (idx + 1).toString(),
        title: typeof it === 'string' ? it : (it.title || ''),
        desc: typeof it === 'string' ? '' : (it.desc || it.description || '')
      })));
    } else {
      setUnderstandingItems([
        { num: '1', title: 'Freezing Stage:', desc: 'This is the first stage in the progression of symptoms. Your shoulder starts paining whenever you move it.' },
        { num: '2', title: 'Frozen Stage:', desc: 'In this stage, the pain in your shoulder may decrease, but movement becomes more and more limited.' },
        { num: '3', title: 'Thawing Stage:', desc: 'Symptoms last for 12 to 15 months during this stage, and pain is significantly reduced.' }
      ]);
    }
  };

  const handleBenefitsServiceChange = (e) => {
    const slugVal = e.target.value;
    setSelectedBenefitsServiceSlug(slugVal);
    const found = servicesData.find(s => s.slug === slugVal);
    if (found) loadBenefitsForService(found);
  };

  const handleUnderstandingServiceChange = (e) => {
    const slugVal = e.target.value;
    setSelectedUnderstandingServiceSlug(slugVal);
    const found = servicesData.find(s => s.slug === slugVal);
    if (found) loadUnderstandingForService(found);
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

  const handleAddUnderstandingRow = () => {
    setUnderstandingItems([...understandingItems, { num: (understandingItems.length + 1).toString(), title: '', desc: '' }]);
  };

  const handleRemoveUnderstandingRow = (idx) => {
    setUnderstandingItems(understandingItems.filter((_, i) => i !== idx));
  };

  const handleMoveUnderstandingItem = (idx, direction) => {
    const updated = [...understandingItems];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setUnderstandingItems(updated);
  };

  const handleLoadPresetUnderstanding = (presetType) => {
    if (presetType === 'frozen_shoulder') {
      setUnderstandingTitleText('What is Frozen Shoulder / Understanding Frozen Shoulder');
      setUnderstandingIntroText('Inflammation and tightness of the connective tissue around the shoulder joint cause frozen shoulder or adhesive capsulitis. Three stages are typically associated with the condition:');
      setUnderstandingItems([
        { num: '1', title: 'Freezing Stage:', desc: 'This is the first stage in the progression of frozen shoulder symptoms. Your shoulder starts paining whenever you move it. It usually aches even when your shoulder is not in use.' },
        { num: '2', title: 'Frozen Stage:', desc: 'In this stage, the pain in your shoulder may decrease, but the movement of it becomes more and more limited. Its symptoms may have persisted for 9 to 14 months.' },
        { num: '3', title: 'Thawing Stage:', desc: 'Symptoms last for 12 to 15 months during this stage, and pain is significantly reduced. However, your ability to perform daily activities is improving rapidly.' }
      ]);
    } else if (presetType === 'knee_pain') {
      setUnderstandingTitleText('Understanding Knee Osteoarthritis & Joint Stiffness');
      setUnderstandingIntroText('Knee osteoarthritis involves progressive wear of the joint cartilage, leading to pain and movement restriction across three distinct phases:');
      setUnderstandingItems([
        { num: '1', title: 'Early Mild Stage:', desc: 'Occasional stiffness after prolonged sitting or physical exertion with minor discomfort.' },
        { num: '2', title: 'Moderate Stiffness Stage:', desc: 'Noticeable pain while walking, climbing stairs, or bending the joint, requiring specialized care.' },
        { num: '3', title: 'Recovery & Mobility Stage:', desc: 'Targeted physical therapy restores functional range of motion and prevents long-term joint degradation.' }
      ]);
    }
  };

  const handleUnderstandingItemChange = (idx, field, val) => {
    const updated = [...understandingItems];
    updated[idx][field] = val;
    setUnderstandingItems(updated);
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

  const handleSaveUnderstanding = async (e) => {
    e.preventDefault();
    if (!selectedUnderstandingServiceSlug) {
      setErrorMsg('Please select a service to update understanding section.');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let res;
      if (understandingImageFile) {
        const formData = new FormData();
        formData.append('understanding_title', understandingTitleText.trim());
        formData.append('understanding_intro', understandingIntroText.trim());
        formData.append('understanding_items', JSON.stringify(understandingItems.filter(it => it.title.trim() !== '')));
        formData.append('understanding_image_file', understandingImageFile);

        res = await fetch(`${API_BASE_URL}/api/services/${selectedUnderstandingServiceSlug}/`, {
          method: 'PATCH',
          body: formData,
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/services/${selectedUnderstandingServiceSlug}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            understanding_title: understandingTitleText.trim(),
            understanding_intro: understandingIntroText.trim(),
            understanding_items: understandingItems.filter(it => it.title.trim() !== '')
          })
        });
      }

      if (!res.ok) throw new Error('Failed to save understanding section.');
      
      setSuccessMsg('Successfully saved understanding section & illustration to backend!');
      setUnderstandingImageFile(null);
      loadServices();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to save understanding section.');
    } finally {
      setSubmitting(false);
    }
  };

  // Service Edit Modal State
  const [editingService, setEditingService] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editParentId, setEditParentId] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setEditTitle(service.title || service.name || '');
    setEditTagline(service.tagline || service.subtitle || '');
    setEditParentId(service.parent ? service.parent.toString() : '');
  };

  const handleSaveServiceEdit = async (e) => {
    e.preventDefault();
    if (!editingService) return;
    setSavingEdit(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${editingService.slug}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle.trim(),
          tagline: editTagline.trim(),
          description: editTagline.trim() || editTitle.trim(),
          parent: editParentId ? parseInt(editParentId, 10) : null,
        })
      });

      if (res.ok) {
        setEditingService(null);
        setSuccessMsg(`Successfully updated service "${editTitle}"!`);
        loadServices();
      } else {
        alert('Failed to save service updates.');
      }
    } catch (err) {
      console.error('Save edit error:', err);
    } finally {
      setSavingEdit(false);
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
      tagline: subTagline.trim(),
      description: subDescription.trim() || subTagline.trim() || subTitle.trim(),
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

      setSubTitle('');
      setSubSlug('');
      setSubTagline('');
      setSubDescription('');

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
      tagline: parentTagline.trim(),
      description: parentTagline.trim() || parentTitle.trim(),
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
        
        {/* Executive Header Banner */}
        <div className="bg-gradient-to-r from-[#065b80] via-[#08709d] to-[#0a86bd] rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 bg-white/15 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-emerald-300 w-fit mb-3 backdrop-blur-md">
              <LayoutDashboard size={14} />
              <span>Executive Content Control Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-montserrat">
              Services & Content Management Hub
            </h1>
            <p className="text-white/85 text-xs sm:text-sm md:text-base mt-2 max-w-2xl font-sans leading-relaxed">
              Real-time administration suite for parent navbar services, nested sub-services, custom benefits, condition stages, and medical media.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={loadServices}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 px-5 py-3 rounded-2xl border border-white/25 text-xs font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer backdrop-blur-md"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span>Sync API</span>
            </button>
          </div>
        </div>

        {/* Executive Stats & Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Total Services</span>
              <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{servicesData.length}</span>
              <span className="text-[11px] text-emerald-600 font-bold block mt-1">Live in Django API</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Activity size={22} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Navbar Parents</span>
              <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{parentServices.length}</span>
              <span className="text-[11px] text-[#08709d] font-bold block mt-1">Top-Level Categories</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#63b158] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Layers size={22} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Sub-Services</span>
              <span className="text-2xl font-extrabold text-slate-800 tracking-tight">{totalSubServices}</span>
              <span className="text-[11px] text-sky-600 font-bold block mt-1">Nested Offerings</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <CornerDownRight size={22} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">API Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-extrabold text-emerald-700 uppercase">Operational</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium block mt-1">Django REST Engine</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck size={22} />
            </div>
          </div>
        </div>

        {/* Dashboard Section Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('subservices')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'subservices'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CornerDownRight size={17} />
            <span>Sub-Services Manager</span>
            <span className={`ml-1 text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'subservices' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
              {totalSubServices}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('understanding')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'understanding'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen size={17} />
            <span>Understanding Section Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListChecks size={17} />
            <span>Benefits & Image Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('parents')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'parents'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers size={17} />
            <span>Parent Navbar Services</span>
            <span className={`ml-1 text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'parents' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
              {parentServices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hierarchy'
                ? 'bg-[#08709d] text-white shadow-md shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity size={17} />
            <span>Hierarchy Tree</span>
          </button>
        </div>

        {/* TAB: UNDERSTANDING BUILDER (Matching User Screenshot Layout) */}
        {activeTab === 'understanding' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                    Understanding Section & Stages Builder
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Configure condition overview, intro paragraph, numbered stages, and medical illustration image matching your design
                  </p>
                </div>
              </div>

              {/* 1-Click Presets Bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">1-Click Presets:</span>
                <button
                  type="button"
                  onClick={() => handleLoadPresetUnderstanding('frozen_shoulder')}
                  className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Frozen Shoulder</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPresetUnderstanding('knee_pain')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Knee Pain</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveUnderstanding} className="space-y-6 max-w-4xl">
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
                  value={selectedUnderstandingServiceSlug}
                  onChange={handleUnderstandingServiceChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-extrabold text-sm focus:outline-none focus:border-[#08709d]"
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.title || s.name} ({s.slug}) {s.parent ? '— Sub-Service' : '— Top Parent'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section Main Title */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Understanding Main Heading
                </label>
                <input
                  type="text"
                  value={understandingTitleText}
                  onChange={(e) => setUnderstandingTitleText(e.target.value)}
                  placeholder="e.g. What is Frozen Shoulder / Understanding Frozen Shoulder"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:border-[#08709d]"
                />
              </div>

              {/* Intro Paragraph */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                  Introductory Paragraph
                </label>
                <textarea
                  rows={3}
                  value={understandingIntroText}
                  onChange={(e) => setUnderstandingIntroText(e.target.value)}
                  placeholder="Inflammation and tightness of the connective tissue around the joint cause adhesive capsulitis..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#08709d]"
                />
              </div>

              {/* Illustration Image Upload */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
                  <ImageIcon size={16} className="text-[#08709d]" />
                  <span>Upload Medical Illustration Image</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUnderstandingImageFile(e.target.files[0]);
                        setUnderstandingImagePreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-[#08709d]/10 file:text-[#08709d] hover:file:bg-[#08709d]/20 cursor-pointer"
                  />
                  {understandingImagePreview && (
                    <div className="w-16 h-16 rounded-xl border border-slate-300 overflow-hidden shrink-0 shadow-sm">
                      <img src={understandingImagePreview} alt="Understanding Section Image Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Numbered Stages Builder */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Numbered Stages / Points List ({understandingItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddUnderstandingRow}
                    className="px-3 py-1.5 rounded-lg bg-[#08709d]/10 text-[#08709d] hover:bg-[#08709d]/20 text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>Add Stage / Point</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {understandingItems.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.num}
                            onChange={(e) => handleUnderstandingItemChange(idx, 'num', e.target.value)}
                            placeholder="#"
                            className="w-12 px-2 py-1 rounded border border-slate-300 text-xs font-bold text-center"
                          />
                          <span className="text-xs font-extrabold text-[#08709d] uppercase tracking-wide">
                            Stage / Subheading #{idx + 1}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveUnderstandingItem(idx, 'up')}
                            className="p-1.5 text-slate-500 hover:bg-slate-200 rounded cursor-pointer disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === understandingItems.length - 1}
                            onClick={() => handleMoveUnderstandingItem(idx, 'down')}
                            className="p-1.5 text-slate-500 hover:bg-slate-200 rounded cursor-pointer disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveUnderstandingRow(idx)}
                            className="p-1 text-rose-500 hover:bg-rose-100 rounded-lg cursor-pointer ml-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUnderstandingItemChange(idx, 'title', e.target.value)}
                          placeholder="Subheading Title (e.g. 1. Freezing Stage:)"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs font-bold focus:outline-none focus:border-[#08709d]"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          value={item.desc}
                          onChange={(e) => handleUnderstandingItemChange(idx, 'desc', e.target.value)}
                          placeholder="Description (e.g. This is the first stage in the progression of symptoms...)"
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
                className="w-full py-4 rounded-2xl bg-[#08709d] hover:bg-[#065b80] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#08709d]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Saving Understanding Section...' : 'Save Understanding Section To Backend'}
              </button>
            </form>
          </div>
        )}

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
                      <img src={benefitsImagePreview} alt="Benefits Section Image Preview" className="w-full h-full object-cover" />
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
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-[#63b158] text-white flex items-center justify-center font-bold">
                  <Plus size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                    Create New Sub-Service
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Choose a parent service and add a nested sub-service
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
                    <span>Choose Parent Navbar Service</span>
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
                          {p.name || p.title} ({count} existing sub-services)
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

                {/* STEP 2: SUB-SERVICE TITLE */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Sub-Service Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Night Care Nurse, Post-Op Wound Dressing, Doctor on Call"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                {/* STEP 3: TAGLINE */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Tagline / Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 24/7 dedicated overnight clinical care and monitoring at your doorstep in Dubai."
                    value={subTagline}
                    onChange={(e) => setSubTagline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#08709d]"
                  />
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
                      <span>Create Sub-Service</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* SUB-SERVICES TABLE DIRECTORY (Matching User Screenshot Layout) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0b1329] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden text-white">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80 flex-wrap gap-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                      <span>Sub-Services Directory</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-mono font-bold">
                        {allSubServicesList.length} Total
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Manage registered sub-services with quick Edit & Delete operations
                    </p>
                  </div>
                </div>

                {/* Instant Search Bar */}
                <div className="relative mb-6">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search services by title or category..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-[#162038] text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Table View (Matching Screenshot Exact Headers & Action Icons) */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800/90 bg-[#0e172a]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#141e36] text-white text-sm font-extrabold border-b border-slate-800">
                        <th className="py-3.5 px-4 font-montserrat">Service Title</th>
                        <th className="py-3.5 px-4 font-montserrat">Parent Category</th>
                        <th className="py-3.5 px-4 text-center font-montserrat w-24">Edit</th>
                        <th className="py-3.5 px-4 text-center font-montserrat w-24">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                      {allSubServicesList
                        .filter((s) => {
                          if (!searchTerm) return true;
                          const term = searchTerm.toLowerCase();
                          return (
                            (s.title && s.title.toLowerCase().includes(term)) ||
                            (s.name && s.name.toLowerCase().includes(term)) ||
                            (s.tagline && s.tagline.toLowerCase().includes(term))
                          );
                        })
                        .map((sub) => {
                          const parentObj = parentServices.find(p => p.id === sub.parent);
                          return (
                            <tr key={sub.id} className="hover:bg-[#182442] transition-colors group">
                              <td className="py-3.5 px-4">
                                <div className="font-extrabold text-white text-sm group-hover:text-sky-300 transition-colors">
                                  {sub.title || sub.name}
                                </div>
                                {sub.tagline && (
                                  <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">
                                    {sub.tagline}
                                  </div>
                                )}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-bold">
                                  {parentObj ? (parentObj.name || parentObj.title) : 'Standalone'}
                                </span>
                              </td>
                              {/* Edit Pencil Action Button (Matching Screenshot) */}
                              <td className="py-3.5 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditModal(sub)}
                                  className="p-2 rounded-lg hover:bg-sky-500/20 text-[#00a2ff] hover:text-sky-300 transition-all cursor-pointer inline-flex items-center justify-center"
                                  title="Edit Service"
                                >
                                  <Edit3 size={19} className="stroke-[2.5]" />
                                </button>
                              </td>
                              {/* Delete Trash Action Button (Matching Screenshot) */}
                              <td className="py-3.5 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteService(sub.slug, sub.title || sub.name)}
                                  className="p-2 rounded-lg hover:bg-rose-500/20 text-[#ff3b3b] hover:text-rose-400 transition-all cursor-pointer inline-flex items-center justify-center"
                                  title="Delete Service"
                                >
                                  <Trash2 size={19} className="stroke-[2.5]" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  {allSubServicesList.length === 0 && (
                    <div className="py-12 text-center text-slate-500 font-medium">
                      No sub-services found. Create one using the form on the left.
                    </div>
                  )}
                </div>
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
                    Tagline / Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 24/7 Virtual doctor consultations, home nursing, and medical care in Dubai"
                    value={parentTagline}
                    onChange={(e) => setParentTagline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#08709d]"
                  />
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

            {/* PARENT LIST TABLE DIRECTORY (Matching User Screenshot Layout) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-[#0b1329] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden text-white">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                  <h3 className="text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                    <span>Top Navbar Parent Categories</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      {parentServices.length} Total
                    </span>
                  </h3>
                </div>

                {/* Table View (Matching Screenshot Exact Headers & Action Icons) */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800/90 bg-[#0e172a]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#141e36] text-white text-sm font-extrabold border-b border-slate-800">
                        <th className="py-3.5 px-4 font-montserrat">Category Title</th>
                        <th className="py-3.5 px-4 text-center font-montserrat">Sub-Services</th>
                        <th className="py-3.5 px-4 text-center font-montserrat w-24">Edit</th>
                        <th className="py-3.5 px-4 text-center font-montserrat w-24">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                      {parentServices.map((p) => {
                        const subCount = servicesData.filter(s => s.parent === p.id).length;
                        return (
                          <tr key={p.id} className="hover:bg-[#182442] transition-colors group">
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-white text-sm group-hover:text-emerald-300 transition-colors">
                                {p.title || p.name}
                              </div>
                              {(p.tagline || p.subtitle) && (
                                <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">
                                  {p.tagline || p.subtitle}
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                                {subCount} Items
                              </span>
                            </td>
                            {/* Edit Pencil Action Button (Matching Screenshot) */}
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleOpenEditModal(p)}
                                className="p-2 rounded-lg hover:bg-sky-500/20 text-[#00a2ff] hover:text-sky-300 transition-all cursor-pointer inline-flex items-center justify-center"
                                title="Edit Parent Service"
                              >
                                <Edit3 size={19} className="stroke-[2.5]" />
                              </button>
                            </td>
                            {/* Delete Trash Action Button (Matching Screenshot) */}
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteService(p.slug, p.title || p.name)}
                                className="p-2 rounded-lg hover:bg-rose-500/20 text-[#ff3b3b] hover:text-rose-400 transition-all cursor-pointer inline-flex items-center justify-center"
                                title="Delete Parent Service"
                              >
                                <Trash2 size={19} className="stroke-[2.5]" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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

      {/* EDIT SERVICE MODAL DIALOG */}
      {editingService && (
        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight font-montserrat">
                    Edit Service Details
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Updating: {editingService.title || editingService.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveServiceEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  Service Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-bold focus:outline-none focus:border-[#08709d]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  Tagline / Description
                </label>
                <textarea
                  rows={3}
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#08709d]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  Parent Category
                </label>
                <select
                  value={editParentId}
                  onChange={(e) => setEditParentId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-extrabold focus:outline-none focus:border-[#08709d]"
                >
                  <option value="">-- Standalone (No Parent) --</option>
                  {parentServices.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name || p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-6 py-2.5 rounded-xl bg-[#08709d] hover:bg-[#065679] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
                >
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
