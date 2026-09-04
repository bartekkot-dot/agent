import { useEffect, useState } from "react"

import { content } from "@/content"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

// The real shape: Plan (one-shot) -> Search/Read LOOP (repeats until enough,
// shown as a literal curved return arrow) -> Compile/Answer (one-shot payoff).
// This must NOT look like Council's straight fan-out chain — the loop is what
// makes Deep Research a different mechanism, not a re-skinned pipeline.
//
// Looping animation: same CSS-keyframe family as hero-constellation.tsx (one
// shared cycle duration, delay 0, each element's own keyframe stops encode
// its place on the timeline). The search<->read pair visibly draws, retracts,
// and redraws once (two passes) before breaking out to compile — that visible
// repeat is the whole point of this diagram, distinguishing it from Council's
// one-shot fan-out. Nodes stay permanently visible once first shown; only the
// connector lines, a brief fill-flash per node on arrival, and the answer
// node (earned once per cycle, like Council's) actually animate.
const PLAN = { x: 40, y: 140 }
const SEARCH = { x: 175, y: 140 }
const READ = { x: 310, y: 140 }
const COMPILE = { x: 445, y: 140 }
const ANSWER = { x: 560, y: 140 }
const NODE_R = 15

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

  // lit = the diagram has been seen at least once (or motion is off) — nodes
  // and connectors render in their resolved appearance permanently from then
  // on. looping = actually run the infinite CSS animation (never true under
  // reduced motion, matching every other looping animation on the page).
  const lit = reducedMotion || hasPlayed
  const looping = hasPlayed && !reducedMotion
  const [planLabel, searchLabel, readLabel, compileLabel, answerLabel] = content.research.steps

  return (
    <div ref={ref} className="mt-6 w-full max-w-[560px]">
      <svg viewBox="0 0 600 220" aria-hidden="true" className="w-full text-border">
        <defs>
          <marker id="research-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={lit ? "var(--muted-foreground)" : "currentColor"} />
          </marker>
        </defs>

        {/* plan -> search */}
        <line
          x1={PLAN.x + NODE_R} y1={PLAN.y} x2={SEARCH.x - NODE_R} y2={SEARCH.y}
          stroke={lit ? "var(--muted-foreground)" : "currentColor"} strokeWidth="1.5" markerEnd="url(#research-arrow)"
          strokeDasharray={looping ? 130 : undefined}
          className={cn(looping && "research-loop-plan-search")}
        />

        {/* search -> read (draws twice — the repeat is the point) */}
        <line
          x1={SEARCH.x + NODE_R} y1={SEARCH.y} x2={READ.x - NODE_R} y2={READ.y}
          stroke={lit ? "var(--muted-foreground)" : "currentColor"} strokeWidth="1.5" markerEnd="url(#research-arrow)"
          strokeDasharray={looping ? 130 : undefined}
          className={cn(looping && "research-loop-search-read")}
        />

        {/* read -> search: the loop-back, the one thing that makes this shape a LOOP */}
        <path
          d={`M ${READ.x - 6} ${READ.y - NODE_R} C ${READ.x - 6} ${READ.y - 78}, ${SEARCH.x + 6} ${SEARCH.y - 78}, ${SEARCH.x + 6} ${SEARCH.y - NODE_R}`}
          fill="none"
          stroke={lit ? "var(--muted-foreground)" : "currentColor"}
          strokeWidth="1.5"
          strokeDasharray={looping ? 170 : "4 5"}
          markerEnd="url(#research-arrow)"
          className={cn(looping && "research-loop-back")}
        />
        <text
          x={(READ.x + SEARCH.x) / 2}
          y={READ.y - 88}
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted-foreground)"
        >
          {content.research.loopLabel}
        </text>

        {/* read -> compile: breaking out of the loop once there's enough */}
        <line
          x1={READ.x + NODE_R} y1={READ.y} x2={COMPILE.x - NODE_R} y2={COMPILE.y}
          stroke={lit ? "var(--muted-foreground)" : "currentColor"} strokeWidth="1.5" markerEnd="url(#research-arrow)"
          strokeDasharray={looping ? 130 : undefined}
          className={cn(looping && "research-loop-breakout")}
        />

        {/* compile -> answer: same neutral line as every other connector — only the
            terminal node itself carries color, per the single-payoff-role rule */}
        <line
          x1={COMPILE.x + NODE_R} y1={COMPILE.y} x2={ANSWER.x - NODE_R} y2={ANSWER.y}
          stroke={lit ? "var(--muted-foreground)" : "currentColor"} strokeWidth="1.5" markerEnd="url(#research-arrow)"
          strokeDasharray={looping ? 100 : undefined}
          className={cn(looping && "research-loop-payoff-line")}
        />

        {[
          { pos: PLAN, label: planLabel, pulse: undefined },
          { pos: SEARCH, label: searchLabel, pulse: "research-loop-pulse-search" },
          { pos: READ, label: readLabel, pulse: "research-loop-pulse-read" },
          { pos: COMPILE, label: compileLabel, pulse: "research-loop-pulse-compile" },
        ].map((n) => (
          <g key={n.label}>
            <circle
              cx={n.pos.x}
              cy={n.pos.y}
              r={NODE_R}
              fill={lit ? "var(--card)" : "none"}
              stroke={lit ? "var(--muted-foreground)" : "currentColor"}
              strokeWidth="1.5"
              className={cn(looping && n.pulse)}
            />
            <text x={n.pos.x} y={n.pos.y + 4} textAnchor="middle" fontSize="9.5" fill={lit ? "var(--foreground)" : "currentColor"}>
              {n.label}
            </text>
          </g>
        ))}

        {/* answer: the one payoff node — earned once per cycle, like the hero's */}
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
        <text x={PLAN.x} y="195" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {content.research.flowCaptions[0]}
        </text>
        <text x={(SEARCH.x + READ.x) / 2} y="195" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {content.research.flowCaptions[1]}
        </text>
        <text x={(COMPILE.x + ANSWER.x) / 2} y="195" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {content.research.flowCaptions[2]}
        </text>
      </svg>
    </div>
  )
}
