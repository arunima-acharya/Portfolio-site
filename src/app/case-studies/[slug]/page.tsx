import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import ProjectNavigation from "@/components/case-study/ProjectNavigation";
import OtherCaseStudies from "@/components/case-study/OtherCaseStudies";
import ContactCTA from "@/components/sections/ContactCTA";
import MenstaTemplate, { MenstaData } from "@/components/preview/MenstaTemplate";
import { pocketPmsData } from "@/data/pocketPmsData";
import { axiesRoomData } from "@/data/axiesRoomData";
import HotelogixFrontdeskPreview from "@/components/preview/HotelogixFrontdeskPreview";
import HotelogixCroPreview from "@/components/preview/HotelogixCroPreview";
import HotelogixPosPreview from "@/components/preview/HotelogixPosPreview";
import ContactMePreview from "@/components/preview/ContactMePreview";
import PositivityMentalHealthPreview from "@/components/preview/PositivityMentalHealthPreview";

const menstaTemplateData: Record<string, MenstaData> = {
  "pocket-pms": pocketPmsData,
  // AxisRooms uses the mobile-app template (phone mockups, app-store style
  // sections) rather than the desktop case-study preview.
  "axiesroom": axiesRoomData,
};

// Bespoke, hand-built previews that don't fit the generic MenstaData schema
// (pixel-specific layouts rather than a reusable template), keyed by slug.
const bespokePreviews: Record<string, ComponentType> = {
  "hotelogix-frontdesk": HotelogixFrontdeskPreview,
  "hotelogix-cro": HotelogixCroPreview,
  "hotelogix-pos": HotelogixPosPreview,
  "contact-me": ContactMePreview,
  "positivity-mental-health": PositivityMentalHealthPreview,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Research investigations live at /research/[slug].
  return projects.filter((p) => p.category !== "Research").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.category === "Research") return { title: "Not Found" };

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

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  // Research investigations moved to /research/[slug]; send old links there.
  if (project.category === "Research") permanentRedirect(`/research/${slug}`);

  const BespokePreview = bespokePreviews[slug];
  if (BespokePreview) {
    return (
      <>
        <BespokePreview />
        <OtherCaseStudies currentSlug={slug} />
      </>
    );
  }

  if (menstaTemplateData[slug]) {
    return <MenstaTemplate data={menstaTemplateData[slug]} slug={slug} />;
  }

  return (
    <>
      <CaseStudyHero project={project} />
      <div style={{ paddingLeft: "15%", paddingRight: "15%" }}>
        <CaseStudyContent project={project} />
        <ProjectNavigation
          prevSlug={project.prevProject}
          nextSlug={project.nextProject}
          backHref="/case-studies"
          backLabel="All projects"
        />
      </div>
      <OtherCaseStudies currentSlug={slug} />
      <ContactCTA />
    </>
  );
}
