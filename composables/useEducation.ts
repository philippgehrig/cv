import { ref, onMounted } from 'vue';
import { educationData } from './data/educationData';
import type { Education } from './data/types';

/**
 * Composable that exposes the list of education entries.
 *
 * Data is loaded asynchronously on mount so that consuming components can
 * display a loading skeleton before the content is ready.  A small artificial
 * delay keeps the async contract intact and makes it easy to swap the local
 * data source for a real API call in the future.
 *
 * @returns Reactive refs for `education`, `isLoading`, and `error`, plus a
 *   `refresh` function that can be called to re-fetch the data at any time.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useEducation } from '~/composables/useEducation';
 * const { education, isLoading, error } = useEducation();
 * </script>
 * ```
 */
export function useEducation() {
  const education = ref<Education[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  /**
   * Fetches education data and updates the reactive state.
   * Sets `isLoading` to `true` at the start and resets any previous error.
   */
  async function loadEducation() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulate a small delay to mimic async loading.
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
    /** Re-fetches education data; useful for manual refresh actions. */
    refresh: loadEducation
  };
}