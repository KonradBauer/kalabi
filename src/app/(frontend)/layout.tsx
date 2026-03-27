import React from 'react'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
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

function JsonLd({ siteUrl }: { siteUrl: string }) {
  // All data below is hardcoded — no user input, safe from XSS
  const businessData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FurnitureStore',
        '@id': `${siteUrl}/#organization`,
        name: 'Kalabi - Meble na wymiar',
        alternateName: 'Kalabi',
        description: siteDescription,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
        image: `${siteUrl}/images/hero-1.jpg`,
        telephone: '+48661244385',
        email: 'kalabimeblenawymiar@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pajęczno',
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
        sameAs: [
          'https://www.facebook.com/profile.php?id=61572478532744',
          'https://www.instagram.com/kalabi_meble',
        ],
        priceRange: '$$',
        makesOffer: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kuchnie na wymiar' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Szafy i garderoby na wymiar' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meble łazienkowe na wymiar' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meble biurowe na wymiar' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meble do salonu na wymiar' } },
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
    'kuchnie na wymiar',
    'szafy na wymiar',
    'garderoby na wymiar',
    'meble łazienkowe',
    'meble biurowe',
    'meble kuchenne',
    'producent mebli',
    'stolarz Pajęczno',
    'meble na zamówienie',
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
      { url: '/favicon.svg', type: 'image/svg+xml' },
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
    // google: 'TWOJ_KOD_WERYFIKACJI_GOOGLE',
    // other: { 'msvalidate.01': 'TWOJ_KOD_BING' },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-background font-body text-primary antialiased">
        <JsonLd siteUrl={siteUrl} />
        <Header />
        <PageTransition>
          <main className="pt-[72px]">{children}</main>
        </PageTransition>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
