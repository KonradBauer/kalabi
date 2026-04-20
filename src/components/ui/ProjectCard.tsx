import Link from 'next/link'
import React from 'react'
import { SkeletonImage } from '@/components/ui/SkeletonImage'
import type { Media, Project } from '@/payload-types'

type ProjectCardProps = {
  project: Project & { _placeholder?: string }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.mainImage as Media | undefined
  const placeholder = (project as any)._placeholder as string | undefined
  const imgSrc = image?.url || placeholder

  return (
    <Link
      href={`/realizacje/${project.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden bg-primary"
    >
      {imgSrc ? (
        <SkeletonImage
          src={imgSrc}
          alt={image?.alt || project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-heading text-xl font-bold text-surface">
          {project.title}
        </h3>
      </div>
    </Link>
  )
}
