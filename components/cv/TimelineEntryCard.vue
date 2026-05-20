<template>
  <div
    class="timeline-entry relative pl-6 pb-6"
    :class="[`entry-${entry.type}`]"
    ref="entryRef"
  >
    <!-- Node on timeline -->
    <div
      class="absolute left-0 top-5 w-3 h-3 rounded-full border-2 bg-dark-900 -translate-x-1/2 z-10 node"
      :class="nodeClass"
    ></div>

    <!-- Card -->
    <div
      class="entry-card ml-4 rounded-xl border bg-dark-800/60 backdrop-blur-sm p-5 md:p-6 transition-all duration-300 cursor-pointer"
      :class="[
        expanded ? 'border-white/20 bg-dark-800' : 'border-white/5 hover:border-white/10 hover:bg-dark-800',
      ]"
      @click="toggle"
    >
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div class="flex-1 min-w-0">
          <div class="entry-period text-xs font-mono mb-1" :class="periodClass">
            {{ entry.period }}
          </div>
          <h3 class="text-base font-semibold text-zinc-50 leading-tight">{{ entry.title }}</h3>
          <p class="text-sm text-zinc-500 mt-0.5">{{ entry.subtitle }}</p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <span
            class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider"
            :class="badgeClass"
          >{{ entry.type }}</span>
          <svg
            v-if="hasExpandable"
            class="w-3.5 h-3.5 text-zinc-600 transition-transform duration-300"
            :class="{ 'rotate-180': expanded }"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-zinc-400 leading-relaxed">{{ entry.description }}</p>

      <!-- Technologies -->
      <div v-if="entry.technologies?.length" class="flex flex-wrap gap-1.5 mt-3 tags-container">
        <span
          v-for="(tech, i) in entry.technologies"
          :key="i"
          class="tag-item px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-zinc-400"
        >{{ tech }}</span>
      </div>

      <!-- Expandable content -->
      <Transition
        enter-active-class="transition-all duration-[400ms] ease-out overflow-hidden"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-[600px]"
        leave-active-class="transition-all duration-300 ease-in overflow-hidden"
        leave-from-class="opacity-100 max-h-[600px]"
        leave-to-class="opacity-0 max-h-0"
      >
        <div v-if="expanded && hasExpandable" class="mt-4 pt-4 border-t border-white/5">
          <!-- Extra description -->
          <p v-if="entry.expandedContent?.description" class="text-sm text-zinc-400 leading-relaxed mb-3">
            {{ entry.expandedContent.description }}
          </p>

          <!-- Courses grid -->
          <div v-if="entry.expandedContent?.courses?.length" class="space-y-2">
            <h4 class="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Modules</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <div
                v-for="(course, ci) in entry.expandedContent.courses"
                :key="ci"
                class="course-item flex items-center justify-between px-3 py-2 rounded-lg border text-sm"
                :class="courseCardClass"
              >
                <span class="text-zinc-300 text-xs">{{ course.name }}</span>
                <div class="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span class="text-[10px] text-zinc-600">{{ course.ects }} ECTS</span>
                  <span class="font-mono text-xs" :class="gradeColor(course.grade)">{{ course.grade.toFixed(1) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Extra technologies -->
          <div v-if="entry.expandedContent?.technologies?.length" class="flex flex-wrap gap-1.5 mt-3">
            <span
              v-for="(tech, i) in entry.expandedContent.technologies"
              :key="i"
              class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-zinc-400"
            >{{ tech }}</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TimelineEntry } from '~/composables/data/types';

const props = defineProps<{ entry: TimelineEntry }>();
const entryRef = ref<HTMLElement>();
const expanded = ref(false);

const hasExpandable = computed(() =>
  props.entry.expandedContent?.courses?.length ||
  props.entry.expandedContent?.description ||
  props.entry.expandedContent?.technologies?.length
);

const toggle = () => {
  if (hasExpandable.value) {
    expanded.value = !expanded.value;
  }
};

const nodeClass = computed(() => {
  switch (props.entry.type) {
    case 'work': return 'border-accent shadow-[0_0_8px_rgba(99,102,241,0.4)]';
    case 'education': return 'border-teal shadow-[0_0_8px_rgba(20,184,166,0.4)]';
    case 'extracurricular': return 'border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]';
  }
});

const periodClass = computed(() => {
  switch (props.entry.type) {
    case 'work': return 'text-accent-light';
    case 'education': return 'text-teal-light';
    case 'extracurricular': return 'text-amber-400';
  }
});

const badgeClass = computed(() => {
  switch (props.entry.type) {
    case 'work': return 'bg-accent/10 border border-accent/20 text-accent';
    case 'education': return 'bg-teal/10 border border-teal/20 text-teal';
    case 'extracurricular': return 'bg-amber-400/10 border border-amber-400/20 text-amber-400';
  }
});

const courseCardClass = computed(() => {
  switch (props.entry.type) {
    case 'education': return 'bg-teal/5 border-teal/10';
    default: return 'bg-white/[0.03] border-white/10';
  }
});

function gradeColor(grade: number): string {
  if (grade <= 1.5) return 'text-emerald-400';
  if (grade <= 2.5) return 'text-teal';
  if (grade <= 3.5) return 'text-amber-400';
  return 'text-red-400';
}
</script>
