import emailjs from "@emailjs/nodejs";
import { redis } from "../src/lib/redis.js"; // adjust if you move lib out of src

const allowedServices = new Set([
  "Frontend Development",
  "Backend Development",
  "UI/UX Design & Interactive Prototyping",
  "Product Management",
]);

// ----------------------
// Utility functions
// ----------------------

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

// ----------------------
// Redis-based rate limit
// ----------------------

async function isRateLimited(ip) {
  const key = `rate-limit:${ip}`;
  const windowSeconds = 15 * 60; // 15 minutes
  const maxRequests = 3;

  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, windowSeconds);
  }

  return requests > maxRequests;
}

// ----------------------
// Main handler
// ----------------------

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const ip = getClientIp(req);

  // 🔐 Rate limiting
  if (await isRateLimited(ip)) {
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  }

  const { name, email, services, message, honeypot } = req.body || {};

  // 🕳 Honeypot spam protection
  if (honeypot) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // ----------------------
  // Clean input
  // ----------------------

  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim();
  const cleanMessage = String(message || "").trim();
  const cleanServices = Array.isArray(services) ? services : [];

  // ----------------------
  // Validation
  // ----------------------

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

  // ----------------------
  // Send email
  // ----------------------

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        name: cleanName,
        email: cleanEmail,
        services: cleanServices.join(", "),
        message: cleanMessage,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("EmailJS error:", error);

    return res.status(500).json({
      message: "Failed to send message",
    });
  }
}