'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

type Video = {
  id: string
  url: string
  description: string
}

type VideoCarouselProps = {
  label?: string | null
  heading?: string | null
  videos: Video[]
}

export function VideoCarousel({ label, heading, videos }: VideoCarouselProps) {
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback((index: number) => {
    setActive(index)
    setIsPlaying(false)
  }, [])

  const prev = useCallback(() => {
    goTo(active === 0 ? videos.length - 1 : active - 1)
  }, [active, videos.length, goTo])

  const next = useCallback(() => {
    goTo(active === videos.length - 1 ? 0 : active + 1)
  }, [active, videos.length, goTo])

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  // Autoplay first video when section scrolls into view
  useEffect(() => {
    if (hasAutoPlayed || active !== 0) return
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play()
          setIsPlaying(true)
          setHasAutoPlayed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [hasAutoPlayed, active])

  // Scroll thumbnail strip to keep active visible
  useEffect(() => {
    if (!scrollRef.current) return
    const el = scrollRef.current.children[active] as HTMLElement | undefined
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [active])

  const current = videos[active]

  return (
    <section ref={sectionRef} className="bg-primary py-20 lg:py-28">
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
                <video
                  ref={videoRef}
                  src={current.url}
                  className="h-full w-full object-contain"
                  muted
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                {/* Play/pause overlay */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {!isPlaying && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent transition-transform hover:scale-110 sm:h-20 sm:w-20">
                      <Play className="h-7 w-7 fill-primary text-primary sm:h-8 sm:w-8" />
                    </div>
                  )}
                </button>
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

          {/* Description */}
          <p className="mt-4 text-center font-heading text-lg font-semibold text-surface sm:text-xl">
            {current.description}
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
                  const isActive = index === active

                  return (
                    <button
                      key={video.id}
                      onClick={() => goTo(index)}
                      className={`group relative flex-shrink-0 overflow-hidden rounded-sm transition-all ${
                        isActive
                          ? 'ring-2 ring-accent ring-offset-2 ring-offset-primary'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                      aria-label={`Odtwórz: ${video.description}`}
                    >
                      <div className="relative h-16 w-28 bg-surface/10 sm:h-20 sm:w-36">
                        <video
                          src={video.url}
                          className="h-full w-full object-cover"
                          muted
                          preload="metadata"
                        />
                        {!isActive && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="h-5 w-5 fill-white text-white" />
                          </div>
                        )}
                      </div>
                      <p className="mt-1 max-w-28 truncate text-left text-xs text-surface/70 sm:max-w-36">
                        {video.description}
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
