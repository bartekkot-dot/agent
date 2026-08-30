import { Container } from "@/components/container"
import { GlowBackground } from "@/components/glow-background"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"
import { withBase } from "@/lib/url"

export function ShowcaseSection() {
  const [flagship, ...supporting] = content.showcase

  return (
    <section id="showcase" className="relative overflow-hidden pt-2 pb-20 sm:pt-4 sm:pb-28">
      <Container className="relative flex flex-col items-center">
        <div className="relative w-full max-w-[960px]">
          <GlowBackground intensity={0.25} animate={false} />
          <div className="relative overflow-hidden rounded-xl border border-border/40 bg-muted shadow-xl shadow-black/10 dark:shadow-black/50">
            <img
              src={withBase(flagship.src)}
              alt={flagship.alt}
              width={flagship.width}
              height={flagship.height}
              loading="eager"
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </div>
        </div>

        <Reveal className="mt-8 grid w-full max-w-[960px] grid-cols-1 gap-6 sm:grid-cols-2">
          {supporting.map((item) => (
            <figure key={item.src} className="m-0">
              <div className="overflow-hidden rounded-xl border border-border/40 bg-muted shadow-lg shadow-black/10 dark:shadow-black/40">
                <img
                  src={withBase(item.src)}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
