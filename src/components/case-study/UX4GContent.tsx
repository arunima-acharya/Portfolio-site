"use client";

import { Target, BookOpen, PenTool, Code2, CheckCircle2, TrendingUp } from "lucide-react";
import {
  Section,
  SubHeading,
  P,
  Bullets,
  Quote,
  Callout,
  StatRow,
  ClosingStatement,
  FrictionGroup,
  MatrixTable,
  MatrixRow,
  IconCardGrid,
  NumberedList,
  CompareCards,
  FlowSteps,
  PriorityBreakdown,
} from "./ResearchPrimitives";
import { useResearchPalette } from "./ResearchAccent";

export const UX4G_TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "objective", label: "Objective" },
  { id: "system-observations", label: "System Observations" },
  { id: "friction-audit", label: "Friction Audit" },
  { id: "enhancements", label: "Enhancements" },
  { id: "final-thought", label: "Final Thought" },
];

const ENHANCEMENTS: MatrixRow[] = [
  { num: 1, title: "Show Token Names in Figma", description: "Help developers map designs directly to code — instead of hex values and raw spacing — by surfacing semantic token names in the Figma kit.", impact: "Medium", effort: "High", priority: "High" },
  { num: 2, title: "Create an Official Annotation Kit", description: "Standardize how spacing, states, components, and responsive behavior are documented, giving designers and developers a shared communication layer.", impact: "Medium", effort: "High", priority: "High" },
  { num: 3, title: "Link Figma Components to Documentation", description: "Connect design and implementation directly, so teams can move between the two without hunting for the matching reference.", impact: "Low", effort: "High", priority: "High" },
  { num: 4, title: "Add a CSS Variables Reference Page", description: "Centralize tokens, variables, and component mappings in one place to make customization and implementation far less guesswork.", impact: "Low", effort: "High", priority: "High" },
  { num: 5, title: "Provide Responsive Figma Templates", description: "Ship pre-configured responsive frames and breakpoint templates to cut manual setup and keep layouts consistent across screen sizes.", impact: "Low", effort: "Medium", priority: "Medium", note: "Marked “coming soon” on the Figma Community file." },
  { num: 6, title: "Add “When to Use / Avoid” Guidelines", description: "Improve component decision-making and reduce inconsistent usage across different products and teams.", impact: "Low", effort: "Medium", priority: "Medium" },
  { num: 7, title: "Align Figma & Documentation Versions", description: "Prevent version mismatch issues between design and documentation, and make upgrades easier to reason about.", impact: "Low", effort: "Medium", priority: "Medium" },
  { num: 8, title: "Integrate Accessibility Into Component Docs", description: "Make accessibility part of the implementation workflow by documenting ARIA and WCAG guidance directly alongside each component.", impact: "High", effort: "Medium", priority: "Medium", note: "Present in the Figma file but not yet documented officially." },
  { num: 9, title: "Publish a Handoff Checklist", description: "Give teams a lightweight way to confirm a design is development-ready before handoff, cutting missing details and repeat clarification.", impact: "Very Low", effort: "Quick Win", priority: "Quick Win" },
];

export default function UX4GContent() {
  const p = useResearchPalette();
  return (
    <div>
      {/* 01 — Introduction */}
      <Section id="introduction" label="01" title="Introduction">
        <div className="space-y-8">
          <P>
            UX4G is a government-focused design system built to bring consistency, accessibility, and scalability across
            digital public platforms. The ecosystem spans a design framework, reusable UI components, documentation,
            design tokens, and a Figma library intended to support both designers and developers.
          </P>
          <P>
            This audit evaluates UX4G from a collaboration and implementation perspective — with a specific focus on
            the designer-to-developer handoff journey.
          </P>

          <StatRow
            items={[
              { value: "30+", label: "Reusable UI components" },
              { value: "2", label: "Disconnected entry points" },
              { value: "9", label: "Proposed enhancements" },
              { value: "3", label: "High-friction handoff gaps" },
            ]}
          />

          <IconCardGrid
            items={[
              {
                icon: Target,
                title: "This audit set out to understand",
                items: [
                  "How designers currently work within UX4G",
                  "How developers consume and implement designs",
                  "Where friction or ambiguity exists in that handoff",
                  "What improvements could close the implementation gap",
                ],
              },
              {
                icon: BookOpen,
                title: "Research was conducted across",
                items: [
                  "The UX4G website",
                  "The UX4G documentation portal",
                  "The UX4G Figma design library and component system",
                ],
              },
            ]}
          />
        </div>
      </Section>

      {/* 02 — Objective */}
      <Section id="objective" label="02" title="Objective">
        <NumberedList
          items={[
            "Evaluate the structure and usability of the UX4G design system",
            "Understand the current designer-to-developer workflow",
            "Identify friction points that surface during handoff",
            "Analyze gaps in implementation guidance",
            "Recommend improvements for a more scalable, efficient collaboration model",
          ]}
        />
      </Section>

      {/* 03 — System Observations */}
      <Section id="system-observations" label="03" title="System Observations">
        <div className="space-y-16">
          <div className="space-y-5">
            <SubHeading>03.1 &nbsp;Understanding the UX4G Ecosystem</SubHeading>
            <P>
              Before evaluating the handoff journey itself, I explored how UX4G is structured and how designers and
              developers actually interact with it day to day.
            </P>
            <Quote>Primary goal: create a consistent visual and interaction language across government digital services.</Quote>
            <div className="pt-1">
              <p className="text-sm font-medium mb-3" style={{ color: p.text }}>The ecosystem includes:</p>
              <Bullets
                items={[
                  "Design tokens",
                  "Layout grids",
                  "30+ reusable UI components",
                  "Accessibility support",
                  "CSS and JavaScript implementation layers",
                  "A Figma community library",
                ]}
              />
            </div>
            <P>
              Built on Bootstrap, UX4G gives developers a familiar implementation framework while helping designers
              stay consistent through reusable components. Structurally, it follows Brad Frost&apos;s Atomic Design
              principles, organizing the system into atoms (tokens like color, typography, and spacing), molecules
              (reusable components), and organisms (larger interface patterns).
            </P>
            <Quote>
              While the overall architecture is strong and scalable, the connection between design and implementation
              isn&apos;t always visible in the everyday workflow — which makes collaboration feel fragmented at certain
              stages.
            </Quote>
          </div>

          <div className="space-y-5">
            <SubHeading>03.2 &nbsp;The Two Users and Their Entry Points</SubHeading>
            <P>UX4G serves two distinct groups with two separate entry points — but no formal bridge between them.</P>
            <CompareCards
              connector="No formal bridge"
              cards={[
                {
                  icon: PenTool,
                  role: "Designer",
                  entry: "Entry point — Figma Community kit",
                  description: "Designs and assembles screens from the shared component library, then hands the work off through review calls and ad-hoc annotations.",
                },
                {
                  icon: Code2,
                  role: "Developer",
                  entry: "Entry point — Documentation portal",
                  description: "Rebuilds interfaces by inspecting Figma files and cross-referencing the docs, interpreting spacing and behavior manually along the way.",
                },
              ]}
            />
          </div>

          <div className="space-y-8">
            <SubHeading>03.3 &nbsp;Mapping the UX4G Handoff Journey</SubHeading>

            <div className="space-y-4">
              <p className="text-[16px] font-medium" style={{ color: p.text }}>The designer&apos;s handoff journey</p>
              <P>Designers currently begin their workflow by accessing the UX4G Figma Community kit.</P>
              <FlowSteps
                steps={["Opens Figma kit", "Designs components", "Manually explains behavior", "Review calls", "Implementation may drift"]}
              />
              <Bullets
                items={[
                  "Component variations are often designed without matching implementation guidance",
                  "Designers manually explain interactions, behaviors, and edge cases during handoff",
                  "Design decisions aren't consistently connected to documented development patterns",
                  "Missing documentation forces designers to create additional annotations or references",
                  "Designers rely on review calls and discussions to communicate intended behavior",
                  "There's no structured system to validate whether components are development-ready",
                  "Final implementation outcomes can end up differing from the original design intent",
                ]}
              />
            </div>

            <div className="space-y-4">
              <p className="text-[16px] font-medium" style={{ color: p.text }}>The developer&apos;s implementation journey</p>
              <P>
                Developers inspect the shared Figma files, reference the UX4G documentation portal, and rebuild
                interfaces using the available Bootstrap-based components.
              </P>
              <FlowSteps
                steps={["Inspects Figma files", "Cross-checks docs", "Interprets spacing manually", "Asks for clarification", "Builds workaround code"]}
              />
              <Bullets
                items={[
                  "Developers rely heavily on inspecting Figma files for implementation details",
                  "UX4G documentation doesn't always match the latest design patterns",
                  "Spacing, layouts, and component usage require manual interpretation",
                  "Developers frequently depend on designers for clarification during implementation",
                  "Custom code workarounds get added for undocumented or inconsistent components",
                  "Lack of structured handoff guidance creates inconsistencies in the final build",
                  "Repeated back-and-forth communication increases development time and effort",
                ]}
              />
            </div>

            <Quote>
              Although designers and developers work within the same UX4G ecosystem, the workflow between design and
              implementation still relies heavily on manual interpretation rather than structured guidance.
            </Quote>
          </div>

          <div className="space-y-5">
            <SubHeading>03.4 &nbsp;Personal Observation During Exploration</SubHeading>
            <P>
              While exploring UX4G, I noticed the system itself feels thoughtfully designed — but the handoff
              experience feels fragmented the moment the workflow moves beyond static UI components.
            </P>
            <P>
              As a designer, I found myself repeatedly switching between the Figma kit, the documentation portal, and
              implementation references just to understand how certain patterns were expected to behave. In several
              places I felt confident about the visual structure, but far less confident about how that structure
              would translate consistently into code without additional discussion.
            </P>
            <Callout label="Strongest insight">
              The challenge isn&apos;t a lack of components. It&apos;s the lack of a shared communication layer
              between design and development.
            </Callout>
          </div>
        </div>
      </Section>

      {/* 04 — Friction Audit */}
      <Section id="friction-audit" label="04" title="Friction Audit">
        <div className="space-y-12">
          <div className="space-y-5">
            <SubHeading>04.1 &nbsp;Where the Journey Breaks Down</SubHeading>
            <P>
              Based on a study of both ux4g.gov.in and doc.ux4g.gov.in, the friction points below mark the places where
              a developer is left to guess — or where a designer lacks the guidance to produce a truly implementable
              handoff.
            </P>
          </div>

          <FrictionGroup
            level="high"
            items={[
              {
                title: "Token names are invisible in Figma",
                body: "The Figma kit exposes visual values — hex codes, raw spacing — instead of semantic token names, forcing developers to manually map designs back to CSS variables.",
                example: ["Shown:  #1565C0  ·  16px spacing", "Should be:  color.primary.default  ·  spacing.4"],
                impact: ["Slower implementation workflow", "Inconsistent styling", "Heavier reliance on manual inspection"],
              },
              {
                title: "No annotation system",
                body: "There's no official annotation framework for communicating component names, spacing, responsiveness, or interaction behavior — so developers interpret designs independently.",
                example: [
                  "Component: Input / Search   ·   State: Focused",
                  "Spacing token: spacing.4",
                  "Responsive: Full-width below the md breakpoint",
                  "Accessibility: Keyboard focus visible",
                  "Docs: Linked implementation page",
                ],
                impact: ["More back-and-forth communication", "Divergent implementations across teams", "Reduced handoff clarity"],
              },
              {
                title: "Figma and documentation aren't connected",
                body: "Figma components and documentation pages exist in isolation, making it hard to navigate between design assets and implementation references.",
                impact: ["Slower navigation between design and code", "Heavier reliance on tribal knowledge", "More implementation inconsistency"],
              },
            ]}
          />

          <FrictionGroup
            level="medium"
            items={[
              {
                title: "Version mismatch risk",
                body: "The documentation and Figma kit appear to follow different versioning, with no clear mapping between the two — a gap that can quietly desync design and implementation.",
                impact: ["Inconsistent implementation behavior", "Confusion during upgrades", "Duplicated debugging effort"],
              },
              {
                title: "No responsive annotation guidance",
                body: "The system lacks standardized annotation guidance for responsive behavior, making it hard for designers to clearly communicate how layouts should adapt across screen sizes.",
                impact: ["Layout inconsistencies across breakpoints", "Slower responsive implementation", "More clarification requests"],
              },
              {
                title: "Responsive Figma templates are missing",
                body: "UX4G defines breakpoints from xs to xxl, but the Figma kit currently has no pre-configured responsive frames or layout templates — designers build responsive structure manually, and developers interpret breakpoint behavior on their own.",
                impact: ["Increased setup time", "Inconsistent layout structures", "More interpretation effort during development"],
              },
            ]}
          />

          <FrictionGroup
            level="low"
            items={[
              {
                title: "No CSS variable reference sheet",
                body: "There's no centralized page listing all UX4G CSS variables, token values, and component mappings — which makes theme customization harder than it needs to be.",
                impact: ["Slower onboarding", "Less customization clarity", "Repeated manual lookup"],
              },
              {
                title: "Accessibility notes are scattered",
                body: "Accessibility guidance is inconsistent across components — ARIA and keyboard behavior are documented in some places and simply missing in others.",
                impact: ["Accessibility implementation gaps", "Inconsistent keyboard behavior", "Extra QA effort"],
              },
            ]}
          />

          <div className="space-y-4 pt-4">
            <SubHeading>04.2 &nbsp;Possible Root Causes</SubHeading>
            <P>
              UX4G currently treats the designer workflow (the Figma kit) and the developer workflow (documentation
              and code) as two separate systems. There&apos;s limited infrastructure connecting them through:
            </P>
            <Bullets items={["Annotation standards", "Token mapping", "Interaction specifications", "Version alignment", "Handoff validation"]} />
            <P>
              Because of this, teams lean heavily on manual interpretation and direct communication to bridge the gap
              between design intent and implementation.
            </P>
          </div>
        </div>
      </Section>

      {/* 05 — Proposed Enhancements */}
      <Section id="enhancements" label="05" title="Proposed Enhancements & Priority Matrix">
        <div className="space-y-8">
          <PriorityBreakdown rows={ENHANCEMENTS} />
          <MatrixTable rows={ENHANCEMENTS} headings={{ first: "Enhancement" }} />
        </div>
      </Section>

      {/* 06 — Final Thought */}
      <Section id="final-thought" label="06" title="Final Thought">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-[16px] font-medium flex items-center gap-2.5" style={{ color: p.text }}>
              <CheckCircle2 size={17} className="text-emerald-500" />
              What UX4G does well
            </p>
            <P>
              UX4G has built a strong, scalable design system for government digital platforms. Its component
              quality, Bootstrap alignment, and accessibility groundwork give it a solid technical foundation — the
              ecosystem successfully delivers reusable UI components, documentation, design assets, and implementation
              support, establishing a consistent visual and technical language across products.
            </P>
          </div>

          <div className="space-y-4">
            <p className="text-[16px] font-medium flex items-center gap-2.5" style={{ color: p.text }}>
              <TrendingUp size={17} className="text-amber-500" />
              Where the biggest opportunity exists
            </p>
            <Quote>
              The biggest gap in UX4G isn&apos;t the components themselves — it&apos;s the workflow between designers
              and developers. Annotations, token visibility, documentation linking, and version management all lack
              structured support, leaving teams to rely on manual interpretation during handoff.
            </Quote>
            <P>Even a handful of the high-priority improvements above could meaningfully move:</P>
            <Bullets
              items={[
                "Collaboration efficiency",
                "Design-to-code consistency",
                "Developer onboarding",
                "Accessibility implementation",
                "Overall scalability",
              ]}
            />
          </div>

          <ClosingStatement>
            UX4G&apos;s biggest opportunity is evolving from a developer-focused component library into a truly
            shared design language for both designers and developers.
          </ClosingStatement>
        </div>
      </Section>
    </div>
  );
}
