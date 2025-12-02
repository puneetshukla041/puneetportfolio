'use client';

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ArrowUpRight,
  CreditCard, 
  ImageIcon, 
  Users, 
  Smartphone, 
  Code, 
  Zap,
  Lock,
  Download,
  FileText,
  Terminal,
  Cpu,
  Linkedin,
  Server,
  Cloud,
  Palette,
  Bug
} from 'lucide-react';

// --- Types ---
interface SectionHeaderProps {
  number: string;
  title: string;
}

interface FeatureItem {
  title: string;
  points: string[];
  icon: React.ReactNode;
}

interface NativeFeature {
  name: string;
  detail: string;
  icon: React.ReactNode;
}

// --- MAX POWER CINEMATIC CSS ---
const customStyles = `
  :root {
    --bg-void: #020202;
    --neon-cyan: #00f3ff;
    --neon-purple: #bc13fe;
    --glass-surface: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
  }

  body {
    background-color: var(--bg-void);
    color: #e0e0e0;
    overflow-x: hidden;
  }

  /* --- ATMOSPHERE --- */
  .cinematic-grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  .scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 10;
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
    background-size: 100% 4px;
    opacity: 0.15;
  }

  .nebula-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0, 243, 255, 0.08) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
    animation: drift 20s infinite alternate ease-in-out;
  }

  @keyframes drift {
    0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    100% { transform: translate(50px, -50px) scale(1.1); opacity: 0.8; }
  }

  /* --- INTERACTIVE HUD CARDS --- */
  .hud-card {
    position: relative;
    background: linear-gradient(180deg, rgba(15,15,15,0.8) 0%, rgba(5,5,5,0.9) 100%);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(12px);
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer; /* FORCE CURSOR POINTER */
    overflow: hidden;
  }

  .hud-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%);
    opacity: 0;
    transition: opacity 0.5s;
  }

  .hud-card:hover {
    transform: translateY(-5px) scale(1.01);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 50px rgba(0, 243, 255, 0.05);
  }

  .hud-card:hover::after {
    opacity: 1;
  }
   
  .hud-card:hover .icon-glow {
    color: #fff;
    filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
    transform: scale(1.1);
  }

  /* --- TYPOGRAPHY --- */
  .title-cinematic {
    font-weight: 900;
    letter-spacing: -0.04em;
    background: linear-gradient(180deg, #fff 0%, #aaa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 30px rgba(255,255,255,0.15));
  }

  .text-mono-glow {
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
  }

  /* --- BUTTONS --- */
  .btn-cyber {
    position: relative;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    color: #fff;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer; /* FORCE CURSOR POINTER */
  }

  .btn-cyber::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .btn-cyber:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.5);
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
  }

  .btn-cyber:hover::before {
    left: 100%;
  }

  .tech-pill {
    cursor: pointer;
    transition: all 0.3s;
  }
  .tech-pill:hover {
    background: rgba(255,255,255,0.1);
    border-color: var(--neon-cyan);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
    transform: translateY(-2px);
  }
`;

// --- Data (Simplified, no stats) ---
const FEATURE_DATA: FeatureItem[] = [
  {
    title: "Certificate Generator",
    points: [
      "Generates certificates using 4 pre-made templates.",
      "Sends emails directly to doctors (via SMTP), no Gmail needed.",
      "Instantly exports data to Excel and PDF formats.",
      "Includes a dashboard to track all training data in one place."
    ],
    icon: <FileText size={20} />
  },
  {
    title: "Poster Editor",
    points: [
      "Drag & drop multiple logos easily.",
      "Automatically adjusts size, height, and position of logos.",
      "Exports high-quality 300 DPI images for printing.",
      "Automatically saves all designs to the cloud (AWS S3)."
    ],
    icon: <ImageIcon size={20} />
  },
  {
    title: "Background Remover",
    points: [
      "Instantly removes the background from any photo.",
      "Works automatically—no manual editing required.",
      "Prepares photos perfectly for ID cards and posters.",
    ],
    icon: <Zap size={20} />
  },
  {
    title: "ID Card Maker",
    points: [
      "Upload a photo -> Background removed -> Centered automatically.",
      "Fills in employee details from the database.",
      "Generates a final ID card ready for print.",
      "Saves the final card directly to AWS storage."
    ],
    icon: <CreditCard size={20} />
  },
  {
    title: "Visiting Card Manager",
    points: [
      "Save doctor details (Name, Hospital, Email) securely.",
      "Generate cards in both Light and Dark themes instantly.",
      "Export as print-ready PDFs.",
      "All files are backed up to the cloud."
    ],
    icon: <Users size={20} />
  },
  {
    title: "Report a Bug",
    points: [
      "Found an issue? Report it directly here.",
      "Sends feedback straight to the developer team.",
      "Helps fix software problems faster."
    ],
    icon: <Bug size={20} />
  },
  {
    title: "Theme Manager",
    points: [
      "Switch the look of the app instantly.",
      "Change colors and styles with one click.",
      "Ensures the app is easy to read for everyone."
    ],
    icon: <Palette size={20} />
  },
  {
    title: "User Profile",
    points: [
      "Manage your login details and password.",
      "Control who can access different parts of the app.",
      "Keeps your session secure and private."
    ],
    icon: <Lock size={20} />
  }
];

const NATIVE_APPS = {
  title: "Native Ecosystem",
  desc: "Expanded beyond the browser. Specialized compiled binaries for high-performance workflows.",
  features: [
    { name: "Android APK", detail: "Touch-optimized / On-the-go approvals", icon: <Smartphone size={16}/> },
    { name: "Windows EXE", detail: "Electron / Local asset loading", icon: <Terminal size={16}/> },
    { name: "Real-time Sync", detail: "Seamless state continuity", icon: <Zap size={16}/> }
  ] as NativeFeature[]
};

// MNC-Ready Tech Stack
const TECH_STACK_CORE = [
  "Next.js 14", "TypeScript", "React", "Tailwind CSS"
];

const TECH_STACK_INFRA = [
  "AWS S3", "AWS SES", "Docker", "MongoDB", "Redis"
];

const TECH_STACK_OPS = [
  "CI/CD", "Jest Testing", "Electron", "Git/GitHub"
];

// --- Components ---

const SectionHeader = ({ number, title }: SectionHeaderProps) => (
  <div className="flex items-center gap-6 mb-16 opacity-80">
    <span className="font-mono text-xs text-cyan-400/80 border border-cyan-500/30 px-3 py-1 rounded backdrop-blur-md shadow-[0_0_10px_rgba(0,243,255,0.1)]">
      {number}
    </span>
    <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/80 text-mono-glow">
      {title}
    </h3>
    <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-grow"></div>
  </div>
);

const CredentialBox = () => {
  const [copiedUser, setCopiedUser] = useState<boolean>(false);
  const [copiedPass, setCopiedPass] = useState<boolean>(false);

  const copyToClipboard = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-12">
      <a 
        href="https://ssistudios.vercel.app/" 
        target="_blank" 
        rel="noreferrer"
        className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-widest transition-all hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] cursor-pointer"
      >
        <div className="absolute inset-0 bg-white group-hover:bg-cyan-400 transition-colors z-0"></div>
        <span className="relative z-10 flex items-center gap-2">
          Initialize <ArrowUpRight size={16} strokeWidth={3} />
        </span>
      </a>
      
      <div className="flex items-center bg-black/40 border border-white/10 backdrop-blur-xl px-6 py-3 gap-8 hover:border-white/30 transition-colors">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => copyToClipboard('ssi', setCopiedUser)}>
          <div className="flex flex-col">
            <span className="text-[9px] text-cyan-400/60 font-mono uppercase tracking-widest group-hover:text-cyan-400 transition-colors">ID</span>
            <span className="text-sm font-mono text-white tracking-widest">ssi</span>
          </div>
          <button className="text-white/20 group-hover:text-cyan-400 transition-colors">
            {copiedUser ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        
        <div className="w-px h-8 bg-white/10"></div>

        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => copyToClipboard('ssi', setCopiedPass)}>
          <div className="flex flex-col">
            <span className="text-[9px] text-cyan-400/60 font-mono uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Key</span>
            <span className="text-sm font-mono text-white tracking-widest">ssi</span>
          </div>
          <button className="text-white/20 group-hover:text-cyan-400 transition-colors">
            {copiedPass ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProjectShowcase() {
  
  return (
    <div className="min-h-screen font-sans antialiased overflow-hidden selection:bg-cyan-500/30 selection:text-white pb-32">
      <style>{customStyles}</style>

      {/* Cinematic Layers */}
      <div className="cinematic-grain"></div>
      <div className="scanlines"></div>
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="nebula-glow top-[-10%] right-[-10%] bg-blue-500/10"></div>
          <div className="nebula-glow bottom-[-10%] left-[-10%] bg-purple-500/10" style={{ animationDelay: '-10s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        {/* --- HEADER --- */}
        <header className="mb-32 flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">System Online</span>
            </div>
            <h1 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-2">
              Portfolio_SEC_03 // Enterprise_V1
            </h1>
            <h2 className="text-4xl font-bold tracking-tighter text-white title-cinematic">
              SELECTED WORKS
            </h2>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Build Year</p>
            <p className="text-xl font-bold text-white tracking-widest font-mono">2025</p>
          </div>
        </header>

        {/* --- MAIN SHOWCASE --- */}
        <main>
          
          <div className="grid lg:grid-cols-12 gap-16 mb-40 items-end">
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white mb-6 title-cinematic leading-[0.85]">
                  SSI<br/><span className="text-white/10 stroke-text">STUDIOS</span>
                </h1>
              </div>

              <div className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl">
                Enterprise automated design ecosystem. <br/>
                Replacing manual workflows with intelligent, <span className="text-cyan-400 font-medium drop-shadow-lg">Cloud-Native Automation.</span>
              </div>

              <CredentialBox />
            </div>

            {/* --- PROJECT HUD SPECS --- */}
            <div className="lg:col-span-5">
               <div className="hud-card p-8 group">
                  <div className="absolute top-0 right-0 p-2 opacity-50">
                    <Cpu size={20} className="text-white/20" />
                  </div>
                  
                  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">Project Details</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                      <div className="col-span-2">
                      <p className="text-[9px] uppercase text-white/40 mb-2 tracking-widest">Affiliation</p>
                      <p className="text-white font-bold text-lg tracking-wide">
                        SS Innovations International
                      </p>
                      <p className="text-xs text-white/50 mt-1 font-mono">Role: Software Engineer (Full Stack)</p>
                    </div>
                    
                    <div>
                      <p className="text-[9px] uppercase text-white/40 mb-2 tracking-widest">Lead Engineer</p>
                      <div className="flex items-center gap-3">
                        <p className="text-white font-medium text-sm">Puneet Shukla</p>
                        <a 
                          href="https://www.linkedin.com/in/puneet-shukla-72b915225/" 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[#0077b5] hover:text-white transition-colors p-1 hover:bg-[#0077b5] rounded"
                        >
                          <Linkedin size={14} />
                        </a>
                      </div>
                    </div>

                    <div>
                        <p className="text-[9px] uppercase text-white/40 mb-2 tracking-widest">Mentorship</p>
                        <div className="flex items-center gap-3">
                            <p className="text-white font-medium text-sm">Naveen A. Kumar</p>
                            <a 
                              href="https://www.linkedin.com/in/naveen-ajay-kumar-s-99184770/" 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[#0077b5] hover:text-white transition-colors p-1 hover:bg-[#0077b5] rounded"
                            >
                                <Linkedin size={14} />
                            </a>
                        </div>
                    </div>

                    <div className="col-span-2 pt-6 border-t border-white/5">
                        <p className="text-[9px] uppercase text-white/40 mb-4 tracking-widest">Core Tech</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="tech-pill px-4 py-1.5 text-[10px] text-white/90 border border-white/10 bg-white/5 uppercase tracking-wider">AWS Cloud</span>
                          <span className="tech-pill px-4 py-1.5 text-[10px] text-white/90 border border-white/10 bg-white/5 uppercase tracking-wider">MERN Stack</span>
                          <span className="tech-pill px-4 py-1.5 text-[10px] text-white/90 border border-white/10 bg-white/5 uppercase tracking-wider">Microservices</span>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* --- CHALLENGE / SOLUTION (Simplified) --- */}
          <div className="grid md:grid-cols-2 gap-16 mb-40">
            <div className="hud-card p-10 border-l-4 border-l-red-500/50">
              <h3 className="text-white font-bold text-2xl mb-6 tracking-wide flex items-center gap-3">
                <span className="text-red-500 text-xs font-mono uppercase tracking-widest border border-red-500/30 px-2 py-1 bg-red-500/10">[THE PROBLEM]</span>
                Manual Work
              </h3>
              <p className="text-white/60 leading-loose text-base">
                Designers were tired of manually editing hundreds of files. Data was scattered across Excel and Photoshop, causing mistakes, version conflicts, and very long delays in getting work done.
              </p>
            </div>
            <div className="hud-card p-10 border-l-4 border-l-emerald-500/50">
              <h3 className="text-white font-bold text-2xl mb-6 tracking-wide flex items-center gap-3">
                <span className="text-emerald-500 text-xs font-mono uppercase tracking-widest border border-emerald-500/30 px-2 py-1 bg-emerald-500/10">[THE SOLUTION]</span>
                Automation
              </h3>
              <p className="text-white/60 leading-loose text-base">
                We built one central system. Now, data is safely stored in <span className="text-white">MongoDB</span> and images are created automatically using <span className="text-white">AWS</span>. Jobs that used to take days now take just a few seconds.
              </p>
            </div>
          </div>

          {/* --- MODULES GRID --- */}
          <SectionHeader number="01" title="System Features" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {FEATURE_DATA.map((feature, idx) => (
              <div 
                key={idx}
                className="hud-card p-8 group"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="text-white/40 icon-glow transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-white font-bold text-xl mb-3 tracking-wide group-hover:text-cyan-400 transition-colors">{feature.title}</h4>
                
                {/* Updated List Rendering */}
                <ul className="space-y-2 mt-4">
                  {feature.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start text-white/50 text-xs font-mono leading-relaxed">
                      <span className="text-cyan-400 mr-2">➜</span>
                      {point}
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>

          {/* --- NATIVE APPS --- */}
          <SectionHeader number="02" title="Native Ecosystem" />

          <div className="relative mb-32 group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-12 relative overflow-hidden rounded-xl">
               <div className="grid md:grid-cols-3 gap-16 relative z-10">
                 <div className="md:col-span-1 flex flex-col justify-center">
                   <h3 className="text-3xl font-bold text-white mb-4">{NATIVE_APPS.title}</h3>
                   <p className="text-white/50 text-sm leading-relaxed mb-8">
                     {NATIVE_APPS.desc}
                   </p>
                   <div className="flex flex-col gap-4">
                      <button className="btn-cyber px-6 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between group/btn">
                        <span>Download APK</span>
                        <Download size={16} className="text-white/50 group-hover/btn:text-white transition-colors" />
                      </button>
                      <button className="btn-cyber px-6 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between group/btn">
                        <span>Windows EXE</span>
                        <Download size={16} className="text-white/50 group-hover/btn:text-white transition-colors" />
                      </button>
                   </div>
                 </div>

                 <div className="md:col-span-2 grid sm:grid-cols-3 gap-4">
                   {NATIVE_APPS.features.map((feat, i) => (
                     <div key={i} className="hud-card p-6 flex flex-col justify-center items-center text-center">
                       <div className="text-white/60 mb-4 icon-glow">{feat.icon}</div>
                       <h5 className="text-white text-sm font-bold uppercase tracking-wider mb-2">{feat.name}</h5>
                       <p className="text-[10px] text-white/40 font-mono">{feat.detail}</p>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          {/* --- ARCHITECTURE --- */}
          <SectionHeader number="03" title="Enterprise Tech Stack" />
          
          <div className="mb-24 pb-20 space-y-8">
            {/* Front End & Core */}
            <div>
              <p className="text-[10px] uppercase text-white/40 mb-3 tracking-widest flex items-center gap-2">
                <Code size={12}/> Frontend & Core
              </p>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK_CORE.map((tech, idx) => (
                  <span key={idx} className="tech-pill px-8 py-4 text-xs text-white/80 font-bold uppercase tracking-widest border border-white/10 bg-white/[0.02]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud & Backend */}
            <div>
              <p className="text-[10px] uppercase text-white/40 mb-3 tracking-widest flex items-center gap-2">
                <Cloud size={12}/> Cloud Infrastructure (AWS)
              </p>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK_INFRA.map((tech, idx) => (
                  <span key={idx} className="tech-pill px-8 py-4 text-xs text-cyan-400/80 font-bold uppercase tracking-widest border border-cyan-500/20 bg-cyan-500/[0.05]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

             {/* DevOps */}
             <div>
              <p className="text-[10px] uppercase text-white/40 mb-3 tracking-widest flex items-center gap-2">
                <Server size={12}/> DevOps & Security
              </p>
              <div className="flex flex-wrap gap-3">
                {TECH_STACK_OPS.map((tech, idx) => (
                  <span key={idx} className="tech-pill px-8 py-4 text-xs text-white/60 uppercase tracking-widest border border-white/5 bg-white/[0.02]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </main>

        {/* --- FOOTER --- */}
        <footer className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-[10px] font-mono uppercase tracking-widest">
          <p>© 2025 SS Innovations International. All Rights Reserved.</p>
          <div className="flex gap-12">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-red-500 cursor-pointer transition-colors">Terminate Session</span>
          </div>
        </footer>

      </div>
    </div>
  );
}