<template>
  <div class="min-h-screen bg-white">
    <div class="py-20 md:py-32 bg-white">
      <div class="container mx-auto px-6 max-w-6xl">
        <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-16 text-apple-gray-900">Contact Me</h1>
        
        <div v-if="isLoading" class="max-w-2xl mx-auto">
          <div class="bg-apple-gray-50 rounded-3xl shadow-apple p-8 animate-pulse">
            <div class="space-y-8">
              <div class="flex items-center gap-4">
                <div class="h-12 w-12 rounded-full bg-apple-gray-200"></div>
                <div class="space-y-2">
                  <div class="h-5 bg-apple-gray-200 rounded-lg w-24"></div>
                  <div class="h-4 bg-apple-gray-200 rounded-lg w-40"></div>
                </div>
              </div>
              <div class="space-y-4">
                <div class="h-6 bg-apple-gray-200 rounded-lg w-32"></div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="h-12 bg-apple-gray-200 rounded-xl"></div>
                  <div class="h-12 bg-apple-gray-200 rounded-xl"></div>
                </div>
                <div class="h-12 bg-apple-gray-200 rounded-xl"></div>
                <div class="h-32 bg-apple-gray-200 rounded-xl"></div>
                <div class="h-12 bg-apple-gray-200 rounded-xl w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else-if="contactInfo.length > 0" class="max-w-2xl mx-auto">
          <div class="bg-apple-gray-50 rounded-3xl shadow-apple p-8 md:p-10 overflow-hidden">
            <!-- Contact info section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div 
                v-for="item in contactInfo" 
                :key="item.id" 
                class="flex items-center gap-4 group"
              >
                <div class="bg-white text-apple-blue p-3 rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                  <!-- Icon placeholder -->
                  <div class="w-7 h-7 flex items-center justify-center">
                    <span class="text-xl">{{ item.icon || '📧' }}</span>
                  </div>
                </div>
                <div>
                  <h3 class="font-medium text-apple-gray-800 mb-1">{{ item.label }}</h3>
                  <p class="text-apple-gray-600 text-sm">{{ item.value }}</p>
                </div>
              </div>
            </div>
            
            <!-- Contact form section -->
            <div class="pt-8 border-t border-apple-gray-200">
              <h3 class="text-xl font-semibold tracking-tight mb-6 text-apple-gray-900">Send Me a Message</h3>
              
              <form class="space-y-5" @submit.prevent="submitForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label for="name" class="block text-sm font-medium text-apple-gray-600 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      v-model="formData.name" 
                      class="w-full px-4 py-3 rounded-xl border border-apple-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all"
                      required
                    >
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-apple-gray-600 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="formData.email" 
                      class="w-full px-4 py-3 rounded-xl border border-apple-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all"
                      required
                    >
                  </div>
                </div>
                
                <div>
                  <label for="subject" class="block text-sm font-medium text-apple-gray-600 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    v-model="formData.subject" 
                    class="w-full px-4 py-3 rounded-xl border border-apple-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all"
                    required
                  >
                </div>
                
                <div>
                  <label for="message" class="block text-sm font-medium text-apple-gray-600 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    v-model="formData.message" 
                    class="w-full px-4 py-3 rounded-xl border border-apple-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>
                
                <div v-if="formMessage" 
                  class="rounded-xl p-3 text-sm"
                  :class="formMessage.type === 'green-600' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'"
                >
                  {{ formMessage.text }}
                </div>
                
                <div class="pt-2">
                  <button 
                    type="submit" 
                    class="bg-apple-blue text-white px-6 py-3 rounded-full hover:bg-apple-blue-dark transition-colors duration-300 shadow-sm hover:shadow-md"
                    :disabled="formSubmitting"
                  >
                    <span class="flex items-center justify-center">
                      <svg v-if="formSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ formSubmitting ? 'Sending...' : 'Send Message' }}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div v-else-if="error" class="text-center">
          <p class="text-lg text-red-500">Error loading contact data. Please try again later.</p>
        </div>
        
        <div v-else class="text-center">
          <p class="text-lg text-apple-gray-500">No contact information available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContact } from '~/composables/directus/useContact';
import { ref } from 'vue';

definePageMeta({
  title: 'Contact',
  description: 'Get in touch with me'
});

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