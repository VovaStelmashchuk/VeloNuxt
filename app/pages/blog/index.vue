<script setup lang="ts">
import { useFetch, useHead } from '#imports'
import type { BlogArticleDto } from '#layers/04-blog/app/types/blog'

const { data } = await useFetch<{ items: BlogArticleDto[], total: number }>('/api/blog/published', {
    query: {
        page: 1,
        pageSize: 100
    }
})

useHead({
    title: 'Blog - VeloNuxt',
    meta: [
        { name: 'description', content: 'Latest articles and updates from VeloNuxt.' }
    ]
})
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold mb-4">Blog</h1>
            <p class="text-gray-600 dark:text-gray-400">Latest articles and updates.</p>
        </div>

        <div v-if="data?.items?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogCard v-for="article in data.items" :key="article.slug" :article="article" />
        </div>

        <div v-else class="text-center py-12 text-gray-500">
            No articles found.
        </div>
    </div>
</template>
