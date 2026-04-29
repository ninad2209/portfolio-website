import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import VerticalNav from '../components/portfolio/VerticalNav';
import MobileNav from '../components/portfolio/MobileNav';

const serviceOptions = ['Frontend Development', 'Backend Development', 'UI/UX Design', 'Strategy'];

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const isValid = formData.name && formData.email && selectedServices.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500));
    setIsSending(false);
    toast.success('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setSelectedServices([]);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <VerticalNav active="/contact" />
      <MobileNav active="/contact" />

      <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24 pt-24 lg:pt-16 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" />
            Back to home
          </Link>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-3">03 / Contact</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Let's build something{' '}
            <span className="text-primary">extraordinary</span>.
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl leading-relaxed">
            Configure your project requirements below. Precision in — precision out.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Service Toggles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Select Services
            </p>
            <div className="flex flex-wrap gap-3">
              {serviceOptions.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-5 py-3 rounded-sm font-mono text-sm tracking-wide transition-all duration-300 border ${
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-transparent text-foreground border-border hover:border-foreground'
                    }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Form Fields */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                Your Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="bg-transparent border-border rounded-sm h-12 font-inter"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter Email-Address"
                className="bg-transparent border-border rounded-sm h-12 font-inter"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10"
          >
            <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
              Project Details
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project vision..."
              className="bg-transparent border-border rounded-sm min-h-[140px] font-inter"
            />
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              type="submit"
              disabled={!isValid || isSending}
              className="group px-10 py-6 bg-primary text-primary-foreground rounded-sm font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isSending ? 'Sending...' : 'Send Inquiry'}
              <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            {!isValid && (
              <p className="font-mono text-[10px] text-muted-foreground mt-3">
                * Select at least one service, enter your name and email to enable submission
              </p>
            )}
          </motion.div>
        </form>

        {/* Footer metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4"
        >
          <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
            <p>NINAD PANGARE — SOFTWARE ENGINEER </p>
            <p className="mt-1">AVAILABLE FOR WORK-STUDENT & PART-TIME </p>
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground text-right">
            <p>GERMANY — 2026</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}