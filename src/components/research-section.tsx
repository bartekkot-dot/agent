import { Container } from "@/components/container"
import { DeepResearchDiagram } from "@/components/deep-research-diagram"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"
import { withBase } from "@/lib/url"

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

export function ResearchSection() {
  return (
    <section
      id={content.research.id}
      className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-24 sm:py-32"
    >
      <Container className="relative">
        <Reveal>
          {/* Static frame, not the ProductVideo loop: the recording is a generic
              session that visibly contradicted the specific citation card below it
              (see PLAN.md review) — a plain screenshot doesn't promise more than it shows. */}
          <div className="max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]">
            <div className="aspect-[16/10] w-full">
              <img
                src={withBase(content.research.demo.poster)}
                alt={content.research.demo.alt}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 sm:items-center sm:gap-16">
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
              <div className="mt-6">
                <ResearchCitation />
              </div>
            </div>
            <DeepResearchDiagram />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
