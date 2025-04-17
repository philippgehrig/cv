<template>
  <div v-if="totalPages > 1" class="flex justify-center space-x-2 mt-12">
    <button
      v-if="currentPage > 1"
      @click="onPageChange(currentPage - 1)"
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-apple-gray-700 bg-white border border-apple-gray-200 rounded-md hover:bg-apple-gray-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Previous
    </button>
    
    <template v-for="page in paginationRange" :key="page">
      <button
        v-if="page !== '...'"
        @click="onPageChange(Number(page))"
        class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
        :class="currentPage === Number(page) ? 'bg-apple-blue text-white' : 'text-apple-gray-700 bg-white border border-apple-gray-200 hover:bg-apple-gray-50'"
      >
        {{ page }}
      </button>
      <span
        v-else
        class="px-3 py-2 text-sm font-medium text-apple-gray-700"
      >
        {{ page }}
      </span>
    </template>

    <button
      v-if="currentPage < totalPages"
      @click="onPageChange(currentPage + 1)"
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-apple-gray-700 bg-white border border-apple-gray-200 rounded-md hover:bg-apple-gray-50"
    >
      Next
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'change', page: number): void;
}>();

const onPageChange = (page: number) => {
  emit('change', page);
};

// Create an array of page numbers with ellipses for pagination display
const paginationRange = computed(() => {
  const delta = 1; // Number of pages to show on each side of current page
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];

  // Always show first page
  range.push(1);

  // Calculate range around current page
  for (let i = Math.max(2, props.currentPage - delta); i <= Math.min(props.totalPages - 1, props.currentPage + delta); i++) {
    range.push(i);
  }

  // Always show last page if not first page
  if (props.totalPages > 1) {
    range.push(props.totalPages);
  }

  // Add ellipses where needed
  let l: number = 0;
  for (let i of range) {
    if (l) {
      if (Number(i) - l > 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = Number(i);
  }

  return rangeWithDots;
});
</script>