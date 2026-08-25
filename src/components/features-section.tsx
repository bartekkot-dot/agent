import { Container } from "@/components/container"
import { content } from "@/content"

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-12 border-t border-border/40 py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {content.features.map((feature) => (
            <div key={feature.title}>
              <h3 className="text-base font-medium text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
