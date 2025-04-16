<template>
  <div class="min-h-screen font-apple bg-white text-apple-gray-800">
    <Navbar />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue';
import Footer from '~/components/layout/Footer.vue';
</script>
