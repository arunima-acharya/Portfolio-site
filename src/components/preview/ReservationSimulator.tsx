"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import {
  IdCard, CalendarPlus, Search, UserRound, KeyRound, CreditCard, LogIn, LogOut,
  Lock, Check, RotateCcw, Sparkles,
} from "lucide-react";

const ff = "var(--font-manrope), sans-serif";
const BLUE = "#1C46F2";
const BROWN = "#7a4a2e";

type Decision = { prompt: string; detail: string; action: string };

type SimStep = {
  title: string;
  icon: React.ReactNode;
  task?: string;
  decision?: Decision;
};

const SIM_STEPS: SimStep[] = [
  { title: "Front Desk", icon: <IdCard size={20} strokeWidth={1.6} /> },
  { title: "Create Booking", icon: <CalendarPlus size={20} strokeWidth={1.6} />, task: "Create Booking" },
  { title: "Reservation Search", icon: <Search size={20} strokeWidth={1.6} /> },
  { title: "Guest Details", icon: <UserRound size={20} strokeWidth={1.6} />, task: "Verify Guest" },
  {
    title: "Room Assignment", icon: <KeyRound size={20} strokeWidth={1.6} />, task: "Assign Room",
    decision: { prompt: "Room unavailable.", detail: "The requested room type is fully booked tonight.", action: "Assign a Different Room" },
  },
  {
    title: "Payments", icon: <CreditCard size={20} strokeWidth={1.6} />, task: "Process Payment",
    decision: { prompt: "Guest payment declined.", detail: "The card on file didn't go through on the first attempt.", action: "Retry Payment" },
  },
  {
    title: "Check-in", icon: <LogIn size={20} strokeWidth={1.6} />, task: "Check-in Guest",
    decision: { prompt: "VIP guest arriving.", detail: "This guest qualifies for a complimentary upgrade.", action: "Approve Upgrade" },
  },
  { title: "Check-out", icon: <LogOut size={20} strokeWidth={1.6} />, task: "Complete Stay" },
];

const TASKS = SIM_STEPS.map((s) => s.task).filter((t): t is string => Boolean(t));

// Same wave-meander placement language as the Lifecycle Overview section
// above, so the two isometric diagrams read as one visual system.
const SIM_POSITIONS: Array<{ xFrac: number; level: number }> = [
  { xFrac: 0.06, level: 0 },
  { xFrac: 0.15, level: 170 },
  { xFrac: 0.29, level: 15 },
  { xFrac: 0.43, level: 60 },
  { xFrac: 0.43, level: 210 },
  { xFrac: 0.58, level: 210 },
  { xFrac: 0.72, level: 60 },
  { xFrac: 0.86, level: 230 },
];

const CUBE_W = 96;
const CUBE_H = 72;
const CARD_W = 112;
const NUMBER_H = 19;

type Status = "locked" | "active" | "completed";

function SimCube({
  step, number, status, onActivate,
}: {
  step: SimStep; number: string; status: Status; onActivate: () => void;
}) {
  const interactive = status === "active";
  const stroke = status === "completed" ? BLUE : status === "active" ? BLUE : "#e7e7ea";

  return (
    <motion.div
      role="button"
      tabIndex={interactive ? 0 : -1}
      aria-disabled={!interactive}
      aria-label={`${step.title}${status === "completed" ? ", completed" : status === "locked" ? ", locked" : ", current step"}`}
      onClick={interactive ? onActivate : undefined}
      onKeyDown={(e) => {
        if (!interactive) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      style={{
        width: CARD_W, display: "flex", flexDirection: "column", alignItems: "center",
        cursor: interactive ? "pointer" : status === "locked" ? "not-allowed" : "default",
        outline: "none",
      }}
      whileHover={interactive ? { y: -6 } : undefined}
      whileTap={interactive ? { y: -1, scale: 0.96 } : undefined}
      animate={{ opacity: status === "locked" ? 0.4 : 1 }}
      transition={{ duration: 0.35 }}
    >
      <span style={{
        fontSize: 11, fontWeight: 700, fontFamily: ff, letterSpacing: "0.04em", marginBottom: 8,
        color: status === "completed" || status === "active" ? BLUE : "var(--rsim-muted)",
      }}>
        {number}
      </span>

      <motion.div
        style={{ position: "relative", width: CUBE_W, height: CUBE_H }}
        animate={{
          filter: status === "completed"
            ? "drop-shadow(0 12px 22px rgba(28,70,242,0.22))"
            : status === "active"
              ? "drop-shadow(0 10px 20px rgba(28,70,242,0.16))"
              : "drop-shadow(0 6px 12px rgba(17,17,17,0.05))",
        }}
      >
        {status === "active" && (
          <motion.div
            aria-hidden
            style={{
              position: "absolute", inset: -8, borderRadius: 20,
              border: `1.5px solid ${BLUE}`, opacity: 0.35,
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <svg width={CUBE_W} height={CUBE_H} viewBox="0 0 96 72" style={{ display: "block", overflow: "visible" }}>
          <polygon points="8,18 48,36 48,68 8,50" fill="var(--rsim-cube-left)" stroke={stroke} strokeWidth={1.2} strokeLinejoin="round" />
          <polygon points="88,18 48,36 48,68 88,50" fill={status === "completed" ? "#dde3fd" : "var(--rsim-cube-right)"} stroke={stroke} strokeWidth={1.2} strokeLinejoin="round" />
          <polygon points="48,2 88,18 48,36 8,18" fill="var(--rsim-cube-top)" stroke={stroke} strokeWidth={1.3} strokeLinejoin="round" />
        </svg>

        <motion.div
          style={{
            position: "absolute", top: 0, left: 0, width: CUBE_W, height: 34,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: status === "locked" ? "var(--rsim-muted)" : status === "completed" || status === "active" ? BLUE : BROWN,
          }}
          animate={interactive ? { scale: 1 } : {}}
          whileHover={interactive ? { scale: 1.12 } : undefined}
        >
          {status === "locked" ? <Lock size={16} strokeWidth={1.6} /> : step.icon}
        </motion.div>

        <AnimatePresence>
          {status === "completed" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                position: "absolute", top: -6, right: -2, width: 18, height: 18, borderRadius: "50%",
                background: BLUE, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(28,70,242,0.4)",
              }}
            >
              <Check size={11} color="#fff" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <span style={{
        fontSize: 12.5, fontWeight: 600, color: status === "locked" ? "var(--rsim-muted)" : "var(--rsim-text)",
        fontFamily: ff, marginTop: 10, textAlign: "center", lineHeight: 1.3,
      }}>
        {step.title}
      </span>
      {status === "completed" && (
        <span style={{ fontSize: 10.5, color: BLUE, fontFamily: ff, fontWeight: 600, marginTop: 2 }}>
          Completed
        </span>
      )}
    </motion.div>
  );
}

function HudCard({ children, align }: { children: React.ReactNode; align: "left" | "right" }) {
  return (
    <div style={{
      position: "absolute", top: 0, [align]: 0,
      background: "var(--rsim-hud-bg)", border: "1px solid var(--rsim-border)", borderRadius: 14,
      padding: "14px 18px", boxShadow: "0 6px 20px rgba(17,17,17,0.05)", zIndex: 2,
      minWidth: 168,
    } as React.CSSProperties}>
      {children}
    </div>
  );
}

export default function ReservationSimulator() {
  const n = SIM_STEPS.length;
  const [completed, setCompleted] = useState<boolean[]>(() => Array(n).fill(false));
  const [activeIndex, setActiveIndex] = useState(0);
  const [decisionFor, setDecisionFor] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1160);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // "Camera slowly pans" toward whichever cube is currently active.
  useEffect(() => {
    if (!diagramRef.current) return;
    const pos = SIM_POSITIONS[activeIndex];
    const targetShift = (0.5 - pos.xFrac) * 40; // small nudge, not a full pan
    gsap.to(diagramRef.current, { x: targetShift, duration: 1.1, ease: "power2.out" });
  }, [activeIndex]);

  const completedCount = completed.filter(Boolean).length;
  const progressPct = Math.min(100, Math.ceil(completedCount / 2) * 25);
  const guestStatus = finished ? "Confirmed" : completedCount === 0 ? "Pending" : "In Progress";

  const maxLevel = Math.max(...SIM_POSITIONS.map((p) => p.level));
  const diagramHeight = maxLevel + NUMBER_H + 8 + CUBE_H + 70;
  const cubeCenterX = (i: number) => SIM_POSITIONS[i].xFrac * containerWidth;
  const left = (i: number) => cubeCenterX(i) - CARD_W / 2;
  const top = (i: number) => SIM_POSITIONS[i].level;
  const cubeTop = (i: number) => top(i) + NUMBER_H + 8;
  const cubeBottom = (i: number) => cubeTop(i) + CUBE_H;

  function advance(i: number) {
    const step = SIM_STEPS[i];
    if (step.decision) {
      setDecisionFor(i);
      return;
    }
    completeStep(i);
  }

  function completeStep(i: number) {
    setCompleted((c) => {
      const next = [...c];
      next[i] = true;
      return next;
    });
    if (i === n - 1) {
      window.setTimeout(() => setFinished(true), 700);
    } else {
      setActiveIndex(i + 1);
    }
  }

  function resolveDecision() {
    if (decisionFor === null) return;
    const i = decisionFor;
    setDecisionFor(null);
    completeStep(i);
  }

  function restart() {
    setCompleted(Array(n).fill(false));
    setActiveIndex(0);
    setDecisionFor(null);
    setFinished(false);
  }

  const statusOf = (i: number): Status => {
    if (completed[i]) return "completed";
    if (i === activeIndex) return "active";
    return "locked";
  };

  const decisionStep = decisionFor !== null ? SIM_STEPS[decisionFor] : null;

  return (
    <div
      className="rsim-root"
      style={{
        background: "var(--rsim-bg)", borderRadius: 28, padding: "56px 8% 64px",
        position: "relative", overflow: "hidden",
      }}
    >
      <style>{`
        .rsim-root {
          --rsim-bg: #ffffff;
          --rsim-text: #111111;
          --rsim-muted: #6b7280;
          --rsim-border: rgba(17,17,17,0.08);
          --rsim-hud-bg: #ffffff;
          --rsim-cube-top: #ffffff;
          --rsim-cube-left: #fbfbfc;
          --rsim-cube-right: #f6f7fb;
          --rsim-task-bg: #fafafa;
        }
        @media (prefers-color-scheme: dark) {
          .rsim-root {
            --rsim-bg: #0b0b0f;
            --rsim-text: #f5f5f7;
            --rsim-muted: #9aa1ac;
            --rsim-border: rgba(255,255,255,0.08);
            --rsim-hud-bg: #16161c;
            --rsim-cube-top: #1c1c24;
            --rsim-cube-left: #17171d;
            --rsim-cube-right: #1a1a22;
            --rsim-task-bg: #16161c;
          }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{
          fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
          color: BLUE, fontFamily: ff, marginBottom: 12,
        }}>
          Interactive Walkthrough
        </p>
        <h3 style={{
          fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 700, color: "var(--rsim-text)", fontFamily: ff,
          letterSpacing: "-0.02em", marginBottom: 12,
        }}>
          Complete today&rsquo;s guest reservation.
        </h3>
        <p style={{ fontSize: 14.5, color: "var(--rsim-muted)", fontFamily: ff, maxWidth: 480, margin: "0 auto" }}>
          Step into the front-desk workflow I designed — click each active stage to move the reservation forward.
        </p>
      </div>

      <div ref={containerRef} style={{ position: "relative", maxWidth: 1160, margin: "0 auto" }}>
        <HudCard align="left">
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--rsim-muted)", fontFamily: ff, marginBottom: 6 }}>
            Today&rsquo;s Guest
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--rsim-text)", fontFamily: ff }}>John Carter</div>
          <div style={{ fontSize: 12, color: "var(--rsim-muted)", fontFamily: ff, marginTop: 2 }}>3 Nights · Deluxe Room</div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8, padding: "3px 9px", borderRadius: 999,
            background: finished ? "rgba(28,70,242,0.1)" : "rgba(107,114,128,0.1)",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: finished ? BLUE : "var(--rsim-muted)" }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: finished ? BLUE : "var(--rsim-muted)", fontFamily: ff }}>{guestStatus}</span>
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--rsim-border)" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--rsim-muted)", fontFamily: ff, marginBottom: 8 }}>
              Today&rsquo;s Tasks
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {TASKS.map((task) => {
                const stepIdx = SIM_STEPS.findIndex((s) => s.task === task);
                const done = completed[stepIdx];
                return (
                  <div key={task} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: 4, flexShrink: 0,
                      border: `1.4px solid ${done ? BLUE : "var(--rsim-border)"}`, background: done ? BLUE : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {done && <Check size={9} color="#fff" strokeWidth={3} />}
                    </span>
                    <span style={{
                      fontSize: 12, fontFamily: ff, color: done ? "var(--rsim-text)" : "var(--rsim-muted)",
                      textDecoration: done ? "line-through" : "none",
                    }}>
                      {task}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </HudCard>

        <HudCard align="right">
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--rsim-muted)", fontFamily: ff, marginBottom: 8 }}>
            Reservation Progress
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: BLUE, fontFamily: ff, marginBottom: 8 }}>{progressPct}%</div>
          <div style={{ width: "100%", height: 5, borderRadius: 999, background: "var(--rsim-border)", overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: BLUE, borderRadius: 999 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </HudCard>

        <div style={{ height: 96 }} aria-hidden />

        <motion.div
          animate={{ scale: finished ? 0.94 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ position: "relative" }}
        >
          <div ref={diagramRef} style={{ position: "relative", width: "100%", height: diagramHeight }}>
            <svg width={containerWidth} height={diagramHeight} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", overflow: "visible" }}>
              <defs>
                <marker id="simArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 Z" fill={BLUE} />
                </marker>
              </defs>
              {SIM_STEPS.slice(0, -1).map((_, i) => {
                const x1 = cubeCenterX(i);
                const y1 = cubeBottom(i);
                const x2 = cubeCenterX(i + 1);
                const y2 = cubeTop(i + 1);
                return (
                  <motion.path
                    key={i}
                    d={`M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`}
                    fill="none"
                    stroke={BLUE}
                    strokeOpacity={completed[i] ? 0.7 : 0.2}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    markerEnd={completed[i] ? "url(#simArrow)" : undefined}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: completed[i] ? 1 : 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                );
              })}
            </svg>

            {SIM_STEPS.map((s, i) => (
              <div key={s.title} style={{ position: "absolute", left: left(i), top: top(i) }}>
                <SimCube step={s} number={String(i + 1).padStart(2, "0")} status={statusOf(i)} onActivate={() => advance(i)} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {decisionStep?.decision && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, background: "rgba(17,17,17,0.35)", backdropFilter: "blur(2px)",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20,
            }}
            role="dialog" aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{
                background: "#fff", borderRadius: 20, padding: "32px 32px 28px", maxWidth: 380, width: "100%",
                boxShadow: "0 32px 80px rgba(17,17,17,0.24)",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: "rgba(28,70,242,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
              }}>
                <Sparkles size={18} color={BLUE} strokeWidth={1.8} />
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: "#111", fontFamily: ff, marginBottom: 8 }}>
                {decisionStep.decision.prompt}
              </h4>
              <p style={{ fontSize: 14, color: "#6b7280", fontFamily: ff, lineHeight: 1.6, marginBottom: 24 }}>
                {decisionStep.decision.detail}
              </p>
              <button
                onClick={resolveDecision}
                style={{
                  width: "100%", padding: "12px 20px", borderRadius: 12, border: "none",
                  background: BLUE, color: "#fff", fontFamily: ff, fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}
              >
                {decisionStep.decision.action}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "absolute", inset: 0, background: "var(--rsim-bg)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "40px 24px", zIndex: 10, overflow: "hidden",
            }}
          >
            <motion.div
              aria-hidden
              initial={{ x: "-120%" }} animate={{ x: "120%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              style={{
                position: "absolute", top: 0, bottom: 0, width: "40%",
                background: "linear-gradient(90deg, transparent, rgba(28,70,242,0.08), transparent)",
              }}
            />

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              style={{
                width: 64, height: 64, borderRadius: "50%", background: BLUE,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
                boxShadow: "0 16px 40px rgba(28,70,242,0.3)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Check size={28} color="#fff" strokeWidth={2.4} />
              </motion.div>
            </motion.div>

            <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "var(--rsim-text)", fontFamily: ff, marginBottom: 8, textAlign: "center" }}>
              Reservation Complete
            </h3>
            <p style={{ fontSize: 14.5, color: "var(--rsim-muted)", fontFamily: ff, marginBottom: 36, textAlign: "center" }}>
              Guest journey successfully completed.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, marginBottom: 36 }}>
              {[
                { value: "35%", label: "Reduction in lookup time" },
                { value: "30%", label: "Fewer workflow steps" },
                { value: "1,000+", label: "Hotels" },
                { value: "50+", label: "Countries" },
              ].map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  style={{ textAlign: "center" }}
                >
                  <div style={{ fontSize: 22, fontWeight: 700, color: BLUE, fontFamily: ff }}>{kpi.value}</div>
                  <div style={{ fontSize: 11.5, color: "var(--rsim-muted)", fontFamily: ff, marginTop: 2, maxWidth: 110 }}>{kpi.label}</div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={restart}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 999,
                border: "1px solid var(--rsim-border)", background: "transparent", color: "var(--rsim-text)",
                fontFamily: ff, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
              }}
            >
              <RotateCcw size={14} /> Restart Simulation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
