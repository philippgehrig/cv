<!-- Footer component for the CV website -->
<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <div v-if="isLoading" class="animate-pulse h-6 w-32 bg-gray-700 rounded"></div>
          <template v-else-if="profile">
            <h2 class="text-xl font-bold">{{ profile.name }}</h2>
            <p class="text-gray-400">Software Engineer</p>
          </template>
        </div>
        
        <div class="flex space-x-4">
          <template v-if="profile">
            <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="hover:text-blue-300 transition-colors">LinkedIn</a>
            <a v-if="profile.github" :href="profile.github" target="_blank" class="hover:text-blue-300 transition-colors">GitHub</a>
            <a v-if="profile.twitter" :href="profile.twitter" target="_blank" class="hover:text-blue-300 transition-colors">Twitter</a>
          </template>
        </div>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} {{ profile?.name || 'Your Name' }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useProfile } from '~/composables/directus/useProfile';

const { profile, isLoading } = useProfile();
</script>