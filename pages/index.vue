<template>
  <div class="site-wrap">
    <HeroScene />
    <WorkSection />
    <AboutSection />
    <ContactScene />
  </div>
</template>

<script setup lang="ts">
import HeroScene from '~/components/cv/HeroScene.vue';
import WorkSection from '~/components/cv/WorkSection.vue';
import AboutSection from '~/components/cv/AboutSection.vue';
import ContactScene from '~/components/cv/ContactScene.vue';

import { profileData } from '~/composables/data/profileData';
import { portfolioData } from '~/composables/data/portfolioData';

useSeoMeta({
  title: `${profileData.name} - ${profileData.title}`,
  description: profileData.bio,
  ogTitle: `${profileData.name} - ${profileData.title}`,
  ogDescription: portfolioData.headline,
  ogType: 'website'
});
</script>
