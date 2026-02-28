<template>
  <section id="education" class="py-24 relative">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-4">
          <span class="inline-block w-6 h-px bg-teal"></span>
          <span class="text-xs font-mono tracking-widest text-teal uppercase">Academic</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50">Education</h2>
      </div>

      <!-- Skeleton -->
      <div v-if="isLoading" class="space-y-6">
        <div v-for="i in 1" :key="i" class="animate-pulse rounded-xl border border-white/5 bg-dark-800 p-6">
          <div class="h-4 w-1/4 bg-white/10 rounded mb-3"></div>
          <div class="h-6 w-2/3 bg-white/10 rounded mb-2"></div>
          <div class="h-4 w-1/3 bg-white/10 rounded mb-5"></div>
          <div class="h-3 w-full bg-white/10 rounded"></div>
        </div>
      </div>

      <!-- Entries -->
      <div v-else-if="education.length > 0" class="space-y-6">
        <div
          v-for="edu in education"
          :key="edu.id"
          class="rounded-xl border border-white/5 bg-dark-800/60 backdrop-blur-sm p-6 md:p-8 hover:border-white/10 hover:bg-dark-800 transition-all duration-300"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h3 class="text-xl font-semibold text-zinc-50">{{ edu.degree }}</h3>
              <p class="text-sm text-zinc-500 mt-1">{{ edu.institution }}</p>
            </div>
            <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-teal/10 border border-teal/20 text-xs font-mono text-teal whitespace-nowrap flex-shrink-0">
              {{ edu.period }}
            </span>
          </div>
          <p class="text-sm text-zinc-400 leading-relaxed">{{ edu.description }}</p>
        </div>
      </div>

      <div v-else-if="error" class="text-red-400 text-sm">
        Error loading education data.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useEducation } from '~/composables/useEducation';

const { education, isLoading, error } = useEducation();
</script>
