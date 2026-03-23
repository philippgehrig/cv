import { ref, onMounted } from 'vue';
import { profileData } from './data/profileData';
import type { Profile } from './data/types';

/**
 * Composable that exposes the site owner's profile data.
 *
 * Data is loaded asynchronously on mount so that consuming components can
 * display a loading skeleton before the content is ready.  A small artificial
 * delay keeps the async contract intact and makes it easy to swap the local
 * data source for a real API call in the future.
 *
 * @returns Reactive refs for `profile`, `isLoading`, and `error`, plus a
 *   `refresh` function that can be called to re-fetch the data at any time.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useProfile } from '~/composables/useProfile';
 * const { profile, isLoading, error } = useProfile();
 * </script>
 * ```
 */
export function useProfile() {
  const profile = ref<Profile | null>(null);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  /**
   * Fetches profile data and updates the reactive state.
   * Sets `isLoading` to `true` at the start and resets any previous error.
   */
  async function loadProfile() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate a small delay to mimic async loading
      // and maintain the same API behaviour as a real data source.
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
    /** Re-fetches profile data; useful for manual refresh actions. */
    refresh: loadProfile
  };
}