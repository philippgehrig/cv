<template>
  <footer class="site-wrap">
    <div class="footer-top">
      <p>{{ profile.name }} &copy; {{ year }} <span class="footer-title">&middot; {{ profile.title }}</span></p>
      <div class="social-links">
        <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">&nearr;</span></a>
        <a v-if="profile.github" :href="profile.github" target="_blank" rel="noopener noreferrer">Find me on GitHub <span aria-hidden="true">&nearr;</span></a>
      </div>
    </div>
    <nav class="policy-links" aria-label="Legal information">
      <NuxtLink to="/policies/legal-notice">Legal Notice</NuxtLink>
      <NuxtLink to="/policies/privacy-policy">Privacy Policy</NuxtLink>
      <NuxtLink to="/policies/terms-of-use">Terms of Use</NuxtLink>
      <NuxtLink to="/policies/sitemap">Sitemap</NuxtLink>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import { profileData as profile } from '~/composables/data/profileData';

const year = new Date().getFullYear();
</script>

<style scoped>
footer { margin-top: 0.625rem; padding-block: 1.5625rem; color: var(--color-muted); font-size: 0.75rem; }
.footer-top { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; align-items: center; }
.social-links, .policy-links { display: flex; flex-wrap: wrap; gap: 0.5rem 1.375rem; align-items: center; }
.policy-links { margin-top: 1rem; border-top: 1px solid var(--color-line); padding-top: 0.75rem; }
a { display: inline-flex; align-items: center; gap: 0.375rem; min-height: 32px; }
a:hover { color: var(--color-ink); text-decoration: underline; text-underline-offset: 0.25em; }
.footer-title { display: inline-block; }
</style>
