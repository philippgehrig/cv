<template>
  <div>
    <ContentList v-slot="{ list }" path="/1.blog" :query="{
      sort: [{ date: -1 }]
    }">
      <div v-if="list.length > 0">
        <div class="space-y-12">
          <article v-for="article in list" :key="article._path" class="border border-apple-gray-100 rounded-2xl overflow-hidden shadow-sm p-6">
            <h2 class="text-2xl font-semibold mb-4">
              <NuxtLink :to="article._path" class="text-apple-gray-900 hover:text-apple-blue transition-colors">
                {{ article.title }}
              </NuxtLink>
            </h2>
            <div class="text-sm text-apple-gray-500 mb-3">
              {{ formatDate(article.date) }}
            </div>
            <p class="text-apple-gray-600 mb-6">{{ article.description }}</p>
            <NuxtLink :to="article._path" class="text-apple-blue hover:underline">Read more</NuxtLink>
          </article>
        </div>
      </div>
      <p v-else class="text-center py-12 text-apple-gray-600">
        No blog posts available yet. Check back soon!
      </p>
    </ContentList>
  </div>
</template>

<script setup>
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
</script>