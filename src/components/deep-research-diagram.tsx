import { useEffect, useState, type CSSProperties } from "react"

import { content } from "@/content"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

// Geometry for content.research.steps (5 nodes) — see MOTION-SPEC.md §4b.
const NODES = [
  { x: 4, width: 58 },
  { x: 76, width: 72 },
  { x: 162, width: 56 },
  { x: 232, width: 78 },
  { x: 324, width: 54 },
]

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

export function DeepResearchDiagram({ caption }: { caption: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const reducedMotion = useReducedMotion()
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (inView) setHasPlayed(true)
  }, [inView])

  // Reduced motion: fully lit immediately, no draw-in. Normal motion: lit only once
  // scrolled into view, animating from muted to lit (fires once, never repeats).
  const lit = reducedMotion || hasPlayed
  const playing = hasPlayed && !reducedMotion

  return (
    <div ref={ref} className="mx-auto mt-6 max-w-[420px]">
      <svg viewBox="0 0 380 160" aria-hidden="true" className="w-full text-muted-foreground">
        <defs>
          <marker id="research-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={lit ? "var(--brand)" : "currentColor"} />
          </marker>
        </defs>

        {content.research.steps.slice(0, -1).map((step, i) => {
          const from = NODES[i]
          const to = NODES[i + 1]
          const x1 = from.x + from.width
          const x2 = to.x - 4
          return (
            <line
              key={step}
              x1={x1}
              y1="80"
              x2={x2}
              y2="80"
              stroke={lit ? "var(--brand)" : "currentColor"}
              strokeWidth="1.5"
              markerEnd="url(#research-arrow)"
              className={cn(playing && "research-line-animate")}
              style={{ "--dash-length": x2 - x1, animationDelay: `${i * 0.15}s` } as CSSProperties}
            />
          )
        })}

        {content.research.steps.map((step, i) => {
          const node = NODES[i]
          return (
            <g
              key={step}
              className={cn(playing && "research-node-animate")}
              style={{ animationDelay: `${i * 0.15 + 0.1}s` } as CSSProperties}
            >
              <rect
                x={node.x}
                y="66"
                width={node.width}
                height="28"
                rx="14"
                fill={lit ? "var(--brand)" : "none"}
                fillOpacity={lit ? 0.12 : undefined}
                stroke={lit ? "var(--brand)" : "currentColor"}
                strokeWidth="1.5"
              />
              <text
                x={node.x + node.width / 2}
                y="84"
                textAnchor="middle"
                fontSize="11"
                fill={lit ? "var(--brand)" : "currentColor"}
              >
                {step}
              </text>
            </g>
          )
        })}
      </svg>

      {caption && (
        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{caption}</span>
        </div>
      )}
    </div>
  )
}
