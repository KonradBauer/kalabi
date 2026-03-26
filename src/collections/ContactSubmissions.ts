import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Wiadomość',
    plural: 'Wiadomości z formularza',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'read', 'createdAt'],
    description: 'Wiadomości wysłane przez formularz kontaktowy na stronie',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      label: 'Imię i nazwisko',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Adres e-mail',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Telefon',
      type: 'text',
    },
    {
      name: 'subject',
      label: 'Temat',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      label: 'Wiadomość',
      type: 'textarea',
      required: true,
    },
    {
      name: 'read',
      label: 'Przeczytana',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Zaznacz po przeczytaniu wiadomości',
      },
    },
  ],
}
