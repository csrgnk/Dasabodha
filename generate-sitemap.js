const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, readdirSync } = require('fs');
const { resolve } = require('path');

async function generate() {
  const sitemap = new SitemapStream({ hostname: 'https://dasabodha.omnnbc.in' });
  const writeStream = createWriteStream(resolve(__dirname, 'sitemap.xml'));

  sitemap.pipe(writeStream);

  // Home Page
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });

  // Scan Posts Folder for Clean URLs
  try {
    const postsDir = resolve(__dirname, 'posts');
    const files = readdirSync(postsDir);

    files.forEach(file => {
      if (file.endsWith('.html') && file !== 'index.html') {
        const cleanURL = `/${file.replace('.html', '')}`;
        sitemap.write({ url: cleanURL, changefreq: 'weekly', priority: 0.8 });
      }
    });
  } catch (err) {
    console.log("Posts folder not found, skipping specific posts.");
  }

  sitemap.end();
  await streamToPromise(sitemap);
  console.log('✅ sitemap.xml created successfully at the root!');
}

generate();
