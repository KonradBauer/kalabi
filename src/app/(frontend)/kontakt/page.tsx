export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ContactForm } from '@/components/sections/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Skontaktuj się z Kalabi. Bezpłatna wycena mebli na wymiar. Pajęczno i okolice. Zadzwoń: 661 244 385 lub napisz do nas.',
  alternates: { canonical: '/kontakt' },
  openGraph: {
    title: 'Kontakt | Kalabi - Meble na wymiar',
    description: 'Bezpłatna wycena mebli na wymiar. Zadzwoń lub napisz - odpowiemy w 24h.',
  },
}

export default async function KontaktPage() {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const company = siteSettings.companyInfo

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-20">
        <Container className="text-center">
          <h1 className="font-heading text-4xl font-bold text-surface sm:text-5xl lg:text-6xl">
            Kontakt
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-surface/70">
            Chętnie porozmawiamy o Twoim projekcie. Skontaktuj się z nami.
          </p>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Info */}
            <ScrollReveal>
              <div>
                <SectionHeading
                  label="Informacje"
                  heading="Dane kontaktowe"
                  align="left"
                />

                <div className="mt-8 space-y-6">
                  {company?.address && (
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-accent">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">Adres</h3>
                        <p className="mt-1 whitespace-pre-line text-muted">{company.address}</p>
                      </div>
                    </div>
                  )}

                  {company?.phone && (
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-accent">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">Telefon</h3>
                        <a href={`tel:${company.phone}`} className="mt-1 block text-muted hover:text-accent">
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {company?.email && (
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-accent">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">Email</h3>
                        <a href={`mailto:${company.email}`} className="mt-1 block text-muted hover:text-accent">
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Google Maps */}
                {company?.address && (
                  <div className="mt-10">
                    <div className="aspect-video overflow-hidden border border-border">
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Lokalizacja firmy"
                      />
                    </div>
                    {company.googleMapsUrl && (
                      <a
                        href={company.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        Otwórz w Mapach Google
                      </a>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.2}>
              <div>
                <SectionHeading
                  label="Formularz"
                  heading="Napisz do nas"
                  align="left"
                />
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  )
}
