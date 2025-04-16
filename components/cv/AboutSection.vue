<!-- About section component for the CV -->
<template>
  <section id="about" class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">About Me</h2>
      
      <div v-if="isLoading" class="flex justify-center">
        <div class="animate-pulse">Loading profile information...</div>
      </div>
      
      <div v-else-if="profile" class="flex flex-col md:flex-row items-center gap-8">
        <div class="md:w-1/3">
          <div class="bg-gray-300 w-64 h-64 rounded-full mx-auto">
            <!-- Placeholder for profile picture -->
            <div v-if="profile.profile_image" class="w-full h-full rounded-full overflow-hidden">
              <img :src="profile.profile_image" alt="Profile Photo" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
              Profile Photo
            </div>
          </div>
        </div>
        <div class="md:w-2/3">
          <h3 class="text-2xl font-semibold mb-4">{{ profile.name }}</h3>
          <h4 class="text-xl text-blue-600 mb-4">{{ profile.title }}</h4>
          <p class="text-gray-700 mb-6">{{ profile.bio }}</p>
          <div class="flex gap-4">
            <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">LinkedIn</a>
            <a v-if="profile.github" :href="profile.github" target="_blank" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">GitHub</a>
            <a v-if="profile.twitter" :href="profile.twitter" target="_blank" class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500">Twitter</a>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500 text-center">
        Error loading profile data. Please try again later.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProfile } from '~/composables/directus/useProfile';

const { profile, isLoading, error } = useProfile();
</script>