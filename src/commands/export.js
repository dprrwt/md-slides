import { readFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';

export function exportSlides(file, options = {}) {
  console.log(`
  📄 PDF Export

  For now, use the browser's Print to PDF:
  
  1. Run: slides preview ${file}
  2. Open the URL in Chrome
  3. Press Ctrl+P (or Cmd+P)
  4. Select "Save as PDF"
  5. Set Layout to "Landscape"
  
  Native PDF export coming in a future version.
  `);
}
