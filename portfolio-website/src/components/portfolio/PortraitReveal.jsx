import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const COLS = 5;
const ROWS = 6;
const TOTAL = COLS * ROWS;

const ZOOM = 1.3;
const OFFSET_X = -12; // % shift left
const OFFSET_Y = 0;   // % shift vertical

export default function PortraitReveal({ imageUrl }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Randomize order so tiles appear in scattered sequence
  const order = useMemo(() => {
    const indices = Array.from({ length: TOTAL }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // Map each tile index → its position in the reveal order
    const map = new Array(TOTAL);
    indices.forEach((tileIdx, order) => { map[tileIdx] = order; });
    return map;
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-sm">
      {Array.from({ length: TOTAL }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const delay = (order[i] / TOTAL) * 0.9; // stagger over 0.9s

        // Each tile starts offset from a random direction
        const dirs = [
          { x: -60, y: 0 },
          { x: 60, y: 0 },
          { x: 0, y: -60 },
          { x: 0, y: 60 },
          { x: -40, y: -40 },
          { x: 40, y: 40 },
        ];
        const dir = dirs[i % dirs.length];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.85 }}
            animate={started ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
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
  );
}