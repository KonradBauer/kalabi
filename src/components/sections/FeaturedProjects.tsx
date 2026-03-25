import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { Project } from '@/payload-types'

type FeaturedProjectsProps = {
  label?: string | null
  heading?: string | null
  description?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  projects: Project[]
}

export function FeaturedProjects({
  label,
  heading,
  description,
  ctaText,
  ctaLink,
  projects,
}: FeaturedProjectsProps) {
  return (
    <section className="bg-background py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeading label={label} heading={heading} description={description} />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        {ctaText && ctaLink && (
          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Button href={ctaLink} variant="outline">
                {ctaText}
              </Button>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  )
}
