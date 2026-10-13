import { BookOpen } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { TrackedLink } from "@/components/tracked-link";

export function PublicationAccess({ url, chapter }: { url: string | null; chapter?: number }) {
  return (
    <aside className="reading-access" aria-label="Publication status">
      <BookOpen aria-hidden="true" className="size-6 text-primary" strokeWidth={1.5} />
      <p className="section-eyebrow mt-5">Publication Status</p>
      <h2 className="mt-3 text-2xl font-semibold">{url ? "Available to Read" : "Coming Soon"}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{url ? "The public reading link is now available." : "The manuscript has not yet been released. A public reading link will appear here when it is available."}</p>
      {url ? (
        <TrackedLink className={buttonClasses({ className: "mt-6" })} href={url} target="_blank" rel="noopener noreferrer" event="publication_open" parameters={{ chapter_id: chapter ?? "book", source: "publication_card", destination: url }}><BookOpen aria-hidden="true" />{chapter ? "Read this chapter" : "Read the preprint"}</TrackedLink>
      ) : <button className={buttonClasses({ className: "mt-6" })} disabled type="button"><BookOpen aria-hidden="true" />Preprint coming soon</button>}
    </aside>
  );
}
