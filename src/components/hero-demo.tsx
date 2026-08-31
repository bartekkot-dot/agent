import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"

import { content } from "@/content"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

type Step = "typing" | "streaming" | "settled" | "chair" | "done"

const PROMPT = content.councilDemo.prompt
const MODELS = content.councilDemo.models
const SYNTHESIS = content.councilDemo.synthesis

// Timing budget for the ~3.5s canned sequence (see MOTION-SPEC.md §3a).
const TYPING_MS = 700
const STREAMING_MS = 1500
const SETTLED_MS = 300
const CHAIR_MS = 1000

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

function useTypedText(active: boolean, text: string, durationMs: number) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) {
      setCount(0)
      return
    }
    const perChar = durationMs / text.length
    let i = 0
    const id = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) clearInterval(id)
    }, perChar)
    return () => clearInterval(id)
  }, [active, text, durationMs])
  return text.slice(0, count)
}

function ChipCard({ model, live }: { model: (typeof MODELS)[number]; live: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "w-full rounded-lg border px-3 py-3 text-left",
        live ? "border-brand animate-pulse" : "border-brand"
      )}
    >
      <p className={cn("font-mono text-[11px]", "text-brand")}>{model.id}</p>
      <div className="mt-1.5 space-y-1">
        {model.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.3 }}
            className="text-[11px] leading-snug text-muted-foreground"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}

function ScriptedSequence({ playKey }: { playKey: number }) {
  const [step, setStep] = useState<Step>("typing")
  const typed = useTypedText(step === "typing", PROMPT, TYPING_MS)

  useEffect(() => {
    setStep("typing")
    const t1 = setTimeout(() => setStep("streaming"), TYPING_MS)
    const t2 = setTimeout(() => setStep("settled"), TYPING_MS + STREAMING_MS)
    const t3 = setTimeout(() => setStep("chair"), TYPING_MS + STREAMING_MS + SETTLED_MS)
    const t4 = setTimeout(() => setStep("done"), TYPING_MS + STREAMING_MS + SETTLED_MS + CHAIR_MS)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playKey])

  const chairInk = step === "done"

  return (
    <div className="flex min-h-[260px] w-full flex-col items-center justify-center gap-6">
      {step === "typing" && (
        <div className="rounded-full border border-border/60 px-4 py-2 text-sm text-foreground">
          {typed}
          <span className="ml-0.5 inline-block w-px animate-pulse bg-foreground align-middle" style={{ height: "1em" }} />
        </div>
      )}

      {(step === "streaming" || step === "settled") && (
        <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {MODELS.map((model) => (
            <ChipCard key={model.id} model={model} live={step === "streaming"} />
          ))}
        </div>
      )}

      {(step === "chair" || step === "done") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-lg border border-brand/50 bg-brand/[0.06] px-4 py-4 text-left"
        >
          <p className={cn("text-sm transition-colors duration-700", chairInk ? "text-foreground" : "text-brand")}>
            {SYNTHESIS.lines[0]}
          </p>
        </motion.div>
      )}
    </div>
  )
}

function StaticFinalFrame() {
  return (
    <div className="flex min-h-[260px] w-full flex-col items-center justify-center gap-6">
      <div className="rounded-full border border-border/60 px-4 py-2 text-sm text-foreground opacity-50">
        {PROMPT}
      </div>
      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 opacity-40 sm:grid-cols-4">
        {MODELS.map((model) => (
          <div key={model.id} className="rounded-lg border border-border/60 px-3 py-3 text-left">
            <p className="font-mono text-[11px] text-muted-foreground">{model.id}</p>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md rounded-lg border border-brand/50 bg-brand/[0.06] px-4 py-4 text-left">
        <p className="text-sm text-foreground">{SYNTHESIS.lines[0]}</p>
      </div>
    </div>
  )
}

export function HeroDemo() {
  const reducedMotion = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const [playKey, setPlayKey] = useState(0)
  const wasInView = useRef(false)

  useEffect(() => {
    if (inView && !wasInView.current) {
      setPlayKey((k) => k + 1)
    }
    wasInView.current = inView
  }, [inView])

  return (
    <div ref={ref} className="relative mt-4 w-full">
      {reducedMotion ? (
        <StaticFinalFrame />
      ) : (
        <>
          <ScriptedSequence key={playKey} playKey={playKey} />
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setPlayKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <RotateCcw size={12} strokeWidth={1.5} />
              {content.hero.replayLabel}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
