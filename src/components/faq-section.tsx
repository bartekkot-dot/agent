import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { content } from "@/content"

export function FaqSection() {
  return (
    <section
      id="faq"
      className="section-divider-mark relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-24"
    >
      <div aria-hidden="true" className="ledger-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-foreground/[0.02] dark:bg-foreground/[0.035]"
      />

      <Reveal>
        <Container className="relative max-w-xl text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">FAQ</p>
          <h2 className="mt-2 text-2xl font-medium tracking-tight text-foreground">
            Frequently asked questions
          </h2>
        </Container>

        <Container className="relative max-w-2xl">
          <Accordion type="single" collapsible className="mt-10">
            {content.faq.map((item, index) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>
                  <span className="mr-2 font-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Reveal>
    </section>
  )
}
