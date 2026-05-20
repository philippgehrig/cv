<template>
  <div class="timeline-year-marker relative py-4 pl-6" ref="markerRef">
    <span class="text-2xl font-bold font-mono text-zinc-700">{{ year }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ year: number }>();
const markerRef = ref<HTMLElement>();

import { ref } from 'vue';
</script>
