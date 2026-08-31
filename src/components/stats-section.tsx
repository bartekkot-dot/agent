import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

export function StatsSection() {
  return (
    <section className="scroll-mt-12 border-t border-border/40 py-16 sm:py-20">
      <Container>
        <Reveal>
          <dl className="mx-auto flex max-w-2xl flex-wrap items-start justify-center gap-x-16 gap-y-8 text-center">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-4xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dd>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}
