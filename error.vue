<template>
  <div class="min-h-screen font-sans antialiased">
    <Navbar />
    <main id="main-content" tabindex="-1" class="site-wrap error-page">
      <p class="eyebrow">Error {{ error.statusCode }}</p>
      <h1>{{ is404 ? 'This page doesn’t exist.' : 'Something went wrong.' }}</h1>
      <p class="hint">
        {{ is404 ? 'The link may be outdated, or the address mistyped.' : 'Please try again in a moment.' }}
      </p>
      <button type="button" class="button home" @click="goHome">
        Back to home <span aria-hidden="true">&nearr;</span>
      </button>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import Navbar from '~/components/layout/Navbar.vue';
import Footer from '~/components/layout/Footer.vue';

const props = defineProps<{ error: NuxtError }>();

const is404 = computed(() => props.error.statusCode === 404);

useHead({ title: computed(() => (is404.value ? 'Page not found' : 'Error')) });

const goHome = () => clearError({ redirect: '/' });
</script>

<style scoped>
.error-page { padding-block: 4rem 6rem; }
h1 { margin-top: 1rem; font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 500; letter-spacing: -0.04em; line-height: 1.15; }
.hint { margin-top: 0.75rem; color: var(--color-muted); }
.home { margin-top: 2rem; border: 0; cursor: pointer; background: var(--color-ink); color: #fff; }
.home:hover { background: #51443c; }
</style>
