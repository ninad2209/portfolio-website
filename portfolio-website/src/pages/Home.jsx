import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import profileImg from "../assets/images/Profile.jpg";
import LogoAnimation from "../components/portfolio/LogoAnimation";
import PortraitReveal from "../components/portfolio/PortraitReveal";
import DarkModeToggle from "../components/portfolio/DarkModeToggle";
import FloatingNav from "../components/portfolio/FloatingNav";
import ExperienceSection from "../components/portfolio/ExperienceSection";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import SkillsSection from "../components/portfolio/SkillsSection";
import EducationSection from "../components/portfolio/EducationSection";
import ContactSection from "../components/portfolio/ContactSection";
import Footer from "../components/portfolio/Footer";

const PORTRAIT_URL = profileImg;
const scrollToSection = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── Shared helpers ───────────────────────────────────────────────────────────
const getPrimary = () => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary").trim();
  const [h, s, l] = raw.split(" ").map(parseFloat);
  return { h, s, l };
};
const hsla = (h, s, l, a) => `hsla(${h}, ${s}%, ${l}%, ${a})`;
const isDark = () => document.documentElement.classList.contains("dark");

// ─── useVisible ───────────────────────────────────────────────────────────────
// Pauses animation when section is off-screen — key performance fix
function useVisible(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}


// ═══════════════════════════════════════════════════════════════════════════════
// DATA STREAM BACKGROUND
// Vertical falling characters (dashes, dots, bars) — matrix/hacker rain style.
// Used consistently across ALL sections for a unified aesthetic.
// Each instance is independent so pausing one doesn't affect others.
// ═══════════════════════════════════════════════════════════════════════════════
function DataStreamBg({ opacity = 0.55 }) {
  const wrapRef = useRef(null);
  const visible = useVisible(wrapRef);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const streams = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Rebuild streams on resize so columns stay aligned
      const COL_W = 30;
      const cols = Math.ceil(canvas.width / COL_W);
      streams.current = Array.from({ length: cols }, (_, i) => ({
        x: i * COL_W + COL_W / 2,
        y: Math.random() * canvas.height,
        speed: Math.random() * 1.0 + 0.4,
        length: Math.floor(Math.random() * 10 + 5),
        opacity: Math.random() * 0.22 + 0.04,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const CHARS = ["─", "│", "·", "•", "—", "|", "╌", "┄"];

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      const p = getPrimary();
      const dark = isDark();

      // Low-alpha fill creates the fading trail effect
      ctx.fillStyle = dark ? "rgba(10,10,10,0.09)" : "rgba(230,234,242,0.09)";
      ctx.fillRect(0, 0, W, H);

      if (!streams.current) return;

      streams.current.forEach((s) => {
        for (let i = 0; i < s.length; i++) {
          // Trail fades from bright head to transparent tail
          const alpha = s.opacity * (1 - i / s.length);
          ctx.fillStyle = hsla(p.h, p.s, p.l, alpha);
          ctx.font = `${9 + (i === 0 ? 2 : 0)}px JetBrains Mono, monospace`;
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            s.x,
            s.y - i * 18
          );
        }
        s.y += s.speed;
        if (s.y - s.length * 18 > H) {
          s.y = -10;
          s.speed = Math.random() * 1.0 + 0.4;
          s.opacity = Math.random() * 0.22 + 0.04;
          s.length = Math.floor(Math.random() * 10 + 5);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    // Clear once before starting so there's no flash
    ctx.fillStyle = isDark() ? "rgb(10,10,10)" : "rgb(230,234,242)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (visible) {
      animRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  return (
    <div ref={wrapRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// TYPEWRITER HOOK
// ═══════════════════════════════════════════════════════════════════════════════
const PHRASES = [
  "Engineering digital interfaces that deliver results.",
  "Building scalable full‑stack solutions.",
  "Crafting seamless user experiences.",
  "Turning ideas into production-ready code.",
];

function useTypewriter(phrases, typingSpeed = 60, deletingSpeed = 35, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;
    if (!isDeleting && displayed.length < current.length)
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
    else if (!isDeleting && displayed.length === current.length)
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    else if (isDeleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deletingSpeed);
    else { setIsDeleting(false); setPhraseIdx((i) => (i + 1) % phrases.length); }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}


// ═══════════════════════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════════════════════
function MagneticButton({ children, onClick, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick} className={className}>
      {children}
    </motion.button>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// GLITCH TEXT
// ═══════════════════════════════════════════════════════════════════════════════
function GlitchText({ text, className }) {
  return (
    <span className={`relative inline-block ${className}`} data-text={text}>
      {text}
      <style>{`
        .glitch-text { position: relative; }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text); position: absolute; top:0; left:0; width:100%; height:100%;
        }
        .glitch-text::before { color:#0ff; animation:glitch1 3.5s infinite; clip-path:polygon(0 30%,100% 30%,100% 50%,0 50%); }
        .glitch-text::after  { color:#f0f; animation:glitch2 3.5s infinite; clip-path:polygon(0 60%,100% 60%,100% 75%,0 75%); }
        @keyframes glitch1 {
          0%,90%,100%{transform:translate(0);opacity:0}
          92%{transform:translate(-3px,1px);opacity:.7}94%{transform:translate(3px,-1px);opacity:.7}
          96%{transform:translate(-2px,0);opacity:.7}98%{transform:translate(0);opacity:0}
        }
        @keyframes glitch2 {
          0%,90%,100%{transform:translate(0);opacity:0}
          93%{transform:translate(3px,2px);opacity:.6}95%{transform:translate(-3px,-1px);opacity:.6}
          97%{transform:translate(2px,1px);opacity:.6}99%{transform:translate(0);opacity:0}
        }
      `}</style>
    </span>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HOME COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const typewriterText = useTypewriter(PHRASES);
  const parts = typewriterText.replace(/\.$/, "").split(" ");
  const lastWord = parts.pop();
  const restText = parts.join(" ");

  return (
    <div className="bg-background font-inter relative pb-24 sm:pb-0">

      {/* TOP BAR — Logo + FloatingNav + DarkModeToggle aligned in one row */}
      <div className="hidden lg:flex fixed top-5 left-0 right-0 z-50 items-center px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <LogoAnimation className="h-10 w-10" />
        </motion.div>
        <div className="flex-1 flex justify-center"><FloatingNav /></div>
        <DarkModeToggle />
      </div>

      {/* Mobile FloatingNav */}
      <div className="lg:hidden"><FloatingNav /></div>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section id="home" className="min-h-[100svh] flex flex-col lg:flex-row items-center justify-start lg:justify-center relative pb-24 sm:pb-0 overflow-hidden">
        {/* Hero gets full opacity stream — it's the main visual focus */}
        <DataStreamBg opacity={0.7} />

        <div className="lg:hidden">
          <div className="absolute top-4 left-4 z-40"><LogoAnimation className="h-9 w-9" /></div>
          <div className="fixed top-4 right-4 z-50 bg-background/60 backdrop-blur-md p-2 rounded-full shadow-md"><DarkModeToggle /></div>
        </div>

        {/* Left Text */}
        <div className="w-full lg:flex-1 flex flex-col justify-start lg:justify-center px-5 sm:px-8 md:px-16 lg:px-24 pt-28 lg:pt-0 z-10 text-center lg:text-left">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-mono text-xs sm:text-sm tracking-widest uppercase text-muted-foreground mb-3">
            <GlitchText text="Hello, I'm Ninad" className="glitch-text" />
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="text-[1.6rem] min-[390px]:text-[1.8rem] sm:text-4xl md:text-6xl lg:text-[5vw] xl:text-[4vw] font-bold leading-tight tracking-tight text-foreground max-w-[22rem] sm:max-w-2xl mx-auto lg:mx-0 min-h-[4.5rem] sm:min-h-[6rem] lg:min-h-[unset]">
            {restText}{restText ? " " : ""}
            <span className="text-primary">{lastWord}</span>
            <span className="text-primary animate-pulse">|</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="hidden lg:flex gap-3 mt-10">
            <MagneticButton onClick={() => scrollToSection("contact")}
              className="group px-6 py-3 bg-primary text-primary-foreground rounded-sm flex items-center gap-2 cursor-pointer">
              Contact Me <ArrowDownRight className="w-4 h-4 group-hover:translate-y-1 transition" />
            </MagneticButton>
            <MagneticButton onClick={() => scrollToSection("projects")}
              className="group px-6 py-3 border-2 border-foreground rounded-sm flex items-center gap-2 hover:bg-foreground hover:text-background transition cursor-pointer">
              View Projects <ArrowDownRight className="w-4 h-4 group-hover:translate-y-1 transition" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div className="w-full lg:w-[48%] flex items-center justify-center mt-12 sm:mt-16 lg:mt-0 z-10">
          <div className="relative flex items-center justify-center">
            <div className="relative z-10 overflow-hidden w-[min(280px,70vw)] sm:w-[min(340px,60vw)] md:w-[min(400px,50vw)] lg:w-[min(480px,40vw)] aspect-square rounded-full">
              <PortraitReveal imageUrl={PORTRAIT_URL} />
            </div>
            <motion.div className="absolute z-20 pointer-events-none rounded-full border-[6px] border-primary lg:hidden"
              style={{ width: "100%", height: "100%", maxWidth: "480px", aspectRatio: "1/1" }} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1 }}
              className="absolute z-20 pointer-events-none hidden lg:block"
              style={{ width: "min(480px, 40vw)", height: "min(480px, 40vw)", borderRadius: "50%", border: "5px solid hsl(var(--primary))", boxShadow: "0 0 0 10px hsl(var(--primary) / 0.15)" }} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, rotate: 360 }}
              transition={{ opacity: { duration: 0.6, delay: 1.2 }, rotate: { repeat: Infinity, duration: 5, ease: "linear" } }}
              className="absolute z-30 pointer-events-none hidden lg:block"
              style={{ width: "min(480px, 40vw)", height: "min(480px, 40vw)", borderRadius: "50%", background: "conic-gradient(from 0deg, transparent 0%, transparent 75%, hsl(var(--primary)) 85%, transparent 95%)", WebkitMask: "radial-gradient(circle, transparent 68%, black 72%)", mask: "radial-gradient(circle, transparent 68%, black 72%)" }} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, rotate: -360 }}
              transition={{ opacity: { duration: 0.6, delay: 1.3 }, rotate: { repeat: Infinity, duration: 8, ease: "linear" } }}
              className="absolute z-30 pointer-events-none hidden lg:block"
              style={{ width: "min(480px, 40vw)", height: "min(480px, 40vw)", borderRadius: "50%", background: "conic-gradient(from 180deg, transparent 0%, transparent 80%, hsl(var(--primary) / 0.4) 90%, transparent 100%)", WebkitMask: "radial-gradient(circle, transparent 68%, black 72%)", mask: "radial-gradient(circle, transparent 68%, black 72%)" }} />
          </div>
        </motion.div>

        {/* Mobile Buttons */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="flex w-full justify-center gap-3 px-5 mt-16 sm:mt-20 lg:hidden z-10">
          <button onClick={() => scrollToSection("contact")} className="flex-1 max-w-[160px] px-4 py-3 bg-primary text-primary-foreground rounded-sm flex items-center justify-center gap-2">
            Contact <ArrowDownRight className="w-4 h-4" />
          </button>
          <button onClick={() => scrollToSection("projects")} className="flex-1 max-w-[160px] px-4 py-3 border-2 border-foreground rounded-sm flex items-center justify-center gap-2">
            Work <ArrowDownRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* ══ EXPERIENCE ════════════════════════════════════════════════════════ */}
      {/* Slightly lower opacity so text sections stay readable */}
      <section id="experience" className="relative overflow-hidden">
        <DataStreamBg opacity={0.45} />
        <div className="relative z-10"><ExperienceSection /></div>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative overflow-hidden">
        <DataStreamBg opacity={0.45} />
        <div className="relative z-10"><ProjectsSection /></div>
      </section>

      {/* ══ SKILLS ════════════════════════════════════════════════════════════ */}
      <section id="skills" className="relative overflow-hidden">
        <DataStreamBg opacity={0.45} />
        <div className="relative z-10"><SkillsSection /></div>
      </section>

      {/* ══ EDUCATION ═════════════════════════════════════════════════════════ */}
      <section id="education" className="relative overflow-hidden">
        <DataStreamBg opacity={0.45} />
        <div className="relative z-10"><EducationSection /></div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative overflow-hidden">
        <DataStreamBg opacity={0.45} />
        <div className="relative z-10 [&>div]:bg-transparent"><ContactSection /></div>
      </section>

      
      <section id="contact" className="relative overflow-hidden">
        <DataStreamBg opacity={0.45} />
        <div className="relative z-10 [&>div]:bg-transparent"><Footer /></div>
      </section>
    </div>
  );
}