"use client";

import {
  User, Users, Star, Clock,
  ExternalLink, Layers, ShieldCheck, Building2, TrendingUp,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { HeroParallax } from "@/components/ui/hero-parallax";
import {
  ff, SnapshotCard, SectionEyebrow, ScreenshotPlaceholder, TiltMockup,
  SectionHeading, ChallengeCard, Annotation, InsightCard, SmallInsightCard,
  ResearchMethodsBar, MockTable, MockSelection, MockAvatars, MockForm, MockTimeline,
  SandboxCluster, type SandboxStatCard, SolutionStep, SolutionPill, DesignSystemGrid,
  ImpactCard, LessonCard, EmptyLessonCard, type DesignPrinciple, DesignPrinciplesScroll,
  moduleThumbnail,
} from "@/components/case-study/caseStudyKit";

// Real product screenshots — reused throughout (hero, solution steps,
// design system mockup, and the ecosystem showcase) instead of placeholders.
const SCREENS = [
  "/assets/axisrooms/Frame 1171275175.png", "/assets/axisrooms/Frame 1171275176.png", "/assets/axisrooms/Frame 1171275177.png",
  "/assets/axisrooms/Frame 1171275178.png", "/assets/axisrooms/Frame 1171275179.png", "/assets/axisrooms/Frame 1171275180.png",
  "/assets/axisrooms/Frame 1171275181.png", "/assets/axisrooms/Frame 1171275182.png", "/assets/axisrooms/Frame 1171275183.png",
  "/assets/axisrooms/Frame 1171275184.png", "/assets/axisrooms/Frame 1171275185.png", "/assets/axisrooms/Frame 1171275186.png",
  "/assets/axisrooms/Frame 1171275187.png", "/assets/axisrooms/Frame 1171275190.png", "/assets/axisrooms/Frame 1171275191.png",
  "/assets/axisrooms/Frame 1171275192.png", "/assets/axisrooms/Frame 1171275193.png", "/assets/axisrooms/Frame 1171275194.png",
  "/assets/axisrooms/Frame 1171275195.png", "/assets/axisrooms/Frame 1171275196.png", "/assets/axisrooms/Frame 1171275197.png",
  "/assets/axisrooms/Frame 1171275198.png", "/assets/axisrooms/Frame 1171275199.png", "/assets/axisrooms/Frame 1171275200.png",
  "/assets/axisrooms/Frame 1171275209.png",
];

// ── Section 02 — At a Glance ─────────────────────────────────
const SANDBOX_LEFT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "7 → 1", statLabel: <>Navigation Paths<br />Consolidated</> },
  { value: "6 → 4", statLabel: <>Menu Categories<br />Simplified</> },
];
const SANDBOX_RIGHT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "8+", statLabel: <>OTA Channels<br />Connected</> },
  { value: "25+", statLabel: <>Screens<br />Redesigned</> },
];

// ── Section 03 — The Challenge ───────────────────────────────
// From the pre-redesign UX audit — real friction points, not invented ones.
const CHALLENGES = [
  { title: "Fragmented Navigation", desc: "Years of feature additions left users guessing which path led to the task they needed." },
  { title: "Repeated Destinations", desc: "The same task could be reached through multiple, inconsistent routes." },
  { title: "Overlapping Functionality", desc: "Similar actions lived under different menus depending on where users started." },
  { title: "Steep Learning Curve", desc: "New users struggled to build a mental model of how the product was organized." },
  { title: "Slower Operations", desc: "Every extra step to find a feature cost hotel teams real operational time." },
];

// ── Section 04 — Research Insights ───────────────────────────
const RESEARCH_METHODS: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> = [
  { label: "Workflows Audited", value: "25+" },
  { label: "Navigation Paths Mapped", value: "7" },
  { label: "Menu Levels Reviewed", value: "5" },
  { label: "User Roles Consulted", value: "4" },
  { label: "Distribution Channels Reviewed", value: "8+" },
];

// ── Section 05 — Design Principles ───────────────────────────
// Direct 1:1 mapping from the real design-approach data (axiesRoomData.approach.principles).
const PRINCIPLES: DesignPrinciple[] = [
  { index: "01", title: "One Clear Path", desc: "Every task was rebuilt to have a single, predictable route instead of several overlapping ones." },
  { index: "02", title: "Reduce Cognitive Load", desc: "Grouping related actions together meant users no longer had to remember where features lived." },
  { index: "03", title: "Action-First", desc: "The most common actions were surfaced immediately instead of buried behind menus." },
  { index: "04", title: "Consistency", desc: "The same terminology and interaction patterns were used everywhere in the product." },
];
const PRINCIPLE_IMAGES = PRINCIPLES.map((p) => moduleThumbnail(p.title));

// ── Section 06 — The Solution ────────────────────────────────
const SOLUTION_STEPS: Array<{ number: string; title: string; desc: string; reverse: boolean; imageSrc: string }> = [
  { number: "01", title: "Rebuilt Navigation Structure", desc: "Related actions were grouped together, duplicate entry points were removed, and navigation was rebuilt around user goals instead of product modules.", reverse: false, imageSrc: SCREENS[1] },
  { number: "02", title: "Distribution & Revenue in One Place", desc: "Inventory, channel distribution, and dynamic pricing now live in a single connected workspace instead of scattered menus.", reverse: true, imageSrc: SCREENS[6] },
  { number: "03", title: "Reservation Operations, On the Go", desc: "Bookings, occupancy, and property performance are reachable in one tap — built for teams managing multiple properties.", reverse: false, imageSrc: SCREENS[12] },
];

const SOLUTION_PILLS = [
  { icon: <Building2 size={14} />, label: "Enterprise-Ready" },
  { icon: <Layers size={14} />, label: "One Clear Hierarchy" },
  { icon: <ShieldCheck size={14} />, label: "Role-Based Access" },
  { icon: <TrendingUp size={14} />, label: "Built to Scale" },
];

// ── Section 07 — Ecosystem showcase (HeroParallax) ───────────
const AXISROOMS_MODULE_NAMES = [
  "Inventory Management", "Channel Connections", "Rate Calendar", "Availability Sync", "Booking Engine", "Revenue Dashboard",
  "Occupancy Analytics", "Reservation List", "Guest Details", "Property Switcher", "Rate Rules", "Channel Health Monitor",
  "Booking Source Report", "Multi-Property Overview", "Notification Center", "User Roles & Permissions", "OTA Mapping", "Rate Parity Check",
  "Group Booking Manager", "Housekeeping Sync", "Performance Reports", "Audit Log", "Platform Settings", "API Integrations",
];
const AXISROOMS_MODULES = AXISROOMS_MODULE_NAMES.map((title, i) => ({
  title,
  link: "#",
  thumbnail: SCREENS[i % SCREENS.length],
}));

// ── Section 09 — Impact ──────────────────────────────────────
const IMPACT_STATS = [
  { number: "01", value: "7 → 1", desc: "Navigation paths consolidated into one predictable workflow" },
  { number: "02", value: "6 → 4", desc: "Top-level menu categories simplified for faster orientation" },
  { number: "03", value: "25+", desc: "Screens redesigned across distribution, revenue, and reservations" },
  { number: "04", value: "8+", desc: "OTA channels kept synchronized in real time" },
];

// ── Section 10 — Lessons Learned ─────────────────────────────
const LESSONS = [
  { number: "01", title: "Simplifying isn't the same as removing.", desc: "The instinct to cut features when a product feels complex is often wrong — the real fix is reorganizing what's already there.", iconSrc: "/assets/ICONS/RESERVATION/1.svg" },
  { number: "02", title: "An audit is worth more than an opinion.", desc: "Mapping how people actually completed tasks — not how the product assumed they would — surfaced problems no amount of guessing would have found.", iconSrc: "/assets/ICONS/RESERVATION/2.svg" },
  { number: "03", title: "Enterprise users forgive complexity, not inconsistency.", desc: "Experienced users could handle depth. What frustrated them was the same action working differently depending on where they started.", iconSrc: "/assets/ICONS/RESERVATION/3.svg" },
  { number: "04", title: "Navigation is a design decision, not IT plumbing.", desc: "How users reach a feature shapes their trust in the product as much as the feature itself does.", iconSrc: "/assets/ICONS/RESERVATION/4.svg" },
  { number: "05", title: "Multiple paths feel like flexibility until they're not.", desc: "Seven ways to reach the same task looked generous on paper — in practice, nobody could predict where anything lived.", iconSrc: "/assets/ICONS/RESERVATION/5.svg" },
  { number: "06", title: "Workflows, not screens, are the real unit of design.", desc: "Redesigning one screen at a time missed the point. The job was rebuilding how tasks moved between screens.", iconSrc: "/assets/ICONS/RESERVATION/6.svg" },
];

// 3x3 grid — slots 1, 6, and 7 (1-indexed) are deliberately left empty.
const LESSON_GRID: (typeof LESSONS[number] | null)[] = [
  null, LESSONS[0], LESSONS[1],
  LESSONS[2], LESSONS[3], null,
  null, LESSONS[4], LESSONS[5],
];

export default function HotelogixAxisRoomsPreview() {
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
          AxisRooms — Channel Manager
        </h1>

        <p style={{
          fontSize: 16, color: "#6b7280", fontFamily: ff, textAlign: "center", lineHeight: 1.7,
          margin: "0 auto 32px",
        }}>
          AxisRooms simplifies years of accumulated complexity by streamlining navigation, reducing
          workflow friction, and helping hotel teams manage revenue and distribution with confidence
          from anywhere. I led the redesign of its mobile experience — rebuilding how enterprise hotel
          teams navigate distribution, revenue, and reservation operations.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: ff, fontSize: 14, fontWeight: 400, color: "#fff", background: "#111",
              border: "none", borderRadius: "var(--radius-xl)", padding: "13px 28px", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "var(--spacing-8)", textDecoration: "none",
            }}
          >
            View Figma File
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Dashboard mockup */}
        <div style={{ position: "relative", maxWidth: 980, margin: "0 auto" }}>
          <div style={{
            background: "#242424", borderRadius: "var(--radius-2xl-2)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.10)", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: "0 10px 10px" }}>
              <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden" }}>
                <ScreenshotPlaceholder label="AxisRooms dashboard" height={653} src={SCREENS[0]} fit="width" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Snapshot — sits right after the hero, no numbered eyebrow */}
      <section style={{ background: "#f3f3f3", padding: "60px 8% 90px" }}>
        <p style={{
          fontSize: 12, fontWeight: 400, color: "#999", fontFamily: ff, textAlign: "center", marginBottom: 14,
        }}>
          Project Snapshot
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#111",
          fontFamily: ff, textAlign: "center", letterSpacing: "-0.02em", marginBottom: 14,
        }}>
          Redesigning how enterprise hotel teams navigate AxisRooms.
        </h2>
        <p style={{ fontSize: 15.5, color: "#777", fontFamily: ff, textAlign: "center", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          A look at the scope, team, and contributions that shaped the AxisRooms mobile redesign, from UX audit to shipped product.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--spacing-20)", maxWidth: 1040, margin: "0 auto" }}>
          <SnapshotCard icon={<User size={16} />} label="Role" value="Product Designer" />
          <SnapshotCard icon={<Clock size={16} />} label="Timeline" value="2024" />
          <SnapshotCard icon={<Users size={16} />} label="Team" value="Product · Engineering · QA" />
          <SnapshotCard icon={<Star size={16} />} label="Contribution" value="UX Strategy · Interaction Design · Design System · Developer Handoff" />
        </div>
      </section>

      {/* Section 02 — At a Glance */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="02" label="At a Glance" />

        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#111",
          fontFamily: ff, textAlign: "center", letterSpacing: "-0.02em", marginBottom: 14,
        }}>
          Built for teams managing complexity at scale.
        </h2>

        <p style={{ fontSize: 15.5, color: "#777", fontFamily: ff, textAlign: "center", maxWidth: 480, margin: "0 auto 56px" }}>
          AxisRooms unifies distribution, revenue, and reservation operations into a single mobile platform built for hotel teams.
        </p>

        <SandboxCluster leftCards={SANDBOX_LEFT_CARDS} rightCards={SANDBOX_RIGHT_CARDS} />
      </section>

      {/* Section 03 — The Challenge */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="03" label="The Challenge" />
        <SectionHeading
          title="We audited the product before redesigning anything."
          subtitle="The audit uncovered years of accumulated complexity caused by duplicate navigation, inconsistent information architecture, and deeply nested workflows that slowed down everyday operations."
          maxWidth={640}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--spacing-20)", maxWidth: 1040, margin: "0 auto" }}>
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
            title="Understanding how enterprise teams actually navigate."
            subtitle="Research meant mapping real task paths — not redesigning screens in isolation — to see where fragmented navigation was costing hotel teams time."
            maxWidth={620}
            bold
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 220, maxWidth: 1160, margin: "40px auto 170px" }}>
            <InsightCard
              badge="Key Insight"
              title="The same task had seven different doors."
              desc="Inventory could be reached from multiple menus depending on where a user started — flexible in theory, but confusing and slow in practice."
            >
              <MockTable rows={4} />
              <Annotation label="Multiple entry points, one task" pos="right" style={{ top: -30, left: "100%", marginLeft: 12 }} />
            </InsightCard>

            <InsightCard title="Depth doesn't have to mean deep clicks." desc="Important actions were buried 4–5 menu levels deep, forcing users to memorize paths instead of finding things naturally.">
              <MockSelection />
              <Annotation label="4–5 levels deep" pos="top" style={{ top: -117, left: -110 }} />
            </InsightCard>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--spacing-20)", maxWidth: 1160, margin: "-100px auto 76px" }}>
            <SmallInsightCard title="Grouping matters as much as labeling." desc="Related actions were scattered across unrelated sections instead of being grouped logically.">
              <MockAvatars />
              <Annotation label="Scattered, not grouped" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Consistency is a trust signal." desc="Similar actions used different layouts, labels, and patterns depending on where they appeared in the app.">
              <MockForm />
              <Annotation label="Same action, different pattern" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Enterprise users won't tolerate friction forever." desc="Every extra step to find a feature cost hotel teams real operational time, even when they'd learned to work around it.">
              <MockTimeline />
              <Annotation label="Time cost, not just friction" pos="top" style={{ top: -170, right: -4 }} />
            </SmallInsightCard>
          </div>

          <ResearchMethodsBar methods={RESEARCH_METHODS} />
        </div>
      </section>

      {/* Section 05 — Design Principles */}
      <section style={{ background: "#f3f3f3", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="05" label="Design Principles" />
        <SectionHeading
          title="Designing workflows — not screens."
          subtitle="The redesign focused on making operational tasks easier to complete rather than making individual screens look better."
          maxWidth={620}
        />

        <DesignPrinciplesScroll principles={PRINCIPLES} images={PRINCIPLE_IMAGES} />
      </section>

      {/* Section 06 — The Solution */}
      <section style={{ background: "#f3f3f3", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="06" label="The Solution" />
        <SectionHeading
          title="Rebuilding the product's mental model."
          subtitle="Rather than redesigning isolated screens, we restructured how the application was organized around user goals instead of product modules."
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
                <ScreenshotPlaceholder label={s.title} height={400} src={s.imageSrc} fit="cover" />
              </SolutionStep>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "var(--spacing-16)", marginTop: 48 }}>
          {SOLUTION_PILLS.map((p) => <SolutionPill key={p.label} icon={p.icon} label={p.label} />)}
        </div>
      </section>

      {/* Section 07 — Ecosystem showcase (HeroParallax) */}
      <section style={{ background: "#26B898" }}>
        <HeroParallax
          products={AXISROOMS_MODULES}
          containerHeight="280vh"
          headerTitle="Every workflow touches more than one screen"
          headerSubtitle="Before rebuilding the navigation, I mapped how distribution, revenue, and reservation workflows actually flowed between screens — instead of redesigning each one in isolation."
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
          subtitle="To ensure consistency across the product, we developed a reusable mobile design language that standardized typography, spacing, color usage, and interaction patterns."
          maxWidth={620}
        />

        <TiltMockup style={{
          position: "relative", maxWidth: 1040, margin: "0 auto 20px", background: "#fff", borderRadius: "var(--radius-2xl-2)",
          border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.08)", overflow: "hidden",
        }}>
          <ScreenshotPlaceholder label="Design system applied — component library mockup" height={666} src={SCREENS[20]} fit="width" />
        </TiltMockup>

        <DesignSystemGrid />
      </section>

      {/* Section 09 — Impact */}
      <section style={{ background: "#f3f3f3", padding: "60px 8%" }}>
        <div style={{ background: "#26B898", borderRadius: 28, padding: "56px 48px 48px", maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 400, color: "#fff", fontFamily: ff, marginBottom: 24 }}>
            09 — IMPACT
          </div>
          <h2 style={{
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, color: "#fff", fontFamily: ff,
            lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "var(--spacing-16)", maxWidth: 560,
          }}>
            Designed for operations. Optimized for clarity.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", fontFamily: ff, lineHeight: 1.6, maxWidth: 480, margin: "0 0 40px" }}>
            By simplifying navigation and reducing workflow friction, AxisRooms became a faster, more intuitive operational experience — without sacrificing the depth hotel teams depend on.
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
        <div style={{ fontSize: 13, fontWeight: 400, color: "#26B898", fontFamily: ff, marginBottom: "var(--spacing-32)", maxWidth: 1120, margin: "0 auto 32px" }}>
          10 — LESSONS LEARNED
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--spacing-20)", maxWidth: 1120, margin: "0 auto" }}>
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
