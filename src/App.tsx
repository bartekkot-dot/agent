import { AboutSection } from "@/components/about-section"
import { DownloadSection } from "@/components/download-section"
import { FeaturesSection } from "@/components/features-section"
import { HeroSection } from "@/components/hero-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

function App() {
  return (
    <div id="top" className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
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
