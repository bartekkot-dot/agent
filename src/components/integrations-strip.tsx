import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

export function IntegrationsStrip() {
  return (
    <section aria-label="Integrations" className="relative pb-20 sm:pb-28">
      <Reveal>
        <Container className="flex flex-col items-center gap-5 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground/60 uppercase">
            Works with the tools you already use
          </p>
          <ul className="flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {content.integrations.map((name) => (
              <li key={name} className="text-sm text-muted-foreground/50">
                {name}
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>
    </section>
  )
}
