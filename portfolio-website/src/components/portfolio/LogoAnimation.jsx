import React from 'react';
import { motion } from 'framer-motion';

export default function LogoAnimation() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* N */}
        <motion.path
          d="M8 42V14L22 42V14"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* P */}
        <motion.path
          d="M30 42V14H40C44 14 47 17 47 22C47 27 44 30 40 30H30"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </motion.div>
  );
}