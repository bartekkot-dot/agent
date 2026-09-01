import { useEffect, useState } from "react"

import { useInView } from "@/hooks/use-in-view"
import { withBase } from "@/lib/url"

type ProductVideoProps = {
  src: string
  poster: string
  alt: string
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return reduced
}

// Real screen-recorded footage — "proof" the app works, distinct from the stylized
// scroll-scrub/diagram "explainers" that sit alongside it. Autoplay/muted/loop, but only
// once scrolled near (no blocking initial paint) and never under reduced motion (poster
// still instead).
//
// Art-direction pass: product shots are now framed as hero art — soft shadow, a
// brand-green glow behind, and a slight tilt that settles flat on hover/focus (desktop
// only; a tilted video reads as a mistake on a phone-width screen, not a design choice,
// so it's inert below sm). No added chrome bar here: the recording itself already shows
// the app's real title bar, so a second fake one on top just doubled up.
export function ProductVideo({ src, poster, alt }: ProductVideoProps) {
  const reducedMotion = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (inView) setShouldLoad(true)
  }, [inView])

  const resolvedPoster = withBase(poster)

  return (
    <div ref={ref} className="group relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-brand/25 opacity-60 blur-3xl dark:bg-brand/30 dark:opacity-80"
      />

      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out sm:-rotate-1 sm:group-hover:rotate-0">
        <div className="aspect-[16/10] w-full">
          {shouldLoad && !reducedMotion ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={resolvedPoster}
              aria-label={alt}
              className="block h-full w-full object-cover"
            >
              <source src={withBase(src)} type="video/mp4" />
            </video>
          ) : (
            <img src={resolvedPoster} alt={alt} loading="lazy" className="block h-full w-full object-cover" />
          )}
        </div>
      </div>
    </div>
  )
}
