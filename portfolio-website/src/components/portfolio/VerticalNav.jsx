import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const navItems = [
  { label: '01', name: 'Home', path: '/' },
  { label: '02', name: 'Projects', path: '/projects' },
  { label: '03', name: 'Contact', path: '/contact' },
];

export default function VerticalNav({ active = '/' }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-6"
    >
      {navItems.map((item, i) => {
        const isActive = active === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="group flex items-center gap-3"
          >
            <span className={`font-mono text-xs transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            } text-muted-foreground`}>
              {item.name}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">{item.label}</span>
            <div className={`transition-all duration-300 rounded-full ${
              isActive 
                ? 'w-8 h-[2px] bg-primary' 
                : 'w-4 h-[2px] bg-muted-foreground/40 group-hover:w-6 group-hover:bg-muted-foreground'
            }`} />
          </Link>
        );
      })}
    </motion.nav>
  );
}