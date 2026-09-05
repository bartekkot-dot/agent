import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"
import { cn } from "@/lib/utils"

// Typographic, not a card grid — these are parallel benefits, not a sequence
// or a comparable set of discrete units, so no numbering and no card border
// (see privacy-section.tsx for the sibling treatment of the same idea). The
// list itself runs two columns wide on larger screens (still just dividers,
// not cards) so it uses the section's full width instead of leaving it empty.
export function ValueSection() {
  return (
    <section id="value" className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-24">
      <div aria-hidden="true" className="ledger-grid pointer-events-none absolute inset-0" />

      <Reveal>
        <Container className="relative">
          {/* Container's own max-w-[1100px] must stay intact so this section's
              left edge matches every other section's -- the text measure is
              narrowed on the intro only (inner wrapper), not on Container
              itself (that previously replaced max-w-[1100px] via
              tailwind-merge, re-centering the whole block and breaking the
              shared spine). */}
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {content.value.heading}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-subhead">{content.value.lead}</p>
          </div>

          {/* The point list spans the FULL container width in two columns,
              unlike the intro above -- a single narrow column of four short
              items left the right ~40% of the section as empty grid. Two
              columns uses that width for real content (each item stays a
              comfortable reading measure) rather than stretching one column
              wide or adding a decorative visual that wouldn't carry
              information. Per-item top border instead of divide-y, since
              divide-y's border only makes sense between vertically stacked
              siblings -- in a 2-column grid the "next" DOM sibling can be the
              item beside it, not below it. */}
          <dl className="mt-10 grid grid-cols-1 gap-x-12 border-t border-border sm:grid-cols-2">
            {content.value.points.map((point, i) => (
              <div
                key={point.title}
                className={cn(
                  "border-border py-5",
                  // Mobile: every item but the first needs its own top
                  // border (they stack, like the old divide-y). Desktop:
                  // item 1 sits beside item 0 in row one instead of below
                  // it, so its border is cancelled there; items 2+ start
                  // row two and keep theirs on both layouts.
                  i > 0 && "border-t",
                  i === 1 && "sm:border-t-0"
                )}
              >
                <dt className="text-base font-medium text-foreground">{point.title}</dt>
                <dd className="mt-1 text-sm text-body">{point.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
    </section>
  )
}
