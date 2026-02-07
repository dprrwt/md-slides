---
title: md-slides Demo
author: Deepankar Rawat
theme: dark
---

# md-slides ✨

Markdown → Beautiful Slides

*Zero config. Developer-friendly.*

---

## Why md-slides?

- **Write in Markdown** — your editor, your flow
- **4 themes** — Dark, Light, Minimal, Neon
- **Live reload** — see changes instantly
- **Single HTML output** — deploy anywhere
- **Speaker notes** — press `S` to toggle

<!-- notes: This tool exists because making slides should be as easy as writing markdown. -->

---

## Getting Started

```bash
# Install globally
npm install -g @dprrwt/slides

# Create a new presentation
slides init my-talk

# Start editing and previewing
cd my-talk
slides preview
```

---

## Slide Syntax

Separate slides with `---` on its own line:

```markdown
# Title Slide

Content here.

---

## Next Slide

More content.

---

> A quote slide.
```

---

## Code Highlighting

190+ languages supported out of the box:

```typescript
interface Slide {
  html: string;
  notes: string;
  layout: 'title' | 'center' | 'code' | 'quote';
}

function present(slides: Slide[]): void {
  slides.forEach((slide, i) => {
    render(slide, { index: i, total: slides.length });
  });
}
```

---

## Smart Layouts

Slides auto-detect their layout:

| Content | Layout |
|---------|--------|
| Just a heading | **Center** |
| H1 with content | **Title** |
| Blockquote | **Quote** |
| Code block | **Code** |
| Everything else | **Default** |

---

> "The best presentations are written, not designed."

<!-- notes: This is a quote slide — detected automatically from the blockquote. -->

---

## Themes

Set via frontmatter or CLI:

```yaml
---
theme: neon
---
```

```bash
slides build --theme light
slides preview --theme minimal
```

**Built-in:** `dark` · `light` · `minimal` · `neon`

---

## Speaker Notes

Add notes with HTML comments:

```markdown
## My Slide

Content visible to audience.

<!-- notes: Only you can see this. Press S. -->
```

Press **S** now to see the notes panel →

<!-- notes: 👋 You found the notes! These are only visible to the presenter. Use them for talking points, reminders, or timing cues. -->

---

## Navigation

| Key | Action |
|-----|--------|
| `→` `↓` `Space` | Next slide |
| `←` `↑` | Previous slide |
| `S` | Speaker notes |
| `F` | Fullscreen |
| `Home` / `End` | First / Last |

**Touch:** Swipe left/right

**Click:** Right half → next, Left half → prev

---

## Deploy Anywhere

Output is a **single `index.html`** file:

```bash
# Build
slides build

# Deploy to GitHub Pages
cd dist
git init && git add . && git commit -m "slides"
git push origin gh-pages
```

Or just email the HTML file. It's self-contained.

---

# Ship It 🚀

```bash
npm install -g @dprrwt/slides
```

**GitHub:** [dprrwt/md-slides](https://github.com/dprrwt/md-slides)

**Author:** [dprrwt.me](https://dprrwt.me)
