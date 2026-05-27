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
      // AI training bots — content is proprietary, not licensed for model training
      // AI training bots — treść zastrzeżona, nie licencjonowana do trenowania modeli
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'ChatGPT-User', disallow: ['/'] },
      // Search/citation bots — blokuj strony, ale pozwól czytać llms.txt (cytowania w AI)
      { userAgent: 'OAI-SearchBot', allow: ['/llms.txt'], disallow: ['/'] },
      { userAgent: 'PerplexityBot', allow: ['/llms.txt'], disallow: ['/'] },
      { userAgent: 'YouBot', allow: ['/llms.txt'], disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'ClaudeBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Claude-Web', disallow: ['/'] },
      { userAgent: 'Bytespider', disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
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
