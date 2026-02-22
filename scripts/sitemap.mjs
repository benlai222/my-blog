import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicDirectory = path.join(process.cwd(), 'public');

async function generateSitemap() {
    if (!fs.existsSync(postsDirectory)) {
        console.warn('Posts directory not found. Skipping sitemap generation.');
        return;
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-blog-domain.com';

    // Get all blog post URLs
    const postsUrls = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            return `
  <url>
    <loc>${siteUrl}/blog/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        }).join('');

    // Static pages (Root page)
    const staticPages = `
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages}
    ${postsUrls}
</urlset>`;

    if (!fs.existsSync(publicDirectory)) {
        fs.mkdirSync(publicDirectory, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), sitemapXml);
    console.log('✅ Sitemap generated successfully!');
}

generateSitemap();
