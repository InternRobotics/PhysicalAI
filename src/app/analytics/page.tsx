import type { Metadata } from "next";
import { ClickDashboard } from "@/components/analytics/click-dashboard";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/research-page/project-sections";

export const metadata: Metadata = {
  title: "arXiv Click Analytics",
  description: "Click statistics for the Physical AI monograph’s arXiv button.",
  robots: { index: false, follow: false },
};

export default function AnalyticsPage() {
  return <><SiteHeader home /><main id="main-content" className="analytics-main px-5"><ClickDashboard /></main><SiteFooter home /></>;
}
