import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
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

export default function ContactSection() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [honeypot, setHoneypot] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSent, setLastSent] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const isValid =
    formData.name.trim().length >= 2 &&
    validateEmail(formData.email) &&
    formData.message.trim().length >= 10 &&
    selectedServices.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      toast.error("Spam detected");
      return;
    }

    const now = Date.now();

    if (now - lastSent < 15000) {
      toast.error("Please wait before sending again.");
      return;
    }

    if (!isValid) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    if (formData.message.length > 1000) {
      toast.error("Message too long.");
      return;
    }

    setIsSending(true);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          services: selectedServices,
          message: formData.message,
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent successfully");
      setIsSuccess(true);
      setLastSent(now);

      setFormData({ name: "", email: "", message: "" });
      setSelectedServices([]);

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="py-24 lg:py-32 px-8 md:px-16 lg:px-24 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto">
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

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 border border-green-500 text-green-500 rounded-sm"
          >
            Message sent successfully!
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            autoComplete="off"
            tabIndex="-1"
          />

          <div className="mb-8">
            <p className="text-xs uppercase mb-3 text-muted-foreground">
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
                    className={`px-4 py-2 border rounded-sm text-sm transition ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="focus:border-primary transition"
            />

            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="focus:border-primary transition"
            />
          </div>

          <Textarea
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="mb-6 min-h-[140px] focus:border-primary transition"
          />

          <Button
            type="submit"
            disabled={!isValid || isSending}
            className="relative px-10 py-6 overflow-hidden"
          >
            <span
              className={`flex items-center gap-2 ${
                isSending ? "opacity-0" : "opacity-100"
              }`}
            >
              {isSuccess ? "Sent" : "Send Message"}
              {!isSuccess && <Send className="w-4 h-4" />}
            </span>

            {isSending && (
              <span className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </span>
            )}
          </Button>

          {!isValid && (
            <p className="text-xs text-muted-foreground mt-3">
              * Fill all fields properly before sending
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
