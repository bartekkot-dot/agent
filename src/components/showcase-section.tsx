import { Container } from "@/components/container"
import { GlowBackground } from "@/components/glow-background"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"
import { withBase } from "@/lib/url"

const FRAME_BASE =
  "relative overflow-hidden rounded-xl border border-border/40 bg-muted transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"

const FRAME_SHADOW_FLAGSHIP =
  "shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_20px_60px_-20px_rgba(0,0,0,0.25)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_25px_70px_-20px_rgba(0,0,0,0.6)]"

const FRAME_SHADOW_SUPPORTING =
  "shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_12px_40px_-18px_rgba(0,0,0,0.2)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_16px_45px_-18px_rgba(0,0,0,0.55)]"

export function ShowcaseSection() {
  const [flagship, ...supporting] = content.showcase

  return (
    <section id="showcase" className="relative overflow-hidden pt-2 pb-20 sm:pt-4 sm:pb-28">
      <Container className="relative flex flex-col items-center">
        <div className="relative w-full max-w-[960px]">
          <GlowBackground intensity={0.25} animate={false} />
          <div className={`${FRAME_BASE} ${FRAME_SHADOW_FLAGSHIP}`}>
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
              <div className={`${FRAME_BASE} ${FRAME_SHADOW_SUPPORTING}`}>
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
