<template>
  <div class="w-full max-w-lg mx-auto mb-12">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search blog posts..."
        class="w-full bg-white border border-apple-gray-200 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue"
        @keyup.enter="search"
      />
      <button 
        class="absolute right-0 top-0 h-full px-4 text-apple-gray-500 hover:text-apple-blue transition-colors duration-200"
        @click="search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

// Emit search event
const emit = defineEmits(['search']);

// Handle search
const search = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
    
    // If we're using a dedicated search page:
    // router.push({ path: '/blog/search', query: { q: searchQuery.value } });
  }
};
</script>