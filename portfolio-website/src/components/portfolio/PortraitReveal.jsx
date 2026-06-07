import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

const COLS = 5;
const ROWS = 6;
const TOTAL = COLS * ROWS;

// ═══════════════════════════════════════════════════════════════════════════════
// PORTRAIT REVEAL
// Keeps the original scattered tile reveal animation.
// Adds 4 premium hover effects on top:
//   1. Zoom — image scales up smoothly on hover
//   2. Grayscale → Color — starts desaturated, full color on hover
//   3. Vignette — dark edge overlay that lifts on hover
//   4. Glitch — brief RGB split distortion on hover using canvas
// ═══════════════════════════════════════════════════════════════════════════════

export default function PortraitReveal({ imageUrl }) {
  const [started, setStarted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const glitchTimer = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Trigger glitch burst when hover starts, then stop after 600ms
  const handleMouseEnter = () => {
    setHovered(true);
    setGlitching(true);
    clearTimeout(glitchTimer.current);
    glitchTimer.current = setTimeout(() => setGlitching(false), 600);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setGlitching(false);
    clearTimeout(glitchTimer.current);
  };

  // Randomize tile reveal order (same as before)
  const order = useMemo(() => {
    const indices = Array.from({ length: TOTAL }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const map = new Array(TOTAL);
    indices.forEach((tileIdx, order) => { map[tileIdx] = order; });
    return map;
  }, []);

  return (
    // Outer wrapper handles hover detection and clips all effects
    <div
      className="w-full h-full relative overflow-hidden rounded-sm cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── GLITCH LAYERS (CSS RGB split) ──
          Two pseudo-copies of the image shift in opposite directions on hover.
          We use two absolute div layers with mix-blend-mode for the color split. */}
      {glitching && (
        <>
          {/* Cyan channel — shifts left */}
          <div
            className="absolute inset-0 z-20 pointer-events-none rounded-sm"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              mixBlendMode: "screen",
              filter: "url(#cyan-channel)",
              transform: "translateX(-4px)",
              opacity: 0.6,
              animation: "glitch-shift-left 0.6s steps(2) forwards",
            }}
          />
          {/* Magenta channel — shifts right */}
          <div
            className="absolute inset-0 z-20 pointer-events-none rounded-sm"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "screen",
              filter: "url(#magenta-channel)",
              transform: "translateX(4px)",
              opacity: 0.6,
              animation: "glitch-shift-right 0.6s steps(2) forwards",
            }}
          />
        </>
      )}

      {/* ── SVG FILTERS for RGB channel split ── */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Cyan = keep green + blue, zero out red */}
          <filter id="cyan-channel">
            <feColorMatrix type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0" />
          </filter>
          {/* Magenta = keep red + blue, zero out green */}
          <filter id="magenta-channel">
            <feColorMatrix type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      {/* ── TILE REVEAL + ZOOM + GRAYSCALE→COLOR ──
          All tiles share the same transform so zoom works uniformly.
          filter transition handles grayscale → color smoothly. */}
      <div
        className="w-full h-full relative"
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1)",
          filter: hovered ? "grayscale(0%) brightness(1.05)" : "grayscale(60%) brightness(0.95)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease",
        }}
      >
        {Array.from({ length: TOTAL }, (_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const delay = (order[i] / TOTAL) * 0.9;

          const dirs = [
            { x: -60, y: 0 }, { x: 60, y: 0 },
            { x: 0, y: -60 }, { x: 0, y: 60 },
            { x: -40, y: -40 }, { x: 40, y: 40 },
          ];
          const dir = dirs[i % dirs.length];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.85 }}
              animate={started ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                width: `calc(${100 / COLS}% + 1px)`,
                height: `calc(${100 / ROWS}% + 1px)`,
                left: `${(col / COLS) * 100}%`,
                top: `${(row / ROWS) * 100}%`,
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          );
        })}
      </div>

      {/* ── VIGNETTE OVERLAY ──
          Dark radial gradient around the edges — lifts (becomes lighter) on hover.
          Gives a professional studio-photo look. */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-sm"
        style={{
          background: hovered
            ? "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.25) 100%)"
            : "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          transition: "background 0.5s ease",
        }}
      />

      {/* ── PRIMARY COLOR TINT on hover ──
          Subtle blue overlay fades in on hover — ties the photo to your brand color. */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-sm"
        style={{
          background: "hsl(var(--primary) / 0.08)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* ── GLITCH ANIMATION KEYFRAMES ── */}
      <style>{`
        @keyframes glitch-shift-left {
          0%   { transform: translateX(-4px) skewX(-1deg); opacity: 0.7; }
          25%  { transform: translateX(2px)  skewX(1deg);  opacity: 0.5; }
          50%  { transform: translateX(-6px) skewX(-2deg); opacity: 0.6; }
          75%  { transform: translateX(3px)  skewX(0deg);  opacity: 0.4; }
          100% { transform: translateX(0px)  skewX(0deg);  opacity: 0;   }
        }
        @keyframes glitch-shift-right {
          0%   { transform: translateX(4px)  skewX(1deg);  opacity: 0.7; }
          25%  { transform: translateX(-2px) skewX(-1deg); opacity: 0.5; }
          50%  { transform: translateX(6px)  skewX(2deg);  opacity: 0.6; }
          75%  { transform: translateX(-3px) skewX(0deg);  opacity: 0.4; }
          100% { transform: translateX(0px)  skewX(0deg);  opacity: 0;   }
        }
      `}</style>
    </div>
  );
}