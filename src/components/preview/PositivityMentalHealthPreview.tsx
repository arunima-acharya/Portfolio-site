"use client";

import {
  User, Users, Star, Clock,
  ShieldCheck,
  ExternalLink, Layers3, LayoutGrid, ClipboardList,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { HeroParallax } from "@/components/ui/hero-parallax";
import {
  ff,
  SnapshotCard,
  SectionEyebrow,
  ScreenshotPlaceholder,
  moduleThumbnail,
  TiltMockup,
  SectionHeading,
  ChallengeCard,
  Annotation,
  InsightCard,
  SmallInsightCard,
  ResearchMethodsBar,
  MockTable,
  MockSelection,
  MockAvatars,
  MockForm,
  MockTimeline,
  SandboxCluster,
  type SandboxStatCard,
  DesignPrinciplesScroll,
  type DesignPrinciple,
  SolutionStep,
  SolutionPill,
  DesignSystemGrid,
  ImpactCard,
  LessonCard,
  EmptyLessonCard,
} from "@/components/preview/caseStudyKit";

// ── Section 03 — The Challenge ───────────────────────────────
const CHALLENGES = [
  { title: "Double-Booking Risk", desc: "Scheduling conflicts were slipping through, damaging trust in the platform with every repeat occurrence." },
  { title: "No Shared Design Language", desc: "Inconsistent UI patterns across screens made the product feel disjointed and harder to trust." },
  { title: "Handoff Gaps", desc: "Missing specifications meant shipped features regularly diverged from the original design intent." },
  { title: "Slow Screen Delivery", desc: "Without a component library, every new screen was built from scratch, slowing the whole team down." },
  { title: "Scaling Without a System", desc: "45+ screens needed consistent coverage, but there was no foundation to build from." },
  { title: "Anxiety-Inducing Errors", desc: "In a mental health context, a scheduling error isn't just inconvenient — it undermines the therapeutic relationship." },
];

// ── Section 04 — Research Insights ───────────────────────────
const RESEARCH_METHODS: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> = [
  { label: "User & Therapist Interviews", value: "18+" },
  { label: "Conflict Root-Cause Sessions", value: "10+" },
  { label: "Handoff Process Audits", value: "3 Cycles", displayLabel: <>Handoff Process<br />Audits</> },
  { label: "Clinical Advisor Consultations", value: "6+", displayLabel: <>Clinical Advisor<br />Consultations</> },
  { label: "Competitor Platforms Reviewed", value: "5 Platforms", displayLabel: <>Competitor Platforms<br />Reviewed</> },
];

// ── Section 05 — Design Principles ───────────────────────────
const PRINCIPLES: DesignPrinciple[] = [
  { index: "01", title: "Calm as a Design Value", desc: "In mental health contexts, visual noise is harmful. Every design decision must ask: does this create or reduce anxiety?" },
  { index: "02", title: "System Before Screen", desc: "A component library built upfront pays compound interest — every new screen is faster, more consistent, and cheaper to hand off." },
  { index: "03", title: "Conflict-Detection is UX", desc: "Scheduling logic is not purely an engineering concern. The user experience of an error message is a design failure, not just a bug." },
  { index: "04", title: "Spec for the Developer", desc: "Design handoff quality directly determines how faithfully the product gets built. Invest in documentation as much as in the design itself." },
];
const PRINCIPLE_IMAGES = PRINCIPLES.map((p) => moduleThumbnail(p.title));

// ── Section 06 — The Solution ────────────────────────────────
const SOLUTION_STEPS: Array<{ number: string; title: string; desc: string; reverse: boolean; imageLabel: string }> = [
  { number: "01", title: "Conflict-Detection Scheduling", desc: "Scheduling logic that surfaces and resolves conflicts before they can be confirmed, eliminating double-bookings entirely.", reverse: false, imageLabel: "Scheduling screenshot" },
  { number: "02", title: "A 25-Component Design System", desc: "Every screen now draws from a shared library of patterns, giving the whole product a calmer, more consistent feel.", reverse: true, imageLabel: "Design system screenshot" },
  { number: "03", title: "Developer-Ready Specifications", desc: "Comprehensive handoff documentation — states, interactions, and edge cases — cut iteration cycles from seven to three.", reverse: false, imageLabel: "Handoff documentation screenshot" },
];

const SOLUTION_PILLS = [
  { icon: <Layers3 size={14} />, label: "Design System" },
  { icon: <ShieldCheck size={14} />, label: "Conflict Detection" },
  { icon: <LayoutGrid size={14} />, label: "Full Coverage" },
  { icon: <ClipboardList size={14} />, label: "Dev Handoff" },
];

// ── Section 07 — Ecosystem showcase (HeroParallax) ───────────
const POSITIVITY_MODULES = [
  "Session Calendar", "Therapist Matching", "Conflict Alerts", "Client Intake", "Progress Notes", "Booking Card",
  "Therapist Profile", "Messaging", "Billing & Invoices", "Appointment Reminders", "Client Dashboard", "Session Notes",
  "Availability Settings", "Reschedule Flow", "Cancellation Policy", "Insurance Verification", "Care Plan Overview", "Session History",
  "Waitlist Management", "Group Sessions", "Video Session Room", "Feedback & Ratings", "Referral Tracking", "Admin Console",
].map((title) => ({
  title,
  link: "#",
  thumbnail: moduleThumbnail(title),
}));

// ── Section 09 — Impact ──────────────────────────────────────
const IMPACT_STATS = [
  { number: "01", value: "Zero", desc: "Scheduling errors — eliminated by conflict-detection logic" },
  { number: "02", value: "25", desc: "Components in the new design system" },
  { number: "03", value: "7 → 3", desc: "Developer handoff cycles reduced per feature" },
  { number: "04", value: "45+", desc: "Screens covered with developer-ready specs" },
];

// ── Section 10 — Lessons Learned ─────────────────────────────
const LESSONS = [
  { number: "01", title: "Sensitive products need a different lens.", desc: "Every decision has to ask: does this create or reduce anxiety?", iconSrc: "/assets/icons/reservation/1.svg" },
  { number: "02", title: "A design system is a first deliverable, not an afterthought.", desc: "Built early, it paid back multiple hours on every screen that followed.", iconSrc: "/assets/icons/reservation/2.svg" },
  { number: "03", title: "Design is incomplete until it's built correctly.", desc: "Specification quality is the last mile of the design process, not overhead.", iconSrc: "/assets/icons/reservation/3.svg" },
  { number: "04", title: "Scheduling errors are a trust problem.", desc: "A double-booking damages the therapeutic relationship, not just the calendar.", iconSrc: "/assets/icons/reservation/4.svg" },
  { number: "05", title: "Consistency is therapeutic, not just aesthetic.", desc: "Visual noise and unpredictability create measurable anxiety for users.", iconSrc: "/assets/icons/reservation/5.svg" },
  { number: "06", title: "Conflict-detection is a design responsibility.", desc: "How an error is surfaced and resolved matters as much as preventing it in engineering.", iconSrc: "/assets/icons/reservation/6.svg" },
];

// 3x3 grid — slots 1, 6, and 7 (1-indexed) are deliberately left empty.
const LESSON_GRID: (typeof LESSONS[number] | null)[] = [
  null, LESSONS[0], LESSONS[1],
  LESSONS[2], LESSONS[3], null,
  null, LESSONS[4], LESSONS[5],
];

// ── Section 02 — At a Glance ─────────────────────────────────
const SANDBOX_LEFT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "Zero", statLabel: <>Scheduling<br />Conflicts</> },
  { value: "25", statLabel: <>Design System<br />Components</> },
];
const SANDBOX_RIGHT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "45+", statLabel: <>Screens<br />Covered</> },
  { value: "3", delta: "↓ from 7", statLabel: <>Handoff Cycle<br />Days</> },
];

export default function PositivityMentalHealthPreview() {
  return (
    <>
      {/* Section 01 — Overview */}
      <section style={{
        background: "#f3f3f3",
        padding: "120px 8% 90px",
      }}>
        <h1 style={{
          fontSize: "clamp(34px, 3.5vw, 56px)", fontWeight: 400, color: "#111",
          fontFamily: ff, textAlign: "center", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 22,
        }}>
          Positivity — Mental Health Platform
        </h1>

        <p style={{
          fontSize: 16, color: "#6b7280", fontFamily: ff, textAlign: "center", lineHeight: 1.7,
          margin: "0 auto 32px",
        }}>
          Positivity needed more than new screens — it needed a design system, conflict-free scheduling, and a
          developer handoff process that could keep pace with the product. As a design consultant, I worked across
          all three, building a 25-component design system and redesigning scheduling logic across 45+ screens,
          guided by one question at every step: does this create or reduce anxiety?
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: ff, fontSize: 14, fontWeight: 400, color: "#fff", background: "#111",
              border: "none", borderRadius: 12, padding: "13px 28px", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            }}
          >
            View Figma File
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Dashboard mockup */}
        <div style={{ position: "relative", maxWidth: 980, margin: "0 auto" }}>
          <div style={{
            background: "#242424", borderRadius: 20,
            boxShadow: "0 24px 64px rgba(0,0,0,0.10)", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: "0 10px 10px" }}>
              <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden" }}>
                <ScreenshotPlaceholder label="Dashboard screenshot" height={653} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Snapshot — sits right after the hero, no numbered eyebrow */}
      <section style={{ background: "#f3f3f3", padding: "60px 8% 90px" }}>
        <p style={{
          fontSize: 12, fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#999", fontFamily: ff, textAlign: "center", marginBottom: 14,
        }}>
          Project Snapshot
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#111",
          fontFamily: ff, textAlign: "center", letterSpacing: "-0.02em", marginBottom: 14,
        }}>
          Built as a design consultant at Positivity.
        </h2>
        <p style={{ fontSize: 15.5, color: "#777", fontFamily: ff, textAlign: "center", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          A look at the scope, team, and contributions that shaped a design system, scheduling logic, and handoff
          process for a mental health platform.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1040, margin: "0 auto" }}>
          <SnapshotCard icon={<User size={16} />} label="Role" value="Product Design Consultant" />
          <SnapshotCard icon={<Clock size={16} />} label="Timeline" value="Jul 2022 – Present" />
          <SnapshotCard icon={<Users size={16} />} label="Team" value="Solo Designer · Engineering · Clinical Advisors" />
          <SnapshotCard
            icon={<Star size={16} />}
            label="Contribution"
            value="Design System Architecture · Component Design · Scheduling UX · Developer Handoff · UI Design · Clinical UX Consultation"
          />
        </div>
      </section>

      {/* Section 02 — At a Glance */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="02" label="At a Glance" />

        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#111",
          fontFamily: ff, textAlign: "center", letterSpacing: "-0.02em", marginBottom: 14,
        }}>
          Built for calm, conflict-free scheduling.
        </h2>

        <p style={{ fontSize: 15.5, color: "#777", fontFamily: ff, textAlign: "center", maxWidth: 480, margin: "0 auto 56px" }}>
          A single design system and conflict-detection logic now support every session booked, every handoff, and
          every screen shipped.
        </p>

        <SandboxCluster leftCards={SANDBOX_LEFT_CARDS} rightCards={SANDBOX_RIGHT_CARDS} />
      </section>

      {/* Section 03 — The Challenge */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="03" label="The Challenge" />
        <SectionHeading
          title="Positivity had grown faster than its foundations."
          subtitle="No design system, scheduling conflicts causing double-bookings, and a slow developer handoff process were all blocking the product at once — in a product where every misstep carries more weight than usual."
          maxWidth={620}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1040, margin: "0 auto" }}>
          {CHALLENGES.map((c) => (
            <ChallengeCard key={c.title} title={c.title} desc={c.desc} />
          ))}
        </div>
      </section>

      {/* Section 04 — Research Insights */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage: "radial-gradient(circle at 8% 92%, black 0%, transparent 40%)",
          maskImage: "radial-gradient(circle at 8% 92%, black 0%, transparent 40%)",
        }} />

        <div style={{ position: "relative" }}>
          <SectionEyebrow number="04" label="Research Insights" />
          <SectionHeading
            title="Understanding what calm actually requires."
            subtitle="Research combined interviews with platform users and therapists, a root-cause analysis of scheduling conflicts, a handoff process audit, and consultation with clinical advisors."
            maxWidth={620}
            bold
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 220, maxWidth: 1160, margin: "40px auto 170px" }}>
            <InsightCard
              badge="Key Insight"
              title="Scheduling errors destroy trust completely"
              desc="A double-booking in a mental health context doesn't just inconvenience — it damages the therapeutic relationship and the platform's credibility."
            >
              <MockTable rows={4} />
              <Annotation label="Conflicts surfaced too late" pos="right" style={{ top: -30, left: "100%", marginLeft: 12 }} />
            </InsightCard>

            <InsightCard
              title="Calm is a design output, not a style choice"
              desc="Inconsistent UI, unexpected animations, or cluttered screens create measurable anxiety. Visual consistency is therapeutic, not just aesthetic."
            >
              <MockSelection />
              <Annotation label="Visual noise adds up" pos="top" style={{ top: -117, left: -110 }} />
            </InsightCard>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1160, margin: "-100px auto 76px" }}>
            <SmallInsightCard title="Handoff quality determines build quality" desc="The gap between design intent and shipped product tracked directly with how complete the specs were.">
              <MockAvatars />
              <Annotation label="Roles need different specs" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="A design system pays forward" desc="Every hour invested in the component library returned multiple hours on subsequent screens.">
              <MockForm />
              <Annotation label="Reused components, fewer errors" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Conflict-detection is a UX problem" desc="The way scheduling conflicts were surfaced and resolved was as much a design responsibility as an engineering one.">
              <MockTimeline />
              <Annotation label="Timelines need to resolve conflicts" pos="top" style={{ top: -170, right: -4 }} />
            </SmallInsightCard>
          </div>

          <ResearchMethodsBar methods={RESEARCH_METHODS} />
        </div>
      </section>

      {/* Section 05 — Design Principles */}
      <section style={{ background: "#f3f3f3", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="05" label="Design Principles" />
        <SectionHeading
          title="Principles that guided every design decision."
          subtitle="Four principles shaped every screen, every scheduling flow, and every line of specification — keeping the experience calm even as the product grew more complex."
          maxWidth={620}
        />

        <DesignPrinciplesScroll principles={PRINCIPLES} images={PRINCIPLE_IMAGES} />
      </section>

      {/* Section 06 — The Solution */}
      <section style={{ background: "#f3f3f3", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="06" label="The Solution" />
        <SectionHeading
          title="Building a calmer product from the ground up."
          subtitle="Rather than patching individual screens, the focus was on a system that made every future screen faster, safer, and more consistent to ship."
          maxWidth={560}
        />

        <ScrollStack
          useWindowScroll
          itemDistance={80}
          itemStackDistance={20}
          stackPosition="18%"
          scaleEndPosition="8%"
          baseScale={0.9}
          itemScale={0.025}
          blurAmount={4}
          tiltBase={0}
          tiltStep={0}
          backgroundOpacity={0.8}
          innerPaddingTop="2rem"
          innerPaddingX={0}
          innerPaddingBottom="14rem"
          innerMinHeight={false}
          className="max-w-[1040px] mx-auto"
        >
          {SOLUTION_STEPS.map((s) => (
            <ScrollStackItem
              key={s.number}
              itemClassName="rounded-[24px] shadow-none bg-transparent p-0"
              style={{ height: "auto", padding: 0, borderRadius: 24, boxShadow: "none", background: "transparent" }}
            >
              <SolutionStep number={s.number} title={s.title} desc={s.desc} reverse={s.reverse}>
                <ScreenshotPlaceholder label={s.imageLabel} height={400} fit="cover" />
              </SolutionStep>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16, marginTop: 48 }}>
          {SOLUTION_PILLS.map((p) => <SolutionPill key={p.label} icon={p.icon} label={p.label} />)}
        </div>
      </section>

      {/* Section 07 — Ecosystem showcase (HeroParallax) */}
      <section style={{ background: "#1C46F2" }}>
        <HeroParallax
          products={POSITIVITY_MODULES}
          containerHeight="280vh"
          headerTitle="Scheduling doesn't happen in isolation"
          headerSubtitle="Before redesigning the experience, I mapped how sessions, therapists, and clients moved through the platform — so conflict-detection logic could be built where it mattered most."
          headerFontFamily={ff}
          compactHeader
          contentScale={1.15}
          headerGapBelow={560}
          headerOverlay
          headerOffsetXPercent={-10}
          headerOffsetYPercent={220}
          headerAlign="right"
          headerEyebrowNumber="07"
          headerEyebrowLabel="Understanding the Ecosystem"
          headerEyebrowLabelColor="rgba(255,255,255,0.55)"
          headerTitleColor="#ffffff"
          headerSubtitleColor="rgba(255,255,255,0.75)"
          headerMaxWidth={768}
          rowCount={4}
          verticalOffsetPercent={-35}
        />
      </section>

      {/* Section 08 — Design System */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="08" label="Design System" />
        <SectionHeading
          title="Building better interfaces with design systems."
          subtitle="A scalable design language built for a sensitive product — color, typography, spacing, and 25 components designed for consistency, not just efficiency."
          maxWidth={620}
        />

        <TiltMockup style={{
          position: "relative", maxWidth: 1040, margin: "0 auto 20px", background: "#fff", borderRadius: 20,
          border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.08)", overflow: "hidden",
        }}>
          <ScreenshotPlaceholder label="Design system applied — component library mockup" height={666} fit="width" />
        </TiltMockup>

        <DesignSystemGrid />
      </section>

      {/* Section 09 — Impact */}
      <section style={{ background: "#f3f3f3", padding: "60px 8%" }}>
        <div style={{ background: "#1C46F2", borderRadius: 28, padding: "56px 48px 48px", maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.08em", color: "#fff", fontFamily: ff, marginBottom: 24 }}>
            09 — IMPACT
          </div>
          <h2 style={{
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, color: "#fff", fontFamily: ff,
            lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 16, maxWidth: 560,
          }}>
            Designed for calmer, more reliable operations.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", fontFamily: ff, lineHeight: 1.6, maxWidth: 480, margin: "0 0 40px" }}>
            The redesign eliminated scheduling errors entirely, while giving the product team a system built to
            scale carefully rather than quickly.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {IMPACT_STATS.map((s) => (
              <ImpactCard key={s.number} number={s.number} value={s.value} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 — Lessons Learned */}
      <section style={{ background: "#f3f3f3", padding: "70px 8% 100px" }}>
        <div style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.08em", color: "#1C46F2", fontFamily: ff, marginBottom: 32, maxWidth: 1120, margin: "0 auto 32px" }}>
          10 — LESSONS LEARNED
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1120, margin: "0 auto" }}>
          {LESSON_GRID.map((l, i) => (
            l
              ? <LessonCard key={l.number} number={l.number} title={l.title} desc={l.desc} iconSrc={l.iconSrc} />
              : <EmptyLessonCard key={`empty-${i}`} />
          ))}
        </div>
      </section>
    </>
  );
}
