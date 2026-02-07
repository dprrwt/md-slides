/**
 * Markdown Slides Parser
 * 
 * Parses markdown into slide objects with frontmatter support.
 * Slide separator: --- (horizontal rule)
 * Speaker notes: <!--notes: ... -->
 */

import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked with syntax highlighting
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  gfm: true,
  breaks: false,
});

/**
 * Parse frontmatter from markdown content
 * Supports YAML-like key: value pairs between --- delimiters at the start
 */
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, body: content };
  }
  
  const metadata = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      metadata[key] = value;
    }
  }
  
  return {
    metadata,
    body: content.slice(match[0].length),
  };
}

/**
 * Parse slide-level directives from comment syntax
 * <!-- class: classname -->
 * <!-- background: #hex or url -->
 * <!-- transition: fade|slide|zoom -->
 */
function parseSlideDirectives(slideContent) {
  const directives = {};
  const directiveRegex = /<!--\s*(class|background|transition|layout|align):\s*(.*?)\s*-->/g;
  let match;
  
  while ((match = directiveRegex.exec(slideContent)) !== null) {
    directives[match[1]] = match[2];
  }
  
  // Remove directive comments from content
  const cleanContent = slideContent.replace(directiveRegex, '').trim();
  
  return { directives, cleanContent };
}

/**
 * Extract speaker notes from <!-- notes: ... --> blocks
 */
function extractNotes(slideContent) {
  const notesRegex = /<!--\s*notes:\s*([\s\S]*?)\s*-->/;
  const match = slideContent.match(notesRegex);
  
  if (!match) {
    return { notes: '', content: slideContent };
  }
  
  return {
    notes: match[1].trim(),
    content: slideContent.replace(notesRegex, '').trim(),
  };
}

/**
 * Detect slide layout from content structure
 */
function detectLayout(htmlContent) {
  const hasH1 = /<h1[^>]*>/.test(htmlContent);
  const hasH2 = /<h2[^>]*>/.test(htmlContent);
  const hasOnlyHeading = /^<h[12][^>]*>.*<\/h[12]>\s*$/s.test(htmlContent.trim());
  const hasImage = /<img[^>]*>/.test(htmlContent);
  const hasCode = /<pre><code/.test(htmlContent);
  const hasList = /<[uo]l>/.test(htmlContent);
  const hasBlockquote = /<blockquote>/.test(htmlContent);
  
  if (hasOnlyHeading) return 'center';
  if (hasH1 && !hasH2) return 'title';
  if (hasBlockquote && !hasCode && !hasList) return 'quote';
  if (hasCode) return 'code';
  if (hasImage) return 'image';
  return 'default';
}

/**
 * Parse markdown content into an array of slide objects
 */
export function parseSlides(content) {
  const { metadata, body } = parseFrontmatter(content);
  
  // Split on --- that's on its own line (not inside code blocks)
  const rawSlides = splitSlides(body);
  
  const slides = rawSlides.map((raw, index) => {
    const { notes, content: withoutNotes } = extractNotes(raw);
    const { directives, cleanContent } = parseSlideDirectives(withoutNotes);
    const html = marked.parse(cleanContent);
    const layout = directives.layout || detectLayout(html);
    
    return {
      index,
      raw: cleanContent,
      html,
      notes,
      layout,
      directives,
    };
  });
  
  return { metadata, slides };
}

/**
 * Split markdown into slides by --- separator
 * Respects code blocks (doesn't split inside ```)
 */
function splitSlides(content) {
  const lines = content.split('\n');
  const slides = [];
  let current = [];
  let inCodeBlock = false;
  
  for (const line of lines) {
    // Track code block state
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }
    
    // Check for slide separator (--- on its own line, not in code block)
    if (!inCodeBlock && /^---\s*$/.test(line.trim()) && current.length > 0) {
      const slideContent = current.join('\n').trim();
      if (slideContent) {
        slides.push(slideContent);
      }
      current = [];
      continue;
    }
    
    current.push(line);
  }
  
  // Don't forget the last slide
  const lastSlide = current.join('\n').trim();
  if (lastSlide) {
    slides.push(lastSlide);
  }
  
  return slides;
}

export default { parseSlides, parseFrontmatter };
