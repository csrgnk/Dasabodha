const fs = require('fs');
const path = require('path');

const DOMAIN = "https://dasabodha.omnnbc.in";
const POSTS_DIR = path.join(__dirname, 'posts');
const PAGES_FILE = path.join(__dirname, 'data', 'pages.json');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const today = new Date().toISOString().split('T')[0];

// 🏠 Add Home
xml += `  <url><loc>${DOMAIN}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>\n`;

const addedUrls = new Set(); // To prevent duplicates

// 📄 Safely add Pages (About, Contact, etc.)
if (fs.existsSync(PAGES_FILE)) {
    try {
        const pages = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8'));
        pages.forEach(page => {
            // Use 'id' or 'file' to determine the slug
            const slug = (page.id || page.file).replace('.html', '').toLowerCase();
            if (slug !== 'index' && !addedUrls.has(slug)) {
                xml += `  <url><loc>${DOMAIN}/${slug}/</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>\n`;
                addedUrls.add(slug);
            }
        });
    } catch (e) { console.log("Skipping pages.json due to error."); }
}

// ✍️ Safely add Posts (Samasams)
if (fs.existsSync(POSTS_DIR)) {
    try {
        const files = fs.readdirSync(POSTS_DIR);
        files.forEach(file => {
            if (file.endsWith('.html') && file.toLowerCase() !== 'index.html') {
                const slug = file.replace('.html', '').toLowerCase();
                if (!addedUrls.has(slug)) {
                    // Added trailing slash to match clean URL standard
                    xml += `  <url><loc>${DOMAIN}/${slug}/</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>\n`;
                    addedUrls.add(slug);
                }
            }
        });
    } catch (e) { console.log("Skipping posts folder due to error."); }
}

xml += `</urlset>`;

try {
    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log("✅ Sitemap generated successfully with " + addedUrls.size + " links!");
} catch (err) {
    console.error("❌ Failed to write sitemap file:", err);
    process.exit(1);
}
