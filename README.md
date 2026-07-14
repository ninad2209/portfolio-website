# 🌐 Ninad Portfolio

A modern, responsive personal portfolio website built to showcase my skills, projects, and experience as a developer. Designed with a focus on performance, animations, and clean UI/UX.

---

## ✨ Live Demo
🚀 Deployed on Vercel: https://ninad2209.vercel.app/

---

## 🧑‍💻 About the Project

This portfolio represents my work as a developer, highlighting my journey, technical skills, and real-world projects. It is built with a strong emphasis on smooth animations, responsive design, and security best practices.

The goal of this project is to create a professional online presence that is both visually appealing and functional across all devices.

---

## ⚙️ Tech Stack

- React.js (Vite)
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- EmailJS (for contact form)
- JavaScript (ES6+)

---

## 🎯 Features

- ⚡ Fully responsive design (mobile, tablet, desktop)
- 🌙 Dark/Light mode toggle
- 🎬 Smooth animations using Framer Motion
- 🧭 Floating navigation for easy section access
- 🧑 Hero section with animated portrait reveal
- 📂 Projects showcase section
- 🛠 Skills & experience sections
- 🎓 Education timeline
- 📬 Contact form integrated with EmailJS
- 🚀 Optimized performance and clean UI

---

## 🔒 Security Features (Contact Form)

The contact form implements multiple security layers to protect against common web vulnerabilities:

- **Honeypot Field** - Hidden field to detect and block bot submissions
- **Client-Side Rate Limiting** - 15-second throttle between form submissions
- **Input Validation** - Strict client-side validation (name, email, message format & length)
- **Server-Side Validation** - Defense-in-depth validation on backend (never trust client input)
- **Type Coercion & Sanitization** - Ensures all inputs are properly typed and cleaned
- **Whitelist-Based Service Selection** - Only predefined services are accepted
- **HTTP Method Validation** - POST-only endpoint enforcement
- **Environment Variable Protection** - Sensitive credentials stored securely
- **Generic Error Messages** - No sensitive information disclosure
- **Proper HTTP Status Codes** - RESTful error handling (400, 405, 500, 200)

---

## 📬 Contact

Feel free to reach out for collaborations or opportunities:

- Email: npangare621@gmail.com
- GitHub: https://github.com/ninad2209
- LinkedIn: https://www.linkedin.com/in/np2209/

---

## 🧠 Future Improvements

- Add blog section
- Improve SEO optimization
- Add project filtering system
- Enhance accessibility features
- Connect custom domain via GitHub Student Pack
- Implement CSRF token protection
- Add reCAPTCHA v3 for enhanced bot detection
- Server-side rate limiting by IP

---

## 📦 Setup Instructions

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/ninad2209/portfolio-website.git

# Navigate to project folder
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📄 License

This project is open source and available under the MIT License.
