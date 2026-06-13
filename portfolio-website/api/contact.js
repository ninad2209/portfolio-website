import emailjs from "@emailjs/nodejs";

// Whitelisted services — must match exactly what the form sends
const allowedServices = new Set([
  "Frontend Development",
  "Backend Development",
  "UI/UX Design & Interactive Prototyping",
  "Product Management",
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, services, message, honeypot } = req.body || {};

  // Honeypot — if this hidden field is filled, it's a bot
  if (honeypot) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // ─── Clean inputs ────────────────────────────────────────────────────────
  const cleanName     = String(name    || "").trim();
  const cleanEmail    = String(email   || "").trim();
  const cleanMessage  = String(message || "").trim();
  const cleanServices = Array.isArray(services) ? services : [];

  // ─── Validate ────────────────────────────────────────────────────────────

  if (cleanName.length < 2 || cleanName.length > 80) {
    return res.status(400).json({ message: "Invalid name" });
  }

  if (!isValidEmail(cleanEmail) || cleanEmail.length > 120) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (cleanMessage.length < 10 || cleanMessage.length > 1000) {
    return res.status(400).json({ message: "Invalid message" });
  }

  if (
    cleanServices.length === 0 ||
    cleanServices.length > 4 ||
    cleanServices.some((s) => !allowedServices.has(s))
  ) {
    return res.status(400).json({ message: "Invalid services" });
  }

  // ─── Send email via EmailJS ──────────────────────────────────────────────

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        name:     cleanName,
        email:    cleanEmail,
        services: cleanServices.join(", "),
        message:  cleanMessage,
      },
      {
        publicKey:  process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    return res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("EmailJS error:", error);
    return res.status(500).json({ message: "Failed to send message" });
  }
}