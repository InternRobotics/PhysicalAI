import { HeroSection } from "@/components/research-page/hero-section";
import { AboutSection, AuthorsSection, BibtexSection, ContentsSection, ResourcesSection, SiteFooter } from "@/components/research-page/project-sections";
import { SiteHeader } from "@/components/site/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ContentsSection />
        <AuthorsSection />
        <ResourcesSection />
        <BibtexSection />
      </main>
      <SiteFooter />
    </>
  );
}
