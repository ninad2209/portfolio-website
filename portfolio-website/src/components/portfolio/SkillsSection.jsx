import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    label: 'Backend & APIs',
    skills: [
      { name: 'Java', level: 75 },
      { name: 'Node.js / Express', level: 75 },
      { name: 'Django', level: 80 },
      { name: 'REST APIs', level: 85 },
      { name: 'MongoDB / PostgreSQL', level: 75 },
      { name: 'JWT Authentication', level: 75 },
    ],
  },
  {
    label: 'Machine Learning',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'NLP (Text Processing)', level: 75 },
      { name: 'TF-IDF Vectorization', level: 80 },
      { name: 'Logistic Regression / SVM', level: 75 },
    ],
  },
  {
    label: 'Security & Systems',
    skills: [
      { name: 'Linux', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'Wireshark', level: 70 },
      { name: 'Autopsy (Digital Forensics)', level: 70 },
      { name: 'SIEM Basics', level: 65 },
    ],
  },
  {
    label: 'AI tools',
    skills: [
      { name: 'ChatGPT', level: 90 },
      { name: 'Google Gemini', level: 90 },
      { name: 'GitHub Copilot', level: 90 },
      { name: 'Claude', level: 90 },
      { name: 'Perplexity', level: 80 },
    ],
  },
];

const familiarTech = [
  'Pandas',
  'NLTK',
  'Regex',
  'Faker',
  'Git & GitHub',
  'Postman',
  'Flask',
  'Axios',
  'Spring Boot',
];

function SkillBar({ name, level, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-xs text-foreground">{name}</span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {level}%
        </span>
      </div>

      <div className="h-[2px] bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: index * 0.08 + 0.2,
            ease: 'easeOut',
          }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section className="py-24 lg:py-32 px-8 md:px-16 lg:px-24 border-t border-border">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-3">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Technical stack
          </h2>
        </motion.div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6 border-b border-border pb-3">
                {cat.label}
              </p>

              <div className="space-y-5">
                {cat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔁 ALSO FAMILIAR WITH (SMOOTH MARQUEE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Also familiar with
          </p>

          <div className="overflow-hidden">
            <div className="marquee gap-2">

              {/* first copy */}
              {familiarTech.map((tech, i) => (
                <span
                  key={`a-${i}`}
                  className="whitespace-nowrap font-mono text-[11px] px-3 py-1.5 bg-foreground/[0.04] border border-border text-muted-foreground rounded-sm"
                >
                  {tech}
                </span>
              ))}

              <span className="mx-8 text-muted-foreground/40">•</span>

              {/* second copy */}
              {familiarTech.map((tech, i) => (
                <span
                  key={`b-${i}`}
                  className="whitespace-nowrap font-mono text-[11px] px-3 py-1.5 bg-foreground/[0.04] border border-border text-muted-foreground rounded-sm"
                >
                  {tech}
                </span>
              ))}

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}