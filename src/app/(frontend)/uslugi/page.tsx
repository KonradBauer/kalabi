import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { PayloadImage } from '@/components/media/PayloadImage'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  return {
    title: 'Usługi',
    description: siteSettings.seo?.defaultDescription || 'Nasze usługi meblarskie',
  }
}

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
