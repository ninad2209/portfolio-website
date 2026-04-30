import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    color: 'from-purple-500/10 to-pink-500/5'
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
    color: 'from-green-500/10 to-emerald-500/5'
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    year: '2025',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    kpi: '+180% conversion',
    description: 'High-performance e-commerce platform with real-time inventory, AI-powered recommendations, and seamless checkout UX.',
    color: 'from-blue-500/10 to-indigo-500/5',
  },
  {
  id: 4,
  title: 'Fake Call Detection System',
  category: 'Machine Learning / NLP',
  year: '2024',
  tech: ['Python', 'Scikit-learn', 'NLTK', 'Pandas'],
  kpi: '64% classification accuracy',
  description: 'Built a machine learning-based fake call detection system using NLP techniques. Generated synthetic datasets, performed text preprocessing and TF-IDF vectorization, and trained Logistic Regression and SVM models to classify call transcripts as fake or genuine.',
  color: 'from-red-500/10 to-orange-500/5',
}
  
];

export default function ProjectsSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-24 lg:py-32 px-8 md:px-16 lg:px-24 border-t border-border bg-foreground/[0.015]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Projects</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Selected work</h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground hover:text-foreground transition-colors group"
          >
            View all projects
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative p-8 rounded-sm border border-border bg-gradient-to-br ${project.color} hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 bg-background/60 border border-border/60 rounded-sm text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <motion.div
                  animate={{ rotate: hovered === project.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-muted-foreground">{project.year}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/60">{project.category}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* KPI */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-xs font-medium text-primary">{project.kpi}</span>
                </div>
              </div>

              {/* Hover glow */}
              <motion.div
                animate={{ opacity: hovered === project.id ? 1 : 0 }}
                className="absolute inset-0 pointer-events-none rounded-sm"
                style={{ boxShadow: 'inset 0 0 60px rgba(0,71,255,0.05)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}