import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoAnimation from './LogoAnimation';

const navItems = [
  { label: '01', name: 'Home', path: '/' },
  { label: '02', name: 'Projects', path: '/projects' },
  { label: '03', name: 'Contact', path: '/contact' },
];

export default function MobileNav({ active = '/' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md">
        <Link to="/"><LogoAnimation /></Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="flex flex-col py-6 px-8 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 py-3 font-inter text-lg transition-colors ${
                    active === item.path ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <span className="font-mono text-xs text-primary">{item.label}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}