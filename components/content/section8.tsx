'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Sunrise, Wind } from 'lucide-react';

const SectionDreams = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // TS FIX: Added <HTMLVideoElement> and <HTMLElement> to refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ---------------------------------------------------------------------------
  // 1. LOADING ALGORITHM
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------------------------------
  // 2. INTRO SEQUENCE LOGIC
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isLoading) {
      // START: Show after 4 seconds
      const startTimer = setTimeout(() => {
        setShowIntro(true);
      }, 4000);

      // END: Hide after 6 seconds (4s start + 2s duration)
      const endTimer = setTimeout(() => {
        setShowIntro(false);
      }, 6000);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
  }, [isLoading]);

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = false;
    }
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // ---------------------------------------------------------------------------
  // 3. SOUND LOGIC
  // ---------------------------------------------------------------------------
  const attemptPlay = useCallback(async () => {
    if (videoRef.current) {
      try {
        videoRef.current.volume = 1.0;
        videoRef.current.muted = false;
        await videoRef.current.play();
        setIsMuted(false);
      } catch {
        if (videoRef.current) {
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsMuted(true);
        }
      }
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, []);

  // ---------------------------------------------------------------------------
  // 4. INTERSECTION OBSERVER
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isLoading) return;
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          pauseVideo();
        }
      },
      { threshold: 0.5 }
    );
    if (currentSectionRef) observer.observe(currentSectionRef);
    return () => {
      if (currentSectionRef) observer.unobserve(currentSectionRef);
    };
  }, [isLoading, attemptPlay, pauseVideo]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="section-dreams"
      ref={sectionRef}
      // LAYOUT: Mobile = Col, Desktop = Row Reverse (Text Left, Video Right)
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col md:flex-row-reverse"
    >
      {/* ---------------------------------------------------------------------------
          LOADER OVERLAY
          --------------------------------------------------------------------------- */}
      <div
        className={`
          absolute inset-0 z-50 flex flex-col items-center justify-center bg-black
          transition-opacity duration-1000 ease-out
          ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Sunrise className="w-10 h-10 text-neutral-600 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          </div>
          <div className="h-[2px] w-48 bg-neutral-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neutral-500 via-white to-neutral-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
            Igniting Vision {progress}%
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          VIDEO PANEL (RIGHT SIDE ON DESKTOP)
          --------------------------------------------------------------------------- */}
      <div className="w-full md:flex-1 bg-black flex items-center justify-center relative border-b md:border-b-0 md:border-l border-white/10">
        
        {/* THE 16:9 CONTAINER */}
        <div className="relative w-full aspect-video group bg-neutral-900 overflow-hidden shadow-2xl">
            
            <video
              ref={videoRef}
              // FIX: 
              // 1. translate(-50%, -50%) centers it.
              // 2. rotate(-90deg) flips the 9:16 video to be horizontal.
              // 3. scale(1.778) expands it because object-contain made it small to fit the height. 
              //    16/9 is approx 1.7777. This makes it fill the container perfectly.
              style={{ transform: 'translate(-50%, -50%) rotate(-90deg) scale(1.778)' }}
              
              // Use object-contain so we get the FULL video frame (no cropping)
              className="absolute top-1/2 left-1/2 w-full h-full object-contain transform-gpu"
              
              loop
              playsInline
              preload="auto"
              onCanPlayThrough={handleVideoLoad}
            >
              <source src="/videos/herosix.mp4" type="video/mp4" />
            </video>

            {/* Cinematic Overlay (Cool Morning Blue) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-blue-900/10 to-black/30 pointer-events-none" />

            {/* DIRECTOR INTRO */}
            <div
              className={`
                absolute inset-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none
                transition-all duration-[1000ms] cubic-bezier(0.19, 1, 0.22, 1)
                ${showIntro && !isLoading ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md'}
              `}
            >
                <div className="space-y-2 md:space-y-4 mix-blend-overlay">
                <p className="text-[8px] md:text-[10px] font-bold tracking-[0.6em] text-white/80 uppercase">
                    Directed By
                </p>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-xl">
                  PUNEET SHUKLA
                </h1>
              </div>
            </div>

            {/* CONTROLS */}
            {!isLoading && (
              <div className="absolute bottom-4 right-4 z-40 flex items-center gap-3 animate-fade-in">
                <div className="text-right hidden sm:block">
                    <p className="text-[8px] font-bold tracking-widest text-white/90 uppercase">Soundscape</p>
                    <p className="text-[8px] text-white/60 font-mono">DOLBY ATMOS</p>
                </div>
                <button
                  onClick={toggleSound}
                  className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all duration-300"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white/70" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white hover:text-blue-400" />
                  )}
                </button>
              </div>
            )}
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          TEXT PANEL (LEFT SIDE ON DESKTOP)
          --------------------------------------------------------------------------- */}
      <div className="w-full md:w-[40%] lg:w-[35%] bg-black flex flex-col items-center justify-center p-8 md:p-12 z-20 relative overflow-hidden">
        
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/10 blur-[90px] rounded-full pointer-events-none" />
        
        {/* Content */}
        <div className="relative max-w-sm text-center md:text-left space-y-8 md:space-y-12">
          
          {/* Tagline */}
          <div className="flex flex-col items-center md:items-start gap-3 opacity-0 animate-cinematic-fade" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 text-purple-400/80">
                <Wind className="w-3 h-3" />
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase">The Uphill Battle</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[0.9]">
               Dreams <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-pink-500">
                  Vs. Everyone
               </span>
              </h2>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-neutral-700 to-transparent mx-auto md:mx-0 opacity-0 animate-cinematic-grow" style={{ animationDelay: '0.5s' }} />

          {/* Body */}
          <p className="text-sm md:text-base font-light leading-relaxed text-neutral-400 opacity-0 animate-cinematic-up font-serif italic" style={{ animationDelay: '0.8s' }}>
            &quot;They told him to be realistic. They told him to follow the path. But the vision was too clear to ignore. Standing alone against the tide, it&apos;s not just about proving them wrong—it&apos;s about proving yourself right.&quot;
          </p>

          {/* Tech Specs */}
          <div className="flex items-center justify-center md:justify-start gap-4 opacity-0 animate-cinematic-fade" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center gap-2 text-neutral-700">
                <Sunrise className="w-3 h-3" />
                <span className="text-[9px] tracking-widest uppercase font-bold">Inner Light</span>
            </div>
              <div className="w-1 h-1 bg-neutral-800 rounded-full" />
              <span className="text-[9px] text-neutral-700 tracking-widest uppercase font-bold">Resilience</span>
          </div>
          
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          ANIMATIONS
          --------------------------------------------------------------------------- */}
      <style>{`
        @keyframes fade-in-slow {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cinematic-up {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes cinematic-fade {
          0% { opacity: 0; filter: blur(2px); }
          100% { opacity: 1; filter: blur(0); }
        }
        @keyframes cinematic-grow {
          0% { opacity: 0; height: 0px; }
          100% { opacity: 1; } 
        }
        .animate-fade-in { animation: fade-in-slow 1s ease-out forwards; }
        .animate-cinematic-up { animation: cinematic-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-cinematic-fade { animation: cinematic-fade 2s ease-in-out forwards; }
        .animate-cinematic-grow { animation: cinematic-grow 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>
    </section>
  );
};

export default SectionDreams;