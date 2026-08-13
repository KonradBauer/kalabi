import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalabimeble.pl'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
      // Trenowanie modeli — treść zastrzeżona, nie licencjonowana do trenowania
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Claude-Web', disallow: ['/'] },
      { userAgent: 'Bytespider', disallow: ['/'] },
      // Boty wyszukiwania/cytowań na żywo — pełny dostęp (widoczność w odpowiedziach AI = GEO)
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/admin/', '/api/', '/_next/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/admin/', '/api/', '/_next/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin/', '/api/', '/_next/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin/', '/api/', '/_next/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/admin/', '/api/', '/_next/'] },
      { userAgent: 'YouBot', allow: ['/llms.txt'], disallow: ['/'] },
      { userAgent: 'Amazonbot', disallow: ['/'] },
      { userAgent: 'cohere-ai', disallow: ['/'] },
      { userAgent: 'Diffbot', disallow: ['/'] },
      { userAgent: 'Meta-ExternalAgent', disallow: ['/'] },
      { userAgent: 'Meta-ExternalFetcher', disallow: ['/'] },
      { userAgent: 'FacebookBot', disallow: ['/'] },
      { userAgent: 'Omgilibot', disallow: ['/'] },
      { userAgent: 'omgili', disallow: ['/'] },
      { userAgent: 'ImagesiftBot', disallow: ['/'] },
      { userAgent: 'Applebot-Extended', disallow: ['/'] },
      { userAgent: 'DataForSeoBot', disallow: ['/'] },
      { userAgent: 'iaskspider/2.0', disallow: ['/'] },
      { userAgent: 'PetalBot', disallow: ['/'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
