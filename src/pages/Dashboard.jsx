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
  Receipt, DollarSign, UploadCloud, Users, Check, Send, Home
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
  const [subSlug, setSubSlug] = useState('');
  const [subTagline, setSubTagline] = useState('');
  const [subDescription, setSubDescription] = useState('');
  const [editingService, setEditingService] = useState(null); // null = create mode, object = edit mode
  const [serviceDeleteConfirm, setServiceDeleteConfirm] = useState(null); // id of service pending delete

  // Parent Service Form State
  const [parentTitle, setParentTitle] = useState('');
  const [parentSlug, setParentSlug] = useState('');
  const [parentTagline, setParentTagline] = useState('');
  const [editingParent, setEditingParent] = useState(null); // null = create mode, object = edit mode
  const [parentDeleteConfirm, setParentDeleteConfirm] = useState(null); // id of parent pending delete

  const resetServiceForm = () => {
    setEditingService(null);
    setSubTitle('');
    setSubSlug('');
    setSubTagline('');
    setSubDescription('');
    if (parentServices.length > 0) {
      setSelectedParentId(parentServices[0].id.toString());
    }
  };

  const populateServiceForm = (service) => {
    setEditingService(service);
    setSubTitle(service.title || service.name || '');
    setSubSlug(service.slug || '');
    setSubTagline(service.tagline || '');
    setSubDescription(service.description || '');
    if (service.parent) {
      setSelectedParentId(service.parent.toString());
    }
    const el = document.getElementById('subservice-form-card');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubTitleChange = (val) => {
    setSubTitle(val);
    if (!editingService) {
      setSubSlug(
        val.toLowerCase().trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const resetParentForm = () => {
    setEditingParent(null);
    setParentTitle('');
    setParentSlug('');
    setParentTagline('');
  };

  const populateParentForm = (parent) => {
    setEditingParent(parent);
    setParentTitle(parent.title || parent.name || '');
    setParentSlug(parent.slug || '');
    setParentTagline(parent.tagline || parent.subtitle || '');
    const el = document.getElementById('parent-form-card');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleParentTitleChange = (val) => {
    setParentTitle(val);
    if (!editingParent) {
      setParentSlug(
        val.toLowerCase().trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

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

  // ── Home Page SEO & Settings State ──────────────────────────────────────────
  const [homeMetaTitle, setHomeMetaTitle]       = useState('');
  const [homeMetaDesc, setHomeMetaDesc]         = useState('');
  const [homeCanonicalUrl, setHomeCanonicalUrl] = useState('https://corx.ae/');
  const [homeHeroTitle, setHomeHeroTitle]       = useState('');
  const [homeHeroEyebrow, setHomeHeroEyebrow]   = useState('');
  const [homeHeroTagline, setHomeHeroTagline]   = useState('');
  const [homeOgImage, setHomeOgImage]           = useState('');
  const [homeSchema, setHomeSchema]             = useState('');
  const [homeFaqEyebrow, setHomeFaqEyebrow]     = useState('⊙ Common Questions');
  const [homeFaqTitle, setHomeFaqTitle]         = useState('Frequently Asked Questions');
  const [homeFaqDesc, setHomeFaqDesc]           = useState('Find answers to the most common questions about our home healthcare services in Dubai.');
  const [homeFaqs, setHomeFaqs]                 = useState([]);
  const [homeLoading, setHomeLoading]           = useState(false);
  const [homeSaving, setHomeSaving]             = useState(false);

  const defaultHomepageFaqs = [
    { q: "What services does Corx Home Healthcare offer?", a: "Corx Home Healthcare provides a wide range of services including physiotherapy, nursing care, medical equipment rental, wound care, and medication management, among others." },
    { q: "Who can benefit from Corx Home Healthcare Services?", a: "Our services cater to individuals of all ages who require healthcare assistance in the comfort of their own homes. This includes seniors, individuals recovering from surgery, those with chronic illnesses, and anyone in need of rehabilitation." },
    { q: "How can I request services from Corx Home Healthcare?", a: "You can request our services by contacting us via phone at +971547033311 or by filling out the contact form on our website. Our team will promptly assess your needs and schedule a visit." },
    { q: "Are your caregivers trained and certified?", a: "Yes, all our caregivers are highly trained, certified professionals with experience in their respective fields. We ensure that they undergo rigorous training and background checks to provide the highest quality care." },
    { q: "What are your service hours?", a: "Corx Home Healthcare operates 24 hours a day, 7 days a week, including holidays. We understand that healthcare needs can arise at any time, and our team is dedicated to being there for you whenever you need us." },
    { q: "How do I pay for Corx Home Healthcare services?", a: "We accept various payment methods including cash, credit/debit cards, and bank transfers. We also work with insurance providers for direct billing whenever possible. Our team will provide you with detailed payment options and assist you with any billing inquiries." }
  ];

  const loadHomepage = async () => {
    setHomeLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/homepage/`);
      if (res.ok) {
        const data = await res.json();
        setHomeMetaTitle(data.meta_title || '');
        setHomeMetaDesc(data.meta_description || '');
        setHomeCanonicalUrl(data.canonical_url || 'https://corx.ae/');
        setHomeHeroTitle(data.hero_title || '');
        setHomeHeroEyebrow(data.hero_eyebrow || '');
        setHomeHeroTagline(data.hero_tagline || '');
        setHomeOgImage(data.og_image || '');
        setHomeSchema(data.schema_markup || '');
        setHomeFaqEyebrow(data.faq_eyebrow || '⊙ Common Questions');
        setHomeFaqTitle(data.faq_title || 'Frequently Asked Questions');
        setHomeFaqDesc(data.faq_description || 'Find answers to the most common questions about our home healthcare services in Dubai.');
        setHomeFaqs(Array.isArray(data.faqs) && data.faqs.length > 0 ? data.faqs : defaultHomepageFaqs);
      }
    } catch (e) {
      console.error('Error loading homepage data:', e);
    } finally {
      setHomeLoading(false);
    }
  };

  useEffect(() => {
    loadHomepage();
  }, []);

  const handleAddHomeFaq = () => {
    setHomeFaqs([...homeFaqs, { q: '', a: '' }]);
  };

  const handleRemoveHomeFaq = (idx) => {
    setHomeFaqs(homeFaqs.filter((_, i) => i !== idx));
  };

  const handleUpdateHomeFaq = (idx, field, val) => {
    const updated = [...homeFaqs];
    updated[idx][field] = val;
    setHomeFaqs(updated);
  };

  const handleMoveHomeFaq = (idx, direction) => {
    const updated = [...homeFaqs];
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= updated.length) return;
    const temp = updated[idx];
    updated[idx] = updated[target];
    updated[target] = temp;
    setHomeFaqs(updated);
  };

  const handleSaveHomepage = async (e) => {
    e.preventDefault();
    setHomeSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/homepage/1/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meta_title: homeMetaTitle.trim(),
          meta_description: homeMetaDesc.trim(),
          canonical_url: homeCanonicalUrl.trim(),
          hero_title: homeHeroTitle.trim(),
          hero_eyebrow: homeHeroEyebrow.trim(),
          hero_tagline: homeHeroTagline.trim(),
          og_image: homeOgImage.trim(),
          schema_markup: homeSchema.trim(),
          faq_eyebrow: homeFaqEyebrow.trim(),
          faq_title: homeFaqTitle.trim(),
          faq_description: homeFaqDesc.trim(),
          faqs: homeFaqs.filter(f => f.q && f.q.trim() !== ''),
        }),
      });
      if (!res.ok) throw new Error('Failed to update homepage settings');
      showToast('success', 'Home Page Updated', 'Home page SEO, meta tags, hero banner, and FAQ section saved successfully!');
    } catch (err) {
      showToast('error', 'Update Failed', err.message || 'Error connecting to backend.');
    } finally {
      setHomeSaving(false);
    }
  };

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

  // Submit / Update Sub-Service
  const handleSaveService = async (e) => {
    e.preventDefault();

    if (!subTitle.trim()) {
      showToast('error', 'Validation Error', 'Please enter a sub-service title.');
      return;
    }

    if (!selectedParentId) {
      showToast('error', 'Validation Error', 'Please choose a parent category for this service.');
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

    if (subSlug.trim()) {
      payload.slug = subSlug.trim().toLowerCase();
    }

    try {
      let res;
      if (editingService) {
        res = await fetch(`${API_BASE_URL}/api/services/${editingService.id}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/services/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || JSON.stringify(errData) || 'Failed to save sub-service');
      }

      const saved = await res.json();
      const parentObj = parentServices.find(p => p.id.toString() === selectedParentId);
      const parentName = parentObj ? (parentObj.name || parentObj.title) : 'Parent Category';

      showToast('success', editingService ? 'Service Updated' : 'Service Created', `"${saved.title || subTitle}" saved under "${parentName}"!`);

      resetServiceForm();
      loadServices();

    } catch (err) {
      console.error('Error saving sub-service:', err);
      showToast('error', 'Save Failed', err.message || 'Error connecting to Django backend.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${serviceId}/`, {
        method: 'DELETE',
      });
      if (res.ok || res.status === 204) {
        showToast('success', 'Service Deleted', 'The sub-service was removed successfully.');
        setServicesData(prev => prev.filter(s => s.id !== serviceId));
        if (editingService && editingService.id === serviceId) {
          resetServiceForm();
        }
        loadServices();
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Could not delete service');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      showToast('error', 'Delete Failed', err.message || 'Error deleting service.');
    } finally {
      setServiceDeleteConfirm(null);
    }
  };

  // Submit / Update Top-Level Parent Service
  const handleSaveParentService = async (e) => {
    e.preventDefault();

    if (!parentTitle.trim()) {
      showToast('error', 'Validation Error', 'Please enter a parent category title.');
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

    if (parentSlug.trim()) {
      payload.slug = parentSlug.trim().toLowerCase();
    }

    try {
      let res;
      if (editingParent) {
        res = await fetch(`${API_BASE_URL}/api/services/${editingParent.id}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/api/services/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || JSON.stringify(errData) || 'Failed to save parent service');
      }

      const saved = await res.json();
      showToast('success', editingParent ? 'Parent Updated' : 'Parent Created', `"${saved.title || parentTitle}" saved successfully!`);

      resetParentForm();
      loadServices();

    } catch (err) {
      console.error('Error saving parent service:', err);
      showToast('error', 'Save Failed', err.message || 'Error connecting to Django backend.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteParentService = async (parentId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/services/${parentId}/`, {
        method: 'DELETE',
      });
      if (res.ok || res.status === 204) {
        showToast('success', 'Parent Removed', 'Parent category removed successfully.');
        setParentServices(prev => prev.filter(p => p.id !== parentId));
        if (editingParent && editingParent.id === parentId) {
          resetParentForm();
        }
        loadServices();
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Could not delete parent category');
      }
    } catch (err) {
      console.error('Error deleting parent category:', err);
      showToast('error', 'Delete Failed', err.message || 'Error deleting parent category.');
    } finally {
      setParentDeleteConfirm(null);
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

              {/* Content & HR */}
              <div className="pt-3 mt-1 border-t border-slate-800/80">
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-600 px-2 mb-2">Content & HR</p>
                
                <button
                  onClick={() => setActiveTab('homepage')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 mb-1.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                    activeTab === 'homepage'
                      ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/10 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home size={18} className={activeTab === 'homepage' ? 'text-blue-400' : ''} />
                    <span>Home Page</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                    SEO & Hero
                  </span>
                </button>

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
              { id: 'homepage', label: 'Home Page', icon: Home },
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
            <div className="space-y-8">

              {/* Delete Confirmation Modal */}
              <AnimatePresence>
                {serviceDeleteConfirm && (
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
                      <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat mb-2">Delete Sub-Service?</h3>
                      <p className="text-xs text-slate-400 mb-6 leading-relaxed">This action is permanent and cannot be undone. The sub-service will be removed from the database.</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDeleteService(serviceDeleteConfirm)}
                          className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer hover:opacity-90 transition-all"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setServiceDeleteConfirm(null)}
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
                
                {/* ── LEFT: CREATE / EDIT SUB-SERVICE FORM ───────────── */}
                <div id="subservice-form-card" className="lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl sticky top-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold border ${
                        editingService
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {editingService ? <Edit3 size={22} /> : <Plus size={22} />}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                          {editingService ? 'Edit Sub-Service' : 'New Sub-Service'}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {editingService ? `Editing: "${(editingService.title || editingService.name || '').slice(0, 26)}..."` : 'Add a nested service under a parent category'}
                        </p>
                      </div>
                    </div>
                    {editingService && (
                      <button
                        onClick={resetServiceForm}
                        className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                        title="Cancel editing"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4">
                    {/* Select Parent Service */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-2">
                        <Layers size={13} /><span>Parent Category</span><span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={selectedParentId}
                        onChange={(e) => setSelectedParentId(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white font-bold text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all cursor-pointer"
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

                    {/* Sub-Service Title */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-2">
                        <FileText size={13} /><span>Service Title</span><span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Night Care Nurse, Doctor on Call"
                        value={subTitle}
                        onChange={(e) => handleSubTitleChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                      />
                    </div>

                    {/* URL Slug */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <Hash size={13} /><span>URL Slug</span>
                      </label>
                      <input
                        type="text"
                        placeholder="auto-generated-from-title"
                        value={subSlug}
                        onChange={(e) => setSubSlug(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-slate-300 text-xs font-mono focus:outline-none focus:border-cyan-400 shadow-inner transition-all placeholder-slate-600"
                      />
                    </div>

                    {/* Tagline / Brief Description */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <AlignLeft size={13} /><span>Tagline / Brief Summary</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. 24/7 dedicated overnight clinical care at your doorstep in Dubai."
                        value={subTagline}
                        onChange={(e) => setSubTagline(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                      />
                    </div>

                    {/* Detailed Description */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <BookOpen size={13} /><span>Detailed Description</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Comprehensive clinical care details, procedures, and scope..."
                        value={subDescription}
                        onChange={(e) => setSubDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500 resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 transition-all ${
                        editingService
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
                          : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-cyan-500/20'
                      }`}
                    >
                      {editingService ? <Save size={16} /> : <Plus size={16} />}
                      {submitting ? 'Saving...' : editingService ? 'Update Sub-Service' : 'Create Sub-Service'}
                    </button>

                    {editingService && (
                      <button
                        type="button"
                        onClick={resetServiceForm}
                        className="w-full py-3 rounded-2xl bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-all"
                      >
                        Cancel — Create New Instead
                      </button>
                    )}
                  </form>
                </div>

                {/* ── RIGHT: SUB-SERVICES DIRECTORY ───────────────────── */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1b2742] flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                          <Layers size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                            Sub-Services Directory
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                              {filteredSubServices.length} Total
                            </span>
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">All configured sub-services from backend</p>
                        </div>
                      </div>

                      <button
                        onClick={loadServices}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all cursor-pointer"
                      >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        Refresh
                      </button>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-5">
                      <div className="sm:col-span-8 relative">
                        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search by title, parent, or description..."
                          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#1b2742] bg-[#060c19] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                        />
                      </div>
                      <div className="sm:col-span-4 relative">
                        <select
                          value={selectedParentFilter}
                          onChange={(e) => setSelectedParentFilter(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl border border-[#1b2742] bg-[#060c19] text-xs font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                        >
                          <option value="all">All Parents</option>
                          {parentServices.map(p => (
                            <option key={p.id} value={p.id.toString()}>{p.name || p.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Data Table */}
                    {loading ? (
                      <div className="py-16 text-center">
                        <RefreshCw size={28} className="animate-spin text-cyan-400 mx-auto mb-3" />
                        <p className="text-slate-400 text-xs font-bold">Loading sub-services...</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-[#1b2742]">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-[#0a1122] text-white text-xs font-extrabold border-b border-[#1b2742]">
                              <th className="py-3.5 px-4 font-montserrat">Service Title</th>
                              <th className="py-3.5 px-4 font-montserrat hidden sm:table-cell">Parent Category</th>
                              <th className="py-3.5 px-4 font-montserrat hidden md:table-cell">Slug</th>
                              <th className="py-3.5 px-4 text-center font-montserrat w-20">Edit</th>
                              <th className="py-3.5 px-4 text-center font-montserrat w-20">Delete</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1b2742] text-xs font-medium">
                            {filteredSubServices.map((sub) => {
                              const parentObj = parentServices.find(p => p.id === sub.parent);
                              const serviceUrl = sub.slug ? (sub.slug.startsWith('/') ? sub.slug : `/${sub.slug}`) : `/services/${sub.id}`;
                              return (
                                <tr key={sub.id} className="hover:bg-[#0f172a] transition-colors group">
                                  <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                      <span className="font-extrabold text-white text-sm group-hover:text-cyan-300 transition-colors">
                                        {sub.title || sub.name}
                                      </span>
                                      <a
                                        href={serviceUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-slate-500 hover:text-cyan-400 transition-colors"
                                        title="View live page"
                                      >
                                        <ExternalLink size={13} />
                                      </a>
                                    </div>
                                    {sub.tagline && (
                                      <div className="text-slate-400 text-[11px] mt-0.5 line-clamp-1">{sub.tagline}</div>
                                    )}
                                  </td>
                                  <td className="py-4 px-4 hidden sm:table-cell">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-bold">
                                      {parentObj ? (parentObj.name || parentObj.title) : 'Standalone'}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 hidden md:table-cell">
                                    <span className="font-mono text-slate-400 text-[11px]">
                                      {sub.slug ? `/${sub.slug}` : '—'}
                                    </span>
                                  </td>
                                  {/* Edit Button */}
                                  <td className="py-4 px-4 text-center">
                                    <button
                                      onClick={() => populateServiceForm(sub)}
                                      className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#00a2ff]/10 transition-colors cursor-pointer"
                                      title="Edit this sub-service"
                                    >
                                      <Edit3 size={17} className="text-[#00a2ff] stroke-[2.2] hover:scale-110 transition-transform" />
                                    </button>
                                  </td>
                                  {/* Delete Button */}
                                  <td className="py-4 px-4 text-center">
                                    <button
                                      onClick={() => setServiceDeleteConfirm(sub.id)}
                                      className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#ff3b3b]/10 transition-colors cursor-pointer"
                                      title="Delete this sub-service"
                                    >
                                      <Trash2 size={17} className="text-[#ff3b3b] stroke-[2.2] hover:scale-110 transition-transform" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {filteredSubServices.length === 0 && (
                          <div className="py-14 text-center">
                            <Layers size={32} className="text-slate-700 mx-auto mb-3" />
                            <p className="text-slate-500 font-bold text-xs">
                              {servicesData.length === 0
                                ? 'No sub-services found. Create your first service using the form on the left.'
                                : 'No results match your search or filter.'}
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
            <div className="space-y-8">

              {/* Delete Confirmation Modal */}
              <AnimatePresence>
                {parentDeleteConfirm && (
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
                      <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat mb-2">Delete Parent Category?</h3>
                      <p className="text-xs text-slate-400 mb-6 leading-relaxed">This action is permanent and cannot be undone. Any nested sub-services under this category may become orphaned.</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDeleteParentService(parentDeleteConfirm)}
                          className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer hover:opacity-90 transition-all"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setParentDeleteConfirm(null)}
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
                {/* ── LEFT: CREATE / EDIT PARENT SERVICE FORM ─────────── */}
                <div id="parent-form-card" className="lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl sticky top-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold border ${
                        editingParent
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {editingParent ? <Edit3 size={22} /> : <Plus size={22} />}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                          {editingParent ? 'Edit Parent Category' : 'New Parent Category'}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {editingParent ? `Editing: "${(editingParent.title || editingParent.name || '').slice(0, 26)}..."` : 'Add a top-level navbar service category'}
                        </p>
                      </div>
                    </div>
                    {editingParent && (
                      <button
                        onClick={resetParentForm}
                        className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                        title="Cancel editing"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveParentService} className="space-y-4">
                    {/* Category Title */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-2">
                        <FileText size={13} /><span>Category Title</span><span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Telehealth & Online Care"
                        value={parentTitle}
                        onChange={(e) => handleParentTitleChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                      />
                    </div>

                    {/* URL Slug */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <Hash size={13} /><span>URL Slug</span>
                      </label>
                      <input
                        type="text"
                        placeholder="auto-generated-from-title"
                        value={parentSlug}
                        onChange={(e) => setParentSlug(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-slate-300 text-xs font-mono focus:outline-none focus:border-cyan-400 shadow-inner transition-all placeholder-slate-600"
                      />
                    </div>

                    {/* Tagline / Brief Description */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <AlignLeft size={13} /><span>Tagline / Description</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. 24/7 Virtual doctor consultations in Dubai"
                        value={parentTagline}
                        onChange={(e) => setParentTagline(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 transition-all ${
                        editingParent
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
                          : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-cyan-500/20'
                      }`}
                    >
                      {editingParent ? <Save size={16} /> : <Plus size={16} />}
                      {submitting ? 'Saving...' : editingParent ? 'Update Parent Category' : 'Create Parent Category'}
                    </button>

                    {editingParent && (
                      <button
                        type="button"
                        onClick={resetParentForm}
                        className="w-full py-3 rounded-2xl bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-wider cursor-pointer hover:bg-slate-700 transition-all"
                      >
                        Cancel — Create New Instead
                      </button>
                    )}
                  </form>
                </div>

                {/* ── RIGHT: PARENT CATEGORIES DIRECTORY ─────────────── */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden text-white">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1b2742] flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                          <Layers size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                            Navbar Parent Categories
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                              {parentServices.length} Total
                            </span>
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">Top-level service groupings displayed on website navbar</p>
                        </div>
                      </div>

                      <button
                        onClick={loadServices}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
                      >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        Refresh
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-[#1b2742] bg-[#090e1a]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#0a1122] text-white text-xs font-extrabold border-b border-[#1b2742]">
                            <th className="py-3.5 px-4 font-montserrat">Category Title</th>
                            <th className="py-3.5 px-4 text-center font-montserrat">Sub-Services</th>
                            <th className="py-3.5 px-4 text-center font-montserrat w-20">Edit</th>
                            <th className="py-3.5 px-4 text-center font-montserrat w-20">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1b2742] text-xs font-medium">
                          {parentServices.map((p) => {
                            const subCount = servicesData.filter(s => s.parent === p.id).length;
                            const parentUrl = p.slug ? (p.slug.startsWith('/') ? p.slug : `/${p.slug}`) : null;
                            return (
                              <tr key={p.id} className="hover:bg-[#0f172a] transition-colors group">
                                <td className="py-4 px-4">
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-white text-sm group-hover:text-emerald-300 transition-colors">
                                      {p.title || p.name}
                                    </span>
                                    {parentUrl && (
                                      <a
                                        href={parentUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-slate-500 hover:text-emerald-400 transition-colors"
                                        title="View live page"
                                      >
                                        <ExternalLink size={13} />
                                      </a>
                                    )}
                                  </div>
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
                                {/* In-dashboard Edit Button */}
                                <td className="py-4 px-4 text-center">
                                  <button
                                    onClick={() => populateParentForm(p)}
                                    className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#00a2ff]/10 transition-colors cursor-pointer"
                                    title={`Edit ${p.title || p.name}`}
                                  >
                                    <Edit3 size={17} className="text-[#00a2ff] stroke-[2.2] hover:scale-110 transition-transform" />
                                  </button>
                                </td>
                                {/* In-dashboard Delete Button with Confirmation Modal */}
                                <td className="py-4 px-4 text-center">
                                  <button
                                    onClick={() => setParentDeleteConfirm(p.id)}
                                    className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-[#ff3b3b]/10 transition-colors cursor-pointer"
                                    title={`Delete ${p.title || p.name}`}
                                  >
                                    <Trash2 size={17} className="text-[#ff3b3b] stroke-[2.2] hover:scale-110 transition-transform" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {parentServices.length === 0 && (
                        <div className="py-14 text-center">
                          <Layers size={32} className="text-slate-700 mx-auto mb-3" />
                          <p className="text-slate-500 font-bold text-xs">
                            No parent categories found. Create your first parent category using the form on the left.
                          </p>
                        </div>
                      )}
                    </div>
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

          {/* TAB: HOME PAGE MANAGEMENT */}
          {activeTab === 'homepage' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* ── LEFT: FORM COLUMN (MATCHING BLOG POST FORM STYLE) ── */}
                <div className="lg:col-span-5 bg-[#0a1224]/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl sticky top-6">
                  {/* Form Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold border bg-blue-500/20 text-blue-400 border-blue-500/30">
                        <Home size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight font-montserrat">
                          Home Page Editor
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          Update SEO metadata, OpenGraph tags &amp; hero banner
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={loadHomepage}
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                      title="Reload from backend"
                    >
                      <RefreshCw size={16} className={homeLoading ? 'animate-spin' : ''} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveHomepage} className="space-y-4">
                    {/* Meta Title */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-2"><FileText size={13} /><span>Meta Title</span><span className="text-rose-400">*</span></span>
                        <span className="text-[10px] text-slate-500 font-mono">{homeMetaTitle.length}/60 chars</span>
                      </label>
                      <input
                        type="text"
                        value={homeMetaTitle}
                        onChange={(e) => setHomeMetaTitle(e.target.value)}
                        placeholder="CORX Healthcare: Home Health Care Services in Dubai *24/7"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 shadow-inner transition-all placeholder-slate-500"
                      />
                    </div>

                    {/* Canonical URL */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
                        <Link2 size={13} /><span>Canonical URL</span>
                      </label>
                      <input
                        type="text"
                        value={homeCanonicalUrl}
                        onChange={(e) => setHomeCanonicalUrl(e.target.value)}
                        placeholder="https://corx.ae/"
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-slate-300 text-xs font-mono focus:outline-none focus:border-blue-400 shadow-inner transition-all placeholder-slate-600"
                      />
                    </div>

                    {/* Meta Description */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-2"><AlignLeft size={13} /><span>Meta Description</span></span>
                        <span className="text-[10px] text-slate-500 font-mono">{homeMetaDesc.length}/160 chars</span>
                      </label>
                      <textarea
                        rows={3}
                        value={homeMetaDesc}
                        onChange={(e) => setHomeMetaDesc(e.target.value)}
                        placeholder="Get premium home health care services in Dubai with Corx Healthcare..."
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 shadow-inner transition-all placeholder-slate-500 resize-none leading-relaxed"
                      />
                    </div>

                    {/* JSON-LD Schema (Structured Data) in SEO Section */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-2"><Hash size={13} /><span>JSON-LD Schema Markup (Structured Data)</span></span>
                        <span className="text-[10px] text-slate-500 font-mono">SEO Rich Snippets</span>
                      </label>
                      <textarea
                        rows={3}
                        value={homeSchema}
                        onChange={(e) => setHomeSchema(e.target.value)}
                        placeholder="Leave blank to automatically use standard MedicalBusiness schema..."
                        className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-emerald-300 text-xs font-mono focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 shadow-inner transition-all placeholder-slate-600 resize-none"
                      />
                    </div>

                    {/* Hero Section Banner Content */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-3">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">Hero Banner Section</p>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                          <Tag size={13} className="text-cyan-400" /><span>Hero Eyebrow / Tag</span>
                        </label>
                        <input
                          type="text"
                          value={homeHeroEyebrow}
                          onChange={(e) => setHomeHeroEyebrow(e.target.value)}
                          placeholder="24/7 DHA-LICENSED CLINICAL CARE"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                          <FileText size={13} className="text-cyan-400" /><span>Hero Main Headline</span>
                        </label>
                        <input
                          type="text"
                          value={homeHeroTitle}
                          onChange={(e) => setHomeHeroTitle(e.target.value)}
                          placeholder="Home Healthcare Services in Dubai"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                          <AlignLeft size={13} className="text-cyan-400" /><span>Hero Description Tagline</span>
                        </label>
                        <textarea
                          rows={2}
                          value={homeHeroTagline}
                          onChange={(e) => setHomeHeroTagline(e.target.value)}
                          placeholder="DHA-licensed doctors, nurses, and physiotherapists at your home, hotel, or office in 30-45 minutes."
                          className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner transition-all placeholder-slate-500 resize-none leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Social OpenGraph Image */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-3">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">Social OpenGraph Media</p>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                          <ImageIcon size={13} className="text-blue-400" /><span>OpenGraph Image URL</span>
                        </label>
                        <input
                          type="text"
                          value={homeOgImage}
                          onChange={(e) => setHomeOgImage(e.target.value)}
                          placeholder="https://corx.ae/og-image.webp"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-blue-400 shadow-inner transition-all placeholder-slate-500"
                        />
                      </div>
                    </div>

                    {/* FAQ Section Builder */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                          <BookOpen size={12} />
                          <span>Frequently Asked Questions (FAQ Section)</span>
                        </p>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {homeFaqs.length} FAQs
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                          <Tag size={13} className="text-emerald-400" /><span>FAQ Eyebrow Tag</span>
                        </label>
                        <input
                          type="text"
                          value={homeFaqEyebrow}
                          onChange={(e) => setHomeFaqEyebrow(e.target.value)}
                          placeholder="⊙ Common Questions"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 shadow-inner transition-all placeholder-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                          <FileText size={13} className="text-emerald-400" /><span>FAQ Section Title</span>
                        </label>
                        <input
                          type="text"
                          value={homeFaqTitle}
                          onChange={(e) => setHomeFaqTitle(e.target.value)}
                          placeholder="Frequently Asked Questions"
                          className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 shadow-inner transition-all placeholder-slate-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-2">
                          <AlignLeft size={13} className="text-emerald-400" /><span>FAQ Subtitle / Description</span>
                        </label>
                        <textarea
                          rows={2}
                          value={homeFaqDesc}
                          onChange={(e) => setHomeFaqDesc(e.target.value)}
                          placeholder="Find answers to the most common questions about our home healthcare services in Dubai."
                          className="w-full px-4 py-3 rounded-2xl border border-slate-700/80 bg-[#060c19] text-white text-xs font-semibold focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 shadow-inner transition-all placeholder-slate-500 resize-none leading-relaxed"
                        />
                      </div>

                      {/* Interactive FAQ Items */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Questions & Answers ({homeFaqs.length})
                          </label>
                          <button
                            type="button"
                            onClick={handleAddHomeFaq}
                            className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold hover:bg-emerald-500/20 flex items-center gap-1 cursor-pointer transition-all"
                          >
                            <Plus size={12} />
                            <span>Add FAQ</span>
                          </button>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                          {homeFaqs.map((faq, idx) => (
                            <div key={idx} className="p-3.5 rounded-2xl bg-[#070d1a] border border-slate-700/80 space-y-2 relative group">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                  FAQ #{idx + 1}
                                </span>
                                <div className="flex items-center gap-1">
                                  {idx > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => handleMoveHomeFaq(idx, 'up')}
                                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                                      title="Move up"
                                    >
                                      <ArrowUp size={12} />
                                    </button>
                                  )}
                                  {idx < homeFaqs.length - 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleMoveHomeFaq(idx, 'down')}
                                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                                      title="Move down"
                                    >
                                      <ArrowDown size={12} />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveHomeFaq(idx)}
                                    className="p-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                                    title="Delete FAQ"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                              <input
                                type="text"
                                value={faq.q}
                                onChange={(e) => handleUpdateHomeFaq(idx, 'q', e.target.value)}
                                placeholder="Enter question..."
                                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-[#040813] text-white text-xs font-semibold focus:outline-none focus:border-emerald-400"
                              />
                              <textarea
                                rows={2}
                                value={faq.a}
                                onChange={(e) => handleUpdateHomeFaq(idx, 'a', e.target.value)}
                                placeholder="Enter answer..."
                                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-[#040813] text-slate-300 text-xs focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={homeSaving}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-cyan-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer hover:opacity-95 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Save size={16} />
                      {homeSaving ? 'Saving Changes...' : 'Save Home Page Changes'}
                    </button>
                  </form>
                </div>

                {/* ── RIGHT: SHOWCASE & LIVE PREVIEWS (MATCHING BLOG POST SHOWCASE) ── */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Top Showcase Container */}
                  <div className="bg-[#090e1a] border border-[#1b2742] p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1b2742] flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                          <Globe size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-white uppercase tracking-tight font-montserrat flex items-center gap-2">
                            Home Page Showcase
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
                              Live Route (/)
                            </span>
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">Real-time simulation of search engines and social sharing</p>
                        </div>
                      </div>
                      <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all"
                      >
                        <ExternalLink size={14} />
                        <span>Visit Live Site</span>
                      </a>
                    </div>

                    {/* Card 1: Google SERP Preview */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                          <Search size={12} className="text-blue-400" />
                          Google Search Result (SERP)
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Indexed
                        </span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl shadow-md text-slate-800 font-sans border border-slate-200">
                        <div className="text-[12px] text-[#202124] flex items-center gap-1.5 mb-1.5">
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-extrabold shadow-sm">
                            C
                          </div>
                          <span className="font-semibold text-slate-800">CORx Healthcare Dubai</span>
                          <span className="text-slate-400">›</span>
                          <span className="text-slate-500 text-[11px] truncate font-mono">{homeCanonicalUrl || 'https://corx.ae/'}</span>
                        </div>
                        <h4 className="text-[18px] font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                          {homeMetaTitle || 'CORX Healthcare: Home Health Care Services in Dubai *24/7'}
                        </h4>
                        <p className="text-[13px] text-[#4d5156] mt-1.5 leading-relaxed line-clamp-3">
                          {homeMetaDesc || 'Get premium home health care services in Dubai with Corx Healthcare. Book expert doctors and nurses for physiotherapy, IV therapy, lab tests & elder care, available 24/7.'}
                        </p>
                      </div>
                    </div>

                    {/* Card 1B: Structured Data (JSON-LD Schema) Validator Preview */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                          <Hash size={12} className="text-emerald-400" />
                          Structured Data (JSON-LD Schema in SEO)
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {homeSchema.trim() ? 'Custom Schema' : 'Default MedicalBusiness'}
                        </span>
                      </div>
                      <div className="rounded-2xl border border-slate-700/80 bg-[#060c19] p-4 text-xs font-mono">
                        <div className="flex items-center justify-between text-slate-400 text-[11px] mb-2 pb-2 border-b border-slate-800">
                          <span className="text-emerald-400">@type: MedicalBusiness</span>
                          <span className="text-slate-500">Google Rich Snippets Enabled</span>
                        </div>
                        <pre className="text-emerald-300/90 text-[11px] overflow-x-auto whitespace-pre-wrap max-h-32 leading-relaxed">
                          {homeSchema.trim()
                            ? homeSchema
                            : JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "MedicalBusiness",
                                "name": "CORx Healthcare",
                                "url": homeCanonicalUrl || "https://corx.ae/",
                                "telephone": "+97143320776",
                                "description": homeMetaDesc || "Get premium home health care services in Dubai with Corx Healthcare."
                              }, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {/* Card 2: Hero Banner Live Simulation */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                          <Layers size={12} className="text-cyan-400" />
                          Hero Section Live Preview
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                          Above The Fold
                        </span>
                      </div>
                      <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-br from-[#061e36] via-[#092c4c] to-[#041224] p-6 text-white shadow-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          {homeHeroEyebrow || '24/7 DHA-LICENSED CLINICAL CARE'}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 leading-tight">
                          {homeHeroTitle || 'Home Healthcare Services in Dubai'}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-xl mb-4 opacity-90">
                          {homeHeroTagline || 'DHA-licensed doctors, nurses, and physiotherapists at your home, hotel, or office in 30-45 minutes.'}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md">
                            Book Appointment
                          </span>
                          <span className="px-4 py-2 rounded-xl bg-white/10 text-slate-200 font-bold text-xs border border-white/20">
                            Call 24/7
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Social OpenGraph Sharing Preview */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                          <ImageIcon size={12} className="text-indigo-400" />
                          Social Sharing Card (WhatsApp / Facebook)
                        </span>
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                          og:image
                        </span>
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-slate-700/80 bg-[#070d1a] shadow-lg">
                        <div className="h-32 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                          {homeOgImage ? (
                            <img src={homeOgImage} alt="OG Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-500">
                              <ImageIcon size={28} />
                              <span className="text-[10px] mt-1 font-mono">No Image URL Set</span>
                            </div>
                          )}
                          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[9px]">
                            corx.ae
                          </div>
                        </div>
                        <div className="p-4 bg-[#091124]">
                          <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">corx.ae</div>
                          <div className="font-bold text-xs text-white truncate mt-0.5">
                            {homeMetaTitle || 'CORX Healthcare: Home Health Care Services in Dubai *24/7'}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal">
                            {homeMetaDesc || 'Get premium home health care services in Dubai with Corx Healthcare.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Frequently Asked Questions (FAQ) Live Accordion Preview */}
                    <div className="mt-6 pt-6 border-t border-[#1b2742]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                          <BookOpen size={12} className="text-emerald-400" />
                          FAQ Section Live Simulation
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {homeFaqs.length} Items Configured
                        </span>
                      </div>
                      <div className="rounded-2xl border border-slate-700/80 bg-[#070d1a] p-5 text-white">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                          {homeFaqEyebrow || '⊙ Common Questions'}
                        </div>
                        <h4 className="text-base font-extrabold text-white mb-1">
                          {homeFaqTitle || 'Frequently Asked Questions'}
                        </h4>
                        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                          {homeFaqDesc || 'Find answers to the most common questions about our home healthcare services in Dubai.'}
                        </p>
                        <div className="space-y-2">
                          {homeFaqs.slice(0, 3).map((faq, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-[#091124] border border-slate-800 text-xs">
                              <div className="flex items-center justify-between font-bold text-slate-200">
                                <span>{faq.q || `Question #${idx + 1}`}</span>
                                <span className="text-emerald-400 font-extrabold">+</span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                                {faq.a || 'Answer text will appear here...'}
                              </p>
                            </div>
                          ))}
                          {homeFaqs.length > 3 && (
                            <div className="text-center text-[10px] text-slate-500 pt-1 font-mono">
                              + {homeFaqs.length - 3} more questions on public site
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Django Admin Sync Box */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1527] to-[#0a1224] border border-blue-500/20 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <ShieldCheck size={16} className="text-blue-400" />
                        <span>Django Executive Admin Link</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Full-control permissions and field history can also be managed in the Django Admin.
                      </p>
                    </div>
                    <a
                      href="/admin/api/homepage/1/change/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-500/30 transition-all flex items-center gap-2"
                    >
                      <span>Open Django Admin</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>

                </div>
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

