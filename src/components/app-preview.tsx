import { useEffect, useRef, useState } from "react"

import { Container } from "@/components/container"
import { content } from "@/content"
import { cn } from "@/lib/utils"
import { withBase } from "@/lib/url"

// Real product screenshots, right after the hero — ONE large, legible shot
// fills the whole strip; no sliver of the next one visible. Drag/swipe only,
// no arrows, no autoplay: the user sets the pace. Each card is full track
// width so nothing else is ever in view; height follows from the
// screenshot's own aspect ratio, so nothing is cropped or distorted.
//
// No JS-driven or auto-triggered motion exists here (no autoplay, no
// scrollIntoView), so there's nothing for prefers-reduced-motion to disable —
// scroll-snap on user-driven drag/swipe isn't the kind of motion that setting
// controls.
export function AppPreview() {
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const drag = useRef<{ startX: number; startScrollLeft: number } | null>(null)
  const [active, setActive] = useState(0)
  const rafPending = useRef(false)

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

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex snap-x snap-mandatory overflow-x-auto pb-1 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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

        <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
          {content.appPreview.shots.map((shot, i) => (
            <span
              key={shot.src}
              className={cn("h-1.5 w-1.5 rounded-full", i === active ? "bg-foreground" : "bg-border")}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
