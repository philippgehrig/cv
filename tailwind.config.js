/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './content/**/*.md'  // Add content directory for Markdown files
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.apple-gray.700'),
            a: {
              color: theme('colors.apple-blue.DEFAULT'),
              '&:hover': {
                color: theme('colors.apple-blue.dark'),
              },
              textDecoration: 'none',
            },
            h1: {
              color: theme('colors.apple-gray.900'),
              fontWeight: '600',
            },
            h2: {
              color: theme('colors.apple-gray.900'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.apple-gray.900'),
              fontWeight: '600',
            },
            h4: {
              color: theme('colors.apple-gray.900'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.apple-gray.800'),
              backgroundColor: theme('colors.apple-gray.50'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.apple-gray.50'),
              borderWidth: '1px',
              borderColor: theme('colors.apple-gray.100'),
              borderRadius: '0.5rem',
            },
            blockquote: {
              color: theme('colors.apple-gray.600'),
              borderLeftColor: theme('colors.apple-gray.200'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

