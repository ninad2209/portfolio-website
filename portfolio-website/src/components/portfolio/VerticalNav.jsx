import React from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "01", name: "Home", id: "home" },
  { label: "02", name: "Experience", id: "experience" },
  { label: "03", name: "Projects", id: "projects" },
  { label: "04", name: "Skills", id: "skills" },
  { label: "05", name: "Education", id: "education" },
  { label: "06", name: "Contact", id: "contact" },
];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function VerticalNav({ active = "home" }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-6"
    >
      {navItems.map((item) => {
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className="group flex items-center gap-3"
          >
            <span
              className={`font-mono text-xs transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              } text-muted-foreground`}
            >
              {item.name}
            </span>

            <span className="font-mono text-[10px] text-muted-foreground">
              {item.label}
            </span>

            <div
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? "w-8 h-[2px] bg-primary"
                  : "w-4 h-[2px] bg-muted-foreground/40 group-hover:w-6 group-hover:bg-muted-foreground"
              }`}
            />
          </button>
        );
      })}
    </motion.nav>
  );
}
