<template>
  <div class="min-h-screen bg-white">
    <div class="py-20 md:py-32 bg-white">
      <div class="container mx-auto px-6 max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-16 text-apple-gray-900">Sitemap</h1>
        
        <div class="max-w-2xl mx-auto">
          <ul class="space-y-8">
            <li class="border-b border-apple-gray-100 pb-8">
              <h2 class="text-2xl font-semibold text-apple-gray-800 mb-4">Main Pages</h2>
              <ul class="space-y-3 text-apple-gray-600">
                <li>
                  <NuxtLink to="/" class="text-apple-blue hover:underline inline-flex items-center">
                    <span class="mr-2">Home</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </NuxtLink>
                  <p class="text-sm text-apple-gray-500 mt-1">My personal CV and professional information</p>
                </li>
                <li>
                  <NuxtLink to="/contact" class="text-apple-blue hover:underline inline-flex items-center">
                    <span class="mr-2">Contact</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </NuxtLink>
                  <p class="text-sm text-apple-gray-500 mt-1">Get in touch with me</p>
                </li>
              </ul>
            </li>
            
            <li>
              <h2 class="text-2xl font-semibold text-apple-gray-800 mb-4">Policy Pages</h2>
              <ul class="space-y-3 text-apple-gray-600">
                <li>
                  <NuxtLink to="/policies/privacy-policy" class="text-apple-blue hover:underline inline-flex items-center">
                    <span class="mr-2">Privacy Policy</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </NuxtLink>
                  <p class="text-sm text-apple-gray-500 mt-1">Information about how I handle your data</p>
                </li>
                <li>
                  <NuxtLink to="/policies/terms-of-use" class="text-apple-blue hover:underline inline-flex items-center">
                    <span class="mr-2">Terms of Use</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </NuxtLink>
                  <p class="text-sm text-apple-gray-500 mt-1">Rules and regulations for using this website</p>
                </li>
                <li>
                  <NuxtLink to="/policies/sitemap" class="text-apple-blue hover:underline inline-flex items-center">
                    <span class="mr-2">Sitemap</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </NuxtLink>
                  <p class="text-sm text-apple-gray-500 mt-1">Overview of all pages on this website</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Sitemap',
  description: 'Overview of all pages on Philipp Gehrig\'s personal website'
});
</script>