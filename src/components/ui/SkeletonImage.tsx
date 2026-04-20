'use client'

import Image from 'next/image'
import { useState } from 'react'

type SkeletonImageProps = {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
}

export function SkeletonImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className = '',
  priority = false,
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false)

  const imgProps = fill
    ? { fill: true as const }
    : { width: width || 800, height: height || 600 }

  return (
    <>
      {!loaded && (
        <span className="img-skeleton absolute inset-0" aria-hidden="true" />
      )}
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
        {...imgProps}
      />
    </>
  )
}
