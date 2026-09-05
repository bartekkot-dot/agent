import { Container } from "@/components/container"
import { CouncilDiagram, ModelMarquee } from "@/components/council-diagram"
import { CouncilScrub } from "@/components/council-scrub"
import { ProductVideo } from "@/components/product-video"
import { content } from "@/content"

// Restructured to: concept intro (headline + sub + the fan-out diagram, two-
// column like Research/Agent) -> the scroll-pinned scrub (THE signature
// moment, full-bleed) -> the real-app video (proof). The diagram used to live
// in the hero; it's Council-specific, so it belongs in this intro rather than
// standing in for the whole app. It doesn't duplicate the scrub below: the
// diagram is the abstract mechanism at a glance (no real content, always
// visible, loops in a few seconds), the scrub is the concrete demonstration
// (a real prompt, real diverging answers, scroll-driven) — different jobs,
// same as how Research pairs its own diagram with its own video.
//
// The video no longer sits paired with text (that's now up in the intro), so
// it's full width instead of a lone block with dead space beside it — same
// fix already applied to app-preview.tsx.
export function CouncilSection() {
  return (
    <section id={content.council.id} className="scroll-mt-12 border-t border-border/40 pb-20 sm:pb-24">
      <Container className="pt-20 sm:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:items-center sm:gap-16">
          <div>
            <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl sm:tracking-tighter">
              {content.council.headline.map((segment) => (
                <span
                  key={segment.text}
                  className={segment.tone === "ink" ? "text-foreground" : "text-subhead"}
                >
                  {segment.text}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-subhead">{content.council.sub}</p>
          </div>

          <CouncilDiagram />
        </div>

        <ModelMarquee />
      </Container>

      <div className="mt-16 sm:mt-20">
        <CouncilScrub />
      </div>

      <Container className="relative mt-16 sm:mt-20">
        <ProductVideo
          src={content.council.demo.src}
          poster={content.council.demo.poster}
          alt={content.council.demo.alt}
        />
      </Container>
    </section>
  )
}
