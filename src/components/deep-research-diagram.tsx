import { useEffect, useState } from "react"

import { content } from "@/content"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

// The real shape: Plan (one-shot) -> Search/Read LOOP (repeats until enough)
// -> Compile/Answer (one-shot payoff). Previously the loop was a thin arc
// tucked above two dots in an otherwise straight chain -- easy to mistake at
// a glance for Council's fan-out curves, since both were "circles joined by
// curved lines." Now search/read sit inside an actual closed ring with a dot
// that visibly orbits it twice (the repeat is the whole point of this
// feature): the silhouette becomes line -> circle -> line, which reads as
// "iterating" without parsing individual arrows, and no longer resembles
// Council's or Agent's shapes at all.
//
// Looping animation: same CSS-keyframe family as the other diagrams (one
// shared cycle duration, delay 0, each element's own keyframe stops encode
// its place on the timeline) -- see index.css's research-loop-* rules. The
// ring itself is permanent structure once lit (like Council's node outlines),
// not drawn in; only the connector lines, the orbiting dot, node fill-flashes,
// and the answer node animate.
// Taller viewBox than the other two diagrams (390 vs ~200-220) on purpose:
// the citation card beside this one runs long (a question, three sources,
// a verdict), and a diagram left at the same flat aspect ratio as Council's
// or Agent's just floats small at the top with a dead gap below it. The
// extra height is pure breathing room around the same horizontal flow, not
// bigger nodes -- combined with vertical centering in research-section.tsx,
// it makes the diagram's footprint match the card's instead of leaving a void.
const Y = 195
const PLAN = { x: 50, y: Y }
const RING = { cx: 320, cy: Y, r: 46 }
const SEARCH = { x: 290, y: Y }
const READ = { x: 350, y: Y }
const COMPILE = { x: 474, y: Y }
const ANSWER = { x: 576, y: Y }
const NODE_R = 14

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

export function DeepResearchDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const reducedMotion = useReducedMotion()
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (inView) setHasPlayed(true)
  }, [inView])

  const lit = reducedMotion || hasPlayed
  const looping = hasPlayed && !reducedMotion
  const [planLabel, searchLabel, readLabel, compileLabel, answerLabel] = content.research.steps

  return (
    <div ref={ref} className="w-full max-w-[560px]">
      <svg viewBox="0 0 640 390" aria-hidden="true" className="w-full">
        {/* plan -> ring */}
        <line
          x1={PLAN.x + NODE_R} y1={PLAN.y} x2={RING.cx - RING.r} y2={RING.cy}
          stroke="var(--diagram-line)" strokeWidth="1.5"
        />

        {/* the loop track -- permanent structure, like a node outline, not drawn in */}
        <circle cx={RING.cx} cy={RING.cy} r={RING.r} fill="none" stroke="var(--diagram-line)" strokeWidth="1.5" />

        {/* the orbiting dot -- two full laps is the visible "repeat" */}
        {looping && (
          <circle r="4" fill="var(--foreground)" className="research-loop-orbit-dot" />
        )}

        <text x={RING.cx} y={RING.cy - RING.r - 12} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
          {content.research.loopLabel}
        </text>

        {/* ring -> compile */}
        <line
          x1={RING.cx + RING.r} y1={RING.cy} x2={COMPILE.x - NODE_R} y2={COMPILE.y}
          stroke="var(--diagram-line)" strokeWidth="1.5"
          strokeDasharray={looping ? 100 : undefined}
          className={cn(looping && "research-loop-breakout")}
        />

        {/* compile -> answer: same neutral line as every other connector — only the
            terminal node itself carries color, per the single-payoff-role rule */}
        <line
          x1={COMPILE.x + NODE_R} y1={COMPILE.y} x2={ANSWER.x - NODE_R} y2={ANSWER.y}
          stroke="var(--diagram-line)" strokeWidth="1.5"
          strokeDasharray={looping ? 100 : undefined}
          className={cn(looping && "research-loop-payoff-line")}
        />

        {/* plan */}
        <g>
          <circle cx={PLAN.x} cy={PLAN.y} r={NODE_R} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" />
          <text x={PLAN.x} y={PLAN.y + 4} textAnchor="middle" fontSize="9.5" fill="var(--foreground)">
            {planLabel}
          </text>
        </g>

        {/* search + read -- inside the ring */}
        {[
          { pos: SEARCH, label: searchLabel, pulse: "research-loop-pulse-search" },
          { pos: READ, label: readLabel, pulse: "research-loop-pulse-read" },
        ].map((n) => (
          <g key={n.label}>
            <circle
              cx={n.pos.x}
              cy={n.pos.y}
              r={13}
              fill={lit ? "var(--card)" : "none"}
              stroke="var(--muted-foreground)"
              strokeWidth="1.5"
              className={cn(looping && n.pulse)}
            />
            <text x={n.pos.x} y={n.pos.y + 3.5} textAnchor="middle" fontSize="9" fill={lit ? "var(--foreground)" : "var(--muted-foreground)"}>
              {n.label}
            </text>
          </g>
        ))}

        {/* compile */}
        <g>
          <circle
            cx={COMPILE.x}
            cy={COMPILE.y}
            r={NODE_R}
            fill={lit ? "var(--card)" : "none"}
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
            className={cn(looping && "research-loop-pulse-compile")}
          />
          <text x={COMPILE.x} y={COMPILE.y + 3.5} textAnchor="middle" fontSize="9" fill={lit ? "var(--foreground)" : "var(--muted-foreground)"}>
            {compileLabel}
          </text>
        </g>

        {/* answer: the one payoff node — earned once per cycle, like the other diagrams' */}
        <g
          role="img"
          aria-label={answerLabel}
          className={cn(looping && "research-loop-answer-pop")}
          style={{ transformOrigin: `${ANSWER.x}px ${ANSWER.y}px` }}
        >
          <circle cx={ANSWER.x} cy={ANSWER.y} r={NODE_R + 2} fill="var(--payoff)" />
          <path
            d={`M ${ANSWER.x - 7} ${ANSWER.y} l 5 6 l 9 -11`}
            fill="none"
            stroke="var(--payoff-foreground)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* plain-word stage captions under the three visual clusters */}
        <text x={PLAN.x} y="365" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {content.research.flowCaptions[0]}
        </text>
        <text x={RING.cx} y="365" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {content.research.flowCaptions[1]}
        </text>
        <text x={(COMPILE.x + ANSWER.x) / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {content.research.flowCaptions[2]}
        </text>
      </svg>
    </div>
  )
}
