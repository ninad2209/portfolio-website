import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const serviceOptions = [
  "Frontend Development",
  "Backend Development",
  "UI/UX Design & Interactive Prototyping",
  "Product Management",
];

// ─── Typing dots indicator ────────────────────────────────────────────────────
function TypingDots() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 400);
    return () => clearInterval(t);
  }, []);
  return <span>// transmitting{dots}</span>;
}

// ─── Success Overlay ──────────────────────────────────────────────────────────
function SuccessOverlay({ name, onDone }) {
  // Empty dependency array = runs once on mount only, no re-trigger on re-renders
  useEffect(() => {
    const t = setTimeout(onDone, 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8"
    >
      {/* Glowing ring + check icon */}
      <div className="relative mb-8">
        {/* Outer pulse ring */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1, 1.4, 1.6], opacity: [0.6, 0.3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2 border-primary"
        />
        {/* Middle pulse ring */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1, 1.25, 1.45], opacity: [0.5, 0.25, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
          className="absolute inset-0 rounded-full border border-primary"
        />
        {/* Icon circle */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
        >
          <CheckCircle className="w-9 h-9 text-primary" />
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-3">
          Message received
        </p>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Thanks, <span className="text-primary">{name || "there"}</span>!
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
          Your message is on its way. I'll review your project details and get back to you shortly.
        </p>
      </motion.div>

      {/* Hacker transmitting indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 font-mono text-[10px] text-primary/50 tracking-widest"
      >
        <TypingDots />
      </motion.div>
    </motion.div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function ContactSection() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [honeypot, setHoneypot] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSent, setLastSent] = useState(0);
  const [sentName, setSentName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const isValid =
    formData.name.trim().length >= 2 &&
    validateEmail(formData.email) &&
    formData.message.trim().length >= 10 &&
    selectedServices.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) { toast.error("Spam detected"); return; }
    const now = Date.now();
    if (now - lastSent < 15000) { toast.error("Please wait before sending again."); return; }
    if (!isValid) { toast.error("Please fill all fields correctly."); return; }
    if (formData.message.length > 1000) { toast.error("Message too long."); return; }

    setIsSending(true);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          services: selectedServices,
          message: formData.message,
          honeypot,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send message");

      setSentName(formData.name.split(" ")[0]);
      setIsSuccess(true);
      setLastSent(now);
      setFormData({ name: "", email: "", message: "" });
      setSelectedServices([]);

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="py-24 lg:py-32 px-8 md:px-16 lg:px-24 border-t border-border">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-3">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Lets Develop something <span className="text-primary">awesome</span>
          </h2>
          <p className="text-muted-foreground mt-3">
            Send your project details and I'll respond soon.
          </p>
        </motion.div>

        {/* Form + Success overlay container */}
        <div className="relative min-h-[460px]">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <SuccessOverlay
                key="success"
                name={sentName}
                onDone={() => setIsSuccess(false)}
              />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  autoComplete="off"
                  tabIndex="-1"
                />

                {/* Service selection */}
                <div className="mb-8">
                  <p className="text-xs uppercase mb-3 text-muted-foreground">
                    Select Services
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {serviceOptions.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <motion.button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          whileTap={{ scale: 0.96 }}
                          className={`px-4 py-2 border rounded-sm text-sm transition ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary"
                          }`}
                        >
                          {service}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="focus:border-primary transition"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="focus:border-primary transition"
                  />
                </div>

                {/* Message */}
                <Textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mb-6 min-h-[140px] focus:border-primary transition"
                />

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={!isValid || isSending}
                  className="relative px-10 py-6 overflow-hidden group"
                >
                  <span className={`flex items-center gap-2 transition-opacity ${isSending ? "opacity-0" : "opacity-100"}`}>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>

                  {isSending && (
                    <span className="absolute inset-0 flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm font-mono">Sending...</span>
                    </span>
                  )}
                </Button>

                {!isValid && (
                  <p className="text-xs text-muted-foreground mt-3">
                    * Fill all fields properly before sending
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}