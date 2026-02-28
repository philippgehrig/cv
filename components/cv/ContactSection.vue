<template>
  <section id="contact" class="py-24 relative">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

    <!-- Bottom glow -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-radial from-accent-glow via-transparent to-transparent opacity-40 blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-4">
          <span class="inline-block w-6 h-px bg-accent"></span>
          <span class="text-xs font-mono tracking-widest text-accent uppercase">Get in touch</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50">Contact</h2>
      </div>

      <div class="max-w-2xl">
        <p class="text-zinc-400 text-base leading-relaxed mb-8">
          Feel free to reach out — whether it's about a project, an opportunity, or just to connect. I'm always happy to chat.
        </p>

        <div class="space-y-4">
          <a
            href="mailto:philipp@gehrig.info"
            class="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-dark-800/60 hover:border-accent/30 hover:bg-dark-800 transition-all duration-200 group"
          >
            <div class="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-zinc-500 mb-0.5">Email</p>
              <p class="text-sm text-zinc-200 group-hover:text-white transition-colors">philipp@gehrig.info</p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/philippgehrig"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-dark-800/60 hover:border-accent/30 hover:bg-dark-800 transition-all duration-200 group"
          >
            <div class="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-zinc-500 mb-0.5">LinkedIn</p>
              <p class="text-sm text-zinc-200 group-hover:text-white transition-colors">linkedin.com/in/philippgehrig</p>
            </div>
          </a>

          <a
            href="https://github.com/philippgehrig"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-dark-800/60 hover:border-accent/30 hover:bg-dark-800 transition-all duration-200 group"
          >
            <div class="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-zinc-500 mb-0.5">GitHub</p>
              <p class="text-sm text-zinc-200 group-hover:text-white transition-colors">github.com/philippgehrig</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Static contact section — no composable needed
</script>
