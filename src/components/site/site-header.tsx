import { BookOpen } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, projectInfo } from "@/data/project-page";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/82 backdrop-blur-xl">
        <div className="mx-auto grid h-18 max-w-[1120px] grid-cols-[1fr_auto] items-center px-5 lg:grid-cols-[1fr_auto_1fr]">
          <a className="flex items-center gap-3 justify-self-start font-semibold" href="#top">
            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#005ea8,#0d74ce_52%,#2aa8f2)] shadow-sm"><BookOpen className="size-5 text-white" strokeWidth={1.7} /></span>
            <span className="text-lg">{projectInfo.name}</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 justify-self-center text-sm font-medium text-muted-foreground lg:flex">
            {navItems.map((item) => <a className="transition hover:text-foreground" href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
          <div className="justify-self-end"><ThemeToggle /></div>
        </div>
        <nav aria-label="Mobile navigation" className="mobile-nav lg:hidden">
          {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
      </header>
    </>
  );
}
