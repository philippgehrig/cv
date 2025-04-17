// Composable for fetching experience data from Directus
import { ref, onMounted, onUnmounted } from 'vue';
import { fetchExperiences } from './client';
import type { Experience } from './client';

export function useExperiences(autoRefresh = false) {
  const experiences = ref<Experience[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);
  let refreshInterval: NodeJS.Timeout | null = null;

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

  // Set up auto-refresh
  function setupAutoRefresh(enabled: boolean) {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
    
    if (enabled) {
      // Refresh every 30 seconds
      refreshInterval = setInterval(() => {
        loadExperiences();
      }, 30000);
    }
  }

  onMounted(() => {
    loadExperiences();
    setupAutoRefresh(autoRefresh);
  });

  // Clean up interval on component unmount
  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  });

  return {
    experiences,
    isLoading,
    error,
    refresh: loadExperiences,
    enableAutoRefresh: () => setupAutoRefresh(true),
    disableAutoRefresh: () => setupAutoRefresh(false)
  };
}