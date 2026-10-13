"use client";

import type { AnchorHTMLAttributes } from "react";
import { type EventParameters, type ReadingEvent, trackReadingEvent } from "@/lib/analytics";
import { assetPath } from "@/lib/asset-path";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick" | "href"> & {
  href: string;
  event: ReadingEvent;
  parameters: EventParameters;
};

export function TrackedLink({ href, event, parameters, children, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      data-reading-event={event}
      href={assetPath(href)}
      onClick={(click) => {
        click.stopPropagation();
        trackReadingEvent(event, parameters);
      }}
    >
      {children}
    </a>
  );
}
