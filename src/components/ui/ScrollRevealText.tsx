"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  start?: string;
  end?: string;
}

export default function ScrollRevealText({
  text,
  className,
  style,
  start = "top 80%",
  end = "bottom 40%",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLSpanElement>(".sr-char");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(chars, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        end,
        scrub: true,
      },
    });

    tl.to(chars, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: { each: 0.03 },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === container)
        .forEach((st) => st.kill());
    };
  }, [start, end]);

  return (
    <p ref={containerRef} className={className} style={style} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="sr-char"
          aria-hidden="true"
          style={{ display: "inline-block" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </p>
  );
}
