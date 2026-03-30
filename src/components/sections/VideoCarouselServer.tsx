import { VideoCarousel } from './VideoCarousel'
import type { Video as VideoType } from '@/payload-types'

type VideoCarouselServerProps = {
  label?: string | null
  heading?: string | null
  videos: VideoType[]
}

export function VideoCarouselServer({ label, heading, videos }: VideoCarouselServerProps) {
  if (!videos || videos.length === 0) return null

  const parsed = videos
    .filter((v) => v.url)
    .map((v) => ({
      id: v.id,
      url: v.url!,
      description: v.description,
    }))

  if (parsed.length === 0) return null

  return <VideoCarousel label={label} heading={heading} videos={parsed} />
}
