export type ReadingEvent = "chapter_open" | "reading_open" | "publication_open";
export type EventParameters = Record<string, string | number>;

export const analyticsConfig = { enabled: false };

// Integration hook only. This module has no network requests or persistent counters.
export function trackReadingEvent(name: ReadingEvent, parameters: EventParameters) {
  if (!analyticsConfig.enabled || typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("physicalai:analytics", { detail: { name, parameters } }));
  } catch {
    // Analytics must never interrupt navigation.
  }
}
