import { Container } from "@/components/container"
import { DeepResearchDiagram } from "@/components/deep-research-diagram"
import { ProductVideo } from "@/components/product-video"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

export function ResearchSection() {
  return (
    <section id={content.research.id} className="scroll-mt-12 border-t border-border/40 py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <ProductVideo
              src={content.research.demo.src}
              poster={content.research.demo.poster}
              alt={content.research.demo.alt}
            />
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:items-center sm:gap-16">
            <div>
              <h2 className="font-heading text-2xl font-medium tracking-tight">
                {content.research.headline.map((segment) => (
                  <span
                    key={segment.text}
                    className={segment.tone === "ink" ? "text-foreground" : "text-muted-foreground"}
                  >
                    {segment.text}
                  </span>
                ))}
              </h2>
              <p className="mt-4 text-muted-foreground">{content.research.sub}</p>
              <ul className="mt-6 space-y-2">
                {content.research.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-foreground">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
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
