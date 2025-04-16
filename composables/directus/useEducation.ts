// Composable for fetching education data from Directus
import { ref, onMounted } from 'vue';
import { fetchEducation } from './client';
import type { Education } from './client';

export function useEducation() {
  const education = ref<Education[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function loadEducation() {
    isLoading.value = true;
    error.value = null;
    
    try {
      education.value = await fetchEducation();
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