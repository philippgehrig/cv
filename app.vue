<template>
  <div class="min-h-screen font-sans antialiased">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <NuxtRouteAnnouncer />
    <Navbar />
    <main id="main-content" tabindex="-1">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue';
import Footer from '~/components/layout/Footer.vue';
</script>
