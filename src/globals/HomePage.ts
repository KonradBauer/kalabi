import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Strona główna',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─── HERO ───
        {
          label: 'Hero (Baner główny)',
          description: 'Duży baner na samej górze strony głównej - pierwsze co widzi odwiedzający',
          fields: [
            {
              name: 'hero',
              label: ' ',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'heading',
                  label: 'Nagłówek',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Duży, biały tekst na środku banera na górze strony głównej',
                  },
                },
                {
                  name: 'subheading',
                  label: 'Podtytuł',
                  type: 'textarea',
                  admin: {
                    description: 'Mniejszy tekst pod nagłówkiem na banerze',
                  },
                },
                {
                  name: 'slides',
                  label: 'Zdjęcia w tle (slideshow)',
                  type: 'array',
                  labels: {
                    singular: 'Zdjęcie',
                    plural: 'Zdjęcia',
                  },
                  admin: {
                    description: 'Zdjęcia przewijające się w tle banera na górze strony głównej. Dodaj 2-3 zdjęcia dla efektu slideshow',
                  },
                  fields: [
                    {
                      name: 'image',
                      label: 'Zdjęcie',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'ctaText',
                  label: 'Tekst przycisku głównego',
                  type: 'text',
                  admin: {
                    description: 'Złoty przycisk na banerze, np. "Bezpłatna wycena"',
                  },
                },
                {
                  name: 'ctaLink',
                  label: 'Link przycisku głównego',
                  type: 'text',
                  admin: {
                    description: 'Dokąd prowadzi złoty przycisk, np. "/kontakt"',
                  },
                },
                {
                  name: 'secondaryCtaText',
                  label: 'Tekst drugiego przycisku',
                  type: 'text',
                  admin: {
                    description: 'Przezroczysty przycisk obok głównego na banerze, np. "Zobacz realizacje"',
                  },
                },
                {
                  name: 'secondaryCtaLink',
                  label: 'Link drugiego przycisku',
                  type: 'text',
                  admin: {
                    description: 'Dokąd prowadzi drugi przycisk, np. "/realizacje"',
                  },
                },
              ],
            },
          ],
        },
        // ─── FILMY ───
        {
          label: 'Filmy',
          description:
            'Karuzela filmów pod banerem na stronie głównej. Pierwszy film odtwarza się automatycznie. Jeśli lista jest pusta, sekcja się nie wyświetla.',
          fields: [
            {
              name: 'videoSection',
              label: ' ',
              type: 'group',
              admin: { hideGutter: true },
              fields: [
                {
                  name: 'label',
                  label: 'Etykieta sekcji',
                  type: 'text',
                  admin: {
                    description:
                      'Mały złoty tekst nad nagłówkiem sekcji filmów na stronie głównej, np. "Nasze realizacje"',
                  },
                },
                {
                  name: 'heading',
                  label: 'Nagłówek',
                  type: 'text',
                  admin: {
                    description: 'Nagłówek sekcji filmów na stronie głównej',
                  },
                },
                {
                  name: 'videos',
                  label: 'Filmy',
                  type: 'array',
                  labels: {
                    singular: 'Film',
                    plural: 'Filmy',
                  },
                  admin: {
                    description:
                      'Filmy wyświetlane w karuzeli na stronie głównej. Pierwszy film odtwarza się automatycznie.',
                  },
                  fields: [
                    {
                      name: 'title',
                      label: 'Tytuł filmu',
                      type: 'text',
                      required: true,
                      admin: {
                        description: 'Wyświetlany pod filmem, np. "Kuchnia nowoczesna w bieli"',
                      },
                    },
                    {
                      name: 'url',
                      label: 'Link do filmu (YouTube / Vimeo)',
                      type: 'text',
                      required: true,
                      admin: {
                        description:
                          'Wklej link z YouTube lub Vimeo, np. https://www.youtube.com/watch?v=ABC123 lub https://vimeo.com/123456',
                      },
                    },
                    {
                      name: 'thumbnail',
                      label: 'Miniaturka',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        description:
                          'Własna miniaturka filmu. Jeśli puste, użyty zostanie kadr z YouTube/Vimeo.',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        // ─── USŁUGI ───
        {
          label: 'Usługi',
          description: 'Nagłówek sekcji usług na stronie głównej. Same usługi (karty) edytujesz w menu bocznym → Usługi',
          fields: [
            {
              name: 'servicesSection',
              label: ' ',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'label',
                  label: 'Etykieta sekcji',
                  type: 'text',
                  admin: {
                    description: 'Mały złoty tekst nad nagłówkiem, np. "Nasze usługi"',
                  },
                },
                {
                  name: 'heading',
                  label: 'Nagłówek',
                  type: 'text',
                  admin: {
                    description: 'Nagłówek sekcji usług na stronie głównej',
                  },
                },
                {
                  name: 'description',
                  label: 'Opis',
                  type: 'textarea',
                  admin: {
                    description: 'Tekst pod nagłówkiem sekcji usług na stronie głównej',
                  },
                },
              ],
            },
          ],
        },
        // ─── REALIZACJE ───
        {
          label: 'Realizacje',
          description: 'Nagłówek sekcji realizacji na stronie głównej. Same realizacje edytujesz w menu bocznym → Realizacje',
          fields: [
            {
              name: 'projectsSection',
              label: ' ',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'label',
                  label: 'Etykieta sekcji',
                  type: 'text',
                  admin: {
                    description: 'Mały złoty tekst nad nagłówkiem, np. "Nasze realizacje"',
                  },
                },
                {
                  name: 'heading',
                  label: 'Nagłówek',
                  type: 'text',
                  admin: {
                    description: 'Nagłówek sekcji realizacji na stronie głównej',
                  },
                },
                {
                  name: 'description',
                  label: 'Opis',
                  type: 'textarea',
                  admin: {
                    description: 'Tekst pod nagłówkiem sekcji realizacji na stronie głównej',
                  },
                },
                {
                  name: 'ctaText',
                  label: 'Tekst przycisku',
                  type: 'text',
                  admin: {
                    description: 'Przycisk pod realizacjami na stronie głównej, np. "Zobacz wszystkie realizacje"',
                  },
                },
                {
                  name: 'ctaLink',
                  label: 'Link przycisku',
                  type: 'text',
                  admin: {
                    description: 'np. "/realizacje"',
                  },
                },
              ],
            },
          ],
        },
        // ─── CTA BANNER ───
        {
          label: 'Baner CTA',
          description: 'Ciemny baner ze zdjęciem w tle między realizacjami a opiniami na stronie głównej',
          fields: [
            {
              name: 'ctaBanner',
              label: ' ',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'heading',
                  label: 'Nagłówek',
                  type: 'text',
                  admin: {
                    description: 'Duży biały tekst na banerze CTA, np. "Masz pomysł na meble? Porozmawiajmy!"',
                  },
                },
                {
                  name: 'description',
                  label: 'Opis',
                  type: 'textarea',
                  admin: {
                    description: 'Tekst pod nagłówkiem na banerze CTA',
                  },
                },
                {
                  name: 'backgroundImage',
                  label: 'Zdjęcie w tle',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Zdjęcie w tle ciemnego banera CTA na stronie głównej',
                  },
                },
                {
                  name: 'ctaText',
                  label: 'Tekst przycisku',
                  type: 'text',
                  admin: {
                    description: 'Przycisk na banerze CTA, np. "Skontaktuj się"',
                  },
                },
                {
                  name: 'ctaLink',
                  label: 'Link przycisku',
                  type: 'text',
                  admin: {
                    description: 'np. "/kontakt"',
                  },
                },
              ],
            },
          ],
        },
        // ─── OPINIE ───
        {
          label: 'Opinie',
          description: 'Nagłówek sekcji opinii na stronie głównej. Same opinie edytujesz w menu bocznym → Opinie',
          fields: [
            {
              name: 'testimonialsSection',
              label: ' ',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'label',
                  label: 'Etykieta sekcji',
                  type: 'text',
                  admin: {
                    description: 'Mały złoty tekst nad nagłówkiem, np. "Opinie klientów"',
                  },
                },
                {
                  name: 'heading',
                  label: 'Nagłówek',
                  type: 'text',
                  admin: {
                    description: 'Nagłówek sekcji opinii na stronie głównej',
                  },
                },
                {
                  name: 'description',
                  label: 'Opis',
                  type: 'textarea',
                  admin: {
                    description: 'Tekst pod nagłówkiem sekcji opinii na stronie głównej',
                  },
                },
              ],
            },
          ],
        },
        // ─── SEO ───
        {
          label: 'SEO',
          description: 'Jak strona główna wygląda w wynikach Google i przy udostępnianiu linków',
          fields: [
            {
              name: 'meta',
              label: ' ',
              type: 'group',
              admin: {
                hideGutter: true,
              },
              fields: [
                {
                  name: 'title',
                  label: 'Tytuł SEO',
                  type: 'text',
                  admin: {
                    description: 'Tytuł strony głównej w wynikach Google i na karcie przeglądarki',
                  },
                },
                {
                  name: 'description',
                  label: 'Opis SEO',
                  type: 'textarea',
                  admin: {
                    description: 'Opis pod tytułem w wynikach Google dla strony głównej',
                  },
                },
                {
                  name: 'image',
                  label: 'Obrazek udostępniania',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Wyświetlany przy udostępnianiu linku do strony głównej na Facebook/Messenger',
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
