// Composable for fetching skill categories and skills from Directus
import { ref, onMounted, onUnmounted } from 'vue';
import { fetchSkillCategories } from './client';
import type { SkillCategory } from './client';

export function useSkills(autoRefresh = false) {
  const skillCategories = ref<SkillCategory[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);
  let refreshInterval: NodeJS.Timeout | null = null;

  async function loadSkills() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Type assertion to ensure the returned data conforms to SkillCategory[]
      skillCategories.value = (await fetchSkillCategories()) as SkillCategory[];
    } catch (err) {
      error.value = err as Error;
      console.error('Error loading skills data:', err);
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
        loadSkills();
      }, 30000);
    }
  }

  onMounted(() => {
    loadSkills();
    setupAutoRefresh(autoRefresh);
  });

  // Clean up interval on component unmount
  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  });

  return {
    skillCategories,
    isLoading,
    error,
    refresh: loadSkills,
    enableAutoRefresh: () => setupAutoRefresh(true),
    disableAutoRefresh: () => setupAutoRefresh(false)
  };
}