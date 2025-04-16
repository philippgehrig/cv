<!-- Apple-inspired Experience section component -->
<template>
  <section id="experience" class="py-20 md:py-32 bg-apple-gray-50">
    <div class="container mx-auto px-6 max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-16 text-apple-gray-900">Work Experience</h2>
      
      <div v-if="isLoading" class="max-w-3xl mx-auto">
        <div v-for="i in 3" :key="i" class="mb-10 bg-white rounded-2xl shadow-apple p-6 animate-pulse">
          <div class="h-7 bg-apple-gray-100 rounded-full w-2/3 mb-4"></div>
          <div class="h-5 bg-apple-gray-100 rounded-full w-1/3 mb-6"></div>
          <div class="space-y-3">
            <div class="h-4 bg-apple-gray-100 rounded-full w-full"></div>
            <div class="h-4 bg-apple-gray-100 rounded-full w-5/6"></div>
            <div class="h-4 bg-apple-gray-100 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="experiences.length > 0" class="max-w-3xl mx-auto">
        <div 
          v-for="(job, index) in experiences" 
          :key="job.id" 
          class="mb-10 bg-white rounded-2xl shadow-apple p-6 md:p-8 transform transition-all duration-300 hover:shadow-apple-hover hover:translate-y-[-4px]"
        >
          <div class="flex flex-col space-y-3 mb-5">
            <h3 class="text-2xl font-semibold tracking-tight text-apple-gray-900">{{ job.position }}</h3>
            <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
              <h4 class="text-lg text-apple-gray-600">{{ job.company }}</h4>
              <span class="inline-flex items-center px-3 py-1 rounded-full bg-apple-blue/10 text-apple-blue text-sm font-medium">
                {{ job.period }}
              </span>
            </div>
          </div>
          
          <p class="text-apple-gray-500 leading-relaxed mb-6">{{ job.description }}</p>
          
          <div v-if="job.technologies && job.technologies.length > 0" class="flex flex-wrap gap-2">
            <span 
              v-for="(tech, techIndex) in job.technologies" 
              :key="techIndex" 
              class="px-3 py-1 rounded-full bg-apple-gray-100 text-apple-gray-600 text-sm"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center">
        <p class="text-lg text-red-500">Error loading experience data. Please try again later.</p>
      </div>
      
      <div v-else class="text-center">
        <p class="text-lg text-apple-gray-500">No experience information available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useExperiences } from '~/composables/directus/useExperiences';

const { experiences, isLoading, error } = useExperiences();
</script>