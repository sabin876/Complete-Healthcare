import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Shield, Activity, Clock, Phone, Heart, ClipboardList } from 'lucide-react';

const locationsData = [
  {
    id: 'palm',
    name: 'Palm Jumeirah',
    x: 185,
    y: 210,
    services: {
      all: ['Premium Home Care', 'IV Therapy', '24/7 Nursing'],
      doctor: ['Hotel Suite Doctor', 'VIP Consultation'],
      nursing: ['24/7 Private Nurse', 'IV Vitamin Therapy', 'Post-Op Care'],
      physio: ['Sports Injury Rehab', 'Joint Mobilization']
    },
    times: {
      all: 'Under 30 Mins Response',
      doctor: '25 Mins Response',
      nursing: '30 Mins Response',
      physio: 'Scheduled / Within 1hr'
    },
    availability: {
      all: 'All Services Active',
      doctor: '4 Doctors Stationed',
      nursing: '6 Nurses on Shift',
      physio: '3 Physios Available'
    }
  },
  {
    id: 'marina',
    name: 'Dubai Marina & JBR',
    x: 110,
    y: 280,
    services: {
      all: ['Doctor at Hotel/Home', 'Physiotherapy', 'Nursing Care'],
      doctor: ['24/7 Urgent Doctor', 'Hotel Call-Outs'],
      nursing: ['Elderly Nursing', 'Palliative Support', 'Wound Dressing'],
      physio: ['Stroke Recovery', 'Orthopedic Therapy']
    },
    times: {
      all: '25 Mins Response',
      doctor: '20 Mins Response',
      nursing: '25 Mins Response',
      physio: 'Within 45 Mins'
    },
    availability: {
      all: 'Full Crew Available',
      doctor: '5 Doctors Stationed',
      nursing: '4 Nurses on Shift',
      physio: '2 Physios Available'
    }
  },
  {
    id: 'jumeirah',
    name: 'Jumeirah & Al Wasl',
    x: 270,
    y: 160,
    services: {
      all: ['24/7 Doctor on Call', 'Child Nursing', 'Lab Tests'],
      doctor: ['Family Doctor Visit', 'Pediatric Consults'],
      nursing: ['Newborn Care Nurse', 'IV Antibiotics Injection'],
      physio: ['Geriatric Physiotherapy', 'Back Pain Treatment']
    },
    times: {
      all: '20 Mins Response',
      doctor: '15 Mins Response',
      nursing: '20 Mins Response',
      physio: 'Within 30 Mins'
    },
    availability: {
      all: 'Maximum Coverage',
      doctor: '6 Doctors Stationed',
      nursing: '5 Nurses on Shift',
      physio: '4 Physios Available'
    }
  },
  {
    id: 'downtown',
    name: 'Downtown Dubai',
    x: 340,
    y: 135,
    services: {
      all: ['Doctor at Hotel & Suites', 'IV Drips', 'Elderly Care'],
      doctor: ['24/7 Hotel Specialist', 'Urgent Diagnostics'],
      nursing: ['Post-Surgical Nursing', 'Wound Management'],
      physio: ['Posture Correction', 'Neurological Rehab']
    },
    times: {
      all: '15 Mins Response',
      doctor: '15 Mins Response',
      nursing: '20 Mins Response',
      physio: 'Within 30 Mins'
    },
    availability: {
      all: '8 Active Teams',
      doctor: '8 Doctors Stationed',
      nursing: '7 Nurses on Shift',
      physio: '3 Physios Available'
    }
  },
  {
    id: 'deira',
    name: 'Deira & Bur Dubai',
    x: 430,
    y: 75,
    services: {
      all: ['Doctor on Call', 'Wound Management', 'Physiotherapy'],
      doctor: ['Home Physician Visit', 'Flu & Pain Relief'],
      nursing: ['Diabetic Care Nurse', 'Catheter Care'],
      physio: ['Chest Physiotherapy', 'Pain Management']
    },
    times: {
      all: '35 Mins Response',
      doctor: '30 Mins Response',
      nursing: '35 Mins Response',
      physio: 'Scheduled / Within 1hr'
    },
    availability: {
      all: 'Standard Coverage',
      doctor: '4 Doctors Stationed',
      nursing: '5 Nurses on Shift',
      physio: '2 Physios Available'
    }
  },
  {
    id: 'jvc',
    name: 'JVC & Marina Hills',
    x: 140,
    y: 340,
    services: {
      all: ['Home Nursing', 'Pediatric Care', 'Physiotherapy'],
      doctor: ['24/7 On-Call Doctor', 'Paediatric Doctor'],
      nursing: ['Baby Nurse at Home', 'Medication Management'],
      physio: ['Cardiorespiratory Therapy', 'Joint Pain Rehab']
    },
    times: {
      all: '30 Mins Response',
      doctor: '30 Mins Response',
      nursing: '30 Mins Response',
      physio: 'Within 1 Hour'
    },
    availability: {
      all: 'Active Teams',
      doctor: '3 Doctors Stationed',
      nursing: '4 Nurses on Shift',
      physio: '2 Physios Available'
    }
  },
  {
    id: 'mirdif',
    name: 'Mirdif & Al Khawaneej',
    x: 440,
    y: 180,
    services: {
      all: ['Family Care', 'Post-Natal Support', 'Doctor Visit'],
      doctor: ['General Doctor Consultation', 'Lab Sample Collection'],
      nursing: ['Post-Natal Nurse', 'Wound & Tube Care'],
      physio: ['Pediatric Physiotherapy', 'Sports Massage']
    },
    times: {
      all: '30 Mins Response',
      doctor: '25 Mins Response',
      nursing: '30 Mins Response',
      physio: 'Within 1 Hour'
    },
    availability: {
      all: 'Active Coverage',
      doctor: '3 Doctors Stationed',
      nursing: '5 Nurses on Shift',
      physio: '3 Physios Available'
    }
  }
];

const serviceTypes = [
  { id: 'all', name: 'All Services', color: '#2ebd6e', glowColor: 'rgba(46, 189, 110, 0.4)' },
  { id: 'doctor', name: 'Doctor on Call', color: '#00bcff', glowColor: 'rgba(0, 188, 255, 0.5)' },
  { id: 'nursing', name: 'Home Nursing', color: '#10b981', glowColor: 'rgba(16, 185, 129, 0.5)' },
  { id: 'physio', name: 'Physiotherapy', color: '#f5a623', glowColor: 'rgba(245, 166, 35, 0.5)' }
];

export default function DubaiMap({ currentSlide = 0 }) {
  const [activeService, setActiveService] = useState('all');
  const [hoveredLoc, setHoveredLoc] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState(locationsData[3]); // default to Downtown

  // Sync active map filter with current slide in Home Hero
  useEffect(() => {
    if (currentSlide === 0) {
      setActiveService('all');
    } else if (currentSlide === 1) {
      setActiveService('nursing');
    } else if (currentSlide === 2) {
      setActiveService('doctor');
    }
  }, [currentSlide]);

  const activeTheme = serviceTypes.find(t => t.id === activeService) || serviceTypes[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative w-full max-w-[510px] aspect-[510/480] bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)',
      }}
    >
      {/* Background Glowing Orb matching the active service color */}
      <div 
        className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: `${activeTheme.color}15` }}
      ></div>
      <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-[#004e92]/10 blur-3xl pointer-events-none"></div>

      {/* Header Info */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border transition-all duration-300"
            style={{
              color: activeTheme.color,
              borderColor: `${activeTheme.color}30`,
              backgroundColor: `${activeTheme.color}10`
            }}
          >
            {activeTheme.name} Coverage
          </span>
          <h3 className="text-base font-semibold text-white mt-1">Dubai Healthcare Network</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/70 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 self-start sm:self-center">
          <Clock size={12} style={{ color: activeTheme.color }} />
          <span>Instant Dispatch</span>
        </div>
      </div>

      {/* Interactive Tabs for Healthcare Type */}
      <div className="relative z-10 flex flex-wrap gap-1 bg-black/30 p-1 rounded-lg border border-white/5 mb-3">
        {serviceTypes.map((type) => {
          const isActive = activeService === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setActiveService(type.id)}
              className="flex-1 py-1.5 px-2 text-[10.5px] font-semibold rounded-md transition-all duration-300 cursor-pointer text-center"
              style={{
                backgroundColor: isActive ? type.color : 'transparent',
                color: isActive ? '#000' : 'rgba(255,255,255,0.7)',
                textShadow: isActive ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {type.name}
            </button>
          );
        })}
      </div>

      {/* SVG Map Container */}
      <div className="relative flex-1 w-full min-h-[220px] cursor-crosshair">
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid lines to make it look technical/blueprint */}
          <defs>
            <pattern id="map-grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid-2)" />

          {/* Ocean stylized paths / Coast waves */}
          <path
            d="M 20,220 C 60,200 120,180 180,140 C 230,100 320,80 480,20"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="2"
            strokeDasharray="4 8"
          />

          {/* Dubai Coastline Main Path */}
          <motion.path
            d="M 50,300 C 150,270 240,210 450,90"
            stroke={activeTheme.color}
            strokeWidth="3.5"
            strokeOpacity="0.45"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Palm Jumeirah Vector Detail */}
          <g transform="translate(180, 205) scale(0.6)">
            <path d="M 10 40 L 10 10" stroke={activeTheme.color} strokeWidth="3" strokeOpacity="0.6" strokeLinecap="round" />
            <path d="M 10 30 Q -15 20 -25 35 M 10 30 Q 35 20 45 35" stroke={activeTheme.color} strokeWidth="2" strokeOpacity="0.5" fill="none" />
            <path d="M 10 20 Q -20 5 -30 20 M 10 20 Q 40 5 50 20" stroke={activeTheme.color} strokeWidth="2" strokeOpacity="0.5" fill="none" />
            <path d="M 10 10 Q -15 -10 -20 5 M 10 10 Q 35 -10 40 5" stroke={activeTheme.color} strokeWidth="2" strokeOpacity="0.5" fill="none" />
            <path d="M -35 25 A 38 38 0 0 1 55 25" stroke={activeTheme.color} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" fill="none" />
          </g>

          {/* The World Islands Stylized Group */}
          <g transform="translate(265, 120) scale(0.8)" opacity="0.6">
            <circle cx="0" cy="0" r="2.5" fill={activeTheme.color} />
            <circle cx="10" cy="-5" r="2" fill={activeTheme.color} />
            <circle cx="-8" cy="4" r="2.5" fill={activeTheme.color} />
            <circle cx="5" cy="8" r="3" fill={activeTheme.color} />
            <circle cx="15" cy="2" r="1.5" fill={activeTheme.color} />
            <circle cx="-15" cy="-2" r="2" fill={activeTheme.color} />
            <circle cx="2" cy="-10" r="1.8" fill={activeTheme.color} />
            <circle cx="-5" cy="-8" r="2" fill={activeTheme.color} />
          </g>

          {/* Sheikh Zayed Road with animated flowing dots representing active healthcare dispatch */}
          <motion.path
            d="M 80,335 C 170,295 260,235 470,115"
            stroke="rgba(0, 78, 146, 0.4)"
            strokeWidth="3"
            strokeDasharray="6 6"
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <path
            d="M 80,335 C 170,295 260,235 470,115"
            stroke="rgba(0, 78, 146, 0.15)"
            strokeWidth="6"
          />

          {/* Landmark - Burj Al Arab */}
          <g transform="translate(232, 168) scale(0.8)">
            <path d="M 0 15 L 0 -10 C 2 -6 6 -2 8 10 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="-5" y1="15" x2="10" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </g>

          {/* Landmark - Burj Khalifa */}
          <g transform="translate(340, 120)">
            <line x1="0" y1="15" x2="0" y2="-20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
            <path d="M -4 15 L 0 -12 L 4 15 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.75" />
            <line x1="-8" y1="15" x2="8" y2="15" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </g>

          {/* Active Network connection lines from selected location */}
          <AnimatePresence>
            {selectedLoc && (
              <g>
                {locationsData.map((loc) => {
                  if (loc.id === selectedLoc.id) return null;
                  return (
                    <motion.line
                      key={`link-${loc.id}-${activeService}`}
                      x1={selectedLoc.x}
                      y1={selectedLoc.y}
                      x2={loc.x}
                      y2={loc.y}
                      stroke={activeTheme.color}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.25 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  );
                })}
              </g>
            )}
          </AnimatePresence>

          {/* Animated Beacons / Pins */}
          {locationsData.map((loc) => {
            const isHovered = hoveredLoc === loc.id;
            const isSelected = selectedLoc?.id === loc.id;

            return (
              <g
                key={loc.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredLoc(loc.id)}
                onMouseLeave={() => setHoveredLoc(null)}
                onClick={() => setSelectedLoc(loc)}
              >
                {/* Pulsing indicator matching service color */}
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r={15}
                  fill="none"
                  stroke={activeTheme.color}
                  strokeWidth="1"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: [0.6, 1.8], opacity: [0.8, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{
                    transformOrigin: `${loc.x}px ${loc.y}px`,
                  }}
                />

                {/* Outer ring */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isSelected ? 10 : 7}
                  className="fill-transparent"
                  stroke={isSelected ? activeTheme.color : 'rgba(255, 255, 255, 0.4)'}
                  strokeWidth="1.5"
                  style={{
                    opacity: isHovered || isSelected ? 0.9 : 0.4,
                    transition: 'all 0.2s',
                    transformOrigin: `${loc.x}px ${loc.y}px`,
                  }}
                />

                {/* Center dot */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isSelected ? 5.5 : 4}
                  fill={isSelected ? activeTheme.color : isHovered ? activeTheme.color : '#ffffff'}
                  style={{
                    transition: 'all 0.2s',
                    filter: isSelected || isHovered ? `drop-shadow(0 0 6px ${activeTheme.color})` : 'none'
                  }}
                />

                {/* Tiny Location Tag */}
                {(isHovered || isSelected) && (
                  <g>
                    <rect
                      x={loc.x - 50}
                      y={loc.y - 28}
                      width="100"
                      height="18"
                      rx="4"
                      fill="rgba(11, 40, 72, 0.95)"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={loc.x}
                      y={loc.y - 16}
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {loc.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Location Healthcare Details Info Card */}
      <AnimatePresence mode="wait">
        {selectedLoc && (
          <motion.div
            key={`${selectedLoc.id}-${activeService}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 mt-2 bg-white/5 border rounded-xl p-3"
            style={{
              backdropFilter: 'blur(8px)',
              borderColor: `${activeTheme.color}25`
            }}
          >
            {/* Location Title & Availability Stat */}
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <MapPin size={13} style={{ color: activeTheme.color }} />
                {selectedLoc.name}
              </span>
              <span 
                className="text-[9.5px] font-semibold px-2 py-0.5 rounded border"
                style={{
                  color: activeTheme.color,
                  borderColor: `${activeTheme.color}35`,
                  backgroundColor: `${activeTheme.color}05`
                }}
              >
                {selectedLoc.availability[activeService]}
              </span>
            </div>

            {/* Response Time and Action Icon */}
            <div className="flex items-center justify-between text-[11px] text-white/90 border-b border-white/5 pb-2 mb-2 font-medium">
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-white/60" />
                Response Time: <strong style={{ color: activeTheme.color }}>{selectedLoc.times[activeService]}</strong>
              </span>
              <span className="text-[10px] text-white/60 flex items-center gap-1">
                <Activity size={10} style={{ color: activeTheme.color }} className="animate-pulse" />
                Live Dispatch Ready
              </span>
            </div>
            
            {/* Services Offered for selected Healthcare Type */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {selectedLoc.services[activeService].map((service, index) => (
                <div 
                  key={index}
                  className="text-[9.5px] text-white/90 bg-white/5 py-1 px-1.5 rounded border border-white/5 text-center flex items-center justify-center font-medium leading-snug"
                >
                  {service}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
