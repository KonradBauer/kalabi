export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PayloadImage } from '@/components/media/PayloadImage'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O nas',
  description:
    'Poznaj Kalabi — producenta mebli na wymiar z Pajęczna. Pasja do drewna, indywidualne podejście i lata doświadczenia w tworzeniu mebli.',
  alternates: { canonical: '/o-nas' },
  openGraph: {
    title: 'O nas | Kalabi - Meble na wymiar',
    description: 'Poznaj naszą historię, pasję i podejście do tworzenia mebli na wymiar.',
  },
}

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const aboutPage = await payload.findGlobal({ slug: 'about-page' })

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center bg-primary">
        {aboutPage.hero?.image && (
          <div className="absolute inset-0">
            <PayloadImage
              media={aboutPage.hero.image as Media}
              fill
              priority
              className="object-cover opacity-30"
            />
          </div>
        )}
        <Container className="relative z-10 py-20 text-center">
          <h1 className="font-heading text-4xl font-bold text-surface sm:text-5xl lg:text-6xl">
            {aboutPage.hero?.heading || 'O nas'}
          </h1>
          {aboutPage.hero?.subheading && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-surface/70">
              {aboutPage.hero.subheading}
            </p>
          )}
        </Container>
      </section>

      {/* Intro - O firmie */}
      {(aboutPage.intro?.heading || aboutPage.intro?.description) && (
        <section className="py-20">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {aboutPage.intro.image && (
                <ScrollReveal direction="left">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <PayloadImage
                      media={aboutPage.intro.image as Media}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </ScrollReveal>
              )}
              <ScrollReveal direction="right">
                <div>
                  <SectionHeading
                    label={aboutPage.intro.label}
                    heading={aboutPage.intro.heading}
                    align="left"
                  />
                  {aboutPage.intro.description && (
                    <p className="whitespace-pre-line text-lg leading-relaxed text-muted">
                      {aboutPage.intro.description}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      )}

      {/* Zespół */}
      {aboutPage.team && aboutPage.team.length > 0 && (
        <section className="bg-background py-20">
          <Container>
            <SectionHeading
              label={aboutPage.teamLabel}
              heading={aboutPage.teamHeading}
              description={aboutPage.teamDescription}
            />

            <div
              className={`grid gap-8 ${
                aboutPage.team.length === 1
                  ? 'mx-auto max-w-lg'
                  : aboutPage.team.length === 2
                    ? 'mx-auto max-w-4xl md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {aboutPage.team.map((member, index) => (
                <ScrollReveal key={member.id || index} delay={index * 0.15}>
                  <div className="group overflow-hidden border border-border bg-surface">
                    {member.image && (
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <PayloadImage
                          media={member.image as Media}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      <h3 className="font-heading text-xl font-bold text-primary sm:text-2xl">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium uppercase tracking-wider text-accent">
                        {member.role}
                      </p>
                      <p className="mt-4 whitespace-pre-line leading-relaxed text-muted">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
