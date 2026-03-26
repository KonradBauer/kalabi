import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Strona',
    plural: 'Strony',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Podstrony serwisu (O nas, itp.)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł strony',
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
        description: 'np. "o-nas" → strona będzie pod adresem /o-nas',
      },
    },
    {
      name: 'hero',
      label: 'Sekcja Hero',
      type: 'group',
      admin: {
        description: 'Nagłówek widoczny na górze strony',
      },
      fields: [
        {
          name: 'heading',
          label: 'Nagłówek',
          type: 'text',
        },
        {
          name: 'subheading',
          label: 'Podtytuł',
          type: 'textarea',
        },
        {
          name: 'image',
          label: 'Zdjęcie w tle',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'content',
      label: 'Treść strony',
      type: 'richText',
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      admin: {
        description: 'Ustawienia widoczności w Google',
      },
      fields: [
        {
          name: 'title',
          label: 'Tytuł SEO',
          type: 'text',
          admin: {
            description: 'Tytuł wyświetlany w wynikach Google',
          },
        },
        {
          name: 'description',
          label: 'Opis SEO',
          type: 'textarea',
          admin: {
            description: 'Krótki opis wyświetlany w wynikach Google',
          },
        },
        {
          name: 'image',
          label: 'Obrazek udostępniania',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Wyświetlany przy udostępnianiu linku na FB/Messenger',
          },
        },
      ],
    },
  ],
}
