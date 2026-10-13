<template>
  <section id="background" class="about" aria-labelledby="background-title">
    <div>
      <h2 id="background-title">Engineering, hands-on.<br>Learning, ongoing.</h2>
      <p>{{ portfolio.background }} Alongside my work, I'm studying for a master's in {{ study.subject }}.</p>
    </div>
    <dl class="path">
      <div>
        <dt>Current role</dt>
        <dd>{{ profile.title }} &middot; Mercedes-Benz</dd>
      </div>
      <div>
        <dt>Since {{ study.since }}</dt>
        <dd>Master's studies &middot; {{ study.subject }}</dd>
      </div>
      <div>
        <dt>2025 &mdash; 2026</dt>
        <dd>System Architect &middot; Mercedes-Benz</dd>
      </div>
      <div>
        <dt>2022 &mdash; 2025</dt>
        <dd>B.Sc. Computer Science &middot; DHBW / Mercedes-Benz</dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { profileData as profile } from '~/composables/data/profileData';
import { mastersEducation as study } from '~/composables/data/educationData';
import { portfolioData as portfolio } from '~/composables/data/portfolioData';
</script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.8125rem;
  margin: 2.375rem 0;
  padding: 1.875rem 0;
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
}

h2 { margin-bottom: 0.9375rem; font: 400 1.9375rem/1.2 Georgia, serif; }
p { font-size: 0.9375rem; color: var(--color-muted); }
.path { display: flex; flex-direction: column; gap: 1.125rem; font-size: 0.9375rem; }
dt { margin-bottom: 0.3125rem; color: var(--color-muted); font: 0.6875rem var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em; }

@media (max-width: 650px) {
  .about { grid-template-columns: 1fr; gap: 1.6875rem; }
}
</style>
