<!-- Experience section component for the CV -->
<template>
  <section id="experience" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Work Experience</h2>
      
      <div v-if="isLoading" class="flex justify-center">
        <div class="animate-pulse">Loading experience information...</div>
      </div>
      
      <div v-else-if="experiences.length > 0" class="max-w-3xl mx-auto">
        <div v-for="(job, index) in experiences" :key="job.id" class="mb-12">
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h3 class="text-xl font-bold">{{ job.position }}</h3>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{{ job.period }}</span>
          </div>
          <h4 class="text-lg text-gray-600 mb-4">{{ job.company }}</h4>
          <p class="text-gray-700 mb-4">{{ job.description }}</p>
          <div v-if="job.technologies && job.technologies.length > 0" class="flex flex-wrap gap-2">
            <span v-for="(tech, techIndex) in job.technologies" :key="techIndex" 
                  class="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500 text-center">
        Error loading experience data. Please try again later.
      </div>
      
      <div v-else class="text-center text-gray-500">
        No experience information available.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useExperiences } from '~/composables/directus/useExperiences';

const { experiences, isLoading, error } = useExperiences();
</script>