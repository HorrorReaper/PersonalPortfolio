// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
var computedDate = {
  type: "date",
  resolve: (doc) => new Date(doc.date)
};
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    stack: { type: "list", of: { type: "string" } },
    repoUrl: { type: "string" },
    liveUrl: { type: "string" },
    cover: { type: "string" },
    featured: { type: "boolean", default: false },
    published: { type: "boolean", default: true }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/projects/${doc.slug}` },
    dateObj: computedDate,
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    cover: { type: "string" },
    canonical: { type: "string" },
    published: { type: "boolean", default: true }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/blog/${doc.slug}` },
    dateObj: computedDate,
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }]
    ]
  }
});
export {
  Post,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-O3NXSHG4.mjs.map
