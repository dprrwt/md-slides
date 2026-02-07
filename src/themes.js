/**
 * Built-in themes for md-slides
 * Each theme provides CSS variables and base styles
 */

const themes = {
  dark: {
    name: 'Dark',
    css: `
      :root {
        --bg: #0a0a0f;
        --bg-slide: #12121a;
        --fg: #e8e8f0;
        --fg-dim: #8888aa;
        --accent: #6c63ff;
        --accent-glow: rgba(108, 99, 255, 0.3);
        --code-bg: #1a1a2e;
        --code-border: #2a2a4a;
        --blockquote-border: #6c63ff;
        --link: #8b83ff;
        --font-heading: 'Inter', system-ui, sans-serif;
        --font-body: 'Inter', system-ui, sans-serif;
        --font-code: 'JetBrains Mono', 'Fira Code', monospace;
        --radius: 12px;
      }
    `,
  },

  light: {
    name: 'Light',
    css: `
      :root {
        --bg: #f5f5f7;
        --bg-slide: #ffffff;
        --fg: #1d1d1f;
        --fg-dim: #86868b;
        --accent: #0071e3;
        --accent-glow: rgba(0, 113, 227, 0.15);
        --code-bg: #f5f5f7;
        --code-border: #d2d2d7;
        --blockquote-border: #0071e3;
        --link: #0071e3;
        --font-heading: 'Inter', system-ui, sans-serif;
        --font-body: 'Inter', system-ui, sans-serif;
        --font-code: 'JetBrains Mono', 'Fira Code', monospace;
        --radius: 12px;
      }
    `,
  },

  minimal: {
    name: 'Minimal',
    css: `
      :root {
        --bg: #fafafa;
        --bg-slide: #ffffff;
        --fg: #222222;
        --fg-dim: #999999;
        --accent: #222222;
        --accent-glow: rgba(0, 0, 0, 0.05);
        --code-bg: #f6f6f6;
        --code-border: #eeeeee;
        --blockquote-border: #cccccc;
        --link: #444444;
        --font-heading: 'Georgia', serif;
        --font-body: 'Georgia', serif;
        --font-code: 'Menlo', 'Monaco', monospace;
        --radius: 4px;
      }
    `,
  },

  neon: {
    name: 'Neon',
    css: `
      :root {
        --bg: #000000;
        --bg-slide: #0a0a0a;
        --fg: #ffffff;
        --fg-dim: #666688;
        --accent: #00ff88;
        --accent-glow: rgba(0, 255, 136, 0.2);
        --code-bg: #0d0d1a;
        --code-border: #1a3a2a;
        --blockquote-border: #00ff88;
        --link: #00ccff;
        --font-heading: 'Inter', system-ui, sans-serif;
        --font-body: 'Inter', system-ui, sans-serif;
        --font-code: 'JetBrains Mono', 'Fira Code', monospace;
        --radius: 8px;
      }
    `,
  },
};

export const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    overflow: hidden;
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Slide Container */
  .deck {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8vh 10vw;
    background: var(--bg-slide);
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    pointer-events: none;
    overflow-y: auto;
  }

  .slide.active {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
    z-index: 1;
  }

  .slide.prev {
    opacity: 0;
    transform: translateX(-40px);
  }

  /* Layouts */
  .slide.layout-center {
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .slide.layout-title {
    justify-content: center;
  }

  .slide.layout-title h1 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    margin-bottom: 1rem;
  }

  .slide.layout-quote {
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10vh 15vw;
  }

  .slide.layout-code {
    justify-content: center;
  }

  .slide.layout-image {
    align-items: center;
    justify-content: center;
  }

  .slide.layout-image img {
    max-width: 80%;
    max-height: 70vh;
    border-radius: var(--radius);
  }

  /* Typography */
  h1 {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 0.8em;
    background: linear-gradient(135deg, var(--fg), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-bottom: 0.6em;
    color: var(--accent);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    font-weight: 600;
    margin-bottom: 0.5em;
    color: var(--fg);
  }

  p {
    font-size: clamp(1rem, 1.8vw, 1.4rem);
    line-height: 1.7;
    margin-bottom: 0.8em;
    color: var(--fg-dim);
  }

  strong {
    color: var(--fg);
    font-weight: 600;
  }

  em {
    color: var(--accent);
    font-style: italic;
  }

  a {
    color: var(--link);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  a:hover {
    border-bottom-color: var(--link);
  }

  /* Lists */
  ul, ol {
    font-size: clamp(1rem, 1.6vw, 1.3rem);
    line-height: 1.8;
    padding-left: 1.5em;
    margin-bottom: 1em;
    color: var(--fg-dim);
  }

  li {
    margin-bottom: 0.4em;
  }

  li::marker {
    color: var(--accent);
  }

  /* Code */
  code {
    font-family: var(--font-code);
    font-size: 0.85em;
    background: var(--code-bg);
    border: 1px solid var(--code-border);
    padding: 0.15em 0.4em;
    border-radius: 4px;
    color: var(--accent);
  }

  pre {
    margin: 1em 0;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--code-border);
  }

  pre code {
    display: block;
    padding: 1.5em 2em;
    background: var(--code-bg);
    border: none;
    font-size: clamp(0.8rem, 1.2vw, 1rem);
    line-height: 1.6;
    overflow-x: auto;
    color: var(--fg);
  }

  /* Blockquotes */
  blockquote {
    border-left: 4px solid var(--blockquote-border);
    padding: 1em 1.5em;
    margin: 1em 0;
    background: var(--accent-glow);
    border-radius: 0 var(--radius) var(--radius) 0;
  }

  blockquote p {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    font-style: italic;
    color: var(--fg);
    margin-bottom: 0;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: clamp(0.85rem, 1.3vw, 1.1rem);
  }

  th, td {
    padding: 0.75em 1em;
    text-align: left;
    border-bottom: 1px solid var(--code-border);
  }

  th {
    font-weight: 600;
    color: var(--accent);
  }

  td {
    color: var(--fg-dim);
  }

  /* Images */
  img {
    max-width: 100%;
    border-radius: var(--radius);
  }

  /* Progress bar */
  .progress {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--accent);
    transition: width 0.4s ease;
    z-index: 100;
    box-shadow: 0 0 10px var(--accent-glow);
  }

  /* Slide number */
  .slide-number {
    position: fixed;
    bottom: 16px;
    right: 24px;
    font-family: var(--font-code);
    font-size: 0.8rem;
    color: var(--fg-dim);
    opacity: 0.5;
    z-index: 100;
  }

  /* Presenter notes toggle */
  .notes-overlay {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.9);
    color: #ccc;
    padding: 1.5em 2em;
    font-size: 0.9rem;
    line-height: 1.6;
    z-index: 200;
    max-height: 30vh;
    overflow-y: auto;
    border-top: 2px solid var(--accent);
  }

  .notes-overlay.visible {
    display: block;
  }

  /* Keyboard hint */
  .hint {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-code);
    font-size: 0.75rem;
    color: var(--fg-dim);
    opacity: 0;
    transition: opacity 0.5s;
    z-index: 100;
  }

  .hint.visible {
    opacity: 0.4;
  }

  /* Print / PDF */
  @media print {
    .slide {
      position: relative;
      opacity: 1;
      transform: none;
      page-break-after: always;
      min-height: 100vh;
    }
    .progress, .slide-number, .hint, .notes-overlay {
      display: none;
    }
  }

  /* Animations */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .slide.active h1,
  .slide.active h2,
  .slide.active h3 {
    animation: fadeInUp 0.6s ease forwards;
  }

  .slide.active p,
  .slide.active ul,
  .slide.active ol,
  .slide.active pre,
  .slide.active blockquote,
  .slide.active table {
    animation: fadeInUp 0.6s ease 0.15s forwards;
    opacity: 0;
  }
`;

export function getTheme(name) {
  const theme = themes[name] || themes.dark;
  return theme.css;
}

export function getThemeNames() {
  return Object.keys(themes);
}

export default themes;
