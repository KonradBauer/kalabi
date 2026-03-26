'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type HeroSlideshowProps = {
  images: string[]
  interval?: number
}

export function HeroSlideshow({ images, interval = 6000 }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval, images.length])

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: 6, ease: 'linear' },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt=""
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
    </div>
  )
}
