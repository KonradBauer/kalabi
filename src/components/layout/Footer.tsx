import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { defaultFooter, defaultCompanyInfo } from '@/lib/defaults'

export async function Footer() {
  const payload = await getPayload({ config: await config })
  const [footer, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'footer' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  const companyInfo = siteSettings.companyInfo
  const hasColumns = footer.columns && footer.columns.length > 0
  const columns = hasColumns ? footer.columns! : defaultFooter.columns
  const contact = {
    address: companyInfo?.address || defaultCompanyInfo.address,
    phone: companyInfo?.phone || defaultCompanyInfo.phone,
    email: companyInfo?.email || defaultCompanyInfo.email,
  }
  const socials = companyInfo?.socialLinks && companyInfo.socialLinks.length > 0
    ? companyInfo.socialLinks.map((s) => ({ platform: typeof s.platform === 'string' ? s.platform : '', url: s.url }))
    : defaultFooter.socialLinks
  const description = footer.description || defaultFooter.description

  return (
    <footer className="border-t border-border bg-primary text-surface/80">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Kalabi"
              width={140}
              height={40}
              className="mb-4 h-20 w-auto brightness-0 invert"
            />
            {description && (
              <p className="text-sm leading-relaxed text-surface/60">
                {description}
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
                    className="text-surface/50 transition-colors hover:text-accent"
                    aria-label={typeof social.platform === 'string' ? social.platform : ''}
                  >
                    <SocialIcon platform={typeof social.platform === 'string' ? social.platform : ''} />
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
                      target={'newTab' in link && link.newTab ? '_blank' : undefined}
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
        <Container className="py-6 text-center">
          <p className="text-xs text-surface/40">
            {footer.copyrightText || `© ${new Date().getFullYear()} Kalabi. Wszelkie prawa zastrzeżone.`}
          </p>
          <p className="mt-2 text-xs text-surface/30">
            Powered by{' '}
            <a
              href="https://kbauer.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface/40 transition-colors hover:text-accent"
            >
              kbauer.pl
            </a>
          </p>
        </Container>
      </div>
    </footer>
  )
}
