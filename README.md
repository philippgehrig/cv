# Personal CV Website

A modern, responsive personal CV/resume website built with Nuxt.js, Vue, TypeScript, and Tailwind CSS.

## Features

- Fully responsive design with Tailwind CSS
- Built with Nuxt 3, Vue 3, and TypeScript
- Sections for About, Experience, Education, Skills, and Contact
- Contact form for visitors to reach out to you
- Modern, clean UI design

## Project Structure

```
├── components/        # Vue components
│   ├── cv/             # CV section components
│   ├── icons/          # Icon components
│   └── layout/         # Layout components (navbar, footer)
├── composables/        # Vue composables for data fetching
├── pages/              # Application pages
│   ├── index.vue       # Main CV page
│   └── policies/        # Legal pages
├── plugins/            # Vue plugins
├── public/             # Static assets
├── tests/              # Test files
```

## Setup Instructions

### Prerequisites

- Node.js (v22)

### Installation

1. Clone this repository
2. Install dependencies:

```bash
yarn install
```

### Development

Start the development server:

```bash
yarn dev
```

### Production

Build the application for production:

```bash
yarn build
```

Preview the production build:

```bash
yarn preview
```

### Testing

The project uses Vitest for unit testing Vue components and functionality.

Run the tests:

```bash
yarn test
```

Run tests with coverage report:

```bash
yarn test:coverage
```

## Customization

### Styling

The website uses Tailwind CSS for styling. You can customize the design by:

1. Modifying the `tailwind.config.js` file to adjust colors, fonts, etc.
2. Editing the component files in the `components/` directory

### Content

All content is directly managed through Vue components and page files. To update your CV information, modify the corresponding component files in the `components/cv/` directory.
