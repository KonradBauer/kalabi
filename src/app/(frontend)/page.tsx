export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Hero } from '@/components/sections/Hero'
import { VideoCarouselServer } from '@/components/sections/VideoCarouselServer'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { TestimonialsSlider } from '@/components/sections/TestimonialsSlider'

import {
  defaultHero,
  defaultVideoSection,
  defaultServicesSection,
  defaultServices,
  defaultProjectsSection,
  defaultProjects,
  defaultCtaBanner,
  defaultTestimonialsSection,
  defaultTestimonials,
} from '@/lib/defaults'

import type { Media, HomePage as HomePageType } from '@/payload-types'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [homePage, servicesData, projectsData, testimonialsData] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }),
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
        images={
          homePage.hero?.slides && homePage.hero.slides.length > 0
            ? homePage.hero.slides
                .map((slide: { image: Media | string }) => {
                  const img = slide.image as Media
                  return img?.url
                })
                .filter(Boolean) as string[]
            : ['/images/hero-1.jpg', '/images/hero-2.jpg', '/images/hero-3.jpg']
        }
        ctaText={homePage.hero?.ctaText || defaultHero.ctaText}
        ctaLink={homePage.hero?.ctaLink || defaultHero.ctaLink}
        secondaryCtaText={homePage.hero?.secondaryCtaText || defaultHero.secondaryCtaText}
        secondaryCtaLink={homePage.hero?.secondaryCtaLink || defaultHero.secondaryCtaLink}
      />

      <VideoCarouselServer
        label={homePage.videoSection?.label || defaultVideoSection.label}
        heading={homePage.videoSection?.heading || defaultVideoSection.heading}
        videos={
          homePage.videoSection?.videos && homePage.videoSection.videos.length > 0
            ? homePage.videoSection.videos
            : defaultVideoSection.videos
        }
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
