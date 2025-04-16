<!-- Skills section component for the CV -->
<template>
  <section id="skills" class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Skills</h2>
      
      <div v-if="isLoading" class="flex justify-center">
        <div class="animate-pulse">Loading skills information...</div>
      </div>
      
      <div v-else-if="skillCategories.length > 0" class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="category in skillCategories" :key="category.id" class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-4 text-blue-600">{{ category.name }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in category.skills" :key="skill.id" 
                  class="bg-gray-100 px-3 py-2 rounded-md text-gray-800">
              {{ skill.name }}
              <span v-if="skill.level" class="ml-1 text-xs text-gray-500">({{ skill.level }})</span>
            </span>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500 text-center">
        Error loading skills data. Please try again later.
      </div>
      
      <div v-else class="text-center text-gray-500">
        No skills information available.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSkills } from '~/composables/directus/useSkills';

const { skillCategories, isLoading, error } = useSkills();
</script>