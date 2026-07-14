import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import handBlogImg from '../assets/hand-blog.png';
import backImg from '../assets/back.png';
import heroImg from '../assets/hero.png';
import bgBlogImg from '../assets/bg-blog.png';
import dateImg from '../assets/date.png';
import { supabase } from '../supabaseClient';

export default function Blog({ setView }) {
  const scrollRef = useRef(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data) {
        setBlogs(data);
      } else {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <div
      className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col justify-end items-center"
      onWheel={handleWheel}
    >
      {/* Date Image */}
      <img src={dateImg} alt="Date" className="absolute top-6 sm:top-8 left-4 sm:left-8 z-40 w-32 sm:w-48 md:w-64 h-auto object-contain pointer-events-none drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />

      {/* Back Button */}
      <button
        onClick={() => {
          setView('home');
          window.history.pushState({}, '', '/');
          setTimeout(() => {
            const el = document.getElementById('hero');
            if (el) {
              const offset = window.innerWidth >= 768 && window.innerWidth < 1024 ? 100 : 0;
              const y = el.getBoundingClientRect().top + window.scrollY + offset;
              window.scrollTo({ top: y, behavior: 'instant' });
            }
          }, 50);
        }}
        className="absolute right-8 bottom-12 md:right-auto md:left-8 md:bottom-8 z-50 -skew-x-[12deg] bg-[#d92323] p-2 sm:p-3 border-4 border-black hover:border-white shadow-[5px_5px_0px_rgba(255,255,255,1)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all duration-75 flex items-center justify-center glitch-hover-red"
      >
        <img src={backImg} alt="Back" className="w-10 sm:w-12 md:w-16 h-auto object-contain" />
      </button>

      {/* Background Image with dark overlay effect */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat opacity-40 grayscale-[30%]"
        style={{ backgroundImage: `url(${bgBlogImg})` }}
      ></div>

      {/* Screentone dotted background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden screentone-bg opacity-30 mix-blend-overlay"></div>

      {/* Hand holding phone/blog with slide up animation */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full h-[100dvh] flex justify-center items-start pt-[8vh] md:pt-0 mt-0 md:-mt-[5vh]"
      >
        <div className="relative w-[220%] sm:w-[180%] md:w-[150%] lg:w-[120%] xl:w-full max-w-[1400px] flex-shrink-0">
          {/* Phone Screen Underlay (Behind the phone) */}
          <div
            ref={scrollRef}
            className="absolute top-[8%] md:top-[10%] lg:top-[11%] left-[41%] sm:left-[40%] md:left-[40%] w-[22%] sm:w-[23%] md:w-[24%] h-[65%] sm:h-[72%] md:h-[66%] lg:h-[64%] bg-[#d92323] pt-10 pb-4 pl-1 pr-8 sm:pt-16 sm:pb-4 sm:pr-4 sm:pl-2 overflow-y-auto overflow-x-hidden flex flex-col gap-4 sm:gap-6 z-0 pointer-events-auto [&::-webkit-scrollbar]:hidden"
            style={{ transform: 'rotate(9deg)', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {blogs.length === 0 ? (
              <div className="w-full mt-24 sm:mt-32 flex items-center justify-center">
                <span className="text-white font-p5-title-second transform -skew-x-[12deg] text-xs sm:text-sm md:text-base opacity-50 whitespace-nowrap">
                  LOADING DATA...
                </span>
              </div>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => {
                    window.history.pushState({}, '', `/blog/${blog.id}`);
                    setView(`blog/${blog.id}`);
                  }}
                  className="flex-shrink-0 flex items-center w-[80%] sm:w-[85%] transform -skew-x-[12deg] group cursor-pointer transition-transform hover:scale-105 hover:ml-1 sm:hover:ml-3"
                >
                  {/* Portrait Box */}
                  <div className={`w-[60px] h-[60px] sm:w-20 sm:h-20 md:w-24 md:h-24 ${blog.color} border-2 sm:border-4 border-white flex-shrink-0 z-10 flex items-center justify-center overflow-hidden translate-x-2 sm:translate-x-4 shadow-[-4px_4px_0px_rgba(0,0,0,0.5)]`}>
                    <img loading="lazy" src={blog.image_url || bgBlogImg} alt="Thumbnail" className="w-full h-full object-cover scale-110" />
                  </div>

                  {/* Text Box */}
                  <div className="bg-black border-2 sm:border-4 border-white py-2.5 px-3.5 sm:px-6 flex-grow shadow-[4px_4px_0px_rgba(0,0,0,0.5)] relative flex flex-col justify-center min-h-[56px] sm:min-h-[80px]">
                    {/* Fake Speech Tail */}
                    <div className="absolute top-1/2 -left-2 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-black border-l-2 border-b-2 sm:border-l-4 sm:border-b-4 border-white transform -translate-y-1/2 rotate-45"></div>

                    <h3 className="text-white font-p5-title text-[14px] sm:text-lg md:text-xl leading-tight skew-x-[12deg] relative z-10">{blog.title}</h3>
                    <p className="text-gray-300 font-['Space_Mono'] text-[9px] sm:text-xs md:text-sm skew-x-[12deg] relative z-10 mt-0.5">{blog.date}</p>
                  </div>
                </div>
              )))
            }
            {/* Spacer for bottom padding to ensure last item clears the bezel */}
            <div className="w-full h-[120px] sm:h-[180px] md:h-[240px] flex-shrink-0 pointer-events-none"></div>
          </div>

          {/* The Phone Image (On top, pointer-events-none so we can click the chat behind it) */}
          <img
            src={handBlogImg}
            alt="Blog Hand Phone"
            className="w-full h-auto object-contain object-top drop-shadow-[0_20px_50px_rgba(217,35,35,0.2)] relative z-10 pointer-events-none"
          />
        </div>
      </motion.div>
    </div>
  );
}
