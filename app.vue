<template>
  <div>
    <Navbar />
    <main>
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue';
import Footer from '~/components/layout/Footer.vue';
import AboutSection from '~/components/cv/AboutSection.vue';
import ExperienceSection from '~/components/cv/ExperienceSection.vue';
import EducationSection from '~/components/cv/EducationSection.vue';
import SkillsSection from '~/components/cv/SkillsSection.vue';
import ContactSection from '~/components/cv/ContactSection.vue';
</script>
