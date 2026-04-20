export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { PayloadImage } from '@/components/media/PayloadImage'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, serviceListSchema, faqSchema } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Meble Pajęczno – Usługi | Kuchnie, Szafy, Garderoby | Kalabi',
  description:
    'Meble na wymiar Pajęczno – Kalabi: kuchnie, szafy wnękowe, garderoby, meble łazienkowe i biurowe. Projekt, produkcja i montaż na terenie całego regionu. Bezpłatna wycena – tel. 661 244 385.',
  keywords: [
    'meble Pajęczno',
    'kuchnie na wymiar Pajęczno',
    'kuchnie Pajęczno',
    'szafy wnękowe Pajęczno',
    'garderoby na wymiar Pajęczno',
    'meble łazienkowe Pajęczno',
    'meble biurowe na wymiar',
    'usługi meblarskie Pajęczno',
    'projekt kuchni na wymiar',
    'montaż mebli na wymiar',
    'meble salon Pajęczno',
    'meble na wymiar Wieluń',
    'meble na wymiar Radomsko',
  ],
  alternates: { canonical: '/uslugi' },
  openGraph: {
    title: 'Meble Pajęczno – Kalabi | Kuchnie, Szafy, Garderoby',
    description: 'Meble na wymiar Pajęczno: kuchnie, szafy, garderoby, meble łazienkowe – projekt, produkcja, montaż.',
  },
}

const SERVICES_FAQS = [
  {
    question: 'Czy Kalabi wykonuje kuchnie na wymiar w Pajęcznie?',
    answer:
      'Tak, kuchnie na wymiar to nasza specjalność. Projektujemy i wykonujemy kuchnie dopasowane do każdego metrażu i stylu. Obsługujemy klientów z Pajęczna i okolic.',
  },
  {
    question: 'Jakie szafy wnękowe wykonuje Kalabi z Pajęczna?',
    answer:
      'Wykonujemy szafy wnękowe i garderoby na wymiar – przesuwne, otwierane, z systemami organizacji wnętrza. Każdy projekt jest indywidualny i dopasowany do przestrzeni klienta.',
  },
  {
    question: 'Czy Kalabi projektuje meble łazienkowe na wymiar?',
    answer:
      'Tak, wykonujemy meble łazienkowe na wymiar – szafki pod umywalkę, słupki, zabudowy i lustra. Dobieramy materiały odporne na wilgoć i dopasowujemy do stylu łazienki.',
  },
  {
    question: 'Czy montaż mebli na wymiar jest wliczony w cenę?',
    answer:
      'Tak, oferujemy kompleksową usługę: projekt, produkcję i montaż mebli na wymiar. Szczegóły montażu ustalamy indywidualnie z każdym klientem.',
  },
]

export default async function UslugiPage() {
  const payload = await getPayload({ config })
  const servicesData = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 50,
  })

  const services = servicesData.docs

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Strona główna', url: '/' },
        { name: 'Usługi', url: '/uslugi' },
      ])} />
      {services.length > 0 && serviceListSchema(services).map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <JsonLd data={faqSchema(SERVICES_FAQS)} />
      {/* Hero */}
      <section className="bg-primary py-20">
        <Container className="text-center">
          <h1 className="font-heading text-4xl font-bold text-surface sm:text-5xl lg:text-6xl">
            Nasze usługi
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-surface/70">
            Oferujemy kompleksowe usługi w zakresie projektowania i wykonania mebli na wymiar.
          </p>
        </Container>
      </section>

      {/* Services List */}
      <section className="py-20">
        <Container>
          <div className="space-y-24">
            {services.map((service, index) => {
              const image = service.image as Media | undefined
              const isEven = index % 2 === 0

              return (
                <ScrollReveal key={service.id}>
                  <div
                    id={service.slug}
                    className={`grid items-center gap-12 lg:grid-cols-2 ${isEven ? '' : 'lg:direction-rtl'}`}
                  >
                    {/* Image */}
                    <div className={`relative aspect-[4/3] overflow-hidden bg-primary ${isEven ? '' : 'lg:order-2'}`}>
                      {image && (
                        <PayloadImage
                          media={image}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className={isEven ? '' : 'lg:order-1'}>
                      {service.icon && (
                        <div className="mb-4 text-3xl text-accent">{service.icon}</div>
                      )}
                      <h2 className="font-heading text-3xl font-bold text-primary">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-muted">
                        {service.shortDescription}
                      </p>

                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <ul className="mt-8 space-y-3">
                          {service.features.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-1.5 h-2 w-2 shrink-0 bg-accent" />
                              <span className="text-muted">{item.feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {services.length === 0 && (
            <p className="text-center text-lg text-muted">
              Usługi pojawią się wkrótce.
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
