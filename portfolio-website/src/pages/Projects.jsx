import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import VerticalNav from '../components/portfolio/VerticalNav';
import MobileNav from '../components/portfolio/MobileNav';

const projects = [
  {
    id: 1,
    title: "Christmas Market AR Goggles Prototype",
    category: "Human Computer Interaction",
    year: "2026",
    tech: ["JavaScript", "CSS", "HTML"],
    kpi: "AR Prototype",
    description:
      "An HCI prototype exploring an augmented reality experience for a Christmas market. Focused on interactive UI design and immersive frontend interactions using core web technologies.",
    github: "https://github.com/ninad2209/Christmas-Market-AR-Goggles-Prototype",
  },
  {
    id: 2,
    title: "E-learning Platform",
    category: "Web Development",
    year: "2025",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    kpi: "Type-Safe UI",
    description:
      "A modern e-learning platform built with React and Next.js, leveraging TypeScript for scalability and maintainability. Features a responsive UI and clean component-driven architecture.",
    github: "https://github.com/ninad2209/E-learning-Platform",
  },
  {
    id: 3,
    title: "E-Commerce Website",
    category: "E-Commerce",
    year: "2022",
    tech: ["Python", "HTML"],
    kpi: "Backend Logic",
    description:
      "A foundational e-commerce project implementing core functionalities such as product handling and user interaction, with a Python-based backend and simple HTML interface.",
    github: "https://github.com/ninad2209/E-Commerce-Website",
  },
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-background font-inter">
      <VerticalNav active="/projects" />
      <MobileNav active="/projects" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-24 lg:pt-16 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to home
          </Link>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-3">
            02 / Projects
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Selected Work
          </h1>
        </motion.div>

        {/* Project List */}
        <div className="space-y-2">
          {projects.map((project, index) => (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative border-b border-border py-8 md:py-10 cursor-pointer block"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      {project.year}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mt-2 max-w-xl leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  {/* Tech Stack */}
                  <div className="hidden lg:flex gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-1 border border-border rounded-sm text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* KPI Badge */}
                  <motion.div
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0.5,
                      scale: hoveredId === project.id ? 1.05 : 1,
                    }}
                    className="flex-shrink-0 px-4 py-2 bg-primary/10 rounded-sm"
                  >
                    <span className="font-mono text-xs font-medium text-primary">
                      {project.kpi}
                    </span>
                  </motion.div>

                  {/* Arrow */}
                  <motion.div
                    animate={{
                      x: hoveredId === project.id ? 4 : 0,
                      y: hoveredId === project.id ? -4 : 0,
                    }}
                    className="hidden md:block"
                  >
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}