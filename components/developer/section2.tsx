'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Building2, GraduationCap, Briefcase } from 'lucide-react';

// Define Interface for Timeline Data
interface TimelineData {
  id: string;
  category: string;
  role: string;
  company: string;
  period: string;
  duration?: string;
  location: string;
  logo: string;
  description: string;
  points: string[];
  tech: string[];
  color: string;
  current?: boolean;
}

// --- Unified Data ---
const timelineData: TimelineData[] = [
  {
    id: 'education',
    category: 'Education',
    role: "Bachelor of Technology",
    company: "GLA University",
    period: "Sep 2021 - Aug 2025",
    location: "Mathura, India",
    logo: "/logos/gla.jpeg", 
    description: "Computer Science (AI/ML Specialization)",
    points: [
      "Specialized in Artificial Intelligence and Machine Learning.",
      "Built a strong foundation in Algorithms, Data Structures, and Software Engineering principles."
    ],
    tech: ["AI/ML", "DSA", "System Design"],
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 'medanta',
    category: 'Experience',
    role: "Intern",
    company: "Medanta",
    period: "May 2023 - Aug 2023",
    duration: "4 mos",
    location: "Gurugram · On-site",
    logo: "/logos/medanta.png",
    description: "Focused on API testing, QA automation, and security compliance.",
    points: [
      "Performed extensive API testing using Postman to validate data integrity.",
      "Designed manual and automated test cases for healthcare applications.",
      "Conducted vulnerability assessments to ensure secure handling of patient data."
    ],
    tech: ["Postman", "Python", "QA Automation"],
    color: "from-red-500 to-orange-500"
  },
  {
    id: 'disney',
    category: 'Experience',
    role: "Software Engineer Intern",
    company: "Disney+ Hotstar",
    period: "Oct 2023 - Mar 2024",
    duration: "6 mos",
    location: "Bengaluru · Remote",
    logo: "/logos/disney.jpeg",
    description: "Contributed to backend scalability and API development for high-traffic services.",
    points: [
      "Supported backend API development for the Messenger Service.",
      "Contributed to Offer Service scalability by improving cache loaders.",
      "Optimized database queries for high concurrent users."
    ],
    tech: ["Next.js", "Backend API", "Scalability", "Redis"],
    color: "from-blue-600 to-cyan-500"
  },
  {
    id: 'ssi',
    category: 'Experience',
    role: "Software Engineer",
    company: "SS Innovations International, Inc.",
    period: "Apr 2025 - Present",
    duration: "8 mos",
    location: "Gurugram · On-site",
    logo: "/logos/ssi.jpeg",
    description: "Leading the development of advanced web and mobile applications for the SSI ecosystem.",
    points: [
      "Spearheaded 'SSI Studios', an all-in-one creative platform consolidating design tools.",
      "Engineered a user-friendly interface allowing non-technical staff to create visuals.",
      "Reduced dependence on external apps and ensured consistent branding."
    ],
    tech: ["Next.js", "React Native", "Full Stack", "System Design"],
    color: "from-emerald-500 to-teal-500",
    current: true
  }
];

const Section2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <section className="relative w-full min-h-screen bg-neutral-950 text-neutral-200 py-20 md:py-32 px-4 sm:px-8 overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-900/10 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center md:text-left md:pl-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Journey</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed px-2">
            From academic foundations to engineering scalable systems for industry leaders.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative space-y-12 md:space-y-24">
          
          {/* Vertical Lines */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-neutral-800" />
          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500 origin-top" 
          />

          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} data={item} index={index} />
          ))}

        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ data, index }: { data: TimelineData, index: number }) => {
  const isEducation = data.category === 'Education';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      // Responsive padding: pl-10 for mobile (enough for the line), pl-24 for desktop
      className="relative pl-10 md:pl-24 group"
    >
      {/* Timeline Node */}
      <div className="absolute left-4 md:left-8 -translate-x-1/2 top-0 flex items-center justify-center">
        <div className={`w-8 h-8 rounded-full border-4 border-neutral-950 bg-neutral-800 z-10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 ${data.current ? 'bg-white' : ''}`}>
           {isEducation ? (
             <GraduationCap size={14} className={data.current ? 'text-black' : 'text-neutral-400'} />
           ) : (
             <Briefcase size={14} className={data.current ? 'text-black' : 'text-neutral-400'} />
           )}
        </div>
        {/* Glowing Halo for current item */}
        {data.current && (
           <div className="absolute inset-0 rounded-full bg-emerald-500/50 animate-ping" />
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        
        {/* Date & Metadata Column (Desktop) */}
        <div className="hidden md:block w-40 text-right pt-1">
          <div className="text-xl font-bold text-white tracking-tight">{data.period.split(' - ')[0]}</div>
          <div className="text-sm text-neutral-500 font-medium mb-1">{data.period.split(' - ')[1]}</div>
          {data.duration && <div className="text-xs text-neutral-600 uppercase tracking-widest">{data.duration}</div>}
        </div>

        {/* Content Card */}
        <div className="flex-1 relative">
          {/* Card Hover Gradient Background */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r ${data.color} rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg`} />
          
          <div className="relative bg-neutral-900/50 backdrop-blur-md border border-white/10 p-5 md:p-8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-5 md:mb-6">
              <div className="flex items-start sm:items-center gap-3 md:gap-4 w-full sm:w-auto">
                <div className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 relative bg-white rounded-xl flex items-center justify-center p-1 shadow-lg">
                  <Image 
                    src={data.logo} 
                    alt={data.company} 
                    width={56}
                    height={56}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-2xl font-bold text-white leading-tight break-words">{data.role}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-neutral-300 font-medium mt-1">
                    <span className="text-sm md:text-base truncate max-w-[200px] sm:max-w-none">{data.company}</span>
                    {data.current && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider border border-emerald-500/20 whitespace-nowrap">
                            Current
                        </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Mobile Date (Visible only on small screens) */}
              <div className="flex flex-row sm:flex-col justify-between w-full sm:w-auto items-end sm:text-right border-t border-white/5 sm:border-0 pt-3 sm:pt-0 mt-1 sm:mt-0">
                <div className="text-sm font-bold text-neutral-300 whitespace-nowrap">{data.period.split(' - ')[0]}</div>
                <div className="text-xs text-neutral-500 whitespace-nowrap">{data.period.split(' - ')[1]}</div>
              </div>
            </div>

            {/* Location & Type */}
            <div className="flex flex-wrap gap-3 md:gap-4 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-5 md:mb-6">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="md:w-[14px] md:h-[14px]" /> {data.location}
              </div>
              {isEducation && (
                  <div className="flex items-center gap-1.5 text-purple-400/80">
                    <Building2 size={12} className="md:w-[14px] md:h-[14px]" /> Education
                  </div>
              )}
            </div>

            {/* Description Points */}
            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              {data.points.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-neutral-400 leading-relaxed">
                  <span className={`mt-1.5 md:mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${data.color} flex-shrink-0`} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2">
              {data.tech.map((tech: string, i: number) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-medium text-neutral-300 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Section2;