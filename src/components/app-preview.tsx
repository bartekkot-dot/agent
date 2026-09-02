import { Container } from "@/components/container"
import { content } from "@/content"
import { withBase } from "@/lib/url"

// Real product screenshots, shown plainly right after the hero — full width,
// stacked, so each one is actually readable instead of a cramped thumbnail.
// Thin border/small radius/soft shadow frame, nothing else, so the dark UI
// lifts off the dark page without competing with the hero's own focal visual.
export function AppPreview() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="flex w-full flex-col gap-10">
          {content.appPreview.shots.map((shot, i) => (
            <div
              key={shot.src}
              className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]"
            >
              <img
                src={withBase(shot.src)}
                alt={shot.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="block h-auto w-full"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
