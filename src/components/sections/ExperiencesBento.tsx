"use client";

import { useRef, useState, useEffect } from "react";

const AVATARS = [
  "https://i.pravatar.cc/32?img=1",
  "https://i.pravatar.cc/32?img=2",
  "https://i.pravatar.cc/32?img=3",
  "https://i.pravatar.cc/32?img=4",
  "https://i.pravatar.cc/32?img=5",
];

const TESTIMONIALS = [
  { name: "James Carter",    role: "Wilson & Co",           avatar: "https://i.pravatar.cc/40?img=11", quote: "Incredible team! They delivered exactly what we needed, on time and beyond expectations.",                                                type: "profile-top"   },
  { name: "Emily Davis",     role: "Startup Hub",           avatar: "https://i.pravatar.cc/40?img=5",  quote: "A smooth process from start to finish. Highly professional team!",                                                                      type: "quote-center"  },
  { name: "Anna Martinez",   role: "Marketing Director",    avatar: "https://i.pravatar.cc/40?img=9",  quote: "Our new branding is exactly what we envisioned—clean, modern, and unique. #1 in our industry.",                                         type: "profile-top"   },
  { name: "David Kim",       role: "Head of Product, Luno", avatar: "https://i.pravatar.cc/40?img=13", quote: "The attention to detail and strategic thinking behind every screen genuinely surprised us. Raised our bar.",                             type: "quote-center"  },
  { name: "Sophie Laine",    role: "Co-founder, Arcform",   avatar: "https://i.pravatar.cc/40?img=47", quote: "From zero to a fully shipped design system in eight weeks. Unmatched speed without sacrificing quality.",                                type: "profile-top"   },
  { name: "Rohan Mehta",     role: "CTO, Pebble Health",    avatar: "https://i.pravatar.cc/40?img=60", quote: "Bridged the gap between engineering and design better than anyone we've worked with. Shipped faster, broke less.",                       type: "quote-center"  },
  { name: "Claire Fontaine", role: "VP Design, Meridian",   avatar: "https://i.pravatar.cc/40?img=44", quote: "Took ambiguous requirements and turned them into a coherent product vision. The team immediately felt direction.",                       type: "profile-top"   },
];

// Clone first 3 cards at the end for seamless infinite loop
const EXTENDED = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, 3)];
const GAP = 12;
const VISIBLE = 3;

function Stars() {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#111">
          <path d="M7 1l1.55 3.14L12 4.74l-2.5 2.44.59 3.44L7 9l-3.09 1.62.59-3.44L2 4.74l3.45-.6L7 1z" />
        </svg>
      ))}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round">
      <path d="M9 3v12M3 9h12" />
    </svg>
  );
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  const base: React.CSSProperties = {
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.07)",
    borderRadius: "var(--radius-2xl)",
    padding: "var(--spacing-24)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    flexShrink: 0,
  };

  if (t.type === "quote-center") {
    return (
      <div style={{ ...base, justifyContent: "space-between", gap: 20 }}>
        <p style={{ fontSize: 17, fontWeight: 700, color: "#0a0a0a", lineHeight: 1.45, margin: 0, textAlign: "center", letterSpacing: "-0.02em", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {t.quote}
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <Stars />
          <div style={{ height: 1, background: "rgba(0,0,0,0.06)", width: "100%" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={t.avatar} alt="" width={36} height={36} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "#aaa" }}>{t.role}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...base, gap: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={t.avatar} alt="" width={36} height={36} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>{t.name}</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>{t.role}</div>
          </div>
        </div>
        <PlusIcon />
      </div>
      <Stars />
      <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "20px 0" }} />
      <p style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", lineHeight: 1.5, margin: 0, letterSpacing: "-0.02em" }}>
        {t.quote}
      </p>
    </div>
  );
}

export default function ExperiencesBento() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Measure one card's slide distance
  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSlideWidth((w - GAP * (VISIBLE - 1)) / VISIBLE + GAP);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true);
      setIndex(i => i + 1);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // When we've slid to the cloned section, silently reset to real index 0
  useEffect(() => {
    if (index === TESTIMONIALS.length) {
      const id = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 500); // after slide finishes
      return () => clearTimeout(id);
    }
  }, [index]);

  // Re-enable animation after silent reset
  useEffect(() => {
    if (!animate) {
      const id = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(id);
    }
  }, [animate]);

  const translateX = slideWidth ? -(index * slideWidth) : 0;

  function goTo(i: number) {
    setAnimate(true);
    setIndex(i);
  }
  function prev() { goTo(index === 0 ? TESTIMONIALS.length - 1 : index - 1); }
  function next() { goTo(index + 1 >= TESTIMONIALS.length ? 0 : index + 1); }

  return (
    <section style={{ background: "#f5f5f3", paddingTop: 72, paddingBottom: 72, paddingLeft: "15%", paddingRight: "15%" }}>

      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#111" }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: "#111", letterSpacing: "0.01em" }}>Testimonials</span>
      </div>

      {/* Heading */}
      <h2 style={{ fontSize: "clamp(64px, 8vw, 96px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: "#0a0a0a", margin: 0, marginBottom: 8 }}>
        Experiences.
      </h2>
      <p style={{ fontSize: 13, color: "#888", marginBottom: "var(--spacing-48)", marginTop: 4 }}>©2025</p>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2.6fr", gap: "var(--spacing-12)", alignItems: "start" }}>

        {/* Sticky rating card */}
        <div style={{ position: "sticky", top: 100 }}>
          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "var(--radius-2xl)", padding: "var(--spacing-24)", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 52, fontWeight: 800, letterSpacing: "-0.04em", color: "#0a0a0a", lineHeight: 1 }}>4.9</span>
              <span style={{ fontSize: 16, color: "#aaa", fontWeight: 500 }}>/5</span>
            </div>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 }}>
              We've delivered <strong style={{ color: "#0a0a0a" }}>56+ projects</strong> that help companies generate real results.
            </p>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a", marginBottom: 10 }}>fabrica<span style={{ fontSize: 10 }}>®</span></div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                {AVATARS.map((src, i) => (
                  <img key={i} src={src} alt="" width={28} height={28} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #fff", objectFit: "cover", marginLeft: i === 0 ? 0 : -8 }} />
                ))}
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0a0a0a", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -8, border: "2px solid #fff" }}>56+</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Stars />
                <span style={{ fontSize: 11, color: "#888" }}>Trusted by clients worldwide</span>
              </div>
            </div>
            <button style={{ background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 999, padding: "12px 20px", fontSize: 13, fontWeight: 600, cursor: "default", width: "100%", letterSpacing: "-0.01em" }}>
              Leave a review
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div>
          {/* Viewport */}
          <div ref={containerRef} style={{ overflow: "hidden", borderRadius: 16 }}>
            {/* Track — all cards in a row */}
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: GAP,
                transform: `translateX(${translateX}px)`,
                transition: animate ? "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                willChange: "transform",
              }}
            >
              {EXTENDED.map((t, i) => (
                <div
                  key={i}
                  style={{
                    flex: `0 0 calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
                    minWidth: 0,
                    minHeight: 280,
                  }}
                >
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
            {/* Dots */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === index % TESTIMONIALS.length ? 20 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: i === index % TESTIMONIALS.length ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 0.25s ease, background 0.25s ease",
                  }}
                />
              ))}
            </div>
            {/* Arrows */}
            <div style={{ display: "flex", gap: 8 }}>
              {([
                { fn: prev, d: "M10 5H4M4 5L7 2M4 5L7 8" },
                { fn: next, d: "M4 5h6M10 5L7 2M10 5L7 8" },
              ] as const).map(({ fn, d }, i) => (
                <button
                  key={i}
                  onClick={fn}
                  style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
