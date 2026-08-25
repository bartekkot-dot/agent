import { Container } from "@/components/container"
import { content } from "@/content"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-6">
      <Container className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <p>{content.app.name}</p>
        <a href={content.links.source} className="hover:text-foreground" target="_blank" rel="noreferrer">
          View source on GitHub
        </a>
      </Container>
    </footer>
  )
}
