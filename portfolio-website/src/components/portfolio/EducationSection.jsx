import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech in Computer Engineering',
    institution: 'University Name',
    period: '2019 — 2023',
    grade: 'CGPA: 8.7 / 10',
    description: 'Specialized in full-stack development, algorithms, and human-computer interaction. Led the college tech club and organized 3 inter-college hackathons.',
    highlights: ['Data Structures', 'Web Development', 'UI/UX Design', 'Machine Learning'],
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'School Name',
    period: '2017 — 2019',
    grade: '87.4%',
    description: 'Science stream with Mathematics, Physics, and Computer Science. Developed early interest in programming and logic design.',
    highlights: ['Mathematics', 'Physics', 'Computer Science'],
  },
];

const certifications = [
  { name: 'Meta React Developer Professional', issuer: 'Meta', year: '2023' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon', year: '2023' },
  { name: 'Google UX Design Certificate', issuer: 'Google', year: '2022' },
  { name: 'Full Stack Web Development', issuer: 'freeCodeCamp', year: '2022' },
];

export default function EducationSection() {
  return (
    <section className="py-24 lg:py-32 px-8 md:px-16 lg:px-24 border-t border-border bg-foreground/[0.015]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Education</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Academic foundation</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Degrees */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative pl-6 border-l-2 border-border hover:border-primary transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-border bg-background group-hover:border-primary transition-colors duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="flex items-center gap-3 mb-1">
                  <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-mono text-[10px] tracking-wide text-muted-foreground">{edu.period}</span>
                  <span className="font-mono text-[10px] tracking-wide text-primary">{edu.grade}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{edu.degree}</h3>
                <p className="text-primary/80 text-sm font-medium mb-3">{edu.institution}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{edu.description}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((h) => (
                    <span key={h} className="font-mono text-[10px] px-2 py-0.5 border border-border text-muted-foreground rounded-sm">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6 border-b border-border pb-3 flex items-center gap-2">
              <Award className="w-3 h-3" />
              Certifications
            </p>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between py-4 border-b border-border/50 group hover:bg-foreground/[0.02] -mx-4 px-4 rounded-sm transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{cert.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{cert.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}