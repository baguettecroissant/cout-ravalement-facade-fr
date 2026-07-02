import type { APIRoute } from 'astro';
import { getAllDepartments, getDepartmentSlug } from '../lib/cities';

export const prerender = true; // Pre-rendered statically during build

export const GET: APIRoute = async ({ site }) => {
  const domain = site ? site.origin : 'https://cout-ravalement-facade.fr';
  const depts = getAllDepartments();

  const sitemaps = [
    `${domain}/sitemap/main.xml`,
    `${domain}/sitemap/guides.xml`,
    `${domain}/sitemap/materiaux.xml`,
    ...depts.map((d) => `${domain}/sitemap/dept-${d.code}.xml`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map((url) => `<sitemap><loc>${url}</loc></sitemap>`).join('\n  ')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
    }
  });
};
