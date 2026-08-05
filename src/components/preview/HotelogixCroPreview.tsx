"use client";

import {
  User, Users, Star, Clock,
  ExternalLink, Boxes, Sparkles, Coins, ShieldCheck,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { HeroParallax } from "@/components/ui/hero-parallax";
import {
  ff, SnapshotCard, SectionEyebrow, ScreenshotPlaceholder, moduleThumbnail, TiltMockup,
  SectionHeading, ChallengeCard, Annotation, InsightCard, SmallInsightCard,
  ResearchMethodsBar, MockTable, MockSelection, MockAvatars, MockForm, MockTimeline,
  SandboxCluster, type SandboxStatCard, SolutionStep, SolutionPill, DesignSystemGrid,
  ImpactCard, LessonCard, EmptyLessonCard, type DesignPrinciple, DesignPrinciplesScroll,
} from "@/components/preview/caseStudyKit";

// ── Section 02 — At a Glance ─────────────────────────────────
const SANDBOX_LEFT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "3 → 1", statLabel: <>Tools<br />Consolidated</> },
  { value: "20%", delta: "↑", statLabel: <>Booking<br />Efficiency</> },
];
const SANDBOX_RIGHT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "60%", delta: "↓", statLabel: <>Group Booking<br />Time</> },
  { value: "200+", statLabel: <>Hotel Accounts<br />Visualised</> },
];

// ── Section 03 — The Challenge ───────────────────────────────
const CHALLENGES = [
  { title: "Tool Fragmentation", desc: "Bookings, pricing, and group configuration lived in three disconnected systems that never talked to each other." },
  { title: "Constant Context-Switching", desc: "Every time-sensitive booking decision meant jumping between screens, compounding across hundreds of daily interactions." },
  { title: "Manual Group Configuration", desc: "Complex group room permutations took hours to configure by hand, with no automated assistance." },
  { title: "Scattered Pricing Data", desc: "Pricing insights were spread across disconnected dashboards, making cross-account analysis nearly impossible." },
  { title: "Opaque AI Suggestions", desc: "Early permutation suggestions offered no reasoning, so managers overrode the recommendation every time." },
  { title: "Inconsistent Pricing at Scale", desc: "Without a single source of truth, pricing decisions grew inconsistent across 200+ hotel accounts." },
];

// ── Section 04 — Research Insights ───────────────────────────
const RESEARCH_METHODS: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> = [
  { label: "Revenue Manager Interviews", value: "18+" },
  { label: "Workflow Sessions Mapped", value: "40+" },
  { label: "Tool Audits", value: "3 Systems", displayLabel: <>Tool<br />Audits</> },
  { label: "Usage Data Analysis", value: "4 Months" },
  { label: "Revenue Platforms Benchmarked", value: "6+ Products" },
];

// ── Section 05 — Design Principles ───────────────────────────
const PRINCIPLES: DesignPrinciple[] = [
  { index: "01", title: "Consolidation as UX", desc: "Reducing the number of tools a user must context-switch between is itself a design outcome — not just an engineering one." },
  { index: "02", title: "Trust Through Transparency", desc: "AI-assisted features must show their work. Revenue managers need to understand why a permutation was suggested to act on it." },
  { index: "03", title: "Data for Decision-Makers", desc: "Visualise data at the level of the decision — not the level of the database. Revenue managers think in accounts, not rows." },
  { index: "04", title: "Zero Disruption", desc: "When users cannot afford downtime, the migration experience is as important as the destination design." },
];
const PRINCIPLE_IMAGES = PRINCIPLES.map((p) => moduleThumbnail(p.title));

// ── Section 06 — The Solution ────────────────────────────────
const SOLUTION_STEPS: Array<{ number: string; title: string; desc: string; reverse: boolean; imageLabel: string; imageHeight: number }> = [
  { number: "01", title: "Unified Booking Dashboard", desc: "Booking, pricing, and group management now live in a single connected workspace.", reverse: false, imageLabel: "Unified dashboard screenshot", imageHeight: 400 },
  { number: "02", title: "AI-Assisted Permutations", desc: "Group room permutations are suggested with visible reasoning, cutting configuration time by 60%.", reverse: true, imageLabel: "AI permutation engine screenshot", imageHeight: 400 },
  { number: "03", title: "Cross-Account Pricing View", desc: "Pricing data is visualised at the account level, matching how revenue managers actually think.", reverse: false, imageLabel: "Cross-account pricing screenshot", imageHeight: 400 },
];

const SOLUTION_PILLS = [
  { icon: <Boxes size={14} />, label: "Unified Dashboard" },
  { icon: <Sparkles size={14} />, label: "AI Permutations" },
  { icon: <Coins size={14} />, label: "Pricing Insights" },
  { icon: <ShieldCheck size={14} />, label: "Zero-Downtime Migration" },
];

// ── Section 07 — Ecosystem showcase (HeroParallax) ───────────
const CRO_MODULES = [
  "Booking Dashboard", "Rate Calendar", "Group Permutations", "Account Switcher", "Pricing Insights", "Availability Grid",
  "Revenue Forecast", "Channel Rate Parity", "Group Booking Builder", "Permutation Reasoning Panel", "Account Health Score", "Multi-Property Overview",
  "Rate Rules Engine", "Booking Timeline", "Guest Segment Analysis", "Competitor Rate Watch", "Migration Tracker", "Audit Log",
  "Notification Center", "User Permissions", "Currency & Tax Settings", "API Integrations", "Occupancy Heatmap", "Revenue Alerts",
].map((title) => ({
  title,
  link: "#",
  thumbnail: moduleThumbnail(title),
}));

// ── Section 09 — Impact ──────────────────────────────────────
const IMPACT_STATS = [
  { number: "01", value: "+20%", desc: "Booking efficiency, by consolidating 3 tools into 1" },
  { number: "02", value: "−60%", desc: "Group booking configuration time, with AI-assisted permutations" },
  { number: "03", value: "200+", desc: "Hotel accounts with unified pricing insights visualised" },
  { number: "04", value: "3 → 1", desc: "Revenue tools consolidated into a single connected platform" },
];

// ── Section 10 — Lessons Learned ─────────────────────────────
const LESSONS = [
  { number: "01", title: "Consolidation is a design problem, not just an engineering one.", desc: "Merging three tools means inheriting three sets of user expectations and edge cases.", iconSrc: "/assets/icons/reservation/1.svg" },
  { number: "02", title: "AI features live or die by trust.", desc: "A permutation engine only becomes useful once managers understand why a suggestion was made.", iconSrc: "/assets/icons/reservation/2.svg" },
  { number: "03", title: "Visualise the decision, not the database.", desc: "The gap between how data is stored and how people think is where frustration lives.", iconSrc: "/assets/icons/reservation/3.svg" },
  { number: "04", title: "Fragmentation feels normal to those inside it.", desc: "Revenue managers didn't call tool-switching a problem — they called it their job.", iconSrc: "/assets/icons/reservation/4.svg" },
  { number: "05", title: "Migration is part of the product, not a footnote.", desc: "Revenue managers can't pause operations for a transition, so the path there needs as much design care as the destination.", iconSrc: "/assets/icons/reservation/5.svg" },
  { number: "06", title: "Removing friction beats adding features.", desc: "The biggest wins came from eliminating context-switching, not from adding new functionality.", iconSrc: "/assets/icons/reservation/6.svg" },
];

// 3x3 grid — slots 1, 6, and 7 (1-indexed) are deliberately left empty.
const LESSON_GRID: (typeof LESSONS[number] | null)[] = [
  null, LESSONS[0], LESSONS[1],
  LESSONS[2], LESSONS[3], null,
  null, LESSONS[4], LESSONS[5],
];

export default function HotelogixCroPreview() {
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
          Central Reservation Office
        </h1>

        <p style={{
          fontSize: 16, color: "#6b7280", fontFamily: ff, textAlign: "center", lineHeight: 1.7,
          margin: "0 auto 32px",
        }}>
          Revenue managers at Hotelogix were navigating three disconnected tools every day —
          bookings in one system, pricing insights in another, group configuration in a third.
          I led the design of a unified Central Reservation Office that consolidates these
          workflows into a single platform, introducing AI-assisted room permutations that help
          managers make faster, better-informed decisions across 200+ hotel accounts.
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
                <ScreenshotPlaceholder label="Central Reservation Office dashboard" height={653} />
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
          Redesigning how revenue managers work at Hotelogix.
        </h2>
        <p style={{ fontSize: 15.5, color: "#777", fontFamily: ff, textAlign: "center", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          A look at the scope, team, and contributions that shaped the Central Reservation Office from fragmented tools into a unified platform.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1040, margin: "0 auto" }}>
          <SnapshotCard icon={<User size={16} />} label="Role" value="Product UX Designer" />
          <SnapshotCard icon={<Clock size={16} />} label="Timeline" value="Jul 2023 – Present" />
          <SnapshotCard icon={<Users size={16} />} label="Team" value="Design · Engineering · Revenue Management" />
          <SnapshotCard icon={<Star size={16} />} label="Contribution" value="UX Strategy · Information Architecture · Interaction Design · Data Visualisation · UI Design · Stakeholder Workshops" />
        </div>
      </section>

      {/* Section 02 — At a Glance */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="02" label="At a Glance" />

        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#111",
          fontFamily: ff, textAlign: "center", letterSpacing: "-0.02em", marginBottom: 14,
        }}>
          Built for revenue managers who can&apos;t afford to switch tabs.
        </h2>

        <p style={{ fontSize: 15.5, color: "#777", fontFamily: ff, textAlign: "center", maxWidth: 480, margin: "0 auto 56px" }}>
          Consolidating pricing, availability, and group configuration into one always-on platform across 200+ hotel accounts.
        </p>

        <SandboxCluster leftCards={SANDBOX_LEFT_CARDS} rightCards={SANDBOX_RIGHT_CARDS} />
      </section>

      {/* Section 03 — The Challenge */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="03" label="The Challenge" />
        <SectionHeading
          title="Revenue management had outgrown its own tools."
          subtitle="Revenue managers were switching between 3 disconnected tools to manage bookings, causing delays and pricing inconsistencies across 200+ hotel accounts."
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
            title="Understanding how revenue managers actually decide."
            subtitle="Research spanned workflow mapping, tool-switching analysis, group booking audits, and stakeholder interviews across hotel tiers to understand where trust and efficiency broke down."
            maxWidth={620}
            bold
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 220, maxWidth: 1160, margin: "40px auto 170px" }}>
            <InsightCard
              badge="Key Insight"
              title="Tool fragmentation is invisible to those inside it."
              desc="Revenue managers had normalised switching between three tools. They didn't call it a problem — they called it their job."
            >
              <MockTable rows={4} />
              <Annotation label="Three tools, one workflow" pos="right" style={{ top: -30, left: "100%", marginLeft: 12 }} />
            </InsightCard>

            <InsightCard title="AI features require visible reasoning." desc="Suggesting a permutation without explaining the logic caused managers to override the recommendation every time.">
              <MockSelection />
              <Annotation label="No visible reasoning, no trust" pos="top" style={{ top: -117, left: -110 }} />
            </InsightCard>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1160, margin: "-100px auto 76px" }}>
            <SmallInsightCard title="Data must match the mental model." desc="Revenue managers think in accounts, not rows. Displaying data at the database level forces unnecessary cognitive translation.">
              <MockAvatars />
              <Annotation label="Accounts, not rows" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Consolidation means redesigning workflows." desc="Merging three tools into one required rethinking the transitions between them — not just combining the interfaces.">
              <MockForm />
              <Annotation label="Not just merged screens" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Migration experience is a design problem." desc="Revenue managers cannot pause operations for a product transition. The migration path required as much design attention as the destination.">
              <MockTimeline />
              <Annotation label="No pause button for revenue" pos="top" style={{ top: -170, right: -4 }} />
            </SmallInsightCard>
          </div>

          <ResearchMethodsBar methods={RESEARCH_METHODS} />
        </div>
      </section>

      {/* Section 05 — Design Principles */}
      <section style={{ background: "#f3f3f3", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="05" label="Design Principles" />
        <SectionHeading
          title="Principles that guided the consolidation."
          subtitle="These principles shaped how three fragmented tools became one — helping revenue managers trust, understand, and move faster through every decision."
          maxWidth={620}
        />

        <DesignPrinciplesScroll principles={PRINCIPLES} images={PRINCIPLE_IMAGES} />
      </section>

      {/* Section 06 — The Solution */}
      <section style={{ background: "#f3f3f3", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="06" label="The Solution" />
        <SectionHeading
          title="Consolidating three tools into one connected system."
          subtitle="Instead of redesigning each tool individually, the focus was on rethinking the transitions between booking, pricing, and group configuration."
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
                <ScreenshotPlaceholder label={s.imageLabel} height={s.imageHeight} fit="cover" />
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
          products={CRO_MODULES}
          containerHeight="280vh"
          headerTitle="Revenue decisions don't happen in isolation"
          headerSubtitle="Before consolidating three tools into one, I mapped the complete revenue workflow — from pricing to permutations to account switching — to understand how information needed to flow across the platform."
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
          subtitle="A scalable design language — color, typography, spacing, and components — built to keep booking, pricing, and permutation screens consistent across the platform."
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
            Designed for measurable revenue impact.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", fontFamily: ff, lineHeight: 1.6, maxWidth: 480, margin: "0 0 40px" }}>
            The consolidation simplified everyday booking decisions while preserving the complexity revenue managers need across 200+ hotel accounts.
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
