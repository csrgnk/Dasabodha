const fs = require('fs');
const globby = require('globby');

async function generate() {
    const baseUrl = 'https://dasabodha.omnnbc.in';

    // Find all HTML files
    const pages = await globby([
        'index.html',
        'posts/*.html',
        'pages/*.html',
        '!404.html'
    ]);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
        .map(page => {
            // Remove 'posts/', 'pages/', and '.html' to make it a Clean URL
            const path = page
                .replace('index.html', '')
                .replace('posts/', '')   // Removes the posts folder name from URL
                .replace('pages/', '')   // Removes the pages folder name from URL
                .replace('.html', '/')
                .replace(/\/$/, '/');    // Ensures trailing slash

            return `
    <url>
        <loc>${baseUrl}/${path}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>`;
        })
        .join('')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('Sitemap generated successfully with Clean URLs!');
}

generate();
