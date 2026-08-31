import { Container } from "@/components/container"
import { CouncilScrub } from "@/components/council-scrub"
import { content } from "@/content"

// THE signature moment (§3b) — a scroll-pinned explainer, not a scroll-reveal
// section like the rest of the page. No <Reveal> wrapper: the headline/sub fade
// in normally, but the scrub below is driven by CouncilScrub's own scroll math.
export function CouncilSection() {
  return (
    <section id={content.council.id} className="scroll-mt-12 border-t border-border/40 pb-20 sm:pb-24">
      <Container className="pt-20 sm:pt-24">
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
      </Container>

      <CouncilScrub />
    </section>
  )
}
