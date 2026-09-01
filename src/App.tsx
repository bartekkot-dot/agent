import { CouncilSection } from "@/components/council-section"
import { DownloadSection } from "@/components/download-section"
import { HeroSection } from "@/components/hero-section"
import { ModelsSection } from "@/components/models-section"
import { PrivacySection } from "@/components/privacy-section"
import { ResearchSection } from "@/components/research-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SkipLink } from "@/components/skip-link"
import { StatsSection } from "@/components/stats-section"
import { ValueSection } from "@/components/value-section"

function App() {
  return (
    <div id="top" className="flex min-h-svh flex-col">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-12 outline-none">
        <HeroSection />
        <ValueSection />
        <CouncilSection />
        <ModelsSection />
        <ResearchSection />
        <PrivacySection />
        <StatsSection />
        <DownloadSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
