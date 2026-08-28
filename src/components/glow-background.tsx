import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type GlowBackgroundProps = {
  /** 1 = full hero-strength glow; fractions render a fainter echo. */
  intensity?: number
  /** Slow pulse, disabled entirely under prefers-reduced-motion regardless. */
  animate?: boolean
}

export function GlowBackground({ intensity = 1, animate = true }: GlowBackgroundProps) {
  const style = { "--glow-intensity": intensity } as CSSProperties

  return (
    <>
      <div aria-hidden="true" className="glow-dot-grid pointer-events-none absolute inset-0" style={style} />
      <div
        aria-hidden="true"
        className={cn(
          "glow-orb pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand",
          animate && "glow-orb-animate"
        )}
        style={style}
      />
    </>
  )
}
