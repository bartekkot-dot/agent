import { useEffect, useRef, useState } from "react"

import { Container } from "@/components/container"
import { content } from "@/content"
import { cn } from "@/lib/utils"
import { withBase } from "@/lib/url"

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

// Real product screenshots, right after the hero — ONE large, legible shot
// fills the whole strip; no sliver of the next one visible. Drag/swipe is the
// primary control; small prev/next arrows are a secondary, optional aid (not
// the main way to move) alongside a non-interactive dot indicator. No
// autoplay — the user always sets the pace.
//
// `items-start` on the track matters: flex's default align-items:stretch
// would force every card to the height of the TALLEST screenshot, and
// object-cover would then zoom+crop the shorter ones to fill that height —
// which chopped off their own sidebar text and looked like a neighboring
// screenshot bleeding through. items-start lets each card keep its own
// aspect-ratio-derived height instead.
export function AppPreview() {
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const drag = useRef<{ startX: number; startScrollLeft: number } | null>(null)
  const [active, setActive] = useState(0)
  const rafPending = useRef(false)
  const reducedMotion = useReducedMotion()
  const count = content.appPreview.shots.length

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return // touch/pen: let native swipe scrolling handle it
    const track = trackRef.current
    if (!track) return
    drag.current = { startX: e.clientX, startScrollLeft: track.scrollLeft }
    track.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !drag.current) return
    track.scrollLeft = drag.current.startScrollLeft - (e.clientX - drag.current.startX)
  }

  const endDrag = () => {
    drag.current = null
  }

  // Pure status indicator, not a control — tracks which card is nearest the
  // scroll position so the dots below can show progress while dragging/swiping.
  const onScroll = () => {
    if (rafPending.current) return
    rafPending.current = true
    requestAnimationFrame(() => {
      rafPending.current = false
      const track = trackRef.current
      if (!track) return
      let closest = 0
      let closestDist = Infinity
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const dist = Math.abs(el.offsetLeft - track.scrollLeft)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActive(closest)
    })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => track.removeEventListener("scroll", onScroll)
  }, [])

  const goTo = (index: number) => {
    const track = trackRef.current
    const target = itemRefs.current[index]
    if (!track || !target) return
    track.scrollTo({ left: target.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" })
  }

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex snap-x snap-mandatory items-start overflow-x-auto pb-1 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {content.appPreview.shots.map((shot, i) => (
            <div
              key={shot.src}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              className="w-full shrink-0 snap-start overflow-hidden rounded-xl border border-border/60 bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]"
              style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
            >
              <img
                src={withBase(shot.src)}
                alt={shot.alt}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
                className="block h-full w-full object-cover select-none"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous screenshot"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
            className="flex size-7 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex gap-2" aria-hidden="true">
            {content.appPreview.shots.map((shot, i) => (
              <span
                key={shot.src}
                className={cn("h-1.5 w-1.5 rounded-full", i === active ? "bg-foreground" : "bg-border")}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next screenshot"
            disabled={active === count - 1}
            onClick={() => goTo(active + 1)}
            className="flex size-7 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  )
}
