import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, GraduationCap, IdCard, MapPin } from 'lucide-react';
import kajalPhoto from '../assets/kajal.png';

const doctorsData = [
  {
    name: "Kajal Jaiswal",
    specialty: "Healthcare Assistant",
    department: "Gynaecology Department",
    nmcNo: "17070",
    degree: "Diploma in Healthcare Support",
    image: kajalPhoto
  },
  {
    name: "Marisel Vi.R",
    specialty: "Assistant Nurse",
    department: "ENT Department",
    nmcNo: "7768",
    degree: "Diploma in Nursing",
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Jaya Kumari",
    specialty: "Physiotherapist",
    department: "Orthopedic Department",
    nmcNo: "21749",
    degree: "DHA Certified Physiotherapist",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Pradeep Adhikari",
    specialty: "Consultant Pediatrician",
    department: "Paediatric & Neonatology",
    nmcNo: "12903",
    degree: "MBBS, MD (Pediatrics)",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Ramesh Koirala",
    specialty: "Consultant Neurologist",
    department: "Neurology Department",
    nmcNo: "6754",
    degree: "MBBS, MD, DM (Neurology)",
    image: "https://images.unsplash.com/photo-1605684954278-9f17d2673d34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Sabina Shrestha",
    specialty: "Consultant Psychiatrist",
    department: "Psychiatry Department",
    nmcNo: "14210",
    degree: "MBBS, MD (Psychiatry)",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Binod Singh",
    specialty: "Consultant Surgeon",
    department: "Surgery Department",
    nmcNo: "8945",
    degree: "MBBS, MS (Surgery)",
    image: "https://images.unsplash.com/photo-1582750433449-6493b2063346?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Dr. Smriti KC",
    specialty: "Medical Officer",
    department: "Medical Officer",
    nmcNo: "20956",
    degree: "MBBS",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];

const departments = [
  "All",
  "ENT Department",
  "Gynaecology Department",
  "Internal Medicine",
  "Neurology Department",
  "Orthopedic Department",
  "Pathology Department",
  "Paediatric & Neonatology",
  "Psychiatry Department",
  "Surgery Department",
  "Ophthalmology Department",
  "OT Department",
  "Gastroenterology Department",
  "Dental Department",
  "Radiology Department",
  "Medical Officer"
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
                  <div className="flex flex-col justify-between flex-grow w-full">
                    <div>
                      <h3 className="text-lg font-bold text-[#1a294a] mb-1">
                        {doc.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#004e92] mb-3">
                        {doc.specialty}
                      </p>
                      
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                          <GraduationCap size={14} className="text-gray-400 shrink-0" />
                          <span>{doc.degree}</span>
                        </div>
                      </div>
                    </div>

                    {/* Book Button - with explicit flex display layout styling */}
                    <Link
                      to="/contact"
                      className="hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full"
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        backgroundColor: '#004e92',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(0, 78, 146, 0.15)'
                      }}
                    >
                      <Calendar size={14} />
                      Book Appointment
                    </Link>
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
