import { useEffect, useState } from "react"

// The hero's whole-app visual (was the Model Council fan-out diagram, now
// moved to council-diagram.tsx — that diagram represents one feature, this
// represents the whole app). A loose constellation of the app's models, dot-
// grid backdrop, with a selector that cycles between models one at a time
// (choosing/switching), and periodically every dot brightens together (ask
// them all at once). Kept strictly monochrome — no --payoff blue here; blue
// stays reserved for the answer payoff on the flow diagrams, first appearing
// in the Model Council section, not the hero.
//
// Positions are deliberately scattered/uneven ("loose"), not a tidy row or
// fan-out — this is meant to read as a starfield, not a mechanism diagram.
// Same CSS-loop technique as the flow diagrams (looping, prefers-reduced-
// motion-guarded), but simpler: two shared keyframes (a selector that jumps
// between positions, a dot brightness pulse reused per-dot via
// animation-delay) instead of a staged draw sequence, since there's no
// process to show here, just "many models, pick one, or ask them all."
const MODELS = [
  { id: "claude", x: 100, y: 100 },
  { id: "gpt", x: 260, y: 60 },
  { id: "gemini", x: 420, y: 110 },
  { id: "llama", x: 560, y: 70 },
  { id: "mistral", x: 150, y: 260 },
  { id: "deepseek", x: 340, y: 300 },
  { id: "local", x: 500, y: 250 },
]

// A loose, partially-connected network (not a full mesh, not a hub-spoke) —
// static and unanimated, purely atmospheric, so it doesn't compete with the
// selector's motion.
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 5],
  [5, 6],
  [2, 5],
]

// Each dot gets an even 1/7th share of the 6s cycle for its own brighten
// pulse, matching exactly when the selector ring visits it (both driven by
// the same 6s duration + persistent per-element animation-delay, so they
// stay in lockstep forever without needing to share one giant keyframe).
const BEAT = 6 / 8 // 7 model beats + 1 "all together" beat

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

export function HeroEveryAI() {
  const reducedMotion = useReducedMotion()
  const base = MODELS[0]

  return (
    <div className="relative w-full max-w-[620px]">
      <svg viewBox="0 0 640 400" className="w-full" aria-hidden="true">
        {/* dot-grid backdrop, same idea as the app's own Settings "Dots" background */}
        <defs>
          <pattern id="every-ai-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--foreground)" opacity="0.08" />
          </pattern>
          <mask id="every-ai-grid-mask">
            <rect width="640" height="400" fill="url(#every-ai-fade)" />
          </mask>
          <radialGradient id="every-ai-fade" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
        </defs>
        <rect width="640" height="400" fill="url(#every-ai-grid)" mask="url(#every-ai-grid-mask)" />

        {/* loose static links — atmospheric only, never animated */}
        {LINKS.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={MODELS[a].x}
            y1={MODELS[a].y}
            x2={MODELS[b].x}
            y2={MODELS[b].y}
            stroke="var(--border)"
            strokeWidth="1"
          />
        ))}

        {/* the selector — jumps between models, one at a time */}
        {!reducedMotion && (
          <circle
            cx={base.x}
            cy={base.y}
            r="15"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="1.5"
            className="hero-every-ai-selector"
          />
        )}

        {/* the models themselves */}
        {MODELS.map((m, i) => (
          <g key={m.id}>
            <circle
              cx={m.x}
              cy={m.y}
              r="6"
              fill={reducedMotion ? (i === 0 ? "var(--foreground)" : "var(--muted-foreground)") : "var(--muted-foreground)"}
              opacity={reducedMotion ? 1 : 0.55}
              className={!reducedMotion ? "hero-every-ai-dot" : undefined}
              style={!reducedMotion ? ({ "--select-delay": `${i * BEAT}s` } as React.CSSProperties) : undefined}
            />
            <text
              x={m.x}
              y={m.y - 14}
              textAnchor="middle"
              fontSize="11"
              fontFamily="'Geist Variable', monospace"
              fill="var(--muted-foreground)"
            >
              {m.id}
            </text>
          </g>
        ))}

        {/* static selected-state ring, reduced motion only */}
        {reducedMotion && (
          <circle cx={base.x} cy={base.y} r="15" fill="none" stroke="var(--foreground)" strokeWidth="1.5" />
        )}
      </svg>
    </div>
  )
}
