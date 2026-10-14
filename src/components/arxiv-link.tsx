"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackArxivClick } from "@/lib/analytics";

export function ArxivLink({ href, children, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "onAuxClick"> & { href: string }) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="arxiv_click"
      onClick={() => { void trackArxivClick(href); }}
      onAuxClick={(event) => { if (event.button === 1) void trackArxivClick(href); }}
    >{children}</a>
  );
}
