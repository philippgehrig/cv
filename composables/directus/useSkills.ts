// Composable for fetching skill categories and skills from Directus
import { ref, onMounted } from 'vue';
import { fetchSkillCategories } from './client';
import type { SkillCategory } from './client';

export function useSkills() {
  const skillCategories = ref<SkillCategory[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function loadSkills() {
    isLoading.value = true;
    error.value = null;
    
    try {
      skillCategories.value = await fetchSkillCategories();
    } catch (err) {
      error.value = err as Error;
      console.error('Error loading skills data:', err);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    loadSkills();
  });

  return {
    skillCategories,
    isLoading,
    error,
    refresh: loadSkills
  };
}