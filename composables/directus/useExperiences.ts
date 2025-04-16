// Composable for fetching experience data from Directus
import { ref, onMounted } from 'vue';
import { fetchExperiences } from './client';
import type { Experience } from './client';

export function useExperiences() {
  const experiences = ref<Experience[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function loadExperiences() {
    isLoading.value = true;
    error.value = null;
    
    try {
      experiences.value = await fetchExperiences();
    } catch (err) {
      error.value = err as Error;
      console.error('Error loading experience data:', err);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    loadExperiences();
  });

  return {
    experiences,
    isLoading,
    error,
    refresh: loadExperiences
  };
}