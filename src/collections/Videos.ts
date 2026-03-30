import path from 'path'
import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: {
    singular: 'Film',
    plural: 'Filmy',
  },
  admin: {
    useAsTitle: 'description',
    defaultColumns: ['description', 'order', 'createdAt'],
    description:
      'Filmy wyswietlane w karuzeli na stronie glownej. Przeslij plik wideo i dodaj opis.',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'description',
      label: 'Opis',
      type: 'text',
      required: true,
      admin: {
        description: 'Wyswietlany pod filmem w karuzeli na stronie glownej',
      },
    },
    {
      name: 'order',
      label: 'Kolejnosc',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Mniejsza liczba = wyzej w karuzeli',
      },
    },
    {
      name: 'thumbnail',
      label: 'Miniaturka',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Zdjecie wyswietlane jako podglad filmu w karuzeli. Jesli puste, pokaze ikone play.',
      },
    },
  ],
  upload: {
    staticDir: path.join(process.cwd(), 'public', 'videos'),
    mimeTypes: ['video/*'],
  },
}
