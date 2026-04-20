export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { faqSchema } from '@/lib/jsonld'

import { Hero } from '@/components/sections/Hero'
import { VideoCarouselServer } from '@/components/sections/VideoCarouselServer'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { TestimonialsSlider } from '@/components/sections/TestimonialsSlider'

import {
  defaultHero,
  defaultVideoSection,
  defaultServicesSection,
  defaultServices,
  defaultCtaBanner,
  defaultTestimonialsSection,
  defaultTestimonials,
} from '@/lib/defaults'

import type { Media, HomePage as HomePageType } from '@/payload-types'

export const metadata: Metadata = {
  title: {
    absolute: 'Meble Pajęczno – Kalabi | Meble na wymiar',
  },
  description:
    'Kalabi – producent mebli na wymiar z Pajęczna. Kuchnie, szafy wnękowe, garderoby, meble łazienkowe i biurowe. Indywidualny projekt, produkcja, montaż. Bezpłatna wycena – tel. 661 244 385.',
  keywords: [
    'meble Pajęczno',
    'meble na wymiar Pajęczno',
    'meble na wymiar',
    'kuchnie na wymiar Pajęczno',
    'szafy wnękowe Pajęczno',
    'meblarnia Pajęczno',
    'meblarz Pajęczno',
    'stolarz Pajęczno',
    'producent mebli Pajęczno',
    'meble na zamówienie Pajęczno',
    'kalabi meble Pajęczno',
    'meble Wieluń',
    'meble Radomsko',
    'meble Częstochowa',
    'meble Łódź',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Meble Pajęczno – Kalabi | Meble na wymiar',
    description:
      'Producent mebli na wymiar z Pajęczna. Kuchnie, szafy, garderoby – projekt, produkcja, montaż. Bezpłatna wycena.',
  },
}

const HOME_FAQS = [
  {
    question: 'Gdzie znajduje się firma Kalabi produkująca meble na wymiar?',
    answer:
      'Kalabi mieści się w Pajęcznie (województwo łódzkie). Obsługujemy klientów z Pajęczna i całego regionu – Wielunia, Radomska, Częstochowy, Łodzi i okolic w promieniu 100 km.',
  },
  {
    question: 'Jakie meble na wymiar wykonuje Kalabi z Pajęczna?',
    answer:
      'Kalabi wykonuje: kuchnie na wymiar, szafy wnękowe i garderoby, meble łazienkowe na wymiar, meble biurowe oraz meble do salonu. Każdy projekt jest indywidualny i dopasowany do potrzeb klienta.',
  },
  {
    question: 'Czy wycena mebli na wymiar w Pajęcznie jest bezpłatna?',
    answer:
      'Tak, wycena mebli na wymiar jest całkowicie bezpłatna. Wystarczy zadzwonić pod numer 661 244 385 lub wypełnić formularz kontaktowy. Odpowiadamy w ciągu 24 godzin.',
  },
  {
    question: 'Jak długo trwa realizacja mebli na wymiar?',
    answer:
      'Czas realizacji zależy od zakresu projektu. Standardowo wynosi od 4 do 8 tygodni od zatwierdzenia projektu i podpisania umowy.',
  },
  {
    question: 'Czy Kalabi dojeżdża do klientów poza Pajęczno?',
    answer:
      'Tak, realizujemy projekty na terenie całego regionu – Wielunia, Radomska, Częstochowy, Łodzi i okolic. Obsługujemy klientów w promieniu ok. 100 km od Pajęczna.',
  },
  {
    question: 'Czy meble na wymiar z Pajęczna są droższe niż standardowe?',
    answer:
      'Meble na wymiar Kalabi są konkurencyjnie wycenione względem jakości wykonania. Bezpłatna wycena pozwala dopasować projekt do budżetu klienta – zadzwoń: 661 244 385.',
  },
]

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [homePage, servicesData, testimonialsData, videosData] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', depth: 2 }),
    payload.find({ collection: 'services', sort: 'order', limit: 6 }),
    payload.find({ collection: 'testimonials', where: { featured: { equals: true } }, sort: 'order', limit: 10 }),
    payload.find({ collection: 'videos', sort: 'order', limit: 20, depth: 1 }),
  ])

  const hasServices = servicesData.docs.length > 0
  const hasTestimonials = testimonialsData.docs.length > 0
  const hasVideos = videosData.docs.length > 0

  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />
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

      {hasVideos && (
        <VideoCarouselServer
          label={homePage.videoSection?.label || defaultVideoSection.label}
          heading={homePage.videoSection?.heading || defaultVideoSection.heading}
          videos={videosData.docs}
        />
      )}

      <ServicesGrid
        label={homePage.servicesSection?.label || defaultServicesSection.label}
        heading={homePage.servicesSection?.heading || defaultServicesSection.heading}
        description={homePage.servicesSection?.description || defaultServicesSection.description}
        services={hasServices ? servicesData.docs : (defaultServices as any)}
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
