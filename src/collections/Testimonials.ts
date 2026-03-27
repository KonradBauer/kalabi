import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Opinia',
    plural: 'Opinie',
  },
  admin: {
    useAsTitle: 'author',
    description: 'Wyróżnione opinie pojawiają się w sliderze na stronie głównej (sekcja "Opinie")',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'author',
      label: 'Imię i nazwisko',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Rola / Lokalizacja',
      type: 'text',
      admin: {
        description: 'np. "Właściciel domu, Pajęczno"',
      },
    },
    {
      name: 'content',
      label: 'Treść opinii',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      label: 'Ocena',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Ocena od 1 do 5 gwiazdek',
      },
    },
    {
      name: 'project',
      label: 'Powiązana realizacja',
      type: 'relationship',
      relationTo: 'projects',
      admin: {
        description: 'Opcjonalnie - która realizacja dotyczy tej opinii',
      },
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
