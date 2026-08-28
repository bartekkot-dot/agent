import { AboutSection } from "@/components/about-section"
import { DownloadSection } from "@/components/download-section"
import { FeaturesSection } from "@/components/features-section"
import { HeroSection } from "@/components/hero-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SkipLink } from "@/components/skip-link"

function App() {
  return (
    <div id="top" className="flex min-h-svh flex-col">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-12 outline-none">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <DownloadSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
