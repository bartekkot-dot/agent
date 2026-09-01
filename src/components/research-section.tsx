import { Container } from "@/components/container"
import { DeepResearchDiagram } from "@/components/deep-research-diagram"
import { GlowBackground } from "@/components/glow-background"
import { ProductVideo } from "@/components/product-video"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// Second showcase moment (archetype B), deliberately a notch quieter than Council:
// glow stays inside the Container (not full-bleed off-canvas) and at lower intensity,
// so the two anchors read as siblings, not duplicates.
export function ResearchSection() {
  return (
    <section
      id={content.research.id}
      className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-24 sm:py-32"
    >
      <GlowBackground intensity={0.6} animate={false} />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <ProductVideo
              src={content.research.demo.src}
              poster={content.research.demo.poster}
              alt={content.research.demo.alt}
            />
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 sm:items-center sm:gap-16">
            <div>
              <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                {content.research.headline.map((segment) => (
                  <span
                    key={segment.text}
                    className={segment.tone === "ink" ? "text-foreground" : "text-subhead"}
                  >
                    {segment.text}
                  </span>
                ))}
              </h2>
              <p className="mt-5 text-lg text-subhead">{content.research.sub}</p>
              <ul className="mt-6 space-y-2">
                {content.research.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-body">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <DeepResearchDiagram caption="" />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
