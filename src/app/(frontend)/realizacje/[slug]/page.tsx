export const dynamic = 'force-dynamic'

import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PayloadImage } from '@/components/media/PayloadImage'
import { GalleryLightbox } from '@/components/media/GalleryLightbox'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Media, ProjectCategory } from '@/payload-types'
import type { Metadata } from 'next'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const projects = await payload.find({ collection: 'projects', limit: 1000 })
    return projects.docs.map((project) => ({ slug: project.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const project = data.docs[0]

  if (!project) return { title: 'Nie znaleziono' }

  const mainImage = project.mainImage as Media | undefined
  const ogImage = mainImage?.url ? { url: mainImage.url, alt: project.title } : undefined

  return {
    title: project.meta?.title || project.title,
    description: project.meta?.description || project.description,
    alternates: { canonical: `/realizacje/${slug}` },
    openGraph: {
      title: `${project.title} | Kalabi - Realizacje`,
      description: project.meta?.description || project.description || '',
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const project = data.docs[0]
  if (!project) notFound()

  const mainImage = project.mainImage as Media | undefined
  const category = project.category as ProjectCategory | undefined
  const gallery = project.gallery as { image: Media; caption?: string | null }[] | undefined

  const details = [
    { label: 'Klient', value: project.details?.client },
    { label: 'Lokalizacja', value: project.details?.location },
    { label: 'Rok', value: project.details?.year },
    { label: 'Zakres', value: project.details?.scope },
    { label: 'Materiały', value: project.details?.materials },
  ].filter((d) => d.value)

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] bg-primary lg:h-[60vh]">
        {mainImage && (
          <PayloadImage
            media={mainImage}
            fill
            priority
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <Container className="relative z-10 flex h-full flex-col justify-end pb-12">
          {category && (
            <span className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              {category.name}
            </span>
          )}
          <h1 className="font-heading text-4xl font-bold text-surface sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Description */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <p className="text-lg leading-relaxed text-muted">
                  {project.description}
                </p>
              </ScrollReveal>
            </div>

            {/* Details Sidebar */}
            {details.length > 0 && (
              <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <ScrollReveal delay={0.2}>
                  <h3 className="mb-6 font-heading text-xl font-bold text-primary">Szczegóły projektu</h3>
                  <dl className="space-y-4">
                    {details.map((detail) => (
                      <div key={detail.label}>
                        <dt className="text-sm font-medium uppercase tracking-wider text-accent">
                          {detail.label}
                        </dt>
                        <dd className="mt-1 text-muted">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </ScrollReveal>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <section className="border-t border-border py-20">
          <Container>
            <ScrollReveal>
              <h2 className="mb-12 text-center font-heading text-3xl font-bold text-primary">
                Galeria
              </h2>
            </ScrollReveal>
            <GalleryLightbox
              images={gallery.map((item) => ({
                url: item.image.url || '',
                alt: item.image.alt || '',
                width: item.image.width || 1200,
                height: item.image.height || 900,
                caption: item.caption,
              }))}
            />
          </Container>
        </section>
      )}

      {/* Back Link */}
      <section className="border-t border-border py-12">
        <Container className="text-center">
          <Button href="/realizacje" variant="outline">
            &larr; Wszystkie realizacje
          </Button>
        </Container>
      </section>
    </>
  )
}
