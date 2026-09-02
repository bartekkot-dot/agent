import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// Same typographic treatment as value-section.tsx (no card, no numbering —
// see that file's comment), mirrored into an asymmetric split instead of a
// single column so the two sections don't read as the same layout reused.
export function PrivacySection() {
  return (
    <section id="privacy" className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-28">
      <div aria-hidden="true" className="ledger-grid pointer-events-none absolute inset-0" />

      <Reveal>
        <Container className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
          <dl className="order-2 divide-y divide-border border-t border-border lg:order-1">
            {content.privacy.points.map((point) => (
              <div key={point.title} className="py-5">
                <dt className="text-sm font-medium text-foreground">{point.title}</dt>
                <dd className="mt-1 text-sm text-body">{point.body}</dd>
              </div>
            ))}
          </dl>

          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {content.privacy.headline}
            </h2>
            <p className="mt-5 text-lg text-subhead">{content.privacy.sub}</p>
          </div>
        </Container>
      </Reveal>
    </section>
  )
}
