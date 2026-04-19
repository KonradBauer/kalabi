import Image from 'next/image'
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
    <div className="overflow-hidden border border-border bg-surface">
      <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
        {image ? (
          <PayloadImage
            media={image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : placeholder ? (
          <Image
            src={placeholder}
            alt={service.title}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="p-6">
        {service.icon && (
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            {service.icon}
          </div>
        )}
        <h3 className="font-heading text-xl font-bold text-primary">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {service.shortDescription}
        </p>
      </div>
    </div>
  )
}
