import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// The whole product in one glance, right after the proof screenshots — one
// line each, no card, no number. The full detail behind each of these lives
// further down the page (value-section.tsx, privacy-section.tsx); this is the
// skim version for someone who won't read past the fold.
export function PillarsSection() {
  return (
    <section className="scroll-mt-12 border-t border-border/40 py-16 sm:py-20">
      <Reveal>
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {content.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="text-lg font-medium text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm text-body">{pillar.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
    </section>
  )
}
