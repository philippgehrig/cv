<template>
  <footer class="relative border-t border-white/5 py-10">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <!-- Left: name + title -->
        <div>
          <p class="text-sm font-semibold text-zinc-200">Philipp Gehrig</p>
          <p class="text-xs text-zinc-500 mt-0.5">Software Engineer</p>
        </div>

        <!-- Center: social icons -->
        <div class="flex items-center gap-4">
          <a
            v-if="profile?.linkedin"
            :href="profile.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            v-if="profile?.github"
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
            </svg>
          </a>
        </div>

        <!-- Right: policy links + copyright -->
        <div class="flex flex-col items-start md:items-end gap-2">
          <div class="flex flex-wrap gap-4 text-xs text-zinc-600">
            <NuxtLink to="/policies/legal-notice" class="hover:text-zinc-400 transition-colors">Legal Notice</NuxtLink>
            <NuxtLink to="/policies/privacy-policy" class="hover:text-zinc-400 transition-colors">Privacy Policy</NuxtLink>
            <NuxtLink to="/policies/terms-of-use" class="hover:text-zinc-400 transition-colors">Terms of Use</NuxtLink>
            <NuxtLink to="/policies/sitemap" class="hover:text-zinc-400 transition-colors">Sitemap</NuxtLink>
          </div>
          <p class="text-xs text-zinc-700">
            &copy; {{ new Date().getFullYear() }} Philipp Gehrig
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/useProfile';

const { profile } = useProfile();
</script>
