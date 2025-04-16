# Personal CV Website

A modern, responsive personal CV/resume website built with Nuxt.js, Vue, TypeScript, Tailwind CSS, and Directus as a headless CMS.

## Features

- 📱 Fully responsive design with Tailwind CSS
- 🚀 Built with Nuxt 3, Vue 3, and TypeScript
- 📊 Headless CMS integration with Directus for easy content management
- 📝 Sections for About, Experience, Education, Skills, and Contact
- 📬 Contact form for visitors to reach out to you
- 🎨 Modern, clean UI design

## Setup Instructions

### Prerequisites

- Node.js (v22)
- A Directus instance (self-hosted or cloud-based)

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Set up your Directus instance:
   - Create a new Directus project
   - Set up collections for: `profile`, `experiences`, `education`, `skill_categories`, `skills`, and `contact`
   - Structure these collections according to the interfaces defined in `composables/directus/client.ts`
   - Add initial data to your collections

4. Configure the environment:
   - Update the `.env` file with your Directus URL:
   ```
   DIRECTUS_URL=https://your-directus-instance.com
   ```

### Running Directus with Docker Compose

You can run a local Directus instance using Docker Compose. This project includes a `docker-compose.yml` and `.env` file for convenience.

1. Copy or edit the `.env` file in the project root to set your admin and database credentials.
2. Start Directus and Postgres:

```bash
docker compose up -d
```

3. Access Directus at [http://localhost:8055](http://localhost:8055)

### Development

Start the development server:

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Customization

### Styling

The website uses Tailwind CSS for styling. You can customize the design by:

1. Modifying the `tailwind.config.js` file to adjust colors, fonts, etc.
2. Editing the component files in the `components/` directory

### Content

All content is managed through Directus. To update your CV information:

1. Log in to your Directus admin panel
2. Navigate to the relevant collection (Profile, Experiences, Education, etc.)
3. Update the content as needed
4. Your website will automatically reflect the changes