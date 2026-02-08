# md-slides

[![npm version](https://img.shields.io/npm/v/md-slides.svg)](https://www.npmjs.com/package/md-slides)
[![license](https://img.shields.io/npm/l/md-slides.svg)](https://github.com/dprrwt/md-slides/blob/master/LICENSE)

> Convert Markdown to beautiful presentation slides. Zero config, developer-friendly.

Write your presentation in **Markdown**, present it in the **browser**, deploy it anywhere as **static HTML**.

## ✨ Features

- **Markdown-first** — Write slides in your editor, not a GUI
- **4 built-in themes** — Dark, Light, Minimal, Neon
- **Live preview** — Hot reload as you edit
- **Keyboard navigation** — Arrow keys, vim keys, touch/swipe
- **Speaker notes** — Hidden notes with toggle (press `S`)
- **Code highlighting** — Syntax highlighting for 190+ languages
- **Smart layouts** — Auto-detects title slides, code slides, quote slides
- **Responsive** — Scales to any screen, including mobile
- **Zero dependencies at runtime** — Output is a single HTML file
- **Frontmatter** — Set title, author, theme per file

## 📦 Install

```bash
npm install -g md-slides
```

Or use directly:

```bash
npx md-slides init my-talk
```

## 🚀 Quick Start

```bash
# Create a new presentation
slides init my-talk

# Enter the directory
cd my-talk

# Start live preview
slides preview

# Build static HTML
slides build
```

## 📝 Writing Slides

Separate slides with `---` on its own line:

```markdown
---
title: My Talk
author: Your Name
theme: dark
---

# Hello World

Welcome to my presentation.

---

## Agenda

- First topic
- Second topic  
- Third topic

---

## Code Example

\```javascript
const greeting = "Hello, slides!";
console.log(greeting);
\```

---

> "Great quote goes here."

---

# Thank You! 🎉
```

### Frontmatter

Set metadata at the top of your file:

```yaml
---
title: My Presentation
author: Your Name
theme: dark
---
```

### Speaker Notes

Add hidden notes with HTML comments:

```markdown
## My Slide

Content here.

<!-- notes: Remember to mention the demo. -->
```

Press `S` during presentation to toggle notes.

### Slide Directives

Control individual slides with comments:

```markdown
<!-- class: custom-class -->
<!-- background: #1a1a2e -->
<!-- layout: center -->

# Centered Slide
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `↓` `Space` `L` `J` | Next slide |
| `←` `↑` `H` `K` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `S` or `N` | Toggle speaker notes |
| `F` | Toggle fullscreen |
| `Esc` | Close notes |

Touch: swipe left/right on mobile.

Click: right half → next, left half → previous.

## 🎨 Themes

| Theme | Description |
|-------|-------------|
| `dark` | Deep purple-black with violet accents (default) |
| `light` | Clean Apple-inspired with blue accents |
| `minimal` | Serif typography, understated elegance |
| `neon` | Pure black with electric green highlights |

Set via frontmatter (`theme: neon`) or CLI flag (`--theme neon`).

## 📂 Commands

### `slides init [name]`

Create a new presentation with sample content.

```bash
slides init my-talk
slides init my-talk --theme light
```

### `slides preview [file]`

Live preview with hot reload. Opens browser automatically.

```bash
slides preview                  # defaults to slides.md
slides preview deck.md -p 8080  # custom file and port
```

### `slides build [file]`

Build to a single static HTML file.

```bash
slides build                    # outputs to dist/index.html
slides build -o public          # custom output directory
slides build deck.md --theme neon
```

### `slides export [file]`

Export to PDF (uses browser print).

```bash
slides export
```

## 🚀 Deploying

The build output is a **single `index.html`** file — deploy anywhere:

### GitHub Pages

```bash
slides build
cd dist
git init
git add .
git commit -m "deploy slides"
git branch -M gh-pages
git remote add origin https://github.com/you/your-talk.git
git push -u origin gh-pages
```

### Netlify / Vercel

Point to the `dist/` folder.

### Just Share

Send the `dist/index.html` file directly — it's self-contained.

## 📄 License

MIT © [Deepankar Rawat](https://dprrwt.me)
