<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Wordmark -->
      <NuxtLink to="/" class="text-sm font-semibold tracking-tight text-zinc-100 hover:text-white transition-colors">
        Philipp Gehrig
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <!-- Section anchors (only shown on home page) -->
        <template v-if="isHomePage">
          <a
            v-for="item in anchorItems"
            :key="item.id"
            :href="item.href"
            class="px-3 py-1.5 text-sm rounded-md transition-all duration-200 text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
            :class="{ 'text-white bg-white/10': activeSection === item.id }"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
          </a>
        </template>
      </nav>

      <!-- Mobile menu button -->
      <button
        class="md:hidden p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-smooth"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-smooth"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden bg-dark-800/95 backdrop-blur-xl border-b border-white/5">
        <nav class="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-1">
          <a
            v-for="item in anchorItems"
            :key="item.id"
            :href="item.href"
            class="px-3 py-2 text-sm rounded-md transition-all text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
            @click.prevent="scrollToSection(item.id); mobileOpen = false"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

/** Minimum scroll distance (px) before the header background is applied. */
const SCROLL_THRESHOLD = 16;

/**
 * Offset (px) added to `window.scrollY` when detecting the active section.
 * Slightly larger than the visual navbar height (~64px) so sections switch a bit earlier.
 */
const NAVBAR_HEIGHT_OFFSET = 80;

const route = useRoute();
const mobileOpen = ref(false);
const scrolled = ref(false);
const activeSection = ref('about');

/** True when the visitor is on the home page and section anchors should be shown. */
const isHomePage = computed(() => route.path === '/');

/** Navigation items that link to on-page section anchors. */
const anchorItems = [
  { id: 'about',      label: 'About',      href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'education',  label: 'Education',  href: '#education' },
  { id: 'contact',    label: 'Contact',    href: '#contact' },
];

/**
 * Smoothly scrolls the viewport to the section with the given `id`.
 * @param id - The `id` attribute of the target section element.
 */
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Scroll event handler that:
 * 1. Toggles the `scrolled` flag once the page passes `SCROLL_THRESHOLD` pixels.
 * 2. Determines which section is currently in view by comparing the adjusted
 *    scroll position against each section's `offsetTop`, iterating in reverse
 *    so the last match wins (i.e. the topmost visible section).
 */
const handleScroll = () => {
  scrolled.value = window.scrollY > SCROLL_THRESHOLD;

  const sections = anchorItems.map(item => document.getElementById(item.id));
  const scrollY = window.scrollY + NAVBAR_HEIGHT_OFFSET;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    if (section && section.offsetTop <= scrollY) {
      activeSection.value = anchorItems[i].id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Run once on mount to set initial state without waiting for a scroll event.
  handleScroll();
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>
