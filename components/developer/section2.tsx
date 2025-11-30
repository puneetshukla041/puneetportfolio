'use client';

import React, { useRef } from 'react';
// 1. Import Variants here
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import Image from 'next/image';

// ... (Keep Interfaces and timelineData exactly as they were) ...

interface TimelineData {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  logo: string;
  type: 'Full-time' | 'Internship' | 'Education';
  description: string;
  points: string[];
  tech: string[];
  current?: boolean;
}

const timelineData: TimelineData[] = [
  // ... (Your existing data) ...
  {
    id: 'ssi',
    role: "Software Engineer",
    company: "SS Innovations International, Inc.",
    period: "Apr 2025 - Present",
    location: "Gurugram, India",
    logo: "/logos/ssi.jpeg",
    type: "Full-time",
    description: "Leading development of advanced web/mobile applications for the SSI ecosystem.",
    points: [
      "Spearheaded 'SSI Studios', an all-in-one creative platform consolidating design tools.",
      "Engineered user-friendly interfaces allowing non-technical staff to create visuals.",
      "Reduced dependence on external apps and ensured consistent branding."
    ],
    tech: ["Next.js", "React Native", "System Design"],
    current: true
  },
  {
    id: 'disney',
    role: "Software Engineer Intern",
    company: "Disney+ Hotstar",
    period: "Oct 2023 - Mar 2024",
    location: "Bengaluru (Remote)",
    logo: "/logos/disney.webp",
    type: "Internship",
    description: "Contributed to backend scalability and API development for high-traffic services.",
    points: [
      "Supported backend API development for the Messenger Service.",
      "Contributed to Offer Service scalability by improving cache loaders.",
      "Optimized database queries for high concurrent users."
    ],
    tech: ["Next.js", "Backend API", "Redis"]
  },
  {
    id: 'medanta',
    role: "Intern",
    company: "Medanta",
    period: "May 2023 - Aug 2023",
    location: "Gurugram, India",
    logo: "/logos/medanta.png",
    type: "Internship",
    description: "Focused on API testing, QA automation, and security compliance.",
    points: [
      "Performed extensive API testing using Postman to validate data integrity.",
      "Designed manual and automated test cases for healthcare applications.",
      "Conducted vulnerability assessments to ensure secure handling of patient data."
    ],
    tech: ["Postman", "Python", "QA Automation"]
  },
  {
    id: 'education',
    role: "Bachelor of Technology",
    company: "GLA University",
    period: "Sep 2021 - Aug 2025",
    location: "Mathura, India",
    logo: "/logos/gla.jpeg",
    type: "Education",
    description: "Computer Science (AI/ML Specialization)",
    points: [
      "Specialized in Artificial Intelligence and Machine Learning.",
      "Built a strong foundation in Algorithms, Data Structures, and Software Engineering principles."
    ],
    tech: ["AI/ML", "DSA", "System Design"]
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
    <section className="relative w-full min-h-screen bg-neutral-950 overflow-hidden text-neutral-200 py-24 px-4 sm:px-8 font-sans">
      
      {/* Cinematic Ambient Background Light */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-teal-900/20 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Journey</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]"></div>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative space-y-20">
          
          {/* Static Vertical Line (Subtle track) */}
          <div className="absolute left-[20px] top-2 bottom-0 w-[1px] bg-neutral-800/60" />
          
          {/* Animated Vertical Line (Glowing Beam) */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[20px] top-2 bottom-0 w-[2px] bg-cyan-400 origin-top shadow-[0_0_20px_rgba(34,211,238,0.6)] z-0" 
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
  // 2. Add ': Variants' type annotation here
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.15 }
    }
  };

  // 3. Add ': Variants' type annotation here as well
  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-16 group"
    >
      {/* Timeline Node (Glowing Orb) */}
      <div className="absolute left-0 top-[6px] w-11 h-11 flex items-center justify-center z-10">
        <div className={`relative w-4 h-4 rounded-full border transition-all duration-500
             ${data.current 
                ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]' 
                : 'bg-neutral-950 border-neutral-600 group-hover:border-cyan-400 group-hover:bg-cyan-950 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]'
             }`}>
             {data.current && <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75"></div>}
        </div>
      </div>

      {/* Content Container */}
      <motion.div variants={contentVariants} className="flex flex-col gap-5 relative">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 z-10 relative">
          <div className="flex gap-4 items-center md:items-start">
             {/* Logo Box with premium shadow */}
            <div className="w-14 h-14 flex-shrink-0 bg-neutral-900/80 backdrop-blur-md rounded-xl flex items-center justify-center p-2 overflow-hidden border border-neutral-800/60 shadow-[0_4px_20px_rgba(0,0,0,0.2)] group-hover:border-cyan-500/30 transition-colors duration-500">
               <Image 
                 src={data.logo} 
                 alt={data.company} 
                 width={48} 
                 height={48} 
                 className="object-contain w-full h-full"
               />
            </div>
            
            {/* Role & Company */}
            <div>
              <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-cyan-100 transition-colors">
                {data.role}
              </h3>
              <div className="text-neutral-400 text-sm mt-1.5 font-medium tracking-wide">
                {data.company}
              </div>
            </div>
          </div>

          {/* Metadata (Date & Type) */}
          <div className="flex flex-row md:flex-col md:items-end justify-between items-center md:text-right pl-[72px] md:pl-0">
             <div className="text-sm text-cyan-100/90 font-semibold tracking-wide">
                {data.period}
             </div>
             <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                  {data.location}
                </span>
                {/* Premium Label */}
                <span className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full border backdrop-blur-sm transition-all duration-300 ${
                    data.type === 'Full-time' 
                    ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                    : 'bg-neutral-900/60 text-neutral-400 border-neutral-700/50'
                }`}>
                  {data.type}
                </span>
             </div>
          </div>
        </div>

        {/* Description Card - Glassmorphism & Glow */}
        <div className="relative z-0">
            {/* Hover Gradient Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-teal-500/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700" />
            
            <div className="relative bg-neutral-900/40 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl transition-all duration-500 group-hover:border-cyan-500/10 group-hover:bg-neutral-900/60 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                <p className="text-neutral-300 text-sm md:text-base mb-6 leading-relaxed font-light">
                {data.description}
                </p>
                <ul className="space-y-3 mb-7">
                {data.points.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-400 leading-relaxed group/point">
                        {/* Subtle glowing bullet point */}
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover/point:bg-cyan-400 group-hover/point:shadow-[0_0_5px_rgba(34,211,238,0.5)] transition-all duration-300 flex-shrink-0" />
                        <span className="group-hover/point:text-neutral-300 transition-colors">{point}</span>
                    </li>
                ))}
                </ul>

                {/* Tech Stack - Premium Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {data.tech.map((tech: string, i: number) => (
                    <span 
                    key={i} 
                    className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium text-neutral-400 bg-white/5 border border-white/5 rounded-lg hover:bg-cyan-950/30 hover:text-cyan-300 hover:border-cyan-500/20 transition-all duration-300 cursor-default"
                    >
                    {tech}
                    </span>
                ))}
                </div>
            </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default Section2;