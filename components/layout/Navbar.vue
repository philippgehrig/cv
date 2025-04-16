<!-- Apple-inspired navigation bar component -->
<template>
  <header 
    class="bg-white/90 backdrop-blur-md border-b border-apple-gray-100 text-apple-gray-800 py-3 sticky top-0 z-50 transition-all duration-500 ease-apple"
    :class="{ 'shadow-apple': scrolled }"
  >
    <div class="container mx-auto px-6 flex justify-between items-center">
      <div>
        <NuxtLink to="/" class="text-xl font-semibold tracking-tight">Philipp Gehrig</NuxtLink>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:block">
        <ul class="flex space-x-8">
          <li v-for="item in mainNavItems" :key="item.id">
            <NuxtLink 
              :to="item.path" 
              class="text-sm hover:text-apple-blue transition-colors duration-300 py-2 relative"
              :class="{ 'text-apple-blue': isActive(item.path) }"
            >
              {{ item.label }}
              <span 
                class="absolute bottom-0 left-0 w-full h-0.5 bg-apple-blue transform origin-left transition-transform duration-300 ease-apple"
                :class="{ 'scale-x-100': isActive(item.path), 'scale-x-0': !isActive(item.path) }"
              ></span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden focus:outline-none" @click="toggleMobileMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-apple-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      class="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-apple-gray-100 transform transition-all duration-300 ease-apple"
      :class="{ 'translate-y-0 opacity-100 visible': mobileMenuOpen, '-translate-y-4 opacity-0 invisible': !mobileMenuOpen }"
    >
      <ul class="container mx-auto px-6 py-4 space-y-4">
        <li v-for="item in mainNavItems" :key="item.id">
          <NuxtLink 
            :to="item.path" 
            class="block py-2 px-2 text-apple-gray-800 hover:text-apple-blue transition-colors duration-300"
            :class="{ 'text-apple-blue font-medium': isActive(item.path) }"
            @click="toggleMobileMenu()"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Navigation items
const mainNavItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'contact', label: 'Contact', path: '/contact' }
];

// Mobile menu state
const mobileMenuOpen = ref(false);

// Scroll state
const scrolled = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Check if current route is active
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === path;
  }
  return route.path.startsWith(path);
};

// Update scroll state
const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>