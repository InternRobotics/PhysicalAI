import { BookOpen, FileText, Library, List } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

import { ProjectImage } from "@/components/media/project-image";
import { buttonClasses } from "@/components/ui/button";
import { authors, figures, heroActions, projectInfo, stats, teamLogos } from "@/data/project-page";
import { assetPath } from "@/lib/asset-path";

const icons: Record<string, React.ReactNode> = {
  pdf: <BookOpen aria-hidden="true" />,
  contents: <List aria-hidden="true" />,
  resources: <Library aria-hidden="true" />,
  citation: <FileText aria-hidden="true" />,
};

export function HeroSection() {
  return (
    <section className="hero-section px-5 pb-12 pt-14 sm:pt-18" id="top">
      <div aria-hidden="true" className="hero-background" />
      <div className="mx-auto max-w-[1120px] text-center">
        <p className="publication-badge">{projectInfo.status}</p>
        <h1 className="hero-title text-balance"><span className="title-gradient">{projectInfo.name}</span></h1>
        <p className="hero-subtitle">
          {projectInfo.subtitle.map((line, index) => <Fragment key={line}>{index > 0 ? <br /> : null}{line}</Fragment>)}
        </p>
        <div className="authors-line">
          {authors.map((author) => <span className="author-entry" key={author.id}><strong className="author-name block">{author.name}</strong></span>)}
        </div>
        <div aria-label="Affiliations" className="team-logo-row">
          {teamLogos.map((logo) => logo.src ? <Image alt={logo.alt} className="team-logo-image" height={logo.height} key={logo.id} src={assetPath(logo.src)} width={logo.width} /> : null)}
        </div>
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3">
          {heroActions.map((action, index) => <a className={buttonClasses({ size: "md", variant: index === 0 ? "default" : "outline" })} href={assetPath(action.href)} key={action.label} target={action.icon === "pdf" ? "_blank" : undefined} rel={action.icon === "pdf" ? "noopener noreferrer" : undefined}>{icons[action.icon]}{action.label}</a>)}
        </div>
        <figure className="hero-teaser">
          <ProjectImage {...figures.teaser} priority />
          <figcaption>{projectInfo.description}</figcaption>
        </figure>
        <div className="stat-band">
          {stats.map((item) => <div className="stat-card" key={item.id}><p>{item.value}</p><h2>{item.label}</h2><span>{item.detail}</span></div>)}
        </div>
      </div>
    </section>
  );
}
