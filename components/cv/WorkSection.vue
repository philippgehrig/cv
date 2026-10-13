<template>
  <section id="work" class="work" aria-labelledby="work-title">
    <span id="experience" aria-hidden="true"></span>
    <div class="section-heading">
      <h2 id="work-title">What that means in practice.</h2>
      <span class="eyebrow">Current work</span>
    </div>

    <div class="work-intro">
      <div>
        <span class="eyebrow">{{ portfolio.project.context }}</span>
        <h3>{{ portfolio.project.title }}</h3>
        <span class="scope">{{ portfolio.project.scope }}</span>
      </div>
      <p>{{ portfolio.project.description }}</p>
    </div>

    <div class="project-grid">
      <article v-for="area in portfolio.workAreas" :key="area.id" class="project">
        <div class="art" :class="`art-${area.id}`" aria-hidden="true">
          <svg v-if="area.id === 'language'" viewBox="0 0 210 75" focusable="false">
            <path d="M35 38L105 17L175 38L105 60Z M35 38H175" fill="none" stroke="#718166" stroke-width="1.5" />
            <g fill="#dee4d5" stroke="#566847" stroke-width="1.5">
              <circle cx="35" cy="38" r="10" />
              <circle cx="105" cy="17" r="10" />
              <circle cx="175" cy="38" r="10" />
              <circle cx="105" cy="60" r="10" />
            </g>
          </svg>
          <template v-else-if="area.id === 'services'">
            <span class="chip">Tools</span><span>&harr;</span><span class="chip">Data</span>
          </template>
          <template v-else>
            <span class="node">Context</span>&harr;<span class="node">AI</span>&harr;<span class="node">Tools</span>
          </template>
        </div>
        <div class="project-copy">
          <span class="eyebrow">{{ area.label }}</span>
          <h3>{{ area.title }}</h3>
          <p>{{ area.description }}</p>
        </div>
      </article>
    </div>

    <details class="earlier">
      <summary>Earlier work &mdash; software approvals, vehicle computing &amp; student racing</summary>
      <div class="earlier-grid">
        <article v-for="work in portfolio.earlierWork" :key="work.title">
          <h3>{{ work.title }}</h3>
          <p>{{ work.description }}</p>
        </article>
      </div>
    </details>
  </section>
</template>

<script setup lang="ts">
import { portfolioData as portfolio } from '~/composables/data/portfolioData';
</script>

<style scoped>
.work { border-top: 1px solid var(--color-line); padding-top: 1.875rem; }
.section-heading { display: flex; justify-content: space-between; align-items: end; gap: 1.25rem; margin-bottom: 1.875rem; }
.section-heading h2 { font-size: 1.75rem; font-weight: 500; line-height: 1.2; letter-spacing: -0.035em; }
.section-heading .eyebrow { flex-shrink: 0; }

.work-intro {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 2.1875rem;
  margin-bottom: 1.125rem;
  padding: 1.875rem;
  border-radius: 1.125rem;
  background: #e5dfd3;
}

.work-intro h3 { max-width: 12rem; margin: 0.8125rem 0 0.9375rem; font-size: 2.25rem; font-weight: 500; line-height: 1.15; letter-spacing: -0.035em; }
.work-intro .eyebrow { color: #685d51; }
.scope { font-size: 0.8125rem; color: #685d51; }
.work-intro p { align-self: center; font-size: 1rem; color: #62574d; }
.project-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.9375rem; }
.project { background: var(--color-surface); border-radius: 1.0625rem; overflow: hidden; }
.art { height: 110px; display: flex; align-items: center; justify-content: center; gap: 0.9375rem; padding: 1.25rem; font: 0.75rem var(--font-mono); }
.art-language { background: #dee4d5; }
.art-language svg { width: 210px; height: 75px; max-width: 100%; }
.art-services { background: #deddd4; color: #565a4c; }
.chip { border: 2px dashed #828574; padding: 0.9375rem; box-shadow: inset 0 0 0 4px #deddd4, inset 0 0 0 5px #828574; }
.art-ai { background: #edd8bf; gap: 0.5rem; color: #69492f; }
.node { border: 1px solid #99714f; padding: 0.625rem 0.5rem; border-radius: 1.25rem; font-size: 0.625rem; }
.project-copy { padding: 1.4375rem; }
.project-copy .eyebrow { font-size: 0.625rem; letter-spacing: 0.05em; }
.project h3 { margin: 0.875rem 0 0.5625rem; font-size: 1.25rem; font-weight: 500; letter-spacing: -0.03em; }
.project p { font-size: 0.9375rem; color: var(--color-muted); }
.earlier { margin-top: 1.375rem; padding: 0 0.25rem; color: var(--color-muted); }
.earlier summary { padding: 0.875rem 0; color: var(--color-ink); cursor: pointer; font-size: 0.875rem; }
.earlier-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4375rem; padding: 0.75rem 0 0.375rem; }
.earlier h3 { margin-bottom: 0.375rem; font-size: 0.9375rem; font-weight: 500; color: var(--color-ink); }
.earlier p { font-size: 0.875rem; }

@media (max-width: 800px) {
  .project-grid, .earlier-grid { grid-template-columns: 1fr; }
}

@media (max-width: 650px) {
  .section-heading { flex-direction: column; align-items: start; gap: 0.75rem; }
  .section-heading h2 { font-size: 1.625rem; }
  .work-intro { grid-template-columns: 1fr; gap: 1.0625rem; padding: 1.5625rem; }
  .earlier-grid { gap: 0.9375rem; }
}
</style>
