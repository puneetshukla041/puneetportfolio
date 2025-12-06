'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { 
  FileText, 
  User, 
  LayoutTemplate, 
  CreditCard, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Download, 
  Terminal, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Database,
  Zap,
  Image as ImageIcon
} from 'lucide-react';

// --- DATA ---
const MODULES = [
  {
    title: "Certificate Generator",
    role: "Database & Automation",
    icon: <FileText className="text-zinc-100" size={24} />,
    stack: ["Next.js", "MongoDB", "pdf-lib"],
    desc: "Automates the entire lifecycle of certificate issuance from data entry to final PDF generation.",
    features: [
      { label: "Centralized DB", text: "Replaces Excel with MongoDB." },
      { label: "Instant PDF", text: "Maps data to coordinates instantly." },
      { label: "Bulk Actions", text: "Export thousands in one click." }
    ],
    problemSolved: "Reduced multi-day manual typing to minutes."
  },
  {
    title: "Visiting Card Generator",
    role: "Identity Management",
    icon: <User className="text-zinc-100" size={24} />,
    stack: ["React", "NextAuth", "Tailwind"],
    desc: "Digitizes professional identity assets with a streamlined 'Enter, Save, Generate' workflow.",
    features: [
      { label: "Dual-Theme", text: "Switch Light & Dark templates." },
      { label: "On-Demand", text: "Generate cards anytime." },
      { label: "Direct Email", text: "Dispatch to doctors instantly." }
    ],
    problemSolved: "Decoupled data from design."
  },
  {
    title: "Smart Poster Maker",
    role: "Design Automation",
    icon: <LayoutTemplate className="text-zinc-100" size={24} />,
    stack: ["HTML5 Canvas", "CSS Grid"],
    desc: "Specialized design tool automating placement and styling of corporate branding assets.",
    features: [
      { label: "Auto-Center", text: "Calculates geometric center." },
      { label: "Multi-Logo", text: "Aligns co-branding evenly." },
      { label: "Standardization", text: "Enforces consistency." }
    ],
    problemSolved: "Eliminated manual alignment struggles."
  },
  {
    title: "ID Card Maker",
    role: "Credential Management",
    icon: <CreditCard className="text-zinc-100" size={24} />,
    stack: ["Next.js", "DOM Rendering"],
    desc: "Comprehensive solution for managing employee credentials and automating ID production.",
    features: [
      { label: "Live Preview", text: "WYSIWYG editor." },
      { label: "Validation", text: "Prevents typos via dropdowns." },
      { label: "Auto-Format", text: "Adjusts fonts for long names." }
    ],
    problemSolved: "Reduced production time to seconds."
  },
  {
    title: "AI Background Remover",
    role: "Asset Processing",
    icon: <ImageIcon className="text-zinc-100" size={24} />,
    stack: ["Cloud AI", "Python", "Sharp"],
    desc: "Automates complex image processing to instantly isolate subjects with pixel-perfect precision.",
    features: [
      { label: "Auto-Masking", text: "Zero manual clipping." },
      { label: "Standardization", text: "Uniform headshot formatting." },
      { label: "Bulk Process", text: "50+ images in seconds." }
    ],
    problemSolved: "Replaced hours of Photoshop with AI."
  },
  {
    title: "Profile & Intelligence",
    role: "Security & Control",
    icon: <ShieldCheck className="text-zinc-100" size={24} />,
    stack: ["NextAuth", "E2EE", "JWT"],
    desc: "Unified command center combining user identity management with encrypted, structured intelligence gathering.",
    features: [
      { label: "Security", text: "2FA, Sessions & Triage." },
      { label: "Identity-Link", text: "Auto-tags feedback to IDs." },
      { label: "Data Control", text: "Permanent delete options." }
    ],
    problemSolved: "Empowered users & structured reporting."
  }
];

const NATIVE_APPS = {
  title: "Native Ecosystem",
  desc: "Expanded beyond the browser. Specialized compiled binaries for high-performance workflows.",
  features: [
    { name: "Android APK", detail: "Touch-optimized / On-the-go approvals", icon: <Smartphone size={16}/> },
    { name: "Windows EXE", detail: "Electron / Local asset loading", icon: <Terminal size={16}/> },
    { name: "Real-time Sync", detail: "Seamless state continuity", icon: <Zap size={16}/> }
  ]
};

// --- UTILS & COMPONENTS ---

// 1. Spotlight Card Component (Apple-style hover glow)
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-zinc-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 2. Section Header Component
const SectionHeader = ({ sub, title }: { sub: string, title: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-12 md:mb-20 border-l-2 border-white/10 pl-4 md:pl-6"
    >
      <h2 className="text-[10px] md:text-xs lg:text-sm font-mono text-zinc-500 mb-2 tracking-widest uppercase">
        {sub}
      </h2>
      <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white tracking-tight">
        {title}
      </h3>
    </motion.div>
  );
};

// 3. Apple-style Cyber Button
const InteractiveButton = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => {
  return (
    <button className="group relative w-full px-6 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between overflow-hidden bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10 hover:border-white/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer rounded-lg">
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 ease-in-out group-hover:left-full z-0" />
      <span className="relative z-10">{children}</span>
      <Icon size={16} className="relative z-10 text-white/50 group-hover:text-white transition-colors" />
    </button>
  );
};

export default function CaseStudySection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create smooth buttery spring physics for the parallax values
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Different parallax speeds for layers
  const ySlow = useTransform(smoothProgress, [0, 1], [0, 50]);
  const yFast = useTransform(smoothProgress, [0, 1], [0, -50]);
  const opacityFade = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-transparent text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white py-12 md:py-24 z-10">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- 1. EXECUTIVE SUMMARY --- */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 mb-20 md:mb-32 items-end">
           <motion.div 
             style={{ y: ySlow, opacity: opacityFade }}
             className="border-l-2 border-white/10 pl-4 md:pl-6"
           >
              <h2 className="text-[10px] md:text-xs lg:text-sm font-mono text-zinc-500 mb-2 tracking-widest uppercase">
                Case Study
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-4 md:mb-6">
                SSI<span className="text-zinc-600">STUDIOS</span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-zinc-400 font-light leading-relaxed max-w-xl">
                A custom workflow solution bridging the gap between data management and graphic design. 
                By automating "busy work," we empower the <span className="text-white font-medium">SSimaya Team</span> to focus on high-value creative tasks.
              </p>
           </motion.div>

           <motion.div 
             style={{ y: yFast, opacity: opacityFade }}
             className="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto"
           >
              <SpotlightCard className="w-full lg:w-auto rounded-lg backdrop-blur-md">
                <div className="flex justify-between lg:justify-end items-center gap-4 px-4 py-3 md:px-6 md:py-4 cursor-pointer hover:bg-white/5 transition-colors">
                   <div className="text-left lg:text-right">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Project Lead</p>
                      <p className="text-xs md:text-sm font-bold text-white">Puneet Shukla</p>
                   </div>
                   <div className="h-8 w-px bg-white/10"></div>
                   <div className="text-left lg:text-right">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Supervision</p>
                      <p className="text-xs md:text-sm font-bold text-white">Naveen A. Kumar</p>
                   </div>
                </div>
              </SpotlightCard>
           </motion.div>
        </div>

        {/* --- 2. PROBLEM VS SOLUTION --- */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-20 md:mb-32">
          {/* Problem Card (Moves slower for depth) */}
          <motion.div style={{ y: ySlow }}>
            <SpotlightCard className="h-full rounded-2xl bg-zinc-900/30 backdrop-blur-md cursor-pointer">
              <div className="p-6 md:p-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4 md:mb-6 text-red-400/80">
                  <div className="p-2 bg-red-500/10 rounded-full ring-1 ring-red-500/20">
                    <AlertTriangle size={18} />
                  </div>
                  <h2 className="text-xs md:text-sm font-mono uppercase tracking-widest">The Bottleneck</h2>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-zinc-400 leading-relaxed mb-6 md:mb-8 flex-grow">
                  Designers were manually editing hundreds of files for bulk orders, leading to burnout. 
                  Client data lived in spreadsheets while designs lived in Photoshop—a disconnect causing 
                  frequent synchronization errors and wasted hours on administrative labor.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="px-3 py-1 bg-red-500/5 border border-red-500/10 text-red-400/70 text-[10px] uppercase tracking-wider rounded-full">Wasted Time</span>
                  <span className="px-3 py-1 bg-red-500/5 border border-red-500/10 text-red-400/70 text-[10px] uppercase tracking-wider rounded-full">Scattered Data</span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Solution Card (Moves faster for depth) */}
          <motion.div style={{ y: yFast }}>
            <SpotlightCard className="h-full rounded-2xl bg-zinc-900/30 backdrop-blur-md cursor-pointer">
              <div className="p-6 md:p-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4 md:mb-6 text-emerald-400/80">
                   <div className="p-2 bg-emerald-500/10 rounded-full ring-1 ring-emerald-500/20">
                    <CheckCircle2 size={18} />
                  </div>
                  <h2 className="text-xs md:text-sm font-mono uppercase tracking-widest">The Ecosystem</h2>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-zinc-400 leading-relaxed mb-6 md:mb-8 flex-grow">
                  We built a unified ecosystem where design tools and databases coexist. 
                  SSISTUDIOS integrates seven specific tools into one dashboard, acting as the "Single Source of Truth" 
                  and automating asset generation instantly.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/70 text-[10px] uppercase tracking-wider rounded-full">Automation</span>
                  <span className="px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/70 text-[10px] uppercase tracking-wider rounded-full">Centralization</span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* --- 3. MODULE DEEP DIVE --- */}
        <SectionHeader sub="System Architecture" title="Core Modules." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20 md:mb-32">
          {MODULES.map((mod, idx) => (
            <motion.div
              key={idx}
              // Staggered fade in
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightCard className="h-full rounded-2xl bg-zinc-900/20 backdrop-blur-sm cursor-pointer">
                <div className="p-6 md:p-8 h-full flex flex-col">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl shadow-lg group-hover:bg-zinc-800 transition-colors">
                      {mod.icon}
                    </div>
                  </div>

                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-[10px] md:text-xs font-mono text-zinc-600 uppercase tracking-widest mb-4">{mod.role}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mod.stack.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-zinc-500 group-hover:border-white/10 group-hover:text-zinc-400 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
                    {mod.desc}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {mod.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start text-[10px] md:text-xs text-zinc-500">
                        <ArrowRight size={12} className="mr-2 mt-0.5 text-zinc-600 shrink-0 group-hover:text-cyan-500 transition-colors" />
                        <span>
                          <strong className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{feat.label}:</strong> {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Impact Footer */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                     <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Impact</p>
                     <p className="text-[10px] md:text-xs text-zinc-400 italic border-l-2 border-white/10 pl-3 group-hover:border-cyan-500/50 group-hover:text-zinc-300 transition-all">
                       "{mod.problemSolved}"
                     </p>
                  </div>

                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* --- 4. NATIVE APPS --- */}
        <SectionHeader sub="Cross Platform" title="Native Ecosystem." />

        <motion.div 
          className="relative mb-20 md:mb-32"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle Ambient Glow behind this section */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-20 pointer-events-none" />
          
          <SpotlightCard className="bg-black/40 backdrop-blur-xl rounded-2xl relative">
             <div className="p-6 md:p-12 relative z-10 grid md:grid-cols-3 gap-8 md:gap-16">
               <div className="md:col-span-1 flex flex-col justify-center">
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{NATIVE_APPS.title}</h3>
                 <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-8">
                   {NATIVE_APPS.desc}
                 </p>
                 <div className="flex flex-col gap-4">
                    <InteractiveButton icon={Download}>Download APK</InteractiveButton>
                    <InteractiveButton icon={Download}>Windows EXE</InteractiveButton>
                 </div>
               </div>

               <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {NATIVE_APPS.features.map((feat, i) => (
                   <div key={i} className="group/feature p-6 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all flex flex-col justify-center items-center text-center cursor-pointer">
                     <div className="text-zinc-500 mb-4 group-hover/feature:text-white group-hover/feature:scale-110 transition-all duration-300">{feat.icon}</div>
                     <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-2">{feat.name}</h5>
                     <p className="text-[10px] text-zinc-500 font-mono group-hover/feature:text-zinc-400 transition-colors">{feat.detail}</p>
                   </div>
                 ))}
               </div>
             </div>
          </SpotlightCard>
        </motion.div>

        {/* --- 5. CONCLUSION --- */}
        <div className="text-center max-w-2xl mx-auto pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Database className="mx-auto text-zinc-700 mb-6" size={32} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-white mb-6"
          >
            Workflow Transformed.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-zinc-400 leading-loose"
          >
            SSISTUDIOS has successfully migrated our operations from manual to automated. 
            By centralizing data and automating design generation, we have significantly 
            reduced turnaround times. This project ensures our team spends their time 
            <span className="text-white font-medium border-b border-white/20 pb-0.5"> designing, not typing.</span>
          </motion.p>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
          <p className="mt-8 text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
            End of Report // Status: Complete
          </p>
        </div>

      </div>
    </section>
  );
}