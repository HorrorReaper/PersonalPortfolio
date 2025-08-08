import type { MetadataRoute } from 'next'
import { allPosts, allProjects } from 'contentlayer/generated'

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
    .filter(p => p.published)
    .map(p => ({
      url: `${site}${p.url}`,
      lastModified: new Date(p.date),
    }))

  const postRoutes = allPosts
    .filter(p => p.published)
    .map(p => ({
      url: `${site}${p.url}`,
      lastModified: new Date(p.date),
    }))

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}
