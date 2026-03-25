import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PayloadImage } from '@/components/media/PayloadImage'
import type { Media, Service } from '@/payload-types'

type ServiceCardProps = {
  service: Service & { _placeholder?: string }
}

export function ServiceCard({ service }: ServiceCardProps) {
  const image = service.image as Media | undefined
  const placeholder = (service as any)._placeholder as string | undefined

  return (
    <Link
      href={`/uslugi#${service.slug}`}
      className="group block overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-accent hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
        {image ? (
          <PayloadImage
            media={image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : placeholder ? (
          <Image
            src={placeholder}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="p-6">
        {service.icon && (
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            {service.icon}
          </div>
        )}
        <h3 className="font-heading text-xl font-bold text-primary transition-colors group-hover:text-secondary">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {service.shortDescription}
        </p>
        <span className="mt-4 inline-block text-sm font-medium uppercase tracking-wider text-accent opacity-0 transition-opacity group-hover:opacity-100">
          Dowiedz si&eacute; wi&eacute;cej &rarr;
        </span>
      </div>
    </Link>
  )
}
