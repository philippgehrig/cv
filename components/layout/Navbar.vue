<!-- A professional and modern navigation bar component -->
<template>
  <header class="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-md transition-all duration-300" :class="{ 'shadow-lg bg-opacity-95': scrolled }">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h1 class="text-xl font-bold">Philipp Gehrig</h1>
      </div>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:block">
        <ul class="flex space-x-6">
          <li v-for="item in navItems" :key="item.id">
            <a 
              :href="`#${item.id}`" 
              class="hover:text-blue-300 transition-colors py-2 px-1 relative"
              :class="{ 'text-blue-300': activeSection === item.id }"
              @click.prevent="scrollToSection(item.id)"
            >
              {{ item.label }}
              <span 
                class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300 transform scale-x-0 transition-transform duration-300"
                :class="{ 'scale-x-100': activeSection === item.id }"
              ></span>
            </a>
          </li>
        </ul>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden focus:outline-none" @click="toggleMobileMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-show="mobileMenuOpen" 
      class="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg transform transition-transform duration-300"
      :class="{ 'translate-y-0 opacity-100': mobileMenuOpen, '-translate-y-full opacity-0': !mobileMenuOpen }"
    >
      <ul class="container mx-auto px-4 py-3 space-y-3">
        <li v-for="item in navItems" :key="item.id">
          <a 
            :href="`#${item.id}`" 
            class="block py-2 px-4 hover:bg-gray-700 rounded transition-colors"
            :class="{ 'bg-gray-700 text-blue-300': activeSection === item.id }"
            @click="scrollToSection(item.id); toggleMobileMenu()"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Navigation items
const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

// Mobile menu state
const mobileMenuOpen = ref(false);

// Scroll state
const scrolled = ref(false);
const activeSection = ref('about');

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Offset for the navbar height
      behavior: 'smooth'
    });
    activeSection.value = sectionId;
  }
};

// Update active section based on scroll position
const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
  
  // Find which section is currently in view
  const sections = navItems.map(item => document.getElementById(item.id));
  const currentPosition = window.scrollY + 200; // Add offset
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    if (section && section.offsetTop <= currentPosition) {
      activeSection.value = navItems[i].id;
      break;
    }
  }
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