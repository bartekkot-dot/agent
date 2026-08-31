import { Container } from "@/components/container"
import { GlowBackground } from "@/components/glow-background"
import { HeroDemo } from "@/components/hero-demo"
import { Button } from "@/components/ui/button"
import { content } from "@/content"
import { useInView } from "@/hooks/use-in-view"

export function HeroSection() {
  const { ref, inView } = useInView<HTMLElement>(0)

  return (
    <section
      id="hero"
      ref={ref}
      className="relative scroll-mt-12 overflow-hidden py-20 sm:py-28"
    >
      <GlowBackground paused={!inView} />

      <Container className="relative flex flex-col items-center text-center">
        <h1 className="font-heading max-w-3xl text-4xl font-semibold tracking-tighter sm:text-5xl lg:text-6xl">
          {content.hero.headline.map((segment) => (
            <span
              key={segment.text}
              className={segment.tone === "ink" ? "text-foreground" : "text-muted-foreground"}
            >
              {segment.text}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">{content.hero.sub}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Button asChild className="rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand/90">
            <a href={content.hero.primary.href}>{content.hero.primary.label}</a>
          </Button>
          <a
            href={content.hero.secondary.href}
            className="text-sm text-brand hover:underline underline-offset-4"
          >
            {content.hero.secondary.label} →
          </a>
        </div>
        <HeroDemo />
      </Container>
    </section>
  )
}
