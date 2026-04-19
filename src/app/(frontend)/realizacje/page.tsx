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
  title: 'Realizacje – Portfolio Mebli na Wymiar | Kalabi Pajęczno',
  description:
    'Portfolio realizacji Kalabi – kuchnie na wymiar, szafy wnękowe, garderoby, meble łazienkowe i biurowe. Każdy projekt to indywidualne podejście i najwyższa jakość.',
  keywords: [
    'realizacje meble na wymiar',
    'portfolio mebli na wymiar Pajęczno',
    'galeria kuchni na wymiar',
    'zdjęcia mebli na wymiar',
    'inspiracje meblarskie',
    'projekty kuchni zdjęcia',
    'szafy wnękowe realizacje',
  ],
  alternates: { canonical: '/realizacje' },
  openGraph: {
    title: 'Realizacje – Portfolio Kalabi | Meble na Wymiar',
    description: 'Zobacz nasze realizacje – kuchnie, szafy, garderoby i meble na wymiar z Pajęczna.',
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
            Nasze realizacje
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
    </>
  )
}
