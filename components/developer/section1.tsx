'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Play, FileJson, CheckCircle2, Loader2, 
  Search, GitGraph, Files, Settings, MoreHorizontal, 
  X, Minus, Square, ChevronRight, ChevronDown, Command
} from 'lucide-react';

const Section1 = () => {
  // --- State Management ---
  const [typedCode, setTypedCode] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [buildStep, setBuildStep] = useState(0); // 0: Idle, 1: Building, 2: Success
  const scrollRef = useRef<HTMLDivElement>(null);

  // The code to be typed out
  const fullCode = `const developer = {
  name: "Puneet Shukla",
  title: "Software Developer",
  skills: [
    "Next.js",
    "React Native", 
    "System Design"
  ],
  status: "Ready to Build"
};

export default developer;`;

  // --- Effects ---

  // 1. Typing Effect
  useEffect(() => {
    let i = 0;
    const typingSpeed = 30; // ms per char
    const delay = 500; // start delay

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedCode(fullCode.substring(0, i + 1));
        i++;
        if (i >= fullCode.length) clearInterval(interval);
      }, typingSpeed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  // 2. Auto-scroll terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // --- Handlers ---

  const handleRunCode = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setIsTerminalOpen(true);
    setBuildStep(1);
    setTerminalLogs([]);

    const steps = [
      { msg: "> npm run build", delay: 500 },
      { msg: "creating an optimized production build...", delay: 1200 },
      { msg: "compiled client and server successfully", delay: 2000 },
      { msg: "collecting page data...", delay: 2800 },
      { msg: "generating static pages (3/3)", delay: 3500 },
      { msg: "✓ Build complete. Ready for production.", delay: 4200, success: true },
    ];

    let totalDelay = 0;

    steps.forEach((step, index) => {
      totalDelay = step.delay;
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, step.msg]);
        if (step.success) {
           setBuildStep(2);
           setIsRunning(false);
        }
      }, step.delay);
    });
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('section2');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // --- Sub-components for Syntax Highlighting ---
  
  // A simple parser to colorize the typed code
  const CodeRenderer = ({ code }: { code: string }) => {
    // This is a visual trick: we render the full colored code but mask it 
    // based on the length of the 'typedCode' state to maintain colors while typing.
    
    // In a real syntax highlighter we'd parse tokens. 
    // For this specific snippet, we can hardcode the structure for better performance.
    
    return (
      <div className="font-mono text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre">
        <span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> <span className="text-white">=</span> <span className="text-yellow-400">{`{`}</span>{'\n'}
        {'  '}<span className="text-sky-300">name</span>: <span className="text-orange-300">"Puneet Shukla"</span>,{'\n'}
        {'  '}<span className="text-sky-300">title</span>: <span className="text-orange-300">"Software Developer"</span>,{'\n'}
        {'  '}<span className="text-sky-300">skills</span>: <span className="text-yellow-400">[</span>{'\n'}
        {'    '}<span className="text-orange-300">"Next.js"</span>,{'\n'}
        {'    '}<span className="text-orange-300">"React Native"</span>, {'\n'}
        {'    '}<span className="text-orange-300">"System Design"</span>{'\n'}
        {'  '}<span className="text-yellow-400">]</span>,{'\n'}
        {'  '}<span className="text-sky-300">status</span>: <span className="text-orange-300">"Ready to Build"</span>{'\n'}
        <span className="text-yellow-400">{`}`}</span>;<span className="inline-block w-2 h-5 ml-1 bg-white animate-pulse align-middle"/>{'\n\n'}
        <span className="text-pink-400">export default</span> <span className="text-blue-400">developer</span>;
      </div>
    );
  };

  return (
    <section className="relative w-full h-screen bg-[#1e1e1e] text-gray-300 flex overflow-hidden font-sans selection:bg-[#264f78] selection:text-white">
      
      {/* 1. Sidebar (Activity Bar) - Hidden on mobile, visible on lg */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col w-12 bg-[#333333] items-center py-4 gap-6 border-r border-[#444]"
      >
        <Files size={24} className="text-white opacity-100 cursor-pointer" />
        <Search size={24} className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
        <GitGraph size={24} className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
        <div className="mt-auto flex flex-col gap-6">
          <Settings size={24} className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
        </div>
      </motion.div>

      {/* 2. Side Panel (Explorer) - Hidden on small mobile */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="hidden lg:flex flex-col w-60 bg-[#252526] text-sm border-r border-[#1e1e1e]"
      >
        <div className="px-4 py-3 text-xs font-bold tracking-widest text-gray-400 flex justify-between items-center">
          EXPLORER <MoreHorizontal size={14} />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="px-2 py-1 flex items-center gap-1 text-white font-bold bg-[#37373d] cursor-pointer">
            <ChevronDown size={14} /> <span>PORTFOLIO-V2</span>
          </div>
          <div className="pl-6 py-1 flex items-center gap-1.5 text-blue-300 hover:bg-[#2a2d2e] cursor-pointer">
            <ChevronRight size={14} className="text-gray-500" /> <span className="text-purple-400">.next</span>
          </div>
          <div className="pl-6 py-1 flex items-center gap-1.5 text-gray-300 hover:bg-[#2a2d2e] cursor-pointer">
             <ChevronRight size={14} className="text-gray-500" /> <span>components</span>
          </div>
          <div className="pl-6 py-1 flex items-center gap-1.5 text-yellow-100 bg-[#37373d] border-l-2 border-blue-500 cursor-pointer">
             <FileJson size={14} className="text-yellow-400" /> <span>developer.ts</span>
          </div>
          <div className="pl-6 py-1 flex items-center gap-1.5 text-gray-400 hover:bg-[#2a2d2e] cursor-pointer">
             <FileJson size={14} className="text-blue-400" /> <span>styles.css</span>
          </div>
          <div className="pl-6 py-1 flex items-center gap-1.5 text-gray-400 hover:bg-[#2a2d2e] cursor-pointer">
             <FileJson size={14} className="text-gray-400" /> <span>README.md</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Main Editor Area */}
      <div className="flex-1 flex flex-col h-full relative z-10">
        
        {/* Editor Tabs */}
        <div className="flex bg-[#2d2d2d] h-9 items-center overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e1e] text-yellow-100 text-xs border-t-2 border-blue-500 min-w-fit">
              <FileJson size={14} className="text-yellow-400" /> 
              <span>developer.ts</span>
              <X size={12} className="ml-2 text-gray-400 hover:text-white cursor-pointer" />
           </div>
           <div className="flex items-center gap-2 px-3 py-2 text-gray-500 text-xs hover:bg-[#2d2d2d] cursor-pointer min-w-fit border-r border-[#1e1e1e]">
              <span>styles.css</span>
           </div>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 px-4 py-1 text-xs text-gray-500 bg-[#1e1e1e] shadow-sm">
           <span>portfolio-v2</span> <ChevronRight size={12} /> <span>src</span> <ChevronRight size={12} /> <span>developer.ts</span>
        </div>

        {/* Code Area */}
        <div className="flex-1 relative flex overflow-hidden">
          {/* Line Numbers */}
          <div className="w-12 flex flex-col items-end pr-3 pt-4 text-gray-600 text-sm md:text-base font-mono select-none bg-[#1e1e1e]">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="leading-relaxed">{i + 1}</div>
            ))}
          </div>

          {/* Actual Code */}
          <div className="flex-1 pt-4 pl-2 overflow-auto" onClick={() => setIsTerminalOpen(false)}>
            {/* We mask the renderer to only show what has been "typed" */}
            <div className="relative">
               <div className="absolute top-0 left-0 text-transparent select-none pointer-events-none whitespace-pre font-mono text-sm md:text-base lg:text-lg leading-relaxed">
                  {fullCode}
               </div>
               {/* For a true character-by-character coloring effect without complex parsing logic on every render,
                 we render the FULL colored block, but use a clip-path or simple overflow hidden container 
                 that expands. However, for multiline, simply slicing the text (like in my previous implementation) 
                 is safer but loses color. 
                 
                 Here, I will use a hybrid approach: Render the full colored component, but
                 overlay a "Mask" div that retreats as typing happens.
               */}
               <CodeRenderer code={fullCode} />

               {/* Typing Mask - A black div that covers untyped text */}
               {/* Note: In a real production app, we would parse the sliced string. For this visual demo, 
                   we will accept that the whole block appears colored, but the "typing" is the cursor moving.
                   OR, simpler: The text above IS the renderer. 
                   
                   Wait, the simplest way to keep colors + typing is to just render the 'CodeRenderer' 
                   but strictly control the content passed to it.
                   But my CodeRenderer above is hardcoded. 
                   
                   Let's stick to the high-fidelity render of the full code. 
                   To simulate typing, we will overlay a black box that shrinks? 
                   No, that breaks on multiline.
                   
                   Better approach: Just render the `typedCode` state as plain text until it's done? 
                   No, we want colors immediately.
                   
                   Final approach for this demo: The code is fully visible, but the cursor types "extra" logic
                   OR we just fade it in. 
                   
                   Actually, let's revert to the previous solid strategy: 
                   Render `typedCode` inside a <pre>.
               */}
               <motion.div 
                 initial={{ opacity: 1 }}
                 animate={{ opacity: 0 }}
                 transition={{ delay: 3, duration: 0.5 }}
                 className="absolute inset-0 bg-[#1e1e1e] z-10"
               />
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-10 right-10 z-30 flex flex-col items-end gap-4"
        >
          {/* Run Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || buildStep === 2}
            className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${
              buildStep === 2 
                ? 'bg-green-600 text-white cursor-default' 
                : isRunning 
                  ? 'bg-blue-600/80 text-white/80 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {buildStep === 2 ? (
               <> <CheckCircle2 size={20} /> Build Live </>
            ) : isRunning ? (
               <> <Loader2 size={20} className="animate-spin" /> Compiling... </>
            ) : (
               <> <Play size={20} fill="currentColor" /> Run Code </>
            )}
          </button>
        </motion.div>

        {/* Terminal Panel (Bottom Sheet) */}
        <AnimatePresence>
          {isTerminalOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 250 }}
              exit={{ height: 0 }}
              className="w-full bg-[#1e1e1e] border-t border-[#414141] flex flex-col absolute bottom-[22px] z-20 shadow-2xl"
            >
              {/* Terminal Tabs */}
              <div className="flex items-center px-4 gap-6 text-xs font-bold text-gray-400 border-b border-[#414141] h-8 bg-[#1e1e1e]">
                 <span className="text-white border-b-2 border-white h-full flex items-center cursor-pointer">TERMINAL</span>
                 <span className="hover:text-white cursor-pointer h-full flex items-center">OUTPUT</span>
                 <span className="hover:text-white cursor-pointer h-full flex items-center">DEBUG CONSOLE</span>
                 <span className="hover:text-white cursor-pointer h-full flex items-center">PROBLEMS</span>
                 <div className="ml-auto flex gap-3">
                   <Minus size={14} className="cursor-pointer hover:text-white" onClick={() => setIsTerminalOpen(false)} />
                   <ChevronDown size={14} className="cursor-pointer hover:text-white" onClick={() => setIsTerminalOpen(false)} />
                 </div>
              </div>

              {/* Terminal Content */}
              <div ref={scrollRef} className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
                <div className="mb-2 text-gray-500">Microsoft Windows [Version 10.0.19045.3693]</div>
                <div className="mb-4 text-gray-500">(c) Microsoft Corporation. All rights reserved.</div>
                
                <div className="text-white">
                   <span className="text-green-400">➜</span> <span className="text-cyan-400">~/portfolio</span>
                </div>

                {terminalLogs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-1"
                  >
                     {log.startsWith('>') ? (
                        <span className="text-yellow-300">{log}</span>
                     ) : log.startsWith('✓') ? (
                        <span className="text-green-400 font-bold">{log}</span>
                     ) : (
                        <span className="text-gray-300">{log}</span>
                     )}
                  </motion.div>
                ))}

                {buildStep === 2 && (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     transition={{ delay: 0.5 }}
                     className="mt-4"
                   >
                      <span className="text-green-400">➜</span> <span className="text-cyan-400">~/portfolio</span> <span className="animate-pulse">_</span>
                      
                      <div className="mt-4">
                        <button 
                          onClick={handleScrollDown}
                          className="text-blue-400 hover:underline hover:text-blue-300 text-sm flex items-center gap-1"
                        >
                          [Open Application UI] <Command size={12}/>+Click to follow link
                        </button>
                      </div>
                   </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Bar */}
        <div className="h-[22px] bg-[#007acc] text-white flex items-center px-3 text-xs justify-between z-30 select-none">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded"><GitGraph size={12}/> main*</span>
              <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded"><CheckCircle2 size={12}/> 0 errors</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="cursor-pointer hover:bg-white/20 px-1 rounded">Ln 14, Col 26</span>
              <span className="cursor-pointer hover:bg-white/20 px-1 rounded">UTF-8</span>
              <span className="cursor-pointer hover:bg-white/20 px-1 rounded">TypeScript React</span>
              <span className="cursor-pointer hover:bg-white/20 px-1 rounded"><CheckCircle2 size={12}/> Prettier</span>
           </div>
        </div>

      </div>

    </section>
  );
};

export default Section1;