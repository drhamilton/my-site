import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/resume'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))

  // Only Projects with a Walkthrough get their own page (see generateStaticParams).
  const projectRoutes = getProjects()
    .filter((project) => project.hasWalkthrough)
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: project.date,
    }))

  return [...staticRoutes, ...projectRoutes]
}
