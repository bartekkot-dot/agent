const STEPS = [
  { label: "Plan", x: 8, width: 62 },
  { label: "Search", x: 96, width: 76 },
  { label: "Read", x: 198, width: 60 },
  { label: "Synthesize", x: 284, width: 92 },
]

export function DeepResearchDiagram({ caption }: { caption: string }) {
  return (
    <div className="mx-auto mt-6 max-w-[420px]">
      <svg viewBox="0 0 380 160" aria-hidden="true" className="w-full text-muted-foreground">
        <defs>
          <marker id="research-arrow-muted" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
          </marker>
          <marker id="research-arrow-brand" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--brand)" />
          </marker>
        </defs>

        {STEPS.slice(0, -1).map((step, i) => {
          const next = STEPS[i + 1]
          const isFinal = i === STEPS.length - 2
          const startX = step.x + step.width
          return (
            <line
              key={step.label}
              x1={startX}
              y1="80"
              x2={next.x - 4}
              y2="80"
              stroke={isFinal ? "var(--brand)" : "currentColor"}
              strokeWidth="1.5"
              markerEnd={isFinal ? "url(#research-arrow-brand)" : "url(#research-arrow-muted)"}
            />
          )
        })}

        {STEPS.map((step, i) => {
          const isFinal = i === STEPS.length - 1
          return (
            <g key={step.label}>
              <rect
                x={step.x}
                y="66"
                width={step.width}
                height="28"
                rx="14"
                fill={isFinal ? "var(--brand)" : "none"}
                fillOpacity={isFinal ? 0.12 : undefined}
                stroke={isFinal ? "var(--brand)" : "currentColor"}
                strokeWidth="1.5"
              />
              <text
                x={step.x + step.width / 2}
                y="84"
                textAnchor="middle"
                fontSize="11"
                fill={isFinal ? "var(--brand)" : "currentColor"}
              >
                {step.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{caption}</span>
      </div>
    </div>
  )
}
