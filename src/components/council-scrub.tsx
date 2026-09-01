import { useEffect, useRef, useState } from "react"
import {
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"

import { GlowBackground } from "@/components/glow-background"
import { content } from "@/content"
import { cn } from "@/lib/utils"

// Desktop: four lanes spread horizontally. Below 640px there isn't room for that (four
// 210px-wide cards spread to ±330px overflows a 380px viewport) — fall back to a single
// vertical stack instead of a 2x2 grid, since card height varies with each model's line
// count and a grid's fixed row height either clips or overlaps depending on content.
const DESKTOP_LANE_X = [-330, -110, 110, 330]
const DESKTOP_LANE_Y = [0, 0, 0, 0]
const MOBILE_LANE_X = [0, 0, 0, 0]
// Gap between adjacent centers (140px) comfortably clears the tallest card (~132px,
// the 3-line models) plus margin — measured via actual getBoundingClientRect, not guessed.
const MOBILE_LANE_Y = [-210, -70, 70, 210]

type Phase = "idle" | "fanning" | "streaming" | "settled" | "chair"

const EASE = easeInOut

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches
  )
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)")
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return isMobile
}

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

function LaneCard({
  model,
  x,
  y,
  opacity,
  phase,
  lineOpacities,
  isMobile,
}: {
  model: (typeof content.councilDemo.models)[number]
  x: MotionValue<number>
  y: MotionValue<number>
  opacity: MotionValue<number>
  phase: Phase
  lineOpacities: MotionValue<number>[]
  isMobile: boolean
}) {
  const isLive = phase === "streaming"
  const isDone = phase === "settled" || phase === "chair"

  return (
    <motion.div
      style={{ x, y, opacity }}
      className={cn(
        "absolute rounded-lg border bg-background/75 px-3 py-3 text-left backdrop-blur-sm transition-colors duration-300",
        isMobile ? "w-[85vw] max-w-[280px]" : "w-[210px]",
        isLive && "border-brand animate-pulse",
        isDone && "border-brand",
        !isLive && !isDone && "border-border/60"
      )}
    >
      <p className={cn("font-mono text-[11px]", isLive || isDone ? "text-brand" : "text-muted-foreground")}>
        {model.id}
      </p>
      <div className="mt-1.5 space-y-1">
        {model.lines.map((line, i) => (
          <motion.p
            key={line}
            style={{ opacity: lineOpacities[i] }}
            className="text-[11px] leading-snug text-body"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}

// Re-timed per the fix spec: streaming (the actual "several models answering at once"
// moment) gets the widest window and is where scrubbing should feel like it's worth
// lingering — everything else is comparatively brief.
function phaseFor(p: number): Phase {
  if (p < 0.12) return "idle"
  if (p < 0.35) return "fanning"
  if (p < 0.65) return "streaming"
  if (p < 0.85) return "settled"
  return "chair"
}

function captionIndexFor(p: number): 0 | 1 | 2 {
  if (p < 0.12) return 0
  if (p < 0.85) return 1
  return 2
}

function AnimatedScrub() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })
  // Spring-smoothed so the scrub glides instead of tracking raw (jittery) scroll deltas
  // 1:1. Every transform below is driven off this `p`, never off scrollYProgress directly.
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 })

  const isMobile = useIsMobile()
  const laneXTarget = isMobile ? MOBILE_LANE_X : DESKTOP_LANE_X
  const laneYTarget = isMobile ? MOBILE_LANE_Y : DESKTOP_LANE_Y
  const [phase, setPhase] = useState<Phase>(() => phaseFor(p.get()))
  const [chairInk, setChairInk] = useState(() => p.get() > 0.97)
  const [captionIndex, setCaptionIndex] = useState(() => captionIndexFor(p.get()))

  useMotionValueEvent(p, "change", (value) => {
    setPhase(phaseFor(value))
    setChairInk(value > 0.97)
    setCaptionIndex(captionIndexFor(value))
  })

  // Prompt lives in its own slot, fully gone before the lane/chair stage below it ever
  // becomes visible — no shared vertical space, no text overlap.
  const promptOpacity = useTransform(p, [0, 0.08, 0.12], [1, 1, 0], { ease: EASE })

  // Lanes are ALWAYS mounted (never conditionally removed) once past idle — the fix spec
  // requires them to stay faintly visible behind the synthesis card at the end, not
  // disappear, and a real visual must be on screen at every scroll position including
  // during any mount/unmount boundary. Opacity dips to 0.2 (not 0) by the end; position
  // eases most of the way back toward center but doesn't fully overlap the chair card.
  const laneOpacity = useTransform(p, [0.06, 0.2, 0.85, 0.97], [0, 1, 1, 0.2], { ease: EASE })
  const lane0X = useTransform(p, [0.12, 0.35, 0.85, 1], [0, laneXTarget[0], laneXTarget[0], laneXTarget[0] * 0.25], { ease: EASE })
  const lane1X = useTransform(p, [0.12, 0.35, 0.85, 1], [0, laneXTarget[1], laneXTarget[1], laneXTarget[1] * 0.25], { ease: EASE })
  const lane2X = useTransform(p, [0.12, 0.35, 0.85, 1], [0, laneXTarget[2], laneXTarget[2], laneXTarget[2] * 0.25], { ease: EASE })
  const lane3X = useTransform(p, [0.12, 0.35, 0.85, 1], [0, laneXTarget[3], laneXTarget[3], laneXTarget[3] * 0.25], { ease: EASE })
  const laneX = [lane0X, lane1X, lane2X, lane3X]

  const lane0Y = useTransform(p, [0.12, 0.35, 0.85, 1], [0, laneYTarget[0], laneYTarget[0], laneYTarget[0] * 0.25], { ease: EASE })
  const lane1Y = useTransform(p, [0.12, 0.35, 0.85, 1], [0, laneYTarget[1], laneYTarget[1], laneYTarget[1] * 0.25], { ease: EASE })
  const lane2Y = useTransform(p, [0.12, 0.35, 0.85, 1], [0, laneYTarget[2], laneYTarget[2], laneYTarget[2] * 0.25], { ease: EASE })
  const lane3Y = useTransform(p, [0.12, 0.35, 0.85, 1], [0, laneYTarget[3], laneYTarget[3], laneYTarget[3] * 0.25], { ease: EASE })
  const laneY = [lane0Y, lane1Y, lane2Y, lane3Y]

  // Streaming window is 0.35-0.65 (0.30 wide, on a 3x-taller pin than before — a lot of
  // physical scroll distance per line now) so tokens reveal gradually, not in a snap.
  const line1Opacity = useTransform(p, [0.38, 0.47], [0, 1], { ease: EASE })
  const line2Opacity = useTransform(p, [0.47, 0.56], [0, 1], { ease: EASE })
  const line3Opacity = useTransform(p, [0.56, 0.65], [0, 1], { ease: EASE })
  const lineOpacities = [line1Opacity, line2Opacity, line3Opacity]

  // Also always mounted — opacity is 0 (invisible, not absent) until 0.85, then ramps to
  // fully opaque *well* before p reaches 1 (by 0.97) so there's a comfortable held plateau
  // at the true end rather than resolving exactly at the boundary.
  const chairOpacity = useTransform(p, [0.85, 0.97], [0, 1], { ease: EASE })
  const chairScale = useTransform(p, [0.85, 0.97], [0.92, 1], { ease: EASE })

  return (
    <div ref={wrapperRef} data-council-wrapper className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Pinned to the viewport-sized sticky box, not the 300vh scroll track — a glow
            centered on the track's own height would sit ~1.5 screens below the fold for
            nearly the whole scroll. Vivid on purpose (this is the page's loud moment) —
            contrast is handled by giving every text-bearing element its own near-solid
            backdrop (bg-background/75 + backdrop-blur) rather than by capping the glow,
            so intensity here is decoupled from legibility. */}
        <GlowBackground intensity={1.4} />

        <div className="relative flex h-[80px] w-full items-center justify-center px-6">
          {phase === "idle" && (
            <motion.div
              style={{ opacity: promptOpacity }}
              className="absolute max-w-[90vw] rounded-2xl border border-border/60 bg-background/75 px-4 py-2 text-center text-sm text-foreground backdrop-blur-sm sm:max-w-none sm:rounded-full"
            >
              {content.councilDemo.prompt}
            </motion.div>
          )}
        </div>

        <div
          className={cn(
            "relative mt-6 flex w-full items-center justify-center sm:mt-10",
            isMobile ? "h-[540px]" : "h-[220px]"
          )}
        >
          {phase !== "idle" &&
            content.councilDemo.models.map((model, i) => (
              <LaneCard
                key={model.id}
                model={model}
                x={laneX[i]}
                y={laneY[i]}
                opacity={laneOpacity}
                phase={phase}
                lineOpacities={lineOpacities}
                isMobile={isMobile}
              />
            ))}

          {phase !== "idle" && (
            <motion.div
              style={{ opacity: chairOpacity, scale: chairScale }}
              className="absolute w-[85vw] max-w-[360px] rounded-lg border border-brand/50 bg-background/80 px-4 py-4 text-left backdrop-blur-sm"
            >
              <div className={cn("space-y-1 text-sm", chairInk ? "text-foreground" : "text-brand")}>
                {content.councilDemo.synthesis.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative mt-10 h-5 w-full text-center text-sm text-muted-foreground">
          <p className="absolute inset-x-0">{content.council.captions[captionIndex]}</p>
        </div>
      </div>
    </div>
  )
}

function StaticEndState() {
  return (
    <div className="relative flex flex-col items-center gap-8 overflow-hidden py-10">
      <GlowBackground intensity={1.4} animate={false} />
      <div className="relative rounded-full border border-border/60 bg-background/75 px-4 py-2 text-sm text-foreground backdrop-blur-sm">
        {content.councilDemo.prompt}
      </div>
      <div className="relative flex w-full max-w-2xl items-center justify-center">
        <div className="grid grid-cols-2 gap-3 opacity-30 sm:grid-cols-4">
          {content.councilDemo.models.map((model) => (
            <div key={model.id} className="w-[160px] rounded-lg border border-border/60 bg-background/75 px-3 py-3 text-left backdrop-blur-sm">
              <p className="font-mono text-[10px] text-muted-foreground">{model.id}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full max-w-md space-y-1 rounded-lg border border-brand/50 bg-background/80 px-4 py-4 text-left text-sm text-foreground backdrop-blur-sm">
        {content.councilDemo.synthesis.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <ul className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
        {content.council.captions.map((caption) => (
          <li key={caption}>{caption}</li>
        ))}
      </ul>
    </div>
  )
}

export function CouncilScrub() {
  const reducedMotion = useReducedMotion()
  return reducedMotion ? <StaticEndState /> : <AnimatedScrub />
}
