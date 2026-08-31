import { Container } from "@/components/container"
import { GlowBackground } from "@/components/glow-background"
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
        <h1 className="font-heading text-5xl font-semibold tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
          {content.app.name}
        </h1>
        <p className="mt-6 max-w-md text-lg font-medium text-muted-foreground sm:text-xl">
          {content.app.tagline}
        </p>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground/80">
          {content.app.slogan}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Button asChild className="rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand/90">
            <a href="#download">Download</a>
          </Button>
          <a
            href={content.links.source}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-brand hover:underline underline-offset-4"
          >
            View on GitHub →
          </a>
        </div>
      </Container>
    </section>
  )
}
