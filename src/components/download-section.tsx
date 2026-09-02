import { useMemo } from "react"

import { Container } from "@/components/container"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { content } from "@/content"
import { useLatestRelease } from "@/hooks/use-latest-release"
import { detectOS, osLabels } from "@/lib/os"
import { matchAssetForOS } from "@/lib/github-releases"

export function DownloadSection() {
  const state = useLatestRelease()
  const os = useMemo(detectOS, [])

  const matchedAsset = state.status === "ready" ? matchAssetForOS(state.release.assets, os) : undefined
  const otherAssets = state.status === "ready" ? state.release.assets.filter((a) => a !== matchedAsset) : []
  const showFallback = state.status === "unavailable" || (state.status === "ready" && !matchedAsset)

  return (
    <section id="download" className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20 sm:py-24">
      <Reveal>
        <Container className="max-w-2xl">
          <h2 className="font-heading max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.download.headline.map((segment) => (
              <span key={segment.text} className={segment.tone === "ink" ? "text-foreground" : "text-subhead"}>
                {segment.text}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-sm text-body">{content.download.sub}</p>

          <div className="mt-6 flex flex-col items-start gap-4">
            {state.status === "loading" && (
              <p className="text-sm text-muted-foreground">Checking for the latest release…</p>
            )}

            {showFallback && (
              <Button asChild className="rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand/90">
                <a href={content.links.releases} target="_blank" rel="noreferrer">
                  Download
                </a>
              </Button>
            )}

            {state.status === "ready" && matchedAsset && (
              <>
                <Button asChild className="rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand/90">
                  <a href={matchedAsset.browser_download_url}>
                    {`Download for ${osLabels[os]} · ${state.release.tag_name}`}
                  </a>
                </Button>

                {otherAssets.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>Other platforms:</span>
                    {otherAssets.map((asset) => (
                      <a
                        key={asset.name}
                        href={asset.browser_download_url}
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        {asset.name}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={content.links.allReleases}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
              >
                See all releases on GitHub
              </a>
              <a
                href={content.links.source}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
              >
                Build from source
              </a>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  )
}
