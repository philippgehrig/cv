<template>
  <div>
    <AboutSection />
    <ExperienceSection />
    <EducationSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import AboutSection from '~/components/cv/AboutSection.vue';
import ExperienceSection from '~/components/cv/ExperienceSection.vue';
import EducationSection from '~/components/cv/EducationSection.vue';
import ContactSection from '~/components/cv/ContactSection.vue';

definePageMeta({
  title: 'Philipp Gehrig - Software Engineer',
  description: 'Professional CV of Philipp Gehrig, Software Engineer'
});
</script>
