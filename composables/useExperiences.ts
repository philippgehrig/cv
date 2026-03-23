import { ref, onMounted } from 'vue';
import { experiencesData } from './data/experiencesData';
import type { Experience } from './data/types';

/**
 * Composable that exposes the list of work-experience entries.
 *
 * Data is loaded asynchronously on mount so that consuming components can
 * display a loading skeleton before the content is ready.  A small artificial
 * delay keeps the async contract intact and makes it easy to swap the local
 * data source for a real API call in the future.
 *
 * @returns Reactive refs for `experiences`, `isLoading`, and `error`, plus a
 *   `refresh` function that can be called to re-fetch the data at any time.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useExperiences } from '~/composables/useExperiences';
 * const { experiences, isLoading, error } = useExperiences();
 * </script>
 * ```
 */
export function useExperiences() {
  const experiences = ref<Experience[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  /**
   * Fetches experience data and updates the reactive state.
   * Sets `isLoading` to `true` at the start and resets any previous error.
   */
  async function loadExperiences() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate a small delay to mimic async loading.
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
    /** Re-fetches experience data; useful for manual refresh actions. */
    refresh: loadExperiences
  };
}