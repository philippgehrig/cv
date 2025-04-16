<!-- Contact section component for the CV -->
<template>
  <section id="contact" class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Contact Me</h2>
      
      <div v-if="isLoading" class="flex justify-center">
        <div class="animate-pulse">Loading contact information...</div>
      </div>
      
      <div v-else-if="contactInfo.length > 0" class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
        <div class="flex flex-col gap-6">
          <div v-for="item in contactInfo" :key="item.id" class="flex items-center gap-4">
            <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
              <!-- Icon placeholder -->
              <div class="w-6 h-6 flex items-center justify-center font-bold">{{ item.icon || '📧' }}</div>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">{{ item.label }}</h3>
              <p class="text-gray-600">{{ item.value }}</p>
            </div>
          </div>
        </div>
        
        <div class="mt-8 border-t pt-8">
          <h3 class="text-xl font-bold mb-4">Send Me a Message</h3>
          <form class="space-y-4" @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
              </div>
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                v-model="formData.message" 
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div v-if="formMessage" :class="`text-${formMessage.type} text-sm mb-3`">
              {{ formMessage.text }}
            </div>
            <button 
              type="submit" 
              class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              :disabled="formSubmitting"
            >
              {{ formSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500 text-center">
        Error loading contact data. Please try again later.
      </div>
      
      <div v-else class="text-center text-gray-500">
        No contact information available.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useContact } from '~/composables/directus/useContact';
import { ref } from 'vue';

const { contactInfo, isLoading, error } = useContact();

// Contact form logic
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const formSubmitting = ref(false);
const formMessage = ref<{ text: string, type: 'green-600' | 'red-600' } | null>(null);

const submitForm = async () => {
  formSubmitting.value = true;
  formMessage.value = null;
  
  try {
    // In a real app, you'd send this data to your backend or a service
    console.log('Form submitted:', formData.value);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success message
    formMessage.value = {
      text: 'Your message has been sent successfully!',
      type: 'green-600'
    };
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  } catch (error) {
    // Error message
    formMessage.value = {
      text: 'There was an error sending your message. Please try again.',
      type: 'red-600'
    };
    console.error('Form submission error:', error);
  } finally {
    formSubmitting.value = false;
  }
};
</script>