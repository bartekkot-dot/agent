import { AgentTerminal } from "@/components/agent-terminal"
import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

// Third feature showcase, after Council and Research — same two-column shape
// (text left, visual right) as those two, left-aligned, no card. Visual is a
// terminal/log panel (see agent-terminal.tsx), not the node-graph diagram
// family Council and Research use -- calling tools in sequence isn't a
// fan-out or a loop, so it earns its own visual language instead of reusing
// theirs a third time.
export function AgentSection() {
  return (
    <section id={content.agent.id} className="scroll-mt-12 border-t border-border/40 py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:items-center sm:gap-16">
            <div>
              <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl sm:tracking-tighter">
                {content.agent.headline.map((segment) => (
                  <span
                    key={segment.text}
                    className={segment.tone === "ink" ? "text-foreground" : "text-subhead"}
                  >
                    {segment.text}
                  </span>
                ))}
              </h2>
              <p className="mt-5 text-lg text-subhead">{content.agent.sub}</p>
            </div>

            <AgentTerminal />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
