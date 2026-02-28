<template>
  <div class="min-h-screen font-sans bg-dark-900 text-zinc-300 antialiased">
    <!-- Subtle background grid -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <!-- Top radial glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-accent-glow via-transparent to-transparent opacity-60 blur-3xl"></div>
    </div>
    <Navbar />
    <main class="relative">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue';
import Footer from '~/components/layout/Footer.vue';
</script>

