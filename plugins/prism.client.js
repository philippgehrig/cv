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

// Import line numbers plugin
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

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
          Prism.highlightAll();
        }, 0);
      }
    }
  };
});