import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gedungImg from '../assets/gedung.webp';


export default function IntroSequence() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 80, damping: 20, restDelta: 0.001 });

  // As user scrolls from 0 to 800px, character swings/walks across
  // -150% hides it further to the left, 120vw pushes it further to the right.
  const charX = useTransform(smoothScrollY, [0, 800], ['-150%', '120vw']);
  const charY = useTransform(smoothScrollY, [0, 800], ['-10vh', '40vh']);
  const charRotate = useTransform(smoothScrollY, [0, 800], [-20, 20]);
  const charOpacity = useTransform(smoothScrollY, [600, 800], [1, 0]);
  
  // Building parallax effect: shifts left during scroll down (reduced for desktop)
  const gedungX = useTransform(smoothScrollY, [0, 800], ['0vw', '-3vw']);

  // At 600px scroll, pull the whole red screen up so it's fully gone by 800px
  const screenY = useTransform(smoothScrollY, [600, 800], ['0vh', '-100vh']);

  return (
    <motion.div 
      style={{ y: screenY }}
      className="fixed top-0 left-0 w-full h-screen bg-[#d92323] z-[60] overflow-hidden flex items-center justify-center will-change-transform"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden screentone-bg opacity-30 z-[0]"></div>
      
      {/* City Silhouette Background */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center z-[0]" 
        style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAAYzFKQIn1rZYfQej8gCMWA7OwN3cOvy0odOLBWzbk4tucbB1CTYbkre7alNKuJgMyylIGw4Yha5hcbDWdrAhJaXx5wjl6NJAW94blqGyRLguVv6-2Lvla9ewEwTeWMNSI-zZoHhctSdxONPso5Af8HcBFLHXD2O0165RFisl2TF5qreaavaeGeNwW7ZsypSEFs_n_VzNScbB3Jex9ogEtgoUOm_TbwMi2QUANZDErjzZ2GlNfhEoTzjp08lM7rmLCcwbvwWrLU3I)' }}
      ></div>

      {/* Additional Foreground City Layer */}
      <motion.div 
        style={{ x: gedungX, opacity: charOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <motion.img 
          src={gedungImg}
          alt="Foreground City Background"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="absolute -bottom-[22vh] -right-[80vw] md:-bottom-[35vh] md:-right-[48vw] lg:-right-[35vw] h-[120vh] md:h-[150vh] w-auto object-contain object-bottom pointer-events-none max-w-none" 
        />
      </motion.div>
      


      {/* Swinging Character Container */}
      <motion.div
        style={{ 
          x: charX, 
          y: charY, 
          rotate: charRotate, 
          opacity: charOpacity,
          originX: 0.5,
          originY: -2 // Pivot point high above for pendulum effect
        }}
        className="absolute left-0 top-0 md:-top-[10vh] w-[110vw] sm:w-[85vw] md:w-[80vw] lg:w-[50vw] max-w-[800px] flex flex-col items-center justify-start z-20 will-change-transform"
      >
        {/* The Rope */}
        <div 
          className="w-1.5 md:w-2 h-[200vh] absolute bottom-[72%] left-[45%] md:left-[47%] -translate-x-1/2 z-[-1] border-l-[1px] border-r-[1px] border-black shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, #ffffff 0, #ffffff 6px, #000000 6px, #000000 8px)'
          }}
        ></div>
        
        {/* Character Image */}
        <img
          src="/me-swing.png"
          alt="Me Swing"
          className="w-full object-contain relative z-10 drop-shadow-[8px_8px_0px_rgba(0,0,0,0.5)]"
        />
      </motion.div>
    </motion.div>
  );
}
