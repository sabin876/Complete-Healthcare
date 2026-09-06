import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, CheckCircle2, Activity,
  ShieldCheck, Layers, Trash2, ExternalLink, RefreshCw,
  LayoutDashboard, CornerDownRight, Edit3, X, ArrowRight,
  ListChecks, Image as ImageIcon, BookOpen, ArrowUp, ArrowDown, 
  Search, Eye, EyeOff, Zap, Sliders, AlertCircle,
  TrendingUp, ArrowUpRight, Server, Globe, Filter, ChevronRight, FileText,
  PenLine, Tag, Clock, User, Hash, AlignLeft, Link2, Save,
  Receipt, DollarSign, UploadCloud, Users, Check, Send
} from 'lucide-react';
import { Link } from 'react-router';
import logo from '../assets/logo.webp';
import { API_BASE_URL } from '../config/api';
import { Container } from '../components/ui';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { 
    staffUsers = [], 
    salaryApplications = [], 
    createSalaryApplication, 
    deleteSalaryApplication 
  } = useAuth?.() || {};

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'subservices' | 'understanding' | 'benefits' | 'parents' | 'hierarchy' | 'blogs' | 'salary'

  const [servicesData, setServicesData] = useState([]);
  const [parentServices, setParentServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [lastSyncedTime, setLastSyncedTime] = useState(null);
  const [selectedParentFilter, setSelectedParentFilter] = useState('all');

  // Toast Notification System State
  const [toast, setToast] = useState(null);

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

  // ── Blog Management State ──────────────────────────────────────────────────
  const [blogsData, setBlogsData] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogSearchTerm, setBlogSearchTerm] = useState('');
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null); // null = create mode, object = edit mode
  const [blogDeleteConfirm, setBlogDeleteConfirm] = useState(null); // id of blog pending delete

  // Blog Form Fields
  const [blogTitle, setBlogTitle]       = useState('');
  const [blogSlug, setBlogSlug]         = useState('');
  const [blogAuthor, setBlogAuthor]     = useState('');
  const [blogDate, setBlogDate]         = useState(new Date().toISOString().split('T')[0]);
  const [blogTag, setBlogTag]           = useState('');
  const [blogExcerpt, setBlogExcerpt]   = useState('');
  const [blogImageUrl, setBlogImageUrl] = useState('');
  const [blogContent, setBlogContent]   = useState('');

  const resetBlogForm = () => {
    setEditingBlog(null);
    setBlogTitle('');
    setBlogSlug('');
    setBlogAuthor('');
    setBlogDate(new Date().toISOString().split('T')[0]);
    setBlogTag('');
    setBlogExcerpt('');
    setBlogImageUrl('');
    setBlogContent('');
  };

  const populateBlogForm = (blog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title || '');
    setBlogSlug(blog.slug || '');
    setBlogAuthor(blog.author || '');
    setBlogDate(blog.date || new Date().toISOString().split('T')[0]);
    setBlogTag(blog.tag || '');
    setBlogExcerpt(blog.excerpt || '');
    setBlogImageUrl(blog.image || '');
    setBlogContent(blog.content || '');
  };

  // Auto-generate slug from title
  const handleBlogTitleChange = (val) => {
    setBlogTitle(val);
    if (!editingBlog) {
      setBlogSlug(
        val.toLowerCase().trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const loadBlogs = async () => {
    setBlogsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogsData(Array.isArray(data) ? data : (data.results || []));
    } catch (err) {
      console.error('Error fetching blogs:', err);
      showToast('error', 'Fetch Failed', 'Could not load blogs from backend.');
    } finally {
      setBlogsLoading(false);
    }
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      showToast('error', 'Validation Error', 'Blog title is required.');
      return;
    }
    setBlogSubmitting(true);
    const payload = {
      title:   blogTitle.trim(),
      slug:    blogSlug.trim() || blogTitle.toLowerCase().replace(/\s+/g, '-'),
      author:  blogAuthor.trim(),
      date:    blogDate,
      tag:     blogTag.trim(),
      excerpt: blogExcerpt.trim(),
      image:   blogImageUrl.trim(),
      content: blogContent.trim(),
    };
    try {
      let res;
      if (editingBlog) {
        res = await fetch(`${API_BASE_URL}/api/blogs/${editingBlog.id}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/blogs/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || JSON.stringify(errData) || 'Failed to save blog');
      }
      showToast('success', editingBlog ? 'Blog Updated' : 'Blog Published', `"${blogTitle}" saved successfully!`);
      resetBlogForm();
      loadBlogs();
    } catch (err) {
      console.error(err);
      showToast('error', 'Save Failed', err.message || 'Could not save blog.');
    } finally {
      setBlogSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/${id}/`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error('Delete failed');
      showToast('success', 'Blog Deleted', 'Blog post removed from backend.');
      setBlogDeleteConfirm(null);
      loadBlogs();
    } catch (err) {
      showToast('error', 'Delete Failed', err.message);
    }
  };

  // ── Salary Slip Management State (3 Things: Staff, Description, Image) ─────
  const [salaryStep, setSalaryStep] = useState(1); // 1: Staff, 2: Description, 3: Upload & Send
  const [selectedSalaryStaffId, setSelectedSalaryStaffId] = useState('');
  const [salaryDescription, setSalaryDescription] = useState('');
  const [salaryImageFile, setSalaryImageFile] = useState(null);
  const [salaryImagePreview, setSalaryImagePreview] = useState('');
  const [salarySubmitting, setSalarySubmitting] = useState(false);
  const [salaryStaffSearch, setSalaryStaffSearch] = useState('');
  const [salaryHistorySearch, setSalaryHistorySearch] = useState('');
  const [salarySlipDeleteConfirm, setSalarySlipDeleteConfirm] = useState(null);
  const [viewingSlipImage, setViewingSlipImage] = useState(null);

  const handleSalaryImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSalaryImageFile(file);
      setSalaryImagePreview(URL.createObjectURL(file));
    }
  };

  const clearSalaryImage = () => {
    setSalaryImageFile(null);
    setSalaryImagePreview('');
  };

  const resetSalaryForm = () => {
    setSalaryStep(1);
    setSelectedSalaryStaffId('');
    setSalaryDescription('');
    clearSalaryImage();
  };


  const handleSendSalarySlip = async (e) => {
    e?.preventDefault();
    if (!selectedSalaryStaffId) {
      showToast('error', 'Staff Required', 'Please choose a staff member to send the salary slip to.');
      return;
    }
    setSalarySubmitting(true);
    try {
      const formData = new FormData();
      formData.append('staffId', selectedSalaryStaffId);
      formData.append('description', salaryDescription);
      formData.append('status', 'Issued');
      if (salaryImageFile) {
        formData.append('image', salaryImageFile);
      }

      const res = await createSalaryApplication?.(formData);
      if (res) {
        showToast('success', 'Salary Slip Sent!', `Monthly salary slip successfully sent to ${res.staffName || 'staff member'}.`);
        resetSalaryForm();
      } else {
        showToast('error', 'Failed to Send', 'Could not send salary slip. Please check your connection.');
      }
    } catch (err) {
      console.error('Error sending salary slip:', err);
      showToast('error', 'Error', 'An error occurred while sending the salary slip.');
    } finally {
      setSalarySubmitting(false);
    }
  };

  const handleDeleteSalarySlip = async (id) => {
    try {
      const ok = await deleteSalaryApplication?.(id);
      if (ok) {
        showToast('success', 'Slip Deleted', 'Salary slip record removed.');
      } else {
        showToast('error', 'Delete Failed', 'Could not delete salary slip.');
      }
      setSalarySlipDeleteConfirm(null);
    } catch (err) {
      showToast('error', 'Error', 'Error deleting salary slip.');
    }
  };

  useEffect(() => {
    if (activeTab === 'blogs') loadBlogs();
  }, [activeTab]);


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
      showToast('error', 'Sync Failed', 'Could not fetch services from Django REST backend.');
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
      showToast('success', 'Preset Applied', 'Loaded Frozen Shoulder clinical template.');
    } else if (presetType === 'knee_pain') {
      setUnderstandingTitleText('Understanding Knee Osteoarthritis & Joint Stiffness');
      setUnderstandingIntroText('Knee osteoarthritis involves progressive wear of the joint cartilage, leading to pain and movement restriction across three distinct phases:');
      setUnderstandingItems([
        { num: '1', title: 'Early Mild Stage:', desc: 'Occasional stiffness after prolonged sitting or physical exertion with minor discomfort.' },
        { num: '2', title: 'Moderate Stiffness Stage:', desc: 'Noticeable pain while walking, climbing stairs, or bending the joint, requiring specialized care.' },
        { num: '3', title: 'Recovery & Mobility Stage:', desc: 'Targeted physical therapy restores functional range of motion and prevents long-term joint degradation.' }
      ]);
      showToast('success', 'Preset Applied', 'Loaded Knee Osteoarthritis clinical template.');
    } else if (presetType === 'elderly_care') {
      setUnderstandingTitleText('Understanding Comprehensive Elderly Home Care');
      setUnderstandingIntroText('Our specialized geriatric home care plans provide compassionate support structured around three care tiers:');
      setUnderstandingItems([
        { num: '1', title: 'Daily Vitality Monitoring:', desc: 'Continuous tracking of blood pressure, sugar levels, medication schedules, and daily wellness.' },
        { num: '2', title: 'Personalized Assisted Living:', desc: 'Dedicated nurse assistance with mobility, bathing, grooming, and specialized dietary management.' },
        { num: '3', title: 'Physiotherapy & Rehabilitation:', desc: 'Customized mobility exercises to improve balance, prevent falls, and maintain independent living.' }
      ]);
      showToast('success', 'Preset Applied', 'Loaded Elderly Care clinical template.');
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
      
      showToast('success', 'Saved Benefits', `Updated benefits section successfully!`);
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
      
      showToast('success', 'Saved Section', `Updated understanding section successfully!`);
      setUnderstandingImageFile(null);
      loadServices();
    } catch (err) {
      console.error(err);
      showToast('error', 'Save Failed', err.message || 'Failed to save understanding section.');
    } finally {
      setSubmitting(false);
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

  const safeServicesData = Array.isArray(servicesData) ? servicesData : [];
  const safeParentServices = Array.isArray(parentServices) ? parentServices : [];
  const selectedParentObj = safeParentServices.find(p => p && p.id && p.id.toString() === selectedParentId);
  const totalSubServices = safeServicesData.filter((s) => s && s.parent !== null).length;
  const allSubServicesList = safeServicesData.filter((s) => s && s.parent !== null);

  const filteredSubServices = allSubServicesList.filter((s) => {
    const matchesSearch = !searchTerm || (
      (s.title && s.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.tagline && s.tagline.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const matchesParent = selectedParentFilter === 'all' || s.parent?.toString() === selectedParentFilter;
    return matchesSearch && matchesParent;
  });

  return (
    <div className="bg-[#050b14] min-h-screen font-sans text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* Ambient Lighting Mesh Backdrop */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Floating Animated Toast Notification Engine */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 right-6 z-[200] max-w-md w-full p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border backdrop-blur-2xl flex items-start gap-4 ${
              toast.type === 'success' 
                ? 'bg-slate-900/95 border-emerald-500/50 text-white shadow-emerald-500/10' 
                : 'bg-slate-900/95 border-rose-500/50 text-white shadow-rose-500/10'
            }`}
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
              {toast.type === 'success' ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black uppercase tracking-widest font-mono text-slate-200">{toast.title}</h4>
              <p className="text-xs text-slate-300 font-medium mt-1 leading-snug">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen">
        
        {/* Futuristic Command Sidebar with CORx Official Logo */}
        <aside className="w-72 bg-[#090f1e]/90 border-r border-slate-800/80 p-6 flex flex-col justify-between hidden xl:flex shrink-0 backdrop-blur-2xl">
          <div>
            {/* CORx Logo Brand Section */}
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-800/80">
              <div className="p-1.5 rounded-2xl bg-white/10 border border-white/20 shadow-lg shadow-cyan-500/10 backdrop-blur-md shrink-0">
                <img src={logo} alt="CORx Healthcare Logo" className="h-9 w-auto object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-wider uppercase font-montserrat bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  CORx Admin
                </h1>
                <p className="text-[10px] text-slate-400 font-mono font-bold tracking-widest uppercase">Healthcare Hub</p>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <LayoutDashboard size={18} className={activeTab === 'overview' ? 'text-cyan-400' : ''} />
                <span>Command Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('subservices')}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  activeTab === 'subservices'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CornerDownRight size={18} className={activeTab === 'subservices' ? 'text-cyan-400' : ''} />
                  <span>Sub-Services</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                  {totalSubServices}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('understanding')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  activeTab === 'understanding'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <BookOpen size={18} className={activeTab === 'understanding' ? 'text-cyan-400' : ''} />
                <span>Understanding Builder</span>
              </button>

              <button
                onClick={() => setActiveTab('benefits')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <ListChecks size={18} className={activeTab === 'benefits' ? 'text-cyan-400' : ''} />
                <span>Benefits & Images</span>
              </button>

              <button
                onClick={() => setActiveTab('parents')}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  activeTab === 'parents'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers size={18} className={activeTab === 'parents' ? 'text-cyan-400' : ''} />
                  <span>Navbar Parents</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  {parentServices.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('hierarchy')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  activeTab === 'hierarchy'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Activity size={18} className={activeTab === 'hierarchy' ? 'text-cyan-400' : ''} />
                <span>Hierarchy Tree</span>
              </button>

              {/* Blog Management */}
              <div className="pt-3 mt-1 border-t border-slate-800/80">
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-600 px-2 mb-2">Content & HR</p>
                
                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                    activeTab === 'blogs'
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/10 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <PenLine size={18} className={activeTab === 'blogs' ? 'text-purple-400' : ''} />
                    <span>Blog Manager</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">
                    {blogsData.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('salary')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 mt-1.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                    activeTab === 'salary'
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Receipt size={18} className={activeTab === 'salary' ? 'text-emerald-400' : ''} />
                    <span>Monthly Salary Slips</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                    {salaryApplications.length}
                  </span>
                </button>
              </div>
            </nav>
          </div>


          {/* System Health Widget */}
          <div className="p-4 rounded-2xl bg-[#0c1527] border border-slate-800 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-400">Django API Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-emerald-400 font-mono font-extrabold text-[11px] flex items-center gap-2">
              <Server size={14} />
              <span>Connected & Operational</span>
            </div>
            {lastSyncedTime && (
              <div className="text-slate-500 text-[10px] font-mono">
                Synced at: {lastSyncedTime}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
          
          {/* Top Bar for Mobile & Quick Actions */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800/80 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <img src={logo} alt="CORx Healthcare" className="h-10 w-auto bg-white/10 p-1.5 rounded-2xl border border-white/20 shadow-md xl:hidden" />
              <div>
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono font-bold uppercase tracking-wider mb-1">
                  <span>CORx Healthcare Admin</span>
                  <ChevronRight size={14} />
                  <span className="text-slate-300">{activeTab}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-montserrat text-white">
                  Content & Services Control Center
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadServices}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                <span>Sync API</span>
              </button>


            </div>
          </div>

          {/* Horizontal Mobile Navigation Selector */}
          <div className="xl:hidden flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'subservices', label: 'Sub-Services', icon: CornerDownRight },
              { id: 'understanding', label: 'Understanding', icon: BookOpen },
              { id: 'benefits', label: 'Benefits', icon: ListChecks },
              { id: 'parents', label: 'Parents', icon: Layers },
              { id: 'hierarchy', label: 'Hierarchy', icon: Activity },
              { id: 'blogs', label: 'Blogs', icon: PenLine }
            ].map(tab => {
              const Icon = tab.icon;
              const isBlog = tab.id === 'blogs';
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? isBlog ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20' : 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 0: COMMAND OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Executive Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#0a1224]/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Total Services</span>
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity size={20} />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white font-montserrat tracking-tight">{servicesData.length}</div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-emerald-400 font-bold">
                    <TrendingUp size={14} />
                    <span>Live in Django Database</span>
                  </div>
                </div>

                <div className="bg-[#0a1224]/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Navbar Parents</span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Layers size={20} />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white font-montserrat tracking-tight">{parentServices.length}</div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-emerald-400 font-bold">
                    <CheckCircle2 size={14} />
                    <span>Main Categories</span>
                  </div>
                </div>

                <div className="bg-[#0a1224]/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Sub-Services</span>
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CornerDownRight size={20} />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white font-montserrat tracking-tight">{totalSubServices}</div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-purple-400 font-bold">
                    <ArrowUpRight size={14} />
                    <span>Nested Offerings</span>
                  </div>
                </div>

                <div className="bg-[#0a1224]/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">API Health</span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                  </div>
                  <div className="text-lg font-black text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2 mt-1">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span>Operational</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-3 font-medium">Django REST Engine</div>
                </div>
              </div>

              {/* Quick Launch Dock & Directory Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                      <span>Registered Services Overview</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('subservices')}
                      className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Manage All</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {allSubServicesList.slice(0, 5).map((sub) => {
                      const parentObj = parentServices.find(p => p.id === sub.parent);
                      return (
                        <div key={sub.id} className="p-4 rounded-2xl bg-[#0e172e] border border-slate-800/80 flex items-center justify-between gap-4 hover:border-cyan-500/40 transition-all">
                          <div>
                            <span className="font-extrabold text-white text-sm block">{sub.title || sub.name}</span>
                            {sub.tagline && <span className="text-xs text-slate-400 font-medium block mt-0.5 line-clamp-1">{sub.tagline}</span>}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold">
                              {parentObj ? (parentObj.name || parentObj.title) : 'Parent Category'}
                            </span>
                            <a
                              href={`${API_BASE_URL}/admin/api/service/${sub.id}/change/`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Edit3 size={15} className="text-[#00a2ff]" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                    Quick Clinical Presets
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Instant pre-populated templates for quick testing and backend synchronization.</p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => { setActiveTab('understanding'); handleLoadPresetUnderstanding('frozen_shoulder'); }}
                      className="w-full text-left p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/20 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>Frozen Shoulder Stages</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={() => { setActiveTab('understanding'); handleLoadPresetUnderstanding('knee_pain'); }}
                      className="w-full text-left p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs hover:bg-emerald-500/20 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>Knee Osteoarthritis Stages</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={() => { setActiveTab('understanding'); handleLoadPresetUnderstanding('elderly_care'); }}
                      className="w-full text-left p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-xs hover:bg-purple-500/20 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>Elderly Care 3-Tier Plan</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 1: SUB-SERVICES MANAGER */}
          {activeTab === 'subservices' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* CREATE SUB-SERVICE FORM WITH ENHANCED INPUT FIELDS */}
              <div className="lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                    <Plus size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                      Create Sub-Service
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">Add a nested service under a parent category</p>
                  </div>
                </div>

                <form onSubmit={handleAddSubService} className="space-y-5">
                  <div className="bg-[#0f1933] p-4.5 rounded-2xl border border-slate-800 space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Layers size={15} />
                      <span>Select Parent Service</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={selectedParentId}
                      onChange={(e) => setSelectedParentId(e.target.value)}
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white font-bold text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all cursor-pointer"
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
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                      <FileText size={15} className="text-cyan-400" />
                      <span>Sub-Service Title</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Night Care Nurse, Doctor on Call"
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                      <BookOpen size={15} className="text-cyan-400" />
                      <span>Tagline / Description</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 24/7 dedicated overnight clinical care at your doorstep in Dubai."
                      value={subTagline}
                      onChange={(e) => setSubTagline(e.target.value)}
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Adding Sub-Service...' : 'Create Sub-Service'}
                  </button>
                </form>
              </div>

              {/* DIRECTORY TABLE MATCHING SCREENSHOT EXACT SPECIFICATION */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden text-white">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1b2742] flex-wrap gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                        <span>Sub-Services Directory</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                          {filteredSubServices.length} Total
                        </span>
                      </h3>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="flex items-center gap-2">
                      <Filter size={15} className="text-slate-400" />
                      <select
                        value={selectedParentFilter}
                        onChange={(e) => setSelectedParentFilter(e.target.value)}
                        className="px-3.5 py-2 rounded-xl border border-slate-700/80 bg-[#060c19] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="all">All Parent Categories</option>
                        {parentServices.map(p => (
                          <option key={p.id} value={p.id.toString()}>{p.name || p.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative mb-6">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search services by title or description..."
                      className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-[#1b2742] bg-[#060c19] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                    />
                  </div>

                  {/* Data Table Matching Screenshot Header & Minimal Icons Exactly */}
                  <div className="overflow-x-auto rounded-2xl border border-[#1b2742] bg-[#090e1a]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0a1122] text-white text-sm font-extrabold border-b border-[#1b2742]">
                          <th className="py-4 px-4 font-montserrat">Service Title</th>
                          <th className="py-4 px-4 font-montserrat">Parent Category</th>

                          <th className="py-4 px-4 text-center font-montserrat font-bold text-white text-sm w-24">Edit</th>
                          <th className="py-4 px-4 text-center font-montserrat font-bold text-white text-sm w-24">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1b2742] text-xs font-medium">
                        {filteredSubServices.map((sub) => {
                          const parentObj = parentServices.find(p => p.id === sub.parent);
                          return (
                            <tr key={sub.id} className="hover:bg-[#0f172a] transition-colors group">
                              <td className="py-4 px-4">
                                <a 
                                  href={`${API_BASE_URL}/admin/api/service/${sub.id}/change/`} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="font-extrabold text-white text-sm hover:text-cyan-300 transition-colors block"
                                >
                                  {sub.title || sub.name}
                                </a>
                                {sub.tagline && (
                                  <div className="text-slate-400 text-xs mt-0.5 line-clamp-1 font-sans">
                                    {sub.tagline}
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-bold">
                                  {parentObj ? (parentObj.name || parentObj.title) : 'Standalone'}
                                </span>
                              </td>

                              {/* Edit Icon -> EXACT MATCH TO SCREENSHOT (Cyan outline pencil icon) */}
                              <td className="py-4 px-4 text-center">
                                <a
                                  href={`${API_BASE_URL}/admin/api/service/${sub.id}/change/`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#00a2ff]/10 transition-colors"
                                  title={`Edit Service #${sub.id} in Django Admin`}
                                >
                                  <Edit3 size={18} className="text-[#00a2ff] stroke-[2.2] hover:scale-110 transition-transform" />
                                </a>
                              </td>
                              {/* Delete Icon -> EXACT MATCH TO SCREENSHOT (Red outline trash can icon) */}
                              <td className="py-4 px-4 text-center">
                                <a
                                  href={`${API_BASE_URL}/admin/api/service/${sub.id}/delete/`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#ff3b3b]/10 transition-colors"
                                  title={`Delete Service #${sub.id} in Django Admin`}
                                >
                                  <Trash2 size={18} className="text-[#ff3b3b] stroke-[2.2] hover:scale-110 transition-transform" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {filteredSubServices.length === 0 && (
                      <div className="py-12 text-center text-slate-500 font-medium text-xs">
                        No services found matching your search.
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: UNDERSTANDING BUILDER */}
          {activeTab === 'understanding' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-[#0a1224]/90 px-6 py-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase text-cyan-400">
                  <Sliders size={18} />
                  <span>Real-Time Visual Sandbox</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLivePreview(!showLivePreview)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {showLivePreview ? <EyeOff size={15} /> : <Eye size={15} />}
                  <span>{showLivePreview ? 'Hide Live Preview' : 'Show Live Preview Sandbox'}</span>
                </button>
              </div>

              <div className={`grid grid-cols-1 ${showLivePreview ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-8 items-start`}>
                
                <div className={`${showLivePreview ? 'lg:col-span-7' : 'lg:col-span-1'} bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl`}>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                        <BookOpen size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                          Understanding Section Builder
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">Configure medical overview & condition stages</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoadPresetUnderstanding('frozen_shoulder')}
                        className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20 cursor-pointer"
                      >
                        Frozen Shoulder
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoadPresetUnderstanding('knee_pain')}
                        className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/20 cursor-pointer"
                      >
                        Knee Pain
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSaveUnderstanding} className="space-y-6">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">Target Service</label>
                      <select
                        value={selectedUnderstandingServiceSlug}
                        onChange={handleUnderstandingServiceChange}
                        className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white font-bold text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                      >
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.slug}>
                            {s.title || s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">Section Heading Title</label>
                      <input
                        type="text"
                        value={understandingTitleText}
                        onChange={(e) => setUnderstandingTitleText(e.target.value)}
                        className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">Introductory Paragraph</label>
                      <textarea
                        rows={3}
                        value={understandingIntroText}
                        onChange={(e) => setUnderstandingIntroText(e.target.value)}
                        className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                      />
                    </div>

                    <div className="p-5 rounded-2xl bg-[#091124] border-2 border-dashed border-slate-700 hover:border-cyan-500/50 transition-all">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                        <ImageIcon size={16} className="text-cyan-400" />
                        <span>Upload Illustration Graphic</span>
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
                          className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                        />
                        {understandingImagePreview && (
                          <div className="w-16 h-16 rounded-xl border border-slate-700 overflow-hidden shrink-0 shadow-md">
                            <img src={understandingImagePreview} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Stages List ({understandingItems.length})</label>
                        <button
                          type="button"
                          onClick={handleAddUnderstandingRow}
                          className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 cursor-pointer flex items-center gap-1"
                        >
                          <Plus size={14} />
                          <span>Add Stage</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {understandingItems.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-[#060c19] space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Stage #{idx + 1}</span>
                              <div className="flex items-center gap-1">
                                <button type="button" disabled={idx === 0} onClick={() => handleMoveUnderstandingItem(idx, 'up')} className="p-1 text-slate-400 hover:text-white disabled:opacity-30"><ArrowUp size={14} /></button>
                                <button type="button" disabled={idx === understandingItems.length - 1} onClick={() => handleMoveUnderstandingItem(idx, 'down')} className="p-1 text-slate-400 hover:text-white disabled:opacity-30"><ArrowDown size={14} /></button>
                                <button type="button" onClick={() => handleRemoveUnderstandingRow(idx)} className="p-1 text-rose-400 hover:text-rose-300 ml-1"><Trash2 size={14} /></button>
                              </div>
                            </div>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleUnderstandingItemChange(idx, 'title', e.target.value)}
                              placeholder="Title (e.g. 1. Freezing Stage)"
                              className="w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-[#0a1224] text-white text-xs font-bold focus:outline-none focus:border-cyan-400"
                            />
                            <textarea
                              rows={2}
                              value={item.desc}
                              onChange={(e) => handleUnderstandingItemChange(idx, 'desc', e.target.value)}
                              placeholder="Description..."
                              className="w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-[#0a1224] text-white text-xs focus:outline-none focus:border-cyan-400"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? 'Saving Section...' : 'Save Section to Backend API'}
                    </button>
                  </form>
                </div>

                {showLivePreview && (
                  <div className="lg:col-span-5 border border-slate-800 p-6 rounded-3xl shadow-2xl text-slate-800 bg-white sticky top-6">
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-montserrat mb-2">
                      {understandingTitleText || 'Understanding Section Heading'}
                    </h2>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {understandingIntroText || 'Introductory description...'}
                    </p>

                    {understandingImagePreview && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 mb-4 max-h-48">
                        <img src={understandingImagePreview} alt="Illustration Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="space-y-3">
                      {understandingItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="w-6 h-6 rounded-full bg-[#08709d] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                            {item.num || i + 1}
                          </span>
                          <div>
                            <span className="text-xs font-extrabold text-slate-900 block">{item.title}</span>
                            <span className="text-[11px] text-slate-600 block leading-snug">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 3: BENEFITS BUILDER */}
          {activeTab === 'benefits' && (
            <div className="bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-4xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                  <ListChecks size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                    Benefits & Custom Image Builder
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Manage custom clinical bullet points & visual photo graphics</p>
                </div>
              </div>

              <form onSubmit={handleSaveBenefits} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">Target Service</label>
                  <select
                    value={selectedBenefitsServiceSlug}
                    onChange={handleBenefitsServiceChange}
                    className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white font-bold text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.slug}>
                        {s.title || s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">Benefits Section Title</label>
                  <input
                    type="text"
                    value={benefitsTitleText}
                    onChange={(e) => setBenefitsTitleText(e.target.value)}
                    className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#091124] border-2 border-dashed border-slate-700 hover:border-emerald-500/50 transition-all">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                    <ImageIcon size={16} className="text-emerald-400" />
                    <span>Upload Custom Benefits Image</span>
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
                      className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                    />
                    {benefitsImagePreview && (
                      <div className="w-16 h-16 rounded-xl border border-slate-700 overflow-hidden shrink-0 shadow-md">
                        <img src={benefitsImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Bulleted Points ({benefitsItems.length})</label>
                    <button
                      type="button"
                      onClick={handleAddBenefitRow}
                      className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 text-xs font-bold hover:bg-emerald-500/20 cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={14} />
                      <span>Add Benefit</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {benefitsItems.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-[#060c19] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Benefit #{idx + 1}</span>
                          <button type="button" onClick={() => handleRemoveBenefitRow(idx)} className="p-1 text-rose-400 hover:text-rose-300"><Trash2 size={14} /></button>
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleBenefitItemChange(idx, 'title', e.target.value)}
                          placeholder="Benefit Title..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-[#0a1224] text-white text-xs font-bold focus:outline-none focus:border-emerald-500"
                        />
                        <textarea
                          rows={2}
                          value={item.desc}
                          onChange={(e) => handleBenefitItemChange(idx, 'desc', e.target.value)}
                          placeholder="Description..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-[#0a1224] text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Saving Benefits...' : 'Save Benefits & Image To Backend'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: PARENT SERVICES MANAGER */}
          {activeTab === 'parents' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                    <Layers size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                      Create Parent Category
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">Add a top-level navbar service category</p>
                  </div>
                </div>

                <form onSubmit={handleAddParentService} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">Category Title <span className="text-rose-400">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. Telehealth & Online Care"
                      value={parentTitle}
                      onChange={(e) => setParentTitle(e.target.value)}
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-bold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">Tagline / Description</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 24/7 Virtual doctor consultations in Dubai"
                      value={parentTagline}
                      onChange={(e) => setParentTagline(e.target.value)}
                      className="w-full px-4.5 py-3.5 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Adding Parent...' : 'Add Parent Category'}
                  </button>
                </form>
              </div>

              {/* PARENT TABLE MATCHING SCREENSHOT EXACT DESIGN */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden text-white">
                  <h3 className="text-lg font-extrabold text-white uppercase tracking-tight font-montserrat mb-6 pb-4 border-b border-[#1b2742] flex items-center justify-between">
                    <span>Top Navbar Parent Categories</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      {parentServices.length} Total
                    </span>
                  </h3>

                  <div className="overflow-x-auto rounded-2xl border border-[#1b2742] bg-[#090e1a]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0a1122] text-white text-sm font-extrabold border-b border-[#1b2742]">
                          <th className="py-4 px-4 font-montserrat">Category Title</th>
                          <th className="py-4 px-4 text-center font-montserrat">Sub-Services</th>
                          <th className="py-4 px-4 text-center font-montserrat font-bold text-white text-sm w-24">Edit</th>
                          <th className="py-4 px-4 text-center font-montserrat font-bold text-white text-sm w-24">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1b2742] text-xs font-medium">
                        {parentServices.map((p) => {
                          const subCount = servicesData.filter(s => s.parent === p.id).length;
                          return (
                            <tr key={p.id} className="hover:bg-[#0f172a] transition-colors group">
                              <td className="py-4 px-4">
                                <a 
                                  href={`${API_BASE_URL}/admin/api/service/${p.id}/change/`} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="font-extrabold text-white text-sm group-hover:text-emerald-300 transition-colors block"
                                >
                                  {p.title || p.name}
                                </a>
                                {(p.tagline || p.subtitle) && (
                                  <div className="text-slate-400 text-xs mt-0.5 line-clamp-1 font-sans">
                                    {p.tagline || p.subtitle}
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                                  {subCount} Items
                                </span>
                              </td>
                              {/* Edit Icon -> EXACT MATCH TO SCREENSHOT */}
                              <td className="py-4 px-4 text-center">
                                <a
                                  href={`${API_BASE_URL}/admin/api/service/${p.id}/change/`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#00a2ff]/10 transition-colors"
                                  title={`Edit Category #${p.id} in Django Admin`}
                                >
                                  <Edit3 size={18} className="text-[#00a2ff] stroke-[2.2] hover:scale-110 transition-transform" />
                                </a>
                              </td>
                              {/* Delete Icon -> EXACT MATCH TO SCREENSHOT */}
                              <td className="py-4 px-4 text-center">
                                <a
                                  href={`${API_BASE_URL}/admin/api/service/${p.id}/delete/`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#ff3b3b]/10 transition-colors"
                                  title={`Delete Category #${p.id} in Django Admin`}
                                >
                                  <Trash2 size={18} className="text-[#ff3b3b] stroke-[2.2] hover:scale-110 transition-transform" />
                                </a>
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
            <div className="bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-black text-white uppercase tracking-tight font-montserrat mb-6 pb-4 border-b border-slate-800">
                Complete Architecture Map
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parentServices.map((parent) => {
                  const subs = servicesData.filter((s) => s.parent === parent.id);
                  return (
                    <div key={parent.id} className="border border-slate-800 rounded-3xl p-6 bg-[#060b17] hover:border-cyan-500/40 transition-all">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                            <Layers size={18} />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-white font-montserrat">{parent.name || parent.title}</h4>
                            <span className="text-[10px] text-slate-400 uppercase font-mono">Navbar Parent</span>
                          </div>
                        </div>
                        <a
                          href={`${API_BASE_URL}/admin/api/service/${parent.id}/change/`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-[#00a2ff] hover:bg-[#00a2ff]/10 rounded-lg transition-all"
                          title="Edit in Django Admin"
                        >
                          <Edit3 size={15} />
                        </a>
                      </div>

                      <div className="space-y-2.5">
                        {subs.length === 0 ? (
                          <p className="text-xs text-slate-500 italic">No sub-services attached</p>
                        ) : (
                          subs.map((s) => (
                            <div key={s.id} className="flex items-center justify-between bg-[#0a1224] p-3 rounded-2xl border border-slate-800 text-xs">
                              <span className="font-bold text-slate-200 flex items-center gap-2">
                                <CornerDownRight size={14} className="text-emerald-400" />
                                {s.title || s.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <a
                                  href={`${API_BASE_URL}/admin/api/service/${s.id}/change/`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#00a2ff] hover:text-cyan-300"
                                  title="Edit in Django Admin"
                                >
                                  <Edit3 size={14} />
                                </a>

                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: BLOG MANAGER */}
          {activeTab === 'blogs' && (
            <div className="space-y-8">

              {/* Delete Confirmation Modal */}
              <AnimatePresence>
                {blogDeleteConfirm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.85, opacity: 0 }}
                      className="bg-[#0c1527] border border-rose-500/40 rounded-3xl p-8 max-w-sm w-full shadow-2xl shadow-rose-500/10"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                        <Trash2 size={22} />
                      </div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat mb-2">Delete Blog Post?</h3>
                      <p className="text-xs text-slate-400 mb-6 leading-relaxed">This action is permanent and cannot be undone. The blog post will be removed from the backend database.</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDeleteBlog(blogDeleteConfirm)}
                          className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer hover:opacity-90 transition-all"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setBlogDeleteConfirm(null)}
                          className="flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* ── LEFT: CREATE / EDIT BLOG FORM ─────────────────── */}
                <div className="lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl sticky top-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold border ${
                        editingBlog
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                      }`}>
                        {editingBlog ? <Edit3 size={22} /> : <PenLine size={22} />}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                          {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {editingBlog ? `Editing: "${editingBlog.title?.slice(0, 28)}..."` : 'Publish a new article to the site'}
                        </p>
                      </div>
                    </div>
                    {editingBlog && (
                      <button
                        onClick={resetBlogForm}
                        className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                        title="Cancel editing"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveBlog} className="space-y-4">

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-2">
                        <FileText size={13} /><span>Title</span><span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={blogTitle}
                        onChange={(e) => handleBlogTitleChange(e.target.value)}
                        placeholder="e.g. Understanding Total Knee Replacement"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 shadow-inner transition-all placeholder-slate-500"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <Hash size={13} /><span>URL Slug</span>
                      </label>
                      <input
                        type="text"
                        value={blogSlug}
                        onChange={(e) => setBlogSlug(e.target.value)}
                        placeholder="auto-generated-from-title"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-slate-300 text-xs font-mono focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-600"
                      />
                    </div>

                    {/* Author + Date */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                          <User size={12} /><span>Author</span>
                        </label>
                        <input
                          type="text"
                          value={blogAuthor}
                          onChange={(e) => setBlogAuthor(e.target.value)}
                          placeholder="Dr. Ulhas Sonar"
                          className="w-full px-3 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                          <Clock size={12} /><span>Date</span>
                        </label>
                        <input
                          type="date"
                          value={blogDate}
                          onChange={(e) => setBlogDate(e.target.value)}
                          className="w-full px-3 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-purple-400 shadow-inner transition-all"
                        />
                      </div>
                    </div>

                    {/* Tag */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <Tag size={13} /><span>Category Tag</span>
                      </label>
                      <input
                        type="text"
                        value={blogTag}
                        onChange={(e) => setBlogTag(e.target.value)}
                        placeholder="e.g. KNEE-REPLACEMENT"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-500"
                      />
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <Link2 size={13} /><span>Cover Image URL</span>
                      </label>
                      <input
                        type="url"
                        value={blogImageUrl}
                        onChange={(e) => setBlogImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-mono focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-600"
                      />
                      {blogImageUrl && (
                        <div className="mt-2 w-full h-24 rounded-xl overflow-hidden border border-slate-700">
                          <img src={blogImageUrl} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                        </div>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <AlignLeft size={13} /><span>Excerpt / Summary</span>
                      </label>
                      <textarea
                        rows={3}
                        value={blogExcerpt}
                        onChange={(e) => setBlogExcerpt(e.target.value)}
                        placeholder="A brief 1–2 sentence summary shown on the blog listing page..."
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-500"
                      />
                    </div>

                    {/* Full Content */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <BookOpen size={13} /><span>Full Content (HTML / Markdown)</span>
                      </label>
                      <textarea
                        rows={8}
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Write the full blog post content here. You can use HTML or Markdown..."
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed font-mono focus:outline-none focus:border-purple-400 shadow-inner transition-all placeholder-slate-500 resize-y"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={blogSubmitting}
                      className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 transition-all ${
                        editingBlog
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-purple-500/20'
                      }`}
                    >
                      <Save size={16} />
                      {blogSubmitting ? 'Saving...' : editingBlog ? 'Update Blog Post' : 'Publish Blog Post'}
                    </button>

                    {editingBlog && (
                      <button
                        type="button"
                        onClick={resetBlogForm}
                        className="w-full py-3 rounded-2xl bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-all"
                      >
                        Cancel — Create New Instead
                      </button>
                    )}
                  </form>
                </div>

                {/* ── RIGHT: BLOG LIST TABLE ────────────────────────── */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1b2742] flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                          <PenLine size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                            Blog Posts
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-bold">
                              {blogsData.length} Total
                            </span>
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">All published articles from backend</p>
                        </div>
                      </div>
                      <button
                        onClick={loadBlogs}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-purple-400 border border-purple-500/30 text-xs font-bold transition-all cursor-pointer"
                      >
                        <RefreshCw size={14} className={blogsLoading ? 'animate-spin' : ''} />
                        Refresh
                      </button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-5">
                      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={blogSearchTerm}
                        onChange={(e) => setBlogSearchTerm(e.target.value)}
                        placeholder="Search by title, author, or tag..."
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#1b2742] bg-[#060c19] text-xs font-bold text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 shadow-inner"
                      />
                    </div>

                    {/* Table */}
                    {blogsLoading ? (
                      <div className="py-16 text-center">
                        <RefreshCw size={28} className="animate-spin text-purple-400 mx-auto mb-3" />
                        <p className="text-slate-400 text-xs font-bold">Loading blog posts...</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-[#1b2742]">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-[#0a1122] text-white text-xs font-extrabold border-b border-[#1b2742]">
                              <th className="py-3.5 px-4 font-montserrat">Title</th>
                              <th className="py-3.5 px-4 font-montserrat hidden sm:table-cell">Author</th>
                              <th className="py-3.5 px-4 font-montserrat hidden md:table-cell">Tag</th>
                              <th className="py-3.5 px-4 font-montserrat hidden lg:table-cell">Date</th>
                              <th className="py-3.5 px-4 text-center font-montserrat w-20">Edit</th>
                              <th className="py-3.5 px-4 text-center font-montserrat w-20">Delete</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1b2742] text-xs font-medium">
                            {blogsData
                              .filter(b => {
                                const q = blogSearchTerm.toLowerCase();
                                return !q ||
                                  (b.title || '').toLowerCase().includes(q) ||
                                  (b.author || '').toLowerCase().includes(q) ||
                                  (b.tag || '').toLowerCase().includes(q);
                              })
                              .map((blog) => (
                                <tr key={blog.id} className="hover:bg-[#0f172a] transition-colors group">
                                  <td className="py-4 px-4">
                                    <a
                                      href={`/blog/${blog.slug || blog.id}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="font-extrabold text-white text-sm hover:text-purple-300 transition-colors block line-clamp-1"
                                    >
                                      {blog.title}
                                    </a>
                                    {blog.excerpt && (
                                      <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">{blog.excerpt}</div>
                                    )}
                                  </td>
                                  <td className="py-4 px-4 hidden sm:table-cell">
                                    <span className="text-slate-300 font-medium">{blog.author || '—'}</span>
                                  </td>
                                  <td className="py-4 px-4 hidden md:table-cell">
                                    {blog.tag && (
                                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-bold whitespace-nowrap">
                                        {blog.tag}
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-4 px-4 hidden lg:table-cell">
                                    <span className="text-slate-400 font-mono text-[11px]">{blog.date || '—'}</span>
                                  </td>
                                  {/* Edit */}
                                  <td className="py-4 px-4 text-center">
                                    <button
                                      onClick={() => { populateBlogForm(blog); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                      className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#00a2ff]/10 transition-colors cursor-pointer"
                                      title="Edit this blog post"
                                    >
                                      <Edit3 size={17} className="text-[#00a2ff] stroke-[2.2] hover:scale-110 transition-transform" />
                                    </button>
                                  </td>
                                  {/* Delete */}
                                  <td className="py-4 px-4 text-center">
                                    <button
                                      onClick={() => setBlogDeleteConfirm(blog.id)}
                                      className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#ff3b3b]/10 transition-colors cursor-pointer"
                                      title="Delete this blog post"
                                    >
                                      <Trash2 size={17} className="text-[#ff3b3b] stroke-[2.2] hover:scale-110 transition-transform" />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>

                        {blogsData.filter(b => {
                          const q = blogSearchTerm.toLowerCase();
                          return !q || (b.title||'').toLowerCase().includes(q) || (b.author||'').toLowerCase().includes(q) || (b.tag||'').toLowerCase().includes(q);
                        }).length === 0 && (
                          <div className="py-14 text-center">
                            <PenLine size={32} className="text-slate-700 mx-auto mb-3" />
                            <p className="text-slate-500 font-bold text-xs">
                              {blogsData.length === 0
                                ? 'No blog posts found. Create your first post using the form on the left.'
                                : 'No results match your search.'}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              SALARY SLIPS MANAGEMENT TAB
             ══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'salary' && (

            <div className="space-y-6">
              {/* Header Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900/30 via-teal-900/20 to-slate-900/40 border border-emerald-500/30 relative overflow-hidden backdrop-blur-xl">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-500/30 flex items-center gap-1.5">
                        <Receipt size={12} /> HR & Payroll
                      </span>
                      <span className="text-slate-500 text-xs">•</span>
                      <span className="text-slate-400 text-xs font-mono">3-Step Dispatch</span>
                    </div>
                    <h2 className="text-2xl font-black text-white font-montserrat tracking-tight">
                      Monthly Salary Slip Application
                    </h2>
                    <p className="text-slate-400 text-xs mt-1 max-w-xl">
                      Choose a staff member, enter the description / period details, attach the salary slip image, and send it directly to the staff portal.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-right">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Total Issued</div>
                      <div className="text-xl font-mono font-black text-emerald-400">{salaryApplications.length}</div>
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-right">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Total Staff</div>
                      <div className="text-xl font-mono font-black text-cyan-400">{staffUsers.length}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Left Form, Right History */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* ── LEFT: The 3-Step Send Form Wizard (5 cols) ────────────────────── */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-3xl bg-[#0c1527] border border-[#1b2742] shadow-2xl relative">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                          <Send size={15} />
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-white font-montserrat">Send Salary Slip</h3>
                          <p className="text-[10px] text-slate-500 font-mono">3-Step Dispatch Wizard</p>
                        </div>
                      </div>

                      {selectedSalaryStaffId && (
                        <button
                          type="button"
                          onClick={resetSalaryForm}
                          className="text-[11px] text-slate-400 hover:text-red-400 font-bold transition-colors cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>

                    {/* Step Progress Stepper Bar */}
                    <form onSubmit={handleSendSalarySlip} className="space-y-5">

                      {/* 1. CHOOSE STAFF */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <span>1.</span> Choose Staff Member <span className="text-red-400">*</span>
                          </label>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {selectedSalaryStaffId ? '✓ Staff selected' : 'Required'}
                          </span>
                        </div>

                        {/* Selected Staff Spotlight Banner */}
                        {(() => {
                          const selObj = staffUsers.find(s => s.staffId === selectedSalaryStaffId);
                          if (!selObj) return null;
                          const initials = (selObj.fullName || '??').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
                          return (
                            <div className="mb-3 p-3 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-between gap-3 shadow-md shadow-emerald-500/10">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                                  {initials}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-black text-white truncate">{selObj.fullName}</div>
                                  <div className="text-[11px] text-emerald-300 font-mono truncate">
                                    ID: <span className="font-bold">{selObj.staffId}</span> • {selObj.position || selObj.department || 'Staff'}
                                  </div>
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
                                Selected
                              </span>
                            </div>
                          );
                        })()}

                        {/* Search staff */}
                        <div className="relative mb-2.5">
                          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input
                            type="text"
                            value={salaryStaffSearch}
                            onChange={(e) => setSalaryStaffSearch(e.target.value)}
                            placeholder="Search staff name, ID, department..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#060c19] border border-[#1b2742] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>

                        {/* Staff Cards Grid */}
                        <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                          {staffUsers
                            .filter(s => {
                              const q = salaryStaffSearch.toLowerCase().trim();
                              return !q || (s.fullName || '').toLowerCase().includes(q) || (s.staffId || '').toLowerCase().includes(q) || (s.department || '').toLowerCase().includes(q) || (s.position || '').toLowerCase().includes(q);
                            })
                            .map((s) => {
                              const isSelected = selectedSalaryStaffId === s.staffId;
                              const initials = (s.fullName || '??').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

                              return (
                                <div
                                  key={s.id || s.staffId}
                                  onClick={() => setSelectedSalaryStaffId(s.staffId)}
                                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-150 border ${
                                    isSelected
                                      ? 'bg-emerald-500/20 border-emerald-500 shadow-md shadow-emerald-500/10 text-white'
                                      : 'bg-[#060c19]/60 border-[#1b2742] hover:border-slate-700 text-slate-300'
                                  }`}
                                >
                                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                                    isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400'
                                  }`}>
                                    {initials}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold truncate">{s.fullName}</div>
                                    <div className="text-[10px] text-slate-400 font-mono truncate flex items-center gap-1.5">
                                      <span className="text-cyan-400 font-bold">{s.staffId}</span>
                                      {s.department && <span>• {s.department}</span>}
                                      {s.position && <span className="text-slate-500">({s.position})</span>}
                                    </div>
                                  </div>

                                  {isSelected ? (
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                      <Check size={12} strokeWidth={3} />
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                                  )}
                                </div>
                              );
                            })}

                          {staffUsers.length === 0 && (
                            <div className="p-4 text-center text-slate-500 text-xs font-mono">
                              No staff members found in the directory.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 2. DESCRIPTION */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <span>2.</span> Description / Notes
                        </label>
                        <textarea
                          rows={3}
                          value={salaryDescription}
                          onChange={(e) => setSalaryDescription(e.target.value)}
                          placeholder="e.g. Monthly Salary Slip for August 2026 - Transferred to your registered bank account via WPS."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#060c19] border border-[#1b2742] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none font-medium"
                        />
                      </div>

                      {/* 3. SALARY SLIP IMAGE */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <span>3.</span> Salary Slip Image / Document
                        </label>

                        {!salaryImagePreview ? (
                          <label className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-[#1b2742] hover:border-emerald-500/50 bg-[#060c19]/50 cursor-pointer transition-colors group">
                            <UploadCloud size={24} className="text-slate-500 group-hover:text-emerald-400 mb-1.5 transition-colors" />
                            <span className="text-xs font-bold text-slate-300 group-hover:text-white">
                              Click to attach slip image
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                              PNG, JPG, WEBP, or PDF
                            </span>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleSalaryImageChange}
                              className="hidden"
                            />
                          </label>
                        ) : (
                          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-[#060c19] p-3 flex items-center gap-3">
                            <img
                              src={salaryImagePreview}
                              alt="Salary Slip Preview"
                              className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white truncate">{salaryImageFile?.name || 'Attached Slip'}</p>
                              <p className="text-[10px] text-emerald-400 font-mono">Ready to dispatch</p>
                            </div>
                            <button
                              type="button"
                              onClick={clearSalaryImage}
                              className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                              title="Remove image"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Send Button */}
                      <button
                        type="submit"
                        disabled={salarySubmitting || !selectedSalaryStaffId}
                        className={`w-full py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-wider font-montserrat flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                          salarySubmitting || !selectedSalaryStaffId
                            ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99]'
                        }`}
                      >
                        {salarySubmitting ? (
                          <>
                            <RefreshCw size={15} className="animate-spin" />
                            <span>Sending Slip...</span>
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            <span>Send Monthly Salary Slip to Staff</span>
                          </>
                        )}
                      </button>

                    </form>

                  </div>
                </div>


                {/* ── RIGHT: Sent Salary Slips Directory (7 cols) ────────────── */}
                <div className="lg:col-span-7">
                  <div className="p-6 rounded-3xl bg-[#0c1527] border border-[#1b2742] shadow-2xl h-full flex flex-col">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
                      <div>
                        <h3 className="text-sm font-extrabold text-white font-montserrat">Issued Salary Slips Directory</h3>
                        <p className="text-[10px] text-slate-500 font-mono">All monthly slips sent to staff members</p>
                      </div>

                      {/* Search history */}
                      <div className="relative min-w-[200px]">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          value={salaryHistorySearch}
                          onChange={(e) => setSalaryHistorySearch(e.target.value)}
                          placeholder="Filter slips..."
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#060c19] border border-[#1b2742] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
                        />
                      </div>
                    </div>

                    {/* Slips List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[580px] custom-scrollbar">
                      {salaryApplications
                        .filter(slip => {
                          const q = salaryHistorySearch.toLowerCase().trim();
                          return !q || 
                            (slip.staffName || '').toLowerCase().includes(q) || 
                            (slip.staffId || '').toLowerCase().includes(q) || 
                            (slip.description || '').toLowerCase().includes(q) ||
                            (slip.staffDep || '').toLowerCase().includes(q);
                        })
                        .map((slip) => {
                          const initials = (slip.staffName || '??').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
                          const imgUrl = slip.image ? (slip.image.startsWith('http') ? slip.image : `${API_BASE_URL}${slip.image.startsWith('/') ? '' : '/'}${slip.image}`) : null;

                          return (
                            <div
                              key={slip.id}
                              className="p-4 rounded-2xl bg-[#060c19]/80 border border-[#1b2742] hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                                  {initials}
                                </div>

                                <div className="flex-1 min-w-0 space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-black text-white">{slip.staffName}</span>
                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                                      {slip.staffId}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500">
                                      {slip.staffDep}
                                    </span>
                                  </div>

                                  <p className="text-xs text-slate-300 font-medium leading-relaxed break-words">
                                    {slip.description || <span className="text-slate-600 italic">No description provided</span>}
                                  </p>

                                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                    <Clock size={11} />
                                    <span>Issued: {new Date(slip.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Right Actions & Image Thumbnail */}
                              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                                {imgUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setViewingSlipImage(imgUrl)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-bold transition-all cursor-pointer"
                                  >
                                    <img src={imgUrl} alt="thumbnail" className="w-5 h-5 rounded object-cover" />
                                    <span>View Slip</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => setSalarySlipDeleteConfirm(slip.id)}
                                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all cursor-pointer"
                                  title="Delete Salary Slip"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>
                          );
                        })}

                      {salaryApplications.length === 0 && (
                        <div className="py-20 text-center">
                          <Receipt size={36} className="text-slate-700 mx-auto mb-3" />
                          <p className="text-slate-400 font-bold text-xs">No salary slips issued yet.</p>
                          <p className="text-slate-600 text-[11px] font-mono mt-1">Use the form on the left to send the first salary slip.</p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── Image Preview Zoom Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {viewingSlipImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setViewingSlipImage(null)}
          >
            <div
              className="relative max-w-3xl max-h-[90vh] bg-[#0c1527] border border-slate-700 rounded-3xl p-4 shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-emerald-400">Salary Slip Attachment</span>
                <button
                  onClick={() => setViewingSlipImage(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-auto rounded-2xl flex items-center justify-center bg-black/40 p-2">
                <img
                  src={viewingSlipImage}
                  alt="Full Salary Slip"
                  className="max-h-[75vh] w-auto rounded-xl object-contain shadow-lg"
                />
              </div>

              <div className="pt-3 mt-2 flex justify-end gap-2">
                <a
                  href={viewingSlipImage}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-500 transition-colors"
                >
                  <ExternalLink size={13} /> Open in New Tab
                </a>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {salarySlipDeleteConfirm && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSalarySlipDeleteConfirm(null)}
          >
            <div
              className="max-w-md w-full bg-[#0c1527] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
                <Trash2 size={22} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Delete Salary Slip?</h3>
                <p className="text-xs text-slate-400 mt-1">This will permanently delete this issued salary slip from the staff portal.</p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSalarySlipDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSalarySlip(salarySlipDeleteConfirm)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-red-600/30"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

