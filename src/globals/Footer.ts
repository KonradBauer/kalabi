import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Stopka strony',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      label: 'Opis firmy',
      type: 'textarea',
      admin: {
        description: 'Tekst pod logo w stopce na dole każdej strony',
      },
    },
    {
      name: 'columns',
      label: 'Kolumny z linkami',
      type: 'array',
      maxRows: 4,
      labels: {
        singular: 'Kolumna',
        plural: 'Kolumny',
      },
      admin: {
        description: 'Kolumny linków w środkowej części stopki (np. "Usługi", "Firma")',
      },
      fields: [
        {
          name: 'title',
          label: 'Tytuł kolumny',
          type: 'text',
          required: true,
          admin: {
            description: 'Nagłówek nad linkami w stopce, np. "Usługi", "Firma"',
          },
        },
        {
          name: 'links',
          label: 'Linki',
          type: 'array',
          labels: {
            singular: 'Link',
            plural: 'Linki',
          },
          fields: [
            {
              name: 'label',
              label: 'Tekst linku',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              label: 'Adres URL',
              type: 'text',
              required: true,
            },
            {
              name: 'newTab',
              label: 'Otwórz w nowej karcie',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'copyrightText',
      label: 'Tekst praw autorskich',
      type: 'text',
      admin: {
        description: 'Tekst na samym dole strony, np. "© 2026 Kalabi. Wszelkie prawa zastrzeżone."',
      },
    },
  ],
}
