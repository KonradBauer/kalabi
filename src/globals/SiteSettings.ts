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
                description: 'Ogólny opis firmy — używany w metadanych i udostępnianiu',
              },
            },
            {
              name: 'siteUrl',
              label: 'Adres strony (URL)',
              type: 'text',
              required: true,
              admin: {
                description: 'Pełny adres, np. https://kalabi.pl — potrzebny do linków i SEO',
              },
            },
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Główne logo firmy — używane jako domyślne w nagłówku i stopce',
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
          description: 'Te dane wyświetlają się na stronie /kontakt oraz mogą być używane w stopce',
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
                    description: 'Wyświetlany na stronie /kontakt w sekcji "Dane kontaktowe"',
                  },
                },
                {
                  name: 'phone',
                  label: 'Telefon',
                  type: 'text',
                  admin: {
                    description: 'Wyświetlany na stronie /kontakt — kliknięcie uruchamia połączenie',
                  },
                },
                {
                  name: 'email',
                  label: 'E-mail',
                  type: 'email',
                  admin: {
                    description: 'Wyświetlany na stronie /kontakt — kliknięcie otwiera program pocztowy',
                  },
                },
                {
                  name: 'googleMapsUrl',
                  label: 'Link do Google Maps',
                  type: 'text',
                  admin: {
                    description: 'Link "Otwórz w Mapach Google" pod mapą na stronie /kontakt. Wklej zwykły link z Google Maps. Mapa generuje się automatycznie z adresu powyżej',
                  },
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
