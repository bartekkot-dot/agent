import { useEffect, useState, type CSSProperties } from "react"
import { RotateCcw } from "lucide-react"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const MODEL_Y = [28, 80, 132]
const MODEL_LABELS = ["Model 1", "Model 2", "Model 3"]

const PROMPT = { x: 8, width: 64 }
const MODEL = { x: 116, width: 66 }
const CHAIR = { x: 232, width: 58 }
const ANSWER = { x: 314, width: 58 }

export function ModelCouncilDiagram({ caption }: { caption: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [replayKey, setReplayKey] = useState(0)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (inView) setHasPlayed(true)
  }, [inView])

  const playing = hasPlayed && !reducedMotion

  const fanDelays = [0.3, 0.4, 0.5]
  const convergeDelays = [0.9, 1.0, 1.1]

  return (
    <div ref={ref} className="mx-auto mt-6 max-w-[420px]">
      <svg
        key={replayKey}
        viewBox="0 0 380 160"
        aria-hidden="true"
        className="w-full text-muted-foreground"
      >
        <defs>
          <marker id="council-arrow-muted" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
          </marker>
          <marker id="council-arrow-brand" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--brand)" />
          </marker>
        </defs>

        {MODEL_Y.map((y, i) => (
          <path
            key={`in-${y}`}
            d={`M ${PROMPT.x + PROMPT.width} 80 Q 94 ${y} ${MODEL.x} ${y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            markerEnd="url(#council-arrow-muted)"
            className={cn(playing && "council-line-animate")}
            style={{ "--dash-length": 130, animationDelay: `${fanDelays[i]}s` } as CSSProperties}
          />
        ))}

        {MODEL_Y.map((y, i) => (
          <path
            key={`out-${y}`}
            d={`M ${MODEL.x + MODEL.width} ${y} Q 207 ${y} ${CHAIR.x} 80`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            markerEnd="url(#council-arrow-muted)"
            className={cn(playing && "council-line-animate")}
            style={{ "--dash-length": 130, animationDelay: `${convergeDelays[i]}s` } as CSSProperties}
          />
        ))}

        <path
          d={`M ${CHAIR.x + CHAIR.width} 80 L ${ANSWER.x} 80`}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.5"
          markerEnd="url(#council-arrow-brand)"
          className={cn(playing && "council-line-animate")}
          style={{ "--dash-length": 30, animationDelay: "1.5s" } as CSSProperties}
        />

        <g className={cn(playing && "council-node-animate")} style={{ animationDelay: "0s" } as CSSProperties}>
          <rect x={PROMPT.x} y="66" width={PROMPT.width} height="28" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={PROMPT.x + PROMPT.width / 2} y="84" textAnchor="middle" fontSize="11" fill="currentColor">
            Prompt
          </text>
        </g>

        {MODEL_Y.map((y, i) => (
          <g
            key={`model-${y}`}
            className={cn(playing && "council-node-animate")}
            style={{ animationDelay: "0.6s" } as CSSProperties}
          >
            <rect x={MODEL.x} y={y - 14} width={MODEL.width} height="28" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x={MODEL.x + MODEL.width / 2} y={y + 4} textAnchor="middle" fontSize="11" fill="currentColor">
              {MODEL_LABELS[i]}
            </text>
          </g>
        ))}

        <g className={cn(playing && "council-node-animate")} style={{ animationDelay: "1.2s" } as CSSProperties}>
          <rect x={CHAIR.x} y="66" width={CHAIR.width} height="28" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={CHAIR.x + CHAIR.width / 2} y="84" textAnchor="middle" fontSize="11" fill="currentColor">
            Chair
          </text>
        </g>

        <g className={cn(playing && "council-node-animate")} style={{ animationDelay: "1.8s" } as CSSProperties}>
          <rect
            x={ANSWER.x}
            y="66"
            width={ANSWER.width}
            height="28"
            rx="14"
            fill="var(--brand)"
            fillOpacity="0.12"
            stroke="var(--brand)"
            strokeWidth="1.5"
          />
          <text x={ANSWER.x + ANSWER.width / 2} y="84" textAnchor="middle" fontSize="11" fill="var(--brand)">
            Answer
          </text>
        </g>
      </svg>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{caption}</span>
        <button
          type="button"
          aria-label="Replay diagram animation"
          onClick={() => setReplayKey((key) => key + 1)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <RotateCcw size={12} strokeWidth={1.5} />
          Replay
        </button>
      </div>
    </div>
  )
}
