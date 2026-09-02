import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { content } from "@/content"

// Signature motif: the real Model Council shape, not a decorative graph — a
// single input fans out to every model in parallel, then converges through one
// "chair" node into one labeled answer. Every stage is plain-word captioned
// underneath so the flow reads without needing the headline next to it.
// ViewBox is a 640x440 landscape rect (was a 480x480 square) — the four-stage
// sequence needs the extra width; see hero-section.tsx for the aspect change.
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

export function HeroConstellation() {
  const reducedMotion = useReducedMotion()
  const { you, chair, answer, captions } = content.hero.diagram

  return (
    <div className="relative w-full max-w-[620px]">
      <svg viewBox="0 0 640 440" className="w-full text-border" aria-hidden="true">
        {/* you -> models (fan out) */}
        {MODELS.map((m, i) => (
          <motion.path
            key={`in-${m.id}`}
            d={bezier(YOU, m)}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.7, delay: 0.1 * i, ease: "easeOut" }}
          />
        ))}
        {/* models -> chair (converge) */}
        {MODELS.map((m, i) => (
          <motion.path
            key={`out-${m.id}`}
            d={bezier(m, CHAIR)}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.7, delay: 0.5 + 0.1 * i, ease: "easeOut" }}
          />
        ))}
        {/* chair -> answer: same neutral line as every other connector — only the
            terminal node itself carries color, per the single-payoff-role rule */}
        <motion.path
          d={`M ${CHAIR.x + 16} ${CHAIR.y} L ${ANSWER.x - 16} ${ANSWER.y}`}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.15, ease: "easeOut" }}
        />

        {/* you */}
        <motion.g
          initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          style={{ transformOrigin: `${YOU.x}px ${YOU.y}px` }}
        >
          <circle cx={YOU.x} cy={YOU.y} r="10" fill="var(--foreground)" />
          <text x={YOU.x} y={YOU.y + 30} textAnchor="middle" fontSize="12" fill="var(--foreground)">
            {you}
          </text>
        </motion.g>

        {/* models */}
        {MODELS.map((m, i) => (
          <motion.g
            key={m.id}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.15 * i + 0.35 }}
            style={{ transformOrigin: `${m.x}px ${m.y}px` }}
          >
            <circle cx={m.x} cy={m.y} r="9" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
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
          </motion.g>
        ))}

        {/* chair */}
        <motion.g
          initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.95, ease: "backOut" }}
          style={{ transformOrigin: `${CHAIR.x}px ${CHAIR.y}px` }}
        >
          <circle cx={CHAIR.x} cy={CHAIR.y} r="15" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx={CHAIR.x} cy={CHAIR.y} r="4" fill="var(--muted-foreground)" />
          <text x={CHAIR.x} y={CHAIR.y + 34} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
            {chair}
          </text>
        </motion.g>

        {/* answer — the one payoff node that carries the brand accent */}
        <motion.g
          initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 1.35, ease: "backOut" }}
          style={{ transformOrigin: `${ANSWER.x}px ${ANSWER.y}px` }}
        >
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
        </motion.g>
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
