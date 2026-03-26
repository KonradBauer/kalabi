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

  const [pageData, siteSettings] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'o-nas' } },
      limit: 1,
    }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  const page = pageData.docs[0]

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center bg-primary">
        {page?.hero?.image && (
          <div className="absolute inset-0">
            <PayloadImage
              media={page.hero.image as Media}
              fill
              priority
              className="object-cover opacity-30"
            />
          </div>
        )}
        <Container className="relative z-10 py-20 text-center">
          <h1 className="font-heading text-4xl font-bold text-surface sm:text-5xl lg:text-6xl">
            {page?.hero?.heading || 'O nas'}
          </h1>
          {page?.hero?.subheading && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-surface/70">
              {page.hero.subheading}
            </p>
          )}
        </Container>
      </section>

      {/* Content */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              {page?.content && (
                <div className="prose prose-lg mx-auto max-w-none text-muted">
                  {/* Rich text content rendered by Payload */}
                </div>
              )}

              {/* Company Info */}
              {siteSettings.companyInfo && (
                <div className="mt-16 grid gap-8 border-t border-border pt-16 md:grid-cols-2">
                  <div>
                    <SectionHeading
                      label="Kontakt"
                      heading="Nasze dane"
                      align="left"
                    />
                  </div>
                  <div className="space-y-4 text-muted">
                    {siteSettings.companyInfo.name && (
                      <p className="text-lg font-semibold text-primary">
                        {siteSettings.companyInfo.name}
                      </p>
                    )}
                    {siteSettings.companyInfo.address && (
                      <p className="whitespace-pre-line">{siteSettings.companyInfo.address}</p>
                    )}
                    {siteSettings.companyInfo.phone && (
                      <p>
                        Tel:{' '}
                        <a href={`tel:${siteSettings.companyInfo.phone}`} className="text-accent hover:text-secondary">
                          {siteSettings.companyInfo.phone}
                        </a>
                      </p>
                    )}
                    {siteSettings.companyInfo.email && (
                      <p>
                        Email:{' '}
                        <a href={`mailto:${siteSettings.companyInfo.email}`} className="text-accent hover:text-secondary">
                          {siteSettings.companyInfo.email}
                        </a>
                      </p>
                    )}
                    {siteSettings.companyInfo.nip && (
                      <p>NIP: {siteSettings.companyInfo.nip}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
