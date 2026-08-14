export interface ResearchMetaEntry {
  accent: string;
  eyebrow: string;
  readTime: string;
  /** Fixed light treatment instead of the default dark editorial one. */
  light?: boolean;
}

// Single source of truth for each investigation's accent color, eyebrow
// label, and reading time — shared by the /research listing cards and the
// research detail hero so the two never drift out of sync.
export const RESEARCH_META: Record<string, ResearchMetaEntry> = {
  "ux4g": {
    accent: "#ff6f1e",
    eyebrow: "Design Systems Audit",
    readTime: "6 min read",
    light: true,
  },
  "ai-conversation-ux": {
    accent: "#ff6f1e",
    eyebrow: "Design Investigation #01",
    readTime: "9 min read",
    light: true,
  },
};
