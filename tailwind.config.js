/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        'apple': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'apple-gray': {
          50: '#f5f5f7',
          100: '#e8e8ed',
          200: '#d2d2d7',
          300: '#b9b9c3',
          400: '#86868b',
          500: '#6e6e73',
          600: '#424245',
          700: '#333336',
          800: '#1d1d1f',
          900: '#000000',
        },
        'apple-blue': {
          light: '#2997ff',
          DEFAULT: '#0071e3',
          dark: '#0077ed',
        },
      },
      boxShadow: {
        'apple': '0 4px 8px 0 rgba(0, 0, 0, 0.08)',
        'apple-hover': '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}

