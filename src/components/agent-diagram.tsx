import { useEffect, useState } from "react"

import { content } from "@/content"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

// The real flow (see content.ts's comment) — you -> agent (reasons, calls
// tools, loops as needed via its own self-loop, not a two-node ping-pong like
// Deep Research's search/read) -> one answer. Same CSS-loop family as the
// other two flow diagrams (linear timing, keyframe-baked overshoots, ~0.5s
// unified reset), same lazy-start-on-scroll gate as Research.
const YOU = { x: 60, y: 120 }
const AGENT = { x: 280, y: 120 }
const ANSWER = { x: 520, y: 120 }
const AGENT_R = 16
const ANSWER_R = 17

// Safe overestimates of each path's real length (see hero-constellation.tsx
// for why exact length doesn't matter for a stroke-draw effect).
const YOU_AGENT_DASH = 220
const SELF_LOOP_DASH = 150
const AGENT_ANSWER_DASH = 240

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

export function AgentDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const reducedMotion = useReducedMotion()
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (inView) setHasPlayed(true)
  }, [inView])

  const lit = reducedMotion || hasPlayed
  const looping = hasPlayed && !reducedMotion
  const { you, agent, answer, captions } = content.agent.diagram

  // Self-loop: starts and ends at the agent node's top, arcing up and back —
  // reads as "iterates on itself" rather than bouncing to a second node.
  const selfLoop = `M ${AGENT.x - 10} ${AGENT.y - AGENT_R} C ${AGENT.x - 46} ${AGENT.y - 66}, ${AGENT.x + 46} ${AGENT.y - 66}, ${AGENT.x + 10} ${AGENT.y - AGENT_R}`

  return (
    <div ref={ref} className="w-full max-w-[560px]">
      <svg viewBox="0 0 600 200" className="w-full text-border" aria-hidden="true">
        {/* you -> agent */}
        <path
          d={`M ${YOU.x + 10} ${YOU.y} L ${AGENT.x - AGENT_R} ${AGENT.y}`}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray={looping ? YOU_AGENT_DASH : undefined}
          className={cn(looping && "agent-loop-you-agent")}
        />

        {/* agent's self-loop — draws, retracts, redraws once (the repeat is the point) */}
        <path
          d={selfLoop}
          fill="none"
          stroke={lit ? "var(--muted-foreground)" : "currentColor"}
          strokeWidth="1.5"
          strokeDasharray={looping ? SELF_LOOP_DASH : "4 5"}
          className={cn(looping && "agent-loop-self")}
        />

        {/* agent -> answer */}
        <path
          d={`M ${AGENT.x + AGENT_R} ${AGENT.y} L ${ANSWER.x - ANSWER_R} ${ANSWER.y}`}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray={looping ? AGENT_ANSWER_DASH : undefined}
          className={cn(looping && "agent-loop-answer-line")}
        />

        {/* you — the constant origin, same treatment as the other diagrams */}
        <g>
          <circle cx={YOU.x} cy={YOU.y} r="10" fill="var(--foreground)" />
          <text x={YOU.x} y={YOU.y + 30} textAnchor="middle" fontSize="12" fill="var(--foreground)">
            {you}
          </text>
        </g>

        {/* agent — permanent outline; fill flashes as it reasons/loops */}
        <circle
          cx={AGENT.x}
          cy={AGENT.y}
          r={AGENT_R}
          fill={lit ? "var(--card)" : "none"}
          stroke={lit ? "var(--muted-foreground)" : "currentColor"}
          strokeWidth="1.5"
          className={cn(looping && "agent-loop-pulse-agent")}
        />
        <text x={AGENT.x} y={AGENT.y + AGENT_R + 20} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
          {agent}
        </text>

        {/* answer — the one payoff node, earned once per cycle like the other diagrams */}
        <g
          role="img"
          aria-label={answer}
          className={cn(looping && "agent-loop-answer-pop")}
          style={{ transformOrigin: `${ANSWER.x}px ${ANSWER.y}px` }}
        >
          <circle cx={ANSWER.x} cy={ANSWER.y} r={ANSWER_R} fill="var(--payoff)" />
          <path
            d={`M ${ANSWER.x - 7} ${ANSWER.y} l 5 6 l 9 -11`}
            fill="none"
            stroke="var(--payoff-foreground)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={ANSWER.x} y={ANSWER.y + ANSWER_R + 20} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
            {answer}
          </text>
        </g>

        {/* plain-word stage captions under the three visual clusters */}
        <text x={YOU.x} y="185" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {captions[0]}
        </text>
        <text x={AGENT.x} y="185" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {captions[1]}
        </text>
        <text x={ANSWER.x} y="185" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          {captions[2]}
        </text>
      </svg>
    </div>
  )
}
