import { Skill, Tool, ExperienceItem } from "@/types";

export const skills: Skill[] = [
  {
    id: "1",
    name: "Product Design",
    category: "Design",
    level: 95,
    description:
      "End-to-end product design from discovery to delivery, with a focus on human-centered outcomes.",
  },
  {
    id: "2",
    name: "UX Research",
    category: "Research",
    level: 88,
    description:
      "Qualitative and quantitative research methods to uncover user needs and validate design decisions.",
  },
  {
    id: "3",
    name: "Design Systems",
    category: "Design",
    level: 92,
    description:
      "Building scalable component libraries and design tokens that align design and engineering.",
  },
  {
    id: "4",
    name: "Interaction Design",
    category: "Design",
    level: 90,
    description:
      "Crafting micro-interactions and motion design that enhance usability and delight.",
  },
  {
    id: "5",
    name: "Prototyping",
    category: "Technical",
    level: 87,
    description:
      "High-fidelity interactive prototypes that closely simulate the final product experience.",
  },
  {
    id: "6",
    name: "User Testing",
    category: "Research",
    level: 85,
    description:
      "Moderated and unmoderated testing protocols with synthesis frameworks that drive decisions.",
  },
  {
    id: "7",
    name: "Design Strategy",
    category: "Strategy",
    level: 83,
    description:
      "Aligning design direction with business goals, user needs, and technical constraints.",
  },
  {
    id: "8",
    name: "Visual Design",
    category: "Design",
    level: 91,
    description:
      "Typography, color, composition, and visual hierarchy at the highest level of craft.",
  },
  {
    id: "9",
    name: "Information Architecture",
    category: "Design",
    level: 86,
    description:
      "Structuring information and navigation so users always know where they are and where to go.",
  },
  {
    id: "10",
    name: "Stakeholder Communication",
    category: "Soft Skills",
    level: 89,
    description:
      "Presenting design work, building consensus, and influencing product direction at all levels.",
  },
];

export const tools: Tool[] = [
  { id: "1", name: "Figma", icon: "figma", category: "Design" },
  { id: "2", name: "Framer", icon: "framer", category: "Prototyping" },
  { id: "3", name: "Adobe CC", icon: "adobe", category: "Design" },
  { id: "4", name: "Miro", icon: "miro", category: "Collaboration" },
  { id: "5", name: "Notion", icon: "notion", category: "Documentation" },
  { id: "6", name: "Linear", icon: "linear", category: "Project Management" },
  { id: "7", name: "Maze", icon: "maze", category: "Research" },
  { id: "8", name: "Loom", icon: "loom", category: "Communication" },
  { id: "9", name: "Webflow", icon: "webflow", category: "Development" },
  { id: "10", name: "Principle", icon: "principle", category: "Prototyping" },
];

export const experience: ExperienceItem[] = [
  {
    id: "1",
    company: "FinFlow Inc.",
    role: "Lead Product Designer",
    period: "Jan 2024 – Present",
    description:
      "Leading design for the flagship mobile banking application serving 1.2M users. Responsible for design strategy, team leadership, and cross-functional alignment.",
    achievements: [
      "Led redesign that increased DAU by 52%",
      "Built and managed a team of 3 junior designers",
      "Established design review process adopted across 4 product teams",
      "Reduced design-to-dev cycle from 6 to 2.5 weeks",
    ],
    current: true,
  },
  {
    id: "2",
    company: "Nexus Systems",
    role: "Design Systems Lead",
    period: "Mar 2023 – Dec 2023",
    description:
      "Founded and led the first design systems function at a 500-person SaaS company, building infrastructure that unified 40 products across 8 acquired companies.",
    achievements: [
      "Created Nexus Design System used by 40 products",
      "Saved $1.8M in duplicated design and engineering work",
      "Contributed to company's successful Series B fundraise",
      "Mentored 4 designers in systems thinking",
    ],
  },
  {
    id: "3",
    company: "Oasis Health",
    role: "Senior Product Designer",
    period: "Aug 2023 – Nov 2023",
    description:
      "Core design team member for a health tech startup's complete product build. Focused on trauma-informed design and community platform design.",
    achievements: [
      "Helped achieve 4.9★ App Store rating",
      "Designed crisis escalation flows reviewed by clinical board",
      "Platform featured as Apple App of the Day",
      "127K MAU achieved 6 months post-launch",
    ],
  },
  {
    id: "4",
    company: "Scale Commerce",
    role: "Product Designer",
    period: "Jan 2022 – Jul 2023",
    description:
      "Owned design for the merchant analytics dashboard and tooling. First designer hire — built design culture and process from scratch.",
    achievements: [
      "Reduced merchant time-to-insight from 47min to 4min",
      "Drove NPS improvement from 32 to 61",
      "Built first design system from scratch",
      "Interviewed and hired 2 additional designers",
    ],
  },
  {
    id: "5",
    company: "Studio Koto",
    role: "UX Designer",
    period: "Jun 2020 – Dec 2021",
    description:
      "Agency experience across brand identity, digital product design, and design strategy for clients ranging from startups to Fortune 500 companies.",
    achievements: [
      "Worked on 12+ client projects across 6 industries",
      "Contributed to award-winning Figma plugin design",
      "Ran first user research program for agency clients",
      "Presented at 2 design conferences",
    ],
  },
];
