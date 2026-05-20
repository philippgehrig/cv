<template>
  <section id="experience" class="py-24 relative" ref="sectionRef">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div ref="headerRef" class="mb-12">
        <div class="flex items-center gap-3 mb-4">
          <span ref="eyebrowLineRef" class="inline-block w-0 h-px bg-accent"></span>
          <span class="text-xs font-mono tracking-widest text-accent uppercase opacity-0" ref="eyebrowTextRef">Timeline</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 opacity-0" ref="titleTextRef">Experience & Education</h2>
      </div>

      <!-- Filter bar -->
      <div ref="filtersRef" class="flex flex-wrap gap-2 mb-10 opacity-0">
        <button
          v-for="filter in filters"
          :key="filter.type"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300"
          :class="isFilterActive(filter.type) ? filter.activeClass : 'border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:bg-white/5'"
          @click="toggleFilter(filter.type)"
        >
          <span class="w-2 h-2 rounded-full" :class="filter.dotClass"></span>
          {{ filter.label }}
        </button>
      </div>

      <!-- Timeline -->
      <div class="relative" ref="timelineRef">
        <!-- SVG line -->
        <svg class="absolute left-0 top-0 w-4 h-full pointer-events-none" preserveAspectRatio="none">
          <line
            ref="timelineLineRef"
            x1="8" y1="0" x2="8" :y2="timelineHeight"
            stroke="url(#timeline-gradient)"
            stroke-width="2"
            stroke-linecap="round"
            :stroke-dasharray="timelineHeight"
            :stroke-dashoffset="timelineHeight"
          />
          <defs>
            <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(99,102,241,0.6)" />
              <stop offset="50%" stop-color="rgba(20,184,166,0.4)" />
              <stop offset="100%" stop-color="rgba(245,158,11,0.3)" />
            </linearGradient>
          </defs>
        </svg>

        <!-- Entries -->
        <TransitionGroup
          name="timeline-item"
          tag="div"
          class="relative"
        >
          <template v-for="item in filteredItems" :key="item.id">
            <TimelineYearMarker
              v-if="item.isYearMarker"
              :year="item.year"
              class="timeline-item"
            />
            <TimelineEntryCard
              v-else
              :entry="item"
              class="timeline-item"
            />
          </template>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useTimeline } from '~/composables/useTimeline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineYearMarker from './TimelineYearMarker.vue';
import TimelineEntryCard from './TimelineEntryCard.vue';

let gsapCtx: gsap.Context | null = null;

const { filteredItems, toggleFilter, isFilterActive } = useTimeline();

const filters = [
  { type: 'work' as const, label: 'Work', dotClass: 'bg-accent', activeClass: 'border-accent/40 bg-accent/10 text-accent-light' },
  { type: 'education' as const, label: 'Education', dotClass: 'bg-teal', activeClass: 'border-teal/40 bg-teal/10 text-teal-light' },
  { type: 'extracurricular' as const, label: 'Extracurricular', dotClass: 'bg-amber-400', activeClass: 'border-amber-400/40 bg-amber-400/10 text-amber-400' },
];

const sectionRef = ref<HTMLElement>();
const headerRef = ref<HTMLElement>();
const eyebrowLineRef = ref<HTMLElement>();
const eyebrowTextRef = ref<HTMLElement>();
const titleTextRef = ref<HTMLElement>();
const filtersRef = ref<HTMLElement>();
const timelineRef = ref<HTMLElement>();
const timelineLineRef = ref<SVGLineElement>();
const timelineHeight = ref(1000);

onMounted(async () => {
  await nextTick();
  gsap.registerPlugin(ScrollTrigger);

  updateTimelineHeight();

  gsapCtx = gsap.context(() => {
    // Header animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 0.5,
      },
    });

    headerTl.to(eyebrowLineRef.value, { width: 24, duration: 0.3 }, 0);
    headerTl.to(eyebrowTextRef.value, { opacity: 1, duration: 0.3 }, 0.1);
    headerTl.fromTo(titleTextRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.15);
    headerTl.to(filtersRef.value, { opacity: 1, duration: 0.3 }, 0.25);

    // Timeline line draw
    gsap.to(timelineLineRef.value, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: timelineRef.value,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 0.3,
      },
    });

    // Animate entry cards
    animateEntries();
  }, sectionRef.value);
});

onUnmounted(() => {
  gsapCtx?.revert();
});

function updateTimelineHeight() {
  if (timelineRef.value) {
    timelineHeight.value = timelineRef.value.scrollHeight;
  }
}

function animateEntries() {
  const items = timelineRef.value?.querySelectorAll('.timeline-item');
  if (!items) return;

  items.forEach((item) => {
    gsap.fromTo(item,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 65%',
          scrub: 0.3,
        },
      }
    );
  });
}

watch(filteredItems, async () => {
  await nextTick();
  updateTimelineHeight();
  ScrollTrigger.refresh();
});
</script>

<style scoped>
.timeline-item-enter-active,
.timeline-item-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.timeline-item-enter-from,
.timeline-item-leave-to {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  transform: translateX(-20px);
}
.timeline-item-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
