import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import IntroSequence from './components/IntroSequence';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) return path.substring(1); // e.g. 'blog/1'
    return path.includes('/blog') ? 'blog' : 'home';
  });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.05,
      touchMultiplier: 1.2,
      wheelMultiplier: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [currentView]);

  return (
    <div className="bg-[#000000] min-h-screen text-white overflow-x-clip relative font-p5-body">
      <CustomCursor />
      
      {currentView === 'home' && (
        <>
          <IntroSequence />
          {/* Scroll padding for intro to finish before showing real content */}
          <div className="h-[800px] bg-black"></div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col bg-black">
        {currentView === 'home' && <Navbar currentView={currentView} setView={setCurrentView} />}
        
        {currentView === 'home' ? (
          <>
            <Hero />
            <About />
            <Projects />
            <TechStack />
            <Footer />
          </>
        ) : currentView.startsWith('blog/') ? (
          <BlogDetail setView={setCurrentView} blogId={currentView.split('/')[1]} />
        ) : (
          <Blog setView={setCurrentView} />
        )}
      </div>
    </div>
  );
}

export default App;
