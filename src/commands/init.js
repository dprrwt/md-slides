import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

function getSampleSlides(theme) {
  return [
    '---',
    'title: My Presentation',
    'author: Your Name',
    'theme: ' + theme,
    '---',
    '',
    '# Hello, World 👋',
    '',
    'Welcome to **md-slides**',
    '',
    '---',
    '',
    '## What is md-slides?',
    '',
    'A Markdown-to-slides converter that just works.',
    '',
    '- Write in **Markdown**',
    '- Present in the **browser**',
    '- Deploy anywhere as **static HTML**',
    '',
    '<!-- notes: This is the intro slide. Mention how easy it is to get started. -->',
    '',
    '---',
    '',
    '## Code Highlighting',
    '',
    '```javascript',
    '// Syntax highlighting works out of the box',
    'function fibonacci(n) {',
    '  if (n <= 1) return n;',
    '  return fibonacci(n - 1) + fibonacci(n - 2);',
    '}',
    '',
    'console.log(fibonacci(10)); // 55',
    '```',
    '',
    '---',
    '',
    '## Keyboard Shortcuts',
    '',
    '| Key | Action |',
    '|-----|--------|',
    '| ← → | Navigate slides |',
    '| S | Toggle speaker notes |',
    '| F | Fullscreen |',
    '| Home / End | First / Last slide |',
    '',
    '---',
    '',
    '> "The best presentations are the ones you barely have to think about making."',
    '',
    '---',
    '',
    '<!-- layout: center -->',
    '',
    '# Thank You! 🎉',
    '',
    '**@yourhandle** · yourwebsite.com',
  ].join('\n');
}

export function initProject(name, options = {}) {
  const dir = join(process.cwd(), name);
  const theme = options.theme || 'dark';

  if (existsSync(dir)) {
    console.log('\n  Warning: Directory "' + name + '" already exists.\n');
    process.exit(1);
  }

  mkdirSync(dir, { recursive: true });
  
  // Create slides.md
  writeFileSync(join(dir, 'slides.md'), getSampleSlides(theme));

  // Create .gitignore
  writeFileSync(join(dir, '.gitignore'), 'dist/\nnode_modules/\n');

  console.log([
    '',
    '  ✨ Created presentation: ' + name + '/',
    '',
    '  Files:',
    '    slides.md    Your presentation',
    '    .gitignore   Ignores dist/',
    '',
    '  Next steps:',
    '    cd ' + name,
    '    slides preview    Live preview with hot reload',
    '    slides build      Build to dist/',
    '',
    '  Edit slides.md and separate slides with ---',
    '',
  ].join('\n'));
}
