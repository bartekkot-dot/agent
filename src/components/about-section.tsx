import { Container } from "@/components/container"
import { content } from "@/content"

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-12 py-16">
      <Container className="max-w-xl text-center">
        <p className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {content.app.blurb.lead}
        </p>
        <p className="mt-4 text-muted-foreground">{content.app.blurb.detail}</p>
      </Container>
    </section>
  )
}
