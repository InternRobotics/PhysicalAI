"use client";

import { type PointerEvent, type ReactNode, useEffect, useRef } from "react";

export function InteractiveBookCover({ children }: { children: ReactNode }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)),
      y: Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)),
    };
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const surface = surfaceRef.current;
      if (!surface) return;
      const { x, y } = pointerRef.current;
      surface.style.setProperty("--cover-rotate-x", `${(-y * 5).toFixed(2)}deg`);
      surface.style.setProperty("--cover-rotate-y", `${(x * 6).toFixed(2)}deg`);
      surface.style.setProperty("--cover-light-x", `${((x + 1) * 50).toFixed(2)}%`);
      surface.style.setProperty("--cover-light-y", `${((y + 1) * 50).toFixed(2)}%`);
      surface.style.setProperty("--cover-shadow-x", `${(-x * 9).toFixed(2)}px`);
      surface.dataset.active = "true";
    });
  }

  function reset() {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    const surface = surfaceRef.current;
    if (!surface) return;
    delete surface.dataset.active;
    for (const property of ["--cover-rotate-x", "--cover-rotate-y", "--cover-light-x", "--cover-light-y", "--cover-shadow-x"]) {
      surface.style.removeProperty(property);
    }
  }

  return (
    <div className="book-cover-interaction" onPointerCancel={reset} onPointerEnter={move} onPointerLeave={reset} onPointerMove={move} ref={surfaceRef}>
      <div className="book-cover">
        {children}
        <span aria-hidden="true" className="book-cover-glare" />
      </div>
    </div>
  );
}
