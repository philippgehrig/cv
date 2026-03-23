# Personal CV Website

A modern, responsive personal CV/portfolio website built with **Nuxt 3**, **Vue 3**, **TypeScript**, and **Tailwind CSS**.

## Features

- Fully responsive, dark-themed design with Tailwind CSS
- Built with Nuxt 3, Vue 3, and TypeScript
- Sections for About, Work Experience, Education, and Contact
- Smooth scroll navigation with active-section highlighting
- Expandable multi-role work-experience cards
- Legal pages: Privacy Policy, Legal Notice, Terms of Use, and Sitemap
- CI/CD pipeline with automated tests and coverage reporting

## Project Structure

```
├── components/           # Vue components
│   ├── cv/               # CV section components (About, Experience, Education, Contact)
│   └── layout/           # Layout components (Navbar, Footer)
├── composables/          # Vue composables for data access
│   ├── useProfile.ts     # Profile data composable
│   ├── useEducation.ts   # Education data composable
│   ├── useExperiences.ts # Work-experience data composable
│   └── data/             # Static data files and TypeScript types
├── pages/                # Application pages
│   ├── index.vue         # Main CV page
│   └── policies/         # Legal pages (privacy, legal notice, terms, sitemap)
├── plugins/              # Nuxt plugins (PrismJS syntax highlighting)
├── public/               # Static assets (images, logos)
└── tests/                # Vitest unit tests
```

## Setup

### Prerequisites

- Node.js v22+
- Yarn

### Installation

```bash
yarn install
```

## Development

Start the development server at `http://localhost:3000`:

```bash
yarn dev
```

## Production

Build for production:

```bash
yarn build
```

Preview the production build locally:

```bash
yarn preview
```

Generate a fully static site:

```bash
yarn generate
```

## Testing

The project uses [Vitest](https://vitest.dev/) and [@vue/test-utils](https://test-utils.vuejs.org/) for unit testing.

Run the tests once:

```bash
yarn test
```

Run tests in watch mode (re-runs on file changes):

```bash
yarn test:watch
```

Run tests with a coverage report:

```bash
yarn test:coverage
```

## Customisation

### Content

All CV content is managed through static data files in `composables/data/`:

| File | Description |
|------|-------------|
| `profileData.ts` | Name, title, bio, photo URL, and social links |
| `experiencesData.ts` | Work-experience entries with roles and technologies |
| `educationData.ts` | Academic qualifications |

Update these files to reflect your own information — no other files need to change.

### Styling

The website uses Tailwind CSS. Customise the design via:

- **`tailwind.config.js`** — colours, fonts, shadows, and animations
- **Component files** in `components/` — layout and structure

