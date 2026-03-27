import path from 'path'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Zdjęcie',
    plural: 'Zdjęcia',
  },
  admin: {
    description: 'Biblioteka zdjęć — przesyłaj zdjęcia realizacji, usług i inne',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Tekst alternatywny',
      type: 'text',
      required: true,
      admin: {
        description: 'Opis zdjęcia dla osób niewidomych i SEO',
      },
    },
  ],
  upload: {
    staticDir: path.join(process.cwd(), 'public', 'media'),
    staticURL: '/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
