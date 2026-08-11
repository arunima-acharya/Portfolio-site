"use client";

import {
  User, Users, Star, Clock,
  ExternalLink, Boxes, Sparkles,
  ClipboardList, FileText, Route, CreditCard, CheckCircle2, Filter,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { HeroParallax } from "@/components/ui/hero-parallax";
import {
  ff, ffHeading, SnapshotCard, SectionEyebrow, ScreenshotPlaceholder, moduleThumbnail, TiltMockup,
  SectionHeading, ScrollRevealSection, Annotation, InsightCard, SmallInsightCard,
  ResearchMethodsBar, MockTable, MockSelection, MockAvatars, MockForm, MockTimeline,
  SandboxCluster, type SandboxStatCard, SolutionStep, SolutionPill, DesignSystemGrid,
  ImpactCard,
  LifecycleOverview, type LifecycleStep, type LifecyclePosition, LearnedRow,
} from "@/components/preview/caseStudyKit";
import LessonsLearnedPremium, { type PremiumLesson } from "@/components/preview/LessonsLearnedPremium";

// ── Section 02 — At a Glance ─────────────────────────────────
const SANDBOX_LEFT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "200+", statLabel: <>Enterprise<br />Accounts</> },
  { value: "60%", delta: "↓", statLabel: <>Reduction in Group<br />Booking Time</> },
];
const SANDBOX_RIGHT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "20%", delta: "↑", statLabel: <>Improvement in<br />Booking Efficiency</> },
  { value: "AI", statLabel: <>Assisted Room<br />Allocation</> },
];

// ── Section 03 — The Challenge ───────────────────────────────
// Indexed and paired with a scroll-reveal trail (ScrollRevealSection) —
// same scroll-pinned, mockup-plus-reveal-card treatment as the Design
// Principles section, matching how the restaurant management (POS) template
// presents its Challenge section.
const CHALLENGES: Array<{ index: string; title: string; desc: string }> = [
  { index: "01", title: "Fragmented Booking Workflow", desc: "Reservation agents switched between multiple screens to manage availability, pricing, and guest details, making group bookings slow and difficult to coordinate." },
  { index: "02", title: "No Itinerary Booking Support", desc: "The system couldn't create or manage multi-property or multi-date itineraries, forcing teams to split a single guest journey into multiple reservations." },
  { index: "03", title: "Limited Inventory Visibility", desc: "Room availability across properties wasn't presented in a unified view, requiring manual comparisons before confirming reservations." },
  { index: "04", title: "Manual Room Allocation", desc: "Assigning rooms for large groups relied heavily on manual effort, increasing booking time and the risk of allocation errors." },
  { index: "05", title: "Inefficient Group Reservations", desc: "Corporate bookings involving multiple room types, guest preferences, and booking changes required repetitive actions across disconnected workflows." },
  { index: "06", title: "Poor Operational Scalability", desc: "As booking volumes increased, existing workflows became harder to manage, reducing productivity during peak reservation periods." },
];

// One "before" screenshot per challenge/scroll step. No legacy CRO
// screenshots exist yet, so these fall back to the generated placeholders —
// swap for real screenshots when they're available.
const CHALLENGE_IMAGES = CHALLENGES.map((c) => moduleThumbnail(c.title));

// ── Section 04 — Reservation Lifecycle Overview ──────────────
const LIFECYCLE_STEPS: LifecycleStep[] = [
  { icon: <Boxes size={20} strokeWidth={1.6} />, title: "Inventory" },
  { icon: <ClipboardList size={20} strokeWidth={1.6} />, title: "Booking Details" },
  { icon: <FileText size={20} strokeWidth={1.6} />, title: "Reservation Details" },
  { icon: <Route size={20} strokeWidth={1.6} />, title: "Itinerary Management" },
  { icon: <CreditCard size={20} strokeWidth={1.6} />, title: "Payments" },
  { icon: <CheckCircle2 size={20} strokeWidth={1.6} />, title: "Confirmation" },
];

// x as a fraction of the row width, plus a vertical level in px (0 = highest).
const LIFECYCLE_POSITIONS: LifecyclePosition[] = [
  { xFrac: 0.08, level: 0 },
  { xFrac: 0.26, level: 190 },
  { xFrac: 0.44, level: 20 },
  { xFrac: 0.62, level: 210 },
  { xFrac: 0.80, level: 40 },
  { xFrac: 0.94, level: 200 },
];

// ── Section 05 — Research Insights ───────────────────────────
const RESEARCH_METHODS: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> = [
  { label: "Stakeholder Interviews", value: "12+" },
  { label: "Workflow Analysis", value: "30+" },
  { label: "Modules Audited", value: "5" },
  { label: "Competitive Analysis", value: "6+ Products" },
  { label: "Cross-functional Workshops", value: "10+ Sessions", displayLabel: <>Cross-functional<br />Workshops</> },
];

const LEARNED_INTERVIEWS: Array<{ number: string; role: string; icon: React.ReactNode; quote: string; insight: string }> = [
  { number: "01", role: "Front Office Manager", icon: <User size={22} />, quote: "I know the rooms are available—I just spend too much time finding the right combination.", insight: "Availability wasn't the problem. Quickly identifying the best inventory for complex bookings was." },
  { number: "02", role: "Corporate Sales Team", icon: <Users size={22} />, quote: "One client booking often means coordinating multiple room types across different dates.", insight: "Enterprise reservations required flexible itinerary management instead of isolated bookings." },
  { number: "03", role: "Front Office Manager", icon: <User size={22} />, quote: "A small booking mistake creates problems for every team downstream.", insight: "Reservation accuracy directly affected front desk operations, room allocation, and the guest experience." },
];

// ── Section 06 — The Solution ────────────────────────────────
const SOLUTION_STEPS: Array<{ number: string; title: string; desc: string; reverse: boolean; imageLabel: string; imageHeight: number }> = [
  { number: "01", title: "Unified Reservation Dashboard", desc: "Centralized reservation insights, booking actions, operational metrics, and real-time inventory into a single workspace — cutting room lookup time by 35% and workflow steps by 30%.", reverse: false, imageLabel: "Unified reservation dashboard screenshot", imageHeight: 400 },
  { number: "02", title: "Reservation Details Workspace", desc: "Consolidated guest profiles, booking timelines, payments, and operational actions into one workspace, reducing context switching and speeding up booking decisions.", reverse: true, imageLabel: "Reservation details workspace screenshot", imageHeight: 400 },
  { number: "03", title: "Itinerary Management", desc: "Introduced itinerary management to organize multiple stays, room changes, and booking segments within a single reservation — simplifying complex itineraries and reducing manual booking effort.", reverse: false, imageLabel: "Itinerary management screenshot", imageHeight: 400 },
  { number: "04", title: "Advanced Filters & Bulk Operations", desc: "Added advanced filters and bulk actions for high-volume operations, cutting repetitive work and improving operational efficiency.", reverse: true, imageLabel: "Advanced filters and bulk operations screenshot", imageHeight: 400 },
  { number: "05", title: "AI-Assisted Room Allocation", desc: "An AI-assisted room recommendation system suggests optimal room assignments based on availability, occupancy, and guest preferences — for faster, more accurate allocation.", reverse: false, imageLabel: "AI-assisted room allocation screenshot", imageHeight: 400 },
];

const SOLUTION_PILLS = [
  { icon: <Boxes size={14} />, label: "Unified Dashboard" },
  { icon: <FileText size={14} />, label: "Reservation Workspace" },
  { icon: <Route size={14} />, label: "Itinerary Management" },
  { icon: <Filter size={14} />, label: "Advanced Filters" },
  { icon: <Sparkles size={14} />, label: "AI-Assisted Allocation" },
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
  { number: "01", value: "−60%", desc: "Reduction in group booking time" },
  { number: "02", value: "+20%", desc: "Improvement in booking efficiency" },
  { number: "03", value: "−35%", desc: "Reduction in room lookup time" },
  { number: "04", value: "−30%", desc: "Fewer workflow steps across the reservation lifecycle" },
];

// ── Section 10 — Lessons Learned ─────────────────────────────
// Reuses the same "premium" bento layout as the RMS (Frontdesk) template's
// Lessons Learned section, with CRO-specific copy passed in as props.
const CRO_LESSONS: PremiumLesson[] = [
  { title: "Consolidation is a design problem, not just an engineering one.", desc: "Merging three tools means inheriting three sets of user expectations and edge cases." },
  { title: "AI features live or die by trust.", desc: "A permutation engine only becomes useful once managers understand why a suggestion was made." },
  { title: "Visualise the decision, not the database.", desc: "The gap between how data is stored and how people think is where frustration lives." },
  { title: "Fragmentation feels normal to those inside it.", desc: "Revenue managers didn't call tool-switching a problem — they called it their job." },
  { title: "Migration is part of the product, not a footnote.", desc: "Revenue managers can't pause operations for a transition, so the path there needs as much design care as the destination." },
  { title: "Removing friction beats adding features.", desc: "The biggest wins came from eliminating context-switching, not from adding new functionality." },
];

const CRO_KPIS = [
  { label: "Active Bookings", value: "342", delta: "14%", positive: true },
  { label: "Group Requests", value: "56", delta: "9%", positive: true },
  { label: "Pricing Alerts", value: "12", delta: "3%", positive: false },
];

const CRO_NODES = [
  { title: "Revenue Management", sub: "Pricing Strategy" },
  { title: "Group Sales", sub: "Corporate Bookings" },
  { title: "Finance Team", sub: "Invoicing" },
  { title: "Support Team", sub: "Guest Requests" },
  { title: "Leadership", sub: "Reporting" },
];

const CRO_BLUEPRINT = [
  { top: "Revenue", bottom: "Operations" },
  { top: "Booking", bottom: "Experience" },
  { top: "Pricing", bottom: "Accuracy" },
  { top: "Migration", bottom: "Path" },
];

export default function HotelogixCroPreview() {
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
          Central Reservation Office
        </h1>

        <p style={{
          fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", lineHeight: 1.7,
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
                <ScreenshotPlaceholder label="Central Reservation Office dashboard" height={653} />
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
          Built from scratch at Hotelogix.
        </h2>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          A snapshot of the scope, team, and responsibilities behind building the Central Reservation Office from the ground up.
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
            My Responsibilities
          </h3>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 32px", margin: 0, padding: 0, listStyle: "none" }}>
            {[
              "Led the end-to-end design of the Central Reservation Office.",
              "Defined UX strategy, workflows, and information architecture.",
              "Partnered with Product, Engineering, and Customer Success.",
              "Built scalable design foundations for future product growth.",
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

        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, textAlign: "center", textTransform: "capitalize", marginBottom: 14,
        }}>
          Built for enterprise hotel operations.
        </h2>

        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", maxWidth: 480, margin: "0 auto 56px" }}>
          Supporting enterprise reservation workflows across hundreds of hotel groups with faster, AI-assisted booking experiences.
        </p>

        <SandboxCluster leftCards={SANDBOX_LEFT_CARDS} rightCards={SANDBOX_RIGHT_CARDS} />
      </section>

      {/* Section 03 — The Challenge */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="03" label="The Challenge" />
        <SectionHeading
          title="Managing enterprise reservations shouldn't feel fragmented."
          subtitle="Corporate travel managers relied on disconnected workflows to handle group bookings, inventory checks, and room allocation. The fragmented process slowed reservations, increased manual effort, and limited operational efficiency."
          maxWidth={620}
        />

        <ScrollRevealSection items={CHALLENGES} images={CHALLENGE_IMAGES} />
      </section>

      {/* Section 04 — Reservation Lifecycle Overview */}
      <section style={{ background: "var(--sp-dew)", padding: "90px 8%" }}>
        <SectionEyebrow number="04" label="Reservation Lifecycle Overview" />
        <SectionHeading
          title="Mapping the Enterprise Reservation Journey"
          subtitle="Before redesigning the experience, I mapped the complete reservation lifecycle to understand how reservation teams moved from inventory planning to booking confirmation. This helped identify workflow dependencies, operational bottlenecks, and opportunities to streamline the booking experience."
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
            title="Understanding how reservation teams actually work."
            subtitle="Beyond identifying product gaps, the research focused on understanding how reservation teams make decisions, collaborate, and manage high-volume bookings in fast-paced hospitality environments."
            maxWidth={620}
            bold
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 220, maxWidth: 1160, margin: "40px auto 170px" }}>
            <InsightCard
              badge="Key Insight"
              title="Decision-making is time sensitive."
              desc="Reservation agents often had only a few minutes to confirm availability and respond to corporate booking requests, making speed a critical success factor."
            >
              <MockTable rows={4} />
              <Annotation label="Minutes to confirm, not hours" pos="right" style={{ top: -30, left: "100%", marginLeft: 12 }} />
            </InsightCard>

            <InsightCard title="Booking is a collaborative process." desc="Large reservations involved coordination between reservation teams, revenue managers, sales teams, and front desk staff rather than a single user.">
              <MockSelection />
              <Annotation label="Never just one user" pos="top" style={{ top: -117, left: -110 }} />
            </InsightCard>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1160, margin: "-100px auto 76px" }}>
            <SmallInsightCard title="Every property operates differently." desc="Business rules, room inventories, pricing structures, and operational policies varied across hotel brands, requiring flexible workflows instead of rigid processes.">
              <MockAvatars />
              <Annotation label="Flexible, not rigid" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Exceptions were more common than standards." desc="Special requests, split stays, room upgrades, itinerary changes, and negotiated corporate rates meant reservation agents rarely followed a perfectly linear workflow.">
              <MockForm />
              <Annotation label="Rarely a linear workflow" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title="Confidence was more important than speed." desc="Reservation teams needed clear visibility into availability, pricing, and booking impact before confirming reservations, as mistakes could directly affect revenue and guest experience.">
              <MockTimeline />
              <Annotation label="Visibility before speed" pos="top" style={{ top: -170, right: -4 }} />
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

      {/* Section 06 — The Solution */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="06" label="The Solution" />
        <SectionHeading
          title="Reimagining enterprise reservations from the ground up."
          subtitle="Rather than improving isolated screens, the redesign focused on creating a connected reservation experience. Every solution was driven by operational research, simplifying complex workflows, reducing manual effort, and helping reservation teams complete high-volume bookings with greater speed and confidence."
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
              itemClassName="rounded-[12px] shadow-none bg-transparent p-0"
              style={{ height: "auto", padding: 0, borderRadius: 12, boxShadow: "none", background: "transparent" }}
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
      <section style={{ background: "var(--sp-charcoal)" }}>
        <HeroParallax
          products={CRO_MODULES}
          containerHeight="280vh"
          headerTitle="Revenue decisions don't happen in isolation"
          headerSubtitle="Before consolidating three tools into one, I mapped the complete revenue workflow — from pricing to permutations to account switching — to understand how information needed to flow across the platform."
          headerFontFamily={ffHeading}
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
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="08" label="Design System" />
        <SectionHeading
          title="Building better interfaces with design systems."
          subtitle="A scalable design language — color, typography, spacing, and components — built to keep booking, pricing, and permutation screens consistent across the platform."
          maxWidth={620}
        />

        <TiltMockup style={{
          position: "relative", maxWidth: 1040, margin: "0 auto 20px", background: "var(--sp-cream)", borderRadius: 12,
          border: "1.5px solid var(--sp-charcoal)", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 20px 0px", overflow: "hidden",
        }}>
          <ScreenshotPlaceholder label="Design system applied — component library mockup" height={666} fit="width" />
        </TiltMockup>

        <DesignSystemGrid />
      </section>

      {/* Section 09 — Impact */}
      <section style={{ background: "var(--sp-cream)", padding: "60px 8%" }}>
        <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: 12, padding: "56px 48px 48px", maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.08em", color: "var(--sp-orange)", fontFamily: ff, marginBottom: 24 }}>
            09 — IMPACT
          </div>
          <h2 style={{
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading,
            lineHeight: 1.2, textTransform: "capitalize", marginBottom: 16, maxWidth: 560,
          }}>
            Delivering measurable improvements to enterprise reservations.
          </h2>
          <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.6, maxWidth: 480, margin: "0 0 40px" }}>
            The redesigned Central Reservation Office streamlined complex booking workflows, reduced manual effort, and enabled reservation teams to manage enterprise bookings faster and more efficiently.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {IMPACT_STATS.map((s) => (
              <ImpactCard key={s.number} number={s.number} value={s.value} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 — Lessons Learned */}
      <LessonsLearnedPremium
        sectionNumber="10"
        caseStudyLabel="Hotelogix CRO Case Study"
        intro="Consolidating three fragmented tools into one connected platform taught me what enterprise consolidation actually demands. These six lessons now guide every product decision I make."
        lessons={CRO_LESSONS}
        quote={{
          text: <>Consolidation isn&apos;t subtraction.<br />It&apos;s redesigning how the pieces connect.</>,
          attribution: "— Internal Design Principle",
        }}
        hero={{ src: "/assets/hotelogix/GROUP RESERVATION-LAYOUT.png", alt: "Central Reservation Office dashboard" }}
        kpis={CRO_KPIS}
        networkNodes={CRO_NODES}
        blueprintLabels={CRO_BLUEPRINT}
      />
    </>
  );
}
