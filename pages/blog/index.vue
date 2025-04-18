<template>
  <div class="min-h-screen bg-white">
    <div class="py-20 md:py-32 bg-white">
      <div class="container mx-auto px-6 max-w-5xl">
        <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-8 text-apple-gray-900">Blog</h1>
        
        <p class="text-xl text-apple-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Thoughts, tutorials, and insights on web development, design, and technology
        </p>
        
        <!-- Search -->
        <BlogSearch @search="handleSearch" />
        
        <!-- Tags filter -->
        <div v-if="allTags.length > 0" class="mb-16">
          <h2 class="text-lg font-medium text-apple-gray-800 mb-3 text-center">Browse by topic</h2>
          <div class="flex flex-wrap justify-center gap-2">
            <button
              v-for="tag in allTags"
              :key="tag"
              @click="toggleTagFilter(tag)"
              class="px-3 py-1 text-sm rounded-full transition-colors duration-200"
              :class="selectedTags.includes(tag) 
                ? 'bg-apple-blue text-white' 
                : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'"
            >
              #{{ tag }}
            </button>
          </div>
        </div>
        
        <div class="max-w-3xl mx-auto">
          <!-- Blog posts list -->
          <template v-if="filteredPosts.length > 0">
            <!-- Featured post (if we're on page 1 and no filters) -->
            <div v-if="currentPage === 1 && !searchQuery && selectedTags.length === 0 && filteredPosts[0]" class="mb-16">
              <div class="border border-apple-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <NuxtLink :to="filteredPosts[0].path" class="block group">
                  <div class="p-8">
                    <div class="text-sm text-apple-gray-500 mb-3">
                      {{ formatDate(filteredPosts[0].date) }}
                    </div>
                    
                    <h2 class="text-3xl font-semibold text-apple-gray-900 mb-4 group-hover:text-apple-blue transition-colors duration-300">
                      {{ filteredPosts[0].title }}
                    </h2>
                    
                    <p class="text-apple-gray-600 mb-6 text-lg">
                      {{ filteredPosts[0].description }}
                    </p>
                    
                    <div class="flex items-center text-apple-blue font-medium">
                      <span>Read more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    <!-- Tags -->
                    <div v-if="filteredPosts[0].tags && filteredPosts[0].tags.length > 0" class="mt-6 flex flex-wrap gap-2">
                      <NuxtLink 
                        v-for="tag in filteredPosts[0].tags" 
                        :key="tag" 
                        :to="`/blog/tag/${encodeURIComponent(tag)}`"
                        class="px-3 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-sm hover:bg-apple-gray-200 transition-colors duration-200"
                        @click.stop
                      >
                        #{{ tag }}
                      </NuxtLink>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
            
            <!-- Regular posts -->
            <div class="space-y-12">
              <BlogPostCard 
                v-for="post in paginatedPosts" 
                :key="post.slug" 
                :post="post" 
              />
            </div>
            
            <!-- Pagination -->
            <BlogPagination
              v-if="totalPages > 1"
              :current-page="currentPage"
              :total-pages="totalPages"
              @change="handlePageChange"
            />
          </template>
          
          <!-- Empty state -->
          <div v-else class="text-center py-12">
            <p v-if="searchQuery || selectedTags.length > 0" class="text-apple-gray-600">
              No blog posts found matching your search criteria. Try adjusting your filters.
            </p>
            <p v-else class="text-apple-gray-600">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { definePageMeta } from '#imports';

// Define page metadata
definePageMeta({
  title: 'Blog',
  description: 'Read my latest thoughts, tutorials, and insights'
});

// Blog posts data (defined statically since we're using Vue pages)
const blogPosts = [
  {
    title: "Welcome to My Blog",
    description: "An introduction to my blog, what to expect, and the topics I'll be covering",
    date: "2025-04-17T08:00:00.000Z",
    tags: ["introduction", "personal", "blog", "english"],
    path: "/blog/posts/welcome-to-my-blog",
    slug: "welcome-to-my-blog"
  },
  {
    title: "Introduction to the Basics of CFD Simulations",
    description: "Learn the fundamental concepts of Computational Fluid Dynamics (CFD) and how these simulations help engineers solve complex flow problems",
    date: "2025-04-17T10:00:00.000Z",
    tags: ["engineering", "cfd", "fluid-dynamics", "simulation"],
    path: "/blog/posts/introduction-to-cfd-simulations-basics",
    slug: "introduction-to-cfd-simulations-basics"
  }
];

// Sort posts by date (newest first)
const posts = computed(() => {
  return [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
});

// Search and filtering
const searchQuery = ref('');
const selectedTags = ref<string[]>([]);
const currentPage = ref(1);
const postsPerPage = 5; // Adjust as needed

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

// Get all unique tags from posts
const allTags = computed(() => {
  const tags = new Set<string>();
  
  posts.value.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return [...tags].sort();
});

// Filter posts based on search and tags
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      const inTitle = post.title?.toLowerCase().includes(query);
      const inDescription = post.description?.toLowerCase().includes(query);
      
      if (!inTitle && !inDescription) {
        return false;
      }
    }
    
    // Filter by selected tags
    if (selectedTags.value.length > 0) {
      if (!post.tags || !Array.isArray(post.tags)) return false;
      
      return selectedTags.value.every(tag => post.tags.includes(tag));
    }
    
    return true;
  });
});

// Calculate total pages
const totalPages = computed(() => {
  const featuredPostOffset = currentPage.value === 1 && !searchQuery.value && selectedTags.value.length === 0 ? 1 : 0;
  return Math.ceil((filteredPosts.value.length - featuredPostOffset) / postsPerPage);
});

// Get current page posts
const paginatedPosts = computed(() => {
  if (!filteredPosts.value.length) return [];
  
  // Handle featured post (skip it if we're on page 1 with no filters)
  const startIndex = 
    currentPage.value === 1 && !searchQuery.value && selectedTags.value.length === 0
      ? 1 // Skip the first post (featured)
      : (currentPage.value - 1) * postsPerPage;
      
  return filteredPosts.value.slice(startIndex, startIndex + postsPerPage);
});

// Toggle tag filter
const toggleTagFilter = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  
  // Reset to page 1 when changing filters
  currentPage.value = 1;
};

// Handle search
const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1; // Reset to page 1 when searching
};

// Handle page change
const handlePageChange = (page: number) => {
  currentPage.value = page;
  
  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Reset pagination when filters change
watch([searchQuery, selectedTags], () => {
  currentPage.value = 1;
});
</script>