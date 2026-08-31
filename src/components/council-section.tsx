import { Container } from "@/components/container"
import { CouncilScrub } from "@/components/council-scrub"
import { ProductVideo } from "@/components/product-video"
import { content } from "@/content"

// THE signature moment (§3b) — a scroll-pinned explainer, not a scroll-reveal
// section like the rest of the page. No <Reveal> wrapper: the headline/sub fade
// in normally, but the scrub below is driven by CouncilScrub's own scroll math.
//
// Video = proof (the real app running), placed first. Scrub = explainer (the
// conceptual fan-out/synthesize diagram), placed after — different jobs, not a
// duplicate, so both stay per the fix spec's "video vs scrub roles" guidance.
export function CouncilSection() {
  return (
    <section id={content.council.id} className="scroll-mt-12 border-t border-border/40 pb-20 sm:pb-24">
      <Container className="pt-20 sm:pt-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-2xl font-medium tracking-tight">
            {content.council.headline.map((segment) => (
              <span
                key={segment.text}
                className={segment.tone === "ink" ? "text-foreground" : "text-muted-foreground"}
              >
                {segment.text}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-muted-foreground">{content.council.sub}</p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <ProductVideo
            src={content.council.demo.src}
            poster={content.council.demo.poster}
            alt={content.council.demo.alt}
          />
        </div>
      </Container>

      <CouncilScrub />
    </section>
  )
}
