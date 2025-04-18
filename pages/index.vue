<template>
  <div>
    <AboutSection />
    <ExperienceSection />
    <EducationSection />
  </div>
</template>

<script setup lang="ts">
import AboutSection from '~/components/cv/AboutSection.vue';
import ExperienceSection from '~/components/cv/ExperienceSection.vue';
import EducationSection from '~/components/cv/EducationSection.vue';

definePageMeta({
  title: 'Philipp Gehrig - Software Engineer',
  description: 'Professional CV of Philipp Gehrig, Software Engineer'
});
</script>