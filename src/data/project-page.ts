// Content verified against Physical_AI___Monograph.pdf. Edit this file for release updates.
export type ImageAsset = { src: string | null; width: number; height: number; alt: string };

export const projectInfo = {
  name: "Physical AI",
  fullTitle: "Physical AI: Concepts, Techniques, and Challenges",
  subtitle: ["Concepts, Techniques, and Challenges"],
  status: "Forthcoming monograph · Preprint",
  description: "A monograph on intelligence that perceives, models, and acts upon the physical world, connecting technical foundations with embodied systems and the challenges of Physical AGI.",
  team: "Physical Intelligence Team, Shanghai AI Laboratory",
  year: "2026",
  pdf: "/paper/Physical_AI___Monograph.pdf",
  pdfSize: "66.1 MB",
  publisher: null as string | null,
  publicationDate: null as string | null,
  purchaseUrl: null as string | null,
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Contents", href: "#contents" },
  { label: "Authors", href: "#authors" },
  { label: "Resources", href: "#resources" },
  { label: "Citation", href: "#bibtex" },
];

export const authors = [{ id: "physical-intelligence-team", name: projectInfo.team }];
export const teamLogos: (ImageAsset & { id: string })[] = [
  { id: "shanghai-ai-laboratory", src: "/images/ailab-logo.png", width: 672, height: 390, alt: "Shanghai Artificial Intelligence Laboratory" },
];
export const heroActions = [
  { label: "Read the preprint", href: projectInfo.pdf, icon: "pdf" },
  { label: "Table of contents", href: "#contents", icon: "contents" },
  { label: "Resources", href: "#resources", icon: "resources" },
  { label: "BibTeX", href: "#bibtex", icon: "citation" },
];
export const bookCover: ImageAsset = {
  src: "/images/monograph/cover-v2.png",
  width: 1024,
  height: 1536,
  alt: "Book cover of Physical AI: Concepts, Techniques, and Challenges",
};
export const figures: Record<string, ImageAsset> = {
  teaser: { src: "/images/monograph/progression.png", width: 1212, height: 372, alt: "Figure 1.1: progression from digital tools and simulated agents to real-world agents, multi-agent collaboration, and infrastructure-level physical intelligence" },
  framework: { src: "/images/monograph/closed-loop.png", width: 1200, height: 828, alt: "Figure 1.3: perception, world modeling, decision-making, and control connected through physical feedback, data, and hardware" },
};

export const aboutParagraphs = [
  "Physical AI is developing rapidly, yet its definition, technical landscape, and central challenges remain open questions. This monograph brings these questions together through a unified framework: artificial systems that perceive, model, and act upon the physical world through continuous feedback under real-world constraints.",
  "It distinguishes Physical AI from digital AI, embodied AI, cyber-physical systems, and digital twins, and develops its foundations across physics, control, cognition, learning, and reasoning. The technical survey connects multimodal perception, physical data and simulation, world models, embodied foundation models, motor control, physical agents, and hardware–software co-design.",
  "Applications span robotics, manufacturing, infrastructure, scientific experimentation, and autonomous services. The monograph examines sim-to-real transfer, reliability, real-time execution, evaluation, safety, governance, and sustained deployment, before considering the research directions toward more general physical intelligence and Physical AGI.",
];
export const coreElements = [
  { number: "01", title: "Perceive", body: "Estimate physical states from vision, touch, force, proprioception, and other sensing modalities." },
  { number: "02", title: "Model & predict", body: "Represent physical relationships and anticipate the consequences of possible actions." },
  { number: "03", title: "Decide & act", body: "Connect goals, planning, and control to feasible interventions in the physical world." },
  { number: "04", title: "Adapt through feedback", body: "Verify outcomes, revise behavior, and learn across control, task, and deployment timescales." },
];
export const partDescriptions: Record<string, string> = {
  i: "Definitions, boundaries, and the foundations in physics, control, cognition, and learning.",
  ii: "The technical stack: perception, data, world models, manipulation, motor control, agents, and systems.",
  iii: "General physical intelligence, evaluation and governance, and long-term development strategies.",
};
export const resources: { id: string; title: string; description: string; label: string; href: string | null; icon: "pdf" | "code" | "slides" | "errata" }[] = [
  { id: "preprint", title: "Preprint manuscript", description: "Read the current 362-page manuscript, including all 12 chapters and the reference list.", label: "Open PDF · 66.1 MB", href: projectInfo.pdf, icon: "pdf" },
  { id: "code", title: "Code & examples", description: "A space for companion implementations and examples. Links will be added when available.", label: "Coming soon", href: null, icon: "code" },
  { id: "slides", title: "Lecture slides", description: "A space for chapter slides and teaching materials to accompany the monograph.", label: "Coming soon", href: null, icon: "slides" },
  { id: "errata", title: "Errata & feedback", description: "Corrections and a reader feedback channel will be added here when available.", label: "Coming soon", href: null, icon: "errata" },
];
export const citationText = `${projectInfo.team}. ${projectInfo.fullTitle}. Preprint, 2026.`;
export const bibtex = `@misc{physicalai2026monograph,
  title  = {Physical AI: Concepts, Techniques, and Challenges},
  author = {{Physical Intelligence Team, Shanghai AI Laboratory}},
  year   = {2026},
  note   = {Preprint}
}`;
