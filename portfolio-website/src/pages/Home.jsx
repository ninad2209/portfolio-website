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
        {/* Mobile Controls */}
        <div className="lg:hidden">
          <div className="absolute top-4 left-4 z-40">
            <LogoAnimation className="h-9 w-9" />
          </div>

          <div className="fixed top-4 right-4 z-50 bg-background/60 backdrop-blur-md p-2 rounded-full shadow-md">
            <DarkModeToggle />
          </div>
        </div>

        {/* Desktop Toggle */}
        <div className="hidden lg:block fixed right-6 top-6 z-50">
          <DarkModeToggle />
        </div>

        {/* LEFT SIDE TEXT */}
        <div className="w-full lg:flex-1 flex flex-col justify-start lg:justify-center px-5 sm:px-8 md:px-16 lg:px-24 pt-28 lg:pt-0 z-10 text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 hidden lg:block"
          >
            <LogoAnimation className="h-16 w-16" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-mono text-xs sm:text-sm tracking-widest uppercase text-muted-foreground mb-3"
          >
            Hello, I'm Ninad
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-[1.6rem] min-[390px]:text-[1.8rem] sm:text-4xl md:text-6xl lg:text-[5vw] xl:text-[4vw] font-bold leading-tight tracking-tight text-foreground max-w-[22rem] sm:max-w-2xl mx-auto lg:mx-0"
          >
            Engineering digital interfaces that deliver{" "}
            <span className="text-primary">results</span>.
          </motion.h1>

          {/* Desktop Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden lg:flex gap-3 mt-10"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group px-6 py-3 bg-primary text-primary-foreground rounded-sm flex items-center gap-2"
            >
              Contact Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              className="group px-6 py-3 border-2 border-foreground rounded-sm flex items-center gap-2 hover:bg-foreground hover:text-background transition"
            >
              View Projects
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition" />
            </button>
          </motion.div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div className="w-full lg:w-[48%] flex items-center justify-center mt-12 sm:mt-16 lg:mt-0">

          {/* Image */}
          <div className="relative z-10 overflow-hidden 
              w-[min(280px,70vw)] 
              sm:w-[min(340px,60vw)] 
              md:w-[min(400px,50vw)] 
              lg:w-[min(480px,40vw)] 
              aspect-square rounded-full">
            <PortraitReveal imageUrl={PORTRAIT_URL} />
          </div>

          {/* Border Ring */}
          <motion.div
            className="absolute z-20 pointer-events-none rounded-full border-[6px] border-primary"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "480px",
              aspectRatio: "1/1",
            }}
          />

        </motion.div>

        {/* MOBILE BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex w-full justify-center gap-3 px-5 mt-16 sm:mt-20 lg:hidden"
        >
          <button
            onClick={() => scrollToSection("contact")}
            className="flex-1 max-w-[160px] px-4 py-3 bg-primary text-primary-foreground rounded-sm flex items-center justify-center gap-2"
          >
            Contact
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className="flex-1 max-w-[160px] px-4 py-3 border-2 border-foreground rounded-sm flex items-center justify-center gap-2"
          >
            Work
            <ArrowDownRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* Other Sections */}
      <section id="experience"><ExperienceSection /></section>
      <section id="projects"><ProjectsSection /></section>
      <section id="skills"><SkillsSection /></section>
      <section id="education"><EducationSection /></section>
      <section id="contact"><ContactSection /></section>

      <Footer />
    </div>
  );
}