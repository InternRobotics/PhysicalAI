import { ArrowUpRight, BookOpen, Code2, FileText, MessageSquare, Presentation } from "lucide-react";

import { ProjectImage } from "@/components/media/project-image";
import { CopyCitation } from "@/components/research-page/copy-citation";
import { FigureCard } from "@/components/site/figure-card";
import { SectionShell } from "@/components/site/section-shell";
import { buttonClasses } from "@/components/ui/button";
import contents from "@/data/contents.json";
import { aboutParagraphs, bibtex, citationText, coreElements, figures, partDescriptions, projectInfo, resources } from "@/data/project-page";
import { assetPath } from "@/lib/asset-path";

export function AboutSection() {
  return (
    <SectionShell eyebrow="About the book" id="about" title="A unified view of Physical AI" lead={<>What is Physical AI? What does its technical landscape look like?<br className="desktop-lead-break" />{" "}What challenges stand between today's systems and general physical intelligence?</>}>
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5 text-base leading-8 text-muted-foreground">
          {aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <FigureCard caption="The system-level framework of Physical AI: models and control connected to the physical world through feedback. From Figure 1.3 of the monograph.">
          <ProjectImage {...figures.framework} />
        </FigureCard>
      </div>
      <div className="definition-note mt-8">
        <p className="section-eyebrow">The organizing idea</p>
        <p className="organizing-statement mt-3 text-foreground">Perception, prediction, decision-making, action, and adaptation form a continuous loop through the physical world.</p>
        {projectInfo.pdf ? <a className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary" href={`${assetPath(projectInfo.pdf)}#page=14`} target="_blank" rel="noopener noreferrer">An organizing framework introduced in Chapter 1. <ArrowUpRight aria-hidden="true" className="size-4" /></a> : <p className="mt-3 text-sm font-medium text-muted-foreground">An organizing framework introduced in Chapter 1.</p>}
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coreElements.map((element) => <article className="step-card" key={element.number}><span>{element.number}</span><h3>{element.title}</h3><p>{element.body}</p></article>)}
      </div>
    </SectionShell>
  );
}

function ContentsPartCard({ part, chapters = part.chapters, continuation = false }: {
  part: (typeof contents)[number];
  chapters?: (typeof contents)[number]["chapters"];
  continuation?: boolean;
}) {
  return (
    <article className={`contents-part${continuation ? " contents-part--continued" : ""}`}>
      {!continuation ? (
        <div className="contents-part-header">
          <span className="part-number">{part.number}</span>
          <div><h3>{part.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{partDescriptions[part.id]}</p></div>
        </div>
      ) : null}
      <div className="contents-chapters">
        {chapters.map((chapter) => (
          <details className="chapter-details" key={chapter.number}>
            <summary><span className="chapter-number">{String(chapter.number).padStart(2, "0")}</span><span className="chapter-title">{chapter.title}</span><span className="chapter-page">p. {chapter.page}</span><span aria-hidden="true" className="chapter-chevron" /></summary>
            <div className="chapter-content">
              <ol className="chapter-sections">
                {chapter.sections.map((section) => <li className="chapter-section-row" key={section.number}><span className="text-primary">{section.number}</span><span>{section.title}</span><span className="chapter-page">{section.page}</span></li>)}
              </ol>
            </div>
          </details>
        ))}
      </div>
    </article>
  );
}

export function ContentsSection() {
  const [overview, methodology, outlook] = contents;
  const methodologySplit = Math.ceil(methodology.chapters.length / 2);

  return (
    <SectionShell className="bg-muted/35" eyebrow="Inside the monograph" id="contents" title="Table of contents" headingClassName="max-w-none" lead={<>Three parts trace a path from concepts and foundations, through the technical stack, to future directions.<br className="desktop-lead-break" />{" "}Expand a chapter to explore its sections.</>}>
      <div className="contents-grid">
        <div className="contents-column">
          <ContentsPartCard part={overview} />
          <ContentsPartCard part={methodology} chapters={methodology.chapters.slice(0, methodologySplit)} />
        </div>
        <div className="contents-column">
          <ContentsPartCard part={methodology} chapters={methodology.chapters.slice(methodologySplit)} continuation />
          <ContentsPartCard part={outlook} />
        </div>
      </div>
      <p className="mt-5 text-sm font-medium">References <span className="ml-2 text-muted-foreground">p. 313</span></p>
      <p className="results-note">Expand a chapter to view its sections. Page numbers refer to the draft manuscript.</p>
    </SectionShell>
  );
}

export function AuthorsSection() {
  return (
    <SectionShell eyebrow="Authors" id="authors" title="About the authors" lead="Physical Intelligence Team, Shanghai AI Laboratory">
      <div className="max-w-4xl space-y-4 leading-8 text-muted-foreground">
        <p>The monograph is authored by the Physical Intelligence Team, Shanghai AI Laboratory. It brings together the concepts, techniques, and challenges of intelligence that interacts with the physical world.</p>
        <p className="text-sm">Individual author profiles and acknowledgments will be added when available.</p>
      </div>
    </SectionShell>
  );
}

const resourceIcons = { pdf: BookOpen, code: Code2, slides: Presentation, errata: MessageSquare };

export function ResourcesSection() {
  return (
    <SectionShell className="bg-muted/35" eyebrow="Read & explore" id="resources" title="The book and companion resources" headingClassName="max-w-none" leadClassName="desktop-single-line-lead" lead="The preprint is coming soon. Companion materials will be shared here as they become available.">
      <div className="grid gap-5 md:grid-cols-2">
        {resources.map((resource) => {
          const Icon = resourceIcons[resource.icon];
          return (
            <article className="step-card resource-card" key={resource.id}>
              <Icon aria-hidden="true" className="size-6 text-primary" strokeWidth={1.5} />
              <h3>{resource.title}</h3><p>{resource.description}</p>
              <div className="mt-6">
                {resource.href ? <a className={buttonClasses({ variant: "outline", size: "sm" })} href={assetPath(resource.href)} target="_blank" rel="noopener noreferrer"><ArrowUpRight aria-hidden="true" />{resource.label}</a> : <span className="resource-status">{resource.label}</span>}
              </div>
            </article>
          );
        })}
      </div>
      <div className="publication-details mt-8">
        <div><p className="section-eyebrow">Publication</p><h3 className="mt-3 text-xl font-semibold">Forthcoming</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The manuscript is being prepared for public release. Publication information will appear here.</p></div>
        <dl className="publication-facts">
          <div><dt>Publisher</dt><dd>{projectInfo.publisher ?? "To be announced"}</dd></div>
          <div><dt>Publication date</dt><dd>{projectInfo.publicationDate ?? "To be announced"}</dd></div>
          <div><dt>Print edition</dt><dd>{projectInfo.purchaseUrl ? <a className="text-primary" href={projectInfo.purchaseUrl} target="_blank" rel="noopener noreferrer">Order the book</a> : "Coming soon"}</dd></div>
        </dl>
      </div>
    </SectionShell>
  );
}

export function BibtexSection() {
  return (
    <SectionShell eyebrow="Citation" id="bibtex" title="Cite the monograph" lead="This is a provisional citation for the forthcoming monograph.">
      <p className="citation-prose mb-7 text-base leading-8 text-muted-foreground">{citationText}</p>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4"><h3 className="flex items-center gap-2 font-semibold"><FileText aria-hidden="true" className="size-4 text-primary" />BibTeX</h3><CopyCitation text={bibtex} /></div>
      <pre className="overflow-x-auto rounded-lg border border-border bg-card p-5 text-sm leading-7 text-foreground"><code>{bibtex}</code></pre>
      <p className="results-note">The citation will be updated when the manuscript and final publication details are available.</p>
      <div className="mt-12 border-t border-border pt-10">
        <h3 className="text-2xl font-semibold">Explore intelligence in the physical world.</h3>
        <p className="mt-3 text-muted-foreground">Explore the table of contents while the preprint is being prepared for release.</p>
        <div className="mt-6 flex flex-wrap gap-3">{projectInfo.pdf ? <a className={buttonClasses()} href={assetPath(projectInfo.pdf)} target="_blank" rel="noopener noreferrer"><BookOpen aria-hidden="true" />Read the preprint</a> : <button className={buttonClasses()} disabled type="button"><BookOpen aria-hidden="true" />Preprint coming soon</button>}<a className={buttonClasses({ variant: "outline" })} href="#contents">Browse the contents</a></div>
      </div>
    </SectionShell>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/35 px-5 py-8">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 text-sm leading-6 text-muted-foreground"><p>{projectInfo.fullTitle}<br />{projectInfo.team}</p><a className="text-primary" href="#top">Back to top ↑</a></div>
    </footer>
  );
}
