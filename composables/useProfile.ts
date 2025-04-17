// Composable for providing profile data
import { ref, onMounted } from 'vue';
import { profileData } from './data/profileData';
import type { Profile } from './data/types';

export function useProfile() {
  const profile = ref<Profile | null>(null);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function loadProfile() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate a small delay to mimic async loading
      // and maintain the same API behavior as before
      await new Promise(resolve => setTimeout(resolve, 100));
      profile.value = profileData;
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