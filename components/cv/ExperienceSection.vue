<template>
  <section id="experience" class="py-24 relative">
    <!-- Section separator -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-4">
          <span class="inline-block w-6 h-px bg-accent"></span>
          <span class="text-xs font-mono tracking-widest text-accent uppercase">Career</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50">Work Experience</h2>
      </div>

      <!-- Skeleton -->
      <div v-if="isLoading" class="space-y-6">
        <div v-for="i in 2" :key="i" class="animate-pulse rounded-xl border border-white/5 bg-dark-800 p-6">
          <div class="h-5 w-2/5 bg-white/10 rounded mb-3"></div>
          <div class="h-4 w-1/4 bg-white/10 rounded mb-6"></div>
          <div class="space-y-2">
            <div class="h-3 w-full bg-white/10 rounded"></div>
            <div class="h-3 w-5/6 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Experience entries -->
      <div v-else-if="experiences.length > 0" class="space-y-6">
        <div
          v-for="job in experiences"
          :key="job.id"
          class="rounded-xl border border-white/5 bg-dark-800/60 backdrop-blur-sm p-6 md:p-8 hover:border-white/10 hover:bg-dark-800 transition-all duration-300 group"
        >
          <!-- Company header -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h3 class="text-xl font-semibold text-zinc-50">
                {{ job.roles && job.roles.length > 0 ? job.company : job.position }}
              </h3>
              <p class="text-sm text-zinc-500 mt-1">
                {{ job.roles && job.roles.length > 0 ? job.position : job.company }}
              </p>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
              <img
                v-if="getCompanyLogo(job.company)"
                :src="getCompanyLogo(job.company) || undefined"
                :alt="`${job.company} logo`"
                class="h-7 object-contain opacity-60 group-hover:opacity-90 transition-opacity"
                :class="getLogoClass(job.company)"
              />
              <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-xs font-mono text-accent whitespace-nowrap">
                {{ job.period }}
              </span>
            </div>
          </div>

          <!-- Simple job (no roles) -->
          <div v-if="!job.roles || job.roles.length === 0">
            <p class="text-zinc-400 text-sm leading-relaxed mb-4">{{ job.description }}</p>
            <div v-if="job.technologies?.length" class="flex flex-wrap gap-2">
              <span
                v-for="(tech, i) in job.technologies"
                :key="i"
                class="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-zinc-400"
              >{{ tech }}</span>
            </div>
          </div>

          <!-- Multi-role job -->
          <div v-else class="space-y-1">
            <p v-if="job.description" class="text-zinc-400 text-sm leading-relaxed mb-5">{{ job.description }}</p>

            <div
              v-for="(role, ri) in job.roles"
              :key="ri"
              class="group/role border-l border-white/10 pl-4 py-3 hover:border-accent/50 transition-all duration-200 cursor-pointer"
              @click="toggleRole(job.id, ri)"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 class="text-sm font-medium text-zinc-200 group-hover/role:text-white transition-colors">
                  {{ role.title }}
                </h4>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono text-zinc-500">{{ role.period }}</span>
                  <svg
                    class="w-3.5 h-3.5 text-zinc-600 group-hover/role:text-zinc-400 transition-all duration-200"
                    :class="{ 'rotate-180': isRoleOpen(job.id, ri) }"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>

              <!-- Expandable detail -->
              <Transition
                enter-active-class="transition-all duration-300 ease-smooth overflow-hidden"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-64"
                leave-active-class="transition-all duration-200 ease-smooth overflow-hidden"
                leave-from-class="opacity-100 max-h-64"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="isRoleOpen(job.id, ri)" class="mt-3">
                  <p class="text-sm text-zinc-400 leading-relaxed mb-3">{{ role.description }}</p>
                  <div v-if="role.technologies?.length" class="flex flex-wrap gap-1.5">
                    <span
                      v-for="(tech, ti) in role.technologies"
                      :key="ti"
                      class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-zinc-400"
                    >{{ tech }}</span>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="text-red-400 text-sm">
        Error loading experience data. Please try again later.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useExperiences } from '~/composables/useExperiences';

const { experiences, isLoading, error } = useExperiences();

/**
 * Tracks which role rows are currently expanded.
 * Keys follow the pattern `"${jobId}-${roleIndex}"` so that each role within
 * each company can be toggled independently.
 */
const openRoles = ref(new Set<string>());

/**
 * Toggles the expanded state of a role row.
 * @param jobId - The `id` of the parent `Experience` entry.
 * @param roleIndex - The zero-based index of the role within `Experience.roles`.
 */
const toggleRole = (jobId: number, roleIndex: number) => {
  const key = `${jobId}-${roleIndex}`;
  if (openRoles.value.has(key)) {
    openRoles.value.delete(key);
  } else {
    openRoles.value.add(key);
  }
};

/**
 * Returns `true` if the given role row is currently expanded.
 * @param jobId - The `id` of the parent `Experience` entry.
 * @param roleIndex - The zero-based index of the role within `Experience.roles`.
 */
const isRoleOpen = (jobId: number, roleIndex: number) => {
  return openRoles.value.has(`${jobId}-${roleIndex}`);
};

/**
 * Maps a company name to its logo file path.
 * Matching is case-insensitive and based on key substrings so that minor
 * name variations (e.g. "Mercedes-Benz" vs "Mercedes Benz") still resolve.
 *
 * @param company - The company name from the experience data.
 * @returns The logo path, or `null` if no logo is available for this company.
 */
function getCompanyLogo(company: string): string | null {
  const c = company.toLowerCase();
  if (c.includes('mercedes') || c.includes('benz')) return '/images/logos/mercedes-benz.png';
  if (c.includes('dhbw') && c.includes('engineering')) return '/images/logos/dhbw-engineering.svg';
  if (c.includes('dhbw')) return '/images/logos/dhbw.png';
  return null;
}

/**
 * Returns the CSS class controlling how a company logo blends with the dark
 * card background.
 *
 * - `logo-dark`: logos with a white/light solid background — rendered using
 *   `mix-blend-mode: screen` so the background appears transparent.
 * - `logo-transparent`: logos that already use a transparent background with
 *   light-coloured elements — rendered without any blend-mode adjustment.
 *
 * @param company - The company name from the experience data.
 */
function getLogoClass(company: string): string {
  const c = company.toLowerCase();
  if (c.includes('dhbw') && c.includes('engineering')) return 'logo-transparent';
  return 'logo-dark';
}
</script>

<style scoped>
/**
 * Logos with a white/light solid background: mix-blend-mode "screen" makes
 * white appear transparent so the logo colours show through on the dark card.
 */
.logo-dark {
  mix-blend-mode: screen;
  filter: brightness(0.9) contrast(1.1);
}

/**
 * Logos that already have a transparent background with light-coloured
 * elements: render directly on the dark card without any blend-mode.
 */
.logo-transparent {
  mix-blend-mode: normal;
}
</style>
