import { Container } from "@/components/container"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { APP_NAME, content } from "@/content"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <Container className="flex h-12 items-center justify-between">
        <a href="#top" className="text-[13px] font-medium tracking-tight text-foreground">
          {APP_NAME}
        </a>
        <nav className="hidden items-center gap-6 sm:flex">
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-full bg-brand px-4 text-brand-foreground hover:bg-brand/90 sm:inline-flex">
            <a href={content.nav.cta.href}>{content.nav.cta.label}</a>
          </Button>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  )
}
