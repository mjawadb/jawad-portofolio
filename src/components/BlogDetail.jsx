import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import backImg from '../assets/back.png';
import heroImg from '../assets/hero.png';
import RansomText from './RansomText';
import { supabase } from '../supabaseClient';

export default function BlogDetail({ setView, blogId }) {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single();
        
      if (!error && data) {
        setBlogData(data);
      } else {
        console.error('Error fetching blog detail:', error);
      }
      setLoading(false);
    };
    if (blogId) fetchBlog();
  }, [blogId]);

  const handleBack = () => {
    window.history.pushState({}, '', '/blog');
    setView('blog');
  };

  const titleText = blogData?.title || "LOADING...";
  const redIndices = useMemo(() => {
    const indices = [];
    if (!titleText) return indices;
    for (let i = 0; i < titleText.length; i++) {
      if (titleText[i] !== ' ') indices.push(i);
    }
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, Math.max(1, Math.floor(titleText.length * 0.2)));
  }, [titleText]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center font-p5-title-second text-2xl md:text-4xl transform -skew-x-[12deg] opacity-75 text-center px-4">
        LOADING DATA...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden text-black font-p5-body">
      {/* Screentone Overlay */}
      <div className="absolute inset-0 screentone-bg opacity-10 pointer-events-none mix-blend-multiply z-[1]"></div>
      
      {/* Container */}
      <div className="relative z-10 w-full h-full min-h-screen flex flex-col">
        
        {/* Back Button (Stands alone, top left, relative flow) */}
        <div className="w-full px-6 sm:px-12 pt-6 sm:pt-12 flex justify-start z-50 relative">
          <button 
            onClick={handleBack}
            className="-skew-x-[12deg] bg-[#d92323] p-2 sm:p-3 border-4 border-black hover:border-white shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all duration-75 flex items-center justify-center glitch-hover-red"
          >
            <img src={backImg} alt="Back" className="w-10 sm:w-12 md:w-16 h-auto object-contain" />
          </button>
        </div>

        {/* Blog Detail Content */}
        <div className="w-full max-w-4xl mx-auto px-6 pt-8 sm:pt-12 pb-24 z-10 flex flex-col gap-6 items-center">
          
          {/* Blog Image Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-4/5 lg:w-full relative mt-4 sm:mt-8"
          >
            {/* Red Underlay / Shadow */}
            <div className="absolute inset-0 bg-[#d92323] transform translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 -skew-x-[6deg] z-0"></div>
            
            {/* Image Container */}
            <div className="relative z-10 bg-black border-4 sm:border-8 border-white p-2 sm:p-3 w-full">
              <div className="w-full h-48 sm:h-72 md:h-80 lg:h-96 overflow-hidden relative" style={{ clipPath: 'polygon(1% 0, 100% 2%, 99% 100%, 0 98%)' }}>
                <img 
                  src={blogData?.image_url || heroImg} 
                  alt="Blog Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Date Box (Top Right of Image) */}
            <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 z-20 bg-black text-white px-4 sm:px-6 py-2 transform skew-x-[12deg] rotate-3 shadow-[4px_4px_0px_#d92323] sm:shadow-[8px_8px_0px_#d92323]">
              <span className="font-p5-title text-sm sm:text-2xl uppercase tracking-widest">{blogData?.date || "00/00/0000"}</span>
            </div>
          </motion.div>

          {/* Title (RansomText P5 Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="self-center mt-6 sm:mt-10 mb-2 z-20 w-full px-4 text-center"
          >
            <h1 className="text-white font-p5-title text-4xl sm:text-6xl md:text-7xl uppercase">
              <RansomText text={titleText} redIndices={redIndices} className="justify-center" />
            </h1>
          </motion.div>

            {/* Content Area */}
            <div className="relative p-6 sm:p-10 font-p5-body w-full mt-4">
              {/* Paper Background Element */}
              <div className="absolute inset-0 bg-[#f4f4f4] border-2 sm:border-4 border-black shadow-[15px_15px_0px_#d92323] -z-10"></div>
              
              {/* Text Content */}
              <div className="relative z-10 text-xl sm:text-2xl md:text-3xl leading-relaxed text-black font-semibold max-w-4xl mx-auto space-y-6">
                <p className="first-letter:text-5xl sm:first-letter:text-7xl first-letter:font-p5-title first-letter:text-[#d92323] first-letter:mr-2 first-letter:float-left">
                  {blogData?.description || "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan tincidunt."}
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
