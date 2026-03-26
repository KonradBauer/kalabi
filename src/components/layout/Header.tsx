import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { NavBar } from './NavBar'
import { defaultNavItems } from '@/lib/defaults'
import type { Media } from '@/payload-types'

export async function Header() {
  const payload = await getPayload({ config: await config })
  const header = await payload.findGlobal({ slug: 'header' })

  const logo = header.logo as Media | undefined
  const navItems = header.navItems && header.navItems.length > 0 ? header.navItems : defaultNavItems
  const cta = header.ctaButton?.label ? header.ctaButton : { label: 'Bezpłatna wycena', link: '/kontakt' }

  return (
    <NavBar
      logoUrl={logo?.url || '/logo.png'}
      logoAlt={logo?.alt || 'Kalabi'}
      navItems={navItems.map((item) => ({
        label: item.label,
        link: item.link,
      }))}
      cta={cta.label && cta.link ? { label: cta.label, link: cta.link } : null}
    />
  )
}
