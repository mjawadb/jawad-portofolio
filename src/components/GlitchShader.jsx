import React, { useEffect, useRef } from 'react';

export default function GlitchShader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    let animationFrameId;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
      }

      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          
          float time = u_time * 2.0;
          float glitchTrigger = step(0.95, sin(time * 5.0)) * step(0.95, hash(vec2(time)));
          float noiseVal = noise(vec2(uv.y * 10.0, time));
          uv.x += glitchTrigger * noiseVal * 0.1;
          
          float dist = distance(uv, mouse);
          float pulse = exp(-dist * 8.0) * sin(time * 10.0 - dist * 20.0) * 0.02;
          uv += (uv - mouse) * pulse;

          vec2 gv = fract(uv * 15.0);
          float grid = smoothstep(0.05, 0.0, abs(gv.x - 0.5)) + smoothstep(0.05, 0.0, abs(gv.y - 0.5));
          grid *= 0.2;
          
          vec2 halftoneUV = uv * 80.0;
          float dots = smoothstep(0.4, 0.35, length(fract(halftoneUV) - 0.5));
          
          float scanline = sin(uv.y * 400.0 + time * 15.0) * 0.1;
          
          vec3 red = vec3(0.85, 0.14, 0.14);
          vec3 white = vec3(1.0, 1.0, 1.0);
          vec3 offWhite = vec3(0.95, 0.95, 0.95);
          
          float layer1 = noise(uv * 4.0 + time * 0.2);
          layer1 = smoothstep(0.4, 0.6, layer1);
          
          vec3 color = mix(white, offWhite, layer1 * 0.5);
          color = mix(color, red, grid * layer1);
          color = mix(color, red, dots * layer1 * 0.15);
          color -= scanline * layer1 * 0.05;
          
          color = mix(color, red, glitchTrigger * 0.5);
          
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: 0, y: 0 };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        mouse.x = (e.clientX - rect.left);
        mouse.y = rect.height - (e.clientY - rect.top);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let startTime = performance.now();
    const render = (time) => {
      let t = (time - startTime) * 0.001;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      style={{ display: 'block', opacity: 0.8 }} 
    />
  );
}
