import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, GraduationCap, IdCard, MapPin, Award, Clock } from 'lucide-react';
import kajalPhoto from '../assets/kajal.png';
import teamHero from '../assets/team_hero.png';

// New static team image imports
import bharatPhoto from '../assets/Bharat.png';
import hastiPhoto from '../assets/Hasti.png';
import jasmeenPhoto from '../assets/Jasmeen.png';
import jotiAshokPhoto from '../assets/Joti Ashok.png';
import manjuPhoto from '../assets/Manju.png';
import nimeshkaPhoto from '../assets/Nimeshka .png';
import nirmalaPhoto from '../assets/Nirmala .png';
import noreliePhoto from '../assets/Norelie.png';
import santoshiPhoto from '../assets/Santoshi.png';
import vaishaliPhoto from '../assets/Vaishali.png';
import farooqPhoto from '../assets/farooq.png';
import mamataPhoto from '../assets/mamata.png';
import mariselviPhoto from '../assets/mariselvi .png';
import shwetaRakeshPhoto from '../assets/shweta Rakesh .png';
import shwetaPhoto from '../assets/shweta.png';
import suneelPhoto from '../assets/suneel.png';

// Newly added team images
import chandaPhoto from '../assets/Chanda Kumari.png';
import dipeshPhoto from '../assets/Dipesh.png';
import jayaKumariPhoto from '../assets/Jaya Kumari .png';
import lakshmiPhoto from '../assets/Lakshmi Sundar .png';
import mariecrisPhoto from '../assets/Mariecris Godinez.png';
import manasaPhoto from '../assets/manasa Vadde.png';
import sajiniPhoto from '../assets/sajini Babu.png';
import vinayataPhoto from '../assets/vinayata m .png';

const doctorsData = [
  {
    name: "Jaya Kumari",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-001",
    degree: "DHA Certified Physiotherapist",
    image: jayaKumariPhoto
  },
  {
    name: "Vinayata M. Patel",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-002",
    degree: "DHA Certified Physiotherapist",
    image: vinayataPhoto
  },
  {
    name: "Sehar Bano",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-003",
    degree: "DHA Certified Physiotherapist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Manju Kumari",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-001",
    degree: "DHA Licensed Assistant Nurse",
    image: manjuPhoto
  },
  {
    name: "Chanda Kumari",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-001",
    degree: "Healthcare Assistant",
    image: chandaPhoto
  },
  {
    name: "Shweta Jagmohan",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-002",
    degree: "DHA Licensed Assistant Nurse",
    image: shwetaPhoto
  },
  {
    name: "Dipesh",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-002",
    degree: "Healthcare Assistant",
    image: dipeshPhoto
  },
  {
    name: "Mariecris Godinez",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-003",
    degree: "Healthcare Assistant",
    image: mariecrisPhoto
  },
  {
    name: "Sajini Babu",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-003",
    degree: "DHA Licensed Registered Nurse",
    image: sajiniPhoto
  },
  {
    name: "Lakshmi Sundar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-004",
    degree: "DHA Licensed Registered Nurse",
    image: lakshmiPhoto
  },
  {
    name: "Kajal Jaiswal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-004",
    degree: "Healthcare Assistant",
    image: kajalPhoto
  },
  {
    name: "Marisel Vi.R",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-005",
    degree: "DHA Licensed Assistant Nurse",
    image: mariselviPhoto
  },
  {
    name: "Shweta Rakesh Kumar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-006",
    degree: "DHA Licensed Registered Nurse",
    image: shwetaRakeshPhoto
  },
  {
    name: "Farooq Khalid",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-005",
    degree: "Healthcare Assistant",
    image: farooqPhoto
  },
  {
    name: "Suneel Bahadur",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-006",
    degree: "Health Assistant",
    image: suneelPhoto
  },
  {
    name: "Mamata Regmi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-007",
    degree: "Healthcare Assistant",
    image: mamataPhoto
  },
  {
    name: "Bharat Badwal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-008",
    degree: "Healthcare Assistant",
    image: bharatPhoto
  },
  {
    name: "Nimesh Ka Sewwandi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-009",
    degree: "Healthcare Assistant",
    image: nimeshkaPhoto
  },
  {
    name: "Santoshi Sah",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-010",
    degree: "Healthcare Assistant",
    image: santoshiPhoto
  },
  {
    name: "Nirmala Gharti Magar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-011",
    degree: "Healthcare Assistant",
    image: nirmalaPhoto
  },
  {
    name: "Jasmeen Jassi",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-007",
    degree: "DHA Licensed Assistant Nurse",
    image: jasmeenPhoto
  },
  {
    name: "Vaishali Parashar",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-008",
    degree: "DHA Licensed Assistant Nurse",
    image: vaishaliPhoto
  },
  {
    name: "Joti Ashok",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-009",
    degree: "DHA Licensed Registered Nurse",
    image: jotiAshokPhoto
  },
  {
    name: "Norelie Munar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-012",
    degree: "Healthcare Assistant",
    image: noreliePhoto
  },
  {
    name: "Hasti Rameshbhai",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-010",
    degree: "DHA Licensed Registered Nurse",
    image: hastiPhoto
  },
  {
    name: "Rhodalyn Gonzales",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-013",
    degree: "Health Assistant",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Manasa Vadde",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-014",
    degree: "Healthcare Assistant",
    image: manasaPhoto
  }
];

const departments = [
  "All",
  "Physiotherapy",
  "Nursing",
  "Homecare Support"
];

const Team = () => {
  const [selectedDept, setSelectedDept] = useState("All");
  const [dbTeam, setDbTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/team/');
        if (res.ok) {
          const data = await res.json();
          setDbTeam(data);
        }
      } catch (err) {
        console.error("Error fetching team from DB:", err);
      }
    };
    fetchTeam();
  }, []);

  const mappedDbTeam = dbTeam.map(member => {
    let dept = "Nursing";
    const postLower = member.post ? member.post.toLowerCase() : "";
    if (postLower.includes("physio")) {
      dept = "Physiotherapy";
    } else if (postLower.includes("home") || postLower.includes("assistant") || postLower.includes("support")) {
      dept = "Homecare Support";
    }
    
    let img = member.photo || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
    if (img && !img.startsWith("http")) {
      img = `http://localhost:8000${img}`;
    }

    return {
      name: member.name,
      specialty: member.post,
      department: dept,
      nmcNo: `DB-${member.id}`,
      degree: member.post,
      image: img,
      isFromDb: true
    };
  });

  const combinedDoctors = [...mappedDbTeam, ...doctorsData];

  const filteredDoctors = selectedDept === "All"
    ? combinedDoctors
    : combinedDoctors.filter(doc => doc.department === selectedDept);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-24 bg-gray-50 min-h-screen"
    >
      <section 
        className="relative min-h-[50vh] flex items-center py-20 mb-16 text-white text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${teamHero})`,
          backgroundPosition: 'center 35%'
        }}
      >
        {/* Dark Blue-Navy Gradient Overlay to ensure maximum contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a294a]/90 via-[#0b2848]/85 to-[#1a294a]/95 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-black/45 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center">

            <h1 
              className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ 
                color: '#ffffff',
                textShadow: '0 4px 20px rgba(0,0,0,0.7)'
              }}
            >
              Our Medical Specialists
            </h1>
            <p 
              className="text-sm md:text-lg leading-relaxed mb-8 max-w-3xl font-medium"
              style={{ 
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              A dedicated team of DHA licensed doctors, registered nurses, and certified physiotherapists bringing clinical excellence, safety, and recovery directly to your home.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm font-semibold">
              <div 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: '#ffffff',
                  backgroundColor: 'rgba(46, 189, 110, 0.12)',
                  border: '1.5px solid rgba(46, 189, 110, 0.35)',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '700',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 189, 110, 0.22)';
                  e.currentTarget.style.borderColor = 'rgba(46, 189, 110, 0.55)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 189, 110, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(46, 189, 110, 0.35)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Award size={18} style={{ color: '#2ebd6e' }} />
                <span>100% DHA Licensed</span>
              </div>
              <div 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: '#ffffff',
                  backgroundColor: 'rgba(46, 189, 110, 0.12)',
                  border: '1.5px solid rgba(46, 189, 110, 0.35)',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '700',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 189, 110, 0.22)';
                  e.currentTarget.style.borderColor = 'rgba(46, 189, 110, 0.55)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(46, 189, 110, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(46, 189, 110, 0.35)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Clock size={18} style={{ color: '#2ebd6e' }} />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Header Block with top margin spacing */}
        <div className="flex flex-col items-center text-center mt-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a294a] tracking-tight mb-4">
            Our Medical Directory
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium max-w-2xl">
            Search and filter through our certified clinical practitioners by department.
          </p>
          <div 
            style={{
              width: '64px',
              height: '4px',
              backgroundColor: '#004e92',
              borderRadius: '9999px',
              marginTop: '16px'
            }}
          />
        </div>

        {/* Filter Pills Block with top/bottom margin spacing */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-16 max-w-6xl mx-auto">
          {departments.map((dept, idx) => {
            const isActive = selectedDept === dept;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDept(dept)}
                className="text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer hover:scale-105"
                style={{
                  background: isActive ? 'linear-gradient(135deg, #08709d 0%, #004e92 100%)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#374151',
                  border: isActive ? '1px solid transparent' : '1px solid #e5e7eb',
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  boxShadow: isActive ? '0 8px 20px -4px rgba(8, 112, 157, 0.35)' : '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Doctors Grid Block with card gap spacing */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={doc.nmcNo}
                  className="shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row gap-5 items-center sm:items-stretch"
                  style={{
                    backgroundColor: '#f4fbfb',
                    border: '1px solid #cbebe7',
                    borderRadius: '16px',
                    padding: '20px'
                  }}
                >
                  {/* Photo Container (Left/Top) */}
                  <div 
                    className="shrink-0 flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '6px',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      width: '128px',
                      height: '144px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Info Column (Right) */}
                  <div className="flex flex-col justify-center flex-grow w-full">
                    <h3 className="text-lg font-bold text-[#1a294a] mb-1">
                      {doc.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#004e92]">
                      {doc.specialty}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 font-medium">
                No doctors currently listed for this department.
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Team;
