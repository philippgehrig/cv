import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useScrollAnimations() {
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  });

  return { gsap, ScrollTrigger };
}
