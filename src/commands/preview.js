import { readFileSync, existsSync, watch } from 'fs';
import { resolve, basename } from 'path';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { parseSlides } from '../parser.js';
import { renderHTML } from '../renderer.js';

export function previewSlides(file, options = {}) {
  const { port = '3000', theme } = options;
  const filePath = resolve(file);
  const httpPort = parseInt(port);
  const wsPort = httpPort + 1;

  if (!existsSync(filePath)) {
    console.log(`\n  ❌ File not found: ${file}\n`);
    process.exit(1);
  }

  function buildHTML() {
    const content = readFileSync(filePath, 'utf-8');
    const slidesData = parseSlides(content);
    return renderHTML(slidesData, {
      theme: theme || slidesData.metadata.theme || 'dark',
      title: slidesData.metadata.title || basename(file, '.md'),
      author: slidesData.metadata.author || '',
      liveReload: true,
    });
  }

  let html = buildHTML();

  // HTTP server
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });

  // WebSocket for live reload
  const wss = new WebSocketServer({ port: wsPort });

  // Watch for file changes
  let debounce = null;
  watch(filePath, () => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => {
      try {
        html = buildHTML();
        wss.clients.forEach(client => {
          if (client.readyState === 1) {
            client.send('reload');
          }
        });
        console.log('  🔄 Rebuilt — reloading...');
      } catch (err) {
        console.log(`  ⚠️  Build error: ${err.message}`);
      }
    }, 150);
  });

  server.listen(httpPort, () => {
    const url = `http://localhost:${httpPort}`;
    console.log(`
  🎬 Live preview running

  URL:   ${url}
  File:  ${filePath}

  Watching for changes...
  Press Ctrl+C to stop.
    `);

    // Try to open browser
    import('open').then(({ default: open }) => {
      open(url).catch(() => {});
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`\n  ❌ Port ${httpPort} is in use. Try: slides preview -p ${httpPort + 10}\n`);
      process.exit(1);
    }
    throw err;
  });
}
