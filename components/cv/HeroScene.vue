<template>
  <section id="about" ref="sectionRef" class="relative min-h-screen flex items-center pt-16">
    <div class="max-w-6xl mx-auto px-6 py-24 w-full">
      <div v-if="profile" class="grid md:grid-cols-[1fr_auto] gap-16 items-center">
        <!-- Left: text content -->
        <div class="space-y-6">
          <!-- Eyebrow -->
          <div ref="eyebrowRef" class="flex items-center gap-3 opacity-0">
            <span class="inline-block w-6 h-px bg-accent"></span>
            <span class="text-xs font-mono tracking-widest text-accent uppercase">Technical Product Owner</span>
          </div>

          <!-- Name with character spans -->
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight leading-none">
            <span ref="firstNameRef" class="text-zinc-50 inline-block">
              <span
                v-for="(char, i) in firstName"
                :key="'f-' + i"
                class="char inline-block opacity-0"
              >{{ char === ' ' ? ' ' : char }}</span>
            </span>
            <br>
            <span ref="lastNameRef" class="text-zinc-400 inline-block">
              <span
                v-for="(char, i) in lastName"
                :key="'l-' + i"
                class="char inline-block opacity-0"
              >{{ char === ' ' ? ' ' : char }}</span>
            </span>
            <span ref="cursorRef" class="inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle opacity-0"></span>
          </h1>

          <!-- Title pill -->
          <div ref="titleRef" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 opacity-0">
            <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow"></span>
            <span class="text-sm text-accent font-medium">{{ profile.title }}</span>
          </div>

          <!-- Bio -->
          <p ref="bioRef" class="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl opacity-0">
            {{ profile.bio }}
          </p>

          <!-- Social links -->
          <div ref="linksRef" class="flex flex-wrap gap-3 pt-2">
            <a
              v-if="profile.linkedin"
              :href="profile.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 opacity-0 link-item"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a
              v-if="profile.github"
              :href="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 opacity-0 link-item"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <!-- Right: profile photo -->
        <div ref="photoRef" class="hidden md:block opacity-0">
          <div class="relative w-64 h-64 lg:w-72 lg:h-72">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-teal/30 blur-xl opacity-60"></div>
            <div class="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
              <img
                v-if="profile.profile_image"
                :src="profile.profile_image"
                alt="Philipp Gehrig"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-dark-700">
                <svg class="w-20 h-20 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll hint -->
      <div ref="scrollHintRef" class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 opacity-0">
        <span class="text-xs font-mono tracking-wider">scroll</span>
        <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useProfile } from '~/composables/useProfile';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const { profile } = useProfile();
let gsapCtx: gsap.Context | null = null;

const sectionRef = ref<HTMLElement>();
const eyebrowRef = ref<HTMLElement>();
const firstNameRef = ref<HTMLElement>();
const lastNameRef = ref<HTMLElement>();
const cursorRef = ref<HTMLElement>();
const titleRef = ref<HTMLElement>();
const bioRef = ref<HTMLElement>();
const linksRef = ref<HTMLElement>();
const photoRef = ref<HTMLElement>();
const scrollHintRef = ref<HTMLElement>();
const animationPlayed = ref(false);

const firstName = computed(() => profile.value?.name.split(' ')[0] || '');
const lastName = computed(() => profile.value?.name.split(' ').slice(1).join(' ') || '');

watch(profile, async (val) => {
  if (!val || animationPlayed.value) return;
  animationPlayed.value = true;
  await nextTick();
  initAnimations();
});

onMounted(async () => {
  if (profile.value && !animationPlayed.value) {
    animationPlayed.value = true;
    await nextTick();
    initAnimations();
  }
});

function initAnimations() {
  if (!sectionRef.value) return;

  gsap.registerPlugin(ScrollTrigger);

  gsapCtx = gsap.context(() => {

  // Time-based intro animation — structured beats:
  // Name → pause → Role → pause → Face → Story → Links
  const tl = gsap.timeline({ delay: 0.2 });

  // === BEAT 1: Name types out ===
  tl.to(cursorRef.value, { opacity: 1, duration: 0.08 }, 0);

  const firstChars = firstNameRef.value?.querySelectorAll('.char');
  if (firstChars) {
    tl.to(firstChars, { opacity: 1, duration: 0.04, stagger: 0.055 }, 0.1);
  }

  const lastChars = lastNameRef.value?.querySelectorAll('.char');
  if (lastChars) {
    tl.to(lastChars, { opacity: 1, duration: 0.04, stagger: 0.055 }, 0.55);
  }

  tl.to(cursorRef.value, { opacity: 0, duration: 0.1 }, 1.1);

  // === BEAT 2: Role reveal (title pill slides in with glitch) ===
  tl.fromTo(titleRef.value, { opacity: 0, x: -30, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: 'power3.out' }, 1.4);
  tl.to(titleRef.value, { opacity: 0, duration: 0.04 }, 1.6);
  tl.to(titleRef.value, { opacity: 1, duration: 0.04 }, 1.64);
  tl.to(titleRef.value, { opacity: 0, duration: 0.03 }, 1.67);
  tl.to(titleRef.value, { opacity: 1, duration: 0.04 }, 1.7);

  // === BEAT 3: Face appears ===
  tl.fromTo(photoRef.value,
    { opacity: 0, scale: 0.8, filter: 'blur(12px)', x: 30 },
    { opacity: 1, scale: 1, filter: 'blur(0px)', x: 0, duration: 0.8, ease: 'power2.out' },
    2.0
  );

  // === BEAT 4: Story unfolds ===
  tl.fromTo(eyebrowRef.value, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, 2.4);
  tl.fromTo(bioRef.value, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2.6);

  // === BEAT 5: Links as final supporting elements ===
  const links = linksRef.value?.querySelectorAll('.link-item');
  if (links) {
    tl.fromTo(links,
      { opacity: 0, y: 12, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.12, ease: 'back.out(1.7)' },
      3.1
    );
  }

  // Scroll hint appears last
  tl.fromTo(scrollHintRef.value, { opacity: 0 }, { opacity: 0.5, duration: 0.6 }, 3.6);

  // Scroll-driven exit: parallax the hero content up as user scrolls away
  gsap.to(sectionRef.value, {
    yPercent: -15,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'bottom bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
  });

  }, sectionRef.value);
}

onUnmounted(() => {
  gsapCtx?.revert();
});
</script>
