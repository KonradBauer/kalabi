import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Stopka strony',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Logo widoczne w stopce na dole każdej strony',
      },
    },
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
      name: 'contactInfo',
      label: 'Dane kontaktowe w stopce',
      type: 'group',
      admin: {
        description: 'Adres, telefon i email widoczne w prawej części stopki na dole każdej strony',
      },
      fields: [
        {
          name: 'address',
          label: 'Adres',
          type: 'textarea',
        },
        {
          name: 'phone',
          label: 'Telefon',
          type: 'text',
        },
        {
          name: 'email',
          label: 'E-mail',
          type: 'email',
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Media społecznościowe',
      type: 'array',
      labels: {
        singular: 'Profil',
        plural: 'Profile społecznościowe',
      },
      admin: {
        description: 'Ikony social media widoczne w stopce na dole każdej strony',
      },
      fields: [
        {
          name: 'platform',
          label: 'Platforma',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          label: 'Adres URL profilu',
          type: 'text',
          required: true,
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
