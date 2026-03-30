import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { TopBar } from './TopBar'
import { NavBar } from './NavBar'
import { defaultNavItems, defaultCompanyInfo } from '@/lib/defaults'
import type { Media } from '@/payload-types'

export async function Header() {
  const payload = await getPayload({ config: await config })
  const [header, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  const logo = header.logo as Media | undefined
  const navItems = header.navItems && header.navItems.length > 0 ? header.navItems : defaultNavItems
  const cta = header.ctaButton?.label ? header.ctaButton : { label: 'Bezpłatna wycena', link: '/kontakt' }

  const companyInfo = siteSettings.companyInfo
  const phone = companyInfo?.phone || defaultCompanyInfo.phone
  const email = companyInfo?.email || defaultCompanyInfo.email
  const socials = companyInfo?.socialLinks && companyInfo.socialLinks.length > 0
    ? companyInfo.socialLinks.map((s) => ({ platform: typeof s.platform === 'string' ? s.platform : '', url: s.url }))
    : defaultCompanyInfo.socialLinks

  return (
    <>
      <TopBar phone={phone} email={email} socials={socials} />
      <NavBar
        logoUrl={logo?.url || '/logo.png'}
        logoAlt={logo?.alt || 'Kalabi'}
        navItems={navItems.map((item) => ({
          label: item.label,
          link: item.link,
        }))}
        cta={cta.label && cta.link ? { label: cta.label, link: cta.link } : null}
        socials={socials}
      />
    </>
  )
}
