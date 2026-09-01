import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { content } from "@/content"
import { cn } from "@/lib/utils"

// Signature motif (art direction pass): every model's answer stream converges
// into one glowing core — the visual form of "ask every model, trust one." Reused
// at lower intensity as a quiet divider mark elsewhere (see PLAN for rollout).
// ViewBox is a 480x480 square; the core sits right-of-center so it reads well
// against the copy column beside it.
const CORE = { x: 340, y: 248 }
const NODES = [
  { id: "claude", x: 92, y: 96, color: "var(--constellation-a)" },
  { id: "gpt", x: 48, y: 260, color: "var(--constellation-b)" },
  { id: "gemini", x: 168, y: 400, color: "var(--constellation-b)" },
  { id: "local", x: 320, y: 56, color: "var(--constellation-a)" },
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

function threadPath(from: { x: number; y: number }) {
  const midX = (from.x + CORE.x) / 2
  return `M ${from.x} ${from.y} Q ${midX} ${from.y}, ${CORE.x} ${CORE.y}`
}

export function HeroConstellation() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      <div
        aria-hidden="true"
        className={cn("glow-orb absolute rounded-full bg-brand", !reducedMotion && "glow-orb-animate")}
        style={{
          "--glow-intensity": 1.5,
          left: `${(CORE.x / 480) * 100}%`,
          top: `${(CORE.y / 480) * 100}%`,
          transform: "translate(-50%, -50%)",
        } as React.CSSProperties}
      />

      <svg viewBox="0 0 480 480" className="relative h-full w-full" aria-hidden="true">
        {NODES.map((node, i) => (
          <motion.path
            key={node.id}
            d={threadPath(node)}
            stroke={node.color}
            strokeWidth="1.5"
            fill="none"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeOut" }}
          />
        ))}

        {NODES.map((node, i) => (
          <motion.g
            key={`${node.id}-node`}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 * i + 0.5 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <circle cx={node.x} cy={node.y} r="5" fill="var(--background)" stroke={node.color} strokeWidth="1.5" />
            <text
              x={node.x}
              y={node.y - 14}
              textAnchor="middle"
              fontSize="11"
              fontFamily="'Geist Variable', monospace"
              fill="var(--muted-foreground)"
            >
              {node.id}
            </text>
          </motion.g>
        ))}

        <motion.circle
          cx={CORE.x}
          cy={CORE.y}
          r="9"
          fill="var(--brand)"
          initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9, ease: "backOut" }}
        />
      </svg>
    </div>
  )
}

export function ModelMarquee() {
  const items = [...content.councilDemo.models.map((m) => m.id), "→ converging"]
  const track = [...items, ...items]

  return (
    <div
      aria-hidden="true"
      className="relative mt-10 overflow-hidden border-t border-border/40 py-4 lg:mt-14"
    >
      <div className="model-marquee-animate flex w-max gap-10 font-mono text-xs text-muted-foreground">
        {track.map((label, i) => (
          <span key={i} className={label.startsWith("→") ? "font-medium text-brand" : undefined}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
