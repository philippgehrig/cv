<template>
  <div v-if="toc && toc.links && toc.links.length > 0" class="blog-toc bg-apple-gray-50 rounded-lg p-4 mb-8 sticky top-24">
    <h3 class="text-lg font-semibold mb-3 text-apple-gray-900">Table of Contents</h3>
    <nav>
      <ul class="space-y-2">
        <li v-for="link in toc.links" :key="link.id" class="ml-0">
          <a 
            :href="`#${link.id}`" 
            class="text-apple-gray-700 hover:text-apple-blue transition-colors duration-200 block py-1"
            :class="{ 'font-medium': link.depth === 2 }"
            :style="{ paddingLeft: `${(link.depth - 2) * 0.75}rem` }"
          >
            {{ link.text }}
          </a>
          
          <ul v-if="link.children && link.children.length > 0" class="mt-2 space-y-2">
            <li v-for="childLink in link.children" :key="childLink.id" class="ml-0">
              <a 
                :href="`#${childLink.id}`" 
                class="text-apple-gray-600 hover:text-apple-blue transition-colors duration-200 block py-1"
                :style="{ paddingLeft: `${(childLink.depth - 2) * 0.75}rem` }"
              >
                {{ childLink.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

interface Toc {
  links: TocLink[];
}

defineProps<{
  toc: Toc;
}>();
</script>