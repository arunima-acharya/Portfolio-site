import { MenstaData } from "@/components/preview/MenstaTemplate";

export const axiesRoomData: MenstaData = {
  appName: "AxisRooms",
  accentColor: "#26B898",

  screenshots: [
    "/assets/axisrooms/Frame 1171275175.png",
    "/assets/axisrooms/Frame 1171275176.png",
    "/assets/axisrooms/Frame 1171275177.png",
    "/assets/axisrooms/Frame 1171275178.png",
    "/assets/axisrooms/Frame 1171275179.png",
    "/assets/axisrooms/Frame 1171275180.png",
    "/assets/axisrooms/Frame 1171275181.png",
    "/assets/axisrooms/Frame 1171275182.png",
    "/assets/axisrooms/Frame 1171275183.png",
    "/assets/axisrooms/Frame 1171275184.png",
    "/assets/axisrooms/Frame 1171275185.png",
    "/assets/axisrooms/Frame 1171275186.png",
    "/assets/axisrooms/Frame 1171275187.png",
    "/assets/axisrooms/Frame 1171275190.png",
    "/assets/axisrooms/Frame 1171275191.png",
    "/assets/axisrooms/Frame 1171275192.png",
    "/assets/axisrooms/Frame 1171275193.png",
    "/assets/axisrooms/Frame 1171275194.png",
    "/assets/axisrooms/Frame 1171275195.png",
    "/assets/axisrooms/Frame 1171275196.png",
    "/assets/axisrooms/Frame 1171275197.png",
    "/assets/axisrooms/Frame 1171275198.png",
    "/assets/axisrooms/Frame 1171275199.png",
    "/assets/axisrooms/Frame 1171275200.png",
    "/assets/axisrooms/Frame 1171275209.png",
  ],

  hero: {
    badge: "Channel Manager",
    heading: "Untangling enterprise workflows for faster hotel operations.",
    subtext: "AxisRooms simplifies years of accumulated complexity by streamlining navigation, reducing workflow friction, and helping hotel teams manage revenue and distribution with confidence from anywhere.",
    cta1: "View Case Study",
    cta2: "See the Redesign",
  },

  snapshot: {
    role: "Product\nDesigner",
    timeline: "2024",
    team: "Product · Engineering · QA",
    contribution: "UX Strategy · Interaction\nDesign · Design System ·\nDeveloper Handoff",
  },

  trusted: {
    text: "Built for enterprise hotel teams",
    logos: ["Enterprise Hospitality", "iOS & Android", "Workflow Simplification", "Information Architecture", "UI Modernization"],
  },

  uxAudit: {
    eyebrow: "Before Designing",
    heading: ["We audited", "the product."],
    paragraphs: [
      "Instead of jumping into redesigns, we mapped how users actually completed their everyday tasks.",
      "The audit uncovered years of accumulated complexity caused by duplicate navigation, inconsistent information architecture, and deeply nested workflows that slowed down everyday operations.",
    ],
    annotations: [
      { title: "Duplicate Entry Points", desc: "Inventory is accessible from multiple places, creating confusion and extra effort." },
      { title: "Nested Navigation", desc: "Important actions are buried under 4–5 menu levels." },
      { title: "Inconsistent Grouping", desc: "Related actions are scattered across unrelated sections instead of being grouped logically." },
      { title: "Visual Inconsistency", desc: "Similar actions use different layouts, labels, and patterns across the app." },
    ],
  },

  opportunity: {
    eyebrow: "The Opportunity",
    heading: "There's a better way to run hotel operations.",
    subtext: "Enterprise software shouldn't make users remember where features live. By simplifying navigation and surfacing the most important actions, the experience becomes faster, more predictable, and significantly easier to learn. Instead of adding new capabilities, the opportunity was to make existing ones effortless.",
    cards: [
      { icon: "🧭", title: "Fragmented navigation", desc: "Years of feature additions left users guessing which path led to the task they needed." },
      { icon: "🔁", title: "Repeated destinations", desc: "The same task could be reached through multiple, inconsistent routes." },
      { icon: "🧩", title: "Overlapping functionality", desc: "Similar actions lived under different menus depending on where users started." },
      { icon: "📚", title: "Steep learning curve", desc: "New users struggled to build a mental model of how the product was organized." },
      { icon: "⏱", title: "Slower operations", desc: "Every extra step to find a feature cost hotel teams real operational time." },
    ],
  },

  informationArchitecture: {
    eyebrow: "Information Architecture",
    heading: "Rebuilding the product's mental model.",
    subtext: "Rather than redesigning isolated screens, we restructured how the application was organized. Related actions were grouped together, duplicate entry points were removed, and navigation was rebuilt around user goals instead of product modules.",
    before: ["Inventory", "Rates", "Reservations", "Reports", "Notifications", "Settings"],
    after: ["Operations", "Revenue", "Reservations", "Account"],
  },

  approach: {
    eyebrow: "My Approach",
    heading: "Designing workflows—not screens.",
    description: [
      "The redesign focused on making operational tasks easier to complete rather than making individual screens look better.",
      "Every decision was guided by three questions: Can users find it? Can they understand it? Can they complete it quickly?",
    ],
    principles: [
      { number: "01", title: "One clear path", desc: "Every task was rebuilt to have a single, predictable route instead of several overlapping ones." },
      { number: "02", title: "Reduce cognitive load", desc: "Grouping related actions together meant users no longer had to remember where features lived." },
      { number: "03", title: "Action-first", desc: "The most common actions were surfaced immediately instead of buried behind menus." },
      { number: "04", title: "Consistency", desc: "The same terminology and interaction patterns were used everywhere in the product." },
    ],
  },

  workflowTransformation: {
    eyebrow: "Workflow Transformation",
    heading: "From seven paths to one.",
    description: [
      "One of the most common issues across the product was duplicated navigation. For example, Inventory could be accessed from several different menus depending on where users started.",
      "Although flexible, these overlapping paths created uncertainty and slowed down everyday operations. We consolidated workflows into a single, predictable path while keeping the same functionality intact.",
    ],
    before: {
      label: "BEFORE",
      items: ["Multiple entry points", "Nested navigation", "Repeated actions", "Hidden functionality", "Inconsistent grouping"],
    },
    after: {
      label: "AFTER",
      items: ["One primary workflow", "Logical grouping", "Reduced navigation depth", "Clear information hierarchy", "Faster task completion"],
    },
  },

  coreExperience: {
    eyebrow: "Core Experience",
    heading: "One platform.",
    headingAccent: "Every operation.",
    subtitle: "AxisRooms unifies distribution, revenue and reservation operations into a single mobile platform built for hotel teams.",
    left: {
      title: "Distribution Operations",
      desc: "Everything to manage inventory and channel distribution.",
      items: [
        { title: "Inventory", desc: "Manage room inventory across all connected channels.", num: "01" },
        { title: "Channels", desc: "Control OTA connections and channel-level settings.", num: "02" },
        { title: "Availability", desc: "Keep availability synchronized in real time.", num: "03" },
        { title: "Rate Management", desc: "Set and adjust rates across every distribution channel.", num: "04" },
      ],
    },
    rights: [
      {
        color: "green",
        title: "Revenue Operations",
        desc: "Maximize occupancy and revenue with confidence.",
        items: [
          { title: "Pricing", desc: "Manage dynamic pricing rules and strategies.", num: "05" },
          { title: "Occupancy", desc: "Track occupancy trends across properties.", num: "06" },
        ],
      },
      {
        color: "orange",
        title: "Reservation Operations",
        desc: "Stay on top of bookings and property performance.",
        items: [
          { title: "Reservations", desc: "View, manage and update bookings on the go.", num: "07" },
          { title: "Performance", desc: "Monitor analytics, reports and notifications in one place.", num: "08" },
        ],
      },
    ],
    features: [
      { title: "Enterprise-ready", desc: "Built for multi-property operators." },
      { title: "One clear hierarchy", desc: "No more duplicated navigation paths." },
      { title: "Role-based access", desc: "Secure data. Right access." },
      { title: "Scalable", desc: "A foundation for future feature growth." },
    ],
  },

  designSystem: {
    eyebrow: "Design System",
    heading: "Building Better Interfaces With Design Systems",
    subtext: "To ensure consistency across the product, we developed a reusable mobile design language that standardized typography, spacing, color usage, interaction patterns, and reusable components. The system made future feature development faster while creating a more cohesive experience for users.",
  },

  challenges: {
    eyebrow: "Challenges",
    heading: "Simplifying without",
    headingAccent: "removing power.",
    subtext: "Enterprise products naturally grow more complex over time. The challenge wasn't deciding what to remove—it was reorganizing existing functionality into workflows that felt intuitive while preserving the flexibility experienced users relied on.",
  },

  outcome: {
    eyebrow: "Final Showcase",
    heading: "Designed for operations.",
    headingAccent: "Optimized for clarity.",
    subtext: "By simplifying navigation and reducing workflow friction, AxisRooms transformed a feature-rich product into a faster, more intuitive operational experience—without sacrificing the depth that hotel teams depend on.",
  },

  whyBest: {
    eyebrow: "Why we best",
    heading: "Why AxisRooms is best?",
    subtext: "Enterprise software should feel effortless, not overwhelming — every workflow was rebuilt around clarity, speed and confidence.",
    cards: [
      { title: "One clear hierarchy", desc: "No more guessing which of seven paths leads to the same task." },
      { title: "Faster operations", desc: "Fewer steps between intent and action across every workflow." },
      { title: "Built to scale", desc: "A design system that supports every future feature without adding complexity." },
    ],
  },

  howItWorks: {
    eyebrow: "Foundation",
    heading: "The Foundation",
    subtext: "Before diving into the design process, here's what AxisRooms is, why it was redesigned, and the impact it aims to create.",
    tabs: [
      {
        label: "What is it?",
        heading: "What is AxisRooms?",
        body: "AxisRooms is a channel manager — a hotel distribution and revenue management platform that helps hotels manage inventory, room rates, reservations, and online distribution across multiple booking channels from one place. Unlike traditional PMS software, AxisRooms focuses on helping hotels maximize occupancy and revenue while keeping inventory synchronized across OTAs.",
        items: ["A channel manager for hotel distribution and revenue management", "Synchronizes inventory across multiple OTAs", "Redesigned for a faster, more intuitive mobile experience"],
      },
      {
        label: "Why built?",
        heading: "Why redesign it?",
        body: "Over the years, the platform evolved through continuous feature additions. While functionality expanded, navigation became increasingly fragmented. Users often reached the same destination through multiple paths, making everyday tasks unnecessarily confusing. Our goal wasn't to redesign features. It was to redesign how people reached them.",
        items: ["Functionality expanded faster than navigation could keep up", "Same destinations reachable through multiple confusing paths", "Focus on how people reach features, not the features themselves"],
      },
      {
        label: "Who it serves",
        heading: "Who uses it?",
        body: "Hotel Owners, Revenue Managers, Reservation Managers and Multi-property Operators all rely on AxisRooms. Each role performs different operational tasks but shares the need for fast, reliable workflows.",
        items: ["Hotel Owners", "Revenue Managers", "Reservation Managers", "Multi-property Operators"],
      },
      {
        label: "Business Goal",
        heading: "Business Goal",
        body: "Modernize the mobile experience, reduce navigation complexity, increase operational efficiency, and create a scalable foundation for future features.",
        items: ["Modernize the mobile experience", "Reduce navigation complexity", "Increase operational efficiency", "Create a scalable foundation for future features"],
      },
    ],
  },

  features: {
    eyebrow: "Our features",
    heading: "AxisRooms offers extensive features",
    subtext: "A single, predictable path to every distribution, revenue and reservation workflow hotel teams rely on.",
  },

  integrations: {
    heading: "Connected to every major channel",
    subtext: "Inventory stays synchronized across every connected distribution channel in real time.",
    logos: ["Booking.com", "Expedia", "Airbnb", "Agoda", "TripAdvisor", "Google Hotels", "Hotels.com", "MakeMyTrip"],
  },

  people: {
    eyebrow: "People Trust",
    heading: "Trusted by multi-property operators.",
    subtext: "Hotel owners, revenue and reservation managers rely on AxisRooms every day.",
  },

  testimonials: {
    eyebrow: "Testimonial",
    heading: "Trusted by hotel teams",
    subtext: "Enterprise software should feel effortless — here's what changed for the teams who use it every day.",
    items: [
      { name: "Rohan Mehta", role: "Revenue Manager", quote: "Navigation used to be the hardest part of the job. Now every workflow has one clear path." },
      { name: "Sana Kapoor", role: "Multi-property Operator", quote: "Switching between properties finally feels simple instead of a chore." },
      { name: "David Fernandes", role: "Reservation Manager", quote: "The redesign didn't remove any power — it just made everything easier to find." },
    ],
  },

  pricing: {
    eyebrow: "Pricing Plan",
    heading: "Look at your options and select the best plan for you",
    subtext: "Placeholder pricing tiers for the AxisRooms platform.",
    plans: [
      { name: "Basic", price: 49, yearlyPrice: 441, features: ["Single property", "Core distribution tools", "Standard support"] },
      { name: "Standard", price: 149, yearlyPrice: 1341, features: ["Up to 5 properties", "Revenue management tools", "Priority support"] },
      { name: "Premium", price: 299, yearlyPrice: 2691, popular: true, features: ["Unlimited properties", "Full analytics suite", "Dedicated account manager"] },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently asked question",
    items: [
      { q: "What changed in this redesign?", a: "The navigation and information architecture were rebuilt from the ground up — existing functionality was preserved, but how users reach it was completely reorganized." },
      { q: "Did any features get removed?", a: "No. The goal was reorganization, not removal — every capability experienced users relied on was preserved." },
      { q: "How was the new structure validated?", a: "Through an internal UX audit mapping real task paths, followed by iterative testing of the new information architecture." },
      { q: "Is this available on both iOS and Android?", a: "Yes, AxisRooms is built for both iOS and Android." },
    ],
  },

  blog: {
    eyebrow: "Insight",
    heading: "Read our latest blogs",
    subtext: "Placeholder blog content for the AxisRooms case study.",
    posts: [
      { category: "UX Strategy", date: "2024", readTime: "3 min read", title: "Why information architecture matters more than visual design", excerpt: "Placeholder excerpt." },
      { category: "Enterprise UX", date: "2024", readTime: "3 min read", title: "Simplifying without removing power", excerpt: "Placeholder excerpt." },
    ],
  },

  cta: {
    eyebrow: "Get Started",
    heading: "Enterprise software should feel effortless",
  },

  footer: {
    desc: "AxisRooms transformed a feature-rich product into a faster, more intuitive operational experience.",
    pages: ["Home", "Features", "About us", "Pricing", "Blog", "Contact"],
    utility: ["Style guide", "404 Page", "Password protected", "Licenses", "Changelog"],
    copyright: "Copyright @AxisRooms. All Rights Reserved",
  },
};
