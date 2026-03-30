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
    defaultColumns: ['filename', 'description', 'order'],
    description:
      'Filmy wyswietlane w karuzeli na stronie glownej. Przeslij plik wideo i dodaj opis.',
  },
  access: {
    read: () => true,
  },
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
  ],
  upload: {
    staticDir: path.join(process.cwd(), 'public', 'videos'),
    mimeTypes: ['video/*'],
  },
}
