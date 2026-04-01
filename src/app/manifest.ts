import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kalabi - Meble na wymiar',
    short_name: 'Kalabi',
    description: 'Producent mebli na wymiar z Pajęczna. Kuchnie, szafy, garderoby, meble łazienkowe i biurowe.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f6',
    theme_color: '#1a1a1a',
    lang: 'pl',
    categories: ['shopping', 'business'],
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
