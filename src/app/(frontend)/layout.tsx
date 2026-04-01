import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { defaultCompanyInfo } from '@/lib/defaults'
import './styles.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const siteName = 'Kalabi'
const siteDescription =
  'Kalabi - producent mebli na wymiar z Pajęczna. Kuchnie, szafy, garderoby, meble łazienkowe i biurowe. Indywidualne projekty, najwyższa jakość wykonania, bezpłatna wycena.'

type JsonLdProps = {
  siteUrl: string
  phone: string
  email: string
  address: string
  socialLinks: { platform: string; url: string }[]
}

function JsonLd({ siteUrl, phone, email, address, socialLinks }: JsonLdProps) {
  // Contact data comes from CMS SiteSettings — single source of truth
  const phoneFormatted = phone.replace(/\s/g, '')
  const phoneFull = phoneFormatted.startsWith('+') ? phoneFormatted : `+48${phoneFormatted}`

  const businessData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FurnitureStore',
        '@id': `${siteUrl}/#organization`,
        name: 'Kalabi - Meble na wymiar',
        alternateName: ['Kalabi', 'Kalabi Meble', 'Kalabi Meble na Wymiar'],
        description: siteDescription,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
          width: 200,
          height: 60,
        },
        image: `${siteUrl}/images/hero-1.jpg`,
        telephone: phoneFull,
        email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pajęczno',
          addressRegion: 'Łódź',
          addressCountry: 'PL',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.1464,
          longitude: 19.2264,
        },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: { '@type': 'GeoCoordinates', latitude: 51.1464, longitude: 19.2264 },
          geoRadius: '100000',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: phoneFull,
          email,
          contactType: 'customer service',
          availableLanguage: 'Polish',
        },
        sameAs: socialLinks.map((s) => s.url),
        priceRange: '$$',
        knowsAbout: [
          'Meble na wymiar',
          'Kuchnie na wymiar',
          'Szafy wnękowe',
          'Garderoby na wymiar',
          'Meble łazienkowe na wymiar',
          'Meble biurowe na wymiar',
          'Meble do salonu na wymiar',
          'Projektowanie wnętrz',
          'Stolarstwo',
        ],
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Kuchnie na wymiar', url: `${siteUrl}/uslugi#kuchnie` },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Szafy i garderoby na wymiar', url: `${siteUrl}/uslugi#szafy` },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Meble łazienkowe na wymiar', url: `${siteUrl}/uslugi#lazienka` },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Meble biurowe na wymiar', url: `${siteUrl}/uslugi#biuro` },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Meble do salonu na wymiar', url: `${siteUrl}/uslugi#salon` },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'pl-PL',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/realizacje?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  )
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Kalabi | Meble na wymiar Pajęczno',
    template: '%s | Kalabi - Meble na wymiar',
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  keywords: [
    'meble na wymiar',
    'meble na wymiar Pajęczno',
    'kalabi meble',
    'kalabi meble na wymiar',
    'kuchnie na wymiar',
    'kuchnie na wymiar Pajęczno',
    'szafy na wymiar',
    'szafy wnękowe',
    'garderoby na wymiar',
    'meble łazienkowe na wymiar',
    'meble biurowe na wymiar',
    'meble kuchenne',
    'producent mebli',
    'producent mebli Pajęczno',
    'stolarz Pajęczno',
    'meble na zamówienie',
    'meble Łódź',
    'meble Wieluń',
    'meble Radomsko',
    'meble Częstochowa',
  ],
  authors: [{ name: 'Kalabi' }],
  creator: 'Kalabi',
  publisher: 'Kalabi',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/fav.png', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName,
    title: 'Kalabi | Meble na wymiar Pajęczno',
    description: siteDescription,
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Kalabi - Meble na wymiar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalabi | Meble na wymiar Pajęczno',
    description: siteDescription,
    images: ['/images/hero-1.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'mVuCVRPKdpUT_GZurjHKRCQNiyRXMFLXnHVD__-e4kk',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const companyInfo = siteSettings.companyInfo

  const contactPhone = companyInfo?.phone || defaultCompanyInfo.phone
  const contactEmail = companyInfo?.email || defaultCompanyInfo.email
  const contactAddress = companyInfo?.address || defaultCompanyInfo.address
  const socialLinks = companyInfo?.socialLinks && companyInfo.socialLinks.length > 0
    ? companyInfo.socialLinks.map((s) => ({ platform: typeof s.platform === 'string' ? s.platform : '', url: s.url }))
    : defaultCompanyInfo.socialLinks

  return (
    <html lang="pl" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-background font-body text-primary antialiased">
        <JsonLd siteUrl={siteUrl} phone={contactPhone} email={contactEmail} address={contactAddress} socialLinks={socialLinks} />
        <Header />
        <PageTransition>
          <main className="pt-[108px]">{children}</main>
        </PageTransition>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
