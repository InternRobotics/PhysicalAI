import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PublicationAccess } from "@/components/reading/publication-access";
import { SiteFooter } from "@/components/research-page/project-sections";
import { SiteHeader } from "@/components/site/site-header";
import { TrackedLink } from "@/components/tracked-link";
import { chapterPath, chapters, getChapter, publicationLinks } from "@/data/reading";
import { assetPath } from "@/lib/asset-path";

type ChapterPageProps = { params: Promise<{ chapter: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ chapter: String(chapter.number) }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const chapter = getChapter((await params).chapter);
  if (!chapter) return {};
  return { title: `Chapter ${chapter.number}: ${chapter.title}`, description: chapter.description };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const chapter = getChapter((await params).chapter);
  if (!chapter) notFound();
  const previous = chapters.find((item) => item.number === chapter.number - 1);
  const next = chapters.find((item) => item.number === chapter.number + 1);

  return (
    <>
      <SiteHeader home />
      <main id="main-content" className="reading-main px-5">
        <div className="mx-auto max-w-[1120px]" id="top">
          <a className="reading-back" href={assetPath("/#contents")}><ArrowLeft aria-hidden="true" className="size-4" />Table of Contents</a>
          <header className="chapter-intro">
            <p className="section-eyebrow">Part {chapter.partNumber} · {chapter.partTitle}</p>
            <p className="chapter-intro-number">Chapter {String(chapter.number).padStart(2, "0")}</p>
            <h1 className="reading-title">{chapter.title}</h1>
            <p className="chapter-description">{chapter.description}</p>
          </header>
          <div className="chapter-page-layout">
            <section aria-labelledby="chapter-outline-title">
              <h2 className="mb-6 text-2xl font-semibold" id="chapter-outline-title">Chapter Outline</h2>
              <ol className="chapter-outline">
                {chapter.sections.map((section) => <li id={`section-${section.number}`} key={section.number}><span className="text-primary">{section.number}</span><h3>{section.title}</h3><span className="chapter-page">p. {section.page}</span></li>)}
              </ol>
              <p className="results-note mt-5">The outline is based on the draft manuscript. Full chapter content will be available after release.</p>
            </section>
            <PublicationAccess url={publicationLinks.chapters[chapter.number]} chapter={chapter.number} />
          </div>
          <nav aria-label="Chapter navigation" className="chapter-pagination">
            {previous ? <TrackedLink href={chapterPath(previous.number)} event="chapter_open" parameters={{ chapter_id: previous.number, source: "chapter_navigation" }}><ArrowLeft aria-hidden="true" className="size-4" /><span><small>Previous Chapter</small>{previous.title}</span></TrackedLink> : <a href={assetPath("/read/")}><ArrowLeft aria-hidden="true" className="size-4" /><span><small>Publication</small>All Chapter Overviews</span></a>}
            {next ? <TrackedLink href={chapterPath(next.number)} event="chapter_open" parameters={{ chapter_id: next.number, source: "chapter_navigation" }}><span><small>Next Chapter</small>{next.title}</span><ArrowRight aria-hidden="true" className="size-4" /></TrackedLink> : <a href={assetPath("/#contents")}><span><small>Back to the Book</small>Table of Contents</span><ArrowRight aria-hidden="true" className="size-4" /></a>}
          </nav>
        </div>
      </main>
      <SiteFooter home />
    </>
  );
}
