import { Shuffle, ShieldCheck, Telescope, Users, type LucideIcon } from "lucide-react"

import { Container } from "@/components/container"
import { DeepResearchDiagram } from "@/components/deep-research-diagram"
import { DemoVideo } from "@/components/demo-video"
import { ModelCouncilDiagram } from "@/components/model-council-diagram"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

const icons: Record<(typeof content.features)[number]["icon"], LucideIcon> = {
  Users,
  Telescope,
  ShieldCheck,
  Shuffle,
}

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-12 border-t border-border/40 py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">Features</p>
            <h2 className="font-heading mt-2 text-2xl font-medium tracking-tight text-foreground">What it does</h2>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12">
            {content.features.map((feature) => {
              const Icon = icons[feature.icon]
              return (
                <div key={feature.title}>
                  <Icon size={20} strokeWidth={1.5} className="text-muted-foreground" />
                  <h3 className="mt-3 text-base font-medium text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  {feature.demo && (
                    <DemoVideo
                      src={feature.demo.src}
                      poster={feature.demo.poster}
                      name={feature.demo.name}
                      cta={feature.demo.cta}
                    />
                  )}
                  {feature.diagram && <ModelCouncilDiagram caption={feature.diagramCaption ?? ""} />}
                  {feature.staticDiagram && <DeepResearchDiagram caption={feature.diagramCaption ?? ""} />}
                </div>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
