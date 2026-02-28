/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './content/**/*.md'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // Base dark palette
        'dark': {
          950: '#050507',
          900: '#0c0c10',
          800: '#13131a',
          700: '#1a1a24',
          600: '#22222e',
          500: '#2d2d3d',
        },
        // Neutral grays
        'zinc': {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        // Accent
        'accent': {
          DEFAULT: '#6366f1',   // indigo
          light:   '#818cf8',
          dark:    '#4f46e5',
          glow:    'rgba(99,102,241,0.25)',
        },
        // Secondary accent
        'teal': {
          DEFAULT: '#14b8a6',
          light:   '#2dd4bf',
          dark:    '#0d9488',
        },
      },
      boxShadow: {
        'card':   '0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.4)',
        'card-hover': '0 10px 40px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.15)',
        'glow':   '0 0 20px rgba(99,102,241,0.3)',
        'glow-sm': '0 0 8px rgba(99,102,241,0.2)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.zinc.300'),
            a: {
              color: theme('colors.accent.light'),
              '&:hover': { color: theme('colors.accent.DEFAULT') },
              textDecoration: 'none',
            },
            h1: { color: theme('colors.zinc.50'), fontWeight: '700' },
            h2: { color: theme('colors.zinc.50'), fontWeight: '600' },
            h3: { color: theme('colors.zinc.100'), fontWeight: '600' },
            code: {
              color: theme('colors.accent.light'),
              backgroundColor: theme('colors.dark.600'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
