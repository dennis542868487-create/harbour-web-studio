import { defineConfig } from 'sanity'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Harbour Web Studio',
  projectId: 'c0t65y7a',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
})
