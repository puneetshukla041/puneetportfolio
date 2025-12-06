'use client';
import React, { useState, useEffect } from 'react';
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue, 
  useSpring, 
  useTransform,
  AnimatePresence
} from 'framer-motion';
import { 
  Mail, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  FileDown, 
  Check, 
  Clock, 
  Building2,
  Briefcase
} from 'lucide-react';

// --- UTILS ---

// 1. Live Clock Hook
const useTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
};

// 2. 3D Tilt Card (Adapted to match SelectedWorks aesthetic)
const TiltCard = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-2deg", "2deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ perspective: 1000, rotateX, rotateY }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden transform-gpu hover:border-white/20 transition-colors ${className}`}
    >
      {/* Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.06),
              transparent 40%
            )
          `,
        }}
      />
      {/* Content Layer */}
      <div className="relative h-full flex flex-col z-20">{children}</div>
    </motion.div>
  );
};

// 3. Shimmer Social Pill (Retained & Styled)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocialPill = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="relative flex items-center justify-between w-full p-4 bg-black/20 rounded-xl group overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
  >
    <div className="flex items-center gap-3 relative z-10">
      <div className="p-2 bg-white/5 rounded-full text-zinc-100 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{label}</span>
    </div>
    <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all relative z-10" />
  </a>
);

export default function HireMeSection() {
  const [copied, setCopied] = useState(false);
  const currentTime = useTime();
  const email = "puneet.shukla@example.com"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // Updated bg-black to bg-transparent to match the section above
    <section className="relative min-h-screen bg-transparent text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white overflow-hidden py-12 md:py-20 lg:py-32 z-10">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- HEADER ALIGNMENT (Matches SelectedWorks) --- */}
        <div className="mb-12 md:mb-20 lg:mb-32 border-l-2 border-white/10 pl-4 md:pl-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            
            </span>
        
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Ready to join your <br className="hidden md:block"/> engineering team.
          </h3>
        </div>

        {/* --- CONTENT COLUMNS (Matches SelectedWorks) --- */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Narrative & Primary Action (5/12 width equivalent) */}
          <div className="w-full lg:w-5/12 space-y-8 md:space-y-12 order-1">
            
            {/* Intro Text */}
            <div className="space-y-4">
               <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-light">
                I am seeking a full-time Software Engineer role. I bring full-stack expertise, a product-first mindset, and day-one impact.
              </p>
              <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-light">
                Currently interviewing for frontend and full-stack positions.
              </p>
            </div>

            {/* Primary Action: Email Copy (The "Recruit Me" Logic) */}
            <div className="pt-2">
               <div className="flex items-center gap-2 mb-4 text-zinc-100">
                  <Briefcase size={18} />
                  <span className="text-sm font-semibold uppercase tracking-wider">Hiring?</span>
               </div>
               
               <button 
                 onClick={handleCopy}
                 className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 bg-white text-black px-6 md:px-8 py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
               >
                 <div className="flex items-center gap-3">
                   {copied ? <Check size={20} /> : <Mail size={20} />}
                   <span>{copied ? "Email Copied!" : "Copy Email Address"}</span>
                 </div>
                 {!copied && (
                    <span className="text-xs font-mono text-zinc-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                        {email}
                    </span>
                 )}
               </button>
               <p className="text-[10px] text-zinc-600 mt-3 ml-1 leading-snug">
                 *Click to copy my direct email to your clipboard.
               </p>
            </div>

          </div>

          {/* Right Column: Visual Grid (7/12 width equivalent) */}
          <div className="w-full lg:w-7/12 order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

              {/* Card 1: Resume */}
              <TiltCard className="col-span-1 min-h-[240px] flex flex-col justify-between p-6 md:p-8 cursor-pointer group">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-zinc-100 mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <FileDown size={20} />
                    </div>
                    <h4 className="text-lg font-semibold text-zinc-100">My Resume</h4>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      View professional history & stack.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between w-full pt-4 border-t border-white/5 mt-4 text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                    <span>Download PDF</span>
                    <ArrowUpRight size={14} />
                  </div>
              </TiltCard>

              {/* Card 2: Location */}
              <TiltCard className="col-span-1 min-h-[240px] flex flex-col justify-between p-6 md:p-8 relative overflow-hidden">
                  {/* Abstract Map BG */}
                  <div className="absolute inset-0 opacity-10 grayscale mix-blend-overlay" style={{ background: 'radial-gradient(circle at center, #666 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-zinc-500 mb-6">
                      <Building2 size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Base</span>
                    </div>
                    <div className="flex items-end gap-2 mb-1">
                       <h5 className="text-2xl font-bold text-white">India</h5>
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mb-2 animate-pulse" />
                    </div>
                    <p className="text-zinc-500 text-xs">Relocatable / Remote</p>
                  </div>

                  <div className="relative z-10 mt-auto inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/5 w-fit">
                    <Clock size={12} className="text-emerald-500" />
                    <span className="text-[10px] font-mono text-zinc-300">{currentTime} IST</span>
                  </div>
              </TiltCard>

              {/* Card 3: Socials (Full Width) */}
              <TiltCard className="col-span-1 md:col-span-2 p-6 md:p-8">
                <h5 className="text-sm font-semibold text-zinc-300 mb-6 flex items-center gap-2">
                   Online Profiles
                   <div className="h-px bg-white/5 flex-grow ml-4" />
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SocialPill icon={Linkedin} label="LinkedIn" href="#" />
                  <SocialPill icon={Github} label="GitHub" href="#" />
                </div>
              </TiltCard>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}