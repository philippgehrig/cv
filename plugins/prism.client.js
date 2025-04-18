import Prism from 'prismjs';

// Import Prism core styles
import 'prismjs/themes/prism.css';

// Import additional languages
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

// Import toolbar plugin
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';

export default defineNuxtPlugin(() => {
  // Use HTML highlighting for Vue files
  Prism.languages.vue = Prism.languages.markup;
  
  return {
    provide: {
      highlightCode: () => {
        // Need to run this in the next tick after DOM is updated
        window.setTimeout(() => {
          // Remove line-numbers class from all pre elements
          document.querySelectorAll('pre.line-numbers').forEach(block => {
            block.classList.remove('line-numbers');
          });
          
          // Set data-language attribute for labeling code blocks
          document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
            const language = Array.from(pre.classList)
              .find(className => className.startsWith('language-'))
              ?.replace('language-', '');
            if (language) {
              pre.setAttribute('data-language', language);
            }
          });
          
          // Explicitly run syntax highlighting
          Prism.highlightAll();
        }, 0);
      }
    }
  };
});