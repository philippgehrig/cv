<template>
  <section id="contact" class="contact" aria-labelledby="contact-title">
    <div>
      <h2 id="contact-title">Let's talk engineering.</h2>
      <p>{{ portfolio.contact }}</p>
      <a v-if="profile.email" class="email-link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
    </div>
    <a
      v-if="profile.linkedin"
      class="button"
      :href="profile.linkedin"
      target="_blank"
      rel="noopener noreferrer"
    >
      Say hello <span class="sr-only">on LinkedIn</span><span aria-hidden="true">&nearr;</span>
    </a>
  </section>
</template>

<script setup lang="ts">
import { profileData as profile } from '~/composables/data/profileData';
import { portfolioData as portfolio } from '~/composables/data/portfolioData';
</script>

<style scoped>
.contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.75rem;
  padding: 2rem;
  border-radius: 1.125rem;
  background: var(--color-ink);
  color: #f8eee3;
}

h2 { font-size: 1.875rem; font-weight: 500; letter-spacing: -0.035em; line-height: 1.2; }
p { margin-top: 0.5rem; color: #c6bcb1; font-size: 0.9375rem; }
.email-link { display: inline-block; margin-top: 0.875rem; font-size: 0.875rem; text-decoration: underline; text-underline-offset: 0.25em; }
.email-link:hover { color: #f3ddaa; }
.button { flex-shrink: 0; background: #f3ddaa; color: var(--color-ink); }
.button:hover { background: #fae9c7; }

@media (max-width: 650px) {
  .contact { flex-direction: column; align-items: start; padding: 1.6875rem; }
  h2 { font-size: 1.75rem; }
}
</style>
