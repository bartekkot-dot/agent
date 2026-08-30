import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type GlowBackgroundProps = {
  /** 1 = full hero-strength glow; fractions render a fainter echo. */
  intensity?: number
  /** Slow drift + breathing pulse, disabled entirely under prefers-reduced-motion regardless. */
  animate?: boolean
  /** Freezes the drift/breathing animation (e.g. while scrolled off-screen) without unmounting it. */
  paused?: boolean
}

export function GlowBackground({ intensity = 1, animate = true, paused = false }: GlowBackgroundProps) {
  const gridStyle = { "--glow-intensity": intensity } as CSSProperties
  const orbStyle = {
    "--glow-intensity": intensity,
    animationPlayState: paused ? "paused" : "running",
  } as CSSProperties

  return (
    <>
      <div aria-hidden="true" className="glow-dot-grid pointer-events-none absolute inset-0" style={gridStyle} />
      <div
        aria-hidden="true"
        className={cn(
          "glow-orb pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand",
          animate && "glow-orb-animate"
        )}
        style={orbStyle}
      />
    </>
  )
}
