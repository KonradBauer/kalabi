import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Hero } from '@/components/sections/Hero'
import { AboutPreview } from '@/components/sections/AboutPreview'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { TestimonialsSlider } from '@/components/sections/TestimonialsSlider'

import {
  defaultHero,
  defaultAboutPreview,
  defaultServicesSection,
  defaultServices,
  defaultProjectsSection,
  defaultProjects,
  defaultCtaBanner,
  defaultTestimonialsSection,
  defaultTestimonials,
} from '@/lib/defaults'

import type { Media } from '@/payload-types'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [homePage, servicesData, projectsData, testimonialsData] = await Promise.all([
    payload.findGlobal({ slug: 'home-page' }),
    payload.find({ collection: 'services', sort: 'order', limit: 6 }),
    payload.find({ collection: 'projects', where: { featured: { equals: true } }, sort: 'order', limit: 6 }),
    payload.find({ collection: 'testimonials', where: { featured: { equals: true } }, sort: 'order', limit: 10 }),
  ])

  const hasServices = servicesData.docs.length > 0
  const hasProjects = projectsData.docs.length > 0
  const hasTestimonials = testimonialsData.docs.length > 0

  return (
    <>
      <Hero
        heading={homePage.hero?.heading || defaultHero.heading}
        subheading={homePage.hero?.subheading || defaultHero.subheading}
        backgroundImage={homePage.hero?.backgroundImage as Media | null}
        placeholderImage="/images/placeholder-hero.svg"
        ctaText={homePage.hero?.ctaText || defaultHero.ctaText}
        ctaLink={homePage.hero?.ctaLink || defaultHero.ctaLink}
        secondaryCtaText={homePage.hero?.secondaryCtaText || defaultHero.secondaryCtaText}
        secondaryCtaLink={homePage.hero?.secondaryCtaLink || defaultHero.secondaryCtaLink}
      />

      <AboutPreview
        label={homePage.aboutPreview?.label || defaultAboutPreview.label}
        heading={homePage.aboutPreview?.heading || defaultAboutPreview.heading}
        description={homePage.aboutPreview?.description || defaultAboutPreview.description}
        image={homePage.aboutPreview?.image as Media | null}
        placeholderImage="/images/placeholder-about.svg"
        stats={(homePage.aboutPreview?.stats as { number: string; label: string }[]) || defaultAboutPreview.stats}
        ctaText={homePage.aboutPreview?.ctaText || defaultAboutPreview.ctaText}
        ctaLink={homePage.aboutPreview?.ctaLink || defaultAboutPreview.ctaLink}
      />

      <ServicesGrid
        label={homePage.servicesSection?.label || defaultServicesSection.label}
        heading={homePage.servicesSection?.heading || defaultServicesSection.heading}
        description={homePage.servicesSection?.description || defaultServicesSection.description}
        services={hasServices ? servicesData.docs : (defaultServices as any)}
      />

      <FeaturedProjects
        label={homePage.projectsSection?.label || defaultProjectsSection.label}
        heading={homePage.projectsSection?.heading || defaultProjectsSection.heading}
        description={homePage.projectsSection?.description || defaultProjectsSection.description}
        ctaText={homePage.projectsSection?.ctaText || defaultProjectsSection.ctaText}
        ctaLink={homePage.projectsSection?.ctaLink || defaultProjectsSection.ctaLink}
        projects={hasProjects ? projectsData.docs : (defaultProjects as any)}
      />

      <CtaBanner
        heading={homePage.ctaBanner?.heading || defaultCtaBanner.heading}
        description={homePage.ctaBanner?.description || defaultCtaBanner.description}
        backgroundImage={homePage.ctaBanner?.backgroundImage as Media | null}
        placeholderImage="/images/placeholder-cta.svg"
        ctaText={homePage.ctaBanner?.ctaText || defaultCtaBanner.ctaText}
        ctaLink={homePage.ctaBanner?.ctaLink || defaultCtaBanner.ctaLink}
      />

      <TestimonialsSlider
        label={homePage.testimonialsSection?.label || defaultTestimonialsSection.label}
        heading={homePage.testimonialsSection?.heading || defaultTestimonialsSection.heading}
        description={homePage.testimonialsSection?.description || defaultTestimonialsSection.description}
        testimonials={hasTestimonials ? testimonialsData.docs : (defaultTestimonials as any)}
      />
    </>
  )
}
