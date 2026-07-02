import type { APIRoute } from 'astro';
import { getCitiesByDepartment, getDepartmentByCode, getDepartmentSlug, getAllDepartments } from '../../lib/cities';
import { guidesList } from '../../data/guides-content';
import { materialsList } from '../../data/materials';

export const prerender = true; // Pre-rendered statically during build

export async function getStaticPaths() {
  const depts = getAllDepartments();
  return [
    { params: { id: 'main' } },
    { params: { id: 'guides' } },
    { params: { id: 'materiaux' } },
    ...depts.map((d) => ({ params: { id: `dept-${d.code}` } }))
  ];
}

export const GET: APIRoute = async ({ params, site }) => {
  const { id } = params;
  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const domain = site ? site.origin : 'https://cout-ravalement-facade.fr';
  const urls: string[] = [];

  if (id === 'main') {
    urls.push(`${domain}/`);
    urls.push(`${domain}/estimation`);
    urls.push(`${domain}/guides`);
    urls.push(`${domain}/materiaux`);
    urls.push(`${domain}/annuaire`);
    urls.push(`${domain}/faq`);
    urls.push(`${domain}/mentions-legales`);
  } else if (id === 'guides') {
    guidesList.forEach((g) => {
      urls.push(`${domain}/guides/${g.slug}`);
    });
  } else if (id === 'materiaux') {
    materialsList.forEach((m) => {
      urls.push(`${domain}/materiaux/${m.slug}`);
    });
  } else if (id.startsWith('dept-')) {
    const code = id.replace('dept-', '');
    const deptInfo = getDepartmentByCode(code);
    if (!deptInfo) {
      return new Response('Department Not Found', { status: 404 });
    }

    // Add the department index page
    urls.push(`${domain}/annuaire/${getDepartmentSlug(deptInfo.code, deptInfo.name)}`);

    // Add all cities in the department
    const cities = getCitiesByDepartment(code);
    cities.forEach((city) => {
      urls.push(`${domain}/ravalement/${city.slug}`);
    });
  } else {
    return new Response('Sitemap Not Found', { status: 404 });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((url) => `<url><loc>${url}</loc><changefreq>weekly</changefreq><priority>${url === domain + '/' ? '1.0' : '0.6'}</priority></url>`).join('\n  ')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
    }
  });
};
