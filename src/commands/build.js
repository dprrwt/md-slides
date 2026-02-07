import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, basename } from 'path';
import { parseSlides } from '../parser.js';
import { renderHTML } from '../renderer.js';

export function buildSlides(file, options = {}) {
  const { output = 'dist', theme } = options;
  const filePath = resolve(file);

  if (!existsSync(filePath)) {
    console.log(`\n  ❌ File not found: ${file}\n`);
    process.exit(1);
  }

  const content = readFileSync(filePath, 'utf-8');
  const slidesData = parseSlides(content);
  
  const buildOptions = {
    theme: theme || slidesData.metadata.theme || 'dark',
    title: slidesData.metadata.title || basename(file, '.md'),
    author: slidesData.metadata.author || '',
    liveReload: false,
  };

  const html = renderHTML(slidesData, buildOptions);

  // Create output directory
  const outputDir = resolve(output);
  mkdirSync(outputDir, { recursive: true });

  const outputFile = join(outputDir, 'index.html');
  writeFileSync(outputFile, html);

  console.log(`
  ✅ Built ${slidesData.slides.length} slides → ${outputFile}

  Theme: ${buildOptions.theme}
  Title: ${buildOptions.title}

  Open in browser or deploy to GitHub Pages.
  `);
}
