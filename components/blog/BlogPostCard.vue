<template>
  <NuxtLink :to="post.path" class="block group">
    <article class="border border-apple-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div class="p-6 md:p-8">
        <!-- Date -->
        <div class="text-sm text-apple-gray-500 mb-3">
          {{ formatDate(post.date) }}
        </div>
        
        <!-- Title -->
        <h2 class="text-2xl font-semibold text-apple-gray-900 mb-4 group-hover:text-apple-blue transition-colors duration-300">
          {{ post.title }}
        </h2>
        
        <!-- Description -->
        <p class="text-apple-gray-600 mb-6">
          {{ post.description }}
        </p>
        
        <!-- Read more link -->
        <div class="flex items-center text-apple-blue font-medium">
          <NuxtLink :to="post.path" class="flex items-center">
            <span>Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Tags -->
        <div v-if="post.tags && post.tags.length > 0" class="mt-6 flex flex-wrap gap-2">
          <NuxtLink 
            v-for="tag in post.tags" 
            :key="tag" 
            :to="`/blog/tag/${encodeURIComponent(tag)}`"
            @click.stop
            class="px-3 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-sm hover:bg-apple-gray-200 transition-colors duration-200"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
// Define props
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

// Format date
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
</script>