"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyCitation({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("failed");
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={copy} size="sm" variant="outline">{status === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{status === "copied" ? "Copied" : "Copy BibTeX"}</Button>
      <span aria-live="polite" className="text-sm text-muted-foreground">{status === "failed" ? "Please select and copy the citation below." : status === "copied" ? "Citation copied to clipboard." : ""}</span>
    </div>
  );
}
