"use client";

import {
  ExternalLink, User, Clock, Users, Star,
  Map, ListOrdered, Zap,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { HeroParallax } from "@/components/ui/hero-parallax";
import {
  ff,
  SnapshotCard,
  SectionEyebrow,
  SectionHeading,
  ScreenshotPlaceholder,
  moduleThumbnail,
  TiltMockup,
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

// ── Section 03 — The Challenge ────────────────────────────────
const CHALLENGES = [
  { title: "Order Entry Under Pressure", desc: "Slow, error-prone order entry could not keep pace with real peak-service demand." },
  { title: "No Spatial Awareness", desc: "Without real-time table mapping, staff had no sense of what was happening where on the floor." },
  { title: "One UI, Three Roles", desc: "A single generic interface was forced across server, cashier, and kitchen — and served none of them well." },
  { title: "Kitchen Miscommunication", desc: "The kitchen display gave no order priority or sequencing context, causing constant confusion." },
  { title: "Device Mismatch", desc: "The interface was not optimised for the tablets and handhelds staff actually carried on the floor." },
  { title: "Peak-Hour Bottlenecks", desc: "Every extra tap during service compounded into slower tables and frustrated guests." },
];

// ── Section 02 — At a Glance ─────────────────────────────────
const SANDBOX_LEFT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "+40%", statLabel: <>Faster Order<br />Processing</> },
  { value: "40%", delta: "↓", statLabel: <>Order-to-Kitchen<br />Time</> },
];
const SANDBOX_RIGHT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "3", statLabel: <>Hotel Restaurants<br />in Pilot</> },
  { value: "25%", delta: "↓", statLabel: <>Fewer Order<br />Errors</> },
];

// ── Section 04 — Research Insights ───────────────────────────
const RESEARCH_METHODS: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> = [
  { label: "Hotel Restaurants Shadowed", value: "3" },
  { label: "Peak-Hour Observations", value: "20+ hrs" },
  { label: "Staff Interviews", value: "15+" },
  { label: "Competitive Benchmarking", value: "6+ Products" },
  { label: "Research Timeline", value: "3 Months" },
];

// ── Section 05 — Design Principles ───────────────────────────
const PRINCIPLES: DesignPrinciple[] = [
  { index: "01", title: "Context Over Convention", desc: "Standard POS patterns break under real service pressure. Design must fit the environment — not the other way around." },
  { index: "02", title: "Speed is a Feature", desc: "In peak-hour operations, every extra tap costs real money. Minimum taps, maximum efficiency." },
  { index: "03", title: "Role-Specific Touchpoints", desc: "A server, cashier, and kitchen operator have fundamentally different mental models. One UI cannot serve all three well." },
  { index: "04", title: "Spatial Context Reduces Errors", desc: "A table map isn't cosmetic — it gives staff the same spatial awareness they have walking the floor." },
];
const PRINCIPLE_IMAGES = PRINCIPLES.map((p) => moduleThumbnail(p.title));

// ── Section 06 — The Solution ─────────────────────────────────
const SOLUTION_STEPS: Array<{ number: string; title: string; desc: string; reverse: boolean; imageLabel: string; imageHeight: number }> = [
  { number: "01", title: "Real-Time Table Map", desc: "Order entry redesigned around physical space, not abstract lists.", reverse: false, imageLabel: "Table map screenshot", imageHeight: 400 },
  { number: "02", title: "Kitchen Display System", desc: "Priority context and real-time sync, so kitchens manage sequence proactively.", reverse: true, imageLabel: "Kitchen display screenshot", imageHeight: 400 },
  { number: "03", title: "Role-Specific Interfaces", desc: "Purpose-built views for server, cashier, and kitchen operator.", reverse: false, imageLabel: "Role-specific interface screenshot", imageHeight: 400 },
];

const SOLUTION_PILLS = [
  { icon: <Map size={14} />, label: "Real-Time Table Map" },
  { icon: <ListOrdered size={14} />, label: "3-Step Order Flow" },
  { icon: <Users size={14} />, label: "Role-Specific Interfaces" },
  { icon: <Zap size={14} />, label: "Peak-Hour Quick-Add" },
];

// ── Section 07 — Ecosystem showcase ──────────────────────────
const POS_MODULE_NAMES = [
  "Table Map", "Order Entry", "Kitchen Display", "Split Bill", "Tips & Discounts", "Shift Reports",
  "Menu Management", "Modifier Builder", "Server Assignments", "Course Timing", "Guest Check", "Payment Terminal",
  "Void & Comp Approval", "Happy Hour Pricing", "Combo Builder", "Inventory 86 List", "Server Performance", "Table Turnover Analytics",
  "Loyalty Lookup", "Room Charge Posting", "Banquet Event Orders", "Printer Routing", "Cash Drawer Reconciliation", "Multi-Outlet Switch",
];
const POS_MODULES = POS_MODULE_NAMES.map((title) => ({
  title,
  link: "#",
  thumbnail: moduleThumbnail(title),
}));

// ── Section 09 — Impact ───────────────────────────────────────
const IMPACT_STATS = [
  { number: "01", value: "+40%", desc: "Faster order processing during peak hours" },
  { number: "02", value: "−40%", desc: "Order-to-kitchen time with real-time table mapping" },
  { number: "03", value: "−25%", desc: "Fewer errors with role-specific touchpoints" },
  { number: "04", value: "3", desc: "Hotel restaurant properties piloted the redesign" },
];

// ── Section 10 — Lessons Learned ─────────────────────────────
const LESSONS = [
  { number: "01", title: "The best research happens off the screen.", desc: "Shadow research on the floor surfaced constraints no interview could have.", iconSrc: "/assets/icons/reservation/1.svg" },
  { number: "02", title: "Role-specific design isn't a luxury.", desc: "Forcing different users into one generic interface is a design failure, even when the system technically works.", iconSrc: "/assets/icons/reservation/2.svg" },
  { number: "03", title: "Context beats convention every time.", desc: "The best interface fails if it ignores the physical, operational environment it's actually used in.", iconSrc: "/assets/icons/reservation/3.svg" },
  { number: "04", title: "Speed is measured in taps, not features.", desc: "In peak service, every extra tap has a real cost — efficiency has to be designed in, not bolted on.", iconSrc: "/assets/icons/reservation/4.svg" },
  { number: "05", title: "Pressure reveals what testing can't.", desc: "Patterns that hold up in a quiet room can collapse completely during a busy dinner service.", iconSrc: "/assets/icons/reservation/5.svg" },
  { number: "06", title: "Spatial awareness is a design material.", desc: "A table map isn't decoration — it gives staff the same context they'd have walking the floor themselves.", iconSrc: "/assets/icons/reservation/6.svg" },
];

// 3x3 grid — slots 1, 6, and 7 (1-indexed) are deliberately left empty.
const LESSON_GRID: (typeof LESSONS[number] | null)[] = [
  null, LESSONS[0], LESSONS[1],
  LESSONS[2], LESSONS[3], null,
  null, LESSONS[4], LESSONS[5],
];

export default function HotelogixPosPreview() {
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
          Point of Sale — Restaurant Operations
        </h1>

        <p style={{
          fontSize: 16, color: "#6b7280", fontFamily: ff, textAlign: "center", lineHeight: 1.7,
          margin: "0 auto 32px",
        }}>
          Hotel restaurants operate at a pace that leaves no room for error — servers manage multiple
          tables at once, kitchens race against the clock, and any miscommunication lands directly on
          the guest. I redesigned Hotelogix&apos;s POS around the operational reality of hotel food and
          beverage service, embedding with staff across three properties to rebuild order flow, kitchen
          communication, and table awareness from the ground up.
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
                <ScreenshotPlaceholder label="POS dashboard screenshot" height={653} />
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
          Built for hotel restaurants under real service pressure.
        </h2>
        <p style={{ fontSize: 15.5, color: "#777", fontFamily: ff, textAlign: "center", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          A look at the scope, team, and contributions that shaped the POS redesign across three hotel restaurant properties.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1040, margin: "0 auto" }}>
          <SnapshotCard icon={<User size={16} />} label="Role" value="Product UX Designer" />
          <SnapshotCard icon={<Clock size={16} />} label="Timeline" value="Jul 2023 – Present" />
          <SnapshotCard icon={<Users size={16} />} label="Team" value="Design · Engineering · F&B Operations" />
          <SnapshotCard icon={<Star size={16} />} label="Contribution" value="UX Research · Contextual Inquiry · Interaction Design · UI Design · Prototyping · Usability Testing" />
        </div>
      </section>

      {/* Section 02 — At a Glance */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="02" label="At a Glance" />

        <SectionHeading
          title="Built for the pace of real service."
          subtitle="Every order, every table, every ticket — tracked and managed in real time across peak-hour restaurant operations."
          maxWidth={480}
        />

        <SandboxCluster leftCards={SANDBOX_LEFT_CARDS} rightCards={SANDBOX_RIGHT_CARDS} />
      </section>

      {/* Section 03 — The Challenge */}
      <section style={{ background: "#f3f3f3", padding: "90px 8%" }}>
        <SectionEyebrow number="03" label="The Challenge" />
        <SectionHeading
          title="Hotel restaurant operations left no room for error."
          subtitle="The existing POS was built for generic restaurant environments, not the specific pressures of hotel food and beverage service — and it showed under real service pressure."
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
            title="Understanding how hotel restaurants actually run service."
            subtitle="Research meant getting onto the floor — shadowing servers, observing peak-hour service, and mapping how orders move from table to kitchen to bill."
            maxWidth={620}
            bold
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 220, maxWidth: 1160, margin: "40px auto 170px" }}>
            <InsightCard
              badge="Key Insight"
              title="Context is everything."
              desc="Standard POS patterns break down under real service pressure. The environment, not the user, is the primary design constraint."
            >
              <MockTable rows={4} />
              <Annotation label="Too much happening at once" pos="right" style={{ top: -30, left: "100%", marginLeft: 12 }} />
            </InsightCard>

            <InsightCard title="Speed beats features." desc="In peak service, users need the fastest path to the most common action — not the most comprehensive interface.">
              <MockSelection />
              <Annotation label="Every extra tap costs time" pos="top" style={{ top: -117, left: -110 }} />
            </InsightCard>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1160, margin: "-100px auto 76px" }}>
            <SmallInsightCard title="Roles are fundamentally different." desc="A server, cashier, and kitchen operator have completely different mental models. One UI cannot adequately serve all three.">
              <MockAvatars />
              <Annotation label="Three roles, one screen" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Spatial awareness reduces errors." desc="Staff make better decisions when they can see where things are happening — a table map is functional, not decorative.">
              <MockForm />
              <Annotation label="No sense of table status" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Pressure changes behavior." desc="Patterns that work in testing can fail completely in a busy service environment. Real-environment validation is non-negotiable.">
              <MockTimeline />
              <Annotation label="Testing isn't real service" pos="top" style={{ top: -170, right: -4 }} />
            </SmallInsightCard>
          </div>

          <ResearchMethodsBar methods={RESEARCH_METHODS} />
        </div>
      </section>

      {/* Section 05 — Design Principles */}
      <section style={{ background: "#f3f3f3", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="05" label="Design Principles" />
        <SectionHeading
          title="Principles that shaped every screen."
          subtitle="These principles guided the redesign — helping hotel restaurant staff move faster, with fewer errors, under real service pressure."
          maxWidth={620}
        />

        <DesignPrinciplesScroll principles={PRINCIPLES} images={PRINCIPLE_IMAGES} />
      </section>

      {/* Section 06 — The Solution */}
      <section style={{ background: "#f3f3f3", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="06" label="The Solution" />
        <SectionHeading
          title="Redesigning order flow around context, not convention."
          subtitle="Instead of retrofitting a generic POS, we rebuilt the order flow, kitchen communication, and role-specific views around real hotel restaurant operations."
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
          products={POS_MODULES}
          containerHeight="280vh"
          headerTitle="Every order touches more systems than the table it started at."
          headerSubtitle="Before redesigning the interface, I mapped the full order lifecycle — from table to kitchen to payment to shift close — to understand where hotel F&B operations actually broke down."
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
          subtitle="A scalable design language built for hospitality operations — color, typography, spacing, and components designed for consistency across every POS module."
          maxWidth={620}
        />

        <TiltMockup style={{
          position: "relative", maxWidth: 1040, margin: "0 auto 20px", background: "#fff", borderRadius: 20,
          border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.08)", overflow: "hidden",
        }}>
          <ScreenshotPlaceholder label="Design system applied — POS component library mockup" height={666} fit="width" />
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
            Designed for measurable service-floor improvement.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", fontFamily: ff, lineHeight: 1.6, maxWidth: 480, margin: "0 0 40px" }}>
            The redesign sped up order processing and cut kitchen miscommunication, while giving every role on the floor a purpose-built view.
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
