<template>
  <div>
    <HeroScene />
    <TimelineScene />
    <ContactScene />
  </div>
</template>

<script setup lang="ts">
import HeroScene from '~/components/cv/HeroScene.vue';
import TimelineScene from '~/components/cv/TimelineScene.vue';
import ContactScene from '~/components/cv/ContactScene.vue';

definePageMeta({
  title: 'Philipp Gehrig - Software Engineer',
  description: 'Professional CV of Philipp Gehrig, Software Engineer'
});
</script>
