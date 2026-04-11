const fs = require('fs');
const path = require('path');

const DOMAIN = "https://dasabodha.omnnbc.in";
const POSTS_DIR = path.join(__dirname, 'posts');
const PAGES_FILE = path.join(__dirname, 'data', 'pages.json');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const today = new Date().toISOString().split('T')[0];
xml += `  <url><loc>${DOMAIN}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>\n`;

// Safely add Pages
if (fs.existsSync(PAGES_FILE)) {
    try {
        const pages = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8'));
        pages.forEach(page => {
            const cleanName = page.file.replace('.html', '');
            if (cleanName !== 'index') {
                xml += `  <url><loc>${DOMAIN}/${cleanName}</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>\n`;
            }
        });
    } catch (e) { console.log("Skipping pages.json due to error or missing file"); }
}

// Safely add Posts
if (fs.existsSync(POSTS_DIR)) {
    try {
        const files = fs.readdirSync(POSTS_DIR);
        files.forEach(file => {
            if (file.endsWith('.html') && file !== 'index.html') {
                const cleanName = file.replace('.html', '');
                xml += `  <url><loc>${DOMAIN}/${cleanName}</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>\n`;
            }
        });
    } catch (e) { console.log("Skipping posts folder due to error"); }
}

xml += `</urlset>`;

try {
    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log("✅ Sitemap generated!");
} catch (err) {
    console.error("❌ Failed to write file:", err);
    process.exit(1); // Tell GitHub it failed
}
