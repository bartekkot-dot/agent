import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

export function ValueSection() {
  return (
    <section
      id="value"
      className="section-divider-mark relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-24"
    >
      <div aria-hidden="true" className="ledger-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-brand/[0.03] dark:bg-brand/[0.05]"
      />

      <Reveal>
        <Container className="relative max-w-xl text-center">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground">
            {content.value.heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{content.value.lead}</p>
        </Container>

        <Container className="relative max-w-3xl">
          <dl className="mt-10 grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x">
            {content.value.points.map((point) => (
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
