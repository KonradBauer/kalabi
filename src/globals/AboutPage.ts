import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Podstrona O nas',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Nagłówek',
          description: 'Baner na górze strony /o-nas',
          fields: [
            {
              name: 'hero',
              label: ' ',
              type: 'group',
              admin: { hideGutter: true },
              fields: [
                {
                  name: 'heading',
                  label: 'Nagłówek',
                  type: 'text',
                  admin: {
                    description: 'Duży biały tekst na ciemnym banerze na górze strony /o-nas',
                  },
                },
                {
                  name: 'image',
                  label: 'Zdjęcie w tle',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Zdjęcie w tle ciemnego banera na górze strony /o-nas',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Zespół',
          description: 'Karty członków zespołu na stronie /o-nas - zdjęcie, imię, stanowisko i opis każdej osoby',
          fields: [
            {
              name: 'teamHeading',
              label: 'Nagłówek sekcji',
              type: 'text',
              admin: {
                description: 'Nagłówek nad kartami zespołu na stronie /o-nas',
              },
            },
            {
              name: 'teamDescription',
              label: 'Opis sekcji',
              type: 'textarea',
              admin: {
                description: 'Tekst pod nagłówkiem sekcji zespołu na stronie /o-nas',
              },
            },
            {
              name: 'team',
              label: 'Członkowie zespołu',
              type: 'array',
              labels: {
                singular: 'Osoba',
                plural: 'Osoby',
              },
              admin: {
                description: 'Osoby wyświetlane jako karty na stronie /o-nas',
              },
              fields: [
                {
                  name: 'name',
                  label: 'Imię i nazwisko',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'np. "Kamil Kujawski"',
                  },
                },
                {
                  name: 'role',
                  label: 'Stanowisko / Tytuł',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Tekst pod imieniem, np. "Stolarz", "Projektant wnętrz"',
                  },
                },
                {
                  name: 'description',
                  label: 'Opis',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'Opis osoby - doświadczenie, specjalizacja, pasja',
                  },
                },
                {
                  name: 'image',
                  label: 'Zdjęcie',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Zdjęcie osoby na karcie na stronie /o-nas',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          description: 'Jak strona /o-nas wygląda w wynikach Google',
          fields: [
            {
              name: 'meta',
              label: ' ',
              type: 'group',
              admin: { hideGutter: true },
              fields: [
                {
                  name: 'title',
                  label: 'Tytuł SEO',
                  type: 'text',
                  admin: {
                    description: 'Tytuł strony /o-nas w wynikach Google i na karcie przeglądarki',
                  },
                },
                {
                  name: 'description',
                  label: 'Opis SEO',
                  type: 'textarea',
                  admin: {
                    description: 'Opis pod tytułem w wynikach Google dla strony /o-nas',
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
