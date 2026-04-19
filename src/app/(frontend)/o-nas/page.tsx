export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PayloadImage } from '@/components/media/PayloadImage'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { defaultAboutPage } from '@/lib/defaults'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'O nas - Kalabi Producent Mebli na Wymiar | Pajęczno',
  description:
    'Poznaj Kalabi – rodzinna firma produkująca meble na wymiar z Pajęczna. Pasja do drewna, indywidualne podejście i lata doświadczenia. Bezpłatna konsultacja.',
  keywords: [
    'kalabi meble o nas',
    'producent mebli Pajęczno',
    'firma meblarska Pajęczno',
    'stolarnia Pajęczno',
    'meble na wymiar firma',
    'o nas kalabi',
  ],
  alternates: { canonical: '/o-nas' },
  openGraph: {
    title: 'O nas – Kalabi Meble na Wymiar | Pajęczno',
    description: 'Poznaj naszą historię, pasję i podejście do tworzenia mebli na wymiar w Pajęcznie.',
  },
}

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const aboutPage = await payload.findGlobal({ slug: 'about-page', depth: 2 })

  const hero = aboutPage.hero || defaultAboutPage.hero
  const teamHeading = aboutPage.teamHeading || defaultAboutPage.teamHeading
  const teamDescription = aboutPage.teamDescription || defaultAboutPage.teamDescription
  const team =
    aboutPage.team && aboutPage.team.length > 0 ? aboutPage.team : defaultAboutPage.team

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Strona główna', url: '/' },
        { name: 'O nas', url: '/o-nas' },
      ])} />

      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center bg-primary">
        {hero.image && (
          <div className="absolute inset-0">
            <PayloadImage
              media={hero.image as Media}
              fill
              priority
              className="object-cover opacity-30"
            />
          </div>
        )}
        <Container className="relative z-10 py-20 text-center">
          <h1 className="font-heading text-4xl font-bold text-surface sm:text-5xl lg:text-6xl">
            {hero.heading || 'O nas'}
          </h1>
        </Container>
      </section>

      {/* Zespół */}
      <section className="bg-background py-20">
        <Container>
          <SectionHeading
            heading={teamHeading}
            description={teamDescription}
          />

          <div
            className={`grid gap-8 ${
              team.length === 1
                ? 'mx-auto max-w-lg'
                : team.length === 2
                  ? 'mx-auto max-w-4xl md:grid-cols-2'
                  : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {team.map((member, index) => (
              <ScrollReveal key={member.id || index} delay={index * 0.15}>
                <div className="group overflow-hidden border border-border bg-surface">
                  {member.image ? (
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <PayloadImage
                        media={member.image as Media}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-border/20">
                      <span className="font-heading text-6xl font-bold text-border">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
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
    </>
  )
}
