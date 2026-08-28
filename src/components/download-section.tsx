import { useMemo } from "react"

import { Container } from "@/components/container"
import { GlowBackground } from "@/components/glow-background"
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
    <section
      id="download"
      className="relative scroll-mt-12 overflow-hidden border-t border-border/40 py-20"
    >
      <GlowBackground intensity={0.45} animate={false} />

      <Container className="relative flex flex-col items-center text-center">
        <h2 className="text-2xl font-medium tracking-tight text-foreground">Download</h2>

        {state.status === "loading" && (
          <p className="mt-6 text-muted-foreground">Checking for the latest release…</p>
        )}

        {showFallback && (
          <Button asChild className="mt-6 rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand/90">
            <a href={content.links.releases} target="_blank" rel="noreferrer">
              Download
            </a>
          </Button>
        )}

        {state.status === "ready" && matchedAsset && (
          <>
            <Button asChild className="mt-6 rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand/90">
              <a href={matchedAsset.browser_download_url}>
                {`Download for ${osLabels[os]} (${state.release.tag_name})`}
              </a>
            </Button>

            {otherAssets.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
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
      </Container>
    </section>
  )
}
