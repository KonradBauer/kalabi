import Image from 'next/image'
import React from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PayloadImage } from '@/components/media/PayloadImage'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CountUp } from './CountUp'
import type { Media } from '@/payload-types'

type AboutPreviewProps = {
  label?: string | null
  heading?: string | null
  description?: string | null
  image?: Media | null
  placeholderImage?: string
  stats?: { number: string; label: string }[] | null
  ctaText?: string | null
  ctaLink?: string | null
}

export function AboutPreview({
  label,
  heading,
  description,
  image,
  placeholderImage,
  stats,
  ctaText,
  ctaLink,
}: AboutPreviewProps) {
  return (
    <section className="overflow-hidden bg-background py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden bg-primary/5">
              {image ? (
                <PayloadImage
                  media={image}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : placeholderImage ? (
                <Image
                  src={placeholderImage}
                  alt="O nas"
                  fill
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/5" />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <SectionHeading label={label} heading={heading} description={description} align="left" />

              {/* Stats */}
              {stats && stats.length > 0 && (
                <div className="mb-8 grid grid-cols-2 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="border-l-2 border-accent pl-4">
                      <CountUp value={stat.number} />
                      <p className="text-sm text-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {ctaText && ctaLink && (
                <Button href={ctaLink} variant="secondary">
                  {ctaText}
                </Button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
