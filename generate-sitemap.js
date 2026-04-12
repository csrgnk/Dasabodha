const fs = require('fs');
const globby = require('globby');

async function generate() {
    const baseUrl = 'https://dasabodha.omnnbc.in';

    // 1. First, find main index and static pages
    const mainPages = await globby([
        'index.html',
        'pages/*.html',
        '!404.html'
    ]);

    // 2. Then, find all posts
    const postPages = await globby([
        'posts/*.html'
    ]);

    // Combine them: Pages first, then Posts
    const allFiles = [...mainPages, ...postPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allFiles
        .map(file => {
            // Remove 'posts/', 'pages/', and '.html' to make it a Clean URL
            const path = file
                .replace('index.html', '')
                .replace('posts/', '')   
                .replace('pages/', '')   
                .replace('.html', '/')
                .replace(/\/$/, '/');    

            // Set higher priority for main pages (1.0 or 0.9) and lower for posts (0.8)
            const isPost = file.startsWith('posts/');
            const priority = (path === '' || !isPost) ? (path === '' ? '1.0' : '0.9') : '0.8';

            return `
    <url>
        <loc>${baseUrl}/${path}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${isPost ? 'weekly' : 'monthly'}</changefreq>
        <priority>${priority}</priority>
    </url>`;
        })
        .join('')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('Sitemap generated: Pages listed first!');
}

generate();
