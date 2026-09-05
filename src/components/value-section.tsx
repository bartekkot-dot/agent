import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// Typographic, not a card grid — these are parallel benefits, not a sequence
// or a comparable set of discrete units, so no numbering and no card border
// (see privacy-section.tsx for the sibling treatment of the same idea, which
// shares this exact point-grid + left-border-accent markup). The list itself
// runs two columns wide on larger screens so it uses the section's full width
// instead of leaving it empty. Each item gets an identical 1px left-border
// accent (foreground/15, not a new color) instead of a per-item icon — one
// consistent marker that signals "distinct point" without illustrating.
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
            <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:tracking-tighter">
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
              information. gap-y (not border-t) separates rows now that each
              item carries its own left-border accent -- a top border and a
              left border meeting at a corner would start to read as a card
              outline, which this deliberately isn't. */}
          <dl className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 border-t border-border pt-6 sm:grid-cols-2">
            {content.value.points.map((point) => (
              <div key={point.title} className="border-l border-foreground/15 pl-5">
                <dt className="text-base font-semibold tracking-tight text-foreground">{point.title}</dt>
                <dd className="mt-1.5 text-sm text-body">{point.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
    </section>
  )
}
