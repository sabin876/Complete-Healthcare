import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, CheckCircle2, Activity, Droplets, HeartPulse, 
  Stethoscope, HeartHandshake, TestTube, Sparkles, Clock, 
  ShieldCheck, Layers, Trash2, ExternalLink, RefreshCw,
  LayoutDashboard, CornerDownRight, Edit3, Save, X, ArrowRight,
  ListChecks, Image as ImageIcon, BookOpen, ArrowUp, ArrowDown, 
  Search, Copy, Check, Eye, EyeOff, Zap, Sliders, AlertCircle, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { Container } from '../components/ui';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('subservices'); // 'subservices' | 'understanding' | 'benefits' | 'parents' | 'hierarchy'
  const [servicesData, setServicesData] = useState([]);
  const [parentServices, setParentServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [lastSyncedTime, setLastSyncedTime] = useState(null);

  // Toast Notification System State
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', title: string, message: string }

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Sub-Service Form State
  const [selectedParentId, setSelectedParentId] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [subTagline, setSubTagline] = useState('');
  const [subDescription, setSubDescription] = useState('');

  // Parent Service Form State
  const [parentTitle, setParentTitle] = useState('');
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

  // Understanding Form State
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
        
        const now = new Date();
        setLastSyncedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error('Error fetching services for Dashboard:', err);
      showToast('error', 'Sync Failed', 'Could not fetch services from Django backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const loadBenefitsForService = (serviceObj) => {
    if (!serviceObj) return;
    setBenefitsTitleText(serviceObj.benefits_title || `Benefits of Our ${serviceObj.title || serviceObj.name} Service at CORx Healthcare`);
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
        { num: '1', title: 'Freezing Stage:', desc: 'This is the first stage in the progression of frozen shoulder symptoms. Your shoulder starts paining whenever you move it.' },
        { num: '2', title: 'Frozen Stage:', desc: 'In this stage, the pain in your shoulder may decrease, but movement becomes more and more limited.' },
        { num: '3', title: 'Thawing Stage:', desc: 'Symptoms last for 12 to 15 months during this stage, and pain is significantly reduced.' }
      ]);
      showToast('success', 'Preset Loaded', 'Applied Frozen Shoulder clinical template.');
    } else if (presetType === 'knee_pain') {
      setUnderstandingTitleText('Understanding Knee Osteoarthritis & Joint Stiffness');
      setUnderstandingIntroText('Knee osteoarthritis involves progressive wear of the joint cartilage, leading to pain and movement restriction across three distinct phases:');
      setUnderstandingItems([
        { num: '1', title: 'Early Mild Stage:', desc: 'Occasional stiffness after prolonged sitting or physical exertion with minor discomfort.' },
        { num: '2', title: 'Moderate Stiffness Stage:', desc: 'Noticeable pain while walking, climbing stairs, or bending the joint, requiring specialized care.' },
        { num: '3', title: 'Recovery & Mobility Stage:', desc: 'Targeted physical therapy restores functional range of motion and prevents long-term joint degradation.' }
      ]);
      showToast('success', 'Preset Loaded', 'Applied Knee Osteoarthritis clinical template.');
    } else if (presetType === 'elderly_care') {
      setUnderstandingTitleText('Understanding Comprehensive Elderly Home Care');
      setUnderstandingIntroText('Our specialized geriatric home care plans provide compassionate support structured around three care tiers:');
      setUnderstandingItems([
        { num: '1', title: 'Daily Vitality Monitoring:', desc: 'Continuous tracking of blood pressure, sugar levels, medication schedules, and daily wellness.' },
        { num: '2', title: 'Personalized Assisted Living:', desc: 'Dedicated nurse assistance with mobility, bathing, grooming, and specialized dietary management.' },
        { num: '3', title: 'Physiotherapy & Rehabilitation:', desc: 'Customized mobility exercises to improve balance, prevent falls, and maintain independent living.' }
      ]);
      showToast('success', 'Preset Loaded', 'Applied Elderly Care clinical template.');
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
      showToast('error', 'Select Service', 'Please select a service to update benefits.');
      return;
    }
    setSubmitting(true);

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
      
      showToast('success', 'Saved Successfully', `Benefits section updated for "${selectedBenefitsServiceSlug}"!`);
      setBenefitsImageFile(null);
      loadServices();
    } catch (err) {
      console.error(err);
      showToast('error', 'Save Failed', err.message || 'Failed to save benefits.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveUnderstanding = async (e) => {
    e.preventDefault();
    if (!selectedUnderstandingServiceSlug) {
      showToast('error', 'Select Service', 'Please select a service to update understanding section.');
      return;
    }
    setSubmitting(true);

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
      
      showToast('success', 'Saved Successfully', `Understanding section updated for "${selectedUnderstandingServiceSlug}"!`);
      setUnderstandingImageFile(null);
      loadServices();
    } catch (err) {
      console.error(err);
      showToast('error', 'Save Failed', err.message || 'Failed to save understanding section.');
    } fontally {
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
        showToast('success', 'Service Updated', `Updated "${editTitle}" successfully!`);
        loadServices();
      } else {
        showToast('error', 'Update Failed', 'Failed to save service updates.');
      }
    } catch (err) {
      console.error('Save edit error:', err);
      showToast('error', 'Update Error', 'An unexpected error occurred.');
    } finally {
      setSavingEdit(false);
    }
  };

  // Submit Sub-Service
  const handleAddSubService = async (e) => {
    e.preventDefault();

    if (!subTitle.trim()) {
      showToast('error', 'Validation Error', 'Please enter a sub-service title.');
      return;
    }

    if (!selectedParentId) {
      showToast('error', 'Validation Error', 'Please choose a parent service for this sub-service.');
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

      showToast('success', 'Sub-Service Created', `Added "${created.title || subTitle}" under "${parentName}"!`);

      setSubTitle('');
      setSubTagline('');
      setSubDescription('');

      loadServices();

    } catch (err) {
      console.error('Error adding sub-service:', err);
      showToast('error', 'Creation Error', err.message || 'Error connecting to Django backend.');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Top-Level Parent Service
  const handleAddParentService = async (e) => {
    e.preventDefault();

    if (!parentTitle.trim()) {
      showToast('error', 'Validation Error', 'Please enter a parent service title.');
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
      showToast('success', 'Parent Category Added', `Added parent service "${created.title || parentTitle}"!`);

      setParentTitle('');
      setParentTagline('');

      loadServices();

    } catch (err) {
      console.error('Error adding parent service:', err);
      showToast('error', 'Creation Error', err.message || 'Error connecting to Django backend.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (serviceSlug, serviceTitle) => {
    if (!window.confirm(`Are you sure you want to remove "${serviceTitle}"?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${serviceSlug}/`, {
        method: 'DELETE',
      });
      if (res.ok || res.status === 204) {
        showToast('success', 'Service Removed', `Successfully deleted "${serviceTitle}".`);
        loadServices();
      } else {
        showToast('error', 'Delete Failed', 'Failed to delete service.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      showToast('error', 'Delete Error', 'An error occurred during deletion.');
    }
  };

  const handleCopySlug = (slug) => {
    navigator.clipboard.writeText(slug);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const safeServicesData = Array.isArray(servicesData) ? servicesData : [];
  const safeParentServices = Array.isArray(parentServices) ? parentServices : [];
  const selectedParentObj = safeParentServices.find(p => p && p.id && p.id.toString() === selectedParentId);
  const totalSubServices = safeServicesData.filter((s) => s && s.parent !== null).length;
  const allSubServicesList = safeServicesData.filter((s) => s && s.parent !== null);

  const selectedUnderstandingObj = safeServicesData.find(s => s.slug === selectedUnderstandingServiceSlug);
  const selectedBenefitsObj = safeServicesData.find(s => s.slug === selectedBenefitsServiceSlug);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-28 pt-8 font-sans text-slate-800 selection:bg-[#08709d]/20 selection:text-[#08709d]">
      
      {/* Floating Animated Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-[200] max-w-md w-full p-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-start gap-3.5 ${
              toast.type === 'success' 
                ? 'bg-slate-900/95 border-emerald-500/40 text-white' 
                : 'bg-slate-900/95 border-rose-500/40 text-white'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">{toast.title}</h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Container className="max-w-[1420px] px-4 sm:px-6">
        
        {/* Modern Mesh Executive Banner */}
        <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl mb-8 overflow-hidden bg-gradient-to-r from-[#061e36] via-[#08709d] to-[#0d9488] border border-white/15">
          {/* Ambient Lighting Orbs */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 bg-white/15 px-4 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-emerald-300 w-fit mb-3.5 backdrop-blur-md shadow-sm">
                <Zap size={14} className="text-emerald-400 animate-pulse" />
                <span>Danjo Executive Administration Suite</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-montserrat leading-tight drop-shadow-sm">
                Services & Content Management Hub
              </h1>
              <p className="text-white/85 text-xs sm:text-sm md:text-base mt-2.5 font-sans leading-relaxed max-w-2xl">
                Real-time management for top-level navbar services, sub-services, clinical stages, custom benefits, and medical graphics.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
              <button
                onClick={loadServices}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 px-5 py-3 rounded-2xl border border-white/25 text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg cursor-pointer backdrop-blur-md text-white"
              >
                <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                <span>Sync API</span>
              </button>

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-emerald-500/90 hover:bg-emerald-500 active:scale-95 px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg text-white backdrop-blur-md"
              >
                <ExternalLink size={15} />
                <span>View Live Site</span>
              </a>
            </div>
          </div>

          {/* Sync Time Bar */}
          {lastSyncedTime && (
            <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>REST Engine Connected & Active</span>
              </div>
              <div className="font-mono text-[11px] bg-black/20 px-3 py-1 rounded-full border border-white/10">
                Last Synced: {lastSyncedTime}
              </div>
            </div>
          )}
        </div>

        {/* Metrics & Overview Suite */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Services</span>
              <div className="w-10 h-10 rounded-2xl bg-[#08709d]/10 text-[#08709d] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-montserrat">{servicesData.length}</div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-extrabold">
              <CheckCircle2 size={13} />
              <span>Registered in Backend API</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Navbar Parents</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#63b158] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-montserrat">{parentServices.length}</div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#08709d] font-extrabold">
              <Layers size={13} />
              <span>Top Navigation Categories</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Sub-Services</span>
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CornerDownRight size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-montserrat">{totalSubServices}</div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-sky-600 font-extrabold">
              <CornerDownRight size={13} />
              <span>Nested Service Pages</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">API Gateway</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-lg font-black text-emerald-700 uppercase tracking-wide">Operational</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400 font-bold">
              <span>Django REST API Engine</span>
            </div>
          </div>
        </div>

        {/* Tab Control Bar */}
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-3xl border border-slate-200/80 shadow-sm mb-8 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('subservices')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'subservices'
                ? 'bg-[#08709d] text-white shadow-lg shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CornerDownRight size={17} />
            <span>Sub-Services Manager</span>
            <span className={`ml-1.5 text-xs px-2.5 py-0.5 rounded-full font-bold ${activeTab === 'subservices' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
              {totalSubServices}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('understanding')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'understanding'
                ? 'bg-[#08709d] text-white shadow-lg shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen size={17} />
            <span>Understanding Section Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'bg-[#08709d] text-white shadow-lg shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListChecks size={17} />
            <span>Benefits & Image Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('parents')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'parents'
                ? 'bg-[#08709d] text-white shadow-lg shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers size={17} />
            <span>Parent Navbar Services</span>
            <span className={`ml-1.5 text-xs px-2.5 py-0.5 rounded-full font-bold ${activeTab === 'parents' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
              {parentServices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hierarchy'
                ? 'bg-[#08709d] text-white shadow-lg shadow-[#08709d]/30'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity size={17} />
            <span>Hierarchy Tree Map</span>
          </button>
        </div>

        {/* TAB 1: UNDERSTANDING SECTION BUILDER + LIVE PREVIEW */}
        {activeTab === 'understanding' && (
          <div className="space-y-6">
            
            {/* Live Preview Toggle Bar */}
            <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Sliders size={18} className="text-[#08709d]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">Real-Time Visual Sandbox</span>
              </div>
              <button
                type="button"
                onClick={() => setShowLivePreview(!showLivePreview)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-all cursor-pointer"
              >
                {showLivePreview ? <EyeOff size={15} /> : <Eye size={15} />}
                <span>{showLivePreview ? 'Hide Live Preview' : 'Show Live Preview Sandbox'}</span>
              </button>
            </div>

            <div className={`grid grid-cols-1 ${showLivePreview ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-8 items-start`}>
              
              {/* FORM SIDE */}
              <div className={`${showLivePreview ? 'lg:col-span-7' : 'lg:col-span-1'} bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md`}>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold shadow-md shadow-[#08709d]/20">
                      <BookOpen size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight font-montserrat">
                        Understanding Section & Stages Builder
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Configure clinical overview, introduction, numbered condition stages, and medical illustration
                      </p>
                    </div>
                  </div>

                  {/* Clinical 1-Click Presets */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Presets:</span>
                    <button
                      type="button"
                      onClick={() => handleLoadPresetUnderstanding('frozen_shoulder')}
                      className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      Frozen Shoulder
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadPresetUnderstanding('knee_pain')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      Knee Pain
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadPresetUnderstanding('elderly_care')}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      Elderly Care
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSaveUnderstanding} className="space-y-6">
                  {/* Select Service */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#08709d] mb-2">
                      Target Service
                    </label>
                    <select
                      value={selectedUnderstandingServiceSlug}
                      onChange={handleUnderstandingServiceChange}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 text-slate-900 font-black text-sm focus:outline-none focus:border-[#08709d] shadow-sm"
                    >
                      {servicesData.map((s) => (
                        <option key={s.id} value={s.slug}>
                          {s.title || s.name} ({s.slug}) {s.parent ? '— Sub-Service' : '— Top Category'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Section Main Title */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                      Understanding Heading Title
                    </label>
                    <input
                      type="text"
                      value={understandingTitleText}
                      onChange={(e) => setUnderstandingTitleText(e.target.value)}
                      placeholder="e.g. What is Frozen Shoulder / Understanding Frozen Shoulder"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#08709d]"
                    />
                  </div>

                  {/* Intro Paragraph */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                      Introductory Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={understandingIntroText}
                      onChange={(e) => setUnderstandingIntroText(e.target.value)}
                      placeholder="Inflammation and tightness of the connective tissue cause symptoms..."
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#08709d]"
                    />
                  </div>

                  {/* Illustration Image Upload */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
                      <ImageIcon size={16} className="text-[#08709d]" />
                      <span>Upload Medical Illustration Graphic</span>
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
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#08709d]/10 file:text-[#08709d] hover:file:bg-[#08709d]/20 cursor-pointer"
                      />
                      {understandingImagePreview && (
                        <div className="w-16 h-16 rounded-2xl border border-slate-300 overflow-hidden shrink-0 shadow-sm relative group">
                          <img src={understandingImagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stages List Builder */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Numbered Stages List ({understandingItems.length})
                      </label>
                      <button
                        type="button"
                        onClick={handleAddUnderstandingRow}
                        className="px-3.5 py-1.5 rounded-xl bg-[#08709d]/10 text-[#08709d] hover:bg-[#08709d]/20 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus size={14} />
                        <span>Add Stage</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {understandingItems.map((item, idx) => (
                        <div key={idx} className="p-4.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item.num}
                                onChange={(e) => handleUnderstandingItemChange(idx, 'num', e.target.value)}
                                placeholder="#"
                                className="w-10 px-2 py-1 rounded-lg border border-slate-300 text-xs font-black text-center"
                              />
                              <span className="text-xs font-black text-[#08709d] uppercase tracking-wide">
                                Stage #{idx + 1}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveUnderstandingItem(idx, 'up')}
                                className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-lg cursor-pointer disabled:opacity-30"
                              >
                                <ArrowUp size={14} />
                              </button>
                              <button
                                type="button"
                                disabled={idx === understandingItems.length - 1}
                                onClick={() => handleMoveUnderstandingItem(idx, 'down')}
                                className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-lg cursor-pointer disabled:opacity-30"
                              >
                                <ArrowDown size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveUnderstandingRow(idx)}
                                className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg cursor-pointer ml-1"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>

                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUnderstandingItemChange(idx, 'title', e.target.value)}
                            placeholder="Subheading Title (e.g. Freezing Stage:)"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-[#08709d]"
                          />

                          <textarea
                            rows={2}
                            value={item.desc}
                            onChange={(e) => handleUnderstandingItemChange(idx, 'desc', e.target.value)}
                            placeholder="Description of stage..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#08709d]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-[#08709d] hover:bg-[#065b80] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#08709d]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? 'Saving Understanding Section...' : 'Save Section to Backend API'}
                  </button>
                </form>
              </div>

              {/* LIVE PREVIEW SIDEBAR */}
              {showLivePreview && (
                <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl sticky top-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 font-mono">Live Component Sandbox</h4>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-slate-300">Target: {selectedUnderstandingServiceSlug}</span>
                  </div>

                  {/* Render Mock Public Card */}
                  <div className="bg-white text-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-montserrat">
                      {understandingTitleText || 'Understanding Section Title'}
                    </h2>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {understandingIntroText || 'Introductory paragraph text...'}
                    </p>

                    {understandingImagePreview && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 max-h-48">
                        <img src={understandingImagePreview} alt="Illustration Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="space-y-3 pt-2">
                      {understandingItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="w-6 h-6 rounded-full bg-[#08709d] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                            {item.num || i + 1}
                          </span>
                          <div>
                            <span className="text-xs font-extrabold text-slate-900 block">{item.title}</span>
                            <span className="text-[11px] text-slate-600 mt-0.5 block leading-snug">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 2: BENEFITS BUILDER */}
        {activeTab === 'benefits' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-[#63b158] text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                <ListChecks size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight font-montserrat">
                  Benefits Section & Custom Image Builder
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Configure main section title, upload visual media, and manage bulleted clinical benefits
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBenefits} className="space-y-6 max-w-4xl">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#08709d] mb-2">
                  Target Service
                </label>
                <select
                  value={selectedBenefitsServiceSlug}
                  onChange={handleBenefitsServiceChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 text-slate-900 font-black text-sm focus:outline-none focus:border-[#08709d] shadow-sm"
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.title || s.name} ({s.slug}) {s.parent ? '— Sub-Service' : '— Top Category'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                  Benefits Section Main Heading
                </label>
                <input
                  type="text"
                  value={benefitsTitleText}
                  onChange={(e) => setBenefitsTitleText(e.target.value)}
                  placeholder="e.g. Benefits of Our Frozen Shoulder Service at CORx Healthcare"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#08709d]"
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
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
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#08709d]/10 file:text-[#08709d] hover:file:bg-[#08709d]/20 cursor-pointer"
                  />
                  {benefitsImagePreview && (
                    <div className="w-16 h-16 rounded-2xl border border-slate-300 overflow-hidden shrink-0 shadow-sm">
                      <img src={benefitsImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Bulleted Benefits List ({benefitsItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddBenefitRow}
                    className="px-3.5 py-1.5 rounded-xl bg-[#63b158]/10 text-[#63b158] hover:bg-[#63b158]/20 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Add Benefit Point</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {benefitsItems.map((item, idx) => (
                    <div key={idx} className="p-4.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-[#63b158] uppercase tracking-wide">
                          Benefit Point #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefitRow(idx)}
                          className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleBenefitItemChange(idx, 'title', e.target.value)}
                        placeholder="Benefit Title (e.g. Pain Relief & Mobility Restoration)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-[#63b158]"
                      />

                      <textarea
                        rows={2}
                        value={item.desc}
                        onChange={(e) => handleBenefitItemChange(idx, 'desc', e.target.value)}
                        placeholder="Benefit Description..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#63b158]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-[#63b158] hover:bg-[#529d48] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Saving Benefits...' : 'Save Benefits & Image To Backend API'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: SUB-SERVICES MANAGER */}
        {activeTab === 'subservices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SUB-SERVICES FORM */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#63b158] text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
                  <Plus size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight font-montserrat">
                    Create New Sub-Service
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Choose a parent category and register a nested service
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddSubService} className="space-y-5">
                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#08709d] mb-2 flex items-center gap-2">
                    <Layers size={15} />
                    <span>Parent Navbar Service</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedParentId}
                    onChange={(e) => setSelectedParentId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-black text-sm focus:outline-none focus:border-[#08709d] shadow-sm"
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
                    <p className="text-xs text-slate-500 mt-2 font-semibold flex items-center gap-1.5">
                      <CornerDownRight size={13} className="text-[#63b158]" />
                      <span>Nested under: <strong>{selectedParentObj.name || selectedParentObj.title}</strong></span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                    Sub-Service Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Night Care Nurse, Doctor on Call"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                    Tagline / Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 24/7 dedicated overnight clinical care at your doorstep in Dubai."
                    value={subTagline}
                    onChange={(e) => setSubTagline(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-[#63b158] hover:bg-[#529d48] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Adding Sub-Service...' : 'Create Sub-Service'}
                </button>
              </form>
            </div>

            {/* SUB-SERVICES DIRECTORY TABLE */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0a0f1d] rounded-3xl p-6 sm:p-8 border border-slate-800/90 shadow-2xl text-white">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80 flex-wrap gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat flex items-center gap-2.5">
                      <span>Sub-Services Directory</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-mono font-bold">
                        {allSubServicesList.length} Total
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Manage registered sub-services with quick copy, edit, delete, and view actions
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
                    placeholder="Search sub-services by title, category, or description..."
                    className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-700/80 bg-[#12192e] text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Table View */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800/90 bg-[#0e1629]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#131d36] text-white text-xs font-black uppercase tracking-wider border-b border-slate-800">
                        <th className="py-4 px-4 font-montserrat">Service Title & Slug</th>
                        <th className="py-4 px-4 font-montserrat">Parent Category</th>
                        <th className="py-4 px-4 text-center font-montserrat w-16">Link</th>
                        <th className="py-4 px-4 text-center font-montserrat w-16">Edit</th>
                        <th className="py-4 px-4 text-center font-montserrat w-16">Delete</th>
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
                            (s.slug && s.slug.toLowerCase().includes(term)) ||
                            (s.tagline && s.tagline.toLowerCase().includes(term))
                          );
                        })
                        .map((sub) => {
                          const parentObj = parentServices.find(p => p.id === sub.parent);
                          return (
                            <tr key={sub.id} className="hover:bg-[#16223f] transition-colors group">
                              <td className="py-4 px-4">
                                <div className="font-extrabold text-white text-sm group-hover:text-sky-300 transition-colors flex items-center gap-2">
                                  <span>{sub.title || sub.name}</span>
                                  <button
                                    onClick={() => handleCopySlug(sub.slug)}
                                    className="p-1 rounded text-slate-400 hover:text-sky-400 hover:bg-white/10 transition-all cursor-pointer"
                                    title="Copy Slug"
                                  >
                                    {copiedSlug === sub.slug ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                                  </button>
                                </div>
                                <div className="text-slate-400 text-[11px] font-mono mt-0.5 flex items-center gap-2">
                                  <span>/{sub.slug}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-bold">
                                  {parentObj ? (parentObj.name || parentObj.title) : 'Standalone'}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <Link
                                  to={`/services/${sub.slug}`}
                                  target="_blank"
                                  className="p-2 rounded-lg hover:bg-emerald-500/20 text-emerald-400 transition-all inline-flex items-center justify-center"
                                  title="View Public Page"
                                >
                                  <ExternalLink size={17} />
                                </Link>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditModal(sub)}
                                  className="p-2 rounded-lg hover:bg-sky-500/20 text-[#00a2ff] hover:text-sky-300 transition-all cursor-pointer inline-flex items-center justify-center"
                                  title="Edit Service"
                                >
                                  <Edit3 size={17} />
                                </button>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteService(sub.slug, sub.title || sub.name)}
                                  className="p-2 rounded-lg hover:bg-rose-500/20 text-[#ff3b3b] hover:text-rose-400 transition-all cursor-pointer inline-flex items-center justify-center"
                                  title="Delete Service"
                                >
                                  <Trash2 size={17} />
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

        {/* TAB 4: PARENT SERVICES MANAGER */}
        {activeTab === 'parents' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold shadow-md shadow-[#08709d]/20">
                  <Layers size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight font-montserrat">
                    Create Parent Service
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Add a top-level category to your navigation dropdown menu
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddParentService} className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                    Parent Category Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Telehealth & Online Consultation"
                    value={parentTitle}
                    onChange={(e) => setParentTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                    Tagline / Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 24/7 Virtual doctor consultations and medical care in Dubai"
                    value={parentTagline}
                    onChange={(e) => setParentTagline(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#08709d]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-[#08709d] hover:bg-[#065b80] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#08709d]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Adding Parent...' : 'Add Navbar Parent Category'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-[#0a0f1d] rounded-3xl p-6 sm:p-8 border border-slate-800/90 shadow-2xl text-white">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                    <span>Top Navbar Parent Categories</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      {parentServices.length} Total
                    </span>
                  </h3>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800/90 bg-[#0e1629]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#131d36] text-white text-xs font-black uppercase tracking-wider border-b border-slate-800">
                        <th className="py-4 px-4 font-montserrat">Category Title</th>
                        <th className="py-4 px-4 text-center font-montserrat">Sub-Services</th>
                        <th className="py-4 px-4 text-center font-montserrat w-20">Edit</th>
                        <th className="py-4 px-4 text-center font-montserrat w-20">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                      {parentServices.map((p) => {
                        const subCount = servicesData.filter(s => s.parent === p.id).length;
                        return (
                          <tr key={p.id} className="hover:bg-[#16223f] transition-colors group">
                            <td className="py-4 px-4">
                              <div className="font-extrabold text-white text-sm group-hover:text-emerald-300 transition-colors">
                                {p.title || p.name}
                              </div>
                              <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                                /{p.slug}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                                {subCount} Items
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleOpenEditModal(p)}
                                className="p-2 rounded-lg hover:bg-sky-500/20 text-[#00a2ff] hover:text-sky-300 transition-all cursor-pointer inline-flex items-center justify-center"
                                title="Edit Parent Service"
                              >
                                <Edit3 size={17} />
                              </button>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteService(p.slug, p.title || p.name)}
                                className="p-2 rounded-lg hover:bg-rose-500/20 text-[#ff3b3b] hover:text-rose-400 transition-all cursor-pointer inline-flex items-center justify-center"
                                title="Delete Parent Service"
                              >
                                <Trash2 size={17} />
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

        {/* TAB 5: HIERARCHY TREE MAP */}
        {activeTab === 'hierarchy' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight font-montserrat">
                Complete Navbar & Services Tree Architecture
              </h3>
              <p className="text-xs text-slate-500 font-medium">Visual nested mapping of all top-level parents and child services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parentServices.map((parent) => {
                const subs = servicesData.filter((s) => s.parent === parent.id);
                return (
                  <div key={parent.id} className="border border-slate-200/90 rounded-3xl p-6 bg-slate-50/70 hover:bg-white hover:border-[#08709d]/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-md">
                    <div>
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                        <div className="w-10 h-10 rounded-2xl bg-[#08709d] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#08709d]/20">
                          <Layers size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 font-montserrat">{parent.name || parent.title}</h4>
                          <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider">Navbar Parent</span>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {subs.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No sub-services attached</p>
                        ) : (
                          subs.map((s) => (
                            <div key={s.id} className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 text-xs shadow-2xs">
                              <span className="font-bold text-slate-800 flex items-center gap-2">
                                <CornerDownRight size={14} className="text-[#63b158]" />
                                {s.title || s.name}
                              </span>
                              <Link to={`/services/${s.slug}`} target="_blank" className="text-slate-400 hover:text-[#08709d] transition-colors p-1">
                                <ExternalLink size={14} />
                              </Link>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-200 flex justify-between items-center text-xs">
                      <span className="font-black text-slate-500">{subs.length} Sub-Services</span>
                      <Link to={`/services/${parent.slug}`} target="_blank" className="text-[#08709d] font-black hover:underline flex items-center gap-1">
                        <span>View Page</span>
                        <ArrowRight size={13} />
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
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#08709d] text-white flex items-center justify-center font-bold shadow-md shadow-[#08709d]/20">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight font-montserrat">
                    Edit Service Details
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Target: {editingService.title || editingService.name}
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
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  Service Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#08709d]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  Tagline / Description
                </label>
                <textarea
                  rows={3}
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#08709d]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  Parent Category
                </label>
                <select
                  value={editParentId}
                  onChange={(e) => setEditParentId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 text-xs font-black focus:outline-none focus:border-[#08709d]"
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
                  className="px-6 py-2.5 rounded-xl bg-[#08709d] hover:bg-[#065679] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
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
