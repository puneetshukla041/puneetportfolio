'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Cloud, 
  Smartphone, 
  Layout, 
  Terminal, 
  Cpu, 
  Globe, 
  Server,
  Box,
  Layers,
  Zap,
  GitBranch,
  Command,
  Hexagon,
  Monitor 
} from 'lucide-react';

// --- TYPES ---
type SkillCategory = 'FRONTEND' | 'BACKEND' | 'MOBILE_DESKTOP' | 'DEVOPS' | 'DESIGN';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 0 to 100
  category: SkillCategory;
  tag: string;
}

// --- DATA ---
const SKILLS: Skill[] = [
  // FRONTEND
  { name: "Next.js 14", icon: <Globe size={18}/>, level: 98, category: 'FRONTEND', tag: "Framework" },
  { name: "TypeScript", icon: <Code2 size={18}/>, level: 95, category: 'FRONTEND', tag: "Language" },
  { name: "React.js", icon: <Layout size={18}/>, level: 95, category: 'FRONTEND', tag: "Library" },
  { name: "Tailwind CSS", icon: <Layers size={18}/>, level: 98, category: 'FRONTEND', tag: "Styling" },
  { name: "Framer Motion", icon: <Zap size={18}/>, level: 90, category: 'FRONTEND', tag: "Animation" },
  
  // BACKEND
  { name: "Node.js", icon: <Server size={18}/>, level: 92, category: 'BACKEND', tag: "Runtime" },
  { name: "MongoDB", icon: <Database size={18}/>, level: 90, category: 'BACKEND', tag: "NoSQL" },
  { name: "Python", icon: <Terminal size={18}/>, level: 85, category: 'BACKEND', tag: "Scripting" },
  { name: "SQL", icon: <Database size={18}/>, level: 80, category: 'BACKEND', tag: "Relational" },

  // MOBILE & DESKTOP
  { name: "React Native", icon: <Smartphone size={18}/>, level: 88, category: 'MOBILE_DESKTOP', tag: "Mobile" },
  { name: "Electron.js", icon: <Monitor size={18}/>, level: 85, category: 'MOBILE_DESKTOP', tag: "Desktop" },
  { name: "Capacitor", icon: <Box size={18}/>, level: 85, category: 'MOBILE_DESKTOP', tag: "Bridge" },

  // DEVOPS & TOOLS
  { name: "AWS Services", icon: <Cloud size={18}/>, level: 85, category: 'DEVOPS', tag: "Cloud" },
  { name: "Docker", icon: <Hexagon size={18}/>, level: 80, category: 'DEVOPS', tag: "Container" },
  { name: "Git / CI/CD", icon: <GitBranch size={18}/>, level: 92, category: 'DEVOPS', tag: "Workflow" },
];

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'FRONTEND', label: 'Frontend Core' },
  { id: 'BACKEND', label: 'Backend Architecture' },
  { id: 'MOBILE_DESKTOP', label: 'Native Ecosystem' },
  { id: 'DEVOPS', label: 'Cloud & Infrastructure' },
];

export default function Section6() {
  const [hoveredCategory, setHoveredCategory] = useState<SkillCategory | null>(null);

  return (
    // UPDATED: Changed bg-black to bg-transparent to match Section2
    <section className="relative min-h-screen bg-transparent text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white py-20 md:py-32 z-10 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] opacity-20 animate-pulse" />
         <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-28 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-xs md:text-sm font-mono text-zinc-500 mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
              System Capabilities
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[0.9]">
              Engineering <span className="text-zinc-600">DNA.</span>
            </h1>
          </div>
          
          <div className="hidden md:flex gap-8 text-right">
             <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1">Architecture</p>
                <p className="text-xl font-bold text-white">Full Stack</p>
             </div>
             <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1">Experience</p>
                <p className="text-xl font-bold text-white">4+ Years</p>
             </div>
          </div>
        </div>

        {/* --- MAIN SKILLS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Categories & Controls */}
          <div className="lg:col-span-4 space-y-8 sticky top-24 self-start">
             <div className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
                  <Command size={14} className="text-zinc-500"/>
                  Select Domain
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onMouseEnter={() => setHoveredCategory(cat.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between group
                        ${hoveredCategory === cat.id 
                          ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                          : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {cat.label}
                      <span className={`text-[10px] uppercase font-mono transition-opacity ${hoveredCategory === cat.id ? 'opacity-100 text-black/60' : 'opacity-0'}`}>
                        View
                      </span>
                    </button>
                  ))}
                </div>
             </div>

             {/* Live Metrics Widget */}
             <div className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5 backdrop-blur-sm hidden lg:block">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">System Diagnostics</h3>
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                </div>
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between text-xs text-zinc-400 mb-1">
                         <span>Optimization</span>
                         <span>98%</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           whileInView={{ width: "98%" }} 
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-emerald-500" 
                         />
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs text-zinc-400 mb-1">
                         <span>Code Quality</span>
                         <span>A+</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           whileInView={{ width: "100%" }} 
                           transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                           className="h-full bg-blue-500" 
                         />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* RIGHT COLUMN: Bento Grid of Skills */}
          <div className="lg:col-span-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {SKILLS.map((skill, idx) => {
                 const isDimmed = hoveredCategory && hoveredCategory !== skill.category;
                 return (
                   <motion.div
                     key={skill.name}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.4, delay: idx * 0.05 }}
                     className={`relative group p-5 rounded-xl border transition-all duration-500 cursor-default
                       ${isDimmed 
                          ? 'opacity-20 scale-[0.98] border-white/5 bg-transparent blur-[1px]' 
                          : 'opacity-100 scale-100 border-white/10 bg-zinc-900/30 hover:border-white/20 hover:bg-zinc-800/50'
                       }
                     `}
                   >
                     {/* Hover Gradient Effect */}
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

                     <div className="flex justify-between items-start mb-4 relative z-10">
                         <div className={`p-2.5 rounded-lg bg-zinc-950 border border-white/10 text-zinc-300 group-hover:text-white group-hover:border-white/30 transition-colors`}>
                            {skill.icon}
                         </div>
                         <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider border border-white/5 px-2 py-1 rounded-md bg-zinc-950/50">
                            {skill.tag}
                         </span>
                     </div>

                     <div className="relative z-10">
                         <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{skill.name}</h4>
                         
                         {/* Proficiency Bar */}
                         <div className="flex items-center gap-3">
                            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 whileInView={{ width: `${skill.level}%` }}
                                 transition={{ duration: 1, delay: 0.5 + (idx * 0.05) }}
                                 className={`h-full rounded-full ${
                                    skill.level > 90 ? 'bg-emerald-500' :
                                    skill.level > 80 ? 'bg-blue-500' : 'bg-purple-500'
                                 }`} 
                               />
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500">{skill.level}%</span>
                         </div>
                     </div>
                   </motion.div>
                 );
               })}
             </div>
          </div>

        </div>

        {/* --- FOOTER STATEMENT --- */}
        <div className="mt-20 md:mt-32 pt-10 border-t border-white/5 text-center">
           <Cpu size={32} className="text-zinc-700 mx-auto mb-6" />
           <p className="text-zinc-400 max-w-2xl mx-auto text-sm leading-loose">
             My stack is built on <span className="text-white font-bold">Performance</span> and <span className="text-white font-bold">Scalability</span>. 
             Whether it&apos;s optimizing React re-renders, architecting NoSQL schemas, or automating workflows with Python—
             I build systems that last.
           </p>
        </div>

      </div>
    </section>
  );
}