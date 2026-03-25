import React from 'react'

type SectionHeadingProps = {
  label?: string | null
  heading?: string | null
  description?: string | null
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  label,
  heading,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const textColor = light ? 'text-surface' : 'text-primary'
  const mutedColor = light ? 'text-surface/70' : 'text-muted'

  return (
    <div className={`${alignClass} mb-12 max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      {label && (
        <span className="mb-3 inline-block text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {label}
        </span>
      )}
      {heading && (
        <h2 className={`font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${textColor}`}>
          {heading}
        </h2>
      )}
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${mutedColor}`}>
          {description}
        </p>
      )}
    </div>
  )
}
