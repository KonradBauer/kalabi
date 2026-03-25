import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Service } from '@/payload-types'

type ServicesGridProps = {
  label?: string | null
  heading?: string | null
  description?: string | null
  services: Service[]
}

export function ServicesGrid({ label, heading, description, services }: ServicesGridProps) {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeading label={label} heading={heading} description={description} />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.1}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
