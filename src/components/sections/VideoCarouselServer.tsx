import { VideoCarousel } from './VideoCarousel'
import type { Video as VideoType, Media } from '@/payload-types'

type VideoCarouselServerProps = {
  label?: string | null
  heading?: string | null
  videos: VideoType[]
}

export function VideoCarouselServer({ label, heading, videos }: VideoCarouselServerProps) {
  if (!videos || videos.length === 0) return null

  const parsed = videos
    .filter((v) => v.url)
    .map((v) => {
      const thumb = v.thumbnail as Media | undefined
      return {
        id: v.id,
        url: v.url!,
        description: v.description,
        thumbnailUrl: thumb?.url || null,
      }
    })

  if (parsed.length === 0) return null

  return <VideoCarousel label={label} heading={heading} videos={parsed} />
}
