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
              <h2 className="font-heading mt-3 text-4xl font-semibold tracking-tight sm:text-5xl sm:tracking-tighter">
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

          {/* No sm:items-start/center override here -- default grid stretch
              makes both columns match the row's height (the citation card's,
              since it's the taller one), then the diagram's own wrapper
              centers it within that full height. Simply top-aligning (the
              previous fix) removed the gap ABOVE the diagram but left just as
              much dead space below it, since the diagram was still much
              shorter than the card -- deep-research-diagram.tsx's viewBox is
              now taller too, so the remaining centered gap is small, not a void. */}
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
            <ResearchCitation />
            <div className="flex items-center justify-center">
              <DeepResearchDiagram />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
