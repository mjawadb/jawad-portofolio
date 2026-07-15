import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import heroImg from '../assets/hero.webp';
import streamStartImg from '../assets/stream-start.webp';

function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const observer = new ResizeObserver(syncSize);
    observer.observe(canvas);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = v_texCoord;
    float scale = 40.0;
    vec2 grid_uv = fract(uv * scale);
    float dist = distance(grid_uv, vec2(0.5));
    float noise = random(floor(uv * 10.0 + u_time * 0.1));
    vec3 color1 = vec3(0.85, 0.14, 0.14); // P5 Red
    vec3 color2 = vec3(0.0, 0.0, 0.0); // Black
    float stripes = step(0.8, fract(uv.x * 5.0 + uv.y * 2.0 + u_time * 0.5));
    vec3 finalColor = mix(color2, color1, stripes * 0.4);
    if (dist < 0.3) {
        finalColor = mix(finalColor, vec3(1.0), 0.1);
    }
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5));
    finalColor *= vignette;
    gl_FragColor = vec4(finalColor, 1.0);
}`;

    function cs(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationId;
    function render(t) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full opacity-50 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '-15%' : '-80%']);

  const [isWiggling, setIsWiggling] = useState(false);

  useEffect(() => {
    // Wait for initial animation to finish before starting intervals
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIsWiggling(true);
        setTimeout(() => setIsWiggling(false), 600);
      }, 4000); // Play every 4 seconds
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(startTimeout);
  }, []);



  return (
    <section id="hero" ref={ref} className="relative h-[150vh] min-h-[1200px] w-full bg-black mb-20">
      <div className="sticky top-0 w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden px-[16px] md:px-[64px] py-20 clip-slant bg-black">
      <ShaderBackground />

      {/* Background Hero Content (Stream Start Image) */}
      <motion.div style={{ y: contentY }} className="absolute inset-0 z-30 flex items-center justify-center w-full px-[16px] md:px-[64px] pointer-events-none">
        <div className="flex flex-col md:flex-row items-center w-full max-w-7xl px-8 mt-10 md:mt-32 lg:mt-32 h-full">
          {/* Left Side: Spacer */}
          <div className="w-full md:w-1/2 min-h-[50px] md:min-h-[600px]"></div>

          {/* Right Side: Stream Start Image */}
          <div className="w-full md:w-1/2 relative flex flex-col items-center md:items-start text-center md:text-left h-full justify-center md:justify-start pt-0">
            <motion.img
              src={streamStartImg}
              alt="Stream Starting"
              initial={{ opacity: 0, scale: 0.5, rotate: -20, y: 50 }}
              animate={isWiggling ? {
                opacity: 1,
                y: 0,
                scale: [1, 1.05, 1.05, 1],
                rotate: [-6, 0, -12, 0, -12, -6]
              } : {
                opacity: 1, scale: 1, rotate: -6, y: 0
              }}
              transition={isWiggling ? { duration: 0.6 } : { type: 'spring', stiffness: 150, damping: 10 }}
              className="w-[130%] sm:w-[110%] md:w-[180%] max-w-none -mt-64 md:mt-[200px] lg:mt-4 mb-8 drop-shadow-[10px_10px_0px_rgba(0,0,0,0.5)] -ml-[10%] sm:-ml-0 md:-ml-[50%]"
            />
          </div>
        </div>
      </motion.div>

      {/* Absolute Left Character Image (z-20) */}
      <motion.img
        src={heroImg}
        alt="Hero character"
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, delay: 0.2 }}
        className="absolute bottom-[-20px] md:bottom-[-60px] lg:bottom-[-70px] left-[-5%] sm:left-[0%] md:left-[5%] w-[160%] sm:w-[130%] md:w-[100vw] lg:w-[70vw] max-w-none max-h-none md:max-h-[110vh] object-contain object-left-bottom pointer-events-none drop-shadow-[20px_20px_0px_rgba(0,0,0,0.5)] z-20"
      />

      {/* Foreground Hero Content (Text Box) */}
      <motion.div style={{ y: contentY }} className="relative z-30 md:z-30 lg:z-10 flex flex-col md:flex-row items-center w-full max-w-7xl px-8 mt-10 md:mt-32 lg:mt-32 mx-auto pointer-events-none">

        {/* Left Side: Spacer */}
        <div className="w-full md:w-1/2 min-h-[50px] md:min-h-[600px]"></div>

        {/* Right Side: Text Box */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center md:items-start text-center md:text-left pt-0">

          {/* Invisible Placeholder to maintain flow layout exactly as the background image */}
          <img
            src={streamStartImg}
            alt=""
            className="w-[130%] sm:w-[110%] md:w-[180%] max-w-none -mt-64 md:mt-[200px] lg:mt-4 mb-8 invisible -ml-[10%] sm:-ml-0 md:-ml-[50%]"
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            className="mt-32 md:-mt-[180px] lg:-mt-[450px] translate-y-24 md:translate-y-0 bg-black text-white p-4 md:p-6 text-[5vw] sm:text-xl md:text-4xl font-p5-body border-4 border-[#732424] max-w-[85vw] md:max-w-lg lg:max-w-xl transform -skew-x-6 shadow-[8px_8px_0px_#732424] text-center md:text-left pointer-events-auto relative"
          >
            "It's time to steal some hearts... with some code!"
          </motion.div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
