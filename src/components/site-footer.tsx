import { Container } from "@/components/container"
import { content } from "@/content"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-6">
      <Container className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <p>{content.footer.tagline}</p>
        <nav className="flex items-center gap-4">
          <a href={content.links.source} className="hover:text-foreground" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="#privacy" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#council" className="hover:text-foreground">
            How it works
          </a>
        </nav>
        <p>{content.footer.copyright}</p>
      </Container>
    </footer>
  )
}
