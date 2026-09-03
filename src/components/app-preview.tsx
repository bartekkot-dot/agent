import { useRef } from "react"

import { Container } from "@/components/container"
import { content } from "@/content"
import { withBase } from "@/lib/url"

// Real product screenshots, right after the hero — a compact, horizontally
// scrollable band instead of three stacked full-width shots (that ate ~1900px
// of vertical space). Drag/swipe only, no arrows, no autoplay: the user sets
// the pace. Cards are sized to a fixed height with each screenshot's own
// aspect ratio, so nothing is cropped or distorted, and the next card always
// peeks at the edge as the scroll affordance.
//
// No JS-driven or auto-triggered motion exists here (no autoplay, no
// scrollIntoView), so there's nothing for prefers-reduced-motion to disable —
// scroll-snap on user-driven drag/swipe isn't the kind of motion that setting
// controls.
export function AppPreview() {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startX: number; startScrollLeft: number } | null>(null)

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

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {content.appPreview.shots.map((shot, i) => (
            <div
              key={shot.src}
              className="shrink-0 snap-start overflow-hidden rounded-xl border border-border/60 bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]"
              style={{ height: "min(70vw, 20rem)", aspectRatio: `${shot.width} / ${shot.height}` }}
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
      </Container>
    </section>
  )
}
