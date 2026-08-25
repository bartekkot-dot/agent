export type DetectedOS = "mac" | "windows" | "linux" | "unknown"

export function detectOS(): DetectedOS {
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
  const platform = (uaData?.platform ?? navigator.platform ?? navigator.userAgent).toLowerCase()

  if (platform.includes("mac")) return "mac"
  if (platform.includes("win")) return "windows"
  if (platform.includes("linux")) return "linux"
  return "unknown"
}

export const osLabels: Record<DetectedOS, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  unknown: "your platform",
}
