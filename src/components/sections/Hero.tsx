import React from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { HeroAnimation } from './HeroAnimation'
import { HeroSlideshow } from './HeroSlideshow'

type HeroProps = {
  heading?: string | null
  subheading?: string | null
  images?: string[]
  ctaText?: string | null
  ctaLink?: string | null
  secondaryCtaText?: string | null
  secondaryCtaLink?: string | null
}

export function Hero({
  heading,
  subheading,
  images = [],
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroProps) {
  return (
    <section className="relative -mt-[108px] flex min-h-screen items-center overflow-hidden bg-primary">
      {/* Background slideshow */}
      {images.length > 0 && <HeroSlideshow images={images} />}

      <Container className="relative z-10 py-20">
        <HeroAnimation>
          <div className="max-w-3xl">
            {heading && (
              <h1 className="font-heading text-4xl font-bold leading-tight text-surface sm:text-5xl md:text-6xl lg:text-7xl">
                {heading}
              </h1>
            )}
            {subheading && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-surface/70 sm:text-xl">
                {subheading}
              </p>
            )}
            <div className="mt-10 flex flex-wrap gap-4">
              {ctaText && ctaLink && (
                <Button href={ctaLink} size="lg">
                  {ctaText}
                </Button>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <Button href={secondaryCtaLink} variant="outline" size="lg" className="border-surface/30 text-surface hover:text-primary">
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </div>
        </HeroAnimation>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
        <span
          className="font-heading text-[10px] font-medium uppercase tracking-[0.3em] text-surface/50"
          style={{ animation: 'scroll-fade 2.4s ease-in-out infinite' }}
        >
          Przewiń
        </span>
        <div className="relative h-12 w-px bg-surface/10">
          <div
            className="absolute inset-0 bg-accent"
            style={{ animation: 'scroll-line 2.4s ease-in-out infinite' }}
          />
        </div>
        <div
          className="h-1.5 w-1.5 rounded-full bg-accent/60"
          style={{ animation: 'scroll-fade 2.4s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}
