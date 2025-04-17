<template>
  <div class="min-h-screen bg-white">
    <div class="py-20 md:py-32 bg-white">
      <div class="container mx-auto px-6 max-w-4xl">
        <!-- Back button -->
        <div class="mb-12">
          <NuxtLink to="/blog" class="inline-flex items-center text-apple-blue hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to all posts</span>
          </NuxtLink>
        </div>
        
        <article class="max-w-3xl mx-auto">
          <!-- Article header -->
          <header class="mb-12">
            <div class="text-sm text-apple-gray-500 mb-3">
              {{ formatDate(post.date) }}
            </div>
            <h1 class="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-apple-gray-900">
              {{ post.title }}
            </h1>
            <p v-if="post.description" class="text-xl text-apple-gray-600">
              {{ post.description }}
            </p>
            
            <!-- Tags -->
            <div v-if="post.tags && post.tags.length > 0" class="mt-6 flex flex-wrap gap-2">
              <NuxtLink 
                v-for="tag in post.tags" 
                :key="tag" 
                :to="`/blog/tag/${encodeURIComponent(tag)}`"
                class="px-3 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-sm hover:bg-apple-gray-200 transition-colors duration-200"
              >
                #{{ tag }}
              </NuxtLink>
            </div>
          </header>
          
          <!-- Article content -->
          <div class="prose prose-lg max-w-none syntax-highlight">
            <slot></slot>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $highlightCode } = useNuxtApp();

// Post metadata props
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

// Format date helper
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

onMounted(() => {
  // Apply syntax highlighting after component is mounted
  $highlightCode();
});

// Update page metadata
useHead({
  title: props.post.title,
  meta: [
    { name: 'description', content: props.post.description }
  ]
});
</script>

<style>
/* Base prose styles */
.prose pre {
  background-color: #f5f5f7;
  border: 1px solid #e8e8ed;
  border-radius: 0.5rem;
  padding: 0;
  margin: 1.5rem 0;
  overflow: hidden;
}

.prose code {
  color: #1d1d1f;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875em;
}

.prose code:not(.code-block) {
  background-color: #f5f5f7;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.prose-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.prose-lg h1 {
  font-size: 2.25rem;
  margin-top: 0;
  margin-bottom: 2rem;
  font-weight: 600;
}

.prose-lg h2 {
  font-size: 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.prose-lg h3 {
  font-size: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.prose-lg p {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}

.prose-lg ul {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  padding-left: 1.75rem;
}

.prose-lg li {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

/* Prism.js enhancements */
.syntax-highlight pre[class*="language-"] {
  position: relative;
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow: auto;
  border-radius: 0.5rem;
}

.syntax-highlight pre[class*="language-"]::before {
  content: attr(data-language);
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: #6b7280;
  background-color: #f3f4f6;
  border-bottom-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  text-transform: uppercase;
  font-weight: 600;
}

.syntax-highlight .line-numbers .line-numbers-rows {
  border-right: 1px solid #d1d5db;
}

/* Copy button styling */
.syntax-highlight .toolbar-item button {
  color: #6b7280;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.syntax-highlight .toolbar-item button:hover {
  background-color: #e5e7eb;
  color: #374151;
}

/* Add line numbers to all code blocks */
.syntax-highlight pre[class*="language-"] {
  padding-left: 3.5rem;
}
</style>