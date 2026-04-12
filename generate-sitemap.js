const fs = require('fs');
const globby = require('globby');

async function generate() {
    // Define your domain
    const baseUrl = 'https://dasabodha.omnnbc.in';

    // Find all HTML files in root and posts folder
    const pages = await globby([
        'index.html',
        'posts/*.html',
        'pages/*.html',
        '!404.html' // Exclude 404 page
    ]);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
        .map(page => {
            // Clean the path: remove .html and index.html
            const path = page
                .replace('index.html', '')
                .replace('.html', '/')
                .replace(/\/$/, '/'); // Ensure trailing slash
            
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
    console.log('Sitemap generated successfully!');
}

generate();
