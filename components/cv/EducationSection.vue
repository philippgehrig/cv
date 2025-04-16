<!-- Apple-inspired Education section component -->
<template>
  <section id="education" class="py-20 md:py-32 bg-white">
    <div class="container mx-auto px-6 max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-16 text-apple-gray-900">Education</h2>
      
      <div v-if="isLoading" class="max-w-3xl mx-auto">
        <div v-for="i in 2" :key="i" class="mb-10 p-6 animate-pulse">
          <div class="h-7 bg-apple-gray-100 rounded-lg w-2/3 mb-4"></div>
          <div class="h-5 bg-apple-gray-100 rounded-lg w-1/3 mb-6"></div>
          <div class="space-y-3">
            <div class="h-4 bg-apple-gray-100 rounded-lg w-full"></div>
            <div class="h-4 bg-apple-gray-100 rounded-lg w-5/6"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="education.length > 0" class="max-w-3xl mx-auto">
        <div class="space-y-16">
          <div 
            v-for="(edu, index) in education" 
            :key="edu.id" 
            class="relative"
          >
            <!-- Apple-style timeline connector -->
            <div v-if="index < education.length - 1" class="hidden md:block absolute left-1/2 top-full h-16 w-px bg-apple-gray-200"></div>
            
            <div class="flex flex-col md:flex-row md:items-center">
              <div class="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-apple-blue/10 text-apple-blue text-sm font-medium mb-3">
                  {{ edu.period }}
                </span>
                <h3 class="text-2xl font-semibold tracking-tight text-apple-gray-900 mb-2">{{ edu.degree }}</h3>
                <h4 class="text-lg text-apple-gray-600">{{ edu.institution }}</h4>
              </div>
              
              <div class="md:w-1/2 md:pl-8 border-l-0 md:border-l border-apple-gray-200">
                <p class="text-apple-gray-500 leading-relaxed">{{ edu.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center">
        <p class="text-lg text-red-500">Error loading education data. Please try again later.</p>
      </div>
      
      <div v-else class="text-center">
        <p class="text-lg text-apple-gray-500">No education information available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useEducation } from '~/composables/directus/useEducation';

const { education, isLoading, error } = useEducation();
</script>