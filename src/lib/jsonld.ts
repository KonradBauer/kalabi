const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalabimeble.pl'

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: `${siteUrl}${item.url}` } : {}),
    })),
  }
}

export function serviceListSchema(
  services: { title: string; shortDescription?: string | null; slug?: string | null }[],
) {
  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@id': `${siteUrl}/#organization` },
    name: service.title,
    ...(service.shortDescription ? { description: service.shortDescription } : {}),
    ...(service.slug ? { url: `${siteUrl}/uslugi#${service.slug}` } : {}),
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 51.1464, longitude: 19.2264 },
      geoRadius: '100000',
    },
  }))
}

export function projectSchema(project: {
  title: string
  description?: string | null
  slug: string
  mainImageUrl?: string | null
  category?: string | null
  updatedAt: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    ...(project.description ? { description: project.description } : {}),
    url: `${siteUrl}/realizacje/${project.slug}`,
    ...(project.mainImageUrl ? { image: project.mainImageUrl } : {}),
    creator: { '@id': `${siteUrl}/#organization` },
    ...(project.category ? { genre: project.category } : {}),
    dateModified: project.updatedAt,
  }
}

export function itemListSchema(items: { name: string; slug: string; position: number }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Realizacje Kalabi - Meble na wymiar',
    description: 'Portfolio projektów mebli na wymiar – kuchnie, szafy, garderoby i więcej.',
    url: `${siteUrl}/realizacje`,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: `${siteUrl}/realizacje/${item.slug}`,
    })),
  }
}
