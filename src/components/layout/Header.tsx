import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'
import { HeaderScroll } from './HeaderScroll'
import { defaultNavItems } from '@/lib/defaults'
import type { Media } from '@/payload-types'

export async function Header() {
  const payload = await getPayload({ config: await config })
  const header = await payload.findGlobal({ slug: 'header' })

  const logo = header.logo as Media | undefined
  const navItems = header.navItems && header.navItems.length > 0 ? header.navItems : defaultNavItems
  const cta = header.ctaButton?.label ? header.ctaButton : { label: 'Bezpłatna wycena', link: '/kontakt' }

  return (
    <HeaderScroll>
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="relative z-50 flex items-center">
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={logo.alt || 'Kalabi'}
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          ) : (
            <Image
              src="/logo.png"
              alt="Kalabi"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              target={item.newTab ? '_blank' : undefined}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
              className="text-sm font-medium uppercase tracking-wider text-primary/80 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          {cta?.label && cta?.link && (
            <Button href={cta.link} size="sm">
              {cta.label}
            </Button>
          )}
        </nav>

        {/* Mobile menu */}
        <MobileMenu navItems={navItems} cta={cta} />
      </Container>
    </HeaderScroll>
  )
}
