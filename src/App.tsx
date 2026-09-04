import { AgentSection } from "@/components/agent-section"
import { AppPreview } from "@/components/app-preview"
import { CouncilSection } from "@/components/council-section"
import { DownloadSection } from "@/components/download-section"
import { HeroSection } from "@/components/hero-section"
import { ModelsSection } from "@/components/models-section"
import { PillarsSection } from "@/components/pillars-section"
import { PrivacySection } from "@/components/privacy-section"
import { ResearchSection } from "@/components/research-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SkipLink } from "@/components/skip-link"
import { ValueSection } from "@/components/value-section"

// Product-first order: identity (hero + proof) -> one-glance pillars ->
// feature showcases -> the detail behind the "free"/"private" pillars ->
// breadth -> full trust case -> download. See PLAN.md's reorder rationale.
function App() {
  return (
    <div id="top" className="flex min-h-svh flex-col">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-12 outline-none">
        <HeroSection />
        <AppPreview />
        <PillarsSection />
        <CouncilSection />
        <ResearchSection />
        <AgentSection />
        <ValueSection />
        <ModelsSection />
        <PrivacySection />
        <DownloadSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
