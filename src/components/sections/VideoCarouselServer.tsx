import { VideoCarousel } from './VideoCarousel'
import { parseVideoUrl } from '@/lib/video'
import type { Media } from '@/payload-types'

type RawVideo = {
  id?: string | null
  title: string
  url: string
  thumbnail?: Media | string | null
}

type VideoCarouselServerProps = {
  label?: string | null
  heading?: string | null
  videos?: RawVideo[] | null
}

export function VideoCarouselServer({ label, heading, videos }: VideoCarouselServerProps) {
  if (!videos || videos.length === 0) return null

  const parsed = videos.map((video) => {
    const { embedUrl, thumbUrl } = parseVideoUrl(video.url)
    return {
      ...video,
      embedUrl,
      thumbUrl,
    }
  })

  return <VideoCarousel label={label} heading={heading} videos={parsed} />
}
