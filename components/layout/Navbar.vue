<template>
  <header class="site-wrap">
    <nav class="nav" aria-label="Main navigation">
      <NuxtLink to="/" class="brand">
        <span class="monogram" aria-hidden="true">p</span>{{ profile.name }}
      </NuxtLink>
      <div class="nav-links">
        <NuxtLink to="/#work" class="work-link">My work</NuxtLink>
        <NuxtLink to="/#contact" class="nav-contact">Say hello <span aria-hidden="true">&nearr;</span></NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { profileData as profile } from '~/composables/data/profileData';
</script>

<style scoped>
.nav { display: flex; justify-content: space-between; align-items: center; gap: 1.25rem; min-height: 92px; }
.brand { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1.0625rem; font-weight: 700; letter-spacing: -0.04em; }
.monogram { display: inline-grid; place-items: center; width: 27px; height: 27px; border-radius: 50%; background: #7d4938; color: #fff4e9; font: 0.9375rem Georgia, serif; }
.nav-links { display: flex; align-items: center; gap: 1.5625rem; font-size: 0.8125rem; }
.work-link:hover { text-decoration: underline; text-underline-offset: 0.3em; }
.nav-contact { display: inline-flex; gap: 0.75rem; align-items: center; min-height: 44px; padding: 0.625rem 0.9375rem; border-radius: 2rem; background: var(--color-ink); color: #fff; white-space: nowrap; }
.nav-contact:hover { background: #51443c; }

@media (max-width: 650px) {
  .nav { min-height: 75px; gap: 0.75rem; }
  .nav-links { gap: 0.875rem; }
  .work-link { display: none; }
}

@media (max-width: 360px) {
  .brand { font-size: 0.9375rem; gap: 0.375rem; }
  .monogram { width: 23px; height: 23px; }
  .nav-contact { padding-inline: 0.75rem; gap: 0.375rem; }
}
</style>
