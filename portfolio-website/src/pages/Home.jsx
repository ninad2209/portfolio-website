import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";

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

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Home() {
  return (
    <div className="bg-background font-inter relative pb-24 sm:pb-0">
      <FloatingNav />

      <section
        id="home"
        className="min-h-[100svh] flex flex-col lg:flex-row items-center justify-start lg:justify-center relative pb-24 sm:pb-0"
      >
        {/* Mobile Top Controls */}
        <div className="lg:hidden">
          <div className="absolute top-4 left-4 z-40">
            <LogoAnimation className="h-9 w-9" />
        </div>
        
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 
                bg-background/60 backdrop-blur-md 
                p-2 rounded-full shadow-md">
        <DarkModeToggle />
        </div>
      </div>

        <div className="hidden lg:block fixed right-6 top-6 z-50">
          <DarkModeToggle />
        </div>

        <div className="w-full lg:flex-1 flex flex-col justify-start lg:justify-center px-5 sm:px-8 md:px-16 lg:px-24 pt-28 sm:pt-28 lg:pt-0 z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 hidden lg:block"
          >
            <LogoAnimation className="h-16 w-16" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-mono text-xs sm:text-sm md:text-base tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4"
          >
            Hello, I'm Ninad
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[1.75rem] min-[390px]:text-[1.9rem] sm:text-5xl md:text-6xl lg:text-[5.5vw] xl:text-[4.5vw] font-bold leading-[1.08] tracking-tight text-foreground max-w-[22rem] sm:max-w-2xl mx-auto lg:mx-0"
          >
            Engineering digital interfaces that deliver{" "}
            <span className="text-primary">results</span>.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="hidden lg:flex flex-row flex-wrap justify-center lg:justify-start gap-3 mt-6 sm:mt-10"
          >
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-primary/90 transition-all duration-300"
            >
              Contact Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 border-2 border-foreground text-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-foreground hover:text-background transition-all duration-300"
            >
              View Projects
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-10 lg:mt-24 hidden sm:flex gap-12 justify-center lg:justify-start"
          >
            <div>
              <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">
                Availability
              </p>
              <p className="font-mono text-xs text-foreground">
                Open for projects
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase text-muted-foreground mb-1">
                Based in
              </p>
              <p className="font-mono text-xs text-foreground">Germany</p>
            </div>
          </motion.div>
        </div>

        <motion.div className="w-full lg:w-[48%] h-[24svh] min-h-[160px] max-h-[215px] lg:h-screen lg:max-h-none relative flex items-center justify-center mt-8 sm:mt-10 lg:mt-0">
          <div
            className="relative z-10 overflow-hidden"
            style={{
              width: "min(300px, 54vw)",
              height: "min(300px, 54vw)",
              borderRadius: "50%",
            }}
          >
            <PortraitReveal imageUrl={PORTRAIT_URL} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
            className="absolute z-20 pointer-events-none"
            style={{
              width: "min(300px, 54vw)",
              height: "min(300px, 54vw)",
              borderRadius: "50%",
              border: "5px solid hsl(var(--primary))",
              boxShadow: "0 0 0 10px hsl(var(--primary) / 0.15)",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{
              opacity: { duration: 0.6, delay: 1.3 },
              rotate: { repeat: Infinity, duration: 5, ease: "linear" },
            }}
            className="absolute z-30 pointer-events-none"
            style={{
              width: "min(300px, 54vw)",
              height: "min(300px, 54vw)",
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, transparent 0%, transparent 75%, hsl(var(--primary)) 85%, transparent 95%)",
              WebkitMask: "radial-gradient(circle, transparent 68%, black 72%)",
              mask: "radial-gradient(circle, transparent 68%, black 72%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: -360 }}
            transition={{
              opacity: { duration: 0.6, delay: 1.35 },
              rotate: { repeat: Infinity, duration: 8, ease: "linear" },
            }}
            className="absolute z-30 pointer-events-none"
            style={{
              width: "min(300px, 54vw)",
              height: "min(300px, 54vw)",
              borderRadius: "50%",
              background:
                "conic-gradient(from 180deg, transparent 0%, transparent 80%, hsl(var(--primary) / 0.4) 90%, transparent 100%)",
              WebkitMask: "radial-gradient(circle, transparent 68%, black 72%)",
              mask: "radial-gradient(circle, transparent 68%, black 72%)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="flex w-full justify-center gap-3 px-5 mt-7 lg:hidden"
        >
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="group inline-flex flex-1 max-w-[165px] items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-primary/90 transition-all duration-300"
          >
            Contact Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="group inline-flex flex-1 max-w-[165px] items-center justify-center gap-2 px-4 py-3 border-2 border-foreground text-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-foreground hover:text-background transition-all duration-300"
          >
            View Work
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-muted-foreground/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>

        <span className="font-mono text-[9px] uppercase text-muted-foreground/60">
          scroll
        </span>
      </motion.div>

      <section id="experience">
        <ExperienceSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="education">
        <EducationSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
}
