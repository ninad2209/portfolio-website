import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, Briefcase, Sparkles, Mail } from "lucide-react";

const sections = ["home", "experience", "projects", "skills", "education", "contact"];

const mobileSections = [
  { id: "home", label: "Home", Icon: Home },
  { id: "projects", label: "Work", Icon: Briefcase },
  { id: "skills", label: "Skills", Icon: Sparkles },
  { id: "contact", label: "Contact", Icon: Mail },
];

export default function FloatingNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const top = el.offsetTop - 150;
        if (window.scrollY >= top) current = id;
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const mobileActive = (id) => {
    if (id === "projects") {
      return ["experience", "projects", "education"].includes(active);
    }

    return active === id;
  };

  return (
    <>
      <div className="fixed top-6 left-1/2 z-50 hidden -translate-x-1/2 sm:block">
        <div className="flex gap-2 px-4 py-2 rounded-full bg-background/70 backdrop-blur-xl border border-border shadow-lg">
          {sections.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollTo(item)}
              className="relative px-4 py-1 text-sm font-medium"
            >
              {active === item && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <span
                className={`relative z-10 capitalize ${
                  active === item
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:hidden">
        <div className="grid w-full max-w-[360px] grid-cols-4 rounded-2xl border border-border bg-background/85 p-1.5 shadow-2xl backdrop-blur-xl">
          {mobileSections.map(({ id, label, Icon }) => {
            const isActive = mobileActive(id);

            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-pill"
                    className="absolute inset-0 rounded-xl bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <Icon
                  className={`relative z-10 h-4 w-4 ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                />

                <span
                  className={`relative z-10 ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
