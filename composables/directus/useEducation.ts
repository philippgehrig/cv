// Composable for fetching education data from Directus
import { ref, onMounted, onUnmounted } from 'vue';
import { fetchEducation } from './client';
import type { Education } from './client';

export function useEducation(autoRefresh = false) {
  const education = ref<Education[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);
  let refreshInterval: NodeJS.Timeout | null = null;

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

  // Set up auto-refresh
  function setupAutoRefresh(enabled: boolean) {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
    
    if (enabled) {
      // Refresh every 30 seconds
      refreshInterval = setInterval(() => {
        loadEducation();
      }, 30000);
    }
  }

  onMounted(() => {
    loadEducation();
    setupAutoRefresh(autoRefresh);
  });

  // Clean up interval on component unmount
  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  });

  return {
    education,
    isLoading,
    error,
    refresh: loadEducation,
    enableAutoRefresh: () => setupAutoRefresh(true),
    disableAutoRefresh: () => setupAutoRefresh(false)
  };
}