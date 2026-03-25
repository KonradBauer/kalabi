import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PayloadImage } from '@/components/media/PayloadImage'
import type { Media, Project } from '@/payload-types'

type ProjectCardProps = {
  project: Project & { _placeholder?: string }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.mainImage as Media | undefined
  const placeholder = (project as any)._placeholder as string | undefined

  return (
    <Link
      href={`/realizacje/${project.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden bg-primary"
    >
      {image ? (
        <PayloadImage
          media={image}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
          fill
        />
      ) : placeholder ? (
        <Image
          src={placeholder}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          {typeof project.category === 'object' && project.category?.name}
        </p>
        <h3 className="mt-1 font-heading text-xl font-bold text-surface">
          {project.title}
        </h3>
      </div>
    </Link>
  )
}
