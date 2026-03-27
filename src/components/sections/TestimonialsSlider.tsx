'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import type { Testimonial } from '@/payload-types'

type TestimonialsSliderProps = {
  label?: string | null
  heading?: string | null
  description?: string | null
  testimonials: Testimonial[]
}

export function TestimonialsSlider({
  label,
  heading,
  description,
  testimonials,
}: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (testimonials.length === 0) return null

  const visibleCount = 3
  const totalPages = Math.ceil(testimonials.length / visibleCount)

  const goToPage = (page: number) => {
    setCurrentIndex(page)
  }

  const currentTestimonials = testimonials.slice(
    currentIndex * visibleCount,
    currentIndex * visibleCount + visibleCount,
  )

  return (
    <section className="overflow-hidden bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeading label={label} heading={heading} description={description} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-8 bg-accent'
                    : 'w-2.5 bg-border hover:bg-muted'
                }`}
                aria-label={`Strona ${i + 1}`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
