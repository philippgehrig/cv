# Personal CV Website

A modern, responsive personal CV/resume website built with Nuxt.js, Vue, TypeScript, and Tailwind CSS.

## Features

- 📱 Fully responsive design with Tailwind CSS
- 🚀 Built with Nuxt 3, Vue 3, and TypeScript
- 📝 Sections for About, Experience, Education, Skills, and Contact
- 📖 Integrated blog with Vue components
- 🔍 Blog search and pagination functionality
- 📋 Table of contents for blog posts
- 🧪 Comprehensive test coverage with Vitest
- 📬 Contact form for visitors to reach out to you
- 🎨 Modern, clean UI design

## Project Structure

```
├── components/        # Vue components
│   ├── blog/          # Blog-related components
│   ├── cv/            # CV section components
│   └── layout/        # Layout components (navbar, footer)
├── composables/       # Vue composables for data fetching
├── content/           # Content files
│   └── blog/          # Blog content files
├── pages/             # Application pages
│   ├── blog/          # Blog pages and posts
│   └── policies/      # Legal pages
├── plugins/           # Vue plugins
├── public/            # Static assets
├── tests/             # Test files
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

## Blog System

The website includes a blog system that supports:

- Vue-based blog post pages
- Code syntax highlighting with Prism
- Table of contents generation
- Pagination for blog listings
- Search functionality
- Bilingual content support (English/German)

### Adding Blog Posts

1. Create a new Vue file in the `pages/blog/posts/` directory (e.g., `my-new-post.vue`)
2. Use the following template structure:

```vue
<template>
  <BlogPostLayout :post="post">
    <h1>Your Blog Post Title</h1>
    
    <p>
      Introduction paragraph goes here. This is where you can provide an overview
      of what the blog post will cover.
    </p>
    
    <h2>First Section Heading</h2>
    
    <p>
      Content for the first section. You can include paragraphs, lists, code blocks,
      and other HTML elements as needed.
    </p>
    
    <h2>Second Section Heading</h2>
    
    <p>
      More content here...
    </p>
    
    <ul>
      <li>List item one</li>
      <li>List item two</li>
      <li>List item three</li>
    </ul>
    
    <h2>Conclusion</h2>
    
    <p>
      Wrap-up paragraph and closing thoughts.
    </p>
  </BlogPostLayout>
</template>

<script setup lang="ts">
// Post metadata
const post = {
  title: "Your Blog Post Title",
  description: "A short description of the post that will appear in previews and SEO",
  date: "YYYY-MM-DDT00:00:00.000Z", // ISO date format
  tags: ["tag1", "tag2", "tag3"] // Categories or keywords for the post
};
</script>
```

### Bilingual Blog Posts

For posts that need to be available in multiple languages (currently English and German), use the following template:

```vue
<template>
  <BlogPostLayout :post="post">
    <!-- Apple-styled language selector -->
    <div class="mb-8 flex justify-center">
      <div class="inline-flex items-center px-3 py-1.5 bg-apple-gray-100 rounded-full">
        <button 
          @click="language = 'en'" 
          class="px-3 py-1 text-sm font-medium transition-all duration-200 rounded-full"
          :class="language === 'en' ? 'bg-white text-apple-gray-900 shadow-sm' : 'text-apple-gray-600 hover:text-apple-gray-900'"
          aria-label="English"
        >
          English
        </button>
        <span class="mx-1 text-apple-gray-300">|</span>
        <button 
          @click="language = 'de'" 
          class="px-3 py-1 text-sm font-medium transition-all duration-200 rounded-full"
          :class="language === 'de' ? 'bg-white text-apple-gray-900 shadow-sm' : 'text-apple-gray-600 hover:text-apple-gray-900'"
          aria-label="Deutsch"
        >
          Deutsch
        </button>
      </div>
    </div>
    
    <!-- English content -->
    <div v-if="language === 'en'">
      <h1>Your English Title</h1>
      
      <p>
        English content goes here...
      </p>
      
      <!-- More English content sections -->
    </div>
    
    <!-- German content -->
    <div v-if="language === 'de'">
      <h1>Your German Title</h1>
      
      <p>
        German content goes here...
      </p>
      
      <!-- More German content sections -->
    </div>
  </BlogPostLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Language state
const language = ref('en');

// Post metadata
const post = {
  title: "Your Post Title", // This will display in the header
  description: "Your post description",
  date: "YYYY-MM-DDT00:00:00.000Z",
  tags: ["tag1", "tag2", "english", "deutsch"] // Include language tags
};
</script>
```

The language selector will allow visitors to switch between languages while staying on the same page. Default language is English.

3. The blog post will automatically appear in the blog listing page with pagination and search functionality.

4. The `<BlogPostLayout>` component handles:
   - Displaying the title, date, and tags
   - Generating the table of contents
   - Providing consistent styling across all blog posts

## Customization

### Styling

The website uses Tailwind CSS for styling. You can customize the design by:

1. Modifying the `tailwind.config.js` file to adjust colors, fonts, etc.
2. Editing the component files in the `components/` directory

### Content

All content is directly managed through Vue components and page files. To update your CV information, modify the corresponding component files in the `components/cv/` directory.

Blog content is managed through Vue files in the `pages/blog/posts/` directory.