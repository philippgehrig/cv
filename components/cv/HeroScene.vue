<template>
  <div id="about">
    <header id="top" class="greeting">
      <h1>{{ portfolio.headline }}</h1>
      <p>{{ portfolio.focus }}</p>
    </header>

    <div class="dashboard">
      <section class="intro-card" aria-labelledby="intro-title">
        <div class="intro-copy">
          <span class="eyebrow">Hi, I'm {{ profile.name.split(' ')[0] }}.</span>
          <h2 id="intro-title">{{ profile.title }}</h2>
          <p>{{ profile.bio }}</p>
        </div>
        <figure v-if="profile.profile_image" class="intro-portrait">
          <img
            :src="profile.profile_image"
            :alt="profile.name"
            width="640"
            height="640"
            fetchpriority="high"
          >
        </figure>
      </section>

      <section id="education" class="learning" aria-labelledby="learning-title">
        <span class="eyebrow">A new chapter / {{ study.since }}</span>
        <h2 id="learning-title">{{ study.subject }}.</h2>
        <p>Master's studies at {{ study.institutionShort }},<br>alongside my engineering work.</p>
        <p class="study-status">
          In progress &middot; Since <time :datetime="study.startDate">{{ study.since }}</time>
        </p>
      </section>
    </div>

    <div class="statement">
      <span class="eyebrow">The problem I work on</span>
      <p>{{ portfolio.problem }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profileData as profile } from '~/composables/data/profileData';
import { mastersEducation as study } from '~/composables/data/educationData';
import { portfolioData as portfolio } from '~/composables/data/portfolioData';
</script>

<style scoped>
.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1.375rem 0 1.625rem;
}

.greeting h1 {
  max-width: 650px;
  font-size: clamp(2.2rem, 3.6vw, 2.75rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.greeting p {
  max-width: 12rem;
  color: var(--color-muted);
  font-size: 0.875rem;
}

.dashboard {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  gap: 1rem;
}

.intro-card {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 0.75rem;
  padding: 2rem 1.5rem 0;
  min-height: 330px;
  border-radius: 1.25rem;
  background: linear-gradient(120deg, #e7cfbb, #dfbea5);
}

.intro-copy {
  align-self: center;
  min-width: 0;
  padding-bottom: 1.875rem;
}

.intro-copy .eyebrow { color: #644836; }

.intro-copy h2 {
  max-width: 7em;
  text-wrap: balance;
  margin: 1.5rem 0 1.125rem;
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.04em;
}

.intro-copy p { color: #654b3d; font-size: 0.9375rem; }

.intro-portrait {
  align-self: end;
  justify-self: center;
  width: 100%;
  max-width: 300px;
  margin: 0;
}

.intro-portrait img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: 0;
}

.learning {
  display: flex;
  flex-direction: column;
  padding: 1.9375rem;
  border-radius: 1.25rem;
  background: #e0dce9;
  color: #605376;
}

.learning h2 {
  max-width: 11ch;
  margin: 1.6875rem 0 1rem;
  color: var(--color-ink);
  font: 400 2.125rem/1.12 Georgia, serif;
  letter-spacing: -0.025em;
}

.learning p { font-size: 0.9375rem; }
.learning .eyebrow { color: inherit; }

.learning .study-status {
  margin-top: auto;
  padding-top: 1.4375rem;
  color: #514560;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.study-status::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 7px;
  border-radius: 50%;
  background: #75638e;
}

.statement {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: baseline;
  gap: 2.5rem;
  padding: 1.9375rem 0 2.3125rem;
}

.statement p { font-size: 1.125rem; line-height: 1.55; letter-spacing: -0.02em; }

@media (max-width: 900px) {
  .dashboard { grid-template-columns: 1fr; }
}

@media (max-width: 650px) {
  .greeting { display: block; padding: 1.125rem 0 1.375rem; }
  .greeting p { max-width: none; margin-top: 0.625rem; }
  .intro-card { grid-template-columns: 1fr; padding: 1.6875rem 1.5625rem 0; min-height: 0; gap: 0; }
  .intro-copy { padding-bottom: 0; }
  .intro-copy h2 { font-size: 1.875rem; margin-top: 1.25rem; }
  .intro-portrait { max-width: 280px; }
  .learning { padding: 1.625rem; }
  .learning h2 { margin: 1.0625rem 0; }
  .statement { grid-template-columns: 1fr; gap: 0.9375rem; padding: 1.875rem 0; }
}
</style>
