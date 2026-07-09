import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, GraduationCap, IdCard, MapPin } from 'lucide-react';
import kajalPhoto from '../assets/kajal.png';

const doctorsData = [
  {
    name: "Jaya Kumari",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-001",
    degree: "DHA Certified Physiotherapist",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Vinayata M. Patel",
    specialty: "DHA Certified Physiotherapist",
    department: "Physiotherapy",
    nmcNo: "PT-002",
    degree: "DHA Certified Physiotherapist",
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
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
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Chanda Kumari",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-001",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlbWFsZSUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Shweta Jagmohan",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-002",
    degree: "DHA Licensed Assistant Nurse",
    image: "https://images.unsplash.com/photo-1643608232400-b5025785f58c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dipesh",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-002",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Mariecris Godinez",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-003",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Sajini Babu",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-003",
    degree: "DHA Licensed Registered Nurse",
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Lakshmi Sundar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-004",
    degree: "DHA Licensed Registered Nurse",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
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
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Shweta Rakesh Kumar",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-006",
    degree: "DHA Licensed Registered Nurse",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlbWFsZSUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Farooq Khalid",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-005",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Bahadur",
    specialty: "Health Assistant",
    department: "Homecare Support",
    nmcNo: "HA-006",
    degree: "Health Assistant",
    image: "https://images.unsplash.com/photo-1605684954278-9f17d2673d34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Mamata Regmi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-007",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1643608232400-b5025785f58c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Bharat Badwal",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-008",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1582750433449-6493b2063346?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Nimesh Ka Sewwandi",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-009",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Santoshi Sah",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-010",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Nirmala Gharti Magar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-011",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Jasmeen Jassi",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-007",
    degree: "DHA Licensed Assistant Nurse",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Vaishali Parashar",
    specialty: "DHA Licensed Assistant Nurse",
    department: "Nursing",
    nmcNo: "NU-008",
    degree: "DHA Licensed Assistant Nurse",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZlbWFsZSUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Joti Ashok",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-009",
    degree: "DHA Licensed Registered Nurse",
    image: "https://images.unsplash.com/photo-1643608232400-b5025785f58c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Norelie Munar",
    specialty: "Healthcare Assistant",
    department: "Homecare Support",
    nmcNo: "HA-012",
    degree: "Healthcare Assistant",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Hasti Rameshbhai",
    specialty: "DHA Licensed Registered Nurse",
    department: "Nursing",
    nmcNo: "NU-010",
    degree: "DHA Licensed Registered Nurse",
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
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
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
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

  const filteredDoctors = selectedDept === "All"
    ? doctorsData
    : doctorsData.filter(doc => doc.department === selectedDept);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-4">
        {/* Header Block with top margin spacing */}
        <div className="flex flex-col items-center text-center mt-6 mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a294a] tracking-tight mb-4">
            Meet Our Doctors
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-medium max-w-2xl">
            Experienced healthcare professionals dedicated to your well-being
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
                  backgroundColor: isActive ? '#004e92' : 'transparent',
                  color: isActive ? '#ffffff' : '#4b5563',
                  border: isActive ? '1px solid transparent' : '1px solid #d1d5db',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  boxShadow: isActive ? '0 4px 12px rgba(0, 78, 146, 0.2)' : 'none'
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
