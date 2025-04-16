<!-- A simple navigation bar component for the CV website -->
<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h1 class="text-xl font-bold">Philipp Gehrig</h1>
      </div>
      <nav>
        <ul class="flex space-x-6">
          <li><a href="#about" class="hover:text-blue-300 transition-colors">About</a></li>
          <li><a href="#experience" class="hover:text-blue-300 transition-colors">Experience</a></li>
          <li><a href="#education" class="hover:text-blue-300 transition-colors">Education</a></li>
          <li><a href="#skills" class="hover:text-blue-300 transition-colors">Skills</a></li>
          <li><a href="#contact" class="hover:text-blue-300 transition-colors">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>