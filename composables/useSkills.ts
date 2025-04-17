// Composable for providing skills data
import { ref, onMounted } from 'vue';
import { skillCategoriesData } from './data/skillsData';
import type { SkillCategory } from './data/types';

export function useSkills() {
  const skillCategories = ref<SkillCategory[]>(skillCategoriesData); // Directly assign the data
  const isLoading = ref(false); // Set to false by default since we're using static data
  const error = ref<Error | null>(null);

  // This function is kept for API compatibility with the previous implementation
  async function loadSkills() {
    isLoading.value = true;
    error.value = null;
    
    try {
      // We're using static data, so we can just set it directly
      skillCategories.value = skillCategoriesData;
    } catch (err) {
      error.value = err as Error;
      console.error('Error loading skills data:', err);
    } finally {
      isLoading.value = false;
    }
  }

  // No need to call loadSkills on mount since we set the data directly

  return {
    skillCategories,
    isLoading,
    error,
    refresh: loadSkills
  };
}