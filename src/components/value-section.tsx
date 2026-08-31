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
          <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">Pricing Model</p>
          <h2 className="mt-2 text-2xl font-medium tracking-tight text-foreground">
            {content.value.heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{content.value.lead}</p>
        </Container>

        <Container className="relative max-w-3xl">
          <dl className="mt-10 grid grid-cols-1 items-start gap-x-10 gap-y-8 md:grid-cols-2">
            {content.value.points.map((point, index) => (
              <div key={point.title}>
                <span aria-hidden="true" className="block h-px w-6 bg-brand" />
                <dt className="mt-3 flex items-baseline gap-2 text-base font-medium text-foreground">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {point.title}
                </dt>
                <dd className="mt-2 text-sm text-muted-foreground">{point.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
    </section>
  )
}
