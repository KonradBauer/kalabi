import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  fields: [
    // HERO
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'subheading', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaLink', type: 'text' },
        { name: 'secondaryCtaText', type: 'text' },
        { name: 'secondaryCtaLink', type: 'text' },
      ],
    },
    // ABOUT PREVIEW
    {
      name: 'aboutPreview',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'stats',
          type: 'array',
          maxRows: 4,
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaLink', type: 'text' },
      ],
    },
    // SERVICES SECTION
    {
      name: 'servicesSection',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    // PROJECTS SECTION
    {
      name: 'projectsSection',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaLink', type: 'text' },
      ],
    },
    // CTA BANNER
    {
      name: 'ctaBanner',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaLink', type: 'text' },
      ],
    },
    // TESTIMONIALS
    {
      name: 'testimonialsSection',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    // SEO
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
