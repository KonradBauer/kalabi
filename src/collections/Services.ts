import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Usługa',
    plural: 'Usługi',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    description: 'Karty usług widoczne na stronie głównej (sekcja "Usługi") i na podstronie /uslugi',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Nazwa usługi',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (adres URL)',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'np. "kuchnie-na-wymiar" → /uslugi/kuchnie-na-wymiar',
      },
    },
    {
      name: 'shortDescription',
      label: 'Krótki opis',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Wyświetlany na karcie usługi na stronie głównej',
      },
    },
    {
      name: 'content',
      label: 'Pełny opis',
      type: 'richText',
      admin: {
        description: 'Szczegółowy opis na podstronie usługi',
      },
    },
    {
      name: 'icon',
      label: 'Ikona',
      type: 'text',
      admin: {
        description: 'Nazwa ikony Lucide (np. "ruler", "hammer", "paintbrush")',
      },
    },
    {
      name: 'image',
      label: 'Zdjęcie usługi',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'features',
      label: 'Cechy / Zalety',
      type: 'array',
      labels: {
        singular: 'Cecha',
        plural: 'Cechy',
      },
      admin: {
        description: 'Lista zalet wyświetlana przy usłudze',
      },
      fields: [
        {
          name: 'feature',
          label: 'Cecha',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Tytuł SEO',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Opis SEO',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'order',
      label: 'Kolejność',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Mniejsza liczba = wyżej na liście',
      },
    },
  ],
}
