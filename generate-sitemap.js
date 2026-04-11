const fs = require('fs-extra');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

const DOMAIN = "https://dasabodha.omnnbc.in";
const POSTS_DIR = path.join(__dirname, 'posts');
const PAGES_FILE = path.join(__dirname, 'data', 'pages.json');

async function generate() {
    try {
        const smStream = new SitemapStream({ hostname: DOMAIN });
        
        // 1. Add Homepage
        smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });

        // 2. Add Pages (About, Contact, etc.) from JSON
        if (await fs.pathExists(PAGES_FILE)) {
            const pages = await fs.readJson(PAGES_FILE);
            pages.forEach(page => {
                const slug = (page.id || page.file).replace('.html', '').toLowerCase();
                if (slug !== 'index') {
                    // Added trailing slash to match Clean URL standards
                    smStream.write({ url: `/${slug}/`, changefreq: 'monthly', priority: 0.9 });
                }
            });
        }

        // 3. Add Posts (Samasams) from folder
        if (await fs.pathExists(POSTS_DIR)) {
            const files = await fs.readdir(POSTS_DIR);
            files.forEach(file => {
                if (file.endsWith('.html') && file.toLowerCase() !== 'index.html') {
                    const slug = file.replace('.html', '').toLowerCase();
                    smStream.write({ url: `/${slug}/`, changefreq: 'monthly', priority: 0.8 });
                }
            });
        }

        smStream.end();

        // Convert stream to string and write to file
        const sitemapOutput = await streamToPromise(smStream);
        await fs.writeFile(path.join(__dirname, 'sitemap.xml'), sitemapOutput.toString());
        
        console.log("✅ Sitemap.xml generated successfully!");
    } catch (error) {
        console.error("❌ Error generating sitemap:", error);
        process.exit(1);
    }
}

// Execute the generation
generate();
