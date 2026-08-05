"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

function KpiCard({ label, num, delta, sub, accent, isActive }: { label: string; num: number; delta: string; sub: string; accent: boolean; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 1 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 1 });
  const kpiScale = useSpring(useMotionValue(1), { stiffness: 150, damping: 20, mass: 1 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    rotX.set(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -12);
    rotY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 12);
  }

  // Counter-up animation
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const step = 50;
    const steps = Math.ceil(num / step);
    const interval = 4000 / steps;

    function runCycle() {
      setCount(0);
      let current = 0;
      const id = setInterval(() => {
        current += step;
        if (current >= num) {
          setCount(num);
          clearInterval(id);
        } else {
          setCount(current);
        }
      }, interval);
      return id;
    }

    let countId = runCycle();
    const loopId = setInterval(() => {
      clearInterval(countId);
      countId = runCycle();
    }, 4000);

    return () => { clearInterval(countId); clearInterval(loopId); };
  }, [started, num]);

  const displayed = `$${count.toLocaleString()}`;

  return (
    <motion.div
      ref={(el) => { (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el; (observerRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }}
      onMouseMove={onMove}
      onMouseEnter={() => kpiScale.set(1.04)}
      onMouseLeave={() => { rotX.set(0); rotY.set(0); kpiScale.set(1); }}
      animate={isActive
        ? { scale: 1.04, boxShadow: "0 16px 40px rgba(26,35,50,0.14), 0 0 0 1px rgba(26,35,50,0.14)" }
        : { scale: 1,    boxShadow: "0 0px 0px rgba(0,0,0,0)" }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        background: accent ? "#e8510a" : "#ffffff",
        border: accent ? "none" : "1px solid rgba(26,35,50,0.10)",
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: "600px",
        cursor: "default",
        willChange: "transform",
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 10, color: accent ? "rgba(255,255,255,0.8)" : "rgba(26,35,50,0.45)" }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: accent ? "#fff" : "#1A2332", letterSpacing: "-0.03em", lineHeight: 1 }}>{displayed}</div>
      <div style={{ fontSize: 10, marginTop: 6, color: accent ? "rgba(255,255,255,0.8)" : "rgba(26,35,50,0.4)" }}>
        <span style={{ color: accent ? "#fff" : "#22c55e", fontWeight: 600 }}>{delta}</span>{"  "}{sub}
      </div>
    </motion.div>
  );
}

export default function DarkHeroStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Gates the three perpetual-loop effects below (card rotation, row
  // rotation, bar-chart animation) so they only run while the mockup is
  // actually on screen — without this they'd tick forever in the
  // background on every page, including while scrolled far away.
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const animating = inView && !isMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const rawY       = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const rawScale   = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const y       = useSpring(rawY,       { stiffness: 50, damping: 18 });
  const opacity = useSpring(rawOpacity, { stiffness: 50, damping: 18 });
  const scale   = useSpring(rawScale,   { stiffness: 50, damping: 18 });

  // Tilt effect for dashboard mockup
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30, mass: 2 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30, mass: 2 });
  const tiltScale = useSpring(useMotionValue(1), { stiffness: 100, damping: 30, mass: 2 });
  const [, setLastY] = useState(0);

  function handleCardMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    tiltX.set((offsetY / (rect.height / 2)) * -15);
    tiltY.set((offsetX / (rect.width / 2)) * 15);
    setLastY(offsetY);
  }
  const shadowX = useTransform(tiltY, [-15, 15], [30, -30]);
  const shadowY = useTransform(tiltX, [-15, 15], [-30, 30]);
  const shadowBlur = useTransform(tiltScale, [1, 1.02], [60, 100]);
  // Softer than the original 0.65 black: that shadow was near-invisible against
  // the old near-black backdrop, but reads as a heavy halo on the light one.
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(26,35,50,0.28), 0 0 0 1px rgba(26,35,50,0.12)`;

  const [activeLeftCard, setActiveLeftCard] = useState(0);
  useEffect(() => {
    if (!animating) return;
    const id = setInterval(() => setActiveLeftCard(i => (i + 1) % 3), 2000);
    return () => clearInterval(id);
  }, [animating]);

  const [activeRow, setActiveRow] = useState(0);
  useEffect(() => {
    if (!animating) return;
    const id = setInterval(() => setActiveRow(i => (i + 1) % 5), 2000);
    return () => clearInterval(id);
  }, [animating]);

  const BAR_CONFIG = [
    { baseP: 55, baseL: 30, label: "Jan",  freqP: 0.8,  freqL: 0.5,  phaseP: 0.0, phaseL: 1.1 },
    { baseP: 70, baseL: 40, label: "Feb",  freqP: 0.6,  freqL: 0.9,  phaseP: 0.7, phaseL: 0.3 },
    { baseP: 48, baseL: 25, label: "Mar",  freqP: 1.1,  freqL: 0.7,  phaseP: 1.4, phaseL: 2.0 },
    { baseP: 80, baseL: 45, label: "Apr",  freqP: 0.7,  freqL: 1.0,  phaseP: 2.1, phaseL: 0.8 },
    { baseP: 90, baseL: 50, label: "May",  freqP: 0.9,  freqL: 0.6,  phaseP: 0.4, phaseL: 1.7 },
    { baseP: 85, baseL: 60, label: "Jun",  freqP: 0.5,  freqL: 1.2,  phaseP: 1.8, phaseL: 0.2 },
    { baseP: 65, baseL: 35, label: "Jul",  freqP: 1.2,  freqL: 0.8,  phaseP: 0.9, phaseL: 1.4 },
    { baseP: 60, baseL: 38, label: "Aug",  freqP: 0.75, freqL: 0.55, phaseP: 1.2, phaseL: 0.6 },
  ];
  const [bars, setBars] = useState(BAR_CONFIG.map(b => ({ p: b.baseP, l: b.baseL, label: b.label })));
  useEffect(() => {
    if (!animating) return;
    let t = 0;
    const id = setInterval(() => {
      t += 0.12;
      setBars(BAR_CONFIG.map(b => ({
        label: b.label,
        p: b.baseP + Math.sin(t * b.freqP + b.phaseP) * 23,
        l: b.baseL + Math.sin(t * b.freqL + b.phaseL) * 17,
      })));
    }, 50);
    return () => clearInterval(id);
  }, [animating]);

  function handleCardMouseEnter() { tiltScale.set(1.02); }
  function handleCardMouseLeave() {
    tiltX.set(0); tiltY.set(0); tiltScale.set(1);
  }

  return (
    <section
      ref={sectionRef}
      style={{
        // Light palette shared with the TypographyZoom section above it.
        backgroundColor: "#F1EFEA",
        width: "100%",
        boxSizing: "border-box",
        paddingTop: isMobile ? "60px" : "105px",
        paddingBottom: isMobile ? "60px" : "105px",
        paddingLeft: isMobile ? "20px" : "15%",
        paddingRight: isMobile ? "20px" : "15%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div ref={ref} style={{ opacity, y, scale }}>
        {/* Top row — label + heading + subtitle + buttons */}
        <div
          style={{
            marginBottom: isMobile ? "40px" : "72px",
          }}
        >
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Heading */}
            <h2 style={{
              fontSize: isMobile ? "32px" : "clamp(36px, 4vw, 54px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: 0,
              color: "#1A2332",
              margin: 0,
              fontFamily: "var(--font-playfair-display), 'Playfair Display', serif",
            }}>
              Building Products That<br />People Actually Use
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: 1.7,
              color: "#5C5955",
              margin: 0,
              maxWidth: "380px",
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 400,
            }}>
              For the last 3 years, I&apos;ve helped businesses simplify workflows, improve operations, and create better user experiences across multiple industries.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px", flexWrap: "wrap" }}>
              <a
                href="#contact"
                aria-label="Connect on a call"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  backgroundColor: "#1A2332",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  transition: "background 0.2s ease, color 0.2s ease",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#e8510a";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1A2332";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
              >
                Connect on a Call
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume (opens in new tab)"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(26,35,50,0.25)",
                  backgroundColor: "transparent",
                  color: "rgba(26,35,50,0.75)",
                  fontSize: "13px",
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(26,35,50,0.55)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#1A2332";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(26,35,50,0.25)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(26,35,50,0.75)";
                }}
              >
                Download Resume
              </a>
            </div>
          </div>

        </div>

        {/* Large statement text */}
        <div
          style={{
            paddingTop: isMobile ? "60px" : "140px",
            marginLeft: isMobile ? 0 : "-15%",
            marginRight: isMobile ? 0 : "-15%",
            paddingLeft: isMobile ? 0 : "15%",
            paddingRight: isMobile ? 0 : "15%",
          }}
        >
          <p style={{
            fontSize: isMobile ? "16px" : "26px",
            lineHeight: 1.705,
            color: "rgba(26,35,50,0.68)",
            margin: 0,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            textAlign: "center",
            width: "100%",
          }}>
            Across Hospitality, HRMS, Analytics, and SaaS platforms, I&apos;ve spent the last 3 years transforming complex business challenges into intuitive product experiences through{" "}
            <span style={{ color: "#1A2332" }}>research, strategic thinking, systems design,</span>{" "}
            and end-to-end execution.
          </p>
        </div>

        {/* Dashboard mockup — hidden on mobile, shown on desktop */}
        {!isMobile && (
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            style={{
              marginTop: "112px",
              marginLeft: "-5%",
              marginRight: "-5%",
              zoom: 0.9,
              perspective: "1000px",
              rotateX: tiltX,
              rotateY: tiltY,
              scale: tiltScale,
              transformStyle: "preserve-3d",
              cursor: "default",
            }}
          >
            <motion.div style={{
              background: "#ffffff",
              borderRadius: "20px",
              overflow: "hidden",
              fontFamily: "var(--font-manrope), sans-serif",
              boxShadow,
              translateZ: 40,
            }}>

              {/* Top nav */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", background: "#ffffff", borderBottom: "1px solid rgba(26,35,50,0.08)", height: 46 }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "#e8510a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="4.5" height="4.5" rx="1.2" fill="#fff"/><rect x="7.5" y="1" width="4.5" height="4.5" rx="1.2" fill="rgba(255,255,255,0.5)"/><rect x="1" y="7.5" width="4.5" height="4.5" rx="1.2" fill="rgba(255,255,255,0.5)"/><rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1.2" fill="rgba(255,255,255,0.25)"/></svg>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1A2332" }}>Finexy</span>
                </div>
                {/* Nav tabs */}
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {["Overview","Activity","Manage","Program","Account","Reports"].map((t, i) => (
                    <div key={t} style={{ padding: "5px 12px", borderRadius: 8, background: i === 0 ? "#e8510a" : "transparent", cursor: "default" }}>
                      <span style={{ fontSize: 11, color: i === 0 ? "#fff" : "rgba(26,35,50,0.45)", fontWeight: i === 0 ? 600 : 400 }}>{t}</span>
                    </div>
                  ))}
                </div>
                {/* Right icons + user */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {[
                    <svg key="s" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(26,35,50,0.45)" strokeWidth="1.3" strokeLinecap="round"><circle cx="6" cy="6" r="4"/><path d="M10.5 10.5l2 2"/></svg>,
                    <svg key="b" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(26,35,50,0.45)" strokeWidth="1.3" strokeLinecap="round"><path d="M7 1.5a4 4 0 014 4v2l1 2H2l1-2v-2a4 4 0 014-4zM5.5 11.5a1.5 1.5 0 003 0"/></svg>,
                    <svg key="c" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(26,35,50,0.45)" strokeWidth="1.3" strokeLinecap="round"><circle cx="7" cy="7" r="5"/><path d="M7 4v3l2 1"/></svg>,
                  ]}
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#e8510a,#a259ff)" }} />
                    <div>
                      <div style={{ fontSize: 10.5, color: "#1A2332", fontWeight: 500, lineHeight: 1.2 }}>Arunima A.</div>
                      <div style={{ fontSize: 9, color: "rgba(26,35,50,0.35)" }}>arunima@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* App body */}
              <div style={{ display: "grid", gridTemplateColumns: "48px 1fr", minHeight: 580 }}>

                {/* Icon sidebar */}
                <div style={{ background: "#ffffff", borderRight: "1px solid rgba(26,35,50,0.08)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16, gap: 6 }}>
                  {[
                    "M3 5h8M3 9h8M3 13h4",
                    "M2 3h10v8a2 2 0 01-2 2H4a2 2 0 01-2-2V3zM5 3V1h4v2",
                    "M2 12l3-9 3 6 2-3 3 6",
                    "M7 7a3 3 0 100-6 3 3 0 000 6zM1 13s1-3 6-3 6 3 6 3",
                    "M2 2h10v10H2zM5 2v10M2 6h10",
                    "M7 1v12M1 7h12",
                    "M2 12l2-5 3 3 3-6 3 4",
                    "M7 1a6 6 0 100 12A6 6 0 007 1zM7 4v3l2 2",
                  ].map((d, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: i === 0 ? "rgba(232,81,10,0.15)" : "transparent", cursor: "default" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={i === 0 ? "#e8510a" : "rgba(26,35,50,0.3)"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
                    </div>
                  ))}
                  <div style={{ marginTop: "auto", marginBottom: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                    {["M1 13L5 2l2 4 2-4 4 11","M7 1v12M1 7h12"].map((d, i) => (
                      <div key={i} style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "default" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(26,35,50,0.25)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main content */}
                <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14, background: "#ffffff" }}>

                  {/* Greeting */}
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#1A2332", letterSpacing: "-0.02em" }}>Good morning, Arunima</div>
                    <div style={{ fontSize: 11, color: "rgba(26,35,50,0.4)", marginTop: 2 }}>Stay on top of your tasks, monitor progress, and track status.</div>
                  </div>

                  {/* Row 1: Balance | 2×2 KPIs | Chart */}
                  <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1.4fr", gap: 12, alignItems: "stretch" }}>

                    {/* Col 1 — Total Balance */}
                    <motion.div
                      animate={activeLeftCard === 0
                        ? { scale: 1.03, boxShadow: "0 16px 40px rgba(26,35,50,0.14), 0 0 0 1px rgba(26,35,50,0.14)" }
                        : { scale: 1,    boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ background: "#ffffff", border: "1px solid rgba(26,35,50,0.10)", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14, transformOrigin: "center center" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 10, color: "rgba(26,35,50,0.45)" }}>Total Balance</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(26,35,50,0.05)", borderRadius: 6, padding: "3px 8px" }}>
                          <span style={{ fontSize: 9.5, color: "rgba(26,35,50,0.55)" }}>USD ▾</span>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: "#1A2332", letterSpacing: "-0.03em" }}>$689,372.00</div>
                        <div style={{ fontSize: 10, color: "#22c55e", marginTop: 4 }}>↑ 5%  <span style={{ color: "rgba(26,35,50,0.4)" }}>than last month</span></div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <motion.div whileHover={{ background: "#28374a" }} transition={{ duration: 0.15 }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "#1A2332", borderRadius: 8, padding: "7px 0", cursor: "default" }}>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"><path d="M1 5.5h9M6 1l4 4.5L6 10"/></svg>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Transfer</span>
                        </motion.div>
                        <motion.div whileHover={{ background: "rgba(26,35,50,0.1)" }} transition={{ duration: 0.15 }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "rgba(26,35,50,0.06)", borderRadius: 8, padding: "7px 0", cursor: "default" }}>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="rgba(26,35,50,0.65)" strokeWidth="1.5" strokeLinecap="round"><path d="M10 5.5H1M5 1L1 5.5 5 10"/></svg>
                          <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(26,35,50,0.65)" }}>Request</span>
                        </motion.div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9.5, color: "rgba(26,35,50,0.35)", marginBottom: 8 }}>Wallets · Total 6 wallets</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                          {[
                            { flag: "🇺🇸", cur: "USD", val: "$22,678", sub: "Limit $36k/m", status: "Active", c: "#22c55e" },
                            { flag: "🇩🇪", cur: "EUR", val: "€18,345", sub: "Limit $23k/m", status: "Active", c: "#22c55e" },
                            { flag: "🇬🇧", cur: "GBP", val: "£15,000", sub: "Limit $13k/m", status: "Inactive", c: "#f59e0b" },
                          ].map((w) => (
                            <motion.div
                              key={w.cur}
                              whileHover={{ scale: 1.06, background: "rgba(26,35,50,0.06)", borderColor: "rgba(26,35,50,0.16)" }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              style={{ background: "rgba(26,35,50,0.035)", border: "1px solid rgba(26,35,50,0.08)", borderRadius: 10, padding: "10px 10px 8px" }}
                            >
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                                <span style={{ fontSize: 11 }}>{w.flag}</span>
                                <span style={{ fontSize: 9, color: "rgba(26,35,50,0.3)" }}>···</span>
                              </div>
                              <div style={{ fontSize: 10, fontWeight: 600, color: "#1A2332" }}>{w.cur}</div>
                              <div style={{ fontSize: 11, fontWeight: 700, color: "#1A2332", marginTop: 2, letterSpacing: "-0.02em" }}>{w.val}</div>
                              <div style={{ fontSize: 8.5, color: "rgba(26,35,50,0.3)", marginTop: 2 }}>{w.sub}</div>
                              <div style={{ marginTop: 6, fontSize: 8.5, color: w.c, fontWeight: 500 }}>{w.status}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Col 2 — 2×2 KPI grid only */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignContent: "stretch" }}>
                      {[
                        { label: "Total Earnings", num: 950,  delta: "↑ 7%", sub: "This month", accent: true },
                        { label: "Total Spending", num: 700,  delta: "↓ 5%", sub: "This month", accent: false },
                        { label: "Total Income",   num: 1050, delta: "↑ 8%", sub: "This month", accent: false },
                        { label: "Total Revenue",  num: 850,  delta: "↑ 4%", sub: "This month", accent: false },
                      ].map((k) => (
                        <KpiCard key={k.label} {...k} isActive={false} />
                      ))}
                    </div>

                    {/* Col 3 — Total Income chart */}
                    <div style={{ background: "#ffffff", border: "1px solid rgba(26,35,50,0.10)", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1A2332" }}>Total Income</div>
                        <div style={{ fontSize: 10, color: "rgba(26,35,50,0.4)", marginTop: 2 }}>View your income in a certain period of time</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 10, fontWeight: 500, color: "rgba(26,35,50,0.55)" }}>Profit and Loss</span>
                        <div style={{ display: "flex", gap: 10 }}>
                          {[{ label: "Profit", color: "#e8510a" },{ label: "Loss", color: "rgba(26,35,50,0.22)" }].map(l => (
                            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                              <span style={{ fontSize: 9.5, color: "rgba(26,35,50,0.45)" }}>{l.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 5, alignItems: "flex-end", flex: 1, minHeight: 100 }}>
                        {bars.map((b) => (
                          <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                            <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 96 }}>
                              <motion.div
                                animate={{ height: `${b.p}%` }}
                                transition={{ duration: 0.05, ease: "linear" }}
                                style={{ flex: 1, borderRadius: "3px 3px 0 0", background: "#e8510a" }}
                              />
                              <motion.div
                                animate={{ height: `${b.l}%` }}
                                transition={{ duration: 0.05, ease: "linear" }}
                                style={{ flex: 1, borderRadius: "3px 3px 0 0", background: "rgba(26,35,50,0.18)" }}
                              />
                            </div>
                            <div style={{ fontSize: 8, color: "rgba(26,35,50,0.32)" }}>{b.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {["0","10k","20k","30k","40k","50k"].map(v => (
                          <span key={v} style={{ fontSize: 8, color: "rgba(26,35,50,0.28)" }}>{v}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Spending+Cards | Recent Activities */}
                  <div style={{ display: "grid", gridTemplateColumns: "1.1fr 2.4fr", gap: 12, alignItems: "start" }}>

                    {/* Col 1 — Monthly Spending + My Cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignSelf: "stretch" }}>
                      <motion.div
                        animate={activeLeftCard === 1
                          ? { scale: 1.03, boxShadow: "0 16px 40px rgba(26,35,50,0.14), 0 0 0 1px rgba(26,35,50,0.14)" }
                          : { scale: 1,    boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ background: "#ffffff", border: "1px solid rgba(26,35,50,0.10)", borderRadius: 12, padding: "14px 16px", transformOrigin: "center center" }}
                      >
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#1A2332", marginBottom: 14 }}>Monthly Spending Limit</div>
                        <div style={{ height: 6, borderRadius: 9999, background: "rgba(26,35,50,0.08)", marginBottom: 10 }}>
                          <div style={{ height: "100%", width: "25%", borderRadius: 9999, background: "#e8510a" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 10, color: "rgba(26,35,50,0.55)" }}><span style={{ color: "#1A2332", fontWeight: 600 }}>$1,400.00</span> spent out of</span>
                          <span style={{ fontSize: 10, color: "rgba(26,35,50,0.45)" }}>$5,500.00</span>
                        </div>
                      </motion.div>
                      <motion.div
                        animate={activeLeftCard === 2
                          ? { scale: 1.03, boxShadow: "0 16px 40px rgba(26,35,50,0.14), 0 0 0 1px rgba(26,35,50,0.14)" }
                          : { scale: 1,    boxShadow: "0 0px 0px rgba(0,0,0,0)" }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ background: "#ffffff", border: "1px solid rgba(26,35,50,0.10)", borderRadius: 12, padding: "14px", flex: 1, display: "flex", flexDirection: "column", transformOrigin: "center center" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#1A2332" }}>My Cards</span>
                          <span style={{ fontSize: 9.5, color: "#e8510a", cursor: "default" }}>+ Add new</span>
                        </div>
                        <div style={{
                          flex: 1,
                          borderRadius: 14,
                          background: "linear-gradient(145deg, #e8510a 0%, #f07020 40%, #f59e0b 100%)",
                          position: "relative",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          padding: "16px 18px",
                          minHeight: 120,
                        }}>
                          <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
                          <div style={{ position: "absolute", top: 10, right: 10, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                          <div style={{ position: "absolute", bottom: -20, left: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(0,0,0,0.1)" }} />
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                            <div style={{ background: "rgba(34,197,94,0.25)", border: "1px solid rgba(34,197,94,0.5)", borderRadius: 9999, padding: "3px 9px", fontSize: 8.5, color: "#22c55e", fontWeight: 600 }}>Active</div>
                            <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                              <circle cx="12" cy="10" r="10" fill="rgba(255,255,255,0.3)"/>
                              <circle cx="20" cy="10" r="10" fill="rgba(255,255,255,0.15)"/>
                            </svg>
                          </div>
                          <div style={{ position: "relative", zIndex: 1 }}>
                            <div style={{ width: 28, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.4)", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ width: 16, height: 12, borderRadius: 2, border: "1px solid rgba(255,255,255,0.5)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, padding: 2 }}>
                                <div style={{ background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
                                <div style={{ background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
                                <div style={{ background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
                                <div style={{ background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
                              </div>
                            </div>
                            <div style={{ fontSize: 11, color: "#fff", fontWeight: 500, letterSpacing: "0.18em", marginBottom: 14 }}>•••• •••• •••• 4356</div>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                              <div>
                                <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Card Holder</div>
                                <div style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>Arunima Acharya</div>
                              </div>
                              <div style={{ display: "flex", gap: 16 }}>
                                <div>
                                  <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Expires</div>
                                  <div style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>11/26</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>CVV</div>
                                  <div style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>204</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Col 2 — Recent Activities */}
                    <div style={{ background: "#ffffff", border: "1px solid rgba(26,35,50,0.10)", borderRadius: 14, overflow: "hidden" }}>
                      <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(26,35,50,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#1A2332" }}>Recent Activities</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(26,35,50,0.04)", border: "1px solid rgba(26,35,50,0.10)", borderRadius: 8, padding: "5px 11px" }}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="rgba(26,35,50,0.35)" strokeWidth="1.3" strokeLinecap="round"><circle cx="5" cy="5" r="3.5"/><path d="M8.5 8.5l2 2"/></svg>
                            <span style={{ fontSize: 10, color: "rgba(26,35,50,0.3)" }}>Search</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(26,35,50,0.04)", border: "1px solid rgba(26,35,50,0.10)", borderRadius: 8, padding: "5px 11px", cursor: "default" }}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="rgba(26,35,50,0.45)" strokeWidth="1.3" strokeLinecap="round"><path d="M1 3h10M3 6h6M5 9h2"/></svg>
                            <span style={{ fontSize: 10, color: "rgba(26,35,50,0.45)" }}>Filter</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 1.8fr 0.8fr 0.9fr 1fr", padding: "8px 18px", borderBottom: "1px solid rgba(26,35,50,0.06)", gap: 8 }}>
                        {["","Order ID","Activity","Price","Status","Date"].map(h => (
                          <div key={h} style={{ fontSize: 9, color: "rgba(26,35,50,0.3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</div>
                        ))}
                      </div>
                      {[
                        { id: "INV_000076", activity: "Mobile App Purchase", icon: "🔵", price: "$25,500", status: "Completed", date: "17 Apr, 2026 03:45 PM", sc: "#22c55e" },
                        { id: "INV_000075", activity: "Hotel Booking", icon: "🟡", price: "$32,750", status: "Pending", date: "15 Apr, 2026 11:30 AM", sc: "#f59e0b" },
                        { id: "INV_000074", activity: "Flight Ticket Booking", icon: "🟠", price: "$40,200", status: "Completed", date: "15 Apr, 2026 12:00 PM", sc: "#22c55e" },
                        { id: "INV_000073", activity: "Grocery Purchase", icon: "🌟", price: "$50,200", status: "In Progress", date: "14 Apr, 2026 09:15 PM", sc: "#4a90d9" },
                        { id: "INV_000073", activity: "Software License", icon: "🔴", price: "$15,900", status: "Completed", date: "10 Apr, 2026 06:00 AM", sc: "#22c55e" },
                      ].map((r, i) => (
                        <motion.div
                          key={i}
                          initial={false}
                          animate={activeRow === i
                            ? { backgroundColor: "rgba(26,35,50,0.04)", x: 4 }
                            : { backgroundColor: "rgba(26,35,50,0)",     x: 0 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          style={{ display: "grid", gridTemplateColumns: "28px 1fr 1.8fr 0.8fr 0.9fr 1fr", padding: "10px 18px", borderBottom: "1px solid rgba(26,35,50,0.05)", alignItems: "center", gap: 8, cursor: "default" }}
                        >
                          <div style={{ width: 14, height: 14, border: "1.5px solid rgba(26,35,50,0.18)", borderRadius: 3 }} />
                          <span style={{ fontSize: 10.5, color: "rgba(26,35,50,0.5)", fontWeight: 500 }}>{r.id}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(26,35,50,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{r.icon}</div>
                            <span style={{ fontSize: 11, color: "#1A2332" }}>{r.activity}</span>
                          </div>
                          <span style={{ fontSize: 11, color: "#1A2332", fontWeight: 500 }}>{r.price}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: r.sc }} />
                            <span style={{ fontSize: 10, color: r.sc, fontWeight: 500 }}>{r.status}</span>
                          </div>
                          <span style={{ fontSize: 9.5, color: "rgba(26,35,50,0.35)" }}>{r.date}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
