import Image from 'next/image'
import React from 'react'
import type { Media } from '@/payload-types'

type PayloadImageProps = {
  media: Media
  sizes?: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
}

export function PayloadImage({
  media,
  sizes = '100vw',
  className = '',
  priority = false,
  fill = false,
  width,
  height,
}: PayloadImageProps) {
  if (!media?.url) return null

  const imgProps = fill
    ? { fill: true as const }
    : {
        width: width || media.width || 800,
        height: height || media.height || 600,
      }

  return (
    <Image
      src={media.url}
      alt={media.alt || ''}
      sizes={sizes}
      priority={priority}
      className={className}
      {...imgProps}
    />
  )
}
