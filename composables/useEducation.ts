// Composable for providing education data
import { ref, onMounted } from 'vue';
import { educationData } from './data/educationData';
import type { Education } from './data/types';

export function useEducation() {
  const education = ref<Education[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function loadEducation() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate a small delay to mimic async loading
      await new Promise(resolve => setTimeout(resolve, 100));
      education.value = educationData;
    } catch (err) {
      error.value = err as Error;
      console.error('Error loading education data:', err);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    loadEducation();
  });

  return {
    education,
    isLoading,
    error,
    refresh: loadEducation
  };
}