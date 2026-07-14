import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Pengaturan efek per lebih lambat (damping, stiffness, mass)
  const springConfig = { damping: 25, stiffness: 100, mass: 1.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Kursor titik kecil yang lebih responsif untuk akurasi klik
  const dotXSpring = useSpring(cursorX, { damping: 40, stiffness: 400 });
  const dotYSpring = useSpring(cursorY, { damping: 40, stiffness: 400 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // 16 adalah setengah dari ukuran kursor luar (32px)
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
      
      // Deteksi elemen yang bisa diklik
      const target = e.target;
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.cursor-pointer') || 
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* Lingkaran luar yang bergerak lebih lambat (trailing effect) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[10000] mix-blend-difference hidden md:flex items-center justify-center overflow-hidden"
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
          borderColor: isHovering ? '#ffffff' : '#d92323'
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0
        }}
      />
      {/* Titik dalam yang bergerak lebih cepat */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        animate={{
          scale: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: 12, // Offset untuk menengah di dalam lingkaran luar
          translateY: 12,
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
}
