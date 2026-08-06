import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "hotelogix-frontdesk",
    title: "Reservation Management System",
    industry: "Hospitality Technology",
    category: "Enterprise UX",
    shortDescription:
      "Redesigning the operational backbone of Hotelogix — a property management system used by hotel teams across 1,000+ properties worldwide — without disrupting the workflows people relied on every day.",
    overview:
      "As the founding designer at Hotelogix, I led the redesign of a 16-year-old property management system — evolving a mission-critical platform while preserving the speed and familiarity of the teams who depended on it.",
    timeline: "Confidential",
    role: "Founding Product\nDesigner",
    team: ["Product", "Engineering", "Customer Success"],
    coverImage: "/images/hotelogix-frontdesk.jpg",
    images: [],
    tags: ["Enterprise UX", "B2B SaaS"],
    tools: ["Figma", "Miro", "Maze"],
    featured: true,
    problemStatement:
      "How might we redesign a 16-year-old operational system used daily by hotel teams worldwide without disrupting the workflows people relied on to run their businesses?",
    businessContext: {
      goals: [
        "Modernize a legacy product without affecting adoption",
        "Introduce new functionality while preserving familiarity",
        "Build a scalable design foundation for future growth",
      ],
      challenges: [
        "Modernize without disrupting adoption",
        "Introduce new capabilities alongside existing ones",
        "Legacy architecture with deep workflow dependencies",
      ],
      constraints: [
        "Could not break existing muscle memory or learned workflows",
        "Must support real-time operations with zero tolerance for downtime",
      ],
    },
    research: {
      userInsights: [
        "Users weren't resistant to change — they were resistant to losing the efficiency they had built through repetition",
        "Critical tasks required navigating multiple screens to complete a single objective",
        "During busy periods, speed mattered more than feature richness",
      ],
      personas: [],
      painPoints: [
        "Operational tasks required unnecessary steps",
        "Information scattered across multiple screens",
        "Important actions lacked visibility and context",
        "New employees faced a steep learning curve",
        "Peak-hour workflows increased cognitive load",
      ],
    },
    designProcess: {
      wireframes: "Mapped existing workflows before proposing any changes. Identified which patterns to preserve and which to evolve.",
      flows: "Restructured reservation journeys and consolidated related actions without removing familiar entry points.",
      iterations: "Validated against real operational scenarios with customer-facing teams throughout.",
    },
    solution: {
      description:
        "The redesign focused on enhancing operational awareness while simplifying execution. Rather than forcing users to adapt to entirely new behaviors, we evolved existing workflows to become more intuitive, efficient, and scalable.",
      keyFeatures: [
        "Operational Blueprint — real-time visual overview of property status",
        "Streamlined reservation workflows with consolidated actions",
        "Enhanced information architecture organized around user priorities",
        "Modernized product experience with a refreshed visual identity",
      ],
    },
    designSystem: { colors: [], typography: [], components: ["Operational Blueprint", "Reservation Card", "Status Panel", "Action Bar"] },
    designPrinciples: [
      {
        title: "Preserve Familiarity",
        description: "Respect existing mental models and workflows wherever possible. Change what needs to change — nothing more.",
      },
      {
        title: "Prioritize Speed",
        description: "Design experiences that support quick decision-making during time-sensitive operations. Every extra step has a real operational cost.",
      },
      {
        title: "Surface What Matters",
        description: "Bring critical information closer to action. Reduce the distance between understanding what's happening and doing something about it.",
      },
      {
        title: "Design for Real Operations",
        description: "Support the complexity and unpredictability of hospitality environments — not ideal scenarios. Edge cases are the job.",
      },
      {
        title: "Build for Evolution",
        description: "Create patterns and systems that can scale with future business needs. The design system is a foundation, not a deliverable.",
      },
    ],
    outcomes: {
      metrics: [
        { label: "Workflow Steps", value: "35% ↓", description: "Reduction in steps required across critical reservation workflows" },
        { label: "Task Efficiency", value: "30% ↓", description: "Improvement in efficiency for frequently performed operational tasks" },
        { label: "Properties", value: "1,000+", description: "Hotel properties benefiting from the redesigned experience" },
        { label: "New Capabilities", value: "50+", description: "New product capabilities introduced to support evolving business needs" },
      ],
      businessImpact:
        "The redesign modernized Hotelogix's product experience without disrupting adoption — introducing new capabilities while preserving the familiarity long-time users depended on.",
      learnings: [
        "The hardest design problems aren't about creating something new — they're about knowing what not to change",
        "Preserving trust can be just as important as introducing new ideas",
        "When people rely on a product to run their business, good design is noticed because work feels easier — not because it looks different",
      ],
    },

    // Rich case study content
    valueProposition:
      "Reimagining the operational backbone of Hotelogix without disrupting the people who relied on it every day.",
    heroIntro:
      "Hotelogix had been powering hotel operations for over 16 years. Thousands of hospitality professionals depended on the platform to manage reservations, room inventory, guest experiences, and day-to-day operations.\n\nAs the founding designer, I was responsible for redesigning a product that people had built entire workflows around — without breaking the familiarity they had developed over years of use.\n\nThe challenge wasn't simply making the software look modern. It was evolving a mission-critical system while preserving the speed, confidence, and muscle memory of the teams who depended on it.",
    platform: "Web-based Property Management System",
    users: "Front Desk Teams, Reservation Managers, Operations Staff, Hotel Administrators",
    responsibilities: [
      "Product Strategy",
      "UX Design",
      "Interaction Design",
      "UI Design",
      "Information Architecture",
      "Design Systems",
      "Cross-functional Collaboration",
    ],
    businessChallenges: [
      "Modernize a legacy product without affecting adoption.",
      "Introduce new functionality while preserving familiarity.",
      "Refresh the brand and product experience.",
      "Build a scalable foundation for future growth.",
    ],
    userChallenges: [
      "Operational tasks required unnecessary steps.",
      "Information was scattered across multiple screens.",
      "Important actions lacked visibility and context.",
      "New employees faced a steep learning curve.",
      "Peak-hour workflows increased cognitive load.",
    ],
    researchActivities: [
      "Stakeholder workshops",
      "Workflow audits",
      "Existing product analysis",
      "User feedback reviews",
      "Competitive benchmarking",
      "Internal discussions with customer-facing teams",
      "On-site shadowing of front desk and restaurant teams",
    ],
    keyInsights: [
      {
        title: "Familiarity drives confidence.",
        description:
          "Users weren't resistant to change. They were resistant to losing the efficiency they had built through repetition.",
      },
      {
        title: "Context switching slowed operations.",
        description:
          "Critical tasks often required navigating multiple screens to complete a single objective.",
      },
      {
        title: "Visibility mattered as much as functionality.",
        description:
          "Users needed to understand what was happening across the property without actively searching for information.",
      },
      {
        title: "Operational pressure changes behavior.",
        description:
          "During busy periods, speed became more important than feature richness.",
      },
      {
        title: "Small improvements compound.",
        description:
          "Reducing even a few clicks from frequent workflows could save significant time across hundreds of daily interactions.",
      },
    ],
    businessSuccess: [
      "Modernize Hotelogix's product experience.",
      "Introduce new capabilities without disrupting adoption.",
      "Establish a scalable design foundation.",
      "Strengthen the product's market perception.",
    ],
    userSuccess: [
      "Complete tasks with fewer steps.",
      "Reduce cognitive effort.",
      "Increase operational visibility.",
      "Support faster onboarding.",
      "Improve confidence during high-pressure situations.",
    ],
    solutionEvolution: [
      {
        challenge:
          "Users lacked a single source of truth for understanding what was happening across the property.",
        decision:
          "We introduced an operational blueprint inspired by the hotel's physical layout.",
        outcome:
          "Teams gained immediate visibility into room status, occupancy, and ongoing activities without navigating through multiple screens.",
      },
      {
        challenge:
          "Common workflows required excessive navigation and repetitive actions.",
        decision:
          "We restructured key reservation journeys and consolidated related actions.",
        outcome:
          "Frequent tasks became faster, reducing friction across everyday operations.",
      },
      {
        challenge:
          "The existing interface no longer reflected the maturity of the product.",
        decision:
          "We established a cleaner, more minimal visual language and modernized the brand experience.",
        outcome:
          "The product felt contemporary while maintaining familiarity for long-time users.",
      },
    ],
    solutionFeatures: [
      {
        title: "Operational Blueprint",
        tagline: "See everything. Act instantly.",
        description: "One of the most significant additions to the product was a visual blueprint of the hotel — inspired by the physical structure of the property. It provided a real-time overview of room occupancy, active reservations, guest movements, housekeeping status, and ongoing activities.",
      },
      {
        title: "Streamlined Reservation Workflows",
        tagline: "Fewer steps, more confidence.",
        description: "Reservation-related tasks were redesigned to reduce complexity. By consolidating actions and improving information hierarchy, users could complete common workflows more efficiently and with greater confidence — optimized for the pace of hotel operations.",
      },
      {
        title: "Enhanced Information Architecture",
        tagline: "Find what matters, fast.",
        description: "Information was reorganized around user priorities rather than system structure. Critical actions became easier to discover, supporting both experienced users and newer employees getting up to speed.",
      },
      {
        title: "Modernized Product Experience",
        tagline: "Familiar, yet refreshed.",
        description: "The redesign introduced a refreshed visual identity aligned with Hotelogix's future direction. A cleaner interface, improved hierarchy, and consistent patterns elevated the perceived quality of the product while preserving familiarity for long-time users.",
      },
    ],
    reflection: [
      "Redesigning Hotelogix taught me that the hardest design problems aren't about creating something entirely new. They're about knowing what not to change.",
      "Designing for operational systems requires balancing innovation with familiarity, efficiency with flexibility, and business goals with the realities of everyday work. I learned that preserving trust can be just as important as introducing new ideas.",
      "When people rely on a product to run their business, good design isn't noticed because it's different. It's noticed because work simply feels easier. And in many ways, that's the highest compliment an operational product can receive.",
    ],

    nextProject: "hotelogix-pos",
    prevProject: "contact-me",
  },
  {
    id: "2",
    slug: "hotelogix-pos",
    title: "Point of Sale — Restaurant Operations",
    industry: "Hospitality Tech",
    category: "Mobile App",
    shortDescription:
      "Redesigned restaurant POS to cut order processing time by 40% and eliminate kitchen miscommunication.",
    overview:
      "Led contextual research and UX design for Hotelogix's restaurant Point of Sale system — a real-time order management tool for hotel F&B operations.",
    timeline: "Jul 2023 – Present",
    role: "Product UX Designer",
    team: ["Design", "Engineering", "F&B Operations"],
    coverImage: "/images/hotelogix-pos.jpg",
    images: [],
    tags: ["Mobile", "Enterprise UX", "Real-time", "B2B"],
    tools: ["Figma", "Framer", "Notion"],
    featured: true,
    problemStatement:
      "Hotel restaurant staff were losing orders and creating kitchen miscommunication due to a non-contextual POS with no real-time table awareness.",
    businessContext: {
      goals: ["Faster order processing", "Reduce kitchen communication errors", "Optimise table-level tracking"],
      challenges: ["High-pressure peak service environment", "Multiple staff roles with conflicting needs", "Real-time sync requirements"],
      constraints: ["Must work on tablet and handheld", "Zero tolerance for order loss"],
    },
    research: {
      userInsights: ["Servers averaged 6 taps per single item", "Kitchen display had no priority context", "Table mapping was static"],
      personas: [{ name: "Restaurant Server", role: "Primary User", age: 26, description: "Manages 6–8 tables simultaneously.", goals: ["Fast order entry", "Table status"], frustrations: ["Too many steps", "No table map"] }],
      painPoints: ["Order entry too slow under pressure", "No real-time table mapping", "One UI for all roles"],
    },
    designProcess: {
      wireframes: "Shadow research across 3 hotel restaurants. Built contextual order flow with table map as primary navigation.",
      flows: "3 role-specific touchpoints: server, cashier, kitchen display. Order-to-kitchen reduced to 3 steps.",
      iterations: "2 rounds of live-environment testing during actual service.",
    },
    solution: {
      description: "Context-aware POS with real-time table mapping, role-specific interfaces, and streamlined order flows.",
      keyFeatures: ["Real-time table mapping", "Role-specific touchpoints", "3-step order flow", "Peak-hour quick-add patterns"],
    },
    designSystem: { colors: [], typography: [], components: ["Table Map", "Order Card", "Quick Add", "Kitchen Display"] },
    designPrinciples: [
      { title: "Context Over Convention", description: "Standard POS patterns break under real service pressure. Design must fit the environment — not the other way around." },
      { title: "Speed is a Feature", description: "In peak-hour operations, every extra tap costs real money. Minimum taps, maximum efficiency." },
      { title: "Role-Specific Touchpoints", description: "A server, cashier, and kitchen operator have fundamentally different mental models. One UI cannot serve all three well." },
      { title: "Spatial Context Reduces Errors", description: "A table map isn't cosmetic — it gives staff the same spatial awareness they have walking the floor." },
    ],
    outcomes: {
      metrics: [
        { label: "Order Processing", value: "+40%", description: "Faster during peak hours" },
        { label: "Order-to-Kitchen", value: "−40%", description: "Time with table mapping" },
        { label: "Errors", value: "−25%", description: "With role-specific touchpoints" },
      ],
      businessImpact: "Contextual research and role-based design improved service speed and reduced kitchen errors across hotel F&B.",
      learnings: ["Shadow research is irreplaceable for operational products", "Role-specific design beats generic UX", "Spatial context reduces pressure-state cognitive load"],
    },
    valueProposition: "Redesigning restaurant operations for hotel F&B teams who can't afford to lose a single order.",
    heroIntro: "Hotel restaurants operate at a pace that leaves no room for error. During peak service, servers are managing multiple tables simultaneously, kitchen staff are working against the clock, and any miscommunication translates directly into guest dissatisfaction.\n\nAs the designer on Hotelogix's POS redesign, I was embedded in the operational reality of hotel F&B — conducting shadow research across three properties to understand what was actually happening at the point of service.\n\nThe challenge wasn't just a software problem. It was a context problem. The existing POS was designed for generic restaurant environments, not the specific pressures of hotel food and beverage operations.",
    platform: "Tablet & Handheld Device",
    users: "Restaurant Servers, Cashiers, Kitchen Display Operators, F&B Managers",
    responsibilities: ["UX Research", "Contextual Inquiry", "Interaction Design", "UI Design", "Prototyping", "Usability Testing"],
    businessChallenges: [
      "Reduce order processing time during peak service hours.",
      "Eliminate kitchen miscommunication across concurrent orders.",
      "Support multiple staff roles within a single platform.",
      "Optimise for tablet and handheld device form factors.",
    ],
    userChallenges: [
      "Order entry was slow and error-prone under service pressure.",
      "No real-time table mapping for spatial context.",
      "One generic UI forced across three distinct roles.",
      "Kitchen display provided no order priority or sequencing context.",
    ],
    researchActivities: [
      "Shadow research across 3 hotel restaurants",
      "Peak-hour service observation",
      "Role-based workflow mapping",
      "Kitchen staff interviews",
      "Server shadowing during active service",
      "Competitive POS benchmarking",
    ],
    keyInsights: [
      { title: "Context is everything.", description: "Standard POS patterns break down under real service pressure. The environment, not the user, is the primary design constraint." },
      { title: "Speed beats features.", description: "In peak service, users need the fastest path to the most common action — not the most comprehensive interface." },
      { title: "Roles are fundamentally different.", description: "A server, cashier, and kitchen operator have completely different mental models. One UI cannot adequately serve all three." },
      { title: "Spatial awareness reduces errors.", description: "Staff make better decisions when they can see where things are happening — a table map is functional, not decorative." },
      { title: "Pressure changes behavior.", description: "Patterns that work in testing can fail completely in a busy service environment. Real-environment validation is non-negotiable." },
    ],
    businessSuccess: [
      "Reduce average order processing time during peak hours.",
      "Eliminate kitchen miscommunication and order errors.",
      "Support three distinct staff roles within one platform.",
      "Achieve feature parity on tablet and handheld devices.",
    ],
    userSuccess: [
      "Complete order entry in under 3 taps.",
      "Visualise all tables and their order status in real-time.",
      "Reduce cognitive load during peak service.",
      "Navigate role-specific workflows without context-switching.",
    ],
    solutionEvolution: [
      {
        challenge: "Order entry was slow and error-prone under peak service pressure.",
        decision: "We redesigned the order flow around context — placing the table map at the centre of the experience.",
        outcome: "Servers could orient around physical space rather than abstract lists, reducing entry errors significantly.",
      },
      {
        challenge: "Kitchen staff had no visibility into order priority or sequencing context.",
        decision: "We introduced a dedicated kitchen display with priority context and real-time order sync.",
        outcome: "Kitchen teams could manage order sequences proactively instead of reactively.",
      },
      {
        challenge: "One interface was expected to serve three fundamentally different roles.",
        decision: "We designed role-specific touchpoints — distinct views for server, cashier, and kitchen operator.",
        outcome: "Each role gained a purpose-built interface that reduced cognitive load specific to their context.",
      },
    ],
    solutionFeatures: [
      {
        title: "Real-Time Table Map",
        tagline: "See the floor. Own the service.",
        description: "A live visual representation of the restaurant floor giving staff instant spatial context — which tables are occupied, what stage their orders are at, and where to focus next.",
      },
      {
        title: "3-Step Order Flow",
        tagline: "Faster entry, fewer errors.",
        description: "Core order entry reduced to three steps through careful workflow restructuring. Servers can place complete orders faster than the previous system allowed for a single item.",
      },
      {
        title: "Role-Specific Interfaces",
        tagline: "Built for who you are.",
        description: "Distinct touchpoints for servers, cashiers, and kitchen operators — each optimised for the specific decisions and actions of that role without the noise of features that don't apply.",
      },
      {
        title: "Peak-Hour Quick-Add",
        tagline: "Designed for the rush.",
        description: "Quick-add patterns for the most frequently ordered items, reducing interactions required during high-pressure service moments when every second counts.",
      },
    ],
    reflection: [
      "Designing for the restaurant POS taught me that the most important design research happens outside the design room. Shadow research revealed constraints and behaviors that no interview or survey could have surfaced.",
      "I learned that role-specific design is not a luxury — it's a requirement. Forcing different users into a generic interface is a design failure, even when the system technically supports all the required functions.",
      "The biggest lesson was about the primacy of context. The best interface design in the world fails if it doesn't account for the physical and operational environment where it will actually be used.",
    ],

    nextProject: "hotelogix-cro",
    prevProject: "hotelogix-frontdesk",
  },
  {
    id: "3",
    slug: "hotelogix-cro",
    title: "Central Reservation Office",
    industry: "Hospitality Tech",
    category: "Enterprise UX",
    shortDescription:
      "Consolidated 3 fragmented tools into one platform, improving booking efficiency by 20% across 200+ hotel accounts.",
    overview:
      "Led UX design for Hotelogix's Central Reservation Office — a revenue management tool that consolidated fragmented booking tools and introduced AI-assisted room permutations for group bookings.",
    timeline: "Jul 2023 – Present",
    role: "Product UX Designer",
    team: ["Design", "Engineering", "Revenue Management"],
    coverImage: "/images/hotelogix-cro.jpg",
    images: [],
    tags: ["Enterprise UX", "Data Visualization", "B2B", "Revenue Management"],
    tools: ["Figma", "Miro", "FigJam"],
    featured: true,
    problemStatement:
      "Revenue managers were switching between 3 disconnected tools to manage bookings, causing delays and pricing inconsistencies across 200+ hotel accounts.",
    businessContext: {
      goals: ["Consolidate 3 tools into one", "Improve group booking speed", "Enable pricing insights at scale"],
      challenges: ["Complex revenue logic across 200+ accounts", "Group booking permutations at scale", "Data visualization for non-technical users"],
      constraints: ["Must preserve existing booking data", "Revenue managers can't have downtime"],
    },
    research: {
      userInsights: ["Tool-switching caused 35% of booking delays", "Group permutations took hours manually", "Pricing data scattered across 3 dashboards"],
      personas: [{ name: "Revenue Manager", role: "Primary User", age: 38, description: "Manages pricing and group bookings across multiple hotel accounts.", goals: ["Unified booking view", "Faster group config"], frustrations: ["Tool fragmentation", "Manual permutations"] }],
      painPoints: ["Fragmented tool set causing context-switching", "No AI assistance for group room permutations", "Pricing visualisation spread across disconnected screens"],
    },
    designProcess: {
      wireframes: "Mapped the end-to-end revenue management workflow. Designed unified dashboard consolidating all booking views.",
      flows: "Built group booking flow with AI permutation engine. Designed pricing data visualisation for 200+ account view.",
      iterations: "2 rounds of testing with revenue managers across different hotel tiers.",
    },
    solution: {
      description: "A unified CRO platform with consolidated booking tools, AI-assisted group room permutations, and data visualisation for pricing insights.",
      keyFeatures: ["Unified booking dashboard", "AI-assisted room permutations", "Pricing visualisation across 200+ accounts", "Group booking configuration"],
    },
    designSystem: { colors: [], typography: [], components: ["Booking Dashboard", "Permutation Builder", "Pricing Chart", "Account Switcher"] },
    designPrinciples: [
      { title: "Consolidation as UX", description: "Reducing the number of tools a user must context-switch between is itself a design outcome — not just an engineering one." },
      { title: "Trust Through Transparency", description: "AI-assisted features must show their work. Revenue managers need to understand why a permutation was suggested to act on it." },
      { title: "Data for Decision-Makers", description: "Visualise data at the level of the decision — not the level of the database. Revenue managers think in accounts, not rows." },
      { title: "Zero Disruption", description: "When users cannot afford downtime, the migration experience is as important as the destination design." },
    ],
    outcomes: {
      metrics: [
        { label: "Booking Efficiency", value: "+20%", description: "By consolidating 3 tools" },
        { label: "Group Booking Time", value: "−60%", description: "With AI-assisted permutations" },
        { label: "Hotel Accounts", value: "200+", description: "Pricing insights visualised" },
      ],
      businessImpact: "Consolidation of fragmented tools significantly reduced revenue manager workload and improved pricing decision speed.",
      learnings: ["Consolidation UX is as hard as new product design", "AI features need careful UX scaffolding to build trust", "Data visualisation for non-technical users requires radical simplification"],
    },
    valueProposition: "Consolidating fragmented revenue tools into a unified platform that helps managers make faster, better-informed booking decisions.",
    heroIntro: "Revenue managers at Hotelogix were navigating three disconnected tools every single day. Bookings lived in one system, pricing insights in another, and group configuration in a third — each requiring context-switching that compounded across hundreds of daily interactions.\n\nAs the lead designer on the Central Reservation Office project, I was tasked with consolidating these fragmented systems into a single unified platform — while also introducing AI-assisted room permutations for complex group bookings.\n\nThe challenge wasn't just consolidation. It was designing a system that could handle the cognitive complexity of managing pricing and availability across 200+ hotel accounts simultaneously.",
    platform: "Web-based Revenue Management Platform",
    users: "Revenue Managers, Group Booking Coordinators, Hotel Account Managers",
    responsibilities: ["UX Strategy", "Information Architecture", "Interaction Design", "Data Visualisation", "UI Design", "Stakeholder Workshops"],
    businessChallenges: [
      "Consolidate three separate revenue tools into one unified platform.",
      "Reduce revenue manager context-switching and cognitive load.",
      "Introduce AI-assisted group booking without eroding user trust.",
      "Enable pricing visibility across 200+ hotel accounts simultaneously.",
    ],
    userChallenges: [
      "Tool-switching caused delays in time-sensitive booking decisions.",
      "Group permutations required hours of manual configuration.",
      "Pricing data was scattered across disconnected dashboards.",
      "AI suggestions were distrusted without transparent reasoning.",
    ],
    researchActivities: [
      "Revenue manager workflow mapping",
      "Tool-switching frequency analysis",
      "Group booking process audits",
      "Stakeholder interviews across hotel tiers",
      "Competitive revenue platform benchmarking",
      "Data visualisation research",
    ],
    keyInsights: [
      { title: "Tool fragmentation is invisible to those inside it.", description: "Revenue managers had normalised switching between three tools. They didn't call it a problem — they called it their job." },
      { title: "AI features require visible reasoning.", description: "Suggesting a permutation without explaining the logic caused managers to override the recommendation every time." },
      { title: "Data must match the mental model.", description: "Revenue managers think in accounts, not rows. Displaying data at the database level forces unnecessary cognitive translation." },
      { title: "Consolidation means redesigning workflows.", description: "Merging three tools into one required rethinking the transitions between them — not just combining the interfaces." },
      { title: "Migration experience is a design problem.", description: "Revenue managers cannot pause operations for a product transition. The migration path required as much design attention as the destination." },
    ],
    businessSuccess: [
      "Consolidate 3 disconnected tools into a single unified platform.",
      "Reduce context-switching across the revenue management workflow.",
      "Introduce AI-assisted group permutations with high adoption rates.",
      "Deliver pricing visualisation across 200+ accounts.",
    ],
    userSuccess: [
      "Complete booking decisions without switching between tools.",
      "Configure group bookings in a fraction of the previous time.",
      "Understand AI suggestions well enough to act on them confidently.",
      "Access cross-account pricing insights in one view.",
    ],
    solutionEvolution: [
      {
        challenge: "Revenue managers were forced to switch between three separate tools for a single booking decision.",
        decision: "We consolidated all booking, pricing, and group management into a single unified dashboard.",
        outcome: "Context-switching was eliminated and booking decisions could be made with full information in one place.",
      },
      {
        challenge: "Group room permutations were being configured manually — a process that took hours.",
        decision: "We introduced an AI-assisted permutation engine with transparent reasoning displayed alongside every suggestion.",
        outcome: "Group booking configuration time dropped by 60% while manager trust was preserved through visible decision logic.",
      },
      {
        challenge: "Pricing data spread across disconnected screens made cross-account analysis nearly impossible.",
        decision: "We redesigned the data visualisation layer to present insights at the account level — matching how managers actually think.",
        outcome: "Pricing decisions that previously required hours of manual aggregation could be made in minutes.",
      },
    ],
    solutionFeatures: [
      {
        title: "Unified Booking Dashboard",
        tagline: "One view. Every decision.",
        description: "A consolidated command centre bringing together booking management, pricing insights, and availability tracking across all hotel accounts — eliminating the need to switch between disconnected tools.",
      },
      {
        title: "AI-Assisted Permutations",
        tagline: "Faster groups. Smarter decisions.",
        description: "An AI-powered engine that generates optimal room configurations for group bookings, with transparent reasoning displayed alongside each recommendation to support confident decision-making.",
      },
      {
        title: "Cross-Account Pricing Visualisation",
        tagline: "See the full picture.",
        description: "Pricing data visualised at the account level — the way revenue managers actually think — enabling cross-property insights without manual aggregation or tool-switching.",
      },
      {
        title: "Seamless Migration Experience",
        tagline: "Zero disruption transition.",
        description: "A carefully designed migration flow allowing revenue managers to adopt the new platform without operational downtime, preserving all existing booking data and workflows throughout.",
      },
    ],
    reflection: [
      "The CRO project taught me that consolidation UX is as difficult as designing a new product from scratch. Merging three existing tools means inheriting three sets of user expectations, mental models, and edge cases.",
      "I learned that AI features live or die by the trust users place in them. The permutation engine only became useful when we showed managers why a suggestion was made — not just what it was.",
      "Designing for data-heavy platforms reinforced a principle I now apply everywhere: visualise information at the level of the decision, not the level of the data. The gap between the two is where user frustration lives.",
    ],

    nextProject: "hotelogix-website",
    prevProject: "hotelogix-pos",
  },
  {
    id: "4",
    slug: "hotelogix-website",
    title: "Hotelogix Website — Marketing & Conversion",
    industry: "Hospitality Tech",
    category: "Web Design",
    shortDescription:
      "Reduced bounce rate by 16% and improved lead quality by redesigning 20+ pages for 3 core buyer personas.",
    overview:
      "Led the conversion-focused redesign of the Hotelogix marketing website — restructuring information architecture across 20+ pages aligned to 3 core buyer personas to improve lead quality and reduce bounce rate.",
    timeline: "Jul 2023 – Present",
    role: "Product UX Designer",
    team: ["Design", "Marketing", "Engineering"],
    coverImage: "/images/hotelogix-website.jpg",
    images: [],
    tags: ["Web Design", "CRO", "Marketing", "Information Architecture"],
    tools: ["Figma", "Framer", "Maze"],
    featured: true,
    problemStatement:
      "The Hotelogix website had a high bounce rate and poor lead quality due to misaligned information architecture that didn't speak to the distinct needs of 3 core buyer personas.",
    businessContext: {
      goals: ["Reduce bounce rate", "Improve lead quality", "Align IA with acquisition funnel"],
      challenges: ["3 distinct buyer personas with different entry points", "20+ pages to restructure", "Balancing SEO requirements with UX clarity"],
      constraints: ["Must maintain existing SEO equity", "No full rebrand — design within brand guidelines"],
    },
    research: {
      userInsights: ["Buyers left within 10 seconds when they couldn't find their use case", "3 distinct entry intents: small hotel, mid-scale chain, enterprise group", "CTA placement was misaligned with decision stage"],
      personas: [{ name: "Hotel GM", role: "Primary Buyer", age: 44, description: "Evaluating PMS solutions for their property. Needs clear ROI framing.", goals: ["Find relevant use case", "Understand pricing"], frustrations: ["Generic messaging", "Can't find enterprise info"] }],
      painPoints: ["Generic messaging not tailored to buyer segment", "CTA placed too early in funnel", "No persona-specific landing paths"],
    },
    designProcess: {
      wireframes: "Mapped 3 buyer journeys and designed persona-specific landing paths. Restructured IA across 20+ pages.",
      flows: "Built conversion funnel aligned to decision stages: awareness → consideration → intent.",
      iterations: "A/B tested 2 homepage concepts and 3 CTA placements with marketing team.",
    },
    solution: {
      description: "A restructured website with persona-specific content paths, funnel-aligned CTAs, and improved information architecture across 20+ pages.",
      keyFeatures: ["3 persona-specific content paths", "Funnel-aligned CTA placement", "IA restructure across 20+ pages", "Conversion-optimised homepage"],
    },
    designSystem: { colors: [], typography: [], components: ["Hero Section", "Persona Path", "CTA Block", "Feature Grid", "Testimonial Row"] },
    designPrinciples: [
      { title: "Persona-Led Information Architecture", description: "IA should mirror how buyers think about their problem — not how the product team organises features." },
      { title: "CTA Timing Over CTA Copy", description: "A call-to-action shown before trust is established will always underperform, regardless of the wording." },
      { title: "Relevance Before Persuasion", description: "A visitor who immediately sees their use case will convert. Generic messaging forces them to do the work you should have done." },
      { title: "SEO and UX Are Not Opposites", description: "Clear, persona-aligned language that answers real questions serves both search engines and human readers." },
    ],
    outcomes: {
      metrics: [
        { label: "Bounce Rate", value: "−16%", description: "Through conversion rate optimisation" },
        { label: "Pages Restructured", value: "20+", description: "For 3 core buyer personas" },
        { label: "Lead Quality", value: "↑", description: "Aligned design with acquisition funnel" },
      ],
      businessImpact: "Persona-aligned IA and funnel-optimised design improved lead quality and reduced wasted acquisition spend.",
      learnings: ["IA is the most underrated conversion lever", "Persona alignment at page level outperforms generic messaging", "CTA timing matters as much as CTA copy"],
    },
    valueProposition: "Redesigning 20+ pages to speak directly to three distinct buyer personas — and converting them more effectively.",
    heroIntro: "The Hotelogix marketing website was built around the product, not the buyer. Every page assumed a visitor already understood what a property management system was and why they might need one — a significant assumption for a market spanning boutique hotels, mid-scale chains, and enterprise resort groups.\n\nAs the design lead on the website redesign, I was responsible for restructuring information architecture across more than 20 pages — aligning each to one of three core buyer personas and their specific decision stage.\n\nThe challenge wasn't just visual redesign. It was a content and structure problem. The right message, for the right buyer, at the right moment in their evaluation journey.",
    platform: "Marketing Website",
    users: "Small Hotel GMs, Mid-Scale Chain Operators, Enterprise Procurement Teams",
    responsibilities: ["UX Strategy", "Information Architecture", "Conversion Rate Optimisation", "Content Strategy", "UI Design", "A/B Testing"],
    businessChallenges: [
      "Reduce website bounce rate through targeted information architecture.",
      "Improve lead quality by aligning pages to distinct buyer intent.",
      "Create persona-specific content paths across 20+ pages.",
      "Optimise CTA placement without compromising SEO equity.",
    ],
    userChallenges: [
      "Buyers couldn't immediately identify their use case on landing.",
      "CTAs appeared before sufficient trust had been established.",
      "Generic messaging failed to resonate with any specific buyer segment.",
      "No persona-specific paths to guide evaluation journeys.",
    ],
    researchActivities: [
      "Buyer persona workshops with sales and marketing teams",
      "Analytics heatmap and scroll-depth analysis",
      "Session recording review",
      "CTA performance auditing across pages",
      "Competitor website analysis",
      "Sales team interview series",
    ],
    keyInsights: [
      { title: "Buyers leave when they can't find themselves.", description: "Visitors who couldn't immediately identify their use case left within 10 seconds — regardless of product quality." },
      { title: "CTA timing matters more than copy.", description: "A call-to-action shown before trust was established consistently underperformed, regardless of how compelling the wording was." },
      { title: "Three personas, three journeys.", description: "Small hotel owners, mid-scale chain managers, and enterprise procurement teams have fundamentally different information needs and evaluation processes." },
      { title: "Generic messaging is a conversion killer.", description: "Pages that tried to speak to everyone spoke effectively to no one. Specificity improved conversion even at the cost of narrowing the apparent audience." },
      { title: "SEO and UX goals aligned more than expected.", description: "Persona-aligned language that answered real buyer questions served both search intent and human comprehension simultaneously." },
    ],
    businessSuccess: [
      "Reduce bounce rate through persona-aligned information architecture.",
      "Improve lead quality by matching pages to buyer intent.",
      "Establish persona-specific content paths across the full site.",
      "Optimise CTA placement for each distinct decision stage.",
    ],
    userSuccess: [
      "Identify their use case within the first seconds of landing.",
      "Find relevant information without excessive navigation.",
      "Reach a decision point faster and with more confidence.",
      "Trust the brand before being asked to take an action.",
    ],
    solutionEvolution: [
      {
        challenge: "All buyers were landing on the same homepage regardless of their entry intent or persona type.",
        decision: "We mapped three distinct buyer journeys and designed persona-specific landing paths with tailored IA and CTA strategies.",
        outcome: "Visitors could immediately self-identify and follow a path calibrated to their specific evaluation stage and needs.",
      },
      {
        challenge: "CTAs were placed too early in the funnel before trust had been established.",
        decision: "We restructured CTA placement across all pages based on decision stage — awareness, consideration, and intent.",
        outcome: "Conversion improved as visitors encountered conversion moments aligned to their actual readiness to act.",
      },
      {
        challenge: "20+ pages had been structured around product features rather than buyer problems.",
        decision: "We rewrote the IA and content hierarchy across all pages to lead with buyer relevance before product capability.",
        outcome: "Bounce rate decreased as more visitors found what they were looking for within their first meaningful interaction.",
      },
    ],
    solutionFeatures: [
      {
        title: "Persona-Specific Landing Paths",
        tagline: "Speak to someone. Not everyone.",
        description: "Three distinct content paths for small hoteliers, mid-scale chains, and enterprise accounts — each with tailored messaging, proof points, and CTAs appropriate for that buyer's evaluation process.",
      },
      {
        title: "Funnel-Aligned CTA Strategy",
        tagline: "The right ask at the right time.",
        description: "CTAs repositioned based on decision stage across all pages. Awareness pages build trust, consideration pages introduce demos, intent pages drive conversion — eliminating premature asks.",
      },
      {
        title: "Restructured Information Architecture",
        tagline: "Relevance before persuasion.",
        description: "Full IA overhaul across 20+ pages, leading with buyer problems before product capabilities. Content hierarchy mirrors the evaluation journey rather than the product roadmap.",
      },
      {
        title: "Conversion-Optimised Homepage",
        tagline: "One page. Three entry points.",
        description: "The homepage redesigned to serve all three buyer personas simultaneously — with clear visual paths directing each segment toward their relevant journey without overwhelming or confusing any of them.",
      },
    ],
    reflection: [
      "The website redesign taught me that information architecture is the most underrated conversion lever in digital product design. Getting the structure right mattered more than any visual refinement we applied on top of it.",
      "I learned that persona-aligned design is not just a UX best practice — it's a business strategy. When the right message reaches the right buyer at the right moment, the difference in conversion is measurable and meaningful.",
      "The biggest insight was about the relationship between SEO and UX. Clear, specific language that answers real buyer questions serves both disciplines simultaneously. The assumption that they are in conflict is largely a myth.",
    ],

    nextProject: "pocket-pms",
    prevProject: "hotelogix-cro",
  },
  {
    id: "5",
    slug: "pocket-pms",
    title: "Hotelogix Pocket PMS — Mobile-First",
    industry: "Hospitality Tech",
    category: "Mobile App",
    shortDescription:
      "iOS and Android redesign that reduced desktop dependency by 60% for on-ground hotel staff.",
    overview:
      "Redesigned Hotelogix's mobile property management system for iOS and Android — enabling on-ground hotel staff to manage operations without a desktop, with touch-first interactions optimised for speed.",
    timeline: "Jul 2023 – Present",
    role: "Product UX Designer",
    team: ["Design", "iOS Engineering", "Android Engineering"],
    coverImage: "/images/pocket-pms.jpg",
    images: [],
    tags: ["iOS", "Android", "Mobile", "Enterprise UX"],
    featured: true,
    problemStatement:
      "Hotel staff were tethered to front-desk terminals for tasks that could be completed anywhere on the property, reducing guest responsiveness and increasing operational lag.",
    businessContext: {
      goals: ["Reduce desktop dependency", "Improve task completion on mobile", "Enhance usability for on-ground staff"],
      challenges: ["Complex desktop workflows rethought for small screens", "One-handed use critical", "Feature parity expectations"],
      constraints: ["Must support iOS and Android", "Core tasks in under 3 taps"],
    },
    research: {
      userInsights: ["60% of tasks required returning to front desk unnecessarily", "One-handed use was dominant", "Staff needed room status anywhere on property"],
      personas: [{ name: "Housekeeping Supervisor", role: "Mobile Primary User", age: 35, description: "Manages room assignments across multiple floors. Always on the move.", goals: ["Check room status anywhere", "Real-time updates"], frustrations: ["Must return to desk", "Desktop unusable on phone"] }],
      painPoints: ["Desktop dependency for portable tasks", "Mobile web non-functional", "No touch-optimised patterns"],
    },
    designProcess: {
      wireframes: "Mapped top 10 desktop tasks and rearchitected for mobile-first. Designed thumb-zone optimised navigation.",
      flows: "Task-oriented navigation replacing category-based desktop IA. Core tasks reduced to 3 steps.",
      iterations: "Tested with 8 on-ground staff in a real hotel environment.",
    },
    solution: {
      description: "Touch-first iOS and Android app with task-oriented navigation, thumb-zone optimised interactions, and real-time sync.",
      keyFeatures: ["Task-oriented navigation", "Thumb-zone bottom nav", "One-handed room status updates", "Real-time sync with frontdesk"],
    },
    designSystem: { colors: [], typography: [], components: ["Bottom Nav", "Room Card", "Quick Status", "Task List"] },
    designPrinciples: [
      { title: "Thumb-Zone First", description: "On mobile operational tools, the bottom third of the screen is prime real estate. Navigation and primary actions live there." },
      { title: "Task-Oriented Navigation", description: "Desktop category-based IA fails on mobile. Users think in tasks — organise the interface around what they need to do." },
      { title: "One-Handed by Default", description: "On-ground staff rarely have two free hands. Every primary action must be reachable with a single thumb." },
      { title: "Real Environment Testing", description: "A hotel corridor at peak check-in is a completely different context than a usability lab. Design must be validated where it will actually be used." },
    ],
    outcomes: {
      metrics: [
        { label: "Desktop Dependency", value: "−60%", description: "With iOS and Android redesign" },
        { label: "Task Completion", value: "−28%", description: "Time with task-oriented navigation" },
      ],
      businessImpact: "Enabled on-ground staff to complete operational tasks from anywhere on the property.",
      learnings: ["Desktop IA never translates directly to mobile", "Thumb-zone design is critical for operational tools", "Real environment testing reveals what lab tests miss"],
    },
    valueProposition: "Freeing hotel staff from the front desk by designing a mobile-first property management experience built for how they actually move.",
    heroIntro: "Hotel operations don't happen at a desk. Housekeeping supervisors are on multiple floors. Maintenance teams are across the property. Front desk staff step away constantly. Yet the tools they depended on were designed exclusively for desktop use — tethering people to terminals for tasks that could be completed anywhere.\n\nAs the designer on the Pocket PMS project, I set out to redesign the mobile property management experience from the ground up — not as a scaled-down version of the desktop, but as a purpose-built tool for on-ground hotel operations.\n\nThe challenge was rearchitecting complex desktop workflows for one-handed, thumb-zone-first use without sacrificing the operational completeness that hotel staff depend on every day.",
    platform: "iOS & Android Mobile App",
    users: "Housekeeping Supervisors, Maintenance Staff, Front Desk Agents, On-Ground Operations Teams",
    responsibilities: ["Mobile UX Design", "Interaction Design", "Thumb-Zone Optimisation", "iOS & Android Design", "Usability Testing", "Cross-Platform Consistency"],
    businessChallenges: [
      "Reduce staff dependency on front-desk desktop terminals.",
      "Enable core operational task completion from anywhere on the property.",
      "Deliver consistent experience across iOS and Android platforms.",
      "Achieve critical feature parity with the desktop application.",
    ],
    userChallenges: [
      "60% of tasks required unnecessary return trips to the front desk.",
      "Mobile web version was non-functional for operational use.",
      "No touch-optimised navigation patterns for one-handed use.",
      "Desktop IA was directly ported to mobile without rearchitecting.",
    ],
    researchActivities: [
      "On-ground staff observation across hotel departments",
      "Task frequency and priority mapping",
      "Thumb-zone reach analysis",
      "Real hotel environment usability testing",
      "iOS and Android interaction pattern research",
      "Desktop workflow deconstruction sessions",
    ],
    keyInsights: [
      { title: "60% of tasks didn't require a desk.", description: "Most of the actions staff were returning to terminals for could be completed anywhere — if the mobile tool was properly designed." },
      { title: "One-handed use is the operational default.", description: "On-ground staff almost never have two free hands. Every primary action had to be reachable with a single thumb." },
      { title: "Desktop IA never translates directly.", description: "Category-based desktop navigation is completely inappropriate for mobile operational tools. Users think in tasks, not menus." },
      { title: "Context changes everything.", description: "A hotel corridor at peak check-in is a fundamentally different environment than a usability lab. Testing must happen where the product will actually be used." },
      { title: "Real-time sync is table stakes.", description: "Without real-time sync to the desktop system, mobile tools create information asymmetry — which is more damaging than having no mobile tool at all." },
    ],
    businessSuccess: [
      "Reduce staff dependency on front-desk desktop terminals by over 50%.",
      "Enable core task completion from anywhere on the property.",
      "Improve on-ground responsiveness to guest needs.",
      "Maintain consistent experience across iOS and Android.",
    ],
    userSuccess: [
      "Complete most common tasks in under 3 taps.",
      "Access room status from anywhere on the property.",
      "Navigate comfortably with one hand during active operations.",
      "Receive real-time updates without returning to the front desk.",
    ],
    solutionEvolution: [
      {
        challenge: "Hotel staff were returning to front-desk terminals for tasks that could be completed anywhere on the property.",
        decision: "We identified the top 10 most frequent desktop tasks and rearchitected them specifically for mobile, prioritising thumb-zone accessibility throughout.",
        outcome: "Desktop dependency dropped by 60% as staff gained the ability to handle core operations directly from their devices.",
      },
      {
        challenge: "The existing mobile experience used desktop navigation patterns incompatible with one-handed use.",
        decision: "We replaced category-based navigation with task-oriented bottom navigation designed around natural thumb reach zones.",
        outcome: "Navigation became significantly faster and more intuitive, reducing cognitive effort during high-activity operational moments.",
      },
      {
        challenge: "Real-time property data was only accessible at the front desk, creating information asymmetry across the team.",
        decision: "We built real-time bidirectional sync as a core architectural requirement from the beginning of the project.",
        outcome: "On-ground staff could make informed decisions without consulting a colleague at the desk first.",
      },
    ],
    solutionFeatures: [
      {
        title: "Task-Oriented Navigation",
        tagline: "Navigate by what you need to do.",
        description: "Bottom navigation rebuilt around the most frequent operational tasks rather than product categories — enabling faster access to the right workflow with minimal cognitive overhead in any environment.",
      },
      {
        title: "Thumb-Zone Optimised Layout",
        tagline: "Everything within reach.",
        description: "All primary actions placed within comfortable one-handed thumb reach. Interface layout designed using thumb-zone mapping to ensure critical interactions never require awkward stretching.",
      },
      {
        title: "One-Tap Room Status Updates",
        tagline: "Update from anywhere.",
        description: "Room status changes — the most frequent operational task — accessible in a single tap from anywhere in the app, eliminating the need to navigate through multiple screens.",
      },
      {
        title: "Real-Time Desktop Sync",
        tagline: "One source of truth.",
        description: "Live bidirectional sync with the desktop PMS ensures mobile updates are immediately visible to front-desk staff and vice versa — eliminating information gaps across the entire team.",
      },
    ],
    reflection: [
      "Pocket PMS taught me that mobile design for operational contexts requires starting from scratch — not from the desktop. Every assumption embedded in the desktop IA was wrong for the mobile environment.",
      "I developed a deep appreciation for thumb-zone design as a genuine design discipline. Where you place an action is as important as what the action does. Reachability is itself a form of usability.",
      "The most important lesson was about the necessity of real-environment testing. No amount of lab testing could have revealed the specific challenges of one-handed use in a busy hotel corridor. Designing for real conditions requires testing in real conditions.",
    ],

    nextProject: "positivity-mental-health",
    prevProject: "hotelogix-website",
  },
  {
    id: "6",
    slug: "positivity-mental-health",
    title: "Positivity — Mental Health Platform",
    industry: "Health Tech",
    category: "SaaS",
    shortDescription:
      "25-component design system and end-to-end UX for a mental health platform across 45+ screens.",
    overview:
      "Designed the complete product experience for Positivity, a mental health platform — including a 25-component design system, conflict-detection scheduling, and developer handoff optimisation across 45+ screens.",
    timeline: "Jul 2022 – Present",
    role: "Product Design Consultant",
    team: ["Solo Designer", "Engineering", "Clinical Advisors"],
    coverImage: "/images/positivity.jpg",
    images: [],
    tags: ["Health Tech", "Design System", "Web App", "Mobile"],
    featured: true,
    problemStatement:
      "Positivity had no coherent design system, scheduling conflicts causing double-bookings, and a slow developer handoff process blocking product velocity.",
    businessContext: {
      goals: ["Eliminate scheduling conflicts", "Build a scalable design system", "Accelerate developer handoff"],
      challenges: ["Sensitive subject matter requiring non-clinical tone", "Complex scheduling logic", "45+ screen delivery timeline"],
      constraints: ["Must work across web and mobile", "Developer-ready from day one"],
    },
    research: {
      userInsights: ["Scheduling conflicts were the #1 complaint", "Inconsistent UI was eroding trust", "Handoff took 7 developer cycles per feature"],
      personas: [{ name: "Platform User", role: "Mental Health Seeker", age: 28, description: "Values calm, consistent UI and frictionless booking.", goals: ["Easy session booking", "Trust the platform"], frustrations: ["Double-booking errors", "Inconsistent UI"] }],
      painPoints: ["Scheduling errors", "No shared design system", "7-cycle developer handoff"],
    },
    designProcess: {
      wireframes: "Audited all existing screens and identified 25 core component patterns. Built conflict-detection logic map.",
      flows: "Designed scheduling, session booking, and therapist matching flows with conflict-detection.",
      iterations: "Collaborated with engineering across 3 handoff sprints to validate spec accuracy.",
    },
    solution: {
      description: "Complete product redesign with a 25-component design system, conflict-detection scheduling, and streamlined developer handoff.",
      keyFeatures: ["25-component design system", "Conflict-detection scheduling", "45+ screens with full specs", "Handoff cycles from 7 to 3"],
    },
    designSystem: { colors: [], typography: [], components: ["Booking Card", "Session Calendar", "Conflict Alert", "Therapist Profile"] },
    designPrinciples: [
      { title: "Calm as a Design Value", description: "In mental health contexts, visual noise is harmful. Every design decision must ask: does this create or reduce anxiety?" },
      { title: "System Before Screen", description: "A component library built upfront pays compound interest — every new screen is faster, more consistent, and cheaper to hand off." },
      { title: "Conflict-Detection is UX", description: "Scheduling logic is not purely an engineering concern. The user experience of an error message is a design failure, not just a bug." },
      { title: "Spec for the Developer", description: "Design handoff quality directly determines how faithfully the product gets built. Invest in documentation as much as in the design itself." },
    ],
    outcomes: {
      metrics: [
        { label: "Scheduling Errors", value: "Zero", description: "Conflict-detection eliminated all errors" },
        { label: "Design System", value: "25", description: "Components across 45+ screens" },
        { label: "Handoff Cycles", value: "7 → 3", description: "Days reduced per feature" },
      ],
      businessImpact: "Zero scheduling errors restored user trust. Design system accelerated product velocity significantly.",
      learnings: ["Conflict-detection is a design concern, not just engineering", "A well-specced system halves handoff friction", "Calm aesthetics are a product feature in health tech"],
    },
    valueProposition: "Building a complete mental health product experience — from a 25-component design system to conflict-free scheduling across 45+ screens.",
    heroIntro: "Positivity came to me without a design system, with scheduling conflicts creating double-bookings, and a developer handoff process that was slowing down the entire product team.\n\nAs a design consultant, I was brought in to solve all three problems simultaneously — building a scalable component library, redesigning the scheduling system with conflict-detection logic, and creating developer-ready specifications across 45+ screens.\n\nThe additional challenge was the nature of the product itself. Mental health platforms carry a responsibility that most digital products don't. Every design decision — color, spacing, tone, interaction — had to ask: does this create or reduce anxiety?",
    platform: "Web Application & Mobile",
    users: "Therapy Seekers, Licensed Therapists, Platform Administrators",
    responsibilities: ["Design System Architecture", "Component Design", "Scheduling UX", "Developer Handoff", "UI Design", "Clinical UX Consultation"],
    businessChallenges: [
      "Eliminate scheduling conflicts causing repeated double-bookings.",
      "Build a scalable design system covering 25 core component patterns.",
      "Reduce developer handoff cycles from 7 to under 3.",
      "Deliver complete specifications across 45+ screens on schedule.",
    ],
    userChallenges: [
      "Scheduling conflicts were damaging trust in the platform.",
      "Inconsistent UI across screens was eroding user confidence.",
      "Handoff gaps caused shipped features to diverge from design intent.",
      "No shared design language slowed every new screen delivery.",
    ],
    researchActivities: [
      "User interview series with platform users and therapists",
      "Scheduling conflict root-cause analysis",
      "Developer handoff process audit",
      "Mental health UX best practices review",
      "Competitor platform analysis",
      "Clinical advisor consultation sessions",
    ],
    keyInsights: [
      { title: "Scheduling errors destroy trust completely.", description: "A double-booking in a mental health context doesn't just inconvenience — it damages the therapeutic relationship and the platform's credibility." },
      { title: "Calm is a design output, not a style choice.", description: "Inconsistent UI, unexpected animations, or cluttered screens create measurable anxiety. Visual consistency is therapeutic, not just aesthetic." },
      { title: "Handoff quality determines build quality.", description: "The gap between design intent and shipped product was directly correlated to specification completeness. Investing in handoff documentation paid compound interest." },
      { title: "A design system pays forward.", description: "Every hour invested in the component library returned multiple hours on subsequent screens. The system was the product." },
      { title: "Conflict-detection is a UX problem.", description: "The way scheduling conflicts were surfaced and resolved was as much a design responsibility as it was an engineering one." },
    ],
    businessSuccess: [
      "Eliminate scheduling conflicts and all associated double-bookings.",
      "Establish a scalable 25-component design system.",
      "Reduce developer handoff cycles from 7 to 3.",
      "Deliver complete, developer-ready specifications for 45+ screens.",
    ],
    userSuccess: [
      "Book sessions without any risk of scheduling conflicts.",
      "Experience a calm, consistent interface throughout the platform.",
      "Trust the platform with sensitive personal information.",
      "Navigate the product without confusion or unexpected friction.",
    ],
    solutionEvolution: [
      {
        challenge: "Scheduling conflicts were creating double-bookings and actively damaging user trust in the platform.",
        decision: "We redesigned the scheduling system with built-in conflict-detection logic that surfaces and resolves conflicts before they can be confirmed.",
        outcome: "Scheduling errors were eliminated entirely, removing the most common complaint and restoring user confidence in the platform.",
      },
      {
        challenge: "There was no shared design language, causing visual inconsistency across screens that undermined platform trustworthiness.",
        decision: "We audited all existing screens, identified 25 core component patterns, and built a complete design system from the ground up.",
        outcome: "Visual consistency was established across the entire product, reducing per-screen design time and improving user trust significantly.",
      },
      {
        challenge: "Developer handoff was consuming 7 iteration cycles per feature, dramatically slowing product velocity.",
        decision: "We restructured the handoff process around comprehensive specifications — states, interactions, measurements, and edge cases documented from day one.",
        outcome: "Handoff cycles dropped from 7 to 3, accelerating the development pipeline and improving designer-developer collaboration throughout.",
      },
    ],
    solutionFeatures: [
      {
        title: "25-Component Design System",
        tagline: "Build once. Scale everywhere.",
        description: "A complete design system covering all core UI patterns across the platform — built for consistency, accessibility, and developer-ready specification from the first component to the last.",
      },
      {
        title: "Conflict-Detection Scheduling",
        tagline: "Book with confidence.",
        description: "Scheduling redesigned with real-time conflict-detection that prevents double-bookings before they occur — surfacing issues at the point of selection rather than at the point of confirmation.",
      },
      {
        title: "45+ Screen Full Coverage",
        tagline: "Complete. Not partial.",
        description: "Full product coverage across 45+ screens with complete specifications — states, measurements, interactions, and edge cases documented to a standard that reduced handoff friction significantly.",
      },
      {
        title: "Developer-Ready Handoff System",
        tagline: "From design to code, faster.",
        description: "A structured handoff process redesigned to support faster, higher-fidelity implementation — reducing revision cycles and enabling engineering to build confidently from first delivery.",
      },
    ],
    reflection: [
      "Positivity taught me that designing for sensitive contexts requires a fundamentally different lens. Every decision must pass a test that most products never ask: does this create or reduce anxiety? That question changed how I approached every single design choice on the project.",
      "Building a design system as the first deliverable — rather than a later optimisation — was the most impactful decision on the project. The compound returns on a well-built component library are difficult to overstate.",
      "The developer handoff work reinforced something I now believe strongly: design is incomplete until it's built correctly. Investing in specification quality is not overhead — it's the last mile of the design process.",
    ],

    nextProject: "kalam-labs",
    prevProject: "pocket-pms",
  },
  {
    id: "7",
    slug: "kalam-labs",
    title: "Kalam Labs — Shark Tank India",
    industry: "EdTech",
    category: "Product Design",
    shortDescription:
      "Investor-facing product experience for a Shark Tank India–featured startup, enhancing product storytelling and usability.",
    overview:
      "Contributed to the high-impact product design for Kalam Labs — an EdTech startup featured on Shark Tank India. Focused on investor-facing product experience, storytelling clarity, and usability improvements that supported the funding pitch.",
    timeline: "2023",
    role: "Product Design Consultant",
    team: ["Design", "Founders", "Engineering"],
    coverImage: "/images/kalam-labs.jpg",
    images: [],
    tags: ["EdTech", "Product Design", "Startup", "Investor UX"],
    featured: true,
    problemStatement:
      "Kalam Labs needed a polished, investor-ready product experience that could clearly communicate its value proposition during a high-stakes Shark Tank India pitch.",
    businessContext: {
      goals: ["Create compelling investor-facing product experience", "Improve product storytelling clarity", "Enhance usability for demo scenarios"],
      challenges: ["Tight timeline tied to pitch schedule", "Balancing investor storytelling with actual user needs", "High visibility — zero tolerance for product issues during pitch"],
      constraints: ["Delivery aligned to Shark Tank India filming schedule", "Must work flawlessly in demo conditions"],
    },
    research: {
      userInsights: ["Investors evaluate product quality in the first 60 seconds", "Demo flows must be intuitive without narration", "Visual polish signals execution capability to investors"],
      personas: [{ name: "Investor / Shark", role: "Secondary User", age: 45, description: "Evaluates product in 60 seconds. Looks for clarity, polish, and market potential.", goals: ["Understand product quickly", "Assess scalability"], frustrations: ["Confusing flows", "Unpolished UI"] }],
      painPoints: ["Product lacked investor-ready polish", "Storytelling flow not optimised for pitch context", "Usability gaps visible under demo conditions"],
    },
    designProcess: {
      wireframes: "Mapped investor pitch flow and optimised product demo path for clarity and impact.",
      flows: "Designed guided demo experience that communicated value proposition in under 60 seconds.",
      iterations: "Multiple pitch rehearsal rounds informed final design refinements.",
    },
    solution: {
      description: "An investor-ready product experience with refined UI polish, optimised demo flows, and clear product storytelling aligned to the Shark Tank pitch.",
      keyFeatures: ["Investor-optimised demo flow", "Refined UI polish for pitch context", "Clear product value storytelling", "Usability improvements for demo reliability"],
    },
    designSystem: { colors: [], typography: [], components: ["Demo Flow", "Onboarding Screen", "Feature Highlight", "Value Proposition Card"] },
    designPrinciples: [
      { title: "First Impressions Are Design Decisions", description: "Investors form a product opinion in under 60 seconds. Every pixel in the critical path must earn its place." },
      { title: "Demo Reliability is Non-Negotiable", description: "A broken flow during a pitch is a design failure. Reliability under demo conditions must be explicitly designed for." },
      { title: "Storytelling Through Sequence", description: "The order in which features are revealed shapes perceived value. Sequence is a design tool, not an afterthought." },
      { title: "Polish Signals Execution", description: "For investors, UI quality is a proxy for team capability. Visual refinement communicates that the team sweats the details." },
    ],
    outcomes: {
      metrics: [
        { label: "Platform", value: "Shark Tank India", description: "Featured national television" },
        { label: "Focus", value: "Investor UX", description: "Product storytelling and usability" },
      ],
      businessImpact: "The product experience contributed to Kalam Labs' successful Shark Tank India appearance, enhancing investor perception of product quality and execution capability.",
      learnings: ["Investor UX is a distinct design discipline", "Demo reliability is a design responsibility", "First impressions in product are made in seconds"],
    },
    valueProposition: "Crafting an investor-ready product experience for a Shark Tank India–featured EdTech startup under high visibility and a tight deadline.",
    heroIntro: "Kalam Labs was going to be on national television. The product had to be ready — not just functionally, but in a way that communicated competence, clarity, and confidence to investors evaluating it in under 60 seconds.\n\nAs a design consultant, I joined the team at a critical moment: the Shark Tank India filming schedule was fixed, and the product needed a level of polish and demo reliability that it hadn't yet achieved.\n\nDesigning for an investor pitch is a specific discipline. It's not about building the best product for end users — it's about building the best demonstration of the best product for people evaluating your team's ability to execute under pressure.",
    platform: "Web & Mobile Product Demo",
    users: "Investors & Judges, End-User Students, Platform Administrators",
    responsibilities: ["Product Design", "Demo Flow Design", "UI Polish", "Investor UX Strategy", "Rapid Prototyping", "Pitch Flow Optimisation"],
    businessChallenges: [
      "Deliver an investor-ready product experience before a fixed filming deadline.",
      "Communicate the product value proposition within 60 seconds of interaction.",
      "Demonstrate execution capability through the quality of the UI.",
      "Ensure zero failure points along the critical demo path.",
    ],
    userChallenges: [
      "Product had usability gaps that were critical under demo conditions.",
      "Value proposition was not immediately clear in the first 60 seconds.",
      "Visual inconsistencies undermined perceived team quality.",
      "Demo reliability had not been explicitly designed for.",
    ],
    researchActivities: [
      "Investor evaluation framework research",
      "Demo flow usability testing",
      "Pitch rehearsal observation and iteration",
      "EdTech competitive landscape review",
      "User flow friction auditing",
      "Pitch narrative alignment sessions with founders",
    ],
    keyInsights: [
      { title: "First impressions happen in seconds.", description: "Investors form a product opinion within the first 60 seconds. Every pixel in the critical demo path had to earn its place." },
      { title: "Demo reliability is a design responsibility.", description: "A broken flow during a pitch is a design failure. Reliability under demo conditions must be explicitly designed for — not assumed." },
      { title: "Sequence shapes perceived value.", description: "The order in which features are revealed significantly impacts perceived product quality. Sequence is a design tool, not an afterthought." },
      { title: "Visual polish signals execution capability.", description: "For investors, UI quality is a proxy for team quality. Refinement communicates that the team cares about details." },
      { title: "Simplicity reads as confidence.", description: "Cluttered or overloaded demos signal uncertainty about what matters. A focused, clear experience reads as a team that knows what they're building." },
    ],
    businessSuccess: [
      "Deliver a pitch-ready product experience before the filming date.",
      "Communicate product value clearly within 60 seconds of interaction.",
      "Demonstrate execution quality through UI polish and consistency.",
      "Support a successful Shark Tank India appearance and investor engagement.",
    ],
    userSuccess: [
      "Understand the product's value without requiring narration.",
      "Navigate the demo flow intuitively without guidance.",
      "Experience consistent, polished UI throughout.",
      "Form a strong positive product impression within the first interaction.",
    ],
    solutionEvolution: [
      {
        challenge: "The product had usability gaps that were acceptable in normal use but became critical failure points under demo conditions.",
        decision: "We mapped the investor demo path specifically and systematically resolved every friction point along that critical flow.",
        outcome: "The demo experience became reliable and polished enough to withstand the pressure of a live national television pitch.",
      },
      {
        challenge: "The product's value proposition wasn't immediately clear during the first 60 seconds of interaction.",
        decision: "We redesigned the opening sequence to lead with the most compelling and differentiated aspects of the product experience.",
        outcome: "The demo narrative was restructured to communicate value at investor evaluation speed — landing the core message before the first minute.",
      },
      {
        challenge: "Visual inconsistencies across screens were undermining the perception of execution quality.",
        decision: "We conducted a systematic UI polish pass across all demo-critical screens, establishing consistency in spacing, type, and component states.",
        outcome: "The product presented a unified, professional quality that reinforced investor confidence in the team's attention to detail and execution capability.",
      },
    ],
    solutionFeatures: [
      {
        title: "Investor-Optimised Demo Flow",
        tagline: "Value in 60 seconds.",
        description: "A carefully sequenced demo experience designed for the evaluation speed of investors — leading with differentiation, building credibility through simplicity, and delivering the core value proposition before the first minute.",
      },
      {
        title: "Refined UI Polish",
        tagline: "Details that signal execution.",
        description: "Systematic polish pass across all demo-critical screens — consistent spacing, type hierarchy, component states, and interaction feedback — creating a product that reads as the work of a team that sweats the details.",
      },
      {
        title: "Clear Product Value Storytelling",
        tagline: "Show, don't just tell.",
        description: "Redesigned onboarding and feature introduction sequence that communicates product purpose and differentiation through the product itself — not through narration, slides, or external explanation.",
      },
      {
        title: "Demo Reliability Architecture",
        tagline: "Built to perform under pressure.",
        description: "Explicit design attention to the reliability of the demo flow — eliminating loading states, edge-case crashes, and state management issues that could disrupt the pitch experience under live conditions.",
      },
    ],
    reflection: [
      "Kalam Labs taught me that investor UX is a distinct design discipline. The success metrics are different — not task completion or time-on-task, but perceived competence and memorability within a 60-second window.",
      "Designing under the pressure of a filming deadline reinforced the value of ruthless prioritisation. When time is constrained, the most valuable design work is identifying what matters most — and doing only that, exceptionally well.",
      "The biggest lesson was about the relationship between polish and trust. In contexts where viewers are evaluating capability rather than using a product, visual quality is a signal. The medium is part of the message.",
    ],

    nextProject: "axiesroom",
    prevProject: "positivity-mental-health",
  },
  {
    id: "8",
    slug: "axiesroom",
    title: "AxisRooms — Channel Manager",
    industry: "Enterprise Hospitality",
    category: "Enterprise UX",
    shortDescription: "Untangling enterprise workflows for faster hotel operations — a navigation and information architecture redesign for AxisRooms, a hotel channel manager.",
    overview: "Untangling enterprise workflows for faster hotel operations — a navigation and information architecture redesign for AxisRooms, a hotel channel manager.",
    timeline: "Placeholder",
    role: "Placeholder Role",
    team: ["Placeholder"],
    coverImage: "/images/axiesroom.jpg",
    images: [],
    tags: ["Placeholder"],
    tools: ["Figma"],
    featured: false,
    problemStatement: "Placeholder problem statement for Axiesroom.",
    businessContext: { goals: ["Placeholder goal"], challenges: ["Placeholder challenge"], constraints: ["Placeholder constraint"] },
    research: { userInsights: ["Placeholder insight"], personas: [], painPoints: ["Placeholder pain point"] },
    designProcess: { wireframes: "Placeholder.", flows: "Placeholder.", iterations: "Placeholder." },
    solution: { description: "Placeholder solution description.", keyFeatures: ["Placeholder feature"] },
    designSystem: { colors: [], typography: [], components: [] },
    designPrinciples: [{ title: "Placeholder Principle", description: "Placeholder description." }],
    outcomes: { metrics: [], businessImpact: "Placeholder impact.", learnings: ["Placeholder learning"] },
    nextProject: "contact-me",
    prevProject: "kalam-labs",
  },
  {
    id: "9",
    slug: "contact-me",
    title: "Contact Me",
    industry: "Placeholder Industry",
    category: "Product Design",
    shortDescription: "Placeholder short description for the Contact Me case study.",
    overview: "Placeholder overview for the Contact Me case study.",
    timeline: "Placeholder",
    role: "Placeholder Role",
    team: ["Placeholder"],
    coverImage: "/images/contact-me.jpg",
    images: [],
    tags: ["Placeholder"],
    tools: ["Figma"],
    featured: false,
    problemStatement: "Placeholder problem statement for Contact Me.",
    businessContext: { goals: ["Placeholder goal"], challenges: ["Placeholder challenge"], constraints: ["Placeholder constraint"] },
    research: { userInsights: ["Placeholder insight"], personas: [], painPoints: ["Placeholder pain point"] },
    designProcess: { wireframes: "Placeholder.", flows: "Placeholder.", iterations: "Placeholder." },
    solution: { description: "Placeholder solution description.", keyFeatures: ["Placeholder feature"] },
    designSystem: { colors: [], typography: [], components: [] },
    designPrinciples: [{ title: "Placeholder Principle", description: "Placeholder description." }],
    outcomes: { metrics: [], businessImpact: "Placeholder impact.", learnings: ["Placeholder learning"] },
    nextProject: "hotelogix-frontdesk",
    prevProject: "axiesroom",
  },
  {
    id: "10",
    slug: "ux4g",
    title: "UX4G Design System Audit",
    industry: "Government / Public Sector",
    category: "Research",
    valueProposition: "An audit of the UX4G design system's designer-to-developer handoff — where the workflow breaks down, and what would make it a truly shared design language.",
    shortDescription: "An audit of the UX4G design system's designer-to-developer handoff — where the workflow breaks down, and what would make it a truly shared design language.",
    overview: "UX4G is a government-focused design system used to bring consistency, accessibility, and scalability across digital public platforms. This audit evaluates it from a collaboration and implementation perspective, with a specific focus on the designer-to-developer handoff journey.",
    timeline: "21 May 2026",
    role: "Product Designer",
    team: ["Solo"],
    coverImage: "/images/ux4g.jpg",
    images: [],
    tags: ["Research", "Design Systems", "Handoff"],
    tools: ["Figma", "Notion"],
    featured: false,
    problemStatement: "How might UX4G reduce the friction and manual interpretation that currently sits between design intent and development implementation?",
    businessContext: { goals: ["Document patterns for low-bandwidth UX"], challenges: ["Limited existing literature on this topic"], constraints: ["Ongoing, informal research"] },
    research: { userInsights: ["Placeholder insight — to be filled in"], personas: [], painPoints: ["Placeholder pain point — to be filled in"] },
    designProcess: { wireframes: "Placeholder.", flows: "Placeholder.", iterations: "Placeholder." },
    solution: { description: "Placeholder — write-up in progress.", keyFeatures: ["Placeholder"] },
    designSystem: { colors: [], typography: [], components: [] },
    designPrinciples: [{ title: "Placeholder Principle", description: "Placeholder description." }],
    outcomes: { metrics: [], businessImpact: "Placeholder impact.", learnings: ["Placeholder learning"] },
    nextProject: "ai-conversation-ux",
    prevProject: "ai-conversation-ux",
  },
  {
    id: "11",
    slug: "ai-conversation-ux",
    title: "AI Conversation UX",
    industry: "Conversational AI",
    category: "Research",
    valueProposition: "Design Investigation #01 — a comparative UX investigation of ChatGPT, Claude, Gemini, and Perplexity, asking how conversational AI should build user trust.",
    shortDescription: "Design Investigation #01 — a comparative UX investigation of ChatGPT, Claude, Gemini, and Perplexity, asking how conversational AI should build user trust.",
    overview: "A comparative UX investigation of ChatGPT, Claude, Gemini, and Perplexity — examining how conversational interfaces communicate uncertainty, surface evidence, and build (or erode) user trust, independent of raw model performance.",
    timeline: "4 Days",
    role: "UX Researcher",
    team: ["Solo"],
    coverImage: "/images/ai-conversation-ux.jpg",
    images: [],
    tags: ["Research", "Conversational UX", "Competitive Analysis"],
    tools: ["Notion", "Figma"],
    featured: false,
    problemStatement: "How should conversational AI build user trust — through accuracy alone, or through transparency, evidence, and visible system behavior?",
    businessContext: { goals: ["Understand how interaction design shapes trust in conversational AI"], challenges: ["Products evolve rapidly, so observations must stay grounded in current, documented behavior"], constraints: ["4-day investigation, desk research and hands-on comparison only"] },
    research: {
      userInsights: [
        "Trust is not created by accuracy alone — it's shaped by how transparently a system communicates uncertainty",
        "Products that acknowledge limitations and surface evidence build stronger confidence than those relying on fluent language alone",
        "Visible system behavior (sources, memory, reasoning) reduces the cognitive load of deciding whether to trust a response",
      ],
      personas: [],
      painPoints: [
        "Confidence is often presented as absolute, even for uncertain or probabilistic answers",
        "Memory is largely invisible — users rarely know what's being remembered or why",
        "Evidence and citations are inconsistent across products",
      ],
    },
    designProcess: {
      wireframes: "Not applicable — this is a research investigation, not a design build.",
      flows: "Mapped the shared conversation journey across all four products: prompt → intent interpretation → response generation → evidence & references → follow-up → memory & personalization.",
      iterations: "Compared product philosophies, then synthesized friction points into a High / Medium / Low friction audit and an opportunity matrix.",
    },
    solution: {
      description: "A set of eight design principles for conversational AI trust, plus a prioritized opportunity matrix (confidence indicators, source reliability labels, a memory timeline, a conversation map, and explainable reasoning).",
      keyFeatures: ["Confidence indicators", "Source reliability labels", "Memory timeline", "Conversation map", "Explainable response reasoning"],
    },
    designSystem: { colors: [], typography: [], components: [] },
    designPrinciples: [
      { title: "Design uncertainty instead of hiding it.", description: "Distinguish verified facts from generated reasoning instead of presenting both with equal confidence." },
      { title: "Show evidence before confidence.", description: "Surface sources and reasoning before asserting an answer is correct." },
      { title: "Make memory visible and user-controlled.", description: "Give users a clear, editable record of what's being remembered." },
    ],
    outcomes: {
      metrics: [],
      businessImpact: "A prioritized opportunity matrix and eight design principles for building trustworthy conversational AI experiences.",
      learnings: [
        "Trust is a design decision, not just a model capability",
        "Transparency about limitations builds more confidence than fluent certainty",
        "The next competitive frontier for conversational AI is interaction transparency, not raw model performance",
      ],
    },
    nextProject: "ux4g",
    prevProject: "ux4g",
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string) =>
  category === "All"
    ? projects
    : projects.filter((p) => p.category === category);

// Research investigations live at /research/[slug]; everything else lives
// at /case-studies/[slug].
export const projectHref = (p: Pick<Project, "slug" | "category">) =>
  p.category === "Research" ? `/research/${p.slug}` : `/case-studies/${p.slug}`;
