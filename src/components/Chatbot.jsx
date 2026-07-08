import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, X, Send, Calendar, Phone, 
  Bot, User, Check, RefreshCw, Sparkles, Activity,
  Stethoscope, UserCheck, Settings
} from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromoBubble, setShowPromoBubble] = useState(false);
  const [agentType, setAgentType] = useState(null); // 'doctor' | 'nurse' | 'coordinator' | null
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Booking Flow State (for Coordinator or general bookings)
  const [bookingState, setBookingState] = useState({
    active: false,
    step: 0, // 0: service, 1: name, 2: phone, 3: date, 4: confirm
    data: {
      service: '',
      name: '',
      phone: '',
      date: ''
    }
  });

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, bookingState.step]);

  // Handle window resizing for responsive inline styling
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show promo bubble after 3 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPromoBubble(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Listen for the custom event to toggle opening state
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(prev => {
        const next = !prev;
        if (next) {
          setShowPromoBubble(false);
        }
        return next;
      });
    };
    window.addEventListener('toggle-chatbot', handleToggle);
    return () => window.removeEventListener('toggle-chatbot', handleToggle);
  }, []);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowPromoBubble(false);
    }
  };

  // Agent Configurations
  const AGENT_CFG = {
    doctor: {
      name: 'Dr. Aisha (DHA GP)',
      role: 'General Physician',
      avatar: '🩺',
      color: '#08709d',
      greeting: 'Hello! I am Dr. Aisha, your virtual general physician. How can I help you with your symptoms, medication guidance, or clinical consultation queries today?',
      placeholder: 'Describe your symptoms (e.g. fever, flu, pain)...'
    },
    nurse: {
      name: 'Nurse Clara (DHA)',
      role: 'Home Care Nurse',
      avatar: '💧',
      color: '#0ea5e9',
      greeting: 'Hi! I am Nurse Clara. How can I assist you with scheduling an IV drip, a blood/lab test, post-surgical care, wound dressing, or home nursing services?',
      placeholder: 'Ask about IV drips, blood tests, or nursing...'
    },
    coordinator: {
      name: 'Sarah (Coordinator)',
      role: 'Booking Coordinator',
      avatar: '📅',
      color: '#10b981',
      greeting: 'Hello! I am Sarah, your medical booking coordinator. I can check service pricing, find appointment slots, or help you book a service directly. What can I book for you today?',
      placeholder: 'Ask about prices, bookings, hours, address...'
    }
  };

  // Initialize conversation with selected agent
  const selectAgent = (type) => {
    setAgentType(type);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: Date.now(),
          sender: 'bot',
          text: AGENT_CFG[type].greeting,
          timestamp: new Date()
        }
      ]);
    }, 800);
  };

  const handleSwitchAgent = () => {
    setAgentType(null);
    setMessages([]);
    setBookingState({
      active: false,
      step: 0,
      data: { service: '', name: '', phone: '', date: '' }
    });
  };

  // Helper to add bot message with delay
  const addBotMessage = (text, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text,
          timestamp: new Date()
        }
      ]);
    }, delay);
  };

  // Keyword response matcher per agent
  const getAgentResponse = (text, type) => {
    const lower = text.toLowerCase();
    
    // Switch request detection
    if (lower.includes('switch') || lower.includes('change') || lower.includes('another agent')) {
      return "You can switch assistant types at any time by clicking the 'Change Agent' button at the top right of the header.";
    }

    // Contact info is generic
    if (lower.includes('phone') || lower.includes('whatsapp') || lower.includes('contact') || lower.includes('call') || lower.includes('number')) {
      return "You can reach our emergency coordinator 24/7 at +971 4 332 0776, or WhatsApp us directly at https://wa.me/97143320776 for instant bookings and immediate dispatch.";
    }

    if (type === 'doctor') {
      if (lower.includes('fever') || lower.includes('flu') || lower.includes('cough') || lower.includes('pain') || lower.includes('vomit') || lower.includes('sick')) {
        return "As a general physician, I recommend scheduling a GP Home Visit so we can evaluate your vitals, perform a diagnosis, and prepare a treatment plan. Our DHA-licensed home visit doctors can be at your location in Dubai within 30-45 minutes. Would you like me to connect you to our booking coordinator?";
      }
      if (lower.includes('prescription') || lower.includes('medicine') || lower.includes('certificate') || lower.includes('sick leave')) {
        return "Yes, our visiting doctors are fully licensed by the DHA and are authorized to prescribe necessary medicines and issue official sick leave certificates directly on site during your home consultation.";
      }
      if (lower.includes('iv') || lower.includes('drip') || lower.includes('vitamin') || lower.includes('lab') || lower.includes('blood')) {
        return "For home IV therapies, blood collections, or wound care procedures, my colleague Nurse Clara can assist you best. Would you like to switch to our nursing chat?";
      }
      return "I can help you evaluate symptoms, explain GP home consultation services, and guide you on clinical concerns. For direct bookings or prices, feel free to switch to our Booking Coordinator Sarah.";
    }

    if (type === 'nurse') {
      if (lower.includes('iv') || lower.includes('drip') || lower.includes('vitamin') || lower.includes('hydration') || lower.includes('nad')) {
        return "Our DHA-licensed nurses provide premium IV Drip Therapy at your home, office, or hotel. We offer Hydration, Vitamin C, NAD+, Detox, and Immunity Boost starting from 250 AED. Would you like to schedule an IV drip session?";
      }
      if (lower.includes('blood') || lower.includes('lab') || lower.includes('test') || lower.includes('pcr')) {
        return "We provide full home diagnostic services. A nurse will visit your location to collect blood or urine samples. Certified lab reports are delivered digitally via email/WhatsApp within 12-24 hours. Would you like to book a blood test?";
      }
      if (lower.includes('wound') || lower.includes('injection') || lower.includes('dressing') || lower.includes('suture')) {
        return "Our nurses are highly skilled in wound care, post-surgical dressing, injection administration, and regular home nursing. We can arrange visits as per your requirements.";
      }
      if (lower.includes('doctor') || lower.includes('symptom') || lower.includes('diagnose')) {
        return "For clinical diagnoses, medical evaluations, and prescriptions, Dr. Aisha can consult you directly. Would you like to switch to the doctor chat?";
      }
      return "I can assist you with IV drips, home nursing, and blood test bookings. For general pricing and administrative details, you can chat with our Coordinator Sarah.";
    }

    if (type === 'coordinator') {
      if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule') || lower.includes('reserve')) {
        startBooking();
        return "Let us get you booked! Please select the service you require:";
      }
      if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('rates')) {
        return "Our service charges are highly transparent: IV Drips start from 250 AED, Lab tests from 150 AED, and Doctor Home visits start from 299 AED. All services include DHA-certified clinical staff. We accept cash, cards, and provide invoice receipts for insurance claims.";
      }
      if (lower.includes('address') || lower.includes('location') || lower.includes('office') || lower.includes('where')) {
        return "Our head office is located at Office 303, Royal Class Building, DIP, Dubai, United Arab Emirates. However, our medical teams (doctors and nurses) are distributed throughout Dubai and travel directly to your location.";
      }
      if (lower.includes('time') || lower.includes('hours') || lower.includes('open') || lower.includes('sunday')) {
        return "Our home visit services (Doctors, Nurses, IV, Labs) are available 24/7, 365 days a year. Our admin office operates Monday to Saturday from 8:00 AM to 5:00 PM.";
      }
      return "I can assist you with scheduling bookings, prices, and locations. For symptom queries, you can switch to Dr. Aisha.";
    }

    return "Thank you. How can I assist you today? You can switch assistant types at any time using the button in the header.";
  };

  // Start the Booking Flow
  const startBooking = () => {
    setBookingState({
      active: true,
      step: 0,
      data: { service: '', name: '', phone: '', date: '' }
    });
  };

  const handleBookingServiceSelect = (serviceName) => {
    setBookingState(prev => ({
      ...prev,
      step: 1,
      data: { ...prev.data, service: serviceName }
    }));
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: `Selected: ${serviceName}`,
        timestamp: new Date()
      },
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Great choice. What is your Full Name?',
        timestamp: new Date()
      }
    ]);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');

    // Add user message to chat
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: userText,
        timestamp: new Date()
      }
    ]);

    // Handle interactive booking flow inputs
    if (bookingState.active) {
      if (bookingState.step === 1) {
        // Saving Name
        setBookingState(prev => ({
          ...prev,
          step: 2,
          data: { ...prev.data, name: userText }
        }));
        addBotMessage(`Thank you, ${userText}. What is your contact phone number?`);
      } 
      else if (bookingState.step === 2) {
        // Saving Phone
        setBookingState(prev => ({
          ...prev,
          step: 3,
          data: { ...prev.data, phone: userText }
        }));
        addBotMessage(`Perfect. What is your preferred date and time for the appointment? (e.g., Tomorrow at 10 AM)`);
      } 
      else if (bookingState.step === 3) {
        // Saving Date
        const updatedData = { ...bookingState.data, date: userText };
        setBookingState(prev => ({
          ...prev,
          step: 4,
          data: updatedData
        }));
        
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            {
              id: Date.now(),
              sender: 'bot',
              text: 'Please review and confirm your appointment details:',
              timestamp: new Date(),
              isConfirmation: true,
              confirmData: updatedData
            }
          ]);
        }, 800);
      }
    } else {
      // General Q&A Chatbot responding based on keywords
      const reply = getAgentResponse(userText, agentType);
      addBotMessage(reply);
    }
  };

  const confirmBooking = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setBookingState(prev => ({
        ...prev,
        step: 5 // Completed step
      }));
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `Booking Request Confirmed! 🎉\n\nWe have received your request for ${bookingState.data.service}. Our medical coordinator will call you back on ${bookingState.data.phone} within 15 minutes to finalize the schedule and dispatch the team. Thank you!`,
          timestamp: new Date()
        }
      ]);
    }, 1500);
  };

  const cancelBooking = () => {
    setBookingState({
      active: false,
      step: 0,
      data: { service: '', name: '', phone: '', date: '' }
    });
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'bot',
        text: 'No problem! The booking request has been cancelled. What else can I help you with?',
        timestamp: new Date()
      }
    ]);
  };

  // Inline CSS Styles
  const isMobile = windowWidth < 640;

  const styles = {
    promoBubble: {
      position: 'fixed',
      bottom: '24px',
      right: '90px',
      zIndex: 100,
      backgroundColor: '#08709d',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '16px 16px 2px 16px',
      boxShadow: '0 10px 25px rgba(8, 112, 157, 0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      fontWeight: '600',
      maxWidth: '220px',
      cursor: 'pointer',
      fontFamily: "'Poppins', sans-serif",
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    chatWindow: {
      position: 'fixed',
      bottom: isMobile ? '88px' : '96px',
      right: isMobile ? '20px' : '32px',
      zIndex: 1000,
      width: isMobile ? 'calc(100vw - 40px)' : '380px',
      height: isMobile ? '70vh' : '520px',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(12px)',
      borderRadius: '24px',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Poppins', 'Montserrat', sans-serif",
    },
    header: {
      background: agentType 
        ? `linear-gradient(135deg, ${AGENT_CFG[agentType].color} 0%, #0d92cc 100%)`
        : 'linear-gradient(135deg, #08709d 0%, #0d92cc 100%)',
      padding: '16px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 10px rgba(8, 112, 157, 0.12)',
      transition: 'background 0.3s ease',
    },
    avatarContainer: {
      position: 'relative',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      fontSize: '20px',
    },
    onlineDot: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#4ade80',
      border: '2px solid #08709d',
    },
    headerTitle: {
      fontSize: '14px',
      fontWeight: '700',
      margin: '0 0 2px 0',
      color: 'white',
      lineHeight: '1.2',
    },
    headerSub: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.85)',
      fontWeight: '500',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    switchBtn: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: 'none',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '10px',
      fontWeight: '700',
      fontFamily: "'Poppins', sans-serif",
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'background-color 0.2s',
    },
    closeBtn: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: 'none',
      color: 'white',
      padding: '6px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s',
      outline: 'none',
    },
    messageArea: {
      flexGrow: 1,
      overflowY: 'auto',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      backgroundColor: '#f8f9fa',
    },
    messageRow: (isBot) => ({
      display: 'flex',
      justifyContent: isBot ? 'flex-start' : 'flex-end',
      width: '100%',
    }),
    messageContentWrap: (isBot) => ({
      display: 'flex',
      alignItems: 'start',
      gap: '10px',
      maxWidth: '85%',
      flexDirection: isBot ? 'row' : 'row-reverse',
    }),
    avatarSmall: (isBot) => ({
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      backgroundColor: isBot ? 'white' : '#e2e8f0',
      border: isBot ? '1px solid rgba(8, 112, 157, 0.15)' : '1px solid #cbd5e1',
      color: isBot ? '#08709d' : '#4a5568',
      flexShrink: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }),
    messageBubble: (isBot) => ({
      backgroundColor: isBot ? 'white' : (agentType ? AGENT_CFG[agentType].color : '#08709d'),
      color: isBot ? '#2d3748' : 'white',
      borderRadius: isBot ? '18px 18px 18px 2px' : '18px 18px 2px 18px',
      padding: '12px 16px',
      fontSize: '12.5px',
      lineHeight: '1.5',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
      border: isBot ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
      whiteSpace: 'pre-line',
      fontFamily: "'Poppins', sans-serif",
      transition: 'background-color 0.3s ease',
    }),
    messageTime: {
      fontSize: '9px',
      color: '#a0aec0',
      marginTop: '4px',
      alignSelf: 'flex-start',
    },
    quickRepliesContainer: {
      padding: '12px',
      backgroundColor: 'white',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      maxHeight: '110px',
      overflowY: 'auto',
    },
    quickReplyBtn: (btnId) => {
      const isHovered = hoveredBtn === btnId;
      const brandColor = agentType ? AGENT_CFG[agentType].color : '#08709d';
      return {
        fontSize: '11px',
        fontWeight: '600',
        color: isHovered ? 'white' : brandColor,
        backgroundColor: isHovered ? brandColor : 'rgba(8, 112, 157, 0.05)',
        border: `1px solid ${isHovered ? brandColor : 'rgba(8, 112, 157, 0.15)'}`,
        padding: '7px 12px',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        outline: 'none',
        fontFamily: "'Poppins', sans-serif",
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      };
    },
    serviceBtn: (serviceName) => {
      const isHovered = hoveredBtn === serviceName;
      const brandColor = agentType ? AGENT_CFG[agentType].color : '#08709d';
      return {
        width: '100%',
        textAlign: 'left',
        padding: '10px 14px',
        backgroundColor: isHovered ? brandColor : 'white',
        color: isHovered ? 'white' : brandColor,
        border: '1px solid rgba(8, 112, 157, 0.15)',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginBottom: '6px',
        outline: 'none',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
      };
    },
    cancelBtnSmall: {
      width: '100%',
      padding: '8px',
      backgroundColor: '#f1f3f5',
      color: '#666',
      border: 'none',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: '600',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s',
      fontFamily: "'Poppins', sans-serif",
    },
    inputForm: {
      padding: '12px',
      backgroundColor: 'white',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    inputField: {
      flexGrow: 1,
      padding: '10px 16px',
      backgroundColor: '#f1f3f5',
      border: '1px solid transparent',
      borderRadius: '16px',
      fontSize: '12px',
      outline: 'none',
      transition: 'all 0.2s',
      color: '#2d3748',
      fontFamily: "'Poppins', sans-serif",
    },
    sendBtn: {
      backgroundColor: agentType ? AGENT_CFG[agentType].color : '#08709d',
      border: 'none',
      color: 'white',
      padding: '10px',
      borderRadius: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
      boxShadow: '0 4px 10px rgba(8, 112, 157, 0.2)',
      outline: 'none',
      width: '36px',
      height: '36px',
      flexShrink: 0,
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '10px 14px',
      backgroundColor: 'white',
      border: '1px solid rgba(0, 0, 0, 0.04)',
      borderRadius: '18px 18px 18px 2px',
      width: 'fit-content',
    },
    typingDot: {
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      backgroundColor: '#a0aec0',
    },
    // Selector Welcome Screen Styles
    welcomeContainer: {
      flexGrow: 1,
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      overflowY: 'auto',
    },
    agentCard: (type) => {
      const isHovered = hoveredBtn === type;
      return {
        width: '100%',
        backgroundColor: 'white',
        border: `1.5px solid ${isHovered ? '#08709d' : 'rgba(0,0,0,0.06)'}`,
        borderRadius: '16px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 8px 20px rgba(8,112,157,0.1)' : '0 2px 4px rgba(0,0,0,0.02)',
        marginBottom: '12px',
        textAlign: 'left',
        outline: 'none',
        fontFamily: "'Poppins', sans-serif",
      };
    },
    agentCardIcon: (bg) => ({
      width: '42px',
      height: '42px',
      borderRadius: '12px',
      backgroundColor: `${bg}10`, // 10% opacity
      color: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      flexShrink: 0,
    })
  };

  return (
    <>
      {/* Pop-up Invitation Bubble */}
      <AnimatePresence>
        {showPromoBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            onClick={handleOpenToggle}
            style={styles.promoBubble}
            className="animate-bounce"
          >
            <span>💬 Chat with a Doctor or Nurse!</span>
            <button 
              style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '0 2px', marginLeft: '4px', outline: 'none' }} 
              onClick={(e) => {
                e.stopPropagation();
                setShowPromoBubble(false);
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.85 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={styles.chatWindow}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={styles.avatarContainer}>
                  {agentType ? AGENT_CFG[agentType].avatar : <Bot size={20} className="text-white" />}
                  {agentType && <span style={styles.onlineDot}></span>}
                </div>
                <div>
                  <h3 style={styles.headerTitle} className="flex items-center gap-1">
                    {agentType ? AGENT_CFG[agentType].name : 'CORX Care Hub'}
                    {agentType && <Sparkles size={13} style={{ color: '#fef08a' }} className="animate-pulse" />}
                  </h3>
                  <p style={styles.headerSub}>
                    <Activity size={10} style={{ color: '#86efac' }} /> 
                    {agentType ? AGENT_CFG[agentType].role : 'Virtual Health Assistant'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {agentType && (
                  <button 
                    onClick={handleSwitchAgent}
                    style={styles.switchBtn}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.25)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                  >
                    <Settings size={11} /> Change Agent
                  </button>
                )}
                <button 
                  onClick={handleOpenToggle}
                  style={styles.closeBtn}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {agentType === null ? (
              /* Agent Selector screen */
              <div style={styles.welcomeContainer}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(8, 112, 157, 0.08)',
                    color: '#08709d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    boxShadow: '0 4px 10px rgba(8, 112, 157, 0.05)',
                  }}>
                    <Bot size={28} />
                  </div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1a294a', margin: '0 0 6px' }}>CORX Health Chat</h2>
                  <p style={{ fontSize: '11.5px', color: '#718096', margin: 0, padding: '0 10px' }}>
                    Select an assistant type to start your consulting session:
                  </p>
                </div>

                {/* Agent Options */}
                <button 
                  onClick={() => selectAgent('doctor')}
                  style={styles.agentCard('doctor')}
                  onMouseEnter={() => setHoveredBtn('doctor')}
                  onMouseLeave={() => setHoveredBtn(null)}
                >
                  <div style={styles.agentCardIcon('#08709d')}>
                    <Stethoscope size={22} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: '#1a294a' }}>DHA Doctor (Virtual)</h4>
                    <p style={{ margin: 0, fontSize: '10px', color: '#718096', lineHeight: '1.4' }}>Clinical consultation, evaluate symptoms, prescriptions & sick leave.</p>
                  </div>
                </button>

                <button 
                  onClick={() => selectAgent('nurse')}
                  style={styles.agentCard('nurse')}
                  onMouseEnter={() => setHoveredBtn('nurse')}
                  onMouseLeave={() => setHoveredBtn(null)}
                >
                  <div style={styles.agentCardIcon('#0ea5e9')}>
                    <Activity size={20} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: '#1a294a' }}>DHA Nurse (Virtual)</h4>
                    <p style={{ margin: 0, fontSize: '10px', color: '#718096', lineHeight: '1.4' }}>IV therapies, blood test collections, dressing, injections, home nursing.</p>
                  </div>
                </button>

                <button 
                  onClick={() => selectAgent('coordinator')}
                  style={styles.agentCard('coordinator')}
                  onMouseEnter={() => setHoveredBtn('coordinator')}
                  onMouseLeave={() => setHoveredBtn(null)}
                >
                  <div style={styles.agentCardIcon('#10b981')}>
                    <UserCheck size={20} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: '#1a294a' }}>Booking Coordinator</h4>
                    <p style={{ margin: 0, fontSize: '10px', color: '#718096', lineHeight: '1.4' }}>Direct bookings, check pricing, schedule slots, emergency hotlines.</p>
                  </div>
                </button>

                <div style={{ marginTop: '16px', fontSize: '9.5px', color: '#a0aec0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={10} /> Emergency Coordinator 24/7: +971 4 332 0776
                </div>
              </div>
            ) : (
              /* Active Chat Area with chosen agent */
              <>
                <div style={styles.messageArea}>
                  {messages.map((msg) => {
                    const isBot = msg.sender === 'bot';
                    return (
                      <div key={msg.id} style={styles.messageRow(isBot)}>
                        <div style={styles.messageContentWrap(isBot)}>
                          <div style={styles.avatarSmall(isBot)}>
                            {isBot ? AGENT_CFG[agentType].avatar : <User size={13} />}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={styles.messageBubble(isBot)}>
                              <span>{msg.text}</span>

                              {/* Render booking confirmation card in bubble */}
                              {msg.isConfirmation && (
                                <div style={{
                                  marginTop: '12px',
                                  padding: '12px',
                                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                  borderRadius: '12px',
                                  border: '1px solid rgba(255, 255, 255, 0.25)',
                                  color: 'white',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '6px'
                                }}>
                                  <p style={{ margin: 0, fontSize: '11px' }}><strong>Service:</strong> {msg.confirmData.service}</p>
                                  <p style={{ margin: 0, fontSize: '11px' }}><strong>Patient:</strong> {msg.confirmData.name}</p>
                                  <p style={{ margin: 0, fontSize: '11px' }}><strong>Phone:</strong> {msg.confirmData.phone}</p>
                                  <p style={{ margin: 0, fontSize: '11px' }}><strong>Time:</strong> {msg.confirmData.date}</p>
                                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <button 
                                      onClick={confirmBooking}
                                      style={{
                                        flexGrow: 1,
                                        padding: '8px 12px',
                                        backgroundColor: '#22c55e',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: '700',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)'
                                      }}
                                    >
                                      Confirm Request
                                    </button>
                                    <button 
                                      onClick={cancelBooking}
                                      style={{
                                        padding: '8px 12px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        fontSize: '11px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            <span style={styles.messageTime}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Booking Step 0 Service Selection */}
                  {bookingState.active && bookingState.step === 0 && (
                    <div style={{ marginLeft: '38px', maxWidth: '85%', display: 'flex', flexDirection: 'column' }}>
                      {['Doctor Visit at Home', 'IV Therapy Session', 'Blood / Lab Test', 'Nursing Care'].map(service => (
                        <button
                          key={service}
                          onClick={() => handleBookingServiceSelect(service)}
                          style={styles.serviceBtn(service)}
                          onMouseEnter={() => setHoveredBtn(service)}
                          onMouseLeave={() => setHoveredBtn(null)}
                        >
                          {service}
                        </button>
                      ))}
                      <button 
                        onClick={cancelBooking}
                        style={styles.cancelBtnSmall}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}

                  {/* Bot typing state indicator */}
                  {isTyping && (
                    <div style={styles.messageRow(true)}>
                      <div style={styles.messageContentWrap(true)}>
                        <div style={styles.avatarSmall(true)}>
                          {AGENT_CFG[agentType].avatar}
                        </div>
                        <div style={styles.typingIndicator}>
                          <span style={styles.typingDot} className="animate-bounce"></span>
                          <span style={{ ...styles.typingDot, animationDelay: '150ms' }} className="animate-bounce"></span>
                          <span style={{ ...styles.typingDot, animationDelay: '300ms' }} className="animate-bounce"></span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Quick replies & booking actions */}
                {!bookingState.active && messages.length < 12 && (
                  <div style={styles.quickRepliesContainer}>
                    {agentType === 'coordinator' && (
                      <button 
                        onClick={startBooking}
                        style={styles.quickReplyBtn('book')}
                        onMouseEnter={() => setHoveredBtn('book')}
                        onMouseLeave={() => setHoveredBtn(null)}
                      >
                        📅 Book Appointment
                      </button>
                    )}
                    {agentType === 'doctor' && (
                      <>
                        <button 
                          onClick={() => {
                            setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: 'Doctor visit pricing?', timestamp: new Date() }]);
                            addBotMessage("Our DHA Doctor Home visits start from 299 AED, which includes full clinical consultation and prescription/sick leave certification. Shall I connect you to bookings?");
                          }}
                          style={styles.quickReplyBtn('doc_price')}
                          onMouseEnter={() => setHoveredBtn('doc_price')}
                          onMouseLeave={() => setHoveredBtn(null)}
                        >
                          💰 Check GP Prices
                        </button>
                        <button 
                          onClick={() => {
                            setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: 'Can you issue sick leave?', timestamp: new Date() }]);
                            addBotMessage(getAgentResponse('sick leave', 'doctor'));
                          }}
                          style={styles.quickReplyBtn('sick_leave')}
                          onMouseEnter={() => setHoveredBtn('sick_leave')}
                          onMouseLeave={() => setHoveredBtn(null)}
                        >
                          📜 Sick Leave Info
                        </button>
                      </>
                    )}
                    {agentType === 'nurse' && (
                      <>
                        <button 
                          onClick={() => {
                            setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: 'IV drip options?', timestamp: new Date() }]);
                            addBotMessage(getAgentResponse('iv', 'nurse'));
                          }}
                          style={styles.quickReplyBtn('iv_opts')}
                          onMouseEnter={() => setHoveredBtn('iv_opts')}
                          onMouseLeave={() => setHoveredBtn(null)}
                        >
                          💧 Home IV Options
                        </button>
                        <button 
                          onClick={() => {
                            setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: 'Blood tests at home?', timestamp: new Date() }]);
                            addBotMessage(getAgentResponse('blood', 'nurse'));
                          }}
                          style={styles.quickReplyBtn('blood_test')}
                          onMouseEnter={() => setHoveredBtn('blood_test')}
                          onMouseLeave={() => setHoveredBtn(null)}
                        >
                          🩸 Lab Tests info
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => {
                        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: 'Phone/WhatsApp support details', timestamp: new Date() }]);
                        addBotMessage(getAgentResponse('whatsapp', agentType));
                      }}
                      style={styles.quickReplyBtn('whatsapp')}
                      onMouseEnter={() => setHoveredBtn('whatsapp')}
                      onMouseLeave={() => setHoveredBtn(null)}
                    >
                      📞 Phone & WhatsApp
                    </button>
                  </div>
                )}

                {/* Input Form */}
                <form 
                  onSubmit={handleTextSubmit}
                  style={styles.inputForm}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      bookingState.active 
                        ? bookingState.step === 1 
                          ? "Enter your full name..." 
                          : bookingState.step === 2 
                            ? "Enter your phone number..." 
                            : bookingState.step === 3 
                              ? "Enter preferred date..." 
                              : "Please confirm details above..."
                        : AGENT_CFG[agentType].placeholder
                    }
                    disabled={bookingState.active && bookingState.step >= 4}
                    style={styles.inputField}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.borderColor = 'rgba(8, 112, 157, 0.25)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 112, 157, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = '#f1f3f5';
                      e.target.style.borderColor = 'transparent';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || (bookingState.active && bookingState.step >= 4)}
                    style={{
                      ...styles.sendBtn,
                      ...( (!inputText.trim() || (bookingState.active && bookingState.step >= 4)) 
                        ? { backgroundColor: '#e2e8f0', color: '#a0aec0', boxShadow: 'none', cursor: 'default' } 
                        : {} )
                    }}
                  >
                    <Send size={15} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
