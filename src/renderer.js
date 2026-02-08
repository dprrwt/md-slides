/**
 * HTML Renderer for md-slides
 * Takes parsed slides and produces a complete HTML presentation
 */

import { getTheme, baseStyles } from './themes.js';

/**
 * Generate the keyboard navigation + live reload script
 */
function getScript(slideCount, liveReload = false) {
  return `
    (function() {
      let current = 0;
      const total = ${slideCount};
      const slides = document.querySelectorAll('.slide');
      const progress = document.querySelector('.progress');
      const slideNum = document.querySelector('.slide-number');
      const notesOverlay = document.querySelector('.notes-overlay');
      const hint = document.querySelector('.hint');
      let notesVisible = false;

      // Parse hash
      const hash = parseInt(window.location.hash.replace('#', ''), 10);
      if (!isNaN(hash) && hash >= 0 && hash < total) {
        current = hash;
      }

      function goTo(n) {
        if (n < 0 || n >= total) return;
        var goingForward = n > current;
        
        // Remove active from old slide
        slides[current].classList.remove('active', 'prev');
        if (goingForward) {
          slides[current].classList.add('prev');
        }
        
        current = n;
        
        // For backward nav, ensure slide starts from left position
        if (!goingForward) {
          slides[current].classList.add('prev');
        }
        
        // Force reflow to re-trigger CSS animations
        void slides[current].offsetWidth;
        
        // Activate new slide
        slides[current].classList.remove('prev');
        slides[current].classList.add('active');
        
        progress.style.width = ((current + 1) / total * 100) + '%';
        slideNum.textContent = (current + 1) + ' / ' + total;
        window.location.hash = current;

        // Update notes
        const noteText = slides[current].dataset.notes || '';
        notesOverlay.textContent = noteText || '(no notes for this slide)';
      }

      function next() { goTo(current + 1); }
      function prev() { goTo(current - 1); }
      function first() { goTo(0); }
      function last() { goTo(total - 1); }

      // Keyboard
      document.addEventListener('keydown', function(e) {
        hint.classList.remove('visible');
        switch(e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
          case ' ':
          case 'l':
          case 'j':
            e.preventDefault();
            next();
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
          case 'h':
          case 'k':
            e.preventDefault();
            prev();
            break;
          case 'Home':
            e.preventDefault();
            first();
            break;
          case 'End':
            e.preventDefault();
            last();
            break;
          case 's':
          case 'n':
            notesVisible = !notesVisible;
            notesOverlay.classList.toggle('visible', notesVisible);
            break;
          case 'f':
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
            break;
          case 'Escape':
            notesOverlay.classList.remove('visible');
            notesVisible = false;
            break;
        }
      });

      // Touch / swipe
      let touchStartX = 0;
      let touchStartY = 0;
      document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      });
      document.addEventListener('touchend', function(e) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
          dx > 0 ? prev() : next();
        }
      });

      // Click (right half = next, left half = prev)
      document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
        if (e.clientX > window.innerWidth / 2) {
          next();
        } else {
          prev();
        }
      });

      // Init
      goTo(current);
      
      // Show hint briefly
      setTimeout(function() { hint.classList.add('visible'); }, 1000);
      setTimeout(function() { hint.classList.remove('visible'); }, 5000);

      ${liveReload ? `
      // Live reload via WebSocket
      (function connectWS() {
        const ws = new WebSocket('ws://localhost:' + (parseInt(location.port) + 1));
        ws.onmessage = function(e) {
          if (e.data === 'reload') {
            location.reload();
          }
        };
        ws.onclose = function() {
          setTimeout(connectWS, 1000);
        };
      })();
      ` : ''}
    })();
  `;
}

/**
 * Build complete HTML document from parsed slides
 */
export function renderHTML(slidesData, options = {}) {
  const {
    theme = 'dark',
    title = 'Presentation',
    author = '',
    liveReload = false,
  } = options;

  const { metadata, slides } = slidesData;
  const finalTitle = metadata.title || title;
  const finalAuthor = metadata.author || author;
  const finalTheme = metadata.theme || theme;

  const slideElements = slides.map((slide, i) => {
    const classes = ['slide'];
    classes.push(`layout-${slide.layout}`);
    if (slide.directives.class) {
      classes.push(slide.directives.class);
    }
    // active class is set by JS goTo() on init — not in HTML

    let style = '';
    if (slide.directives.background) {
      const bg = slide.directives.background;
      if (bg.startsWith('#') || bg.startsWith('rgb')) {
        style = `background: ${bg};`;
      } else {
        style = `background: url('${bg}') center/cover no-repeat;`;
      }
    }

    const notes = slide.notes ? ` data-notes="${escapeAttr(slide.notes)}"` : '';

    return `    <section class="${classes.join(' ')}"${style ? ` style="${style}"` : ''}${notes}>
      <div class="slide-content">
        ${slide.html}
      </div>
    </section>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(finalTitle)}</title>
  ${finalAuthor ? `<meta name="author" content="${escapeAttr(finalAuthor)}">` : ''}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css">
  <style>
    ${getTheme(finalTheme)}
    ${baseStyles}
  </style>
</head>
<body>
  <div class="deck">
${slideElements}
  </div>

  <div class="progress" style="width: 0%"></div>
  <div class="slide-number">1 / ${slides.length}</div>
  <div class="notes-overlay"></div>
  <div class="hint">← → navigate · S notes · F fullscreen</div>

  <script>
    ${getScript(slides.length, liveReload)}
  </script>
</body>
</html>`;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default { renderHTML };
