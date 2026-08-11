"use client";

import {
  ExternalLink, User, Clock, Users, Star,
  Map, ListOrdered, Zap,
  LayoutGrid, Armchair, ClipboardList, ChefHat, Receipt, CreditCard,
  UserRound,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { HeroParallax } from "@/components/ui/hero-parallax";
import LessonsLearnedPremium, { type PremiumLesson } from "@/components/preview/LessonsLearnedPremium";
import {
  ff,
  ffHeading,
  SnapshotCard,
  SectionEyebrow,
  SectionHeading,
  ScreenshotPlaceholder,
  moduleThumbnail,
  TiltMockup,
  ScrollRevealSection,
  LifecycleOverview,
  type LifecycleStep,
  type LifecyclePosition,
  LearnedRow,
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
  SolutionCard,
  SolutionPill,
  DesignSystemGrid,
  ImpactCard,
} from "@/components/preview/caseStudyKit";

// ── Section 03 — The Challenge ────────────────────────────────
// Indexed because ScrollRevealSection keys and numbers its card trail off
// `index`, matching the RMS treatment.
const CHALLENGES: Array<{ index: string; title: string; desc: string }> = [
  { index: "01", title: "Slow Order Processing", desc: "Staff spent unnecessary time navigating between ordering and billing workflows." },
  { index: "02", title: "Limited Table Visibility", desc: "Table occupancy and service status weren't easy to monitor in real time." },
  { index: "03", title: "Delayed Kitchen Communication", desc: "Order updates weren't efficiently communicated between service staff and kitchen teams." },
  { index: "04", title: "Repetitive Operations", desc: "Routine actions like splitting bills, transferring tables, and modifying orders required multiple steps." },
  { index: "05", title: "Peak Hour Bottlenecks", desc: "As customer volume increased, operational workflows became increasingly difficult to manage." },
  { index: "06", title: "Fragmented Service Experience", desc: "Ordering, billing, and table management existed across disconnected workflows." },
];

// One "before" screenshot per challenge/scroll step. No old-system POS
// captures exist yet, so these fall back to the generated placeholders —
// swap for real screenshots when they're available.
const CHALLENGE_IMAGES = CHALLENGES.map((c) => moduleThumbnail(c.title));

// ── Section 04 — Operational Lifecycle ────────────────────────
// The service journey end to end, from managing the floor through to payment.
const LIFECYCLE_STEPS: LifecycleStep[] = [
  { icon: <LayoutGrid size={20} strokeWidth={1.6} />, title: "Table Management" },
  { icon: <Armchair size={20} strokeWidth={1.6} />, title: "Guest Seating" },
  { icon: <ClipboardList size={20} strokeWidth={1.6} />, title: "Order Taking" },
  { icon: <ChefHat size={20} strokeWidth={1.6} />, title: "Kitchen Processing" },
  { icon: <Receipt size={20} strokeWidth={1.6} />, title: "Billing" },
  { icon: <CreditCard size={20} strokeWidth={1.6} />, title: "Payment" },
];

// x as a fraction of the row width, plus a vertical level in px (0 = highest).
// Six steps, so a wider zigzag than the RMS eight-step meander.
const LIFECYCLE_POSITIONS: LifecyclePosition[] = [
  { xFrac: 0.08, level: 0 },
  { xFrac: 0.22, level: 190 },
  { xFrac: 0.38, level: 30 },
  { xFrac: 0.56, level: 210 },
  { xFrac: 0.74, level: 50 },
  { xFrac: 0.90, level: 220 },
];

// ── Section 02 — At a Glance ─────────────────────────────────
const SANDBOX_LEFT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "40%", delta: "↑", statLabel: <>Improvement in<br />High-Volume Service</> },
  { value: "40%", delta: "↓", statLabel: <>Faster Order<br />Processing</> },
];
const SANDBOX_RIGHT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "Real-time", statLabel: <>Table<br />Management</> },
  { value: "Live", statLabel: <>Kitchen<br />Coordination</> },
];

// ── Section 05 — Research Insights ───────────────────────────
const RESEARCH_METHODS: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> = [
  { label: "Restaurants Observed", value: "3" },
  { label: "Peak-Hour Observations", value: "20+ hrs" },
  { label: "Staff Interviews", value: "15+" },
  { label: "Competitive Benchmarking", value: "6+ Products" },
  { label: "Research Timeline", value: "3 Months" },
];

// Verbatim quotes from floor observation, paired with the insight each one
// produced — same "What We Learned" treatment as the RMS research section.
const LEARNED_INTERVIEWS: Array<{ number: string; role: string; icon: React.ReactNode; quote: string; insight: string }> = [
  { number: "01", role: "Restaurant Server", icon: <User size={22} />, quote: "Most delays happen before the food even reaches the kitchen.", insight: "Reducing order entry time would significantly improve overall service speed." },
  { number: "02", role: "Restaurant Manager", icon: <UserRound size={22} />, quote: "I need to know which tables need attention without asking my staff.", insight: "Real-time table visibility was essential for operational awareness." },
  { number: "03", role: "Kitchen Staff", icon: <ChefHat size={22} />, quote: "Late or incorrect orders slow everyone down.", insight: "Clear communication between front-of-house and kitchen staff reduced operational friction." },
];

// ── Section 07 — The Solution ─────────────────────────────────
// Four solutions, each carrying its own Challenge/Approach/Impact breakdown,
// so they use SolutionCard rather than the caption-only SolutionStep.
const SOLUTION_CARDS: Array<{
  number: string; title: string; challenge: string; approach: string;
  impact: Array<{ value: string; caption?: string }>;
  imageLabel: string; imageHeight: number;
}> = [
  {
    number: "01",
    title: "Smart Table Dashboard",
    challenge: "Restaurant teams struggled to monitor table occupancy and service status.",
    approach: "Designed a live table management dashboard with real-time occupancy and service indicators.",
    impact: [{ value: "Faster table turnover" }, { value: "Improved operational visibility" }],
    imageLabel: "Table dashboard screenshot", imageHeight: 400,
  },
  {
    number: "02",
    title: "Streamlined Order Management",
    challenge: "Taking and modifying orders required repetitive actions.",
    approach: "Simplified order creation, editing, and routing to reduce interaction costs.",
    impact: [{ value: "40%", caption: "faster order processing" }, { value: "Reduced service delays" }],
    imageLabel: "Order management screenshot", imageHeight: 400,
  },
  {
    number: "03",
    title: "Kitchen Order Workflow",
    challenge: "Kitchen communication slowed during busy service hours.",
    approach: "Created a centralized order queue with clear preparation status and priority.",
    impact: [{ value: "Faster order-to-kitchen communication" }, { value: "Better kitchen coordination" }],
    imageLabel: "Kitchen workflow screenshot", imageHeight: 400,
  },
  {
    number: "04",
    title: "Flexible Billing",
    challenge: "Split bills and payment workflows interrupted service.",
    approach: "Designed quick billing actions for transfers, split payments, and settlements.",
    impact: [{ value: "Faster checkout" }, { value: "Fewer billing errors" }],
    imageLabel: "Billing screenshot", imageHeight: 400,
  },
];

const SOLUTION_PILLS = [
  { icon: <Map size={14} />, label: "Smart Table Dashboard" },
  { icon: <ListOrdered size={14} />, label: "Streamlined Ordering" },
  { icon: <Users size={14} />, label: "Kitchen Order Workflow" },
  { icon: <Zap size={14} />, label: "Flexible Billing" },
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

// ── Section 10 — Impact ───────────────────────────────────────
const IMPACT_STATS = [
  { number: "01", value: "40% ↑", desc: "Improvement in high-volume service" },
  { number: "02", value: "40% ↓", desc: "Faster order processing" },
  { number: "03", value: "Real-time", desc: "Operational visibility" },
  { number: "04", value: "Simplified", desc: "Restaurant workflows" },
];

// ── Section 11 — Lessons Learned ─────────────────────────────
// Order matters: the bento's six slots run 01 (wide, with the dashboard
// illustration) through 06 (design-system preview), so each lesson is paired
// with whichever illustration best fits it.
const LESSONS: PremiumLesson[] = [
  { title: "The best research happens off the screen.", desc: "Shadowing real dinner service surfaced constraints no interview could have." },
  { title: "One order touches every station.", desc: "A change at the table ripples through kitchen, bar, and the final bill." },
  { title: "Context beats convention every time.", desc: "Standard POS patterns fail if they ignore the physical room they're used in." },
  { title: "Role-specific design isn't a luxury.", desc: "Server, cashier, and kitchen operator each needed their own purpose-built view." },
  { title: "Speed is measured in taps, not features.", desc: "In peak service every extra tap has a real cost — efficiency has to be designed in." },
  { title: "Design systems unlock consistency at scale.", desc: "Shared components kept every POS module coherent as the product grew." },
];

// The bento's network diagram keeps its fixed geometry; only the node
// wording changes to the stations an order actually passes through.
const LESSON_NODES = [
  { title: "Servers", sub: "Order Entry" },
  { title: "Kitchen", sub: "Ticket Queue" },
  { title: "Cashier", sub: "Billing" },
  { title: "Bar", sub: "Drinks Queue" },
  { title: "Management", sub: "Shift Reports" },
];

const LESSON_BLUEPRINT = [
  { top: "Rooftop", bottom: "Bar" },
  { top: "Guest", bottom: "Dining" },
  { top: "Service", bottom: "Efficiency" },
  { top: "Back of House", bottom: "Kitchen" },
];

const LESSON_KPIS = [
  { label: "Open Tables", value: "24", delta: "12%", positive: true },
  { label: "Covers Tonight", value: "186", delta: "9%", positive: true },
  { label: "Avg Ticket Time", value: "14m", delta: "6%", positive: false },
];

export default function HotelogixPosPreview() {
  return (
    <>
      {/* Section 01 — Overview */}
      <section style={{
        background: "var(--sp-cream)",
        padding: "120px 8% 90px",
      }}>
        <h1 style={{
          fontSize: "clamp(34px, 3.5vw, 56px)", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, textAlign: "center", lineHeight: 1.15, textTransform: "capitalize", marginBottom: 22,
        }}>
          Point of Sale — Restaurant Operations
        </h1>

        <p style={{
          fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", lineHeight: 1.7,
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
              fontFamily: ff, fontSize: 16, fontWeight: 500, color: "var(--sp-charcoal)", background: "var(--sp-cream)",
              border: "1.5px solid var(--sp-charcoal)", borderRadius: 20, padding: "13px 28px", cursor: "pointer",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px 0px",
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
            background: "var(--sp-dew)", borderRadius: 12,
            boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: "0 10px 10px" }}>
              <div style={{ background: "var(--sp-cream)", borderRadius: 8, overflow: "hidden" }}>
                <ScreenshotPlaceholder label="POS dashboard screenshot" height={653} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Snapshot — sits right after the hero, no numbered eyebrow */}
      <section style={{ background: "var(--sp-cream)", padding: "60px 8% 90px" }}>
        <p style={{
          fontSize: 16, fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#8a8580", fontFamily: ff, textAlign: "center", marginBottom: 14,
        }}>
          Project Snapshot
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, textAlign: "center", textTransform: "capitalize", marginBottom: 14,
        }}>
          Built for restaurants that never slow down.
        </h2>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          Designed a modern Point of Sale system to simplify restaurant operations, helping staff manage tables, orders, and kitchen coordination during peak service hours.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1040, margin: "0 auto" }}>
          <SnapshotCard icon={<User size={16} />} label="Role" value="Founding Product Designer" />
          <SnapshotCard icon={<Clock size={16} />} label="Timeline" value="Confidential" />
          <SnapshotCard icon={<Users size={16} />} label="Team" value="Product · Engineering · Customer Success" />
          <SnapshotCard icon={<Star size={16} />} label="Contribution" value="Product Strategy · UX Design · Interaction Design · UI Design · Information Architecture · Design Systems · Cross-functional Collaboration" />
        </div>

        <div style={{
          maxWidth: 1040, margin: "40px auto 0", background: "var(--sp-cream)", borderRadius: 12,
          border: "1.5px solid var(--sp-charcoal)", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", padding: "36px 40px",
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, textTransform: "capitalize", marginBottom: 20 }}>
            What I Owned
          </h3>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 32px", margin: 0, padding: 0, listStyle: "none" }}>
            {[
              "Led the end-to-end redesign of the restaurant POS experience.",
              "Simplified table management and order workflows.",
              "Designed real-time operational interfaces for busy service environments.",
              "Collaborated with Product, Engineering, and Customer Success from discovery through implementation.",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sp-orange)", flexShrink: 0, marginTop: 8 }} />
                <span style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 02 — At a Glance */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="02" label="At a Glance" />

        <SectionHeading
          title="Designed for high-volume restaurant operations."
          subtitle="Helping restaurant teams manage tables, orders, and kitchen coordination with greater speed and operational efficiency."
          maxWidth={480}
        />

        <SandboxCluster leftCards={SANDBOX_LEFT_CARDS} rightCards={SANDBOX_RIGHT_CARDS} />
      </section>

      {/* Section 03 — The Challenge */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="03" label="The Challenge" />
        <SectionHeading
          title="Peak-hour restaurant operations were slowing service."
          subtitle="Managing tables, processing orders, coordinating kitchens, and serving guests required staff to constantly switch between operational tasks. The lack of a unified workflow created delays, increased manual effort, and slowed service during busy hours."
          maxWidth={620}
        />

        <ScrollRevealSection items={CHALLENGES} images={CHALLENGE_IMAGES} />
      </section>

      {/* Section 04 — Operational Lifecycle */}
      <section style={{ background: "var(--sp-dew)", padding: "90px 8%" }}>
        <SectionEyebrow number="04" label="Operational Lifecycle" />
        <SectionHeading
          title="Understanding restaurant operations end to end."
          subtitle="Mapping the service journey helped identify operational bottlenecks from seating guests through order fulfillment and payment."
          maxWidth={620}
        />

        <LifecycleOverview steps={LIFECYCLE_STEPS} positions={LIFECYCLE_POSITIONS} />
      </section>

      {/* Section 05 — Research Insights */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(23,23,23,0.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage: "radial-gradient(circle at 8% 92%, black 0%, transparent 40%)",
          maskImage: "radial-gradient(circle at 8% 92%, black 0%, transparent 40%)",
        }} />

        <div style={{ position: "relative" }}>
          <SectionEyebrow number="05" label="Research Insights" />
          <SectionHeading
            title="Understanding how restaurant teams actually work."
            subtitle="The research focused on observing how servers, cashiers, managers, and kitchen staff collaborated during high-volume service periods."
            maxWidth={620}
            bold
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 220, maxWidth: 1160, margin: "40px auto 170px" }}>
            <InsightCard
              badge="Key Insight"
              title="Service Speed Drives Everything"
              desc="Small delays quickly cascade during peak hours."
            >
              <MockTable rows={4} />
              <Annotation label="Delays compound fast" pos="right" style={{ top: -30, left: "100%", marginLeft: 12 }} />
            </InsightCard>

            <InsightCard title="Tables Are Constantly Changing" desc="Staff need real-time visibility into occupancy and status.">
              <MockSelection />
              <Annotation label="Status changes by the minute" pos="top" style={{ top: -117, left: -110 }} />
            </InsightCard>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1160, margin: "-100px auto 76px" }}>
            <SmallInsightCard title="Kitchen Coordination Is Critical" desc="Fast communication between service and kitchen teams directly affects customer experience.">
              <MockAvatars />
              <Annotation label="Front of house to kitchen" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Managers Need Operational Visibility" desc="Restaurant managers monitor service, staffing, and order flow simultaneously.">
              <MockForm />
              <Annotation label="Three things at once" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Exceptions Are Common" desc="Split bills, table transfers, order edits, and cancellations happen continuously.">
              <MockTimeline />
              <Annotation label="The edge case is the norm" pos="top" style={{ top: -170, right: -4 }} />
            </SmallInsightCard>
          </div>

          <ResearchMethodsBar methods={RESEARCH_METHODS} />

          <div style={{ maxWidth: 1160, margin: "48px auto 0" }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, textTransform: "capitalize", marginBottom: 20 }}>
              What We Learned
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {LEARNED_INTERVIEWS.map((l) => <LearnedRow key={l.number} {...l} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Section 07 — The Solution */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="07" label="The Solution" />
        <SectionHeading
          title="Designing a faster restaurant operating system."
          subtitle="Rather than optimizing individual screens, the redesign focused on creating connected workflows that reduced manual effort and supported fast-paced restaurant operations."
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
          {SOLUTION_CARDS.map((s) => (
            <ScrollStackItem
              key={s.number}
              itemClassName="rounded-[24px] shadow-none bg-transparent p-0"
              style={{ height: "auto", padding: 0, borderRadius: 24, boxShadow: "none", background: "transparent" }}
            >
              <SolutionCard
                number={s.number}
                title={s.title}
                challenge={s.challenge}
                approach={s.approach}
                impact={s.impact}
              >
                <ScreenshotPlaceholder label={s.imageLabel} height={s.imageHeight} fit="cover" />
              </SolutionCard>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16, marginTop: 48 }}>
          {SOLUTION_PILLS.map((p) => <SolutionPill key={p.label} icon={p.icon} label={p.label} />)}
        </div>
      </section>

      {/* Section 08 — Ecosystem showcase (HeroParallax) */}
      <section style={{ background: "var(--sp-charcoal)" }}>
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
          headerEyebrowNumber="08"
          headerEyebrowLabel="Understanding the Ecosystem"
          headerEyebrowLabelColor="rgba(255,255,255,0.55)"
          headerTitleColor="#ffffff"
          headerSubtitleColor="rgba(255,255,255,0.75)"
          headerMaxWidth={768}
          rowCount={4}
          verticalOffsetPercent={-35}
        />
      </section>

      {/* Section 09 — Design System */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="09" label="Design System" />
        <SectionHeading
          title="Building better interfaces with design systems."
          subtitle="A scalable design language built for hospitality operations — color, typography, spacing, and components designed for consistency across every POS module."
          maxWidth={620}
        />

        <TiltMockup style={{
          position: "relative", maxWidth: 1040, margin: "0 auto 20px", background: "var(--sp-cream)", borderRadius: 12,
          border: "1.5px solid var(--sp-charcoal)", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", overflow: "hidden",
        }}>
          <ScreenshotPlaceholder label="Design system applied — POS component library mockup" height={666} fit="width" />
        </TiltMockup>

        <DesignSystemGrid />
      </section>

      {/* Section 10 — Impact */}
      <section style={{ background: "var(--sp-cream)", padding: "60px 8%" }}>
        <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 12, padding: "56px 48px 48px", maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.08em", color: "var(--sp-orange)", fontFamily: ff, marginBottom: 24 }}>
            10 — IMPACT
          </div>
          <h2 style={{
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading, textTransform: "capitalize",
            lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 16, maxWidth: 560,
          }}>
            Designed for faster restaurant operations.
          </h2>
          <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.6, maxWidth: 480, margin: "0 0 40px" }}>
            The redesigned POS streamlined restaurant workflows, helping teams manage tables, orders, and payments more efficiently during peak service.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {IMPACT_STATS.map((s) => (
              <ImpactCard key={s.number} number={s.number} value={s.value} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 11 — Lessons Learned */}
      <LessonsLearnedPremium
        sectionNumber="11"
        caseStudyLabel="Hotelogix POS Case Study"
        intro="Three pilot properties and a lot of hours on the service floor taught me what actually holds up under pressure. These six lessons now guide every product decision I make."
        lessons={LESSONS}
        quote={{
          text: <>The best POS disappears into the service.<br />Staff should think about the guest, not the screen.</>,
          attribution: "— Internal Design Principle",
        }}
        hero={{ src: "/assets/hotelogix/FRONTDESK.png", alt: "Hotelogix POS floor dashboard" }}
        kpis={LESSON_KPIS}
        networkNodes={LESSON_NODES}
        blueprintLabels={LESSON_BLUEPRINT}
      />
    </>
  );
}
