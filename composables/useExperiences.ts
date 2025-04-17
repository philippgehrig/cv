// Composable for providing experience data
import { ref, onMounted } from 'vue';
import { experiencesData } from './data/experiencesData';
import type { Experience } from './data/types';

export function useExperiences() {
  const experiences = ref<Experience[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function loadExperiences() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate a small delay to mimic async loading
      await new Promise(resolve => setTimeout(resolve, 100));
      experiences.value = experiencesData;
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