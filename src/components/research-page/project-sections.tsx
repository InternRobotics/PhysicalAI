import { ArrowDownToLine, ArrowUpRight, BookOpen, Code2, FileText, MessageSquare, Presentation } from "lucide-react";

import { ProjectImage } from "@/components/media/project-image";
import { CopyCitation } from "@/components/research-page/copy-citation";
import { FigureCard } from "@/components/site/figure-card";
import { SectionShell } from "@/components/site/section-shell";
import { buttonClasses } from "@/components/ui/button";
import contents from "@/data/contents.json";
import { aboutParagraphs, bibtex, citationText, coreElements, figures, partDescriptions, projectInfo, resources } from "@/data/project-page";
import { assetPath } from "@/lib/asset-path";

function pdfPage(page: number) { return `${assetPath(projectInfo.pdf)}#page=${page}`; }

export function AboutSection() {
  return (
    <SectionShell eyebrow="About the book" id="about" title="A unified view of Physical AI" lead="What is Physical AI? What does its technical landscape look like? What challenges stand between today's systems and general physical intelligence?">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5 text-base leading-8 text-muted-foreground">
          {aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="definition-note">
            <p className="section-eyebrow">The organizing idea</p>
            <p className="mt-3 text-foreground">Perception, prediction, decision-making, action, and adaptation form a continuous loop through the physical world.</p>
            <a className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary" href={pdfPage(14)} target="_blank" rel="noopener noreferrer">Read the definition in Chapter 1 <ArrowUpRight aria-hidden="true" className="size-4" /></a>
          </div>
        </div>
        <FigureCard caption="The system-level framework of Physical AI: models and control connected to the physical world through feedback. From Figure 1.3 of the monograph.">
          <ProjectImage {...figures.framework} />
        </FigureCard>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coreElements.map((element) => <article className="step-card" key={element.number}><span>{element.number}</span><h3>{element.title}</h3><p>{element.body}</p></article>)}
      </div>
    </SectionShell>
  );
}

export function ContentsSection() {
  return (
    <SectionShell className="bg-muted/35" eyebrow="Inside the monograph" id="contents" title="Table of contents" lead="Three parts trace a path from concepts and foundations, through the technical stack, to future directions. Expand a chapter to explore its sections.">
      <div className="grid gap-8">
        {contents.map((part) => (
          <article className="contents-part" key={part.id}>
            <div className="contents-part-header">
              <span className="part-number">{part.number}</span>
              <div><p className="section-eyebrow">Part {part.number}</p><h3>{part.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{partDescriptions[part.id]}</p></div>
            </div>
            <div>
              {part.chapters.map((chapter) => (
                <details className="chapter-details" key={chapter.number}>
                  <summary><span className="chapter-number">{String(chapter.number).padStart(2, "0")}</span><span className="chapter-title">{chapter.title}</span><span className="chapter-page">p. {chapter.page}</span><span aria-hidden="true" className="chapter-chevron" /></summary>
                  <div className="chapter-content">
                    <a className="chapter-read-link" href={pdfPage(chapter.page)} target="_blank" rel="noopener noreferrer">Read Chapter {chapter.number} <ArrowUpRight aria-hidden="true" className="size-4" /></a>
                    <ol className="chapter-sections">
                      {chapter.sections.map((section) => <li key={section.number}><a href={pdfPage(section.page)} target="_blank" rel="noopener noreferrer"><span className="text-primary">{section.number}</span><span>{section.title}</span><span className="chapter-page">{section.page}</span></a></li>)}
                    </ol>
                  </div>
                </details>
              ))}
            </div>
          </article>
        ))}
      </div>
      <a className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary" href={pdfPage(313)} target="_blank" rel="noopener noreferrer">References · p. 313 <ArrowUpRight aria-hidden="true" className="size-4" /></a>
      <p className="results-note">Page numbers refer to the current preprint. Section links open the PDF at the corresponding page.</p>
    </SectionShell>
  );
}

export function AuthorsSection() {
  return (
    <SectionShell eyebrow="Authors" id="authors" title="Physical Intelligence Team" lead="Shanghai AI Laboratory">
      <div className="step-card max-w-4xl">
        <p className="!mt-0">The monograph is authored by the Physical Intelligence Team, Shanghai AI Laboratory. It brings together the concepts, techniques, and challenges of intelligence that interacts with the physical world.</p>
        <p className="text-sm">Individual author profiles and acknowledgments will be added when available.</p>
      </div>
    </SectionShell>
  );
}

const resourceIcons = { pdf: BookOpen, code: Code2, slides: Presentation, errata: MessageSquare };

export function ResourcesSection() {
  return (
    <SectionShell className="bg-muted/35" eyebrow="Read & explore" id="resources" title="The book and companion resources" lead="Start with the preprint. This page will also provide a home for companion materials as they become available.">
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
        <div><p className="section-eyebrow">Publication</p><h3 className="mt-3 text-xl font-semibold">Forthcoming</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The manuscript is available as a preprint. Final publication information will appear here.</p></div>
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
    <SectionShell eyebrow="Citation" id="bibtex" title="Cite the monograph" lead="For the current manuscript, please use the preprint citation below.">
      <p className="mb-7 max-w-4xl text-base leading-8 text-muted-foreground">{citationText}</p>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4"><h3 className="flex items-center gap-2 font-semibold"><FileText aria-hidden="true" className="size-4 text-primary" />BibTeX</h3><CopyCitation text={bibtex} /></div>
      <pre className="overflow-x-auto rounded-lg border border-border bg-card p-5 text-sm leading-7 text-foreground"><code>{bibtex}</code></pre>
      <p className="results-note">The citation will be updated when final publication details are available.</p>
      <div className="mt-12 border-t border-border pt-10">
        <h3 className="text-2xl font-semibold">Explore intelligence in the physical world.</h3>
        <p className="mt-3 text-muted-foreground">Read the preprint or begin with a chapter in the table of contents.</p>
        <div className="mt-6 flex flex-wrap gap-3"><a className={buttonClasses()} href={assetPath(projectInfo.pdf)} target="_blank" rel="noopener noreferrer"><ArrowDownToLine aria-hidden="true" />Read the preprint</a><a className={buttonClasses({ variant: "outline" })} href="#contents">Browse the contents</a></div>
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
