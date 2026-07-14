import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import RansomText from './RansomText';

import escapeFromHellImg from '../assets/projects/escape-from-hell.png';
import mario3dImg from '../assets/projects/mario-3d.png';
import zombieBeatdownImg from '../assets/projects/zombie-beatdown.png';

import vid1 from '../assets/projects/card-1.mp4';
import vid2 from '../assets/projects/card-2.mp4';
import vid3 from '../assets/projects/card-3.mp4';

const projects = [
  {
    title: "Escape from HELL",
    desc: "A 2D action platformer where players escape the underworld by overcoming deadly traps and challenging enemies.",
    img: escapeFromHellImg,
    video: vid1,
    link: "https://mjawadb.itch.io/escape-from-hell-pc",
    imgClass: "object-center"
  },
  {
    title: "Zombie Beatdown",
    desc: "A rhythm-based zombie game made in 48 hours, combining music and fast-paced action.",
    img: zombieBeatdownImg,
    video: vid2,
    link: "https://mjawadb.itch.io/zombie-beatdown",
    imgClass: "object-top"
  },
  {
    title: "Mario 3D",
    desc: "A 3D recreation of the classic Mario platforming experience, featuring movement, jumping mechanics, and level exploration.",
    img: mario3dImg,
    video: vid3,
    link: "https://www.tiktok.com/@mjawaadb/video/7360725369554554118",
    imgClass: "object-center"
  }
];

const ProjectCard = ({ proj, idx }) => {
  const rotClass = idx % 2 === 0 ? '-rotate-1' : 'rotate-2';
  const skewClass = idx % 2 === 0 ? 'skew-y-1' : '-skew-y-2';
  const shadowSkew = idx % 2 === 0 ? '-skew-y-3' : 'skew-y-3';
  const textBg = idx === 1 ? 'bg-[#d92323] text-white' : 'bg-white text-black';

  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { margin: "-15% 0px -15% 0px", amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeout;
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      if (isInView) {
        timeout = setTimeout(() => {
          setIsHovered(true);
        }, 600);
      } else {
        setIsHovered(false);
      }
    }
    return () => clearTimeout(timeout);
  }, [isInView]);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(e => console.log(e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px 0px -50px 0px" }}
      transition={{ delay: idx * 0.2, type: 'spring', stiffness: 100, damping: 20 }}
    >
      <motion.a 
        ref={ref}
        href={proj.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={isHovered ? "hover" : "initial"}
        className="block relative cursor-pointer"
      >
        <div className="relative mb-6">
          <div className={`absolute inset-0 bg-[#d92323] ${shadowSkew} transform transition-transform duration-300 -z-10 ${isHovered ? 'translate-x-6 translate-y-6' : 'translate-x-3 translate-y-3'}`}></div>
          
          <div className={`bg-black border-4 border-black ${skewClass} overflow-hidden h-[60vw] sm:h-64 shadow-2xl relative`}>
            <motion.img 
              variants={{
                initial: { opacity: 1, scale: 1 },
                hover: { opacity: 0, scale: 1.05 }
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={proj.img} 
              alt={proj.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${proj.imgClass || 'object-center'}`}
            />
            <motion.video 
              ref={videoRef}
              variants={{
                initial: { opacity: 0, scale: 1.1 },
                hover: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={proj.video}
              preload="none"
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className={`${textBg} p-6 hard-shadow transition-transform duration-300 ${isHovered ? 'rotate-0' : rotClass}`}>
          <h3 className="text-3xl sm:text-4xl font-p5-body mb-2 uppercase" style={{ WebkitTextStroke: '1px currentColor' }}>{proj.title}</h3>
          <p className="text-xl sm:text-2xl font-p5-body opacity-90 leading-snug">{proj.desc}</p>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="w-full pt-10 pb-20 px-[16px] md:px-[64px] relative mb-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full screentone-bg opacity-5 -z-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 flex justify-center md:justify-start items-end gap-4">
          <h2 className="text-[18vw] sm:text-[14vw] md:text-8xl lg:text-[8rem] font-p5-title uppercase text-white border-b-8 border-[#d92323] leading-none text-center md:text-left pb-2 md:pb-4 transform -skew-x-12 rotate-6 md:rotate-2">
            <RansomText text="3 SELECTED PROJECTS" redChars={['L', 'C', 'P', 'R']} />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {projects.map((proj, idx) => (
            <ProjectCard key={idx} proj={proj} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
