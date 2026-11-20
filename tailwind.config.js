/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"SFMono-Regular"', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      // Design tokens live in assets/css/main.css (:root).
      colors: {
        paper: 'var(--color-paper)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        surface: 'var(--color-surface)',
      },
    },
  },
}
