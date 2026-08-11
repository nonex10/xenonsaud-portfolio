// Case study copy is written honestly as academic / personal design work.
// No fabricated research, metrics, clients, or testimonials.

export const projects = [
  {
    slug: "aura-beauty",
    number: "01",
    title: "Aura Beauty",
    category: "UI/UX Design · E-Commerce · Figma",
    description:
      "A skincare e-commerce concept designed around simplicity, trust, and an elegant shopping journey.",
    featured: true,
    accent: "plum",
    mockup: "ecommerce",
    image: "/images/aura-beauty/landingpage.svg",
    case: {
      overview:
        "Aura Beauty is a concept skincare storefront I designed end-to-end in Figma, from early structure through a high-fidelity interface. The goal was to explore how a beauty brand could feel calm and trustworthy online rather than crowded and promotional.",
      problem:
        "Many skincare sites lean on dense promotional layout: banners, badges, and pop-ups competing for attention. I wanted to test whether a quieter, editorial layout could still guide someone confidently from browsing to checkout.",
      goals: [
        "Make product discovery feel calm, not overwhelming",
        "Build a visual language that reads as trustworthy and premium",
        "Design a product detail flow that answers real buying questions clearly",
        "Keep the interface consistent across categories, listings, and detail pages",
      ],
      userFlow:
        "I mapped the core path a first-time visitor takes: landing on the homepage, browsing a category, opening a product, and reaching checkout. Each step was scoped before any visual design began, so the structure would hold up once styling was applied.",
      wireframes:
        "Low-fidelity wireframes established page structure, content priority, and grid before I introduced color or type — homepage sections, listing filters, and the product detail layout were all blocked out in grayscale first.",
      visualDirection:
        "The visual direction pairs a soft neutral palette with a single deep accent color, generous whitespace, and a serif/sans pairing to give the brand an editorial, premium feel rather than a clinical one.",
      finalUI:
        "The final interface covers the homepage, product listing, product detail, About, Contact, and category pages, built as a consistent component system in Figma: cards, buttons, navigation, and form fields all share the same design tokens.",
      prototype:
        "Key screens are connected in Figma as a clickable prototype, so the flow from homepage to product to checkout can be reviewed as an experience rather than a set of static screens.",
    },
  },
  {
    slug: "workfolio",
    number: "02",
    title: "WorkFolio",
    category: "UI/UX Design · Landing Page Redesign · Figma",
    description:
      "A landing page redesign focused on improving visual hierarchy, content organization, and overall usability.",
    featured: false,
    accent: "plum",
    mockup: "landing",
    image: "/images/workfolio/homepage.svg",
  case: {
  overview:
    "WorkFolio is a UI/UX redesign project focused on improving visual hierarchy, spacing, typography, and overall consistency across multiple screens.",

  designChallenge:
    "The original interface had useful content but lacked clear hierarchy and visual organization. My goal was to create a cleaner and more cohesive experience while keeping its original purpose.",

  pagesDesigned: [
    "Landing Page",
    "Sign In / Sign Up",
    "Pricing Page",
    "Contact Us Page",
    "Desktop Dashboard",
    "Login Page",
  ],

  beforeAfter:
    "I compared the original screens with my redesigned versions to highlight improvements in layout, spacing, typography, color, and visual organization.",

  designApproach:
    "I recreated the selected screens in Figma and refined their layout, typography, spacing, buttons, cards, and navigation for better consistency.",

  visualDirection:
    "The redesign uses a consistent color system, stronger typography, structured sections, and clearer visual hierarchy across the screens.",

  finalDesign:
    "The final design brings the selected screens together with a consistent visual style while keeping each page focused on its purpose.",

  improvements: [
    "Clearer visual hierarchy",
    "Better spacing and alignment",
    "More consistent typography and colors",
    "Improved content organization",
    "Stronger CTA placement",
  ],

  reflection:
    "This project helped me understand how small changes in hierarchy, spacing, typography, and consistency can improve an existing interface.",
},
  },
  {
    slug: "taskora",
    number: "03",
    title: "TaskOra",
    category: "UI/UX · Academic Platform · Dashboard Design",
    description:
      "An academic task management platform designed to help students and teachers manage tasks, courses, and academic workflows more efficiently.",
    featured: false,
    accent: "plum",
    mockup: "dashboard",
    image: "/images/taskora/Aboutpage.svg",
    case: {
      overview:
        "TaskOra is my final year academic project a full-stack task and assignment management system built with a small team. I led the UI/UX design, shaping how students and teachers navigate tasks, courses, and academic workflows.",
      users:
        "Two primary roles use the platform: students, who track assignments and deadlines across courses, and teachers, who create tasks and monitor course-level progress.",
      problem:
        "Academic task tracking is often scattered across chat groups, notice boards, and memory. TaskOra's goal was a single, role-aware dashboard where both students and teachers could see what mattered without digging.",
      userRoles:
        "I designed distinct dashboard experiences for each role: students see personal deadlines and course activity, while teachers see course-wide task status and student progress at a glance.",
      userFlow:
        "Flows were mapped separately for each role: a student's path from login to viewing and completing a task, and a teacher's path from creating a task to reviewing submissions and course status.",
      informationStructure:
        "Tasks, courses, and notifications needed a clear hierarchy so the dashboard didn't become another cluttered list. I grouped content by urgency and course, with secondary detail available on demand rather than shown by default.",
      dashboardDesign:
        "Both dashboards share a component system — cards, status indicators, and navigation so the interface feels consistent while surfacing role-specific information.",
      finalUI:
        "The final interface covers authentication, both dashboards, task views, and course management screens, designed in Figma before implementation.",
    },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
