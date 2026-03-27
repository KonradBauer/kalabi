import type { CollectionConfig } from 'payload'

export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
  labels: {
    singular: 'Kategoria realizacji',
    plural: 'Kategorie realizacji',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Kategorie do grupowania realizacji (np. Kuchnie, Szafy, Łazienki)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nazwa kategorii',
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
        description: 'np. "kuchnie" - używany w adresie URL',
      },
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
    },
    {
      name: 'order',
      label: 'Kolejność',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Mniejsza liczba = wyżej na liście',
      },
    },
  ],
}
