import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Nagłówek strony',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Menu nawigacyjne',
      type: 'array',
      maxRows: 8,
      labels: {
        singular: 'Pozycja menu',
        plural: 'Pozycje menu',
      },
      admin: {
        description: 'Linki widoczne w górnym pasku na każdej stronie + w menu mobilnym',
      },
      fields: [
        {
          name: 'label',
          label: 'Tekst',
          type: 'text',
          required: true,
          admin: {
            description: 'Tekst wyświetlany w menu, np. "O nas", "Realizacje"',
          },
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
          admin: {
            description: 'Adres docelowy, np. "/o-nas", "/realizacje", "#kontakt"',
          },
        },
        {
          name: 'newTab',
          label: 'Otwórz w nowej karcie',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'ctaButton',
      label: 'Przycisk CTA',
      type: 'group',
      admin: {
        description: 'Wyróżniony przycisk po prawej stronie menu na każdej stronie',
      },
      fields: [
        {
          name: 'label',
          label: 'Tekst przycisku',
          type: 'text',
          admin: {
            description: 'np. "Bezpłatna wycena"',
          },
        },
        {
          name: 'link',
          label: 'Link przycisku',
          type: 'text',
          admin: {
            description: 'np. "/kontakt"',
          },
        },
      ],
    },
  ],
}
