/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  X, 
  Filter, 
  ArrowRight,
  Mail,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

// --- TYPESCRIPT INTERFACES ---
interface PortfolioItem {
  id: string;
  src: string;
  title: string;
  category: string;
  width: number;
  height: number;
  subtitle?: string;
}

// --- DATA GENERATION ---
const defaultW = 1600;
const defaultH = 900;

const getAllImages = (): PortfolioItem[] => {
  const items: PortfolioItem[] = [];
  let count = 0;

  // Helper to add images easily
  const add = (filename: string, title: string, category: string) => {
    count++;
    items.push({
      id: `item-${count}`,
      src: `/images/${filename}`, 
      title: title,
      category: category,
      width: defaultW,
      height: defaultH,
    });
  };

  // --- POPULATING IMAGES ---
  add('❣️Nahargarh Fort is set on the Aravallis here, and offers some stunning views of the Pink City..heic', 'Nahargarh Views', 'Heritage');
  add('❣️Nahargarh Fort is set on the Aravallis here, and offers some stunning views of the Pink City. (1).heic', 'Aravallis Fort I', 'Heritage');
  add('❣️Nahargarh Fort is set on the Aravallis here, and offers some stunning views of the Pink City. (2).heic', 'Aravallis Fort II', 'Heritage');
  add('💙❤️.webp', 'Blue & Red', 'Art');
  add('💙❤️ (1).webp', 'Blue & Red II', 'Art');
  add('500274268_637384399336303_8970826098585514836_n.heic', 'Captured Moment I', 'Moments');
  add('500492249_1253166189551939_2371358788185907362_n.heic', 'Captured Moment II', 'Moments');
  add('500719058_1831201851080654_7549224533789890178_n.heic', 'Captured Moment III', 'Moments');
  add('A Beautiful evening in vrindavan 🌌.heic', 'Vrindavan Evening', 'Spiritual');
  add('Experience the divine colors of love and devotion, where every splash tells the story of Krishn.heic', 'Divine Colors', 'Spiritual');
  add('Comment some captions 🙂.heic', 'Untitled Mood', 'Mood');
  add('Comment some captions 🙂 (1).heic', 'Untitled Mood II', 'Mood');
  add('Cozy nights, warm hearts🖤.heic', 'Cozy Nights', 'Mood');
  
  for (let i = 1; i <= 3; i++) {
    add(`Cozy nights, warm hearts🖤 (${i}).heic`, `Cozy Nights ${i}`, 'Mood');
  }

  add('Delhi Rain 🩷.heic', 'Delhi Rain', 'Monsoon');
  add('Delhi Rain 🩷 (1).heic', 'Delhi Rain I', 'Monsoon');
  add('Delhi Rain 🩷 (2).heic', 'Delhi Rain II', 'Monsoon');
  add('Rainbow after the rain☔.heic', 'After The Rain', 'Monsoon');
  add('get.jpg', 'Life Captured', 'Life');
  
  for (let i = 1; i <= 21; i++) {
    add(`get (${i}).jpg`, `Life Captured ${i}`, 'Life');
  }

  add('Meant to you.webp', 'Meant To You', 'Portrait');
  
  for (let i = 1; i <= 4; i++) {
    add(`Meant to you (${i}).webp`, `Meant To You ${i}`, 'Portrait');
  }

  add('Playing with colours🩵.heic', 'Playing Colors', 'Festival');
  add('Playing with colours🩵 (1).heic', 'Playing Colors I', 'Festival');
  add('Playing with colours🩵 (2).heic', 'Playing Colors II', 'Festival');
  add('Shades of ❄️ winter.heic', 'Winter Shades', 'Nature');
  
  for (let i = 1; i <= 4; i++) {
    add(`Shades of ❄️ winter (${i}).heic`, `Winter Shades ${i}`, 'Nature');
  }

  add('Streets of pink city ❣️.heic', 'Pink City', 'Urban');
  
  for (let i = 1; i <= 8; i++) {
    add(`Streets of pink city ❣️ (${i}).heic`, `Pink City ${i}`, 'Urban');
  }

  add('The last of Us...heic', 'The Last of Us', 'Cinematic');
  add('The young nights in the hostels are unforgettable ✨.heic', 'Hostel Nights', 'Life');

  return items;
};

const fullPortfolio = getAllImages();

// Updated Golden Series
const goldenSeries: PortfolioItem[] = [
  { 
    id: 'gold-1', 
    src: '/images/The young nights in the hostels are unforgettable ✨.heic', 
    title: 'Hostel Nights', 
    subtitle: 'Unforgettable Memories', 
    category: 'Featured',
    width: defaultW, 
    height: defaultH 
  },
  { 
    id: 'gold-2', 
    src: '/images/The last of Us...heic', 
    title: 'The Last Of Us', 
    subtitle: 'Solitude & Peace', 
    category: 'Featured',
    width: defaultW, 
    height: defaultH 
  },
  { 
    id: 'gold-3', 
    src: '/images/A Beautiful evening in vrindavan 🌌.heic', 
    title: 'Vrindavan Evening', 
    subtitle: 'Divine Atmosphere', 
    category: 'Featured',
    width: defaultW, 
    height: defaultH 
  },
  { 
    id: 'gold-4', 
    src: '/images/Rainbow after the rain☔.heic', 
    title: 'After The Rain', 
    subtitle: 'Hope & Light', 
    category: 'Featured',
    width: defaultW, 
    height: defaultH 
  },
];

// --- COMPONENT: Interactive Grid Item ---
interface GridItemProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

const GridItem = ({ item, onClick }: GridItemProps) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group relative cursor-pointer flex flex-col gap-2 transition-transform duration-500 hover:-translate-y-2 active:scale-[0.98]"
    >
      <div className="relative w-full overflow-hidden bg-neutral-900 aspect-video ring-1 ring-white/10 rounded-sm shadow-lg group-hover:shadow-2xl group-hover:shadow-yellow-500/10 transition-all duration-500"> 
        {/* Fallback background */}
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-700">
           <span className="text-4xl opacity-20">{item.category[0]}</span>
        </div>
        
        {/* Image */}
        <img
          src={item.src}
          alt={item.title}
          width={item.width}
          height={item.height}
          loading="lazy"
          className="relative z-10 w-full h-full object-cover opacity-100 transition-transform duration-700 ease-out group-hover:scale-105" 
          onError={(e) => {
             e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Highlight border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/30 z-20 transition-colors duration-300 rounded-sm pointer-events-none"></div>
      </div>

      <div className="w-full py-2 border-b border-white/5 group-hover:border-yellow-500/50 transition-colors duration-300 flex justify-between items-center">
        <h4 className="text-sm font-bold tracking-tight text-white truncate max-w-[70%] group-hover:text-yellow-500 transition-colors duration-300">
          {item.title}
        </h4>
        <span className="text-[10px] font-medium tracking-widest text-neutral-500 uppercase group-hover:text-white transition-colors duration-300">
          {item.category}
        </span>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Section2 = () => {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(15);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCopied, setShowCopied] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(fullPortfolio.map(item => item.category))];
    return cats.sort();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return fullPortfolio;
    return fullPortfolio.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  }, [selectedImage, filteredItems]);

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  }, [selectedImage, filteredItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleNext, handlePrev]);

  const handleViewFullGallery = () => {
    setVisibleCount(fullPortfolio.length);
    setActiveCategory('All');
    setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleConnect = () => {
    window.location.href = "mailto:puneet@example.com?subject=Project%20Inquiry";
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const link = document.createElement('a');
    link.href = selectedImage.src;
    link.download = selectedImage.title.replace(/\s+/g, '_') + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const url = window.location.origin + selectedImage.src;
    navigator.clipboard.writeText(url).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const buttonClass = "cursor-pointer active:scale-95 transition-all duration-200";

  return (
    <section id="section-2" className="relative w-full min-h-screen bg-black text-white py-12 sm:py-20 lg:py-32 selection:bg-yellow-500 selection:text-black overflow-hidden">
      
      {/* Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* ---------------------------------------------------------------------------
          LIGHTBOX MODAL
          --------------------------------------------------------------------------- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-8 animate-modal-enter"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity" />
          
          {/* Top Controls */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-4">
             <div className={`hidden sm:block px-3 py-1 bg-yellow-500 text-black text-xs font-bold uppercase rounded-full transition-opacity duration-300 ${showCopied ? 'opacity-100' : 'opacity-0'}`}>
                Link Copied
             </div>

             <div className="flex items-center gap-1 sm:gap-2 p-1 bg-white/10 rounded-full backdrop-blur-md border border-white/5">
                <button 
                  onClick={handleShare}
                  className={`p-2 sm:p-3 rounded-full hover:bg-white/10 text-white hover:text-yellow-500 ${buttonClass}`}
                  title="Share"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  onClick={handleDownload}
                  className={`p-2 sm:p-3 rounded-full hover:bg-white/10 text-white hover:text-yellow-500 ${buttonClass}`}
                  title="Download"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="w-[1px] h-4 sm:h-6 bg-white/20 mx-1"></div>
                <button 
                  className={`p-2 sm:p-3 rounded-full hover:bg-red-500/80 hover:text-white text-white ${buttonClass}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  title="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
             </div>
          </div>

          {/* Navigation Arrows (Mobile: Bottom, Desktop: Sides) */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center gap-8 z-50 md:hidden pointer-events-none">
              <button 
                  className={`pointer-events-auto p-4 bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white active:bg-yellow-500 active:text-black transition-colors ${buttonClass}`}
                  onClick={(e) => handlePrev(e)}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                  className={`pointer-events-auto p-4 bg-white/10 backdrop-blur-md border border-white/5 rounded-full text-white active:bg-yellow-500 active:text-black transition-colors ${buttonClass}`}
                  onClick={(e) => handleNext(e)}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
          </div>

          {/* Desktop Arrows */}
          <button 
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/5 hover:bg-yellow-500 hover:text-black rounded-full hidden md:block ${buttonClass}`}
              onClick={(e) => handlePrev(e)}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button 
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/5 hover:bg-yellow-500 hover:text-black rounded-full hidden md:block ${buttonClass}`}
              onClick={(e) => handleNext(e)}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full h-full sm:h-auto sm:max-w-7xl max-h-[100vh] sm:max-h-[85vh] flex flex-col items-center justify-center p-2 sm:p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-auto max-h-[60vh] sm:max-h-[75vh] aspect-auto sm:aspect-video shadow-2xl ring-0 sm:ring-1 ring-white/10 overflow-hidden rounded-lg sm:rounded-sm bg-transparent sm:bg-neutral-900 group flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
            
            <div className="mt-4 sm:mt-6 text-center animate-fade-in-up w-full max-w-2xl px-4 pb-20 md:pb-0">
              <div className="flex items-center justify-center gap-4 mb-2">
                 <div className="h-[1px] w-8 sm:w-12 bg-white/20"></div>
                 <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-yellow-500 uppercase">
                   {selectedImage.category || selectedImage.subtitle}
                 </p>
                 <div className="h-[1px] w-8 sm:w-12 bg-white/20"></div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- HEADER ---------------- */}
      <div className="relative container mx-auto px-4 sm:px-6 mb-12 sm:mb-20 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 border-b border-white/10 pb-6 sm:pb-8">
          <div className="w-full md:w-auto">
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.4em] text-yellow-500 mb-3 sm:mb-4 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Selected Works
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 leading-[0.9]">
              Visual Narratives
            </h3>
          </div>
          <div className="text-left md:text-right flex flex-col items-start md:items-end w-full md:w-auto">
            <p className="max-w-md text-neutral-400 text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-light">
              A curated collection of moments frozen in time. Exploring the intersection of light, shadow, and human emotion through the lens.
            </p>
            <div className="flex items-center gap-4 text-[10px] sm:text-xs font-mono text-neutral-500 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm">
               <span>ASSETS: <span className="text-white">{fullPortfolio.length}</span></span>
               <span className="w-[1px] h-3 bg-white/20"></span>
               <span>CURATED: <span className="text-yellow-500">{new Date().getFullYear()}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- FILTER BAR ---------------- */}
      <div className="container mx-auto px-4 sm:px-6 mb-10 sticky top-0 z-40 py-4 -mx-0 backdrop-blur-xl border-b border-white/5 bg-black/80">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
           <Filter className="w-4 h-4 text-neutral-500 mr-2 flex-shrink-0" />
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => {
                 setActiveCategory(cat);
                 setVisibleCount(15); 
               }}
               className={`
                 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full border transition-all duration-300 flex-shrink-0 cursor-pointer active:scale-95 whitespace-nowrap
                 ${activeCategory === cat 
                   ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
                   : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/40 hover:text-white hover:bg-white/5'}
               `}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* ---------------- PART 1: THE GRID ---------------- */}
      <div ref={gridRef} className="container mx-auto px-4 sm:px-6 mb-24 sm:mb-32 z-10 relative">
        {filteredItems.length === 0 && (
           <div className="py-20 text-center text-neutral-500">
              <p>No images found in this category.</p>
           </div>
        )}

        {/* Responsive Grid: 1 col on mobile, 2 on small tablet, 3 on md tablet, 4/5 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {visibleItems.map((item) => (
            <GridItem 
              key={item.id} 
              item={item} 
              onClick={setSelectedImage} 
            />
          ))}
        </div>

        {visibleCount < filteredItems.length && (
          <div className="flex flex-col items-center justify-center mt-12 sm:mt-20 gap-6">
            <div className="h-10 sm:h-16 w-[1px] bg-gradient-to-b from-white/0 via-yellow-500 to-white/0 animate-pulse" />
            <button 
              onClick={() => setVisibleCount(prev => Math.min(prev + 30, filteredItems.length))}
              className={`group relative px-8 sm:px-10 py-3 sm:py-4 bg-neutral-900 hover:bg-yellow-500 hover:text-black text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ring-1 ring-white/10 hover:ring-yellow-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] ${buttonClass}`}
            >
              <span className="flex items-center gap-3">
                Load More ({filteredItems.length - visibleCount})
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ---------------- DIVIDER ---------------- */}
      <div className="w-full bg-neutral-900/30 py-20 sm:py-32 my-12 sm:my-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-lg sm:text-3xl md:text-5xl font-light italic text-gray-300 leading-relaxed font-serif max-w-4xl mx-auto">
            &quot;Photography is the story I fail to put into words.&quot;
          </p>
          <div className="flex justify-center mt-8">
             <div className="w-16 sm:w-24 h-[2px] bg-yellow-500" />
          </div>
        </div>
      </div>

      {/* ---------------- PART 2: THE GOLDEN SERIES (Professional Redesign) ---------------- */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 sm:mb-20 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.4em] text-yellow-500 mb-2 uppercase flex items-center gap-3">
               <span className="w-6 sm:w-8 h-[1px] bg-yellow-500"></span>
               Featured Collections
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight">
               Golden Hour
            </h3>
          </div>
          <button 
             onClick={handleViewFullGallery}
             className={`flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest ${buttonClass}`}
          >
             View Archive <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-20 sm:space-y-32">
          {/* Feature 1 - Cinematic Landscape */}
          <div className="group relative w-full max-w-6xl mx-auto cursor-pointer" onClick={() => setSelectedImage(goldenSeries[0])}>
             <div className="relative w-full overflow-hidden bg-neutral-900 rounded-lg sm:rounded-none">
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 opacity-80 sm:opacity-70 group-hover:opacity-50 transition-opacity duration-700" />
               
               <img
                 src={goldenSeries[0].src}
                 alt={goldenSeries[0].title}
                 className="w-full h-auto object-cover sm:object-contain transition-transform duration-1000 min-h-[300px]"
                 onError={(e) => e.currentTarget.style.display = 'none'}
               />
               
               <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 transition-transform duration-500 group-hover:-translate-y-2">
                 <p className="text-[10px] sm:text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">Editor&apos;s Pick</p>
                 <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-1">{goldenSeries[0].title}</h3>
                 <p className="text-xs sm:text-sm text-white/70 font-light">{goldenSeries[0].subtitle}</p>
               </div>
             </div>
          </div>

          {/* Wide Layout with Final Chapter */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center justify-center py-8 sm:py-12 border-t border-white/5">
            <div 
              className="w-full max-w-md md:w-1/2 overflow-hidden bg-neutral-900 cursor-pointer group shadow-2xl rounded-lg sm:rounded-none"
              onClick={() => setSelectedImage(goldenSeries[3])}
            >
              <img
                src={goldenSeries[3].src}
                alt={goldenSeries[3].title}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>

            <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
              <div>
                <span className="text-xs font-bold text-yellow-500 tracking-[0.2em] uppercase mb-2 block">Final Chapter</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-2">{goldenSeries[3].title}</h3>
                <p className="text-base sm:text-lg text-white/60 font-light">{goldenSeries[3].subtitle}</p>
              </div>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md mx-auto md:mx-0">
                Explore the complete archive of visual stories, captured across different seasons and cities.
              </p>
              <button 
                onClick={handleViewFullGallery}
                className={`inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-widest uppercase text-white border-b border-white/30 pb-1 hover:border-yellow-500 hover:text-yellow-500 transition-colors pt-4 ${buttonClass}`}
              >
                View Full Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Footer / Connect ---------------- */}
      <div className="w-full border-t border-white/10 mt-20 sm:mt-32 pt-16 sm:pt-20 pb-10 text-center overflow-hidden relative bg-neutral-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 sm:h-20 bg-gradient-to-b from-transparent to-white/20"></div>
        
        {/* Responsive Footer Text using VW units ensures it never breaks */}
        <h2 className="text-[12vw] md:text-[10rem] font-black text-white tracking-[-0.08em] uppercase drop-shadow-[0_20px_20px_rgba(255,255,255,0.05)] cursor-default select-none animate-cinematic-reveal leading-none">
          PUNEET SHUKLA
        </h2>
        
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-6">
          <p className="text-neutral-500 text-[10px] sm:text-sm tracking-widest uppercase">Available for freelance & collaborations</p>
          <button 
            onClick={handleConnect}
            className={`group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-yellow-500 transition-colors duration-300 rounded-sm font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs overflow-hidden ${buttonClass}`}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Mail className="w-4 h-4" />
              Connect for Projects
            </span>
          </button>
        </div>

        <div className="mt-12 sm:mt-20 flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 text-neutral-600 text-[10px] sm:text-xs tracking-widest">
           <span className={`hover:text-white transition-colors ${buttonClass}`}>INSTAGRAM</span>
           <span className={`hover:text-white transition-colors ${buttonClass}`}>TWITTER</span>
           <span className={`hover:text-white transition-colors ${buttonClass}`}>LINKEDIN</span>
        </div>
        
        <div className="mt-10 text-neutral-800 text-[10px]">
           © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>

      {/* ---------------- CSS ANIMATIONS ---------------- */}
      <style jsx global>{`
        @keyframes modal-enter {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter {
          animation: modal-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        @keyframes cinematic-reveal {
          0% { opacity: 0; letter-spacing: 0.2em; filter: blur(10px); transform: scale(0.95); }
          50% { opacity: 0.5; letter-spacing: 0.05em; filter: blur(5px); }
          100% { opacity: 1; letter-spacing: -0.08em; filter: blur(0); transform: scale(1); }
        }
        .animate-cinematic-reveal {
          animation: cinematic-reveal 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0; 
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Section2;