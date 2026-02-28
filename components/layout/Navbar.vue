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

const route = useRoute();
const mobileOpen = ref(false);
const scrolled = ref(false);
const activeSection = ref('about');

const isHomePage = computed(() => route.path === '/');

const anchorItems = [
  { id: 'about',      label: 'About',      href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'education',  label: 'Education',  href: '#education' },
  { id: 'contact',    label: 'Contact',    href: '#contact' },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 16;

  // Update active section based on scroll position
  const sections = anchorItems.map(item => document.getElementById(item.id));
  const scrollY = window.scrollY + 80; // offset for navbar height

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
  handleScroll();
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>
