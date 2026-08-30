import type { DetectedOS } from "@/lib/os"

export type ReleaseAsset = {
  name: string
  browser_download_url: string
}

export type LatestRelease = {
  tag_name: string
  assets: ReleaseAsset[]
}

const INSTALLER_EXTENSIONS = [".dmg", ".msi", ".exe", ".appimage", ".deb"]

export function isInstallerAsset(name: string): boolean {
  const lower = name.toLowerCase()
  return INSTALLER_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

export async function fetchLatestRelease(owner: string, repo: string): Promise<LatestRelease | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`)
    if (!res.ok) return null

    const data = await res.json()
    if (!Array.isArray(data.assets) || typeof data.tag_name !== "string") return null

    const assets: ReleaseAsset[] = data.assets
      .filter((a: { name?: unknown }) => typeof a.name === "string" && isInstallerAsset(a.name))
      .map((a: { name: string; browser_download_url: string }) => ({
        name: a.name,
        browser_download_url: a.browser_download_url,
      }))

    return { tag_name: data.tag_name, assets }
  } catch {
    return null
  }
}

export function matchAssetForOS(assets: ReleaseAsset[], os: DetectedOS): ReleaseAsset | undefined {
  const byExt = (ext: string) => assets.find((a) => a.name.toLowerCase().endsWith(ext))

  switch (os) {
    case "mac":
      return byExt(".dmg")
    case "windows":
      return byExt(".msi") ?? byExt(".exe")
    case "linux":
      return byExt(".appimage")
    case "unknown":
      return undefined
  }
}
