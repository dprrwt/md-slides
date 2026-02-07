#!/usr/bin/env node

import { Command } from 'commander';
import { initProject } from './commands/init.js';
import { buildSlides } from './commands/build.js';
import { previewSlides } from './commands/preview.js';
import { exportSlides } from './commands/export.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const program = new Command();

program
  .name('slides')
  .description('Convert Markdown to beautiful presentation slides')
  .version(pkg.version);

program
  .command('init [name]')
  .description('Create a new presentation from template')
  .option('-t, --theme <theme>', 'Theme: dark, light, minimal, neon', 'dark')
  .action((name, options) => {
    initProject(name || 'presentation', options);
  });

program
  .command('build [file]')
  .description('Build slides to static HTML')
  .option('-o, --output <dir>', 'Output directory', 'dist')
  .option('-t, --theme <theme>', 'Theme override')
  .action((file, options) => {
    buildSlides(file || 'slides.md', options);
  });

program
  .command('preview [file]')
  .alias('dev')
  .description('Live preview with hot reload')
  .option('-p, --port <port>', 'Port number', '3000')
  .option('-t, --theme <theme>', 'Theme override')
  .action((file, options) => {
    previewSlides(file || 'slides.md', options);
  });

program
  .command('export [file]')
  .description('Export to PDF')
  .option('-o, --output <file>', 'Output file', 'slides.pdf')
  .action((file, options) => {
    exportSlides(file || 'slides.md', options);
  });

program.parse();
