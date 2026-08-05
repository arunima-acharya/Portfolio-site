export interface ToolIconSpec {
  name: string;
  slug: string;
  bg: string;
  color: string;
  border?: boolean;
}

// Same tool set/colors as the "toolkit" section (ToolsGrid.tsx).
export const TOOLKIT_TOOLS: ToolIconSpec[] = [
  { name: "Figma",   slug: "figma",   bg: "#1E1E1E", color: "#fff" },
  { name: "Framer",  slug: "framer",  bg: "#0A0A0A", color: "#fff" },
  { name: "Notion",  slug: "notion",  bg: "#fff",    color: "#111", border: true },
  { name: "Miro",    slug: "miro",    bg: "#FFD02F", color: "#111" },
  { name: "Jira",    slug: "jira",    bg: "#0052CC", color: "#fff" },
  { name: "HubSpot", slug: "hubspot", bg: "#FF7A59", color: "#fff" },
  { name: "Sketch",  slug: "sketch",  bg: "#F7B500", color: "#fff" },
  { name: "Maze",    slug: "maze",    bg: "#6C47FF", color: "#fff" },
  { name: "Zeplin",  slug: "zeplin",  bg: "#FDBD39", color: "#111" },
];

// Composite the colored square + centered icon as an SVG string with the
// icon embedded via <image href>, instead of loading the icon into a canvas
// and exporting with toDataURL(). The canvas route requires the remote host
// to send CORS headers for the export step to succeed, and cross-origin
// canvas export fails inconsistently across browsers (often silently, with
// no catchable error) — which is what produced garbled/wrong-looking trail
// cards. Embedding as SVG markup sidesteps canvas entirely: the browser just
// fetches and paints the icon URL the same way a plain <img> would.
function buildToolCardSVG(tool: ToolIconSpec): string {
  const size = 300;
  const radius = 48;
  const iconSize = size * 0.42;
  const iconOffset = (size - iconSize) / 2;
  const iconUrl = `https://cdn.simpleicons.org/${tool.slug}/${tool.color.replace("#", "")}`;
  const border = tool.border
    ? `<rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="${radius}" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="4"/>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${radius}" fill="${tool.bg}"/>
    ${border}
    <image href="${iconUrl}" x="${iconOffset}" y="${iconOffset}" width="${iconSize}" height="${iconSize}"/>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function getToolTrailImages(): string[] {
  return TOOLKIT_TOOLS.map(buildToolCardSVG);
}
