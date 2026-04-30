import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Engineer Intern',
    company: 'Tirukamal Innovative Solutions Pvt. Ltd.',
    period: 'Feb 2024 - June 2024',
    type: 'Full-time Internship',
    description: 'Developed and maintained modern frontend/backend frameworks and components while integrating secure development practices, including SSL/TLS configuration for encrypted communication. Collaborated with cross-functional teams to enhance usability and application reliability, and contributed to cybersecurity awareness through internal presentations.',
    highlights: ['Frontend Development','Backend Development','Web Security','SSL/TLS','Cybersecurity Awareness','Team Collaboration'],
  },
  
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function ExperienceSection() {
  return (
    <section className="py-24 lg:py-32 px-8 md:px-16 lg:px-24 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Experience</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Where I've worked</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-0"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-b border-border hover:bg-foreground/[0.02] transition-colors duration-300 -mx-4 px-4 rounded-sm"
            >
              {/* Left: Period */}
              <div className="md:w-40 flex-shrink-0">
                <p className="font-mono text-xs text-muted-foreground">{exp.period}</p>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60 mt-1 block">{exp.type}</span>
              </div>

              {/* Right: Details */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  <span className="hidden sm:block text-muted-foreground/40">—</span>
                  <span className="text-primary font-medium text-sm">{exp.company}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((tech) => (
                    <span key={tech} className="font-mono text-[10px] tracking-wide px-2.5 py-1 border border-border text-muted-foreground rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}