import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Użytkownik',
    plural: 'Użytkownicy',
  },
  admin: {
    useAsTitle: 'email',
    description: 'Konta administratorów panelu CMS',
  },
  auth: true,
  fields: [],
}
