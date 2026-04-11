const fs = require('fs');
const path = require('path');

// Configuration for Dasabodha
const DOMAIN = "https://dasabodha.omnnbc.in";
const POSTS_DIR = path.join(__dirname, 'posts');
const PAGES_FILE = path.join(__dirname, 'data', 'pages.json');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// 1. Add Home Page
const today = new Date().toISOString().split('T')[0];
xml += `  <url><loc>${DOMAIN}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>\n`;

// 2. Add Pages from JSON (Clean URLs)
// This will add things like about, contact, etc.
if (fs.existsSync(PAGES_FILE)) {
    try {
        const pages = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8'));
        pages.forEach(page => {
            const cleanName = page.file.replace('.html', '');
            if (cleanName !== 'index') {
                xml += `  <url><loc>${DOMAIN}/${cleanName}</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>\n`;
            }
        });
    } catch (e) {
        console.error("❌ Error reading pages.json:", e);
    }
}

// 3. Add Posts from Folder (Clean URLs)
// This will add your spiritual posts
if (fs.existsSync(POSTS_DIR)) {
    const files = fs.readdirSync(POSTS_DIR);
    files.forEach(file => {
        if (file.endsWith('.html') && file !== 'index.html') {
            const cleanName = file.replace('.html', '');
            xml += `  <url><loc>${DOMAIN}/${cleanName}</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>\n`;
        }
    });
}

xml += `</urlset>`;

try {
    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log("✅ Success: dasabodha sitemap.xml generated!");
} catch (err) {
    console.error("❌ Error writing sitemap:", err);
}
