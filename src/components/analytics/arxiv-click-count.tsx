"use client";

import { useClickData } from "@/components/analytics/use-click-data";
import { totalClicks } from "@/lib/analytics";

const countFormat = new Intl.NumberFormat("en-US");

export function ArxivClickCount() {
  const { data, published, global } = useClickData();
  const count = data ? countFormat.format(totalClicks(data)) : published ? "—" : "0";
  const note = !published ? "Counting starts when the official arXiv preprint is published." :
    global ? "Clicks across all visitors." : "Clicks recorded in this browser.";
  return (
    <p className="arxiv-click-count" title={note} aria-live="polite" aria-atomic="true">
      <span className="arxiv-click-number">{count}</span>{" "}<span className="arxiv-click-label">clicks on arXiv</span>
    </p>
  );
}
