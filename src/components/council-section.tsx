import { Container } from "@/components/container"
import { CouncilScrub } from "@/components/council-scrub"
import { content } from "@/content"
import { withBase } from "@/lib/url"

// THE signature moment (§3b) — a scroll-pinned explainer, not a scroll-reveal
// section like the rest of the page. No <Reveal> wrapper: the headline/sub fade
// in normally, but the scrub below is driven by CouncilScrub's own scroll math.
//
// Scrub = the wow, placed first so the section leads with it, full-bleed (breaks
// the Container width — this is the page's one archetype-B "feature moment").
// The recap below is a two-column split (text left, framed screenshot right) —
// not a single wide image stacked under the text, which left it stranded in the
// left ~60% with a large empty gap beside and below it. The screenshot is a
// static, cropped frame (see content.ts) rather than the ProductVideo loop:
// the source recording's window was mostly empty space below the prompt line,
// which read as broken at full size — same fix as research-section.tsx.
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

          <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]">
            <div className="aspect-[640/190] w-full">
              <img
                src={withBase(content.council.demo.poster)}
                alt={content.council.demo.alt}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
