import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { content } from "@/content"

export function HeroSection() {
  return (
    <section id="hero" className="scroll-mt-12 py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-semibold tracking-tighter text-foreground sm:text-7xl">
          {content.app.name}
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted-foreground sm:text-xl">
          {content.app.tagline}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
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
