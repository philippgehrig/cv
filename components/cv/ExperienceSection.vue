<!-- Apple-inspired Experience section component -->
<template>
  <section id="experience" class="py-20 md:py-32 bg-apple-gray-50">
    <div class="container mx-auto px-6 max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-16 text-apple-gray-900">Work Experience</h2>
      
      <div v-if="isLoading" class="max-w-3xl mx-auto">
        <div v-for="i in 3" :key="i" class="mb-10 bg-white rounded-2xl shadow-apple p-6 animate-pulse">
          <div class="h-7 bg-apple-gray-100 rounded-full w-2/3 mb-4"></div>
          <div class="h-5 bg-apple-gray-100 rounded-full w-1/3 mb-6"></div>
          <div class="space-y-3">
            <div class="h-4 bg-apple-gray-100 rounded-full w-full"></div>
            <div class="h-4 bg-apple-gray-100 rounded-full w-5/6"></div>
            <div class="h-4 bg-apple-gray-100 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="experiences.length > 0" class="max-w-3xl mx-auto">
        <div 
          v-for="(job, index) in experiences" 
          :key="job.id" 
          class="mb-10 bg-white rounded-2xl shadow-apple p-6 md:p-8 transform transition-all duration-300 hover:shadow-apple-hover hover:translate-y-[-4px]"
        >
          <!-- Company header -->
          <div class="flex flex-col space-y-3 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <!-- Show overall position if there are no roles, or company name if there are roles -->
              <h3 class="text-2xl font-semibold tracking-tight text-apple-gray-900">
                {{ job.roles && job.roles.length > 0 ? job.company : job.position }}
              </h3>
              <!-- Company logo if available -->
              <div v-if="getCompanyLogo(job.company)" class="mt-2 sm:mt-0">
                <img 
                  :src="getCompanyLogo(job.company) || undefined"
                  :alt="`${job.company} logo`" 
                  class="h-10 object-contain"
                />
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
              <!-- Company name (if traditional job entry without roles) -->
              <h4 v-if="!job.roles || job.roles.length === 0" class="text-lg text-apple-gray-600">{{ job.company }}</h4>
              <!-- Program title if there are roles -->
              <h4 v-else class="text-lg text-apple-gray-600">{{ job.position || 'Corporate Student' }}</h4>
              <span class="inline-flex items-center px-3 py-1 rounded-full bg-apple-blue/10 text-apple-blue text-sm font-medium">
                {{ job.period }}
              </span>
            </div>
          </div>
          
          <!-- Display job description for traditional entries -->
          <div v-if="!job.roles || job.roles.length === 0">
            <p class="text-apple-gray-500 leading-relaxed mb-6">{{ job.description }}</p>
            
            <div v-if="job.technologies && job.technologies.length > 0" class="flex flex-wrap gap-2">
              <span 
                v-for="(tech, techIndex) in job.technologies" 
                :key="techIndex" 
                class="px-3 py-1 rounded-full bg-apple-gray-100 text-apple-gray-600 text-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <!-- Display multiple roles if present -->
          <div v-else class="space-y-6">
            <!-- General company description if available -->
            <p v-if="job.description" class="text-apple-gray-500 leading-relaxed">{{ job.description }}</p>
            
            <!-- Individual roles -->
            <div 
              v-for="(role, roleIndex) in job.roles" 
              :key="roleIndex" 
              class="border-l-4 border-apple-gray-200 pl-4 py-2 group relative hover:bg-apple-gray-50 rounded-r-lg transition-all duration-300"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h4 class="text-lg font-medium text-apple-gray-800">{{ role.title }}</h4>
                <span class="text-sm text-apple-blue mt-1 sm:mt-0">{{ role.period }}</span>
              </div>
              
              <!-- Role description - hidden by default, visible on hover -->
              <div class="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100">
                <p class="text-apple-gray-500 leading-relaxed mb-3 pt-3">{{ role.description }}</p>
                
                <div v-if="role.technologies && role.technologies.length > 0" class="flex flex-wrap gap-2">
                  <span 
                    v-for="(tech, techIndex) in role.technologies" 
                    :key="techIndex" 
                    class="px-3 py-1 rounded-full bg-apple-gray-100 text-apple-gray-600 text-sm"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              
              <!-- Hover hint - optional -->
              <span 
                class="absolute right-2 bottom-2 text-xs text-apple-gray-400 opacity-0 group-hover:opacity-0 transition-opacity duration-300"
              >
                Hover to see details
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center">
        <p class="text-lg text-red-500">Error loading experience data. Please try again later.</p>
      </div>
      
      <div v-else class="text-center">
        <p class="text-lg text-apple-gray-500">No experience information available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useExperiences } from '~/composables/directus/useExperiences';

const { experiences, isLoading, error } = useExperiences();

/**
 * Returns the appropriate logo path based on company name
 */
function getCompanyLogo(company: string): string | null {
  const companyLower = company.toLowerCase();
  
  if (companyLower.includes('mercedes') || companyLower.includes('benz')) {
    return '/images/logos/mercedes-benz.png';
  } else if (companyLower.includes('dhbw') && companyLower.includes('engineering')) {
    return '/images/logos/dhbw-engineering.png';
  } else if (companyLower.includes('dhbw')) {
    return '/images/logos/dhbw.png';
  }
  
  // Add more company logos here as needed
  
  return null;
}
</script>

<style scoped>
/* Add smooth transition for role description reveal */
.group:hover {
  cursor: pointer;
}
</style>