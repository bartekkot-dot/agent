import { Container } from "@/components/container"
import { DeepResearchDiagram } from "@/components/deep-research-diagram"
import { ProductVideo } from "@/components/product-video"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// Citation card: shows the loop's payoff — several sources read and reconciled
// into one verdict — instead of a bullet+icon list asserting "cites sources."
// Same plain card language as everywhere else on the page (border-border/60,
// bg-card); the verdict stays neutral like every other label, per the single
// blue-payoff rule (that's reserved for the diagram's answer node alone).
function ResearchCitation() {
  const { question, sources, verdict } = content.research.citation
  return (
    <div className="rounded-lg border border-border/60 bg-card px-5 py-5">
      <p className="text-sm font-medium text-foreground">{question}</p>
      <ul className="mt-4 space-y-3">
        {sources.map((source) => (
          <li key={source.domain} className="text-sm">
            <span className="text-foreground">{source.domain}</span>
            <span className="text-body"> — {source.note}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-border/60 pt-4 text-sm text-foreground">{verdict}</p>
    </div>
  )
}

// Two stacked two-column rows, mirroring council-section.tsx's shape: text
// paired with the framed video (real proof — the loop's "Researched: ..."
// entries actually accumulating, which a static frame can't show), then the
// citation card paired with the loop diagram. Pairing every block with a
// neighbor avoids a lone wide block stranded with dead space beside it.
export function ResearchSection() {
  return (
    <section
      id={content.research.id}
      className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-24 sm:py-32"
    >
      <Container className="relative">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:items-center sm:gap-16">
            <div>
              <p className="text-sm text-muted-foreground">{content.research.connective}</p>
              <h2 className="font-heading mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
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
            </div>

            <ProductVideo
              src={content.research.demo.src}
              poster={content.research.demo.poster}
              alt={content.research.demo.alt}
            />
          </div>

          {/* items-start, not items-center: the diagram is much shorter than
              the citation card, and centering it against the card's height
              left a large dead gap above it (same class of bug already fixed
              on the Council video and the app-preview slider). Top-aligning
              flush with the card's own top edge removes that gap. */}
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:items-start sm:gap-16">
            <ResearchCitation />
            <DeepResearchDiagram />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
