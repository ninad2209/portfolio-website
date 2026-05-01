import emailjs from "@emailjs/nodejs";

const allowedServices = new Set([
  "Frontend Development",
  "Backend Development",
  "UI/UX Design & Interactive Prototyping",
  "Product Management",
]);

const rateLimitMap = new Map();

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

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 3;

  const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);
  return false;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  }

  const { name, email, services, message, honeypot } = req.body || {};

  if (honeypot) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim();
  const cleanMessage = String(message || "").trim();
  const cleanServices = Array.isArray(services) ? services : [];

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
    cleanServices.some((service) => !allowedServices.has(service))
  ) {
    return res.status(400).json({ message: "Invalid services" });
  }

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

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("EmailJS error:", error);
    return res.status(500).json({ message: "Failed to send message" });
  }
}
