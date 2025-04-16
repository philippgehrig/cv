// Composable for fetching profile data from Directus
import { ref, onMounted } from 'vue';
import { fetchProfile } from './client';
import type { Profile } from './client';

export function useProfile() {
  const profile = ref<Profile | null>(null);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

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

  onMounted(() => {
    loadProfile();
  });

  return {
    profile,
    isLoading,
    error,
    refresh: loadProfile
  };
}