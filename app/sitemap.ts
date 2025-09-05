import type { MetadataRoute } from 'next'
import { allPosts, allProjects, Post, Project } from 'contentlayer/generated'

const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourname.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site}/`, lastModified: new Date() },
    { url: `${site}/projects`, lastModified: new Date() },
    { url: `${site}/blog`, lastModified: new Date() },
    { url: `${site}/about`, lastModified: new Date() },
    { url: `${site}/contact`, lastModified: new Date() },
  ]

  const projectRoutes = allProjects
    .filter((p: Project) => p.published)
    .map((p: Project) => ({
      url: `${site}${p.url}`,
      lastModified: new Date(p.date),
    }))

  const postRoutes = allPosts
    .filter((p: Post) => p.published)
    .map((p: Post) => ({
      url: `${site}${p.url}`,
      lastModified: new Date(p.date),
    }))

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}
