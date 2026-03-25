import React from 'react'
import type { Testimonial } from '@/payload-types'

type TestimonialCardProps = {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col border border-border bg-surface p-8">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <span key={i} className="text-accent">&#9733;</span>
        ))}
      </div>
      <blockquote className="flex-1 text-base leading-relaxed text-primary/80">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>
      <div className="mt-6 border-t border-border pt-4">
        <p className="font-heading text-lg font-semibold text-primary">
          {testimonial.author}
        </p>
        {testimonial.role && (
          <p className="text-sm text-muted">{testimonial.role}</p>
        )}
      </div>
    </div>
  )
}
