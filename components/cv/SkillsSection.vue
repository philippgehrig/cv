<!-- Apple-inspired Skills section component -->
<template>
  <section id="skills" class="py-20 md:py-32 bg-apple-gray-50">
    <div class="container mx-auto px-6 max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-16 text-apple-gray-900">Skills</h2>
      
      <div v-if="isLoading" class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="i in 4" :key="i" class="bg-white rounded-2xl shadow-apple p-6 animate-pulse">
            <div class="h-6 bg-apple-gray-100 rounded-lg w-1/3 mb-6"></div>
            <div class="flex flex-wrap gap-2">
              <div v-for="j in 5" :key="j" class="h-8 bg-apple-gray-100 rounded-lg w-24"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="skillCategories.length > 0" class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="category in skillCategories" 
          :key="category.id" 
          class="bg-white p-6 md:p-8 rounded-2xl shadow-apple transform transition-all duration-300 hover:shadow-apple-hover"
        >
          <h3 class="text-xl font-semibold tracking-tight mb-5 text-apple-blue">{{ category.name }}</h3>
          
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in category.skills" 
              :key="skill.id" 
              class="inline-flex items-center px-3 py-1.5 rounded-full bg-apple-gray-100 text-apple-gray-700 text-sm font-medium"
            >
              {{ skill.name }}
              <span 
                v-if="skill.level" 
                class="ml-1.5 px-1.5 py-0.5 bg-apple-gray-200 rounded-full text-xs text-apple-gray-600"
              >
                {{ skill.level }}
              </span>
            </span>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center">
        <p class="text-lg text-red-500">Error loading skills data. Please try again later.</p>
      </div>
      
      <div v-else class="text-center">
        <p class="text-lg text-apple-gray-500">No skills information available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSkills } from '~/composables/useSkills';

const { skillCategories, isLoading, error } = useSkills();
</script>