import { Container } from "@/components/container"
import { CouncilScrub } from "@/components/council-scrub"
import { ProductVideo } from "@/components/product-video"
import { content } from "@/content"

// THE signature moment (§3b) — a scroll-pinned explainer, not a scroll-reveal
// section like the rest of the page. No <Reveal> wrapper: the headline/sub fade
// in normally, but the scrub below is driven by CouncilScrub's own scroll math.
//
// Scrub = the wow, placed first so the section leads with it, full-bleed (breaks
// the Container width — this is the page's one archetype-B "feature moment").
// Video = proof: the real app running the setup -> stream -> brief progression,
// which the scrub's stylized fake lane cards never show. Two-column split (text
// left, framed video right) — not a wide block stacked under the text, which
// left it stranded in the left ~60% with a large empty gap beside and below it.
export function CouncilSection() {
  return (
    <section id={content.council.id} className="scroll-mt-12 border-t border-border/40 pb-20 sm:pb-24">
      <div className="pt-20 sm:pt-24">
        <CouncilScrub />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:items-center sm:gap-16">
          <div>
            <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {content.council.headline.map((segment) => (
                <span
                  key={segment.text}
                  className={segment.tone === "ink" ? "text-foreground" : "text-subhead"}
                >
                  {segment.text}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-subhead">{content.council.sub}</p>
          </div>

          <ProductVideo
            src={content.council.demo.src}
            poster={content.council.demo.poster}
            alt={content.council.demo.alt}
          />
        </div>
      </Container>
    </section>
  )
}
