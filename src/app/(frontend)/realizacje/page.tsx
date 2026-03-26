export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Realizacje',
  description:
    'Galeria realizacji Kalabi — zobacz nasze kuchnie, szafy, garderoby i meble na wymiar. Inspiracje i portfolio naszych projektów.',
  alternates: { canonical: '/realizacje' },
  openGraph: {
    title: 'Realizacje | Kalabi - Meble na wymiar',
    description: 'Zobacz nasze realizacje mebli na wymiar — kuchnie, szafy, garderoby i więcej.',
  },
}

export default async function RealizacjePage() {
  const payload = await getPayload({ config })

  const [projectsData, categoriesData] = await Promise.all([
    payload.find({ collection: 'projects', sort: 'order', limit: 100 }),
    payload.find({ collection: 'project-categories', sort: 'order', limit: 20 }),
  ])

  const projects = projectsData.docs
  const categories = categoriesData.docs

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-20">
        <Container className="text-center">
          <h1 className="font-heading text-4xl font-bold text-surface sm:text-5xl lg:text-6xl">
            Nasze realizacje
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-surface/70">
            Każdy projekt to unikalna historia. Zobacz, jak tworzymy meble dopasowane do potrzeb naszych klientów.
          </p>
        </Container>
      </section>

      {/* Category Filter + Projects Grid */}
      <section className="py-20">
        <Container>
          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              <span className="border border-accent bg-accent/10 px-4 py-2 text-sm font-medium uppercase tracking-wider text-accent">
                Wszystkie
              </span>
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="cursor-pointer border border-border px-4 py-2 text-sm font-medium uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

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
