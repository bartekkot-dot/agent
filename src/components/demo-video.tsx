import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"

type DemoVideoProps = {
  src: string
  poster: string
  name: string
  cta: string
}

function withBase(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
}

export function DemoVideo({ src, poster, name, cta }: DemoVideoProps) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const resolvedSrc = withBase(src)
  const resolvedPoster = withBase(poster)

  useEffect(() => {
    if (!playing) return
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {
      video.muted = true
      video.play().catch(() => {})
    })
  }, [playing])

  return (
    <div className="relative mt-4 aspect-[16/10] w-full rounded-xl border border-border/40 bg-muted">
      {playing ? (
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={resolvedPoster}
          className="h-full w-full rounded-xl object-contain"
        >
          <source src={resolvedSrc} type="video/mp4" />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${name} demo`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <img
            src={resolvedPoster}
            alt=""
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
          />
          <span className="absolute inset-0 rounded-xl bg-black/10 transition-colors group-hover:bg-black/25" />
          <span className="relative flex size-12 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
            <Play size={20} fill="currentColor" strokeWidth={0} className="ml-0.5" />
          </span>
          <span className="relative rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {cta}
          </span>
        </button>
      )}
    </div>
  )
}
