import { Shuffle, ShieldCheck, Telescope, type LucideIcon } from "lucide-react"

import { Container } from "@/components/container"
import { content } from "@/content"

const icons: Record<(typeof content.features)[number]["icon"], LucideIcon> = {
  Telescope,
  ShieldCheck,
  Shuffle,
}

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-12 border-t border-border/40 py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {content.features.map((feature) => {
            const Icon = icons[feature.icon]
            return (
              <div key={feature.title}>
                <Icon size={20} strokeWidth={1.5} className="text-muted-foreground" />
                <h3 className="mt-3 text-base font-medium text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
