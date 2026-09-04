import { useEffect, useState } from "react"

import { content } from "@/content"
import { cn } from "@/lib/utils"

// Signature motif: the real Model Council shape, not a decorative graph — a
// single input fans out to every model in parallel, then converges through one
// "chair" node into one labeled answer. Every stage is plain-word captioned
// underneath so the flow reads without needing the headline next to it.
//
// Moved here from the hero (was hero-constellation.tsx / HeroConstellation) —
// this diagram represents ONE feature (Model Council), so it belongs in that
// feature's own section, not standing in for the whole app. Renamed file,
// component, and CSS classes to match (was hero-flow-* / hero-node-pulse-* /
// hero-answer-pop, now council-diagram-*).
//
// Looping animation: pure CSS keyframes (see index.css's council-diagram-* /
// council-diagram-pulse-* / council-diagram-answer-pop rules), not
// framer-motion — an infinite loop is cheaper driven by the compositor than
// re-running JS-driven motion forever, and it matches deep-research-diagram.tsx
// / agent-diagram.tsx's existing CSS-loop convention. you/models/chair stay
// permanently visible (the structure); only the connector lines, a brief
// "lit" fill-flash on each node as the flow arrives, and the answer node
// itself (which only exists once earned each cycle) actually animate.
const YOU = { x: 50, y: 230 }
const CHAIR = { x: 480, y: 230 }
const ANSWER = { x: 610, y: 230 }
const MODELS = [
  { id: "claude", x: 300, y: 70 },
  { id: "gpt", x: 300, y: 177 },
  { id: "gemini", x: 300, y: 283 },
  { id: "local", x: 300, y: 390 },
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

function bezier(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2
  return `M ${from.x} ${from.y} Q ${midX} ${from.y}, ${to.x} ${to.y}`
}

// Safe overestimates of each path's real length (curves are longer than the
// straight chord) — for a stroke-draw effect the exact length doesn't matter,
// only that dasharray >= true length, so the "fully drawn" state has no gaps.
const FAN_DASH = 340
const PAYOFF_DASH = 110

export function CouncilDiagram() {
  const reducedMotion = useReducedMotion()
  const { you, chair, answer, captions } = content.council.diagram

  return (
    <div className="relative w-full max-w-[620px]">
      <svg viewBox="0 0 640 440" className="w-full text-border" aria-hidden="true">
        {/* you -> models (fan out) */}
        {MODELS.map((m) => (
          <path
            key={`in-${m.id}`}
            d={bezier(YOU, m)}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={reducedMotion ? undefined : FAN_DASH}
            className={cn(!reducedMotion && "council-diagram-stage1")}
          />
        ))}
        {/* models -> chair (converge) */}
        {MODELS.map((m) => (
          <path
            key={`out-${m.id}`}
            d={bezier(m, CHAIR)}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={reducedMotion ? undefined : FAN_DASH}
            className={cn(!reducedMotion && "council-diagram-stage2")}
          />
        ))}
        {/* chair -> answer: same neutral line as every other connector — only the
            terminal node itself carries color, per the single-payoff-role rule */}
        <path
          d={`M ${CHAIR.x + 16} ${CHAIR.y} L ${ANSWER.x - 16} ${ANSWER.y}`}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray={reducedMotion ? undefined : PAYOFF_DASH}
          className={cn(!reducedMotion && "council-diagram-stage3")}
        />

        {/* you — the constant origin; a brief pulse marks the start of each cycle */}
        <g>
          <circle
            cx={YOU.x}
            cy={YOU.y}
            r="10"
            fill="var(--foreground)"
            className={cn(!reducedMotion && "council-diagram-pulse-you")}
          />
          <text x={YOU.x} y={YOU.y + 30} textAnchor="middle" fontSize="12" fill="var(--foreground)">
            {you}
          </text>
        </g>

        {/* models — outline is permanent; fill flashes briefly as the flow arrives */}
        {MODELS.map((m) => (
          <g key={m.id}>
            <circle
              cx={m.x}
              cy={m.y}
              r="9"
              fill="var(--background)"
              stroke="currentColor"
              strokeWidth="1.5"
              className={cn(!reducedMotion && "council-diagram-pulse-model")}
            />
            <text
              x={m.x}
              y={m.y - 16}
              textAnchor="middle"
              fontSize="11"
              fontFamily="'Geist Variable', monospace"
              fill="var(--muted-foreground)"
            >
              {m.id}
            </text>
          </g>
        ))}

        {/* chair — same permanent-outline / flashing-fill treatment as the models */}
        <g>
          <circle cx={CHAIR.x} cy={CHAIR.y} r="15" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
          <circle
            cx={CHAIR.x}
            cy={CHAIR.y}
            r="4"
            fill="var(--muted-foreground)"
            className={cn(!reducedMotion && "council-diagram-pulse-chair")}
          />
          <text x={CHAIR.x} y={CHAIR.y + 34} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
            {chair}
          </text>
        </g>

        {/* answer — the one payoff node; it's earned each cycle, not permanent,
            so it appears last and fades out with the rest at reset */}
        <g className={cn(!reducedMotion && "council-diagram-answer-pop")} style={{ transformOrigin: `${ANSWER.x}px ${ANSWER.y}px` }}>
          <circle
            cx={ANSWER.x}
            cy={ANSWER.y}
            r="17"
            fill="var(--payoff)"
            style={{ filter: "drop-shadow(0 0 14px color-mix(in oklab, var(--payoff) 45%, transparent))" }}
          />
          <path
            d={`M ${ANSWER.x - 7} ${ANSWER.y} l 5 6 l 10 -12`}
            fill="none"
            stroke="var(--payoff-foreground)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={ANSWER.x} y={ANSWER.y + 36} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
            {answer}
          </text>
        </g>
      </svg>

      {/* Plain-word stage captions — the diagram must read even without this row,
          but this makes the sequence unambiguous for anyone skimming. */}
      <div className="mt-2 hidden sm:grid grid-cols-4 gap-2 text-center text-[11px] text-muted-foreground">
        {captions.map((caption, i) => (
          <span key={caption} style={{ gridColumn: i + 1 }}>
            {caption}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ModelMarquee() {
  // Monospace stays reserved for the real model IDs; "converging" is a plain
  // label, so it renders in the brand sans, not mono, and carries no arrow glyph.
  const items = [
    ...content.councilDemo.models.map((m) => ({ label: m.id, mono: true })),
    { label: "converging", mono: false },
  ]
  const track = [...items, ...items]

  return (
    <div
      aria-hidden="true"
      className="relative mt-10 overflow-hidden border-t border-border/40 py-4 lg:mt-14"
    >
      <div className="model-marquee-animate flex w-max gap-10 text-xs text-muted-foreground">
        {track.map((item, i) => (
          <span key={i} className={item.mono ? "font-mono" : undefined}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
