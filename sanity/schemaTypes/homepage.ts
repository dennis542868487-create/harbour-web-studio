import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3 }),
    defineField({ name: 'heroSupportingText', title: 'Hero Supporting Text', type: 'text', rows: 4 }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'faqIntro', title: 'FAQ Intro', type: 'text', rows: 3 }),
    defineField({ name: 'contactIntro', title: 'Contact Intro', type: 'text', rows: 3 }),
  ],
})
