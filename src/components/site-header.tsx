import { Container } from "@/components/container"
import { ThemeToggle } from "@/components/theme-toggle"
import { content } from "@/content"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <Container className="flex h-12 items-center justify-between">
        <a href="#top" className="text-[13px] font-medium tracking-tight text-foreground">
          {content.app.name}
        </a>
        <ThemeToggle />
      </Container>
    </header>
  )
}
