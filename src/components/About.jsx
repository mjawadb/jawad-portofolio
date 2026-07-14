import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import RansomText from './RansomText';
import exclaMarkImg from '../assets/excla-mark.webp';

export default function About() {
  const [isWiggling, setIsWiggling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 800);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const photoRefMobile = useRef(null);
  const isPhotoInViewMobile = useInView(photoRefMobile, { margin: "-15% 0px -15% 0px", amount: 0.3 });
  
  const photoRefTablet = useRef(null);
  const isPhotoInViewTablet = useInView(photoRefTablet, { margin: "0px 0px -25% 0px", amount: 0.2 });

  const [isMobileHovered, setIsMobileHovered] = useState(false);

  useEffect(() => {
    let timeout;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isMobile = window.innerWidth < 768;
    
    if (isTablet) {
      if (isPhotoInViewTablet) {
        timeout = setTimeout(() => {
          setIsMobileHovered(true);
        }, 600);
      } else {
        setIsMobileHovered(false);
      }
    } else if (isMobile) {
      if (isPhotoInViewMobile) {
        timeout = setTimeout(() => {
          setIsMobileHovered(true);
        }, 600);
      } else {
        setIsMobileHovered(false);
      }
    }
    return () => clearTimeout(timeout);
  }, [isPhotoInViewMobile, isPhotoInViewTablet]);

  return (
    <section id="about" className="px-[16px] md:px-[64px] py-20 bg-[#1f1f1f] mb-20 clip-slant-reverse relative">
      <div className="absolute top-0 right-0 w-1/2 h-full screentone-bg opacity-20 pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10 max-w-7xl mx-auto">
        
        {/* Text Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px 0px -200px 0px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6 flex flex-col md:pr-8 lg:pr-12 order-2 md:order-1"
        >
          <h2 className="text-[18vw] sm:text-[14vw] md:text-8xl lg:text-[8rem] font-p5-title uppercase text-white transform -skew-x-12 -rotate-6 self-start mt-0 mb-2 ml-4 md:ml-0 whitespace-nowrap">
            <RansomText text="ABOUT ME" redChars={['B', 'M']} className="!flex-nowrap" />
          </h2>
          <p className="font-p5-title-second text-[3.5vw] sm:text-xl italic border-b-4 border-black pb-4 text-white">
            "I am thou, thou art I..." <span className="text-[2vw] sm:text-sm whitespace-nowrap font-p5-title-second font-normal text-[#b4b5b5] not-italic ml-2">...just kidding</span>
          </p>
          <div className="font-p5-body text-xl sm:text-2xl text-[#e2e2e2] max-w-lg leading-relaxed bg-[#353535] p-6 border-l-4 border-[#732424] space-y-4">
            <p>
              Hi, I'm Muhammad Jawad, a Game Developer passionate about creating immersive and meaningful gaming experiences.
            </p>
            <p>
              I love turning ideas into interactive worlds through programming, game design, and creative problem-solving. Beyond game development, I'm always open to cross-disciplinary projects and new creative challenges.
            </p>
            <p>
              This is my personal blog and portfolio, where I share my projects, experiences, and journey as a developer.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="font-p5-title-second text-base bg-black text-white px-4 py-1 -skew-x-12 border border-[#353535] uppercase">Game Dev</span>
            <span className="font-p5-title-second text-base bg-black text-white px-4 py-1 -skew-x-12 border border-[#353535] uppercase">AI Enthusiast</span>
            <span className="font-p5-title-second text-base bg-black text-white px-4 py-1 -skew-x-12 border border-[#353535] uppercase">Learner</span>
          </div>
        </motion.div>

        {/* Image Column */}
        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: false, margin: "-50px 0px -200px 0px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          className="order-1 md:order-2 w-[90%] md:w-full mx-auto relative"
        >
          <motion.img
            src={exclaMarkImg}
            alt="!"
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            whileInView={isWiggling ? {
              opacity: 1,
              scale: [1, 1.2, 1.2, 1],
              rotate: [-15, -30, 0, -25, -15],
            } : {
              opacity: 1, scale: 1, rotate: -15
            }}
            viewport={{ once: false }}
            transition={isWiggling ? { duration: 0.5 } : { type: 'spring', stiffness: 150, delay: 0.4 }}
            className="absolute -top-12 -left-2 md:-top-16 md:left-0 lg:-top-20 lg:left-4 w-32 md:w-40 lg:w-48 z-30 drop-shadow-[5px_5px_0px_rgba(0,0,0,0.8)]"
          />

          <div className="relative p-4 md:pl-8 skew-pulse">
            <div className="absolute inset-0 bg-[#d92323] transform translate-x-4 translate-y-4 -skew-x-6 z-0"></div>
            <div className="relative z-10 bg-black border-4 border-white p-2">
              <div className="w-full h-96 overflow-hidden">
                {/* Wrapped with both refs to track triggers independently */}
                <div ref={photoRefTablet} className="w-full h-full">
                  <div 
                    ref={photoRefMobile}
                    className={`w-full h-full bg-cover bg-top transition-all duration-700 ease-in-out cursor-pointer ${isMobileHovered ? 'grayscale-0 scale-110' : 'grayscale hover:grayscale-0 hover:scale-110'}`}
                    style={{ backgroundImage: 'url(/about-photo.png)' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
