/**
 * Nuxt client-side plugin that sets up PrismJS syntax highlighting.
 *
 * This plugin:
 *  1. Imports the core Prism stylesheet and all supported language grammars.
 *  2. Registers the Toolbar and Copy-to-Clipboard Prism plugins.
 *  3. Maps `.vue` files to HTML/markup highlighting (closest built-in grammar).
 *  4. Exposes a `$highlightCode()` helper that components can call after
 *     dynamic content is inserted into the DOM — it runs in the next event-loop
 *     tick to ensure the DOM is fully settled before highlighting.
 */
import Prism from 'prismjs';

// Core theme
import 'prismjs/themes/prism.css';

// Language grammars
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';  // HTML
import 'prismjs/components/prism-jsx';     // JSX
import 'prismjs/components/prism-tsx';     // TSX
import 'prismjs/components/prism-php';     // PHP

// UI plugins
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';

export default defineNuxtPlugin(() => {
  // Treat .vue files as HTML markup — the closest built-in Prism grammar.
  Prism.languages.vue = Prism.languages.markup;
  
  return {
    provide: {
      /**
       * Triggers Prism syntax highlighting on all code blocks in the document.
       *
       * Runs after a zero-millisecond `setTimeout` so that any pending DOM
       * mutations (e.g. from `v-html`) are committed before highlighting runs.
       *
       * Side effects:
       * - Removes `line-numbers` classes that interfere with Prism's rendering.
       * - Adds `data-language` attributes to `<pre>` elements so the toolbar
       *   plugin can display the language label.
       */
      highlightCode: () => {
        window.setTimeout(() => {
          // Remove line-numbers class to avoid rendering artefacts.
          document.querySelectorAll('pre.line-numbers').forEach(block => {
            block.classList.remove('line-numbers');
          });
          
          // Expose the detected language as a data attribute for labelling.
          document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
            const language = Array.from(pre.classList)
              .find(className => className.startsWith('language-'))
              ?.replace('language-', '');
            if (language) {
              pre.setAttribute('data-language', language);
            }
          });
          
          Prism.highlightAll();
        }, 0);
      }
    }
  };
});