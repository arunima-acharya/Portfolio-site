"use client";

import { useEffect, useState } from "react";
import {
  Monitor,
  Layers,
  Lightbulb,
  Wrench,
  MessageSquare,
  Mail,
} from "lucide-react";
import Dock from "@/components/ui/Dock";

const NAV_ITEMS = [
  { id: "hero",         label: "Home",         icon: <Monitor size={22} /> },
  { id: "featured",     label: "Featured Work", icon: <Layers size={22} /> },
  { id: "philosophy",   label: "Philosophy",    icon: <Lightbulb size={22} /> },
  { id: "skills",       label: "Skills",        icon: <Wrench size={22} /> },
  { id: "testimonials", label: "Testimonials",  icon: <MessageSquare size={22} /> },
  { id: "contact",      label: "Contact",       icon: <Mail size={22} /> },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SiteNav() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const items = NAV_ITEMS.map((item) => ({
    icon: item.icon,
    label: item.label,
    className: activeId === item.id ? "active" : "",
    onClick: () => scrollToSection(item.id),
  }));

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      <Dock
        items={items}
        panelHeight={69}
        baseItemSize={51}
        magnification={74}

      />
    </div>
  );
}
