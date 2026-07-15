import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RansomText from './RansomText';

// Lang
import cSharpIcon from '../assets/skills/lang/csharp.svg';
import cppIcon from '../assets/skills/lang/cpp.svg';
import cIcon from '../assets/skills/lang/c.svg';
import jsIcon from '../assets/skills/lang/js.svg';
import mysqlIcon from '../assets/skills/lang/mysql.svg';
import pythonIcon from '../assets/skills/lang/python.svg';

// Game Dev
import asepriteIcon from '../assets/skills/game-dev/aseprite.svg';
import blenderIcon from '../assets/skills/game-dev/blender.svg';
import unityIcon from '../assets/skills/game-dev/unity.svg';
import unrealEngineIcon from '../assets/skills/game-dev/unreal-engine.svg';

// Framework
import bootstrapIcon from '../assets/skills/framework/bootstrap.svg';
import nodejsIcon from '../assets/skills/framework/nodejs.svg';
import reactIcon from '../assets/skills/framework/react.svg';
import tailwindIcon from '../assets/skills/framework/tailwind.svg';

// Version Control
import gitIcon from '../assets/skills/version-control/git.svg';
import githubIcon from '../assets/skills/version-control/github.svg';

// Edits
import aeIcon from '../assets/skills/edits/ae.svg';
import davinciIcon from '../assets/skills/edits/davinci.svg';
import premiereProIcon from '../assets/skills/edits/premiere-pro.svg';

const skillCategories = [
  {
    name: "LANGUAGE",
    delay: 0,
    headerClass: "bg-white text-black px-4 py-1 skew-x-12 hard-shadow-red",
    skills: [
      { name: "C", image: cIcon, shape: "clip-hex", color: "bg-[#d92323]", shadow: "hard-shadow" },
      { name: "C++", image: cppIcon, shape: "clip-diamond", color: "bg-white", shadow: "hard-shadow-red" },
      { name: "C#", image: cSharpIcon, shape: "clip-hex", color: "bg-[#d92323]", shadow: "hard-shadow" },
      { name: "PYTHON", image: pythonIcon, shape: "clip-diamond", color: "bg-white", shadow: "hard-shadow-red" },
      { name: "JAVASCRIPT", image: jsIcon, shape: "clip-hex", color: "bg-[#d92323]", shadow: "hard-shadow" },
      { name: "MYSQL", image: mysqlIcon, shape: "clip-diamond", color: "bg-white", shadow: "hard-shadow-red" }
    ]
  },
  {
    name: "GAME DEV",
    delay: 0.1,
    headerClass: "bg-[#d92323] text-white px-4 py-1 -skew-x-12 hard-shadow",
    skills: [
      { name: "UNITY", image: unityIcon, shape: "clip-hex", color: "bg-white", shadow: "hard-shadow-red" },
      { name: "UNREAL ENGINE", image: unrealEngineIcon, shape: "clip-diamond", color: "bg-[#d92323]", shadow: "hard-shadow" },
      { name: "BLENDER", image: blenderIcon, shape: "clip-hex", color: "bg-white", shadow: "hard-shadow-red" },
      { name: "ASEPRITE", image: asepriteIcon, shape: "clip-diamond", color: "bg-[#d92323]", shadow: "hard-shadow" }
    ]
  },
  {
    name: "FRAMEWORK & LIBRARIES",
    delay: 0.2,
    headerClass: "bg-black text-white border-2 border-white px-4 py-1 skew-x-12 hard-shadow-red",
    skills: [
      { name: "NODE.JS", image: nodejsIcon, shape: "clip-hex", color: "bg-[#d92323]", shadow: "hard-shadow" },
      { name: "TAILWIND", image: tailwindIcon, shape: "clip-diamond", color: "bg-white", shadow: "hard-shadow-red" },
      { name: "REACTJS", image: reactIcon, shape: "clip-hex", color: "bg-[#d92323]", shadow: "hard-shadow" },
      { name: "BOOTSTRAP", image: bootstrapIcon, shape: "clip-diamond", color: "bg-white", shadow: "hard-shadow-red" }
    ]
  },
  {
    name: "VERSION CONTROL TOOLS",
    delay: 0.3,
    headerClass: "bg-white text-black px-4 py-1 -skew-x-6 hard-shadow-red",
    skills: [
      { name: "GIT", image: gitIcon, shape: "clip-hex", color: "bg-[#d92323]", shadow: "hard-shadow" },
      { name: "GITHUB", image: githubIcon, shape: "clip-diamond", color: "bg-white", shadow: "hard-shadow-red" }
    ]
  },
  {
    name: "EDITING",
    delay: 0.4,
    headerClass: "bg-[#d92323] text-white px-4 py-1 skew-x-6 hard-shadow",
    skills: [
      { name: "PREMIERE PRO", image: premiereProIcon, shape: "clip-hex", color: "bg-white", shadow: "hard-shadow-red" },
      { name: "AFTER EFFECTS", image: aeIcon, shape: "clip-diamond", color: "bg-[#d92323]", shadow: "hard-shadow" },
      { name: "DAVINCI RESOLVE", image: davinciIcon, shape: "clip-hex", color: "bg-white", shadow: "hard-shadow-red" }
    ]
  }
];

export default function TechStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const thunderY = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section ref={ref} id="tech-stack" className="px-[16px] md:px-[64px] py-24 bg-white text-black clip-slant-reverse mb-20 relative overflow-hidden">
      {/* HTML-based Thunder Parallax Background (Moved behind screentone) */}
      <motion.div 
        style={{ y: thunderY }}
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 md:top-1/4 -left-[50%] md:-left-[20%] w-[200%] md:w-[140%] h-[1500px] md:h-[500px] pointer-events-none z-0 flex items-center justify-center rotate-[25deg] md:rotate-12 scale-[1.2] md:scale-100 opacity-40 will-change-transform"
      >
        <div className="relative w-full h-full flex items-center">
          {/* Left section / Top section on mobile */}
          <div className="absolute left-[-10%] md:left-0 top-[20%] md:top-[30%] w-[60%] md:w-[45%] h-[100px] md:h-[150px] bg-[#d92323] border-4 md:border-8 border-black skew-x-[-40deg] skew-y-[5deg]"></div>
          
          {/* Middle jagged cut */}
          <div className="absolute left-[20%] md:left-[35%] top-[35%] md:top-[15%] w-[50%] md:w-[35%] h-[150px] md:h-[200px] bg-[#d92323] border-4 md:border-8 border-black skew-x-[50deg] -skew-y-[10deg]"></div>
          
          {/* Right section / Bottom section on mobile */}
          <div className="absolute left-[50%] md:left-[60%] top-[55%] md:top-[40%] w-[60%] md:w-[45%] h-[120px] md:h-[140px] bg-[#d92323] border-4 md:border-8 border-black skew-x-[-35deg] skew-y-[8deg]"></div>
          
          {/* Accent splatters/sparks */}
          <div className="absolute left-[10%] md:left-[25%] top-[10%] md:top-[10%] w-[15%] md:w-[8%] h-[50px] md:h-[60px] bg-[#d92323] border-4 md:border-8 border-black skew-x-[45deg] -rotate-12"></div>
          <div className="absolute left-[40%] md:left-[55%] top-[70%] md:top-[70%] w-[20%] md:w-[12%] h-[70px] md:h-[80px] bg-[#d92323] border-4 md:border-8 border-black skew-x-[-45deg] rotate-6"></div>
          <div className="absolute left-[70%] md:left-[85%] top-[25%] md:top-[15%] w-[15%] md:w-[10%] h-[50px] md:h-[50px] bg-[#d92323] border-4 md:border-8 border-black skew-x-[30deg]"></div>

          {/* Extra bottom thunder elements specifically to fill medium screen vertical gaps */}
          <div className="hidden md:block lg:hidden absolute left-[-5%] top-[125%] w-[45%] h-[120px] bg-[#d92323] border-8 border-black skew-x-[40deg] -skew-y-[5deg]"></div>
          <div className="hidden md:block lg:hidden absolute left-[45%] top-[105%] w-[60%] h-[160px] bg-[#d92323] border-8 border-black skew-x-[-45deg] skew-y-[10deg]"></div>
          
          {/* Extra bottom sparks */}
          <div className="hidden md:block lg:hidden absolute left-[15%] top-[145%] w-[12%] h-[50px] bg-[#d92323] border-8 border-black skew-x-[-30deg] -rotate-12"></div>
          <div className="hidden md:block lg:hidden absolute left-[60%] top-[135%] w-[15%] h-[80px] bg-[#d92323] border-8 border-black skew-x-[40deg] rotate-12"></div>
          <div className="hidden md:block lg:hidden absolute left-[85%] top-[155%] w-[10%] h-[65px] bg-[#d92323] border-8 border-black skew-x-[-25deg] rotate-6"></div>

          {/* Extra bottom elements for Mobile only */}
          <div className="block md:hidden absolute left-[-10%] top-[85%] w-[70%] h-[120px] bg-[#d92323] border-4 border-black skew-x-[45deg] -skew-y-[8deg]"></div>
          <div className="block md:hidden absolute left-[35%] top-[95%] w-[60%] h-[150px] bg-[#d92323] border-4 border-black skew-x-[-35deg] rotate-6"></div>
          <div className="block md:hidden absolute left-[65%] top-[82%] w-[15%] h-[60px] bg-[#d92323] border-4 border-black skew-x-[25deg] -rotate-12"></div>
        </div>
      </motion.div>

      {/* Screentone Overlay (z-[1] so it overlays the thunder but stays behind content) */}
      <div className="absolute inset-0 screentone-bg opacity-10 pointer-events-none z-[1]"></div>
      
      <div className="mb-16 flex justify-center md:justify-start items-end relative z-10 w-full max-w-7xl mx-auto">
        <h2 className="text-[20vw] sm:text-[14vw] md:text-8xl lg:text-[10rem] leading-none font-p5-title uppercase text-[#d92323] text-center md:text-left inline-block border-b-8 border-black pb-2 md:pb-4 transform -rotate-2">
          <RansomText text="FIELD SKILLS" whiteChars={['F', 'E', 'K', 'S']} redIndices={[6]} />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full max-w-7xl mx-auto relative z-10">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px 0px -50px 0px" }}
            transition={{ delay: category.delay, type: 'spring', stiffness: 100, damping: 20 }}
            className="flex flex-col gap-6 w-full"
          >
            <h3 className={`font-p5-title-second text-xl md:text-2xl uppercase self-start ${category.headerClass}`}>
              {category.name}
            </h3>
            
            <div className="flex flex-wrap gap-6">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="group relative flex flex-col items-center justify-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center transition-transform duration-300 group-hover:scale-125 will-change-transform">
                    <img loading="lazy" src={skill.image} alt={skill.name} className="w-20 h-20 md:w-24 md:h-24 object-contain opacity-85 filter grayscale-[15%] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]" />
                  </div>
                  <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 font-['Space_Mono'] text-[12px] font-bold text-white bg-[#353535] px-3 py-1 -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
