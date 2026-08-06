"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Project, KeyInsight } from "@/types";
import Tag from "@/components/ui/Tag";

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
      className="py-20 border-t border-white/5"
    >
      <div className="space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
            {label}
          </span>
          <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif" }}>{title}</h2>
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
    <div className="p-6 rounded-xl border border-white/8 bg-white/[0.02] space-y-2">
      <p className="fluid-text-2xl font-semibold text-white leading-none">{value}</p>
      <p className="text-sm font-medium text-zinc-300">{label}</p>
      <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
    </div>
  );
}

function InsightRow({ index, text }: { index: number; text: string }) {
  return (
    <div className="flex items-start gap-5 py-5 border-t border-white/5 first:border-0">
      <span className="text-xs font-mono text-zinc-700 mt-1 flex-shrink-0 w-5">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="text-[16px] text-zinc-300 leading-relaxed">{text}</p>
    </div>
  );
}

function KeyInsightRow({ index, insight }: { index: number; insight: KeyInsight }) {
  return (
    <div className="flex items-start gap-5 py-6 border-t border-white/5 first:border-0">
      <span className="text-xs font-mono text-zinc-700 mt-1.5 flex-shrink-0 w-5">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="space-y-2">
        <p className="text-[16px] font-medium text-white leading-snug">{insight.title}</p>
        <p className="text-[16px] text-zinc-500 leading-relaxed">{insight.description}</p>
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
        <div className="py-16 border-t border-white/5 space-y-5">
          {project.heroIntro.split("\n\n").map((para, i) => (
            <p key={i} className="text-[16px] text-zinc-400 leading-[1.85]">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* ── 2. Project Snapshot ── */}
      <Section label="At a Glance" title="Project Snapshot">
        {/* Top row — 3 primary fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/5">
          {[
            { label: "Role", value: project.role },
            { label: "Duration", value: project.timeline },
            { label: "Platform", value: project.platform ?? project.category },
          ].map(({ label, value }) => (
            <div key={label} className="py-2 pr-8 space-y-1.5">
              <p className="text-[14px] font-normal text-zinc-500 uppercase tracking-[0.12em]">
                {label}
              </p>
              <p className="text-[16px] leading-snug whitespace-pre-line" style={{ color: "lab(65.6464% 1.53494 -5.42429)" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Bottom row — secondary fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/5">
          {[
            { label: "Industry", value: project.industry },
            { label: "Company", value: getCompany(project.slug) },
            { label: "Users", value: project.users ?? project.team.join(", ") },
          ].map(({ label, value }) => (
            <div key={label} className="py-2 pr-8 space-y-1.5">
              <p className="text-[14px] font-normal text-zinc-500 uppercase tracking-[0.12em]">
                {label}
              </p>
              <p className="text-[17px] leading-snug" style={{ color: "lab(65.6464% 1.53494 -5.42429)" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Responsibilities row */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <div className="border-t border-white/5 py-2 space-y-3">
            <p className="text-[14px] font-normal text-zinc-500 uppercase tracking-[0.12em]">
              Responsibilities
            </p>
            <div className="flex flex-wrap gap-2">
              {project.responsibilities.map((r) => (
                <span
                  key={r}
                  className="px-3 py-1.5 rounded-full text-[14.3px] font-medium text-[#e8510a]"
                  style={{ border: "1px solid #e8510a", backgroundColor: "rgba(232, 81, 10, 0.15)" }}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y divide-white/5 lg:divide-y-0 lg:divide-x lg:divide-white/5">
          {/* Business */}
          <div className="lg:pr-10">
            <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.14em] mb-4">
              Business
            </p>
            <ul>
              {(project.businessChallenges ?? project.businessContext.challenges).map((item, i) => (
                <li key={i} className="flex items-start gap-5 py-4 border-t border-white/5 first:border-0">
                  <span className="text-[11px] font-mono text-zinc-600 mt-0.5 flex-shrink-0 w-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] leading-relaxed" style={{ color: "lab(65.6464% 1.53494 -5.42429)" }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* User */}
          <div className="lg:pl-10 pt-8 lg:pt-0">
            <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.14em] mb-4">
              User
            </p>
            <ul>
              {(project.userChallenges ?? project.businessContext.constraints).map((item, i) => (
                <li key={i} className="flex items-start gap-5 py-4 border-t border-white/5 first:border-0">
                  <span className="text-[11px] font-mono text-zinc-600 mt-0.5 flex-shrink-0 w-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] leading-relaxed" style={{ color: "lab(65.6464% 1.53494 -5.42429)" }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Problem Statement — editorial pull quote */}
        <div className="border-t border-white/5 pt-10">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.14em] mb-5">
            Problem Statement
          </p>
          <blockquote className="text-[22px] font-medium leading-relaxed italic text-center text-[#e8510a] w-full">
            &ldquo;{project.problemStatement}&rdquo;
          </blockquote>
        </div>
      </Section>

      {/* ── 4. Understanding the Problem ── */}
      <Section label="Discovery" title="Understanding the Problem">
        <div className="space-y-14">

          {/* Research Activities */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
              Research Activities
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.researchActivities ?? project.research.userInsights).map(
                (activity, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-[14px] text-zinc-600"
                    style={{ backgroundColor: "#ebebeb" }}
                  >
                    {activity}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Key Insights */}
          <div className="space-y-6">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
              Key Insights
            </h3>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
              {(project.keyInsights ?? project.research.userInsights.map((text) => ({ title: text, description: "" }))).map((insight, i) => (
                <div
                  key={i}
                  className="group relative min-h-[320px] flex flex-col justify-between p-6 rounded-3xl overflow-hidden cursor-default"
                  style={{ backgroundColor: "#ebebeb", boxShadow: "none" }}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(232,81,10,0.2) 0%, rgba(255,255,255,0) 100%)" }}
                    aria-hidden="true"
                  />

                  {/* Top: title + description */}
                  <div className="relative z-10 space-y-3">
                    <p className="text-[17px] font-semibold leading-snug text-zinc-800 group-hover:text-zinc-800 transition-colors duration-300">
                      {"title" in insight ? insight.title : String(insight)}
                    </p>
                    {"description" in insight && insight.description && (
                      <p className="text-[12.5px] leading-relaxed text-zinc-500 group-hover:text-zinc-600 transition-colors duration-300">
                        {insight.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom: index */}
                  <div className="relative z-10 mt-6">
                    <span className="text-[11px] font-medium text-zinc-400 group-hover:text-[#e8510a] transition-colors duration-300 uppercase tracking-widest">
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
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
              Business Success
            </h3>
            <ul className="space-y-4">
              {(project.businessSuccess ?? project.businessContext.goals).map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-3 w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                  <p className="text-[16px] text-zinc-400 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
              User Success
            </h3>
            <ul className="space-y-4">
              {(project.userSuccess ?? project.outcomes.learnings).map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-3 w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                  <p className="text-[16px] text-zinc-400 leading-relaxed">{item}</p>
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
              className="p-7 rounded-xl border border-white/6 bg-white/[0.015] space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-700 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-white">{principle.title}</h3>
              </div>
              <p className="text-[16px] text-zinc-500 leading-relaxed pl-7">
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
                className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6 lg:gap-10 py-10 border-t border-white/5 first:border-0"
              >
                <span className="text-xs font-mono text-zinc-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
                      Challenge
                    </p>
                    <p className="text-[16px] text-zinc-400 leading-relaxed">{step.challenge}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
                      Decision
                    </p>
                    <p className="text-[16px] text-zinc-300 leading-relaxed">{step.decision}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
                      Outcome
                    </p>
                    <p className="text-[16px] text-zinc-400 leading-relaxed">{step.outcome}</p>
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
              style={{ backgroundColor: "#ebebeb" }}
            >
              {/* Title at top */}
              <h3 className="text-[22px] font-semibold text-zinc-800 leading-snug" style={{ fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif" }}>
                {feature.title}
              </h3>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Orange tagline + description pinned to bottom */}
              <div className="space-y-3">
                <p className="text-[14px] font-semibold text-[#e8510a]">
                  {"tagline" in feature && feature.tagline ? feature.tagline : "A key part of the redesign."}
                </p>
                {"description" in feature && feature.description && (
                  <p className="text-[14px] leading-relaxed text-zinc-500">{feature.description}</p>
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
          <div className="p-6 rounded-xl border border-white/8 bg-white/[0.02] space-y-3">
            <h3 className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
              Business Impact
            </h3>
            <p className="text-[16px] text-zinc-300 leading-relaxed">
              {project.outcomes.businessImpact}
            </p>
          </div>
          <div className="p-6 rounded-xl border border-white/8 bg-white/[0.02] space-y-3">
            <h3 className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
              Learnings
            </h3>
            <ul className="space-y-3">
              {project.outcomes.learnings.map((learning, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-3 w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0" />
                  <p className="text-[16px] text-zinc-400 leading-relaxed">{learning}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 10. Reflection ── */}
      {project.reflection && project.reflection.length > 0 && (
        <Section label="Reflection" title="What This Project Taught Me">
          <div className="divide-y divide-white/5">
            {project.reflection.map((paragraph, i) => (
              <div key={i} className="grid grid-cols-[100px_1fr] items-center">
                {/* Large number */}
                <div className="flex items-center">
                  <span
                    className="font-bold leading-none select-none"
                    style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "#e8510a" }}
                  >
                    {i + 1}
                  </span>
                </div>
                {/* Text */}
                <div className="py-10 pr-4">
                  <p className="text-[16px] leading-[1.8]" style={{ color: "lab(65.6464% 1.53494 -5.42429)" }}>
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
            <div key={label} className="p-5 rounded-xl border border-white/6 bg-white/[0.02] space-y-2">
              <p className="text-xs font-medium text-zinc-600 uppercase tracking-widest">{label}</p>
              <p className="text-sm text-zinc-200 leading-snug">{value}</p>
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
          <p className="text-[16px] text-zinc-400 leading-relaxed">{project.overview}</p>
          <div className="p-6 rounded-xl border border-white/8 bg-white/[0.02]">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-widest mb-3">Problem Statement</p>
            <p className="text-[16px] text-zinc-300 leading-relaxed italic">
              &ldquo;{project.problemStatement}&rdquo;
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Challenges", items: project.businessContext.challenges, color: "text-zinc-300" },
            { title: "Constraints", items: project.businessContext.constraints, color: "text-zinc-400" },
          ].map(({ title, items, color }) => (
            <div key={title} className="p-6 rounded-xl border border-white/6 bg-white/[0.015] space-y-4">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">{title}</h3>
              <ul className="space-y-2.5">
                {items.map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${color}`}>
                    <span className="mt-3 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                    <p className="text-[16px] leading-relaxed">{item}</p>
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
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.research.userInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-white/6 bg-white/[0.02]">
                  <span className="text-xs font-mono text-zinc-700 mt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] text-zinc-300 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Pain Points</h3>
            <div className="flex flex-wrap gap-3">
              {project.research.painPoints.map((pain, i) => (
                <div key={i} className="px-4 py-3 rounded-lg border border-white/6 bg-white/[0.02] text-[16px] text-zinc-400">
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
            <div key={i} className="p-6 rounded-xl border border-white/8 bg-white/[0.02] flex items-start gap-4">
              <span className="text-xs font-mono text-zinc-700 mt-1 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[16px] text-zinc-300 leading-relaxed">{goal}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Principles" title="Design Principles">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {project.designPrinciples.map((principle, i) => (
            <div key={i} className="p-7 rounded-xl border border-white/6 bg-white/[0.015] space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-700 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-white">{principle.title}</h3>
              </div>
              <p className="text-[16px] text-zinc-500 leading-relaxed pl-7">{principle.description}</p>
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
            <div key={label} className="p-6 rounded-xl border border-white/6 bg-white/[0.015] space-y-3">
              <h3 className="text-sm font-semibold text-white">{label}</h3>
              <p className="text-[16px] text-zinc-500 leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-40 rounded-xl border border-white/6 bg-white/[0.01] flex items-center justify-center">
              <span className="text-xs text-zinc-800 font-mono">Design artifacts</span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Solution" title="The Solution">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <p className="text-[16px] text-zinc-400 leading-relaxed">{project.solution.description}</p>
            <ul className="space-y-3">
              {project.solution.keyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/[0.02]">
                  <span className="text-xs font-mono text-zinc-700 mt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] text-zinc-300 leading-relaxed">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-72 md:h-96 rounded-2xl border border-white/6 bg-zinc-950 flex items-center justify-center">
            <span className="text-xs text-zinc-800 font-mono tracking-widest uppercase">Final solution showcase</span>
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
            <div className="p-6 rounded-xl border border-white/8 bg-white/[0.02] space-y-3">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Business Impact</h3>
              <p className="text-[16px] text-zinc-300 leading-relaxed">{project.outcomes.businessImpact}</p>
            </div>
            <div className="p-6 rounded-xl border border-white/8 bg-white/[0.02] space-y-3">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Key Learnings</h3>
              <ul className="space-y-3">
                {project.outcomes.learnings.map((learning, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-3 w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0" />
                    <p className="text-[16px] text-zinc-400 leading-relaxed">{learning}</p>
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
