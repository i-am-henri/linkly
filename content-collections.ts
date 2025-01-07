import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';

const posts = defineCollection({
  name: 'posts',
  directory: 'src/posts',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    const htmlDate = new Date(document.date);
    return {
      ...document,
      mdx,
      htmlDate,
    };
  },
});

const projects = defineCollection({
  name: 'projects',
  directory: 'src/projects',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    const htmlDate = new Date(document.date);
    return {
      ...document,
      mdx,
      htmlDate,
    };
  },
});

export default defineConfig({
  collections: [posts, projects],
});
