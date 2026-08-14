import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import UX4GContent, { UX4G_TOC } from "@/components/case-study/UX4GContent";
import AIConversationUXContent, { AI_CONVERSATION_UX_TOC } from "@/components/case-study/AIConversationUXContent";
import ResearchHero from "@/components/case-study/ResearchHero";
import ReadingProgress from "@/components/case-study/ReadingProgress";
import { ResearchAccentProvider, ResearchLightProvider } from "@/components/case-study/ResearchAccent";
import { ResearchTOCRail, ResearchTOCBar, TOCItem } from "@/components/case-study/ResearchTOC";
import ProjectNavigation from "@/components/case-study/ProjectNavigation";
import OtherCaseStudies from "@/components/case-study/OtherCaseStudies";
import ContactCTA from "@/components/sections/ContactCTA";
import { RESEARCH_META } from "@/data/researchMeta";

// "Design Investigations" — block-style research write-ups, keyed by slug.
const researchContent: Record<string, ComponentType> = {
  "ux4g": UX4GContent,
  "ai-conversation-ux": AIConversationUXContent,
};

// Per-investigation extras layered on top of RESEARCH_META: a watermark
// index number, extra hero meta fields, and the TOC section list.
const researchExtras: Record<string, { index?: string; extraMeta?: { label: string; value: string }[]; toc: TOCItem[] }> = {
  "ux4g": {
    toc: UX4G_TOC,
  },
  "ai-conversation-ux": {
    index: "01",
    extraMeta: [{ label: "Products Studied", value: "ChatGPT · Claude · Gemini · Perplexity" }],
    toc: AI_CONVERSATION_UX_TOC,
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.filter((p) => p.category === "Research").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.category !== "Research") return { title: "Not Found" };

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Arunima Acharya`,
      description: project.shortDescription,
      type: "article",
    },
  };
}

export default async function ResearchArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.category !== "Research") notFound();

  const ResearchContent = researchContent[slug];
  if (!ResearchContent) notFound();

  const meta = RESEARCH_META[slug];
  const extras = researchExtras[slug];
  // Site is light-mode only — the dark editorial treatment (DARK_PALETTE in
  // ResearchAccent.tsx) is no longer reachable, regardless of a piece's own
  // `light` flag in researchMeta.ts.
  const isLight = true;

  return (
    <ResearchAccentProvider value={meta.accent}>
      <ResearchLightProvider value={isLight}>
        {/* Research pieces keep a fixed identity (light or dark)
            regardless of the site-wide theme toggle — otherwise text
            colors tuned for one background would go invisible when the
            rest of the site is toggled to the other. */}
        <div
          className={isLight ? "research-light" : "research-dark"}
          style={{ background: isLight ? "var(--color-cream-paper)" : "#0a0a0a", color: isLight ? "var(--color-charcoal)" : "#ffffff" }}
        >
          <ReadingProgress />
          <ResearchHero
            project={project}
            eyebrow={meta.eyebrow}
            index={extras.index}
            readTime={meta.readTime}
            extraMeta={extras.extraMeta}
          />
          <ResearchTOCRail items={extras.toc} />
          <div className="mx-auto px-6" style={{ maxWidth: 820 }}>
            <ResearchTOCBar items={extras.toc} />
            <ResearchContent />
            <ProjectNavigation
              prevSlug={project.prevProject}
              nextSlug={project.nextProject}
              backHref="/research"
              backLabel="All research"
            />
          </div>
        </div>
      </ResearchLightProvider>
      <OtherCaseStudies currentSlug={slug} />
      <ContactCTA />
    </ResearchAccentProvider>
  );
}
