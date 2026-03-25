import Image from 'next/image'
import React from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PayloadImage } from '@/components/media/PayloadImage'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Media } from '@/payload-types'

type CtaBannerProps = {
  heading?: string | null
  description?: string | null
  backgroundImage?: Media | null
  placeholderImage?: string
  ctaText?: string | null
  ctaLink?: string | null
}

export function CtaBanner({
  heading,
  description,
  backgroundImage,
  placeholderImage,
  ctaText,
  ctaLink,
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
      <div className="absolute inset-0">
        {backgroundImage ? (
          <PayloadImage
            media={backgroundImage}
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
        ) : placeholderImage ? (
          <Image
            src={placeholderImage}
            alt=""
            fill
            className="object-cover opacity-40"
          />
        ) : null}
      </div>
      <Container className="relative z-10 text-center">
        <ScrollReveal>
          {heading && (
            <h2 className="font-heading text-3xl font-bold text-surface sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-surface/70">
              {description}
            </p>
          )}
          {ctaText && ctaLink && (
            <div className="mt-10">
              <Button href={ctaLink} size="lg">
                {ctaText}
              </Button>
            </div>
          )}
        </ScrollReveal>
      </Container>
    </section>
  )
}
