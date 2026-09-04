import { useEffect, useState, type CSSProperties } from "react"

import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { APP_NAME, content } from "@/content"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

// Looping monochrome pulse — the hub "sends" and each provider tile ripples
// outward in sequence, on the same CSS-loop family as the flow diagrams
// (looping, prefers-reduced-motion-guarded), but deliberately unlike them:
// no blue, no connector lines. Blue is reserved for a flow diagram's answer
// payoff; this hub has no answer, so it stays fully grayscale. No explicit
// line geometry either — a border/glow pulse per card degrades perfectly on
// mobile's grid reflow for free, where computed connector lines would need
// runtime measurement and could misalign on resize.
export function ModelsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (inView) setHasPlayed(true)
  }, [inView])

  return (
    <section id={content.models.id} className="scroll-mt-12 border-t border-border/40 py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
            <div>
              <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                {content.models.headline.map((segment) => (
                  <span
                    key={segment.text}
                    className={segment.tone === "ink" ? "text-foreground" : "text-subhead"}
                  >
                    {segment.text}
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-md text-lg text-subhead">{content.models.sub}</p>
            </div>

            <div ref={ref} className="grid w-full max-w-md grid-cols-2 gap-3">
              <div
                key="center"
                className={cn(
                  "col-span-2 flex flex-col items-center justify-center gap-1 rounded-xl border border-brand/40 bg-brand/[0.06] px-4 py-6 text-center",
                  hasPlayed && "hub-ripple-loop"
                )}
              >
                <span className="font-heading text-lg font-medium text-brand">{APP_NAME}</span>
                <span className="text-xs text-muted-foreground">connects to all of them</span>
              </div>
              {content.models.providers.map((provider, i) => (
                <div
                  key={provider.name}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-xl border border-border/60 px-3 py-5 text-center",
                    hasPlayed && "tile-pulse-loop"
                  )}
                  style={{ "--pulse-delay": `${0.4 + i * 0.08}s` } as CSSProperties}
                >
                  <span className="text-sm font-medium text-foreground">{provider.name}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {provider.kind === "local" ? "local" : provider.kind === "custom" ? "your endpoint" : "hosted"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
