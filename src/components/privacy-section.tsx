import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

export function PrivacySection() {
  return (
    <section
      id="privacy"
      className="section-divider-mark relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-24"
    >
      <div aria-hidden="true" className="ledger-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-foreground/[0.02] dark:bg-foreground/[0.035]"
      />

      <Reveal>
        <Container className="relative max-w-xl text-center">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground">
            {content.privacy.headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{content.privacy.sub}</p>
        </Container>

        <Container className="relative max-w-3xl">
          <dl className="mt-10 grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x">
            {content.privacy.points.map((point) => (
              <div key={point.title} className="py-6 md:px-8 md:py-8">
                <dt className="text-base font-medium text-foreground">{point.title}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{point.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
    </section>
  )
}
