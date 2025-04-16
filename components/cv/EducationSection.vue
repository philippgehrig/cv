<!-- Education section component for the CV -->
<template>
  <section id="education" class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Education</h2>
      
      <div v-if="isLoading" class="flex justify-center">
        <div class="animate-pulse">Loading education information...</div>
      </div>
      
      <div v-else-if="education.length > 0" class="max-w-3xl mx-auto">
        <div v-for="(edu, index) in education" :key="edu.id" class="mb-10">
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h3 class="text-xl font-bold">{{ edu.degree }}</h3>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{{ edu.period }}</span>
          </div>
          <h4 class="text-lg text-gray-600 mb-4">{{ edu.institution }}</h4>
          <p class="text-gray-700">{{ edu.description }}</p>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500 text-center">
        Error loading education data. Please try again later.
      </div>
      
      <div v-else class="text-center text-gray-500">
        No education information available.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useEducation } from '~/composables/directus/useEducation';

const { education, isLoading, error } = useEducation();
</script>