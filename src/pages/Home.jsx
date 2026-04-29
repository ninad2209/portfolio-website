import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDownRight } from 'lucide-react';
import profileImg from "../assets/images/profile.jpeg";
import LogoAnimation from '../components/portfolio/LogoAnimation';
import PortraitReveal from '../components/portfolio/PortraitReveal';
import VerticalNav from '../components/portfolio/VerticalNav';
import MobileNav from '../components/portfolio/MobileNav';
import DarkModeToggle from '../components/portfolio/DarkModeToggle';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import EducationSection from '../components/portfolio/EducationSection';
import Footer from '../components/portfolio/Footer';


const PORTRAIT_URL = profileImg; 

export default function Home() {
  return (
    <div className="bg-background font-inter relative">
      <VerticalNav active="/" />
      <MobileNav active="/" />
      <DarkModeToggle />

      {/* Main hero grid */}
      <div className="min-h-screen flex flex-col lg:flex-row items-center relative">
        
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 lg:pt-0 z-10">
          
          {/* Logo - hidden on mobile since MobileNav shows it */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 hidden lg:block"
          >
            <LogoAnimation />
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-mono text-sm md:text-base tracking-widest uppercase text-muted-foreground mb-4"
          >
            Hello, I'm Ninad
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5vw] xl:text-[4.5vw] font-bold leading-[1.05] tracking-tight text-foreground max-w-2xl"
          >
            “Code with purpose. Secure with {' '}
            <span className="text-primary">passion</span>.
          </motion.h1>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-primary/90 transition-all duration-300"
            >
              Contact Me
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground text-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-foreground hover:text-background transition-all duration-300"
            >
              View Projects
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </Link>
          </motion.div>

          {/* Bottom metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-16 lg:mt-24 flex gap-12"
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Availability</p>
              <p className="font-mono text-xs text-foreground">Open for projects</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Based in</p>
              <p className="font-mono text-xs text-foreground">Germany</p>
            </div>
          </motion.div>
        </div>

        {/* Right - 3D Portrait */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }} 
          className="w-full lg:w-[42%] h-[55vh] lg:h-screen relative flex items-center justify-center lg:pl-0 lg:pr-8"
        >
         

          {/* Subtle grid background behind portrait */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Portrait canvas */}
          <div className="relative z-10" style={{ width: 'min(300px, 70%)', height: 'min(410px, 75%)' }}>
            <PortraitReveal imageUrl={PORTRAIT_URL} />
          </div>


        </motion.div>
      </div>

      {/* Scroll indicator — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-muted-foreground/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60">scroll</span>
      </motion.div>

      {/* Below-the-fold sections */}
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <Footer />
    </div>
  );
}