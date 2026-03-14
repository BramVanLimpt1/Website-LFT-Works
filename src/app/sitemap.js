// @project
import { services } from '@/data/services';
import { projects } from '@/data/projects';

const baseUrl = process.env.NEXT_PUBLIC_METADATA_BASE || 'https://www.lft-works.nl';

/***************************  SITEMAP  ***************************/

export default function sitemap() {
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/over-ons`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/projecten`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 }
    // Note: /privacy-policy and /terms-conditions are excluded (noindex)
  ];

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/diensten/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projecten/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
