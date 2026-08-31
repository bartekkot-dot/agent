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
// still instead). No glow/tint treatment here on purpose — that's the hero's signature
// moment; this is just a clean, honest frame in both themes.
export function ProductVideo({ src, poster, alt }: ProductVideoProps) {
  const reducedMotion = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (inView) setShouldLoad(true)
  }, [inView])

  const resolvedPoster = withBase(poster)

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/40 bg-card"
    >
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
  )
}
