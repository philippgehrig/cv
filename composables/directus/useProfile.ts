// Composable for fetching profile data from Directus
import { ref, onMounted, onUnmounted } from 'vue';
import { fetchProfile } from './client';
import type { Profile } from './client';

export function useProfile(autoRefresh = false) {
  const profile = ref<Profile | null>(null);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);
  let refreshInterval: NodeJS.Timeout | null = null;

  async function loadProfile() {
    isLoading.value = true;
    error.value = null;
    
    try {
      profile.value = await fetchProfile();
    } catch (err) {
      error.value = err as Error;
      console.error('Error loading profile data:', err);
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
        loadProfile();
      }, 30000);
    }
  }

  onMounted(() => {
    loadProfile();
    setupAutoRefresh(autoRefresh);
  });

  // Clean up interval on component unmount
  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  });

  return {
    profile,
    isLoading,
    error,
    refresh: loadProfile,
    enableAutoRefresh: () => setupAutoRefresh(true),
    disableAutoRefresh: () => setupAutoRefresh(false)
  };
}