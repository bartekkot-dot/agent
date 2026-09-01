import { Container } from "@/components/container"
import { HeroConstellation, ModelMarquee } from "@/components/hero-constellation"
import { Button } from "@/components/ui/button"
import { content } from "@/content"
import { useInView } from "@/hooks/use-in-view"

// Art-direction pass: the hero's identity moment is the constellation motif
// (HeroConstellation), not the old chip-grid demo — Council's own scroll-scrub
// already shows the literal "models answering" sequence in full, so the hero's
// job is to be the iconic, instantly-recognizable brand mark instead of
// repeating that function. See hero-constellation.tsx for the motif itself.
export function HeroSection() {
  const { ref, inView } = useInView<HTMLElement>(0)

  return (
    <section
      id="hero"
      ref={ref}
      className="relative scroll-mt-12 overflow-hidden py-10 sm:py-14"
    >
      {/* Asymmetric split (archetype A): left-aligned copy against a large,
          breathing visual, not a centered stack. Stacks back to centered on
          mobile, where a split has no room to read as asymmetric anyway. */}
      <Container className="relative grid grid-cols-1 items-center gap-10 text-center lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:text-left">
        <div className="flex flex-col items-center lg:items-start">
          <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            {content.hero.eyebrow}
          </p>
          <h1 className="font-heading mt-3 max-w-xl text-5xl font-semibold tracking-tighter sm:text-6xl lg:text-6xl xl:text-7xl">
            {content.hero.headline.map((segment) => (
              <span
                key={segment.text}
                className={segment.tone === "ink" ? "text-foreground" : "text-subhead"}
              >
                {segment.text}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-subhead">{content.hero.sub}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <Button
              asChild
              className="h-11 rounded-full bg-brand px-7 text-base text-brand-foreground hover:bg-brand/90"
            >
              <a href={content.hero.primary.href}>{content.hero.primary.label}</a>
            </Button>
            <a
              href={content.hero.secondary.href}
              className="text-sm text-brand hover:underline underline-offset-4"
            >
              {content.hero.secondary.label} →
            </a>
          </div>
        </div>

        <HeroConstellation />
      </Container>

      <ModelMarquee />
    </section>
  )
}
