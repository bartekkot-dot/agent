import { useEffect, useState, type CSSProperties } from "react"

import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { APP_NAME, content } from "@/content"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function ModelsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (inView) setHasPlayed(true)
  }, [inView])

  return (
    <section id={content.models.id} className="scroll-mt-12 border-t border-border/40 py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-heading text-2xl font-medium tracking-tight">
              {content.models.headline.map((segment) => (
                <span
                  key={segment.text}
                  className={segment.tone === "ink" ? "text-foreground" : "text-muted-foreground"}
                >
                  {segment.text}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-muted-foreground">{content.models.sub}</p>
          </div>

          <div ref={ref} className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <div
              key="center"
              className="col-span-2 flex flex-col items-center justify-center gap-1 rounded-xl border border-brand/40 bg-brand/[0.06] px-4 py-6 text-center sm:col-span-2 sm:row-span-2"
            >
              <span className="font-heading text-lg font-medium text-brand">{APP_NAME}</span>
              <span className="text-xs text-muted-foreground">connects to all of them</span>
            </div>
            {content.models.providers.map((provider, i) => (
              <div
                key={provider.name}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl border border-border/60 px-3 py-5 text-center",
                  hasPlayed && "tile-pulse-animate"
                )}
                style={{ "--pulse-delay": `${0.1 + i * 0.08}s` } as CSSProperties}
              >
                <span className="text-sm font-medium text-foreground">{provider.name}</span>
                <span className="text-[11px] text-muted-foreground">
                  {provider.kind === "local" ? "local" : provider.kind === "custom" ? "your endpoint" : "hosted"}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
