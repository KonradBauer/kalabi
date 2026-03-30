'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Media } from '@/payload-types'

type Video = {
  id?: string | null
  title: string
  url: string
  thumbnail?: Media | string | null
  embedUrl: string
  thumbUrl: string
}

type VideoCarouselProps = {
  label?: string | null
  heading?: string | null
  videos: Video[]
}

export function VideoCarousel({ label, heading, videos }: VideoCarouselProps) {
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (index: number) => {
      setActive(index)
      setIsPlaying(true)
    },
    [],
  )

  const prev = useCallback(() => {
    goTo(active === 0 ? videos.length - 1 : active - 1)
  }, [active, videos.length, goTo])

  const next = useCallback(() => {
    goTo(active === videos.length - 1 ? 0 : active + 1)
  }, [active, videos.length, goTo])

  // Scroll the thumbnail strip to keep active item visible
  useEffect(() => {
    if (!scrollRef.current) return
    const el = scrollRef.current.children[active] as HTMLElement | undefined
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [active])

  const current = videos[active]

  const getThumbnailUrl = (video: Video): string | null => {
    if (video.thumbnail && typeof video.thumbnail === 'object' && video.thumbnail.url) {
      return video.thumbnail.url
    }
    return video.thumbUrl || null
  }

  return (
    <section className="bg-primary py-20 lg:py-28">
      <Container>
        {(label || heading) && (
          <SectionHeading label={label} heading={heading} light />
        )}

        <div className="relative">
          {/* Main video player */}
          <div className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-sm bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {isPlaying ? (
                  <iframe
                    src={current.embedUrl}
                    title={current.title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative flex h-full w-full items-center justify-center"
                  >
                    {getThumbnailUrl(current) && (
                      <Image
                        src={getThumbnailUrl(current)!}
                        alt={current.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                      <Play className="h-7 w-7 fill-primary text-primary sm:h-8 sm:w-8" />
                    </div>
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Arrow navigation */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-accent hover:text-primary"
                  aria-label="Poprzedni film"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-accent hover:text-primary"
                  aria-label="Następny film"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Title of current video */}
          <p className="mt-4 text-center font-heading text-lg font-semibold text-surface sm:text-xl">
            {current.title}
          </p>

          {/* Thumbnail strip */}
          {videos.length > 1 && (
            <div className="mt-6">
              <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto pb-2 sm:justify-center"
                style={{ scrollbarWidth: 'none' }}
              >
                {videos.map((video, index) => {
                  const thumb = getThumbnailUrl(video)
                  const isActive = index === active

                  return (
                    <button
                      key={video.id || index}
                      onClick={() => goTo(index)}
                      className={`group relative flex-shrink-0 overflow-hidden rounded-sm transition-all ${
                        isActive
                          ? 'ring-2 ring-accent ring-offset-2 ring-offset-primary'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                      aria-label={`Odtwórz: ${video.title}`}
                    >
                      <div className="relative h-16 w-28 sm:h-20 sm:w-36">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={video.title}
                            fill
                            sizes="144px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-surface/10">
                            <Play className="h-5 w-5 text-surface/50" />
                          </div>
                        )}
                        {!isActive && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="h-5 w-5 fill-white text-white" />
                          </div>
                        )}
                      </div>
                      <p className="mt-1 max-w-28 truncate text-left text-xs text-surface/70 sm:max-w-36">
                        {video.title}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

