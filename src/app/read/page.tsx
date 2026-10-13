import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PublicationAccess } from "@/components/reading/publication-access";
import { SiteFooter } from "@/components/research-page/project-sections";
import { SiteHeader } from "@/components/site/site-header";
import { TrackedLink } from "@/components/tracked-link";
import contents from "@/data/contents.json";
import { bookCover, projectInfo } from "@/data/project-page";
import { chapterPath, publicationLinks } from "@/data/reading";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Publication Updates",
  description: "Publication updates and chapter overviews for the forthcoming Physical AI monograph.",
};

export default function PublicationPage() {
  return (
    <>
      <SiteHeader home />
      <main id="main-content" className="reading-main px-5">
        <div className="mx-auto max-w-[1120px]" id="top">
          <a className="reading-back" href={assetPath("/#top")}><ArrowLeft aria-hidden="true" className="size-4" />Back to the book</a>
          <div className="publication-hero">
            {bookCover.src ? <Image className="publication-cover" src={assetPath(bookCover.src)} alt={bookCover.alt} width={bookCover.width} height={bookCover.height} /> : null}
            <div><p className="publication-badge">{projectInfo.status}</p><h1 className="reading-title">Publication Updates</h1><p className="mt-5 text-xl leading-8">{projectInfo.fullTitle}</p><p className="mt-4 text-muted-foreground">{projectInfo.team}</p><p className="mt-6 max-w-2xl leading-8 text-muted-foreground">The preprint is being prepared for public release. In the meantime, explore the chapter overviews and outlines below.</p></div>
          </div>
          <PublicationAccess url={publicationLinks.book} />
          <section className="mt-16" aria-labelledby="chapter-list-title">
            <p className="section-eyebrow">Explore the Monograph</p>
            <h2 id="chapter-list-title" className="mt-3 text-3xl font-semibold">Chapter Overviews</h2>
            <div className="reading-parts mt-8">
              {contents.map((part) => <article className="reading-part" key={part.id}><p className="section-eyebrow">Part {part.number}</p><h3 className="mt-3 text-xl font-semibold">{part.title}</h3><ol className="mt-5">{part.chapters.map((chapter) => <li key={chapter.number}><TrackedLink href={chapterPath(chapter.number)} event="chapter_open" parameters={{ chapter_id: chapter.number, source: "publication_overviews" }}><span className="text-primary">{String(chapter.number).padStart(2, "0")}</span><span>{chapter.title}</span><ArrowUpRight aria-hidden="true" className="size-3.5" /></TrackedLink></li>)}</ol></article>)}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter home />
    </>
  );
}
