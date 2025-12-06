'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useMotionValueEvent,
  SVGMotionProps, 
  Variants,
  Transition 
} from 'framer-motion';
import { 
  Instagram, 
  Linkedin, 
  Github, 
  ChevronRight, 
  Code2, 
  Palette, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

// --- TYPES ---
interface MenuItem {
  title: string;
  href: string;
  isButton?: boolean;
}

// --- ANIMATION CONFIG ---
const transitionSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

const bouncySpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Mode Detection
  const isDeveloperMode = pathname?.includes('/developer');

  // UI States
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isSwitching, setIsSwitching] = useState(false);

  // --- SCROLL LOGIC ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only toggle the visual style (Glass effect), never hide the header
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

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
    { title: 'Skills', href: '#section-3' },
    { title: 'Projects', href: '#section-4' },
    { title: 'Hire Me', href: '#section-6', isButton: true },
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
    const getSections = () => {
      if (isDeveloperMode) {
        return [
          { id: 'section-1', name: 'Home' },
          { id: 'section-2', name: 'Experience' },
          { id: 'section-3', name: 'Skills' },
          { id: 'section-4', name: 'Projects' },
          { id: 'section-5', name: 'Projects' }, // Catch scroll in section 5 for Projects
          { id: 'section-6', name: 'Hire Me' }
        ];
      }
      return [
        { id: 'section-1', name: 'Home' },
        { id: 'section-2', name: 'Gallery' },
        { id: 'section-3', name: 'Films' },
        { id: 'section-5', name: 'Contact Us' }
      ];
    };

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = getSections();

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

  // --- ANIMATION VARIANTS ---
  const mobileMenuVariants: Variants = {
    closed: { 
      opacity: 0, 
      clipPath: "inset(0 0 100% 0)",
      transition: { staggerChildren: 0.05, staggerDirection: -1 } 
    },
    open: { 
      opacity: 1, 
      clipPath: "inset(0 0 0% 0)",
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 20,
        staggerChildren: 0.1, 
        delayChildren: 0.1 
      } 
    }
  };

  const mobileItemVariants: Variants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  return (
    <>
      {/* --- DESKTOP HEADER --- */}
      <header
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center items-center w-full pt-6 pointer-events-none`}
      >
        <div className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 border ${
          scrolled 
            ? 'w-[90%] max-w-6xl bg-black/60 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]' 
            : 'w-full max-w-7xl bg-transparent border-transparent'
        }`}>
          {/* Logo Section */}
          <Link href="/" className="flex-shrink-0 cursor-pointer group relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={180} 
                height={50}
                className="h-12 w-auto object-contain brightness-110" 
                priority
              />
            </motion.div>
          </Link>

          {/* Centered Navigation */}
          <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <ul className="flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
              {currentMenuItems.map((item) => {
                const isActive = activeSection === item.title;
                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 block ${
                        isActive ? 'text-white' : 'text-white/60 hover:text-white'
                      } ${item.isButton ? 'ml-2' : ''}`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className={`absolute inset-0 rounded-full ${
                            item.isButton ? 'bg-blue-600 shadow-lg shadow-blue-500/30' : 'bg-white/10'
                          }`}
                          transition={transitionSpring}
                        />
                      )}
                      {item.isButton && !isActive && (
                         <div className="absolute inset-0 rounded-full border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition-colors" />
                      )}
                      <span className="relative z-10">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Section: Toggle */}
          <div className="flex-shrink-0 flex items-center gap-6 z-10">
            <div className="hidden xl:flex flex-col items-end overflow-hidden h-5">
               <AnimatePresence mode="wait">
                 <motion.span 
                   key={isDeveloperMode ? "dev-txt" : "cont-txt"}
                   initial={{ y: 15, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -15, opacity: 0 }}
                   className="text-xs font-bold uppercase tracking-wider text-white/50"
                 >
                   {isDeveloperMode ? "Switch to Content" : "Switch to Dev"}
                 </motion.span>
               </AnimatePresence>
            </div>

            <motion.button
              onClick={handleToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-16 h-9 rounded-full p-1 cursor-pointer transition-colors duration-500 border ${
                 isSwitching 
                  ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                  : 'bg-white/10 border-white/10 hover:border-white/20'
              }`}
            >
              <motion.div
                className="w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10"
                animate={{ x: isSwitching ? 28 : 0 }} 
                transition={bouncySpring}
              >
                <motion.div
                   animate={{ rotate: isSwitching ? 360 : 0, scale: isSwitching ? 0.8 : 1 }}
                   transition={{ duration: 0.5 }}
                >
                  {isDeveloperMode ? (
                     <Palette size={14} className={isSwitching ? "text-blue-600" : "text-gray-800"} />
                  ) : (
                     <Code2 size={14} className={isSwitching ? "text-blue-600" : "text-gray-800"} />
                  )}
                </motion.div>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </header>


      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden">
        <div
          className={`fixed top-0 left-0 right-0 z-[60] px-6 py-4 flex justify-between items-center transition-all duration-300 ${
             scrolled || mobileMenuOpen ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
          }`}
        >
          <Link href="/" className="relative z-[60]">
             <Image 
               src="/images/logo.png" 
               alt="Logo" 
               width={140} 
               height={40}
               className="h-10 w-auto object-contain" 
             />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-[60] w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                className="relative w-6 h-6"
            >
               <motion.span 
                 className="absolute inset-0 flex items-center justify-center"
                 initial={{ opacity: 1, rotate: 0 }}
                 animate={{ opacity: mobileMenuOpen ? 0 : 1, rotate: mobileMenuOpen ? 90 : 0 }}
               >
                   <Menu />
               </motion.span>
               <motion.span 
                 className="absolute inset-0 flex items-center justify-center"
                 initial={{ opacity: 0, rotate: -90 }}
                 animate={{ opacity: mobileMenuOpen ? 1 : 0, rotate: mobileMenuOpen ? 0 : -90 }}
               >
                   <X />
               </motion.span>
            </motion.div>
          </button>
        </div>

        {/* Mobile Full Screen Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-50 bg-[#050505] flex flex-col pt-32 px-6 pb-10 h-[100dvh]"
            >
               <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

              <nav className="flex flex-col space-y-2 relative z-10">
                {currentMenuItems.map((item, idx) => (
                  <motion.div variants={mobileItemVariants} key={idx} className="overflow-hidden">
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={`group flex items-center justify-between py-4 border-b border-white/5 transition-all cursor-pointer ${
                        activeSection === item.title ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      <span className="text-3xl font-light tracking-tight group-hover:pl-4 transition-all duration-300">
                        {item.title}
                      </span>
                      <motion.div
                         initial={{ x: -10, opacity: 0 }}
                         whileInView={{ x: 0, opacity: 1 }}
                         className={activeSection === item.title ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"}
                      >
                         <ArrowRight className="w-6 h-6 -rotate-45" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-8 relative z-10">
                {/* Mobile Switcher */}
                <motion.div 
                  variants={mobileItemVariants}
                  onClick={handleToggle}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isDeveloperMode ? 'bg-blue-600/20 text-blue-400' : 'bg-purple-600/20 text-purple-400'}`}>
                             {isDeveloperMode ? <Code2 size={24} /> : <Palette size={24} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-white/40 uppercase tracking-widest">Current Mode</span>
                            <span className="text-lg font-medium text-white">{isDeveloperMode ? "Developer" : "Creative"}</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                         <ChevronRight size={16} />
                    </div>
                </motion.div>

                {/* Socials */}
                <motion.div 
                  variants={mobileItemVariants}
                  className="flex justify-between items-center px-4"
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
                      className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                    >
                      <social.Icon size={24} />
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