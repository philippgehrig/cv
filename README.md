# Personal CV Website

A modern, responsive personal CV/portfolio website built with **Nuxt 3**, **Vue 3**, **TypeScript**, and **Tailwind CSS**.

## Features

- Responsive, warm personal-studio design with modular cards and an uncropped portrait
- Built with Nuxt 3, Vue 3, and TypeScript
- Plain-language current work, ongoing studies, career highlights, and contact
- Native section navigation with a skip link and reduced-motion support
- Expandable earlier work, available without JavaScript
- Server-rendered profile and study content with no artificial loading delay
- System fonts with no external font requests
- Legal pages: Privacy Policy, Legal Notice, Terms of Use, and Sitemap
- CI/CD pipeline with automated tests and coverage reporting

## Project Structure

```
├── components/           # Vue components
│   ├── cv/               # Hero, current work, background, and contact components
│   └── layout/           # Layout components (Navbar, Footer)
├── composables/          # Vue composables for data access
│   ├── useProfile.ts     # Profile data composable
│   ├── useEducation.ts   # Education data composable
│   ├── useExperiences.ts # Work-experience data composable
│   └── data/             # Static data files and TypeScript types
├── pages/                # Application pages
│   ├── index.vue         # Main CV page
│   └── policies/         # Legal pages (privacy, legal notice, terms, sitemap)
├── assets/css/main.css   # Shared studio palette, layout, and accessibility styles
├── plugins/              # Nuxt plugins
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
| `portfolioData.ts` | Intro headline, plain-language current and earlier work, background, and contact copy |
| `timelineData.ts` | Detailed timeline data retained for reuse |

The homepage reads static content directly so it is available in the initial HTML.
The current title and master's subject are shared with the experience and timeline
data. Edit the data files for profile and project copy; edit the section components
for headings and layout.

The former full timeline is replaced by selected career highlights and an
expandable earlier-work section. Existing `#about`, `#experience`, `#education`,
and `#contact` URLs remain valid; `#work` links to the current projects.

### Styling

The website uses Tailwind CSS. Customise the design via:

- **`assets/css/main.css`** — shared colours, page width, typography helpers, and focus styles
- **`tailwind.config.js`** — Tailwind tokens and system font stacks
- **Component files** in `components/` — scoped card styles and responsive layouts

The portrait uses its original square aspect ratio and `object-fit: contain`.
The hero cards stack below 900px, and the portrait sits below the introduction
below 650px. Keep those proportions when adjusting the layout.
Work cards stack below 800px so the illustrations and copy have enough room.
