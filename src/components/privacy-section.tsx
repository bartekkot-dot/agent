import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// Same structure as value-section.tsx (no card, no numbering, same point-grid
// and left-border-accent treatment — see that file's comment for the shared
// rationale). The asymmetric split this used to be (points left, headline
// right, vertically centered) left the short headline column with a large
// empty band above and below it once centered. Stacking headline-then-grid,
// same as Value, uses the full width for the points instead of forcing them
// to fill a column matched to the headline's height.
export function PrivacySection() {
  return (
    <section id="privacy" className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-28">
      <div aria-hidden="true" className="ledger-grid pointer-events-none absolute inset-0" />

      <Reveal>
        <Container className="relative">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:tracking-tighter">
              {content.privacy.headline}
            </h2>
            <p className="mt-5 text-lg text-subhead">{content.privacy.sub}</p>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 border-t border-border pt-10 sm:grid-cols-2">
            {content.privacy.points.map((point) => (
              <div key={point.title} className="border-l border-foreground/15 pl-5">
                <dt className="text-base font-semibold tracking-tight text-foreground">{point.title}</dt>
                <dd className="mt-1.5 text-sm text-body">{point.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
    </section>
  )
}
