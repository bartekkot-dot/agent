import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// Typographic, not a card grid — these are parallel benefits, not a sequence
// or a comparable set of discrete units, so no numbering and no card border
// (see privacy-section.tsx for the sibling treatment of the same idea).
export function ValueSection() {
  return (
    <section id="value" className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-24">
      <div aria-hidden="true" className="ledger-grid pointer-events-none absolute inset-0" />

      <Reveal>
        <Container className="relative max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {content.value.heading}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-subhead">{content.value.lead}</p>

          <dl className="mt-10 divide-y divide-border border-t border-border">
            {content.value.points.map((point) => (
              <div key={point.title} className="py-5">
                <dt className="text-base font-medium text-foreground">{point.title}</dt>
                <dd className="mt-1 text-sm text-body">{point.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
    </section>
  )
}
