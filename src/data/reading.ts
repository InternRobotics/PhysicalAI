import contents from "@/data/contents.json";

// All destinations stay empty until a publicly released URL is supplied.
export const publicationLinks = {
  book: null as string | null,
  chapters: {
    1: null, 2: null, 3: null, 4: null, 5: null, 6: null,
    7: null, 8: null, 9: null, 10: null, 11: null, 12: null,
  } as Record<number, string | null>,
};

const chapterDescriptions: Record<number, string> = {
  1: "The definition, boundaries, core elements, and application landscape of Physical AI, and its place in the evolution of artificial intelligence.",
  2: "The foundations of physical intelligence across mathematical descriptions of the world, control theory, embodied cognition, learning, and reasoning.",
  3: "Physical perception from multimodal sensing and fusion to spatial understanding, high-level perception, and cognition.",
  4: "Data collection and interaction, physics engines and generative worlds, sim-to-real transfer, and the data flywheel for Physical AI.",
  5: "World models: their theoretical frameworks, representations, architectures, training, validation, and current challenges.",
  6: "Foundation models for robot manipulation, including vision-language-action models, capability shaping, adaptation, deployment, and dexterous manipulation.",
  7: "Foundation models for whole-body motor control, connecting body dynamics and state estimation with command-conditioned control, recovery, and safety.",
  8: "Physical agents: their definition and forms, physical goal representation, task grounding, and multi-agent collaboration.",
  9: "The hardware and systems behind physical intelligence, from sensors and actuators to software infrastructure, reliability, and integrated robotic systems.",
  10: "General physical intelligence, open-world generalization, human–AI collaboration, collective intelligence, and the path toward Physical AGI.",
  11: "Evaluation, benchmarking, physical safety, action alignment, risk governance, and the legal and ethical context of Physical AI.",
  12: "Development strategies for physical intelligence and its relationship with human civilization, followed by the monograph’s summary and outlook.",
};

export const chapters = contents.flatMap((part) => part.chapters.map((chapter) => ({
  ...chapter,
  partNumber: part.number,
  partTitle: part.title,
  description: chapterDescriptions[chapter.number],
})));

export function chapterPath(number: number) {
  return `/chapters/${number}/`;
}

export function getChapter(slug: string) {
  return chapters.find((chapter) => String(chapter.number) === slug);
}
