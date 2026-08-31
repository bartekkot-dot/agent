import { ArrowRight } from "lucide-react"

import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// Static skeleton only — the real scroll-scrubbed explainer (§3b) replaces this
// composition entirely. See backlog/M3.md.
export function CouncilSection() {
  return (
    <section id={content.council.id} className="scroll-mt-12 border-t border-border/40 py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-heading text-2xl font-medium tracking-tight">
              {content.council.headline.map((segment) => (
                <span
                  key={segment.text}
                  className={segment.tone === "ink" ? "text-foreground" : "text-muted-foreground"}
                >
                  {segment.text}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-muted-foreground">{content.council.sub}</p>
          </div>

          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4">
            <div className="rounded-full border border-border/60 px-4 py-2 text-sm text-foreground">
              {content.councilDemo.prompt}
            </div>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground" />
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {content.councilDemo.models.map((model) => (
                <div
                  key={model.id}
                  className="rounded-lg border border-border/60 px-3 py-4 text-center font-mono text-xs text-muted-foreground"
                >
                  {model.id}
                </div>
              ))}
            </div>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground" />
            <div className="rounded-lg border border-brand/40 bg-brand/[0.06] px-4 py-3 text-center text-sm text-foreground">
              One synthesized answer
            </div>
          </div>

          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            {content.council.captions.map((caption) => (
              <li key={caption}>{caption}</li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
