export function parseVideoUrl(url: string): { embedUrl: string; thumbUrl: string } {
  // YouTube
  let match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  if (match) {
    return {
      embedUrl: `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=1&rel=0`,
      thumbUrl: `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`,
    }
  }

  // Vimeo
  match = url.match(/vimeo\.com\/(\d+)/)
  if (match) {
    return {
      embedUrl: `https://player.vimeo.com/video/${match[1]}?autoplay=1&muted=1&loop=1`,
      thumbUrl: '',
    }
  }

  return { embedUrl: url, thumbUrl: '' }
}
