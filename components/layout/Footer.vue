<!-- Apple-inspired footer component -->
<template>
  <footer class="py-10 bg-apple-gray-50 border-t border-apple-gray-100">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-6 md:mb-0">
          <div v-if="isLoading" class="animate-pulse h-6 w-32 bg-apple-gray-200 rounded-lg"></div>
          <template v-else-if="profile">
            <h2 class="text-xl font-semibold tracking-tight text-apple-gray-900">{{ profile.name }}</h2>
            <p class="text-apple-gray-500 text-sm mt-1">{{ profile.title || 'Software Engineer' }}</p>
          </template>
        </div>
        
        <div class="flex space-x-6 mb-6 md:mb-0">
          <template v-if="profile">
            <a 
              v-if="profile.linkedin" 
              :href="profile.linkedin" 
              target="_blank" 
              class="text-apple-gray-500 hover:text-apple-blue transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              v-if="profile.github" 
              :href="profile.github" 
              target="_blank" 
              class="text-apple-gray-500 hover:text-apple-gray-900 transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
            <a
              v-if="profile.x" 
              :href="profile.x" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              class="text-apple-gray-500 hover:text-black transition-colors duration-300"
            >
              <IconX class="h-5 w-5" />
            </a>
          </template>
        </div>
      </div>
      
      <!-- Footer content -->
      <div class="mt-8 pt-6 border-t border-apple-gray-200 text-center">
        <div class="flex flex-col md:flex-row justify-center md:justify-between items-center">
          <p class="text-apple-gray-500 text-sm mb-4 md:mb-0">
            &copy; {{ new Date().getFullYear() }} {{ profile?.name || 'Your Name' }}. All rights reserved.
          </p>
          
          <div class="flex space-x-6 text-xs text-apple-gray-500">
            <NuxtLink to="/policies/legal-notice" class="hover:text-apple-blue transition-colors duration-300">Legal Notice</NuxtLink>
            <NuxtLink to="/policies/privacy-policy" class="hover:text-apple-blue transition-colors duration-300">Privacy Policy</NuxtLink>
            <NuxtLink to="/policies/terms-of-use" class="hover:text-apple-blue transition-colors duration-300">Terms of Use</NuxtLink>
            <NuxtLink to="/policies/sitemap" class="hover:text-apple-blue transition-colors duration-300">Sitemap</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/useProfile';
import IconX from '~/components/icons/IconX.vue';

const { profile, isLoading } = useProfile();
</script>