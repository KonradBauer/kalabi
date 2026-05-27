export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, itemListSchema } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: { absolute: 'Realizacje – Meble na wymiar Pajęczno | Portfolio Kalabi' },
  description:
    'Portfolio mebli na wymiar z Pajęczna – Kalabi. Kuchnie na wymiar, szafy wnękowe, garderoby, meble łazienkowe i biurowe. Zobacz gotowe realizacje i zainspiruj się.',
  keywords: [
    'realizacje meble Pajęczno',
    'portfolio mebli na wymiar Pajęczno',
    'galeria kuchni na wymiar Pajęczno',
    'zdjęcia mebli na wymiar',
    'inspiracje meblarskie Pajęczno',
    'projekty kuchni zdjęcia',
    'szafy wnękowe realizacje Pajęczno',
    'meble na wymiar galeria',
  ],
  alternates: { canonical: '/realizacje' },
  openGraph: {
    title: 'Realizacje – Meble na wymiar Pajęczno | Kalabi',
    description: 'Portfolio kuchni, szaf, garderoby i mebli na wymiar z Pajęczna. Każda realizacja – indywidualny projekt.',
    images: [{ url: '/images/hero-1.jpg', width: 1200, height: 630, alt: 'Kalabi – realizacje mebli na wymiar Pajęczno' }],
  },
}

export default async function RealizacjePage() {
  const payload = await getPayload({ config })

  const projectsData = await payload.find({ collection: 'projects', sort: 'order', limit: 100 })
  const projects = projectsData.docs

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Strona główna', url: '/' },
        { name: 'Realizacje', url: '/realizacje' },
      ])} />
      {projects.length > 0 && (
        <JsonLd data={itemListSchema(
          projects.map((p, i) => ({ name: p.title, slug: p.slug, position: i + 1 }))
        )} />
      )}
      {/* Hero */}
      <section className="bg-primary py-20">
        <Container className="text-center">
          <h1 className="font-heading text-4xl font-bold text-surface sm:text-5xl lg:text-6xl">
            Realizacje – meble na wymiar Pajęczno
          </h1>
        </Container>
      </section>

      {/* Category Filter + Projects Grid */}
      <section className="py-20">
        <Container>
          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          {projects.length === 0 && (
            <p className="text-center text-lg text-muted">
              Projekty pojawią się wkrótce.
            </p>
          )}
        </Container>
      </section>

      <section className="border-t border-border py-16 bg-background">
        <Container className="text-center">
          <p className="text-muted">
            Zainteresowany podobnym projektem? Sprawdź{' '}
            <a href="/uslugi" className="font-medium text-accent underline underline-offset-4 hover:text-secondary transition-colors">
              nasze usługi meblarskie
            </a>
            {' '}lub{' '}
            <a href="/kontakt" className="font-medium text-accent underline underline-offset-4 hover:text-secondary transition-colors">
              poproś o bezpłatną wycenę
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  )
}
