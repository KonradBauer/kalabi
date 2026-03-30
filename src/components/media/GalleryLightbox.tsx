'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

type GalleryImage = {
  url: string
  alt: string
  width: number
  height: number
  caption?: string | null
}

type GalleryLightboxProps = {
  images: GalleryImage[]
}

export function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = images.map((img) => ({
    src: img.url,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }))

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            className="group relative aspect-[4/3] overflow-hidden bg-primary cursor-pointer"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm text-surface">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.92)' },
        }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  )
}
