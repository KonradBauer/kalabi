import Image from 'next/image'
import React from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PayloadImage } from '@/components/media/PayloadImage'
import { HeroAnimation } from './HeroAnimation'
import type { Media } from '@/payload-types'

type HeroProps = {
  heading?: string | null
  subheading?: string | null
  backgroundImage?: Media | null
  placeholderImage?: string
  ctaText?: string | null
  ctaLink?: string | null
  secondaryCtaText?: string | null
  secondaryCtaLink?: string | null
}

export function Hero({
  heading,
  subheading,
  backgroundImage,
  placeholderImage,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary">
      {/* Background image */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <PayloadImage
            media={backgroundImage}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        ) : placeholderImage ? (
          <Image
            src={placeholderImage}
            alt=""
            fill
            priority
            className="object-cover opacity-60"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
      </div>

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
                <Button href={secondaryCtaLink} variant="outline" size="lg" className="border-surface/30 text-surface hover:bg-surface hover:text-primary">
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </div>
        </HeroAnimation>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <div className="h-14 w-8 rounded-full border-2 border-surface/30 p-1">
          <div className="mx-auto h-3 w-1 animate-bounce rounded-full bg-accent" />
        </div>
      </div>
    </section>
  )
}
