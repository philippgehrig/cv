<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="max-w-3xl mx-auto px-6">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-50 mb-12">Sitemap</h1>

      <div class="space-y-10">
        <div>
          <h2 class="text-lg font-semibold text-zinc-200 mb-4">Main Pages</h2>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors">
                Home
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
              <p class="text-xs text-zinc-500 mt-1">My personal CV and professional information</p>
            </li>
          </ul>
        </div>

        <div class="border-t border-white/5 pt-8">
          <h2 class="text-lg font-semibold text-zinc-200 mb-4">Policy Pages</h2>
          <ul class="space-y-4">
            <li v-for="page in policyPages" :key="page.path">
              <NuxtLink :to="page.path" class="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors">
                {{ page.label }}
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
              <p class="text-xs text-zinc-500 mt-1">{{ page.description }}</p>
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

const policyPages = [
  { path: '/policies/privacy-policy', label: 'Privacy Policy', description: 'Information about how I handle your data' },
  { path: '/policies/legal-notice',   label: 'Legal Notice',   description: 'Legal information about this website' },
  { path: '/policies/terms-of-use',   label: 'Terms of Use',   description: 'Rules and regulations for using this website' },
  { path: '/policies/sitemap',        label: 'Sitemap',        description: 'Overview of all pages on this website' },
];
</script>
