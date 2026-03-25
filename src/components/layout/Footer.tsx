import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import type { Media } from '@/payload-types'

export async function Footer() {
  const payload = await getPayload({ config: await config })
  const footer = await payload.findGlobal({ slug: 'footer' })

  const logo = footer.logo as Media | undefined
  const columns = footer.columns || []
  const contact = footer.contactInfo
  const socials = footer.socialLinks || []

  return (
    <footer className="border-t border-border bg-primary text-surface/80">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || 'Kalabi'}
                width={140}
                height={40}
                className="mb-4 h-10 w-auto brightness-0 invert"
              />
            ) : (
              <Image
                src="/logo.png"
                alt="Kalabi"
                width={140}
                height={40}
                className="mb-4 h-10 w-auto brightness-0 invert"
              />
            )}
            {footer.description && (
              <p className="text-sm leading-relaxed text-surface/60">
                {footer.description}
              </p>
            )}
            {/* Social links */}
            {socials.length > 0 && (
              <div className="mt-6 flex gap-4">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-wider text-surface/50 transition-colors hover:text-accent"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic columns */}
          {columns.map((column, i) => (
            <div key={i}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {(column.links || []).map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.link}
                      target={link.newTab ? '_blank' : undefined}
                      className="text-sm text-surface/60 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          {contact && (
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                Kontakt
              </h4>
              <div className="space-y-2 text-sm text-surface/60">
                {contact.address && (
                  <p className="whitespace-pre-line">{contact.address}</p>
                )}
                {contact.phone && (
                  <p>
                    <a href={`tel:${contact.phone}`} className="transition-colors hover:text-accent">
                      {contact.phone}
                    </a>
                  </p>
                )}
                {contact.email && (
                  <p>
                    <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
                      {contact.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Copyright */}
      <div className="border-t border-surface/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-surface/40">
            {footer.copyrightText || `© ${new Date().getFullYear()} Kalabi. Wszelkie prawa zastrzeżone.`}
          </p>
        </Container>
      </div>
    </footer>
  )
}
