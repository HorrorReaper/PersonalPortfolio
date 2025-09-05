import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
// rest of your config stays the same

import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import readingTime from 'reading-time'

const computedDate = {
  type: 'date',
  resolve: (doc: { date: string }) => new Date(doc.date),
} as const

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    stack: { type: 'list', of: { type: 'string' } },
    repoUrl: { type: 'string' },
    liveUrl: { type: 'string' },
    cover: { type: 'string' },
    featured: { type: 'boolean', default: false },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
  url: { type: 'string', resolve: (doc: any) => `/projects/${doc.slug}` },
    dateObj: computedDate,
    readingTime: {
      type: 'json',
  resolve: (doc: any) => readingTime(doc.body.raw),
    },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    cover: { type: 'string' },
    canonical: { type: 'string' },
    published: { type: 'boolean', default: true },
  },
  computedFields: {
  url: { type: 'string', resolve: (doc: any) => `/blog/${doc.slug}` },
    dateObj: computedDate,
    readingTime: {
      type: 'json',
  resolve: (doc: any) => readingTime(doc.body.raw),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
})
