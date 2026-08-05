"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, projectHref } from "@/data/projects";
import { useResearchPalette } from "./ResearchAccent";

interface ProjectNavigationProps {
  prevSlug?: string;
  nextSlug?: string;
  backHref?: string;
  backLabel?: string;
}

export default function ProjectNavigation({ prevSlug, nextSlug, backHref = "/case-studies", backLabel = "All projects" }: ProjectNavigationProps) {
  const prevProject = prevSlug ? getProjectBySlug(prevSlug) : null;
  const nextProject = nextSlug ? getProjectBySlug(nextSlug) : null;
  // Defaults to the dark palette outside a ResearchLightProvider, so this
  // has no effect on regular case-study pages or dark research pieces.
  const p = useResearchPalette();

  if (!prevProject && !nextProject) return null;

  function handleEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const circle = e.currentTarget.querySelector<HTMLElement>("[data-nav-circle]");
    const icon = e.currentTarget.querySelector<HTMLElement>("[data-nav-icon]");
    const title = e.currentTarget.querySelector<HTMLElement>("[data-nav-title]");
    if (circle) circle.style.borderColor = p.cardBorderStrong;
    if (icon) icon.style.color = p.hoverText;
    if (title) title.style.color = p.hoverText;
  }
  function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    const circle = e.currentTarget.querySelector<HTMLElement>("[data-nav-circle]");
    const icon = e.currentTarget.querySelector<HTMLElement>("[data-nav-icon]");
    const title = e.currentTarget.querySelector<HTMLElement>("[data-nav-title]");
    if (circle) circle.style.borderColor = p.cardBorder;
    if (icon) icon.style.color = p.textMuted;
    if (title) title.style.color = p.textBody;
  }

  return (
    <nav
      className="py-16 px-6"
      style={{ borderTop: `1px solid ${p.border}` }}
      aria-label="Case study navigation"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-8">
        {prevProject ? (
          <Link
            href={projectHref(prevProject)}
            className="group flex items-center gap-4 max-w-xs"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              data-nav-circle
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ border: `1px solid ${p.cardBorder}` }}
            >
              <ArrowLeft
                data-nav-icon
                size={16}
                className="transition-colors"
                style={{ color: p.textMuted }}
              />
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: p.textFaint }}>Previous</p>
              <p
                data-nav-title
                className="text-sm font-medium transition-colors line-clamp-1"
                style={{ color: p.textBody }}
              >
                {prevProject.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={backHref}
          className="text-xs transition-colors hidden sm:block"
          style={{ color: p.textFaint }}
        >
          {backLabel}
        </Link>

        {nextProject ? (
          <Link
            href={projectHref(nextProject)}
            className="group flex items-center gap-4 max-w-xs text-right"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div>
              <p className="text-xs mb-0.5" style={{ color: p.textFaint }}>Next</p>
              <p
                data-nav-title
                className="text-sm font-medium transition-colors line-clamp-1"
                style={{ color: p.textBody }}
              >
                {nextProject.title}
              </p>
            </div>
            <div
              data-nav-circle
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ border: `1px solid ${p.cardBorder}` }}
            >
              <ArrowRight
                data-nav-icon
                size={16}
                className="transition-colors"
                style={{ color: p.textMuted }}
              />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
