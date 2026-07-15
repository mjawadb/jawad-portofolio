import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RansomText from './RansomText';
import { supabase } from '../supabaseClient';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Prevent injection by strictly limiting allowed characters
  const handleEmailChange = (e) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9@._+-]/g, '');
    setEmail(sanitized);
  };

  const handleNameChange = (e) => {
    const sanitized = e.target.value.replace(/[<>]/g, '');
    setName(sanitized);
  };

  const handleMessageChange = (e) => {
    const sanitized = e.target.value.replace(/[<>]/g, '');
    setMessage(sanitized);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const { error } = await supabase
      .from('messages')
      .insert([{ name, email, message }]);
      
    setIsSubmitting(false);
    
    if (error) {
      console.error(error);
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#131313] text-white pt-20 pb-0 relative overflow-hidden flex flex-col items-center">

      <div className="max-w-4xl w-full px-8 mb-20 relative z-10">
        <h2 className="text-[15vw] sm:text-[12vw] md:text-[5.5rem] lg:text-8xl font-p5-title mb-12 transform -skew-x-6 text-white">
          <RansomText text="CONTACT ME" shadowColor="#000000" redChars={['C', 'E']} />
        </h2>

        <motion.form
          initial={{ opacity: 0, y: 200, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 1 }}
          viewport={{ once: false, margin: "0px 0px 0px 0px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="bg-white text-black p-8 border-4 border-black shadow-[15px_15px_0px_#732424] flex flex-col space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="text-[4vw] sm:text-xl font-p5-title-second mb-2 uppercase transform -skew-x-6">Your Name</label>
            <input type="text" value={name} onChange={handleNameChange} required className="p-4 bg-gray-200 border-4 border-black focus:outline-none focus:border-[#d92323] font-p5-title-second text-[4vw] sm:text-xl" placeholder="Akira Kurusu" />
          </div>
          <div className="flex flex-col">
            <label className="text-[4vw] sm:text-xl font-p5-title-second mb-2 uppercase transform -skew-x-6">Email</label>
            <input type="email" value={email} onChange={handleEmailChange} required className="p-4 bg-gray-200 border-4 border-black focus:outline-none focus:border-[#d92323] font-p5-title-second text-[4vw] sm:text-xl" placeholder="joker@thieve.net" />
          </div>
          <div className="flex flex-col">
            <label className="text-[4vw] sm:text-xl font-p5-title-second mb-2 uppercase transform -skew-x-6">Message</label>
            <textarea value={message} onChange={handleMessageChange} required className="p-4 bg-gray-200 border-4 border-black focus:outline-none focus:border-[#d92323] font-p5-title-second text-[4vw] sm:text-xl h-32 resize-none" placeholder="Let's steal some hearts..."></textarea>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`self-start text-white font-p5-title-second text-[5vw] sm:text-2xl py-4 px-10 border-4 border-black transform -skew-x-6 shadow-[5px_5px_0px_#000] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all duration-75 ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-black glitch-hover-red'}`}
            >
              {isSubmitting ? 'SENDING...' : 'SEND CALLING CARD'}
            </button>
            {submitStatus === 'success' && (
              <span className="text-[#d92323] font-bold font-p5-title-second uppercase text-xl transform -skew-x-6">Message Sent!</span>
            )}
            {submitStatus === 'error' && (
              <span className="text-red-500 font-bold font-p5-title-second uppercase text-xl transform -skew-x-6">Error Sending!</span>
            )}
          </div>
        </motion.form>

        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-10 md:space-x-10">
          <motion.a
            href="mailto:mjawadb24@gmail.com"
            initial={{ color: "#6b7280" }}
            whileHover={{
              scale: 1.1,
              rotate: -4,
              color: "#d92323",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="font-['Anybody'] font-bold text-[5vw] sm:text-2xl transform"
          >
            mjawadb24@gmail.com
          </motion.a>
          <div className="flex space-x-10 items-center">
            {[
              {
                name: "GITHUB",
                url: "https://github.com/mjawadb",
                path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              },
              {
                name: "LINKEDIN",
                url: "https://www.linkedin.com/in/muhammad-jawad-bufthem-46540a2a7/",
                path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              },
              {
                name: "INSTAGRAM",
                url: "https://www.instagram.com/mjawaadb/",
                path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              }
            ].map(social => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                initial={{ color: "#6b7280" }} // text-gray-500
                whileHover={{
                  scale: 1.15,
                  rotate: -8,
                  color: "#d92323",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="transform"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-[12vw] h-[12vw] sm:w-12 sm:h-12 md:w-14 md:h-14">
                  <path d={social.path} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <footer className="w-full pt-10 pb-[250px] mb-[-150px] -skew-y-[3deg] translate-y-12 bg-[#0e0e0e] border-t-4 border-[#732424] flex flex-col md:flex-row justify-start md:justify-center items-center md:items-start px-[16px] md:px-[64px] gap-4 z-20">
        <div className="text-[#732424] font-bold italic font-['Space_Mono'] text-[12px] uppercase tracking-widest">
          © 2026 MUHAMMAD JAWAD
        </div>
      </footer>
    </section>
  );
}
