import fs from 'fs';
import path from 'path';
import http from 'http';
import puppeteer from 'puppeteer';

const PORT = 8080;
const DIST_DIR = path.resolve('dist');

// Simple static file server
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      // Basic static file serving with SPA fallback to index.html
      let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

      // Fallback for SPA routing (e.g. /download -> index.html)
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, 'index.html');
      }

      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.js') contentType = 'text/javascript';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      else if (ext === '.webp') contentType = 'image/webp';
      else if (ext === '.json') contentType = 'application/json';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading file');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(PORT, () => {
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('🚀 Starting pre-rendering server...');
  const server = await startServer();
  console.log(`📡 Server running at http://localhost:${PORT}`);

  console.log('🌐 Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const routes = ['/', '/download', '/capabilities', '/guide', '/thought-notes'];

  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`📸 Prerendering: ${url}...`);

    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait for react content to load
    await page.waitForSelector('#root');

    if (route !== '/thought-notes') {
      const metadata = await page.evaluate(() => {
      document.head.querySelectorAll('title').forEach((element, index) => {
        if (index > 0) element.remove();
      });
      for (const selector of [
        'meta[name="description"]',
        'meta[name="keywords"]',
        'meta[property^="og:"]',
        'meta[name^="twitter:"]',
        'link[rel="canonical"]',
      ]) {
        const elements = [...document.head.querySelectorAll(selector)];
        const key = (element) => element.getAttribute('name') || element.getAttribute('property') || element.getAttribute('rel');
        const kept = new Set();
        for (const element of elements.reverse()) {
          const name = key(element);
          if (kept.has(name)) element.remove();
          else kept.add(name);
        }
      }

      const canonical = document.head.querySelector('link[rel="canonical"]');
      const openGraphUrl = document.head.querySelector('meta[property="og:url"]');
      const twitterUrl = document.head.querySelector('meta[name="twitter:url"]');
      return {
        title: document.title,
        titleCount: document.head.querySelectorAll('title').length,
        descriptionCount: document.head.querySelectorAll('meta[name="description"]').length,
        canonicalCount: document.head.querySelectorAll('link[rel="canonical"]').length,
        canonical: canonical ? canonical.href : null,
        openGraphUrlCount: document.head.querySelectorAll('meta[property="og:url"]').length,
        openGraphUrl: openGraphUrl ? openGraphUrl.content : null,
        twitterUrlCount: document.head.querySelectorAll('meta[name="twitter:url"]').length,
        twitterUrl: twitterUrl ? twitterUrl.content : null,
      };
      });
      const expectedUrl = `https://ai-worker.tech${route === '/' ? '/' : `${route}/`}`;
      const expectedTitles = {
        '/': 'AI-Worker | Free MIT Open-Source Desktop AI Workspace',
        '/download': 'Download AI-Worker | Desktop AI Client for Mac, Windows & Linux',
        '/capabilities': 'AI-Worker Capabilities | Chat, Files & Browser Automation',
        '/guide': 'AI-Worker Setup Guide | Install, Configure Providers, and Use MCP Tools',
      };
      if (metadata.titleCount !== 1 || metadata.title !== expectedTitles[route] || metadata.descriptionCount !== 1
        || metadata.canonicalCount !== 1 || metadata.canonical !== expectedUrl
        || metadata.openGraphUrlCount !== 1 || metadata.openGraphUrl !== expectedUrl
        || metadata.twitterUrlCount !== 1 || metadata.twitterUrl !== expectedUrl) {
        throw new Error(`Prerender metadata is incomplete or duplicated for ${route}: ${JSON.stringify(metadata)}`);
      }
    }

    if (route === '/thought-notes') {
      const metadata = await page.evaluate(() => {
        const keepOne = (selector, matches) => {
          let kept = false;
          for (const element of document.head.querySelectorAll(selector)) {
            if (!kept && matches(element)) kept = true;
            else element.remove();
          }
          return document.head.querySelectorAll(selector).length;
        };

        const titleCount = keepOne('title', (element) => element.textContent === 'Thought Notes | AI Voice Notes for Android');
        const descriptionCount = keepOne('meta[name="description"]', (element) => element.content === 'AI voice notes for Android: capture by voice or text, transcribe English offline, and group notes into searchable topics with on-device AI. iPhone coming soon.');
        const canonicalCount = keepOne('link[rel="canonical"]', (element) => element.href === 'https://ai-worker.tech/thought-notes/');
        const openGraphTypeCount = keepOne('meta[property="og:type"]', (element) => element.content === 'website');
        const openGraphSiteNameCount = keepOne('meta[property="og:site_name"]', (element) => element.content === 'AI-Worker Tech');
        const openGraphTitleCount = keepOne('meta[property="og:title"]', (element) => element.content === 'Thought Notes | AI Voice Notes for Android');
        const openGraphDescriptionCount = keepOne('meta[property="og:description"]', (element) => element.content === 'AI voice notes for Android: capture by voice or text, transcribe English offline, and group notes into searchable topics with on-device AI. iPhone coming soon.');
        const openGraphUrlCount = keepOne('meta[property="og:url"]', (element) => element.content === 'https://ai-worker.tech/thought-notes/');
        const openGraphImageCount = keepOne('meta[property="og:image"]', (element) => element.content.endsWith('/images/thought-notes/play-store-feature-graphic.png'));
        const twitterCardCount = keepOne('meta[name="twitter:card"]', (element) => element.content === 'summary_large_image');
        const twitterUrlCount = keepOne('meta[name="twitter:url"]', (element) => element.content === 'https://ai-worker.tech/thought-notes/');
        const twitterTitleCount = keepOne('meta[name="twitter:title"]', (element) => element.content === 'Thought Notes | AI Voice Notes for Android');
        const twitterDescriptionCount = keepOne('meta[name="twitter:description"]', (element) => element.content === 'AI voice notes for Android: capture by voice or text, transcribe English offline, and group notes into searchable topics with on-device AI. iPhone coming soon.');
        const twitterImageCount = keepOne('meta[name="twitter:image"]', (element) => element.content.endsWith('/images/thought-notes/play-store-feature-graphic.png'));
        const twitterImageAltCount = keepOne('meta[name="twitter:image:alt"]', (element) => element.content === 'Thought Notes feature artwork with a gold crescent and star on a dark background.');
        document.head.querySelectorAll('meta[name="keywords"]').forEach((element) => element.remove());

        let appSchemaCount = 0;
        let appSchemaValid = false;
        for (const element of document.querySelectorAll('script[type="application/ld+json"]')) {
          try {
            const data = JSON.parse(element.textContent);
            const graph = data['@graph'];
            const app = graph && graph.find((entry) => entry['@type'] === 'MobileApplication' && entry.name === 'Thought Notes');
            if (app && appSchemaCount === 0) {
              appSchemaCount += 1;
              appSchemaValid = app.operatingSystem === 'Android'
                && app.downloadUrl === 'https://play.google.com/store/apps/details?id=com.meharaj.contextengine'
                && app.featureList.includes('Share a topic with an AI assistant and file its response back into related notes')
                && app.featureList.includes('Opt in to local task reminders for new notes');
            }
            else element.remove();
          } catch {
            element.remove();
          }
        }

        return {
          visibleCopy: document.body.innerText,
          titleCount,
          descriptionCount,
          canonicalCount,
          openGraphTypeCount,
          openGraphSiteNameCount,
          openGraphTitleCount,
          openGraphDescriptionCount,
          openGraphUrlCount,
          openGraphImageCount,
          twitterCardCount,
          twitterUrlCount,
          twitterTitleCount,
          twitterDescriptionCount,
          twitterImageCount,
          twitterImageAltCount,
          appSchemaCount,
          appSchemaValid: appSchemaValid ? 1 : 0,
        };
      });

      const { visibleCopy, ...metadataCounts } = metadata;
      if (Object.values(metadataCounts).some((count) => count !== 1)) {
        throw new Error(`Thought Notes prerender metadata is incomplete or duplicated: ${JSON.stringify(metadataCounts)}`);
      }
      const requiredCopy = [
        'Android now · iPhone coming soon',
        'Thought Notes is available on Google Play for Android phones.',
        'English voice transcription runs on your phone',
        'Share a topic with ChatGPT or another assistant',
        'Turn on reminders in Settings',
        'publisher analytics',
        'Store graphics prepared for Android.',
      ];
      const missingCopy = requiredCopy.filter((copy) => !visibleCopy.includes(copy));
      if (missingCopy.length) throw new Error(`Thought Notes prerender is missing required product copy: ${missingCopy.join('; ')}`);
    }

    // Get fully rendered HTML
    const html = await page.content();

    // Determine output file path
    let outputDir = DIST_DIR;
    let fileName = 'index.html';

    if (route !== '/') {
      outputDir = path.join(DIST_DIR, route.substring(1)); // strip leading slash
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
    }

    const outputPath = path.join(outputDir, fileName);
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`✅ Saved static page to: ${outputPath}`);
  }

  console.log('🧹 Cleaning up...');
  await browser.close();
  server.close();
  console.log('🎉 Pre-rendering completed successfully!');
}

prerender().catch(err => {
  console.error('❌ Pre-rendering failed:', err);
  process.exit(1);
});
