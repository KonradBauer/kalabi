import React from 'react'
import { Inter, Playfair_Display } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import './styles.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

function JsonLd({ siteUrl }: { siteUrl: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'Kalabi',
    description: 'Producent mebli na wymiar. Kuchnie, szafy, garderoby, meble łazienkowe i biurowe.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
  }

  return (
    <script
      type="application/ld+json"
      // Safe: JSON.stringify of hardcoded data, no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export const metadata = {
  title: {
    default: 'Kalabi | Meble na wymiar',
    template: '%s | Kalabi',
  },
  description:
    'Kalabi - producent mebli na wymiar. Kuchnie, szafy, garderoby, meble łazienkowe i biurowe. Najwyższa jakość wykonania.',
  metadataBase: new URL(siteUrl),
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Kalabi',
    images: [{ url: '/logo.png', width: 500, height: 500 }],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-body text-primary antialiased">
        <JsonLd siteUrl={siteUrl} />
        <Header />
        <PageTransition>
          <main className="pt-[72px]">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
