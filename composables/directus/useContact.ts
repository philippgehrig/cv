// Composable for fetching contact information from Directus
import { ref, onMounted } from 'vue';
import { fetchContactInfo } from './client';
import type { ContactInfo } from './client';

export function useContact() {
  const contactInfo = ref<ContactInfo[]>([]);
  const isLoading = ref(true);
  const error = ref<Error | null>(null);

  async function loadContactInfo() {
    isLoading.value = true;
    error.value = null;
    
    try {
      contactInfo.value = await fetchContactInfo();
    } catch (err) {
      error.value = err as Error;
      console.error('Error loading contact information:', err);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    loadContactInfo();
  });

  return {
    contactInfo,
    isLoading,
    error,
    refresh: loadContactInfo
  };
}