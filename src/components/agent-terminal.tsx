import { useEffect, useState } from "react"

import { content } from "@/content"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

// Replaces the old node-graph AgentDiagram. Calling tools in sequence (read a
// file, run a command, edit a file) isn't a fan-out (Council) or a loop
// between peer stages (Research) -- it's not a graph-shaped idea at all, so
// giving it one just reused the same visual language a third time. The real
// app already renders this exact thing as a small log of tool calls (wrench
// icon, tool name, status -- see ChatUI-local's AgentView.tsx renderPart());
// this reuses that language in miniature, framed with the same window chrome
// (rounded-xl border bg-card shadow) as every other app surface on the page,
// plus the traffic-light dots already established for the real screenshots
// (public/screenshots), so it reads as "watching the agent work" rather than
// another node map.
//
// Motion: rows resolve top-to-bottom once (no infinite fan/loop cycle like
// the other two diagrams -- a tool-call log finishing once and holding is
// the truthful shape here, not a repeating animation), gated the same
// lazy-start-on-scroll way as the other diagrams. prefers-reduced-motion
// skips straight to every row resolved.
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

const DOT_COLORS = ["#ff5f57", "#febc2e", "#28c840"]

function StatusGlyph({ status }: { status: "done" | "running" | "pending" }) {
  if (status === "done") {
    return <span className="text-[13px] leading-none text-emerald-500">✓</span>
  }
  if (status === "running") {
    return <span className="agent-terminal-blink text-[13px] leading-none text-muted-foreground">⋯</span>
  }
  return <span className="text-[13px] leading-none text-muted-foreground/0">·</span>
}

export function AgentTerminal() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const reducedMotion = useReducedMotion()
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (inView) setHasPlayed(true)
  }, [inView])

  const resolved = reducedMotion || hasPlayed
  const { steps, answer, captions } = content.agent.terminal

  return (
    <div ref={ref} className="w-full max-w-[460px]">
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-1.5 border-b border-border/60 px-3.5 py-2.5">
          {DOT_COLORS.map((color) => (
            <span key={color} className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
          ))}
        </div>
        <div className="flex flex-col gap-2.5 px-4 py-4 font-mono text-[12.5px]">
          {steps.map((step, i) => (
            <div
              key={step.tool}
              className={cn(
                "flex items-center gap-2.5 transition-opacity duration-300",
                !resolved && i > 0 && "agent-terminal-row",
                resolved && "opacity-100"
              )}
              style={!resolved ? { animationDelay: `${300 + i * 260}ms` } : undefined}
            >
              <span className="text-muted-foreground">&gt;</span>
              <span className="min-w-11 font-medium text-foreground">{step.tool}</span>
              <span className="flex-1 text-muted-foreground">{step.title}</span>
              <span className="w-3.5 text-center">
                <StatusGlyph status={resolved ? step.status : i === 0 ? "done" : "pending"} />
              </span>
            </div>
          ))}

          <div className="mt-1 flex items-center gap-2.5 border-t border-border/60 pt-3">
            <span
              className="flex size-4 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--payoff)" }}
            >
              <svg viewBox="0 0 16 16" width="9" height="9" aria-hidden="true">
                <path
                  d="M3 8l3.5 3.5L13 4.5"
                  fill="none"
                  stroke="var(--payoff-foreground)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-muted-foreground">{answer}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 hidden sm:grid grid-cols-3 gap-2 text-center text-[11px] text-muted-foreground">
        {captions.map((caption) => (
          <span key={caption}>{caption}</span>
        ))}
      </div>
    </div>
  )
}
