import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

export function PrivacySection() {
  return (
    <section
      id="privacy"
      className="section-divider-mark relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-28"
    >
      <div aria-hidden="true" className="ledger-grid pointer-events-none absolute inset-0" />

      {/* Asymmetric split, opposite direction from Models (points left, headline
          right) — same archetype, reversed, so the two don't read as one repeated
          "the split section." Quiet by design: no glow, no color wash — this is
          the trust beat, restrained on purpose against Council/Research either
          side of it. */}
      <Container className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
        <dl className="order-2 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/40 bg-border/60 sm:grid-cols-2 lg:order-1">
          {content.privacy.points.map((point, i) => (
            <div key={point.title} className="bg-background px-6 py-6">
              <dt className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                {point.title}
              </dt>
              <dd className="mt-2 text-sm text-body">{point.body}</dd>
            </div>
          ))}
        </dl>

        <div className="order-1 text-center lg:order-2 lg:text-left">
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {content.privacy.headline}
          </h2>
          <p className="mt-5 text-lg text-subhead">{content.privacy.sub}</p>
        </div>
      </Container>
    </section>
  )
}
