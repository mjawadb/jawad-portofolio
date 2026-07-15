import { Link } from 'react-scroll';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'hero', label: 'HEIST', offset: 0 },
  { id: 'about', label: 'INTEL', offset: -100 },
  { id: 'projects', label: 'ARSENAL', offset: -100 },
  { id: 'contact', label: 'CONTACT', offset: -100 },
  { id: 'blog', label: 'BLOG', isView: true },
];

export default function Navbar({ currentView, setView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    if (currentView === 'blog') {
      setActiveSection('blog');
    } else {
      setActiveSection('hero');
    }
  }, [currentView]);

  // Custom scroll spy that triggers earlier (when section is 50% down the viewport)
  useEffect(() => {
    if (currentView === 'blog') return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const sections = navItems.filter(item => !item.isView).map(item => item.id);
      let current = null;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Trigger when the section top reaches 50% of the screen height
          if (rect.top <= window.innerHeight * 0.5) {
            current = id;
          }
        }
      }

      if (current) {
        setActiveSection(prev => (prev !== current ? current : prev));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount/update

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const getScrollDuration = (distance) => {
    const absDist = Math.abs(distance);
    // Base 800ms + 0.4ms per pixel of travel. Min 1000ms, Max 2500ms.
    return Math.min(Math.max(absDist * 0.4 + 800, 1000), 2500);
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    isScrollingRef.current = true;
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Use a fixed max timeout. react-scroll duration is max 2500ms.
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 2600);
  };

  return (
    <>
      <nav 
        className="flex justify-between items-center w-full px-[16px] md:px-[64px] pt-4 md:pt-8 pb-4 bg-[#131313] text-[#d92323] font-p5-title text-[22px] md:text-[28px] uppercase fixed top-0 z-50 origin-left border-b-4 border-[#732424] drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] -skew-y-[2deg]"
      >
        <div className="font-p5-title-second text-[4.5vw] sm:text-[4vw] md:text-[36px] lg:text-[40px] whitespace-nowrap text-[#d92323] bg-[#e2e2e2] px-4 py-1 -skew-x-[12deg] flex items-center">
          PHANTOM ARCHIVE
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => (
            item.isView ? (
              <button 
                key={item.id}
                onClick={() => {
                  setView('blog');
                  window.history.pushState({}, '', '/blog');
                  window.scrollTo(0,0);
                }}
                className={`relative px-3 py-1 -skew-x-[12deg] cursor-pointer transition-all duration-75 flex items-center justify-center ${
                  currentView === 'blog' 
                    ? "text-white scale-110" 
                    : "text-[#e2e2e2] hover:text-[#d92323] hover:-skew-x-[10deg] hover:scale-110"
                }`}
              >
                {currentView === 'blog' && (
                  <motion.div
                    layoutId="activeNavBackgroundDesktop"
                    className="absolute inset-0 bg-[#d92323] -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ) : currentView === 'home' ? (
              <Link 
                key={item.id}
                to={item.id}
                onClick={() => handleNavClick(item.id)}
                smooth="easeInOutQuint" duration={getScrollDuration} offset={item.offset}
                className={`relative px-3 py-1 -skew-x-[12deg] cursor-pointer transition-all duration-75 flex items-center justify-center ${
                  activeSection === item.id 
                    ? "text-white scale-110" 
                    : "text-[#e2e2e2] hover:text-[#d92323] hover:-skew-x-[10deg] hover:scale-110"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavBackgroundDesktop"
                    className="absolute inset-0 bg-[#d92323] -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => {
                  setView('home');
                  window.history.pushState({}, '', '/');
                  setTimeout(() => {
                    const el = document.getElementById(item.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY + item.offset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="relative px-3 py-1 -skew-x-[12deg] cursor-pointer transition-all duration-75 flex items-center justify-center text-[#e2e2e2] hover:text-[#d92323] hover:-skew-x-[10deg] hover:scale-110"
              >
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          ))}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 bg-[#d92323] border-2 border-black -skew-x-[10deg]"
        >
          <span className={`block w-6 h-1 bg-black transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`block w-6 h-1 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-1 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%", skewY: -2 }}
            animate={{ opacity: 1, y: 0, skewY: -2 }}
            exit={{ opacity: 0, y: "-100%", skewY: -2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-full bg-[#131313] border-b-4 border-[#732424] z-40 flex flex-col items-center pt-[100px] pb-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] -skew-y-[2deg]"
          >
            <div className="flex flex-col space-y-4 items-center w-full px-8 font-p5-title text-[8vw] sm:text-[32px]">
              {navItems.map((item) => (
                item.isView ? (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsOpen(false);
                      setView('blog');
                      window.history.pushState({}, '', '/blog');
                      window.scrollTo(0,0);
                    }}
                    className={`relative px-6 py-2 -skew-x-[12deg] text-center w-full cursor-pointer transition-all border-2 ${
                      currentView === 'blog'
                        ? "text-white border-black"
                        : "text-[#e2e2e2] border-transparent hover:border-[#d92323] hover:text-[#d92323]"
                    }`}
                  >
                    {currentView === 'blog' && (
                      <motion.div
                        layoutId="activeNavBackgroundMobile"
                        className="absolute inset-0 bg-[#d92323] -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                ) : currentView === 'home' ? (
                  <Link
                    key={item.id}
                    to={item.id}
                    smooth="easeInOutQuint" duration={getScrollDuration} offset={window.innerWidth >= 768 && window.innerWidth < 1024 && item.id === 'hero' ? 100 : item.offset}
                    onClick={() => {
                      setIsOpen(false);
                      handleNavClick(item.id);
                    }}
                    className={`relative px-6 py-2 -skew-x-[12deg] text-center w-full cursor-pointer transition-all border-2 ${
                      activeSection === item.id
                        ? "text-white border-black"
                        : "text-[#e2e2e2] border-transparent hover:border-[#d92323] hover:text-[#d92323]"
                    }`}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeNavBackgroundMobile"
                        className="absolute inset-0 bg-[#d92323] -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsOpen(false);
                      setView('home');
                      window.history.pushState({}, '', '/');
                      setTimeout(() => {
                        const el = document.getElementById(item.id);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY + item.offset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="relative px-6 py-2 -skew-x-[12deg] text-center w-full cursor-pointer transition-all border-2 text-[#e2e2e2] border-transparent hover:border-[#d92323] hover:text-[#d92323]"
                  >
                    <span className="relative z-10">{item.label}</span>
                  </button>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
