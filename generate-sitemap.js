const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, readdirSync, existsSync } = require('fs');
const { resolve } = require('path');

async function generate() {
  const sitemap = new SitemapStream({ hostname: 'https://dasabodha.omnnbc.in' });
  const writeStream = createWriteStream(resolve(__dirname, 'sitemap.xml'));

  sitemap.pipe(writeStream);

  // 1. ADD HOMEPAGE
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });

  // 2. SCAN PAGES FOLDER (Prioritized First)
  const pagesDir = resolve(__dirname, 'pages');
  if (existsSync(pagesDir)) {
    const pageFiles = readdirSync(pagesDir);
    pageFiles.forEach(file => {
      if (file.endsWith('.html') && file !== 'index.html') {
        const cleanPath = `/${file.replace('.html', '')}`;
        sitemap.write({ url: cleanPath, changefreq: 'monthly', priority: 0.9 });
      }
    });
    console.log('Successfully added Pages to sitemap.');
  }

  // 3. SCAN POSTS FOLDER (Added Second)
  const postsDir = resolve(__dirname, 'posts');
  if (existsSync(postsDir)) {
    const postFiles = readdirSync(postsDir);
    postFiles.forEach(file => {
      if (file.endsWith('.html') && file !== 'index.html') {
        const cleanPath = `/${file.replace('.html', '')}`;
        sitemap.write({ url: cleanPath, changefreq: 'weekly', priority: 0.8 });
      }
    });
    console.log('Successfully added Posts to sitemap.');
  }

  sitemap.end();
  await streamToPromise(sitemap);
  console.log('✅ sitemap.xml has been generated at the root directory.');
}

generate().catch(console.error);
