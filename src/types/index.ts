export interface Project {
  id: string;
  slug: string;
  title: string;
  industry: string;
  category: ProjectCategory;
  shortDescription: string;
  overview: string;
  timeline: string;
  role: string;
  team: string[];
  coverImage: string;
  images: string[];
  tags: string[];
  tools?: string[];
  featured: boolean;
  problemStatement: string;
  businessContext: BusinessContext;
  research: Research;
  designProcess: DesignProcess;
  solution: Solution;
  designSystem: DesignSystemDetails;
  designPrinciples: DesignPrinciple[];
  outcomes: Outcomes;

  // Rich case study fields (optional — used for flagship projects)
  valueProposition?: string;
  heroIntro?: string;
  platform?: string;
  users?: string;
  responsibilities?: string[];
  businessChallenges?: string[];
  userChallenges?: string[];
  researchActivities?: string[];
  keyInsights?: KeyInsight[];
  businessSuccess?: string[];
  userSuccess?: string[];
  solutionEvolution?: SolutionEvolutionStep[];
  solutionFeatures?: SolutionFeature[];
  reflection?: string[];
  nextProject?: string;
  prevProject?: string;
}

export type ProjectCategory =
  | "Product Design"
  | "UX Research"
  | "Design System"
  | "Mobile App"
  | "SaaS"
  | "E-commerce"
  | "Enterprise UX"
  | "Web Design"
  | "Research";

export interface BusinessContext {
  goals: string[];
  challenges: string[];
  constraints: string[];
}

export interface Research {
  userInsights: string[];
  personas: Persona[];
  painPoints: string[];
}

export interface Persona {
  name: string;
  role: string;
  age: number;
  description: string;
  goals: string[];
  frustrations: string[];
}

export interface DesignProcess {
  wireframes: string;
  flows: string;
  iterations: string;
}

export interface DesignPrinciple {
  title: string;
  description: string;
}

export interface KeyInsight {
  title: string;
  description: string;
}

export interface SolutionEvolutionStep {
  challenge: string;
  decision: string;
  outcome: string;
}

export interface SolutionFeature {
  title: string;
  tagline?: string;
  description: string;
  bullets?: string[];
}

export interface Solution {
  description: string;
  keyFeatures: string[];
}

export interface DesignSystemDetails {
  colors: ColorToken[];
  typography: TypographyToken[];
  components: string[];
}

export interface ColorToken {
  name: string;
  hex: string;
  usage: string;
}

export interface TypographyToken {
  name: string;
  size: string;
  weight: string;
  usage: string;
}

export interface Outcomes {
  metrics: Metric[];
  businessImpact: string;
  learnings: string[];
}

export interface Metric {
  label: string;
  value: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  description: string;
}

export type SkillCategory =
  | "Design"
  | "Research"
  | "Strategy"
  | "Technical"
  | "Soft Skills";

export interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
