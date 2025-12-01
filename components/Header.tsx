'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, SVGMotionProps, Variants } from 'framer-motion';
import { Instagram, Linkedin, Github, ChevronRight, Code2, Palette, ArrowRight } from 'lucide-react';

interface MenuItem {
  title: string;
  href: string;
  isButton?: boolean;
}

// Custom Hamburger Icon Component
const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Mode Detection
  const isDeveloperMode = pathname?.includes('/developer');

  // UI States
  const [sticky, setSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isSwitching, setIsSwitching] = useState(false);
  
  // Visibility State
  const [isVisible, setIsVisible] = useState(true);

  // Toggle Logic
  const handleToggle = () => {
    if (isSwitching) return;
    setIsSwitching(true);

    setTimeout(() => {
      if (isDeveloperMode) {
        router.push('/content');
      } else {
        router.push('/developer');
      }
      setTimeout(() => setIsSwitching(false), 500); 
    }, 400); 
  };

  // --- MENU DATA ---
  const developerMenuItems: MenuItem[] = [
    { title: 'Home', href: '#section-1' },
    { title: 'Experience', href: '#section-2' },
    { title: 'Projects', href: '#section-3' },
    { title: 'Skills', href: '#section-4' },
    { title: 'Hire Me', href: '#section-5', isButton: true },
  ];

  const contentMenuItems: MenuItem[] = [
    { title: 'Home', href: '#section-1' },
    { title: 'Gallery', href: '#section-2' },
    { title: 'Films', href: '#section-3' }, 
    { title: 'Contact Us', href: '#section-5' },
  ];

  const currentMenuItems = isDeveloperMode ? developerMenuItems : contentMenuItems;

  // --- SCROLLSPY LOGIC ---
  useEffect(() => {
    let sections = [];
    if (isDeveloperMode) {
      sections = [
        { id: 'section-1', name: 'Home' },
        { id: 'section-2', name: 'Experience' },
        { id: 'section-3', name: 'Projects' },
        { id: 'section-4', name: 'Skills' },
        { id: 'section-5', name: 'Hire Me' }
      ];
    } else {
      sections = [
        { id: 'section-1', name: 'Home' },
        { id: 'section-2', name: 'Gallery' },
        { id: 'section-3', name: 'Films' },
        { id: 'section-5', name: 'Contact Us' }
      ];
    }

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); 
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [pathname, isDeveloperMode]);

  // Smooth Scroll Handler
  const handleLinkClick = (e: React.MouseEvent, item: MenuItem) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(item.href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(item.title);
      }
    }
    setMobileMenuOpen(false);
  };

  // Scroll Handler for Sticky & Visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setSticky(currentScrollY > 20);
      if (isDeveloperMode) {
        const threshold = window.innerHeight / 2;
        setIsVisible(currentScrollY > threshold || currentScrollY < 50);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDeveloperMode]);

  const isItemActive = (item: MenuItem) => activeSection === item.title;

  // --- Animation Variants ---
  const mobileMenuVariants: Variants = {
    closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { opacity: 1, height: '100vh', transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
  };

  const mobileItemVariants: Variants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  // Reusable bouncing arrow animation
  const bounceTransition = {
    x: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <>
      {/* --- DESKTOP HEADER --- */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-500 ease-in-out border-b ${
          sticky 
            ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 h-[80px] flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 cursor-pointer group">
            <div className="relative">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={140}
                height={40}
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:brightness-125" 
                priority
              />
            </div>
          </Link>

          {/* Centered Navigation Pills */}
          <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center p-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
              {currentMenuItems.map((item) => {
                const isActive = isItemActive(item);
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    } ${item.isButton ? 'font-bold tracking-wide' : ''}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full shadow-sm border border-white/5 ${item.isButton ? 'bg-blue-600/80' : 'bg-white/10'}`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Toggle Switch */}
          <div className="flex-shrink-0">
            <div className="group flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-full p-1.5 pl-5 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-glow">
              
              <div className="flex flex-col items-end mr-1 overflow-hidden h-5">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={isDeveloperMode ? "dev" : "content"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/80"
                  >
                     {/* Desktop Arrow Animation */}
                    <span>{isDeveloperMode ? "Switch to Content" : "Switch to Dev"}</span>
                    <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={bounceTransition as any}
                    >
                         <ArrowRight size={12} className="text-blue-400" />
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <button
                onClick={handleToggle}
                className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                  isSwitching ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-white/10 hover:bg-white/20 shadow-inner'
                }`}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                  animate={{ x: isSwitching ? 24 : 0 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.div
                    animate={{ rotate: isSwitching ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {isSwitching ? (
                       isDeveloperMode ? <Palette size={12} className="text-blue-600" /> : <Code2 size={12} className="text-blue-600" />
                    ) : (
                       isDeveloperMode ? <Palette size={12} className="text-gray-700" /> : <Code2 size={12} className="text-gray-700" />
                    )}
                  </motion.div>
                </motion.div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Subtle Bottom Gradient Line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
      </motion.header>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden">
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300"
          animate={{
            y: isVisible ? 0 : -100,
            backgroundColor: (sticky || mobileMenuOpen) ? 'rgba(0,0,0,0.85)' : 'transparent',
            backdropFilter: (sticky || mobileMenuOpen) ? 'blur(20px)' : 'none',
          }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="z-50 relative cursor-pointer">
             <Image 
               src="/images/logo.png" 
               alt="Logo" 
               width={120} 
               height={32}
               className="h-8 w-auto object-contain" 
             />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
          >
             <svg width="22" height="22" viewBox="0 0 24 24">
              <Path
                variants={{
                  closed: { d: 'M 4 6 L 20 6' },
                  open: { d: 'M 6 18 L 18 6' },
                }}
                initial="closed"
                animate={mobileMenuOpen ? 'open' : 'closed'}
              />
              <Path
                d="M 4 12 L 20 12"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                initial="closed"
                animate={mobileMenuOpen ? 'open' : 'closed'}
              />
              <Path
                variants={{
                  closed: { d: 'M 4 18 L 20 18' },
                  open: { d: 'M 6 6 L 18 18' },
                }}
                initial="closed"
                animate={mobileMenuOpen ? 'open' : 'closed'}
              />
            </svg>
          </button>
        </motion.header>

        {/* Mobile Full Screen Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col pt-28 px-6 pb-10 overflow-hidden"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-3">
                {currentMenuItems.map((item, idx) => (
                  <motion.div variants={mobileItemVariants} key={idx}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={`group flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                        isItemActive(item) 
                          ? 'bg-white/10 border-white/20 shadow-lg' 
                          : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className={`text-xl font-medium tracking-wide ${isItemActive(item) ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                        {item.title}
                      </span>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isItemActive(item) ? 'text-white' : 'text-white/30'}`} />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Controls */}
              <div className="mt-auto space-y-6">
                
                {/* Mobile Toggle */}
                <motion.div 
                  variants={mobileItemVariants}
                  className="p-1.5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <button 
                    onClick={handleToggle}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 border border-white/5 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-white/10 ${
                        isDeveloperMode ? 'bg-blue-600/20 text-blue-400' : 'bg-white/10 text-white/50'
                      }`}>
                          {isDeveloperMode ? <Palette size={20} /> : <Code2 size={20} />}
                      </div>
                      <span className="text-sm font-medium text-white/90">
                          {isDeveloperMode ? "Switch to Content" : "Switch to Dev"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* Mobile Arrow Animation (Side of Toggle) */}
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={bounceTransition as any}
                            className="text-blue-400"
                        >
                            <ArrowRight size={16} />
                        </motion.div>

                        {/* Animated Mobile Knob */}
                        <div className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 ${isSwitching ? 'bg-blue-600' : 'bg-white/20'}`}>
                        <motion.div 
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                            animate={{ x: isSwitching ? 28 : 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                        </div>
                    </div>
                  </button>
                </motion.div>

                {/* Social Icons */}
                <motion.div 
                  variants={mobileItemVariants}
                  className="flex justify-center items-center space-x-10 pt-6 border-t border-white/10"
                >
                  {[
                    { Icon: Instagram, href: "https://instagram.com" },
                    { Icon: Linkedin, href: "https://linkedin.com" },
                    { Icon: Github, href: "https://github.com" }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer p-2"
                    >
                      <social.Icon size={26} strokeWidth={1.5} />
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;