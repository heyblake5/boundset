import { SITE, UPDATED, PAGES } from './content'
const xml = (b) => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${b}`, { headers: { 'Content-Type': 'application/xml' } })
export const urlset = (group) => xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.filter((p) => p.group === group).map((p) => `<url><loc>${SITE}${p.path}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}\n</urlset>`)
export const index = () => xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['pages', 'content'].map((g) => `<sitemap><loc>${SITE}/sitemap-${g}.xml</loc><lastmod>${UPDATED}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>`)
