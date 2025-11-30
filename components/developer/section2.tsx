'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';

// --- Experience Data ---
const experiences = [
  {
    type: 'work',
    role: "Software Engineer",
    company: "SS Innovations International, Inc.",
    period: "Apr 2025 - Present",
    duration: "8 mos",
    location: "Gurugram · On-site",
    logo: "/logos/ssi.png", // Ensure this file exists in public/logos/
    description: "Leading the development of advanced web and mobile applications for the SSI ecosystem.",
    points: [
      "Lead the development of advanced web and mobile applications that solve real-world problems, adapting seamlessly to organizational needs.",
      "Spearheaded 'SSI Studios', an all-in-one creative platform consolidating design tools (Logo Editor, Certificate Maker, ID Card generator) into a single ecosystem.",
      "Engineered a user-friendly interface allowing non-technical staff to create professional-quality visuals in minutes.",
      "Reduced dependence on external apps and ensured consistent, branded outputs across all SSI activities."
    ],
    tech: ["Next.js", "React Native", "System Design", "Full Stack"]
  },
  {
    type: 'internship',
    role: "Software Engineer Intern",
    company: "Disney+ Hotstar",
    period: "Oct 2023 - Mar 2024",
    duration: "6 mos",
    location: "Bengaluru · Remote",
    logo: "/logos/disney.png",
    description: "Contributed to backend scalability and API development for high-traffic services.",
    points: [
      "Supported backend API development for the Messenger Service, implementing audit logging and retry handling.",
      "Contributed to Offer Service scalability by improving cache loaders and partitioning validations.",
      "Built parts of the Entitlement SDK, adding API integrations for dynamic CTA rendering based on user entitlements.",
      "Optimized database queries and wrote scripts to improve Payments Service scalability for high concurrent users."
    ],
    tech: ["CI/CD", "Next.js", "Backend API", "Scalability", "Database Optimization"]
  },
  {
    type: 'internship',
    role: "Intern",
    company: "Medanta",
    period: "May 2023 - Aug 2023",
    duration: "4 mos",
    location: "Gurugram · On-site",
    logo: "/logos/medanta.png",
    description: "Focused on API testing, QA automation, and security compliance.",
    points: [
      "Performed extensive API testing using Postman to validate data integrity and error handling.",
      "Managed version control via Git/GitHub to ensure code integrity and seamless collaboration.",
      "Designed and executed comprehensive manual and automated test cases for healthcare applications.",
      "Conducted vulnerability assessments and penetration testing to ensure secure handling of patient data."
    ],
    tech: ["Postman", "Python", "QA Automation", "Security Testing"]
  }
];

const education = {
  role: "Bachelor of Technology",
  degree: "Computer Science (AI/ML Specialization)",
  company: "GLA University",
  period: "Sep 2021 - Aug 2025",
  location: "Mathura, India",
  logo: "/images/gla-logo.png", // Replace if you have a specific education logo
  points: [
    "Specialized in Artificial Intelligence and Machine Learning.",
    "Built a strong foundation in Algorithms, Data Structures, and Software Engineering principles."
  ]
};

const Section2 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="section2" className="relative w-full min-h-screen bg-[#0a0a0a] text-gray-200 py-24 px-4 sm:px-8 font-sans">
      
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 border-l-4 border-blue-500 pl-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Professional Experience</h2>
          <p className="text-gray-400 mt-2 text-lg">
            A track record of building scalable systems and driving technical innovation.
          </p>
        </div>

        {/* Timeline Wrapper */}
        <div ref={containerRef} className="relative space-y-12">
          
          {/* Static Background Line */}
          <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-[#222] hidden md:block" />

          {/* Animated Progress Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 origin-top hidden md:block" 
          />

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row gap-8 group"
            >
              {/* Timeline Node (Desktop) */}
              <div className="hidden md:flex absolute left-8 -translate-x-1/2 mt-8 items-center justify-center w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-blue-500 z-10 group-hover:scale-125 transition-transform duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-pulse" />
              </div>

              {/* Logo Column */}
              <div className="flex-shrink-0 md:w-48 pt-2 flex flex-row md:flex-col items-center md:items-end gap-4 md:text-right md:pr-12">
                <div className="w-16 h-16 relative bg-white rounded-lg p-2 flex items-center justify-center overflow-hidden border border-gray-800 shadow-sm group-hover:border-blue-500/50 transition-colors">
                   <Image 
                     src={exp.logo} 
                     alt={exp.company}
                     fill
                     className="object-contain p-1"
                   />
                </div>
                <div className="hidden md:block">
                  <div className="font-bold text-white">{exp.period.split(' - ')[0]}</div>
                  <div className="text-sm text-gray-500">{exp.period.split(' - ')[1]}</div>
                  <div className="text-xs text-gray-600 mt-1">{exp.duration}</div>
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-[#111] border border-[#222] rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 shadow-xl hover:shadow-blue-500/10">
                {/* Mobile Date Header */}
                <div className="md:hidden text-sm text-gray-400 mb-2 font-mono flex items-center gap-2">
                  <Calendar size={14} /> {exp.period} ({exp.duration})
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="text-blue-400 font-medium">{exp.company}</div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 bg-[#1a1a1a] px-2 py-1 rounded border border-[#333]">
                    <MapPin size={12} /> {exp.location}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 border-t border-[#222] pt-4">
                  {exp.tech.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-medium text-gray-400 bg-[#1a1a1a] border border-[#333] rounded-md hover:text-white hover:border-blue-500/50 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education Section Separator */}
          <div className="relative py-8">
             <div className="absolute left-0 right-0 top-1/2 h-px bg-[#222]" />
             <span className="relative z-10 bg-[#0a0a0a] px-4 ml-6 md:ml-auto md:mr-auto md:w-fit text-gray-500 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
               <GraduationCap size={16} /> Education
             </span>
          </div>

          {/* Education Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col md:flex-row gap-8 group"
          >
             {/* Timeline Node (Desktop) */}
             <div className="hidden md:flex absolute left-8 -translate-x-1/2 mt-8 items-center justify-center w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-purple-500 z-10 group-hover:scale-125 transition-transform duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
             </div>

             {/* Logo Column */}
             <div className="flex-shrink-0 md:w-48 pt-2 flex flex-row md:flex-col items-center md:items-end gap-4 md:text-right md:pr-12">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xl border border-gray-800 shadow-sm group-hover:border-purple-500/50 transition-colors">
                   <Image 
                     src={education.logo}
                     alt="GLA"
                     width={40}
                     height={40}
                     className="object-contain"
                   />
                </div>
                <div className="hidden md:block">
                  <div className="font-bold text-white">{education.period.split(' - ')[0]}</div>
                  <div className="text-sm text-gray-500">{education.period.split(' - ')[1]}</div>
                </div>
             </div>

             <div className="flex-1 bg-[#111] border border-[#222] rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 shadow-xl hover:shadow-purple-500/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{education.degree}</h3>
                    <div className="text-purple-400 font-medium">{education.company}</div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 bg-[#1a1a1a] px-2 py-1 rounded border border-[#333]">
                    <MapPin size={12} /> {education.location}
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {education.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/50 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Section2;