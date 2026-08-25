import { useEffect, useState } from "react"

import { content } from "@/content"
import { fetchLatestRelease, type LatestRelease } from "@/lib/github-releases"

type ReleaseState =
  | { status: "loading" }
  | { status: "ready"; release: LatestRelease }
  | { status: "unavailable" }

export function useLatestRelease(): ReleaseState {
  const [state, setState] = useState<ReleaseState>({ status: "loading" })

  useEffect(() => {
    let cancelled = false

    fetchLatestRelease(content.github.owner, content.github.repo).then((release) => {
      if (cancelled) return
      setState(
        release && release.assets.length > 0 ? { status: "ready", release } : { status: "unavailable" }
      )
    })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
