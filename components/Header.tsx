'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Added for navigation
import Link from 'next/link'; // Added for internal links
import Image from 'next/image'; // Added for image optimization
import { motion, AnimatePresence, SVGMotionProps } from 'framer-motion';
import { Instagram, Linkedin, Github, ChevronRight, Code2, Palette } from 'lucide-react';

// Define Interface for Menu Items
interface MenuItem {
  title: string;
  href: string;
}

// 🐛 FIX: Move Path component outside of the main functional component (Header)
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

  // State initialization
  const [pathname, setPathname] = useState('/');
  const [isToggled, setIsToggled] = useState(false);
  const [sticky, setSticky] = useState(false);
  // Removed unused headerVisible
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // New State for Scrollspy
  const [activeSection, setActiveSection] = useState('Home');

  const lastScrollY = useRef(0);

  // 1. Sync State with URL on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      setPathname(currentPath);
      setIsToggled(false);
    }
  }, []);

  // 2. ScrollSpy Logic (Only runs on /content)
  useEffect(() => {
    const isContentPage = pathname.includes('/content');
    if (!isContentPage) return;

    const handleScrollSpy = () => {
      const sections = [
        { id: 'section-1', name: 'Home' },
        { id: 'section-2', name: 'Gallery' },
        { id: 'section-3', name: 'Films' },
        { id: 'section-4', name: 'Films' }, // Maps to same tab
        { id: 'section-5', name: 'Contact Us' }
      ];

      const scrollPosition = window.scrollY + 150; // Offset for header height

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.name);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Initial check
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [pathname]);


  // 3. Robust Toggle Handler
  const handleToggle = () => {
    const currentPath = window.location.pathname;
    const isOnDevPage = currentPath.includes('/developer');
    
    setIsToggled(prev => !prev);
    
    setTimeout(() => {
      if (isOnDevPage) {
        router.push('/content');
      } else {
        router.push('/developer');
      }
    }, 400);
  };

  // 4. Navigation Handler
  const handleLinkClick = (e: React.MouseEvent, item: MenuItem) => {
    // If it's an anchor link (starts with #), we handle scroll manually
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const elementId = item.href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(item.title); // Immediate UI update
      }
    } else {
        // For standard pages, let Next/Link handle it, 
        // but we update state for UI feedback
        setPathname(item.href);
    }
    setMobileMenuOpen(false);
  };

  // ⚠️ Original Path definition removed from here (lines 110-118)

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setSticky(currentScrollY > 20);
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- MENU CONFIGURATION ---
  const developerMenuItems: MenuItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Films', href: '/films' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];

  // Specific menu for /content page
  const contentMenuItems: MenuItem[] = [
    { title: 'Home', href: '#section-1' },
    { title: 'Gallery', href: '#section-2' },
    { title: 'Films', href: '#section-3' }, 
    { title: 'Contact Us', href: '#section-5' },
  ];

  const currentMenuItems = pathname.includes('/content') ? contentMenuItems : developerMenuItems;

  // Helper to check active state
  const isItemActive = (item: MenuItem) => {
    if (pathname.includes('/content')) {
      return activeSection === item.title;
    }
    return pathname === item.href;
  };

  return (
    <>
      {/* --- DESKTOP HEADER --- */}
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: 0,
          backgroundColor: sticky ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
          backdropFilter: sticky ? 'blur(12px)' : 'none',
          borderBottom: sticky ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
          
          <div className="flex-shrink-0 z-50 cursor-pointer">
            <Link href="/" className="block relative group">
              <div className="relative flex items-center">
                 <Image 
                    src="/images/logo.png" 
                    alt="Logo" 
                    width={150} // Adjust width to match your actual image aspect ratio
                    height={40} // Adjust height to match your actual image aspect ratio
                    className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80" 
                    priority // Ensures logo loads immediately
                 />
              </div>
            </Link>
          </div>

          <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center space-x-1 px-2 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
              {currentMenuItems.map((item) => {
                const isActive = isItemActive(item);
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full p-1 pl-4 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex flex-col items-end mr-1">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={pathname.includes('/developer') ? "dev-text" : "content-text"}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xs font-semibold whitespace-nowrap ${isToggled ? "text-blue-400" : "text-white"}`}
                  >
                    {pathname.includes('/developer') ? "Turn on Content Mode" : "Turn on Developer Mode"}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <button
                onClick={handleToggle}
                className={`relative w-12 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none shadow-inner ${
                  isToggled ? 'bg-blue-600/90' : 'bg-white/10'
                }`}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                  animate={{ x: isToggled ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {isToggled ? (
                    <Code2 size={10} className="text-blue-600" />
                  ) : (
                    <Palette size={10} className="text-gray-600" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
      </motion.header>

      <div className="md:hidden">
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300"
          animate={{
            y: 0,
            backgroundColor: (sticky || mobileMenuOpen) ? 'rgba(0,0,0,0.8)' : 'transparent',
            backdropFilter: (sticky || mobileMenuOpen) ? 'blur(16px)' : 'none',
          }}
        >
          <Link href="/" className="z-50 relative">
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
            className="relative z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-md"
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

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-28 px-6 pb-10"
            >
              <nav className="flex flex-col space-y-4">
                {currentMenuItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={`group flex items-center justify-between p-4 rounded-xl border active:scale-95 transition-all cursor-pointer ${isItemActive(item) ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}
                    >
                      <span className={`text-xl font-medium tracking-wide ${isItemActive(item) ? 'text-white' : 'text-white/70'}`}>{item.title}</span>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-6">
                <motion.div
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="p-1 rounded-2xl bg-white/5 border border-white/10"
                >
                  <button 
                    onClick={handleToggle}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isToggled ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50'}`}>
                        {isToggled ? <Code2 size={20} /> : <Palette size={20} />}
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-white font-medium">
                          {pathname.includes('/developer') ? "Turn on Content Mode" : "Turn on Developer Mode"}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isToggled ? 'bg-blue-600' : 'bg-white/20'}`}>
                      <motion.div 
                        className="w-4 h-4 bg-white rounded-full shadow-sm"
                        animate={{ x: isToggled ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    </div>
                  </button>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   className="flex justify-center items-center space-x-8 pt-4 border-t border-white/10"
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
                       className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
                     >
                       <social.Icon size={24} strokeWidth={1.5} />
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