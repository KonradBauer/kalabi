import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Realizacja',
    plural: 'Realizacje',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
    description: 'Wyróżnione realizacje pojawiają się na stronie głównej. Wszystkie widoczne na /realizacje',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Nazwa realizacji',
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
        description: 'np. "kuchnia-nowoczesna" → /realizacje/kuchnia-nowoczesna',
      },
    },
    {
      name: 'category',
      label: 'Kategoria',
      type: 'relationship',
      relationTo: 'project-categories',
      required: true,
    },
    {
      name: 'featured',
      label: 'Wyróżniona',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Pokaż na stronie głównej',
      },
    },
    {
      name: 'description',
      label: 'Krótki opis',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Widoczny na karcie realizacji i na górze podstrony',
      },
    },
    {
      name: 'content',
      label: 'Szczegółowy opis',
      type: 'richText',
    },
    {
      name: 'mainImage',
      label: 'Zdjęcie główne',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Wyświetlane na karcie realizacji i jako hero',
      },
    },
    {
      name: 'gallery',
      label: 'Galeria zdjęć',
      type: 'array',
      labels: {
        singular: 'Zdjęcie',
        plural: 'Zdjęcia',
      },
      admin: {
        description: 'Dodatkowe zdjęcia realizacji',
      },
      fields: [
        {
          name: 'image',
          label: 'Zdjęcie',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Podpis',
          type: 'text',
        },
      ],
    },
    {
      name: 'details',
      label: 'Szczegóły projektu',
      type: 'group',
      admin: {
        description: 'Informacje wyświetlane w bocznym panelu realizacji',
      },
      fields: [
        {
          name: 'client',
          label: 'Klient',
          type: 'text',
        },
        {
          name: 'location',
          label: 'Lokalizacja',
          type: 'text',
        },
        {
          name: 'year',
          label: 'Rok realizacji',
          type: 'text',
        },
        {
          name: 'scope',
          label: 'Zakres prac',
          type: 'text',
        },
        {
          name: 'materials',
          label: 'Materiały',
          type: 'text',
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
        {
          name: 'image',
          label: 'Obrazek udostępniania',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'order',
      label: 'Kolejność',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Mniejsza liczba = wyżej na liście',
      },
    },
  ],
}
