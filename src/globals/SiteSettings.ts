import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Ustawienia strony',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Ogólne',
          fields: [
            {
              name: 'siteName',
              label: 'Nazwa strony',
              type: 'text',
              required: true,
              defaultValue: 'Kalabi',
            },
            {
              name: 'siteDescription',
              label: 'Opis strony',
              type: 'textarea',
              admin: {
                description: 'Ogólny opis firmy - używany w metadanych i udostępnianiu',
              },
            },
            {
              name: 'siteUrl',
              label: 'Adres strony (URL)',
              type: 'text',
              required: true,
              admin: {
                description: 'Pełny adres, np. https://kalabi.pl - potrzebny do linków i SEO',
              },
            },
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Główne logo firmy - używane jako domyślne w nagłówku i stopce',
              },
            },
            {
              name: 'favicon',
              label: 'Favicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Mała ikona widoczna na karcie przeglądarki obok nazwy strony',
              },
            },
          ],
        },
        {
          label: 'Dane kontaktowe',
          description:
            'Jedno źródło prawdy — te dane wyświetlają się w pasku nad menu, w stopce, na stronie /kontakt i w kodzie SEO',
          fields: [
            {
              name: 'companyInfo',
              label: ' ',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'name',
                  label: 'Nazwa firmy',
                  type: 'text',
                  admin: {
                    description: 'Oficjalna nazwa firmy',
                  },
                },
                {
                  name: 'nip',
                  label: 'NIP',
                  type: 'text',
                },
                {
                  name: 'address',
                  label: 'Adres',
                  type: 'textarea',
                  admin: {
                    description:
                      'Wyświetlany na stronie /kontakt i w stopce',
                  },
                },
                {
                  name: 'phone',
                  label: 'Telefon',
                  type: 'text',
                  admin: {
                    description:
                      'Wyświetlany w pasku nad menu, w stopce i na stronie /kontakt. Kliknięcie uruchamia połączenie',
                  },
                },
                {
                  name: 'email',
                  label: 'E-mail',
                  type: 'email',
                  admin: {
                    description:
                      'Wyświetlany w pasku nad menu, w stopce i na stronie /kontakt. Kliknięcie otwiera program pocztowy',
                  },
                },
                {
                  name: 'googleMapsUrl',
                  label: 'Link do Google Maps',
                  type: 'text',
                  admin: {
                    description:
                      'Link "Otwórz w Mapach Google" pod mapą na stronie /kontakt',
                  },
                },
                {
                  name: 'socialLinks',
                  label: 'Media społecznościowe',
                  type: 'array',
                  labels: {
                    singular: 'Link',
                    plural: 'Linki',
                  },
                  admin: {
                    description:
                      'Ikony wyświetlane w pasku nad menu, w stopce i w menu mobilnym',
                  },
                  fields: [
                    {
                      name: 'platform',
                      label: 'Platforma',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'Pinterest', value: 'pinterest' },
                        { label: 'LinkedIn', value: 'linkedin' },
                      ],
                    },
                    {
                      name: 'url',
                      label: 'Adres URL',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Pełny link, np. https://www.facebook.com/...',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          description: 'Ustawienia widoczności w Google i przy udostępnianiu linków',
          fields: [
            {
              name: 'ogImage',
              label: 'Domyślny obrazek udostępniania',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Wyświetlany przy udostępnianiu linku do strony na Facebook/Messenger/WhatsApp',
              },
            },
            {
              name: 'seo',
              label: ' ',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'defaultTitle',
                  label: 'Domyślny tytuł SEO',
                  type: 'text',
                  admin: {
                    description: 'Wyświetlany w karcie przeglądarki i w wynikach Google gdy podstrona nie ma własnego tytułu',
                  },
                },
                {
                  name: 'titleTemplate',
                  label: 'Szablon tytułu',
                  type: 'text',
                  defaultValue: '%s | Kalabi',
                  admin: {
                    description: '%s zostanie zastąpione tytułem podstrony, np. "O nas | Kalabi"',
                  },
                },
                {
                  name: 'defaultDescription',
                  label: 'Domyślny opis SEO',
                  type: 'textarea',
                  admin: {
                    description: 'Opis pod tytułem w wynikach Google gdy podstrona nie ma własnego opisu',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
