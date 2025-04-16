<!-- Apple-inspired About section component -->
<template>
  <section id="about" class="py-20 md:py-32 bg-white">
    <div class="container mx-auto px-6 max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-16 text-apple-gray-900">About Me</h2>
      
      <div v-if="isLoading" class="flex justify-center">
        <div class="animate-pulse w-full max-w-2xl mx-auto h-12 bg-apple-gray-100 rounded-lg"></div>
      </div>
      
      <div v-else-if="profile" class="flex flex-col items-center">
        <!-- Profile image with Apple-style design -->
        <div class="mb-12 transform transition-all duration-700 hover:scale-105">
          <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-apple mx-auto">
            <div v-if="profile.profile_image" class="w-full h-full">
              <img :src="profile.profile_image" alt="Profile Photo" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-full h-full flex items-center justify-center bg-apple-gray-100 text-apple-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Bio content with Apple's typography style -->
        <div class="max-w-3xl mx-auto text-center">
          <h3 class="text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-apple-gray-900">{{ profile.name }}</h3>
          <h4 class="text-xl md:text-2xl text-apple-blue mb-8">{{ profile.title }}</h4>
          
          <p class="text-lg leading-relaxed text-apple-gray-500 mb-10 max-w-2xl mx-auto">{{ profile.bio }}</p>
          
          <!-- Apple-style buttons for social media -->
          <div class="flex flex-wrap gap-5 justify-center">
            <a 
              v-if="profile.linkedin" 
              :href="profile.linkedin" 
              target="_blank" 
              class="inline-flex items-center px-4 py-2 rounded-full bg-apple-blue text-white text-sm font-medium hover:bg-apple-blue-dark transition-colors duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              v-if="profile.github" 
              :href="profile.github" 
              target="_blank" 
              class="inline-flex items-center px-4 py-2 rounded-full bg-apple-gray-800 text-white text-sm font-medium hover:bg-black transition-colors duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              GitHub
            </a>
            <a 
              v-if="profile.twitter" 
              :href="profile.twitter" 
              target="_blank" 
              class="inline-flex items-center px-4 py-2 rounded-full bg-[#1DA1F2] text-white text-sm font-medium hover:bg-[#0c85d0] transition-colors duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              Twitter
            </a>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500 text-center">
        <p class="text-lg">Error loading profile data. Please try again later.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProfile } from '~/composables/directus/useProfile';

const { profile, isLoading, error } = useProfile();
</script>