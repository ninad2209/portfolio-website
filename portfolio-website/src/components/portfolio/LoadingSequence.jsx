import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/69edcf577d37e23685dd39b0/6f010eb22_logo.png";
const TOTAL_DURATION = 5200;
const CHARS = "!<>-_\\/[]{}—=+*^?#01ABCDEF";

// Scramble (decode) text effect — characters resolve left → right
function useScramble(text, active, duration = 1000) {
  const [output, setOutput] = useState('');
  useEffect(() => {
    if (!active) { setOutput(''); return; }
    let frame = 0;
    const totalFrames = Math.ceil(duration / 16);
    const length = text.length;
    const interval = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / totalFrames) * length);
      const scrambled = text.split('').map((c, i) => {
        if (c === ' ') return ' ';
        return i < revealed ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      setOutput(scrambled);
      if (frame >= totalFrames) {
        setOutput(text);
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [active, text, duration]);
  return output;
}

// Floating particle field on canvas
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let raf;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random() * 0.5 + 0.15,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 166, 227, ${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function LoadingSequence() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrambleActive, setScrambleActive] = useState(false);
  const welcomeText = useScramble("Ninad's Portfolio", scrambleActive, 1100);

  useEffect(() => {
    const scrambleTimer = setTimeout(() => setScrambleActive(true), 1700);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(pct);
      if (elapsed < TOTAL_DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(scrambleTimer);
    };
  }, []);

  const handleMouse = (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setTilt({ x: (e.clientY - cy) / 25, y: -(e.clientX - cx) / 25 });
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouse}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated grid backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,166,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,227,0.5) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(circle at center, black 0%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 65%)',
            }}
          />

          <ParticleField />

          {/* Ambient cobalt glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.6 }}
            className="absolute w-[55vw] h-[55vw] rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(0,166,227,0.25) 0%, rgba(37,90,158,0.1) 40%, transparent 70%)',
            }}
          />

          {/* Logo — 3D mouse tilt + RGB chromatic glitch on entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 800 }}
            className="relative"
          >
            <motion.div
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 18 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative"
            >
              <motion.img
                src={LOGO_URL}
                alt=""
                aria-hidden
                className="absolute inset-0 w-32 h-32 md:w-44 md:h-44 object-contain"
                style={{ mixBlendMode: 'screen' }}
                initial={{ opacity: 0.9, x: -6 }}
                animate={{ opacity: [0.9, 0.5, 0.9, 0], x: [-6, 5, -3, 0] }}
                transition={{ duration: 0.7, delay: 0.2, times: [0, 0.4, 0.7, 1] }}
              />
              <motion.img
                src={LOGO_URL}
                alt=""
                aria-hidden
                className="absolute inset-0 w-32 h-32 md:w-44 md:h-44 object-contain"
                style={{ mixBlendMode: 'screen' }}
                initial={{ opacity: 0.9, x: 6 }}
                animate={{ opacity: [0.9, 0.5, 0.9, 0], x: [6, -5, 3, 0] }}
                transition={{ duration: 0.7, delay: 0.2, times: [0, 0.4, 0.7, 1] }}
              />
              <img
                src={LOGO_URL}
                alt="NP Logo"
                className="relative w-32 h-32 md:w-44 md:h-44 object-contain z-10"
              />
            </motion.div>
          </motion.div>

          {/* Welcome + scramble headline */}
          <div className="relative mt-10 text-center z-10">
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
              className="font-mono text-[10px] md:text-xs uppercase text-white/55 mb-4"
            >
              Welcome to
            </motion.p>
            <h1 className="font-inter text-2xl md:text-4xl font-bold text-white tracking-tight min-h-[1.2em] flex justify-center">
              <span className="relative inline-block">
                {welcomeText || '\u00A0'}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: scrambleActive ? [1, 0] : 0 }}
                  transition={{ duration: 0.5, repeat: scrambleActive ? Infinity : 0, repeatType: 'reverse' }}
                  className="absolute -right-3 top-0 w-[2px] h-full bg-[#00a6e3]"
                />
              </span>
            </h1>
          </div>

          {/* Counter + shimmering progress */}
          <div className="relative mt-12 w-64 md:w-72 z-10">
            <div className="flex justify-between mb-2 font-mono text-[10px] text-white/40">
              <span>LOADING</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full relative">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#245a9e] via-[#00a6e3] to-white relative"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '300%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 h-full w-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              />
            </div>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.7) 100%)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}