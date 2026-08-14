"use client";

// Placeholder content throughout (per explicit direction) — the underlying
// project data in contactMeData.ts is mostly Lorem-ipsum filler and
// mismatched copy carried over from the POS project, not a real case
// study, so this uses generic placeholder text rather than fabricating a
// narrative. Structure matches the shared pos/cro/frontdesk/axisrooms
// template exactly — swap the LOREM constants below for real content
// whenever it's available.

import {
  User, Users, Star, Clock,
  ExternalLink, Layers, ShieldCheck, Building2, TrendingUp,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { HeroParallax } from "@/components/ui/hero-parallax";
import {
  ff, ffHeading, SnapshotCard, SectionEyebrow, ScreenshotPlaceholder, TiltMockup,
  SectionHeading, ChallengeCard, Annotation, InsightCard, SmallInsightCard,
  ResearchMethodsBar, MockTable, MockSelection, MockAvatars, MockForm, MockTimeline,
  SandboxCluster, type SandboxStatCard, SolutionStep, SolutionPill, DesignSystemGrid,
  ImpactCard, LessonCard, EmptyLessonCard, type DesignPrinciple, DesignPrinciplesScroll,
  moduleThumbnail,
} from "@/components/case-study/caseStudyKit";

const LOREM_SHORT = "Lorem ipsum dolor sit amet consectetur adipiscing elit.";
const LOREM_MED = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";
const LOREM_LONG = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.";

// ── Section 02 — At a Glance ─────────────────────────────────
const SANDBOX_LEFT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "00%", statLabel: <>Lorem Ipsum<br />Dolor Sit</> },
  { value: "00%", delta: "↑", statLabel: <>Consectetur<br />Adipiscing</> },
];
const SANDBOX_RIGHT_CARDS: [SandboxStatCard, SandboxStatCard] = [
  { value: "00+", statLabel: <>Sed Do<br />Eiusmod</> },
  { value: "00%", delta: "↓", statLabel: <>Tempor<br />Incididunt</> },
];

// ── Section 03 — The Challenge ───────────────────────────────
const CHALLENGES = Array.from({ length: 6 }, (_, i) => ({
  title: `Lorem Ipsum Challenge ${i + 1}`,
  desc: LOREM_MED,
}));

// ── Section 04 — Research Insights ───────────────────────────
const RESEARCH_METHODS: Array<{ label: string; value: string; displayLabel?: React.ReactNode }> = [
  { label: "Lorem Ipsum Dolor", value: "00+" },
  { label: "Consectetur Adipiscing", value: "00+" },
  { label: "Sed Do Eiusmod", value: "0 Months" },
  { label: "Tempor Incididunt", value: "00+" },
  { label: "Ut Labore Dolore", value: "00+" },
];

// ── Section 05 — Design Principles ───────────────────────────
const PRINCIPLES: DesignPrinciple[] = [
  { index: "01", title: "Lorem Ipsum Dolor", desc: LOREM_MED },
  { index: "02", title: "Consectetur Adipiscing", desc: LOREM_MED },
  { index: "03", title: "Sed Do Eiusmod", desc: LOREM_MED },
  { index: "04", title: "Tempor Incididunt", desc: LOREM_MED },
];
const PRINCIPLE_IMAGES = PRINCIPLES.map((p) => moduleThumbnail(p.title));

// ── Section 06 — The Solution ────────────────────────────────
const SOLUTION_STEPS: Array<{ number: string; title: string; desc: string; reverse: boolean }> = [
  { number: "01", title: "Lorem Ipsum Dolor Sit", desc: LOREM_MED, reverse: false },
  { number: "02", title: "Consectetur Adipiscing Elit", desc: LOREM_MED, reverse: true },
  { number: "03", title: "Sed Do Eiusmod Tempor", desc: LOREM_MED, reverse: false },
];

const SOLUTION_PILLS = [
  { icon: <Building2 size={14} />, label: "Lorem Ipsum" },
  { icon: <Layers size={14} />, label: "Dolor Sit Amet" },
  { icon: <ShieldCheck size={14} />, label: "Consectetur" },
  { icon: <TrendingUp size={14} />, label: "Adipiscing Elit" },
];

// ── Section 07 — Ecosystem showcase (HeroParallax) ───────────
const MODULE_NAMES = Array.from({ length: 24 }, (_, i) => `Module ${i + 1}`);
const MODULES = MODULE_NAMES.map((title) => ({
  title,
  link: "#",
  thumbnail: moduleThumbnail(title),
}));

// ── Section 09 — Impact ──────────────────────────────────────
const IMPACT_STATS = [
  { number: "01", value: "00%", desc: LOREM_SHORT },
  { number: "02", value: "00%", desc: LOREM_SHORT },
  { number: "03", value: "00+", desc: LOREM_SHORT },
  { number: "04", value: "00+", desc: LOREM_SHORT },
];

// ── Section 10 — Lessons Learned ─────────────────────────────
const LESSONS = Array.from({ length: 6 }, (_, i) => ({
  number: String(i + 1).padStart(2, "0"),
  title: `Lorem ipsum dolor sit amet ${i + 1}.`,
  desc: LOREM_MED,
  iconSrc: `/assets/ICONS/RESERVATION/${i + 1}.svg`,
}));

const LESSON_GRID: (typeof LESSONS[number] | null)[] = [
  null, LESSONS[0], LESSONS[1],
  LESSONS[2], LESSONS[3], null,
  null, LESSONS[4], LESSONS[5],
];

export default function ContactMePreview() {
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
          Contact Me
        </h1>

        <p style={{
          fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", lineHeight: 1.7,
          margin: "0 auto 32px",
        }}>
          {LOREM_LONG}
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: ff, fontSize: 16, fontWeight: 500, color: "var(--sp-charcoal)", background: "var(--sp-cream)",
              border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-2xl-2)", padding: "13px 28px", cursor: "pointer",
              boxShadow: "var(--shadow-subtle)",
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
            background: "var(--sp-dew)", borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-lg)", overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ padding: "0 10px 10px" }}>
              <div style={{ background: "var(--sp-cream)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                <ScreenshotPlaceholder label="Dashboard screenshot" height={653} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Snapshot — sits right after the hero, no numbered eyebrow */}
      <section style={{ background: "var(--sp-cream)", padding: "60px 8% 90px" }}>
        <p style={{
          fontSize: 16, fontWeight: 400, color: "#8a8580", fontFamily: ff, textAlign: "center", marginBottom: 14,
        }}>
          Project Snapshot
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, textAlign: "center", textTransform: "capitalize", marginBottom: 14,
        }}>
          {LOREM_SHORT}
        </h2>
        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          {LOREM_MED}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--spacing-20)", maxWidth: 1040, margin: "0 auto" }}>
          <SnapshotCard icon={<User size={16} />} label="Role" value="Product Designer" />
          <SnapshotCard icon={<Clock size={16} />} label="Timeline" value="Lorem Ipsum" />
          <SnapshotCard icon={<Users size={16} />} label="Team" value="Lorem · Ipsum · Dolor" />
          <SnapshotCard icon={<Star size={16} />} label="Contribution" value="Lorem Ipsum · Dolor Sit · Amet Consectetur" />
        </div>
      </section>

      {/* Section 02 — At a Glance */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="02" label="At a Glance" />

        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 600, color: "var(--sp-cocoa)",
          fontFamily: ffHeading, textAlign: "center", textTransform: "capitalize", marginBottom: 14,
        }}>
          {LOREM_SHORT}
        </h2>

        <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, textAlign: "center", maxWidth: 480, margin: "0 auto 56px" }}>
          {LOREM_MED}
        </p>

        <SandboxCluster leftCards={SANDBOX_LEFT_CARDS} rightCards={SANDBOX_RIGHT_CARDS} />
      </section>

      {/* Section 03 — The Challenge */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%" }}>
        <SectionEyebrow number="03" label="The Challenge" />
        <SectionHeading
          title={LOREM_SHORT}
          subtitle={LOREM_LONG}
          maxWidth={620}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--spacing-20)", maxWidth: 1040, margin: "0 auto" }}>
          {CHALLENGES.map((c) => (
            <ChallengeCard key={c.title} title={c.title} desc={c.desc} />
          ))}
        </div>
      </section>

      {/* Section 04 — Research Insights */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8%", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(23,23,23,0.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage: "radial-gradient(circle at 8% 92%, black 0%, transparent 40%)",
          maskImage: "radial-gradient(circle at 8% 92%, black 0%, transparent 40%)",
        }} />

        <div style={{ position: "relative" }}>
          <SectionEyebrow number="04" label="Research Insights" />
          <SectionHeading
            title={LOREM_SHORT}
            subtitle={LOREM_LONG}
            maxWidth={620}
            bold
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 220, maxWidth: 1160, margin: "40px auto 170px" }}>
            <InsightCard badge="Key Insight" title={LOREM_SHORT} desc={LOREM_MED}>
              <MockTable rows={4} />
              <Annotation label="Lorem ipsum dolor" pos="right" style={{ top: -30, left: "100%", marginLeft: 12 }} />
            </InsightCard>

            <InsightCard title={LOREM_SHORT} desc={LOREM_MED}>
              <MockSelection />
              <Annotation label="Lorem ipsum dolor" pos="top" style={{ top: -117, left: -110 }} />
            </InsightCard>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--spacing-20)", maxWidth: 1160, margin: "-100px auto 76px" }}>
            <SmallInsightCard title={LOREM_SHORT} desc={LOREM_MED}>
              <MockAvatars />
              <Annotation label="Lorem ipsum" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title={LOREM_SHORT} desc={LOREM_MED}>
              <MockForm />
              <Annotation label="Lorem ipsum" pos="top" style={{ top: -170, right: 70 }} />
            </SmallInsightCard>

            <SmallInsightCard title={LOREM_SHORT} desc={LOREM_MED}>
              <MockTimeline />
              <Annotation label="Lorem ipsum" pos="top" style={{ top: -170, right: -4 }} />
            </SmallInsightCard>
          </div>

          <ResearchMethodsBar methods={RESEARCH_METHODS} />
        </div>
      </section>

      {/* Section 05 — Design Principles */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="05" label="Design Principles" />
        <SectionHeading
          title={LOREM_SHORT}
          subtitle={LOREM_LONG}
          maxWidth={620}
        />

        <DesignPrinciplesScroll principles={PRINCIPLES} images={PRINCIPLE_IMAGES} />
      </section>

      {/* Section 06 — The Solution */}
      <section style={{ background: "var(--sp-cream)", padding: "90px 8% 110px" }}>
        <SectionEyebrow number="06" label="The Solution" />
        <SectionHeading
          title={LOREM_SHORT}
          subtitle={LOREM_LONG}
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
                <ScreenshotPlaceholder label={s.title} height={400} fit="cover" />
              </SolutionStep>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "var(--spacing-16)", marginTop: 48 }}>
          {SOLUTION_PILLS.map((p) => <SolutionPill key={p.label} icon={p.icon} label={p.label} />)}
        </div>
      </section>

      {/* Section 07 — Ecosystem showcase (HeroParallax) */}
      <section style={{ background: "var(--sp-charcoal)" }}>
        <HeroParallax
          products={MODULES}
          containerHeight="280vh"
          headerTitle={LOREM_SHORT}
          headerSubtitle={LOREM_LONG}
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
          subtitle={LOREM_MED}
          maxWidth={620}
        />

        <TiltMockup style={{
          position: "relative", maxWidth: 1040, margin: "0 auto 20px", background: "var(--sp-cream)", borderRadius: "var(--radius-xl)",
          border: "1.5px solid var(--sp-charcoal)", boxShadow: "var(--shadow-lg)", overflow: "hidden",
        }}>
          <ScreenshotPlaceholder label="Design system applied — component library mockup" height={666} fit="width" />
        </TiltMockup>

        <DesignSystemGrid />
      </section>

      {/* Section 09 — Impact */}
      <section style={{ background: "var(--sp-cream)", padding: "60px 8%" }}>
        <div style={{ background: "var(--sp-dew)", border: "1.5px solid var(--sp-charcoal)", borderRadius: "var(--radius-xl)", padding: "56px 48px 48px", maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff, marginBottom: 24 }}>
            09 — IMPACT
          </div>
          <h2 style={{
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600, color: "var(--sp-cocoa)", fontFamily: ffHeading,
            lineHeight: 1.2, textTransform: "capitalize", marginBottom: "var(--spacing-16)", maxWidth: 560,
          }}>
            {LOREM_SHORT}
          </h2>
          <p style={{ fontSize: 16, color: "#8a8580", fontFamily: ff, lineHeight: 1.6, maxWidth: 480, margin: "0 0 40px" }}>
            {LOREM_MED}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {IMPACT_STATS.map((s) => (
              <ImpactCard key={s.number} number={s.number} value={s.value} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 — Lessons Learned */}
      <section style={{ background: "var(--sp-cream)", padding: "70px 8% 100px" }}>
        <div style={{ fontSize: 16, fontWeight: 400, color: "var(--sp-orange)", fontFamily: ff, marginBottom: "var(--spacing-32)", maxWidth: 1120, margin: "0 auto 32px" }}>
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
