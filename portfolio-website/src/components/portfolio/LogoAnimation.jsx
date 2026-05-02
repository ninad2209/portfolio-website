import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";

export default function LogoAnimation({
  className = "h-11 w-11 lg:h-16 lg:w-16",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
        animate={{
          opacity: [0.35, 0.75, 0.35],
          scale: [0.9, 1.18, 0.9],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={logo}
        alt="Ninad Pangare logo"
        className="relative z-10 h-full w-full object-contain drop-shadow-sm"
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
