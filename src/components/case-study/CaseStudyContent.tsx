"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Project, KeyInsight } from "@/types";
import Tag from "@/components/ui/Tag";

const ff = "var(--font-geist), sans-serif";
const ffHeading = "var(--font-gelica)";

/* ─── Shared primitives ─────────────────────────────────────────────── */

function Section({
  children,
  label,
  title,
}: {
  children: React.ReactNode;
  label: string;
  title: string;
}) {
  const { ref, isInView } = useScrollAnimation(0.06);
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-20"
      style={{ borderTop: "1.5px solid var(--sp-charcoal)" }}
    >
      <div className="space-y-10">
        <div className="space-y-2">
          <span className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
            {label}
          </span>
          <h2 className="text-2xl font-semibold" style={{ color: "var(--sp-cocoa)", fontFamily: ffHeading, fontWeight: 600, textTransform: "lowercase" }}>{title}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function MetricCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div
      className="p-6 rounded-xl space-y-2"
      style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)", boxShadow: "var(--shadow-lg)" }}
    >
      <p className="fluid-text-2xl font-semibold leading-none" style={{ color: "var(--sp-charcoal)" }}>{value}</p>
      <p className="text-[16px] font-medium" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{label}</p>
      <p className="text-[16px] leading-relaxed" style={{ color: "#8a8580", fontFamily: ff }}>{description}</p>
    </div>
  );
}

function InsightRow({ index, text }: { index: number; text: string }) {
  return (
    <div className="flex items-start gap-5 py-5" style={{ borderTop: "1px solid rgba(23,23,23,0.08)" }}>
      <span className="text-xs font-mono mt-1 flex-shrink-0 w-5" style={{ color: "#8a8580" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{text}</p>
    </div>
  );
}

function KeyInsightRow({ index, insight }: { index: number; insight: KeyInsight }) {
  return (
    <div className="flex items-start gap-5 py-6" style={{ borderTop: "1px solid rgba(23,23,23,0.08)" }}>
      <span className="text-xs font-mono mt-1.5 flex-shrink-0 w-5" style={{ color: "#8a8580" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="space-y-2">
        <p className="text-[16px] font-medium leading-snug" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{insight.title}</p>
        <p className="text-[16px] leading-relaxed" style={{ color: "#8a8580", fontFamily: ff }}>{insight.description}</p>
      </div>
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────────────────────── */

function getCompany(slug: string): string {
  if (slug.startsWith("hotelogix") || slug === "pocket-pms") return "Hotelogix";
  if (slug === "positivity-mental-health") return "Positivity";
  if (slug === "kalam-labs") return "Kalam Labs";
  return "—";
}

/* ─── Rich case study view ──────────────────────────────────────────── */

function RichCaseStudy({ project }: { project: Project }) {
  return (
    <>
      {/* ── Hero intro prose ── */}
      {project.heroIntro && (
        <div className="py-16 space-y-5" style={{ borderTop: "1.5px solid var(--sp-charcoal)" }}>
          {project.heroIntro.split("\n\n").map((para, i) => (
            <p key={i} className="text-[16px] leading-[1.85]" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>
              {para}
            </p>
          ))}
        </div>
      )}

      {/* ── 2. Project Snapshot ── */}
      <Section label="At a Glance" title="Project Snapshot">
        {/* Top row — 3 primary fields */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "1px solid rgba(23,23,23,0.08)" }}>
          {[
            { label: "Role", value: project.role },
            { label: "Duration", value: project.timeline },
            { label: "Platform", value: project.platform ?? project.category },
          ].map(({ label, value }) => (
            <div key={label} className="py-2 pr-8 space-y-1.5">
              <p className="text-[14px] font-normal" style={{ color: "#8a8580", fontFamily: ff }}>
                {label}
              </p>
              <p className="text-[16px] leading-snug whitespace-pre-line" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Bottom row — secondary fields */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "1px solid rgba(23,23,23,0.08)" }}>
          {[
            { label: "Industry", value: project.industry },
            { label: "Company", value: getCompany(project.slug) },
            { label: "Users", value: project.users ?? project.team.join(", ") },
          ].map(({ label, value }) => (
            <div key={label} className="py-2 pr-8 space-y-1.5">
              <p className="text-[14px] font-normal" style={{ color: "#8a8580", fontFamily: ff }}>
                {label}
              </p>
              <p className="text-[17px] leading-snug" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Responsibilities row */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <div className="py-2 space-y-3" style={{ borderTop: "1px solid rgba(23,23,23,0.08)" }}>
            <p className="text-[14px] font-normal" style={{ color: "#8a8580", fontFamily: ff }}>
              Responsibilities
            </p>
            <div className="flex flex-wrap gap-2">
              {project.responsibilities.map((r) => (
                <span
                  key={r}
                  className="px-3 py-1.5 rounded-full text-[14.3px] font-medium"
                  style={{ color: "var(--sp-orange)", border: "1px solid var(--sp-orange)", backgroundColor: "rgba(255,111,30,0.12)", fontFamily: ff }}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* ── 3. The Challenge ── */}
      <Section label="Challenge" title="The Challenge">
        {/* Two-column challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x" style={{ borderColor: "rgba(23,23,23,0.08)" }}>
          {/* Business */}
          <div className="lg:pr-10" style={{ borderBottom: "1px solid rgba(23,23,23,0.08)" }}>
            <p className="text-[11px] font-medium mb-4" style={{ color: "#8a8580", fontFamily: ff }}>
              Business
            </p>
            <ul>
              {(project.businessChallenges ?? project.businessContext.challenges).map((item, i) => (
                <li key={i} className="flex items-start gap-5 py-4" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(23,23,23,0.08)" }}>
                  <span className="text-[11px] font-mono mt-0.5 flex-shrink-0 w-4" style={{ color: "#8a8580" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* User */}
          <div className="lg:pl-10 pt-8 lg:pt-0">
            <p className="text-[11px] font-medium mb-4" style={{ color: "#8a8580", fontFamily: ff }}>
              User
            </p>
            <ul>
              {(project.userChallenges ?? project.businessContext.constraints).map((item, i) => (
                <li key={i} className="flex items-start gap-5 py-4" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(23,23,23,0.08)" }}>
                  <span className="text-[11px] font-mono mt-0.5 flex-shrink-0 w-4" style={{ color: "#8a8580" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Problem Statement — editorial pull quote */}
        <div className="pt-10" style={{ borderTop: "1px solid rgba(23,23,23,0.08)" }}>
          <p className="text-[11px] font-medium mb-5" style={{ color: "#8a8580", fontFamily: ff }}>
            Problem Statement
          </p>
          <blockquote className="text-[22px] font-medium leading-relaxed italic text-center w-full" style={{ color: "var(--sp-orange)", fontFamily: ffHeading }}>
            &ldquo;{project.problemStatement}&rdquo;
          </blockquote>
        </div>
      </Section>

      {/* ── 4. Understanding the Problem ── */}
      <Section label="Discovery" title="Understanding the Problem">
        <div className="space-y-14">

          {/* Research Activities */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
              Research Activities
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.researchActivities ?? project.research.userInsights).map(
                (activity, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-[14px]"
                    style={{ backgroundColor: "var(--sp-dew)", color: "var(--sp-charcoal)", fontFamily: ff }}
                  >
                    {activity}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Key Insights */}
          <div className="space-y-6">
            <h3 className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
              Key Insights
            </h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {(project.keyInsights ?? project.research.userInsights.map((text) => ({ title: text, description: "" }))).map((insight, i) => (
                <div
                  key={i}
                  className="group relative min-h-[320px] flex flex-col justify-between p-6 rounded-3xl overflow-hidden cursor-default"
                  style={{ backgroundColor: "var(--sp-dew)", boxShadow: "none" }}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(255,111,30,0.18) 0%, rgba(255,255,255,0) 100%)" }}
                    aria-hidden="true"
                  />

                  {/* Top: title + description */}
                  <div className="relative z-10 space-y-3">
                    <p className="text-[17px] font-semibold leading-snug transition-colors duration-300" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>
                      {"title" in insight ? insight.title : String(insight)}
                    </p>
                    {"description" in insight && insight.description && (
                      <p className="text-[16px] leading-relaxed transition-colors duration-300" style={{ color: "#8a8580", fontFamily: ff }}>
                        {insight.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom: index */}
                  <div className="relative z-10 mt-6">
                    <span className="text-[11px] font-medium transition-colors duration-300" style={{ color: "#8a8580", fontFamily: ff }}>
                      Insight {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* ── 5. Defining Success ── */}
      <Section label="Goals" title="Defining Success">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h3 className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
              Business Success
            </h3>
            <ul className="space-y-4">
              {(project.businessSuccess ?? project.businessContext.goals).map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-3 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--sp-orange)" }} />
                  <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <h3 className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
              User Success
            </h3>
            <ul className="space-y-4">
              {(project.userSuccess ?? project.outcomes.learnings).map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-3 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--sp-orange)" }} />
                  <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 6. Design Principles ── */}
      <Section label="Principles" title="Design Principles">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {project.designPrinciples.map((principle, i) => (
            <div
              key={i}
              className="p-7 rounded-xl space-y-3"
              style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono flex-shrink-0" style={{ color: "#8a8580" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-semibold" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{principle.title}</h3>
              </div>
              <p className="text-[16px] leading-relaxed pl-7" style={{ color: "#8a8580", fontFamily: ff }}>
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 7. How the Solution Evolved ── */}
      {project.solutionEvolution && project.solutionEvolution.length > 0 && (
        <Section label="Process" title="How the Solution Evolved">
          <div className="space-y-px">
            {project.solutionEvolution.map((step, i) => (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6 lg:gap-10 py-10"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(23,23,23,0.08)" }}
              >
                <span className="text-xs font-mono" style={{ color: "#8a8580" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
                      Challenge
                    </p>
                    <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{step.challenge}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
                      Decision
                    </p>
                    <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{step.decision}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
                      Outcome
                    </p>
                    <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{step.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── 8. The Solution ── */}
      <Section label="Solution" title="The Solution">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Empty first cell */}
          <div className="hidden md:block" />

          {(project.solutionFeatures ?? project.solution.keyFeatures.map((f) => ({
            title: f,
            tagline: "",
            description: "",
          }))).map((feature, i) => (
            <div
              key={i}
              className="flex flex-col p-8 rounded-2xl min-h-[420px]"
              style={{ backgroundColor: "var(--sp-dew)" }}
            >
              {/* Title at top */}
              <h3 className="text-[22px] font-semibold leading-snug" style={{ color: "var(--sp-charcoal)", fontFamily: ffHeading, fontWeight: 600, textTransform: "lowercase" }}>
                {feature.title}
              </h3>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Orange tagline + description pinned to bottom */}
              <div className="space-y-3">
                <p className="text-[14px] font-semibold" style={{ color: "var(--sp-orange)", fontFamily: ff }}>
                  {"tagline" in feature && feature.tagline ? feature.tagline : "A key part of the redesign."}
                </p>
                {"description" in feature && feature.description && (
                  <p className="text-[14px] leading-relaxed" style={{ color: "#8a8580", fontFamily: ff }}>{feature.description}</p>
                )}
              </div>
            </div>
          ))}

          {/* Empty last cell */}
          <div className="hidden md:block" />
        </div>
      </Section>

      {/* ── 9. Outcomes ── */}
      <Section label="Impact" title="Outcomes">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.outcomes.metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div className="p-6 rounded-xl space-y-3" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
            <h3 className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
              Business Impact
            </h3>
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>
              {project.outcomes.businessImpact}
            </p>
          </div>
          <div className="p-6 rounded-xl space-y-3" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
            <h3 className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>
              Learnings
            </h3>
            <ul className="space-y-3">
              {project.outcomes.learnings.map((learning, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-3 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--sp-orange)" }} />
                  <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{learning}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 10. Reflection ── */}
      {project.reflection && project.reflection.length > 0 && (
        <Section label="Reflection" title="What This Project Taught Me">
          <div>
            {project.reflection.map((paragraph, i) => (
              <div key={i} className="grid grid-cols-[100px_1fr] items-center" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(23,23,23,0.08)" }}>
                {/* Large number */}
                <div className="flex items-center">
                  <span
                    className="font-bold leading-none select-none"
                    style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "var(--sp-orange)", fontFamily: ffHeading }}
                  >
                    {i + 1}
                  </span>
                </div>
                {/* Text */}
                <div className="py-10 pr-4">
                  <p className="text-[16px] leading-[1.8]" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>
                    {paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

/* ─── Standard case study view (fallback for other projects) ────────── */

function StandardCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <Section label="At a Glance" title="Project Snapshot">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Timeline", value: project.timeline },
            { label: "My Role", value: project.role },
            { label: "Team", value: project.team.join(", ") },
            { label: "Industry", value: project.industry },
            { label: "Type", value: project.category },
          ].map(({ label, value }) => (
            <div key={label} className="p-5 rounded-xl space-y-2" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
              <p className="text-[16px] font-medium" style={{ color: "#8a8580", fontFamily: ff }}>{label}</p>
              <p className="text-[16px] leading-snug" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{value}</p>
            </div>
          ))}
        </div>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <Tag key={tag} variant="outline">{tag}</Tag>
            ))}
          </div>
        )}
      </Section>

      <Section label="Impact" title="Impact Metrics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {project.outcomes.metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </Section>

      <Section label="Challenge" title="The Challenge">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{project.overview}</p>
          <div className="p-6 rounded-xl" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
            <p className="text-[16px] font-medium mb-3" style={{ color: "#8a8580", fontFamily: ff }}>Problem Statement</p>
            <p className="text-[16px] leading-relaxed italic" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>
              &ldquo;{project.problemStatement}&rdquo;
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Challenges", items: project.businessContext.challenges },
            { title: "Constraints", items: project.businessContext.constraints },
          ].map(({ title, items }) => (
            <div key={title} className="p-6 rounded-xl space-y-4" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
              <h3 className="text-[16px] font-semibold" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{title}</h3>
              <ul className="space-y-2.5">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-3 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--sp-orange)" }} />
                    <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Discovery" title="Understanding the Problem">
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-[16px] font-semibold" style={{ color: "#8a8580", fontFamily: ff }}>Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.research.userInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
                  <span className="text-xs font-mono mt-1 flex-shrink-0" style={{ color: "#8a8580" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{insight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-[16px] font-semibold" style={{ color: "#8a8580", fontFamily: ff }}>Pain Points</h3>
            <div className="flex flex-wrap gap-3">
              {project.research.painPoints.map((pain, i) => (
                <div key={i} className="px-4 py-3 rounded-lg text-[16px]" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)", color: "var(--sp-charcoal)", fontFamily: ff }}>
                  {pain}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section label="Goals" title="Defining Success">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {project.businessContext.goals.map((goal, i) => (
            <div key={i} className="p-6 rounded-xl flex items-start gap-4" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
              <span className="text-xs font-mono mt-1 flex-shrink-0" style={{ color: "#8a8580" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{goal}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Principles" title="Design Principles">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {project.designPrinciples.map((principle, i) => (
            <div key={i} className="p-7 rounded-xl space-y-3" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono flex-shrink-0" style={{ color: "#8a8580" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-semibold" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{principle.title}</h3>
              </div>
              <p className="text-[16px] leading-relaxed pl-7" style={{ color: "#8a8580", fontFamily: ff }}>{principle.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Process" title="Exploration & Process">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Wireframes", content: project.designProcess.wireframes },
            { label: "Flows", content: project.designProcess.flows },
            { label: "Iterations", content: project.designProcess.iterations },
          ].map(({ label, content }) => (
            <div key={label} className="p-6 rounded-xl space-y-3" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
              <h3 className="text-[16px] font-semibold" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{label}</h3>
              <p className="text-[16px] leading-relaxed" style={{ color: "#8a8580", fontFamily: ff }}>{content}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-40 rounded-xl flex items-center justify-center" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-dew)" }}>
              <span className="text-xs font-mono" style={{ color: "#8a8580" }}>Design artifacts</span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Solution" title="The Solution">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{project.solution.description}</p>
            <ul className="space-y-3">
              {project.solution.keyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
                  <span className="text-xs font-mono mt-1 flex-shrink-0" style={{ color: "#8a8580" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-72 md:h-96 rounded-2xl flex items-center justify-center" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-dew)" }}>
            <span className="text-xs font-mono" style={{ color: "#8a8580" }}>Final solution showcase</span>
          </div>
        </div>
      </Section>

      <Section label="Outcomes" title="Outcomes & Reflection">
        <div className="space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {project.outcomes.metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl space-y-3" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
              <h3 className="text-[16px] font-semibold" style={{ color: "#8a8580", fontFamily: ff }}>Business Impact</h3>
              <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{project.outcomes.businessImpact}</p>
            </div>
            <div className="p-6 rounded-xl space-y-3" style={{ border: "1.5px solid var(--sp-charcoal)", background: "var(--sp-cream)" }}>
              <h3 className="text-[16px] font-semibold" style={{ color: "#8a8580", fontFamily: ff }}>Key Learnings</h3>
              <ul className="space-y-3">
                {project.outcomes.learnings.map((learning, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-3 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--sp-orange)" }} />
                    <p className="text-[16px] leading-relaxed" style={{ color: "var(--sp-charcoal)", fontFamily: ff }}>{learning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ─── Entry point ───────────────────────────────────────────────────── */

export default function CaseStudyContent({ project }: { project: Project }) {
  return (
    <div className="max-w-screen-xl mx-auto">
      <RichCaseStudy project={project} />
    </div>
  );
}
