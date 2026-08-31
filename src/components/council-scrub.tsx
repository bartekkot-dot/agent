import { useEffect, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion"

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

type Phase = "idle" | "active" | "settled" | "chair"

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
  const isLive = phase === "active"
  const isDone = phase === "settled" || phase === "chair"

  return (
    <motion.div
      style={{ x, y, opacity }}
      className={cn(
        "absolute rounded-lg border px-3 py-3 text-left transition-colors duration-300",
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
            className="text-[11px] leading-snug text-muted-foreground"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}

function phaseFor(p: number): Phase {
  if (p < 0.15) return "idle"
  if (p < 0.45) return "active"
  if (p < 0.7) return "settled"
  return "chair"
}

function captionIndexFor(p: number): 0 | 1 | 2 {
  if (p < 0.15) return 0
  if (p < 0.71) return 1
  return 2
}

function AnimatedScrub() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })
  const isMobile = useIsMobile()
  const laneXTarget = isMobile ? MOBILE_LANE_X : DESKTOP_LANE_X
  const laneYTarget = isMobile ? MOBILE_LANE_Y : DESKTOP_LANE_Y
  const [phase, setPhase] = useState<Phase>(() => phaseFor(scrollYProgress.get()))
  const [chairInk, setChairInk] = useState(() => scrollYProgress.get() > 0.95)
  const [captionIndex, setCaptionIndex] = useState(() => captionIndexFor(scrollYProgress.get()))

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setPhase(phaseFor(p))
    setChairInk(p > 0.95)
    setCaptionIndex(captionIndexFor(p))
  })

  // Prompt lives in its own slot and is fully gone before the lane/chair stage
  // below it ever becomes visible — no shared vertical space, no text overlap.
  const promptOpacity = useTransform(scrollYProgress, [0, 0.1, 0.16], [1, 1, 0])

  // Fully faded/converged by 0.7 (the active/settled -> chair phase boundary), so the
  // conditional unmount at that boundary never clips a still-visible element.
  const laneOpacity = useTransform(scrollYProgress, [0.14, 0.22, 0.6, 0.7], [0, 1, 1, 0])
  const lane0X = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.7], [0, laneXTarget[0], laneXTarget[0], 0])
  const lane1X = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.7], [0, laneXTarget[1], laneXTarget[1], 0])
  const lane2X = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.7], [0, laneXTarget[2], laneXTarget[2], 0])
  const lane3X = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.7], [0, laneXTarget[3], laneXTarget[3], 0])
  const laneX = [lane0X, lane1X, lane2X, lane3X]

  const lane0Y = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.7], [0, laneYTarget[0], laneYTarget[0], 0])
  const lane1Y = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.7], [0, laneYTarget[1], laneYTarget[1], 0])
  const lane2Y = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.7], [0, laneYTarget[2], laneYTarget[2], 0])
  const lane3Y = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.7], [0, laneYTarget[3], laneYTarget[3], 0])
  const laneY = [lane0Y, lane1Y, lane2Y, lane3Y]

  const line1Opacity = useTransform(scrollYProgress, [0.17, 0.23], [0, 1])
  const line2Opacity = useTransform(scrollYProgress, [0.23, 0.29], [0, 1])
  const line3Opacity = useTransform(scrollYProgress, [0.29, 0.35], [0, 1])
  const lineOpacities = [line1Opacity, line2Opacity, line3Opacity]

  const chairOpacity = useTransform(scrollYProgress, [0.72, 0.86], [0, 1])
  const chairScale = useTransform(scrollYProgress, [0.72, 0.86], [0.92, 1])

  return (
    <div ref={wrapperRef} data-council-wrapper className="relative" style={{ height: "175vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="relative flex h-[80px] w-full items-center justify-center px-6">
          {phase === "idle" && (
            <motion.div
              style={{ opacity: promptOpacity }}
              className="absolute max-w-[90vw] rounded-2xl border border-border/60 px-4 py-2 text-center text-sm text-foreground sm:max-w-none sm:rounded-full"
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
          {(phase === "active" || phase === "settled") &&
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

          {phase === "chair" && (
            <motion.div
              style={{ opacity: chairOpacity, scale: chairScale }}
              className="absolute w-[85vw] max-w-[300px] rounded-lg border border-brand/50 bg-brand/[0.06] px-4 py-4 text-left"
            >
              <p className={cn("text-sm", chairInk ? "text-foreground" : "text-brand")}>
                {content.councilDemo.synthesis.lines[0]}
              </p>
            </motion.div>
          )}
        </div>

        <div className="relative mt-10 h-5 text-sm text-muted-foreground">
          <p className="absolute inset-x-0">{content.council.captions[captionIndex]}</p>
        </div>
      </div>
    </div>
  )
}

function StaticEndState() {
  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <div className="rounded-full border border-border/60 px-4 py-2 text-sm text-foreground">
        {content.councilDemo.prompt}
      </div>
      <div className="relative flex w-full max-w-2xl items-center justify-center">
        <div className="grid grid-cols-2 gap-3 opacity-40 sm:grid-cols-4">
          {content.councilDemo.models.map((model) => (
            <div key={model.id} className="w-[160px] rounded-lg border border-border/60 px-3 py-3 text-left">
              <p className="font-mono text-[10px] text-muted-foreground">{model.id}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-sm rounded-lg border border-brand/50 bg-brand/[0.06] px-4 py-4 text-left">
        <p className="text-sm text-foreground">{content.councilDemo.synthesis.lines[0]}</p>
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
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
